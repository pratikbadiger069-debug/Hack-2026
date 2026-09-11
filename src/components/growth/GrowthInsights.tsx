'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAppStore } from '@/lib/store';
import {
  TrendingUp,
  Zap,
  CheckCircle2,
  GitBranch,
  BookOpen,
  ArrowUpRight,
  Sparkles,
  Award,
  Flame,
} from 'lucide-react';

export function GrowthInsights() {
  const {
    xp,
    streakDays,
    quests,
    studentProfile,
    githubData,
    checklist,
  } = useAppStore();

  const completedAssessments = (studentProfile.verifiedSkills || []).length;
  const weeklyXP = Math.min(xp, 320);
  const recentSkillsCount = (studentProfile.verifiedSkills || []).slice(0, 3);
  const completedChallenges = (quests || []).filter((q) => q.completed).length;
  const roadmapProgressPercent = Math.min(100, Math.round((completedChallenges / Math.max(quests.length, 1)) * 100));

  return (
    <div className="p-6 rounded-2xl bg-white border border-[#E8E5DD] shadow-xs space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#E8E5DD]">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#C76A2A]" />
            <h2 className="text-lg font-bold text-[#1B1B1B]">Weekly Growth Insights</h2>
            <span className="px-2 py-0.5 rounded-full bg-[#2F7A45]/10 text-[#2F7A45] text-[11px] font-bold">
              Active Momentum
            </span>
          </div>
          <p className="text-xs text-[#6F6A60] mt-0.5">
            Real-time telemetry across XP accumulation, skill verification, assessments, and codebase activity.
          </p>
        </div>

        <Link
          href="/student/assessments"
          className="text-xs font-semibold text-[#C76A2A] hover:underline flex items-center gap-1 self-start sm:self-auto"
        >
          <span>Accelerate Growth</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* 5 Core Growth KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {/* Metric 1: XP Gained This Week */}
        <div className="p-4 rounded-xl bg-[#F6F4EE] border border-[#E8E5DD] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#6F6A60] uppercase tracking-wider">XP This Week</span>
            <Zap className="w-4 h-4 text-[#C76A2A]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-[#1B1B1B]">+{weeklyXP}</span>
            <span className="text-[10px] text-[#2F7A45] font-semibold bg-[#2F7A45]/10 px-1.5 py-0.2 rounded">
              ↑ 18% vs prev
            </span>
          </div>
          <p className="text-[10px] text-[#6F6A60] leading-tight">
            Earned from 2 assessments &amp; 3 coding challenges.
          </p>
        </div>

        {/* Metric 2: Skills Improved */}
        <div className="p-4 rounded-xl bg-[#F6F4EE] border border-[#E8E5DD] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#6F6A60] uppercase tracking-wider">Skills Bumped</span>
            <Sparkles className="w-4 h-4 text-[#2F7A45]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-[#1B1B1B]">
              {(studentProfile.verifiedSkills || []).length}
            </span>
            <span className="text-[10px] text-[#6F6A60]">verified</span>
          </div>
          <p className="text-[10px] text-[#6F6A60] leading-tight">
            Average confidence delta: <strong className="text-[#1B1B1B]">+14.2%</strong>
          </p>
        </div>

        {/* Metric 3: Assessments Completed */}
        <div className="p-4 rounded-xl bg-[#F6F4EE] border border-[#E8E5DD] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#6F6A60] uppercase tracking-wider">Assessments</span>
            <CheckCircle2 className="w-4 h-4 text-[#3B82F6]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-[#1B1B1B]">{completedAssessments}</span>
            <span className="text-[10px] text-[#6F6A60]">/ 10 Core</span>
          </div>
          <div className="w-full h-1 bg-[#E8E5DD] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#3B82F6] rounded-full"
              style={{ width: `${(completedAssessments / 10) * 100}%` }}
            />
          </div>
        </div>

        {/* Metric 4: GitHub Progress */}
        <div className="p-4 rounded-xl bg-[#F6F4EE] border border-[#E8E5DD] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#6F6A60] uppercase tracking-wider">GitHub Velocity</span>
            <GitBranch className="w-4 h-4 text-[#1B1B1B]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-[#1B1B1B]">
              {githubData.connected ? `${githubData.recentCommitsCount || 28}c` : '0c'}
            </span>
            <span className="text-[10px] text-[#C76A2A] font-semibold">{streakDays}d streak</span>
          </div>
          <p className="text-[10px] text-[#6F6A60] leading-tight">
            {githubData.connected ? 'Active syncing enabled' : 'Connect to track velocity'}
          </p>
        </div>

        {/* Metric 5: Roadmap Progress */}
        <div className="p-4 rounded-xl bg-[#F6F4EE] border border-[#E8E5DD] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#6F6A60] uppercase tracking-wider">Roadmap Status</span>
            <BookOpen className="w-4 h-4 text-[#8B5CF6]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-[#1B1B1B]">{roadmapProgressPercent}%</span>
            <span className="text-[10px] text-[#2F7A45] font-semibold">On Track</span>
          </div>
          <div className="w-full h-1 bg-[#E8E5DD] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#8B5CF6] rounded-full"
              style={{ width: `${roadmapProgressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Actionable Recommendations Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        {/* Recommended 1: Next Skill Boost */}
        <div className="p-4 rounded-xl bg-white border border-[#E8E5DD] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#1B1B1B]">Recommended Next Milestone</span>
            <span className="text-[10px] font-mono text-[#C76A2A] font-bold">+50 XP</span>
          </div>
          <p className="text-xs text-[#6F6A60]">
            Complete the <strong>Distributed Caching &amp; Redis</strong> assessment to unlock Level 5 eligibility.
          </p>
          <Link
            href="/student/assessments"
            className="text-[11px] font-bold text-[#1B1B1B] hover:text-[#C76A2A] flex items-center gap-1 pt-1"
          >
            <span>Start Assessment</span>
            <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Recommended 2: Recent Skill Upsurge */}
        <div className="p-4 rounded-xl bg-white border border-[#E8E5DD] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#1B1B1B]">Recent Competency Bump</span>
            <span className="text-[10px] font-mono text-[#2F7A45] font-bold">Verified</span>
          </div>
          <div className="space-y-1.5 text-xs">
            {recentSkillsCount.map((s) => (
              <div key={s.id || s.name} className="flex justify-between items-center text-[11px]">
                <span className="font-semibold text-[#1B1B1B]">{s.name}</span>
                <span className="font-mono text-[#6F6A60]">{s.score}% score</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended 3: Consistency Multiplier */}
        <div className="p-4 rounded-xl bg-white border border-[#E8E5DD] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#1B1B1B]">Streak Momentum</span>
            <Flame className="w-3.5 h-3.5 text-[#C76A2A]" />
          </div>
          <p className="text-xs text-[#6F6A60]">
            You have maintained an active builder streak for <strong className="text-[#1B1B1B]">{streakDays} days</strong>. Reach 30 days to unlock the <strong>Consistency King</strong> Platinum badge.
          </p>
          <div className="text-[11px] font-mono text-[#C76A2A] font-semibold pt-1">
            {30 - Math.min(streakDays, 30)} days remaining
          </div>
        </div>
      </div>
    </div>
  );
}
