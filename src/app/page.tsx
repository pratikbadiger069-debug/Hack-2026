'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAppStore } from '@/lib/store';
import { UserRole } from '@/types';
import { getUserDisplayName } from '@/lib/user-utils';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Bot,
  Layers,
  GraduationCap,
  Building,
  Users,
  Briefcase,
} from 'lucide-react';

export default function LandingPage() {
  const router = useRouter();
  const { setRole, setDemoMode, currentUser, studentProfile } = useAppStore();
  const [activePortalTab, setActivePortalTab] = useState<'student' | 'industry' | 'institute' | 'admin'>('student');

  const handleLaunchDemo = (role: UserRole = 'student') => {
    setDemoMode(true);
    setRole(role);
    router.push('/demo');
  };

  const displayName = getUserDisplayName({ user: currentUser, profile: studentProfile });

  const liveStats = [
    { label: 'Students Verified', value: '14,820+', icon: Users, change: '+18% this month' },
    { label: 'Assessments Completed', value: '58,400+', icon: CheckCircle2, change: '100% proctored' },
    { label: 'Projects Evaluated', value: '12,900+', icon: Layers, change: 'Code verified' },
    { label: 'Institutions Connected', value: '185+', icon: GraduationCap, change: 'Autonomous & State' },
    { label: 'Industry Partners', value: '420+', icon: Building, change: 'Hiring verified builders' },
    { label: 'Opportunities Generated', value: '3,600+', icon: Briefcase, change: 'Avg $95k CTC' },
  ];

  const howItWorksSteps = [
    {
      step: '01',
      title: 'Build',
      subtitle: 'Projects • Assessments • Challenges',
      description: 'Solve real-world distributed systems, full-stack microservices, and AI inference tasks with strict in-browser evaluation and zero guesswork.',
      tags: ['Production Repos', 'MCQs & Coding', 'Debugging Benchmarks'],
      accent: '#C76A2A',
    },
    {
      step: '02',
      title: 'Verify',
      subtitle: 'Skills • GitHub • Industry Challenges',
      description: 'Every achievement earns cryptographic verification codes, confidence ratings (70-98%), and deterministic Builder Score points.',
      tags: ['Skill Confidence Engine', 'GitHub Scan', 'Faculty Audited'],
      accent: '#1B1B1B',
    },
    {
      step: '03',
      title: 'Connect',
      subtitle: 'Opportunities • Internships • Mentors',
      description: 'Match directly with top tech firms based on verified proof of work. No static resume screening—your verifiable score speaks for itself.',
      tags: ['Direct Recruiter Access', 'Automated Shortlisting', 'Career Copilot'],
      accent: '#2F7A45',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F6F4EE] text-[#1B1B1B] selection:bg-[#E8E5DD]">
      
      {/* Sticky Clean Header */}
      <header className="sticky top-0 z-50 w-full bg-[#F6F4EE]/90 backdrop-blur-md border-b border-[#E8E5DD]">
        <div className="flex items-center justify-between h-16 px-6 lg:px-12 max-w-[1400px] mx-auto">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#1B1B1B] flex items-center justify-center text-white font-bold text-xs">
              SB
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-bold text-sm tracking-tight text-[#1B1B1B]">SKILLBRIDGE</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-md bg-[#C76A2A]/10 text-[#C76A2A] font-bold">V7</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-[#6F6A60]">
            <a href="#how-it-works" className="hover:text-[#1B1B1B] transition-colors">How It Works</a>
            <a href="#portals" className="hover:text-[#1B1B1B] transition-colors">Ecosystem</a>
            <a href="#formula" className="hover:text-[#1B1B1B] transition-colors">Builder Score Formula</a>
            <Link href="/demo" className="hover:text-[#1B1B1B] transition-colors">Interactive Demo</Link>
          </nav>

          <div className="flex items-center gap-3">
            {currentUser ? (
              <Link
                href="/student"
                className="px-4 py-2 bg-[#1B1B1B] text-white rounded-xl text-xs font-semibold hover:bg-[#C76A2A] transition-all shadow-xs"
              >
                Go to Workspace ({displayName.split(' ')[0]})
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-3.5 py-1.5 text-xs font-semibold text-[#6F6A60] hover:text-[#1B1B1B] transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 bg-[#1B1B1B] text-white rounded-xl text-xs font-semibold hover:bg-[#C76A2A] transition-all shadow-xs"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="pt-20 pb-16 px-6 lg:px-12 max-w-[1300px] mx-auto text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white text-[#1B1B1B] border border-[#E8E5DD] shadow-xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#C76A2A]" />
          <span>National-Scale Student → Industry Intelligence Platform</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
          className="text-5xl sm:text-7xl font-extrabold tracking-tight text-[#1B1B1B] max-w-4xl mx-auto leading-[1.08]"
        >
          Build Proof.<br />
          <span className="text-[#6F6A60] font-normal">Not Just Profiles.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="text-base sm:text-lg text-[#6F6A60] max-w-2xl mx-auto leading-relaxed font-medium"
        >
          SkillBridge helps students prove their skills, discover career gaps, and connect with opportunities through verified assessments and project-based evaluation.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2"
        >
          <Link
            href="/register"
            className="w-full sm:w-auto px-7 py-3.5 bg-[#1B1B1B] hover:bg-[#C76A2A] text-white rounded-xl text-xs font-semibold transition-all shadow-xs flex items-center justify-center gap-2"
          >
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <button
            onClick={() => handleLaunchDemo('student')}
            className="w-full sm:w-auto px-7 py-3.5 bg-white hover:bg-[#F6F4EE] text-[#1B1B1B] border border-[#E8E5DD] rounded-xl text-xs font-semibold transition-all shadow-xs flex items-center justify-center gap-2"
          >
            <span>View Demo</span>
          </button>
        </motion.div>

        {/* LIVE PLATFORM STATS GRID */}
        <div className="pt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {liveStats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: 0.1 + idx * 0.04 }}
                className="p-4 rounded-2xl bg-white border border-[#E8E5DD] shadow-xs text-left space-y-1"
              >
                <div className="flex items-center justify-between">
                  <Icon className="w-4 h-4 text-[#C76A2A]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2F7A45] animate-pulse" />
                </div>
                <div className="text-xl font-bold font-mono text-[#1B1B1B] pt-1">{stat.value}</div>
                <div className="text-[11px] font-semibold text-[#6F6A60]">{stat.label}</div>
                <div className="text-[10px] text-[#2F7A45] font-semibold">{stat.change}</div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* PROBLEM & SOLUTION SECTION */}
      <section className="py-20 px-6 lg:px-12 bg-white border-y border-[#E8E5DD]">
        <div className="max-w-[1200px] mx-auto space-y-12 text-center">
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-[#C76A2A] font-bold">
              The Fundamental Problem
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#1B1B1B] tracking-tight max-w-3xl mx-auto">
              Traditional Education Measures Marks.<br />
              <span className="text-[#C76A2A]">Industry Measures Skills.</span><br />
              SkillBridge Bridges Both.
            </h2>
            <p className="text-xs sm:text-sm text-[#6F6A60] max-w-2xl mx-auto leading-relaxed">
              Resumes can be exaggerated and college GPAs only measure memory. SkillBridge creates verifiable digital proof through proctored coding assessments, repository commits, and project reviews.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="p-8 rounded-2xl bg-[#F6F4EE] border border-[#E8E5DD] space-y-4">
              <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase">
                The Old Broken Way
              </span>
              <h3 className="text-lg font-bold text-[#1B1B1B]">Unverifiable Claims &amp; Keyword Games</h3>
              <ul className="space-y-2.5 text-xs text-[#6F6A60]">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">✕</span>
                  <span>Students spend hours crafting ATS resumes with fake bullet points.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">✕</span>
                  <span>Recruiters spend 6 seconds skimming keywords, rejecting top builders.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">✕</span>
                  <span>Institutions have zero visibility into real industry skill alignment.</span>
                </li>
              </ul>
            </div>

            <div className="p-8 rounded-2xl bg-[#1B1B1B] text-white space-y-4">
              <span className="px-3 py-1 rounded-full bg-[#C76A2A] text-white text-xs font-bold uppercase">
                The SkillBridge Standard
              </span>
              <h3 className="text-lg font-bold text-white">Cryptographic Proof of Real Competence</h3>
              <ul className="space-y-2.5 text-xs text-white/80">
                <li className="flex items-start gap-2">
                  <span className="text-[#2F7A45] font-bold">✓</span>
                  <span>Deterministic 6-pillar Builder Score calculated across code, MCQs, and git.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#2F7A45] font-bold">✓</span>
                  <span>Skill Confidence Engine (70-98%) with direct source audit trails.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#2F7A45] font-bold">✓</span>
                  <span>Direct talent discovery pipeline: companies filter by verified score, not college tier.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS 3-STEP PIPELINE */}
      <section id="how-it-works" className="py-20 px-6 lg:px-12 max-w-[1300px] mx-auto space-y-12">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono uppercase tracking-wider text-[#C76A2A] font-bold">
            The 3-Step Verification Engine
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1B1B1B] tracking-tight">
            How SkillBridge Works
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {howItWorksSteps.map((step) => (
            <div
              key={step.step}
              className="p-8 rounded-2xl bg-white border border-[#E8E5DD] shadow-xs flex flex-col justify-between space-y-6 hover:border-[#C76A2A] transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black font-mono text-[#C76A2A]">{step.step}</span>
                  <span className="text-xs font-mono font-semibold text-[#6F6A60]">{step.subtitle}</span>
                </div>
                <h3 className="text-xl font-bold text-[#1B1B1B]">{step.title}</h3>
                <p className="text-xs text-[#6F6A60] leading-relaxed">{step.description}</p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#E8E5DD]">
                {step.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-md bg-[#F6F4EE] border border-[#E8E5DD] text-[11px] font-semibold text-[#1B1B1B]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4 CORE PORTALS ECOSYSTEM SHOWCASE */}
      <section id="portals" className="py-20 px-6 lg:px-12 bg-white border-y border-[#E8E5DD]">
        <div className="max-w-[1300px] mx-auto space-y-10">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-[#C76A2A] font-bold">
              Interconnected Platform Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1B1B1B] tracking-tight">
              4 Core Portals. One Central Intelligence Layer.
            </h2>
            <p className="text-xs text-[#6F6A60] max-w-xl mx-auto">
              Actions in one portal instantly cascade across the entire ecosystem. Nothing is isolated.
            </p>
          </div>

          {/* Portal Tabs */}
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {[
              { id: 'student', label: '1. Student Portal (Builder OS)', role: 'student' as UserRole },
              { id: 'industry', label: '2. Industry Portal (Hiring & Assessor)', role: 'industry' as UserRole },
              { id: 'institute', label: '3. Institution Portal (Academic Intel)', role: 'institute' as UserRole },
              { id: 'admin', label: '4. Super Admin Portal (Governance)', role: 'admin' as UserRole },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActivePortalTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activePortalTab === tab.id
                    ? 'bg-[#1B1B1B] text-white shadow-xs'
                    : 'bg-[#F6F4EE] text-[#6F6A60] hover:text-[#1B1B1B] border border-[#E8E5DD]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Interactive Portal Preview Container */}
          <div className="p-8 rounded-3xl bg-[#F6F4EE] border border-[#E8E5DD] shadow-xs">
            {activePortalTab === 'student' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-[#1B1B1B]">Student Portal — Builder Operating System</h3>
                    <p className="text-xs text-[#6F6A60]">Real-time XP, deterministic 6-pillar score, verified passport, and adaptive assessments.</p>
                  </div>
                  <button
                    onClick={() => handleLaunchDemo('student')}
                    className="px-4 py-2 bg-[#1B1B1B] text-white rounded-xl text-xs font-semibold hover:bg-[#C76A2A] transition-colors shrink-0"
                  >
                    Open Student Workspace →
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-white border border-[#E8E5DD] space-y-2">
                    <span className="text-xs font-bold text-[#1B1B1B] block">Builder Score</span>
                    <span className="text-3xl font-bold font-mono text-[#1B1B1B]">885 / 1000</span>
                    <p className="text-[11px] text-[#6F6A60]">30% Assessments + 25% Projects + 15% GitHub + 10% Industry + 10% Comm + 10% Streak</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-[#E8E5DD] space-y-2">
                    <span className="text-xs font-bold text-[#1B1B1B] block">Adaptive Assessments</span>
                    <span className="text-xl font-bold text-[#C76A2A]">16 Seeded Tracks</span>
                    <p className="text-[11px] text-[#6F6A60]">Java, Spring Boot, REST APIs, Microservices, ML, Neural Networks, Docker, React</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-[#E8E5DD] space-y-2">
                    <span className="text-xs font-bold text-[#1B1B1B] block">Career Copilot</span>
                    <span className="text-xl font-bold text-[#2F7A45]">Personalized Mentor</span>
                    <p className="text-[11px] text-[#6F6A60]">Evaluates verified git commits and gaps to recommend targeted high-impact tracks</p>
                  </div>
                </div>
              </div>
            )}

            {activePortalTab === 'industry' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-[#1B1B1B]">Industry Portal — Assessment Builder &amp; Talent Discovery</h3>
                    <p className="text-xs text-[#6F6A60]">Build multi-format assessments, set custom XP/thresholds, and filter top-tier verified builders.</p>
                  </div>
                  <button
                    onClick={() => handleLaunchDemo('industry')}
                    className="px-4 py-2 bg-[#1B1B1B] text-white rounded-xl text-xs font-semibold hover:bg-[#C76A2A] transition-colors shrink-0"
                  >
                    Open Industry Workspace →
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-white border border-[#E8E5DD] space-y-2">
                    <span className="text-xs font-bold text-[#1B1B1B] block">Assessment Builder</span>
                    <span className="text-sm font-bold text-[#C76A2A]">Multi-Format Creator</span>
                    <p className="text-[11px] text-[#6F6A60]">MCQ, Coding, Debugging, Case Study, and Video/File submission proofs</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-[#E8E5DD] space-y-2">
                    <span className="text-xs font-bold text-[#1B1B1B] block">Talent Pipeline</span>
                    <span className="text-sm font-bold text-[#1B1B1B]">Zero-Resume Screening</span>
                    <p className="text-[11px] text-[#6F6A60]">Filter by verified score $\ge 850$, proven git repositories, and challenge pass rates</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-[#E8E5DD] space-y-2">
                    <span className="text-xs font-bold text-[#1B1B1B] block">Direct Fast-Track</span>
                    <span className="text-sm font-bold text-[#2F7A45]">Instant Candidate Pipeline</span>
                    <p className="text-[11px] text-[#6F6A60]">Passing company challenges immediately routes students into recruiter interview queues</p>
                  </div>
                </div>
              </div>
            )}

            {activePortalTab === 'institute' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-[#1B1B1B]">Institution Portal — Institutional Intelligence</h3>
                    <p className="text-xs text-[#6F6A60]">Track department readiness, placement velocity, curriculum gaps, and top student builders.</p>
                  </div>
                  <button
                    onClick={() => handleLaunchDemo('institute')}
                    className="px-4 py-2 bg-[#1B1B1B] text-white rounded-xl text-xs font-semibold hover:bg-[#C76A2A] transition-colors shrink-0"
                  >
                    Open Institution Workspace →
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-white border border-[#E8E5DD] space-y-2">
                    <span className="text-xs font-bold text-[#1B1B1B] block">Department Benchmarks</span>
                    <span className="text-sm font-bold text-[#1B1B1B]">CSE: 86% • AIML: 89%</span>
                    <p className="text-[11px] text-[#6F6A60]">Live student aggregate readiness calculated from proctored challenge results</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-[#E8E5DD] space-y-2">
                    <span className="text-xs font-bold text-[#1B1B1B] block">Curriculum Alignment</span>
                    <span className="text-sm font-bold text-[#C76A2A]">Industry Relevance: 78%</span>
                    <p className="text-[11px] text-[#6F6A60]">Highlights missing modules: Vector DBs, Cloud Native CI/CD, and gRPC microservices</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-[#E8E5DD] space-y-2">
                    <span className="text-xs font-bold text-[#1B1B1B] block">Placement Cell</span>
                    <span className="text-sm font-bold text-[#2F7A45]">Pre-Verified Roster</span>
                    <p className="text-[11px] text-[#6F6A60]">Share verified builder passports directly with visiting campus recruitment panels</p>
                  </div>
                </div>
              </div>
            )}

            {activePortalTab === 'admin' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-[#1B1B1B]">Super Admin Portal — Governance &amp; Scale</h3>
                    <p className="text-xs text-[#6F6A60]">Platform-wide health, verification audit logs, institution management, and skill demand intelligence.</p>
                  </div>
                  <button
                    onClick={() => handleLaunchDemo('admin')}
                    className="px-4 py-2 bg-[#1B1B1B] text-white rounded-xl text-xs font-semibold hover:bg-[#C76A2A] transition-colors shrink-0"
                  >
                    Open Admin Workspace →
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-white border border-[#E8E5DD] space-y-2">
                    <span className="text-xs font-bold text-[#1B1B1B] block">System Health</span>
                    <span className="text-sm font-bold text-[#2F7A45]">99.99% Uptime</span>
                    <p className="text-[11px] text-[#6F6A60]">Live telemetry monitoring assessment test runners and OAuth synchronizations</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-[#E8E5DD] space-y-2">
                    <span className="text-xs font-bold text-[#1B1B1B] block">Verification Queue</span>
                    <span className="text-sm font-bold text-[#1B1B1B]">Cryptographic Signatures</span>
                    <p className="text-[11px] text-[#6F6A60]">Audit code submissions, anti-cheat flags, and issue immutable certificate IDs</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-[#E8E5DD] space-y-2">
                    <span className="text-xs font-bold text-[#1B1B1B] block">Skill Demand Intel</span>
                    <span className="text-sm font-bold text-[#C76A2A]">Real-time Market Telemetry</span>
                    <p className="text-[11px] text-[#6F6A60]">Aggregated hiring demand from 420+ industry partners across AI, Cloud, and Backend</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* DETERMINISTIC BUILDER SCORE FORMULA BREAKDOWN */}
      <section id="formula" className="py-20 px-6 lg:px-12 max-w-[1200px] mx-auto space-y-10">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono uppercase tracking-wider text-[#C76A2A] font-bold">
            Transparent Evaluation Standards
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1B1B1B] tracking-tight">
            The 6-Pillar Builder Score Formula
          </h2>
          <p className="text-xs text-[#6F6A60] max-w-xl mx-auto">
            Zero hidden algorithms. A deterministic 1000-point formula calculated across verifiable achievements.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { pillar: 'Verified Assessments', weight: '30%', points: '300 pts', desc: 'Strict proctored MCQs, debugging benchmarks, and architecture challenges.' },
            { pillar: 'Verified Projects', weight: '25%', points: '250 pts', desc: 'Production repositories with tests, benchmarks, and runnable live demos.' },
            { pillar: 'GitHub Proof of Work', weight: '15%', points: '150 pts', desc: 'Scanned commit frequency, multi-language distribution, and stars.' },
            { pillar: 'Industry Challenges', weight: '10%', points: '100 pts', desc: 'Company-sponsored hiring challenges, hackathons, and certifications.' },
            { pillar: 'Communication', weight: '10%', points: '100 pts', desc: 'Technical RFC design writing, constructive code reviews, and pitch.' },
            { pillar: 'Consistency', weight: '10%', points: '100 pts', desc: 'Daily building streak, weekly verification cadence, and continuous effort.' },
          ].map((item) => (
            <div key={item.pillar} className="p-5 rounded-2xl bg-white border border-[#E8E5DD] shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#1B1B1B]">{item.pillar}</span>
                <span className="px-2 py-0.5 rounded-full bg-[#C76A2A]/10 text-[#C76A2A] text-xs font-mono font-bold">
                  {item.weight} ({item.points})
                </span>
              </div>
              <p className="text-xs text-[#6F6A60]">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA FOOTER */}
      <footer className="py-16 px-6 lg:px-12 bg-[#1B1B1B] text-white border-t border-[#E8E5DD]">
        <div className="max-w-[1300px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-white tracking-tight">Ready to build verified proof of work?</h3>
            <p className="text-xs text-white/60">Join over 14,800+ builders proving their engineering capabilities on SkillBridge.</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/register"
              className="px-6 py-3 bg-[#C76A2A] hover:bg-[#B55E22] text-white rounded-xl text-xs font-bold transition-all shadow-xs"
            >
              Get Started
            </Link>
            <button
              onClick={() => handleLaunchDemo('student')}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold transition-all"
            >
              View Demo
            </button>
          </div>
        </div>
        <div className="max-w-[1300px] mx-auto pt-8 mt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-white/40 gap-4">
          <span>&copy; 2026 SkillBridge Intelligence Inc. National Workforce Systems.</span>
          <div className="flex items-center gap-6">
            <Link href="/docs" className="hover:text-white">Documentation</Link>
            <Link href="/pricing" className="hover:text-white">Institutional Licensing</Link>
            <Link href="/demo" className="hover:text-white">Demo Portal</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
