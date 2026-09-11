'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { useAppStore } from '@/lib/store';
import { mockDepartmentMetrics, mockCandidatesPipeline } from '@/lib/mock-data';
import { getUserDisplayName } from '@/lib/user-utils';
import {
  Building2,
  Users,
  TrendingUp,
  Award,
  CheckCircle2,
  FileSpreadsheet,
  ArrowUpRight,
  Sparkles,
  BarChart3,
  Calendar,
  Layers,
  UploadCloud,
  FileText,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

export default function InstituteDashboardPage() {
  const { setRole, isDemoMode, currentUser, curriculumAnalyses } = useAppStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setRole('institute');
    setMounted(true);
  }, [setRole]);

  if (!mounted) return null;

  const institutionName = isDemoMode
    ? 'Apex Institute of Technology'
    : currentUser?.institution || getUserDisplayName({ user: currentUser }) || 'Institutional Workspace';

  const totalStudents = isDemoMode ? 950 : 0;
  const placementReadiness = isDemoMode ? '84.6%' : 'N/A';
  const participationRate = isDemoMode ? '92.4%' : '0%';
  const alignmentRate = isDemoMode
    ? '78%'
    : curriculumAnalyses.length > 0
    ? `${curriculumAnalyses[0].industryRelevanceScore}%`
    : 'Pending';

  const emptyDepartmentMetrics = [
    { name: 'CSE' as const, programming: 0, ai: 0, cloud: 0, devOps: 0, dataScience: 0, totalStudents: 0, overallReadiness: 0 },
    { name: 'AIML' as const, programming: 0, ai: 0, cloud: 0, devOps: 0, dataScience: 0, totalStudents: 0, overallReadiness: 0 },
    { name: 'ECE' as const, programming: 0, ai: 0, cloud: 0, devOps: 0, dataScience: 0, totalStudents: 0, overallReadiness: 0 },
    { name: 'IT' as const, programming: 0, ai: 0, cloud: 0, devOps: 0, dataScience: 0, totalStudents: 0, overallReadiness: 0 },
  ];

  return (
    <PortalLayout>
      <div className="space-y-6">
        {/* Welcome Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-2xs">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                Institute Administration Hub
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-500 font-medium">{institutionName}</span>
              {isDemoMode && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200">
                  Demo Sandbox
                </span>
              )}
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Academia Workforce Intelligence
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Real-time student monitoring, department readiness calibration, and AI-powered curriculum market alignment.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/institute/curriculum"
              className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-xs flex items-center gap-1.5"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              Analyze Syllabus PDF
            </Link>
            <Link
              href="/institute/students"
              className="px-3.5 py-2 text-xs font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors"
            >
              Student Roster
            </Link>
          </div>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Total Students */}
          <div className="saas-card p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500">Total Enrolled Students</span>
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-slate-900">{totalStudents}</span>
              <span className="text-xs text-slate-500">Active Cohort</span>
            </div>
            <div className="mt-3 flex items-center gap-1 text-[11px] text-slate-500">
              <span className="font-semibold text-blue-600">
                {isDemoMode ? '4 Engineering Depts' : '0 Registered Depts'}
              </span>
              <span>{isDemoMode ? '(CSE, AIML, IT, ECE)' : '(Import Roster)'}</span>
            </div>
          </div>

          {/* Card 2: Placement Readiness */}
          <div className="saas-card p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500">Placement Readiness Index</span>
              <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-slate-900">{placementReadiness}</span>
              <span className="text-xs text-emerald-600 font-medium">
                {isDemoMode ? '+8.2% YoY' : 'Initial Baseline'}
              </span>
            </div>
            <div className="mt-3 w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-emerald-600 h-full rounded-full"
                style={{ width: isDemoMode ? '84.6%' : '0%' }}
              />
            </div>
          </div>

          {/* Card 3: Assessment Participation */}
          <div className="saas-card p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500">Assessment Participation</span>
              <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-slate-900">{participationRate}</span>
              <span className="text-xs text-purple-600 font-medium">
                {isDemoMode ? '878 Active' : '0 Submissions'}
              </span>
            </div>
            <div className="mt-3 flex items-center gap-1 text-[11px] text-slate-500">
              <span>Weekly benchmark participation</span>
            </div>
          </div>

          {/* Card 4: Industry Alignment */}
          <div className="saas-card p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500">Industry Alignment</span>
              <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                <Award className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-slate-900">{alignmentRate}</span>
              <span className="text-xs text-amber-600 font-medium">Curriculum Match</span>
            </div>
            <Link
              href="/institute/curriculum"
              className="mt-3 inline-flex items-center gap-1 text-[11px] text-blue-600 font-medium hover:text-blue-700"
            >
              <span>View missing industry topics</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Fresh User Guidance Banner if not demo mode and 0 students */}
        {!isDemoMode && (
          <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-white p-6 rounded-xl border border-blue-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-bold text-blue-950">
                  Getting Started with {institutionName}
                </h3>
              </div>
              <p className="text-xs text-slate-600 max-w-xl">
                Upload your engineering syllabi or department course outlines to generate real-time AI gap analysis and compare readiness benchmarks against industry job descriptions.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/institute/curriculum"
                className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-2xs"
              >
                Upload Syllabus PDF
              </Link>
              <Link
                href="/institute/students"
                className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors"
              >
                Import CSV Roster
              </Link>
            </div>
          </div>
        )}

        {/* Department Readiness Index Chart */}
        <div className="saas-card p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Department Readiness Comparison by Domain
              </h2>
              <p className="text-xs text-slate-500">
                Comparative benchmarks across Programming, Cloud, AI, DevOps, and Data Science
              </p>
            </div>
            <Link
              href="/institute/departments"
              className="text-xs text-blue-600 hover:text-blue-700 font-medium self-start sm:self-auto"
            >
              View Detailed Metrics &rarr;
            </Link>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={isDemoMode ? mockDepartmentMetrics : emptyDepartmentMetrics}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }} />
                <YAxis domain={[0, 100]} tick={{ fill: '#64748b', fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    borderColor: '#e2e8f0',
                    borderRadius: '0.5rem',
                    fontSize: '12px',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey="programming" name="Programming" fill="#2563eb" radius={[4, 4, 0, 0]} />
                <Bar dataKey="ai" name="AI / ML" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="cloud" name="Cloud Infra" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                <Bar dataKey="devOps" name="DevOps" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bottom Split: Top Student Builders & Curriculum Status */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Top Student Builders */}
          <div className="lg:col-span-7 saas-card p-6">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-bold text-slate-900">High-Velocity Student Builders</h3>
                <p className="text-xs text-slate-500">Top candidates flagged for tier-1 recruiter pipelines</p>
              </div>
              <Link href="/institute/students" className="text-xs text-blue-600 hover:underline font-medium">
                {isDemoMode ? 'All 950 Students' : 'Student Directory'}
              </Link>
            </div>

            {isDemoMode ? (
              <div className="space-y-3">
                {mockCandidatesPipeline.slice(0, 4).map((cand) => (
                  <div
                    key={cand.id}
                    className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:border-slate-200 bg-slate-50/40"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={cand.avatar}
                        alt={cand.name}
                        className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">{cand.name}</h4>
                        <p className="text-[11px] text-slate-500">
                          {cand.department} • Target: {cand.targetRole}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-blue-600">
                        Builder: {cand.builderScore} / 1000
                      </span>
                      <span className="block text-[10px] text-emerald-600 font-semibold">
                        {cand.employabilityScore}% Employability
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 px-4 bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
                <Users className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <h4 className="text-xs font-bold text-slate-800">No Student Builders Registered</h4>
                <p className="text-[11px] text-slate-500 max-w-sm mx-auto mt-1 mb-4">
                  Invite your students or import a batch CSV roster to begin continuous builder audits and skill telemetry.
                </p>
                <Link
                  href="/institute/students"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 hover:bg-blue-100 rounded-lg transition-colors"
                >
                  <Users className="w-3.5 h-3.5" />
                  Import Student Roster
                </Link>
              </div>
            )}
          </div>

          {/* Quick Curriculum Health */}
          <div className="lg:col-span-5 saas-card p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-slate-900">Curriculum Health Summary</h3>
                <span className="text-[10px] bg-amber-50 text-amber-700 px-2 py-0.5 rounded font-bold">
                  {curriculumAnalyses.length > 0 || isDemoMode ? 'Syllabus Review Due' : 'Upload Required'}
                </span>
              </div>
              
              {isDemoMode ? (
                <div className="space-y-3 text-xs">
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                    <span className="font-semibold text-slate-900 block">
                      CSE 6th Semester Computing
                    </span>
                    <p className="text-slate-500 text-[11px] mt-0.5">
                      Relevance Score: <span className="font-bold text-slate-800">78/100</span> (4 Missing Industry Topics)
                    </p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                    <span className="font-semibold text-slate-900 block">
                      AIML 4th Semester Foundations
                    </span>
                    <p className="text-slate-500 text-[11px] mt-0.5">
                      Relevance Score: <span className="font-bold text-slate-800">89/100</span> (Modern Transformers Included)
                    </p>
                  </div>
                </div>
              ) : curriculumAnalyses.length > 0 ? (
                <div className="space-y-3 text-xs">
                  {curriculumAnalyses.map((analysis, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                      <span className="font-semibold text-slate-900 block">
                        {analysis.syllabusTitle} ({analysis.department} Sem {analysis.semester})
                      </span>
                      <p className="text-slate-500 text-[11px] mt-0.5">
                        Relevance Score: <span className="font-bold text-slate-800">{analysis.industryRelevanceScore}/100</span> ({analysis.missingTopics.length} Missing Industry Topics)
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 bg-slate-50/70 border border-slate-200 rounded-xl text-center space-y-2">
                  <FileText className="w-6 h-6 text-slate-400 mx-auto" />
                  <p className="text-xs font-semibold text-slate-700">No Curriculum Uploaded</p>
                  <p className="text-[11px] text-slate-500">
                    Run your syllabus through the AI Analyzer to automatically detect outdated chapters and industry skill gaps.
                  </p>
                </div>
              )}
            </div>

            <Link
              href="/institute/curriculum"
              className="mt-4 w-full py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 text-center shadow-xs block"
            >
              Open AI Curriculum Analyzer
            </Link>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
