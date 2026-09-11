'use client';

import React from 'react';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { Compass, Trophy, Award, ExternalLink, Calendar, Users, DollarSign, ArrowUpRight } from 'lucide-react';

export default function StudentOpportunitiesPage() {
  const opportunities = [
    {
      id: 'opp-1',
      title: 'Global Autonomous Agents Hackathon 2026',
      organizer: 'OpenAI & LangChain Foundation',
      category: 'Hackathon',
      prize: '$50,000 Prize Pool',
      deadline: 'Apr 15, 2026',
      type: 'Online / Global',
      teamSize: '1 - 4 Members',
      description: 'Build enterprise-grade multi-agent autonomous decision workflows using LangGraph and function calling.',
      link: 'https://devpost.com',
    },
    {
      id: 'opp-2',
      title: 'Undergraduate AI & Systems Research Fellowship',
      organizer: 'Stanford & DeepLearning.AI',
      category: 'Research Grant',
      prize: '$12,000 Stipend Grant',
      deadline: 'May 01, 2026',
      type: 'Hybrid Fellowship',
      teamSize: 'Individual',
      description: 'Funded 3-month research residency focusing on on-device LLM quantization and low-power edge inference.',
      link: 'https://arxiv.org',
    },
    {
      id: 'opp-3',
      title: 'vLLM & Triton Open Source Kernel Bounty',
      organizer: 'Linux Foundation CNCF',
      category: 'Open Source Bounty',
      prize: '$4,000 per merged RFC',
      deadline: 'Rolling 2026',
      type: 'Remote Async',
      teamSize: 'Individual / Pair',
      description: 'Implement optimized CUDA memory kernels for speculative decoding and chunked prefill attention.',
      link: 'https://github.com',
    },
  ];

  return (
    <PortalLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                Ecosystem Intel
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-500">Hackathons, Grants & Bounties</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Opportunities & Bounties</h1>
            <p className="text-xs text-slate-500 mt-1">
              Accelerate your Builder Score through high-impact collegiate hackathons, funded research grants, and open-source bounties.
            </p>
          </div>
        </div>

        {/* List of Opportunities */}
        <div className="space-y-4">
          {opportunities.map((opp) => (
            <div key={opp.id} className="saas-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                    {opp.category}
                  </span>
                  <h2 className="text-base font-bold text-slate-900">{opp.title}</h2>
                </div>
                <p className="text-xs font-semibold text-slate-600">{opp.organizer}</p>
                <p className="text-xs text-slate-600 leading-relaxed">{opp.description}</p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                  <span className="flex items-center gap-1 font-semibold text-emerald-700">
                    <DollarSign className="w-3.5 h-3.5" />
                    {opp.prize}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    Deadline: {opp.deadline}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    {opp.teamSize}
                  </span>
                </div>
              </div>

              <div className="shrink-0 self-end md:self-center">
                <a
                  href={opp.link}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-xs inline-flex items-center gap-1.5"
                >
                  <span>Apply & Register</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PortalLayout>
  );
}
