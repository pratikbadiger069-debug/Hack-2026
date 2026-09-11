import { NextRequest, NextResponse } from 'next/server';
import { dbService } from '@/lib/server-db';

export async function POST(req: NextRequest) {
  try {
    const { email, token } = await req.json();
    if (!email || !token) {
      return NextResponse.json({ error: 'Email and verification token are required' }, { status: 400 });
    }

    const verified = dbService.verifyEmailToken(email, token);
    if (!verified) {
      return NextResponse.json({ error: 'Invalid or expired verification token.' }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: 'Email successfully verified. Your account is now fully active.',
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
