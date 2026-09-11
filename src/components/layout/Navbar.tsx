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
    unreadNotificationsCount,
    clearNotifications,
    isDemoMode,
    setDemoMode,
  } = useAppStore();
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const hasKey = Boolean(aiKeys[activeProvider] && aiKeys[activeProvider].length > 5);

  const roleLabels: Record<string, { label: string; icon: any; color: string }> = {
    student: { label: 'Student Workspace', icon: GraduationCap, color: 'text-blue-700 bg-blue-50 border-blue-200' },
    institute: { label: 'Institute Workspace', icon: Building2, color: 'text-purple-700 bg-purple-50 border-purple-200' },
    industry: { label: 'Recruiter Workspace', icon: Briefcase, color: 'text-amber-700 bg-amber-50 border-amber-200' },
    admin: { label: 'Admin Console', icon: ShieldCheck, color: 'text-rose-700 bg-rose-50 border-rose-200' },
  };

  const currentRoleInfo = roleLabels[currentRole] || roleLabels.student;
  const RoleIcon = currentRoleInfo.icon;

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

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-200">
        <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {/* Logo & Platform Tagline */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-xs group-hover:bg-blue-700 transition-colors">
                <Cpu className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-slate-900 tracking-tight text-base">SKILLBRIDGE</span>
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                    Enterprise
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 font-medium tracking-wide">
                  Workforce Intelligence Platform
                </span>
              </div>
            </Link>

            {/* Role Indicator Tag (Strict RBAC - Locked to Assigned Role) */}
            <div className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold border ${currentRoleInfo.color}`}>
              <RoleIcon className="w-3.5 h-3.5" />
              <span>{currentRoleInfo.label}</span>
            </div>
          </div>

          {/* Quick Search */}
          <div className="hidden md:flex items-center flex-1 max-w-xs mx-6">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search verified skills, telemetry, records..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-600 text-slate-900 placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-3">
            {/* Mode Switcher Badge (Read-Only Demo vs Live Production) */}
            <div
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold border ${
                isDemoMode
                  ? 'bg-amber-50 text-amber-800 border-amber-200'
                  : 'bg-emerald-50 text-emerald-800 border-emerald-200'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  isDemoMode ? 'bg-amber-500' : 'bg-emerald-500'
                }`}
              />
              <span>{isDemoMode ? 'Demo Sandbox' : 'Verified Tenant'}</span>
            </div>

            {/* AI Provider Config Pill */}
            <button
              onClick={() => setIsAiModalOpen(true)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                hasKey
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span className="capitalize">{activeProvider} Key</span>
              {hasKey ? (
                <span className="inline-flex items-center gap-0.5 text-[10px] text-emerald-700 font-semibold">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  Active
                </span>
              ) : (
                <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.2 rounded font-medium">
                  BYOK
                </span>
              )}
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsNotificationsOpen(!isNotificationsOpen);
                  if (unreadNotificationsCount > 0) clearNotifications();
                }}
                className="relative p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadNotificationsCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-600 ring-2 ring-white" />
                )}
              </button>

              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-xl shadow-xl py-2 z-50 animate-in fade-in duration-100">
                  <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                    <span className="font-semibold text-xs text-slate-900">Platform Notifications</span>
                    <span className="text-[10px] text-slate-500">Live Telemetry</span>
                  </div>
                  <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto">
                    <div className="p-3 text-xs hover:bg-slate-50">
                      <p className="font-medium text-slate-900">Skill Verified: Python &amp; FastAPI</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">Faculty Dr. Radhika Sen validated project score (95/100).</p>
                      <span className="text-[10px] text-slate-400 mt-1 block">15 mins ago</span>
                    </div>
                    <div className="p-3 text-xs hover:bg-slate-50">
                      <p className="font-medium text-slate-900">Recruiter Match: Anthropic Labs</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">Your Builder Score qualified you for the 94% match AI Infrastructure opening.</p>
                      <span className="text-[10px] text-slate-400 mt-1 block">2 hours ago</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Mini Badge & Sign Out */}
            <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200">
              <img
                src={currentUser?.avatar || studentProfile.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'}
                alt={getUserDisplayName({ user: currentUser, profile: studentProfile })}
                className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200"
              />
              <div className="hidden lg:flex flex-col text-left">
                <span className="text-xs font-semibold text-slate-900 leading-tight">
                  {getUserDisplayName({ user: currentUser, profile: studentProfile })}
                </span>
                <span className="text-[10px] text-slate-500">
                  {currentUser?.email || studentProfile.email || 'Session Active'}
                </span>
              </div>
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors ml-1"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* AI Key Config Modal */}
      <AIProviderModal isOpen={isAiModalOpen} onClose={() => setIsAiModalOpen(false)} />
    </>
  );
}
