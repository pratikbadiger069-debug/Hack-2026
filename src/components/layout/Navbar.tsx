'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { AIProviderModal } from '@/components/ai/AIProviderModal';
import { ProfileDropdown } from './ProfileDropdown';
import { getUserDisplayName } from '@/lib/user-utils';
import { getLevelInfo } from '@/lib/xp-engine';
import {
  Sparkles,
  Search,
  LogOut,
  Compass,
  CheckCircle2,
  Flame,
  ShieldCheck,
} from 'lucide-react';

function GithubIcon({ className = 'w-3.5 h-3.5' }: { className?: string }) {
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

export function Navbar() {
  const router = useRouter();
  const {
    currentUser,
    logoutUser,
    aiKeys,
    activeProvider,
    studentProfile,
    xp,
    streakDays,
    githubData,
  } = useAppStore();

  const [mounted, setMounted] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const hasKey = Boolean(aiKeys[activeProvider] && aiKeys[activeProvider].length > 5);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch {
      // Continue
    }
    logoutUser();
    setIsLoggingOut(false);
    router.push('/login');
  };

  const displayName = getUserDisplayName({ user: currentUser, profile: studentProfile });
  const levelInfo = getLevelInfo(xp);

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#FFFFFF]/90 backdrop-blur-md border-b border-[#E8E5DD] transition-colors">
        <div className="flex items-center justify-between h-14 px-4 sm:px-6 max-w-[1440px] mx-auto">
          {/* Brand Identity */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-xl bg-[#1B1B1B] flex items-center justify-center text-white font-semibold text-xs shadow-xs group-hover:bg-[#C76A2A] transition-colors">
                <Compass className="w-4 h-4 text-white" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-bold text-[#1B1B1B] tracking-tight text-sm">
                  SKILLBRIDGE
                </span>
                <span className="text-[11px] text-[#6F6A60] hidden sm:inline font-medium">
                  Builder OS
                </span>
              </div>
            </Link>
          </div>

          {/* Center Search Input */}
          <div className="hidden md:flex items-center flex-1 max-w-sm mx-6">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#6F6A60]" />
              <input
                type="text"
                placeholder="Search verified skills, challenges, tracks..."
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#F6F4EE] border border-[#E8E5DD] rounded-xl focus:outline-none focus:border-[#C76A2A] text-[#1B1B1B] placeholder:text-[#6F6A60] transition-colors"
              />
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Level & XP Capsule */}
            <Link
              href="/student/journey"
              className="flex items-center gap-2 px-3 py-1 rounded-xl bg-[#F6F4EE] border border-[#E8E5DD] text-xs font-semibold text-[#1B1B1B] hover:border-[#C76A2A] transition-all shadow-xs"
            >
              <span>Lvl {levelInfo.level} {levelInfo.title}</span>
              <span className="text-[#C76A2A] font-mono text-[11px]">
                {xp} XP
              </span>
            </Link>

            {/* Daily Streak */}
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-[#F6F4EE] border border-[#E8E5DD] text-xs font-medium text-[#1B1B1B]">
              <Flame className="w-3.5 h-3.5 text-[#C76A2A]" />
              <span className="font-mono text-[11px]">{streakDays}d streak</span>
            </div>

            {/* GitHub Sync Status */}
            {githubData.connected ? (
              <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-[#F6F4EE] border border-[#E8E5DD] text-xs text-[#1B1B1B]">
                <GithubIcon className="w-3.5 h-3.5 text-[#1B1B1B]" />
                <span className="font-mono text-[11px]">@{githubData.username}</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2F7A45]" />
              </div>
            ) : (
              <Link
                href="/student/journey#github"
                className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white border border-[#E8E5DD] text-xs text-[#6F6A60] hover:text-[#1B1B1B] hover:border-[#C76A2A] transition-colors"
              >
                <GithubIcon className="w-3.5 h-3.5 text-[#6F6A60]" />
                <span className="text-[11px]">Connect GitHub</span>
              </Link>
            )}

            {/* AI Provider Status */}
            <button
              onClick={() => setIsAiModalOpen(true)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-medium border transition-colors ${
                hasKey
                  ? 'bg-white border-[#E8E5DD] text-[#1B1B1B] hover:border-[#C76A2A]'
                  : 'bg-[#C76A2A]/10 border-[#C76A2A]/30 text-[#C76A2A] hover:bg-[#C76A2A]/20'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C76A2A]" />
              <span className="hidden sm:inline capitalize">{activeProvider}</span>
            </button>

            {/* User Profile Dropdown Menu */}
            <div className="pl-2 border-l border-[#E8E5DD]">
              <ProfileDropdown />
            </div>
          </div>
        </div>
      </header>

      <AIProviderModal isOpen={isAiModalOpen} onClose={() => setIsAiModalOpen(false)} />
    </>
  );
}
