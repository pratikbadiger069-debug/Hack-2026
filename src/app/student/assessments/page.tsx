'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { useAppStore } from '@/lib/store';
import { getLevelInfo } from '@/lib/xp-engine';
import {
  DEPARTMENT_TRACKS,
  generatePersonalizedAssessment,
  buildAssessmentAttemptRecord,
  ComprehensiveAssessmentQuestion,
  GeneratedAssessment,
} from '@/lib/assessment-bank';
import {
  AssessmentAttemptRecord,
  QuestionReviewItem,
} from '@/types';
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
  Sparkles,
  Check,
  ShieldCheck,
  Target,
  Flame,
  Brain,
  Zap,
  BookOpen,
  FileText,
  Video,
  ListOrdered,
  HelpCircle,
  BarChart3,
  Calendar,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  XCircle,
  GraduationCap,
  Layers,
} from 'lucide-react';

export default function StudentAssessmentsPage() {
  const {
    xp,
    streakDays,
    studentProfile,
    addVerifiedSkill,
    githubData,
    assessmentHistory,
    recordAssessmentAttempt,
    addXP,
  } = useAppStore();

  const userDept = studentProfile.academic?.department || studentProfile.branch || 'Computer Science';
  const targetRole = studentProfile.targetRole || studentProfile.careerPath || 'Software Development';
  const [selectedDepartment, setSelectedDepartment] = useState<string>(
    userDept.includes('AI') ? 'AI & Machine Learning' : userDept.includes('Cyber') ? 'Cybersecurity' : 'Computer Science'
  );

  // Test Runner State
  const [activeSession, setActiveSession] = useState<GeneratedAssessment | null>(null);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [sessionStartTime, setSessionStartTime] = useState<number>(Date.now());
  const [timeLeftSec, setTimeLeftSec] = useState(1200); // 20 minutes
  const [currentAttemptNumber, setCurrentAttemptNumber] = useState<number>(1);

  // Viewing Results Modal State
  const [viewingRecord, setViewingRecord] = useState<AssessmentAttemptRecord | null>(null);
  const [activeResultTab, setActiveResultTab] = useState<'summary' | 'review' | 'analytics' | 'plan'>('summary');
  const [reviewFilter, setReviewFilter] = useState<'all' | 'correct' | 'incorrect'>('all');

  const levelInfo = getLevelInfo(xp);

  // Timer countdown during active session
  useEffect(() => {
    if (!activeSession || viewingRecord) return;
    const interval = setInterval(() => {
      setTimeLeftSec((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleFinishAssessment();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [activeSession, viewingRecord]);

  const handleStartTopic = (topic: string, deptName: string, attemptNum = 1) => {
    const session = generatePersonalizedAssessment(topic, {
      department: deptName,
      branch: studentProfile.branch || userDept,
      targetRole,
      careerGoal: studentProfile.careerGoal,
      builderLevel: levelInfo.level,
      xp,
      streakDays,
      verifiedSkills: (studentProfile.verifiedSkills || []).map((s) => ({ name: s.name, score: s.score })),
      githubConnected: githubData.connected,
      attemptNumber: attemptNum,
    });

    setActiveSession(session);
    setCurrentQIndex(0);
    setSelectedOptionIndex(null);
    setUserAnswers({});
    setSessionStartTime(Date.now());
    setCurrentAttemptNumber(attemptNum);
    setViewingRecord(null);
    setTimeLeftSec(session.estimatedMinutes * 60);
  };

  const handleSelectOption = (idx: number) => {
    setSelectedOptionIndex(idx);
  };

  const handleNextQuestion = () => {
    if (selectedOptionIndex === null || !activeSession) return;

    const currentQ = activeSession.questions[currentQIndex];
    const updatedAnswers = {
      ...userAnswers,
      [currentQ.id]: selectedOptionIndex,
    };
    setUserAnswers(updatedAnswers);

    if (currentQIndex < activeSession.questions.length - 1) {
      setCurrentQIndex((prev) => prev + 1);
      const nextQId = activeSession.questions[currentQIndex + 1]?.id;
      setSelectedOptionIndex(updatedAnswers[nextQId] !== undefined ? updatedAnswers[nextQId] : null);
    } else {
      handleFinishAssessment(updatedAnswers);
    }
  };

  const handleFinishAssessment = (finalAnswers?: Record<string, number>) => {
    if (!activeSession) return;
    const answers = finalAnswers || userAnswers;
    const timeTakenSeconds = Math.max(10, Math.round((Date.now() - sessionStartTime) / 1000));

    const attemptRecord = buildAssessmentAttemptRecord(
      activeSession,
      answers,
      timeTakenSeconds,
      currentAttemptNumber
    );

    // Save to Zustand store & persist in history
    recordAssessmentAttempt(attemptRecord);
    addXP(attemptRecord.xpEarned);

    // If passed, auto-record verified skill
    if (attemptRecord.passed) {
      addVerifiedSkill(
        activeSession.topic,
        activeSession.difficultyTier === 'Industry Expert' ? 'Expert' : 'Advanced',
        (activeSession.department.includes('AI') ? 'AI & ML' : 'Programming') as any
      );
    }

    setActiveSession(null);
    setViewingRecord(attemptRecord);
    setActiveResultTab('summary');
  };

  const activeTrack = DEPARTMENT_TRACKS.find((t) => t.name === selectedDepartment) || DEPARTMENT_TRACKS[0];

  return (
    <PortalLayout>
      <div className="space-y-8 max-w-[1240px] mx-auto pb-20">
        
        {/* Header Banner */}
        <div className="p-8 rounded-3xl bg-white border border-[#E8E5DD] shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-0.5 rounded-full bg-[#C76A2A]/10 text-[#C76A2A] text-xs font-bold font-mono uppercase">
                  Assessment System 4.0
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#2F7A45]/10 text-[#2F7A45] text-xs font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Industry Certification Standard
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#1B1B1B] tracking-tight mt-1.5">
                Benchmark Skill Assessments
              </h1>
              <p className="text-xs sm:text-sm text-[#6F6A60] mt-1">
                Rigorous, randomized diagnostic evaluations with deep question-level review, learning references, and personalized AI study plans.
              </p>
            </div>

            {/* Profile Context Pill */}
            <div className="flex items-center gap-4 bg-[#F6F4EE] p-3.5 rounded-2xl border border-[#E8E5DD] text-xs self-start md:self-auto shrink-0">
              <div>
                <span className="text-[10px] text-[#6F6A60] block font-medium uppercase">Domain Track</span>
                <strong className="text-[#1B1B1B] font-bold">{userDept}</strong>
              </div>
              <div className="w-px h-8 bg-[#E8E5DD]" />
              <div>
                <span className="text-[10px] text-[#6F6A60] block font-medium uppercase">Current Level</span>
                <strong className="text-[#C76A2A] font-mono font-bold">Lvl {levelInfo.level} • {streakDays}d Streak</strong>
              </div>
            </div>
          </div>
        </div>

        {/* 6 Department Tracks Selector */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6F6A60]">
              Select Engineering &amp; Professional Domain
            </span>
            <span className="text-xs text-[#C76A2A] font-medium font-mono">
              6 Core Domains Available
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {DEPARTMENT_TRACKS.map((track) => {
              const isSelected = selectedDepartment === track.name;
              return (
                <button
                  key={track.id}
                  onClick={() => setSelectedDepartment(track.name)}
                  className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between gap-3 cursor-pointer ${
                    isSelected
                      ? 'bg-[#1B1B1B] text-white border-[#1B1B1B] shadow-sm'
                      : 'bg-white border-[#E8E5DD] hover:border-[#C76A2A] text-[#1B1B1B]'
                  }`}
                >
                  <div className="text-2xl">{track.icon}</div>
                  <div>
                    <h3 className="text-xs font-bold leading-snug">{track.name}</h3>
                    <p className={`text-[10px] mt-0.5 ${isSelected ? 'text-gray-300' : 'text-[#6F6A60]'}`}>
                      {track.topics.length} benchmark topics
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Domain Topics Grid with Retake & Completed States */}
        <div className="p-6 rounded-3xl bg-white border border-[#E8E5DD] shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E8E5DD]">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl">{activeTrack.icon}</span>
                <h2 className="text-lg font-bold text-[#1B1B1B]">{activeTrack.name} Certifications</h2>
              </div>
              <p className="text-xs text-[#6F6A60] mt-0.5">{activeTrack.description}</p>
            </div>

            <span className="text-xs font-mono font-bold text-[#2F7A45] bg-[#2F7A45]/10 px-3 py-1 rounded-full self-start sm:self-auto">
              10 Questions • Anti-Cheating Randomization
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeTrack.topics.map((topic) => {
              const attempts = assessmentHistory[topic] || [];
              const isCompleted = attempts.length > 0;
              const latestAttempt = isCompleted ? attempts[attempts.length - 1] : null;
              const bestScore = isCompleted ? Math.max(...attempts.map((a) => a.score)) : 0;
              const firstScore = isCompleted ? attempts[0].score : 0;
              const improvement = isCompleted && attempts.length > 1 ? latestAttempt!.score - firstScore : 0;

              return (
                <div
                  key={topic}
                  className={`p-5 rounded-2xl border transition-all space-y-4 flex flex-col justify-between ${
                    isCompleted
                      ? 'bg-[#FCFAF7] border-[#E8E5DD] hover:border-[#2F7A45]'
                      : 'bg-white border-[#E8E5DD] hover:border-[#1B1B1B]'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-bold text-[#1B1B1B]">{topic}</h4>
                      {isCompleted ? (
                        <span className="px-2.5 py-0.5 rounded-full bg-[#2F7A45]/10 text-[#2F7A45] text-[11px] font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          ✅ Completed
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-[#C76A2A]/10 text-[#C76A2A] text-[10px] font-bold">
                          Adaptive Tier
                        </span>
                      )}
                    </div>
                    
                    <p className="text-xs text-[#6F6A60] leading-relaxed">
                      10 diagnostic questions evaluating design patterns, error handling, performance &amp; real-world problem solving.
                    </p>

                    {/* Attempt Tracking Summary if Completed */}
                    {isCompleted && (
                      <div className="p-3 bg-white rounded-xl border border-[#E8E5DD] space-y-1.5 text-xs">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-[#6F6A60]">Attempts: <strong>#{attempts.length}</strong></span>
                          <span className="text-[#6F6A60]">Best Score: <strong className="text-[#1B1B1B] font-mono">{bestScore}%</strong></span>
                        </div>
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-[#6F6A60]">Latest: <strong className="text-[#1B1B1B] font-mono">{latestAttempt?.score}%</strong></span>
                          {attempts.length > 1 && (
                            <span className={`font-bold font-mono flex items-center gap-0.5 ${improvement >= 0 ? 'text-[#2F7A45]' : 'text-red-500'}`}>
                              <TrendingUp className="w-3 h-3" />
                              {improvement >= 0 ? `+${improvement}%` : `${improvement}%`}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 flex items-center justify-between border-t border-[#E8E5DD] text-xs">
                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#6F6A60]">
                      <Clock className="w-3.5 h-3.5" />
                      <span>20 Mins</span>
                      <span>•</span>
                      <span className="text-[#C76A2A] font-bold">+100 XP</span>
                    </div>

                    {isCompleted ? (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setViewingRecord(latestAttempt);
                            setActiveResultTab('summary');
                          }}
                          className="px-2.5 py-1.5 bg-[#F6F4EE] hover:bg-[#E8E5DD] text-[#1B1B1B] text-xs font-bold rounded-xl transition-colors cursor-pointer"
                        >
                          View Results
                        </button>
                        <button
                          onClick={() => handleStartTopic(topic, activeTrack.name, attempts.length + 1)}
                          className="px-3 py-1.5 bg-[#1B1B1B] hover:bg-[#C76A2A] text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                        >
                          <RotateCcw className="w-3 h-3" />
                          <span>Retake</span>
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleStartTopic(topic, activeTrack.name, 1)}
                        className="px-3 py-1.5 bg-[#1B1B1B] hover:bg-[#C76A2A] text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <Play className="w-3 h-3 fill-current" />
                        <span>Start Assessment</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Active Assessment Runner Modal */}
      {activeSession && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-[#E8E5DD] max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[92vh] overflow-y-auto">
            {/* Modal Top Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E5DD]">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-[#C76A2A]/10 text-[#C76A2A] text-[10px] font-mono font-bold uppercase">
                    {activeSession.difficultyTier} • Attempt #{currentAttemptNumber}
                  </span>
                  <span className="text-xs text-[#6F6A60]">
                    Question {currentQIndex + 1} of {activeSession.questions.length}
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#1B1B1B] mt-0.5">{activeSession.title}</h3>
              </div>

              {/* Timer Pill */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#F6F4EE] border border-[#E8E5DD] text-xs font-mono font-bold text-[#1B1B1B]">
                <Clock className="w-3.5 h-3.5 text-[#C76A2A]" />
                <span>{Math.floor(timeLeftSec / 60)}:{String(timeLeftSec % 60).padStart(2, '0')}</span>
              </div>
            </div>

            {/* Question Progress Bar */}
            <div className="w-full h-1.5 bg-[#F6F4EE] rounded-full overflow-hidden border border-[#E8E5DD]">
              <div
                className="h-full bg-[#C76A2A] rounded-full transition-all duration-300"
                style={{ width: `${((currentQIndex + 1) / activeSession.questions.length) * 100}%` }}
              />
            </div>

            {/* Question Context & Code Snippet */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[11px] font-bold text-[#6F6A60] uppercase tracking-wider">
                <span>{activeSession.questions[currentQIndex]?.subtopic || activeSession.questions[currentQIndex]?.topic}</span>
                <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-700">
                  {activeSession.questions[currentQIndex]?.difficulty}
                </span>
              </div>
              <p className="text-sm font-bold text-[#1B1B1B] leading-relaxed">
                {activeSession.questions[currentQIndex]?.question}
              </p>

              {activeSession.questions[currentQIndex]?.codeSnippet && (
                <pre className="p-3.5 rounded-xl bg-[#1B1B1B] text-gray-100 font-mono text-xs overflow-x-auto border border-gray-800">
                  <code>{activeSession.questions[currentQIndex]?.codeSnippet}</code>
                </pre>
              )}
            </div>

            {/* Multiple Choice Options */}
            <div className="space-y-2.5 pt-1">
              {activeSession.questions[currentQIndex]?.options.map((opt, idx) => {
                const isSelected = selectedOptionIndex === idx;
                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full p-3.5 rounded-2xl border text-left text-xs transition-all flex items-center justify-between gap-3 cursor-pointer ${
                      isSelected
                        ? 'bg-[#1B1B1B] text-white border-[#1B1B1B] shadow-xs'
                        : 'bg-white border-[#E8E5DD] hover:border-[#C76A2A] text-[#1B1B1B]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                          isSelected ? 'bg-white text-[#1B1B1B]' : 'bg-[#F6F4EE] text-[#6F6A60]'
                        }`}
                      >
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="leading-snug">{opt.text}</span>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-[#C76A2A] shrink-0" />}
                  </button>
                );
              })}
            </div>

            {/* Footer Controls */}
            <div className="flex items-center justify-between pt-3 border-t border-[#E8E5DD]">
              <button
                onClick={() => setActiveSession(null)}
                className="px-3 py-1.5 text-xs text-[#6F6A60] hover:text-[#1B1B1B] transition-colors cursor-pointer"
              >
                Quit Assessment
              </button>

              <button
                onClick={handleNextQuestion}
                disabled={selectedOptionIndex === null}
                className="px-5 py-2.5 bg-[#1B1B1B] hover:bg-[#C76A2A] text-white text-xs font-bold rounded-xl transition-all disabled:opacity-40 flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <span>{currentQIndex === activeSession.questions.length - 1 ? 'Finish & Generate Report' : 'Next Question'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Assessment Results & Certification Report Modal (Assessment System 4.0) */}
      {viewingRecord && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
          <div className="bg-white rounded-3xl border border-[#E8E5DD] max-w-4xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[94vh] overflow-y-auto">
            
            {/* Header / Close */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#E8E5DD]">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#C76A2A]/10 text-[#C76A2A] text-xs font-mono font-bold uppercase">
                    Attempt #{viewingRecord.attemptNumber} Report
                  </span>
                  <span className="text-xs text-[#6F6A60]">{viewingRecord.date}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#1B1B1B] tracking-tight mt-1">
                  {viewingRecord.topic} Assessment Report
                </h2>
                <p className="text-xs text-[#6F6A60] mt-0.5">
                  Verified diagnostic analysis, answer explanations, dynamic resources, and AI learning plan.
                </p>
              </div>

              <button
                onClick={() => setViewingRecord(null)}
                className="p-2 rounded-xl bg-[#F6F4EE] hover:bg-[#E8E5DD] text-[#6F6A60] hover:text-[#1B1B1B] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-2 border-b border-[#E8E5DD] pb-2 overflow-x-auto text-xs font-bold">
              {[
                { id: 'summary', label: 'Summary Overview', icon: Award },
                { id: 'review', label: `Question Review (${viewingRecord.reviewItems.length})`, icon: ListOrdered },
                { id: 'analytics', label: 'Performance Analytics', icon: BarChart3 },
                { id: 'plan', label: 'AI Learning Plan', icon: Brain },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeResultTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveResultTab(tab.id as any)}
                    className={`px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                      isActive
                        ? 'bg-[#1B1B1B] text-white shadow-xs'
                        : 'bg-[#F6F4EE] text-[#6F6A60] hover:text-[#1B1B1B]'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab 1: Summary Section */}
            {activeResultTab === 'summary' && (
              <div className="space-y-6">
                {/* Result Hero Banner */}
                <div
                  className={`p-6 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4 ${
                    viewingRecord.passed
                      ? 'bg-[#2F7A45]/5 border-[#2F7A45]/30'
                      : 'bg-orange-50/60 border-orange-200'
                  }`}
                >
                  <div className="flex items-center gap-4 text-center sm:text-left">
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0 ${
                        viewingRecord.passed ? 'bg-[#2F7A45]/15 text-[#2F7A45]' : 'bg-orange-100 text-orange-600'
                      }`}
                    >
                      {viewingRecord.passed ? '🏆' : '🎯'}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 justify-center sm:justify-start">
                        <span
                          className={`text-xs font-bold uppercase px-2 py-0.5 rounded-md ${
                            viewingRecord.passed ? 'bg-[#2F7A45] text-white' : 'bg-orange-600 text-white'
                          }`}
                        >
                          {viewingRecord.passed ? 'PASS' : 'NEEDS REVISION'}
                        </span>
                        <span className="text-xs text-[#6F6A60]">Difficulty: {viewingRecord.difficultyReached}</span>
                      </div>
                      <h3 className="text-lg font-bold text-[#1B1B1B] mt-1">
                        {viewingRecord.passed
                          ? `Passed with ${viewingRecord.score}% Score`
                          : `Completed with ${viewingRecord.score}% Score`}
                      </h3>
                      <p className="text-xs text-[#6F6A60] mt-0.5">
                        {viewingRecord.passed
                          ? 'Demonstrated strong domain competence. Verified proof badge applied to your profile.'
                          : 'Review weak concept questions below and execute your personalized 5-Day study plan to retake.'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => {
                        const nextAttempt = (assessmentHistory[viewingRecord.topic] || []).length + 1;
                        setViewingRecord(null);
                        handleStartTopic(viewingRecord.topic, viewingRecord.department, nextAttempt);
                      }}
                      className="px-4 py-2.5 bg-[#1B1B1B] hover:bg-[#C76A2A] text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Retake Assessment</span>
                    </button>
                  </div>
                </div>

                {/* Performance Metric Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-4 bg-[#F6F4EE] rounded-2xl border border-[#E8E5DD] space-y-1">
                    <span className="text-[10px] text-[#6F6A60] uppercase font-bold block">Total Questions</span>
                    <strong className="text-2xl font-bold font-mono text-[#1B1B1B]">{viewingRecord.totalQuestions}</strong>
                    <div className="text-[10px] text-[#6F6A60] flex items-center gap-2 pt-0.5">
                      <span className="text-[#2F7A45] font-bold">{viewingRecord.correctCount} Correct</span>
                      <span>•</span>
                      <span className="text-red-500 font-bold">{viewingRecord.wrongCount} Wrong</span>
                    </div>
                  </div>

                  <div className="p-4 bg-[#F6F4EE] rounded-2xl border border-[#E8E5DD] space-y-1">
                    <span className="text-[10px] text-[#6F6A60] uppercase font-bold block">Score Percentage</span>
                    <strong className="text-2xl font-bold font-mono text-[#1B1B1B]">{viewingRecord.score}%</strong>
                    <span className="text-[10px] text-[#6F6A60] block pt-0.5">Pass Threshold: 70%</span>
                  </div>

                  <div className="p-4 bg-[#F6F4EE] rounded-2xl border border-[#E8E5DD] space-y-1">
                    <span className="text-[10px] text-[#6F6A60] uppercase font-bold block">XP Earned</span>
                    <strong className="text-2xl font-bold font-mono text-[#C76A2A]">+{viewingRecord.xpEarned} XP</strong>
                    <span className="text-[10px] text-[#6F6A60] block pt-0.5">Impact: +{viewingRecord.builderScoreImpact} pts</span>
                  </div>

                  <div className="p-4 bg-[#F6F4EE] rounded-2xl border border-[#E8E5DD] space-y-1">
                    <span className="text-[10px] text-[#6F6A60] uppercase font-bold block">Time Taken</span>
                    <strong className="text-2xl font-bold font-mono text-[#1B1B1B]">{viewingRecord.timeTakenFormatted}</strong>
                    <span className="text-[10px] text-[#6F6A60] block pt-0.5">Avg: {Math.round(viewingRecord.timeTakenSeconds / viewingRecord.totalQuestions)}s / question</span>
                  </div>
                </div>

                {/* Quick Diagnostics Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-white rounded-2xl border border-[#E8E5DD] space-y-2">
                    <span className="text-xs font-bold text-[#2F7A45] flex items-center gap-1.5 uppercase tracking-wider">
                      <CheckCircle2 className="w-4 h-4" /> Strong Concept Areas
                    </span>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {viewingRecord.strongAreas.map((area) => (
                        <span key={area} className="px-2.5 py-1 bg-[#2F7A45]/10 text-[#2F7A45] text-xs font-bold rounded-lg">
                          ✓ {area}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-white rounded-2xl border border-[#E8E5DD] space-y-2">
                    <span className="text-xs font-bold text-[#C76A2A] flex items-center gap-1.5 uppercase tracking-wider">
                      <AlertTriangle className="w-4 h-4" /> Areas Requiring Revision
                    </span>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {viewingRecord.weakAreas.map((area) => (
                        <span key={area} className="px-2.5 py-1 bg-red-50 text-red-600 text-xs font-bold rounded-lg border border-red-100">
                          ⚠ {area}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Callout to Question Review */}
                <div className="p-4 bg-[#F6F4EE] rounded-2xl border border-[#E8E5DD] flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-5 h-5 text-[#C76A2A]" />
                    <div>
                      <h4 className="text-xs font-bold text-[#1B1B1B]">Examine Every Question &amp; Solution</h4>
                      <p className="text-[11px] text-[#6F6A60]">Review explanations, diagnostic root causes, and official documentation.</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveResultTab('review')}
                    className="px-3.5 py-1.5 bg-white border border-[#E8E5DD] hover:border-[#1B1B1B] text-[#1B1B1B] text-xs font-bold rounded-xl transition-colors cursor-pointer shrink-0"
                  >
                    Open Review
                  </button>
                </div>
              </div>
            )}

            {/* Tab 2: Question Review Section (with Why Missed + Learning References) */}
            {activeResultTab === 'review' && (
              <div className="space-y-4">
                {/* Review Filters */}
                <div className="flex items-center justify-between pb-2 border-b border-[#E8E5DD]">
                  <span className="text-xs font-bold text-[#6F6A60]">Filter Questions:</span>
                  <div className="flex items-center gap-1.5 text-xs">
                    {(['all', 'correct', 'incorrect'] as const).map((filter) => (
                      <button
                        key={filter}
                        onClick={() => setReviewFilter(filter)}
                        className={`px-3 py-1 rounded-lg font-bold capitalize transition-colors cursor-pointer ${
                          reviewFilter === filter
                            ? 'bg-[#1B1B1B] text-white'
                            : 'bg-[#F6F4EE] text-[#6F6A60] hover:text-[#1B1B1B]'
                        }`}
                      >
                        {filter} {filter === 'correct' ? `(${viewingRecord.correctCount})` : filter === 'incorrect' ? `(${viewingRecord.wrongCount})` : `(${viewingRecord.totalQuestions})`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Questions List */}
                <div className="space-y-4">
                  {viewingRecord.reviewItems
                    .filter((item) => {
                      if (reviewFilter === 'correct') return item.isCorrect;
                      if (reviewFilter === 'incorrect') return !item.isCorrect;
                      return true;
                    })
                    .map((item) => (
                      <div
                        key={item.questionId}
                        className={`p-5 rounded-2xl border space-y-4 ${
                          item.isCorrect ? 'bg-white border-[#E8E5DD]' : 'bg-red-50/20 border-red-200/80'
                        }`}
                      >
                        {/* Question Header */}
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-bold text-[#6F6A60]">
                              Question {item.questionNumber}
                            </span>
                            <span className="text-[11px] font-bold text-[#6F6A60] bg-[#F6F4EE] px-2 py-0.5 rounded">
                              {item.subtopic}
                            </span>
                            <span className="text-[10px] text-gray-500 font-mono">
                              [{item.difficulty}]
                            </span>
                          </div>

                          <span
                            className={`px-2.5 py-0.5 rounded-full text-xs font-bold flex items-center gap-1 ${
                              item.isCorrect
                                ? 'bg-[#2F7A45]/10 text-[#2F7A45]'
                                : 'bg-red-100 text-red-700'
                            }`}
                          >
                            {item.isCorrect ? (
                              <>
                                <CheckCircle2 className="w-3.5 h-3.5" /> Correct
                              </>
                            ) : (
                              <>
                                <XCircle className="w-3.5 h-3.5" /> Incorrect
                              </>
                            )}
                          </span>
                        </div>

                        {/* Question Body */}
                        <p className="text-xs sm:text-sm font-bold text-[#1B1B1B] leading-relaxed">
                          {item.question}
                        </p>

                        {item.codeSnippet && (
                          <pre className="p-3 rounded-xl bg-[#1B1B1B] text-gray-100 font-mono text-xs overflow-x-auto">
                            <code>{item.codeSnippet}</code>
                          </pre>
                        )}

                        {/* User Answer vs Correct Answer Box */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                          <div
                            className={`p-3 rounded-xl border ${
                              item.isCorrect
                                ? 'bg-[#2F7A45]/5 border-[#2F7A45]/30 text-[#1B1B1B]'
                                : 'bg-red-50 border-red-200 text-red-900'
                            }`}
                          >
                            <span className="text-[10px] font-bold uppercase block opacity-70">Your Answer:</span>
                            <strong className="mt-0.5 block leading-snug">{item.userAnswerText}</strong>
                          </div>

                          <div className="p-3 rounded-xl bg-[#2F7A45]/10 border border-[#2F7A45]/30 text-[#1B1B1B]">
                            <span className="text-[10px] font-bold uppercase text-[#2F7A45] block">Correct Answer:</span>
                            <strong className="mt-0.5 block leading-snug text-[#2F7A45]">{item.correctAnswerText}</strong>
                          </div>
                        </div>

                        {/* Explanation & Diagnostic */}
                        <div className="p-3.5 bg-[#F6F4EE] rounded-xl border border-[#E8E5DD] space-y-2 text-xs">
                          <div>
                            <span className="font-bold text-[#1B1B1B] block">Explanation:</span>
                            <p className="text-[#6F6A60] mt-0.5 leading-relaxed">{item.explanation}</p>
                          </div>

                          {!item.isCorrect && item.whyMissed && (
                            <div className="pt-2 border-t border-[#E8E5DD]">
                              <span className="font-bold text-[#C76A2A] block flex items-center gap-1">
                                <AlertTriangle className="w-3.5 h-3.5" /> Why You Missed It:
                              </span>
                              <p className="text-[#6F6A60] mt-0.5 leading-relaxed">{item.whyMissed}</p>
                            </div>
                          )}
                        </div>

                        {/* Dynamic Learning References (Assessment 4.0 requirement) */}
                        {item.references && (
                          <div className="p-4 bg-white rounded-xl border border-[#E8E5DD] space-y-2.5">
                            <span className="text-[11px] font-bold text-[#1B1B1B] uppercase tracking-wider block">
                              📘 Targeted Learning References for {item.subtopic}:
                            </span>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                              <a
                                href={item.references.officialDocs.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2.5 rounded-lg bg-[#F6F4EE] hover:bg-[#E8E5DD] transition-colors flex items-center justify-between text-[#1B1B1B]"
                              >
                                <span className="flex items-center gap-2 truncate">
                                  <span className="text-base">📘</span>
                                  <span className="truncate font-medium">{item.references.officialDocs.title}</span>
                                </span>
                                <ExternalLink className="w-3.5 h-3.5 text-[#6F6A60] shrink-0" />
                              </a>

                              <a
                                href={item.references.article.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2.5 rounded-lg bg-[#F6F4EE] hover:bg-[#E8E5DD] transition-colors flex items-center justify-between text-[#1B1B1B]"
                              >
                                <span className="flex items-center gap-2 truncate">
                                  <span className="text-base">📖</span>
                                  <span className="truncate font-medium">{item.references.article.title}</span>
                                </span>
                                <ExternalLink className="w-3.5 h-3.5 text-[#6F6A60] shrink-0" />
                              </a>

                              <a
                                href={item.references.videoTutorial.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2.5 rounded-lg bg-[#F6F4EE] hover:bg-[#E8E5DD] transition-colors flex items-center justify-between text-[#1B1B1B]"
                              >
                                <span className="flex items-center gap-2 truncate">
                                  <span className="text-base">📺</span>
                                  <span className="truncate font-medium">{item.references.videoTutorial.title}</span>
                                </span>
                                <ExternalLink className="w-3.5 h-3.5 text-[#6F6A60] shrink-0" />
                              </a>

                              <a
                                href={item.references.practiceQuestions.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2.5 rounded-lg bg-[#F6F4EE] hover:bg-[#E8E5DD] transition-colors flex items-center justify-between text-[#1B1B1B]"
                              >
                                <span className="flex items-center gap-2 truncate">
                                  <span className="text-base">📝</span>
                                  <span className="truncate font-medium">{item.references.practiceQuestions.title}</span>
                                </span>
                                <ExternalLink className="w-3.5 h-3.5 text-[#6F6A60] shrink-0" />
                              </a>
                            </div>

                            <div className="p-2 rounded-lg bg-[#2F7A45]/5 border border-[#2F7A45]/20 text-[11px] text-[#2F7A45] font-bold flex items-center gap-1.5">
                              <span>🎯 Mini Assessment Drill:</span>
                              <span className="font-normal text-[#1B1B1B]">{item.references.miniAssessment.title}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Tab 3: Performance Analytics */}
            {activeResultTab === 'analytics' && (
              <div className="space-y-6">
                {/* Accuracy Gauge & Difficulty Breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Accuracy Meter */}
                  <div className="p-5 bg-white rounded-2xl border border-[#E8E5DD] space-y-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#6F6A60] block">
                      Overall Accuracy Breakdown
                    </span>

                    <div className="flex items-center justify-between">
                      <div className="text-3xl font-bold font-mono text-[#1B1B1B]">
                        {viewingRecord.score}%
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          viewingRecord.passed ? 'bg-[#2F7A45]/10 text-[#2F7A45]' : 'bg-red-50 text-red-600'
                        }`}
                      >
                        {viewingRecord.passed ? 'Benchmark Met' : 'Below 70% Benchmark'}
                      </span>
                    </div>

                    <div className="w-full h-3 bg-[#F6F4EE] rounded-full overflow-hidden border border-[#E8E5DD]">
                      <div
                        className="h-full bg-[#2F7A45] rounded-full"
                        style={{ width: `${viewingRecord.score}%` }}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-[#E8E5DD]">
                      <div>
                        <span className="text-[#6F6A60]">Correct:</span>{' '}
                        <strong className="text-[#2F7A45]">{viewingRecord.correctCount}</strong>
                      </div>
                      <div>
                        <span className="text-[#6F6A60]">Incorrect:</span>{' '}
                        <strong className="text-red-500">{viewingRecord.wrongCount}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Difficulty Breakdown (Easy / Medium / Hard / Expert) */}
                  <div className="p-5 bg-white rounded-2xl border border-[#E8E5DD] space-y-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#6F6A60] block">
                      Difficulty Breakdown
                    </span>

                    <div className="space-y-2.5 text-xs">
                      {(['easy', 'medium', 'hard', 'expert'] as const).map((diff) => {
                        const data = viewingRecord.difficultyBreakdown?.[diff] || { correct: 0, total: 0 };
                        const percent = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0;
                        return (
                          <div key={diff} className="space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="font-bold capitalize text-[#1B1B1B]">{diff} Tier</span>
                              <span className="font-mono text-[#6F6A60]">
                                {data.correct}/{data.total} ({percent}%)
                              </span>
                            </div>
                            <div className="w-full h-2 bg-[#F6F4EE] rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${
                                  diff === 'expert' ? 'bg-[#C76A2A]' : diff === 'hard' ? 'bg-[#1B1B1B]' : 'bg-[#2F7A45]'
                                }`}
                                style={{ width: `${percent}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Topic Strength Analysis */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 bg-[#2F7A45]/5 rounded-2xl border border-[#2F7A45]/30 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#2F7A45] uppercase">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Strong Areas</span>
                    </div>
                    <ul className="space-y-2 text-xs text-[#1B1B1B]">
                      {viewingRecord.strongAreas.map((area) => (
                        <li key={area} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#2F7A45]" />
                          <span className="font-bold">{area}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-5 bg-red-50/40 rounded-2xl border border-red-200 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-red-600 uppercase">
                      <AlertTriangle className="w-4 h-4" />
                      <span>Weak Areas</span>
                    </div>
                    <ul className="space-y-2 text-xs text-[#1B1B1B]">
                      {viewingRecord.weakAreas.map((area) => (
                        <li key={area} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                          <span className="font-bold">{area}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Skill Gap Analysis with Recommendations */}
                <div className="p-5 bg-white rounded-2xl border border-[#E8E5DD] space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-[#1B1B1B]">Skill Gap Analysis</h4>
                      <p className="text-xs text-[#6F6A60]">Automatic detection of weak concepts with remediation directives.</p>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-md bg-[#C76A2A]/10 text-[#C76A2A] text-xs font-bold font-mono">
                      {viewingRecord.skillGapRecommendations?.length || 0} Gaps Detected
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {viewingRecord.skillGapRecommendations?.map((gap, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 bg-[#F6F4EE] rounded-xl border border-[#E8E5DD] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                      >
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-[#1B1B1B]">{gap.concept}</span>
                            <span className="px-2 py-0.5 rounded bg-red-100 text-red-700 text-[10px] font-bold">
                              {gap.gapSeverity}
                            </span>
                          </div>
                          <p className="text-[#6F6A60]">{gap.action}</p>
                        </div>

                        <a
                          href={gap.resourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 bg-white border border-[#E8E5DD] hover:border-[#1B1B1B] text-[#1B1B1B] font-bold rounded-lg text-xs flex items-center gap-1.5 shrink-0 self-start sm:self-auto cursor-pointer"
                        >
                          <span>Review Concept</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab 4: AI Learning Recommendations (5-Day Structured Plan) */}
            {activeResultTab === 'plan' && (
              <div className="space-y-5">
                <div className="p-4 bg-[#F6F4EE] rounded-2xl border border-[#E8E5DD] space-y-1">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#C76A2A]" />
                    <h3 className="text-sm font-bold text-[#1B1B1B]">Personalized 5-Day Improvement Plan</h3>
                  </div>
                  <p className="text-xs text-[#6F6A60]">
                    Generated by SkillBridge AI Engine based on your missed questions in {viewingRecord.topic}. Complete these drills before your next attempt.
                  </p>
                </div>

                <div className="space-y-3">
                  {viewingRecord.aiStudyPlan?.map((planItem, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-white rounded-2xl border border-[#E8E5DD] space-y-2 hover:border-[#1B1B1B] transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-md bg-[#1B1B1B] text-white text-xs font-mono font-bold">
                            {planItem.day}
                          </span>
                          <h4 className="text-xs sm:text-sm font-bold text-[#1B1B1B]">{planItem.title}</h4>
                        </div>
                        <span className="text-xs text-[#6F6A60] font-mono flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {planItem.estimatedMinutes} Mins
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                        <div className="p-2.5 bg-[#F6F4EE] rounded-xl">
                          <span className="text-[10px] text-[#6F6A60] uppercase font-bold block">Focus Area</span>
                          <p className="font-medium text-[#1B1B1B] mt-0.5">{planItem.focus}</p>
                        </div>
                        <div className="p-2.5 bg-[#F6F4EE] rounded-xl">
                          <span className="text-[10px] text-[#6F6A60] uppercase font-bold block">Daily Action Item</span>
                          <p className="font-medium text-[#1B1B1B] mt-0.5">{planItem.task}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Retake CTA */}
                <div className="p-5 bg-white rounded-2xl border border-[#E8E5DD] text-center space-y-3">
                  <h4 className="text-sm font-bold text-[#1B1B1B]">Ready to certify after your preparation?</h4>
                  <button
                    onClick={() => {
                      const nextAttempt = (assessmentHistory[viewingRecord.topic] || []).length + 1;
                      setViewingRecord(null);
                      handleStartTopic(viewingRecord.topic, viewingRecord.department, nextAttempt);
                    }}
                    className="px-6 py-2.5 bg-[#1B1B1B] hover:bg-[#C76A2A] text-white text-xs font-bold rounded-xl transition-colors shadow-xs cursor-pointer inline-flex items-center gap-2"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Launch Retake Assessment (Attempt #{viewingRecord.attemptNumber + 1})</span>
                  </button>
                </div>
              </div>
            )}

            {/* Modal Bottom Close */}
            <div className="pt-3 border-t border-[#E8E5DD] flex items-center justify-between">
              <button
                onClick={() => setViewingRecord(null)}
                className="px-4 py-2 bg-[#F6F4EE] hover:bg-[#E8E5DD] text-[#1B1B1B] text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                Close Report
              </button>

              <button
                onClick={() => {
                  const nextAttempt = (assessmentHistory[viewingRecord.topic] || []).length + 1;
                  setViewingRecord(null);
                  handleStartTopic(viewingRecord.topic, viewingRecord.department, nextAttempt);
                }}
                className="px-5 py-2 bg-[#1B1B1B] hover:bg-[#C76A2A] text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Path</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </PortalLayout>
  );
}
