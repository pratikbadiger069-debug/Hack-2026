import { NextRequest, NextResponse } from 'next/server';
import { POST as testAIHandler } from '../ai/test/route';
import { dbService } from '@/lib/server-db';
import { verifyToken, AUTH_COOKIE_NAME } from '@/lib/auth-jwt';
import { cleanApiKey } from '@/lib/ai-diagnostics';
import { AIProvider } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    let body: any = {};
    try {
      body = JSON.parse(rawBody);
    } catch {
      return NextResponse.json({ status: 'Invalid Request', error: 'Malformed JSON payload.' }, { status: 400 });
    }

    const { provider, apiKey, save = true }: { provider: AIProvider; apiKey: string; save?: boolean } = body;

    // First, run diagnostics probe
    const testReq = new NextRequest(req.url, {
      method: 'POST',
      headers: req.headers,
      body: JSON.stringify({ provider, apiKey }),
    });

    const testResponse = await testAIHandler(testReq);
    const testResult = await testResponse.json();

    // If connection was successful and save is requested, persist the key
    if (testResult.status === 'Connected' && save) {
      // Determine user from session token or query/body
      const token = req.cookies.get(AUTH_COOKIE_NAME)?.value;
      let userEmail = body.email;

      if (token) {
        const payload = await verifyToken(token);
        if (payload?.email) {
          userEmail = payload.email;
        }
      }

      if (userEmail) {
        try {
          const updatePayload: Record<string, string> = {};
          if (provider === 'gemini') updatePayload.gemini = cleanApiKey(apiKey);
          if (provider === 'openai') updatePayload.openai = cleanApiKey(apiKey);
          if (provider === 'claude') updatePayload.anthropic = cleanApiKey(apiKey);

          dbService.saveUserAIKeys(userEmail, updatePayload);
          testResult.saved = true;
          testResult.userEmail = userEmail;
        } catch (saveErr: any) {
          console.warn('Failed to persist AI key to DB:', saveErr.message);
          testResult.saved = false;
          testResult.saveWarning = 'Connection succeeded, but could not persist to user profile.';
        }
      }
    }

    return NextResponse.json(testResult, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { status: 'Provider Unavailable', error: `Connection handler failure: ${err.message}` },
      { status: 200 }
    );
  }
}
