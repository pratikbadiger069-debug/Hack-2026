import { NextRequest, NextResponse } from 'next/server';
import { dbService } from '@/lib/server-db';
import { verifyToken, AUTH_COOKIE_NAME } from '@/lib/auth-jwt';

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

    const providers = [
      {
        id: 'gemini',
        name: 'Google Gemini AI',
        model: 'gemini-1.5-flash / gemini-1.5-pro',
        isConfigured: masked.gemini.configured,
        keyMasked: masked.gemini.masked,
        source: masked.gemini.source,
        description: 'Recommended: Free tier, multimodal vision, high-speed skill verification.',
      },
      {
        id: 'openai',
        name: 'OpenAI GPT-4o',
        model: 'gpt-4o / gpt-4o-mini',
        isConfigured: masked.openai.configured,
        keyMasked: masked.openai.masked,
        source: masked.openai.source,
        description: 'Industry benchmark for curriculum parsing and complex reasoning.',
      },
      {
        id: 'claude',
        name: 'Anthropic Claude',
        model: 'claude-3-5-sonnet-20241022',
        isConfigured: masked.anthropic.configured,
        keyMasked: masked.anthropic.masked,
        source: masked.anthropic.source,
        description: 'State-of-the-art coding evaluations and ATS resume alignment.',
      },
    ];

    return NextResponse.json({
      providers,
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: 'Failed to fetch providers', message: err.message },
      { status: 500 }
    );
  }
}
