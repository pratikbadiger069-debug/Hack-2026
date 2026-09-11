'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { useAppStore } from '@/lib/store';
import { getUserFirstName } from '@/lib/user-utils';
import { analyzeStudentCareerContext, ROLE_BENCHMARKS } from '@/lib/copilot-engine';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  CheckSquare,
  Square,
  Briefcase,
  Target,
  Edit3,
  TrendingUp,
  ArrowUpRight,
} from 'lucide-react';

export default function StudentHomePage() {
  const { studentProfile, currentUser, setRole, updateStudentTargetRole } = useAppStore();
  const [mounted, setMounted] = useState(false);
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [selectedRole, setSelectedRole] = useState(studentProfile.targetRole || 'AI Engineer');

  // Exactly 3 weekly focus tasks
  const [weeklyTasks, setWeeklyTasks] = useState([
    { id: 't-1', title: 'Complete SQL Assessment', completed: true },
    { id: 't-2', title: 'Build Expense Tracker API', completed: false },
    { id: 't-3', title: 'Connect GitHub Portfolio', completed: false },
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
        <div className="py-24 text-center text-sm text-[#6B6B6B]">
          <div className="w-8 h-8 rounded-full border-2 border-[#D97706] border-t-transparent animate-spin mx-auto mb-3" />
          Loading your workspace...
        </div>
      </PortalLayout>
    );
  }

  const completedCount = weeklyTasks.filter((t) => t.completed).length;

  return (
    <PortalLayout>
      <div className="space-y-12 max-w-[1200px] mx-auto pb-20">
        {/* 1. HERO SECTION — Anthropic Inspired, Large Editorial Greeting */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="space-y-6 pt-2"
        >
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-normal text-[#1F1F1F] tracking-tight leading-tight">
              {timeGreeting}, {firstName}.
            </h1>
            <p className="text-2xl sm:text-3xl text-[#1F1F1F] font-serif font-light">
              Your future isn&apos;t a dream, it&apos;s a plan.
            </p>
            <p className="text-base sm:text-lg text-[#6B6B6B] font-sans max-w-2xl leading-relaxed">
              You&apos;re making great progress. Let&apos;s continue building.
            </p>
          </div>

          {/* Anthropic-style Soft Landscape Banner */}
          <div className="relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden border border-[#ECEAE4] shadow-xs bg-gradient-to-r from-[#F4EFE6] via-[#ECE5D8] to-[#DFD6C3] p-8 flex flex-col justify-between">
            <div className="absolute inset-0 opacity-25 mix-blend-multiply pointer-events-none bg-[radial-gradient(#D97706_1px,transparent_1px)] [background-size:16px_16px]" />

            <div className="relative z-10 max-w-lg space-y-1.5">
              <span className="text-xs font-mono uppercase tracking-wider text-[#D97706] font-semibold">
                Trajectory &amp; Focus
              </span>
              <h2 className="text-xl sm:text-2xl font-serif text-[#1F1F1F]">
                Target: {selectedRole}
              </h2>
              <p className="text-xs sm:text-sm text-[#6B6B6B] font-sans">
                {context.careerGps.distanceSkillsCount} skills to target proficiency • Estimated {context.careerGps.estimatedMonths} months to industry readiness.
              </p>
            </div>

            <div className="relative z-10 flex items-center justify-between pt-4 border-t border-[#D7CEBE]">
              <div className="flex items-center gap-3">
                <span className="text-xs text-[#6B6B6B]">Career Readiness:</span>
                <span className="text-base font-serif text-[#1F1F1F]">{context.readinessScore}%</span>
                <span className="text-xs text-[#16A34A] font-medium font-mono">+14% this month</span>
              </div>

              <Link
                href="/student/career-copilot"
                className="px-5 py-2 bg-[#1F1F1F] hover:bg-black text-[#FAF9F5] rounded-xl text-xs font-medium transition-all shadow-xs flex items-center gap-2"
              >
                <span>Open Copilot</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </motion.section>

        {/* 2. SIX ESSENTIAL CARDS BELOW HERO */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN (7 Cols) */}
          <div className="md:col-span-7 space-y-8">
            {/* 1. AI Insight Card (Feels like Claude talking) */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.1 }}
              whileHover={{ scale: 1.01 }}
              className="p-7 bg-white rounded-2xl border border-[#ECEAE4] shadow-xs space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#ECEAE4]">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#1F1F1F] text-white flex items-center justify-center text-[10px] font-serif">
                    C
                  </div>
                  <span className="text-xs font-mono uppercase tracking-wider text-[#6B6B6B]">
                    Career Copilot Insight
                  </span>
                </div>
                <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-[#16A34A]/10 text-[#16A34A] font-mono">
                  Personalized
                </span>
              </div>

              <p className="text-base font-serif text-[#1F1F1F] leading-relaxed">
                &ldquo;Your strongest skill is <strong>Python</strong>. Improving <strong>Docker</strong> and <strong>AWS</strong> could increase your readiness by <strong>18%</strong>.&rdquo;
              </p>

              <div className="pt-2 flex items-center justify-between text-xs text-[#6B6B6B] border-t border-[#ECEAE4]">
                <span>Based on your recent project blueprints and code submissions.</span>
                <Link
                  href="/student/career-copilot"
                  className="font-medium text-[#D97706] hover:underline flex items-center gap-1 shrink-0"
                >
                  <span>Ask Claude</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </motion.div>

            {/* 2. Weekly Focus (Only 3 tasks) */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.15 }}
              whileHover={{ scale: 1.01 }}
              className="p-7 bg-white rounded-2xl border border-[#ECEAE4] shadow-xs space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#ECEAE4]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                  <h2 className="text-base font-serif text-[#1F1F1F]">Weekly Focus</h2>
                </div>
                <span className="text-xs font-mono text-[#6B6B6B]">
                  {completedCount} of {weeklyTasks.length} Completed
                </span>
              </div>

              <div className="space-y-2.5">
                {weeklyTasks.map((task) => (
                  <div
                    key={task.id}
                    onClick={() => toggleTask(task.id)}
                    className={`p-3.5 rounded-xl border text-xs cursor-pointer flex items-center justify-between transition-all ${
                      task.completed
                        ? 'bg-[#FAF9F5] border-[#ECEAE4] text-[#6B6B6B]'
                        : 'bg-white border-[#ECEAE4] hover:border-[#D97706]/40 text-[#1F1F1F]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {task.completed ? (
                        <CheckSquare className="w-4 h-4 text-[#16A34A] shrink-0" />
                      ) : (
                        <Square className="w-4 h-4 text-[#6B6B6B] shrink-0" />
                      )}
                      <span className={`text-xs ${task.completed ? 'line-through text-[#6B6B6B]' : 'font-medium'}`}>
                        {task.title}
                      </span>
                    </div>

                    <span className="text-[10px] font-mono text-[#6B6B6B]">
                      {task.completed ? 'Done' : 'Pending'}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* 3. Recent Growth Story */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.2 }}
              whileHover={{ scale: 1.01 }}
              className="p-7 bg-white rounded-2xl border border-[#ECEAE4] shadow-xs space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#ECEAE4]">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-[#2563EB]" />
                  <h2 className="text-base font-serif text-[#1F1F1F]">Recent Growth</h2>
                </div>
                <Link href="/student/journey" className="text-xs text-[#6B6B6B] hover:text-[#1F1F1F] flex items-center gap-1 font-mono">
                  <span>View Story</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 bg-[#FAF9F5] rounded-xl border border-[#ECEAE4] flex items-center justify-between text-xs">
                  <div>
                    <span className="font-medium text-[#1F1F1F] block">Vector Retrieval System Capstone</span>
                    <span className="text-[11px] text-[#6B6B6B]">Project Evidence Verified</span>
                  </div>
                  <span className="text-xs font-mono font-medium text-[#16A34A]">+96 Impact</span>
                </div>

                <div className="p-3.5 bg-[#FAF9F5] rounded-xl border border-[#ECEAE4] flex items-center justify-between text-xs">
                  <div>
                    <span className="font-medium text-[#1F1F1F] block">FastAPI &amp; Python Assessment</span>
                    <span className="text-[11px] text-[#6B6B6B]">Score: 95% • Verified Badge Issued</span>
                  </div>
                  <span className="text-xs font-mono font-medium text-[#16A34A]">+45 Score</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN (5 Cols) */}
          <div className="md:col-span-5 space-y-8">
            {/* 4. Current Goal Card */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.1 }}
              whileHover={{ scale: 1.01 }}
              className="p-7 bg-white rounded-2xl border border-[#ECEAE4] shadow-xs space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#ECEAE4]">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-[#D97706]" />
                  <span className="text-xs font-mono uppercase tracking-wider text-[#6B6B6B]">Current Goal</span>
                </div>
                <button
                  onClick={() => setIsEditingGoal(!isEditingGoal)}
                  className="text-xs text-[#6B6B6B] hover:text-[#1F1F1F] flex items-center gap-1 font-mono"
                >
                  <Edit3 className="w-3 h-3" />
                  <span>{isEditingGoal ? 'Close' : 'Change'}</span>
                </button>
              </div>

              {isEditingGoal ? (
                <div className="space-y-2">
                  <select
                    value={selectedRole}
                    onChange={(e) => handleSaveGoal(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl bg-[#FAF9F5] border border-[#ECEAE4] text-[#1F1F1F] focus:outline-none focus:border-[#D97706]"
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
                  <h3 className="text-xl font-serif text-[#1F1F1F]">{selectedRole}</h3>
                  <p className="text-xs text-[#6B6B6B] mt-0.5">Primary career benchmark trajectory</p>
                </div>
              )}
            </motion.div>

            {/* 5. Career Readiness Card */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.15 }}
              whileHover={{ scale: 1.01 }}
              className="p-7 bg-white rounded-2xl border border-[#ECEAE4] shadow-xs space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#ECEAE4]">
                <span className="text-xs font-mono uppercase tracking-wider text-[#6B6B6B]">Career Readiness</span>
                <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-[#16A34A]/10 text-[#16A34A]">
                  Top 10%
                </span>
              </div>

              <div className="flex items-baseline justify-between">
                <div className="text-4xl font-serif text-[#1F1F1F]">
                  {context.readinessScore}%
                </div>
                <div className="text-xs text-[#6B6B6B] text-right">
                  <div>Industry Avg: <strong className="text-[#1F1F1F]">{context.industryAvg}%</strong></div>
                  <div>Top Students: <strong className="text-[#16A34A]">{context.topStudentsScore}%</strong></div>
                </div>
              </div>

              <div className="w-full bg-[#FAF9F5] rounded-full h-2 overflow-hidden border border-[#ECEAE4]">
                <div
                  className="bg-[#D97706] h-2 rounded-full transition-all duration-700"
                  style={{ width: `${context.readinessScore}%` }}
                />
              </div>
            </motion.div>

            {/* 6. Opportunity Matches */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.2 }}
              whileHover={{ scale: 1.01 }}
              className="p-7 bg-white rounded-2xl border border-[#ECEAE4] shadow-xs space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#ECEAE4]">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-[#2563EB]" />
                  <h2 className="text-base font-serif text-[#1F1F1F]">Opportunity Matches</h2>
                </div>
                <span className="text-xs font-mono text-[#D97706]">6 Matches</span>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 bg-[#FAF9F5] rounded-xl border border-[#ECEAE4] space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <strong className="text-[#1F1F1F]">Anthropic AI Labs</strong>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#16A34A]/10 text-[#16A34A]">
                      94% Match
                    </span>
                  </div>
                  <p className="text-xs text-[#6B6B6B]">AI Systems &amp; LLM Platform Intern</p>
                </div>

                <div className="p-3.5 bg-[#FAF9F5] rounded-xl border border-[#ECEAE4] space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <strong className="text-[#1F1F1F]">Stripe Engineering</strong>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#16A34A]/10 text-[#16A34A]">
                      91% Match
                    </span>
                  </div>
                  <p className="text-xs text-[#6B6B6B]">Distributed Backend Infrastructure</p>
                </div>
              </div>

              <Link
                href="/student/opportunities"
                className="w-full py-2.5 bg-[#FAF9F5] hover:bg-[#F8F7F3] text-[#1F1F1F] border border-[#ECEAE4] rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 transition-all"
              >
                <span>View All Opportunities</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
