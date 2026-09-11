'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  DEPARTMENT_TRACKS,
  generateAdaptive10QuestionAssessment,
  ComprehensiveAssessmentQuestion,
} from '@/lib/assessment-bank';
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
  Code2,
  Cpu,
  Layers,
  Sparkles,
  Check,
  ShieldCheck,
  BookOpen,
} from 'lucide-react';

export default function StudentAssessmentsPage() {
  const { quests, learningPaths, completeQuest, xp, studentProfile, addVerifiedSkill } = useAppStore();
  const [selectedDepartment, setSelectedDepartment] = useState<string>('Computer Science');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [activeTab, setActiveTab] = useState<'departments' | 'tracks' | 'all-challenges'>('departments');

  // Test Runner State for 10-Question Session
  const [activeSession, setActiveSession] = useState<{
    id: string;
    title: string;
    department: string;
    topic: string;
    questions: ComprehensiveAssessmentQuestion[];
    estimatedMinutes: number;
    xpReward: number;
    passThreshold: number;
  } | null>(null);

  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answersLog, setAnswersLog] = useState<{ isCorrect: boolean; timeTakenMs: number; topic?: string }[]>([]);
  const [questionStartTime, setQuestionStartTime] = useState<number>(Date.now());
  const [assessmentReport, setAssessmentReport] = useState<StrictAssessmentReport | null>(null);
  const [timeLeftSec, setTimeLeftSec] = useState(1200); // 20 minutes

  const levelInfo = getLevelInfo(xp);

  // Timer countdown
  useEffect(() => {
    if (!activeSession || assessmentReport) return;
    const interval = setInterval(() => {
      setTimeLeftSec((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleFinishTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [activeSession, assessmentReport]);

  const handleStartDepartmentTopic = (topic: string, dept: string) => {
    const session = generateAdaptive10QuestionAssessment(
      topic,
      dept,
      studentProfile?.careerGoal || 'Internship'
    );

    setActiveSession(session);
    setCurrentQIndex(0);
    setSelectedAnswer(null);
    setAnswersLog([]);
    setQuestionStartTime(Date.now());
    setAssessmentReport(null);
    setTimeLeftSec(1200);
  };

  const handleSelectOption = (idx: number) => {
    setSelectedAnswer(idx);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null || !activeSession) return;

    const timeSpent = Date.now() - questionStartTime;
    const currentQ = activeSession.questions[currentQIndex];
    const isCorrect = selectedAnswer === currentQ.correctAnswer;

    const updatedLog = [
      ...answersLog,
      { isCorrect, timeTakenMs: timeSpent, topic: currentQ.topic },
    ];
    setAnswersLog(updatedLog);

    if (currentQIndex < activeSession.questions.length - 1) {
      setCurrentQIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setQuestionStartTime(Date.now());
    } else {
      handleFinishTest(updatedLog);
    }
  };

  const handleFinishTest = (logOverride?: any[]) => {
    if (!activeSession) return;
    const finalLog = logOverride || answersLog;
    const report = generateStrictAssessmentReport(
      {
        id: activeSession.id,
        title: activeSession.title,
        category: activeSession.topic,
        difficulty: 'Advanced',
        xpReward: activeSession.xpReward,
      },
      finalLog,
      xp
    );

    setAssessmentReport(report);

    if (report.passed && !report.antiCheatFlagged) {
      completeQuest(activeSession.id);
      addVerifiedSkill(
        activeSession.topic,
        report.scorePercentage >= 90 ? 'Expert' : report.scorePercentage >= 80 ? 'Advanced' : 'Intermediate',
        activeSession.department.includes('AI') ? 'AI & ML' : activeSession.department.includes('Cyber') ? 'Cloud' : 'Programming'
      );
    }
  };

  const formatTimer = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins}:${s < 10 ? '0' : ''}${s}`;
  };

  const selectedTrackObj = DEPARTMENT_TRACKS.find((d) => d.department === selectedDepartment) || DEPARTMENT_TRACKS[0];

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
              10-Question Adaptive Assessment Engine
            </span>
            <h1 className="text-3xl font-bold text-[#1B1B1B] tracking-tight">
              Department Skill Evaluations &amp; Benchmarks
            </h1>
            <p className="text-xs text-[#6F6A60] mt-0.5">
              Strict 10-question evaluations structured across Easy (Q1-2), Medium (Q3-5), Hard (Q6-8), and Expert (Q9-10).
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2 bg-white rounded-2xl border border-[#E8E5DD] shadow-none text-xs">
              <span className="text-[#6F6A60]">Level {levelInfo.level} • </span>
              <span className="font-semibold text-[#1B1B1B]">{levelInfo.title}</span>
              <span className="font-mono text-[#C76A2A] font-semibold ml-2">{xp} XP</span>
            </div>
          </div>
        </motion.div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-2 border-b border-[#E8E5DD] pb-3">
          <button
            onClick={() => setActiveTab('departments')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'departments'
                ? 'bg-[#1B1B1B] text-white shadow-none'
                : 'bg-white text-[#6F6A60] hover:text-[#1B1B1B] border border-[#E8E5DD]'
            }`}
          >
            Department Tracks (7 Domains)
          </button>
          <button
            onClick={() => setActiveTab('tracks')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'tracks'
                ? 'bg-[#1B1B1B] text-white shadow-none'
                : 'bg-white text-[#6F6A60] hover:text-[#1B1B1B] border border-[#E8E5DD]'
            }`}
          >
            Progression Roadmaps ({mockLearningPaths.length})
          </button>
          <button
            onClick={() => setActiveTab('all-challenges')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'all-challenges'
                ? 'bg-[#1B1B1B] text-white shadow-none'
                : 'bg-white text-[#6F6A60] hover:text-[#1B1B1B] border border-[#E8E5DD]'
            }`}
          >
            Quick Quests &amp; Boss Capstones
          </button>
        </div>

        {/* TAB 1: DEPARTMENT-BASED 10-QUESTION ASSESSMENTS */}
        {activeTab === 'departments' && (
          <div className="space-y-6">
            {/* Department Selection Bar */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
              {DEPARTMENT_TRACKS.map((track) => {
                const isSelected = selectedDepartment === track.department;
                return (
                  <button
                    key={track.id}
                    onClick={() => setSelectedDepartment(track.department)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-semibold border flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
                      isSelected
                        ? 'bg-[#1B1B1B] text-white border-[#1B1B1B]'
                        : 'bg-white text-[#6E6E6A] border-[#E8E5DD] hover:border-[#1B1B1B] hover:text-[#1B1B1B]'
                    }`}
                  >
                    <span>{track.icon}</span>
                    <span>{track.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Selected Track Overview Banner */}
            <div className="p-6 rounded-2xl bg-white border border-[#E8E5DD] shadow-none flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">{selectedTrackObj.icon}</span>
                  <h2 className="text-lg font-bold text-[#1B1B1B]">{selectedTrackObj.name}</h2>
                </div>
                <p className="text-xs text-[#6E6E6A] max-w-xl">{selectedTrackObj.description}</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <div className="p-3 rounded-xl bg-[#FAF9F5] border border-[#E8E5DD] text-center">
                  <span className="text-[10px] text-[#6E6E6A] uppercase font-mono block">Format</span>
                  <span className="text-xs font-bold text-[#1B1B1B]">10 Questions</span>
                </div>
                <div className="p-3 rounded-xl bg-[#FAF9F5] border border-[#E8E5DD] text-center">
                  <span className="text-[10px] text-[#6E6E6A] uppercase font-mono block">Reward</span>
                  <span className="text-xs font-bold text-[#C76A2A] font-mono">+100 XP</span>
                </div>
              </div>
            </div>

            {/* Topic Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {selectedTrackObj.topics.map((topic, idx) => (
                <div
                  key={topic}
                  className="p-5 rounded-2xl bg-white border border-[#E8E5DD] shadow-none hover:border-[#C76A2A] transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#C76A2A] bg-[#C76A2A]/10 px-2 py-0.5 rounded font-mono">
                        Benchmark #{idx + 1}
                      </span>
                      <span className="text-xs font-mono text-[#6E6E6A]">20 Mins • 10 Qs</span>
                    </div>
                    <h3 className="text-base font-bold text-[#1B1B1B]">{topic} Evaluation</h3>
                    <p className="text-xs text-[#6E6E6A]">
                      Full adaptive verification spanning MCQs, debugging code snippets, and scenario-based architecture.
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-[#FAF9F5] border border-[#E8E5DD] text-[#1B1B1B]">
                        Q1-2: Easy
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-[#FAF9F5] border border-[#E8E5DD] text-[#1B1B1B]">
                        Q3-5: Med
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-[#FAF9F5] border border-[#E8E5DD] text-[#1B1B1B]">
                        Q6-8: Hard
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-[#FAF9F5] border border-[#E8E5DD] text-[#1B1B1B]">
                        Q9-10: Expert
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleStartDepartmentTopic(topic, selectedTrackObj.department)}
                    className="w-full py-2.5 bg-[#1B1B1B] hover:bg-[#C76A2A] text-white rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Launch 10-Question Assessment</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: PROGRESSION PATHS */}
        {activeTab === 'tracks' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {mockLearningPaths.map((path: any) => {
              const stepsList = path.milestones || path.steps || [];
              const totalInPath = Math.max(1, stepsList.length);
              const completedInPath = stepsList.filter((m: any) => m.status === 'completed').length;
              const progressPct = Math.round((completedInPath / totalInPath) * 100);

              return (
                <div
                  key={path.id}
                  className="p-6 rounded-2xl bg-white border border-[#E8E5DD] shadow-none flex flex-col justify-between space-y-4 hover:border-[#C76A2A] transition-all"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-semibold text-[#C76A2A] bg-[#C76A2A]/10 px-2.5 py-0.5 rounded-full">
                        {path.targetRole || 'Engineering Track'}
                      </span>
                      <span className="text-xs font-mono font-semibold text-[#1B1B1B]">
                        {progressPct}% Complete
                      </span>
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-[#1B1B1B]">{path.title}</h3>
                      <p className="text-xs text-[#6E6E6A] mt-1">{path.description}</p>
                    </div>

                    <div className="space-y-1.5 pt-2">
                      {stepsList.slice(0, 3).map((step: any, sIdx: number) => (
                        <div
                          key={sIdx}
                          className="flex items-center justify-between text-xs text-[#6E6E6A] p-2 bg-[#FAF9F5] rounded-xl border border-[#E8E5DD]"
                        >
                          <span className="truncate">{step.title}</span>
                          {step.status === 'completed' ? (
                            <CheckCircle2 className="w-4 h-4 text-[#2F7A45] shrink-0" />
                          ) : (
                            <span className="text-[10px] font-mono text-[#C76A2A]">Ready</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => handleStartDepartmentTopic(path.targetRole || 'Java', 'Computer Science')}
                    className="w-full py-2.5 bg-[#1B1B1B] hover:bg-[#C76A2A] text-white rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Take Next Verification Milestone</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 3: ALL QUESTS & BOSS CAPSTONES */}
        {activeTab === 'all-challenges' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {mockQuests.map((quest) => (
              <div
                key={quest.id}
                className="p-5 rounded-2xl bg-white border border-[#E8E5DD] shadow-none flex flex-col justify-between space-y-4 hover:border-[#C76A2A] transition-all"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-semibold text-[#C76A2A] bg-[#C76A2A]/10 px-2 py-0.5 rounded">
                      {quest.category}
                    </span>
                    <span className="text-xs font-bold text-[#1B1B1B]">+{quest.xpReward} XP</span>
                  </div>
                  <h3 className="text-base font-bold text-[#1B1B1B]">{quest.title}</h3>
                  <p className="text-xs text-[#6E6E6A] line-clamp-2">{quest.description}</p>
                </div>

                <button
                  onClick={() => handleStartDepartmentTopic(quest.title.split(' ')[0] || 'Java', quest.category)}
                  className="w-full py-2 bg-[#1B1B1B] hover:bg-[#C76A2A] text-white rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Start 10-Q Session</span>
                </button>
              </div>
            ))}
          </div>
        )}

        {/* ==================== ACTIVE 10-QUESTION TEST RUNNER MODAL ==================== */}
        <AnimatePresence>
          {activeSession && !assessmentReport && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.96, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.96, opacity: 0 }}
                className="bg-white rounded-2xl border border-[#E8E5DD] max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto"
              >
                {/* Modal Header */}
                <div className="flex items-start justify-between border-b border-[#E8E5DD] pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-[#C76A2A]/10 text-[#C76A2A]">
                        {activeSession.topic} • 10-Question Evaluation
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#1B1B1B] text-white font-mono">
                        {activeSession.questions[currentQIndex]?.difficulty} Tier
                      </span>
                    </div>
                    <h2 className="text-lg font-bold text-[#1B1B1B] mt-1">
                      Question {currentQIndex + 1} of {activeSession.questions.length}
                    </h2>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#FAF9F5] border border-[#E8E5DD] text-xs font-mono font-bold text-[#1B1B1B]">
                      <Clock className="w-3.5 h-3.5 text-[#C76A2A]" />
                      <span>{formatTimer(timeLeftSec)}</span>
                    </div>
                    <button
                      onClick={() => {
                        if (confirm('Exit assessment? Unfinished progress will be abandoned.')) {
                          setActiveSession(null);
                        }
                      }}
                      className="p-1 rounded-lg text-[#6E6E6A] hover:text-[#1B1B1B] transition-colors cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Question Stepper Indicator (1 to 10) */}
                <div className="grid grid-cols-10 gap-1.5">
                  {activeSession.questions.map((q, idx) => {
                    const isAnswered = idx < currentQIndex;
                    const isCurrent = idx === currentQIndex;
                    return (
                      <div
                        key={idx}
                        className={`h-2 rounded-full transition-all ${
                          isCurrent
                            ? 'bg-[#C76A2A] ring-2 ring-[#C76A2A]/30'
                            : isAnswered
                            ? 'bg-[#1B1B1B]'
                            : 'bg-[#E8E5DD]'
                        }`}
                      />
                    );
                  })}
                </div>

                {/* Active Question Body */}
                {activeSession.questions[currentQIndex] && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-semibold text-[#6E6E6A] uppercase font-mono">
                        Type: {activeSession.questions[currentQIndex].type}
                      </span>
                    </div>

                    <h3 className="text-sm sm:text-base font-semibold text-[#1B1B1B] leading-relaxed">
                      {activeSession.questions[currentQIndex].question}
                    </h3>

                    {/* Code Snippet Box */}
                    {activeSession.questions[currentQIndex].codeSnippet && (
                      <div className="p-4 bg-[#1B1B1B] text-[#F6F4EE] rounded-xl font-mono text-xs overflow-x-auto leading-relaxed border border-[#E8E5DD]/20">
                        <pre>{activeSession.questions[currentQIndex].codeSnippet}</pre>
                      </div>
                    )}

                    {/* Options List */}
                    <div className="space-y-2.5 pt-2">
                      {activeSession.questions[currentQIndex].options.map((opt, optIdx) => {
                        const isSelected = selectedAnswer === optIdx;
                        return (
                          <button
                            key={opt.id || optIdx}
                            type="button"
                            onClick={() => handleSelectOption(optIdx)}
                            className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all flex items-start gap-3 cursor-pointer ${
                              isSelected
                                ? 'border-[#C76A2A] bg-[#C76A2A]/5 text-[#1B1B1B] ring-1 ring-[#C76A2A]'
                                : 'border-[#E8E5DD] hover:border-[#1B1B1B] bg-white text-[#1B1B1B]'
                            }`}
                          >
                            <span
                              className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                                isSelected
                                  ? 'border-[#C76A2A] bg-[#C76A2A] text-white'
                                  : 'border-[#E8E5DD] text-[#6E6E6A]'
                              }`}
                            >
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <span className="flex-1 leading-relaxed">{opt.text}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Modal Footer Controls */}
                <div className="flex items-center justify-between pt-4 border-t border-[#E8E5DD]">
                  <span className="text-[11px] text-[#6E6E6A]">
                    Adaptive Assessment • Anti-Cheat Verification Active
                  </span>

                  <button
                    type="button"
                    disabled={selectedAnswer === null}
                    onClick={handleNextQuestion}
                    className="px-5 py-2.5 bg-[#C76A2A] hover:bg-[#B55D22] text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-all disabled:opacity-40 cursor-pointer shadow-none"
                  >
                    <span>
                      {currentQIndex < activeSession.questions.length - 1
                        ? 'Next Question'
                        : 'Submit Evaluation'}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ==================== ASSESSMENT RESULT & AUTO-EVALUATION REPORT ==================== */}
        <AnimatePresence>
          {assessmentReport && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.96, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.96, opacity: 0 }}
                className="bg-white rounded-2xl border border-[#E8E5DD] max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto"
              >
                {/* Result Header */}
                <div className="text-center space-y-2">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto border ${
                      assessmentReport.passed
                        ? 'bg-[#2F7A45]/10 text-[#2F7A45] border-[#2F7A45]/30'
                        : 'bg-red-50 text-red-600 border-red-200'
                    }`}
                  >
                    {assessmentReport.passed ? (
                      <CheckCircle2 className="w-8 h-8" />
                    ) : (
                      <AlertTriangle className="w-8 h-8" />
                    )}
                  </div>
                  <h2 className="text-2xl font-bold text-[#1B1B1B]">
                    {assessmentReport.passed ? 'Assessment Passed & Verified!' : 'Assessment Incomplete'}
                  </h2>
                  <p className="text-xs text-[#6E6E6A]">
                    {assessmentReport.passed
                      ? `Congratulations! You scored ${assessmentReport.scorePercentage}% on ${activeSession?.topic}. Your Builder Score & XP have been updated.`
                      : `You scored ${assessmentReport.scorePercentage}% (Passing threshold: ${assessmentReport.passThreshold}%). Review the topics below to prepare for your retake.`}
                  </p>
                </div>

                {/* Score Summary Grid */}
                <div className="grid grid-cols-3 gap-3 p-4 bg-[#FAF9F5] rounded-xl border border-[#E8E5DD] text-center">
                  <div>
                    <span className="text-[10px] text-[#6E6E6A] uppercase font-mono block">Score</span>
                    <span className="text-lg font-black text-[#1B1B1B]">{assessmentReport.scorePercentage}%</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#6E6E6A] uppercase font-mono block">Accuracy</span>
                    <span className="text-lg font-black text-[#1B1B1B]">
                      {assessmentReport.correctAnswers} / {assessmentReport.totalQuestions} Qs
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#6E6E6A] uppercase font-mono block">XP Earned</span>
                    <span className="text-lg font-black text-[#C76A2A] font-mono">
                      +{assessmentReport.xpEarned} XP
                    </span>
                  </div>
                </div>

                {/* Diagnostic Insights */}
                <div className="space-y-3 text-xs">
                  {assessmentReport.strengths.length > 0 && (
                    <div className="p-3.5 bg-emerald-50/50 border border-emerald-200 rounded-xl space-y-1">
                      <span className="font-bold text-emerald-900 block flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        Demonstrated Strengths
                      </span>
                      {assessmentReport.strengths.map((s, idx) => (
                        <p key={idx} className="text-emerald-800 text-[11px]">
                          • {s}
                        </p>
                      ))}
                    </div>
                  )}

                  {assessmentReport.weakAreas.length > 0 && (
                    <div className="p-3.5 bg-amber-50/50 border border-amber-200 rounded-xl space-y-1">
                      <span className="font-bold text-amber-900 block flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                        Recommended Areas to Reinforce
                      </span>
                      {assessmentReport.weakAreas.map((w, idx) => (
                        <p key={idx} className="text-amber-800 text-[11px]">
                          • {w}
                        </p>
                      ))}
                    </div>
                  )}
                </div>

                {/* Next Step Action */}
                <button
                  onClick={() => {
                    setActiveSession(null);
                    setAssessmentReport(null);
                  }}
                  className="w-full py-3 bg-[#1B1B1B] hover:bg-[#C76A2A] text-white rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Return to Assessments Hub</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PortalLayout>
  );
}
