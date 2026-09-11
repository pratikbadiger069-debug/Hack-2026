export type StreakTier = 1 | 2 | 3 | 4 | 5 | 6;

export interface StreakLevelInfo {
  tier: StreakTier;
  title: string;
  minDays: number;
  maxDays: number;
  badge: string;
  accentColor: string;
  borderColor: string;
  glowStyle: string;
  bgGradient: string;
  perks: string[];
  description: string;
}

export const STREAK_LEVELS: StreakLevelInfo[] = [
  {
    tier: 1,
    title: 'New Contributor',
    minDays: 0,
    maxDays: 7,
    badge: '🌱',
    accentColor: '#10B981',
    borderColor: '#A7F3D0',
    glowStyle: 'rgba(16, 185, 129, 0.15)',
    bgGradient: 'from-[#F0FDF4] to-[#FFFFFF]',
    perks: ['Initial streak tracker', 'Basic heatmap visibility'],
    description: 'Starting the daily engineering habit with initial code commits.',
  },
  {
    tier: 2,
    title: 'Consistent Builder',
    minDays: 8,
    maxDays: 30,
    badge: '🔥',
    accentColor: '#F59E0B',
    borderColor: '#FDE68A',
    glowStyle: 'rgba(245, 158, 11, 0.2)',
    bgGradient: 'from-[#FEF3C7]/40 to-[#FFFFFF]',
    perks: ['Flame badge on profile', '+15% XP multiplier on assessments'],
    description: 'Maintaining routine daily commits and steady repository progress.',
  },
  {
    tier: 3,
    title: 'Dedicated Developer',
    minDays: 31,
    maxDays: 90,
    badge: '⚡',
    accentColor: '#3B82F6',
    borderColor: '#BFDBFE',
    glowStyle: 'rgba(59, 130, 246, 0.2)',
    bgGradient: 'from-[#EFF6FF] to-[#FFFFFF]',
    perks: ['Verified Consistency badge', 'Campus ranking boost'],
    description: 'Quarter-long discipline proving unwavering builder dedication.',
  },
  {
    tier: 4,
    title: 'Elite Builder',
    minDays: 91,
    maxDays: 180,
    badge: '🚀',
    accentColor: '#06B6D4',
    borderColor: '#A5F3FC',
    glowStyle: 'rgba(6, 182, 212, 0.25)',
    bgGradient: 'from-[#ECFEFF] to-[#FFFFFF]',
    perks: ['Fast-track industry recruiter visibility', 'Elite title in leaderboard'],
    description: 'Sustained half-year continuous shipping velocity.',
  },
  {
    tier: 5,
    title: 'Open Source Warrior',
    minDays: 181,
    maxDays: 365,
    badge: '⚔️',
    accentColor: '#8B5CF6',
    borderColor: '#DDD6FE',
    glowStyle: 'rgba(139, 92, 246, 0.25)',
    bgGradient: 'from-[#F5F3FF] to-[#FFFFFF]',
    perks: ['Direct referral into Tier-1 partner hiring rounds', 'Special profile banner'],
    description: 'Nearly a full year of continuous public code contributions.',
  },
  {
    tier: 6,
    title: 'Legendary Contributor',
    minDays: 366,
    maxDays: 9999,
    badge: '👑',
    accentColor: '#C76A2A',
    borderColor: '#FDBA74',
    glowStyle: 'rgba(199, 106, 42, 0.3)',
    bgGradient: 'from-[#FFF7ED] to-[#FFFFFF]',
    perks: ['Legendary hall of fame status', 'Exclusive alumni mentorship access'],
    description: '365+ days unbroken shipping mastery. Top 0.1% student engineers nationally.',
  },
];

export function getStreakLevelInfo(streakDays: number): StreakLevelInfo {
  for (let i = STREAK_LEVELS.length - 1; i >= 0; i--) {
    if (streakDays >= STREAK_LEVELS[i].minDays) {
      return STREAK_LEVELS[i];
    }
  }
  return STREAK_LEVELS[0];
}

export interface GitHubStreakMetrics {
  currentStreak: number;
  longestStreak: number;
  monthlyContributions: number;
  yearlyContributions: number;
  activeDays: number;
  totalRepositories: number;
  totalStars: number;
  recentActivity: {
    id: string;
    type: 'commit' | 'pr' | 'release' | 'issue';
    repoName: string;
    description: string;
    timestamp: string;
  }[];
}

export function computeGitHubStreakMetrics(currentStreak: number = 24, totalCommits: number = 348): GitHubStreakMetrics {
  const longestStreak = Math.max(currentStreak, 42);
  const monthlyContributions = Math.round(totalCommits / 12) + (currentStreak > 15 ? 18 : 6);
  const activeDays = Math.min(365, Math.round(totalCommits * 0.72));

  return {
    currentStreak,
    longestStreak,
    monthlyContributions,
    yearlyContributions: totalCommits || 348,
    activeDays,
    totalRepositories: 18,
    totalStars: 142,
    recentActivity: [
      {
        id: 'act-1',
        type: 'pr',
        repoName: 'vectormind-core',
        description: 'Merged PR #14: HNSW cosine distance vector indexing speedup',
        timestamp: '2 hours ago',
      },
      {
        id: 'act-2',
        type: 'commit',
        repoName: 'smartcampus-edge-guardian',
        description: 'Pushed 4 commits: eBPF packet filter rate limiter',
        timestamp: 'Yesterday',
      },
      {
        id: 'act-3',
        type: 'release',
        repoName: 'distributed-token-bucket',
        description: 'Released v1.2.0: High-throughput Redis cluster sync',
        timestamp: '3 days ago',
      },
      {
        id: 'act-4',
        type: 'commit',
        repoName: 'skillbridge-ai',
        description: 'Integrated deterministic badge evaluation & streak matrix',
        timestamp: '4 days ago',
      },
    ],
  };
}
