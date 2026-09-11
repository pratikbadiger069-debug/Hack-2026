'use client';

import React from 'react';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { mockAssessments } from '@/lib/mock-data';
import { CheckSquare, Plus, Users, Calendar, Award, CheckCircle2 } from 'lucide-react';

export default function InstituteAssessmentsPage() {
  return (
    <PortalLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                Institutional Testing Framework
              </span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Departmental Assessments</h1>
            <p className="text-xs text-slate-500 mt-1">
              Schedule, monitor, and audit standardized technical benchmark exams across departments.
            </p>
          </div>
          <button className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-xs flex items-center gap-1.5 self-start md:self-auto">
            <Plus className="w-3.5 h-3.5" />
            Schedule New Exam
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockAssessments.map((a) => (
            <div key={a.id} className="saas-card p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase text-slate-400">{a.category}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">
                  {a.difficulty}
                </span>
              </div>
              <h2 className="text-sm font-bold text-slate-900">{a.title}</h2>
              <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                <span>{a.questionsCount} Questions</span>
                <span className="font-semibold text-emerald-600">84.2% Avg Score</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PortalLayout>
  );
}
