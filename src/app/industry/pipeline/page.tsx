'use client';

import React from 'react';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { useAppStore } from '@/lib/store';
import { PipelineStage } from '@/types';
import {
  Layers,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  GitBranch,
  Award,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

export default function IndustryPipelinePage() {
  const { candidates, moveCandidateStage } = useAppStore();

  const stages: PipelineStage[] = ['Matched', 'Shortlisted', 'Assessment', 'Interview', 'Selected'];

  const getStageColor = (stage: PipelineStage) => {
    switch (stage) {
      case 'Matched':
        return 'border-t-blue-500 bg-blue-50/20';
      case 'Shortlisted':
        return 'border-t-purple-500 bg-purple-50/20';
      case 'Assessment':
        return 'border-t-amber-500 bg-amber-50/20';
      case 'Interview':
        return 'border-t-indigo-500 bg-indigo-50/20';
      case 'Selected':
        return 'border-t-emerald-500 bg-emerald-50/20';
    }
  };

  const advanceCandidate = (candId: string, currentStage: PipelineStage) => {
    const currentIndex = stages.indexOf(currentStage);
    if (currentIndex < stages.length - 1) {
      moveCandidateStage(candId, stages[currentIndex + 1]);
    }
  };

  const regressCandidate = (candId: string, currentStage: PipelineStage) => {
    const currentIndex = stages.indexOf(currentStage);
    if (currentIndex > 0) {
      moveCandidateStage(candId, stages[currentIndex - 1]);
    }
  };

  return (
    <PortalLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                Active Hiring Workflow
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-500">Kanban Board</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Recruitment Pipeline</h1>
            <p className="text-xs text-slate-500 mt-1">
              Advance verified candidates through screening, technical assessments, interviews, and final selection.
            </p>
          </div>
          <div className="text-xs text-slate-500 font-medium">
            Total Pipeline: <span className="font-bold text-slate-900">{candidates.length}</span> Active Candidates
          </div>
        </div>

        {/* 5-Column Kanban Board */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 overflow-x-auto pb-4">
          {stages.map((stage) => {
            const stageCandidates = candidates.filter((c) => c.stage === stage);
            return (
              <div
                key={stage}
                className={`saas-card flex flex-col border-t-4 rounded-xl min-w-[220px] ${getStageColor(
                  stage
                )}`}
              >
                {/* Column Header */}
                <div className="p-3.5 border-b border-slate-100 flex items-center justify-between bg-white/70">
                  <span className="font-bold text-xs text-slate-900">{stage}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    {stageCandidates.length}
                  </span>
                </div>

                {/* Candidate Cards in Stage */}
                <div className="p-2.5 space-y-2.5 flex-1 min-h-[400px]">
                  {stageCandidates.length === 0 ? (
                    <div className="h-32 flex items-center justify-center text-[11px] text-slate-400 font-medium border border-dashed border-slate-200 rounded-lg">
                      No candidates
                    </div>
                  ) : (
                    stageCandidates.map((cand) => (
                      <div
                        key={cand.id}
                        className="p-3 bg-white rounded-lg border border-slate-200 shadow-2xs space-y-2.5 hover:border-blue-400 transition-all"
                      >
                        <div className="flex items-start gap-2.5">
                          <img
                            src={cand.avatar}
                            alt={cand.name}
                            className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200 shrink-0"
                          />
                          <div className="min-w-0 flex-1">
                            <h4 className="text-xs font-bold text-slate-900 truncate">{cand.name}</h4>
                            <p className="text-[10px] text-slate-500 truncate">{cand.targetRole}</p>
                          </div>
                        </div>

                        {/* Scores */}
                        <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-100">
                          <span className="text-blue-600 font-bold">
                            Score: {cand.builderScore}
                          </span>
                          <span className="text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.2 rounded text-[10px]">
                            {cand.matchScore}% Match
                          </span>
                        </div>

                        {/* Stage Transition Arrows */}
                        <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                          <button
                            disabled={stage === 'Matched'}
                            onClick={() => regressCandidate(cand.id, cand.stage)}
                            className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 disabled:opacity-30"
                            title="Move back stage"
                          >
                            <ChevronLeft className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-[9px] font-mono uppercase text-slate-400">
                            {cand.department}
                          </span>
                          <button
                            disabled={stage === 'Selected'}
                            onClick={() => advanceCandidate(cand.id, cand.stage)}
                            className="p-1 rounded text-blue-600 hover:text-blue-800 hover:bg-blue-50 disabled:opacity-30"
                            title="Advance to next stage"
                          >
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </PortalLayout>
  );
}
