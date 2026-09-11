'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { useAppStore } from '@/lib/store';
import { getUserFirstName } from '@/lib/user-utils';
import { analyzeStudentCareerContext, ROLE_BENCHMARKS } from '@/lib/copilot-engine';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Bot,
  Compass,
  CheckSquare,
  Square,
  Briefcase,
  Target,
  Edit3,
  TrendingUp,
  Clock,
  ShieldCheck,
  Code,
} from 'lucide-react';

export default function StudentHomePage() {
  const { studentProfile, currentUser, setRole, updateStudentTargetRole, isDemoMode } = useAppStore();
  const [mounted, setMounted] = useState(false);
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [selectedRole, setSelectedRole] = useState(studentProfile.targetRole || 'AI Engineer');

  // Only 3 high-yield focus tasks (per design directive)
  const [weeklyTasks, setWeeklyTasks] = useState([
    { id: 't-1', title: 'Complete SQL & Database Assessment', completed: true },
    { id: 't-2', title: 'Build Expense Tracker API with Docker', completed: false },
    { id: 't-3', title: 'Connect & Verify GitHub Portfolio', completed: false },
  ]);

  useEffect(() => {
    setRole('student');
    setMounted(true);
  }, [setRole]);

  const toggleTask = (id: string) => {
    setWeeklyTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleSaveGoal = (newRole: string) => {
    setSelectedRole(newRole);
    updateStudentTargetRole(newRole);
    setIsEditingGoal(false);
  };

  const firstName = getUserFirstName({ user: currentUser, profile: studentProfile });
  const currentHour = mounted ? new Date().getHours() : 18;
  const timeGreeting = currentHour < 12 ? 'Good Morning' : currentHour < 18 ? 'Good Afternoon' : 'Good Evening';

  const context = analyzeStudentCareerContext(studentProfile, selectedRole);
  const sampleRoles = Object.keys(ROLE_BENCHMARKS);

  if (!mounted) {
    return (
      <PortalLayout>
        <div className="py-20 text-center text-sm text-[#6B6B6B]">
          <div className="w-8 h-8 rounded-full border-2 border-[#D97706] border-t-transparent animate-spin mx-auto mb-3" />
          Preparing your workspace...
        </div>
      </PortalLayout>
    );
  }

  const completedCount = weeklyTasks.filter((t) => t.completed).length;

  return (
    <PortalLayout>
      <div className="space-y-12 max-w-5xl mx-auto pb-16">
        {/* 1. Hero Section — Calm, Human & Warm */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#F0EEE6] text-[#1F1F1F] border border-[#ECEAE4] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#D97706]" />
              {studentProfile.academic.year} • {studentProfile.academic.department}
            </span>
          </div>

          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#1F1F1F]">
              {timeGreeting}, {firstName}.
            </h1>
            <p className="text-xl sm:text-2xl text-[#6B6B6B] font-normal">
              Your future isn&apos;t a dream, it&apos;s a plan.
            </p>
          </div>

          <p className="text-sm text-[#6B6B6B] max-w-2xl leading-relaxed">
            You&apos;re making great progress. Let&apos;s continue building your verified proof today.
          </p>

          {/* Large Soft Anthropic Style Banner Graphic */}
          <div className="w-full h-48 sm:h-56 rounded-2xl bg-gradient-to-r from-[#F4F2EB] via-[#ECE8DE] to-[#E3DEC9] border border-[#ECEAE4] p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden shadow-2xs">
            <div className="relative z-10 max-w-md space-y-1">
              <span className="text-xs font-bold text-[#D97706] uppercase tracking-wider">
                Autonomous Trajectory
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-[#1F1F1F]">
                Target: {selectedRole}
              </h2>
              <p className="text-xs text-[#6B6B6B]">
                Distance: {context.careerGps.distanceSkillsCount} skills • Estimated {context.careerGps.estimatedMonths} months to placement readiness.
              </p>
            </div>

            <div className="relative z-10 flex items-center justify-between pt-4 border-t border-[#DDD9D0]">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-[#1F1F1F]">Readiness:</span>
                <strong className="text-sm font-bold text-[#1F1F1F]">{context.readinessScore}%</strong>
                <span className="text-xs text-[#16A34A] font-medium">(+14% this month)</span>
              </div>

              <Link
                href="/student/career-copilot"
                className="px-4 py-2 bg-[#1F1F1F] text-[#FAF9F5] rounded-xl text-xs font-semibold hover:bg-[#333333] transition-all shadow-2xs flex items-center gap-1.5 btn-anthropic"
              >
                <span>Talk with Copilot</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* 2. Core Dashboard Grid (Focused, Calm, Only Essential Sections) */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left Main Stream (7 Columns) */}
          <div className="md:col-span-7 space-y-8">
            {/* AI Insight Card (Feels like Claude talking) */}
            <div className="p-6 bg-[#FFFFFF] rounded-2xl border border-[#ECEAE4] space-y-3 shadow-2xs">
              <div className="flex items-center justify-between pb-2 border-b border-[#ECEAE4]">
                <span className="text-xs font-bold text-[#1F1F1F] uppercase tracking-wider flex items-center gap-2">
                  <Bot className="w-4 h-4 text-[#D97706]" />
                  AI Career Copilot Insight
                </span>
                <span className="text-[11px] font-semibold text-[#16A34A] bg-[#F0FDF4] px-2 py-0.5 rounded-full border border-[#DCFCE7]">
                  Calibrated
                </span>
              </div>

              <p className="text-sm text-[#1F1F1F] leading-relaxed">
                &ldquo;Your strongest verified skill is <strong>Python &amp; FastAPI</strong> ({context.masteredSkills[0]?.score || 95}%). Improving <strong>{context.missingSkills[0] || 'Docker'}</strong> and <strong>{context.missingSkills[1] || 'AWS'}</strong> could increase your placement readiness by <strong>+18%</strong>.&rdquo;
              </p>

              <div className="pt-2 flex items-center justify-between text-xs text-[#6B6B6B]">
                <span>Recommended focus: System Architecture</span>
                <Link
                  href="/student/career-copilot"
                  className="text-xs font-semibold text-[#D97706] hover:underline flex items-center gap-1"
                >
                  <span>Explore in Copilot</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Weekly Focus (Only 3 tasks) */}
            <div className="p-6 bg-[#FFFFFF] rounded-2xl border border-[#ECEAE4] space-y-4 shadow-2xs">
              <div className="flex items-center justify-between pb-2 border-b border-[#ECEAE4]">
                <span className="text-xs font-bold text-[#1F1F1F] uppercase tracking-wider flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                  Weekly Focus
                </span>
                <span className="text-xs text-[#6B6B6B]">
                  {completedCount} of {weeklyTasks.length} Completed
                </span>
              </div>

              <div className="space-y-2.5">
                {weeklyTasks.map((task) => (
                  <div
                    key={task.id}
                    onClick={() => toggleTask(task.id)}
                    className={`p-3 rounded-xl border text-xs cursor-pointer flex items-center justify-between transition-all ${
                      task.completed
                        ? 'bg-[#F9F8F5] border-[#ECEAE4] text-[#6B6B6B]'
                        : 'bg-[#FFFFFF] border-[#ECEAE4] hover:border-[#DDD9D0] text-[#1F1F1F] font-medium'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {task.completed ? (
                        <CheckSquare className="w-4 h-4 text-[#16A34A] shrink-0" />
                      ) : (
                        <Square className="w-4 h-4 text-[#6B6B6B] shrink-0" />
                      )}
                      <span className={task.completed ? 'line-through text-[#6B6B6B]' : 'font-semibold'}>
                        {task.title}
                      </span>
                    </div>

                    <span className="text-[10px] text-[#6B6B6B]">
                      {task.completed ? 'Done' : 'In Progress'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Growth Story */}
            <div className="p-6 bg-[#FFFFFF] rounded-2xl border border-[#ECEAE4] space-y-4 shadow-2xs">
              <div className="flex items-center justify-between pb-2 border-b border-[#ECEAE4]">
                <span className="text-xs font-bold text-[#1F1F1F] uppercase tracking-wider flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-[#2563EB]" />
                  Recent Growth Story
                </span>
                <Link href="/student/journey" className="text-xs text-[#6B6B6B] hover:text-[#1F1F1F]">
                  View Journey &rarr;
                </Link>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-[#F8F7F3] rounded-xl border border-[#ECEAE4] flex items-center justify-between">
                  <div>
                    <strong className="text-[#1F1F1F] block font-semibold">
                      Real-time Vector Retrieval Engine Uploaded
                    </strong>
                    <span className="text-[11px] text-[#6B6B6B]">Project Evidence Verified</span>
                  </div>
                  <span className="text-xs font-bold text-[#16A34A]">+96 Impact</span>
                </div>

                <div className="p-3 bg-[#F8F7F3] rounded-xl border border-[#ECEAE4] flex items-center justify-between">
                  <div>
                    <strong className="text-[#1F1F1F] block font-semibold">
                      Python &amp; FastAPI Expert Competency
                    </strong>
                    <span className="text-[11px] text-[#6B6B6B]">Assessment Passed</span>
                  </div>
                  <span className="text-xs font-bold text-[#16A34A]">95% Score</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar Stream (5 Columns) */}
          <div className="md:col-span-5 space-y-8">
            {/* Career Readiness & Goal Card */}
            <div className="p-6 bg-[#FFFFFF] rounded-2xl border border-[#ECEAE4] space-y-4 shadow-2xs">
              <div className="flex items-center justify-between pb-2 border-b border-[#ECEAE4]">
                <span className="text-xs font-bold text-[#1F1F1F] uppercase tracking-wider flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5 text-[#D97706]" />
                  Current Goal
                </span>
                <button
                  onClick={() => setIsEditingGoal(!isEditingGoal)}
                  className="text-xs text-[#6B6B6B] hover:text-[#1F1F1F] underline flex items-center gap-1"
                >
                  <Edit3 className="w-3 h-3" />
                  Edit
                </button>
              </div>

              {isEditingGoal ? (
                <div className="space-y-2">
                  <select
                    value={selectedRole}
                    onChange={(e) => handleSaveGoal(e.target.value)}
                    className="w-full text-xs p-2 rounded-xl bg-[#F8F7F3] border border-[#ECEAE4] text-[#1F1F1F] focus:outline-none"
                  >
                    {sampleRoles.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <div>
                  <h3 className="text-lg font-bold text-[#1F1F1F]">{selectedRole}</h3>
                  <span className="text-xs text-[#6B6B6B]">Active benchmark track</span>
                </div>
              )}

              <div className="space-y-2 pt-2 border-t border-[#ECEAE4]">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#6B6B6B]">Career Readiness:</span>
                  <strong className="text-sm font-bold text-[#1F1F1F]">{context.readinessScore}%</strong>
                </div>
                <div className="w-full bg-[#F0EEE6] rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-[#D97706] h-2 rounded-full transition-all duration-500"
                    style={{ width: `${context.readinessScore}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#6B6B6B] pt-1">
                  <span>Industry Avg: {context.industryAvg}%</span>
                  <span>Top Students: {context.topStudentsScore}%</span>
                </div>
              </div>
            </div>

            {/* Opportunity Matches Preview */}
            <div className="p-6 bg-[#FFFFFF] rounded-2xl border border-[#ECEAE4] space-y-4 shadow-2xs">
              <div className="flex items-center justify-between pb-2 border-b border-[#ECEAE4]">
                <span className="text-xs font-bold text-[#1F1F1F] uppercase tracking-wider flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-[#2563EB]" />
                  Opportunity Matches
                </span>
                <span className="text-xs text-[#2563EB] font-semibold">6 Live</span>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 bg-[#F8F7F3] rounded-xl border border-[#ECEAE4] space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <strong className="text-[#1F1F1F] font-bold">Anthropic AI Labs</strong>
                    <span className="text-[10px] font-bold text-[#16A34A] bg-[#F0FDF4] px-2 py-0.5 rounded-full border border-[#DCFCE7]">
                      94% Match
                    </span>
                  </div>
                  <p className="text-xs text-[#6B6B6B]">AI Systems &amp; LLM Platform Intern</p>
                </div>

                <div className="p-3.5 bg-[#F8F7F3] rounded-xl border border-[#ECEAE4] space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <strong className="text-[#1F1F1F] font-bold">Stripe Engineering</strong>
                    <span className="text-[10px] font-bold text-[#16A34A] bg-[#F0FDF4] px-2 py-0.5 rounded-full border border-[#DCFCE7]">
                      91% Match
                    </span>
                  </div>
                  <p className="text-xs text-[#6B6B6B]">Distributed Backend Infrastructure</p>
                </div>
              </div>

              <Link
                href="/student/opportunities"
                className="w-full py-2.5 bg-[#FAF9F5] hover:bg-[#F0EEE6] text-[#1F1F1F] border border-[#ECEAE4] rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all btn-anthropic"
              >
                <span>View All Matched Roles</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </PortalLayout>
  );
}
