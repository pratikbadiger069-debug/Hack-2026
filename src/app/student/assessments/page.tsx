'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { useAppStore } from '@/lib/store';
import { LearningQuest } from '@/types';
import { getLevelInfo, evaluateAssessmentReport, AssessmentResultReport } from '@/lib/xp-engine';
import {
  CheckCircle2,
  Lock,
  Play,
  X,
  ArrowRight,
  Sparkles,
  Code2,
  Database,
  Cloud,
  Brain,
  ShieldAlert,
  MessageSquare,
  Cpu,
  Flame,
  Zap,
  Trophy,
  Award,
  ChevronRight,
  TrendingUp,
  RotateCcw,
  Compass,
} from 'lucide-react';

export default function StudentAssessmentsPage() {
  const { quests, learningPaths, completeQuest, xp, streakDays } = useAppStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [activeQuest, setActiveQuest] = useState<LearningQuest | null>(null);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [assessmentReport, setAssessmentReport] = useState<AssessmentResultReport | null>(null);

  const levelInfo = getLevelInfo(xp);

  const categories = [
    'All',
    'Backend',
    'Frontend',
    'AI & ML',
    'Data Science',
    'Cloud',
    'Cybersecurity',
    'Problem Solving',
    'Aptitude',
    'Communication',
  ];

  const difficulties = [
    { id: 'All', label: 'All Difficulties' },
    { id: 'Easy', label: 'Easy (10 XP)' },
    { id: 'Medium', label: 'Medium (25 XP)' },
    { id: 'Advanced', label: 'Advanced (50 XP)' },
    { id: 'Expert', label: 'Expert (100 XP)' },
    { id: 'Boss', label: 'Boss (250–500 XP)' },
  ];

  const filteredQuests = quests.filter((q) => {
    const matchCategory =
      selectedCategory === 'All' ||
      q.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
      (selectedCategory === 'Backend' && q.category === 'Database') ||
      (selectedCategory === 'Backend' && q.category === 'DevOps') ||
      (selectedCategory === 'Backend' && q.category === 'Systems');

    const matchDifficulty =
      selectedDifficulty === 'All' || q.difficulty === selectedDifficulty;

    return matchCategory && matchDifficulty;
  });

  const handleStartChallenge = (quest: LearningQuest) => {
    setActiveQuest(quest);
    setCurrentQIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setCorrectCount(0);
    setAssessmentReport(null);
  };

  const handleOptionSelect = (optIdx: number, isCorrect: boolean) => {
    if (showExplanation) return;
    setSelectedAnswer(optIdx);
    setShowExplanation(true);
    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
    }
  };

  const handleNextOrFinish = () => {
    if (!activeQuest || !activeQuest.questions) return;

    if (currentQIndex < activeQuest.questions.length - 1) {
      setCurrentQIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      // Calculate final correct count including current question
      const totalQ = activeQuest.questions.length;
      const finalReport = evaluateAssessmentReport(
        activeQuest,
        correctCount,
        totalQ,
        xp
      );
      completeQuest(activeQuest.id);
      setAssessmentReport(finalReport);
    }
  };

  return (
    <PortalLayout>
      <div className="space-y-8 max-w-[1240px] mx-auto pb-16">
        {/* Top Header & Live Builder Level Progress HUD */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-[#E6E4DD] dark:border-[#2D333B]"
        >
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-medium text-blue-600 dark:text-blue-400">
                Gamified Competency Engine
              </span>
            </div>
            <h1 className="text-2xl font-semibold text-[#1F2328] dark:text-[#F0F6FC] tracking-tight mt-0.5">
              Skill Assessments &amp; Learning Paths
            </h1>
            <p className="text-xs text-[#656D76] dark:text-[#8B949E] mt-0.5">
              Complete adaptive engineering challenges, defeat boss milestones, and earn verifiable builder XP.
            </p>
          </div>

          {/* Builder XP & Level HUD */}
          <div className="p-3.5 bg-white dark:bg-[#161B22] rounded-xl border border-[#E6E4DD] dark:border-[#2D333B] flex items-center gap-4 text-xs shadow-2xs">
            <div className="space-y-1">
              <div className="flex items-center justify-between gap-3 text-[11px]">
                <span className="font-semibold text-[#1F2328] dark:text-[#F0F6FC]">
                  Level {levelInfo.level} {levelInfo.title}
                </span>
                <span className="font-mono text-[#656D76] dark:text-[#8B949E]">
                  {xp} / {levelInfo.nextLevelTargetXP} XP
                </span>
              </div>
              <div className="w-48 bg-[#E6E4DD] dark:bg-[#2D333B] rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-blue-600 dark:bg-blue-400 h-full progress-fill"
                  style={{ width: `${levelInfo.progressPercent}%` }}
                />
              </div>
              <div className="text-[10px] text-[#8C959F] dark:text-[#6E7681] font-mono">
                {levelInfo.xpRemaining} XP remaining to Level {levelInfo.level + 1}
              </div>
            </div>

            <div className="pl-3 border-l border-[#E6E4DD] dark:border-[#2D333B] flex flex-col items-center">
              <span className="text-sm font-semibold text-orange-600 dark:text-orange-400 flex items-center gap-1 font-mono">
                <Flame className="w-3.5 h-3.5 text-orange-500" />
                {streakDays}d
              </span>
              <span className="text-[10px] text-[#8C959F] dark:text-[#6E7681]">Streak (+50 XP)</span>
            </div>
          </div>
        </motion.div>

        {/* 1. BOSS CHALLENGES ARENA (Special High-Stakes Milestones) */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-500" />
              <h2 className="text-sm font-semibold text-[#1F2328] dark:text-[#F0F6FC]">
                Boss Challenges (Portfolio Milestones)
              </h2>
            </div>
            <span className="text-xs font-mono text-amber-600 dark:text-amber-400 font-medium">
              Earn +250 to +500 XP
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quests
              .filter((q) => q.isBossChallenge)
              .map((boss) => (
                <div
                  key={boss.id}
                  className="p-5 bg-white dark:bg-[#161B22] rounded-xl border border-amber-200/70 dark:border-amber-900/40 space-y-3 flex flex-col justify-between shadow-xs"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 font-semibold">
                        Boss Challenge
                      </span>
                      <span className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400">
                        +{boss.xpReward} XP
                      </span>
                    </div>

                    <h3 className="text-sm font-semibold text-[#1F2328] dark:text-[#F0F6FC]">
                      {boss.title}
                    </h3>

                    <p className="text-xs text-[#656D76] dark:text-[#8B949E] leading-relaxed">
                      {boss.description}
                    </p>

                    {boss.portfolioImpact && (
                      <div className="text-[11px] text-emerald-700 dark:text-emerald-300 flex items-center gap-1 font-medium pt-1">
                        <Award className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span>{boss.portfolioImpact}</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-[#E6E4DD] dark:border-[#2D333B] flex items-center justify-between text-xs">
                    <span className="text-[#8C959F] dark:text-[#6E7681] font-mono text-[11px]">
                      Est. {boss.estimatedMinutes} mins
                    </span>

                    {boss.completed ? (
                      <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Boss Defeated</span>
                      </span>
                    ) : (
                      <button
                        onClick={() => handleStartChallenge(boss)}
                        className="px-3.5 py-1.5 bg-[#1F2328] dark:bg-[#F0F6FC] text-white dark:text-[#0F1115] rounded-lg text-xs font-medium hover:bg-black dark:hover:bg-white transition-colors flex items-center gap-1.5"
                      >
                        <Play className="w-3 h-3 fill-current" />
                        <span>Start Challenge</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </section>

        {/* 2. STRUCTURED LEARNING PATHS (All 9 Engineering & Soft Skill Tracks) */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-[#1F2328] dark:text-[#F0F6FC]">
              Career Learning Pathways
            </h2>
            <span className="text-xs text-[#656D76] dark:text-[#8B949E] font-mono">
              9 Tracks Available
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {learningPaths.map((path) => (
              <div
                key={path.id}
                className="p-4 bg-white dark:bg-[#161B22] rounded-xl border border-[#E6E4DD] dark:border-[#2D333B] space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-[#656D76] dark:text-[#8B949E] uppercase">
                      {path.targetRole}
                    </span>
                    <span className="text-[11px] font-mono px-1.5 py-0.2 rounded bg-[#FAF9F5] dark:bg-[#0F1115] border border-[#E6E4DD] dark:border-[#2D333B] text-[#1F2328] dark:text-[#F0F6FC]">
                      {path.completedSteps}/{path.totalSteps} Steps
                    </span>
                  </div>

                  <h3 className="text-xs font-semibold text-[#1F2328] dark:text-[#F0F6FC]">
                    {path.title}
                  </h3>

                  <p className="text-[11px] text-[#656D76] dark:text-[#8B949E] line-clamp-2 leading-relaxed">
                    {path.description}
                  </p>
                </div>

                {/* Stepper overview */}
                <div className="space-y-1 pt-2 border-t border-[#E6E4DD] dark:border-[#2D333B]">
                  {path.steps.slice(0, 3).map((step) => (
                    <div
                      key={step.id}
                      className="flex items-center justify-between text-[11px] text-[#656D76] dark:text-[#8B949E]"
                    >
                      <div className="flex items-center gap-1.5 truncate">
                        <span className="w-3.5 h-3.5 rounded-full flex items-center justify-center font-mono text-[9px] bg-[#FAF9F5] dark:bg-[#0F1115] border border-[#E6E4DD] dark:border-[#2D333B]">
                          {step.stepNumber}
                        </span>
                        <span className="truncate">{step.title}</span>
                      </div>
                      <span className="font-mono text-[10px] ml-1 shrink-0">
                        +{step.xpReward} XP
                      </span>
                    </div>
                  ))}
                  {path.steps.length > 3 && (
                    <div className="text-[10px] text-blue-600 dark:text-blue-400 font-mono pt-0.5">
                      +{path.steps.length - 3} more progressive modules
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. CHALLENGES EXPLORER */}
        <section className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <h2 className="text-sm font-semibold text-[#1F2328] dark:text-[#F0F6FC]">
              Domain Challenges Arena
            </h2>

            {/* Category Filter */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-1 rounded-md text-xs whitespace-nowrap transition-colors ${
                    selectedCategory === cat
                      ? 'bg-[#1F2328] dark:bg-[#F0F6FC] text-white dark:text-[#0F1115] font-medium'
                      : 'text-[#656D76] dark:text-[#8B949E] hover:text-[#1F2328] dark:hover:text-[#F0F6FC] hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {difficulties.map((diff) => (
              <button
                key={diff.id}
                onClick={() => setSelectedDifficulty(diff.id)}
                className={`px-2.5 py-0.5 rounded text-[11px] font-mono whitespace-nowrap transition-colors ${
                  selectedDifficulty === diff.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-[#161B22] border border-[#E6E4DD] dark:border-[#2D333B] text-[#656D76] dark:text-[#8B949E]'
                }`}
              >
                {diff.label}
              </button>
            ))}
          </div>

          {/* Challenges Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {filteredQuests.map((quest) => (
              <div
                key={quest.id}
                className="p-4 bg-white dark:bg-[#161B22] rounded-xl border border-[#E6E4DD] dark:border-[#2D333B] flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-mono text-[#656D76] dark:text-[#8B949E] uppercase">
                      {quest.category}
                    </span>
                    <span className="font-mono text-[#1F2328] dark:text-[#F0F6FC] px-1.5 py-0.2 rounded bg-[#FAF9F5] dark:bg-[#0F1115] border border-[#E6E4DD] dark:border-[#2D333B]">
                      {quest.difficulty}
                    </span>
                  </div>

                  <h3 className="font-semibold text-xs text-[#1F2328] dark:text-[#F0F6FC]">
                    {quest.title}
                  </h3>

                  <p className="text-[11px] text-[#656D76] dark:text-[#8B949E] line-clamp-2 leading-relaxed">
                    {quest.description}
                  </p>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {quest.skillsGained.map((s) => (
                      <span
                        key={s}
                        className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#FAF9F5] dark:bg-[#0F1115] border border-[#E6E4DD] dark:border-[#2D333B] text-[#656D76] dark:text-[#8B949E]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2.5 border-t border-[#E6E4DD] dark:border-[#2D333B] flex items-center justify-between text-xs">
                  <span className="font-mono text-[11px] text-blue-600 dark:text-blue-400 font-semibold">
                    +{quest.xpReward} XP
                  </span>

                  {quest.completed ? (
                    <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Completed</span>
                    </span>
                  ) : (
                    <button
                      onClick={() => handleStartChallenge(quest)}
                      className="px-3 py-1 bg-[#1F2328] dark:bg-[#F0F6FC] text-white dark:text-[#0F1115] rounded-md text-xs font-medium hover:bg-black dark:hover:bg-white transition-colors flex items-center gap-1"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>Start Challenge</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ADAPTIVE CHALLENGE RUNNER & POST-ASSESSMENT REPORT MODAL */}
      {activeQuest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg bg-white dark:bg-[#161B22] rounded-xl border border-[#E6E4DD] dark:border-[#2D333B] overflow-hidden shadow-xl text-xs">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-[#E6E4DD] dark:border-[#2D333B] bg-[#FAF9F5] dark:bg-[#0F1115]">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-xs text-[#1F2328] dark:text-[#F0F6FC]">
                  {activeQuest.title}
                </span>
                <span className="font-mono text-[10px] text-blue-600 dark:text-blue-400">
                  (+{activeQuest.xpReward} XP)
                </span>
              </div>
              <button
                onClick={() => setActiveQuest(null)}
                className="text-[#8C959F] hover:text-[#1F2328] dark:hover:text-[#F0F6FC]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {!assessmentReport ? (
              /* Active Question View */
              <div className="p-5 space-y-4">
                {activeQuest.questions && activeQuest.questions[currentQIndex] ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-[11px] text-[#656D76] dark:text-[#8B949E]">
                      <span>
                        Question {currentQIndex + 1} of {activeQuest.questions.length}
                      </span>
                      <span className="font-mono">{activeQuest.difficulty} Tier</span>
                    </div>

                    <div className="font-medium text-[#1F2328] dark:text-[#F0F6FC] leading-relaxed">
                      {activeQuest.questions[currentQIndex].question}
                    </div>

                    {activeQuest.questions[currentQIndex].codeSnippet && (
                      <pre className="p-3 bg-[#0F1115] text-[#F0F6FC] rounded-lg text-[11px] font-mono overflow-x-auto border border-[#2D333B] leading-relaxed">
                        {activeQuest.questions[currentQIndex].codeSnippet}
                      </pre>
                    )}

                    <div className="space-y-1.5">
                      {activeQuest.questions[currentQIndex].options.map((opt, idx) => {
                        const isSelected = selectedAnswer === idx;
                        const isCorrect = opt.correct;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => handleOptionSelect(idx, isCorrect)}
                            className={`w-full p-2.5 rounded-lg border text-left text-xs transition-colors ${
                              showExplanation
                                ? isCorrect
                                  ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-medium'
                                  : isSelected
                                  ? 'bg-rose-50 dark:bg-rose-950/30 border-rose-500 text-rose-900 dark:text-rose-200'
                                  : 'bg-[#FAF9F5] dark:bg-[#0F1115] border-[#E6E4DD] dark:border-[#2D333B] opacity-50'
                                : isSelected
                                ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/30 text-[#1F2328] dark:text-[#F0F6FC]'
                                : 'bg-white dark:bg-[#161B22] border-[#E6E4DD] dark:border-[#2D333B] text-[#1F2328] dark:text-[#F0F6FC] hover:border-gray-400'
                            }`}
                          >
                            <span className="font-mono text-[11px] text-[#656D76] dark:text-[#8B949E] mr-2">
                              {String.fromCharCode(65 + idx)}.
                            </span>
                            {opt.text}
                          </button>
                        );
                      })}
                    </div>

                    {showExplanation && (
                      <div className="p-3 bg-blue-50/50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800/40 text-[11px] text-[#1F2328] dark:text-[#F0F6FC] leading-relaxed">
                        <strong className="text-blue-600 dark:text-blue-400 block mb-0.5 font-medium">
                          Analysis &amp; Explanation:
                        </strong>
                        {activeQuest.questions[currentQIndex].explanation}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-6 text-xs text-[#656D76] dark:text-[#8B949E]">
                    Challenge initialized.
                  </div>
                )}

                <div className="flex items-center justify-between pt-3 border-t border-[#E6E4DD] dark:border-[#2D333B]">
                  <span className="text-[11px] text-[#8C959F] dark:text-[#6E7681]">
                    {showExplanation ? 'Review feedback and continue' : 'Select an answer'}
                  </span>
                  <button
                    type="button"
                    onClick={handleNextOrFinish}
                    disabled={selectedAnswer === null}
                    className="px-4 py-1.5 bg-[#1F2328] dark:bg-[#F0F6FC] disabled:opacity-40 text-white dark:text-[#0F1115] rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors"
                  >
                    <span>
                      {currentQIndex < (activeQuest.questions?.length || 1) - 1
                        ? 'Next Question'
                        : 'Complete Challenge'}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              /* Comprehensive Post-Assessment Report View */
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#E6E4DD] dark:border-[#2D333B]">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[#1F2328] dark:text-[#F0F6FC]">
                        Challenge Completed
                      </h4>
                      <span className="text-[11px] text-[#656D76] dark:text-[#8B949E]">
                        Score: {assessmentReport.scorePercentage}% Accuracy
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-sm font-mono font-bold text-blue-600 dark:text-blue-400">
                      +{assessmentReport.xpEarned} XP
                    </span>
                    <span className="text-[10px] text-[#8C959F] dark:text-[#6E7681] block">Earned</span>
                  </div>
                </div>

                {/* Level Progress */}
                <div className="p-3 bg-[#FAF9F5] dark:bg-[#0F1115] rounded-lg border border-[#E6E4DD] dark:border-[#2D333B] space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#1F2328] dark:text-[#F0F6FC]">
                      Level {assessmentReport.newLevelInfo.level} {assessmentReport.newLevelInfo.title}
                    </span>
                    <span className="font-mono text-[#656D76] dark:text-[#8B949E] text-[11px]">
                      {assessmentReport.newLevelInfo.progressPercent}% to Level {assessmentReport.newLevelInfo.level + 1}
                    </span>
                  </div>
                  <div className="w-full bg-[#E6E4DD] dark:bg-[#2D333B] rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-blue-600 dark:bg-blue-400 h-full progress-fill"
                      style={{ width: `${assessmentReport.newLevelInfo.progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* Diagnostic Findings */}
                <div className="space-y-2 text-xs">
                  {assessmentReport.strengths.length > 0 && (
                    <div>
                      <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 uppercase block mb-0.5">
                        Verified Strengths:
                      </span>
                      <ul className="list-disc list-inside text-[#1F2328] dark:text-[#F0F6FC] text-[11px] space-y-0.5">
                        {assessmentReport.strengths.map((st, i) => (
                          <li key={i}>{st}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {assessmentReport.weakAreas.length > 0 && (
                    <div>
                      <span className="text-[10px] font-mono text-orange-600 dark:text-orange-400 uppercase block mb-0.5">
                        Recommended Improvement Areas:
                      </span>
                      <ul className="list-disc list-inside text-[#656D76] dark:text-[#8B949E] text-[11px] space-y-0.5">
                        {assessmentReport.weakAreas.map((w, i) => (
                          <li key={i}>{w}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Recommended Next Step */}
                <div className="p-3 bg-blue-50/40 dark:bg-blue-950/20 rounded-lg border border-blue-200/60 dark:border-blue-800/40 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] font-mono text-blue-600 dark:text-blue-400 uppercase block">
                      Recommended Next Challenge:
                    </span>
                    <strong className="text-xs text-[#1F2328] dark:text-[#F0F6FC]">
                      {assessmentReport.recommendedNextChallenge.title}
                    </strong>
                  </div>
                  <span className="text-[11px] font-mono font-semibold text-blue-600 dark:text-blue-400">
                    +{assessmentReport.recommendedNextChallenge.xpReward} XP
                  </span>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => setActiveQuest(null)}
                    className="px-4 py-2 bg-[#1F2328] dark:bg-[#F0F6FC] text-white dark:text-[#0F1115] rounded-lg text-xs font-medium transition-colors"
                  >
                    Continue to Dashboard
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </PortalLayout>
  );
}
