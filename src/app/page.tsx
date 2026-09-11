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
  Award,
  GraduationCap,
  Building2,
  Briefcase,
  Layers,
  CheckCircle2,
  Cpu,
  Bot,
  FileSpreadsheet,
  TrendingUp,
  BarChart3,
  ExternalLink,
  Zap,
  Lock,
  Play,
  FileText,
  Compass,
} from 'lucide-react';

export default function LandingPage() {
  const router = useRouter();
  const { setRole, setDemoMode, currentUser, studentProfile } = useAppStore();

  const handleLaunchDemo = (role: UserRole = 'student') => {
    setDemoMode(true);
    setRole(role);
    router.push('/demo');
  };

  const portals: {
    role: UserRole;
    title: string;
    subtitle: string;
    description: string;
    icon: any;
    href: string;
    badge: string;
    features: string[];
    btnText: string;
  }[] = [
    {
      role: 'student',
      title: 'Student Portal',
      subtitle: 'Builder & Verified Skill Passport',
      description:
        'Evidence-based multi-factor builder scoring, cryptographically auditable verified skill passports, AI Career Copilot, and matched tier-1 internships.',
      icon: GraduationCap,
      href: '/student',
      badge: 'For Candidates',
      features: [
        'Builder Score (0-1000) & Evidence Audit',
        'Multi-Tier Verified Skill Passports',
        'AI Career Copilot & Roadmaps (BYOK)',
        '1-Click Matched Internship Routing',
      ],
      btnText: 'Launch Student Portal',
    },
    {
      role: 'institute',
      title: 'Institute Portal',
      subtitle: 'Curriculum & Cohort Intelligence',
      description:
        'Automated syllabus PDF market relevance analysis, cross-department readiness index (CSE/AIML/IT/ECE), student growth telemetry, and placement cell analytics.',
      icon: Building2,
      href: '/institute',
      badge: 'For Universities & Deans',
      features: [
        'AI Syllabus Extraction & Gap Diagnosis',
        'Department Readiness Index Benchmarks',
        'Student Roster & Builder Tracking',
        'NBA/NAAC Accreditation Export Reports',
      ],
      btnText: 'Launch Institute Portal',
    },
    {
      role: 'industry',
      title: 'Industry Portal',
      subtitle: 'Vector Talent Discovery & Pipeline',
      description:
        'Role match requirement builder, multi-attribute candidate search filtered by Builder score, assignment evaluations, and 5-stage recruitment Kanban pipeline.',
      icon: Briefcase,
      href: '/industry',
      badge: 'For Enterprise Recruiters',
      features: [
        'Vector Multi-Attribute Talent Discovery',
        'Candidate Profiles with GitHub Proofs',
        'Interactive Recruitment Kanban Board',
        'Coding & System Design Assignment Hub',
      ],
      btnText: 'Launch Industry Portal',
    },
    {
      role: 'admin',
      title: 'Admin Portal',
      subtitle: 'Global Macro Demand Telemetry',
      description:
        'Platform-wide macro telemetry, fastest growing technology demand trends, enterprise user governance, and skill taxonomy definitions.',
      icon: ShieldCheck,
      href: '/admin',
      badge: 'For Platform Governance',
      features: [
        'Real-time Skill Demand Intelligence',
        'Fastest Growing Technologies YoY',
        'Enterprise User Management & RBAC',
        'Standardized Domain Taxonomies',
      ],
      btnText: 'Launch Admin Portal',
    },
  ];

  const coreFeatures = [
    {
      title: 'Builder Passport',
      tagline: 'Evidence-Based Engineering Scoring',
      description:
        'Audits real code commits, hackathons, and research across Execution, Leadership, Innovation, Problem Solving, and Consistency.',
      icon: Award,
      color: 'text-blue-600 bg-blue-50',
    },
    {
      title: 'Verified Skill Passport',
      tagline: 'Multi-Source Credential Signatures',
      description:
        'Skills verified across 4 trust layers: Standardized Assessments, Repository Projects, Certifications, and Faculty Endorsements.',
      icon: ShieldCheck,
      color: 'text-purple-600 bg-purple-50',
    },
    {
      title: 'AI Career Copilot',
      tagline: 'Autonomous Career Blueprinting (BYOK)',
      description:
        'Connect Gemini, OpenAI, or Claude to diagnose skill deltas, generate step-by-step project blueprints, and calculate estimated time to hire.',
      icon: Bot,
      color: 'text-indigo-600 bg-indigo-50',
    },
    {
      title: 'Skill Gap Analysis',
      tagline: 'Real-Time Market Delta Matrix',
      description:
        'Live benchmark comparing candidate proficiency against current industry job requisitions (Backend, AI Engineer, Cloud Architect).',
      icon: Layers,
      color: 'text-amber-600 bg-amber-50',
    },
    {
      title: 'Curriculum Analyzer',
      tagline: 'Automated Syllabus PDF Intelligence',
      description:
        'Extracts course syllabus text and benchmarks topics against 10,000+ live job requisitions to identify missing cutting-edge modules.',
      icon: FileSpreadsheet,
      color: 'text-emerald-600 bg-emerald-50',
    },
    {
      title: 'Department Readiness Index',
      tagline: 'Institutional Benchmark Telemetry',
      description:
        'Cross-department evaluation across CSE, AIML, IT, and ECE in Programming, Cloud, AI, DevOps, and Data Science.',
      icon: BarChart3,
      color: 'text-rose-600 bg-rose-50',
    },
    {
      title: 'Vector Talent Discovery',
      tagline: 'Multi-Attribute Recruiter Search',
      description:
        'Recruiters filter talent by verified Builder score sliders, skills, and department with 1-click shortlisting and Kanban pipeline tracking.',
      icon: Sparkles,
      color: 'text-cyan-600 bg-cyan-50',
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans">
      {/* Top Enterprise Navigation */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-xs">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-slate-900 tracking-tight text-base">
                  SKILLBRIDGE
                </span>
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                  Enterprise
                </span>
              </div>
              <span className="text-[10px] text-slate-500 font-medium block">
                Workforce Intelligence Platform
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>
            <a href="#features" className="hover:text-blue-600 transition-colors">
              Features
            </a>
            <a href="#portals" className="hover:text-blue-600 transition-colors">
              Solutions
            </a>
            <Link href="/pricing" className="hover:text-blue-600 transition-colors">
              Pricing <span className="text-[10px] text-blue-600 font-bold ml-0.5">(Coming Soon)</span>
            </Link>
            <Link href="/docs" className="hover:text-blue-600 transition-colors">
              Documentation
            </Link>
          </nav>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => handleLaunchDemo('student')}
              className="px-3.5 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Play className="w-3 h-3 fill-current" />
              <span>View Demo</span>
            </button>

            {currentUser ? (
              <Link
                href={`/${currentUser.role}`}
                className="px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-xs flex items-center gap-1.5"
              >
                <span>Dashboard ({getUserDisplayName({ user: currentUser, profile: studentProfile })})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-xs"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 border-b border-slate-200 bg-gradient-to-b from-slate-50/80 via-white to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-700">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Bridging Academia and Industry Through Verified Skills & AI Intelligence</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight max-w-4xl mx-auto leading-tight">
            The Enterprise Workforce Platform for{' '}
            <span className="text-blue-600">Verified Technical Competence</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Move beyond static resumes. SkillBridge AI combines cryptographic Builder Passports, AI Curriculum Market Analysis, and Vector Talent Discovery to align Students, Institutes, and Enterprise Recruiters.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => handleLaunchDemo('student')}
              className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors shadow-sm flex items-center gap-2"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>View Demo</span>
            </button>
            <Link
              href="/register?provider=google"
              className="px-4 py-2.5 text-xs sm:text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-2xs flex items-center gap-2"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </Link>
            <Link
              href="/register?provider=linkedin"
              className="px-4 py-2.5 text-xs sm:text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-2xs flex items-center gap-2"
            >
              <div className="w-4 h-4 bg-[#0A66C2] rounded-xs text-white text-[10px] font-bold flex items-center justify-center">
                in
              </div>
              <span>Continue with LinkedIn</span>
            </Link>
            <Link
              href="/register"
              className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl transition-colors shadow-2xs flex items-center gap-1.5"
            >
              <span>Register</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Metrics Strip */}
          <div className="pt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto text-center">
            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs">
              <span className="text-2xl font-black text-slate-900 block">14,400+</span>
              <span className="text-xs text-slate-500 font-medium">Verified Student Builders</span>
            </div>
            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs">
              <span className="text-2xl font-black text-blue-600 block">48</span>
              <span className="text-xs text-slate-500 font-medium">Partner Universities</span>
            </div>
            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs">
              <span className="text-2xl font-black text-emerald-600 block">320+</span>
              <span className="text-xs text-slate-500 font-medium">Tier-1 Hiring Companies</span>
            </div>
            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs">
              <span className="text-2xl font-black text-purple-600 block">89.4%</span>
              <span className="text-xs text-slate-500 font-medium">Placement Match Rate</span>
            </div>
          </div>
        </div>
      </section>

      {/* Problem & Solution Section */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-rose-600">
              The Academia–Industry Disconnect
            </span>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
              Why Traditional Placement Portals Fail
            </h2>
            <p className="text-xs text-slate-600">
              Colleges teach outdated curricula, students lack verifiable code proof, and recruiters spend hundreds of hours screening unverified PDF resumes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-rose-50/50 border border-rose-100 rounded-xl space-y-2">
              <h3 className="text-sm font-bold text-rose-900">For Students: No Proof of Competence</h3>
              <p className="text-xs text-rose-800/80 leading-relaxed">
                Resume keywords don&apos;t prove technical execution. Students struggle to show actual code velocity, architectural design, or hackathon leadership.
              </p>
            </div>
            <div className="p-6 bg-amber-50/50 border border-amber-100 rounded-xl space-y-2">
              <h3 className="text-sm font-bold text-amber-900">For Institutes: Outdated Syllabi</h3>
              <p className="text-xs text-amber-800/80 leading-relaxed">
                Curriculum updates take years. Institutes lack automated AI comparison against fast-moving tech stacks (Vector DBs, LLMs, Cloud Native).
              </p>
            </div>
            <div className="p-6 bg-blue-50/50 border border-blue-100 rounded-xl space-y-2">
              <h3 className="text-sm font-bold text-blue-900">For Industry: Screening Fatigue</h3>
              <p className="text-xs text-blue-800/80 leading-relaxed">
                Recruiters filter thousands of identical GPAs without evidence-based builder scoring or standardized algorithmic evaluations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features Highlight Grid */}
      <section id="features" className="py-20 bg-slate-50/60 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
              Platform Modules
            </span>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
              Comprehensive Workforce Intelligence Suite
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreFeatures.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  key={idx}
                  className="saas-card p-6 space-y-3 hover:border-blue-400 hover:shadow-md transition-all"
                >
                  <div className={`p-3 rounded-xl w-fit ${feat.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{feat.title}</h3>
                    <span className="text-[11px] font-semibold text-blue-600 block mt-0.5">
                      {feat.tagline}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{feat.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4 Dedicated Portals Section */}
      <section id="portals" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
              Portals Overview
            </span>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
              Tailored Portals for Every Stakeholder
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {portals.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.role}
                  className="saas-card p-8 flex flex-col justify-between space-y-6 hover:border-blue-400 hover:shadow-md transition-all group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                        {p.badge}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-slate-900">{p.title}</h3>
                      <p className="text-xs font-semibold text-blue-600 mt-0.5">{p.subtitle}</p>
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed">{p.description}</p>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      {p.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleLaunchDemo(p.role)}
                      className="flex-1 py-2 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg text-center transition-colors"
                    >
                      Demo View
                    </button>
                    <Link
                      href={p.href}
                      onClick={() => setRole(p.role)}
                      className="flex-1 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-blue-600 rounded-lg text-center transition-colors flex items-center justify-center gap-1.5"
                    >
                      <span>Enter Portal</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-slate-50/60 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
              End-to-End Workflow
            </span>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">How SkillBridge AI Operates</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div className="p-6 bg-white rounded-xl border border-slate-200 space-y-2">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold text-sm flex items-center justify-center mx-auto mb-3">
                1
              </div>
              <h3 className="text-xs font-bold text-slate-900">Evidence Submission</h3>
              <p className="text-[11px] text-slate-500">
                Students connect GitHub repos, hackathon wins, and complete assessments.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl border border-slate-200 space-y-2">
              <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 font-bold text-sm flex items-center justify-center mx-auto mb-3">
                2
              </div>
              <h3 className="text-xs font-bold text-slate-900">Multi-Tier Verification</h3>
              <p className="text-[11px] text-slate-500">
                Automated code evaluators & faculty signatures generate cryptographic Skill Passports.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl border border-slate-200 space-y-2">
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 font-bold text-sm flex items-center justify-center mx-auto mb-3">
                3
              </div>
              <h3 className="text-xs font-bold text-slate-900">Curriculum Calibration</h3>
              <p className="text-[11px] text-slate-500">
                Universities ingest syllabi to modernize coursework against real 2026 job market demand.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl border border-slate-200 space-y-2">
              <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 font-bold text-sm flex items-center justify-center mx-auto mb-3">
                4
              </div>
              <h3 className="text-xs font-bold text-slate-900">Recruiter Discovery</h3>
              <p className="text-[11px] text-slate-500">
                Hiring managers search vector-matched candidate profiles and manage hiring pipelines.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Security & BYOK Section */}
      <section id="security" className="py-16 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex p-3 bg-white/10 rounded-2xl text-blue-400 mb-2">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold">Zero-Leakage BYOK AI Architecture</h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            Bring Your Own Key: SkillBridge AI connects directly to Google Gemini, OpenAI, or Anthropic Claude from client browser storage without logging private keys on central servers.
          </p>
          <div className="pt-4 flex justify-center gap-3">
            <Link
              href="/settings/ai"
              className="px-5 py-2.5 text-xs font-semibold text-slate-900 bg-white rounded-lg hover:bg-slate-100 transition-colors inline-flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Configure AI Providers</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-white border-t border-slate-200 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900">SKILLBRIDGE AI</span>
            <span>•</span>
            <span>AI-Powered Academia–Industry Intelligence Platform</span>
          </div>
          <div className="flex items-center gap-5">
            <Link href="/pricing" className="hover:text-blue-600">
              Pricing
            </Link>
            <Link href="/docs" className="hover:text-blue-600">
              Documentation
            </Link>
            <Link href="/settings/ai" className="hover:text-blue-600">
              BYOK AI
            </Link>
            <Link href="/login" className="hover:text-blue-600">
              Sign In
            </Link>
            <Link href="/register" className="hover:text-blue-600">
              Register
            </Link>
            <button onClick={() => handleLaunchDemo('student')} className="hover:text-blue-600">
              View Demo
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
