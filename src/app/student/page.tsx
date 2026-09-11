'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { useAppStore } from '@/lib/store';
import { getUserFirstName } from '@/lib/user-utils';
import { getLevelInfo, calculateTransparentBuilderScore } from '@/lib/xp-engine';
import { analyzeStudentCareerContext, ROLE_BENCHMARKS } from '@/lib/copilot-engine';
import {
  Target,
  ArrowRight,
  ShieldCheck,
  Bot,
  Calendar,
  CheckCircle2,
} from 'lucide-react';

const mockOpportunities = [
  {
    id: 'opp-1',
    title: 'Distributed Backend Infrastructure Intern',
    company: 'Razorpay Systems',
    location: 'Bengaluru, India',
    matchScore: 94,
    skills: ['Java', 'SQL', 'Docker', 'REST APIs'],
  },
  {
    id: 'opp-2',
    title: 'Systems & Cloud Platform Engineer',
    company: 'Postman Platform',
    location: 'Remote / Bengaluru',
    matchScore: 91,
    skills: ['REST APIs', 'Docker', 'Git'],
  },
];

export default function StudentDashboardPage() {
  const {
    studentProfile,
    currentUser,
    setRole,
    updateStudentTargetRole,
    xp,
    streakDays,
    quests,
    githubData,
    checklist,
    tierRankings,
    completeChecklistItem,
  } = useAppStore();

  const [mounted, setMounted] = useState(false);
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [selectedRole, setSelectedRole] = useState(studentProfile.targetRole || 'Backend Engineer');

  useEffect(() => {
    setRole('student');
    setMounted(true);
  }, [setRole]);

  const handleSaveGoal = (newRole: string) => {
    setSelectedRole(newRole);
    updateStudentTargetRole(newRole);
    setIsEditingGoal(false);
  };

  const firstName = getUserFirstName({ user: currentUser, profile: studentProfile });
  const levelInfo = getLevelInfo(xp);
  const builderScoreData = calculateTransparentBuilderScore({
    verifiedSkillsCount: (studentProfile.verifiedSkills || []).length,
    projectsCount: (studentProfile.evidences || []).length,
    githubConnected: githubData?.connected,
    githubReposCount: (githubData?.pinnedRepos || []).length,
    consistencyStreakDays: streakDays,
    completedChallengesCount: (quests || []).filter((q) => q.completed).length,
  });

  const context = analyzeStudentCareerContext(studentProfile, selectedRole);
  const sampleRoles = Object.keys(ROLE_BENCHMARKS);
  const completedChecklistCount = (checklist || []).filter((c) => c.completed).length;

  // Time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  // Top matching opportunity
  const topOpportunity = mockOpportunities[0];
  const primaryMissing = context.missingSkills.length > 0 ? context.missingSkills[0] : 'Distributed Caching';

  if (!mounted) {
    return (
      <PortalLayout>
        <div className="py-24 text-center text-xs text-[#6F6A60]">
          <div className="w-5 h-5 rounded-full border-2 border-[#C76A2A] border-t-transparent animate-spin mx-auto mb-2" />
          Loading workspace...
        </div>
      </PortalLayout>
    );
  }

  return (
    <PortalLayout>
      <div className="space-y-8 max-w-[1100px] mx-auto pb-16">
        
        {/* Large Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="pt-2 pb-4 border-b border-[#E8E5DD]"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#C76A2A] mb-1 block">
                Builder Operating System
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-[#1B1B1B] tracking-tight">
                {getGreeting()}, {firstName}.
              </h1>
              <p className="text-base text-[#6F6A60] mt-1 font-medium">
                Let&apos;s build something meaningful today.
              </p>
            </div>

            {/* Quick Builder Level Pill */}
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 bg-white rounded-2xl border border-[#E8E5DD] shadow-xs text-xs">
                <span className="text-[#6F6A60]">Level {levelInfo.level} Builder • </span>
                <span className="font-semibold text-[#1B1B1B]">{levelInfo.title}</span>
                <span className="font-mono text-[#C76A2A] font-semibold ml-2">#{levelInfo.rank} Rank</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 2-Column Core Focus Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Main (8 cols): Goal, Focus, Career Insight */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Current Goal Card */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.05 }}
              className="p-6 rounded-2xl bg-white border border-[#E8E5DD] shadow-xs space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#6F6A60] uppercase tracking-wider">
                  <Target className="w-3.5 h-3.5 text-[#C76A2A]" />
                  <span>Current Target Role</span>
                </div>
                <button
                  onClick={() => setIsEditingGoal(!isEditingGoal)}
                  className="text-xs font-medium text-[#C76A2A] hover:underline"
                >
                  {isEditingGoal ? 'Cancel' : 'Change Goal'}
                </button>
              </div>

              {isEditingGoal ? (
                <div className="space-y-3 pt-2">
                  <p className="text-xs text-[#6F6A60]">Select target career path:</p>
                  <div className="flex flex-wrap gap-2">
                    {sampleRoles.map((role) => (
                      <button
                        key={role}
                        onClick={() => handleSaveGoal(role)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                          selectedRole === role
                            ? 'bg-[#1B1B1B] text-white'
                            : 'bg-[#F6F4EE] border border-[#E8E5DD] text-[#1B1B1B] hover:border-[#C76A2A]'
                        }`}
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between pt-1">
                  <div>
                    <h2 className="text-xl font-bold text-[#1B1B1B]">{selectedRole}</h2>
                    <p className="text-xs text-[#6F6A60] mt-0.5">
                      {context.readinessScore}% benchmark readiness • {studentProfile.verifiedSkills.length} verified competencies
                    </p>
                  </div>
                  <Link
                    href="/student/career-copilot"
                    className="px-3.5 py-1.5 bg-[#F6F4EE] hover:bg-[#E8E5DD] text-[#1B1B1B] rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5"
                  >
                    <span>View Plan</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              )}
            </motion.div>

            {/* 4-Tier Ranking Badges */}
            <div className="flex items-center gap-2 flex-wrap">
              <div className="px-3 py-1.5 bg-white rounded-xl border border-[#E8E5DD] text-xs flex items-center gap-1.5 shadow-2xs">
                <span className="text-[#6F6A60]">Dept:</span>
                <strong className="text-[#1B1B1B]">#{tierRankings?.deptRank || 2} in {studentProfile.academic?.department || 'CSE'}</strong>
              </div>
              <div className="px-3 py-1.5 bg-white rounded-xl border border-[#E8E5DD] text-xs flex items-center gap-1.5 shadow-2xs">
                <span className="text-[#6F6A60]">Campus:</span>
                <strong className="text-[#C76A2A]">#{tierRankings?.collegeRank || 5} in {studentProfile.academic?.college || 'HITAM'}</strong>
              </div>
              <div className="px-3 py-1.5 bg-white rounded-xl border border-[#E8E5DD] text-xs flex items-center gap-1.5 shadow-2xs">
                <span className="text-[#6F6A60]">State:</span>
                <strong className="text-[#1B1B1B]">#{tierRankings?.stateRank || 18} ({tierRankings?.stateName || 'Telangana'})</strong>
              </div>
              <div className="px-3 py-1.5 bg-white rounded-xl border border-[#E8E5DD] text-xs flex items-center gap-1.5 shadow-2xs">
                <span className="text-[#6F6A60]">National:</span>
                <strong className="text-[#2F7A45]">Top 3% (#{tierRankings?.nationalRank || 142})</strong>
              </div>
            </div>

            {/* Event-Driven Verification Checklist Card */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.08 }}
              className="p-6 rounded-2xl bg-white border border-[#E8E5DD] shadow-xs space-y-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-[#1B1B1B] flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#2F7A45]" />
                    <span>Builder Verification Checklist</span>
                  </h3>
                  <p className="text-xs text-[#6F6A60]">Auto-completes dynamically upon taking assessments, connecting GitHub, and uploading proof.</p>
                </div>
                <span className="text-xs font-mono font-bold text-[#2F7A45] bg-[#2F7A45]/10 px-2.5 py-1 rounded-full">
                  {completedChecklistCount} / {(checklist || []).length} Verified
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {(checklist || []).map((item) => (
                  <div
                    key={item.id}
                    className={`p-3.5 rounded-xl border transition-all flex items-start justify-between gap-3 ${
                      item.completed
                        ? 'bg-[#F6F4EE]/60 border-[#E8E5DD]'
                        : 'bg-white border-[#E8E5DD] hover:border-[#C76A2A]'
                    }`}
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${item.completed ? 'bg-[#2F7A45]' : 'bg-[#C76A2A]'}`} />
                        <h5 className="text-xs font-bold text-[#1B1B1B]">{item.title}</h5>
                      </div>
                      <p className="text-[11px] text-[#6F6A60] line-clamp-1">{item.description}</p>
                    </div>

                    <div className="text-right shrink-0">
                      {item.completed ? (
                        <span className="text-[10px] font-bold text-[#2F7A45] bg-[#2F7A45]/10 px-2 py-0.5 rounded-md flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Done
                        </span>
                      ) : (
                        <Link
                          href={item.actionUrl}
                          className="px-2.5 py-1 bg-[#1B1B1B] text-white rounded-lg text-[10px] font-bold hover:bg-[#C76A2A] transition-colors inline-block"
                        >
                          Complete →
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Weekly Focus & Verification Challenge */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              className="p-6 rounded-2xl bg-white border border-[#E8E5DD] shadow-xs space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#6F6A60] uppercase tracking-wider">
                  <Calendar className="w-3.5 h-3.5 text-[#C76A2A]" />
                  <span>Weekly Focus</span>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#C76A2A]/10 text-[#C76A2A] font-semibold">
                  Week 3 of 8
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-[#1B1B1B]">
                  Production API Architecture &amp; Containerization
                </h3>
                <p className="text-xs text-[#6F6A60] mt-1 leading-relaxed">
                  Bridge the gap in {primaryMissing} by completing this week&apos;s verified assessment and building a runnable proof-of-work project.
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-[#E8E5DD]">
                <div className="flex items-center gap-2 text-xs text-[#6F6A60]">
                  <ShieldCheck className="w-4 h-4 text-[#2F7A45]" />
                  <span>Pass threshold: 75% • Strict anti-cheat enabled</span>
                </div>
                <Link
                  href="/student/assessments"
                  className="px-4 py-2 bg-[#1B1B1B] text-white rounded-xl text-xs font-semibold hover:bg-[#C76A2A] transition-colors flex items-center gap-1.5"
                >
                  <span>Start Verification</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>

            {/* Career Insight */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.15 }}
              className="p-6 rounded-2xl bg-white border border-[#E8E5DD] shadow-xs space-y-3"
            >
              <div className="flex items-center gap-2 text-xs font-semibold text-[#6F6A60] uppercase tracking-wider">
                <Bot className="w-3.5 h-3.5 text-[#C76A2A]" />
                <span>Career Copilot Insight</span>
              </div>
              <p className="text-xs text-[#1B1B1B] leading-relaxed font-medium">
                &ldquo;You have verified strengths in {studentProfile.verifiedSkills.slice(0, 2).map(s => s.name).join(' and ') || 'Core Programming'}. Industry recruiters for {selectedRole} are currently prioritizing candidates who can demonstrate {primaryMissing} in their GitHub repositories.&rdquo;
              </p>
              <div className="pt-1">
                <Link
                  href="/student/career-copilot"
                  className="text-xs font-semibold text-[#C76A2A] hover:underline inline-flex items-center gap-1"
                >
                  <span>Ask Career Copilot for personalized roadmap</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </motion.div>

          </div>

          {/* Right Sidebar (4 cols): XP Progress, Opportunity Match, Recent Growth */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Builder Score & XP Progress */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              className="p-6 rounded-2xl bg-white border border-[#E8E5DD] shadow-xs space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#6F6A60] uppercase tracking-wider">
                  Builder Score
                </span>
                <Link
                  href="/student/journey"
                  className="text-xs font-semibold text-[#C76A2A] hover:underline"
                >
                  Formula →
                </Link>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-[#1B1B1B] font-mono">
                  {builderScoreData.totalScore}
                </span>
                <span className="text-xs text-[#6F6A60]">/ 1000 Total Score</span>
              </div>

              {/* Level progress bar */}
              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-[#1B1B1B]">Level {levelInfo.level} {levelInfo.title}</span>
                  <span className="text-[#C76A2A] font-mono font-semibold">{xp} XP</span>
                </div>
                <div className="w-full h-2 bg-[#F6F4EE] border border-[#E8E5DD] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#C76A2A] rounded-full transition-all duration-500"
                    style={{ width: `${levelInfo.percentToNext}%` }}
                  />
                </div>
                <p className="text-[11px] text-[#6F6A60]">
                  {levelInfo.nextLevelXP - levelInfo.currentLevelProgress} XP needed for Level {levelInfo.level + 1}
                </p>
              </div>
            </motion.div>

            {/* Opportunity Match Card */}
            {topOpportunity && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: 0.15 }}
                className="p-6 rounded-2xl bg-white border border-[#E8E5DD] shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#6F6A60] uppercase tracking-wider">
                    Opportunity Match
                  </span>
                  <span className="text-xs font-mono font-bold text-[#2F7A45] bg-[#2F7A45]/10 px-2 py-0.5 rounded-full">
                    {topOpportunity.matchScore}% Match
                  </span>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-[#1B1B1B]">{topOpportunity.title}</h4>
                  <p className="text-xs text-[#6F6A60]">{topOpportunity.company} • {topOpportunity.location}</p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {topOpportunity.skills.slice(0, 3).map((skill: string) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded-md bg-[#F6F4EE] border border-[#E8E5DD] text-[11px] text-[#1B1B1B]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <Link
                  href="/student/opportunities"
                  className="pt-2 text-xs font-semibold text-[#C76A2A] hover:underline flex items-center gap-1"
                >
                  <span>Explore opportunities</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </motion.div>
            )}

            {/* Recent Growth Log */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.2 }}
              className="p-6 rounded-2xl bg-white border border-[#E8E5DD] shadow-xs space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#6F6A60] uppercase tracking-wider">
                  Recent Growth
                </span>
                <Link
                  href="/student/journey"
                  className="text-xs font-semibold text-[#C76A2A] hover:underline"
                >
                  Full Journey
                </Link>
              </div>

              <div className="space-y-3 pt-1 text-xs">
                <div className="flex items-start gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-[#2F7A45] mt-1 shrink-0" />
                  <div>
                    <p className="font-semibold text-[#1B1B1B]">Java Foundations Verified</p>
                    <p className="text-[11px] text-[#6F6A60]">Earned 85% score • +25 XP</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-[#C76A2A] mt-1 shrink-0" />
                  <div>
                    <p className="font-semibold text-[#1B1B1B]">GitHub Sync Verified</p>
                    <p className="text-[11px] text-[#6F6A60]">Inferred 4 backend repositories</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-[#6F6A60] mt-1 shrink-0" />
                  <div>
                    <p className="font-semibold text-[#1B1B1B]">7-Day Builder Streak</p>
                    <p className="text-[11px] text-[#6F6A60]">Consistent daily coding activity</p>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>

        </div>

      </div>
    </PortalLayout>
  );
}
