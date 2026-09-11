'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { useAppStore } from '@/lib/store';
import { mockRadarData, mockProgressTrend, mockInternships } from '@/lib/mock-data';
import { calculateProfileCompletion } from '@/lib/profile-completion';
import {
  Award,
  TrendingUp,
  ShieldCheck,
  Briefcase,
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  Code,
  Calendar,
  ExternalLink,
  PlusCircle,
  FileText,
  UserCheck,
  Layers,
  ArrowRight,
} from 'lucide-react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

export default function StudentDashboardPage() {
  const { studentProfile, setRole, isDemoMode } = useAppStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setRole('student');
    setMounted(true);
  }, [setRole]);

  if (!mounted) return null;

  const profileStatus = calculateProfileCompletion(studentProfile);

  const radarData = isDemoMode
    ? mockRadarData
    : [
        { subject: 'Execution', A: studentProfile.builderScores.execution || 0, benchmark: 85, fullMark: 100 },
        { subject: 'Problem Solving', A: studentProfile.builderScores.problemSolving || 0, benchmark: 80, fullMark: 100 },
        { subject: 'Innovation', A: studentProfile.builderScores.innovation || 0, benchmark: 75, fullMark: 100 },
        { subject: 'Leadership', A: studentProfile.builderScores.leadership || 0, benchmark: 70, fullMark: 100 },
        { subject: 'Consistency', A: studentProfile.builderScores.consistency || 0, benchmark: 90, fullMark: 100 },
      ];

  const progressTrend = isDemoMode
    ? mockProgressTrend
    : [
        { month: 'Start', builderScore: 0, industryReadiness: 0 },
        { month: 'Current', builderScore: studentProfile.builderScores.overall || 0, industryReadiness: studentProfile.employabilityScore || 0 },
      ];

  return (
    <PortalLayout>
      <div className="space-y-6">
        {/* Welcome Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-2xs">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                {isDemoMode ? 'Demo Sandbox Account' : 'Verified Student Identity'}
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-500">{studentProfile.academic.college || 'Not Assigned'}</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Welcome back, {studentProfile.name.split(' ')[0] || 'Builder'}
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Target Role: <span className="font-semibold text-slate-700">{studentProfile.targetRole || 'Full Stack Engineer'}</span> • Ready for 2026 Enterprise Hiring Cycle
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/student/career-copilot"
              className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-xs flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Launch Career Copilot
            </Link>
            <Link
              href="/student/builder-passport"
              className="px-3.5 py-2 text-xs font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors"
            >
              View Passport
            </Link>
          </div>
        </div>

        {/* Profile Completion Engine Card (Dynamic SaaS Progress) */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
                {profileStatus.percentage}%
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Profile Completion Engine</h3>
                <p className="text-xs text-slate-500">
                  {profileStatus.percentage === 100
                    ? 'Your verified builder profile is 100% complete and visible to hiring teams.'
                    : `Complete pending items to reach 100% and unlock Tier-1 recruiter priority routing.`}
                </p>
              </div>
            </div>
            <Link
              href="/student/profile"
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <span>Edit Full Profile</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden mb-4">
            <div
              className={`h-full rounded-full transition-all duration-700 ${
                profileStatus.percentage >= 80
                  ? 'bg-emerald-600'
                  : profileStatus.percentage >= 50
                  ? 'bg-blue-600'
                  : 'bg-amber-500'
              }`}
              style={{ width: `${profileStatus.percentage}%` }}
            />
          </div>

          {/* Pending Action Badges */}
          {profileStatus.pendingSections.length > 0 && (
            <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2">
              <span className="text-xs font-medium text-slate-500">Next Actionable Steps:</span>
              {profileStatus.pendingSections.map((pending, idx) => (
                <Link
                  key={idx}
                  href={pending.actionHref}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-md border border-blue-100 transition-colors"
                >
                  <PlusCircle className="w-3 h-3" />
                  <span>{pending.name} (+{pending.points}%)</span>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Builder Score */}
          <div className="saas-card p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500">Builder Score</span>
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <Award className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-slate-900">
                {studentProfile.builderScores.overall || 0}
              </span>
              <span className="text-xs text-slate-400 font-medium">/ 1000</span>
            </div>
            <div className="mt-3 flex items-center gap-1.5 text-[11px] text-emerald-700 font-medium">
              <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold">
                +45 pts
              </span>
              <span>from recent project evidence</span>
            </div>
          </div>

          {/* Card 2: Employability Score */}
          <div className="saas-card p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500">Employability Score</span>
              <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-slate-900">
                {studentProfile.employabilityScore || 0}%
              </span>
              <span className="text-xs text-emerald-600 font-medium">
                {studentProfile.employabilityScore > 80 ? 'Top 5%' : 'Calibrated'}
              </span>
            </div>
            <div className="mt-3 w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${studentProfile.employabilityScore || 0}%` }}
              />
            </div>
          </div>

          {/* Card 3: Verified Skills */}
          <div className="saas-card p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500">Verified Skills</span>
              <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-slate-900">
                {studentProfile.verifiedSkills.length}
              </span>
              <span className="text-xs text-slate-500">Validated</span>
            </div>
            <div className="mt-3 flex items-center gap-1 text-[11px] text-slate-500">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
              <span>Multi-tier validated</span>
            </div>
          </div>

          {/* Card 4: Internship Matches */}
          <div className="saas-card p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500">Internship Matches</span>
              <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                <Briefcase className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-slate-900">
                {mockInternships.length}
              </span>
              <span className="text-xs text-amber-600 font-medium">90%+ match</span>
            </div>
            <Link
              href="/student/internships"
              className="mt-3 inline-flex items-center gap-1 text-[11px] text-blue-600 font-medium hover:text-blue-700"
            >
              <span>Review opportunities</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Skill Radar Chart */}
          <div className="lg:col-span-6 saas-card p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Skill Radar &amp; Benchmark</h3>
                <p className="text-xs text-slate-500">Your performance vs Industry Hiring Standard</p>
              </div>
              <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-medium">
                Live Calibration
              </span>
            </div>

            <div className="h-64 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 11 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#cbd5e1" />
                  <Radar
                    name="Your Score"
                    dataKey="A"
                    stroke="#2563eb"
                    fill="#2563eb"
                    fillOpacity={0.4}
                  />
                  <Radar
                    name="Industry Benchmark"
                    dataKey="benchmark"
                    stroke="#94a3b8"
                    fill="#94a3b8"
                    fillOpacity={0.15}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <div className="flex items-center justify-center gap-6 pt-3 border-t border-slate-100 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-600" />
                <span className="text-slate-700 font-medium">Candidate Score</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-slate-400" />
                <span className="text-slate-500">Industry Threshold</span>
              </div>
            </div>
          </div>

          {/* Progress Trend Chart */}
          <div className="lg:col-span-6 saas-card p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Builder &amp; Industry Growth</h3>
                <p className="text-xs text-slate-500">
                  {isDemoMode ? '6-Month velocity tracking' : 'Live builder telemetry tracking'}
                </p>
              </div>
              <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" />
                {isDemoMode ? '+22.9% QoQ' : 'Calibrated Real-time'}
              </span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={progressTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorBuilder" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 11 }} />
                  <YAxis domain={[0, 1000]} tick={{ fill: '#64748b', fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      borderColor: '#e2e8f0',
                      borderRadius: '0.5rem',
                      fontSize: '12px',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="builderScore"
                    stroke="#2563eb"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorBuilder)"
                    name="Builder Score"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-500">
              <span>Sept: 720 / 1000</span>
              <span className="font-semibold text-blue-600">Current: 885 / 1000</span>
              <span>Target: 950+</span>
            </div>
          </div>
        </div>

        {/* Bottom Split: Recent Activity Feed & Recommended Next Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Activity Feed / Empty State */}
          <div className="lg:col-span-7 saas-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-900">Verified Evidence &amp; Activity Feed</h3>
              <Link href="/student/builder-passport" className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                View All Proofs
              </Link>
            </div>

            {studentProfile.evidences.length === 0 ? (
              <div className="text-center py-10 px-4 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                <Code className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <h4 className="text-xs font-bold text-slate-800">No project evidence uploaded yet</h4>
                <p className="text-[11px] text-slate-500 mt-1 max-w-sm mx-auto">
                  Upload your first GitHub project or live deployment link to generate your verified Builder Score.
                </p>
                <Link
                  href="/student/builder-passport"
                  className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  Submit First Project Proof
                </Link>
              </div>
            ) : (
              <div className="space-y-3.5">
                {studentProfile.evidences.map((ev) => (
                  <div
                    key={ev.id}
                    className="flex items-start gap-3 p-3 rounded-lg border border-slate-100 hover:border-slate-200 bg-slate-50/50 transition-all"
                  >
                    <div className="p-2 bg-white rounded-md border border-slate-200 text-blue-600 shrink-0">
                      <Code className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-xs font-semibold text-slate-900 truncate">{ev.title}</h4>
                        <span className="text-[10px] font-medium text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded shrink-0">
                          Score +{ev.impactScore}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{ev.description}</p>
                      <div className="flex items-center gap-3 mt-1.5 text-[10px] text-slate-400">
                        <span className="font-medium text-slate-600">{ev.type}</span>
                        <span>•</span>
                        <span>{ev.date}</span>
                        <span>•</span>
                        <a
                          href={ev.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 hover:underline flex items-center gap-0.5"
                        >
                          Proof Link <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recommended Next Actions */}
          <div className="lg:col-span-5 saas-card p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-slate-900">Recommended Next Actions</h3>
                <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-medium">
                  AI Prioritized
                </span>
              </div>
              <div className="space-y-3">
                <Link
                  href="/student/assessments"
                  className="flex items-start gap-3 p-3 rounded-lg border border-slate-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all group"
                >
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    1
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xs font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                      Complete Cloud &amp; K8s Assessment
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Verify Docker &amp; Pod Lifecycle to bridge critical gap for Cloud AI roles.
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 mt-1" />
                </Link>

                <Link
                  href="/student/career-copilot"
                  className="flex items-start gap-3 p-3 rounded-lg border border-slate-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all group"
                >
                  <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    2
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xs font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                      Run AI Career Copilot for AI Engineer
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Generate step-by-step project blueprints to hit 95% target role readiness.
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 mt-1" />
                </Link>

                <Link
                  href="/student/internships"
                  className="flex items-start gap-3 p-3 rounded-lg border border-slate-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all group"
                >
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    3
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xs font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                      Apply to Anthropic Labs Partner Intern
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      You meet 94% of verified requirements with priority recruiter routing.
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 mt-1" />
                </Link>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Goal: 95% Target Role Match</span>
              <span className="font-semibold text-slate-800">86% Current</span>
            </div>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
