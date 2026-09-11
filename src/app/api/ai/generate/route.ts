import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/security';
import { AIProvider } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const rateCheck = checkRateLimit(`ai_gen_${ip}`, 20, 60000);
    if (!rateCheck.allowed) {
      return NextResponse.json({ error: 'Rate limit exceeded for AI generation. Please wait a moment.' }, { status: 429 });
    }

    const { provider, apiKey, systemPrompt, userPrompt } = await req.json();

    if (!provider || !apiKey) {
      return NextResponse.json({ error: 'Provider and valid API key are required.' }, { status: 400 });
    }

    const key = apiKey.trim();

    // 1. Gemini Inference
    if (provider === 'gemini') {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`;
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
