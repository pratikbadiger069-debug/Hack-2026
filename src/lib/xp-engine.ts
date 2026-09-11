import { BuilderLevelTitle } from '@/types';

export interface LevelInfo {
  level: number;
  title: BuilderLevelTitle;
  rank: number;
  currentLevelMinXP: number;
  nextLevelTargetXP: number;
  progressPercent: number;
  xpRemaining: number;
  currentLevelProgress: number;
  nextLevelXP: number;
  percentToNext: number;
}

export const BUILDER_LEVEL_THRESHOLDS: { title: BuilderLevelTitle; minXP: number; nextXP: number; level: number }[] = [
  { level: 1, title: 'Explorer', minXP: 0, nextXP: 100 },
  { level: 2, title: 'Builder', minXP: 100, nextXP: 250 },
  { level: 3, title: 'Creator', minXP: 250, nextXP: 500 },
  { level: 4, title: 'Architect', minXP: 500, nextXP: 1000 },
  { level: 5, title: 'Innovator', minXP: 1000, nextXP: 2000 },
  { level: 6, title: 'Elite Builder', minXP: 2000, nextXP: 3500 },
  { level: 7, title: 'Industry Ready', minXP: 3500, nextXP: 5000 },
];

/**
 * Calculates level, title, progress percent, rank, and XP remaining according to SkillBridge specifications.
 * Levels:
 * Explorer: 0 XP
 * Builder: 100 XP
 * Creator: 250 XP
 * Architect: 500 XP
 * Innovator: 1000 XP
 * Elite Builder: 2000 XP
 * Industry Ready: 3500 XP
 */
export function getLevelInfo(totalXP: number): LevelInfo {
  const safeXP = Math.max(0, Math.floor(totalXP || 0));

  let matched = BUILDER_LEVEL_THRESHOLDS[0];
  for (let i = BUILDER_LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (safeXP >= BUILDER_LEVEL_THRESHOLDS[i].minXP) {
      matched = BUILDER_LEVEL_THRESHOLDS[i];
      break;
    }
  }

  const currentMin = matched.minXP;
  const nextTarget = matched.nextXP;
  const range = nextTarget - currentMin;
  const inLevelXP = Math.min(range, safeXP - currentMin);
  const progressPercent = Math.min(100, Math.max(0, Math.round((inLevelXP / range) * 100)));
  const xpRemaining = Math.max(0, nextTarget - safeXP);
  const rank = Math.max(1, Math.round(150 - (matched.level * 18)));

  return {
    level: matched.level,
    title: matched.title,
    rank,
    currentLevelMinXP: currentMin,
    nextLevelTargetXP: nextTarget,
    progressPercent,
    xpRemaining,
    currentLevelProgress: inLevelXP,
    nextLevelXP: range,
    percentToNext: progressPercent,
  };
}

export interface DifficultyRule {
  passThreshold: number;
  passPercent: number;
  baseXP: number;
  attemptLimit: number;
  description: string;
}

export const DIFFICULTY_RULES: Record<string, DifficultyRule> = {
  Easy: {
    passThreshold: 60,
    passPercent: 60,
    baseXP: 10,
    attemptLimit: Infinity,
    description: 'Foundations & Core Syntax',
  },
  Medium: {
    passThreshold: 70,
    passPercent: 70,
    baseXP: 25,
    attemptLimit: 3,
    description: 'Intermediate Concepts & Concurrency',
  },
  Advanced: {
    passThreshold: 75,
    passPercent: 75,
    baseXP: 50,
    attemptLimit: 2,
    description: 'Industry Level & Architecture',
  },
  Expert: {
    passThreshold: 80,
    passPercent: 80,
    baseXP: 100,
    attemptLimit: 1,
    description: 'Real-World Systems & Distributed Paradigms',
  },
  Boss: {
    passThreshold: 80,
    passPercent: 80,
    baseXP: 250,
    attemptLimit: 1,
    description: 'Portfolio Capstone & Industry Fast-Track',
  },
};

/**
 * Calculates Partial XP based on user score and pass thresholds.
 */
