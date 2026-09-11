import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'skillbridge-production-secret-key-salt-2026-secure-jwt'
);

const AUTH_COOKIE_NAME = 'sb_auth_session';

interface JWTPayload {
  userId: string;
  email: string;
  name: string;
  role: 'student' | 'institute' | 'industry' | 'admin';
  isDemoUser: boolean;
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Protected route prefixes
  const isStudentRoute = pathname.startsWith('/student');
  const isInstituteRoute = pathname.startsWith('/institute');
  const isIndustryRoute = pathname.startsWith('/industry');
  const isAdminRoute = pathname.startsWith('/admin');

  const isProtectedRoute = isStudentRoute || isInstituteRoute || isIndustryRoute || isAdminRoute;

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  // Check auth session cookie
  const authCookie = req.cookies.get(AUTH_COOKIE_NAME)?.value;

  if (!authCookie) {
    // If accessing demo mode with explicit query param or path
    const isDemo = req.nextUrl.searchParams.get('demo') === 'true';
    if (isDemo) {
      return NextResponse.next();
    }
    const loginUrl = new URL('/login', req.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  try {
    const { payload } = await jwtVerify(authCookie, JWT_SECRET);
    const user = payload as unknown as JWTPayload;

    // Super admin has unrestricted access
    if (user.role === 'admin') {
      return NextResponse.next();
    }

    // Role-based route enforcement
    if (isStudentRoute && user.role !== 'student') {
      return NextResponse.redirect(new URL(`/${user.role}`, req.url));
    }

    if (isInstituteRoute && user.role !== 'institute') {
      return NextResponse.redirect(new URL(`/${user.role}`, req.url));
    }

    if (isIndustryRoute && user.role !== 'industry') {
      return NextResponse.redirect(new URL(`/${user.role}`, req.url));
    }

    if (isAdminRoute) {
      return NextResponse.redirect(new URL(`/${user.role}`, req.url));
    }

    return NextResponse.next();
  } catch {
    // Invalid or expired token
    const loginUrl = new URL('/login', req.url);
    loginUrl.searchParams.set('error', 'session_expired');
    const res = NextResponse.redirect(loginUrl);
    res.cookies.delete(AUTH_COOKIE_NAME);
    return res;
  }
}

export const config = {
  matcher: [
    '/student/:path*',
    '/institute/:path*',
    '/industry/:path*',
    '/admin/:path*',
  ],
};
