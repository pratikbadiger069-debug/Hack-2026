'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Code2,
  Cpu,
  Database,
  Key,
  Layers,
  Shield,
  Terminal,
  ExternalLink,
  CheckCircle2,
  Copy,
  Check,
} from 'lucide-react';

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState<'quickstart' | 'architecture' | 'byok' | 'apis' | 'rbac' | 'verification'>('quickstart');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

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
                Documentation
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-600">
            <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
            <Link href="/pricing" className="hover:text-slate-900 transition-colors">Pricing</Link>
            <Link href="/docs" className="text-blue-600 font-semibold">Documentation</Link>
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
          </div>
        </div>
      </header>

      {/* Docs Body with Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1 grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Sidebar Navigation */}
        <aside className="md:col-span-3 space-y-1">
          <div className="pb-3 mb-3 border-b border-slate-200">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Documentation Index</span>
          </div>

          <button
            onClick={() => setActiveSection('quickstart')}
            className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2.5 transition-colors ${
              activeSection === 'quickstart'
                ? 'bg-blue-50 text-blue-700 font-bold'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Terminal className="w-4 h-4 shrink-0" />
            <span>Platform Quickstart</span>
          </button>

          <button
            onClick={() => setActiveSection('architecture')}
            className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2.5 transition-colors ${
              activeSection === 'architecture'
                ? 'bg-blue-50 text-blue-700 font-bold'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Layers className="w-4 h-4 shrink-0" />
            <span>System Architecture</span>
          </button>

          <button
            onClick={() => setActiveSection('byok')}
            className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2.5 transition-colors ${
              activeSection === 'byok'
                ? 'bg-blue-50 text-blue-700 font-bold'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Key className="w-4 h-4 shrink-0" />
            <span>Bring-Your-Own-Key (BYOK) AI</span>
          </button>

          <button
            onClick={() => setActiveSection('verification')}
            className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2.5 transition-colors ${
              activeSection === 'verification'
                ? 'bg-blue-50 text-blue-700 font-bold'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Shield className="w-4 h-4 shrink-0" />
            <span>Verification Protocol</span>
          </button>

          <button
            onClick={() => setActiveSection('rbac')}
            className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2.5 transition-colors ${
              activeSection === 'rbac'
                ? 'bg-blue-50 text-blue-700 font-bold'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Database className="w-4 h-4 shrink-0" />
            <span>Multi-Tenant RBAC</span>
          </button>

          <button
            onClick={() => setActiveSection('apis')}
            className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2.5 transition-colors ${
              activeSection === 'apis'
                ? 'bg-blue-50 text-blue-700 font-bold'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Code2 className="w-4 h-4 shrink-0" />
            <span>REST API Reference</span>
          </button>
        </aside>

        {/* Content Area */}
        <main className="md:col-span-9 bg-white rounded-2xl border border-slate-200 p-8 shadow-2xs">
          {activeSection === 'quickstart' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Platform Quickstart</h1>
                <p className="text-xs text-slate-500 mt-1">
                  Getting started with SkillBridge AI across Student, Institute, and Industry workspaces.
                </p>
              </div>

              <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
                <p>
                  SkillBridge AI operates under two complementary modes: <strong>Demo Exploration Mode</strong> for instant evaluation and <strong>Production SaaS Mode</strong> for real multi-tenant operations.
                </p>

                <h3 className="text-sm font-bold text-slate-900 pt-2">Step 1: Onboarding Your Persona</h3>
                <p>
                  Navigate to <Link href="/register" className="text-blue-600 font-semibold underline">Register</Link> to create an account. You will be guided through a 5-step onboarding wizard:
                </p>
                <ul className="list-disc list-inside space-y-1 pl-2 text-slate-700">
                  <li><strong>Role Selection:</strong> Choose Student, Institute Faculty / Placement Cell, or Industry Recruiter.</li>
                  <li><strong>Developer Connect:</strong> Link your LinkedIn URL, GitHub profile, and portfolio.</li>
                  <li><strong>Resume PDF Parsing:</strong> Upload your PDF resume to trigger instant skill extraction.</li>
                  <li><strong>Profile Review:</strong> Review and approve extracted information before writing to the database.</li>
                </ul>

                <h3 className="text-sm font-bold text-slate-900 pt-2">Step 2: Connecting BYOK AI</h3>
                <p>
                  To enable live AI Career Copilot, AI Skill Gap Analysis, and Curriculum Intelligence without platform markups, configure your personal API key at <Link href="/settings/ai" className="text-blue-600 font-semibold underline">/settings/ai</Link>.
                </p>

                <div className="p-4 bg-slate-900 text-slate-100 rounded-xl font-mono text-[11px] relative">
                  <button
                    onClick={() => copyToClipboard('npm run dev\n# Or start backend microservice: uvicorn app.main:app --reload', 'cmd1')}
                    className="absolute top-3 right-3 text-slate-400 hover:text-white"
                  >
                    {copiedCode === 'cmd1' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                  <p className="text-slate-400"># Development Server Commands</p>
                  <p className="text-emerald-400">npm run dev</p>
                  <p className="text-slate-400"># Local FastAPI Microservice Gateway</p>
                  <p className="text-blue-300">cd backend &amp;&amp; python -m uvicorn app.main:app --port 8000 --reload</p>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'architecture' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">System Architecture</h1>
                <p className="text-xs text-slate-500 mt-1">
                  Full-stack Next.js App Router, Prisma ORM, Neon PostgreSQL, and FastAPI intelligence service.
                </p>
              </div>

              <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                    <h4 className="font-bold text-slate-900 flex items-center gap-2 mb-1">
                      <Layers className="w-4 h-4 text-blue-600" />
                      Frontend Layer
                    </h4>
                    <p className="text-slate-500 text-[11px]">
                      Next.js 15 App Router with TypeScript, Tailwind CSS, Recharts, and Zustand client persistence.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                    <h4 className="font-bold text-slate-900 flex items-center gap-2 mb-1">
                      <Cpu className="w-4 h-4 text-purple-600" />
                      Intelligence Gateway
                    </h4>
                    <p className="text-slate-500 text-[11px]">
                      Client-side direct BYOK AI calls (Gemini 1.5, OpenAI GPT-4o, Claude 3.5) with local heuristic reasoning fallbacks.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                    <h4 className="font-bold text-slate-900 flex items-center gap-2 mb-1">
                      <Database className="w-4 h-4 text-emerald-600" />
                      Database &amp; Schema
                    </h4>
                    <p className="text-slate-500 text-[11px]">
                      Neon Serverless PostgreSQL orchestrated via Prisma ORM with 22 schema models and RBAC isolation.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                    <h4 className="font-bold text-slate-900 flex items-center gap-2 mb-1">
                      <Shield className="w-4 h-4 text-amber-600" />
                      Security &amp; Isolation
                    </h4>
                    <p className="text-slate-500 text-[11px]">
                      Multi-tenant workspace isolation. Zero shared tables across different institutes or recruiting companies.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'byok' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Bring-Your-Own-Key (BYOK) AI Setup</h1>
                <p className="text-xs text-slate-500 mt-1">
                  Connect Google Gemini, OpenAI, or Anthropic Claude with client-side zero-leak storage.
                </p>
              </div>

              <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
                <p>
                  To eliminate enterprise subscription markups and respect user privacy, SkillBridge AI features a zero-trust BYOK engine.
                </p>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-blue-900 text-xs">
                  <p className="font-bold mb-1">Security Guarantee:</p>
                  <p>
                    Your API keys never leave your browser. They are encrypted and stored in `localStorage` under `skillbridge-app-storage`. Direct HTTPS requests are initiated straight from your browser to Google, OpenAI, or Anthropic.
                  </p>
                </div>

                <h3 className="text-sm font-bold text-slate-900 pt-2">Supported Models</h3>
                <ul className="list-disc list-inside space-y-1 pl-2 text-slate-700">
                  <li><strong>Google Gemini:</strong> `gemini-1.5-flash` or `gemini-1.5-pro` (Recommended for fast structured output).</li>
                  <li><strong>OpenAI:</strong> `gpt-4o-mini` or `gpt-4o`.</li>
                  <li><strong>Anthropic Claude:</strong> `claude-3-5-sonnet`.</li>
                </ul>

                <p className="pt-2">
                  Configure your keys now at <Link href="/settings/ai" className="text-blue-600 font-semibold underline">BYOK Settings Dashboard</Link>.
                </p>
              </div>
            </div>
          )}

          {activeSection === 'verification' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Verified Skill &amp; Builder Protocol</h1>
                <p className="text-xs text-slate-500 mt-1">
                  How SkillBridge AI prevents self-reported resume fraud and establishes cryptographic proof.
                </p>
              </div>

              <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
                <p>
                  Traditional job boards rely on self-reported keywords. SkillBridge AI verifies skills across 5 distinct validation channels:
                </p>

                <div className="space-y-3">
                  <div className="p-3 rounded-lg border border-slate-200 flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-slate-900">1. Code &amp; GitHub Repository Proof</h4>
                      <p className="text-[11px] text-slate-500">Live commits, pull request merged complexity, repository stars, and language distribution analysis.</p>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg border border-slate-200 flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-slate-900">2. Proctored Assessment Score Engine</h4>
                      <p className="text-[11px] text-slate-500">Time-boxed domain benchmark challenges with automated grading against industry hiring thresholds.</p>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg border border-slate-200 flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-slate-900">3. Faculty Co-Signature &amp; Academic Verification</h4>
                      <p className="text-[11px] text-slate-500">University professors and department heads endorse capstone project execution and academic excellence.</p>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg border border-slate-200 flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-slate-900">4. Industry Assignment Sandbox</h4>
                      <p className="text-[11px] text-slate-500">Live company challenges where code passes real automated test suites before interview routing.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'rbac' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Multi-Tenant RBAC Matrix</h1>
                <p className="text-xs text-slate-500 mt-1">
                  Data isolation and role-based permissions across university and enterprise tenants.
                </p>
              </div>

              <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
                <p>
                  Every institute and recruiting company is assigned an isolated workspace ID in PostgreSQL. Institute A cannot inspect candidates or curriculum metrics belonging to Institute B.
                </p>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <h4 className="font-bold text-slate-900 mb-2">Role Permissions Summary:</h4>
                  <ul className="list-disc list-inside space-y-1.5 text-slate-700 text-[11px]">
                    <li><strong>Student:</strong> Read/write personal profile, take assessments, apply to opportunities, run BYOK career copilot.</li>
                    <li><strong>Institute:</strong> Read/manage enrolled student rosters, run curriculum syllabus PDF audits, forecast placement readiness.</li>
                    <li><strong>Industry:</strong> Post opportunities, browse anonymized/verified talent vectors, create assignment challenges, manage kanban pipeline.</li>
                    <li><strong>Admin:</strong> View global platform audit logs, monitor system health, inspect skill demand trends across industries.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'apis' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">REST API Reference</h1>
                <p className="text-xs text-slate-500 mt-1">
                  Core endpoints available for integration, resume parsing, and opportunity feeds.
                </p>
              </div>

              <div className="space-y-4 text-xs">
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <div className="bg-slate-100 px-4 py-2 font-mono text-[11px] flex items-center justify-between">
                    <span className="font-bold text-blue-700">POST /api/upload</span>
                    <span className="text-slate-500">Resume &amp; Syllabus PDF Extractor</span>
                  </div>
                  <div className="p-4 space-y-2 bg-white text-slate-700">
                    <p className="text-xs">Accepts `multipart/form-data` with `.pdf` or `.txt` file. Returns extracted skills, education, certifications, and parsed raw text.</p>
                  </div>
                </div>

                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <div className="bg-slate-100 px-4 py-2 font-mono text-[11px] flex items-center justify-between">
                    <span className="font-bold text-emerald-700">GET /api/students/opportunities</span>
                    <span className="text-slate-500">Curated Jobs &amp; Internships Feed</span>
                  </div>
                  <div className="p-4 space-y-2 bg-white text-slate-700">
                    <p className="text-xs">Returns live verified internships and full-time engineering openings with required skill thresholds and match scores.</p>
                  </div>
                </div>

                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <div className="bg-slate-100 px-4 py-2 font-mono text-[11px] flex items-center justify-between">
                    <span className="font-bold text-purple-700">GET /api/students/profile</span>
                    <span className="text-slate-500">Current Authenticated Student Profile</span>
                  </div>
                  <div className="p-4 space-y-2 bg-white text-slate-700">
                    <p className="text-xs">Returns builder scores, verified skill passport list, evidence proofs, and calculated profile completion status.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 mt-12">
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
