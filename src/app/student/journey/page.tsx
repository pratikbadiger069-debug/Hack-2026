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
  const { studentProfile, addBuilderEvidence, addVerifiedSkill } = useAppStore();
  const [activeFilter, setActiveFilter] = useState<'all' | 'skills' | 'projects' | 'github' | 'timeline'>('all');
  const [isAddEvidenceOpen, setIsAddEvidenceOpen] = useState(false);
  const [isAddSkillOpen, setIsAddSkillOpen] = useState(false);

  // Modal forms
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState<any>('GitHub Repo');
  const [newUrl, setNewUrl] = useState('');
  const [newDesc, setNewDesc] = useState('');

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
    },
    {
      month: 'Dec 2025',
      title: 'SmartCampus IoT Edge Guardian — 1st Place National Hackathon',
      type: 'Hackathon Win',
      description: 'Led a 4-person engineering squad to build on-device vision models for university energy conservation.',
      scoreDelta: '+91 Impact Score',
    },
    {
      month: 'Nov 2025',
      title: 'TypeScript & Next.js Advanced Competency Certified',
      type: 'Assessment Passed',
      description: 'Scored 86% in rigorous async concurrency and SSR performance evaluations.',
      scoreDelta: 'Verified Badge',
    },
    {
      month: 'Aug 2025',
      title: 'Python & FastAPI Expert Diagnostic Assessment',
      type: 'Assessment Passed',
      description: 'Scored 95% across 30 algorithm questions, API rate limiting, and async generators.',
      scoreDelta: '95% Score',
    },
  ];

  const githubLanguages = [
    { name: 'Python', percentage: 48, color: 'bg-[#D97706]' },
    { name: 'TypeScript', percentage: 32, color: 'bg-[#2563EB]' },
    { name: 'C++', percentage: 12, color: 'bg-[#1F1F1F]' },
    { name: 'SQL & Others', percentage: 8, color: 'bg-[#16A34A]' },
  ];

  return (
    <PortalLayout>
      <div className="space-y-12 max-w-5xl mx-auto pb-16">
        {/* Header */}
        <section className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#F0EEE6] text-[#1F1F1F] border border-[#ECEAE4] inline-flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
                Digital Proof &amp; Story
              </span>
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#1F1F1F] mt-2">
                My Journey
              </h1>
              <p className="text-base text-[#6B6B6B] mt-1">
                Your skills. Your projects. Your growth.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsAddSkillOpen(true)}
                className="px-4 py-2 text-xs font-semibold text-[#1F1F1F] bg-[#FFFFFF] border border-[#ECEAE4] hover:bg-[#F4F2EB] rounded-xl transition-all shadow-2xs btn-anthropic"
              >
                + Verify Skill
              </button>
              <button
                onClick={() => setIsAddEvidenceOpen(true)}
                className="px-4 py-2 text-xs font-semibold text-[#FAF9F5] bg-[#1F1F1F] hover:bg-[#333333] rounded-xl transition-all shadow-2xs btn-anthropic flex items-center gap-1.5"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Add Project Evidence</span>
              </button>
            </div>
          </div>
        </section>

        {/* Builder Score & Velocity Story Hero */}
        <section className="p-8 bg-[#FFFFFF] rounded-3xl border border-[#ECEAE4] shadow-xs space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-2xl bg-[#F8F7F3] border border-[#ECEAE4] flex flex-col items-center justify-center text-center shrink-0">
                <span className="text-3xl font-black text-[#1F1F1F]">{bScores.overall}</span>
                <span className="text-[10px] text-[#6B6B6B] font-semibold uppercase">/ 1000</span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#16A34A] bg-[#F0FDF4] border border-[#DCFCE7] px-2.5 py-0.5 rounded-full">
                    Top 5% National Tier
                  </span>
                  <span className="text-xs text-[#6B6B6B]">Master Builder Rating</span>
                </div>
                <h2 className="text-xl font-bold text-[#1F1F1F]">Verified Proof Index</h2>
                <p className="text-xs text-[#6B6B6B] max-w-md leading-relaxed">
                  Consolidated multi-source score calculated from your real GitHub commits, production capstones, and faculty validations.
                </p>
              </div>
            </div>

            {/* Sub-Scores */}
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 pt-4 lg:pt-0 border-t lg:border-t-0 lg:border-l border-[#ECEAE4] lg:pl-8">
              <div className="p-3 bg-[#F8F7F3] rounded-xl border border-[#ECEAE4] text-center">
                <span className="text-[10px] text-[#6B6B6B] block">Execution</span>
                <strong className="text-base font-bold text-[#1F1F1F]">{bScores.execution}%</strong>
              </div>
              <div className="p-3 bg-[#F8F7F3] rounded-xl border border-[#ECEAE4] text-center">
                <span className="text-[10px] text-[#6B6B6B] block">Leadership</span>
                <strong className="text-base font-bold text-[#1F1F1F]">{bScores.leadership}%</strong>
              </div>
              <div className="p-3 bg-[#F8F7F3] rounded-xl border border-[#ECEAE4] text-center">
                <span className="text-[10px] text-[#6B6B6B] block">Innovation</span>
                <strong className="text-base font-bold text-[#1F1F1F]">{bScores.innovation}%</strong>
              </div>
              <div className="p-3 bg-[#F8F7F3] rounded-xl border border-[#ECEAE4] text-center">
                <span className="text-[10px] text-[#6B6B6B] block">Solving</span>
                <strong className="text-base font-bold text-[#1F1F1F]">{bScores.problemSolving}%</strong>
              </div>
              <div className="p-3 bg-[#F8F7F3] rounded-xl border border-[#ECEAE4] text-center">
                <span className="text-[10px] text-[#6B6B6B] block">Consistency</span>
                <strong className="text-base font-bold text-[#1F1F1F]">{bScores.consistency}%</strong>
              </div>
            </div>
          </div>
        </section>

        {/* Filter Navigation */}
        <div className="flex items-center gap-2 border-b border-[#ECEAE4] pb-3 overflow-x-auto no-scrollbar">
          {[
            { id: 'all', label: 'All Proof' },
            { id: 'skills', label: `Verified Skills (${studentProfile.verifiedSkills.length})` },
            { id: 'projects', label: `Projects & Capstones (${studentProfile.evidences.length})` },
            { id: 'github', label: 'GitHub Activity' },
            { id: 'timeline', label: 'Growth Timeline' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all btn-anthropic ${
                activeFilter === tab.id
                  ? 'bg-[#1F1F1F] text-[#FAF9F5] shadow-2xs'
                  : 'bg-[#FFFFFF] text-[#6B6B6B] hover:bg-[#F5F3EB] border border-[#ECEAE4]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 1. Verified Skills Grid */}
        {(activeFilter === 'all' || activeFilter === 'skills') && (
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-[#1F1F1F] flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#16A34A]" />
                Verified Skills
              </h3>
              <span className="text-xs text-[#6B6B6B]">Multi-source verified</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {studentProfile.verifiedSkills.map((skill) => (
                <div
                  key={skill.id}
                  className="p-5 bg-[#FFFFFF] rounded-2xl border border-[#ECEAE4] hover:border-[#DDD9D0] transition-all space-y-3 shadow-2xs"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-[#1F1F1F]">{skill.name}</h4>
                      <span className="text-xs text-[#6B6B6B]">{skill.category}</span>
                    </div>
                    <span className="text-xs font-bold text-[#16A34A] bg-[#F0FDF4] px-2 py-0.5 rounded-full border border-[#DCFCE7]">
                      {skill.score}%
                    </span>
                  </div>

                  <div className="w-full bg-[#F0EEE6] rounded-full h-1.5 overflow-hidden">
                    <div className="bg-[#16A34A] h-1.5 rounded-full" style={{ width: `${skill.score}%` }} />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-[#6B6B6B] pt-1">
                    <span>{skill.level}</span>
                    <span className="font-mono text-[10px] text-[#D97706]">{skill.verificationCode}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 2. Projects & Capstones */}
        {(activeFilter === 'all' || activeFilter === 'projects') && (
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-[#1F1F1F] flex items-center gap-2">
                <Code className="w-5 h-5 text-[#2563EB]" />
                Projects &amp; Capstones
              </h3>
              <span className="text-xs text-[#6B6B6B]">{studentProfile.evidences.length} Verified</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {studentProfile.evidences.map((ev) => (
                <div
                  key={ev.id}
                  className="p-6 bg-[#FFFFFF] rounded-2xl border border-[#ECEAE4] hover:border-[#DDD9D0] transition-all space-y-3 shadow-2xs flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#F0EEE6] text-[#1F1F1F] uppercase tracking-wide">
                          {ev.type}
                        </span>
                        <h4 className="text-base font-bold text-[#1F1F1F] mt-1.5">{ev.title}</h4>
                      </div>
                      <span className="text-xs font-bold text-[#16A34A] bg-[#F0FDF4] px-2.5 py-0.5 rounded-full border border-[#DCFCE7]">
                        {ev.impactScore}/100 Impact
                      </span>
                    </div>
                    <p className="text-xs text-[#6B6B6B] leading-relaxed">{ev.description}</p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-[#ECEAE4] text-xs">
                    <span className="text-[#6B6B6B]">{ev.date}</span>
                    {ev.url && (
                      <a
                        href={ev.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-semibold text-[#1F1F1F] hover:text-[#D97706] inline-flex items-center gap-1"
                      >
                        <span>View Repository</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 3. GitHub Activity Story */}
        {(activeFilter === 'all' || activeFilter === 'github') && (
          <section className="p-8 bg-[#FFFFFF] rounded-3xl border border-[#ECEAE4] space-y-6 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#ECEAE4]">
              <div className="flex items-center gap-2.5">
                <GithubIcon className="w-5 h-5 text-[#1F1F1F]" />
                <h3 className="text-base font-bold text-[#1F1F1F]">Connected GitHub Activity</h3>
              </div>
              <a
                href={studentProfile.professional.githubUrl || 'https://github.com'}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-[#2563EB] hover:underline font-semibold inline-flex items-center gap-1"
              >
                <span>github.com/aarav-sharma-builder</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 bg-[#F8F7F3] rounded-2xl border border-[#ECEAE4] text-center">
                <span className="text-xs text-[#6B6B6B] block">Repositories</span>
                <strong className="text-xl font-bold text-[#1F1F1F]">{studentProfile.professional.totalProjects || 14}</strong>
              </div>
              <div className="p-4 bg-[#F8F7F3] rounded-2xl border border-[#ECEAE4] text-center">
                <span className="text-xs text-[#6B6B6B] block">Yearly Commits</span>
                <strong className="text-xl font-bold text-[#1F1F1F]">348</strong>
              </div>
              <div className="p-4 bg-[#F8F7F3] rounded-2xl border border-[#ECEAE4] text-center">
                <span className="text-xs text-[#6B6B6B] block">Open Source PRs</span>
                <strong className="text-xl font-bold text-[#1F1F1F]">48</strong>
              </div>
              <div className="p-4 bg-[#F8F7F3] rounded-2xl border border-[#ECEAE4] text-center">
                <span className="text-xs text-[#6B6B6B] block">Growth Velocity</span>
                <strong className="text-xl font-bold text-[#16A34A]">+38% MoM</strong>
              </div>
            </div>

            {/* Language Breakdown */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-[#1F1F1F]">Language Breakdown</span>
              <div className="w-full h-2 rounded-full bg-[#F0EEE6] flex overflow-hidden">
                {githubLanguages.map((lang) => (
                  <div key={lang.name} className={`${lang.color} h-full`} style={{ width: `${lang.percentage}%` }} />
                ))}
              </div>
              <div className="flex flex-wrap gap-4 text-xs text-[#6B6B6B] pt-1">
                {githubLanguages.map((lang) => (
                  <span key={lang.name}>{lang.name} ({lang.percentage}%)</span>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 4. Growth Timeline */}
        {(activeFilter === 'all' || activeFilter === 'timeline') && (
          <section className="p-8 bg-[#FFFFFF] rounded-3xl border border-[#ECEAE4] space-y-6 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#ECEAE4]">
              <div className="flex items-center gap-2.5">
                <Calendar className="w-5 h-5 text-[#D97706]" />
                <h3 className="text-base font-bold text-[#1F1F1F]">Growth Timeline</h3>
              </div>
              <span className="text-xs text-[#6B6B6B]">Chronological story</span>
            </div>

            <div className="space-y-4 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#ECEAE4]">
              {timelineEvents.map((evt, idx) => (
                <div key={idx} className="relative pl-8 space-y-1">
                  <div className="absolute left-1.5 top-1.5 w-3.5 h-3.5 rounded-full bg-[#FFFFFF] border-2 border-[#D97706]" />
                  <div className="flex items-center justify-between text-xs">
                    <strong className="text-sm font-bold text-[#1F1F1F]">{evt.title}</strong>
                    <span className="text-[#6B6B6B]">{evt.month}</span>
                  </div>
                  <p className="text-xs text-[#6B6B6B] leading-relaxed">{evt.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Add Project Evidence Modal */}
      {isAddEvidenceOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg bg-[#FFFFFF] rounded-2xl border border-[#ECEAE4] p-6 space-y-4 shadow-xl text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-[#ECEAE4]">
              <h3 className="font-bold text-sm text-[#1F1F1F]">Add Project Evidence</h3>
              <button onClick={() => setIsAddEvidenceOpen(false)} className="p-1 text-[#6B6B6B] hover:text-[#1F1F1F]">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleCreateEvidence} className="space-y-4">
              <div>
                <label className="font-semibold text-[#1F1F1F] block mb-1">Project Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Distributed Token Bucket Rate Limiter"
                  className="w-full p-2.5 bg-[#F8F7F3] border border-[#ECEAE4] rounded-xl text-[#1F1F1F] focus:outline-none focus:border-[#D97706]"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-[#1F1F1F] block mb-1">Type</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                    className="w-full p-2.5 bg-[#F8F7F3] border border-[#ECEAE4] rounded-xl text-[#1F1F1F]"
                  >
                    <option value="GitHub Repo">GitHub Repo</option>
                    <option value="Live Product">Live Product</option>
                    <option value="Research Paper">Research Paper</option>
                    <option value="Hackathon Win">Hackathon Win</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-[#1F1F1F] block mb-1">URL / Link</label>
                  <input
                    type="url"
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    placeholder="https://github.com/..."
                    className="w-full p-2.5 bg-[#F8F7F3] border border-[#ECEAE4] rounded-xl text-[#1F1F1F]"
                  />
                </div>
              </div>
              <div>
                <label className="font-semibold text-[#1F1F1F] block mb-1">Description</label>
                <textarea
                  rows={3}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Describe your architecture and technical achievements..."
                  className="w-full p-2.5 bg-[#F8F7F3] border border-[#ECEAE4] rounded-xl text-[#1F1F1F]"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t border-[#ECEAE4]">
                <button
                  type="button"
                  onClick={() => setIsAddEvidenceOpen(false)}
                  className="px-4 py-2 text-[#6B6B6B] hover:text-[#1F1F1F]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#1F1F1F] text-[#FAF9F5] rounded-xl font-semibold hover:bg-[#333333] shadow-2xs btn-anthropic"
                >
                  Save to Passport
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Skill Modal */}
      {isAddSkillOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="w-full max-w-md bg-[#FFFFFF] rounded-2xl border border-[#ECEAE4] p-6 space-y-4 shadow-xl text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-[#ECEAE4]">
              <h3 className="font-bold text-sm text-[#1F1F1F]">Add Verified Skill</h3>
              <button onClick={() => setIsAddSkillOpen(false)} className="p-1 text-[#6B6B6B] hover:text-[#1F1F1F]">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleCreateSkill} className="space-y-4">
              <div>
                <label className="font-semibold text-[#1F1F1F] block mb-1">Skill Name</label>
                <input
                  type="text"
                  required
                  value={newSkillName}
                  onChange={(e) => setNewSkillName(e.target.value)}
                  placeholder="e.g. Docker, Redis, Kubernetes"
                  className="w-full p-2.5 bg-[#F8F7F3] border border-[#ECEAE4] rounded-xl text-[#1F1F1F]"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-[#1F1F1F] block mb-1">Category</label>
                  <select
                    value={newSkillCategory}
                    onChange={(e) => setNewSkillCategory(e.target.value as any)}
                    className="w-full p-2.5 bg-[#F8F7F3] border border-[#ECEAE4] rounded-xl text-[#1F1F1F]"
                  >
                    <option value="Programming">Programming</option>
                    <option value="AI & ML">AI & ML</option>
                    <option value="Database">Database</option>
                    <option value="DevOps">DevOps</option>
                    <option value="Cloud">Cloud</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-[#1F1F1F] block mb-1">Level</label>
                  <select
                    value={newSkillLevel}
                    onChange={(e) => setNewSkillLevel(e.target.value as any)}
                    className="w-full p-2.5 bg-[#F8F7F3] border border-[#ECEAE4] rounded-xl text-[#1F1F1F]"
                  >
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t border-[#ECEAE4]">
                <button
                  type="button"
                  onClick={() => setIsAddSkillOpen(false)}
                  className="px-4 py-2 text-[#6B6B6B] hover:text-[#1F1F1F]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#1F1F1F] text-[#FAF9F5] rounded-xl font-semibold hover:bg-[#333333] shadow-2xs btn-anthropic"
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
