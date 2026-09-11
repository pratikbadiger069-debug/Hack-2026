'use client';

import React from 'react';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { Calendar, Clock, Video, User, CheckCircle2 } from 'lucide-react';

export default function IndustryInterviewsPage() {
  const interviews = [
    {
      candidate: 'Aarav Sharma',
      role: 'AI Systems Engineer',
      time: 'Today at 3:30 PM EST',
      interviewer: 'Marcus Vance (Principal Architect)',
      status: 'Confirmed',
      meetingUrl: 'https://meet.google.com/sb-ai-interview',
    },
    {
      candidate: 'Devansh Kulkarni',
      role: 'Distributed Systems Platform Engineer',
      time: 'Tomorrow at 11:00 AM EST',
      interviewer: 'Elena Rostova (Lead SRE)',
      status: 'Scheduled',
      meetingUrl: 'https://meet.google.com/sb-ds-interview',
    },
  ];

  return (
    <PortalLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between bg-white p-6 rounded-xl border border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                Technical Screenings
              </span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Interview Scheduling & Feedback</h1>
            <p className="text-xs text-slate-500 mt-1">
              Conduct and log structured technical evaluation interviews with verified student builders.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {interviews.map((item, idx) => (
            <div key={idx} className="saas-card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-bold text-slate-900">{item.candidate}</h2>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                    {item.status}
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-medium">Target Role: {item.role}</p>
                <div className="flex items-center gap-3 text-[11px] text-slate-500 pt-0.5">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-blue-600" />
                    {item.time}
                  </span>
                  <span>•</span>
                  <span>Interviewer: {item.interviewer}</span>
                </div>
              </div>

              <a
                href={item.meetingUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-xs flex items-center gap-1.5 self-start sm:self-auto"
              >
                <Video className="w-3.5 h-3.5" />
                Join Video Room
              </a>
            </div>
          ))}
        </div>
      </div>
    </PortalLayout>
  );
}
