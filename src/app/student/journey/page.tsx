'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { useAppStore } from '@/lib/store';
import {
  Award,
  ShieldCheck,
  Code,
  Calendar,
  ExternalLink,
  PlusCircle,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  Zap,
  Terminal,
  Layers,
  ArrowUpRight,
  FileCheck,
  CheckSquare,
  Users,
  Compass,
  X,
  GitBranch,
  Briefcase,
} from 'lucide-react';
import { VerifiedSkill, BuilderEvidence } from '@/types';

function GithubIcon({ className = 'w-5 h-5' }: { className?: string }) {
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

function LinkedinIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 0 0 1.65-1.65A1.64 1.64 0 0 0 6.46 5.46a1.64 1.64 0 0 0-1.65 1.65c0 .91.74 1.65 1.65 1.65m1.39 9.74v-8.37H5.07v8.37h2.78z" />
    </svg>
  );
}

export default function MyJourneyPage() {
  const { studentProfile, addBuilderEvidence, addVerifiedSkill, isDemoMode } = useAppStore();
  const [activeTab, setActiveTab] = useState<'all' | 'skills' | 'projects' | 'github' | 'linkedin' | 'timeline'>('all');
  const [isAddEvidenceOpen, setIsAddEvidenceOpen] = useState(false);
  const [isAddSkillOpen, setIsAddSkillOpen] = useState(false);

  // Form states for adding evidence
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState<any>('GitHub Repo');
  const [newUrl, setNewUrl] = useState('');
  const [newDesc, setNewDesc] = useState('');

  // Form states for adding skill
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState<any>('Programming');
  const [newSkillLevel, setNewSkillLevel] = useState<any>('Advanced');
  const [newSkillScore, setNewSkillScore] = useState(85);

  const handleCreateEvidence = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    addBuilderEvidence({
      title: newTitle,
      type: newType,
      url: newUrl || 'https://github.com',
      description: newDesc || 'Production repository with tests, documentation, and CI/CD pipelines.',
      impactScore: Math.floor(85 + Math.random() * 12),
    });

    setNewTitle('');
    setNewUrl('');
    setNewDesc('');
    setIsAddEvidenceOpen(false);
  };

  const handleCreateSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName) return;

    addVerifiedSkill(newSkillName, newSkillLevel, newSkillCategory);

    setNewSkillName('');
    setIsAddSkillOpen(false);
  };

  const bScores = studentProfile.builderScores;

  const timelineEvents = [
    {
      month: 'Jan 2026',
      title: 'Real-time Multimodal Vector Retrieval Engine Deployed',
      type: 'Project Upload',
      description: 'Built HNSW vector search serving 40k QPS with sub-15ms p99 latency in C++ and Python.',
      scoreDelta: '+35 Builder Score',
      icon: Code,
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    },
    {
      month: 'Dec 2025',
      title: 'SmartCampus IoT Edge Guardian — 1st Place National Hackathon',
      type: 'Hackathon Win',
      description: 'Led a 4-person engineering squad to build on-device vision models for university energy conservation.',
      scoreDelta: '+91 Impact Score',
      icon: Award,
      badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
    },
    {
      month: 'Nov 2025',
      title: 'TypeScript & Next.js Advanced Competency Certified',
      type: 'Assessment Passed',
      description: 'Scored 86% in rigorous async concurrency and SSR performance evaluations.',
      scoreDelta: 'Verified Badge',
      icon: ShieldCheck,
      badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    },
    {
      month: 'Oct 2025',
      title: 'PyTorch & Transformers Architecture Benchmark Passed',
      type: 'Skill Verification',
      description: 'Verified by Stanford / Apex Faculty Validation board for fine-tuning attention layers.',
      scoreDelta: '88% Score',
      icon: CheckCircle2,
      badgeColor: 'bg-purple-50 text-purple-800 border-purple-200',
    },
    {
      month: 'Aug 2025',
      title: 'Python & FastAPI Expert Diagnostic Assessment',
      type: 'Assessment Passed',
      description: 'Scored 95% across 30 algorithm questions, API rate limiting, and async generators.',
      scoreDelta: '95% Score',
      icon: Award,
      badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    },
  ];

  const githubLanguages = [
    { name: 'Python', percentage: 48, color: 'bg-blue-500' },
    { name: 'TypeScript', percentage: 32, color: 'bg-indigo-500' },
    { name: 'C++', percentage: 12, color: 'bg-purple-500' },
    { name: 'SQL & Others', percentage: 8, color: 'bg-amber-500' },
  ];

  return (
    <PortalLayout>
      <div className="space-y-6">
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                Verified Digital Identity
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-500">Universal Builder Passport</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">My Journey</h1>
            <p className="text-xs text-slate-500 mt-1">
              Your tamper-proof digital portfolio combining verified skills, project evidences, GitHub activity, and growth timeline.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAddSkillOpen(true)}
              className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>Verify New Skill</span>
            </button>
            <button
              onClick={() => setIsAddEvidenceOpen(true)}
              className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-2xs flex items-center gap-1.5"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Add Project Evidence</span>
            </button>
          </div>
        </div>

        {/* Master Builder Score Hero Card */}
        <div className="saas-card p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white border-none shadow-lg">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            {/* Main Score Gauge */}
            <div className="flex items-center gap-6">
              <div className="relative flex items-center justify-center">
                <div className="w-28 h-28 rounded-full border-4 border-blue-500/30 flex items-center justify-center bg-white/5 backdrop-blur-sm shadow-inner">
                  <div className="text-center">
                    <span className="text-3xl font-black text-white">{bScores.overall}</span>
                    <span className="text-[10px] text-blue-300 block font-semibold uppercase">/ 1000</span>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-emerald-300 bg-emerald-950/70 border border-emerald-500/40 px-2.5 py-0.5 rounded-full">
                    Top 5% National Tier
                  </span>
                  <span className="text-xs text-blue-300">Verified by SkillBridge</span>
                </div>
                <h2 className="text-xl font-bold text-white">Master Builder Score</h2>
                <p className="text-xs text-slate-300 max-w-md">
                  Calculated from multi-source verifications across real GitHub commits, production capstones, and timed architectural assessments.
                </p>
              </div>
            </div>

            {/* 5 Builder Sub-Scores Grid */}
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 border-t lg:border-t-0 lg:border-l border-white/15 pt-4 lg:pt-0 lg:pl-8">
              <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-center">
                <span className="text-[10px] font-bold text-blue-300 uppercase block mb-1">Execution</span>
                <div className="text-xl font-bold text-white">{bScores.execution}%</div>
              </div>
              <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-center">
                <span className="text-[10px] font-bold text-blue-300 uppercase block mb-1">Leadership</span>
                <div className="text-xl font-bold text-white">{bScores.leadership}%</div>
              </div>
              <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-center">
                <span className="text-[10px] font-bold text-blue-300 uppercase block mb-1">Innovation</span>
                <div className="text-xl font-bold text-white">{bScores.innovation}%</div>
              </div>
              <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-center">
                <span className="text-[10px] font-bold text-blue-300 uppercase block mb-1">Solving</span>
                <div className="text-xl font-bold text-white">{bScores.problemSolving}%</div>
              </div>
              <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-center">
                <span className="text-[10px] font-bold text-blue-300 uppercase block mb-1">Consistency</span>
                <div className="text-xl font-bold text-white">{bScores.consistency}%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Section Filtering Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto no-scrollbar">
          {[
            { id: 'all', label: 'All Portfolios' },
            { id: 'skills', label: `Verified Skills (${studentProfile.verifiedSkills.length})` },
            { id: 'projects', label: `Projects & Evidences (${studentProfile.evidences.length})` },
            { id: 'github', label: 'GitHub Activity' },
            { id: 'linkedin', label: 'LinkedIn Profile' },
            { id: 'timeline', label: 'Growth Timeline' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 1. Verified Skills Section */}
        {(activeTab === 'all' || activeTab === 'skills') && (
          <div className="saas-card p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <h3 className="text-sm font-bold text-slate-900">Verified Skills Passport</h3>
              </div>
              <span className="text-xs text-slate-500 font-medium">
                {studentProfile.verifiedSkills.length} Verified Competencies
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {studentProfile.verifiedSkills.map((skill) => (
                <div
                  key={skill.id}
                  className="p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-2xs transition-all space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs">{skill.name}</h4>
                      <span className="text-[10px] text-slate-500">{skill.category}</span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {skill.level} ({skill.score}%)
                    </span>
                  </div>

                  <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-emerald-500 h-1.5 rounded-full"
                      style={{ width: `${skill.score}%` }}
                    />
                  </div>

                  <div className="space-y-1.5 text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                    <div className="flex items-center justify-between">
                      <span>Verification Sources:</span>
                      <strong className="text-slate-700 font-medium">
                        {skill.verificationSources?.join(', ') || 'Assessment'}
                      </strong>
                    </div>
                    <div className="flex items-center justify-between font-mono text-[10px]">
                      <span className="text-slate-400">Badge ID:</span>
                      <span className="text-blue-600 font-semibold">{skill.verificationCode}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. Projects & Evidences Section */}
        {(activeTab === 'all' || activeTab === 'projects') && (
          <div className="saas-card p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Code className="w-5 h-5 text-blue-600" />
                <h3 className="text-sm font-bold text-slate-900">Project Evidences &amp; Capstones</h3>
              </div>
              <span className="text-xs text-slate-500 font-medium">
                {studentProfile.evidences.length} Verified Submissions
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {studentProfile.evidences.map((ev) => (
                <div
                  key={ev.id}
                  className="p-5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 uppercase">
                          {ev.type}
                        </span>
                        <h4 className="font-bold text-slate-900 text-sm mt-1">{ev.title}</h4>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                          {ev.impactScore}/100 Impact
                        </span>
                        <span className="text-[10px] text-slate-400 block mt-0.5">{ev.date}</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{ev.description}</p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <span className="text-[10px] font-semibold text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Verified Evidence
                    </span>
                    {ev.url && (
                      <a
                        href={ev.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1"
                      >
                        <span>View Repository</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. GitHub Section */}
        {(activeTab === 'all' || activeTab === 'github') && (
          <div className="saas-card p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <GithubIcon className="w-5 h-5 text-slate-900" />
                <h3 className="text-sm font-bold text-slate-900">Connected GitHub Profile</h3>
              </div>
              <a
                href={studentProfile.professional.githubUrl || 'https://github.com'}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-blue-600 hover:underline inline-flex items-center gap-1 font-semibold"
              >
                <span>github.com/aarav-sharma-builder</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-center">
                <span className="text-slate-500 text-xs font-medium block">Public Repositories</span>
                <strong className="text-2xl font-bold text-slate-900">
                  {studentProfile.professional.totalProjects || 14}
                </strong>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-center">
                <span className="text-slate-500 text-xs font-medium block">Yearly Commits</span>
                <strong className="text-2xl font-bold text-blue-600">348 Commits</strong>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-center">
                <span className="text-slate-500 text-xs font-medium block">Open Source PRs</span>
                <strong className="text-2xl font-bold text-emerald-600">
                  {studentProfile.professional.openSourceContributions || 48} PRs
                </strong>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-center">
                <span className="text-slate-500 text-xs font-medium block">Growth Velocity</span>
                <strong className="text-2xl font-bold text-purple-600">+38% MoM</strong>
              </div>
            </div>

            {/* Languages breakdown */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold text-slate-700 block">Top Coding Languages Breakdown</span>
              <div className="w-full h-3 rounded-full bg-slate-100 flex overflow-hidden">
                {githubLanguages.map((lang) => (
                  <div
                    key={lang.name}
                    className={`${lang.color} h-full`}
                    style={{ width: `${lang.percentage}%` }}
                    title={`${lang.name}: ${lang.percentage}%`}
                  />
                ))}
              </div>
              <div className="flex flex-wrap gap-4 text-xs text-slate-600 pt-1">
                {githubLanguages.map((lang) => (
                  <div key={lang.name} className="flex items-center gap-1.5">
                    <div className={`w-2.5 h-2.5 rounded-full ${lang.color}`} />
                    <span>{lang.name} ({lang.percentage}%)</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 4. LinkedIn Section */}
        {(activeTab === 'all' || activeTab === 'linkedin') && (
          <div className="saas-card p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <LinkedinIcon className="w-5 h-5 text-blue-700" />
                <h3 className="text-sm font-bold text-slate-900">Verified LinkedIn Profile Data</h3>
              </div>
              <span className="text-xs text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                OAuth Synced
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-slate-400 font-semibold uppercase text-[10px] block">Headline</span>
                <p className="font-semibold text-slate-900 mt-0.5">
                  {studentProfile.headline || 'Aspiring AI Systems Engineer | Full-Stack & Distributed Systems Builder'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="text-slate-400 font-semibold uppercase text-[10px] block">Education</span>
                  <strong className="text-slate-900 block mt-0.5">
                    {studentProfile.academic.college}
                  </strong>
                  <span className="text-slate-500">
                    B.Tech {studentProfile.academic.department} • CGPA {studentProfile.academic.cgpa}
                  </span>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="text-slate-400 font-semibold uppercase text-[10px] block">Certifications</span>
                  <strong className="text-slate-900 block mt-0.5">DeepLearning.AI &amp; AWS Specialty</strong>
                  <span className="text-slate-500">2 Verified Credentials linked</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 5. Growth Timeline Section */}
        {(activeTab === 'all' || activeTab === 'timeline') && (
          <div className="saas-card p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-indigo-600" />
                <h3 className="text-sm font-bold text-slate-900">Month-by-Month Verified Growth Timeline</h3>
              </div>
              <span className="text-xs text-slate-500">Chronological Evolution</span>
            </div>

            <div className="space-y-4 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {timelineEvents.map((evt, idx) => {
                const Icon = evt.icon;
                return (
                  <div key={idx} className="relative pl-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group">
                    <div className="absolute left-2 top-1 w-5 h-5 rounded-full bg-white border-2 border-blue-600 flex items-center justify-center -translate-x-1/2">
                      <div className="w-2 h-2 rounded-full bg-blue-600" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">{evt.title}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${evt.badgeColor}`}>
                          {evt.type}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600">{evt.description}</p>
                    </div>

                    <div className="text-left sm:text-right shrink-0">
                      <span className="text-xs font-bold text-emerald-600 block">{evt.scoreDelta}</span>
                      <span className="text-[10px] text-slate-400">{evt.month}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Add Project Evidence Modal */}
      {isAddEvidenceOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
              <h3 className="font-bold text-slate-900 text-sm">Add New Project Evidence</h3>
              <button onClick={() => setIsAddEvidenceOpen(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleCreateEvidence} className="p-6 space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Project Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Distributed Token Bucket Rate Limiter"
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-medium"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Evidence Type</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                  >
                    <option value="GitHub Repo">GitHub Repo</option>
                    <option value="Live Product">Live Product</option>
                    <option value="Research Paper">Research Paper</option>
                    <option value="Hackathon Win">Hackathon Win</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">URL / Link</label>
                  <input
                    type="url"
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    placeholder="https://github.com/..."
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                  />
                </div>
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Description &amp; Architecture</label>
                <textarea
                  rows={3}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Describe your role, tech stack, and key technical achievements..."
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddEvidenceOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-2xs"
                >
                  Save to Passport
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add / Verify Skill Modal */}
      {isAddSkillOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
              <h3 className="font-bold text-slate-900 text-sm">Add Verified Skill Competency</h3>
              <button onClick={() => setIsAddSkillOpen(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleCreateSkill} className="p-6 space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Skill Name</label>
                <input
                  type="text"
                  required
                  value={newSkillName}
                  onChange={(e) => setNewSkillName(e.target.value)}
                  placeholder="e.g. Docker, Redis, Kubernetes"
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-medium"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Category</label>
                  <select
                    value={newSkillCategory}
                    onChange={(e) => setNewSkillCategory(e.target.value as any)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                  >
                    <option value="Programming">Programming</option>
                    <option value="AI & ML">AI & ML</option>
                    <option value="Database">Database</option>
                    <option value="DevOps">DevOps</option>
                    <option value="Cloud">Cloud</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Level</label>
                  <select
                    value={newSkillLevel}
                    onChange={(e) => setNewSkillLevel(e.target.value as any)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                  >
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>
              </div>
              <div>
                <div className="flex justify-between font-semibold text-slate-700 mb-1">
                  <span>Competency Score</span>
                  <span className="text-blue-600 font-bold">{newSkillScore}%</span>
                </div>
                <input
                  type="range"
                  min="60"
                  max="100"
                  value={newSkillScore}
                  onChange={(e) => setNewSkillScore(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddSkillOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-2xs"
                >
                  Verify Skill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </PortalLayout>
  );
}
