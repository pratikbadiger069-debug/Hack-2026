'use client';

import React, { useState } from 'react';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { useAppStore } from '@/lib/store';
import { JobRequirement } from '@/types';
import { Briefcase, Plus, MapPin, DollarSign, Users, CheckCircle2, X } from 'lucide-react';

export default function IndustryJobsPage() {
  const { jobs, addJobRequirement } = useAppStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    department: 'Applied AI & Systems',
    experienceLevel: 'Entry Level (0-1 yrs)' as const,
    location: 'Bangalore / Remote',
    type: 'Full-Time' as const,
    salaryRange: '$90,000 - $120,000',
    minMatchScore: 80,
    requiredSkills: 'Python, FastAPI, Vector Search',
    preferredSkills: 'vLLM, Docker, Kubernetes',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) return;

    addJobRequirement({
      title: formData.title,
      department: formData.department,
      experienceLevel: formData.experienceLevel,
      location: formData.location,
      type: formData.type,
      salaryRange: formData.salaryRange,
      minMatchScore: Number(formData.minMatchScore),
      requiredSkills: formData.requiredSkills.split(',').map((s) => s.trim()),
      preferredSkills: formData.preferredSkills.split(',').map((s) => s.trim()),
      status: 'Active',
    });

    setIsModalOpen(false);
    setFormData({
      title: '',
      department: 'Applied AI & Systems',
      experienceLevel: 'Entry Level (0-1 yrs)',
      location: 'Bangalore / Remote',
      type: 'Full-Time',
      salaryRange: '$90,000 - $120,000',
      minMatchScore: 80,
      requiredSkills: 'Python, FastAPI, Vector Search',
      preferredSkills: 'vLLM, Docker, Kubernetes',
    });
  };

  return (
    <PortalLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                Talent Requisitions
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-500">Live Hiring Profiles</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Job Requirements</h1>
            <p className="text-xs text-slate-500 mt-1">
              Create and manage job roles with automated minimum skill match scoring thresholds.
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-xs flex items-center gap-1.5 self-start md:self-auto"
          >
            <Plus className="w-3.5 h-3.5" />
            Post New Role
          </button>
        </div>

        {/* Requisitions List */}
        <div className="space-y-4">
          {jobs.map((job) => (
            <div key={job.id} className="saas-card p-6 space-y-4 hover:border-blue-300 transition-all">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-base font-bold text-slate-900">{job.title}</h2>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                      Min Match: {job.minMatchScore}%
                    </span>
                    <span className="text-xs font-medium px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">
                      {job.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1.5">
                    <span>{job.department}</span>
                    <span>•</span>
                    <span>{job.experienceLevel}</span>
                    <span>•</span>
                    <span>{job.location}</span>
                    <span>•</span>
                    <span className="font-semibold text-slate-700">{job.salaryRange}</span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs font-bold text-slate-900 block">
                    {job.activeApplicants} Matched Applicants
                  </span>
                  <span className="text-[10px] text-slate-400">Created {job.createdAt}</span>
                </div>
              </div>

              {/* Required & Preferred Skills */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3 border-t border-slate-100 text-xs">
                <div>
                  <span className="font-semibold text-slate-700 block mb-1">Required Competencies</span>
                  <div className="flex flex-wrap gap-1">
                    {job.requiredSkills.map((s) => (
                      <span key={s} className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px]">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="font-semibold text-slate-700 block mb-1">Preferred Skills</span>
                  <div className="flex flex-wrap gap-1">
                    {job.preferredSkills.map((s) => (
                      <span key={s} className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-[11px]">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Create Role Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
            <div className="w-full max-w-lg bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                <h3 className="font-semibold text-slate-900 text-sm">Create New Role Requirement</h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 text-slate-400 hover:text-slate-600 rounded-md hover:bg-slate-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Job Title</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Distributed Systems AI Engineer"
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-900 focus:ring-1 focus:ring-blue-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Department</label>
                    <input
                      type="text"
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Min Match Score (%)</label>
                    <input
                      type="number"
                      min="50"
                      max="100"
                      value={formData.minMatchScore}
                      onChange={(e) => setFormData({ ...formData, minMatchScore: Number(e.target.value) })}
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Location</label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Salary Range</label>
                    <input
                      type="text"
                      value={formData.salaryRange}
                      onChange={(e) => setFormData({ ...formData, salaryRange: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Required Skills (Comma separated)
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.requiredSkills}
                    onChange={(e) => setFormData({ ...formData, requiredSkills: e.target.value })}
                    placeholder="Python, FastAPI, pgvector, Docker"
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-900 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Preferred Skills (Comma separated)
                  </label>
                  <input
                    type="text"
                    value={formData.preferredSkills}
                    onChange={(e) => setFormData({ ...formData, preferredSkills: e.target.value })}
                    placeholder="vLLM, Kubernetes, CUDA"
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-900 font-mono"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-xs"
                  >
                    Create & Index Role
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </PortalLayout>
  );
}
