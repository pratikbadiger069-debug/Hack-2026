'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { useAppStore } from '@/lib/store';
import { getUserFirstName } from '@/lib/user-utils';
import { analyzeStudentCareerContext, ROLE_BENCHMARKS } from '@/lib/copilot-engine';
import confetti from 'canvas-confetti';
import {
  Zap,
  Flame,
  Trophy,
  Target,
  Swords,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Bot,
  Briefcase,
  Play,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  Award,
} from 'lucide-react';

export default function StudentHomePage() {
  const {
    studentProfile,
    currentUser,
    setRole,
    updateStudentTargetRole,
    xp,
    level,
    streakDays,
    rankings,
    quests,
    completeQuest,
  } = useAppStore();

  const [mounted, setMounted] = useState(false);
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [selectedRole, setSelectedRole] = useState(studentProfile.targetRole || 'Backend Engineer');

  useEffect(() => {
    setRole('student');
    setMounted(true);
  }, [setRole]);

  const handleSaveGoal = (newRole: string) => {
    setSelectedRole(newRole);
    updateStudentTargetRole(newRole);
    setIsEditingGoal(false);
  };

  const handleQuickQuestComplete = (questId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    completeQuest(questId);
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 },
    });
  };

  const firstName = getUserFirstName({ user: currentUser, profile: studentProfile });
  const context = analyzeStudentCareerContext(studentProfile, selectedRole);
  const sampleRoles = Object.keys(ROLE_BENCHMARKS);
  const nextLevelXP = level * 150;
  const progressPercent = Math.min(100, Math.round(((xp % 150) / 150) * 100));

  if (!mounted) {
    return (
      <PortalLayout>
        <div className="py-24 text-center text-sm text-zinc-500">
          <div className="w-8 h-8 rounded-full border-2 border-blue-600 border-t-transparent animate-spin mx-auto mb-3" />
          Loading builder headquarters...
        </div>
      </PortalLayout>
    );
  }

  return (
    <PortalLayout>
      <div className="space-y-8 max-w-[1300px] mx-auto pb-16">
        {/* 1. TOP BUILDER STATUS HUD */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-zinc-200 dark:border-zinc-800"
        >
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 text-xs font-mono font-bold flex items-center gap-1">
                <Zap className="w-3.5 h-3.5" />
                Level {level} Builder
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-orange-100 dark:bg-orange-950/80 text-orange-700 dark:text-orange-300 text-xs font-mono font-bold flex items-center gap-1">
                <Flame className="w-3.5 h-3.5" />
                {streakDays} Day Streak (+50 XP)
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 text-xs font-mono font-bold">
                Rank #{rankings.collegeRank} in {rankings.collegeName}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-heading font-black tracking-tight text-zinc-900 dark:text-white">
              Welcome back, {firstName} ⚡
            </h1>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-sans">
              Keep shipping code, passing quests, and verifying your proof-of-work.
            </p>
          </div>

          {/* Builder XP Level Meter */}
          <div className="p-4 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs min-w-[280px] space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1">
                <Trophy className="w-3.5 h-3.5 text-amber-500" />
                XP Progress
              </span>
              <span className="font-mono text-blue-600 dark:text-blue-400 font-bold">
                {xp} / {xp + (150 - (xp % 150))} XP
              </span>
            </div>
            <div className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-600 to-indigo-500 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-zinc-400 font-mono">
              <span>Level {level}</span>
              <span>Level {level + 1} ({150 - (xp % 150)} XP to go)</span>
            </div>
          </div>
        </motion.section>

        {/* 2. ACTIVE MISSION HERO QUEST CARD */}
        <motion.section
          initial={{ opacity: 0, scale: 0.99 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-700 text-white p-7 sm:p-9 shadow-lg"
        >
          <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-10 bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-mono font-bold uppercase tracking-wider text-white">
                  🔥 Active Daily Mission
                </span>
                <span className="text-xs font-mono font-bold text-amber-300 bg-amber-400/20 px-2 py-0.5 rounded-full">
                  +50 XP Reward
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-heading font-extrabold tracking-tight">
                Complete Docker &amp; Multi-Stage Container Challenge
              </h2>
              <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
                Build a production multi-stage Dockerfile for an asynchronous Python/Node backend to close your top identified skill gap.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/student/assessments"
                className="px-6 py-3 bg-white text-zinc-900 rounded-xl font-heading font-bold text-xs hover:bg-zinc-100 transition-all shadow-md flex items-center gap-2 lift-hover"
              >
                <Play className="w-4 h-4 fill-current text-blue-600" />
                <span>Launch Mission Quest</span>
              </Link>
            </div>
          </div>
        </motion.section>

        {/* 3. CORE 6 INTELLIGENCE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* LEFT COLUMN (7 COLS) */}
          <div className="md:col-span-7 space-y-6">
            {/* 1. AI Strategic Career Copilot Insight */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.15 }}
              className="builder-card p-6 space-y-3"
            >
              <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center gap-2 font-heading font-bold text-sm text-zinc-900 dark:text-white">
                  <Bot className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>AI Career Copilot Intelligence</span>
                </div>
                <span className="text-[11px] font-mono text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 dark:text-emerald-400 px-2 py-0.5 rounded-full font-bold">
                  Target: {selectedRole}
                </span>
              </div>

              <p className="text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed font-sans">
                &ldquo;Your strongest verified skill is <strong>Python &amp; FastAPI</strong> (95%). Completing the <strong>Docker</strong> and <strong>System Design</strong> quests this week will boost your placement match probability by <strong>+18%</strong>.&rdquo;
              </p>

              <div className="pt-2 flex items-center justify-between text-xs text-zinc-500 border-t border-zinc-100 dark:border-zinc-800">
                <span>Fast-track recommendation: Distributed Caching</span>
                <Link
                  href="/student/career-copilot"
                  className="font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                >
                  <span>Chat with Copilot</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </motion.div>

            {/* 2. Quick Learning Quests (Gamified Duolingo style) */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.15 }}
              className="builder-card p-6 space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center gap-2 font-heading font-bold text-sm text-zinc-900 dark:text-white">
                  <Swords className="w-4 h-4 text-orange-500" />
                  <span>Available Quests</span>
                </div>
                <Link
                  href="/student/assessments"
                  className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  View All Paths &rarr;
                </Link>
              </div>

              <div className="space-y-2.5">
                {quests.slice(0, 3).map((quest) => (
                  <div
                    key={quest.id}
                    className={`p-3.5 rounded-xl border transition-all flex items-center justify-between ${
                      quest.completed
                        ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/50'
                        : 'bg-zinc-50/70 dark:bg-zinc-900/60 border-zinc-200 dark:border-zinc-800 hover:border-blue-300'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-heading font-bold text-xs text-zinc-900 dark:text-white">
                          {quest.title}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-bold">
                          {quest.difficulty}
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                        {quest.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 ml-3">
                      <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                        +{quest.xpReward} XP
                      </span>
                      {quest.completed ? (
                        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Done</span>
                        </span>
                      ) : (
                        <button
                          onClick={(e) => handleQuickQuestComplete(quest.id, e)}
                          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all shadow-xs lift-hover"
                        >
                          Start Quest
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* 3. Recent Builder Proof & Evidence */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.15 }}
              className="builder-card p-6 space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center gap-2 font-heading font-bold text-sm text-zinc-900 dark:text-white">
                  <Award className="w-4 h-4 text-purple-500" />
                  <span>Recent Proof Milestones</span>
                </div>
                <Link href="/student/journey" className="text-xs font-mono text-zinc-500 hover:text-zinc-900 dark:hover:text-white">
                  Journey Story &rarr;
                </Link>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-zinc-50 dark:bg-zinc-900/60 rounded-xl border border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-zinc-900 dark:text-white block">
                      Vector Retrieval Engine Repository Verified
                    </span>
                    <span className="text-[11px] text-zinc-500">Auto-scanned via GitHub</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">+96 Impact</span>
                </div>

                <div className="p-3 bg-zinc-50 dark:bg-zinc-900/60 rounded-xl border border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-zinc-900 dark:text-white block">
                      Java 21 &amp; Concurrency Assessment Passed
                    </span>
                    <span className="text-[11px] text-zinc-500">Score: 94% • Badge Issued</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">+50 XP</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN (5 COLS) */}
          <div className="md:col-span-5 space-y-6">
            {/* 4. Career Goal & Readiness Card */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.15 }}
              className="builder-card p-6 space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center gap-2 font-heading font-bold text-sm text-zinc-900 dark:text-white">
                  <Target className="w-4 h-4 text-blue-600" />
                  <span>Target Role Benchmark</span>
                </div>
                <button
                  onClick={() => setIsEditingGoal(!isEditingGoal)}
                  className="text-xs font-mono text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {isEditingGoal ? 'Done' : 'Change'}
                </button>
              </div>

              {isEditingGoal ? (
                <div className="space-y-2">
                  <select
                    value={selectedRole}
                    onChange={(e) => handleSaveGoal(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white focus:outline-none"
                  >
                    {sampleRoles.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <div>
                  <h3 className="text-xl font-heading font-extrabold text-zinc-900 dark:text-white">{selectedRole}</h3>
                  <p className="text-xs text-zinc-500 mt-0.5">Primary industry readiness track</p>
                </div>
              )}

              <div className="space-y-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-500">Readiness Score:</span>
                  <strong className="text-sm font-mono font-bold text-zinc-900 dark:text-white">{context.readinessScore}%</strong>
                </div>
                <div className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full transition-all duration-700"
                    style={{ width: `${context.readinessScore}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] text-zinc-400 font-mono pt-1">
                  <span>Industry Median: {context.industryAvg}%</span>
                  <span className="text-emerald-600 dark:text-emerald-400">Top Tier: {context.topStudentsScore}%</span>
                </div>
              </div>
            </motion.div>

            {/* 5. Campus Leaderboard Capsule */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.15 }}
              className="builder-card p-6 space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center gap-2 font-heading font-bold text-sm text-zinc-900 dark:text-white">
                  <Trophy className="w-4 h-4 text-amber-500" />
                  <span>Campus Rankings</span>
                </div>
                <Link href="/student/leaderboard" className="text-xs font-mono text-blue-600 dark:text-blue-400 hover:underline">
                  Full Board &rarr;
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 bg-zinc-50 dark:bg-zinc-900/60 rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <span className="text-[10px] font-mono text-zinc-500 block uppercase">College</span>
                  <strong className="text-lg font-heading font-extrabold text-zinc-900 dark:text-white">#{rankings.collegeRank}</strong>
                  <span className="text-[9px] text-zinc-400 block">{rankings.collegeName}</span>
                </div>
                <div className="p-3 bg-zinc-50 dark:bg-zinc-900/60 rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <span className="text-[10px] font-mono text-zinc-500 block uppercase">Department</span>
                  <strong className="text-lg font-heading font-extrabold text-blue-600 dark:text-blue-400">#{rankings.deptRank}</strong>
                  <span className="text-[9px] text-zinc-400 block">{rankings.deptName}</span>
                </div>
                <div className="p-3 bg-zinc-50 dark:bg-zinc-900/60 rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <span className="text-[10px] font-mono text-zinc-500 block uppercase">Global</span>
                  <strong className="text-lg font-heading font-extrabold text-emerald-600 dark:text-emerald-400">Top 3%</strong>
                  <span className="text-[9px] text-zinc-400 block">Tier</span>
                </div>
              </div>
            </motion.div>

            {/* 6. Opportunity Matches */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.15 }}
              className="builder-card p-6 space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center gap-2 font-heading font-bold text-sm text-zinc-900 dark:text-white">
                  <Briefcase className="w-4 h-4 text-blue-600" />
                  <span>Curated Opportunities</span>
                </div>
                <span className="text-xs font-mono text-blue-600 font-bold">6 Live</span>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 bg-zinc-50 dark:bg-zinc-900/60 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <strong className="text-zinc-900 dark:text-white font-heading font-bold">Anthropic AI Labs</strong>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold">
                      94% Match
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">AI Systems &amp; Platform Intern</p>
                </div>

                <div className="p-3.5 bg-zinc-50 dark:bg-zinc-900/60 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <strong className="text-zinc-900 dark:text-white font-heading font-bold">Stripe Engineering</strong>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold">
                      91% Match
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">Distributed Backend Infrastructure</p>
                </div>
              </div>

              <Link
                href="/student/opportunities"
                className="w-full py-2.5 bg-zinc-900 dark:bg-zinc-800 hover:bg-black dark:hover:bg-zinc-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs lift-hover"
              >
                <span>View All Opportunities</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
