'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { useAppStore } from '@/lib/store';
import { getUserFirstName, getUserDisplayName } from '@/lib/user-utils';
import { analyzeStudentCareerContext, ROLE_BENCHMARKS } from '@/lib/copilot-engine';
import {
  Award,
  TrendingUp,
  ShieldCheck,
  Briefcase,
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  Code,
  Calendar,
  ExternalLink,
  Target,
  Compass,
  CheckSquare,
  Square,
  Flame,
  Zap,
  ArrowRight,
  BookOpen,
  Bot,
  Activity,
  Layers,
  Clock,
  Edit3,
} from 'lucide-react';

export default function StudentHomePage() {
  const { studentProfile, currentUser, setRole, updateStudentTargetRole, isDemoMode } = useAppStore();
  const [mounted, setMounted] = useState(false);
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [selectedRole, setSelectedRole] = useState(studentProfile.targetRole || 'AI Engineer');
  const [missions, setMissions] = useState([
    { id: 'm-1', title: 'Complete SQL & Database Assessment', category: 'Assessment', completed: true, xp: 120 },
    { id: 'm-2', title: 'Build Expense Tracker API with Docker', category: 'Project', completed: false, xp: 350 },
    { id: 'm-3', title: 'Connect & Verify GitHub Activity Graph', category: 'Profile', completed: true, xp: 80 },
    { id: 'm-4', title: 'Optimize LinkedIn Headline & Skills', category: 'Profile', completed: false, xp: 100 },
  ]);

  useEffect(() => {
    setRole('student');
    setMounted(true);
  }, [setRole]);

  const toggleMission = (id: string) => {
    setMissions((prev) =>
      prev.map((m) => (m.id === id ? { ...m, completed: !m.completed } : m))
    );
  };

  const completedCount = missions.filter((m) => m.completed).length;

  const handleSaveGoal = (newRole: string) => {
    setSelectedRole(newRole);
    updateStudentTargetRole(newRole);
    setIsEditingGoal(false);
  };

  const firstName = getUserFirstName({ user: currentUser, profile: studentProfile });
  const currentHour = mounted ? new Date().getHours() : 10;
  const timeGreeting = currentHour < 12 ? 'Good Morning' : currentHour < 18 ? 'Good Afternoon' : 'Good Evening';

  const context = analyzeStudentCareerContext(studentProfile, selectedRole);

  if (!mounted) {
    return (
      <PortalLayout>
        <div className="p-8 text-center text-xs text-slate-500">Loading Student Command Center...</div>
      </PortalLayout>
    );
  }

  const sampleRoles = Object.keys(ROLE_BENCHMARKS);

  // Strongest and Weakest Skills
  const sortedSkills = [...(studentProfile.verifiedSkills || [])].sort((a, b) => b.score - a.score);
  const strongestSkill = sortedSkills[0] || { name: 'Python & FastAPI', score: 95 };
  const weakestSkill = sortedSkills[sortedSkills.length - 1] || { name: 'Docker & Kubernetes', score: 74 };

  const recentActivities = [
    {
      id: 'act-1',
      title: 'Python & FastAPI Assessment Passed',
      category: 'Assessment',
      score: '95% Score',
      date: '2 hours ago',
      icon: CheckCircle2,
      iconColor: 'text-emerald-600 bg-emerald-50',
    },
    {
      id: 'act-2',
      title: 'VectorMind Retrieval Engine Uploaded',
      category: 'Project',
      score: '+96 Impact',
      date: 'Yesterday',
      icon: Code,
      iconColor: 'text-blue-600 bg-blue-50',
    },
    {
      id: 'act-3',
      title: 'Distributed Systems Skill Verified',
      category: 'Skill Badge',
      score: 'Verified by Faculty',
      date: '3 days ago',
      icon: ShieldCheck,
      iconColor: 'text-purple-600 bg-purple-50',
    },
    {
      id: 'act-4',
      title: 'AI Career Roadmap Calibrated',
      category: 'Copilot',
      score: '4 Phases Generated',
      date: '5 days ago',
      icon: Compass,
      iconColor: 'text-amber-600 bg-amber-50',
    },
  ];

  return (
    <PortalLayout>
      <div className="space-y-6">
        {/* Command Center Welcome Header */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 rounded-2xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">
                  {studentProfile.academic.year} • {studentProfile.academic.department}
                </span>
                <span className="text-slate-400">•</span>
                <span className="text-xs text-slate-300">CGPA: {studentProfile.academic.cgpa}</span>
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-white">
                {timeGreeting}, {firstName} 👋
              </h1>
              <p className="text-sm text-slate-300 max-w-xl leading-relaxed">
                Continue building your verified digital identity. Your career readiness is up <strong className="text-emerald-400 font-bold">+14%</strong> this month.
              </p>
            </div>

            {/* Current Goal Widget in Header */}
            <div className="p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/15 min-w-[280px] space-y-2 self-start lg:self-auto">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-blue-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5 text-blue-400" />
                  Target Goal
                </span>
                <button
                  onClick={() => setIsEditingGoal(!isEditingGoal)}
                  className="text-[10px] text-slate-300 hover:text-white underline flex items-center gap-0.5"
                >
                  <Edit3 className="w-2.5 h-2.5" />
                  Change
                </button>
              </div>

              {isEditingGoal ? (
                <div className="space-y-2 pt-1">
                  <select
                    value={selectedRole}
                    onChange={(e) => handleSaveGoal(e.target.value)}
                    className="w-full text-xs p-1.5 rounded bg-slate-800 text-white border border-slate-700 focus:outline-none"
                  >
                    {sampleRoles.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <div className="flex items-center justify-between pt-1">
                  <span className="text-base font-bold text-white">{selectedRole}</span>
                  <Link
                    href="/student/career-copilot"
                    className="p-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
                  >
                    <Sparkles className="w-3 h-3" />
                  </Link>
                </div>
              )}

              <div className="text-[11px] text-slate-300 flex items-center justify-between pt-1 border-t border-white/10">
                <span>Readiness Rating:</span>
                <strong className="text-emerald-300 font-bold">{context.readinessScore}%</strong>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Main Highlights: Readiness Score Gauge | Weekly Missions | Opportunities Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* 1. Career Readiness Score */}
          <div className="saas-card p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-amber-500" />
                Career Readiness
              </span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                +14% Growth Trend
              </span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-4xl font-black text-slate-900 tracking-tight">
                  {context.readinessScore}%
                </div>
                <p className="text-xs text-slate-500 mt-0.5">Target: {selectedRole}</p>
              </div>

              <div className="text-right space-y-1 text-xs">
                <div className="text-slate-600">
                  Industry Avg: <strong className="text-slate-900">{context.industryAvg}%</strong>
                </div>
                <div className="text-slate-600">
                  Dept Avg: <strong className="text-slate-900">71%</strong>
                </div>
                <div className="text-slate-600">
                  Top 10%: <strong className="text-emerald-600">{context.topStudentsScore}%</strong>
                </div>
              </div>
            </div>

            <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-600 to-emerald-500 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${context.readinessScore}%` }}
              />
            </div>

            <Link
              href="/student/career-copilot"
              className="w-full py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Explore Skill Gaps &amp; Roadmap</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* 2. Weekly Missions */}
          <div className="saas-card p-6 space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-3">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Weekly Missions
                </span>
                <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                  {completedCount} of {missions.length} Done
                </span>
              </div>

              <div className="space-y-2">
                {missions.map((m) => (
                  <div
                    key={m.id}
                    onClick={() => toggleMission(m.id)}
                    className={`p-2.5 rounded-lg border text-xs cursor-pointer flex items-center justify-between transition-all ${
                      m.completed
                        ? 'bg-emerald-50/40 border-emerald-200 text-emerald-950'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {m.completed ? (
                        <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-400 shrink-0" />
                      )}
                      <span
                        className={`text-xs ${
                          m.completed ? 'line-through text-slate-400 font-normal' : 'font-semibold text-slate-800'
                        }`}
                      >
                        {m.title}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-blue-600 shrink-0">+{m.xp} XP</span>
                  </div>
                ))}
              </div>
            </div>

            <Link
              href="/student/journey"
              className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors mt-2"
            >
              <span>View Full Passport &amp; Evidences</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* 3. Opportunity Summary */}
          <div className="saas-card p-6 space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-indigo-600" />
                  Opportunity Radar
                </span>
                <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                  6 Matches
                </span>
              </div>

              <div className="space-y-2.5 pt-2">
                <div className="p-3 bg-indigo-50/50 rounded-lg border border-indigo-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-indigo-600" />
                    <div>
                      <strong className="text-slate-900 block font-semibold">3 New Internship Matches</strong>
                      <span className="text-[10px] text-slate-500">Anthropic, Stripe, Google</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                    94% Fit
                  </span>
                </div>

                <div className="p-3 bg-amber-50/50 rounded-lg border border-amber-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-600" />
                    <div>
                      <strong className="text-slate-900 block font-semibold">2 Live Hackathons</strong>
                      <span className="text-[10px] text-slate-500">Global AI Systems 2026 ($50k)</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                    98% Fit
                  </span>
                </div>

                <div className="p-3 bg-blue-50/50 rounded-lg border border-blue-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Code className="w-4 h-4 text-blue-600" />
                    <div>
                      <strong className="text-slate-900 block font-semibold">1 Industry Challenge</strong>
                      <span className="text-[10px] text-slate-500">Distributed Rate Limiter RFP</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-blue-800 bg-blue-100 px-2 py-0.5 rounded">
                    89% Fit
                  </span>
                </div>
              </div>
            </div>

            <Link
              href="/student/opportunities"
              className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
            >
              <span>Explore All 6 Matched Openings</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Quick Insights Grid & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Quick Insights (4 Cards) */}
          <div className="lg:col-span-7 space-y-4">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Zap className="w-4 h-4 text-blue-600" />
              Quick Intelligence Insights
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Strongest Skill */}
              <div className="saas-card p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Strongest Asset</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-base font-bold text-slate-900">{strongestSkill.name}</div>
                <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-100">
                  <span>Verified Score:</span>
                  <strong className="text-emerald-600 font-bold">{strongestSkill.score}%</strong>
                </div>
              </div>

              {/* Weakest Skill / Priority Delta */}
              <div className="saas-card p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Priority Delta</span>
                  <AlertCircle className="w-4 h-4 text-amber-500" />
                </div>
                <div className="text-base font-bold text-slate-900">{weakestSkill.name}</div>
                <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-100">
                  <span>Current Competency:</span>
                  <strong className="text-amber-600 font-bold">{weakestSkill.score}%</strong>
                </div>
              </div>

              {/* Builder Score */}
              <div className="saas-card p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Builder Index</span>
                  <Award className="w-4 h-4 text-blue-600" />
                </div>
                <div className="text-base font-bold text-slate-900">
                  {studentProfile.builderScores.overall} / 1000
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-100">
                  <span>Rank:</span>
                  <strong className="text-blue-600 font-bold">Top 5% National Tier</strong>
                </div>
              </div>

              {/* Learning Velocity */}
              <div className="saas-card p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Learning Velocity</span>
                  <TrendingUp className="w-4 h-4 text-purple-600" />
                </div>
                <div className="text-base font-bold text-slate-900">Top 8% Growth Rate</div>
                <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-100">
                  <span>GitHub Commits:</span>
                  <strong className="text-purple-600 font-bold">+38% MoM</strong>
                </div>
              </div>
            </div>

            {/* Quick Banner to Copilot */}
            <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Have questions about placement readiness?</h4>
                  <p className="text-[11px] text-slate-600">Ask Career Copilot 3.0 for personalized project recommendations and roadmap milestones.</p>
                </div>
              </div>
              <Link
                href="/student/career-copilot"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shrink-0 transition-colors shadow-2xs"
              >
                Launch Copilot
              </Link>
            </div>
          </div>

          {/* Recent Activity Timeline (5 Columns) */}
          <div className="lg:col-span-5 saas-card p-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-blue-600" />
                Recent Verified Activity
              </h2>
              <span className="text-[10px] text-slate-400">Live Feed</span>
            </div>

            <div className="space-y-3">
              {recentActivities.map((act) => {
                const Icon = act.icon;
                return (
                  <div
                    key={act.id}
                    className="p-3 bg-slate-50/70 border border-slate-100 rounded-xl flex items-start gap-3 text-xs"
                  >
                    <div className={`p-2 rounded-lg shrink-0 ${act.iconColor}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <strong className="text-slate-900 font-semibold truncate block">
                          {act.title}
                        </strong>
                        <span className="text-[10px] text-slate-400 shrink-0">{act.date}</span>
                      </div>
                      <div className="flex items-center justify-between mt-1 text-[11px]">
                        <span className="text-slate-500">{act.category}</span>
                        <span className="font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded">
                          {act.score}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <Link
              href="/student/journey"
              className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>View Full Verified History in My Journey</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
