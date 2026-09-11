'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
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
  Award,
  Target,
  FileCheck,
  TrendingUp,
  BookOpen,
  Code2,
  Cpu,
  BarChart3,
  Check,
  ExternalLink,
  Lock,
  Play,
  RotateCcw,
} from 'lucide-react';

export default function DemoPage() {
  const router = useRouter();
  const { setRole, setDemoMode, currentUser, studentProfile } = useAppStore();
  const [activeTab, setActiveTab] = useState<'student' | 'faculty' | 'industry' | 'institute'>('student');

  const handleLaunchRoleDemo = (role: UserRole) => {
    setDemoMode(true);
    setRole(role);
    if (role === 'student') {
      router.push('/student');
    } else if (role === 'industry') {
      router.push('/industry');
    } else if (role === 'institute') {
      router.push('/institute');
    } else {
      router.push('/faculty');
    }
  };

  const displayName = getUserDisplayName({ user: currentUser, profile: studentProfile });

  const coreCapabilities = [
    {
      id: 'assessment',
      title: 'Skill Assessment',
      subtitle: 'Certification Standard',
      description: 'Evaluate technical and professional skills using industry-aligned, randomized assessments across 6 core engineering domains with diagnostic answer explanations.',
      icon: CheckCircle2,
      accent: '#2F7A45',
      highlights: ['Department & branch calibrated', 'Anti-cheat randomized pools', 'Why You Missed It diagnostics'],
      actionLabel: 'Try Assessment Flow',
      targetRole: 'student' as UserRole,
    },
    {
      id: 'skillgap',
      title: 'Skill Gap Analysis',
      subtitle: 'Targeted Remediation',
      description: 'Automatically identify missing technical competencies and receive targeted 5-day AI study roadmaps to bridge critical knowledge gaps.',
      icon: Target,
      accent: '#C76A2A',
      highlights: ['Real-time concept gap alerts', 'Official docs & video drills', '5-Day structured study plans'],
      actionLabel: 'View Skill Gap Engine',
      targetRole: 'student' as UserRole,
    },
    {
      id: 'readiness',
      title: 'Career Readiness Score',
      subtitle: 'Industry Benchmarking',
      description: 'Understand exactly how prepared you are for tier-1 internships and campus placements through deterministic 6-pillar competency scoring.',
      icon: TrendingUp,
      accent: '#1B1B1B',
      highlights: ['Transparent 1000-pt Builder Score', 'Target role requirement matching', 'Zero resume fluff or guesswork'],
      actionLabel: 'Inspect Readiness Radar',
      targetRole: 'student' as UserRole,
    },
    {
      id: 'copilot',
      title: 'AI Career Copilot',
      subtitle: 'Persistent Mentorship',
      description: 'Receive personalized, context-aware career guidance directly grounded in your verified academic record, GitHub code, and assessment history.',
      icon: Bot,
      accent: '#C76A2A',
      highlights: ['Persistent conversational memory', 'Live Gemini API intelligence', 'Weekly execution missions'],
      actionLabel: 'Launch AI Copilot',
      targetRole: 'student' as UserRole,
    },
    {
      id: 'matching',
      title: 'Opportunity Matching',
      subtitle: 'Proof-Based Discovery',
      description: 'Get matched with internships, high-concurrency hackathons, and corporate capstone challenges based on verified skills and code evidence.',
      icon: Briefcase,
      accent: '#2F7A45',
      highlights: ['Multi-attribute fit calibration', 'Strengths & missing skills breakdown', '1-Click Builder Passport apply'],
      actionLabel: 'Browse Matching Engine',
      targetRole: 'student' as UserRole,
    },
    {
      id: 'portfolio',
      title: 'Digital Portfolio',
      subtitle: 'Verifiable Proof Ledger',
      description: 'Build an authenticated, public shareable builder portfolio showcasing live production repositories, Assessment 4.0 badges, and GitHub velocity.',
      icon: FileCheck,
      accent: '#1B1B1B',
      highlights: ['Public recruiter URL', 'Verifiable credential stamps', 'Live GitHub telemetry graph'],
      actionLabel: 'View Digital Portfolio',
      targetRole: 'student' as UserRole,
    },
  ];

  const roleWorkspaces = [
    {
      role: 'student' as UserRole,
      title: 'Student Builder Workspace',
      badge: 'Skill Growth & Verification',
      icon: GraduationCap,
      description: 'Experience the full student journey: take benchmark assessments, track Builder Scores, explore career roadmaps, and chat with AI Copilot.',
      features: [
        'Assessment 4.0 with diagnostic retakes',
        'Transparent 6-pillar Builder Score radar',
        'Verified Skills Passport & Shareable Portfolio',
        'Smart Opportunity Matching with Gap Analysis',
      ],
      ctaText: 'Launch Student Workspace Demo',
      color: 'bg-[#1B1B1B]',
    },
    {
      role: 'institute' as UserRole,
      title: 'Academician & Faculty Workspace',
      badge: 'Faculty Immersion & Grants',
      icon: BookOpen,
      description: 'Explore faculty development programs (FDPs), industry sabbaticals, research collaboration RFPs, and student mentorship office hours.',
      features: [
        'Industry-sponsored Faculty Development Programs',
        'Corporate sabbaticals with Google, AWS, NVIDIA',
        'Research grant RFPs and joint proposals',
        'Student cohort skill telemetry & guidance hub',
      ],
      ctaText: 'Launch Faculty Portal Demo',
      color: 'bg-[#1B1B1B]',
    },
    {
      role: 'industry' as UserRole,
      title: 'Industry Recruiter Workspace',
      badge: 'Evidence-Based Hiring',
      icon: Building,
      description: 'Discover high-intent student builders verified by real code repositories, proctored benchmarks, and faculty validations.',
      features: [
        'Multi-attribute talent discovery & filter matrix',
        'Candidate pipeline from Matched to Selected',
        'Live GitHub code proof & score inspection',
        'Post job requirements and capstone challenges',
      ],
      ctaText: 'Launch Industry Portal Demo',
      color: 'bg-[#1B1B1B]',
    },
    {
      role: 'institute' as UserRole,
      title: 'Institution Leadership Dashboard',
      badge: 'Curriculum & Placement Intel',
      icon: BarChart3,
      description: 'Audit department readiness, analyze curriculum alignment against market demand, and track campus placement velocity in real time.',
      features: [
        'Multi-department cohort comparison analytics',
        'AI-powered syllabus and curriculum market audits',
        'Placement cell pipeline and recruiter requests',
        'Institutional accreditation telemetry reports',
      ],
      ctaText: 'Launch Institution Dashboard Demo',
      color: 'bg-[#1B1B1B]',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F6F4EE] text-[#1B1B1B] selection:bg-[#E8E5DD] flex flex-col justify-between">
      
      {/* Sticky Top Navigation Bar */}
      <header className="sticky top-0 z-50 w-full bg-[#F6F4EE]/90 backdrop-blur-md border-b border-[#E8E5DD]">
        <div className="flex items-center justify-between h-16 px-6 lg:px-12 max-w-[1400px] mx-auto">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#1B1B1B] flex items-center justify-center text-white font-bold text-xs font-mono">
              SB
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-bold text-sm tracking-tight text-[#1B1B1B]">SKILLBRIDGE</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-md bg-[#C76A2A]/10 text-[#C76A2A] font-bold">
                DEMO
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-[#6F6A60]">
            <a href="#capabilities" className="hover:text-[#1B1B1B] transition-colors">Core Capabilities</a>
            <a href="#workspaces" className="hover:text-[#1B1B1B] transition-colors">Role Workspaces</a>
            <a href="#workflow" className="hover:text-[#1B1B1B] transition-colors">Evaluation Workflow</a>
            <Link href="/" className="hover:text-[#1B1B1B] transition-colors">Home</Link>
          </nav>

          <div className="flex items-center gap-3">
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
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="pt-20 pb-16 px-6 lg:px-12 max-w-[1300px] mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white text-[#1B1B1B] border border-[#E8E5DD] shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C76A2A]" />
            <span>Interactive Platform Demonstration Sandbox</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#1B1B1B] max-w-4xl mx-auto leading-[1.1]"
          >
            Bridge the Gap Between Learning and Industry Readiness
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="text-base sm:text-lg text-[#6F6A60] max-w-2xl mx-auto leading-relaxed font-medium"
          >
            SkillBridge helps students assess skills, identify gaps, build industry-ready profiles, and discover opportunities through AI-powered guidance.
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
            <a
              href="#workspaces"
              className="w-full sm:w-auto px-7 py-3.5 bg-white hover:bg-[#FAF9F5] text-[#1B1B1B] border border-[#E8E5DD] rounded-xl text-xs font-semibold transition-all shadow-xs flex items-center justify-center gap-2"
            >
              <span>Explore Platform</span>
            </a>
          </motion.div>
        </section>

        {/* Section 1: Core Value-Driven Capabilities Grid */}
        <section id="capabilities" className="py-20 px-6 lg:px-12 bg-white border-y border-[#E8E5DD]">
          <div className="max-w-[1300px] mx-auto space-y-12">
            <div className="text-center space-y-3 max-w-3xl mx-auto">
              <span className="text-xs font-mono uppercase tracking-wider text-[#C76A2A] font-bold">
                Value-Driven Architecture
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1B1B1B] tracking-tight">
                Everything You Need to Prove &amp; Accelerate Industry Competency
              </h2>
              <p className="text-xs sm:text-sm text-[#6F6A60] leading-relaxed">
                SkillBridge transforms subjective resumes into verifiable evidence, actionable diagnostic roadmaps, and direct recruiter matches.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {coreCapabilities.map((cap) => {
                const Icon = cap.icon;
                return (
                  <div
                    key={cap.id}
                    className="p-7 rounded-3xl bg-[#FAF9F5] border border-[#E8E5DD] hover:border-[#1B1B1B] transition-all space-y-5 flex flex-col justify-between shadow-2xs"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="w-10 h-10 rounded-2xl bg-white border border-[#E8E5DD] flex items-center justify-center text-[#1B1B1B]">
                          <Icon className="w-5 h-5 text-[#C76A2A]" />
                        </div>
                        <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full bg-white border border-[#E8E5DD] text-[#6F6A60]">
                          {cap.subtitle}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-[#1B1B1B]">{cap.title}</h3>
                      <p className="text-xs text-[#6F6A60] leading-relaxed">{cap.description}</p>

                      <ul className="space-y-1.5 pt-2 text-xs">
                        {cap.highlights.map((h, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-[#1B1B1B]">
                            <Check className="w-3.5 h-3.5 text-[#2F7A45] shrink-0" />
                            <span className="text-[11px] font-medium">{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-[#E8E5DD]">
                      <button
                        onClick={() => handleLaunchRoleDemo(cap.targetRole)}
                        className="w-full py-2.5 px-4 bg-white hover:bg-[#1B1B1B] hover:text-white border border-[#E8E5DD] text-[#1B1B1B] text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                      >
                        <span>{cap.actionLabel}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Section 2: Interactive Role Workspaces */}
        <section id="workspaces" className="py-20 px-6 lg:px-12 max-w-[1300px] mx-auto space-y-12">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-wider text-[#C76A2A] font-bold">
              Isolated Sandbox Environments
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1B1B1B] tracking-tight">
              Test Drive Every Role-Based Experience
            </h2>
            <p className="text-xs sm:text-sm text-[#6F6A60] leading-relaxed">
              Launch into simulated workspaces populated with live GitHub repositories, real-world assessment diagnostic benchmarks, and recruiter pipelines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {roleWorkspaces.map((ws, idx) => {
              const Icon = ws.icon;
              return (
                <div
                  key={idx}
                  className="p-8 rounded-3xl bg-white border border-[#E8E5DD] hover:border-[#1B1B1B] transition-all space-y-6 flex flex-col justify-between shadow-xs"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-[#F6F4EE] border border-[#E8E5DD] flex items-center justify-center text-[#1B1B1B]">
                        <Icon className="w-6 h-6 text-[#C76A2A]" />
                      </div>
                      <span className="px-3 py-1 rounded-full bg-[#FAF9F5] border border-[#E8E5DD] text-[10px] font-mono font-bold text-[#6F6A60] uppercase">
                        {ws.badge}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-[#1B1B1B]">{ws.title}</h3>
                    <p className="text-xs sm:text-sm text-[#6F6A60] leading-relaxed">{ws.description}</p>

                    <div className="space-y-2 pt-2">
                      <span className="text-[11px] uppercase font-bold text-[#6F6A60] block tracking-wider">
                        Key Capabilities Included:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {ws.features.map((feat, fIdx) => (
                          <div key={fIdx} className="p-2.5 rounded-xl bg-[#FAF9F5] border border-[#E8E5DD] flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#2F7A45] shrink-0" />
                            <span className="text-[11px] font-medium text-[#1B1B1B]">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#E8E5DD]">
                    <button
                      onClick={() => handleLaunchRoleDemo(ws.role)}
                      className="w-full py-3 bg-[#1B1B1B] hover:bg-[#C76A2A] text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>{ws.ctaText}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 3: Assessment & Evaluation Workflow Showcase */}
        <section id="workflow" className="py-20 px-6 lg:px-12 bg-white border-y border-[#E8E5DD]">
          <div className="max-w-[1200px] mx-auto space-y-12">
            <div className="text-center space-y-3 max-w-3xl mx-auto">
              <span className="text-xs font-mono uppercase tracking-wider text-[#C76A2A] font-bold">
                Continuous Evaluation Loop
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1B1B1B] tracking-tight">
                How SkillBridge Accelerates Student Readiness
              </h2>
              <p className="text-xs sm:text-sm text-[#6F6A60] leading-relaxed">
                From initial diagnostic evaluation to cryptographically stamped credentials and recruiter shortlists.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                {
                  step: '01',
                  title: 'Diagnostic Test',
                  desc: 'Take randomized 10-question evaluations calibrated for your department, branch, and career goal.',
                  icon: Code2,
                },
                {
                  step: '02',
                  title: 'Skill Gap Breakdown',
                  desc: 'Review question explanations with "Why You Missed It" root-cause reasoning and 5 learning resources.',
                  icon: Target,
                },
                {
                  step: '03',
                  title: '5-Day Study Plan',
                  desc: 'Execute AI-generated targeted drills, read official docs, and retake the assessment to earn verified status.',
                  icon: BookOpen,
                },
                {
                  step: '04',
                  title: 'Direct Matching',
                  desc: 'Apply directly to tier-1 internships and corporate capstones using your verified Builder Passport.',
                  icon: ShieldCheck,
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.step} className="p-6 rounded-3xl bg-[#FAF9F5] border border-[#E8E5DD] space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-2xl font-extrabold text-[#C76A2A]">{item.step}</span>
                      <Icon className="w-5 h-5 text-[#6F6A60]" />
                    </div>
                    <h3 className="text-base font-bold text-[#1B1B1B]">{item.title}</h3>
                    <p className="text-xs text-[#6F6A60] leading-relaxed">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

      </main>

      {/* Footer Matching Landing Page */}
      <footer className="py-16 px-6 lg:px-12 bg-[#1B1B1B] text-white border-t border-[#E8E5DD]">
        <div className="max-w-[1300px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-white tracking-tight">Ready to bridge your learning into industry proof?</h3>
            <p className="text-xs text-white/60">Start taking verified assessments and build your transparent Builder Score.</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/register"
              className="px-6 py-3 bg-[#C76A2A] hover:bg-[#B55E22] text-white rounded-xl text-xs font-bold transition-all shadow-xs"
            >
              Get Started
            </Link>
            <button
              onClick={() => handleLaunchRoleDemo('student')}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold transition-all cursor-pointer"
            >
              Launch Student Demo
            </button>
          </div>
        </div>

        <div className="max-w-[1300px] mx-auto pt-8 mt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-white/40 gap-4">
          <span>&copy; 2026 SkillBridge Intelligence Inc. University &amp; Workforce Systems.</span>
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <Link href="/docs" className="hover:text-white">Documentation</Link>
            <Link href="/pricing" className="hover:text-white">Institutional Licensing</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
