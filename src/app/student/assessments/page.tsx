'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { useAppStore } from '@/lib/store';
import {
  getLevelInfo,
  generateStrictAssessmentReport,
  StrictAssessmentReport,
} from '@/lib/xp-engine';
import {
  DEPARTMENT_TRACKS,
  generatePersonalizedAssessment,
  ComprehensiveAssessmentQuestion,
  GeneratedAssessment,
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
  Sparkles,
  Check,
  ShieldCheck,
  Target,
  Flame,
  Brain,
  Zap,
} from 'lucide-react';

export default function StudentAssessmentsPage() {
  const {
    quests,
    xp,
    streakDays,
    studentProfile,
    addVerifiedSkill,
    githubData,
  } = useAppStore();

  const userDept = studentProfile.academic?.department || studentProfile.branch || 'Computer Science';
  const targetRole = studentProfile.targetRole || studentProfile.careerPath || 'Software Development';
  const [selectedDepartment, setSelectedDepartment] = useState<string>(
    userDept.includes('AI') ? 'AI & Machine Learning' : userDept.includes('Cyber') ? 'Cybersecurity' : 'Computer Science'
  );

  // Test Runner State for Personalized 10-Question Session
  const [activeSession, setActiveSession] = useState<GeneratedAssessment | null>(null);
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

  const handleStartTopic = (topic: string, deptName: string) => {
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
    });

    setActiveSession(session);
    setCurrentQIndex(0);
    setSelectedAnswer(null);
    setAnswersLog([]);
    setQuestionStartTime(Date.now());
    setAssessmentReport(null);
    setTimeLeftSec(session.estimatedMinutes * 60);
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
        difficulty: activeSession.difficultyTier === 'Industry Expert' ? 'Expert' : 'Advanced',
        xpReward: activeSession.xpReward,
      },
      finalLog,
      xp
    );

    setAssessmentReport(report);

    // If passed, auto-record verified skill
    if (report.passed) {
      addVerifiedSkill(
        activeSession.topic,
        activeSession.difficultyTier === 'Industry Expert' ? 'Expert' : 'Advanced',
        (activeSession.department.includes('AI') ? 'AI & ML' : 'Programming') as any
      );
    }
  };

  const activeTrack = DEPARTMENT_TRACKS.find((t) => t.name === selectedDepartment) || DEPARTMENT_TRACKS[0];

  return (
    <PortalLayout>
      <div className="space-y-8 max-w-[1200px] mx-auto pb-16">
        
        {/* Header with True Personalization Metadata */}
        <div className="p-8 rounded-3xl bg-white border border-[#E8E5DD] shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#C76A2A]/10 text-[#C76A2A] text-xs font-bold font-mono uppercase">
                  Assessment Engine 3.0
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#2F7A45]/10 text-[#2F7A45] text-xs font-bold flex items-center gap-1">
                  <Brain className="w-3.5 h-3.5" />
                  Dynamic Personalization Active
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#1B1B1B] tracking-tight mt-1">
                Personalized Skill Assessments
              </h1>
              <p className="text-xs text-[#6F6A60] mt-0.5">
                Questions dynamically calibrated on your Department ({userDept}), Target Role ({targetRole}), Level ({levelInfo.level}), and GitHub proof.
              </p>
            </div>

            {/* Profile Context Pill */}
            <div className="flex items-center gap-3 bg-[#F6F4EE] p-3 rounded-2xl border border-[#E8E5DD] text-xs self-start md:self-auto">
              <div>
                <span className="text-[10px] text-[#6F6A60] block font-medium">Target Career Path</span>
                <strong className="text-[#1B1B1B] font-bold">{targetRole}</strong>
              </div>
              <div className="w-px h-8 bg-[#E8E5DD]" />
              <div>
                <span className="text-[10px] text-[#6F6A60] block font-medium">Level &amp; Streak</span>
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
                  className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between gap-3 ${
                    isSelected
                      ? 'bg-[#1B1B1B] text-white border-[#1B1B1B] shadow-sm'
                      : 'bg-white border-[#E8E5DD] hover:border-[#C76A2A] text-[#1B1B1B]'
                  }`}
                >
                  <div className="text-2xl">{track.icon}</div>
                  <div>
                    <h3 className="text-xs font-bold leading-snug">{track.name}</h3>
                    <p className={`text-[10px] mt-0.5 ${isSelected ? 'text-gray-300' : 'text-[#6F6A60]'}`}>
                      {track.topics.length} evaluation paths
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Domain Topics Grid with Smart Adaptive Level Badges */}
        <div className="p-6 rounded-3xl bg-white border border-[#E8E5DD] shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#E8E5DD]">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl">{activeTrack.icon}</span>
                <h2 className="text-lg font-bold text-[#1B1B1B]">{activeTrack.name} Benchmark Paths</h2>
              </div>
              <p className="text-xs text-[#6F6A60] mt-0.5">{activeTrack.description}</p>
            </div>

            <span className="text-xs font-mono font-bold text-[#2F7A45] bg-[#2F7A45]/10 px-2.5 py-1 rounded-full self-start sm:self-auto">
              10 Questions • Proctored
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeTrack.topics.map((topic) => {
              const isVerified = (studentProfile.verifiedSkills || []).some(
                (s) => s.name.toLowerCase().includes(topic.toLowerCase())
              );
              const verifiedSkillObj = (studentProfile.verifiedSkills || []).find(
                (s) => s.name.toLowerCase().includes(topic.toLowerCase())
              );

              return (
                <div
                  key={topic}
                  className="p-5 rounded-2xl bg-white border border-[#E8E5DD] hover:border-[#1B1B1B] transition-all space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-bold text-[#1B1B1B]">{topic}</h4>
                      {isVerified ? (
                        <span className="px-2 py-0.5 rounded-full bg-[#2F7A45]/10 text-[#2F7A45] text-[10px] font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          {verifiedSkillObj?.score}% Verified
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-[#C76A2A]/10 text-[#C76A2A] text-[10px] font-bold">
                          Adaptive Tier
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#6F6A60] line-clamp-2">
                      10 questions evaluating algorithms, architecture, edge cases, and industry real-world scenarios.
                    </p>
                  </div>

                  <div className="pt-2 flex items-center justify-between border-t border-[#E8E5DD] text-xs">
                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#6F6A60]">
                      <Clock className="w-3.5 h-3.5" />
                      <span>20 Mins</span>
                      <span>•</span>
                      <span className="text-[#C76A2A] font-bold">+100 XP</span>
                    </div>

                    <button
                      onClick={() => handleStartTopic(topic, activeTrack.name)}
                      className="px-3 py-1.5 bg-[#1B1B1B] hover:bg-[#C76A2A] text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>{isVerified ? 'Retake Path' : 'Start Path'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Dynamic 10-Question Assessment Runner Modal */}
      {activeSession && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-[#E8E5DD] max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            
            {!assessmentReport ? (
              <>
                {/* Modal Top Bar */}
                <div className="flex items-center justify-between pb-3 border-b border-[#E8E5DD]">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md bg-[#C76A2A]/10 text-[#C76A2A] text-[10px] font-mono font-bold uppercase">
                        {activeSession.difficultyTier}
                      </span>
                      <span className="text-xs text-[#6F6A60]">Question {currentQIndex + 1} of {activeSession.questions.length}</span>
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

                {/* Question Text */}
                <div className="space-y-3">
                  <span className="text-[11px] font-bold text-[#6F6A60] uppercase tracking-wider block">
                    {activeSession.questions[currentQIndex]?.type || 'Scenario Based'} • Difficulty: {activeSession.questions[currentQIndex]?.difficulty}
                  </span>
                  <p className="text-sm font-bold text-[#1B1B1B] leading-relaxed">
                    {activeSession.questions[currentQIndex]?.question}
                  </p>
                </div>

                {/* Multiple Choice Options */}
                <div className="space-y-2.5 pt-1">
                  {activeSession.questions[currentQIndex]?.options.map((opt, idx) => {
                    const isSelected = selectedAnswer === idx;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => handleSelectOption(idx)}
                        className={`w-full p-3.5 rounded-2xl border text-left text-xs transition-all flex items-center justify-between gap-3 ${
                          isSelected
                            ? 'bg-[#1B1B1B] text-white border-[#1B1B1B] shadow-xs'
                            : 'bg-white border-[#E8E5DD] hover:border-[#C76A2A] text-[#1B1B1B]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs ${
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
                    className="px-3 py-1.5 text-xs text-[#6F6A60] hover:text-[#1B1B1B] transition-colors"
                  >
                    Quit Assessment
                  </button>

                  <button
                    onClick={handleNextQuestion}
                    disabled={selectedAnswer === null}
                    className="px-5 py-2.5 bg-[#1B1B1B] hover:bg-[#C76A2A] text-white text-xs font-bold rounded-xl transition-all disabled:opacity-40 flex items-center gap-2 cursor-pointer shadow-xs"
                  >
                    <span>{currentQIndex === activeSession.questions.length - 1 ? 'Finish & Generate Report' : 'Next Question'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </>
            ) : (
              /* Report View */
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <div
                    className={`w-16 h-16 rounded-3xl mx-auto flex items-center justify-center text-2xl ${
                      assessmentReport.passed
                        ? 'bg-[#2F7A45]/10 text-[#2F7A45] border border-[#2F7A45]/30'
                        : 'bg-red-50 text-red-600 border border-red-200'
                    }`}
                  >
                    {assessmentReport.passed ? '🏆' : '📚'}
                  </div>
                  <h3 className="text-xl font-bold text-[#1B1B1B]">
                    {assessmentReport.passed ? 'Skill Verification Passed!' : 'Assessment Completed'}
                  </h3>
                  <p className="text-xs text-[#6F6A60]">
                    {assessmentReport.passed
                      ? `Congratulations! You scored ${assessmentReport.finalScore}% and earned verified proof for ${activeSession.topic}.`
                      : `You scored ${assessmentReport.finalScore}%. Review the diagnostic breakdown below to strengthen your weak areas.`}
                  </p>
                </div>

                {/* Score Summary Grid */}
                <div className="grid grid-cols-3 gap-3 p-4 bg-[#F6F4EE] rounded-2xl border border-[#E8E5DD] text-center text-xs">
                  <div>
                    <span className="text-[10px] text-[#6F6A60] uppercase block">Final Score</span>
                    <strong className="text-2xl font-bold font-mono text-[#1B1B1B]">{assessmentReport.finalScore}%</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#6F6A60] uppercase block">XP Earned</span>
                    <strong className="text-2xl font-bold font-mono text-[#C76A2A]">+{assessmentReport.xpEarned} XP</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#6F6A60] uppercase block">Accuracy</span>
                    <strong className="text-2xl font-bold font-mono text-[#2F7A45]">
                      {assessmentReport.passed ? 'Verified' : 'In Review'}
                    </strong>
                  </div>
                </div>

                {/* Recommendations */}
                <div className="p-4 bg-white rounded-2xl border border-[#E8E5DD] space-y-2 text-xs">
                  <span className="font-bold text-[#1B1B1B] block">Personalized Growth Recommendations</span>
                  <p className="text-[#6F6A60] leading-relaxed">
                    {assessmentReport.suggestedNextChallenge}
                  </p>
                </div>

                {/* Close Button */}
                <div className="pt-2 text-center">
                  <button
                    onClick={() => {
                      setActiveSession(null);
                      setAssessmentReport(null);
                    }}
                    className="px-6 py-2.5 bg-[#1B1B1B] hover:bg-[#C76A2A] text-white text-xs font-bold rounded-xl transition-colors shadow-xs"
                  >
                    Return to Assessments
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
