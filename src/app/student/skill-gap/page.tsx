'use client';

import React, { useState } from 'react';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { useAppStore } from '@/lib/store';
import { mockRoleSkillGap } from '@/lib/mock-data';
import {
  GitPullRequest,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  ArrowRight,
  TrendingUp,
  Award,
  Layers,
  Sparkles,
} from 'lucide-react';

export default function SkillGapAnalysisPage() {
  const { studentProfile, updateStudentTargetRole } = useAppStore();
  const [selectedRole, setSelectedRole] = useState<string>(studentProfile.targetRole || 'AI Engineer');

  const currentAnalysis = mockRoleSkillGap[selectedRole] || mockRoleSkillGap['AI Engineer'];

  const handleRoleChange = (role: string) => {
    setSelectedRole(role);
    updateStudentTargetRole(role);
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'High':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Medium':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      default:
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    }
  };

  return (
    <PortalLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                Industry Benchmark Matrix
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-500">Live Skill Graph Matching</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Skill Gap Analysis</h1>
            <p className="text-xs text-slate-500 mt-1">
              Compare your verified competencies against current industry role requirements to isolate target skill deltas.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-700">Target Role:</span>
            <select
              value={selectedRole}
              onChange={(e) => handleRoleChange(e.target.value)}
              className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600"
            >
              {Object.keys(mockRoleSkillGap).map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Match Percentage Highlight Hero */}
        <div className="saas-card p-6 bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">
                  Target Profile: {currentAnalysis.targetRole}
                </span>
                <span className="text-xs text-slate-400">
                  {currentAnalysis.matchedSkillsCount} of {currentAnalysis.totalRequiredSkills} Skills Verified
                </span>
              </div>
              <h2 className="text-lg font-bold text-white">Competency Alignment Diagnostic</h2>
              <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                {currentAnalysis.overview}
              </p>
            </div>

            <div className="p-4 bg-white/10 backdrop-blur-xs rounded-xl border border-white/10 text-center min-w-[150px]">
              <span className="text-[10px] uppercase font-bold text-blue-300 tracking-wider">
                Role Match
              </span>
              <div className="text-4xl font-black text-white my-1">
                {currentAnalysis.matchPercentage}%
              </div>
              <span className="text-[11px] text-emerald-300 font-medium">
                Eligible for Tier 1 Interviews
              </span>
            </div>
          </div>
        </div>

        {/* Missing Skills Callout */}
        {currentAnalysis.missingSkills.length > 0 && (
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5 text-amber-900">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <div>
                <span className="font-bold">Immediate High-Priority Missing Competencies:</span>{' '}
                {currentAnalysis.missingSkills.join(', ')}
              </div>
            </div>
            <span className="text-[11px] text-amber-800 font-medium shrink-0">
              Recommended: 4 Weeks Sprint
            </span>
          </div>
        )}

        {/* Skill Gap Matrix Table */}
        <div className="saas-card p-6">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Skill Gap Delta Table</h3>
              <p className="text-xs text-slate-500">
                Detailed comparison of candidate proficiency vs required enterprise benchmark
              </p>
            </div>
            <span className="text-xs font-medium text-slate-500">
              {currentAnalysis.skillGaps.length} Evaluated Metrics
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-slate-400 font-semibold border-b border-slate-100">
                  <th className="pb-3 pl-2">Competency</th>
                  <th className="pb-3">Required Level</th>
                  <th className="pb-3">Candidate Level</th>
                  <th className="pb-3 text-center">Gap Severity</th>
                  <th className="pb-3 text-center">Match %</th>
                  <th className="pb-3 pr-2">Recommended Upskilling</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {currentAnalysis.skillGaps.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 pl-2 font-semibold text-slate-900">{item.skill}</td>
                    <td className="py-3.5 text-slate-700">
                      <span className="px-2 py-0.5 rounded bg-slate-100 font-medium">
                        {item.requiredLevel}
                      </span>
                    </td>
                    <td className="py-3.5">
                      <span
                        className={`px-2 py-0.5 rounded font-medium ${
                          item.currentLevel === 'None'
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : 'bg-blue-50 text-blue-700 border border-blue-200'
                        }`}
                      >
                        {item.currentLevel}
                      </span>
                    </td>
                    <td className="py-3.5 text-center">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getSeverityBadge(
                          item.gapSeverity
                        )}`}
                      >
                        {item.gapSeverity}
                      </span>
                    </td>
                    <td className="py-3.5 text-center font-bold text-slate-900">
                      {item.matchScore}%
                    </td>
                    <td className="py-3.5 pr-2 text-slate-600">
                      <span className="text-[11px] font-medium text-blue-600 flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5 shrink-0" />
                        {item.recommendedCourse}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
