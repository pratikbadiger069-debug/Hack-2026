'use client';

import React from 'react';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { useAppStore } from '@/lib/store';
import { mockRoadmapPhases } from '@/lib/mock-data';
import {
  Map,
  CheckCircle2,
  Lock,
  Clock,
  BookOpen,
  Code,
  CheckSquare,
  Sparkles,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';

export default function LearningRoadmapPage() {
  const { studentProfile } = useAppStore();

  return (
    <PortalLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                4-Phase Milestone Architecture
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-500">Target Role: {studentProfile.targetRole}</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Learning Roadmap</h1>
            <p className="text-xs text-slate-500 mt-1">
              Curated milestone path from algorithmic fundamentals to enterprise-grade AI systems and recruiter discovery.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <span className="text-xs font-bold text-slate-900">Overall Progress: 68%</span>
              <p className="text-[11px] text-blue-600 font-medium">Phase 3: Advanced in Progress</p>
            </div>
          </div>
        </div>

        {/* 4 Phases List */}
        <div className="space-y-6">
          {mockRoadmapPhases.map((phase) => {
            const isCompleted = phase.status === 'completed';
            const isInProgress = phase.status === 'in_progress';
            const isLocked = phase.status === 'locked';

            return (
              <div
                key={phase.id}
                className={`saas-card p-6 border-l-4 transition-all ${
                  isCompleted
                    ? 'border-l-emerald-600 bg-white'
                    : isInProgress
                    ? 'border-l-blue-600 bg-white shadow-xs ring-1 ring-blue-600/10'
                    : 'border-l-slate-300 bg-slate-50/50 opacity-80'
                }`}
              >
                {/* Phase Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm ${
                        isCompleted
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : isInProgress
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : isLocked ? <Lock className="w-4 h-4" /> : phase.phaseNumber}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-slate-400 uppercase">
                          Phase {phase.phaseNumber}
                        </span>
                        <h2 className="text-base font-bold text-slate-900">{phase.title}</h2>
                        {isInProgress && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 animate-pulse">
                            Active Sprint
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">{phase.description}</p>
                    </div>
                  </div>

                  <div className="w-40 shrink-0">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-slate-500 text-[11px]">Phase Progress</span>
                      <span className="font-bold text-slate-900">{phase.progressPercentage}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          isCompleted ? 'bg-emerald-600' : isInProgress ? 'bg-blue-600' : 'bg-slate-300'
                        }`}
                        style={{ width: `${phase.progressPercentage}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* 3 Categories: Courses, Projects, Assessments */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-5">
                  {/* Courses */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                      Courses ({phase.courses.length})
                    </h3>
                    <div className="space-y-2">
                      {phase.courses.map((course, idx) => (
                        <div
                          key={idx}
                          className="p-3 bg-slate-50 border border-slate-100 rounded-lg text-xs space-y-1"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <span className="font-semibold text-slate-900">{course.title}</span>
                            {course.completed && (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            )}
                          </div>
                          <div className="flex items-center justify-between text-[11px] text-slate-400">
                            <span>{course.provider}</span>
                            <span>{course.duration}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Projects */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                      <Code className="w-3.5 h-3.5 text-purple-600" />
                      Projects ({phase.projects.length})
                    </h3>
                    <div className="space-y-2">
                      {phase.projects.map((proj, idx) => (
                        <div
                          key={idx}
                          className="p-3 bg-slate-50 border border-slate-100 rounded-lg text-xs space-y-1"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <span className="font-semibold text-slate-900">{proj.title}</span>
                            {proj.completed && (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            )}
                          </div>
                          <p className="text-[11px] text-slate-500 line-clamp-1">{proj.description}</p>
                          <div className="flex flex-wrap gap-1 pt-1">
                            {proj.techStack.map((tech) => (
                              <span
                                key={tech}
                                className="text-[9px] font-medium bg-white px-1.5 py-0.2 rounded border border-slate-200 text-slate-600"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Assessments */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                      <CheckSquare className="w-3.5 h-3.5 text-emerald-600" />
                      Assessments ({phase.assessments.length})
                    </h3>
                    <div className="space-y-2">
                      {phase.assessments.map((asm, idx) => (
                        <div
                          key={idx}
                          className="p-3 bg-slate-50 border border-slate-100 rounded-lg text-xs flex items-center justify-between"
                        >
                          <div>
                            <span className="font-semibold text-slate-900 block">{asm.title}</span>
                            <span className="text-[10px] text-slate-500">{asm.category}</span>
                          </div>
                          {asm.completed ? (
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                              Passed
                            </span>
                          ) : isLocked ? (
                            <Lock className="w-3.5 h-3.5 text-slate-400" />
                          ) : (
                            <span className="text-[10px] font-semibold text-blue-600">Pending</span>
                          )}
                        </div>
                      ))}
                    </div>
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
