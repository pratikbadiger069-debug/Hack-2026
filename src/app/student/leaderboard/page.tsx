'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { useAppStore } from '@/lib/store';
import { getLevelInfo } from '@/lib/xp-engine';
import {
  Trophy,
  Medal,
  Flame,
  CheckCircle2,
  Users,
  Building,
  Globe,
  Award,
} from 'lucide-react';

export default function StudentLeaderboardPage() {
  const { studentProfile, rankings, xp } = useAppStore();
  const [scopeTab, setScopeTab] = useState<'college' | 'department' | 'global'>('college');
  const [timeframe, setTimeframe] = useState<'weekly' | 'monthly' | 'allTime'>('weekly');

  const myLevelInfo = getLevelInfo(xp);

  const fullLeaderboard = [
    {
      rank: 1,
      studentName: 'Devansh Kulkarni',
      college: 'HITAM',
      department: 'CSE',
      builderScore: 942,
      verifiedSkillsCount: 9,
      level: 24,
      xp: 3820,
      challengesCompleted: 18,
      streakDays: 14,
      badge: 'Elite Vanguard',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    },
    {
      rank: 2,
      studentName: 'Priya Nambiar',
      college: 'HITAM',
      department: 'CSE',
      builderScore: 918,
      verifiedSkillsCount: 8,
      level: 21,
      xp: 3340,
      challengesCompleted: 15,
      streakDays: 12,
      badge: 'Master Architect',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
    },
    {
      rank: 3,
      studentName: 'Rohan Mehra',
      college: 'HITAM',
      department: 'IT',
      builderScore: 896,
      verifiedSkillsCount: 7,
      level: 20,
      xp: 3120,
      challengesCompleted: 14,
      streakDays: 9,
      badge: 'Lead Builder',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    },
    {
      rank: 4,
      studentName: 'Ananya Iyer',
      college: 'HITAM',
      department: 'ECE',
      builderScore: 890,
      verifiedSkillsCount: 6,
      level: 19,
      xp: 2900,
      challengesCompleted: 12,
      streakDays: 8,
      badge: 'Lead Builder',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=80',
    },
    {
      rank: 5,
      studentName: `${studentProfile.name} (You)`,
      college: 'HITAM',
      department: 'CSE',
      builderScore: studentProfile.builderScores.overall || 885,
      verifiedSkillsCount: studentProfile.verifiedSkills.length || 6,
      level: myLevelInfo.level,
      xp: xp,
      challengesCompleted: 10,
      streakDays: 7,
      badge: `${myLevelInfo.title}`,
      avatar: studentProfile.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    },
    {
      rank: 6,
      studentName: 'Vikram Seth',
      college: 'HITAM',
      department: 'CSE',
      builderScore: 860,
      verifiedSkillsCount: 5,
      level: 17,
      xp: 2310,
      challengesCompleted: 8,
      streakDays: 5,
      badge: 'Builder',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80',
    },
  ];

  return (
    <PortalLayout>
      <div className="space-y-6 max-w-[1200px] mx-auto pb-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#E6E4DD] dark:border-[#2D333B]"
        >
          <div>
            <h1 className="text-2xl font-semibold text-[#1F2328] dark:text-[#F0F6FC] tracking-tight">
              Builder Rankings
            </h1>
            <p className="text-xs text-[#656D76] dark:text-[#8B949E] mt-0.5">
              Rankings computed from verified XP, challenge accuracy, active streaks, and code impact.
            </p>
          </div>

          {/* User Rank Capsule */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white dark:bg-[#161B22] border border-[#E6E4DD] dark:border-[#2D333B] text-xs">
            <span className="text-[#656D76] dark:text-[#8B949E]">Your Rank:</span>
            <strong className="font-semibold text-[#1F2328] dark:text-[#F0F6FC]">
              #{rankings.collegeRank} in {rankings.collegeName}
            </strong>
            <span className="text-emerald-600 dark:text-emerald-400 font-mono ml-1">
              ({rankings.globalPercentile})
            </span>
          </div>
        </motion.div>

        {/* Scope & Timeframe Filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          {/* Scope */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setScopeTab('college')}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                scopeTab === 'college'
                  ? 'bg-[#1F2328] dark:bg-[#F0F6FC] text-white dark:text-[#0F1115]'
                  : 'text-[#656D76] dark:text-[#8B949E] hover:bg-black/5 dark:hover:bg-white/5'
              }`}
            >
              Campus (HITAM)
            </button>
            <button
              onClick={() => setScopeTab('department')}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                scopeTab === 'department'
                  ? 'bg-[#1F2328] dark:bg-[#F0F6FC] text-white dark:text-[#0F1115]'
                  : 'text-[#656D76] dark:text-[#8B949E] hover:bg-black/5 dark:hover:bg-white/5'
              }`}
            >
              CSE Department
            </button>
            <button
              onClick={() => setScopeTab('global')}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                scopeTab === 'global'
                  ? 'bg-[#1F2328] dark:bg-[#F0F6FC] text-white dark:text-[#0F1115]'
                  : 'text-[#656D76] dark:text-[#8B949E] hover:bg-black/5 dark:hover:bg-white/5'
              }`}
            >
              Global
            </button>
          </div>

          {/* Timeframe */}
          <div className="flex items-center gap-1 bg-white dark:bg-[#161B22] p-1 rounded-lg border border-[#E6E4DD] dark:border-[#2D333B] text-[11px] font-mono">
            <button
              onClick={() => setTimeframe('weekly')}
              className={`px-2.5 py-0.5 rounded transition-colors ${
                timeframe === 'weekly'
                  ? 'bg-[#1F2328] dark:bg-[#F0F6FC] text-white dark:text-[#0F1115]'
                  : 'text-[#656D76] dark:text-[#8B949E]'
              }`}
            >
              Weekly
            </button>
            <button
              onClick={() => setTimeframe('monthly')}
              className={`px-2.5 py-0.5 rounded transition-colors ${
                timeframe === 'monthly'
                  ? 'bg-[#1F2328] dark:bg-[#F0F6FC] text-white dark:text-[#0F1115]'
                  : 'text-[#656D76] dark:text-[#8B949E]'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setTimeframe('allTime')}
              className={`px-2.5 py-0.5 rounded transition-colors ${
                timeframe === 'allTime'
                  ? 'bg-[#1F2328] dark:bg-[#F0F6FC] text-white dark:text-[#0F1115]'
                  : 'text-[#656D76] dark:text-[#8B949E]'
              }`}
            >
              All Time
            </button>
          </div>
        </div>

        {/* Leaderboard Table */}
        <div className="bg-white dark:bg-[#161B22] rounded-xl border border-[#E6E4DD] dark:border-[#2D333B] overflow-hidden">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#E6E4DD] dark:border-[#2D333B] bg-[#FAF9F5] dark:bg-[#0F1115] text-[#656D76] dark:text-[#8B949E] text-[11px]">
                <th className="py-3 px-4 font-mono w-16">Rank</th>
                <th className="py-3 px-4 font-medium">Builder</th>
                <th className="py-3 px-4 font-medium hidden sm:table-cell">Tier &amp; Level</th>
                <th className="py-3 px-4 font-medium hidden md:table-cell">Challenges</th>
                <th className="py-3 px-4 font-medium hidden md:table-cell">Streak</th>
                <th className="py-3 px-4 font-medium text-right font-mono">Total XP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E6E4DD] dark:divide-[#2D333B]">
              {fullLeaderboard.map((row) => {
                const isUser = row.studentName.includes('(You)');
                return (
                  <tr
                    key={row.rank}
                    className={`transition-colors ${
                      isUser
                        ? 'bg-blue-50/40 dark:bg-blue-950/20 font-medium'
                        : 'hover:bg-black/2 dark:hover:bg-white/2'
                    }`}
                  >
                    <td className="py-3.5 px-4 font-mono font-semibold text-xs">
                      {row.rank === 1 ? (
                        <span className="text-amber-500">#1</span>
                      ) : row.rank === 2 ? (
                        <span className="text-slate-400">#2</span>
                      ) : row.rank === 3 ? (
                        <span className="text-amber-700">#3</span>
                      ) : (
                        <span className="text-[#656D76] dark:text-[#8B949E]">#{row.rank}</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={row.avatar}
                          alt={row.studentName}
                          className="w-7 h-7 rounded-full object-cover border border-[#E6E4DD] dark:border-[#2D333B]"
                        />
                        <div>
                          <div className="font-semibold text-xs text-[#1F2328] dark:text-[#F0F6FC]">
                            {row.studentName}
                          </div>
                          <span className="text-[10px] text-[#656D76] dark:text-[#8B949E]">
                            {row.college} • {row.department}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 hidden sm:table-cell text-[11px]">
                      <span className="font-medium text-[#1F2328] dark:text-[#F0F6FC]">
                        Level {row.level}
                      </span>
                      <span className="text-[#8C959F] dark:text-[#6E7681] text-[10px] block">
                        {row.badge}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 hidden md:table-cell font-mono text-[11px] text-[#656D76] dark:text-[#8B949E]">
                      {row.challengesCompleted} passed
                    </td>

                    <td className="py-3.5 px-4 hidden md:table-cell font-mono text-[11px] text-orange-600 dark:text-orange-400">
                      🔥 {row.streakDays}d
                    </td>

                    <td className="py-3.5 px-4 text-right font-mono font-bold text-xs text-[#1F2328] dark:text-[#F0F6FC]">
                      {row.xp} XP
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </PortalLayout>
  );
}
