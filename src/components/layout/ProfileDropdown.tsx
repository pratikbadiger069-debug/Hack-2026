'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/lib/store';
import { getUserDisplayName } from '@/lib/user-utils';
import { getLevelInfo } from '@/lib/xp-engine';
import {
  User,
  MapPin,
  GitBranch,
  CheckCircle2,
  Trophy,
  Award,
  Settings,
  LogOut,
  ChevronDown,
  ShieldCheck,
  Flame,
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

export function ProfileDropdown() {
  const router = useRouter();
  const {
    currentUser,
    studentProfile,
    xp,
    streakDays,
    githubData,
    logoutUser,
  } = useAppStore();

  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const displayName = getUserDisplayName({ user: currentUser, profile: studentProfile });
  const levelInfo = getLevelInfo(xp);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch {
      // Continue
    }
    logoutUser();
    setIsLoggingOut(false);
    setIsOpen(false);
    router.push('/login');
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1 pl-1.5 pr-2 rounded-xl hover:bg-black/5 transition-all text-[#1B1B1B] group"
        aria-expanded={isOpen}
      >
        <div className="w-7 h-7 rounded-xl bg-[#1B1B1B] text-white flex items-center justify-center font-bold text-xs shadow-xs group-hover:bg-[#C76A2A] transition-colors">
          {displayName.charAt(0).toUpperCase()}
        </div>
        <div className="hidden sm:flex flex-col text-left">
          <span className="text-xs font-semibold leading-none text-[#1B1B1B]">{displayName}</span>
          <span className="text-[10px] text-[#6F6A60] leading-tight">Lvl {levelInfo.level} {levelInfo.title}</span>
        </div>
        <ChevronDown className={`w-3.5 h-3.5 text-[#6F6A60] transition-transform duration-150 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-64 rounded-2xl bg-white border border-[#E8E5DD] shadow-xl z-50 p-2 space-y-1"
          >
            {/* User Identity Header */}
            <div className="p-3 bg-[#F6F4EE] rounded-xl space-y-1.5 border border-[#E8E5DD]/60">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#1B1B1B] truncate">{displayName}</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#C76A2A]/10 text-[#C76A2A] font-semibold">
                  {levelInfo.title}
                </span>
              </div>
              <p className="text-[11px] text-[#6F6A60] truncate">{studentProfile.email || currentUser?.email || 'builder@skillbridge.edu'}</p>
              
              {/* Level & XP Mini Meter */}
              <div className="pt-1.5 space-y-1 border-t border-[#E8E5DD]">
                <div className="flex justify-between text-[10px] font-medium">
                  <span className="text-[#1B1B1B]">Level {levelInfo.level}</span>
                  <span className="font-mono text-[#C76A2A] font-semibold">{xp} XP</span>
                </div>
                <div className="w-full h-1 bg-white rounded-full overflow-hidden border border-[#E8E5DD]">
                  <div
                    className="h-full bg-[#C76A2A] rounded-full"
                    style={{ width: `${levelInfo.percentToNext}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-1 space-y-0.5 text-xs font-medium text-[#1B1B1B]">
              <Link
                href="/student/profile"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-[#F6F4EE] transition-colors"
              >
                <User className="w-4 h-4 text-[#6F6A60]" />
                <span>Profile</span>
              </Link>

              <Link
                href="/student/journey"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-[#F6F4EE] transition-colors"
              >
                <MapPin className="w-4 h-4 text-[#6F6A60]" />
                <span>My Journey</span>
              </Link>

              <Link
                href="/student/journey#github"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-[#F6F4EE] transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <GithubIcon className="w-4 h-4 text-[#6F6A60]" />
                  <span>GitHub Progress</span>
                </div>
                {githubData.connected && (
                  <span className="text-[10px] text-[#2F7A45] font-semibold bg-[#2F7A45]/10 px-1.5 py-0.5 rounded">
                    Connected
                  </span>
                )}
              </Link>

              <Link
                href="/student/assessments"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-[#F6F4EE] transition-colors"
              >
                <CheckCircle2 className="w-4 h-4 text-[#6F6A60]" />
                <span>Assessment Progress</span>
              </Link>

              <Link
                href="/student/profile#achievements"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-[#F6F4EE] transition-colors"
              >
                <Trophy className="w-4 h-4 text-[#6F6A60]" />
                <span>Achievements</span>
              </Link>

              <Link
                href="/student/journey"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-[#F6F4EE] transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Award className="w-4 h-4 text-[#6F6A60]" />
                  <span>Builder Level</span>
                </div>
                <span className="text-[10px] font-mono text-[#C76A2A] font-semibold">
                  Rank #{levelInfo.rank}
                </span>
              </Link>

              <Link
                href="/student/settings"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-[#F6F4EE] transition-colors"
              >
                <Settings className="w-4 h-4 text-[#6F6A60]" />
                <span>Settings</span>
              </Link>
            </div>

            {/* Logout Action */}
            <div className="pt-1 border-t border-[#E8E5DD]">
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>{isLoggingOut ? 'Signing out...' : 'Sign Out'}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
