import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/security';
import { AIProvider } from '@/types';

interface TestRequest {
  provider: AIProvider;
  apiKey: string;
  testPrompt?: string;
}

export async function POST(req: NextRequest) {
  const startTime = Date.now();
  try {
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const rateCheck = checkRateLimit(`ai_test_${ip}`, 30, 60000); // 30 tests per min
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          status: 'Connection Failed',
          error: 'Rate limit exceeded. Please wait a moment before re-testing API connection.',
        },
        { status: 429 }
      );
    }

    const body: TestRequest = await req.json();
    const { provider, apiKey, testPrompt = 'Respond with "Connection Verified" and nothing else.' } = body;

    if (!provider || !['gemini', 'openai', 'claude'].includes(provider)) {
      return NextResponse.json(
        { status: 'Invalid API Key', error: 'Invalid or unsupported AI provider specified.' },
        { status: 400 }
      );
    }

    if (!apiKey || apiKey.trim().length < 8) {
      return NextResponse.json(
        {
          status: 'Invalid API Key',
          error: 'API key is too short or empty. Please paste a valid key from your provider console.',
        },
        { status: 400 }
      );
    }

    const key = apiKey.trim();

    // 1. Google Gemini Testing
    if (provider === 'gemini') {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`;
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: testPrompt }] }],
          generationConfig: { maxOutputTokens: 20 },
        }),
      });

      const latencyMs = Date.now() - startTime;
      if (response.ok) {
        const data = await response.json();
        const echoText = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || 'Connection Verified';
        return NextResponse.json({
          status: 'Connected',
          latencyMs,
          model: 'gemini-1.5-flash',
          provider: 'Google Gemini AI',
          echoResponse: echoText,
          message: `Successfully connected to Gemini API in ${latencyMs}ms.`,
        });
      }

      const errData = await response.json().catch(() => ({}));
      const errMsg = errData?.error?.message || response.statusText;
      const isAuthError = response.status === 400 || response.status === 401 || response.status === 403;

      return NextResponse.json(
        {
          status: isAuthError ? 'Invalid API Key' : 'Connection Failed',
          latencyMs,
          error: isAuthError ? `Gemini API authentication failed: ${errMsg}` : `Gemini API error (${response.status}): ${errMsg}`,
        },
        { status: 400 }
      );
    }

    // 2. OpenAI Testing
    if (provider === 'openai') {
      const endpoint = 'https://api.openai.com/v1/chat/completions';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${key}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [{ role: 'user', content: testPrompt }],
          max_tokens: 20,
        }),
      });

      const latencyMs = Date.now() - startTime;
      if (response.ok) {
        const data = await response.json();
        const echoText = data?.choices?.[0]?.message?.content?.trim() || 'Connection Verified';
        return NextResponse.json({
          status: 'Connected',
          latencyMs,
          model: 'gpt-4o-mini',
          provider: 'OpenAI GPT-4o',
          echoResponse: echoText,
          message: `Successfully connected to OpenAI API in ${latencyMs}ms.`,
        });
      }

      const errData = await response.json().catch(() => ({}));
      const errMsg = errData?.error?.message || response.statusText;
      const isAuthError = response.status === 401 || response.status === 403;

      return NextResponse.json(
        {
          status: isAuthError ? 'Invalid API Key' : 'Connection Failed',
          latencyMs,
          error: isAuthError ? `OpenAI API authentication failed: ${errMsg}` : `OpenAI API error (${response.status}): ${errMsg}`,
        },
        { status: 400 }
      );
    }

    // 3. Anthropic Claude Testing
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
          max_tokens: 20,
          messages: [{ role: 'user', content: testPrompt }],
        }),
      });

      const latencyMs = Date.now() - startTime;
      if (response.ok) {
        const data = await response.json();
        const echoText = data?.content?.[0]?.text?.trim() || 'Connection Verified';
        return NextResponse.json({
          status: 'Connected',
          latencyMs,
          model: 'claude-3-5-sonnet-20241022',
          provider: 'Anthropic Claude',
          echoResponse: echoText,
          message: `Successfully connected to Anthropic API in ${latencyMs}ms.`,
        });
      }

      const errData = await response.json().catch(() => ({}));
      const errMsg = errData?.error?.message || response.statusText;
      const isAuthError = response.status === 401 || response.status === 403;

      return NextResponse.json(
        {
          status: isAuthError ? 'Invalid API Key' : 'Connection Failed',
          latencyMs,
          error: isAuthError ? `Anthropic Claude authentication failed: ${errMsg}` : `Anthropic API error (${response.status}): ${errMsg}`,
        },
        { status: 400 }
      );
    }

    return NextResponse.json({ status: 'Invalid API Key', error: 'Unsupported provider' }, { status: 400 });
  } catch (err: any) {
    const latencyMs = Date.now() - startTime;
    return NextResponse.json(
      {
        status: 'Connection Failed',
        latencyMs,
        error: `Network or upstream connection failure: ${err.message || 'Unable to reach provider API.'}`,
      },
      { status: 500 }
    );
  }
}
