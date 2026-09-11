import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/security';
import { verifyToken, AUTH_COOKIE_NAME } from '@/lib/auth-jwt';
import { cleanApiKey } from '@/lib/ai-diagnostics';
import { dbService } from '@/lib/server-db';
import { AIProvider } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const rateCheck = checkRateLimit(`ai_gen_${ip}`, 25, 60000);
    if (!rateCheck.allowed) {
      return NextResponse.json({ error: 'Rate limit exceeded for AI generation. Please wait a moment.' }, { status: 429 });
    }

    const body = await req.json().catch(() => ({}));
    const { provider = 'gemini', systemPrompt, userPrompt } = body;
    let rawApiKey = body.apiKey;

    // If key not in request, fallback to database or environment variables
    if (!rawApiKey || rawApiKey.trim().length < 8) {
      const token = req.cookies.get(AUTH_COOKIE_NAME)?.value;
      let userEmail: string | undefined;
      if (token) {
        const payload = await verifyToken(token);
        userEmail = payload?.email;
      }
      const storedKeys = dbService.getUserAIKeys(userEmail);
      if (provider === 'gemini') rawApiKey = storedKeys.gemini;
      if (provider === 'openai') rawApiKey = storedKeys.openai;
      if (provider === 'claude') rawApiKey = storedKeys.anthropic;
    }

    const key = cleanApiKey(rawApiKey);

    if (!key || key.length < 8) {
      return NextResponse.json({ error: 'Valid AI provider API key is required. Please configure your key in Settings or BYOK modal.' }, { status: 400 });
    }

    // 1. Gemini Inference
    if (provider === 'gemini') {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${encodeURIComponent(key)}`;
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': key,
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: `${systemPrompt ? systemPrompt + '\n\n' : ''}${userPrompt}` }],
            },
          ],
        }),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        return NextResponse.json({ error: err?.error?.message || 'Gemini generation failed' }, { status: response.status });
      }

      const data = await response.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
      return NextResponse.json({ result: text });
    }

    // 2. OpenAI Inference
    if (provider === 'openai') {
      const endpoint = 'https://api.openai.com/v1/chat/completions';
      const messages = [];
      if (systemPrompt) messages.push({ role: 'system', content: systemPrompt });
      messages.push({ role: 'user', content: userPrompt });

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${key}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages,
        }),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        return NextResponse.json({ error: err?.error?.message || 'OpenAI generation failed' }, { status: response.status });
      }

      const data = await response.json();
      const text = data?.choices?.[0]?.message?.content || '';
      return NextResponse.json({ result: text });
    }

    // 3. Claude Inference
    if (provider === 'claude') {
      const endpoint = 'https://api.anthropic.com/v1/messages';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': key,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-3-5-sonnet-20241022',
          system: systemPrompt || undefined,
          messages: [{ role: 'user', content: userPrompt }],
          max_tokens: 4000,
        }),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        return NextResponse.json({ error: err?.error?.message || 'Claude generation failed' }, { status: response.status });
      }

      const data = await response.json();
      const text = data?.content?.[0]?.text || '';
      return NextResponse.json({ result: text });
    }

    return NextResponse.json({ error: 'Unsupported provider' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'AI request failed' }, { status: 500 });
  }
}
