'use client';

import React from 'react';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { mockDepartmentMetrics } from '@/lib/mock-data';
import { Building, TrendingUp, CheckCircle2, Award, Zap } from 'lucide-react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';

export default function InstituteDepartmentsPage() {
  const radarData = [
    { subject: 'Programming', CSE: 91, AIML: 88, IT: 84, ECE: 75 },
    { subject: 'AI / ML', CSE: 88, AIML: 95, IT: 70, ECE: 66 },
    { subject: 'Cloud Infra', CSE: 78, AIML: 72, IT: 85, ECE: 60 },
    { subject: 'DevOps', CSE: 74, AIML: 68, IT: 82, ECE: 58 },
    { subject: 'Data Science', CSE: 82, AIML: 94, IT: 75, ECE: 69 },
  ];

  return (
    <PortalLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                Institutional Benchmarking
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-500">Cross-Department Analytics</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Department Readiness Index
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Multi-dimensional evaluation of technical competencies across CSE, IT, ECE, and AIML cohorts.
            </p>
          </div>
        </div>

        {/* 4 Department Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {mockDepartmentMetrics.map((dept) => (
            <div key={dept.name} className="saas-card p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-600 px-2.5 py-1 rounded bg-blue-50">
                  {dept.name}
                </span>
                <span className="text-xs text-slate-500">{dept.totalStudents} Students</span>
              </div>

              <div>
                <span className="text-xs text-slate-500">Overall Readiness</span>
                <div className="text-3xl font-bold text-slate-900 mt-0.5">
                  {dept.overallReadiness}%
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-2">
                  <div className="bg-blue-600 h-full rounded-full" style={{ width: `${dept.overallReadiness}%` }} />
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Programming</span>
                  <span className="font-bold text-slate-800">{dept.programming}%</span>
                </div>
                <div className="flex justify-between">
                  <span>AI & ML</span>
                  <span className="font-bold text-slate-800">{dept.ai}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Cloud Infra</span>
                  <span className="font-bold text-slate-800">{dept.cloud}%</span>
                </div>
                <div className="flex justify-between">
                  <span>DevOps</span>
                  <span className="font-bold text-slate-800">{dept.devOps}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Big Radar Visualization */}
        <div className="saas-card p-6">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Multi-Department Competency Radar</h2>
              <p className="text-xs text-slate-500">Comparative radar mapping across core modern technical domains</p>
            </div>
          </div>

          <div className="h-80 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 11, fontWeight: 600 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#cbd5e1" />
                <Radar name="CSE" dataKey="CSE" stroke="#2563eb" fill="#2563eb" fillOpacity={0.3} />
                <Radar name="AIML" dataKey="AIML" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.2} />
                <Radar name="IT" dataKey="IT" stroke="#0ea5e9" fill="#0ea5e9" fillOpacity={0.2} />
                <Radar name="ECE" dataKey="ECE" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.15} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-center gap-6 pt-4 border-t border-slate-100 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-600" />
              <span className="font-medium text-slate-700">CSE Dept</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-600" />
              <span className="font-medium text-slate-700">AIML Dept</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-sky-500" />
              <span className="font-medium text-slate-700">IT Dept</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <span className="font-medium text-slate-700">ECE Dept</span>
            </div>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
