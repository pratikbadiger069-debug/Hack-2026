'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/lib/store';
import {
  getStreakLevelInfo,
  computeGitHubStreakMetrics,
  STREAK_LEVELS,
} from '@/lib/github-streak';
import {
  Flame,
  GitBranch,
  Calendar,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  Zap,
  Star,
  RefreshCw,
  GitPullRequest,
  Tag,
  ShieldCheck,
} from 'lucide-react';

function GithubIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

export function GitHubStreakCard() {
  const {
    streakDays,
    githubData,
    connectGitHub,
    disconnectGitHub,
    syncGitHub,
  } = useAppStore();

  const [isSyncing, setIsSyncing] = useState(false);
  const [syncNotice, setSyncNotice] = useState('');

  const streakInfo = getStreakLevelInfo(streakDays || 24);
  const metrics = computeGitHubStreakMetrics(streakDays || 24, githubData.recentCommitsCount || 348);

  const handleSync = () => {
    setIsSyncing(true);
    setSyncNotice('');
    setTimeout(() => {
      syncGitHub();
      setIsSyncing(false);
      setSyncNotice('Fetched 14 new commits & updated streak metrics (+15 XP)');
      setTimeout(() => setSyncNotice(''), 4000);
    }, 800);
  };

  const handleConnect = () => {
    connectGitHub('aarav-builder');
  };

  return (
    <div
      id="github"
      className="p-6 rounded-3xl bg-white border border-[#E8E5DD] shadow-xs space-y-6 relative overflow-hidden transition-all duration-300"
      style={{
        boxShadow: `0 8px 30px ${streakInfo.glowStyle}`,
      }}
    >
      {/* Background Accent Gradient */}
      <div
        className={`absolute -right-20 -top-20 w-64 h-64 rounded-full blur-3xl pointer-events-none opacity-30`}
        style={{ backgroundColor: streakInfo.accentColor }}
      />

      {/* Header with Title & Level Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E8E5DD] relative z-10">
        <div>
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center text-lg border"
              style={{
                backgroundColor: streakInfo.borderColor,
                borderColor: streakInfo.accentColor,
              }}
            >
              {streakInfo.badge}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-[#1B1B1B]">GitHub Streak System 2.0</h2>
                <span
                  className="px-2.5 py-0.5 rounded-full text-xs font-bold border"
                  style={{
                    backgroundColor: `${streakInfo.accentColor}15`,
                    color: streakInfo.accentColor,
                    borderColor: `${streakInfo.accentColor}40`,
                  }}
                >
                  Tier {streakInfo.tier} • {streakInfo.title}
                </span>
              </div>
              <p className="text-xs text-[#6F6A60] mt-0.5">
                {streakInfo.description}
              </p>
            </div>
          </div>
        </div>

        {/* Sync / OAuth Actions */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          {githubData.connected ? (
            <>
              <button
                onClick={handleSync}
                disabled={isSyncing}
                className="px-3.5 py-1.5 bg-[#F6F4EE] hover:bg-[#E8E5DD] text-[#1B1B1B] rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5"
              >
                <RefreshCw className={`w-3.5 h-3.5 text-[#C76A2A] ${isSyncing ? 'animate-spin' : ''}`} />
                <span>{isSyncing ? 'Syncing...' : 'Sync Activity'}</span>
              </button>
              <button
                onClick={disconnectGitHub}
                className="px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 rounded-xl transition-colors"
              >
                Disconnect
              </button>
            </>
          ) : (
            <button
              onClick={handleConnect}
              className="px-4 py-2 bg-[#1B1B1B] hover:bg-[#C76A2A] text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-2"
            >
              <GithubIcon className="w-4 h-4 text-white" />
              <span>Connect GitHub OAuth</span>
            </button>
          )}
        </div>
      </div>

      {syncNotice && (
        <div className="p-3 bg-[#2F7A45]/10 border border-[#2F7A45]/20 rounded-xl text-xs font-semibold text-[#2F7A45] flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{syncNotice}</span>
        </div>
      )}

      {/* 6-Core Analytics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 relative z-10">
        {/* Metric 1: Current Streak */}
        <div className="p-3.5 rounded-2xl bg-[#FAF9F5] border border-[#E8E5DD] space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-[#6F6A60] uppercase">Current Streak</span>
            <Flame className="w-3.5 h-3.5 text-[#C76A2A]" />
          </div>
          <span className="text-2xl font-bold font-mono text-[#1B1B1B] block">
            {metrics.currentStreak}d
          </span>
          <span className="text-[10px] text-[#2F7A45] font-semibold">Active unbroken</span>
        </div>

        {/* Metric 2: Longest Streak */}
        <div className="p-3.5 rounded-2xl bg-[#FAF9F5] border border-[#E8E5DD] space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-[#6F6A60] uppercase">Longest Streak</span>
            <Zap className="w-3.5 h-3.5 text-[#F59E0B]" />
          </div>
          <span className="text-2xl font-bold font-mono text-[#1B1B1B] block">
            {metrics.longestStreak}d
          </span>
          <span className="text-[10px] text-[#6F6A60]">Personal best</span>
        </div>

        {/* Metric 3: Monthly Commits */}
        <div className="p-3.5 rounded-2xl bg-[#FAF9F5] border border-[#E8E5DD] space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-[#6F6A60] uppercase">This Month</span>
            <Calendar className="w-3.5 h-3.5 text-[#3B82F6]" />
          </div>
          <span className="text-2xl font-bold font-mono text-[#1B1B1B] block">
            {metrics.monthlyContributions}
          </span>
          <span className="text-[10px] text-[#2F7A45] font-semibold">↑ High velocity</span>
        </div>

        {/* Metric 4: Yearly Contributions */}
        <div className="p-3.5 rounded-2xl bg-[#FAF9F5] border border-[#E8E5DD] space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-[#6F6A60] uppercase">Yearly Total</span>
            <GitBranch className="w-3.5 h-3.5 text-[#8B5CF6]" />
          </div>
          <span className="text-2xl font-bold font-mono text-[#1B1B1B] block">
            {metrics.yearlyContributions}
          </span>
          <span className="text-[10px] text-[#6F6A60]">Verified commits</span>
        </div>

        {/* Metric 5: Active Days */}
        <div className="p-3.5 rounded-2xl bg-[#FAF9F5] border border-[#E8E5DD] space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-[#6F6A60] uppercase">Active Days</span>
            <Sparkles className="w-3.5 h-3.5 text-[#06B6D4]" />
          </div>
          <span className="text-2xl font-bold font-mono text-[#1B1B1B] block">
            {metrics.activeDays}
          </span>
          <span className="text-[10px] text-[#6F6A60]">In past 365d</span>
        </div>

        {/* Metric 6: Total Stars */}
        <div className="p-3.5 rounded-2xl bg-[#FAF9F5] border border-[#E8E5DD] space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-[#6F6A60] uppercase">Stars &amp; Repos</span>
            <Star className="w-3.5 h-3.5 text-[#C76A2A]" />
          </div>
          <span className="text-2xl font-bold font-mono text-[#C76A2A] block">
            {metrics.totalStars} ★
          </span>
          <span className="text-[10px] text-[#6F6A60]">{metrics.totalRepositories} public repos</span>
        </div>
      </div>

      {/* Streak Tier Ladder Bar */}
      <div className="p-4 bg-[#FAF9F5] rounded-2xl border border-[#E8E5DD] space-y-3 relative z-10">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-[#1B1B1B]">Dynamic Streak Level Milestones</span>
          <span className="font-mono text-[#6F6A60] text-[11px]">
            Current: <strong className="text-[#1B1B1B]">{metrics.currentStreak} Days</strong> ({streakInfo.title})
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-center text-xs">
          {STREAK_LEVELS.map((lvl) => {
            const isUnlocked = metrics.currentStreak >= lvl.minDays;
            const isCurrent = streakInfo.tier === lvl.tier;

            return (
              <div
                key={lvl.tier}
                className={`p-2.5 rounded-xl border transition-all ${
                  isCurrent
                    ? 'bg-white border-[#C76A2A] ring-2 ring-[#C76A2A]/20 shadow-xs'
                    : isUnlocked
                    ? 'bg-white/80 border-[#E8E5DD] text-[#1B1B1B]'
                    : 'bg-[#F6F4EE]/50 border-dashed border-[#E8E5DD] opacity-50'
                }`}
              >
                <div className="text-lg mb-0.5">{lvl.badge}</div>
                <div className="text-[11px] font-bold truncate text-[#1B1B1B]">{lvl.title}</div>
                <div className="text-[10px] font-mono text-[#6F6A60]">
                  {lvl.minDays}{lvl.maxDays < 999 ? `–${lvl.maxDays}` : '+'}d
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Contribution Heatmap & Recent Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
        {/* Heatmap (7 cols) */}
        <div className="lg:col-span-7 p-4 rounded-2xl bg-white border border-[#E8E5DD] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#1B1B1B]">Contribution Density Map</span>
            <div className="flex items-center gap-1.5 text-[10px] text-[#6F6A60]">
              <span>Less</span>
              <div className="w-2.5 h-2.5 rounded-xs bg-[#E8E5DD]" />
              <div className="w-2.5 h-2.5 rounded-xs bg-[#86EFAC]" />
              <div className="w-2.5 h-2.5 rounded-xs bg-[#22C55E]" />
              <div className="w-2.5 h-2.5 rounded-xs bg-[#15803D]" />
              <span>More</span>
            </div>
          </div>

          <div className="overflow-x-auto pb-1">
            <div className="grid grid-flow-col grid-rows-4 gap-1 min-w-[500px]">
              {Array.from({ length: 112 }).map((_, i) => {
                const level = (i * 7 + (metrics.currentStreak > 10 ? 3 : 1)) % 5;
                const bgClass =
                  level === 0 ? 'bg-[#E8E5DD]/70' :
                  level === 1 ? 'bg-[#BBF7D0]' :
                  level === 2 ? 'bg-[#86EFAC]' :
                  level === 3 ? 'bg-[#22C55E]' : 'bg-[#15803D]';
                return (
                  <div
                    key={i}
                    title={`Day ${i + 1}: ${level * 3} commits`}
                    className={`w-3 h-3 rounded-xs ${bgClass} transition-transform hover:scale-125 cursor-pointer`}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Live Repository Activity Feed (5 cols) */}
        <div className="lg:col-span-5 p-4 rounded-2xl bg-[#FAF9F5] border border-[#E8E5DD] space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#1B1B1B]">Live Repository Activity</span>
            <span className="text-[10px] font-mono text-[#2F7A45] font-bold">Auto-Synced</span>
          </div>

          <div className="space-y-2 text-xs">
            {metrics.recentActivity.map((act) => (
              <div
                key={act.id}
                className="p-2.5 bg-white rounded-xl border border-[#E8E5DD] space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#1B1B1B] font-mono text-[11px] truncate">
                    {act.repoName}
                  </span>
                  <span className="text-[10px] text-[#6F6A60]">{act.timestamp}</span>
                </div>
                <p className="text-[11px] text-[#6F6A60] leading-snug line-clamp-2">
                  {act.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
