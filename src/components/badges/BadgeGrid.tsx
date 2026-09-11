'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import {
  computeUserBadges,
  BADGE_TIERS,
  BadgeTier,
  ComputedBadge,
} from '@/lib/badge-engine';
import { BadgeCard } from './BadgeCard';
import { Trophy, Award, Sparkles, Filter, CheckCircle2, Lock } from 'lucide-react';

export function BadgeGrid() {
  const {
    studentProfile,
    xp,
    streakDays,
    quests,
    githubData,
  } = useAppStore();

  const [selectedTier, setSelectedTier] = useState<number | 'all'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'unlocked' | 'locked'>('all');

  const completedChallenges = (quests || []).filter((q) => q.completed).length;
  const verifiedSkills = (studentProfile.verifiedSkills || []).map((s) => ({
    name: s.name,
    category: s.category,
    score: s.score,
  }));

  const badges = computeUserBadges({
    assessmentsCompletedCount: verifiedSkills.length,
    highScoreAssessmentsCount: verifiedSkills.filter((s) => s.score >= 85).length,
    githubConnected: Boolean(githubData?.connected),
    challengesCompletedCount: completedChallenges,
    streakDays: streakDays || 24,
    openSourcePRsCount: 3,
    verifiedSkills,
    evidencesCount: (studentProfile.evidences || []).length,
    builderScore: studentProfile?.builderScores?.overall || 785,
    builderLevel: Math.floor(xp / 250) + 1,
    hackathonWins: studentProfile?.professional?.hackathonWins || 1,
  });

  const unlockedCount = badges.filter((b) => b.unlocked).length;

  const filteredBadges = badges.filter((badge) => {
    if (selectedTier !== 'all' && badge.tier !== selectedTier) return false;
    if (filterStatus === 'unlocked' && !badge.unlocked) return false;
    if (filterStatus === 'locked' && badge.unlocked) return false;
    return true;
  });

  return (
    <div className="p-6 rounded-2xl bg-white border border-[#E8E5DD] shadow-xs space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E8E5DD]">
        <div>
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-[#C76A2A]" />
            <h2 className="text-lg font-bold text-[#1B1B1B]">Badge System 2.0</h2>
            <span className="px-2.5 py-0.5 rounded-full bg-[#1B1B1B] text-white text-[11px] font-mono font-bold">
              {unlockedCount} / {badges.length} Unlocked
            </span>
          </div>
          <p className="text-xs text-[#6F6A60] mt-0.5">
            Prestigious engineering badges across 6 tiers. Unlocks automatically as verified telemetry thresholds are met.
          </p>
        </div>

        {/* Filter Pill */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-2.5 py-1 rounded-xl text-xs font-semibold transition-all ${
              filterStatus === 'all'
                ? 'bg-[#1B1B1B] text-white'
                : 'bg-[#F6F4EE] text-[#6F6A60] hover:text-[#1B1B1B]'
            }`}
          >
            All Badges
          </button>
          <button
            onClick={() => setFilterStatus('unlocked')}
            className={`px-2.5 py-1 rounded-xl text-xs font-semibold transition-all flex items-center gap-1 ${
              filterStatus === 'unlocked'
                ? 'bg-[#2F7A45] text-white'
                : 'bg-[#F6F4EE] text-[#6F6A60] hover:text-[#2F7A45]'
            }`}
          >
            <CheckCircle2 className="w-3 h-3" />
            <span>Unlocked ({unlockedCount})</span>
          </button>
          <button
            onClick={() => setFilterStatus('locked')}
            className={`px-2.5 py-1 rounded-xl text-xs font-semibold transition-all flex items-center gap-1 ${
              filterStatus === 'locked'
                ? 'bg-[#6F6A60] text-white'
                : 'bg-[#F6F4EE] text-[#6F6A60] hover:text-[#1B1B1B]'
            }`}
          >
            <Lock className="w-3 h-3" />
            <span>Locked ({badges.length - unlockedCount})</span>
          </button>
        </div>
      </div>

      {/* Tier Selector Bar (Bronze -> Legendary) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        <button
          onClick={() => setSelectedTier('all')}
          className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
            selectedTier === 'all'
              ? 'bg-[#1B1B1B] text-white shadow-xs'
              : 'bg-[#F6F4EE] text-[#6F6A60] hover:border-[#E8E5DD] hover:text-[#1B1B1B]'
          }`}
        >
          All Tiers
        </button>

        {([1, 2, 3, 4, 5, 6] as BadgeTier[]).map((t) => {
          const style = BADGE_TIERS[t];
          const count = badges.filter((b) => b.tier === t).length;
          const isSelected = selectedTier === t;

          return (
            <button
              key={t}
              onClick={() => setSelectedTier(t)}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all border flex items-center gap-1.5 ${
                isSelected
                  ? `${style.badgeBg} ${style.textColor} border-current shadow-xs`
                  : 'bg-white border-[#E8E5DD] text-[#6F6A60] hover:border-[#1B1B1B]'
              }`}
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: style.color }} />
              <span>{style.name} (T{t})</span>
              <span className="text-[10px] font-mono opacity-70">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Badge Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredBadges.map((badge) => (
          <BadgeCard key={badge.id} badge={badge} />
        ))}
      </div>
    </div>
  );
}
