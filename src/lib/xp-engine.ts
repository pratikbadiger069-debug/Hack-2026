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

/**
 * Calculates level, title, progress percent, rank, and XP remaining.
 * Strict mathematical curve:
 * Level 1: 0 - 99 XP (Explorer)
 * Level 2: 100 - 249 XP
 * Level 3: 250 - 449 XP
 * Level 4: 450 - 699 XP
 * Level L: requires base XP + incremental per level
 */
export function getLevelInfo(totalXP: number): LevelInfo {
  const safeXP = Math.max(0, Math.floor(totalXP || 0));

  let level = 1;
  let currentMin = 0;
  let nextTarget = 100;

  while (safeXP >= nextTarget) {
    level++;
    currentMin = nextTarget;
    const step = 100 + (level - 1) * 50;
    nextTarget = currentMin + step;
  }

  const range = nextTarget - currentMin;
  const inLevelXP = safeXP - currentMin;
  const progressPercent = Math.min(100, Math.max(0, Math.round((inLevelXP / range) * 100)));
  const xpRemaining = nextTarget - safeXP;
  const rank = Math.max(1, Math.round(150 - (level * 2.2)));

  // Builder Titles
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
  passThreshold: number; // e.g. 60, 70, 75, 80
  passPercent: number;
  baseXP: number; // 10, 25, 50, 100, 250, 500
  attemptLimit: number; // Infinity for unlimited, or 3, 2, 1
  description: string;
}

