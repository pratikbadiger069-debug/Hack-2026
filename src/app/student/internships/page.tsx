'use client';

import React, { useState } from 'react';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { useAppStore } from '@/lib/store';
import { mockInternships } from '@/lib/mock-data';
import {
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  CheckCircle2,
  ExternalLink,
  Search,
  Filter,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';

export default function StudentInternshipsPage() {
  const { studentProfile } = useAppStore();
  const [internships, setInternships] = useState(mockInternships);
  const [appliedIds, setAppliedIds] = useState<string[]>(['job-102']);
  const [filterType, setFilterType] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const handleApply = (id: string) => {
    setAppliedIds((prev) => [...prev, id]);
  };

  const filtered = internships.filter((item) => {
    const matchesFilter = filterType === 'All' || item.type === filterType;
    const matchesSearch =
      item.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.company.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <PortalLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                Verified Talent Matching Engine
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-500">Direct Recruiter Routing</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Internships & Industry Opportunities
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              High-growth technical internships matched to your verified skills and Builder Score.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-slate-700">
              {appliedIds.length} Active Applications
            </span>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-lg border border-slate-200">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search roles or companies..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-600 text-slate-900"
            />
          </div>

          <div className="flex items-center gap-1.5 self-start sm:self-auto">
            {['All', 'Remote', 'Hybrid', 'On-site'].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  filterType === type
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Internship Cards Grid */}
        <div className="space-y-4">
          {filtered.map((item) => {
            const hasApplied = appliedIds.includes(item.id);
            return (
              <div
                key={item.id}
                className="saas-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-blue-300 transition-all"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={item.companyLogo}
                    alt={item.company}
                    className="w-12 h-12 rounded-xl object-cover ring-1 ring-slate-200 shrink-0"
                  />
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="text-base font-bold text-slate-900">{item.role}</h2>
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-emerald-600" />
                        {item.matchScore}% Match
                      </span>
                    </div>

                    <p className="text-xs font-semibold text-slate-700">{item.company}</p>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-0.5">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {item.location}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 font-semibold text-slate-700">
                        <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                        {item.stipend}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {item.duration}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 pt-1 max-w-2xl">{item.description}</p>

                    {/* Skill Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {item.requiredSkills.map((skill) => (
                        <span
                          key={skill}
                          className="text-[10px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Action */}
                <div className="flex flex-col items-end gap-2 shrink-0 self-end md:self-center">
                  {hasApplied ? (
                    <span className="px-4 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Application Submitted
                    </span>
                  ) : (
                    <button
                      onClick={() => handleApply(item.id)}
                      className="px-5 py-2.5 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-xs flex items-center gap-1.5"
                    >
                      <span>1-Click Verified Apply</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <span className="text-[10px] text-slate-400">
                    {item.applicantsCount} Verified Applicants • {item.postedDate}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </PortalLayout>
  );
}
