'use client';

import React, { useState } from 'react';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { useAppStore } from '@/lib/store';
import {
  Sparkles,
  Search,
  Filter,
  CheckCircle2,
  ExternalLink,
  Award,
  SlidersHorizontal,
  Briefcase,
  Zap,
  GitBranch,
  Mail,
} from 'lucide-react';

export default function IndustryTalentPage() {
  const { candidates, moveCandidateStage } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [minBuilderScore, setMinBuilderScore] = useState(800);
  const [minEmployability, setMinEmployability] = useState(80);
  const [shortlistedIds, setShortlistedIds] = useState<string[]>([]);

  const handleShortlist = (candId: string) => {
    moveCandidateStage(candId, 'Shortlisted');
    setShortlistedIds((prev) => [...prev, candId]);
  };

  const filteredCandidates = candidates.filter((c) => {
    const matchDept = selectedDept === 'All' || c.department === selectedDept;
    const matchScore = c.builderScore >= minBuilderScore && c.employabilityScore >= minEmployability;
    const matchQuery =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.targetRole.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.topSkills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchDept && matchScore && matchQuery;
  });

  return (
    <PortalLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-blue-600" />
                Vector Talent Retrieval Engine
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-500">Evidence-Scored Candidates</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Talent Discovery</h1>
            <p className="text-xs text-slate-500 mt-1">
              Filter and discover high-intent student builders verified by live GitHub repositories, hackathon awards, and faculty validations.
            </p>
          </div>
          <div className="text-xs text-slate-500 font-medium">
            Showing <span className="font-bold text-slate-900">{filteredCandidates.length}</span> Verified Matches
          </div>
        </div>

        {/* Multi-Attribute Filter Bar */}
        <div className="saas-card p-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Keyword / Skills Search
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="e.g. Python, PyTorch, pgvector..."
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-600 text-slate-900"
                />
              </div>
            </div>

            {/* Department */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Department
              </label>
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-medium focus:ring-1 focus:ring-blue-600"
              >
                <option value="All">All Departments</option>
                <option value="CSE">CSE</option>
                <option value="AIML">AIML</option>
                <option value="IT">IT</option>
                <option value="ECE">ECE</option>
              </select>
            </div>

            {/* Min Builder Score Slider */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <label className="font-bold text-slate-700 uppercase tracking-wider">
                  Min Builder Score
                </label>
                <span className="font-bold text-blue-600">{minBuilderScore}+</span>
              </div>
              <input
                type="range"
                min="600"
                max="950"
                step="10"
                value={minBuilderScore}
                onChange={(e) => setMinBuilderScore(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
            </div>

            {/* Min Employability Score Slider */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <label className="font-bold text-slate-700 uppercase tracking-wider">
                  Min Employability
                </label>
                <span className="font-bold text-emerald-600">{minEmployability}%+</span>
              </div>
              <input
                type="range"
                min="60"
                max="95"
                step="5"
                value={minEmployability}
                onChange={(e) => setMinEmployability(Number(e.target.value))}
                className="w-full accent-emerald-600"
              />
            </div>
          </div>
        </div>

        {/* Candidate Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredCandidates.map((cand) => {
            const isShortlisted = cand.stage === 'Shortlisted' || shortlistedIds.includes(cand.id);
            return (
              <div
                key={cand.id}
                className="saas-card p-6 flex flex-col justify-between space-y-4 hover:border-blue-300 transition-all"
              >
                <div>
                  {/* Top Candidate Row */}
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={cand.avatar}
                        alt={cand.name}
                        className="w-12 h-12 rounded-xl object-cover ring-2 ring-slate-100 shrink-0"
                      />
                      <div>
                        <h2 className="text-sm font-bold text-slate-900">{cand.name}</h2>
                        <p className="text-xs text-slate-600 font-medium">{cand.targetRole}</p>
                        <p className="text-[11px] text-slate-400">
                          {cand.college} • <span className="font-mono">{cand.department}</span>
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {cand.matchScore}% Match
                      </span>
                    </div>
                  </div>

                  {/* Builder Score & Employability Metrics Bar */}
                  <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 rounded-lg border border-slate-100 text-center mb-3">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-semibold">Builder Score</span>
                      <span className="block text-sm font-extrabold text-blue-600">
                        {cand.builderScore} / 1000
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-semibold">Employability</span>
                      <span className="block text-sm font-extrabold text-emerald-600">
                        {cand.employabilityScore}%
                      </span>
                    </div>
                  </div>

                  {/* Skills Badges */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-semibold text-slate-400 uppercase">
                      Top Verified Skills
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {cand.topSkills.map((skill) => (
                        <span
                          key={skill}
                          className="text-[10px] bg-white border border-slate-200 text-slate-700 px-2 py-0.5 rounded font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                  <a
                    href={cand.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-slate-600 hover:text-slate-900 font-medium"
                  >
                    <GitBranch className="w-3.5 h-3.5" />
                    <span>View GitHub Proofs</span>
                  </a>

                  {isShortlisted ? (
                    <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1 bg-emerald-50 px-3 py-1.5 rounded-lg">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Shortlisted in Pipeline
                    </span>
                  ) : (
                    <button
                      onClick={() => handleShortlist(cand.id)}
                      className="px-4 py-1.5 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-xs"
                    >
                      Shortlist Candidate
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </PortalLayout>
  );
}
