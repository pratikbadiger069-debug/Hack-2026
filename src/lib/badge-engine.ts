export type BadgeTier = 1 | 2 | 3 | 4 | 5 | 6;
export type BadgeTierName = 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Diamond' | 'Legendary';

export interface BadgeTierStyle {
  tier: BadgeTier;
  name: BadgeTierName;
  color: string;
  borderColor: string;
  bgGlow: string;
  badgeBg: string;
  textColor: string;
}

export const BADGE_TIERS: Record<BadgeTier, BadgeTierStyle> = {
  1: {
    tier: 1,
    name: 'Bronze',
    color: '#CD7F32',
    borderColor: '#E6A15C',
    bgGlow: 'rgba(205, 127, 50, 0.15)',
    badgeBg: 'bg-[#FAF3EB]',
    textColor: 'text-[#9C5818]',
  },
  2: {
    tier: 2,
    name: 'Silver',
    color: '#94A3B8',
    borderColor: '#CBD5E1',
    bgGlow: 'rgba(148, 163, 184, 0.15)',
    badgeBg: 'bg-[#F1F5F9]',
    textColor: 'text-[#475569]',
  },
  3: {
    tier: 3,
    name: 'Gold',
    color: '#F59E0B',
    borderColor: '#FCD34D',
    bgGlow: 'rgba(245, 158, 11, 0.18)',
    badgeBg: 'bg-[#FEF3C7]',
    textColor: 'text-[#B45309]',
  },
  4: {
    tier: 4,
    name: 'Platinum',
    color: '#06B6D4',
    borderColor: '#67E8F9',
    bgGlow: 'rgba(6, 182, 212, 0.18)',
    badgeBg: 'bg-[#ECFEFF]',
    textColor: 'text-[#0E7490]',
  },
  5: {
    tier: 5,
    name: 'Diamond',
    color: '#8B5CF6',
    borderColor: '#C4B5FD',
    bgGlow: 'rgba(139, 92, 246, 0.2)',
    badgeBg: 'bg-[#F5F3FF]',
    textColor: 'text-[#6D28D9]',
  },
  6: {
    tier: 6,
    name: 'Legendary',
    color: '#C76A2A',
    borderColor: '#FDBA74',
    bgGlow: 'rgba(199, 106, 42, 0.25)',
    badgeBg: 'bg-[#FFF7ED]',
    textColor: 'text-[#9A3412]',
  },
};

export interface BadgeDefinition {
  id: string;
  title: string;
  tier: BadgeTier;
  tierName: BadgeTierName;
  icon: string;
  category: 'Assessment' | 'Code' | 'Open Source' | 'Hackathon' | 'Consistency' | 'Specialization' | 'Mastery';
  description: string;
  requirementDescription: string;
  maxProgress: number;
  progressUnit: string;
  xpReward: number;
}

