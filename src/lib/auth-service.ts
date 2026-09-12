import { UserRole } from '@/types';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar: string;
  isDemoMode: boolean;
  createdAt: string;
  company?: string;
  institution?: string;
  linkedInName?: string;
  googleName?: string;
  isEmailVerified?: boolean;
}

export const DEMO_USERS: Record<UserRole, AuthUser> = {
  student: {
    id: 'student-primary',
    email: 'manutej.reddy@skillbridge.edu',
    name: 'Manutej Reddy',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    isDemoMode: true,
    createdAt: '2025-08-15',
  },
  institute: {
    id: 'demo-institute-1',
    email: 'radhika.sen@apexinstitute.edu',
    name: 'Dr. Radhika Sen (Dean)',
    role: 'institute',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    isDemoMode: true,
    createdAt: '2025-07-10',
  },
  industry: {
    id: 'demo-industry-1',
    email: 'marcus.vance@anthropic-partner.io',
    name: 'Marcus Vance (Lead Recruiter)',
    role: 'industry',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    isDemoMode: true,
    createdAt: '2025-09-01',
  },
  admin: {
    id: 'demo-admin-1',
    email: 'admin@skillbridge.ai',
    name: 'Platform Administrator',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    isDemoMode: true,
    createdAt: '2025-01-01',
  },
};
