'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { useAppStore } from '@/lib/store';
import { LearningQuest } from '@/types';
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
  MessageSquare,
  Cpu,
} from 'lucide-react';

export default function StudentAssessmentsPage() {
  const { quests, learningPaths, completeQuest, xp } = useAppStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [activeQuest, setActiveQuest] = useState<LearningQuest | null>(null);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [questFinished, setQuestFinished] = useState(false);

  const categories = [
    'All',
    'Programming',
    'DSA',
    'Databases',
    'Cloud',
    'AI',
    'Communication',
    'Problem Solving',
  ];

  const difficulties = ['All', 'Easy (10 XP)', 'Medium (25 XP)', 'Advanced (50 XP)', 'Expert (100 XP)'];

  const filteredQuests = quests.filter((q) => {
    const matchCategory =
      selectedCategory === 'All' ||
      q.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
      (selectedCategory === 'Databases' && (q.category as string) === 'Database') ||
      (selectedCategory === 'DSA' && ((q.category as string) === 'Backend' || (q.category as string) === 'Systems'));

    const matchDifficulty =
      selectedDifficulty === 'All' ||
      (selectedDifficulty.startsWith('Easy') && q.difficulty === 'Easy') ||
      (selectedDifficulty.startsWith('Medium') && q.difficulty === 'Medium') ||
      (selectedDifficulty.startsWith('Advanced') && q.difficulty === 'Advanced') ||
      (selectedDifficulty.startsWith('Expert') && q.difficulty === 'Expert');

    return matchCategory && matchDifficulty;
  });

  const handleStartChallenge = (quest: LearningQuest) => {
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
    }
  };

  return (
    <PortalLayout>
      <div className="space-y-8 max-w-[1200px] mx-auto pb-16">
        {/* Top Header */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#E6E4DD] dark:border-[#2D333B]"
        >
          <div>
            <h1 className="text-2xl font-semibold text-[#1F2328] dark:text-[#F0F6FC] tracking-tight">
              Skill Assessments &amp; Challenges
            </h1>
            <p className="text-xs text-[#656D76] dark:text-[#8B949E] mt-0.5">
              Verify competencies across engineering domains, earn XP, and unlock verified badges.
            </p>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white dark:bg-[#161B22] border border-[#E6E4DD] dark:border-[#2D333B] text-xs font-mono">
            <span className="text-[#656D76] dark:text-[#8B949E]">Accumulated:</span>
            <span className="font-semibold text-blue-600 dark:text-blue-400">{xp} XP</span>
          </div>
        </motion.div>

        {/* Career Progression Pathways */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-[#1F2328] dark:text-[#F0F6FC]">
              Recommended Learning Pathways
            </h2>
            <span className="text-xs text-[#656D76] dark:text-[#8B949E] font-mono">Step Progression</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {learningPaths.map((path) => (
              <div
                key={path.id}
                className="p-5 bg-white dark:bg-[#161B22] rounded-xl border border-[#E6E4DD] dark:border-[#2D333B] space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#656D76] dark:text-[#8B949E]">
                      {path.targetRole}
                    </span>
                    <h3 className="text-sm font-semibold text-[#1F2328] dark:text-[#F0F6FC] mt-0.5">
                      {path.title}
                    </h3>
                  </div>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#FAF9F5] dark:bg-[#0F1115] border border-[#E6E4DD] dark:border-[#2D333B] text-[#1F2328] dark:text-[#F0F6FC]">
                    {path.completedSteps}/{path.totalSteps} Completed
                  </span>
                </div>

                <div className="space-y-1.5 pt-1">
                  {path.steps.map((step) => (
                    <div
                      key={step.id}
                      className={`p-2.5 rounded-lg border text-xs flex items-center justify-between transition-colors ${
                        step.status === 'completed'
                          ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/40 text-emerald-900 dark:text-emerald-200'
                          : step.status === 'in_progress'
                          ? 'bg-[#FAF9F5] dark:bg-[#0F1115] border-[#E6E4DD] dark:border-[#2D333B] text-[#1F2328] dark:text-[#F0F6FC] font-medium'
                          : 'bg-transparent border-[#E6E4DD] dark:border-[#2D333B] text-[#8C959F] dark:text-[#6E7681] opacity-60'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-4 h-4 rounded-full flex items-center justify-center font-mono text-[10px] bg-white dark:bg-[#161B22] border border-[#E6E4DD] dark:border-[#2D333B]">
                          {step.stepNumber}
                        </span>
                        <span>{step.title}</span>
                      </div>

                      <div className="flex items-center gap-2 font-mono text-[11px]">
                        <span className="text-[#8C959F] dark:text-[#6E7681]">+{step.xpReward} XP</span>
                        {step.status === 'completed' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                        {step.status === 'locked' && <Lock className="w-3 h-3 text-[#8C959F]" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Challenges Grid */}
        <section className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <h2 className="text-sm font-semibold text-[#1F2328] dark:text-[#F0F6FC]">
              Domain Challenges
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

          {/* Difficulty Sub-Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {difficulties.map((diff) => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-2.5 py-0.5 rounded text-[11px] font-mono whitespace-nowrap transition-colors ${
                  selectedDifficulty === diff
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-[#161B22] border border-[#E6E4DD] dark:border-[#2D333B] text-[#656D76] dark:text-[#8B949E]'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>

          {/* Challenges List */}
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
                  <span className="font-mono text-[11px] text-[#656D76] dark:text-[#8B949E]">
                    +{quest.xpReward} XP
                  </span>

                  {quest.completed ? (
                    <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Passed</span>
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

      {/* Challenge Runner Modal */}
      {activeQuest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg bg-white dark:bg-[#161B22] rounded-xl border border-[#E6E4DD] dark:border-[#2D333B] overflow-hidden shadow-xl text-xs">
            {/* Header */}
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

            {!questFinished ? (
              <div className="p-5 space-y-4">
                {activeQuest.questions && activeQuest.questions[currentQIndex] ? (
                  <div className="space-y-3">
                    <div className="font-medium text-[#1F2328] dark:text-[#F0F6FC]">
                      {activeQuest.questions[currentQIndex].question}
                    </div>

                    {activeQuest.questions[currentQIndex].codeSnippet && (
                      <pre className="p-3 bg-[#0F1115] text-[#F0F6FC] rounded-lg text-[11px] font-mono overflow-x-auto border border-[#2D333B]">
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
                            onClick={() => handleOptionSelect(idx)}
                            className={`w-full p-2.5 rounded-lg border text-left text-xs transition-colors ${
                              showExplanation
                                ? isCorrect
                                  ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-500 text-emerald-900 dark:text-emerald-200'
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
                      <div className="p-3 bg-blue-50/50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800/40 text-[11px] text-[#1F2328] dark:text-[#F0F6FC]">
                        <strong className="text-blue-600 dark:text-blue-400 block mb-0.5 font-medium">Analysis:</strong>
                        {activeQuest.questions[currentQIndex].explanation}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-6 text-xs text-[#656D76] dark:text-[#8B949E]">
                    Challenge initialized.
                  </div>
                )}

                <div className="flex items-center justify-end pt-3 border-t border-[#E6E4DD] dark:border-[#2D333B]">
                  <button
                    type="button"
                    onClick={handleNextOrFinish}
                    disabled={selectedAnswer === null}
                    className="px-4 py-1.5 bg-[#1F2328] dark:bg-[#F0F6FC] disabled:opacity-40 text-white dark:text-[#0F1115] rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors"
                  >
                    <span>{currentQIndex < (activeQuest.questions?.length || 1) - 1 ? 'Next Question' : 'Complete Challenge'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-6 text-center space-y-3">
                <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-semibold text-[#1F2328] dark:text-[#F0F6FC]">
                  Challenge Completed
                </h4>
                <p className="text-xs text-[#656D76] dark:text-[#8B949E]">
                  You earned <strong className="text-blue-600 dark:text-blue-400 font-mono">+{activeQuest.xpReward} XP</strong> and verified your skills for this module.
                </p>
                <button
                  onClick={() => setActiveQuest(null)}
                  className="px-4 py-1.5 bg-[#1F2328] dark:bg-[#F0F6FC] text-white dark:text-[#0F1115] rounded-lg text-xs font-medium transition-colors"
                >
                  Close &amp; Return
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </PortalLayout>
  );
}
