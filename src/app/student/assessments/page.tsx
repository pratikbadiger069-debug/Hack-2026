'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { useAppStore } from '@/lib/store';
import { LearningQuest } from '@/types';
import { mockQuests, mockLearningPaths } from '@/lib/mock-data';
import {
  getLevelInfo,
  DIFFICULTY_RULES,
  generateStrictAssessmentReport,
  StrictAssessmentReport,
  shuffleArray,
} from '@/lib/xp-engine';
import {
  CheckCircle2,
  Lock,
  Play,
  X,
  ArrowRight,
  Award,
  Clock,
  AlertTriangle,
  RotateCcw,
  Search,
} from 'lucide-react';

export default function StudentAssessmentsPage() {
  const { quests, learningPaths, completeQuest, xp } = useAppStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [activeTab, setActiveTab] = useState<'tracks' | 'challenges' | 'certifications'>('tracks');

  // Effective Quests & Paths (Auto-seed fallback so page is NEVER empty or broken)
  const effectiveQuests: LearningQuest[] = quests && quests.length > 0 ? quests : (mockQuests as LearningQuest[]);
  const effectivePaths = learningPaths && learningPaths.length > 0 ? learningPaths : mockLearningPaths;

  // Test Runner State
  const [activeQuest, setActiveQuest] = useState<LearningQuest | null>(null);
  const [randomizedQuestions, setRandomizedQuestions] = useState<any[]>([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answersLog, setAnswersLog] = useState<{ isCorrect: boolean; timeTakenMs: number; topic?: string }[]>([]);
  const [questionStartTime, setQuestionStartTime] = useState<number>(Date.now());
  const [assessmentReport, setAssessmentReport] = useState<StrictAssessmentReport | null>(null);

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
    { id: 'Easy', label: 'Easy (60% Pass • 10 XP)' },
    { id: 'Medium', label: 'Medium (70% Pass • 25 XP)' },
    { id: 'Advanced', label: 'Advanced (75% Pass • 50 XP)' },
    { id: 'Expert', label: 'Expert (80% Pass • 100 XP)' },
    { id: 'Boss', label: 'Boss Final (80% Pass • 250+ XP)' },
  ];

  const filteredQuests = effectiveQuests.filter((q) => {
    const matchCategory =
      selectedCategory === 'All' ||
      q.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
      (selectedCategory === 'Backend' && (q.category === 'Database' || q.category === 'DevOps' || q.category === 'Systems'));

    const matchDifficulty =
      selectedDifficulty === 'All' || q.difficulty === selectedDifficulty;

    return matchCategory && matchDifficulty;
  });

  const handleStartChallenge = (quest: LearningQuest) => {
    if (quest.status === 'locked') return;

    // Randomize questions and options to prevent memorization
    const rawQuestions = quest.questions || [];
    const shuffledQ = shuffleArray(rawQuestions).map((q: any) => {
      const optionTexts: string[] = (q.options || []).map((opt: any) =>
        typeof opt === 'string' ? opt : opt.text || String(opt)
      );

      let correctIndex = 0;
      if (typeof q.correctAnswer === 'number' && q.correctAnswer >= 0 && q.correctAnswer < optionTexts.length) {
        correctIndex = q.correctAnswer;
      } else if (Array.isArray(q.options)) {
        const found = q.options.findIndex((opt: any) => typeof opt === 'object' && opt.correct);
        if (found !== -1) correctIndex = found;
      }

      const correctText = optionTexts[correctIndex] || optionTexts[0];
      const shuffledOptions = shuffleArray(optionTexts);
      const newCorrectIdx = Math.max(0, shuffledOptions.indexOf(correctText));

      return {
        ...q,
        options: shuffledOptions,
        correctAnswer: newCorrectIdx,
      };
    });

    setActiveQuest(quest);
    setRandomizedQuestions(shuffledQ);
    setCurrentQIndex(0);
    setSelectedAnswer(null);
    setAnswersLog([]);
    setQuestionStartTime(Date.now());
    setAssessmentReport(null);
  };

  const handleSelectOption = (idx: number) => {
    setSelectedAnswer(idx);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null || !activeQuest) return;

    const timeSpent = Date.now() - questionStartTime;
    const currentQ = randomizedQuestions[currentQIndex];
    const isCorrect = selectedAnswer === currentQ.correctAnswer;

    const updatedLog = [
      ...answersLog,
      { isCorrect, timeTakenMs: timeSpent, topic: currentQ.topic || activeQuest.skillCategory || activeQuest.category },
    ];
    setAnswersLog(updatedLog);

    if (currentQIndex < randomizedQuestions.length - 1) {
      setCurrentQIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setQuestionStartTime(Date.now());
    } else {
      // Finished all questions — generate strict report
      const report = generateStrictAssessmentReport(activeQuest, updatedLog, xp);
      setAssessmentReport(report);

      if (report.passed && !report.antiCheatFlagged) {
        completeQuest(activeQuest.id);
      }
    }
  };

  return (
    <PortalLayout>
      <div className="space-y-8 max-w-[1240px] mx-auto pb-16">
        
        {/* Top Header */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="pb-5 border-b border-[#E8E5DD] flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C76A2A] mb-1 block">
              Strict Assessment Engine
            </span>
            <h1 className="text-3xl font-bold text-[#1B1B1B] tracking-tight">
              Skill Assessments &amp; Progression Tracks
            </h1>
            <p className="text-xs text-[#6F6A60] mt-0.5">
              XP and verified status are earned solely through proven competency. No participation rewards.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2 bg-white rounded-2xl border border-[#E8E5DD] shadow-xs text-xs">
              <span className="text-[#6F6A60]">Level {levelInfo.level} Builder • </span>
              <span className="font-semibold text-[#1B1B1B]">{levelInfo.title}</span>
              <span className="font-mono text-[#C76A2A] font-semibold ml-2">{xp} XP</span>
            </div>
          </div>
        </motion.div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-2 border-b border-[#E8E5DD] pb-3">
          <button
            onClick={() => setActiveTab('tracks')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'tracks'
                ? 'bg-[#1B1B1B] text-white shadow-xs'
                : 'bg-white text-[#6F6A60] hover:text-[#1B1B1B] border border-[#E8E5DD]'
            }`}
          >
            Progression Paths ({effectivePaths.length})
          </button>
          <button
            onClick={() => setActiveTab('challenges')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'challenges'
                ? 'bg-[#1B1B1B] text-white shadow-xs'
                : 'bg-white text-[#6F6A60] hover:text-[#1B1B1B] border border-[#E8E5DD]'
            }`}
          >
            All Challenges ({effectiveQuests.length})
          </button>
          <button
            onClick={() => setActiveTab('certifications')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'certifications'
                ? 'bg-[#1B1B1B] text-white shadow-xs'
                : 'bg-white text-[#6F6A60] hover:text-[#1B1B1B] border border-[#E8E5DD]'
            }`}
          >
            Final Certification Exams (Boss)
          </button>
        </div>

        {/* TAB 1: PROGRESSION PATHS */}
        {activeTab === 'tracks' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {effectivePaths.map((path: any) => {
                const stepsList = path.milestones || path.steps || [];
                const totalInPath = Math.max(1, stepsList.length);
                const completedInPath = stepsList.filter((m: any) => m.status === 'completed').length;
                const progressPct = Math.round((completedInPath / totalInPath) * 100);
                const pathCategory = path.category || path.targetRole || 'Engineering';

                return (
                  <motion.div
                    key={path.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="p-6 rounded-2xl bg-white border border-[#E8E5DD] shadow-xs flex flex-col justify-between space-y-4 hover:border-[#C76A2A] transition-all"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-semibold text-[#C76A2A] bg-[#C76A2A]/10 px-2.5 py-0.5 rounded-full">
                          {pathCategory}
                        </span>
                        <span className="text-xs font-mono font-semibold text-[#1B1B1B]">
                          {progressPct}% Complete
                        </span>
                      </div>

                      <div>
                        <h3 className="text-base font-bold text-[#1B1B1B]">{path.title}</h3>
                        <p className="text-xs text-[#6F6A60] mt-1 line-clamp-2">{path.description}</p>
                      </div>

                      {/* Progression Path Steps */}
                      <div className="space-y-2 pt-2 border-t border-[#E8E5DD]">
                        <span className="text-[11px] font-semibold text-[#6F6A60] uppercase tracking-wider block">
                          Milestone Steps
                        </span>
                        {stepsList.map((m: any, idx: number) => (
                          <div
                            key={m.id}
                            className="flex items-center justify-between text-xs py-1"
                          >
                            <div className="flex items-center gap-2">
                              {m.status === 'completed' ? (
                                <CheckCircle2 className="w-4 h-4 text-[#2F7A45]" />
                              ) : m.status === 'in_progress' ? (
                                <div className="w-2 h-2 rounded-full bg-[#C76A2A]" />
                              ) : (
                                <Lock className="w-3.5 h-3.5 text-[#6F6A60]" />
                              )}
                              <span className={m.status === 'locked' ? 'text-[#6F6A60]' : 'font-medium text-[#1B1B1B]'}>
                                Step {idx + 1}: {m.title}
                              </span>
                            </div>
                            <span className="text-[10px] font-mono text-[#6F6A60]">
                              +{m.xpReward} XP
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        const targetQuest = effectiveQuests.find(q => q.pathId === path.id && q.status !== 'locked') || effectiveQuests.find(q => q.pathId === path.id) || effectiveQuests[0];
                        if (targetQuest) handleStartChallenge(targetQuest);
                      }}
                      className="w-full py-2.5 bg-[#1B1B1B] text-white rounded-xl text-xs font-semibold hover:bg-[#C76A2A] transition-colors flex items-center justify-center gap-2 mt-auto"
                    >
                      <span>Continue Track</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: ALL CHALLENGES */}
        {activeTab === 'challenges' && (
          <div className="space-y-6">
            {/* Filter Bar */}
            <div className="p-4 rounded-2xl bg-white border border-[#E8E5DD] shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 overflow-x-auto w-full pb-1 md:pb-0">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                      selectedCategory === cat
                        ? 'bg-[#1B1B1B] text-white'
                        : 'bg-[#F6F4EE] text-[#6F6A60] hover:text-[#1B1B1B]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="px-3 py-1.5 bg-[#F6F4EE] border border-[#E8E5DD] rounded-xl text-xs text-[#1B1B1B] shrink-0 font-medium"
              >
                {difficulties.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Quests Grid or Empty State */}
            {filteredQuests.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredQuests.map((quest) => {
                  const diffRules = DIFFICULTY_RULES[quest.difficulty] || DIFFICULTY_RULES.Medium;
                  const isCompleted = quest.completed || quest.status === 'completed';
                  const isLocked = quest.status === 'locked';

                  return (
                    <motion.div
                      key={quest.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className={`p-6 rounded-2xl border shadow-xs flex flex-col justify-between space-y-4 transition-all ${
                        isCompleted
                          ? 'bg-white border-[#2F7A45]/40'
                          : isLocked
                          ? 'bg-[#F6F4EE]/50 border-[#E8E5DD] opacity-60'
                          : 'bg-white border-[#E8E5DD] hover:border-[#C76A2A]'
                      }`}
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono font-semibold text-[#C76A2A] bg-[#C76A2A]/10 px-2.5 py-0.5 rounded-full">
                            {quest.category}
                          </span>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-semibold text-[#1B1B1B]">
                              {quest.difficulty}
                            </span>
                            <span className="text-[11px] font-mono text-[#C76A2A] font-bold">
                              +{quest.xpReward} XP
                            </span>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-base font-bold text-[#1B1B1B]">{quest.title}</h3>
                          <p className="text-xs text-[#6F6A60] mt-1 line-clamp-2">{quest.description}</p>
                        </div>

                        <div className="p-3 bg-[#F6F4EE] rounded-xl text-[11px] space-y-1 text-[#6F6A60]">
                          <div className="flex justify-between">
                            <span>Pass Threshold:</span>
                            <strong className="text-[#1B1B1B]">{diffRules.passPercent}%</strong>
                          </div>
                          <div className="flex justify-between">
                            <span>Attempt Limit:</span>
                            <strong className="text-[#1B1B1B]">{diffRules.attemptLimit === Infinity ? 'Unlimited' : `${diffRules.attemptLimit} Attempts`}</strong>
                          </div>
                          <div className="flex justify-between">
                            <span>Anti-Cheat:</span>
                            <strong className="text-[#2F7A45]">Active Verification</strong>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => handleStartChallenge(quest)}
                        disabled={isLocked}
                        className={`w-full py-2.5 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-2 ${
                          isCompleted
                            ? 'bg-[#F6F4EE] text-[#2F7A45] hover:bg-[#E8E5DD]'
                            : isLocked
                            ? 'bg-[#E8E5DD] text-[#6F6A60] cursor-not-allowed'
                            : 'bg-[#1B1B1B] text-white hover:bg-[#C76A2A]'
                        }`}
                      >
                        {isCompleted ? (
                          <>
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Passed • Retake Challenge</span>
                          </>
                        ) : isLocked ? (
                          <>
                            <Lock className="w-3.5 h-3.5" />
                            <span>Locked Track</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-3.5 h-3.5 fill-current" />
                            <span>Start Challenge</span>
                          </>
                        )}
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              /* EMPTY STATE */
              <div className="p-12 text-center rounded-2xl bg-white border border-[#E8E5DD] space-y-3 shadow-xs">
                <Search className="w-8 h-8 text-[#6F6A60] mx-auto" />
                <h3 className="text-base font-bold text-[#1B1B1B]">No Assessments Found</h3>
                <p className="text-xs text-[#6F6A60] max-w-md mx-auto">
                  No assessments match the selected category ({selectedCategory}) and difficulty ({selectedDifficulty}).
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSelectedDifficulty('All');
                  }}
                  className="px-4 py-2 bg-[#1B1B1B] text-white rounded-xl text-xs font-semibold hover:bg-[#C76A2A] transition-colors inline-flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Filters</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: FINAL CERTIFICATION EXAMS */}
        {activeTab === 'certifications' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-white border border-[#E8E5DD] shadow-xs space-y-2">
              <h2 className="text-lg font-bold text-[#1B1B1B]">Boss Certification Final Exams</h2>
              <p className="text-xs text-[#6F6A60] max-w-2xl">
                Comprehensive, strictly timed examinations that benchmark production readiness. Passing awards Industry Ready Status and directly unlocks advanced recruiter talent pipelines.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {effectiveQuests.filter(q => q.difficulty === 'Boss' || q.difficulty === 'Expert').map((cert) => (
                <div
                  key={cert.id}
                  className="p-6 rounded-2xl bg-white border border-[#E8E5DD] shadow-xs space-y-4 hover:border-[#C76A2A] transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-[#C76A2A]/15 text-[#C76A2A] text-xs font-bold font-mono">
                        FINAL CERTIFICATION
                      </span>
                      <span className="text-xs font-mono font-bold text-[#C76A2A]">
                        +{cert.xpReward} XP
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-[#1B1B1B]">{cert.title}</h3>
                      <p className="text-xs text-[#6F6A60] mt-1">{cert.description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                      <div className="p-2.5 bg-[#F6F4EE] rounded-xl">
                        <span className="text-[#6F6A60] block text-[10px]">Pass Criteria</span>
                        <strong className="text-[#1B1B1B]">80% Score</strong>
                      </div>
                      <div className="p-2.5 bg-[#F6F4EE] rounded-xl">
                        <span className="text-[#6F6A60] block text-[10px]">Attempt Frequency</span>
                        <strong className="text-[#1B1B1B]">1 Attempt / Week</strong>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleStartChallenge(cert)}
                    className="w-full py-2.5 bg-[#1B1B1B] text-white rounded-xl text-xs font-semibold hover:bg-[#C76A2A] transition-colors flex items-center justify-center gap-2 mt-2"
                  >
                    <Award className="w-4 h-4 text-[#C76A2A]" />
                    <span>Enter Strict Certification Exam</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* STRICT ASSESSMENT RUNNER MODAL */}
      {activeQuest && randomizedQuestions.length > 0 && !assessmentReport && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl border border-[#E8E5DD] max-w-2xl w-full p-6 space-y-6 shadow-2xl relative"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#E8E5DD] pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase font-semibold text-[#C76A2A]">
                  Strict Assessment Mode • Question {currentQIndex + 1} of {randomizedQuestions.length}
                </span>
                <h3 className="text-base font-bold text-[#1B1B1B]">{activeQuest.title}</h3>
              </div>
              <button
                onClick={() => setActiveQuest(null)}
                className="text-[#6F6A60] hover:text-[#1B1B1B] p-1.5 rounded-xl hover:bg-black/5"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Question Text */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-[#1B1B1B] leading-relaxed">
                {randomizedQuestions[currentQIndex].question}
              </h4>

              {/* Options */}
              <div className="space-y-2.5">
                {randomizedQuestions[currentQIndex].options.map((option: string, optIdx: number) => {
                  const isSelected = selectedAnswer === optIdx;
                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectOption(optIdx)}
                      className={`w-full p-3.5 rounded-xl border text-left text-xs font-medium transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#1B1B1B] text-white border-[#1B1B1B] shadow-xs'
                          : 'bg-[#F6F4EE] border-[#E8E5DD] text-[#1B1B1B] hover:border-[#C76A2A]'
                      }`}
                    >
                      <span>{option}</span>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSelected ? 'border-white bg-white/20' : 'border-[#6F6A60]'}`}>
                        {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="pt-2 border-t border-[#E8E5DD] flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-[#6F6A60]">
                <Clock className="w-3.5 h-3.5 text-[#C76A2A]" />
                <span>Anti-cheat timing active</span>
              </div>

              <button
                onClick={handleNextQuestion}
                disabled={selectedAnswer === null}
                className={`px-5 py-2.5 rounded-xl text-xs font-semibold transition-colors flex items-center gap-2 ${
                  selectedAnswer === null
                    ? 'bg-[#E8E5DD] text-[#6F6A60] cursor-not-allowed'
                    : 'bg-[#1B1B1B] text-white hover:bg-[#C76A2A]'
                }`}
              >
                <span>{currentQIndex === randomizedQuestions.length - 1 ? 'Submit Assessment' : 'Next Question'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* POST-ASSESSMENT DIAGNOSTIC REPORT MODAL */}
      {assessmentReport && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl border border-[#E8E5DD] max-w-2xl w-full p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="text-center space-y-2 border-b border-[#E8E5DD] pb-6">
              {assessmentReport.antiCheatFlagged ? (
                <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
                  <AlertTriangle className="w-6 h-6" />
                </div>
              ) : assessmentReport.passed ? (
                <div className="w-12 h-12 rounded-full bg-[#2F7A45]/15 text-[#2F7A45] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-full bg-[#E8E5DD] text-[#6F6A60] flex items-center justify-center mx-auto">
                  <X className="w-6 h-6" />
                </div>
              )}

              <h3 className="text-xl font-bold text-[#1B1B1B]">
                {assessmentReport.antiCheatFlagged
                  ? 'Attempt Flagged for Review'
                  : assessmentReport.passed
                  ? 'Assessment Passed & Verified!'
                  : 'Assessment Incomplete — Below Threshold'}
              </h3>
              <p className="text-xs text-[#6F6A60] max-w-md mx-auto">
                {assessmentReport.passed
                  ? `You achieved ${assessmentReport.finalScore}% (pass threshold was ${assessmentReport.passThreshold}%). XP has been deposited to your Builder Profile.`
                  : `Your score of ${assessmentReport.finalScore}% was below the required ${assessmentReport.passThreshold}% threshold. XP is strictly earned upon passing.`}
              </p>
            </div>

            {/* Score & XP Diagnostics */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-4 rounded-xl bg-[#F6F4EE] border border-[#E8E5DD]">
                <span className="text-[11px] text-[#6F6A60] block">Final Score</span>
                <strong className="text-2xl font-bold font-mono text-[#1B1B1B]">{assessmentReport.finalScore}%</strong>
              </div>
              <div className="p-4 rounded-xl bg-[#F6F4EE] border border-[#E8E5DD]">
                <span className="text-[11px] text-[#6F6A60] block">Earned XP</span>
                <strong className="text-2xl font-bold font-mono text-[#C76A2A]">+{assessmentReport.xpEarned} XP</strong>
              </div>
              <div className="p-4 rounded-xl bg-[#F6F4EE] border border-[#E8E5DD]">
                <span className="text-[11px] text-[#6F6A60] block">Confidence</span>
                <strong className="text-2xl font-bold font-mono text-[#2F7A45]">{assessmentReport.confidenceScore}%</strong>
              </div>
            </div>

            {/* Questions Breakdown */}
            <div className="space-y-3 pt-2">
              <div className="flex justify-between text-xs font-semibold text-[#1B1B1B]">
                <span>Questions Correct: {assessmentReport.questionsCorrect}</span>
                <span className="text-[#6F6A60]">Questions Incorrect: {assessmentReport.questionsIncorrect}</span>
              </div>

              {/* Weak Areas & Missing Concepts */}
              {assessmentReport.weakAreas.length > 0 && (
                <div className="p-4 rounded-xl bg-[#F6F4EE] border border-[#E8E5DD] space-y-2 text-xs">
                  <strong className="text-[#1B1B1B] block">Weak Areas &amp; Missing Concepts:</strong>
                  <div className="flex flex-wrap gap-1.5">
                    {assessmentReport.weakAreas.map((area) => (
                      <span key={area} className="px-2.5 py-1 rounded-lg bg-white border border-[#E8E5DD] text-[#C76A2A] font-medium">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Recommended Resources */}
              <div className="space-y-1.5 text-xs">
                <strong className="text-[#1B1B1B]">Recommended Action:</strong>
                <p className="text-[#6F6A60]">
                  Suggested Next Challenge: <strong>{assessmentReport.suggestedNextChallenge}</strong>
                </p>
                <div className="flex items-center gap-2 pt-1 text-[11px] text-[#6F6A60]">
                  <span>Career Readiness Impact: <strong>+{assessmentReport.careerReadinessImpact}%</strong></span>
                  <span>•</span>
                  <span>Builder Score Impact: <strong>+{assessmentReport.builderScoreImpact} pts</strong></span>
                </div>
              </div>
            </div>

            {/* Close Button */}
            <div className="pt-4 border-t border-[#E8E5DD] flex justify-end">
              <button
                onClick={() => {
                  setAssessmentReport(null);
                  setActiveQuest(null);
                }}
                className="px-6 py-2.5 bg-[#1B1B1B] text-white rounded-xl text-xs font-semibold hover:bg-[#C76A2A] transition-colors"
              >
                Return to Assessment Hub
              </button>
            </div>
          </motion.div>
        </div>
      )}

    </PortalLayout>
  );
}
