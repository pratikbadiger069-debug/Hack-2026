'use client';

import React from 'react';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { Bell, CheckCircle2, Sparkles, Building2, Briefcase, Award, Clock } from 'lucide-react';

export default function StudentNotificationsPage() {
  const notifications = [
    {
      id: 'notif-1',
      title: 'Skill Verified: Python & FastAPI',
      message: 'Faculty Dr. Radhika Sen validated your project score (95/100) and signed cryptographic verification SB-PY-95821.',
      category: 'Verification',
      time: '15 mins ago',
      icon: CheckCircle2,
      color: 'text-emerald-600 bg-emerald-50',
    },
    {
      id: 'notif-2',
      title: 'Priority Recruiter Match: Anthropic Labs',
      message: 'Your Builder Score (885) qualified you for the 94% match AI Infrastructure Engineer role.',
      category: 'Recruiter',
      time: '2 hours ago',
      icon: Briefcase,
      color: 'text-blue-600 bg-blue-50',
    },
    {
      id: 'notif-3',
      title: 'Curriculum Update Alert: Semester 6',
      message: 'New module on Vector Embeddings & pgvector added to Computer Science syllabus.',
      category: 'Institute',
      time: '1 day ago',
      icon: Building2,
      color: 'text-purple-600 bg-purple-50',
    },
    {
      id: 'notif-4',
      title: 'Builder Score Milestone: Top 5%',
      message: 'Congratulations! Your score increased by +45 pts following your hackathon repo verification.',
      category: 'Milestone',
      time: '3 days ago',
      icon: Award,
      color: 'text-amber-600 bg-amber-50',
    },
  ];

  return (
    <PortalLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between bg-white p-6 rounded-xl border border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                Live Feed
              </span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Intelligence Notifications</h1>
            <p className="text-xs text-slate-500 mt-1">
              Real-time events across faculty validations, assessment releases, and enterprise candidate matches.
            </p>
          </div>
        </div>

        <div className="saas-card divide-y divide-slate-100 overflow-hidden">
          {notifications.map((n) => {
            const Icon = n.icon;
            return (
              <div key={n.id} className="p-5 flex items-start gap-4 hover:bg-slate-50 transition-colors">
                <div className={`p-2.5 rounded-xl ${n.color} shrink-0`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-sm font-bold text-slate-900">{n.title}</h3>
                    <span className="text-xs text-slate-400">{n.time}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{n.message}</p>
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block pt-1">
                    {n.category}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </PortalLayout>
  );
}
