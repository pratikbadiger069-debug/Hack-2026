'use client';

import React from 'react';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { FileCheck, BookOpen, Plus, Tag, CheckCircle2 } from 'lucide-react';

export default function AdminContentPage() {
  const taxonomy = [
    { category: 'Programming Languages', skillsCount: 42, activeAssessments: 12 },
    { category: 'AI & Large Language Models', skillsCount: 38, activeAssessments: 8 },
    { category: 'Distributed Systems & Cloud', skillsCount: 29, activeAssessments: 10 },
    { category: 'Data Engineering & Analytics', skillsCount: 31, activeAssessments: 6 },
    { category: 'DevOps & Site Reliability', skillsCount: 24, activeAssessments: 7 },
  ];

  return (
    <PortalLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                Taxonomy & Curriculum Standards
              </span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Content & Taxonomy Management</h1>
            <p className="text-xs text-slate-500 mt-1">
              Configure global skill definitions, domain taxonomies, and standardized assessment rubrics.
            </p>
          </div>
          <button className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-xs flex items-center gap-1.5 self-start md:self-auto">
            <Plus className="w-3.5 h-3.5" />
            Add Skill Taxonomy
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {taxonomy.map((t, idx) => (
            <div key={idx} className="saas-card p-5 space-y-3">
              <span className="text-[10px] font-bold uppercase text-slate-400">Domain Classification</span>
              <h2 className="text-sm font-bold text-slate-900">{t.category}</h2>
              <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                <span>{t.skillsCount} Defined Skills</span>
                <span className="font-semibold text-blue-600">{t.activeAssessments} Active Tests</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PortalLayout>
  );
}
