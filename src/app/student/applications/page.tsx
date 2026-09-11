'use client';

import React from 'react';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { useAppStore } from '@/lib/store';
import { Briefcase, CheckCircle2, Clock, MapPin, DollarSign, ArrowUpRight, Building2 } from 'lucide-react';

export default function StudentApplicationsPage() {
  const { candidates, studentProfile } = useAppStore();

  const myApplications = candidates.filter((c) => c.studentId === studentProfile.id || c.name === studentProfile.name);

  const stages = ['Matched', 'Shortlisted', 'Assessment', 'Interview', 'Selected'];

  return (
    <PortalLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                Application Telemetry
              </span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Active Applications & Pipeline</h1>
            <p className="text-xs text-slate-500 mt-1">
              Track your real-time recruitment progression across hiring stages.
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-700">
            {myApplications.length} Submissions Active
          </span>
        </div>

        <div className="space-y-4">
          {myApplications.map((app) => {
            const currentStageIndex = stages.indexOf(app.stage);
            return (
              <div key={app.id} className="saas-card p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                  <div>
                    <h2 className="text-base font-bold text-slate-900">{app.targetRole}</h2>
                    <span className="text-xs text-slate-500">
                      Anthropic Labs Partner Network • Applied {app.appliedDate}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 self-start sm:self-auto">
                    {app.matchScore}% Match Score
                  </span>
                </div>

                {/* 5-Stage Visual Progress Bar */}
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase text-slate-400">Recruitment Progression</span>
                  <div className="grid grid-cols-5 gap-2 text-center text-xs">
                    {stages.map((stageName, sIdx) => {
                      const isPassed = sIdx <= currentStageIndex;
                      const isCurrent = sIdx === currentStageIndex;
                      return (
                        <div key={stageName} className="space-y-1">
                          <div
                            className={`h-2 rounded-full transition-all ${
                              isPassed ? 'bg-blue-600' : 'bg-slate-200'
                            }`}
                          />
                          <span
                            className={`text-[11px] block truncate ${
                              isCurrent
                                ? 'font-bold text-blue-700'
                                : isPassed
                                ? 'font-medium text-slate-700'
                                : 'text-slate-400'
                            }`}
                          >
                            {stageName}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </PortalLayout>
  );
}
