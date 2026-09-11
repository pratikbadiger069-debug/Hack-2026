import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/security';
import { cleanApiKey, classifyProviderError, DiagnosticResult } from '@/lib/ai-diagnostics';
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
    const rateCheck = checkRateLimit(`ai_test_${ip}`, 45, 60000); // 45 tests per min
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          status: 'Quota Exceeded',
          error: 'Rate limit exceeded. Please wait a moment before re-testing API connection.',
        },
        { status: 429 }
      );
    }

    const body: TestRequest = await req.json().catch(() => ({ provider: 'gemini', apiKey: '' }));
    const { provider, testPrompt = 'Respond with "Connection Verified" and nothing else.' } = body;
    const rawApiKey = body.apiKey;

    if (!provider || !['gemini', 'openai', 'claude'].includes(provider)) {
      return NextResponse.json(
        { status: 'Invalid Request', error: 'Invalid or unsupported AI provider specified.' },
        { status: 400 }
      );
    }

    const key = cleanApiKey(rawApiKey);

    if (!key || key.length < 8) {
      return NextResponse.json(
        {
          status: 'Invalid API Key',
          provider: provider === 'gemini' ? 'Google Gemini AI' : provider === 'openai' ? 'OpenAI' : 'Anthropic Claude',
          model: 'default',
          latencyMs: 0,
          error: 'API key is too short or empty. Please copy a valid key from your developer console.',
        },
        { status: 400 }
      );
    }

    // 1. Google Gemini Testing (Supports both header x-goog-api-key and URL query parameter)
    if (provider === 'gemini') {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${encodeURIComponent(key)}`;
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 12000); // 12s timeout

      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': key,
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: testPrompt }] }],
            generationConfig: { maxOutputTokens: 25 },
          }),
          signal: controller.signal,
        });
        clearTimeout(timeoutId);

        const latencyMs = Date.now() - startTime;

        if (response.ok) {
          const data = await response.json();
          const echoText =
            data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || 'Connection Verified';
          return NextResponse.json({
            status: 'Connected',
            provider: 'Google Gemini AI',
            model: 'gemini-1.5-flash',
            latencyMs,
            echoResponse: echoText,
            message: `Successfully connected to Gemini API in ${latencyMs}ms.`,
          });
        }

        const errData = await response.json().catch(() => ({}));
        const classified = classifyProviderError('gemini', response.status, errData, latencyMs);
        return NextResponse.json(classified, { status: 200 });
      } catch (err: any) {
        clearTimeout(timeoutId);
        const latencyMs = Date.now() - startTime;
        if (err.name === 'AbortError') {
          return NextResponse.json(
            {
              status: 'Network Timeout',
              provider: 'Google Gemini AI',
              model: 'gemini-1.5-flash',
              latencyMs,
              error: 'Connection timed out after 12 seconds while contacting Google Generative Language servers.',
            },
            { status: 200 }
          );
        }
        return NextResponse.json(
          {
            status: 'Provider Unavailable',
            provider: 'Google Gemini AI',
            model: 'gemini-1.5-flash',
            latencyMs,
            error: `Failed to connect to Google API: ${err.message || 'Network unreachable'}`,
          },
          { status: 200 }
        );
      }
    }

    // 2. OpenAI Testing
    if (provider === 'openai') {
      const endpoint = 'https://api.openai.com/v1/chat/completions';
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 12000);

      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${key}`,
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [{ role: 'user', content: testPrompt }],
            max_tokens: 25,
          }),
          signal: controller.signal,
        });
        clearTimeout(timeoutId);

        const latencyMs = Date.now() - startTime;

        if (response.ok) {
          const data = await response.json();
          const echoText = data?.choices?.[0]?.message?.content?.trim() || 'Connection Verified';
          return NextResponse.json({
            status: 'Connected',
            provider: 'OpenAI (GPT-4o)',
            model: 'gpt-4o-mini',
            latencyMs,
            echoResponse: echoText,
            message: `Successfully connected to OpenAI API in ${latencyMs}ms.`,
          });
        }

        const errData = await response.json().catch(() => ({}));
        const classified = classifyProviderError('openai', response.status, errData, latencyMs);
        return NextResponse.json(classified, { status: 200 });
      } catch (err: any) {
        clearTimeout(timeoutId);
        const latencyMs = Date.now() - startTime;
        if (err.name === 'AbortError') {
          return NextResponse.json(
            {
              status: 'Network Timeout',
              provider: 'OpenAI (GPT-4o)',
              model: 'gpt-4o-mini',
              latencyMs,
              error: 'Connection timed out after 12 seconds while contacting OpenAI servers.',
            },
            { status: 200 }
          );
        }
        return NextResponse.json(
          {
            status: 'Provider Unavailable',
            provider: 'OpenAI (GPT-4o)',
            model: 'gpt-4o-mini',
            latencyMs,
            error: `Failed to connect to OpenAI API: ${err.message || 'Network unreachable'}`,
          },
          { status: 200 }
        );
      }
    }

    // 3. Anthropic Claude Testing
    if (provider === 'claude') {
      const endpoint = 'https://api.anthropic.com/v1/messages';
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 12000);

      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': key,
            'anthropic-version': '2023-06-01',
          },
          body: JSON.stringify({
            model: 'claude-3-5-sonnet-20241022',
            max_tokens: 25,
            messages: [{ role: 'user', content: testPrompt }],
          }),
          signal: controller.signal,
        });
        clearTimeout(timeoutId);

        const latencyMs = Date.now() - startTime;

        if (response.ok) {
          const data = await response.json();
          const echoText = data?.content?.[0]?.text?.trim() || 'Connection Verified';
          return NextResponse.json({
            status: 'Connected',
            provider: 'Anthropic Claude',
            model: 'claude-3-5-sonnet-20241022',
            latencyMs,
            echoResponse: echoText,
            message: `Successfully connected to Anthropic Claude API in ${latencyMs}ms.`,
          });
        }

        const errData = await response.json().catch(() => ({}));
        const classified = classifyProviderError('claude', response.status, errData, latencyMs);
        return NextResponse.json(classified, { status: 200 });
      } catch (err: any) {
        clearTimeout(timeoutId);
        const latencyMs = Date.now() - startTime;
        if (err.name === 'AbortError') {
          return NextResponse.json(
            {
              status: 'Network Timeout',
              provider: 'Anthropic Claude',
              model: 'claude-3-5-sonnet-20241022',
              latencyMs,
              error: 'Connection timed out after 12 seconds while contacting Anthropic servers.',
            },
            { status: 200 }
          );
        }
        return NextResponse.json(
          {
            status: 'Provider Unavailable',
            provider: 'Anthropic Claude',
            model: 'claude-3-5-sonnet-20241022',
            latencyMs,
            error: `Failed to connect to Anthropic API: ${err.message || 'Network unreachable'}`,
          },
          { status: 200 }
        );
      }
    }

    return NextResponse.json(
      { status: 'Invalid Request', error: 'Unsupported AI provider.' },
      { status: 400 }
    );
  } catch (err: any) {
    const latencyMs = Date.now() - startTime;
    return NextResponse.json(
      {
        status: 'Provider Unavailable',
        latencyMs,
        error: `Diagnostic probe error: ${err.message || 'Unknown server error'}`,
      },
      { status: 200 }
    );
  }
}
