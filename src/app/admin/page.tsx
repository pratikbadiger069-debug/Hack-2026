'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { useAppStore } from '@/lib/store';
import { mockSkillDemandMetrics } from '@/lib/mock-data';
import { getUserDisplayName } from '@/lib/user-utils';
import {
  ShieldCheck,
  Users,
  Building2,
  Briefcase,
  TrendingUp,
  Award,
  Zap,
  ArrowUpRight,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export default function AdminDashboardPage() {
  const { setRole, currentUser, isDemoMode } = useAppStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setRole('admin');
    setMounted(true);
  }, [setRole]);

  if (!mounted) return null;

  const trendData = [
    { month: 'Oct', students: 8200, placements: 1420 },
    { month: 'Nov', students: 9500, placements: 1850 },
    { month: 'Dec', students: 11200, placements: 2200 },
    { month: 'Jan', students: 12800, placements: 2750 },
    { month: 'Feb', students: 14400, placements: 3410 },
  ];

  return (
    <PortalLayout>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-2xs">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                Global Network Administration
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-500 font-medium">
                {isDemoMode ? 'Master Governance Console' : getUserDisplayName({ user: currentUser })}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              SkillBridge AI Global Intelligence
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Platform-wide workforce metrics, macro skill demand telemetry, and institutional ecosystem operations.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/admin/demand"
              className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-xs flex items-center gap-1.5"
            >
              <TrendingUp className="w-3.5 h-3.5" />
              Skill Demand Intelligence
            </Link>
            <Link
              href="/admin/users"
              className="px-3.5 py-2 text-xs font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors"
            >
              Manage Users
            </Link>
          </div>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="saas-card p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500">Total Verified Students</span>
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-slate-900">14,400</span>
              <span className="text-xs text-emerald-600 font-semibold">+28% MoM</span>
            </div>
            <span className="text-[11px] text-slate-500 mt-2 block">
              Across 48 Partner Universities
            </span>
          </div>

          <div className="saas-card p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500">Partner Institutes</span>
              <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                <Building2 className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-slate-900">48</span>
              <span className="text-xs text-purple-600 font-semibold">Active Deans</span>
            </div>
            <span className="text-[11px] text-slate-500 mt-2 block">
              Accreditation compliant
            </span>
          </div>

          <div className="saas-card p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500">Hiring Companies</span>
              <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                <Briefcase className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-slate-900">320</span>
              <span className="text-xs text-amber-600 font-semibold">Tier-1 SaaS</span>
            </div>
            <span className="text-[11px] text-slate-500 mt-2 block">
              Direct vector search active
            </span>
          </div>

          <div className="saas-card p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500">Total Placements</span>
              <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                <Award className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-slate-900">3,410</span>
              <span className="text-xs text-emerald-600 font-semibold">89.4% Rate</span>
            </div>
            <span className="text-[11px] text-slate-500 mt-2 block">
              $104,200 avg graduate offer
            </span>
          </div>
        </div>

        {/* Global Network Growth Chart */}
        <div className="saas-card p-6">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Network Growth & Placement Velocity</h2>
              <p className="text-xs text-slate-500">Platform candidate expansion vs successful enterprise offers</p>
            </div>
            <span className="text-xs font-semibold text-emerald-600">
              Live Macro Stream
            </span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 11 }} />
                <YAxis tick={{ fill: '#64748b', fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    borderColor: '#e2e8f0',
                    borderRadius: '0.5rem',
                    fontSize: '12px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="students"
                  stroke="#2563eb"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorStudents)"
                  name="Verified Students"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Demanded Technologies Highlight */}
        <div className="saas-card p-6">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <h2 className="text-sm font-bold text-slate-900">Fastest Growing Industry Technologies</h2>
            <Link href="/admin/demand" className="text-xs text-blue-600 hover:underline font-medium">
              View Full Demand Analytics &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mockSkillDemandMetrics.slice(0, 3).map((item) => (
              <div key={item.skill} className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase text-slate-400">{item.category}</span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    +{item.growthRate}% YoY
                  </span>
                </div>
                <h3 className="text-xs font-bold text-slate-900">{item.skill}</h3>
                <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-200/60">
                  <span>{item.openRolesCount} Open Requisitions</span>
                  <span className="font-semibold text-slate-800">{item.avgSalary}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
