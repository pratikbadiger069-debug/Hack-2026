import { NextRequest, NextResponse } from 'next/server';
import { dbService } from '@/lib/server-db';
import { signToken, getAuthCookieOptions } from '@/lib/auth-jwt';

export async function POST(req: NextRequest) {
  try {
    const { email, name, avatar, googleId } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Google authentication email is required.' }, { status: 400 });
    }

    const cleanEmail = email.toLowerCase().trim();
    const cleanName = name || cleanEmail.split('@')[0].split('.').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

    let user = dbService.getUserByEmail(cleanEmail);
    if (!user) {
      // Auto-register google user
      const registerRes = dbService.registerUser(cleanName, cleanEmail, 'student', `GAuth_${Date.now()}_!Pass`);
      user = registerRes.user;
    }

    // Update googleName
    const profile = dbService.updateStudentProfile(cleanEmail, {
      name: cleanName,
      googleName: cleanName,
      avatar: avatar || user.avatar,
    });

    const token = await signToken({
      userId: user.id,
      email: user.email,
      name: cleanName,
      role: user.role,
      isDemoUser: false,
    });

    const cookieOptions = getAuthCookieOptions();
    const response = NextResponse.json({
      success: true,
      message: 'Google identity authenticated successfully',
      user: {
        id: user.id,
        email: user.email,
        name: cleanName,
        googleName: cleanName,
        role: user.role,
        avatar: avatar || user.avatar,
        isEmailVerified: true,
      },
      profile,
    });

    response.cookies.set(cookieOptions.name, token, cookieOptions);
    return response;
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Google OAuth failed' }, { status: 500 });
  }
}
