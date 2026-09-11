'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { useAppStore } from '@/lib/store';
import { getLevelInfo, calculateBuilderScore } from '@/lib/xp-engine';
import {
  Trophy,
  Medal,
  Flame,
  CheckCircle2,
  Building2,
  MapPin,
  Globe2,
  GraduationCap,
  Sparkles,
  TrendingUp,
  Award
} from 'lucide-react';

import { UserAvatar } from '@/components/avatar/UserAvatar';

export default function StudentLeaderboardPage() {
  const { studentProfile, tierRankings, xp, streakDays } = useAppStore();
  const [scopeTab, setScopeTab] = useState<'department' | 'campus' | 'state' | 'national'>('department');
  const [timeframe, setTimeframe] = useState<'weekly' | 'monthly' | 'allTime'>('weekly');


  const myLevelInfo = getLevelInfo(xp);
  const myOverallScore = calculateBuilderScore({
    verifiedSkillsCount: (studentProfile.verifiedSkills || []).length,
    projectsCount: (studentProfile.evidences || []).length,
    consistencyStreakDays: streakDays,
  }).overallScore;

  const deptRank = tierRankings?.deptRank || 3;
  const campusRank = tierRankings?.collegeRank || 14;
  const stateRank = tierRankings?.stateRank || 82;
  const nationalRank = tierRankings?.nationalRank || 412;
  const userDept = studentProfile.branch || 'CSE';

  // Department Leaderboard (CSE)
  const deptData = [
    {
      rank: 1,
      studentName: 'Devansh Kulkarni',
      college: 'HITAM',
      department: 'CSE',
      builderScore: 942,
      level: 24,
      xp: 4120,
      challengesCompleted: 19,
      streakDays: 14,
      badge: 'Elite Architect',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    },
    {
      rank: 2,
      studentName: 'Priya Nambiar',
      college: 'HITAM',
      department: 'CSE',
      builderScore: 918,
      level: 21,
      xp: 3640,
      challengesCompleted: 16,
      streakDays: 12,
      badge: 'Master Builder',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
    },
    {
      rank: deptRank,
      studentName: `${studentProfile.name} (You)`,
      college: studentProfile.college || 'HITAM',
      department: userDept,
      builderScore: myOverallScore,
      level: myLevelInfo.level,
      xp: xp,
      challengesCompleted: 12,
      streakDays: streakDays || 7,
      badge: myLevelInfo.title,
      avatar: studentProfile.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    },
    {
      rank: 4,
      studentName: 'Vikram Seth',
      college: 'HITAM',
      department: 'CSE',
      builderScore: 860,
      level: 17,
      xp: 2540,
      challengesCompleted: 9,
      streakDays: 5,
      badge: 'Creator',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80',
    },
    {
      rank: 5,
      studentName: 'Sneha Reddy',
      college: 'HITAM',
      department: 'CSE',
      builderScore: 840,
      level: 16,
      xp: 2280,
      challengesCompleted: 8,
      streakDays: 4,
      badge: 'Builder',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
    },
  ];

  // Campus Leaderboard (HITAM)
  const campusData = [
    {
      rank: 1,
      studentName: 'Devansh Kulkarni',
      college: 'HITAM',
      department: 'CSE',
      builderScore: 942,
      level: 24,
      xp: 4120,
      challengesCompleted: 19,
      streakDays: 14,
      badge: 'Elite Architect',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    },
    {
      rank: 2,
      studentName: 'Rohan Mehra',
      college: 'HITAM',
      department: 'IT',
      builderScore: 930,
      level: 22,
      xp: 3890,
      challengesCompleted: 18,
      streakDays: 11,
      badge: 'Innovator',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    },
    {
      rank: 3,
      studentName: 'Priya Nambiar',
      college: 'HITAM',
      department: 'CSE',
      builderScore: 918,
      level: 21,
      xp: 3640,
      challengesCompleted: 16,
      streakDays: 12,
      badge: 'Master Builder',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
    },
    {
      rank: 4,
      studentName: 'Ananya Iyer',
      college: 'HITAM',
      department: 'ECE',
      builderScore: 890,
      level: 19,
      xp: 3120,
      challengesCompleted: 13,
      streakDays: 9,
      badge: 'Architect',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=80',
    },
    {
      rank: campusRank,
      studentName: `${studentProfile.name} (You)`,
      college: studentProfile.college || 'HITAM',
      department: userDept,
      builderScore: myOverallScore,
      level: myLevelInfo.level,
      xp: xp,
      challengesCompleted: 12,
      streakDays: streakDays || 7,
      badge: myLevelInfo.title,
      avatar: studentProfile.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    },
  ];

  // State Leaderboard (Telangana)
  const stateData = [
    {
      rank: 1,
      studentName: 'Arjun Venkatesh',
      college: 'IIIT Hyderabad',
      department: 'CSE',
      builderScore: 978,
      level: 30,
      xp: 7200,
      challengesCompleted: 34,
      streakDays: 45,
      badge: 'Industry Ready Titan',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80',
    },
    {
      rank: 2,
      studentName: 'Sahana Rao',
      college: 'CBIT Hyderabad',
      department: 'AI & Data',
      builderScore: 964,
      level: 28,
      xp: 6410,
      challengesCompleted: 29,
      streakDays: 31,
      badge: 'Elite Builder',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
    },
    {
      rank: 3,
      studentName: 'Karthik Somayaji',
      college: 'JNTUH College of Engg',
      department: 'CSE',
      builderScore: 955,
      level: 26,
      xp: 5890,
      challengesCompleted: 26,
      streakDays: 28,
      badge: 'Elite Builder',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    },
    {
      rank: stateRank,
      studentName: `${studentProfile.name} (You)`,
      college: studentProfile.college || 'HITAM',
      department: userDept,
      builderScore: myOverallScore,
      level: myLevelInfo.level,
      xp: xp,
      challengesCompleted: 12,
      streakDays: streakDays || 7,
      badge: myLevelInfo.title,
      avatar: studentProfile.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    },
  ];

  // National Leaderboard (India)
  const nationalData = [
    {
      rank: 1,
      studentName: 'Aarav Singhal',
      college: 'IIT Bombay',
      department: 'CSE',
      builderScore: 994,
      level: 35,
      xp: 11450,
      challengesCompleted: 58,
      streakDays: 92,
      badge: 'National Vanguard',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80',
    },
    {
      rank: 2,
      studentName: 'Meera Namboodiri',
      college: 'IIT Madras',
      department: 'Data & Systems',
      builderScore: 986,
      level: 33,
      xp: 9800,
      challengesCompleted: 49,
      streakDays: 64,
      badge: 'National Vanguard',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    },
    {
      rank: 3,
      studentName: 'Tarun Saxena',
      college: 'BITS Pilani',
      department: 'ECE / CS Minor',
      builderScore: 980,
      level: 32,
      xp: 8940,
      challengesCompleted: 44,
      streakDays: 58,
      badge: 'Industry Ready Titan',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    },
    {
      rank: nationalRank,
      studentName: `${studentProfile.name} (You)`,
      college: studentProfile.college || 'HITAM',
      department: userDept,
      builderScore: myOverallScore,
      level: myLevelInfo.level,
      xp: xp,
      challengesCompleted: 12,
      streakDays: streakDays || 7,
      badge: myLevelInfo.title,
      avatar: studentProfile.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    },
  ];

  const activeDataset =
    scopeTab === 'department'
      ? deptData
      : scopeTab === 'campus'
      ? campusData
      : scopeTab === 'state'
      ? stateData
      : nationalData;

  const currentTierRank =
    scopeTab === 'department'
      ? `#${deptRank} in ${userDept}`
      : scopeTab === 'campus'
      ? `#${campusRank} in ${studentProfile.college || 'HITAM'}`
      : scopeTab === 'state'
      ? `#${stateRank} in Telangana`
      : `#${nationalRank} in India`;

  return (
    <PortalLayout>
      <div className="space-y-6 max-w-[1200px] mx-auto pb-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#E8E5DD]"
        >
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-[#C76A2A]/10 text-[#C76A2A] font-semibold">
                Multi-Tier Intelligence
              </span>
              <span className="text-[11px] text-[#7A766E] font-mono">
                Formula v7 Verified
              </span>
            </div>
            <h1 className="text-2xl font-bold text-[#1B1B1B] tracking-tight mt-1">
              Builder Rankings &amp; Proof Leaderboards
            </h1>
            <p className="text-xs text-[#7A766E] mt-0.5">
              Rankings computed deterministically from verified assessments (30%), projects (25%), GitHub (15%), challenges (10%), consistency (10%), and communication (10%).
            </p>
          </div>

          {/* User Rank Capsule */}
          <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white border border-[#E8E5DD] shadow-sm text-xs">
            <Trophy className="w-4 h-4 text-[#C76A2A]" />
            <div>
              <div className="text-[10px] text-[#7A766E] uppercase font-mono tracking-wider">Your Position</div>
              <strong className="font-bold text-[#1B1B1B]">{currentTierRank}</strong>
            </div>
            <span className="text-[#2F7A45] font-mono font-semibold bg-[#2F7A45]/10 px-2 py-0.5 rounded text-[10px] ml-1">
              Top 2.8%
            </span>
          </div>
        </motion.div>

        {/* 4-Tier Scope Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <button
            onClick={() => setScopeTab('department')}
            className={`p-3 rounded-xl border text-left transition-all ${
              scopeTab === 'department'
                ? 'bg-white border-[#C76A2A] ring-2 ring-[#C76A2A]/10 shadow-sm'
                : 'bg-white/60 border-[#E8E5DD] hover:bg-white text-[#7A766E]'
            }`}
          >
            <div className="flex items-center justify-between text-[11px] font-mono mb-1">
              <span className="flex items-center gap-1 font-semibold text-[#1B1B1B]">
                <GraduationCap className="w-3.5 h-3.5 text-[#C76A2A]" /> Department
              </span>
              <span className="font-bold text-[#C76A2A]">#{deptRank}</span>
            </div>
            <p className="text-[10px] text-[#7A766E] line-clamp-1">{userDept} Department ({studentProfile.college || 'HITAM'})</p>
          </button>

          <button
            onClick={() => setScopeTab('campus')}
            className={`p-3 rounded-xl border text-left transition-all ${
              scopeTab === 'campus'
                ? 'bg-white border-[#C76A2A] ring-2 ring-[#C76A2A]/10 shadow-sm'
                : 'bg-white/60 border-[#E8E5DD] hover:bg-white text-[#7A766E]'
            }`}
          >
            <div className="flex items-center justify-between text-[11px] font-mono mb-1">
              <span className="flex items-center gap-1 font-semibold text-[#1B1B1B]">
                <Building2 className="w-3.5 h-3.5 text-blue-600" /> Campus
              </span>
              <span className="font-bold text-blue-600">#{campusRank}</span>
            </div>
            <p className="text-[10px] text-[#7A766E] line-clamp-1">{studentProfile.college || 'HITAM'} Institute</p>
          </button>

          <button
            onClick={() => setScopeTab('state')}
            className={`p-3 rounded-xl border text-left transition-all ${
              scopeTab === 'state'
                ? 'bg-white border-[#C76A2A] ring-2 ring-[#C76A2A]/10 shadow-sm'
                : 'bg-white/60 border-[#E8E5DD] hover:bg-white text-[#7A766E]'
            }`}
          >
            <div className="flex items-center justify-between text-[11px] font-mono mb-1">
              <span className="flex items-center gap-1 font-semibold text-[#1B1B1B]">
                <MapPin className="w-3.5 h-3.5 text-purple-600" /> State
              </span>
              <span className="font-bold text-purple-600">#{stateRank}</span>
            </div>
            <p className="text-[10px] text-[#7A766E] line-clamp-1">Telangana State Cohort</p>
          </button>

          <button
            onClick={() => setScopeTab('national')}
            className={`p-3 rounded-xl border text-left transition-all ${
              scopeTab === 'national'
                ? 'bg-white border-[#C76A2A] ring-2 ring-[#C76A2A]/10 shadow-sm'
                : 'bg-white/60 border-[#E8E5DD] hover:bg-white text-[#7A766E]'
            }`}
          >
            <div className="flex items-center justify-between text-[11px] font-mono mb-1">
              <span className="flex items-center gap-1 font-semibold text-[#1B1B1B]">
                <Globe2 className="w-3.5 h-3.5 text-emerald-600" /> National
              </span>
              <span className="font-bold text-emerald-600">#{nationalRank}</span>
            </div>
            <p className="text-[10px] text-[#7A766E] line-clamp-1">All-India Verified Builders</p>
          </button>
        </div>

        {/* Timeframe Filter */}
        <div className="flex items-center justify-between">
          <div className="text-xs font-semibold text-[#1B1B1B] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#C76A2A]" />
            <span>Showing verified leaderboard for <span className="capitalize font-bold text-[#C76A2A]">{scopeTab}</span></span>
          </div>

          <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-[#E8E5DD] text-[11px] font-mono">
            {(['weekly', 'monthly', 'allTime'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTimeframe(t)}
                className={`px-3 py-1 rounded transition-colors ${
                  timeframe === t
                    ? 'bg-[#1B1B1B] text-white font-medium shadow-xs'
                    : 'text-[#7A766E] hover:text-[#1B1B1B]'
                }`}
              >
                {t === 'allTime' ? 'All-Time' : t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Top 3 Podium Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {activeDataset.slice(0, 3).map((podiumUser, idx) => {
            const isFirst = idx === 0;
            const isUser = podiumUser.studentName.includes('(You)');
            return (
              <div
                key={podiumUser.rank}
                className={`p-4 rounded-xl border relative transition-all ${
                  isUser
                    ? 'bg-[#F4F8F4] border-[#2F7A45] ring-2 ring-[#2F7A45]/20 shadow-sm'
                    : isFirst
                    ? 'bg-gradient-to-b from-amber-50/50 to-white border-amber-300 shadow-sm'
                    : 'bg-white border-[#E8E5DD]'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center font-mono font-bold text-xs ${
                      idx === 0
                        ? 'bg-amber-400 text-black shadow-sm'
                        : idx === 1
                        ? 'bg-slate-300 text-black'
                        : 'bg-amber-700 text-white'
                    }`}
                  >
                    #{podiumUser.rank}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FAF9F5] border border-[#E8E5DD] text-[#7A766E]">
                    {podiumUser.badge}
                  </span>
                </div>

                <div className="flex items-center gap-3 mb-3">
                  <UserAvatar
                    src={podiumUser.avatar}
                    name={podiumUser.studentName}
                    size="md"
                  />
                  <div>
                    <h3 className="text-xs font-bold text-[#1B1B1B]">{podiumUser.studentName}</h3>
                    <p className="text-[10px] text-[#7A766E]">{podiumUser.college} • {podiumUser.department}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#E8E5DD] text-[11px] font-mono">
                  <div>
                    <span className="text-[9px] text-[#7A766E] uppercase block">Builder Score</span>
                    <strong className="text-[#C76A2A] font-bold text-sm">{podiumUser.builderScore}</strong>/1000
                  </div>
                  <div>
                    <span className="text-[9px] text-[#7A766E] uppercase block">Verified XP</span>
                    <strong className="text-[#1B1B1B] font-bold text-sm">{podiumUser.xp}</strong>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Leaderboard Table */}
        <div className="bg-white rounded-xl border border-[#E8E5DD] overflow-hidden shadow-xs">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#E8E5DD] bg-[#FAF9F5] text-[#7A766E] text-[11px]">
                <th className="py-3 px-4 font-mono w-16">Rank</th>
                <th className="py-3 px-4 font-medium">Builder Profile</th>
                <th className="py-3 px-4 font-medium hidden sm:table-cell">Tier &amp; Level</th>
                <th className="py-3 px-4 font-medium hidden md:table-cell">Verified Score</th>
                <th className="py-3 px-4 font-medium hidden md:table-cell">Streak</th>
                <th className="py-3 px-4 font-medium text-right font-mono">Total XP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E5DD]">
              {activeDataset.map((row) => {
                const isUser = row.studentName.includes('(You)');
                return (
                  <tr
                    key={row.rank}
                    className={`transition-colors ${
                      isUser
                        ? 'bg-[#F4F8F4] font-medium border-l-4 border-l-[#2F7A45]'
                        : 'hover:bg-[#FAF9F5]'
                    }`}
                  >
                    <td className="py-3.5 px-4 font-mono font-semibold text-xs">
                      {row.rank === 1 ? (
                        <span className="text-amber-500 font-bold">#1</span>
                      ) : row.rank === 2 ? (
                        <span className="text-slate-500 font-bold">#2</span>
                      ) : row.rank === 3 ? (
                        <span className="text-amber-700 font-bold">#3</span>
                      ) : (
                        <span className="text-[#7A766E]">#{row.rank}</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <UserAvatar
                          src={row.avatar}
                          name={row.studentName}
                          size="sm"
                        />
                        <div>
                          <div className="font-semibold text-xs text-[#1B1B1B] flex items-center gap-1.5">
                            {row.studentName}
                            {isUser && (
                              <span className="px-1.5 py-0.2 rounded text-[9px] bg-[#2F7A45]/10 text-[#2F7A45] font-bold">
                                You
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] text-[#7A766E]">
                            {row.college} • {row.department}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 hidden sm:table-cell text-[11px]">
                      <span className="font-medium text-[#1B1B1B]">
                        Level {row.level}
                      </span>
                      <span className="text-[#7A766E] text-[10px] block">
                        {row.badge}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 hidden md:table-cell font-mono text-[11px]">
                      <span className="font-bold text-[#C76A2A]">{row.builderScore}</span>
                      <span className="text-[#7A766E]">/1000</span>
                    </td>

                    <td className="py-3.5 px-4 hidden md:table-cell font-mono text-[11px] text-orange-600">
                      🔥 {row.streakDays}d
                    </td>

                    <td className="py-3.5 px-4 text-right font-mono font-bold text-xs text-[#1B1B1B]">
                      {row.xp.toLocaleString()} XP
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