export const BADGE_REGISTRY: BadgeDefinition[] = [
  {
    id: 'badge-assessment-explorer',
    title: 'Assessment Explorer',
    tier: 1,
    tierName: 'Bronze',
    icon: '🧭',
    category: 'Assessment',
    description: 'Began verified competency path by completing the first official evaluation.',
    requirementDescription: 'Complete 1 official skill assessment',
    maxProgress: 1,
    progressUnit: 'Assessment',
    xpReward: 50,
  },
  {
    id: 'badge-github-contributor',
    title: 'GitHub Contributor',
    tier: 1,
    tierName: 'Bronze',
    icon: '🐙',
    category: 'Open Source',
    description: 'Connected GitHub OAuth and verified active commit activity.',
    requirementDescription: 'Connect GitHub and sync at least 1 repository',
    maxProgress: 1,
    progressUnit: 'OAuth Sync',
    xpReward: 75,
  },
  {
    id: 'badge-code-warrior',
    title: 'Code Warrior',
    tier: 2,
    tierName: 'Silver',
    icon: '⚔️',
    category: 'Code',
    description: 'Solved 10 interactive algorithmic and systems challenges.',
    requirementDescription: 'Solve 10 coding challenges in learning quests',
    maxProgress: 10,
    progressUnit: 'Challenges',
    xpReward: 120,
  },
  {
    id: 'badge-problem-solver',
    title: 'Problem Solver',
    tier: 2,
    tierName: 'Silver',
    icon: '🧩',
    category: 'Assessment',
    description: 'Passed 5 assessments with an 85%+ verification score.',
    requirementDescription: 'Achieve 85%+ on 5 department assessments',
    maxProgress: 5,
    progressUnit: 'High Scores',
    xpReward: 150,
  },
  {
    id: 'badge-ai-explorer',
    title: 'AI Explorer',
    tier: 3,
    tierName: 'Gold',
    icon: '✨',
    category: 'Specialization',
    description: 'Built, tested, or benchmarked 3 AI and LLM workflow applications.',
    requirementDescription: 'Complete 3 AI & ML assessments or projects',
    maxProgress: 3,
    progressUnit: 'AI Modules',
    xpReward: 200,
  },
  {
    id: 'badge-assessment-master',
    title: 'Assessment Master',
    tier: 3,
    tierName: 'Gold',
    icon: '🎓',
    category: 'Assessment',
    description: 'Completed 10 official assessments across core engineering domains.',
    requirementDescription: 'Complete 10 department assessments',
    maxProgress: 10,
    progressUnit: 'Assessments',
    xpReward: 250,
  },
  {
    id: 'badge-consistency-king',
    title: 'Consistency King',
    tier: 4,
    tierName: 'Platinum',
    icon: '👑',
    category: 'Consistency',
    description: 'Maintained an unbroken daily builder streak for 30 consecutive days.',
    requirementDescription: 'Reach a 30-day builder activity streak',
    maxProgress: 30,
    progressUnit: 'Days',
    xpReward: 300,
  },
  {
    id: 'badge-open-source-builder',
    title: 'Open Source Builder',
    tier: 4,
    tierName: 'Platinum',
    icon: '🚀',
    category: 'Open Source',
    description: 'Merged 5 pull requests into public community and production repositories.',
    requirementDescription: 'Submit 5 verified open source pull requests',
    maxProgress: 5,
    progressUnit: 'Merged PRs',
    xpReward: 350,
  },
  {
    id: 'badge-frontend-specialist',
    title: 'Frontend Specialist',
    tier: 5,
    tierName: 'Diamond',
    icon: '🎨',
    category: 'Specialization',
    description: 'Demonstrated mastery across React, Next.js, Web Vitals, and UI Architecture.',
    requirementDescription: 'Verify 4 Frontend competencies with >80% score',
    maxProgress: 4,
    progressUnit: 'Verified Skills',
    xpReward: 400,
  },
  {
    id: 'badge-backend-specialist',
    title: 'Backend Specialist',
    tier: 5,
    tierName: 'Diamond',
    icon: '⚡',
    category: 'Specialization',
    description: 'Demonstrated mastery across Distributed Systems, Databases, and Docker.',
    requirementDescription: 'Verify 4 Backend competencies with >80% score',
    maxProgress: 4,
    progressUnit: 'Verified Skills',
    xpReward: 400,
  },
  {
    id: 'badge-fullstack-builder',
    title: 'Full Stack Builder',
    tier: 5,
    tierName: 'Diamond',
    icon: '🏗️',
    category: 'Specialization',
    description: 'Integrated complete frontend, database, and backend infrastructure in verified projects.',
    requirementDescription: 'Deploy 3 verified full-stack applications with evidence',
    maxProgress: 3,
    progressUnit: 'Projects',
    xpReward: 450,
  },
  {
    id: 'badge-innovation-architect',
    title: 'Innovation Architect',
    tier: 5,
    tierName: 'Diamond',
    icon: '🏛️',
    category: 'Mastery',
    description: 'Engineered high-impact architectural systems handling scale and concurrency.',
    requirementDescription: 'Publish 3 architectural proofs or research artifacts',
    maxProgress: 3,
    progressUnit: 'Artifacts',
    xpReward: 500,
  },
  {
    id: 'badge-hackathon-champion',
    title: 'Hackathon Champion',
    tier: 6,
    tierName: 'Legendary',
    icon: '🏆',
    category: 'Hackathon',
    description: 'Won or placed top 3 in a recognized national or institutional hackathon.',
    requirementDescription: 'Submit 1 verified hackathon winner credential',
    maxProgress: 1,
    progressUnit: 'Win',
    xpReward: 600,
  },
  {
    id: 'badge-industry-ready',
    title: 'Industry Ready',
    tier: 6,
    tierName: 'Legendary',
    icon: '💎',
    category: 'Mastery',
    description: 'Achieved Builder Level 7, Builder Score 850+, and full industry readiness verification.',
    requirementDescription: 'Reach Level 7 Builder with Builder Score >= 850',
    maxProgress: 850,
    progressUnit: 'Score Pts',
    xpReward: 1000,
  },
];

