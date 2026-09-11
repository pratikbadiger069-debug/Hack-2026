import { NextRequest, NextResponse } from 'next/server';
import { dbService } from '@/lib/server-db';
import { signToken, getAuthCookieOptions } from '@/lib/auth-jwt';

export async function POST(req: NextRequest) {
  try {
    const { email, name, avatar, googleId, code } = await req.json();

    let userEmail = email;
    let userName = name;
    let userAvatar = avatar;
    let gId = googleId || `gid_${Date.now()}`;

    // Optional OAuth code exchange if configured
    if (code && process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
      try {
        const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            code,
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            redirect_uri: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/auth/google/callback`,
            grant_type: 'authorization_code',
          }),
        });
        const tokenData = await tokenRes.json();
        if (tokenData.access_token) {
          const userinfoRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: { Authorization: `Bearer ${tokenData.access_token}` },
          });
          if (userinfoRes.ok) {
            const userinfo = await userinfoRes.json();
            userEmail = userinfo.email;
            userName = userinfo.name;
            userAvatar = userinfo.picture;
            gId = userinfo.sub;
          }
        }
      } catch (oauthErr) {
        console.warn('Google token exchange fallback to payload', oauthErr);
      }
    }

    if (!userEmail) {
      return NextResponse.json({ error: 'Google authentication email is required.' }, { status: 400 });
    }

    const cleanEmail = userEmail.toLowerCase().trim();
    const cleanName = userName || cleanEmail.split('@')[0].split('.').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

    let user = dbService.getUserByEmail(cleanEmail);
    if (!user) {
      const registerRes = dbService.registerUser(cleanName, cleanEmail, 'student', `GAuth_${Date.now()}_!Pass`);
      user = registerRes.user;
    }

    const profile = dbService.updateStudentProfile(cleanEmail, {
      name: cleanName,
      googleName: cleanName,
      avatar: userAvatar || user.avatar,
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
        googleId: gId,
        role: user.role,
        avatar: userAvatar || user.avatar,
        isEmailVerified: true,
        createdAt: user.createdAt || new Date().toISOString(),
        lastLogin: new Date().toISOString(),
      },
      profile,
    });

    response.cookies.set(cookieOptions.name, token, cookieOptions);
    return response;
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Google OAuth failed' }, { status: 500 });
  }
}
