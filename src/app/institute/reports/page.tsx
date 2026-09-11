'use client';

import React from 'react';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { LineChart, Download, FileText, CheckCircle2, Award, Calendar } from 'lucide-react';

export default function InstituteReportsPage() {
  const reports = [
    {
      title: 'NBA / NAAC Accreditation Industry Readiness Audit (2025-2026)',
      category: 'Accreditation Compliance',
      date: 'Generated Mar 01, 2026',
      size: '2.4 MB PDF',
      status: 'Verified',
    },
    {
      title: 'B.Tech CSE & AIML Skill Gap & Modernization Synthesis',
      category: 'Curriculum Review',
      date: 'Generated Feb 28, 2026',
      size: '1.8 MB PDF',
      status: 'Ready',
    },
    {
      title: 'Annual Placement Cell Compensation & Velocity Breakdown',
      category: 'Placement Metrics',
      date: 'Generated Jan 15, 2026',
      size: '3.1 MB PDF',
      status: 'Archived',
    },
  ];

  return (
    <PortalLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between bg-white p-6 rounded-xl border border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                Institutional Auditing
              </span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Accreditation & Compliance Reports</h1>
            <p className="text-xs text-slate-500 mt-1">
              Download certified compliance reports formatted for NBA, NAAC, and ABET accreditation requirements.
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