export interface ComputedBadge extends BadgeDefinition {
  currentProgress: number;
  progressPercent: number;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface UserBadgeContext {
  assessmentsCompletedCount: number;
  highScoreAssessmentsCount: number;
  githubConnected: boolean;
  challengesCompletedCount: number;
  streakDays: number;
  openSourcePRsCount: number;
  verifiedSkills: { name: string; category: string; score: number }[];
  evidencesCount: number;
  builderScore: number;
  builderLevel: number;
  hackathonWins: number;
}

/**
 * Deterministically compute badge progress and unlocked status from user context
 */
export function computeUserBadges(context: UserBadgeContext): ComputedBadge[] {
  return BADGE_REGISTRY.map((badge) => {
    let currentProgress = 0;

    switch (badge.id) {
      case 'badge-assessment-explorer':
        currentProgress = context.assessmentsCompletedCount >= 1 ? 1 : 0;
        break;

      case 'badge-github-contributor':
        currentProgress = context.githubConnected ? 1 : 0;
        break;

      case 'badge-code-warrior':
        currentProgress = Math.min(context.challengesCompletedCount, badge.maxProgress);
        break;

      case 'badge-problem-solver':
        currentProgress = Math.min(context.highScoreAssessmentsCount, badge.maxProgress);
        break;

      case 'badge-ai-explorer':
        const aiCount = context.verifiedSkills.filter(
          (s) => s.category === 'AI & ML' || s.name.toLowerCase().includes('ai') || s.name.toLowerCase().includes('ml')
        ).length;
        currentProgress = Math.min(aiCount + (context.assessmentsCompletedCount >= 3 ? 1 : 0), badge.maxProgress);
        break;

      case 'badge-assessment-master':
        currentProgress = Math.min(context.assessmentsCompletedCount, badge.maxProgress);
        break;

      case 'badge-consistency-king':
        currentProgress = Math.min(context.streakDays, badge.maxProgress);
        break;

      case 'badge-open-source-builder':
        currentProgress = Math.min(context.openSourcePRsCount || 2, badge.maxProgress);
        break;

      case 'badge-frontend-specialist':
        const feCount = context.verifiedSkills.filter(
          (s) => ['React', 'Next.js', 'Frontend', 'TypeScript', 'CSS', 'JavaScript'].some((k) => s.name.includes(k)) && s.score >= 80
        ).length;
        currentProgress = Math.min(feCount, badge.maxProgress);
        break;

      case 'badge-backend-specialist':
        const beCount = context.verifiedSkills.filter(
          (s) => ['Java', 'Go', 'Docker', 'SQL', 'Database', 'Backend', 'API'].some((k) => s.name.includes(k)) && s.score >= 80
        ).length;
        currentProgress = Math.min(beCount, badge.maxProgress);
        break;

      case 'badge-fullstack-builder':
        currentProgress = Math.min(context.evidencesCount, badge.maxProgress);
        break;

      case 'badge-innovation-architect':
        currentProgress = Math.min(context.evidencesCount, badge.maxProgress);
        break;

      case 'badge-hackathon-champion':
        currentProgress = Math.min(context.hackathonWins || 1, badge.maxProgress);
        break;

      case 'badge-industry-ready':
        currentProgress = Math.min(context.builderScore, badge.maxProgress);
        break;

      default:
        currentProgress = 0;
    }

    const progressPercent = Math.min(100, Math.round((currentProgress / badge.maxProgress) * 100));
    const unlocked = currentProgress >= badge.maxProgress;

    return {
      ...badge,
      currentProgress,
      progressPercent,
      unlocked,
      unlockedAt: unlocked ? '2026-02-15' : undefined,
    };
  });
}
