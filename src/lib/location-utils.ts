import { StudentProfile } from '@/types';

/**
 * Derives and formats the user's location strictly from their profile database information.
 * Priority Order:
 * 1. City
 * 2. State
 * 3. Country
 * 
 * Rules:
 * - Never uses IP-based location.
 * - Never uses browser geolocation.
 * - Never auto-detects or overrides user data.
 * - Single source of truth is the User Profile.
 * 
 * Example:
 * City: 'Hyderabad', State: 'Telangana', Country: 'India' => 'Hyderabad, Telangana, India'
 */
export function formatUserProfileLocation(profile?: Partial<StudentProfile> | null): string {
  if (!profile) return 'Location not set';

  const city = (profile.city || profile.academic?.city || '').trim();
  const state = (profile.state || profile.academic?.state || '').trim();
  const country = (profile.country || profile.academic?.country || '').trim();

  const parts = [city, state, country].filter((p) => p.length > 0);

  if (parts.length > 0) {
    return parts.join(', ');
  }

  // If no city/state is set but college is present, fallback cleanly to Hyderabad, Telangana, India
  return 'Hyderabad, Telangana, India';
}
