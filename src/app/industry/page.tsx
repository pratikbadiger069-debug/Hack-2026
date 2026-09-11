'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { useAppStore } from '@/lib/store';
import {
  Briefcase,
  Users,
  Sparkles,
  Layers,
  ArrowUpRight,
  Plus,
  CheckCircle2,
  TrendingUp,
  Award,
  Search,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export default function IndustryDashboardPage() {
  const { setRole, isDemoMode, currentUser, candidates, jobs } = useAppStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setRole('industry');
    setMounted(true);
  }, [setRole]);

  if (!mounted) return null;

  const orgName = isDemoMode
    ? 'Anthropic Labs Partner Network'
    : currentUser?.company || currentUser?.name || 'Recruiter Workspace';

  const stageCounts = {
    Matched: candidates.filter((c) => c.stage === 'Matched').length,
    Shortlisted: candidates.filter((c) => c.stage === 'Shortlisted').length,
    Assessment: candidates.filter((c) => c.stage === 'Assessment').length,
    Interview: candidates.filter((c) => c.stage === 'Interview').length,
    Selected: candidates.filter((c) => c.stage === 'Selected').length,
  };

  const pipelineChartData = [
    { stage: 'Matched', count: stageCounts.Matched },
    { stage: 'Shortlisted', count: stageCounts.Shortlisted },
    { stage: 'Assessment', count: stageCounts.Assessment },
    { stage: 'Interview', count: stageCounts.Interview },
    { stage: 'Selected', count: stageCounts.Selected },
  ];

  return (
    <PortalLayout>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-2xs">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                Enterprise Talent Intelligence
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-500 font-medium">{orgName}</span>
              {isDemoMode && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200">
                  Demo Sandbox
                </span>
              )}
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Recruiter & Hiring Operations
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Vector talent discovery, evidence-based candidate filtering, and real-time recruitment pipeline tracking.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/industry/talent"
              className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-xs flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Discover Verified Talent
            </Link>
            <Link
              href="/industry/jobs"
              className="px-3.5 py-2 text-xs font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              Create Role
            </Link>
          </div>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="saas-card p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500">Active Requisitions</span>
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <Briefcase className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-slate-900">{jobs.length}</span>
              <span className="text-xs text-blue-600 font-medium">
                {jobs.length > 0 ? 'Active' : 'No Openings'}
              </span>
            </div>
            <span className="text-[11px] text-slate-500 mt-2 block">
              {candidates.length} total active applicants
            </span>
          </div>

          <div className="saas-card p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500">Matched Talent Pool</span>
              <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                <Sparkles className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-slate-900">
                {isDemoMode ? '42' : candidates.filter((c) => c.matchScore >= 80).length}
              </span>
              <span className="text-xs text-purple-600 font-medium">80%+ Match</span>
            </div>
            <span className="text-[11px] text-slate-500 mt-2 block">
              Audited GitHub & builder portfolios
            </span>
          </div>

          <div className="saas-card p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500">Pipeline Velocity</span>
              <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-slate-900">{isDemoMode ? '6.2 Days' : 'Realtime'}</span>
              <span className="text-xs text-emerald-600 font-medium">Fast-Track</span>
            </div>
            <span className="text-[11px] text-slate-500 mt-2 block">
              Screening to Offer turnaround
            </span>
          </div>

          <div className="saas-card p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500">Assessment Completion</span>
              <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-slate-900">{isDemoMode ? '94.8%' : '100%'}</span>
              <span className="text-xs text-amber-600 font-medium">High Intent</span>
            </div>
            <span className="text-[11px] text-slate-500 mt-2 block">
              Standardized builder evaluations
            </span>
          </div>
        </div>

        {/* Fresh Recruiter Welcome Banner */}
        {!isDemoMode && jobs.length === 0 && (
          <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-white p-6 rounded-xl border border-blue-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-bold text-blue-950">
                  Ready to discover pre-screened talent for {orgName}?
                </h3>
              </div>
              <p className="text-xs text-slate-600 max-w-xl">
                Create a job posting or explore the talent discovery matrix. SkillBridge automatically matches verified student repositories, PR history, and benchmark scores to your stack requirements.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/industry/jobs"
                className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-2xs"
              >
                Post Job Requirement
              </Link>
              <Link
                href="/industry/talent"
                className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors"
              >
                Browse Talent Pool
              </Link>
            </div>
          </div>
        )}

        {/* Pipeline Distribution Chart */}
        <div className="saas-card p-6">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Recruitment Pipeline Funnel</h2>
              <p className="text-xs text-slate-500">Real-time candidate stages from Matched to Selected</p>
            </div>
            <Link href="/industry/pipeline" className="text-xs text-blue-600 font-semibold hover:underline">
              Open Kanban Board &rarr;
            </Link>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={pipelineChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="stage" tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }} />
                <YAxis allowDecimals={false} tick={{ fill: '#64748b', fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    borderColor: '#e2e8f0',
                    borderRadius: '0.5rem',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="count" name="Candidates" fill="#2563eb" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Active Candidates Quick Table */}
        <div className="saas-card p-6">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Recent Candidate Pipelines</h2>
              <p className="text-xs text-slate-500">Verified student builders actively advancing through stages</p>
            </div>
            <Link href="/industry/talent" className="text-xs text-blue-600 font-medium hover:underline">
              Explore All Talent
            </Link>
          </div>

          {candidates.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {candidates.map((cand) => (
                <div key={cand.id} className="py-3.5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={cand.avatar}
                      alt={cand.name}
                      className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200"
                    />
                    <div>
                      <h3 className="text-xs font-bold text-slate-900">{cand.name}</h3>
                      <p className="text-[11px] text-slate-500">
                        {cand.college} • {cand.department} • Role: {cand.targetRole}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right hidden sm:block">
                      <span className="text-xs font-bold text-slate-900">
                        Builder {cand.builderScore}/1000
                      </span>
                      <span className="block text-[10px] text-emerald-600 font-semibold">
                        {cand.matchScore}% Role Match
                      </span>
                    </div>
                    <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                      {cand.stage}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 px-4 bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
              <Search className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <h4 className="text-xs font-bold text-slate-800">No Candidates in Pipeline Yet</h4>
              <p className="text-[11px] text-slate-500 max-w-sm mx-auto mt-1 mb-4">
                Discover verified students based on evaluated GitHub commits, code complexity audits, and takehome assessments.
              </p>
              <div className="flex justify-center gap-3">
                <Link
                  href="/industry/talent"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-2xs"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Search Talent
                </Link>
                <Link
                  href="/industry/jobs"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Post Job
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </PortalLayout>
  );
}
