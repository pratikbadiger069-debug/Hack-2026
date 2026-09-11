'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { UserRole } from '@/types';
import { getUserDisplayName } from '@/lib/user-utils';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Compass,
  CheckCircle2,
  Cpu,
  Bot,
  TrendingUp,
  Award,
  Layers,
  Code,
  Briefcase,
  GraduationCap,
} from 'lucide-react';

export default function LandingPage() {
  const router = useRouter();
  const { setRole, setDemoMode, currentUser, studentProfile } = useAppStore();

  const handleLaunchDemo = (role: UserRole = 'student') => {
    setDemoMode(true);
    setRole(role);
    router.push('/demo');
  };

  const displayName = getUserDisplayName({ user: currentUser, profile: studentProfile });

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#1F1F1F] selection:bg-[#F0EEE6]">
      {/* Minimal Top Header */}
      <header className="sticky top-0 z-40 w-full bg-[#FAF9F5]/90 backdrop-blur-md border-b border-[#ECEAE4]">
        <div className="flex items-center justify-between h-16 px-6 lg:px-12 max-w-[1400px] mx-auto">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#1F1F1F] flex items-center justify-center text-[#FAF9F5]">
              <Compass className="w-4 h-4 text-[#D97706]" />
            </div>
            <span className="font-bold text-sm tracking-tight text-[#1F1F1F]">SKILLBRIDGE</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-[#6B6B6B]">
            <Link href="/demo" className="hover:text-[#1F1F1F] transition-colors">Demo</Link>
            <Link href="/pricing" className="hover:text-[#1F1F1F] transition-colors">Pricing</Link>
            <Link href="/docs" className="hover:text-[#1F1F1F] transition-colors">Docs</Link>
          </nav>

          <div className="flex items-center gap-3">
            {currentUser ? (
              <Link
                href="/student"
                className="px-4 py-2 bg-[#1F1F1F] text-[#FAF9F5] rounded-xl text-xs font-semibold hover:bg-[#333333] transition-all shadow-2xs btn-anthropic"
              >
                Go to Workspace ({displayName.split(' ')[0]})
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-3.5 py-1.5 text-xs font-medium text-[#6B6B6B] hover:text-[#1F1F1F] transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 bg-[#1F1F1F] text-[#FAF9F5] rounded-xl text-xs font-semibold hover:bg-[#333333] transition-all shadow-2xs btn-anthropic"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section — Anthropic Inspired Editorial Typography */}
      <section className="py-24 sm:py-32 px-6 lg:px-12 max-w-[1400px] mx-auto text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-medium bg-[#F0EEE6] text-[#1F1F1F] border border-[#ECEAE4]">
          <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
          <span>SkillBridge V3 • Workforce &amp; Career Intelligence</span>
        </div>

        <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-[#1F1F1F] max-w-4xl mx-auto leading-[1.08]">
          Build Proof.<br />
          <span className="text-[#6B6B6B] font-medium">Not Just Profiles.</span>
        </h1>

        <p className="text-lg sm:text-xl text-[#6B6B6B] max-w-2xl mx-auto leading-relaxed font-normal">
          SkillBridge helps students prove their skills through verified code, grow faster with personal AI mentorship, and unlock high-trust career opportunities.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Link
            href="/register"
            className="w-full sm:w-auto px-7 py-3.5 bg-[#1F1F1F] hover:bg-[#333333] text-[#FAF9F5] rounded-xl text-sm font-semibold transition-all shadow-sm flex items-center justify-center gap-2 btn-anthropic"
          >
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <button
            onClick={() => handleLaunchDemo('student')}
            className="w-full sm:w-auto px-7 py-3.5 bg-[#FFFFFF] hover:bg-[#F5F3EB] text-[#1F1F1F] border border-[#ECEAE4] rounded-xl text-sm font-semibold transition-all shadow-2xs flex items-center justify-center gap-2 btn-anthropic"
          >
            <span>View Demo Workspace</span>
          </button>
        </div>

        {/* Minimal Hero Preview Showcase */}
        <div className="pt-12 max-w-5xl mx-auto">
          <div className="p-6 sm:p-10 bg-[#FFFFFF] rounded-3xl border border-[#ECEAE4] shadow-sm text-left space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#ECEAE4]">
              <div className="flex items-center gap-2.5">
                <div className="w-3 h-3 rounded-full bg-[#E5E5E5]" />
                <div className="w-3 h-3 rounded-full bg-[#E5E5E5]" />
                <div className="w-3 h-3 rounded-full bg-[#E5E5E5]" />
                <span className="text-xs font-mono text-[#6B6B6B] ml-2">career-copilot.skillbridge.ai</span>
              </div>
              <span className="text-xs font-medium text-[#16A34A] bg-[#F0FDF4] px-2.5 py-0.5 rounded-full border border-[#DCFCE7]">
                Live Context Ingested
              </span>
            </div>

            <div className="space-y-4 max-w-3xl">
              <div className="p-4 bg-[#F8F7F3] rounded-2xl border border-[#ECEAE4] space-y-2">
                <span className="text-xs font-semibold text-[#D97706] uppercase tracking-wider block">
                  AI Career Mentor Insight
                </span>
                <p className="text-sm text-[#1F1F1F] leading-relaxed">
                  &ldquo;Based on your verified foundation in <strong>Python &amp; FastAPI</strong> (95%) and current <strong>Builder Score of 885/1000</strong>, focusing on <strong>Distributed Systems</strong> and <strong>Docker/Kubernetes</strong> will elevate your readiness for <strong>AI Systems Engineer</strong> from 78% to 94% over the next 6 months.&rdquo;
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3.5 bg-[#FFFFFF] border border-[#ECEAE4] rounded-xl space-y-1">
                  <span className="text-[#6B6B6B] block">Career Readiness</span>
                  <strong className="text-lg font-bold text-[#1F1F1F]">78%</strong>
                  <span className="text-[11px] text-[#16A34A] block">Top 5% National Tier</span>
                </div>
                <div className="p-3.5 bg-[#FFFFFF] border border-[#ECEAE4] rounded-xl space-y-1">
                  <span className="text-[#6B6B6B] block">Verified Skills</span>
                  <strong className="text-lg font-bold text-[#1F1F1F]">6 Badges</strong>
                  <span className="text-[11px] text-[#6B6B6B] block">Multi-Source Audited</span>
                </div>
                <div className="p-3.5 bg-[#FFFFFF] border border-[#ECEAE4] rounded-xl space-y-1">
                  <span className="text-[#6B6B6B] block">Matched Openings</span>
                  <strong className="text-lg font-bold text-[#D97706]">6 Live</strong>
                  <span className="text-[11px] text-[#6B6B6B] block">94% Avg Fit</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Core Pillars — Calm, Focused Narrative */}
      <section className="py-20 px-6 lg:px-12 max-w-[1400px] mx-auto border-t border-[#ECEAE4]">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1F1F1F]">
            Designed to feel like a mentor. Not a dashboard.
          </h2>
          <p className="text-base text-[#6B6B6B]">
            A calm, distraction-free environment that prioritizes your growth over complex charts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Pillar 1 */}
          <div className="p-8 bg-[#FFFFFF] rounded-2xl border border-[#ECEAE4] space-y-4 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-[#F8F7F3] border border-[#ECEAE4] flex items-center justify-center text-[#D97706]">
              <Bot className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[#1F1F1F]">Career Copilot 3.0</h3>
            <p className="text-sm text-[#6B6B6B] leading-relaxed">
              An intelligent mentor that understands your complete academic standing, GitHub repositories, and skill gaps before offering guidance.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="p-8 bg-[#FFFFFF] rounded-2xl border border-[#ECEAE4] space-y-4 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-[#F8F7F3] border border-[#ECEAE4] flex items-center justify-center text-[#16A34A]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[#1F1F1F]">Universal Builder Passport</h3>
            <p className="text-sm text-[#6B6B6B] leading-relaxed">
              Consolidate your code, hackathon wins, and faculty validations into a verified digital identity that recruiters trust implicitly.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="p-8 bg-[#FFFFFF] rounded-2xl border border-[#ECEAE4] space-y-4 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-[#F8F7F3] border border-[#ECEAE4] flex items-center justify-center text-[#2563EB]">
              <Briefcase className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[#1F1F1F]">High-Fit Opportunities</h3>
            <p className="text-sm text-[#6B6B6B] leading-relaxed">
              1-click apply to matched internships and placements with transparent skill breakdown explaining exactly why you are a fit.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#ECEAE4] py-12 px-6 lg:px-12 max-w-[1400px] mx-auto text-xs text-[#6B6B6B] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 font-medium">
          <span>&copy; 2026 SkillBridge AI</span>
          <span>•</span>
          <span>Proof over paper.</span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/demo" className="hover:text-[#1F1F1F]">Demo</Link>
          <Link href="/login" className="hover:text-[#1F1F1F]">Sign In</Link>
          <Link href="/register" className="hover:text-[#1F1F1F]">Get Started</Link>
        </div>
      </footer>
    </div>
  );
}
