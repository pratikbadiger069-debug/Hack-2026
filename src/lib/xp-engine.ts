import { AchievementBadge, BuilderLevelTitle } from '@/types';

export interface LevelInfo {
  level: number;
  title: BuilderLevelTitle;
  currentLevelMinXP: number;
  nextLevelTargetXP: number;
  progressPercent: number;
  xpRemaining: number;
}

/**
 * Calculates level, title, progress percent, and XP remaining for the next level.
 * Progressive threshold curve:
 * Level 1: 0 - 99 XP
 * Level 2: 100 - 249 XP
 * Level 3: 250 - 449 XP
 * Level 4: 450 - 699 XP
 * Level L: requires base XP + incremental per level
 */
export function getLevelInfo(totalXP: number): LevelInfo {
  const safeXP = Math.max(0, Math.floor(totalXP || 0));

  // Determine level iteratively with clear predictable curve
  // Level 1: 0 XP
  // Level 2: 100 XP (need 100)
  // Level 3: 250 XP (need 150)
  // Level 4: 450 XP (need 200)
  // Level 5: 700 XP (need 250)
  // Level L: minXP = sum_{i=1}^{L-1} (50 + 50 * i) = 25 * L * (L + 1) - 50
  let level = 1;
  let currentMin = 0;
  let nextTarget = 100;

  while (safeXP >= nextTarget) {
    level++;
    currentMin = nextTarget;
    // Step required to reach next level grows smoothly
    const step = 100 + (level - 1) * 50;
    nextTarget = currentMin + step;
  }

  const range = nextTarget - currentMin;
  const inLevelXP = safeXP - currentMin;
  const progressPercent = Math.min(100, Math.max(0, Math.round((inLevelXP / range) * 100)));
  const xpRemaining = nextTarget - safeXP;

  // Assign builder title
  let title: BuilderLevelTitle = 'Explorer';
  if (level >= 61) title = 'Elite Builder';
  else if (level >= 41) title = 'Innovator';
  else if (level >= 31) title = 'Architect';
  else if (level >= 21) title = 'Creator';
  else if (level >= 11) title = 'Builder';
  else title = 'Explorer';

  return {
    level,
    title,
    currentLevelMinXP: currentMin,
    nextLevelTargetXP: nextTarget,
    progressPercent,
    xpRemaining,
  };
}

export const XP_REWARDS = {
  EASY: 10,
  MEDIUM: 25,
  ADVANCED: 50,
  EXPERT: 100,
  BOSS_TIER1: 250,
  BOSS_TIER2: 500,
  PROJECT_UPLOAD: 100,
  GITHUB_CONNECT: 25,
  ROADMAP_MILESTONE: 75,
  STREAK_BONUS_7D: 50,
};

export interface AssessmentResultReport {
  questId: string;
  questTitle: string;
  category: string;
  difficulty: string;
  totalQuestions: number;
  correctAnswers: number;
  scorePercentage: number;
  xpEarned: number;
  skillConfidenceScore: number;
  strengths: string[];
  weakAreas: string[];
  recommendedNextChallenge: {
    id: string;
    title: string;
    difficulty: string;
    xpReward: number;
  };
  recommendedPath: string;
  newLevelInfo: LevelInfo;
}

/**
 * Generates an adaptive post-assessment report and diagnostic analysis
 */
export function evaluateAssessmentReport(
  quest: { id: string; title: string; category: string; difficulty: string; xpReward: number },
  correctCount: number,
  totalQuestions: number,
  currentXP: number
): AssessmentResultReport {
  const safeTotal = Math.max(1, totalQuestions);
  const scorePercentage = Math.round((correctCount / safeTotal) * 100);
  const xpEarned = scorePercentage >= 60 ? quest.xpReward : Math.round(quest.xpReward * 0.4);
  const newTotalXP = currentXP + xpEarned;
  const newLevelInfo = getLevelInfo(newTotalXP);

  // Derive strengths & weak areas
  const strengths: string[] = [];
  const weakAreas: string[] = [];

  if (scorePercentage >= 80) {
    strengths.push(`${quest.category} core syntax & architectural paradigms`);
    strengths.push('Memory safety & asynchronous execution models');
  } else if (scorePercentage >= 50) {
    strengths.push('Foundational concept comprehension');
    weakAreas.push('Edge-case error handling & high-throughput concurrency');
  } else {
    weakAreas.push(`${quest.category} core design patterns`);
    weakAreas.push('Performance optimization & distributed failure recovery');
  }

  // Next recommendation
  let nextTitle = 'Distributed Caching & Redis Pipelines';
  let nextDiff = 'Advanced';
  let nextXP = 50;

  if (quest.difficulty === 'Easy') {
    nextTitle = `${quest.category} Intermediate Concepts`;
    nextDiff = 'Medium';
    nextXP = 25;
  } else if (quest.difficulty === 'Medium') {
    nextTitle = `${quest.category} Production Optimization`;
    nextDiff = 'Advanced';
    nextXP = 50;
  } else if (quest.difficulty === 'Advanced') {
    nextTitle = `${quest.category} Real-World Boss Challenge`;
    nextDiff = 'Expert';
    nextXP = 100;
  } else {
    nextTitle = 'Boss Challenge: High-Scale Distributed Case Study';
    nextDiff = 'Boss (250 XP)';
    nextXP = 250;
  }

  return {
    questId: quest.id,
    questTitle: quest.title,
    category: quest.category,
    difficulty: quest.difficulty,
    totalQuestions: safeTotal,
    correctAnswers: correctCount,
    scorePercentage,
    xpEarned,
    skillConfidenceScore: Math.min(99, Math.max(45, scorePercentage + 5)),
    strengths,
    weakAreas,
    recommendedNextChallenge: {
      id: `next-${quest.id}`,
      title: nextTitle,
      difficulty: nextDiff,
      xpReward: nextXP,
    },
    recommendedPath: `${quest.category} Mastery Path`,
    newLevelInfo,
  };
}
