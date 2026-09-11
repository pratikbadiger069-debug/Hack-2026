'use client';

import React from 'react';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { UserCheck, Building2, TrendingUp, CheckCircle2, DollarSign, Download, ArrowUpRight } from 'lucide-react';

export default function InstitutePlacementPage() {
  const hiringPartners = [
    { name: 'Anthropic Labs Network', offers: 14, avgPkg: '$115,000', roles: 'AI Systems, RAG Engineers' },
    { name: 'Stripe Scale Program', offers: 18, avgPkg: '$120,000', roles: 'Distributed Systems, Backend' },
    { name: 'Linear Ventures', offers: 9, avgPkg: '$95,000', roles: 'Full-Stack Platform, Frontend' },
    { name: 'Microsoft Applied AI', offers: 24, avgPkg: '$110,000', roles: 'Cloud ML, Data Engineers' },
  ];

  return (
    <PortalLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                Placement & Corporate Relations
              </span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Placement Cell Intelligence</h1>
            <p className="text-xs text-slate-500 mt-1">
              Cohort hiring pipelines, verified candidate shortlisting, and enterprise hiring partner metrics.
            </p>
          </div>
          <button className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 flex items-center gap-1.5 self-start md:self-auto">
            <Download className="w-3.5 h-3.5" />
            Export Placement Report
          </button>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="saas-card p-5">
            <span className="text-xs font-semibold text-slate-500">Total Placed Students</span>
            <div className="text-3xl font-bold text-slate-900 mt-1">412 / 480</div>
            <span className="text-xs text-emerald-600 font-semibold mt-1 block">85.8% Cohort Placed</span>
          </div>
          <div className="saas-card p-5">
            <span className="text-xs font-semibold text-slate-500">Average Compensation</span>
            <div className="text-3xl font-bold text-slate-900 mt-1">$108,500</div>
            <span className="text-xs text-blue-600 font-semibold mt-1 block">+18.4% vs Previous Year</span>
          </div>
          <div className="saas-card p-5">
            <span className="text-xs font-semibold text-slate-500">Active Hiring Partners</span>
            <div className="text-3xl font-bold text-slate-900 mt-1">68</div>
            <span className="text-xs text-purple-600 font-semibold mt-1 block">Tier-1 Enterprise Recruiters</span>
          </div>
        </div>

        {/* Hiring Partners Table */}
        <div className="saas-card p-6">
          <h2 className="text-sm font-bold text-slate-900 mb-4">Top Enterprise Hiring Partners</h2>
          <div className="divide-y divide-slate-100">
            {hiringPartners.map((partner, idx) => (
              <div key={idx} className="py-3.5 flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-xs font-bold text-slate-900">{partner.name}</h3>
                  <span className="text-[11px] text-slate-500">{partner.roles}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-slate-900 block">{partner.offers} Offers</span>
                  <span className="text-[11px] text-emerald-600 font-semibold">{partner.avgPkg} Avg</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