export function calculateEarnedXP(scorePercentage: number, difficulty: string, customBaseXP?: number): {
  earnedXP: number;
  passed: boolean;
  passThreshold: number;
  multiplierText: string;
} {
  const rule = DIFFICULTY_RULES[difficulty] || DIFFICULTY_RULES.Medium;
  const passThreshold = rule.passThreshold;
  const maxXP = customBaseXP || rule.baseXP;

  if (scorePercentage < passThreshold) {
    return {
      earnedXP: 0,
      passed: false,
      passThreshold,
      multiplierText: '0% (Failed threshold)',
    };
  }

  let multiplier = 0.4;
  let multiplierText = '40%';

  if (scorePercentage >= 90) {
    multiplier = 1.0;
    multiplierText = '100% (High Distinction)';
  } else if (scorePercentage >= 80) {
    multiplier = 0.8;
    multiplierText = '80% (Distinction)';
  } else if (scorePercentage >= 70) {
    multiplier = 0.6;
    multiplierText = '60% (Competent)';
  } else if (scorePercentage >= 60) {
    multiplier = 0.4;
    multiplierText = '40% (Pass)';
  }

  const earnedXP = Math.round(maxXP * multiplier);

  return {
    earnedXP,
    passed: true,
    passThreshold,
    multiplierText,
  };
}

export interface AntiCheatDiagnostics {
  flagged: boolean;
  reason?: string;
  averageTimePerQuestionSec: number;
  confidencePenaltyPercent: number;
}

export function analyzeAttemptIntegrity(
  totalQuestions: number,
  timeElapsedSec: number,
  answerPattern: number[]
): AntiCheatDiagnostics {
  const avgTime = totalQuestions > 0 ? timeElapsedSec / totalQuestions : 0;

  if (avgTime < 2.0 && totalQuestions >= 2) {
    return {
      flagged: true,
      reason: 'Abnormally fast completion detected (< 2.0s/question). Attempt flagged for review.',
      averageTimePerQuestionSec: avgTime,
      confidencePenaltyPercent: 40,
    };
  }

  return {
    flagged: false,
    averageTimePerQuestionSec: avgTime,
    confidencePenaltyPercent: 0,
  };
}

export interface StrictAssessmentReport {
  questId: string;
  questTitle: string;
  category: string;
  difficulty: string;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  questionsCorrect: number;
  questionsIncorrect: number;
  finalScore: number;
  scorePercentage: number;
  passed: boolean;
  passThreshold: number;
  xpEarned: number;
  multiplierText: string;
  skillConfidenceScore: number;
  confidenceScore: number;
  antiCheatFlagged: boolean;
  antiCheat: AntiCheatDiagnostics;
  strengths: string[];
  weakAreas: string[];
  missingConcepts: string[];
  recommendedResources: { title: string; type: string; url: string }[];
  suggestedNextChallenge: string;
  recommendedNextChallenge: {
    id: string;
    title: string;
    difficulty: string;
    xpReward: number;
  };
  builderScoreImpact: number;
  careerReadinessImpact: number;
  newLevelInfo: LevelInfo;
}

