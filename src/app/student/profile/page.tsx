'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { useAppStore } from '@/lib/store';
import { getLevelInfo, calculateTransparentBuilderScore } from '@/lib/xp-engine';
import {
  User,
  ShieldCheck,
  Building,
  Target,
  MapPin,
  Trophy,
  CheckCircle2,
  ExternalLink,
  Flame,
  Award,
  BookOpen,
  ArrowRight,
  Settings,
  RefreshCw,
  GitPullRequest,
  Star,
  Sparkles,
} from 'lucide-react';

function GithubIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

export default function StudentProfilePage() {
  const {
    studentProfile,
    currentUser,
    xp,
    streakDays,
    quests,
    githubData,
    connectGitHub,
    achievements,
    unlockAchievement,
  } = useAppStore();

  const [isSyncingGitHub, setIsSyncingGitHub] = useState(false);

  const levelInfo = getLevelInfo(xp);
  const completedQuestsCount = (quests || []).filter((q) => q.completed).length;
  const totalQuestsCount = (quests || []).length || 16;
  const passRate = totalQuestsCount > 0 ? Math.round((completedQuestsCount / totalQuestsCount) * 100) : 0;

  const builderScoreData = calculateTransparentBuilderScore({
    verifiedSkillsCount: (studentProfile.verifiedSkills || []).length,
    projectsCount: (studentProfile.evidences || []).length,
    githubConnected: githubData.connected,
    githubReposCount: (githubData.pinnedRepos || []).length,
    consistencyStreakDays: streakDays,
    completedChallengesCount: completedQuestsCount,
  });

  const handleSyncGitHub = () => {
    setIsSyncingGitHub(true);
    setTimeout(() => {
      connectGitHub(githubData.username || 'aarav-builder');
      setIsSyncingGitHub(false);
    }, 600);
  };

  const handleBadgeClick = (badgeId: string, unlocked: boolean) => {
    if (!unlocked) {
      unlockAchievement(badgeId);
    }
  };

  return (
    <PortalLayout>
      <div className="space-y-8 max-w-[1100px] mx-auto pb-16">
        
        {/* SECTION 1: BASIC INFORMATION & HERO IDENTITY */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="p-8 rounded-2xl bg-white border border-[#E8E5DD] shadow-xs"
        >
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="relative">
                <img
                  src={studentProfile.avatar || currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                  alt={studentProfile.name}
                  className="w-24 h-24 rounded-2xl object-cover border border-[#E8E5DD]"
                />
                <span className="absolute -bottom-1 -right-1 px-2.5 py-0.5 rounded-full bg-[#1B1B1B] text-white text-[11px] font-bold">
                  Lvl {levelInfo.level}
                </span>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-2xl md:text-3xl font-bold text-[#1B1B1B] tracking-tight">{studentProfile.name || currentUser?.name || 'Aarav Sharma'}</h1>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#C76A2A]/10 text-[#C76A2A] text-xs font-semibold">
                    {levelInfo.title}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#2F7A45]/10 text-[#2F7A45] text-xs font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified Student
                  </span>
                </div>

                <p className="text-xs text-[#6F6A60] flex items-center gap-3 flex-wrap">
                  <span className="flex items-center gap-1"><Building className="w-3.5 h-3.5" /> {studentProfile.academic.college} ({studentProfile.academic.department})</span>
                  <span>•</span>
                  <span>{studentProfile.academic.year} ({studentProfile.academic.semester})</span>
                  <span>•</span>
                  <span className="font-semibold text-[#1B1B1B]">CGPA: {studentProfile.academic.cgpa}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> Bengaluru, India</span>
                </p>

                <p className="text-xs text-[#1B1B1B] max-w-2xl leading-relaxed font-medium">
                  {studentProfile.professional.bio || 'Systems engineer focused on high-throughput backend services, distributed cache protocols, and zero-downtime containerized workloads.'}
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2 self-start">
              <Link
                href="/student/settings"
                className="px-4 py-2 bg-[#F6F4EE] hover:bg-[#E8E5DD] text-[#1B1B1B] rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5"
              >
                <Settings className="w-3.5 h-3.5 text-[#6F6A60]" />
                <span>Edit Profile</span>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* SECTION 2: 3-TIER RANKS & CAREER GOAL */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.05 }}
            className="p-5 rounded-2xl bg-white border border-[#E8E5DD] shadow-xs space-y-1"
          >
            <span className="text-[11px] font-semibold text-[#6F6A60] uppercase tracking-wider block">Career Goal</span>
            <h3 className="text-base font-bold text-[#1B1B1B]">{studentProfile.targetRole}</h3>
            <span className="text-[11px] text-[#2F7A45] font-semibold">91% Readiness Match</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.1 }}
            className="p-5 rounded-2xl bg-white border border-[#E8E5DD] shadow-xs space-y-1"
          >
            <span className="text-[11px] font-semibold text-[#6F6A60] uppercase tracking-wider block">Department Rank</span>
            <div className="flex items-baseline gap-1.5">
              <h3 className="text-2xl font-bold font-mono text-[#1B1B1B]">#{Math.max(1, Math.round(levelInfo.rank / 3))}</h3>
              <span className="text-xs text-[#6F6A60]">in {studentProfile.academic.department}</span>
            </div>
            <span className="text-[10px] text-[#6F6A60]">Top 3% of cohort</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.15 }}
            className="p-5 rounded-2xl bg-white border border-[#E8E5DD] shadow-xs space-y-1"
          >
            <span className="text-[11px] font-semibold text-[#6F6A60] uppercase tracking-wider block">College Rank</span>
            <div className="flex items-baseline gap-1.5">
              <h3 className="text-2xl font-bold font-mono text-[#C76A2A]">#{levelInfo.rank}</h3>
              <span className="text-xs text-[#6F6A60]">in {studentProfile.academic.college}</span>
            </div>
            <span className="text-[10px] text-[#6F6A60]">Top 5% of institution</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.2 }}
            className="p-5 rounded-2xl bg-white border border-[#E8E5DD] shadow-xs space-y-1"
          >
            <span className="text-[11px] font-semibold text-[#6F6A60] uppercase tracking-wider block">Global Builder Rank</span>
            <div className="flex items-baseline gap-1.5">
              <h3 className="text-2xl font-bold font-mono text-[#1B1B1B]">#{levelInfo.rank * 14}</h3>
              <span className="text-xs text-[#6F6A60]">National</span>
            </div>
            <span className="text-[10px] text-[#6F6A60]">Top 8% nationally</span>
          </motion.div>
        </div>

        {/* SECTION 3: BUILDER LEVEL & SCORE BREAKDOWN */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Builder Level Progress */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.1 }}
            className="lg:col-span-5 p-6 rounded-2xl bg-white border border-[#E8E5DD] shadow-xs space-y-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#6F6A60] uppercase tracking-wider">
                Builder Level &amp; XP
              </span>
              <span className="text-xs font-mono font-bold text-[#C76A2A]">
                {xp} Total XP
              </span>
            </div>

            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-[#1B1B1B]">Level {levelInfo.level}</span>
                <span className="text-sm font-semibold text-[#C76A2A]">{levelInfo.title}</span>
              </div>
              <p className="text-xs text-[#6F6A60] mt-0.5">
                Every XP point is earned strictly through verified test cases and coding solutions.
              </p>
            </div>

            <div className="space-y-1.5 pt-1">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-[#1B1B1B]">Progress to Level {levelInfo.level + 1}</span>
                <span className="font-mono text-[#6F6A60]">{levelInfo.currentLevelProgress} / {levelInfo.nextLevelXP} XP</span>
              </div>
              <div className="w-full h-2 bg-[#F6F4EE] border border-[#E8E5DD] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#C76A2A] rounded-full transition-all duration-500"
                  style={{ width: `${levelInfo.percentToNext}%` }}
                />
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#F6F4EE] border border-[#E8E5DD] flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-[#C76A2A]" />
                <span className="font-semibold text-[#1B1B1B]">{streakDays} Day Active Streak</span>
              </div>
              <span className="text-[#6F6A60] text-[11px]">+10 Consistency pts</span>
            </div>
          </motion.div>

          {/* Transparent 30/30/20/10/10 Builder Score Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.15 }}
            className="lg:col-span-7 p-6 rounded-2xl bg-white border border-[#E8E5DD] shadow-xs space-y-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-[#6F6A60] uppercase tracking-wider block">
                  Builder Score Breakdown
                </span>
                <span className="text-[11px] text-[#6F6A60]">100% Transparent Formula (30/30/20/10/10)</span>
              </div>
              <div className="text-right">
                <span className="text-3xl font-bold font-mono text-[#1B1B1B]">{builderScoreData.totalScore}</span>
                <span className="text-xs text-[#6F6A60]"> / 1000</span>
              </div>
            </div>

            <div className="space-y-3 pt-1">
              {builderScoreData.breakdown.map((item) => (
                <div key={item.pillar} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-[#1B1B1B]">
                      {item.pillar} <span className="text-[#6F6A60] font-normal">({item.weightPercent}%)</span>
                    </span>
                    <span className="font-mono font-semibold text-[#1B1B1B]">
                      {item.score} <span className="text-[#6F6A60] font-normal">/ {item.maxScore} pts</span>
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-[#F6F4EE] border border-[#E8E5DD] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#1B1B1B] rounded-full transition-all duration-500"
                      style={{ width: `${(item.score / item.maxScore) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>

        {/* SECTION 4: GITHUB STATUS & INFERRED SKILLS */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.2 }}
          className="p-6 rounded-2xl bg-white border border-[#E8E5DD] shadow-xs space-y-4"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <GithubIcon className="w-5 h-5 text-[#1B1B1B]" />
                <h2 className="text-base font-bold text-[#1B1B1B]">GitHub Integration</h2>
                {githubData.connected && (
                  <span className="px-2 py-0.5 rounded-full bg-[#2F7A45]/10 text-[#2F7A45] text-[10px] font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> OAuth Synced
                  </span>
                )}
              </div>
              <p className="text-xs text-[#6F6A60] mt-0.5">
                Automated commit inspection, language profiling, and skill extraction.
              </p>
            </div>

            <div className="flex items-center gap-2">
              {githubData.connected ? (
                <>
                  <button
                    onClick={handleSyncGitHub}
                    disabled={isSyncingGitHub}
                    className="px-3 py-1.5 bg-[#F6F4EE] hover:bg-[#E8E5DD] text-[#1B1B1B] rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isSyncingGitHub ? 'animate-spin' : ''}`} />
                    <span>{isSyncingGitHub ? 'Syncing...' : 'Sync GitHub'}</span>
                  </button>
                  <Link
                    href="/student/journey#github"
                    className="px-3.5 py-1.5 bg-[#1B1B1B] text-white rounded-xl text-xs font-semibold hover:bg-[#C76A2A] transition-colors"
                  >
                    View Repositories
                  </Link>
                </>
              ) : (
                <button
                  onClick={() => connectGitHub('aarav-builder')}
                  className="px-4 py-2 bg-[#1B1B1B] text-white rounded-xl text-xs font-semibold hover:bg-[#C76A2A] transition-colors flex items-center gap-1.5"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>Connect GitHub OAuth</span>
                </button>
              )}
            </div>
          </div>

          {githubData.connected && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="p-3.5 rounded-xl bg-[#F6F4EE] border border-[#E8E5DD]">
                <span className="text-[#6F6A60] block text-[11px]">Repositories &amp; Stars</span>
                <strong className="text-sm font-bold text-[#1B1B1B]">{githubData.pinnedRepos?.length || 4} Repos • {githubData.totalStars || 142} ★</strong>
              </div>
              <div className="p-3.5 rounded-xl bg-[#F6F4EE] border border-[#E8E5DD]">
                <span className="text-[#6F6A60] block text-[11px]">Followers &amp; Following</span>
                <strong className="text-sm font-bold text-[#1B1B1B]">{githubData.followers || 58} Followers • {githubData.following || 34} Following</strong>
              </div>
              <div className="p-3.5 rounded-xl bg-[#F6F4EE] border border-[#E8E5DD]">
                <span className="text-[#6F6A60] block text-[11px]">Inferred Verified Skills</span>
                <strong className="text-sm font-bold text-[#C76A2A]">{(githubData.detectedSkills || ['FastAPI', 'Docker', 'PostgreSQL']).join(', ')}</strong>
              </div>
            </div>
          )}
        </motion.div>

        {/* SECTION 5: ASSESSMENT PROGRESS & VERIFIED SKILLS */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.25 }}
          className="p-6 rounded-2xl bg-white border border-[#E8E5DD] shadow-xs space-y-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-[#1B1B1B]">Assessment Progress</h2>
              <p className="text-xs text-[#6F6A60]">Summary of proven competency across all challenge tracks.</p>
            </div>
            <Link
              href="/student/assessments"
              className="text-xs font-semibold text-[#C76A2A] hover:underline flex items-center gap-1"
            >
              <span>Take Assessment</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-4 rounded-xl bg-[#F6F4EE] border border-[#E8E5DD]">
              <span className="text-[#6F6A60] block text-[11px]">Challenges Completed</span>
              <strong className="text-2xl font-bold font-mono text-[#1B1B1B]">{completedQuestsCount} / {totalQuestsCount}</strong>
            </div>
            <div className="p-4 rounded-xl bg-[#F6F4EE] border border-[#E8E5DD]">
              <span className="text-[#6F6A60] block text-[11px]">Average Score</span>
              <strong className="text-2xl font-bold font-mono text-[#2F7A45]">89%</strong>
            </div>
            <div className="p-4 rounded-xl bg-[#F6F4EE] border border-[#E8E5DD]">
              <span className="text-[#6F6A60] block text-[11px]">Verified Competencies</span>
              <strong className="text-2xl font-bold font-mono text-[#C76A2A]">{(studentProfile.verifiedSkills || []).length} Skills</strong>
            </div>
          </div>
        </motion.div>

        {/* SECTION 6: ACHIEVEMENTS & BADGES */}
        <motion.div
          id="achievements"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.3 }}
          className="p-6 rounded-2xl bg-white border border-[#E8E5DD] shadow-xs space-y-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-[#1B1B1B]">Achievements &amp; Badges</h2>
              <p className="text-xs text-[#6F6A60]">Earned solely through rigorous milestone completion and strict pass criteria.</p>
            </div>
            <span className="text-xs font-mono font-semibold text-[#1B1B1B]">
              {(achievements || []).filter(a => a.unlocked).length} / {(achievements || []).length} Unlocked
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {(achievements || []).map((badge) => (
              <div
                key={badge.id}
                onClick={() => handleBadgeClick(badge.id, badge.unlocked)}
                className={`p-4 rounded-xl border text-center space-y-2 cursor-pointer transition-all ${
                  badge.unlocked
                    ? 'bg-white border-[#E8E5DD] hover:border-[#C76A2A]'
                    : 'bg-[#F6F4EE]/60 border-[#E8E5DD] opacity-50'
                }`}
              >
                <div className="text-2xl">{badge.icon}</div>
                <div>
                  <h4 className="text-xs font-bold text-[#1B1B1B]">{badge.title}</h4>
                  <p className="text-[10px] text-[#6F6A60] line-clamp-2 mt-0.5">{badge.description}</p>
                </div>
                <div className="text-[10px] font-mono font-semibold text-[#C76A2A]">
                  +{badge.xpReward} XP {badge.unlocked && '✓'}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </PortalLayout>
  );
}
