'use client';

import React from 'react';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { mockAssignments } from '@/lib/mock-data';
import { Code, Plus, CheckCircle2, Clock, Users, Award, ExternalLink } from 'lucide-react';

export default function IndustryAssignmentsPage() {
  return (
    <PortalLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                Evaluation Hub
              </span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Assignment Hub</h1>
            <p className="text-xs text-slate-500 mt-1">
              Create and evaluate coding tests, case studies, mini projects, and system design challenges.
            </p>
          </div>
          <button className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-xs flex items-center gap-1.5 self-start md:self-auto">
            <Plus className="w-3.5 h-3.5" />
            Create Challenge
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mockAssignments.map((asg) => (
            <div key={asg.id} className="saas-card p-5 space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold uppercase text-slate-400">{asg.type}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                    {asg.status}
                  </span>
                </div>
                <h2 className="text-sm font-bold text-slate-900">{asg.title}</h2>
                <p className="text-xs text-slate-500 mt-1">Target: {asg.roleTarget}</p>
                <div className="flex items-center gap-3 text-xs text-slate-500 mt-3 pt-2 border-t border-slate-100">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {asg.duration}
                  </span>
                  <span>•</span>
                  <span>Due: {asg.dueDate}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-600 font-medium">
                  {asg.submissionsCount} / {asg.totalAssigned} Submissions
                </span>
                <span className="font-bold text-blue-600">{asg.averageScore}% Avg</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PortalLayout>
  );
}
