'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { useAppStore } from '@/lib/store';
import { LearningQuest, LearningPath } from '@/types';
import confetti from 'canvas-confetti';
import {
  Swords,
  Flame,
  CheckCircle2,
  Lock,
  Play,
  X,
  Zap,
  Code,
  ArrowRight,
  Sparkles,
  Trophy,
  Layers,
  ChevronRight,
} from 'lucide-react';

export default function StudentAssessmentsPage() {
  const { quests, learningPaths, completeQuest, streakDays, xp } = useAppStore();
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [activeQuest, setActiveQuest] = useState<LearningQuest | null>(null);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [questFinished, setQuestFinished] = useState(false);

  const difficulties = ['All', 'Easy', 'Medium', 'Advanced', 'Expert'];

  const filteredQuests = quests.filter(
    (q) => selectedDifficulty === 'All' || q.difficulty === selectedDifficulty
  );

  const handleStartQuest = (quest: LearningQuest) => {
    setActiveQuest(quest);
    setCurrentQIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setQuestFinished(false);
  };

  const handleOptionSelect = (optIdx: number) => {
    if (showExplanation) return;
    setSelectedAnswer(optIdx);
    setShowExplanation(true);
  };

  const handleNextOrFinish = () => {
    if (!activeQuest || !activeQuest.questions) return;

    if (currentQIndex < activeQuest.questions.length - 1) {
      setCurrentQIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuestFinished(true);
      completeQuest(activeQuest.id);
      confetti({
        particleCount: 110,
        spread: 80,
        origin: { y: 0.6 },
      });
    }
  };

  return (
    <PortalLayout>
      <div className="space-y-10 max-w-[1300px] mx-auto pb-20">
        {/* Header HUD */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-zinc-200 dark:border-zinc-800"
        >
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">
                Gamified Mastery Arena
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-heading font-black tracking-tight text-zinc-900 dark:text-white mt-1">
              Learning Quests &amp; Paths
            </h1>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-sans">
              Complete quests, earn XP, maintain streaks, and level up your verified builder credentials.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 rounded-2xl streak-pill text-xs font-bold text-orange-600 dark:text-orange-400 shadow-xs">
              <Flame className="w-4 h-4 text-orange-500" />
              <span>🔥 {streakDays} Day Streak (+50 Bonus XP)</span>
            </div>
          </div>
        </motion.section>

        {/* 1. LEARNING JOURNEY PROGRESSION PATHS */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h2 className="text-xl font-heading font-extrabold text-zinc-900 dark:text-white">
                Career Progression Paths
              </h2>
            </div>
            <span className="text-xs font-mono text-zinc-500">Step-by-step game progression</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {learningPaths.map((path) => (
              <motion.div
                key={path.id}
                whileHover={{ scale: 1.01 }}
                className="builder-card p-6 space-y-4 shadow-xs"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase font-bold text-blue-600 dark:text-blue-400">
                      {path.targetRole}
                    </span>
                    <h3 className="text-base font-heading font-bold text-zinc-900 dark:text-white mt-0.5">
                      {path.title}
                    </h3>
                  </div>
                  <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                    {path.completedSteps}/{path.totalSteps} Steps Complete
                  </span>
                </div>

                {/* Progression Stepper */}
                <div className="space-y-2 pt-2">
                  {path.steps.map((step) => (
                    <div
                      key={step.id}
                      className={`p-3 rounded-xl border text-xs flex items-center justify-between transition-all ${
                        step.status === 'completed'
                          ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/40 text-emerald-900 dark:text-emerald-200'
                          : step.status === 'in_progress'
                          ? 'bg-blue-50/60 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800/40 text-blue-900 dark:text-blue-200 font-bold'
                          : 'bg-zinc-50 dark:bg-zinc-900/40 border-zinc-200 dark:border-zinc-800 text-zinc-400 opacity-70'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-5 h-5 rounded-full flex items-center justify-center font-mono text-[11px] font-bold bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                          {step.stepNumber}
                        </span>
                        <span>{step.title}</span>
                      </div>

                      <div className="flex items-center gap-2 font-mono">
                        <span className="text-[10px] text-zinc-500">+{step.xpReward} XP</span>
                        {step.status === 'completed' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                        {step.status === 'in_progress' && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-600 text-white font-bold">
                            Active
                          </span>
                        )}
                        {step.status === 'locked' && <Lock className="w-3.5 h-3.5 text-zinc-400" />}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 2. LEARNING QUESTS ARENA */}
        <section className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Swords className="w-5 h-5 text-orange-500" />
              <h2 className="text-xl font-heading font-extrabold text-zinc-900 dark:text-white">
                Active Learning Quests
              </h2>
            </div>

            {/* Difficulty Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {difficulties.map((diff) => (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-heading font-bold transition-all lift-hover ${
                    selectedDifficulty === diff
                      ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-xs'
                      : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 border border-zinc-200 dark:border-zinc-800'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>

          {/* Quests Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredQuests.map((quest) => (
              <motion.div
                key={quest.id}
                whileHover={{ scale: 1.02 }}
                className="builder-card p-6 flex flex-col justify-between space-y-4 shadow-xs"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase font-bold text-zinc-400">
                      {quest.category}
                    </span>
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                        quest.difficulty === 'Expert'
                          ? 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300'
                          : quest.difficulty === 'Advanced'
                          ? 'bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300'
                          : quest.difficulty === 'Medium'
                          ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300'
                          : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                      }`}
                    >
                      {quest.difficulty}
                    </span>
                  </div>

                  <h3 className="font-heading font-extrabold text-base text-zinc-900 dark:text-white">
                    {quest.title}
                  </h3>

                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {quest.description}
                  </p>

                  {/* Skills Gained Tags */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {quest.skillsGained.map((s) => (
                      <span
                        key={s}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                    +{quest.xpReward} XP
                  </span>

                  {quest.completed ? (
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Completed</span>
                    </span>
                  ) : (
                    <button
                      onClick={() => handleStartQuest(quest)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-heading font-bold transition-all shadow-xs flex items-center gap-1.5 lift-hover"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Start Quest</span>
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>

      {/* Interactive Quest Runner Modal */}
      {activeQuest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-xl bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/40">
              <div className="flex items-center gap-2">
                <Swords className="w-4 h-4 text-orange-500" />
                <h3 className="font-heading font-extrabold text-sm text-zinc-900 dark:text-white">
                  {activeQuest.title}
                </h3>
                <span className="text-[10px] font-mono font-bold px-2 py-0.2 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                  +{activeQuest.xpReward} XP
                </span>
              </div>
              <button
                onClick={() => setActiveQuest(null)}
                className="p-1 text-zinc-400 hover:text-zinc-700 dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {!questFinished ? (
              <div className="p-6 space-y-6">
                {activeQuest.questions && activeQuest.questions[currentQIndex] ? (
                  <div className="space-y-4">
                    <h4 className="text-sm font-heading font-bold text-zinc-900 dark:text-white leading-relaxed">
                      {activeQuest.questions[currentQIndex].question}
                    </h4>

                    {/* Code Snippet if applicable */}
                    {activeQuest.questions[currentQIndex].codeSnippet && (
                      <pre className="p-3 bg-zinc-900 text-zinc-100 rounded-xl text-xs font-mono overflow-x-auto leading-relaxed border border-zinc-800">
                        {activeQuest.questions[currentQIndex].codeSnippet}
                      </pre>
                    )}

                    {/* Options */}
                    <div className="space-y-2.5">
                      {activeQuest.questions[currentQIndex].options.map((opt, idx) => {
                        const isSelected = selectedAnswer === idx;
                        const isCorrect = opt.correct;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => handleOptionSelect(idx)}
                            className={`w-full p-3 rounded-xl border text-left text-xs font-medium transition-all ${
                              showExplanation
                                ? isCorrect
                                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-900 dark:text-emerald-200'
                                  : isSelected
                                  ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-900 dark:text-rose-200'
                                  : 'bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 opacity-60'
                                : isSelected
                                ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-100'
                                : 'bg-white dark:bg-zinc-800/60 border-zinc-200 dark:border-zinc-700 hover:border-zinc-400 text-zinc-800 dark:text-zinc-200'
                            }`}
                          >
                            <span className="font-mono font-bold mr-2">{String.fromCharCode(65 + idx)}.</span>
                            {opt.text}
                          </button>
                        );
                      })}
                    </div>

                    {/* Explanation */}
                    {showExplanation && (
                      <motion.div
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3.5 bg-blue-50/60 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-800/60 text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed"
                      >
                        <strong className="text-blue-700 dark:text-blue-300 block mb-0.5">Explanation:</strong>
                        {activeQuest.questions[currentQIndex].explanation}
                      </motion.div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-6 text-xs text-zinc-500">
                    Quest loaded. Click complete to earn your XP!
                  </div>
                )}

                {/* Footer Controls */}
                <div className="flex items-center justify-end pt-4 border-t border-zinc-100 dark:border-zinc-800">
                  <button
                    type="button"
                    onClick={handleNextOrFinish}
                    disabled={selectedAnswer === null}
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white rounded-xl text-xs font-heading font-bold transition-all shadow-xs flex items-center gap-1.5 lift-hover"
                  >
                    <span>{currentQIndex < (activeQuest.questions?.length || 1) - 1 ? 'Next Step' : 'Finish & Claim XP'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              /* Success View */
              <div className="p-8 text-center space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-sm">
                  <Sparkles className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-heading font-extrabold text-zinc-900 dark:text-white">
                  Quest Completed!
                </h4>
                <div className="p-4 bg-zinc-50 dark:bg-zinc-800/80 rounded-2xl border border-zinc-200 dark:border-zinc-700 max-w-xs mx-auto space-y-1">
                  <span className="text-xs font-mono uppercase text-zinc-500 block">Reward Earned</span>
                  <strong className="text-2xl font-mono font-extrabold text-blue-600 dark:text-blue-400">
                    +{activeQuest.xpReward} XP
                  </strong>
                </div>
                <button
                  onClick={() => setActiveQuest(null)}
                  className="px-6 py-2.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-heading font-bold rounded-xl text-xs hover:opacity-90 transition-opacity shadow-xs"
                >
                  Continue Learning
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </PortalLayout>
  );
}
