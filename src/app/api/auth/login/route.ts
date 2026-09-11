import { NextRequest, NextResponse } from 'next/server';
import { dbService } from '@/lib/server-db';
import { signToken, getAuthCookieOptions } from '@/lib/auth-jwt';
import { checkRateLimit } from '@/lib/security';
import { loginSchema } from '@/lib/validations';

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const rateCheck = checkRateLimit(`login_${ip}`, 12, 60000); // 12 attempts per minute
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: 'Too many login attempts. Please wait 1 minute before retrying.' },
        { status: 429 }
      );
    }

    const rawBody = await req.json();
    const parseResult = loginSchema.safeParse(rawBody);

    if (!parseResult.success) {
      const firstError = parseResult.error.issues[0]?.message || 'Invalid login details.';
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const { email, password, role } = parseResult.data;
    const result = dbService.loginUser(email, password, role);

    const token = await signToken({
      userId: result.user.id,
      email: result.user.email,
      name: result.user.name,
      role: result.user.role,
      isDemoUser: result.user.isDemoUser,
    });

    const cookieOptions = getAuthCookieOptions();
    const response = NextResponse.json({
      success: true,
      message: 'Authentication successful',
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
    return NextResponse.json({ error: err.message || 'Authentication failed' }, { status: 401 });
  }
}
