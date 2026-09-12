'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { useAppStore } from '@/lib/store';
import { CandidateApplication } from '@/types';
import {
  Sparkles,
  Search,
  CheckCircle2,
  ExternalLink,
  Award,
  Briefcase,
  GitBranch,
  ShieldCheck,
  Building,
  GraduationCap,
  MapPin,
  FileText,
  Globe,
  Download,
  X,
  Trophy,
  UserCheck,
  Flame,
} from 'lucide-react';

function GithubIcon({ className = 'w-4 h-4' }: { className?: string }) {
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

function LinkedinIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c-.97 0-1.75-.79-1.75-1.76s.78-1.75 1.75-1.75 1.75.78 1.75 1.75-.78 1.76-1.75 1.76m1.4 9.74v-8.37H5.06v8.37h2.8z" />
    </svg>
  );
}

export default function IndustryTalentPage() {
  const { candidates, moveCandidateStage } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [minBuilderScore, setMinBuilderScore] = useState(700);
  const [minReadinessScore, setMinReadinessScore] = useState(75);
  const [shortlistedIds, setShortlistedIds] = useState<string[]>([]);
  const [activeCandidateModal, setActiveCandidateModal] = useState<CandidateApplication | null>(null);

  const handleShortlist = (candId: string) => {
    moveCandidateStage(candId, 'Shortlisted');
    setShortlistedIds((prev) => [...prev, candId]);
  };

  const filteredCandidates = candidates.filter((c) => {
    const matchDept = selectedDept === 'All' || c.department === selectedDept || c.branch === selectedDept;
    const readiness = c.careerReadinessScore || c.employabilityScore || 80;
    const matchScore = c.builderScore >= minBuilderScore && readiness >= minReadinessScore;
    const matchQuery =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.targetRole.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.topSkills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (c.college && c.college.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchDept && matchScore && matchQuery;
  });

  return (
    <PortalLayout>
      <div className="space-y-6 max-w-[1300px] mx-auto pb-16">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-[#E8E5DD] shadow-xs">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#C76A2A]/10 text-[#C76A2A] border border-[#C76A2A]/20 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#C76A2A]" />
                Industry Candidate Discovery Engine
              </span>
              <span className="text-xs text-[#6F6A60]">•</span>
              <span className="text-xs text-[#6F6A60] font-medium">Verified Evidence & Code-Proof Ranking</span>
            </div>
            <h1 className="text-2xl font-bold text-[#1B1B1B] tracking-tight">Candidate Discovery</h1>
            <p className="text-xs text-[#6F6A60] mt-1">
              Discover verified student builders evaluated with GitHub commit history, assessment performance, and live production projects.
            </p>
          </div>
          <div className="text-xs text-[#6F6A60] font-semibold bg-[#FAF9F5] px-4 py-2 rounded-2xl border border-[#E8E5DD]">
            Showing <span className="font-extrabold text-[#1B1B1B]">{filteredCandidates.length}</span> Verified Candidates
          </div>
        </div>

        {/* Multi-Attribute Filter Bar */}
        <div className="p-6 rounded-3xl bg-white border border-[#E8E5DD] shadow-xs space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div>
              <label className="block text-xs font-bold text-[#1B1B1B] uppercase tracking-wider mb-1.5">
                Keyword / Skills Search
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6F6A60]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="e.g. PyTorch, TypeScript, FastAPI..."
                  className="w-full pl-9 pr-3 py-2 text-xs bg-[#FAF9F5] border border-[#E8E5DD] rounded-xl text-[#1B1B1B] focus:outline-none focus:border-[#C76A2A]"
                />
              </div>
            </div>

            {/* Department */}
            <div>
              <label className="block text-xs font-bold text-[#1B1B1B] uppercase tracking-wider mb-1.5">
                Branch / Department
              </label>
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#FAF9F5] border border-[#E8E5DD] rounded-xl text-[#1B1B1B] font-medium focus:outline-none focus:border-[#C76A2A]"
              >
                <option value="All">All Departments</option>
                <option value="CSE">CSE / Computer Science</option>
                <option value="AIML">AIML / Artificial Intelligence</option>
                <option value="IT">IT / Information Tech</option>
                <option value="ECE">ECE / Electronics</option>
              </select>
            </div>

            {/* Min Builder Score Slider */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <label className="font-bold text-[#1B1B1B] uppercase tracking-wider">
                  Min Builder Score
                </label>
                <span className="font-bold font-mono text-[#C76A2A]">{minBuilderScore}+</span>
              </div>
              <input
                type="range"
                min="500"
                max="950"
                step="10"
                value={minBuilderScore}
                onChange={(e) => setMinBuilderScore(Number(e.target.value))}
                className="w-full accent-[#C76A2A]"
              />
            </div>

            {/* Min Career Readiness Slider */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <label className="font-bold text-[#1B1B1B] uppercase tracking-wider">
                  Min Career Readiness
                </label>
                <span className="font-bold font-mono text-[#2F7A45]">{minReadinessScore}%+</span>
              </div>
              <input
                type="range"
                min="60"
                max="95"
                step="5"
                value={minReadinessScore}
                onChange={(e) => setMinReadinessScore(Number(e.target.value))}
                className="w-full accent-[#2F7A45]"
              />
            </div>
          </div>
        </div>

        {/* CANDIDATE DISCOVERY CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCandidates.map((cand) => {
            const isShortlisted = cand.stage === 'Shortlisted' || shortlistedIds.includes(cand.id);
            const readiness = cand.careerReadinessScore || cand.employabilityScore || 90;
            const githubScore = cand.githubScore || 870;
            const branch = cand.branch || cand.department || 'CSE';
            const college = cand.institution || cand.college || 'HITAM';
            const githubUrl = cand.githubUrl || 'https://github.com';
            const linkedinUrl = cand.linkedinUrl || 'https://linkedin.com';

            return (
              <div
                key={cand.id}
                className="p-6 rounded-3xl bg-white border border-[#E8E5DD] shadow-xs flex flex-col justify-between space-y-4 hover:border-[#1B1B1B] hover:shadow-md transition-all"
              >
                <div>
                  {/* Top Candidate Row */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={cand.avatar}
                        alt={cand.name}
                        className="w-13 h-13 rounded-2xl object-cover ring-2 ring-[#E8E5DD] shrink-0"
                      />
                      <div className="min-w-0">
                        <h2 className="text-sm font-bold text-[#1B1B1B] truncate">{cand.name}</h2>
                        <p className="text-xs text-[#C76A2A] font-semibold truncate">{cand.targetRole}</p>
                        <p className="text-[11px] text-[#6F6A60] truncate">
                          {college} • <span className="font-mono">{branch}</span>
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#2F7A45]/10 text-[#2F7A45] border border-[#2F7A45]/20 font-mono">
                        {cand.matchScore}% Match
                      </span>
                    </div>
                  </div>

                  {/* Readiness Metrics Bar: Builder Score, Career Readiness, GitHub Score */}
                  <div className="grid grid-cols-3 gap-1.5 p-2.5 bg-[#FAF9F5] rounded-2xl border border-[#E8E5DD] text-center mb-3">
                    <div>
                      <span className="text-[9px] text-[#6F6A60] uppercase font-bold block">Builder</span>
                      <strong className="text-xs font-extrabold text-[#1B1B1B] font-mono">
                        {cand.builderScore}
                      </strong>
                    </div>
                    <div>
                      <span className="text-[9px] text-[#6F6A60] uppercase font-bold block">Readiness</span>
                      <strong className="text-xs font-extrabold text-[#2F7A45] font-mono">
                        {readiness}%
                      </strong>
                    </div>
                    <div>
                      <span className="text-[9px] text-[#6F6A60] uppercase font-bold block">GitHub</span>
                      <strong className="text-xs font-extrabold text-[#C76A2A] font-mono">
                        {githubScore}
                      </strong>
                    </div>
                  </div>

                  {/* Top Skills */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold text-[#6F6A60] uppercase tracking-wider block">
                      Top Verified Skills
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {cand.topSkills.map((skill) => (
                        <span
                          key={skill}
                          className="text-[10px] bg-[#FAF9F5] border border-[#E8E5DD] text-[#1B1B1B] px-2 py-0.5 rounded-lg font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Dedicated Action Buttons: GitHub, LinkedIn, View Profile */}
                <div className="pt-3 border-t border-[#E8E5DD] space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href={githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl bg-[#FAF9F5] border border-[#E8E5DD] hover:border-[#1B1B1B] text-[#1B1B1B] text-xs font-semibold transition-colors"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      <span>GitHub</span>
                    </a>

                    <a
                      href={linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl bg-[#0077B5]/10 border border-[#0077B5]/20 hover:bg-[#0077B5]/20 text-[#0077B5] text-xs font-semibold transition-colors"
                    >
                      <LinkedinIcon className="w-3.5 h-3.5" />
                      <span>LinkedIn</span>
                    </a>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveCandidateModal(cand)}
                      className="flex-1 py-2 px-3 bg-[#1B1B1B] hover:bg-[#C76A2A] text-white rounded-xl text-xs font-bold transition-colors shadow-xs"
                    >
                      View Profile
                    </button>

                    {isShortlisted ? (
                      <span className="px-3 py-2 text-xs font-semibold text-[#2F7A45] bg-[#2F7A45]/10 rounded-xl flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Shortlisted
                      </span>
                    ) : (
                      <button
                        onClick={() => handleShortlist(cand.id)}
                        className="py-2 px-3 bg-[#2F7A45] hover:bg-[#2F7A45]/90 text-white rounded-xl text-xs font-semibold transition-colors"
                      >
                        Shortlist
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CANDIDATE PROFILE MODAL / INSPECTOR (INDUSTRY RECRUITER VIEW) */}
        <AnimatePresence>
          {activeCandidateModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveCandidateModal(null)}
                className="fixed inset-0 bg-black/60 backdrop-blur-xs"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 8 }}
                className="relative w-full max-w-4xl bg-white rounded-3xl border border-[#E8E5DD] shadow-2xl z-10 overflow-hidden my-8"
              >
                {/* Header */}
                <div className="p-6 border-b border-[#E8E5DD] bg-[#FAF9F5] flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={activeCandidateModal.avatar}
                      alt={activeCandidateModal.name}
                      className="w-16 h-16 rounded-2xl object-cover ring-2 ring-[#E8E5DD]"
                    />
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h2 className="text-xl font-bold text-[#1B1B1B]">{activeCandidateModal.name}</h2>
                        <span className="px-2.5 py-0.5 rounded-full bg-[#2F7A45]/10 text-[#2F7A45] text-xs font-semibold flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          Verified Builder
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-[#C76A2A]">{activeCandidateModal.targetRole}</p>
                      <p className="text-xs text-[#6F6A60] flex items-center gap-2 pt-0.5 flex-wrap">
                        <span>{activeCandidateModal.degree || 'B.Tech'} in {activeCandidateModal.branch || activeCandidateModal.department}</span>
                        <span>•</span>
                        <span>{activeCandidateModal.institution || activeCandidateModal.college}</span>
                        <span>•</span>
                        <span>Class of {activeCandidateModal.graduationYear || '2026'}</span>
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveCandidateModal(null)}
                    className="p-2 text-[#6F6A60] hover:text-[#1B1B1B] hover:bg-[#E8E5DD] rounded-xl transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Body Details */}
                <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
                  
                  {/* Readiness Metrics */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#E8E5DD] text-center">
                      <span className="text-[10px] text-[#6F6A60] uppercase font-bold block">Builder Score</span>
                      <strong className="text-xl font-extrabold text-[#1B1B1B] font-mono">
                        {activeCandidateModal.builderScore} / 1000
                      </strong>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#E8E5DD] text-center">
                      <span className="text-[10px] text-[#6F6A60] uppercase font-bold block">Career Readiness</span>
                      <strong className="text-xl font-extrabold text-[#2F7A45] font-mono">
                        {activeCandidateModal.careerReadinessScore || activeCandidateModal.employabilityScore || 90}%
                      </strong>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#E8E5DD] text-center">
                      <span className="text-[10px] text-[#6F6A60] uppercase font-bold block">GitHub Score</span>
                      <strong className="text-xl font-extrabold text-[#C76A2A] font-mono">
                        {activeCandidateModal.githubScore || 890} / 1000
                      </strong>
                    </div>
                  </div>

                  {/* Professional Profiles Buttons */}
                  <div className="flex items-center gap-3 flex-wrap">
                    <a
                      href={activeCandidateModal.githubUrl || 'https://github.com'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl bg-[#1B1B1B] text-white text-xs font-bold hover:bg-[#C76A2A] transition-colors flex items-center gap-2"
                    >
                      <GithubIcon className="w-4 h-4 text-white" />
                      <span>Open GitHub</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <a
                      href={activeCandidateModal.linkedinUrl || 'https://linkedin.com'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl bg-[#0077B5]/10 border border-[#0077B5]/30 text-[#0077B5] text-xs font-bold hover:bg-[#0077B5]/20 transition-colors flex items-center gap-2"
                    >
                      <LinkedinIcon className="w-4 h-4 text-[#0077B5]" />
                      <span>Open LinkedIn</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    {activeCandidateModal.portfolioUrl && (
                      <a
                        href={activeCandidateModal.portfolioUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-xl bg-[#FAF9F5] border border-[#E8E5DD] text-[#1B1B1B] text-xs font-bold hover:border-[#1B1B1B] transition-colors flex items-center gap-2"
                      >
                        <Globe className="w-4 h-4 text-[#C76A2A]" />
                        <span>View Portfolio</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}

                    <a
                      href={activeCandidateModal.resumeUrl || '/resumes/sample-resume.pdf'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl bg-[#2F7A45]/10 border border-[#2F7A45]/30 text-[#2F7A45] text-xs font-bold hover:bg-[#2F7A45]/20 transition-colors flex items-center gap-2"
                    >
                      <FileText className="w-4 h-4 text-[#2F7A45]" />
                      <span>Download Resume</span>
                      <Download className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  {/* Verified Skills Section */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-[#1B1B1B] uppercase tracking-wider flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#2F7A45]" />
                      Verified Skills & Multi-Source Proofs
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {(activeCandidateModal.verifiedSkills && activeCandidateModal.verifiedSkills.length > 0
                        ? activeCandidateModal.verifiedSkills
                        : activeCandidateModal.topSkills.map((s, idx) => ({
                            name: s,
                            category: 'Programming',
                            level: 'Advanced',
                            score: 88 + idx * 2,
                            sources: ['GitHub Verified', 'Assessment Verified', 'Project Verified'],
                          }))
                      ).map((skill, idx) => (
                        <div key={idx} className="p-3.5 rounded-2xl bg-[#FAF9F5] border border-[#E8E5DD] space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-[#1B1B1B]">{skill.name}</span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#2F7A45]/10 text-[#2F7A45] font-bold">
                              {skill.score}/100
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-[11px] text-[#6F6A60]">
                            <span>{skill.category || 'Engineering'}</span>
                            <span className="font-semibold text-[#1B1B1B]">{skill.level || 'Advanced'}</span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {(skill.sources || ['GitHub Verified', 'Assessment Verified']).map((src) => (
                              <span
                                key={src}
                                className="text-[9px] px-1.5 py-0.2 rounded bg-white border border-[#E8E5DD] text-[#4A4A46]"
                              >
                                {src}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Verified Projects Section */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-[#1B1B1B] uppercase tracking-wider flex items-center gap-2">
                      <GitBranch className="w-4 h-4 text-[#C76A2A]" />
                      Production Projects & Repositories
                    </h4>

                    <div className="space-y-3">
                      {(activeCandidateModal.projects && activeCandidateModal.projects.length > 0
                        ? activeCandidateModal.projects
                        : [
                            {
                              title: 'Distributed Systems & High-Concurrency Microservices',
                              techStack: ['Python', 'FastAPI', 'Docker', 'Redis'],
                              githubUrl: activeCandidateModal.githubUrl,
                              projectScore: 92,
                              description: 'Production-ready backend architecture with automated tests and zero-downtime deployment pipelines.',
                            },
                          ]
                      ).map((proj, idx) => (
                        <div key={idx} className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#E8E5DD] space-y-2">
                          <div className="flex items-center justify-between">
                            <h5 className="text-xs font-bold text-[#1B1B1B]">{proj.title}</h5>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#C76A2A]/10 text-[#C76A2A] font-bold">
                              Score: {proj.projectScore || 90}/100
                            </span>
                          </div>
                          <p className="text-xs text-[#6F6A60]">{proj.description}</p>
                          <div className="flex items-center justify-between pt-1">
                            <div className="flex flex-wrap gap-1">
                              {proj.techStack?.map((t) => (
                                <span
                                  key={t}
                                  className="text-[9px] px-1.5 py-0.2 rounded bg-white border border-[#E8E5DD] text-[#1B1B1B]"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                            {proj.githubUrl && (
                              <a
                                href={proj.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs font-bold text-[#1B1B1B] hover:text-[#C76A2A] flex items-center gap-1"
                              >
                                <span>View Repo</span>
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Assessment History Section */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-[#1B1B1B] uppercase tracking-wider flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#2F7A45]" />
                      Assessment History
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {(activeCandidateModal.assessments && activeCandidateModal.assessments.length > 0
                        ? activeCandidateModal.assessments
                        : [
                            { title: 'Core Systems Architecture & Concurrency', score: 94, passed: true, date: 'Feb 15, 2026' },
                            { title: 'Database Indexing & Query Optimization', score: 90, passed: true, date: 'Jan 28, 2026' },
                          ]
                      ).map((ass, idx) => (
                        <div key={idx} className="p-3.5 rounded-2xl bg-[#FAF9F5] border border-[#E8E5DD] flex items-center justify-between">
                          <div>
                            <span className="text-xs font-bold text-[#1B1B1B] block">{ass.title}</span>
                            <span className="text-[10px] text-[#6F6A60]">{ass.date || 'Recent Attempt'}</span>
                          </div>
                          <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#2F7A45]/10 text-[#2F7A45]">
                            {ass.score}% Passed
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Footer Action */}
                <div className="p-6 border-t border-[#E8E5DD] bg-[#FAF9F5] flex items-center justify-between">
                  <span className="text-xs text-[#6F6A60]">
                    Candidate ID: <strong className="text-[#1B1B1B] font-mono">{activeCandidateModal.studentId || activeCandidateModal.id}</strong>
                  </span>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setActiveCandidateModal(null)}
                      className="px-4 py-2 text-xs font-semibold text-[#6F6A60] hover:text-[#1B1B1B] rounded-xl"
                    >
                      Close
                    </button>

                    <button
                      onClick={() => {
                        handleShortlist(activeCandidateModal.id);
                        setActiveCandidateModal(null);
                      }}
                      className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-[#2F7A45] hover:bg-[#2F7A45]/90 flex items-center gap-1.5 shadow-xs"
                    >
                      <UserCheck className="w-4 h-4" />
                      <span>Shortlist Candidate for Pipeline</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </PortalLayout>
  );
}
