'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BADGE_TIERS, ComputedBadge } from '@/lib/badge-engine';
import { Lock, Sparkles, CheckCircle2 } from 'lucide-react';

interface BadgeCardProps {
  badge: ComputedBadge;
  onClick?: () => void;
}

export function BadgeCard({ badge, onClick }: BadgeCardProps) {
  const tierStyle = BADGE_TIERS[badge.tier];

  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.02 }}
      transition={{ duration: 0.15 }}
      onClick={onClick}
      className={`relative p-4 rounded-2xl border transition-all duration-200 overflow-hidden flex flex-col justify-between ${
        badge.unlocked
          ? 'bg-white border-[#E8E5DD] hover:border-[#C76A2A] shadow-xs'
          : 'bg-[#F6F4EE]/70 border-[#E8E5DD]/80 backdrop-blur-xs'
      }`}
      style={{
        boxShadow: badge.unlocked ? `0 4px 20px ${tierStyle.bgGlow}` : undefined,
      }}
    >
      {/* Glow Halo for Unlocked Badges */}
      {badge.unlocked && (
        <div
          className="absolute -right-6 -top-6 w-20 h-20 rounded-full blur-xl pointer-events-none opacity-40"
          style={{ backgroundColor: tierStyle.color }}
        />
      )}

      {/* Top Bar: Tier Capsule + Lock/Check Status */}
      <div className="flex items-center justify-between gap-2 relative z-10">
        <span
          className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${tierStyle.badgeBg} ${tierStyle.textColor} border border-black/5`}
        >
          {tierStyle.name} • T{badge.tier}
        </span>

        {badge.unlocked ? (
          <span className="flex items-center gap-1 text-[10px] font-bold text-[#2F7A45] bg-[#2F7A45]/10 px-1.5 py-0.5 rounded-full">
            <CheckCircle2 className="w-3 h-3" />
            <span>Unlocked</span>
          </span>
        ) : (
          <span className="flex items-center gap-1 text-[10px] font-medium text-[#6F6A60] bg-black/5 px-1.5 py-0.5 rounded-full">
            <Lock className="w-2.5 h-2.5" />
            <span>Locked</span>
          </span>
        )}
      </div>

      {/* Center Icon & Title */}
      <div className="py-3 text-center space-y-1.5 relative z-10">
        <div
          className={`w-12 h-12 mx-auto rounded-2xl flex items-center justify-center text-2xl transition-all duration-300 ${
            badge.unlocked
              ? `${tierStyle.badgeBg} shadow-xs border`
              : 'bg-[#E8E5DD]/60 grayscale opacity-60'
          }`}
          style={{
            borderColor: badge.unlocked ? tierStyle.borderColor : '#E8E5DD',
          }}
        >
          {badge.icon}
        </div>

        <div>
          <h4
            className={`text-xs font-bold ${
              badge.unlocked ? 'text-[#1B1B1B]' : 'text-[#6F6A60]'
            }`}
          >
            {badge.title}
          </h4>
          <p className="text-[10px] text-[#6F6A60] line-clamp-2 mt-0.5 leading-snug">
            {badge.description}
          </p>
        </div>
      </div>

      {/* Bottom Progress Bar & Requirement */}
      <div className="space-y-1.5 pt-2 border-t border-[#E8E5DD]/70 relative z-10">
        <div className="flex items-center justify-between text-[10px] font-mono">
          <span className={badge.unlocked ? 'text-[#1B1B1B] font-bold' : 'text-[#6F6A60]'}>
            {badge.unlocked
              ? 'Completed'
              : `${badge.currentProgress} / ${badge.maxProgress} ${badge.progressUnit}`}
          </span>
          <span
            className="font-bold"
            style={{ color: badge.unlocked ? '#2F7A45' : tierStyle.color }}
          >
            {badge.progressPercent}%
          </span>
        </div>

        <div className="w-full h-1.5 bg-[#E8E5DD]/80 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${badge.progressPercent}%`,
              backgroundColor: badge.unlocked ? '#2F7A45' : tierStyle.color,
            }}
          />
        </div>

        {!badge.unlocked ? (
          <p className="text-[9px] text-[#6F6A60] italic truncate">
            {badge.requirementDescription}
          </p>
        ) : (
          <div className="flex items-center justify-between text-[9px] font-mono font-semibold text-[#C76A2A]">
            <span>+{badge.xpReward} XP Earned</span>
            <span className="text-[#6F6A60]">Trophy Verified</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
