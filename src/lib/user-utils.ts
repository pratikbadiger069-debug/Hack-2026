import { AuthUser, StudentProfile } from '@/types';

export interface UserIdentitySource {
  user?: AuthUser | null;
  profile?: (Partial<StudentProfile> & {
    linkedInName?: string;
    googleName?: string;
  }) | null;
}

const PLACEHOLDER_NAMES = [
  'new builder',
  'new student',
  'new user',
  'demo user',
  'guest user',
  'unknown user',
  'john doe',
  'test user',
  'example user',
  'sample user',
  'student user',
  'verified user',
  'new',
  'undefined',
  'null',
];

export function isPlaceholderOrInvalidName(name?: string | null): boolean {
  if (!name || typeof name !== 'string') return true;
  const trimmed = name.trim().toLowerCase();
  return (
    trimmed.length === 0 ||
    PLACEHOLDER_NAMES.includes(trimmed) ||
    trimmed.startsWith('new ') ||
    trimmed === 'new'
  );
}

/**
 * Resolves user display name with strict Single Source of Truth hierarchy:
 * 1. User Profile Name (if valid and not a placeholder)
 * 2. LinkedIn Profile Name (if imported via LinkedIn OAuth)
 * 3. Google Profile Name (if imported via Google OAuth)
 * 4. Authenticated User Name
 * 5. Email Username formatted (e.g. manutej.reddy@gmail.com -> "Manutej Reddy")
 * 6. Fallback = "Manutej Reddy" (never displays "New Builder", "Demo User", etc.)
 */
export function getUserDisplayName(
  identityOrProfile?: UserIdentitySource | StudentProfile | null,
  userDirect?: AuthUser | null
): string {
  if (!identityOrProfile && !userDirect) return 'Manutej Reddy';

  let profile: (Partial<StudentProfile> & { linkedInName?: string; googleName?: string }) | null | undefined = null;
  let user: AuthUser | null | undefined = userDirect;

  if (identityOrProfile) {
    if ('profile' in identityOrProfile || 'user' in identityOrProfile) {
      profile = (identityOrProfile as UserIdentitySource).profile;
      user = (identityOrProfile as UserIdentitySource).user || userDirect;
    } else {
      profile = identityOrProfile as StudentProfile;
    }
  }

  // 1. Profile Name in Student Record
  if (profile?.name && !isPlaceholderOrInvalidName(profile.name)) {
    return profile.name.trim();
  }

  // 2. LinkedIn OAuth Name
  if (profile?.linkedInName && !isPlaceholderOrInvalidName(profile.linkedInName)) {
    return profile.linkedInName.trim();
  }

  // 3. Google OAuth Name
  if (profile?.googleName && !isPlaceholderOrInvalidName(profile.googleName)) {
    return profile.googleName.trim();
  }

  // 4. Authenticated DB User Name
  if (user?.name && !isPlaceholderOrInvalidName(user.name)) {
    return user.name.trim();
  }

  // 5. GitHub URL username
  if (profile?.professional?.githubUrl) {
    const ghSlug = profile.professional.githubUrl.split('github.com/')[1]?.replace('/', '').trim();
    if (ghSlug && !isPlaceholderOrInvalidName(ghSlug)) {
      const formatted = ghSlug
        .split(/[-_.]/)
        .filter(Boolean)
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join(' ');
      if (formatted.length > 1) return formatted;
    }
  }

  // 6. Email Username Prefix
  const email = user?.email || profile?.email;
  if (email && email.includes('@')) {
    const prefix = email.split('@')[0];
    const formatted = prefix
      .replace(/[0-9_+]/g, '')
      .split(/[._-]/)
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
      .join(' ');
    if (formatted.length > 1 && !isPlaceholderOrInvalidName(formatted)) {
      return formatted;
    }
  }

  return 'Manutej Reddy';
}

/**
 * Resolves user's first name for conversational greetings (e.g. "Good Morning, Manutej.")
 * Never returns "New" or placeholder words.
 */
export function getUserFirstName(
  identityOrProfile?: UserIdentitySource | StudentProfile | null,
  userDirect?: AuthUser | null
): string {
  const fullName = getUserDisplayName(identityOrProfile, userDirect);
  const first = fullName.split(' ')[0];
  if (!first || isPlaceholderOrInvalidName(first)) {
    return 'Manutej';
  }
  return first;
}

/**
 * Formats time-based greeting (e.g. "Good Morning", "Good Afternoon", "Good Evening")
 */
export function getTimeBasedGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 17) return 'Good Afternoon';
  return 'Good Evening';
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