export function generateStrictAssessmentReport(
  quest: { id: string; title: string; category?: string; difficulty?: string; xpReward?: number; skillCategory?: string },
  answersLogOrCount: { isCorrect: boolean; timeTakenMs?: number; topic?: string }[] | number,
  currentXPOrTotalQ?: number,
  maybeTime?: number,
  maybeXP?: number
): StrictAssessmentReport {
  let correctCount = 0;
  let totalQuestions = 10;
  let timeElapsedSec = 10;
  let currentXP = 0;
  let topicFailures: string[] = [];

  const category = quest.category || quest.skillCategory || 'Engineering';
  const difficulty = quest.difficulty || 'Medium';
  const xpReward = quest.xpReward || 50;

  if (Array.isArray(answersLogOrCount)) {
    totalQuestions = Math.max(1, answersLogOrCount.length);
    correctCount = answersLogOrCount.filter((a) => a.isCorrect).length;
    const totalMs = answersLogOrCount.reduce((acc, a) => acc + (a.timeTakenMs || 3000), 0);
    timeElapsedSec = Math.max(1, totalMs / 1000);
    currentXP = currentXPOrTotalQ || 0;
    topicFailures = answersLogOrCount.filter((a) => !a.isCorrect && a.topic).map((a) => a.topic as string);
  } else {
    correctCount = answersLogOrCount;
    totalQuestions = Math.max(1, currentXPOrTotalQ || 10);
    timeElapsedSec = maybeTime || 15;
    currentXP = maybeXP || 0;
  }

  const incorrectCount = Math.max(0, totalQuestions - correctCount);
  const scorePercentage = Math.round((correctCount / totalQuestions) * 100);

  const antiCheat = analyzeAttemptIntegrity(totalQuestions, timeElapsedSec, []);
  const xpCalc = antiCheat.flagged
    ? { earnedXP: 0, passed: false, passThreshold: 60, multiplierText: '0% (Flagged by Anti-Cheat)' }
    : calculateEarnedXP(scorePercentage, difficulty, xpReward);

  const newTotalXP = currentXP + xpCalc.earnedXP;
  const newLevelInfo = getLevelInfo(newTotalXP);

  let confidenceScore = scorePercentage;
  if (antiCheat.flagged) {
    confidenceScore = Math.max(10, confidenceScore - antiCheat.confidencePenaltyPercent);
  }

  const strengths: string[] = [];
  const weakAreas: string[] = [];
  const missingConcepts: string[] = [];

  if (topicFailures.length > 0) {
    weakAreas.push(...Array.from(new Set(topicFailures)));
  }

  if (scorePercentage >= 80) {
    strengths.push(`Advanced architectural patterns in ${category}`);
    strengths.push('High-throughput execution & verified problem solving');
  } else if (scorePercentage >= 60) {
    strengths.push(`Core syntactic fundamentals in ${category}`);
    if (weakAreas.length === 0) weakAreas.push('Edge-case failure recovery & distributed scale');
    missingConcepts.push('Memory profiling & connection pool tuning');
  } else {
    if (weakAreas.length === 0) weakAreas.push(`Foundational principles in ${category}`);
    weakAreas.push('Algorithmic time complexity and state lifecycles');
    missingConcepts.push('Core API design & isolation primitives');
  }

  const recommendedResources = [
    {
      title: `${category} Engineering Master Documentation`,
      type: 'Documentation',
      url: 'https://developer.mozilla.org',
    },
    {
      title: 'Distributed System Architecture & Patterns',
      type: 'Whitepaper',
      url: 'https://martinfowler.com',
    },
  ];

  let nextTitle = `${category} Advanced Verification`;
  let nextDiff = 'Advanced';
  let nextXP = 50;

  if (difficulty === 'Easy') {
    nextTitle = `${category} Intermediate Challenge`;
    nextDiff = 'Medium';
    nextXP = 25;
  } else if (difficulty === 'Medium') {
    nextTitle = `${category} Advanced System Challenge`;
    nextDiff = 'Advanced';
    nextXP = 50;
  } else if (difficulty === 'Advanced') {
    nextTitle = `${category} Real-World Expert Challenge`;
    nextDiff = 'Expert';
    nextXP = 100;
  } else {
    nextTitle = `Boss Challenge: ${category} Capstone Defense`;
    nextDiff = 'Boss';
    nextXP = 250;
  }

  return {
    questId: quest.id,
    questTitle: quest.title,
    category,
    difficulty,
    totalQuestions,
    correctAnswers: correctCount,
    incorrectAnswers: incorrectCount,
    questionsCorrect: correctCount,
    questionsIncorrect: incorrectCount,
    finalScore: scorePercentage,
    scorePercentage,
    passed: xpCalc.passed,
    passThreshold: xpCalc.passThreshold,
    xpEarned: xpCalc.earnedXP,
    multiplierText: xpCalc.multiplierText,
    skillConfidenceScore: confidenceScore,
    confidenceScore,
    antiCheatFlagged: antiCheat.flagged,
    antiCheat,
    strengths,
    weakAreas,
    missingConcepts,
    recommendedResources,
    suggestedNextChallenge: nextTitle,
    recommendedNextChallenge: {
      id: `next-${quest.id}`,
      title: nextTitle,
      difficulty: nextDiff,
      xpReward: nextXP,
    },
    builderScoreImpact: xpCalc.passed ? 15 : 0,
    careerReadinessImpact: xpCalc.passed ? 8 : 0,
    newLevelInfo,
  };
}

export interface BuilderScoreBreakdownItem {
  pillar: string;
  score: number;
  maxScore: number;
  weightPercent: number;
  description: string;
}

/**
 * Official SkillBridge Builder Score Formula:
 * Assessments = 30% (300 max)
 * Projects = 30% (300 max)
 * GitHub = 20% (200 max)
 * Consistency = 10% (100 max)
 * Challenges = 10% (100 max)
 * Total: 1000 pts max.
 */
