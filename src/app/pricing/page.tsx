'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Check,
  Zap,
  Building2,
  GraduationCap,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  ArrowRight,
  HelpCircle,
} from 'lucide-react';

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');

  const plans = [
    {
      name: 'Student Builder',
      badge: 'Free Forever',
      description: 'Everything a student needs to build verified builder proof and get matched with top tech teams.',
      price: { monthly: '$0', annual: '$0' },
      period: 'forever',
      ctaText: 'Start Building Profile',
      ctaHref: '/register',
      ctaVariant: 'outline',
      highlight: false,
      features: [
        'Verified Skill Passport (Unlimited)',
        'Builder Passport Score & Evidence Tracking',
        'AI Career Copilot (Bring-Your-Own-Key)',
        'AI Resume PDF Extraction & Auto-Enrichment',
        'Direct Application to Verified Opportunities',
        'Assessment Engine & Live Benchmark Scores',
        'Personal Career Roadmap Generation',
        'Public Shareable Builder Portfolio Link',
      ],
    },
    {
      name: 'Campus / Institute',
      badge: 'Most Popular for Universities',
      description: 'Turn your campus into a high-placement powerhouse with real-time workforce intelligence.',
      price: { monthly: '$199', annual: '$149' },
      period: 'per month, billed annually',
      ctaText: 'Launch Campus Pilot',
      ctaHref: '/register',
      ctaVariant: 'primary',
      highlight: true,
      features: [
        'Everything in Student Builder, plus:',
        'Unlimited Student & Department Monitoring',
        'Curriculum Intelligence (PDF Syllabus Analysis)',
        'Placement Cell Forecasting & Readiness Analytics',
        'Automated Industry Internship Matchmaking',
        'Custom Campus Skill Benchmark Quizzes',
        'Faculty Validation & Skill Approval Workflow',
        'Exportable Accreditation & NAAC/ABET Reports',
        'Dedicated Institute Success Manager',
      ],
    },
    {
      name: 'Enterprise Recruiter',
      badge: 'For Fast-Growing Companies',
      description: 'Skip resume keyword spam. Find verified pre-assessed builder talent with high accuracy.',
      price: { monthly: '$399', annual: '$299' },
      period: 'per month, billed annually',
      ctaText: 'Start Hiring Builders',
      ctaHref: '/register',
      ctaVariant: 'outline',
      highlight: false,
      features: [
        'Vector-Powered Semantic Talent Discovery',
        'Candidate Verified Skill & Evidence Breakdown',
        'Custom Coding & Architecture Assignment Hub',
        '5-Stage Hiring Pipeline Kanban Board',
        'Direct Candidate Assessment Request Dispatch',
        'Blind Auditing & Anti-Bias Filtering',
        'Automated Interview Scheduling & Scoring',
        'Multi-seat Team Collaboration & Slack Sync',
        'Custom Enterprise ATS Integrations (Greenhouse, Lever)',
      ],
    },
  ];

  const faqs = [
    {
      q: 'Is SkillBridge AI really free for students?',
      a: 'Yes. Students will never be charged for creating their Verified Skill Passport, tracking their Builder Scores, or applying to internships and jobs.',
    },
    {
      q: 'How does Bring-Your-Own-Key (BYOK) AI work?',
      a: 'SkillBridge AI allows students and institutions to plug in their own Gemini, OpenAI, or Claude API keys. Your keys are stored client-side in your secure browser storage and are never logged or stored on our servers.',
    },
    {
      q: 'How does Curriculum Intelligence help universities?',
      a: 'Faculty can upload their syllabus PDF. Our AI engine parses course objectives and compares them against live industry job demand data from 50,000+ tech job postings to pinpoint missing skills and outdated modules.',
    },
    {
      q: 'How do you prevent fake project and skill claims?',
      a: 'SkillBridge uses a multi-tier verification model: GitHub repository commit history, live code sandbox test pass rates, automated PDF certificate metadata checks, and optional faculty co-signatures.',
    },
    {
      q: 'Can I test the platform before signing up?',
      a: 'Absolutely. Click "View Demo" anywhere on the site to explore the pre-populated Student, Institute, Industry, and Admin dashboards without needing an account.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-base shadow-sm">
              S
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-lg text-slate-900 tracking-tight">SkillBridge</span>
              <span className="text-[10px] uppercase font-extrabold tracking-wider px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                AI SaaS
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-600">
            <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
            <Link href="/pricing" className="text-blue-600 font-semibold">Pricing</Link>
            <Link href="/docs" className="hover:text-slate-900 transition-colors">Documentation</Link>
            <Link href="/settings/ai" className="hover:text-slate-900 transition-colors">BYOK AI Setup</Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/student"
              className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              View Demo
            </Link>
            <Link
              href="/login"
              className="px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-2xs"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Transparent, Value-Driven SaaS Pricing
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Plans for students, universities, and enterprise recruiters
          </h1>
          <p className="mt-4 text-sm text-slate-600 leading-relaxed">
            Free for individual talent forever. Scalable workspaces and AI intelligence tools for educational institutions and hiring teams.
          </p>

          {/* Billing Toggle */}
          <div className="mt-8 inline-flex items-center p-1 bg-slate-200/80 rounded-xl">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 ${
                billingCycle === 'annual'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>Annual Billing</span>
              <span className="text-[10px] font-bold bg-emerald-100 text-emerald-700 px-1.5 py-0.2 rounded-full">
                Save 25%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-white rounded-2xl p-8 flex flex-col justify-between border transition-all ${
                plan.highlight
                  ? 'border-blue-600 ring-2 ring-blue-600/20 shadow-xl'
                  : 'border-slate-200 shadow-xs hover:border-slate-300'
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  Recommended
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-slate-900">{plan.name}</h3>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    {plan.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mb-6 min-h-[36px]">{plan.description}</p>

                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-extrabold text-slate-900">
                    {billingCycle === 'annual' ? plan.price.annual : plan.price.monthly}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">/{plan.period}</span>
                </div>

                <div className="space-y-3 pt-6 border-t border-slate-100 mb-8">
                  <p className="text-xs font-semibold text-slate-700">Included Capabilities:</p>
                  {plan.features.map((f, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-slate-600">
                      <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href={plan.ctaHref}
                className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-center transition-all flex items-center justify-center gap-2 ${
                  plan.highlight
                    ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm'
                    : 'bg-slate-900 text-white hover:bg-slate-800'
                }`}
              >
                <span>{plan.ctaText}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>

        {/* Feature Comparison Matrix */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs mb-20">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-900">Detailed Feature Comparison</h2>
            <p className="text-xs text-slate-500 mt-1">
              Compare capabilities across user workspaces and subscription tiers.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 uppercase tracking-wider">
                  <th className="py-3 px-4 font-semibold">Capability</th>
                  <th className="py-3 px-4 font-semibold text-center">Student</th>
                  <th className="py-3 px-4 font-semibold text-center">Institute</th>
                  <th className="py-3 px-4 font-semibold text-center">Recruiter</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr>
                  <td className="py-3 px-4 font-medium">Verified Skill Passport (Multi-source)</td>
                  <td className="py-3 px-4 text-center font-semibold text-emerald-600">✓ Unlimited</td>
                  <td className="py-3 px-4 text-center font-semibold text-emerald-600">✓ Full Cohort</td>
                  <td className="py-3 px-4 text-center font-semibold text-emerald-600">✓ Full Access</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">Builder Score Engine (Code & Evidence)</td>
                  <td className="py-3 px-4 text-center font-semibold text-emerald-600">✓</td>
                  <td className="py-3 px-4 text-center font-semibold text-emerald-600">✓ Class Ranking</td>
                  <td className="py-3 px-4 text-center font-semibold text-emerald-600">✓ Filter by Score</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">BYOK AI Career Copilot & Roadmaps</td>
                  <td className="py-3 px-4 text-center font-semibold text-emerald-600">✓</td>
                  <td className="py-3 px-4 text-center font-semibold text-emerald-600">✓</td>
                  <td className="py-3 px-4 text-center font-semibold text-slate-400">—</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">Curriculum PDF Syllabus Analyzer</td>
                  <td className="py-3 px-4 text-center text-slate-400">—</td>
                  <td className="py-3 px-4 text-center font-semibold text-emerald-600">✓ Full AI Audit</td>
                  <td className="py-3 px-4 text-center text-slate-400">—</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">Vector Semantic Talent Search</td>
                  <td className="py-3 px-4 text-center text-slate-400">—</td>
                  <td className="py-3 px-4 text-center text-slate-400">—</td>
                  <td className="py-3 px-4 text-center font-semibold text-emerald-600">✓ AI Search</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">5-Stage Recruitment Kanban Pipeline</td>
                  <td className="py-3 px-4 text-center text-slate-400">—</td>
                  <td className="py-3 px-4 text-center text-slate-400">—</td>
                  <td className="py-3 px-4 text-center font-semibold text-emerald-600">✓ Full Pipeline</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">Dedicated Multi-Tenant Isolation</td>
                  <td className="py-3 px-4 text-center font-semibold text-emerald-600">✓ Encrypted</td>
                  <td className="py-3 px-4 text-center font-semibold text-emerald-600">✓ Isolated DB</td>
                  <td className="py-3 px-4 text-center font-semibold text-emerald-600">✓ Isolated DB</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQs */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-bold text-slate-900 text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-blue-600 shrink-0" />
                  {faq.q}
                </h3>
                <p className="text-xs text-slate-600 mt-2 pl-6 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 SkillBridge AI SaaS. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/docs" className="hover:text-slate-900">Documentation</Link>
            <Link href="/pricing" className="hover:text-slate-900">Pricing</Link>
            <Link href="/settings/ai" className="hover:text-slate-900">BYOK AI Keys</Link>
            <Link href="/student" className="hover:text-slate-900">Demo Mode</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
