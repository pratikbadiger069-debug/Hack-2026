'use client';

import React from 'react';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { mockSkillDemandMetrics } from '@/lib/mock-data';
import { TrendingUp, Sparkles, BarChart2, DollarSign, Briefcase, Award } from 'lucide-react';

export default function AdminDemandPage() {
  const topRoles = [
    { role: 'AI Systems Engineer', demand: '96% Index', growth: '+164%', count: '4,850 Roles' },
    { role: 'Distributed Backend Architect', demand: '93% Index', growth: '+52%', count: '6,200 Roles' },
    { role: 'Vector Search & Data Platform Engineer', demand: '89% Index', growth: '+188%', count: '3,100 Roles' },
    { role: 'Cloud Native DevOps & Site Reliability', demand: '87% Index', growth: '+44%', count: '5,400 Roles' },
  ];

  return (
    <PortalLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100 flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-blue-600" />
                Macro Workforce Telemetry
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-500">Live Industry Index</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Skill Demand Intelligence</h1>
            <p className="text-xs text-slate-500 mt-1">
              Real-time aggregation of industry job requisitions, emerging technologies, compensation benchmarks, and hiring trends.
            </p>
          </div>
        </div>

        {/* Most Demanded Roles Grid */}
        <div className="saas-card p-6 space-y-4">
          <h2 className="text-sm font-bold text-slate-900">Highest-Demand Enterprise Roles (2026)</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {topRoles.map((r) => (
              <div key={r.role} className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">{r.demand}</span>
                <h3 className="text-xs font-bold text-slate-900">{r.role}</h3>
                <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-200/60">
                  <span className="text-emerald-700 font-bold">{r.growth} YoY</span>
                  <span className="font-semibold text-slate-700">{r.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Demand Metrics Table */}
        <div className="saas-card p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Fastest Growing Competencies & Tech Stacks</h2>
              <p className="text-xs text-slate-500">Market adoption index mapped across 300+ hiring partners</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-slate-400 font-semibold border-b border-slate-100">
                  <th className="pb-3 pl-2">Skill / Technology</th>
                  <th className="pb-3">Domain Category</th>
                  <th className="pb-3 text-center">Market Demand</th>
                  <th className="pb-3 text-center">YoY Growth</th>
                  <th className="pb-3 text-right">Avg Base Salary</th>
                  <th className="pb-3 text-right pr-2">Open Positions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {mockSkillDemandMetrics.map((item) => (
                  <tr key={item.skill} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 pl-2 font-bold text-slate-900">{item.skill}</td>
                    <td className="py-3.5 text-slate-600 font-medium">{item.category}</td>
                    <td className="py-3.5 text-center">
                      <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold text-[11px]">
                        {item.demandPercentage}%
                      </span>
                    </td>
                    <td className="py-3.5 text-center font-bold text-emerald-700">
                      +{item.growthRate}%
                    </td>
                    <td className="py-3.5 text-right font-semibold text-slate-800">{item.avgSalary}</td>
                    <td className="py-3.5 text-right pr-2 text-slate-600 font-medium">
                      {item.openRolesCount.toLocaleString()}
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