export const DIFFICULTY_RULES: Record<string, DifficultyRule> = {
  Easy: {
    passThreshold: 60,
    passPercent: 60,
    baseXP: 10,
    attemptLimit: Infinity, // Unlimited
    description: 'Foundations & Core Syntax',
  },
  Medium: {
    passThreshold: 70,
    passPercent: 70,
    baseXP: 25,
    attemptLimit: 3, // 3 Attempts
    description: 'Intermediate Concepts & Concurrency',
  },
  Advanced: {
    passThreshold: 75,
    passPercent: 75,
    baseXP: 50,
    attemptLimit: 2, // 2 Attempts
    description: 'Industry Level & Architecture',
  },
  Expert: {
    passThreshold: 80,
    passPercent: 80,
    baseXP: 100,
    attemptLimit: 1, // 1 Attempt Weekly
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
 * Strict rules:
 * Score >= 90% -> 100% of base XP
 * Score >= 80% -> 80% of base XP
 * Score >= 70% -> 60% of base XP
 * Score >= 60% -> 40% of base XP (if >= pass threshold)
 * Score < Pass Threshold -> 0 XP (Nothing awarded for failing)
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

/**
 * Anti-cheat analysis to detect rapid answer abuse, random clicking, or pattern exploitation
 */
export function analyzeAttemptIntegrity(
  totalQuestions: number,
  timeElapsedSec: number,
  answerPattern: number[]
): AntiCheatDiagnostics {
  const avgTime = totalQuestions > 0 ? timeElapsedSec / totalQuestions : 0;

  // If student spends less than 2.0s per question on average
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

/**
 * Generates strict post-assessment diagnostic report
 */
export function generateStrictAssessmentReport(
  quest: { id: string; title: string; category?: string; difficulty?: string; xpReward?: number; skillCategory?: string },
  answersLogOrCount: { isCorrect: boolean; timeTakenMs?: number; topic?: string }[] | number,
  currentXPOrTotalQ?: number,
  maybeTime?: number,
  maybeXP?: number
): StrictAssessmentReport {
  let correctCount = 0;
  let totalQuestions = 1;
  let timeElapsedSec = 10;
  let currentXP = 0;
  let topicFailures: string[] = [];

  const category = quest.category || quest.skillCategory || 'Engineering';
  const difficulty = quest.difficulty || 'Medium';
  const xpReward = quest.xpReward || 25;

  if (Array.isArray(answersLogOrCount)) {
    totalQuestions = Math.max(1, answersLogOrCount.length);
    correctCount = answersLogOrCount.filter((a) => a.isCorrect).length;
    const totalMs = answersLogOrCount.reduce((acc, a) => acc + (a.timeTakenMs || 3000), 0);
    timeElapsedSec = Math.max(1, totalMs / 1000);
    currentXP = currentXPOrTotalQ || 0;
    topicFailures = answersLogOrCount.filter((a) => !a.isCorrect && a.topic).map((a) => a.topic as string);
  } else {
    correctCount = answersLogOrCount;
    totalQuestions = Math.max(1, currentXPOrTotalQ || 1);
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

  // Confidence Score
  let confidenceScore = scorePercentage;
  if (antiCheat.flagged) {
    confidenceScore = Math.max(10, confidenceScore - antiCheat.confidencePenaltyPercent);
  }

  // Strengths & Weaknesses
  const strengths: string[] = [];
  const weakAreas: string[] = [];
  const missingConcepts: string[] = [];

  if (topicFailures.length > 0) {
    weakAreas.push(...Array.from(new Set(topicFailures)));
  }

  if (scorePercentage >= 80) {
    strengths.push(`Advanced architectural patterns in ${category}`);
    strengths.push('High-throughput async execution & error mitigation');
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
      title: `${category} Engineering Standard Documentation`,
      type: 'Documentation',
      url: 'https://developer.mozilla.org',
    },
    {
      title: 'Distributed Architecture Best Practices',
      type: 'Whitepaper',
      url: 'https://martinfowler.com',
    },
  ];

  let nextTitle = `${category} Intermediate Concepts`;
  let nextDiff = 'Medium';
  let nextXP = 25;

  if (difficulty === 'Easy') {
    nextTitle = `${category} Intermediate Concepts`;
    nextDiff = 'Medium';
    nextXP = 25;
  } else if (difficulty === 'Medium') {
    nextTitle = `${category} Industry Level Challenge`;
    nextDiff = 'Advanced';
    nextXP = 50;
  } else if (difficulty === 'Advanced') {
    nextTitle = `${category} Real-World Systems Challenge`;
    nextDiff = 'Expert';
    nextXP = 100;
  } else {
    nextTitle = `Boss Challenge: ${category} Enterprise Capstone`;
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
    builderScoreImpact: xpCalc.passed ? 8 : 0,
    careerReadinessImpact: xpCalc.passed ? 4 : 0,
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
 * Transparent Builder Score Calculation Formula:
 * 30% Assessments + 30% Projects + 20% GitHub + 10% Consistency + 10% Challenges
 */
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
  consistencyScore?: number;
  challengesScore?: number;
}): {
  totalScore: number;
  overallScore: number;
  breakdown: BuilderScoreBreakdownItem[];
  scores: {
    assessments: number;
    projects: number;
    github: number;
    consistency: number;
    challenges: number;
  };
} {
  const assessScore = metrics.assessmentsScore ?? Math.min(100, (metrics.verifiedSkillsCount || 6) * 15 + 10);
  const projScore = metrics.projectsScore ?? Math.min(100, (metrics.projectsCount || 2) * 45);
  const gitScore = metrics.githubScore ?? (metrics.githubConnected ? Math.min(100, 50 + (metrics.githubReposCount || 4) * 12) : 20);
  const consScore = metrics.consistencyScore ?? Math.min(100, (metrics.consistencyStreakDays || 7) * 12 + 16);
  const chalScore = metrics.challengesScore ?? Math.min(100, (metrics.completedChallengesCount || 5) * 18 + 10);

  const aVal = Math.round(assessScore * 3.0); // 300 max
  const pVal = Math.round(projScore * 3.0); // 300 max
  const gVal = Math.round(gitScore * 2.0); // 200 max
  const cVal = Math.round(consScore * 1.0); // 100 max
  const chVal = Math.round(chalScore * 1.0); // 100 max

  const totalScore = Math.min(1000, aVal + pVal + gVal + cVal + chVal);

  const breakdown: BuilderScoreBreakdownItem[] = [
    {
      pillar: 'Verified Assessments',
      score: aVal,
      maxScore: 300,
      weightPercent: 30,
      description: 'Strict proctored MCQs & debugging test cases',
    },
    {
      pillar: 'Verified Projects',
      score: pVal,
      maxScore: 300,
      weightPercent: 30,
      description: 'Production implementations & peer-reviewed code',
    },
    {
      pillar: 'GitHub Proof of Work',
      score: gVal,
      maxScore: 200,
      weightPercent: 20,
      description: 'Active repositories, stars, and commit density',
    },
    {
      pillar: 'Daily Consistency',
      score: cVal,
      maxScore: 100,
      weightPercent: 10,
      description: 'Active builder streak and weekly cadence',
    },
    {
      pillar: 'Challenge Milestones',
      score: chVal,
      maxScore: 100,
      weightPercent: 10,
      description: 'Track progression and boss final exams',
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
      consistency: cVal,
      challenges: chVal,
    },
  };
}

/**
 * Shuffles an array in place using Fisher-Yates algorithm
 */
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
