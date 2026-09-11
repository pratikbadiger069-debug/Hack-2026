import { AuthUser, StudentProfile } from '@/types';

export interface UserIdentitySource {
  user?: AuthUser | null;
  profile?: Partial<StudentProfile> & {
    linkedInName?: string;
    googleName?: string;
  } | null;
}

/**
 * Resolves user display name with strict SaaS priority hierarchy:
 * 1. LinkedIn Profile Name (if imported via LinkedIn OAuth)
 * 2. Google Profile Name (if imported via Google OAuth)
 * 3. Database Registered / Authenticated User Name
 * 4. Profile Name in Student Record
 * 5. Email Username Prefix
 * 6. Fallback 'Verified User'
 */
export function getUserDisplayName(identity?: UserIdentitySource | null): string {
  if (!identity) return 'Verified User';

  const { user, profile } = identity;

  // 1. LinkedIn OAuth Name
  if (profile?.linkedInName && profile.linkedInName.trim().length > 0) {
    return profile.linkedInName.trim();
  }

  // 2. Google OAuth Name
  if (profile?.googleName && profile.googleName.trim().length > 0) {
    return profile.googleName.trim();
  }

  // 3. Authenticated DB User Name
  if (user?.name && user.name.trim().length > 0 && user.name.trim() !== 'Student User') {
    return user.name.trim();
  }

  // 4. Student Profile Record Name
  if (profile?.name && profile.name.trim().length > 0 && profile.name.trim() !== 'Student User') {
    return profile.name.trim();
  }

  // 5. Email Prefix
  const email = user?.email || profile?.email;
  if (email && email.includes('@')) {
    const prefix = email.split('@')[0];
    // Capitalize first letter or format dots
    return prefix
      .split('.')
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');
  }

  return 'Verified User';
}

/**
 * Resolves user's first name for conversational greetings (e.g. "Welcome back, Pratik")
 */
export function getUserFirstName(identity?: UserIdentitySource | null): string {
  const fullName = getUserDisplayName(identity);
  return fullName.split(' ')[0] || fullName;
}

/**
 * Masks an API key for safe client display (e.g. "AIzaSy...4xQ9" or "sk-proj...8Abc")
 */
export function maskApiKey(key?: string | null): string {
  if (!key || key.trim().length < 8) return '';
  const trimmed = key.trim();
  if (trimmed.length <= 12) {
    return `${trimmed.slice(0, 3)}...${trimmed.slice(-3)}`;
  }
  return `${trimmed.slice(0, 6)}••••••••${trimmed.slice(-4)}`;
}