export const calculateBuilderScore = calculateTransparentBuilderScore;
export function calculateTransparentBuilderScore(metrics: {
  verifiedSkillsCount?: number;
  projectsCount?: number;
  githubConnected?: boolean;
  githubReposCount?: number;
  consistencyStreakDays?: number;
  completedChallengesCount?: number;
  assessmentsScore?: number;
  projectsScore?: number;
  githubScore?: number;
  industryChallengesScore?: number;
  consistencyScore?: number;
}): {
  totalScore: number;
  overallScore: number;
  breakdown: BuilderScoreBreakdownItem[];
  scores: {
    assessments: number;
    projects: number;
    github: number;
    challenges: number;
    consistency: number;
  };
} {
  // 1. Assessments (30% -> 300 max)
  const assessRaw = metrics.assessmentsScore ?? Math.min(100, (metrics.verifiedSkillsCount || 6) * 14 + 16);
  const aVal = Math.round((assessRaw / 100) * 300);

  // 2. Projects (30% -> 300 max)
  const projRaw = metrics.projectsScore ?? Math.min(100, (metrics.projectsCount || 2) * 35 + 20);
  const pVal = Math.round((projRaw / 100) * 300);

  // 3. GitHub (20% -> 200 max)
  const gitRaw = metrics.githubScore ?? (metrics.githubConnected ? Math.min(100, 60 + (metrics.githubReposCount || 4) * 10) : 30);
  const gVal = Math.round((gitRaw / 100) * 200);

  // 4. Consistency (10% -> 100 max)
  const consRaw = metrics.consistencyScore ?? Math.min(100, (metrics.consistencyStreakDays || 7) * 12 + 16);
  const cVal = Math.round((consRaw / 100) * 100);

  // 5. Challenges (10% -> 100 max)
  const chalRaw = metrics.industryChallengesScore ?? Math.min(100, (metrics.completedChallengesCount || 4) * 20 + 20);
  const chalVal = Math.round((chalRaw / 100) * 100);

  const totalScore = Math.min(1000, Math.max(100, aVal + pVal + gVal + cVal + chalVal));

  const breakdown: BuilderScoreBreakdownItem[] = [
    {
      pillar: 'Assessments',
      score: aVal,
      maxScore: 300,
      weightPercent: 30,
      description: '30% weight — Verified MCQ benchmarks, coding challenges, and debugging evaluations',
    },
    {
      pillar: 'Projects',
      score: pVal,
      maxScore: 300,
      weightPercent: 30,
      description: '30% weight — Verified production capstones, deployed URLs, and architecture evidence',
    },
    {
      pillar: 'GitHub',
      score: gVal,
      maxScore: 200,
      weightPercent: 20,
      description: '20% weight — Commit density, repository complexity, stars, and open source PRs',
    },
    {
      pillar: 'Consistency',
      score: cVal,
      maxScore: 100,
      weightPercent: 10,
      description: '10% weight — Daily learning streak, active missions, and verification continuity',
    },
    {
      pillar: 'Challenges',
      score: chalVal,
      maxScore: 100,
      weightPercent: 10,
      description: '10% weight — Industry benchmark tests, hackathon participation, and capstone exams',
    },
  ];

  return {
    totalScore,
    overallScore: totalScore,
    breakdown,
    scores: {
      assessments: aVal,
      projects: pVal,
      github: gVal,
      challenges: chalVal,
      consistency: cVal,
    },
  };
}

export interface SkillConfidenceData {
  verifiedScore: number;
  confidenceScore: number;
  evidenceSources: ('Assessment' | 'Project' | 'GitHub' | 'Industry Challenge' | 'Certification')[];
  lastVerifiedDate: string;
  verificationCode: string;
}

export function calculateSkillConfidence(
  baseScore: number,
  sources: ('Assessment' | 'Project' | 'GitHub' | 'Industry Challenge' | 'Certification')[] = ['Assessment']
): SkillConfidenceData {
  const safeScore = Math.min(100, Math.max(0, baseScore));
  const sourceWeight = Math.min(25, sources.length * 7);
  const confidenceScore = Math.min(98, Math.max(70, Math.round(65 + safeScore * 0.15 + sourceWeight)));

  return {
    verifiedScore: safeScore,
    confidenceScore,
    evidenceSources: sources,
    lastVerifiedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
    verificationCode: `SB-${Math.random().toString(36).substring(2, 7).toUpperCase()}-${Math.floor(10000 + Math.random() * 90000)}`,
  };
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
