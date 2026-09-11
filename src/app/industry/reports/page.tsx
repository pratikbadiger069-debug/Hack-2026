'use client';

import React from 'react';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { LineChart, Download, FileText, CheckCircle2, Award, Calendar } from 'lucide-react';

export default function IndustryReportsPage() {
  const reports = [
    {
      title: 'Talent Quality & Verified Builder Score Cohort Report',
      category: 'Talent Analytics',
      date: 'Generated Mar 02, 2026',
      size: '1.9 MB PDF',
    },
    {
      title: 'Recruitment Pipeline Velocity & Conversion Audit',
      category: 'Hiring Efficiency',
      date: 'Generated Feb 25, 2026',
      size: '2.1 MB PDF',
    },
  ];

  return (
    <PortalLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between bg-white p-6 rounded-xl border border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                Recruitment Intelligence
              </span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Hiring Reports & Funnel Metrics</h1>
            <p className="text-xs text-slate-500 mt-1">
              Audit talent acquisition velocity, pass-through ratios, and builder quality metrics.
            </p>
          </div>
        </div>

        <div className="saas-card divide-y divide-slate-100 overflow-hidden">
          {reports.map((r, idx) => (
            <div key={idx} className="p-5 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg shrink-0 mt-0.5">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xs font-bold text-slate-900">{r.title}</h2>
                  <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-1">
                    <span className="font-medium text-slate-700">{r.category}</span>
                    <span>•</span>
                    <span>{r.date}</span>
                    <span>•</span>
                    <span>{r.size}</span>
                  </div>
                </div>
              </div>

              <button className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 flex items-center gap-1.5 shrink-0">
                <Download className="w-3.5 h-3.5 text-blue-600" />
                Download PDF
              </button>
            </div>
          ))}
        </div>
      </div>
    </PortalLayout>
  );
}
