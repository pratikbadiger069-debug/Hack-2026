'use client';

import React from 'react';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { Building2, Briefcase, CheckCircle2, Clock, Mail, ArrowUpRight } from 'lucide-react';

export default function InstituteRequestsPage() {
  const requests = [
    {
      id: 'req-1',
      company: 'Anthropic Labs Partner Network',
      requestedRole: 'AI Systems Engineer (2026 Batch)',
      candidatesCount: 15,
      minBuilderScore: 850,
      date: '2 days ago',
      status: 'In Review',
    },
    {
      id: 'req-2',
      company: 'Stripe Scale Program',
      requestedRole: 'Distributed Backend Platform Engineer',
      candidatesCount: 20,
      minBuilderScore: 800,
      date: '4 days ago',
      status: 'Approved & Dispatched',
    },
  ];

  return (
    <PortalLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between bg-white p-6 rounded-xl border border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                Corporate Hiring Partnerships
              </span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Industry Recruitment Requests</h1>
            <p className="text-xs text-slate-500 mt-1">
              Direct talent requisition requests received from verified enterprise hiring partners.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {requests.map((r) => (
            <div key={r.id} className="saas-card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-bold text-slate-900">{r.company}</h2>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700">
                    {r.status}
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-medium">{r.requestedRole}</p>
                <div className="flex items-center gap-3 text-[11px] text-slate-400">
                  <span>Req: {r.candidatesCount} Candidates</span>
                  <span>•</span>
                  <span>Min Score: {r.minBuilderScore}+</span>
                  <span>•</span>
                  <span>{r.date}</span>
                </div>
              </div>

              <button className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-xs self-start sm:self-auto">
                Approve Talent Batch
              </button>
            </div>
          ))}
        </div>
      </div>
    </PortalLayout>
  );
}
