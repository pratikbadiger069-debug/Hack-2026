'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { useAppStore } from '@/lib/store';
import { mockLeaderboard } from '@/lib/mock-data';
import {
  Trophy,
  Medal,
  Flame,
  CheckCircle2,
  Users,
  Building,
  Globe,
  Sparkles,
  Zap,
} from 'lucide-react';

export default function StudentLeaderboardPage() {
  const { studentProfile, rankings, xp, level } = useAppStore();
  const [activeTab, setActiveTab] = useState<'college' | 'department' | 'global'>('college');

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
      level: level,
      xp: xp,
      badge: 'Senior Builder',
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
      badge: 'Builder',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80',
    },
  ];

  return (
    <PortalLayout>
      <div className="space-y-8 max-w-[1300px] mx-auto pb-20">
        {/* Header HUD */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-zinc-200 dark:border-zinc-800"
        >
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                Collegiate Rankings
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-heading font-black tracking-tight text-zinc-900 dark:text-white mt-1">
              Builder Leaderboard
            </h1>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-sans">
              Compete on code output, assessment accuracy, verified badges, and active streaks.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 flex items-center gap-4 text-xs">
              <div>
                <span className="text-zinc-400 block font-mono">Your Rank</span>
                <strong className="text-base font-heading font-extrabold text-blue-600 dark:text-blue-400">
                  #{rankings.collegeRank} in {rankings.collegeName}
                </strong>
              </div>
              <div className="pl-4 border-l border-zinc-200 dark:border-zinc-800">
                <span className="text-zinc-400 block font-mono">Global Tier</span>
                <strong className="text-base font-heading font-extrabold text-emerald-600 dark:text-emerald-400">
                  {rankings.globalPercentile}
                </strong>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Podium Top 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {fullLeaderboard.slice(0, 3).map((lead, idx) => (
            <motion.div
              key={lead.rank}
              whileHover={{ scale: 1.02 }}
              className={`builder-card p-6 text-center space-y-4 relative overflow-hidden ${
                lead.rank === 1
                  ? 'border-amber-300 dark:border-amber-700/60 bg-gradient-to-b from-amber-50/40 dark:from-amber-950/20 to-transparent'
                  : lead.rank === 2
                  ? 'border-zinc-300 dark:border-zinc-700 bg-gradient-to-b from-zinc-50/50 dark:from-zinc-900/40 to-transparent'
                  : 'border-orange-200 dark:border-orange-950 bg-gradient-to-b from-orange-50/30 dark:from-orange-950/10 to-transparent'
              }`}
            >
              <div className="w-8 h-8 rounded-full font-heading font-black text-xs mx-auto flex items-center justify-center bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-md">
                #{lead.rank}
              </div>

              <img
                src={lead.avatar}
                alt={lead.studentName}
                className="w-16 h-16 rounded-full mx-auto object-cover ring-2 ring-zinc-200 dark:ring-zinc-700 shadow-md"
              />

              <div>
                <h3 className="font-heading font-extrabold text-base text-zinc-900 dark:text-white">
                  {lead.studentName}
                </h3>
                <span className="text-xs text-zinc-500 font-mono">
                  {lead.college} • {lead.department}
                </span>
              </div>

              <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-around text-xs font-mono">
                <div>
                  <span className="text-[10px] text-zinc-400 block uppercase">Builder Score</span>
                  <strong className="font-bold text-zinc-900 dark:text-white">{lead.builderScore}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-400 block uppercase">Level / XP</span>
                  <strong className="font-bold text-blue-600 dark:text-blue-400">Lv.{lead.level} ({lead.xp})</strong>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Filter Tabs & Main Leaderboard Table */}
        <div className="builder-card p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-100 dark:border-zinc-800">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('college')}
                className={`px-4 py-1.5 rounded-full text-xs font-heading font-bold transition-all ${
                  activeTab === 'college'
                    ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900'
                    : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                College ({rankings.collegeName})
              </button>
              <button
                onClick={() => setActiveTab('department')}
                className={`px-4 py-1.5 rounded-full text-xs font-heading font-bold transition-all ${
                  activeTab === 'department'
                    ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900'
                    : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                Department ({rankings.deptName})
              </button>
              <button
                onClick={() => setActiveTab('global')}
                className={`px-4 py-1.5 rounded-full text-xs font-heading font-bold transition-all ${
                  activeTab === 'global'
                    ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900'
                    : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                Global League
              </button>
            </div>
            <span className="text-xs font-mono text-zinc-400">Updated every 60s</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-zinc-400 font-mono uppercase text-[10px] border-b border-zinc-100 dark:border-zinc-800">
                  <th className="pb-3 pl-3">Rank</th>
                  <th className="pb-3">Builder</th>
                  <th className="pb-3">Institution &amp; Branch</th>
                  <th className="pb-3 text-center">Level / XP</th>
                  <th className="pb-3 text-center">Verified Badges</th>
                  <th className="pb-3 text-right pr-3">Builder Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {fullLeaderboard.map((row) => {
                  const isUser = row.rank === 5;
                  return (
                    <tr
                      key={row.rank}
                      className={`hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors ${
                        isUser
                          ? 'bg-blue-50/60 dark:bg-blue-950/20 font-bold text-blue-900 dark:text-blue-100'
                          : ''
                      }`}
                    >
                      <td className="py-3.5 pl-3">
                        <span
                          className={`w-6 h-6 rounded-full inline-flex items-center justify-center font-mono font-bold text-xs ${
                            row.rank === 1
                              ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-200'
                              : row.rank === 2
                              ? 'bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200'
                              : row.rank === 3
                              ? 'bg-orange-100 dark:bg-orange-950 text-orange-800 dark:text-orange-200'
                              : 'text-zinc-500'
                          }`}
                        >
                          #{row.rank}
                        </span>
                      </td>
                      <td className="py-3.5">
                        <div className="flex items-center gap-3">
                          <img
                            src={row.avatar}
                            alt={row.studentName}
                            className="w-8 h-8 rounded-full object-cover ring-1 ring-zinc-200 dark:ring-zinc-700"
                          />
                          <div>
                            <span className="font-heading font-bold text-zinc-900 dark:text-white">
                              {row.studentName}
                            </span>
                            <span className="block text-[10px] text-zinc-400 font-mono font-normal">
                              {row.badge}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 text-zinc-500 font-mono">
                        {row.college} • {row.department}
                      </td>
                      <td className="py-3.5 text-center font-mono font-bold text-blue-600 dark:text-blue-400">
                        Lv.{row.level} ({row.xp} XP)
                      </td>
                      <td className="py-3.5 text-center">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 font-mono text-[11px] font-bold">
                          <CheckCircle2 className="w-3 h-3" />
                          {row.verifiedSkillsCount} Skills
                        </span>
                      </td>
                      <td className="py-3.5 text-right pr-3 font-mono font-extrabold text-zinc-900 dark:text-white">
                        {row.builderScore} / 1000
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
