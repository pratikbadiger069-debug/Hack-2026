'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { AIProviderModal } from '@/components/ai/AIProviderModal';
import { getUserDisplayName } from '@/lib/user-utils';
import {
  Sparkles,
  Bell,
  Search,
  CheckCircle2,
  GraduationCap,
  Building2,
  Briefcase,
  ShieldCheck,
  Cpu,
  LogOut,
  User,
  Compass,
} from 'lucide-react';

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
    isDemoMode,
  } = useAppStore();
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

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

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#FAF9F5]/90 backdrop-blur-md border-b border-[#ECEAE4]">
        <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
          {/* Brand Identity */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-xl bg-[#1F1F1F] flex items-center justify-center text-[#FAF9F5] font-bold text-sm shadow-2xs group-hover:bg-[#333333] transition-colors">
                <Compass className="w-4 h-4 text-[#D97706]" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-[#1F1F1F] tracking-tight text-sm">
                  SKILLBRIDGE
                </span>
                <span className="text-[10px] text-[#6B6B6B] font-medium tracking-wide">
                  Intelligence for Builders
                </span>
              </div>
            </Link>

            {/* Subtle Role Indicator */}
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#F0EEE6] text-[#1F1F1F] border border-[#ECEAE4]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]" />
              <span className="capitalize">{currentRole}</span>
            </span>
          </div>

          {/* Center Search Input */}
          <div className="hidden md:flex items-center flex-1 max-w-sm mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#6B6B6B]" />
              <input
                type="text"
                placeholder="Search skills, projects, roadmap..."
                className="w-full pl-8.5 pr-3 py-1.5 text-xs bg-[#FFFFFF] border border-[#ECEAE4] rounded-xl focus:outline-none focus:border-[#D97706] text-[#1F1F1F] placeholder:text-[#6B6B6B] shadow-2xs transition-all"
              />
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            {/* AI Engine BYOK Button */}
            <button
              onClick={() => setIsAiModalOpen(true)}
              className="px-3 py-1.5 bg-[#FFFFFF] hover:bg-[#F4F2EB] text-[#1F1F1F] border border-[#ECEAE4] rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all shadow-2xs btn-anthropic"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
              <span className="capitalize">{activeProvider}</span>
              {hasKey && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
              )}
            </button>

            {/* User Profile Avatar & Name */}
            <div className="flex items-center gap-2 pl-2 border-l border-[#ECEAE4]">
              <img
                src={currentUser?.avatar || studentProfile.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                alt={displayName}
                className="w-7 h-7 rounded-full object-cover border border-[#ECEAE4]"
              />
              <span className="text-xs font-medium text-[#1F1F1F] hidden lg:inline max-w-[120px] truncate">
                {displayName}
              </span>

              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                title="Sign Out"
                className="p-1.5 text-[#6B6B6B] hover:text-[#1F1F1F] rounded-lg hover:bg-[#F0EEE6] transition-colors ml-1"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <AIProviderModal isOpen={isAiModalOpen} onClose={() => setIsAiModalOpen(false)} />
    </>
  );
}
