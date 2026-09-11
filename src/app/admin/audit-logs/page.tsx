'use client';

import React from 'react';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { ShieldCheck, Clock, Search, Filter, Database, Key, CheckCircle2 } from 'lucide-react';

export default function AdminAuditLogsPage() {
  const logs = [
    {
      action: 'FACULTY_SKILL_VALIDATION',
      entity: 'SkillPassport',
      user: 'Dr. Radhika Sen (Dean)',
      ip: '192.241.142.18',
      time: '12 mins ago',
      details: 'Validated Python & FastAPI for Student std-98214 (Code: SB-PY-95821)',
    },
    {
      action: 'AI_BYOK_INVOCATION',
      entity: 'CareerCopilot',
      user: 'Aarav Sharma (Student)',
      ip: '104.28.21.90',
      time: '24 mins ago',
      details: 'Executed Gemini 1.5 Flash Copilot diagnosis for AI Engineer role',
    },
    {
      action: 'RECRUITER_PIPELINE_TRANSITION',
      entity: 'CandidateApplication',
      user: 'Marcus Vance (Recruiter)',
      ip: '142.250.190.46',
      time: '1 hour ago',
      details: 'Moved candidate std-98214 from Shortlisted to Assessment stage',
    },
    {
      action: 'CURRICULUM_PDF_INGESTION',
      entity: 'CurriculumAnalysis',
      user: 'Dr. Radhika Sen (Dean)',
      ip: '192.241.142.18',
      time: '3 hours ago',
      details: 'Extracted 44 topics from CSE 6th Sem Syllabus PDF (Relevance: 78%)',
    },
  ];

  return (
    <PortalLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between bg-white p-6 rounded-xl border border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                Security & Compliance
              </span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">System Audit Logs</h1>
            <p className="text-xs text-slate-500 mt-1">
              Immutable telemetry log of authentication, credential signatures, and BYOK AI gateway invocations.
            </p>
          </div>
        </div>

        <div className="saas-card divide-y divide-slate-100 overflow-hidden">
          {logs.map((l, idx) => (
            <div key={idx} className="p-4 hover:bg-slate-50 transition-colors space-y-1">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-mono font-bold text-[10px]">
                    {l.action}
                  </span>
                  <span className="font-semibold text-slate-900">{l.user}</span>
                </div>
                <span className="text-slate-400 text-[11px]">{l.time}</span>
              </div>
              <p className="text-xs text-slate-600 font-mono text-[11px]">{l.details}</p>
              <div className="flex items-center gap-2 text-[10px] text-slate-400">
                <span>IP: {l.ip}</span>
                <span>•</span>
                <span>Entity: {l.entity}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PortalLayout>
  );
}
