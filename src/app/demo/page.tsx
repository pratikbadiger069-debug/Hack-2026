'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { UserRole } from '@/types';
import {
  GraduationCap,
  Building2,
  Briefcase,
  ShieldCheck,
  Play,
  ArrowRight,
  Sparkles,
  Lock,
  Cpu,
} from 'lucide-react';

export default function DemoSandboxPage() {
  const router = useRouter();
  const { setDemoMode, setRole } = useAppStore();

  const handleLaunchRoleDemo = (role: UserRole) => {
    setDemoMode(true);
    setRole(role);
    router.push(`/${role}?demo=true`);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between font-sans">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 py-4 px-6 sm:px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
              <Cpu className="w-4 h-4" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-slate-900 tracking-tight">SKILLBRIDGE</span>
              <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                Demo Sandbox
              </span>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-xs font-semibold text-slate-600 hover:text-slate-900"
            >
              Sign In to Production
            </Link>
            <Link
              href="/register"
              className="px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-2xs"
            >
              Create Account
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12 w-full flex-1 flex flex-col justify-center text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold mx-auto mb-4">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Isolated Read-Only Exploration Sandbox</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Explore SkillBridge AI Workspaces
        </h1>
        <p className="mt-3 text-sm text-slate-600 max-w-xl mx-auto">
          Explore verified builder passports, real-time curriculum market audits, vector talent discovery, and admin telemetry without creating a production account.
        </p>

        {/* 4 Sandbox Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 text-left">
          {/* Student Demo */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs hover:border-blue-300 transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Student Builder Sandbox</h3>
              <p className="text-xs text-slate-500 mt-1">
                Explore Alex Chen&apos;s verified Builder Score (885/1000), Skill Radar calibration, and BYOK AI Career Copilot.
              </p>
            </div>
            <button
              onClick={() => handleLaunchRoleDemo('student')}
              className="mt-6 w-full py-2.5 px-4 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-2xs"
            >
              <span>Launch Student Demo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Institute Demo */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs hover:border-purple-300 transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-3">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">University &amp; Institute Sandbox</h3>
              <p className="text-xs text-slate-500 mt-1">
                Explore Curriculum Intelligence (AI Syllabus Analysis), Department Readiness Index (CSE/AIML/IT), and 320 student cohort telemetry.
              </p>
            </div>
            <button
              onClick={() => handleLaunchRoleDemo('institute')}
              className="mt-6 w-full py-2.5 px-4 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-700 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-2xs"
            >
              <span>Launch Institute Demo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Recruiter Demo */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs hover:border-amber-300 transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
                <Briefcase className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Enterprise Recruiter Sandbox</h3>
              <p className="text-xs text-slate-500 mt-1">
                Filter verified talent by Builder Score &amp; skills, review GitHub code proofs, and manage the 5-stage recruitment Kanban pipeline.
              </p>
            </div>
            <button
              onClick={() => handleLaunchRoleDemo('industry')}
              className="mt-6 w-full py-2.5 px-4 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-2xs"
            >
              <span>Launch Recruiter Demo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Admin Demo */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs hover:border-rose-300 transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Platform Admin Console</h3>
              <p className="text-xs text-slate-500 mt-1">
                Inspect global telemetry across universities, real-time industry skill demand heatmaps, and audit logs.
              </p>
            </div>
            <button
              onClick={() => handleLaunchRoleDemo('admin')}
              className="mt-6 w-full py-2.5 px-4 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-2xs"
            >
              <span>Launch Admin Demo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-center justify-center gap-2">
          <Lock className="w-4 h-4 text-amber-700 shrink-0" />
          <span>Demo mode is read-only. Demo changes are isolated and never saved to the production PostgreSQL database.</span>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        <p>© 2026 SkillBridge. Multi-Tenant Workforce Intelligence Platform.</p>
      </footer>
    </div>
  );
}
