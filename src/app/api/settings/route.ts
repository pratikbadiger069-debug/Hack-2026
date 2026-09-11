import { NextRequest, NextResponse } from 'next/server';
import { dbService } from '@/lib/server-db';
import { verifyToken, AUTH_COOKIE_NAME } from '@/lib/auth-jwt';
import { cleanApiKey } from '@/lib/ai-diagnostics';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get(AUTH_COOKIE_NAME)?.value;
    let userEmail: string | undefined;

    if (token) {
      const payload = await verifyToken(token);
      if (payload?.email) {
        userEmail = payload.email;
      }
    }

    const masked = dbService.getMaskedAIKeys(userEmail);
    const user = userEmail ? dbService.getUserByEmail(userEmail) : null;

    return NextResponse.json({
      user: user
        ? {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          }
        : null,
      aiKeys: masked,
    });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to retrieve settings', message: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get(AUTH_COOKIE_NAME)?.value;
    let userEmail: string | undefined;

    if (token) {
      const payload = await verifyToken(token);
      if (payload?.email) {
        userEmail = payload.email;
      }
    }

    const body = await req.json().catch(() => ({}));
    const targetEmail = userEmail || body.email;

    if (!targetEmail) {
      return NextResponse.json({ error: 'Authentication required to save settings.' }, { status: 401 });
    }

    const keysToSave: { gemini?: string; openai?: string; anthropic?: string; customEndpoint?: string } = {};

    if (body.geminiKey !== undefined) keysToSave.gemini = cleanApiKey(body.geminiKey);
    if (body.openaiKey !== undefined) keysToSave.openai = cleanApiKey(body.openaiKey);
    if (body.anthropicKey !== undefined) keysToSave.anthropic = cleanApiKey(body.anthropicKey);
    if (body.customEndpoint !== undefined) keysToSave.customEndpoint = body.customEndpoint;

    dbService.saveUserAIKeys(targetEmail, keysToSave);
    const updatedMasked = dbService.getMaskedAIKeys(targetEmail);

    return NextResponse.json({
      success: true,
      message: 'AI Provider settings saved successfully.',
      aiKeys: updatedMasked,
    });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to save settings', message: err.message }, { status: 500 });
  }
}
