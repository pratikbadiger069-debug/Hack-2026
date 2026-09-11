import bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';
import { UserRole } from '@/types';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'skillbridge-production-secret-key-salt-2026-secure-jwt'
);

const TOKEN_EXPIRY = '7d';

export interface JWTPayload {
  userId: string;
  email: string;
  name: string;
  role: UserRole;
  isDemoUser: boolean;
}

// Password Hashing
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(password, salt);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// JWT Token Signing & Verification (Edge-Compatible with jose)
export async function signToken(payload: JWTPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(TOKEN_EXPIRY)
    .sign(JWT_SECRET);
}

export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as JWTPayload;
  } catch {
    return null;
  }
}

export const AUTH_COOKIE_NAME = 'sb_auth_session';

export function getAuthCookieOptions() {
  const isProduction = process.env.NODE_ENV === 'production';
  return {
    name: AUTH_COOKIE_NAME,
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax' as const,
    path: '/',
    maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
  };
}
