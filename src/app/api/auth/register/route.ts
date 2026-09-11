import { NextRequest, NextResponse } from 'next/server';
import { dbService } from '@/lib/server-db';
import { signToken, getAuthCookieOptions } from '@/lib/auth-jwt';
import { checkRateLimit } from '@/lib/security';
import { registerSchema } from '@/lib/validations';

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const rateCheck = checkRateLimit(`register_${ip}`, 8, 60000); // 8 registers per minute
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: 'Too many registration requests. Please wait a moment before trying again.' },
        { status: 429 }
      );
    }

    const rawBody = await req.json();
    const parseResult = registerSchema.safeParse(rawBody);

    if (!parseResult.success) {
      const firstError = parseResult.error.issues[0]?.message || 'Invalid registration details.';
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const { name, email, password, role } = parseResult.data;
    const result = dbService.registerUser(name, email, role, password);

    const token = await signToken({
      userId: result.user.id,
      email: result.user.email,
      name: result.user.name,
      role: result.user.role,
      isDemoUser: false,
    });

    const cookieOptions = getAuthCookieOptions();
    const response = NextResponse.json({
      success: true,
      message: 'Account registered successfully. Welcome to SkillBridge.',
      user: {
        id: result.user.id,
        email: result.user.email,
        name: result.user.name,
        role: result.user.role,
        avatar: result.user.avatar,
        isEmailVerified: result.user.isEmailVerified,
      },
      profile: result.profile,
    });

    response.cookies.set(cookieOptions.name, token, cookieOptions);
    return response;
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Registration failed.' }, { status: 400 });
  }
}
