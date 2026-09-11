'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { useAppStore } from '@/lib/store';
import { getUserFirstName } from '@/lib/user-utils';
import { analyzeStudentCareerContext, ROLE_BENCHMARKS } from '@/lib/copilot-engine';
import {
  Target,
  ArrowRight,
  CheckCircle2,
  Bot,
  Briefcase,
  Layers,
  ArrowUpRight,
  Award,
  Sparkles,
  ChevronRight,
  Code2,
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

  const handleQuickChallengeComplete = (questId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    completeQuest(questId);
  };

  const firstName = getUserFirstName({ user: currentUser, profile: studentProfile });
  const context = analyzeStudentCareerContext(studentProfile, selectedRole);
  const sampleRoles = Object.keys(ROLE_BENCHMARKS);
  const xpInLevel = xp % 1000;

  if (!mounted) {
    return (
      <PortalLayout>
        <div className="py-24 text-center text-xs text-[#656D76] dark:text-[#8B949E]">
          <div className="w-5 h-5 rounded-full border-2 border-blue-600 border-t-transparent animate-spin mx-auto mb-2" />
          Loading command center...
        </div>
      </PortalLayout>
    );
  }

  return (
    <PortalLayout>
      <div className="space-y-6 max-w-[1200px] mx-auto pb-12">
        {/* Top Header & Overview */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-[#E6E4DD] dark:border-[#2D333B]"
        >
          <div>
            <h1 className="text-2xl font-semibold text-[#1F2328] dark:text-[#F0F6FC] tracking-tight">
              Welcome back, {firstName}
            </h1>
            <p className="text-xs text-[#656D76] dark:text-[#8B949E] mt-0.5">
              Your verified proof-of-work, challenges, and career intelligence.
            </p>
          </div>

          {/* Minimal Status Capsule */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="px-3 py-1.5 rounded-lg bg-white dark:bg-[#161B22] border border-[#E6E4DD] dark:border-[#2D333B] text-xs">
              <span className="text-[#656D76] dark:text-[#8B949E]">Status: </span>
              <span className="font-semibold text-[#1F2328] dark:text-[#F0F6FC]">
                Level {level} Builder
              </span>
              <span className="text-[#8C959F] dark:text-[#6E7681] text-[11px] font-mono ml-1.5">
                ({xp} XP)
              </span>
            </div>

            <div className="px-3 py-1.5 rounded-lg bg-white dark:bg-[#161B22] border border-[#E6E4DD] dark:border-[#2D333B] text-xs">
              <span className="text-[#656D76] dark:text-[#8B949E]">Rank: </span>
              <span className="font-semibold text-[#1F2328] dark:text-[#F0F6FC]">
                #{rankings.collegeRank} in {rankings.collegeName}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Minimal Active Challenge Banner */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.05 }}
          className="p-5 rounded-xl bg-white dark:bg-[#161B22] border border-[#E6E4DD] dark:border-[#2D333B] flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs"
        >
          <div className="space-y-1 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-medium text-blue-600 dark:text-blue-400">
                Recommended Daily Challenge
              </span>
              <span className="text-[10px] font-mono text-[#656D76] dark:text-[#8B949E] px-1.5 py-0.5 rounded bg-[#FAF9F5] dark:bg-[#0F1115] border border-[#E6E4DD] dark:border-[#2D333B]">
                +50 XP
              </span>
            </div>
            <h2 className="text-base font-semibold text-[#1F2328] dark:text-[#F0F6FC]">
              Docker &amp; Multi-Stage Container Architecture
            </h2>
            <p className="text-xs text-[#656D76] dark:text-[#8B949E]">
              Demonstrate container optimization for production deployment to address your primary skill gap for {selectedRole}.
            </p>
          </div>

          <Link
            href="/student/assessments"
            className="px-4 py-2 bg-[#1F2328] dark:bg-[#F0F6FC] text-white dark:text-[#0F1115] rounded-lg text-xs font-medium hover:bg-black dark:hover:bg-white transition-colors shrink-0 flex items-center justify-center gap-1.5"
          >
            <span>Start Challenge</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>

        {/* 2-Column Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Left Column (7 cols) */}
          <div className="md:col-span-7 space-y-6">
            {/* 1. Career Copilot Intelligence */}
            <div className="p-5 bg-white dark:bg-[#161B22] rounded-xl border border-[#E6E4DD] dark:border-[#2D333B] space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-[#E6E4DD] dark:border-[#2D333B]">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#1F2328] dark:text-[#F0F6FC]">
                  <Bot className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>Career Copilot Insight</span>
                </div>
                <span className="text-[11px] font-mono text-blue-600 dark:text-blue-400 font-medium">
                  {selectedRole} Track
                </span>
              </div>

              <p className="text-xs text-[#1F2328] dark:text-[#F0F6FC] leading-relaxed">
                Your verified strength in <strong>Python &amp; API Design</strong> is solid (95%). Completing the <strong>Docker</strong> and <strong>System Design</strong> challenges will raise your placement match probability by <strong>+18%</strong>.
              </p>

              <div className="pt-2 flex items-center justify-between text-xs text-[#656D76] dark:text-[#8B949E] border-t border-[#E6E4DD] dark:border-[#2D333B]">
                <span>Focus area: Distributed Caching</span>
                <Link
                  href="/student/career-copilot"
                  className="font-medium text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                >
                  <span>Open Copilot</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* 2. Available Challenges */}
            <div className="p-5 bg-white dark:bg-[#161B22] rounded-xl border border-[#E6E4DD] dark:border-[#2D333B] space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-[#E6E4DD] dark:border-[#2D333B]">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#1F2328] dark:text-[#F0F6FC]">
                  <Code2 className="w-4 h-4 text-[#1F2328] dark:text-[#F0F6FC]" />
                  <span>Available Challenges</span>
                </div>
                <Link
                  href="/student/assessments"
                  className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  View All &rarr;
                </Link>
              </div>

              <div className="space-y-2">
                {quests.slice(0, 3).map((quest) => (
                  <div
                    key={quest.id}
                    className="p-3 rounded-lg border border-[#E6E4DD] dark:border-[#2D333B] bg-[#FAF9F5] dark:bg-[#0F1115] flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-[#1F2328] dark:text-[#F0F6FC]">
                          {quest.title}
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white dark:bg-[#161B22] border border-[#E6E4DD] dark:border-[#2D333B] text-[#656D76] dark:text-[#8B949E]">
                          {quest.difficulty}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#656D76] dark:text-[#8B949E]">
                        {quest.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[11px] font-mono text-[#656D76] dark:text-[#8B949E]">
                        +{quest.xpReward} XP
                      </span>
                      {quest.completed ? (
                        <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Passed</span>
                        </span>
                      ) : (
                        <button
                          onClick={(e) => handleQuickChallengeComplete(quest.id, e)}
                          className="px-2.5 py-1 bg-[#1F2328] dark:bg-[#F0F6FC] text-white dark:text-[#0F1115] rounded text-xs font-medium hover:bg-black dark:hover:bg-white transition-colors"
                        >
                          Start
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (5 cols) */}
          <div className="md:col-span-5 space-y-6">
            {/* 3. Target Role & Readiness */}
            <div className="p-5 bg-white dark:bg-[#161B22] rounded-xl border border-[#E6E4DD] dark:border-[#2D333B] space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-[#E6E4DD] dark:border-[#2D333B]">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#1F2328] dark:text-[#F0F6FC]">
                  <Target className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>Target Role Readiness</span>
                </div>
                <button
                  onClick={() => setIsEditingGoal(!isEditingGoal)}
                  className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {isEditingGoal ? 'Save' : 'Edit'}
                </button>
              </div>

              {isEditingGoal ? (
                <select
                  value={selectedRole}
                  onChange={(e) => handleSaveGoal(e.target.value)}
                  className="w-full text-xs p-2 rounded-lg bg-[#FAF9F5] dark:bg-[#0F1115] border border-[#E6E4DD] dark:border-[#2D333B] text-[#1F2328] dark:text-[#F0F6FC] focus:outline-none"
                >
                  {sampleRoles.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              ) : (
                <div>
                  <div className="text-base font-semibold text-[#1F2328] dark:text-[#F0F6FC]">
                    {selectedRole}
                  </div>
                  <div className="text-xs text-[#656D76] dark:text-[#8B949E] mt-0.5">
                    Primary career trajectory
                  </div>
                </div>
              )}

              <div className="space-y-1.5 pt-2 border-t border-[#E6E4DD] dark:border-[#2D333B]">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#656D76] dark:text-[#8B949E]">Readiness Score</span>
                  <span className="font-semibold text-[#1F2328] dark:text-[#F0F6FC] font-mono">
                    {context.readinessScore}%
                  </span>
                </div>
                <div className="w-full bg-[#E6E4DD] dark:bg-[#2D333B] rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-blue-600 dark:bg-blue-400 h-full progress-fill"
                    style={{ width: `${context.readinessScore}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#8C959F] dark:text-[#6E7681] font-mono pt-1">
                  <span>Median: {context.industryAvg}%</span>
                  <span className="text-emerald-600 dark:text-emerald-400">Top Tier: {context.topStudentsScore}%</span>
                </div>
              </div>
            </div>

            {/* 4. Curated Opportunities */}
            <div className="p-5 bg-white dark:bg-[#161B22] rounded-xl border border-[#E6E4DD] dark:border-[#2D333B] space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-[#E6E4DD] dark:border-[#2D333B]">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#1F2328] dark:text-[#F0F6FC]">
                  <Briefcase className="w-4 h-4 text-[#1F2328] dark:text-[#F0F6FC]" />
                  <span>Matched Opportunities</span>
                </div>
                <span className="text-[11px] font-mono text-[#656D76] dark:text-[#8B949E]">
                  6 Live
                </span>
              </div>

              <div className="space-y-2">
                <div className="p-3 rounded-lg border border-[#E6E4DD] dark:border-[#2D333B] bg-[#FAF9F5] dark:bg-[#0F1115] space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#1F2328] dark:text-[#F0F6FC]">Anthropic AI Labs</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 font-medium">
                      94% Match
                    </span>
                  </div>
                  <p className="text-[11px] text-[#656D76] dark:text-[#8B949E]">AI Systems &amp; Platform Intern</p>
                </div>

                <div className="p-3 rounded-lg border border-[#E6E4DD] dark:border-[#2D333B] bg-[#FAF9F5] dark:bg-[#0F1115] space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#1F2328] dark:text-[#F0F6FC]">Stripe Engineering</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 font-medium">
                      91% Match
                    </span>
                  </div>
                  <p className="text-[11px] text-[#656D76] dark:text-[#8B949E]">Distributed Backend Infrastructure</p>
                </div>
              </div>

              <Link
                href="/student/opportunities"
                className="w-full py-2 bg-[#FAF9F5] dark:bg-[#0F1115] hover:bg-[#F0EEE6] dark:hover:bg-[#1C2128] text-[#1F2328] dark:text-[#F0F6FC] border border-[#E6E4DD] dark:border-[#2D333B] rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>View All Opportunities</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
