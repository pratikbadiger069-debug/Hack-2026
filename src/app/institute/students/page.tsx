'use client';

import React, { useState } from 'react';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { mockCandidatesPipeline, mockStudentProfile } from '@/lib/mock-data';
import {
  Users,
  Search,
  Filter,
  CheckCircle2,
  ExternalLink,
  Award,
  TrendingUp,
  SlidersHorizontal,
  Mail,
} from 'lucide-react';

export default function InstituteStudentsPage() {
  const [search, setSearch] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');

  const allStudents = [
    {
      id: mockStudentProfile.id,
      name: mockStudentProfile.name,
      avatar: mockStudentProfile.avatar,
      department: mockStudentProfile.academic.department,
      year: mockStudentProfile.academic.year,
      cgpa: mockStudentProfile.academic.cgpa,
      builderScore: mockStudentProfile.builderScores.overall,
      employabilityScore: mockStudentProfile.employabilityScore,
      targetRole: mockStudentProfile.targetRole,
      verifiedSkillsCount: mockStudentProfile.verifiedSkills.length,
      activityStatus: 'High Activity',
      githubUrl: mockStudentProfile.professional.githubUrl,
    },
    ...mockCandidatesPipeline.slice(1).map((c) => ({
      id: c.studentId,
      name: c.name,
      avatar: c.avatar,
      department: c.department,
      year: '3rd Year',
      cgpa: 8.9,
      builderScore: c.builderScore,
      employabilityScore: c.employabilityScore,
      targetRole: c.targetRole,
      verifiedSkillsCount: c.topSkills.length,
      activityStatus: 'Active',
      githubUrl: c.githubUrl,
    })),
  ];

  const filtered = allStudents.filter((s) => {
    const matchDept = selectedDept === 'All' || s.department === selectedDept;
    const matchSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.targetRole.toLowerCase().includes(search.toLowerCase());
    return matchDept && matchSearch;
  });

  return (
    <PortalLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                Institutional Cohort Intelligence
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-500">Live Skill Monitoring</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Student Monitoring Roster</h1>
            <p className="text-xs text-slate-500 mt-1">
              Track student GitHub activity, verified builder score progression, and placement pipeline status.
            </p>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-lg border border-slate-200">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by student name or role..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-600 text-slate-900"
            />
          </div>

          <div className="flex items-center gap-1.5 self-start sm:self-auto">
            {['All', 'CSE', 'AIML', 'IT', 'ECE'].map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  selectedDept === dept
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        {/* Student Table */}
        <div className="saas-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-slate-400 font-semibold border-b border-slate-100 bg-slate-50/50">
                  <th className="py-3 pl-4">Student</th>
                  <th className="py-3">Dept & Year</th>
                  <th className="py-3">CGPA</th>
                  <th className="py-3">Target Role</th>
                  <th className="py-3 text-center">Builder Score</th>
                  <th className="py-3 text-center">Employability</th>
                  <th className="py-3 pr-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 pl-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={s.avatar}
                          alt={s.name}
                          className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200"
                        />
                        <div>
                          <span className="font-bold text-slate-900 block">{s.name}</span>
                          <span className="text-[10px] text-emerald-600 font-medium">
                            {s.verifiedSkillsCount} Verified Skills
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 text-slate-600">
                      <span className="font-semibold text-slate-800">{s.department}</span> • {s.year}
                    </td>
                    <td className="py-3.5 font-bold text-slate-800">{s.cgpa}</td>
                    <td className="py-3.5 text-slate-700 font-medium">{s.targetRole}</td>
                    <td className="py-3.5 text-center font-bold text-blue-600">
                      {s.builderScore} / 1000
                    </td>
                    <td className="py-3.5 text-center">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold text-[11px]">
                        {s.employabilityScore}%
                      </span>
                    </td>
                    <td className="py-3.5 pr-4 text-right">
                      <a
                        href={s.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-blue-600 hover:underline font-medium text-[11px]"
                      >
                        Audit Git <ExternalLink className="w-3 h-3" />
                      </a>
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
