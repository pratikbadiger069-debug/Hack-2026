'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/lib/store';
import { UserRole } from '@/types';
import { getUserDisplayName } from '@/lib/user-utils';
import GlassCard from '@/components/ui/GlassCard';
import GradientButton from '@/components/ui/GradientButton';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import SectionHeading from '@/components/ui/SectionHeading';
import ParticleField from '@/components/ui/ParticleField';
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
  Code2,
  GitBranch,
  Trophy,
  MessageSquare,
  Flame,
  Target,
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

  const howItWorksSteps = [
    {
      step: '01',
      title: 'Build',
      subtitle: 'Projects • Assessments • Challenges',
      description: 'Solve real-world distributed systems, full-stack microservices, and AI inference tasks with strict in-browser evaluation and zero guesswork.',
      tags: ['Production Repos', 'MCQs & Coding', 'Debugging Benchmarks'],
      icon: Code2,
      accent: 'var(--accent)',
    },
    {
      step: '02',
      title: 'Verify',
      subtitle: 'Skills • GitHub • Industry Challenges',
      description: 'Every achievement earns cryptographic verification codes, confidence ratings (70-98%), and deterministic Builder Score points.',
      tags: ['Skill Confidence Engine', 'GitHub Scan', 'Faculty Audited'],
      icon: ShieldCheck,
      accent: 'var(--text-primary)',
    },
    {
      step: '03',
      title: 'Connect',
      subtitle: 'Opportunities • Internships • Mentors',
      description: 'Match directly with top tech firms based on verified proof of work. No static resume screening—your verifiable score speaks for itself.',
      tags: ['Direct Recruiter Access', 'Automated Shortlisting', 'Career Copilot'],
      icon: Target,
      accent: 'var(--success)',
    },
  ];

  const builderScorePillars = [
    { pillar: 'Verified Assessments', weight: 30, points: 300, desc: 'Strict proctored MCQs, debugging benchmarks, and architecture challenges.', icon: CheckCircle2 },
    { pillar: 'Verified Projects', weight: 25, points: 250, desc: 'Production repositories with tests, benchmarks, and runnable live demos.', icon: Layers },
    { pillar: 'GitHub Proof of Work', weight: 15, points: 150, desc: 'Scanned commit frequency, multi-language distribution, and stars.', icon: GitBranch },
    { pillar: 'Industry Challenges', weight: 10, points: 100, desc: 'Company-sponsored hiring challenges, hackathons, and certifications.', icon: Trophy },
    { pillar: 'Communication', weight: 10, points: 100, desc: 'Technical RFC design writing, constructive code reviews, and pitch.', icon: MessageSquare },
    { pillar: 'Consistency', weight: 10, points: 100, desc: 'Daily building streak, weekly verification cadence, and continuous effort.', icon: Flame },
  ];

  const portalTabs = [
    { id: 'student', label: 'Student Portal', role: 'student' as UserRole, icon: GraduationCap },
    { id: 'industry', label: 'Industry Portal', role: 'industry' as UserRole, icon: Briefcase },
    { id: 'institute', label: 'Institution Portal', role: 'institute' as UserRole, icon: Building },
    { id: 'admin', label: 'Admin Portal', role: 'admin' as UserRole, icon: Users },
  ];

  const portalContent = {
    student: {
      title: 'Student Portal — Builder Operating System',
      desc: 'Real-time XP, deterministic 6-pillar score, verified passport, and adaptive assessments.',
      cards: [
        { label: 'Builder Score', value: '885 / 1000', detail: '30% Assessments + 25% Projects + 15% GitHub + 10% Industry + 10% Comm + 10% Streak', color: 'var(--text-primary)' },
        { label: 'Adaptive Assessments', value: '16 Seeded Tracks', detail: 'Java, Spring Boot, REST APIs, Microservices, ML, Neural Networks, Docker, React', color: 'var(--accent)' },
        { label: 'Career Copilot', value: 'Personalized Mentor', detail: 'Evaluates verified git commits and gaps to recommend targeted high-impact tracks', color: 'var(--success)' },
      ],
    },
    industry: {
      title: 'Industry Portal — Assessment Builder & Talent Discovery',
      desc: 'Build multi-format assessments, set custom XP/thresholds, and filter top-tier verified builders.',
      cards: [
        { label: 'Assessment Builder', value: 'Multi-Format Creator', detail: 'MCQ, Coding, Debugging, Case Study, and Video/File submission proofs', color: 'var(--accent)' },
        { label: 'Talent Pipeline', value: 'Zero-Resume Screening', detail: 'Filter by verified score ≥ 850, proven git repositories, and challenge pass rates', color: 'var(--text-primary)' },
        { label: 'Direct Fast-Track', value: 'Instant Candidate Pipeline', detail: 'Passing company challenges immediately routes students into recruiter interview queues', color: 'var(--success)' },
      ],
    },
    institute: {
      title: 'Institution Portal — Institutional Intelligence',
      desc: 'Track department readiness, placement velocity, curriculum gaps, and top student builders.',
      cards: [
        { label: 'Department Benchmarks', value: 'CSE: 86% • AIML: 89%', detail: 'Live student aggregate readiness calculated from proctored challenge results', color: 'var(--text-primary)' },
        { label: 'Curriculum Alignment', value: 'Industry Relevance: 78%', detail: 'Highlights missing modules: Vector DBs, Cloud Native CI/CD, and gRPC microservices', color: 'var(--accent)' },
        { label: 'Placement Cell', value: 'Pre-Verified Roster', detail: 'Share verified builder passports directly with visiting campus recruitment panels', color: 'var(--success)' },
      ],
    },
    admin: {
      title: 'Super Admin Portal — Governance & Scale',
      desc: 'Platform-wide health, verification audit logs, institution management, and skill demand intelligence.',
      cards: [
        { label: 'System Health', value: '99.99% Uptime', detail: 'Live telemetry monitoring assessment test runners and OAuth synchronizations', color: 'var(--success)' },
        { label: 'Verification Queue', value: 'Cryptographic Signatures', detail: 'Audit code submissions, anti-cheat flags, and issue immutable certificate IDs', color: 'var(--text-primary)' },
        { label: 'Skill Demand Intel', value: 'Real-time Market Telemetry', detail: 'Aggregated hiring demand from industry partners across AI, Cloud, and Backend', color: 'var(--accent)' },
      ],
    },
  };

  const activePortal = portalContent[activePortalTab];

  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)] selection:bg-[var(--accent-light)]">

      {/* ──── STICKY GLASS HEADER ──── */}
      <header className="sticky top-0 z-50 w-full border-b border-[var(--border-main)]" style={{ background: 'var(--glass-bg)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}>
        <div className="flex items-center justify-between h-16 px-6 lg:px-12 max-w-[1400px] mx-auto">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-[var(--text-primary)] flex items-center justify-center text-[var(--bg-page)] font-bold text-xs transition-all group-hover:bg-[var(--accent)] group-hover:scale-105">
              SB
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-bold text-sm tracking-tight text-[var(--text-primary)]">SKILLBRIDGE</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-[var(--accent-light)] text-[var(--accent)] font-bold">V7</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-[var(--text-secondary)]">
            <a href="#how-it-works" className="nav-link">How It Works</a>
            <a href="#portals" className="nav-link">Ecosystem</a>
            <a href="#formula" className="nav-link">Builder Score</a>
            <Link href="/demo" className="nav-link">Interactive Demo</Link>
          </nav>

          <div className="flex items-center gap-3">
            {currentUser ? (
              <Link
                href="/student"
                className="px-4 py-2 bg-[var(--text-primary)] text-[var(--bg-page)] rounded-xl text-xs font-semibold hover:bg-[var(--accent)] transition-all shadow-sm"
              >
                Go to Workspace ({displayName.split(' ')[0]})
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-3.5 py-1.5 text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                >
                  Sign In
                </Link>
                <GradientButton href="/register" size="sm" variant="primary" icon={<ArrowRight className="w-3.5 h-3.5" />}>
                  Get Started
                </GradientButton>
              </>
            )}
          </div>
        </div>
      </header>

      {/* ──── HERO SECTION ──── */}
      <section className="relative pt-24 pb-20 px-6 lg:px-12 max-w-[1300px] mx-auto text-center space-y-8 overflow-hidden">
        <ParticleField count={20} />

        <div className="relative z-10 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold glass-card border border-[var(--glass-border)] shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span>National-Scale Student → Industry Intelligence Platform</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight text-[var(--text-primary)] max-w-5xl mx-auto leading-[1.05]"
          >
            Build Proof.<br />
            <span className="text-[var(--text-secondary)] font-normal">Not Just Profiles.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="text-base sm:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed font-medium"
          >
            SkillBridge helps students prove their skills, discover career gaps, and connect with opportunities through verified assessments and project-based evaluation.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.24 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <GradientButton href="/register" size="lg" variant="primary" icon={<ArrowRight className="w-4 h-4" />}>
              Get Started
            </GradientButton>
            <GradientButton onClick={() => handleLaunchDemo('student')} size="lg" variant="glass">
              View Demo
            </GradientButton>
          </motion.div>
        </div>
      </section>

      {/* ──── PROBLEM & SOLUTION ──── */}
      <section className="py-24 px-6 lg:px-12 bg-gradient-section border-y border-[var(--border-main)]">
        <div className="max-w-[1200px] mx-auto space-y-14">
          <SectionHeading
            label="The Fundamental Problem"
            title="Traditional Education Measures Marks. Industry Measures Skills. SkillBridge Bridges Both."
            subtitle="Resumes can be exaggerated and college GPAs only measure memory. SkillBridge creates verifiable digital proof through proctored coding assessments, repository commits, and project reviews."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GlassCard className="p-8 space-y-5" delay={0.1}>
              <span className="inline-block px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase dark:bg-red-900/30 dark:text-red-400">
                The Old Broken Way
              </span>
              <h3 className="text-lg font-bold text-[var(--text-primary)]">Unverifiable Claims & Keyword Games</h3>
              <ul className="space-y-3 text-sm text-[var(--text-secondary)]">
                {[
                  'Students spend hours crafting ATS resumes with fake bullet points.',
                  'Recruiters spend 6 seconds skimming keywords, rejecting top builders.',
                  'Institutions have zero visibility into real industry skill alignment.',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="text-red-500 font-bold mt-0.5 shrink-0">✕</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>

            <GlassCard variant="dark" className="p-8 space-y-5 text-white" delay={0.2}>
              <span className="inline-block px-3 py-1 rounded-full bg-[var(--accent)] text-white text-xs font-bold uppercase">
                The SkillBridge Standard
              </span>
              <h3 className="text-lg font-bold text-white">Cryptographic Proof of Real Competence</h3>
              <ul className="space-y-3 text-sm text-white/80">
                {[
                  'Deterministic 6-pillar Builder Score calculated across code, MCQs, and git.',
                  'Skill Confidence Engine (70-98%) with direct source audit trails.',
                  'Direct talent discovery pipeline: companies filter by verified score, not college tier.',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="text-[var(--success)] font-bold mt-0.5 shrink-0">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* ──── HOW IT WORKS 3-STEP PIPELINE ──── */}
      <section id="how-it-works" className="py-24 px-6 lg:px-12 max-w-[1300px] mx-auto space-y-14">
        <SectionHeading
          label="The 3-Step Verification Engine"
          title="How SkillBridge Works"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Connector line (desktop only) */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-[2px] -translate-y-1/2 z-0">
            <div className="w-full h-full bg-gradient-to-r from-[var(--accent)] via-[var(--text-muted)] to-[var(--success)] opacity-15 rounded-full" />
          </div>

          {howItWorksSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <GlassCard
                key={step.step}
                className="p-8 flex flex-col justify-between space-y-6 relative z-10"
                hoverGlow
                delay={idx * 0.12}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: `${step.accent}15` }}>
                      <Icon className="w-5 h-5" style={{ color: step.accent }} />
                    </div>
                    <span className="text-3xl font-black font-mono" style={{ color: step.accent, opacity: 0.25 }}>{step.step}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[var(--text-primary)]">{step.title}</h3>
                    <span className="text-xs font-mono font-semibold text-[var(--text-muted)] block mt-1">{step.subtitle}</span>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{step.description}</p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[var(--border-subtle)]">
                  {step.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-semibold text-[var(--text-primary)]"
                      style={{ background: 'var(--accent-light)' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </GlassCard>
            );
          })}
        </div>
      </section>

      {/* ──── 4 CORE PORTALS ECOSYSTEM ──── */}
      <section id="portals" className="py-24 px-6 lg:px-12 bg-gradient-section border-y border-[var(--border-main)]">
        <div className="max-w-[1300px] mx-auto space-y-12">
          <SectionHeading
            label="Interconnected Platform Architecture"
            title="4 Core Portals. One Central Intelligence Layer."
            subtitle="Actions in one portal instantly cascade across the entire ecosystem. Nothing is isolated."
          />

          {/* Pill Tabs */}
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {portalTabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActivePortalTab(tab.id as any)}
                  className={`tab-pill flex items-center gap-2 ${activePortalTab === tab.id ? 'tab-pill-active' : ''}`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {tab.label}
                </motion.button>
              );
            })}
          </div>

          {/* Portal Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activePortalTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
            >
              <GlassCard className="p-8 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-[var(--text-primary)]">{activePortal.title}</h3>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">{activePortal.desc}</p>
                  </div>
                  <GradientButton
                    onClick={() => handleLaunchDemo(portalTabs.find(t => t.id === activePortalTab)?.role || 'student')}
                    size="sm"
                    variant="primary"
                    icon={<ArrowRight className="w-3.5 h-3.5" />}
                  >
                    Open Workspace
                  </GradientButton>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {activePortal.cards.map((card, idx) => (
                    <GlassCard key={card.label} className="p-5 space-y-2" delay={idx * 0.08}>
                      <span className="text-xs font-bold text-[var(--text-primary)] block">{card.label}</span>
                      <span className="text-lg font-bold block" style={{ color: card.color }}>{card.value}</span>
                      <p className="text-[11px] text-[var(--text-secondary)]">{card.detail}</p>
                    </GlassCard>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ──── BUILDER SCORE FORMULA ──── */}
      <section id="formula" className="py-24 px-6 lg:px-12 max-w-[1200px] mx-auto space-y-14">
        <SectionHeading
          label="Transparent Evaluation Standards"
          title="The 6-Pillar Builder Score Formula"
          subtitle="Zero hidden algorithms. A deterministic 1000-point formula calculated across verifiable achievements."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {builderScorePillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <GlassCard
                key={item.pillar}
                className="p-6 space-y-4"
                gradientBorder
                delay={idx * 0.08}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[var(--accent-light)]">
                      <Icon className="w-4 h-4 text-[var(--accent)]" />
                    </div>
                    <span className="text-sm font-bold text-[var(--text-primary)]">{item.pillar}</span>
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <AnimatedCounter target={item.weight} suffix="%" className="text-2xl text-[var(--accent)]" />
                  <span className="text-xs text-[var(--text-muted)] font-mono">({item.points} pts)</span>
                </div>
                {/* Visual weight bar */}
                <div className="w-full h-1.5 rounded-full bg-[var(--border-subtle)] overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: 'linear-gradient(90deg, var(--accent), var(--success))' }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.weight * 3.33}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 + idx * 0.1, ease: [0.33, 1, 0.68, 1] }}
                  />
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{item.desc}</p>
              </GlassCard>
            );
          })}
        </div>
      </section>

      {/* ──── CTA FOOTER ──── */}
      <footer className="relative py-20 px-6 lg:px-12 overflow-hidden" style={{ background: 'linear-gradient(180deg, var(--text-primary) 0%, #0A0A0A 100%)' }}>
        {/* Decorative gradient orb */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full opacity-20 blur-[100px]" style={{ background: 'radial-gradient(circle, var(--accent), transparent)' }} />

        <div className="relative z-10 max-w-[1300px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-8 text-center sm:text-left">
          <div className="space-y-2">
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Ready to build verified proof of work?
            </h3>
            <p className="text-sm text-white/50 max-w-md">
              Join builders who are proving their engineering capabilities on SkillBridge with deterministic verification.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <GradientButton href="/register" size="lg" variant="primary">
              Get Started
            </GradientButton>
            <motion.button
              onClick={() => handleLaunchDemo('student')}
              className="px-6 py-3.5 bg-white/10 hover:bg-white/15 text-white rounded-xl text-sm font-semibold transition-all border border-white/10 hover:border-white/20"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              View Demo
            </motion.button>
          </div>
        </div>

        <div className="relative z-10 max-w-[1300px] mx-auto pt-10 mt-10 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-white/30 gap-4">
          <span>&copy; 2026 SkillBridge Intelligence Inc. National Workforce Systems.</span>
          <div className="flex items-center gap-6">
            <Link href="/docs" className="hover:text-white transition-colors">Documentation</Link>
            <Link href="/pricing" className="hover:text-white transition-colors">Institutional Licensing</Link>
            <Link href="/demo" className="hover:text-white transition-colors">Demo Portal</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
