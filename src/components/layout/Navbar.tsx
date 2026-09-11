'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { AIProviderModal } from '@/components/ai/AIProviderModal';
import { getUserDisplayName } from '@/lib/user-utils';
import {
  Sparkles,
  Flame,
  Zap,
  Search,
  Moon,
  Sun,
  LogOut,
  Compass,
  CheckCircle2,
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

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const {
    currentRole,
    currentUser,
    logoutUser,
    aiKeys,
    activeProvider,
    studentProfile,
    xp,
    level,
    streakDays,
    colorMode,
    setColorMode,
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
  const nextLevelXP = level * 150;
  const currentLevelProgress = Math.min(100, Math.round(((xp % 150) / 150) * 100));

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/90 dark:bg-[#09090B]/90 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 transition-colors">
        <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto">
          {/* Brand Identity */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-xl bg-blue-600 dark:bg-blue-500 flex items-center justify-center text-white font-bold text-sm shadow-sm group-hover:scale-105 transition-transform">
                <Compass className="w-4 h-4 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-extrabold text-zinc-900 dark:text-white tracking-tight text-sm flex items-center gap-1.5">
                  SKILLBRIDGE
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-bold">
                    V4
                  </span>
                </span>
                <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-medium tracking-wide hidden sm:inline">
                  Proof-of-Work Platform
                </span>
              </div>
            </Link>
          </div>

          {/* Center Search Input */}
          <div className="hidden md:flex items-center flex-1 max-w-sm mx-6">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400" />
              <input
                type="text"
                placeholder="Search quests, skills, peers, projects..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-full focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 transition-all shadow-2xs"
              />
            </div>
          </div>

          {/* Right Gamification & Profile Controls */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Streak Counter */}
            <div
              title={`${streakDays} Day Builder Streak`}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full streak-pill text-xs font-semibold text-orange-600 dark:text-orange-400 cursor-default"
            >
              <Flame className="w-3.5 h-3.5 text-orange-500 animate-pulse" />
              <span>{streakDays}d Streak</span>
            </div>

            {/* Level & XP Capsule */}
            <Link
              href="/student/journey"
              className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full xp-pill text-xs font-semibold text-blue-700 dark:text-blue-300 hover:opacity-90 transition-opacity"
            >
              <Zap className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Lv. {level} Builder</span>
              <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-mono">
                {xp} XP
              </span>
              <div className="w-10 bg-zinc-200 dark:bg-zinc-700 rounded-full h-1.5 overflow-hidden ml-0.5">
                <div
                  className="bg-blue-600 dark:bg-blue-400 h-1.5 rounded-full"
                  style={{ width: `${currentLevelProgress}%` }}
                />
              </div>
            </Link>

            {/* GitHub Connected Pill */}
            {githubData.connected && (
              <div className="hidden lg:flex items-center gap-1 px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-[11px] font-mono text-zinc-700 dark:text-zinc-300">
                <GithubIcon className="w-3 h-3 text-zinc-800 dark:text-zinc-200" />
                <span>@{githubData.username}</span>
                <CheckCircle2 className="w-3 h-3 text-emerald-500 ml-0.5" />
              </div>
            )}

            {/* Theme / Dark Mode Toggle */}
            <button
              onClick={() => setColorMode(colorMode === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-xl text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              title="Toggle Light / Dark Mode"
            >
              {mounted && colorMode === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-zinc-600" />
              )}
            </button>

            {/* AI Engine BYOK */}
            <button
              onClick={() => setIsAiModalOpen(true)}
              className="hidden md:flex px-2.5 py-1.5 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs font-semibold items-center gap-1.5 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span className="capitalize">{activeProvider}</span>
              {hasKey && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />}
            </button>

            {/* User Profile Avatar */}
            <div className="flex items-center gap-2 pl-2 border-l border-zinc-200 dark:border-zinc-800">
              <img
                src={currentUser?.avatar || studentProfile.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                alt={displayName}
                className="w-7 h-7 rounded-full object-cover border border-zinc-300 dark:border-zinc-700"
              />
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                title="Sign Out"
                className="p-1.5 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <AIProviderModal isOpen={isAiModalOpen} onClose={() => setIsAiModalOpen(false)} />
    </>
  );
}
