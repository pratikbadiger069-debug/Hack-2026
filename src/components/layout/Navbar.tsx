'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { AIProviderModal } from '@/components/ai/AIProviderModal';
import { getUserDisplayName } from '@/lib/user-utils';
import {
  Sparkles,
  Search,
  Moon,
  Sun,
  Laptop,
  LogOut,
  Compass,
  CheckCircle2,
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
  const xpInCurrentLevel = xp % 1000;
  const levelTarget = 1000;

  const cycleColorMode = () => {
    if (colorMode === 'light') setColorMode('dark');
    else if (colorMode === 'dark') setColorMode('system');
    else setColorMode('light');
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#FFFFFF]/95 dark:bg-[#161B22]/95 backdrop-blur-md border-b border-[#E6E4DD] dark:border-[#2D333B] transition-colors">
        <div className="flex items-center justify-between h-14 px-4 sm:px-6 max-w-[1440px] mx-auto">
          {/* Brand Identity */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#1F2328] dark:bg-[#F0F6FC] flex items-center justify-center text-white dark:text-[#0F1115] font-semibold text-xs shadow-xs">
                <Compass className="w-3.5 h-3.5 text-white dark:text-[#0F1115]" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-semibold text-[#1F2328] dark:text-[#F0F6FC] tracking-tight text-sm">
                  SKILLBRIDGE
                </span>
                <span className="text-[11px] text-[#656D76] dark:text-[#8B949E] hidden sm:inline">
                  Workforce Intelligence
                </span>
              </div>
            </Link>
          </div>

          {/* Center Search Input */}
          <div className="hidden md:flex items-center flex-1 max-w-sm mx-6">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#8C959F] dark:text-[#6E7681]" />
              <input
                type="text"
                placeholder="Search skills, challenges, peer builders..."
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#FAF9F5] dark:bg-[#0F1115] border border-[#E6E4DD] dark:border-[#2D333B] rounded-lg focus:outline-none focus:border-blue-500 text-[#1F2328] dark:text-[#F0F6FC] placeholder:text-[#8C959F] dark:placeholder:text-[#6E7681] transition-colors"
              />
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Level & XP Minimal Capsule */}
            <Link
              href="/student/journey"
              className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#FAF9F5] dark:bg-[#0F1115] border border-[#E6E4DD] dark:border-[#2D333B] text-xs font-medium text-[#1F2328] dark:text-[#F0F6FC] hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
            >
              <span>Level {level} Builder</span>
              <span className="text-[#8C959F] dark:text-[#6E7681] font-mono text-[11px]">
                {xpInCurrentLevel} / {levelTarget} XP
              </span>
            </Link>

            {/* GitHub Connected Indicator */}
            {githubData.connected && (
              <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#FAF9F5] dark:bg-[#0F1115] border border-[#E6E4DD] dark:border-[#2D333B] text-xs text-[#1F2328] dark:text-[#F0F6FC]">
                <GithubIcon className="w-3.5 h-3.5 text-[#1F2328] dark:text-[#F0F6FC]" />
                <span className="font-mono text-[11px]">@{githubData.username}</span>
                <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
              </div>
            )}

            {/* Light / Dark / System Mode Toggle */}
            <button
              onClick={cycleColorMode}
              className="p-1.5 rounded-lg text-[#656D76] dark:text-[#8B949E] hover:text-[#1F2328] dark:hover:text-[#F0F6FC] hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              title={`Current: ${colorMode} mode (Click to switch)`}
            >
              {mounted && colorMode === 'dark' ? (
                <Moon className="w-4 h-4 text-blue-400" />
              ) : mounted && colorMode === 'system' ? (
                <Laptop className="w-4 h-4 text-[#8C959F]" />
              ) : (
                <Sun className="w-4 h-4 text-amber-600" />
              )}
            </button>

            {/* AI Engine Status */}
            <button
              onClick={() => setIsAiModalOpen(true)}
              className="hidden md:flex px-2.5 py-1 bg-[#FAF9F5] dark:bg-[#0F1115] hover:bg-[#F0EEE6] dark:hover:bg-[#1C2128] text-[#1F2328] dark:text-[#F0F6FC] border border-[#E6E4DD] dark:border-[#2D333B] rounded-lg text-xs font-medium items-center gap-1.5 transition-colors"
            >
              <Sparkles className="w-3 h-3 text-blue-600 dark:text-blue-400" />
              <span className="capitalize">{activeProvider}</span>
              {hasKey && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />}
            </button>

            {/* User Profile Avatar */}
            <div className="flex items-center gap-2 pl-2 border-l border-[#E6E4DD] dark:border-[#2D333B]">
              <img
                src={currentUser?.avatar || studentProfile.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                alt={displayName}
                className="w-6 h-6 rounded-full object-cover border border-[#E6E4DD] dark:border-[#2D333B]"
              />
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                title="Sign Out"
                className="p-1 text-[#8C959F] dark:text-[#6E7681] hover:text-[#1F2328] dark:hover:text-[#F0F6FC] rounded transition-colors"
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
