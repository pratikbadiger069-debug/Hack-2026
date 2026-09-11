'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { useAppStore } from '@/lib/store';
import { getLevelInfo, calculateTransparentBuilderScore } from '@/lib/xp-engine';
import {
  ShieldCheck,
  ExternalLink,
  PlusCircle,
  X,
  CheckCircle2,
  Star,
  MapPin,
  Building,
  Target,
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

export default function MyJourneyPage() {
  const {
    studentProfile,
    addBuilderEvidence,
    addVerifiedSkill,
    xp,
    streakDays,
    quests,
    githubData,
    connectGitHub,
    disconnectGitHub,
    syncGitHub,
    achievements,
    unlockAchievement,
  } = useAppStore();

  const [isConnectingGitHub, setIsConnectingGitHub] = useState(false);
  const [isSyncingGitHub, setIsSyncingGitHub] = useState(false);
  const [syncSuccessMsg, setSyncSuccessMsg] = useState('');
  const [isAddEvidenceOpen, setIsAddEvidenceOpen] = useState(false);
  const [isAddSkillOpen, setIsAddSkillOpen] = useState(false);

  // Form states
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState<'GitHub Repo' | 'Live Product' | 'Research Paper' | 'Hackathon Win' | 'Open Source PR'>('GitHub Repo');
  const [newUrl, setNewUrl] = useState('');
  const [newDesc, setNewDesc] = useState('');

  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState<'Programming' | 'Cloud' | 'AI & ML' | 'DevOps' | 'Database' | 'Soft Skills'>('Programming');
  const [newSkillLevel, setNewSkillLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'>('Advanced');

  const levelInfo = getLevelInfo(xp);
  const completedChallenges = (quests || []).filter((q) => q.completed).length;

  const builderScoreData = calculateTransparentBuilderScore({
    verifiedSkillsCount: (studentProfile.verifiedSkills || []).length,
    projectsCount: (studentProfile.evidences || []).length,
    githubConnected: githubData?.connected,
    githubReposCount: (githubData?.pinnedRepos || []).length,
    consistencyStreakDays: streakDays,
    completedChallengesCount: completedChallenges,
  });

  const handleOAuthConnect = () => {
    setIsConnectingGitHub(true);
    setTimeout(() => {
      connectGitHub('aarav-builder');
      setIsConnectingGitHub(false);
    }, 700);
  };

  const handleSync = () => {
    setIsSyncingGitHub(true);
    setSyncSuccessMsg('');
    setTimeout(() => {
      syncGitHub();
      setIsSyncingGitHub(false);
      setSyncSuccessMsg('Synced 12 new commits & updated skill graph (+10 XP)');
      setTimeout(() => setSyncSuccessMsg(''), 4000);
    }, 800);
  };

  const handleDisconnect = () => {
    if (confirm('Disconnect GitHub integration? Your verified proof of work badges will remain saved.')) {
      disconnectGitHub();
    }
  };

  const handleBadgeClick = (badgeId: string, unlocked: boolean) => {
    if (!unlocked) {
      unlockAchievement(badgeId);
    }
  };

  const handleCreateEvidence = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    addBuilderEvidence({
      title: newTitle,
      type: newType,
      url: newUrl || 'https://github.com',
      description: newDesc || 'Production repository with tests, benchmarks, and CI/CD pipelines.',
      impactScore: Math.floor(85 + Math.random() * 12),
    });

    setNewTitle('');
    setNewUrl('');
    setNewDesc('');
    setIsAddEvidenceOpen(false);
  };

  const handleCreateSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName) return;

    addVerifiedSkill(newSkillName, newSkillLevel, newSkillCategory);
    setNewSkillName('');
    setIsAddSkillOpen(false);
  };

  const timelineEvents = [
    {
      month: 'Jan 2026',
      title: 'High-Throughput Distributed Rate Limiter Deployed',
      type: 'Project Verified (+100 XP)',
      description: 'Built token-bucket rate limiter in Go with Redis clustered state handling 15,000 req/sec.',
    },
    {
      month: 'Dec 2025',
      title: 'National Algorithmic Challenge — 1st Place',
      type: 'Hackathon Win (+150 XP)',
      description: 'Solved all 6 graph and dynamic programming challenges with optimal space and time complexities.',
    },
    {
      month: 'Nov 2025',
      title: 'Microservices & Docker Infrastructure Verified',
      type: 'Assessment Passed (+50 XP)',
      description: 'Demonstrated multi-stage Docker builds and docker-compose service mesh isolation.',
    },
    {
      month: 'Oct 2025',
      title: 'Java & Spring Boot Core Assessment',
      type: 'Assessment Passed (+25 XP)',
      description: 'Achieved 88% verified score in concurrency, JVM memory model, and REST contracts.',
    },
  ];

  return (
    <PortalLayout>
      <div className="space-y-8 max-w-[1200px] mx-auto pb-16">
        
        {/* SECTION 1: ABOUT & DIGITAL IDENTITY HEADER */}
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
                  src={studentProfile.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                  alt={studentProfile.name}
                  className="w-20 h-20 rounded-2xl object-cover border border-[#E8E5DD]"
                />
                <span className="absolute -bottom-1 -right-1 px-2 py-0.5 rounded-full bg-[#1B1B1B] text-white text-[10px] font-bold">
                  Lvl {levelInfo.level}
                </span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-2xl font-bold text-[#1B1B1B] tracking-tight">{studentProfile.name}</h1>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#C76A2A]/10 text-[#C76A2A] text-xs font-semibold">
                    {levelInfo.title}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#2F7A45]/10 text-[#2F7A45] text-xs font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified Builder
                  </span>
                </div>
                <p className="text-xs text-[#6F6A60] flex items-center gap-3 flex-wrap">
                  <span className="flex items-center gap-1"><Building className="w-3.5 h-3.5" /> {studentProfile.academic.college}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><Target className="w-3.5 h-3.5" /> Target: {studentProfile.targetRole}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> Bengaluru, India</span>
                </p>
                <p className="text-xs text-[#1B1B1B] pt-1 max-w-2xl leading-relaxed">
                  Systems engineer focused on high-throughput backend services, distributed cache protocols, and zero-downtime containerized workloads.
                </p>
              </div>
            </div>

            {/* Builder Action Buttons */}
            <div className="flex items-center gap-2 self-start">
              <button
                onClick={() => setIsAddEvidenceOpen(true)}
                className="px-3.5 py-2 bg-[#F6F4EE] hover:bg-[#E8E5DD] text-[#1B1B1B] rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5"
              >
                <PlusCircle className="w-3.5 h-3.5 text-[#C76A2A]" />
                <span>Add Proof</span>
              </button>
              <button
                onClick={() => setIsAddSkillOpen(true)}
                className="px-3.5 py-2 bg-[#1B1B1B] text-white hover:bg-[#C76A2A] rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Add Skill</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* SECTION 2 & 3: BUILDER LEVEL & TRANSPARENT BUILDER SCORE BREAKDOWN */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Builder Level Card (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.05 }}
            className="lg:col-span-5 p-6 rounded-2xl bg-white border border-[#E8E5DD] shadow-xs space-y-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#6F6A60] uppercase tracking-wider">
                Builder Level System
              </span>
              <span className="text-xs font-mono font-semibold text-[#C76A2A]">
                Rank #{levelInfo.rank} Campus
              </span>
            </div>

            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-[#1B1B1B]">Level {levelInfo.level}</span>
                <span className="text-sm font-semibold text-[#C76A2A]">{levelInfo.title}</span>
              </div>
              <p className="text-xs text-[#6F6A60] mt-0.5">
                Earned strictly via verified assessments, passing code challenges, and production projects.
              </p>
            </div>

            {/* XP Progress */}
            <div className="space-y-1.5 pt-1">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-[#1B1B1B] font-mono">{xp} Total XP</span>
                <span className="text-[#6F6A60] font-mono">{levelInfo.currentLevelProgress} / {levelInfo.nextLevelXP} in Level</span>
              </div>
              <div className="w-full h-2.5 bg-[#F6F4EE] border border-[#E8E5DD] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#C76A2A] rounded-full transition-all duration-500"
                  style={{ width: `${levelInfo.percentToNext}%` }}
                />
              </div>
              <p className="text-[11px] text-[#6F6A60]">
                {levelInfo.nextLevelXP - levelInfo.currentLevelProgress} XP remaining to achieve Level {levelInfo.level + 1}
              </p>
            </div>

            {/* Title Tier Progression */}
            <div className="pt-2 border-t border-[#E8E5DD] space-y-2">
              <span className="text-[11px] font-semibold text-[#6F6A60] uppercase tracking-wider block">
                Rank Progression Titles
              </span>
              <div className="grid grid-cols-3 gap-1.5 text-[11px]">
                {['Explorer', 'Builder', 'Creator', 'Architect', 'Innovator', 'Elite Builder'].map((t) => (
                  <div
                    key={t}
                    className={`px-2 py-1 rounded-lg text-center font-medium ${
                      levelInfo.title === t
                        ? 'bg-[#1B1B1B] text-white font-semibold'
                        : 'bg-[#F6F4EE] text-[#6F6A60]'
                    }`}
                  >
                    {t}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Transparent Builder Score Card (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.1 }}
            className="lg:col-span-7 p-6 rounded-2xl bg-white border border-[#E8E5DD] shadow-xs space-y-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-[#6F6A60] uppercase tracking-wider block">
                  Transparent Builder Score
                </span>
                <span className="text-[11px] text-[#6F6A60]">Deterministic verification formula — No hidden metrics</span>
              </div>
              <div className="text-right">
                <span className="text-3xl font-bold font-mono text-[#1B1B1B]">{builderScoreData.totalScore}</span>
                <span className="text-xs text-[#6F6A60]"> / 1000</span>
              </div>
            </div>

            {/* 5-Pillar Score Breakdown (30% / 30% / 20% / 10% / 10%) */}
            <div className="space-y-3 pt-2">
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
                  <p className="text-[10px] text-[#6F6A60]">{item.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

        </div>

        {/* SECTION 4: GITHUB INTEGRATION */}
        <motion.div
          id="github"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.15 }}
          className="p-6 rounded-2xl bg-white border border-[#E8E5DD] shadow-xs space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <GithubIcon className="w-5 h-5 text-[#1B1B1B]" />
                <h2 className="text-lg font-bold text-[#1B1B1B]">GitHub Proof of Work</h2>
                {githubData?.connected && (
                  <span className="px-2 py-0.5 rounded-full bg-[#2F7A45]/10 text-[#2F7A45] text-xs font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> OAuth Connected
                  </span>
                )}
              </div>
              <p className="text-xs text-[#6F6A60] mt-0.5">
                Real-time repository sync, star metrics, contribution density, and automatic skill inference.
              </p>
            </div>

            {!githubData?.connected ? (
              <button
                onClick={handleOAuthConnect}
                disabled={isConnectingGitHub}
                className="px-4 py-2 bg-[#1B1B1B] text-white rounded-xl text-xs font-semibold hover:bg-[#C76A2A] transition-colors flex items-center gap-2 shrink-0"
              >
                <GithubIcon className="w-4 h-4 text-white" />
                <span>{isConnectingGitHub ? 'Authenticating...' : 'Connect GitHub OAuth'}</span>
              </button>
            ) : (
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={handleSync}
                  disabled={isSyncingGitHub}
                  className="px-3 py-1.5 bg-[#F6F4EE] hover:bg-[#E8E5DD] text-[#1B1B1B] rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5"
                >
                  <Sparkles className={`w-3.5 h-3.5 text-[#C76A2A] ${isSyncingGitHub ? 'animate-spin' : ''}`} />
                  <span>{isSyncingGitHub ? 'Syncing...' : 'Sync GitHub'}</span>
                </button>
                <button
                  onClick={handleDisconnect}
                  className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-xl text-xs font-semibold transition-colors"
                >
                  Disconnect
                </button>
              </div>
            )}
          </div>

          {syncSuccessMsg && (
            <div className="p-3 bg-[#2F7A45]/10 border border-[#2F7A45]/20 rounded-xl text-xs font-semibold text-[#2F7A45] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>{syncSuccessMsg}</span>
            </div>
          )}

          {githubData?.connected ? (
            <div className="space-y-6 pt-2">
              {/* GitHub Profile Stat Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 p-4 bg-[#F6F4EE] rounded-xl border border-[#E8E5DD] text-center">
                <div>
                  <span className="text-[11px] text-[#6F6A60] block">Handle</span>
                  <span className="text-xs font-bold font-mono text-[#1B1B1B]">@{githubData.username || 'aarav-builder'}</span>
                </div>
                <div>
                  <span className="text-[11px] text-[#6F6A60] block">Repositories</span>
                  <span className="text-xs font-bold font-mono text-[#1B1B1B]">{githubData.publicRepos || 18}</span>
                </div>
                <div>
                  <span className="text-[11px] text-[#6F6A60] block">Total Stars</span>
                  <span className="text-xs font-bold font-mono text-[#C76A2A]">{githubData.totalStars || 142} ★</span>
                </div>
                <div>
                  <span className="text-[11px] text-[#6F6A60] block">Followers</span>
                  <span className="text-xs font-bold font-mono text-[#1B1B1B]">{githubData.followers || 89}</span>
                </div>
                <div>
                  <span className="text-[11px] text-[#6F6A60] block">Following</span>
                  <span className="text-xs font-bold font-mono text-[#1B1B1B]">{githubData.following || 42}</span>
                </div>
              </div>

              {/* Contribution Heatmap Matrix */}
              <div className="p-4 rounded-xl bg-white border border-[#E8E5DD] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#1B1B1B]">Contribution Heatmap</span>
                    <span className="text-[11px] text-[#6F6A60]">({githubData.recentCommitsCount || 348} commits this year)</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] text-[#6F6A60]">
                    <span>Less</span>
                    <div className="w-2.5 h-2.5 rounded-xs bg-[#E8E5DD]" />
                    <div className="w-2.5 h-2.5 rounded-xs bg-[#86EFAC]" />
                    <div className="w-2.5 h-2.5 rounded-xs bg-[#22C55E]" />
                    <div className="w-2.5 h-2.5 rounded-xs bg-[#15803D]" />
                    <span>More</span>
                  </div>
                </div>

                {/* Heatmap Grid: 28 weeks x 4 rows */}
                <div className="overflow-x-auto pb-1">
                  <div className="grid grid-flow-col grid-rows-4 gap-1 min-w-[580px]">
                    {Array.from({ length: 112 }).map((_, i) => {
                      const level = (i * 7 + 3) % 5;
                      const bgClass =
                        level === 0 ? 'bg-[#E8E5DD]/70' :
                        level === 1 ? 'bg-[#BBF7D0]' :
                        level === 2 ? 'bg-[#86EFAC]' :
                        level === 3 ? 'bg-[#22C55E]' : 'bg-[#15803D]';
                      return (
                        <div
                          key={i}
                          title={`Day ${i + 1}: ${level * 3} contributions`}
                          className={`w-3 h-3 rounded-xs ${bgClass} transition-transform hover:scale-125 cursor-pointer`}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Languages Breakdown */}
              <div className="p-4 rounded-xl bg-[#F6F4EE] border border-[#E8E5DD] space-y-2">
                <span className="text-xs font-bold text-[#1B1B1B] block">Language Distribution</span>
                <div className="w-full h-2.5 bg-white rounded-full overflow-hidden flex border border-[#E8E5DD]">
                  <div style={{ width: '48%' }} className="bg-[#3B82F6]" title="Python 48%" />
                  <div style={{ width: '32%' }} className="bg-[#60A5FA]" title="TypeScript 32%" />
                  <div style={{ width: '12%' }} className="bg-[#F97316]" title="C++ 12%" />
                  <div style={{ width: '8%' }} className="bg-[#22C55E]" title="SQL & Others 8%" />
                </div>
                <div className="flex items-center gap-4 text-[11px] text-[#6F6A60] flex-wrap pt-1 font-mono">
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#3B82F6]" /> Python (48%)</span>
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#60A5FA]" /> TypeScript (32%)</span>
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#F97316]" /> C++ (12%)</span>
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#22C55E]" /> SQL & Others (8%)</span>
                </div>
              </div>

              {/* Automatic Skill Extraction Matrix */}
              <div className="p-4 rounded-xl bg-white border border-[#E8E5DD] text-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-bold text-[#1B1B1B]">
                    <Sparkles className="w-4 h-4 text-[#C76A2A]" />
                    <span>Automatic Repository Skill Extraction</span>
                  </div>
                  <span className="text-[11px] font-mono text-[#2F7A45] font-semibold bg-[#2F7A45]/10 px-2 py-0.5 rounded-full">
                    Auto-Inferred
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 bg-[#F6F4EE] rounded-xl border border-[#E8E5DD] space-y-1">
                    <span className="text-[11px] font-semibold text-[#6F6A60] block">Spring Boot / Java Repo</span>
                    <span className="text-xs font-bold text-[#1B1B1B] block">→ Backend Development</span>
                    <span className="text-[10px] text-[#2F7A45] font-semibold">96% Confidence (REST APIs, JPA)</span>
                  </div>
                  <div className="p-3 bg-[#F6F4EE] rounded-xl border border-[#E8E5DD] space-y-1">
                    <span className="text-[11px] font-semibold text-[#6F6A60] block">React / Next.js Repo</span>
                    <span className="text-xs font-bold text-[#1B1B1B] block">→ Frontend Engineering</span>
                    <span className="text-[10px] text-[#2F7A45] font-semibold">94% Confidence (TS, Tailwind)</span>
                  </div>
                  <div className="p-3 bg-[#F6F4EE] rounded-xl border border-[#E8E5DD] space-y-1">
                    <span className="text-[11px] font-semibold text-[#6F6A60] block">Docker / Compose Repo</span>
                    <span className="text-xs font-bold text-[#1B1B1B] block">→ DevOps &amp; Containers</span>
                    <span className="text-[10px] text-[#2F7A45] font-semibold">91% Confidence (Multi-stage CI)</span>
                  </div>
                </div>
              </div>

              {/* Repositories Grid */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-[#1B1B1B] block uppercase tracking-wider">
                  Pinned Repositories
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(githubData.pinnedRepos || []).map((repo) => (
                    <div
                      key={repo.name}
                      className="p-4 rounded-xl bg-white border border-[#E8E5DD] hover:border-[#C76A2A] transition-all space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <a
                          href={repo.url}
                          target="_blank"
                          rel="noreferrer"
                          className="font-bold text-sm text-[#1B1B1B] hover:text-[#C76A2A] flex items-center gap-1.5"
                        >
                          <span>{repo.name}</span>
                          <ExternalLink className="w-3 h-3 text-[#6F6A60]" />
                        </a>
                        <span className="text-xs font-mono text-[#6F6A60] flex items-center gap-1">
                          <Star className="w-3 h-3 text-[#C76A2A]" /> {repo.stars}
                        </span>
                      </div>
                      <p className="text-xs text-[#6F6A60] line-clamp-2">{repo.description}</p>
                      <div className="flex items-center justify-between pt-1 text-[11px]">
                        <span className="font-mono text-[#C76A2A] font-medium">{repo.language}</span>
                        <span className="text-[#6F6A60]">{repo.forks} forks</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="p-4 rounded-xl bg-[#F6F4EE] border border-[#E8E5DD] space-y-2">
                <span className="text-xs font-bold text-[#1B1B1B] block">Recent GitHub Activity</span>
                <div className="space-y-1.5 text-xs text-[#6F6A60]">
                  <div className="flex items-center justify-between py-1 border-b border-[#E8E5DD]">
                    <span>Merged PR #14 in <strong className="text-[#1B1B1B]">vectormind-core</strong> (HNSW index optimization)</span>
                    <span className="text-[11px] font-mono">2h ago</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-[#E8E5DD]">
                    <span>Pushed 4 commits to <strong className="text-[#1B1B1B]">smartcampus-edge-guardian</strong></span>
                    <span className="text-[11px] font-mono">Yesterday</span>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <span>Created release <strong className="text-[#1B1B1B]">v1.2.0</strong> in distributed-token-bucket</span>
                    <span className="text-[11px] font-mono">3 days ago</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center rounded-xl bg-[#F6F4EE] border border-dashed border-[#E8E5DD] space-y-2">
              <GithubIcon className="w-8 h-8 text-[#6F6A60] mx-auto" />
              <h3 className="text-sm font-bold text-[#1B1B1B]">Connect your GitHub to verify your code</h3>
              <p className="text-xs text-[#6F6A60] max-w-md mx-auto">
                SkillBridge inspects commit density, test coverage, and languages to boost your Builder Score by up to 200 points.
              </p>
            </div>
          )}
        </motion.div>

        {/* SECTION 5: VERIFIED SKILLS PASSPORT */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.2 }}
          className="p-6 rounded-2xl bg-white border border-[#E8E5DD] shadow-xs space-y-5"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#1B1B1B]">Verified Skills Passport</h2>
              <p className="text-xs text-[#6F6A60]">
                Every skill requires multi-source proof: strict assessments, GitHub repos, or verified project reviews.
              </p>
            </div>
            <span className="text-xs font-mono font-semibold text-[#2F7A45] bg-[#2F7A45]/10 px-2.5 py-1 rounded-full">
              {studentProfile.verifiedSkills.length} Verified Competencies
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {studentProfile.verifiedSkills.map((skill) => {
              const confidence = Math.min(96, 75 + skill.score * 0.2);
              return (
                <div
                  key={skill.id || skill.name}
                  className="p-4 rounded-xl bg-white border border-[#E8E5DD] space-y-2.5 hover:border-[#1B1B1B] transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-[#1B1B1B]">{skill.name}</h4>
                      <span className="text-[10px] text-[#6F6A60]">{skill.category} • {skill.level}</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-md bg-[#2F7A45]/10 text-[#2F7A45] text-[10px] font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Verified
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-[#6F6A60]">Verified Score: <strong className="text-[#1B1B1B]">{skill.score}%</strong></span>
                      <span className="text-[#6F6A60]">Confidence: <strong className="text-[#C76A2A]">{Math.round(confidence)}%</strong></span>
                    </div>
                    <div className="w-full h-1.5 bg-[#F6F4EE] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#C76A2A] rounded-full"
                        style={{ width: `${skill.score}%` }}
                      />
                    </div>
                  </div>

                  <div className="pt-1 text-[10px] text-[#6F6A60] flex items-center gap-1 flex-wrap">
                    <span className="font-semibold text-[#1B1B1B]">Evidence:</span>
                    <span className="px-1.5 py-0.5 rounded bg-[#F6F4EE] border border-[#E8E5DD]">Strict MCQ</span>
                    <span className="px-1.5 py-0.5 rounded bg-[#F6F4EE] border border-[#E8E5DD]">GitHub Commits</span>
                    {skill.score > 80 && (
                      <span className="px-1.5 py-0.5 rounded bg-[#F6F4EE] border border-[#E8E5DD]">Project Code</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* SECTION 6: VERIFIED EVIDENCE & PROJECTS */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.25 }}
          className="p-6 rounded-2xl bg-white border border-[#E8E5DD] shadow-xs space-y-5"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#1B1B1B]">Verified Builder Projects &amp; Evidence</h2>
              <p className="text-xs text-[#6F6A60]">
                Production applications, runnable demos, and architectural artifacts.
              </p>
            </div>
            <button
              onClick={() => setIsAddEvidenceOpen(true)}
              className="text-xs font-semibold text-[#C76A2A] hover:underline"
            >
              + Submit Proof
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {studentProfile.evidences.map((evidence) => (
              <div
                key={evidence.id}
                className="p-5 rounded-xl bg-white border border-[#E8E5DD] space-y-3 hover:border-[#C76A2A] transition-all"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-base font-bold text-[#1B1B1B]">{evidence.title}</h3>
                    <p className="text-xs text-[#6F6A60] mt-0.5">{evidence.description}</p>
                  </div>
                  {evidence.verified && (
                    <span className="px-2 py-0.5 rounded-full bg-[#2F7A45]/10 text-[#2F7A45] text-xs font-bold shrink-0 ml-2">
                      Verified
                    </span>
                  )}
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-[#E8E5DD] text-xs">
                  <span className="text-[#6F6A60] text-[11px]">Impact Score: <strong className="text-[#1B1B1B]">{evidence.impactScore}/100</strong></span>
                  {evidence.url && (
                    <a
                      href={evidence.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#C76A2A] hover:underline flex items-center gap-1 font-semibold"
                    >
                      <span>View Source</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* SECTION 7: ACHIEVEMENTS & BADGES */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.3 }}
          className="p-6 rounded-2xl bg-white border border-[#E8E5DD] shadow-xs space-y-5"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#1B1B1B]">Builder Badges &amp; Certifications</h2>
              <p className="text-xs text-[#6F6A60]">Earned solely through rigorous milestone completion and strict pass criteria.</p>
            </div>
            <span className="text-xs font-mono font-semibold text-[#1B1B1B]">
              {achievements.filter(a => a.unlocked).length} / {achievements.length} Unlocked
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {achievements.map((badge) => (
              <div
                key={badge.id}
                onClick={() => handleBadgeClick(badge.id, badge.unlocked)}
                className={`p-3.5 rounded-xl border text-center space-y-2 cursor-pointer transition-all ${
                  badge.unlocked
                    ? 'bg-white border-[#E8E5DD] hover:border-[#C76A2A]'
                    : 'bg-[#F6F4EE]/60 border-[#E8E5DD] opacity-50'
                }`}
              >
                <div className="text-2xl">{badge.icon}</div>
                <div>
                  <h5 className="text-xs font-bold text-[#1B1B1B]">{badge.title}</h5>
                  <p className="text-[10px] text-[#6F6A60] line-clamp-2 mt-0.5">{badge.description}</p>
                </div>
                <div className="text-[10px] font-mono font-semibold text-[#C76A2A]">
                  +{badge.xpReward} XP
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* SECTION 8: TIMELINE */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.35 }}
          className="p-6 rounded-2xl bg-white border border-[#E8E5DD] shadow-xs space-y-5"
        >
          <h2 className="text-lg font-bold text-[#1B1B1B]">Builder Timeline</h2>
          <div className="space-y-6 relative before:absolute before:inset-0 before:left-2 before:w-0.5 before:bg-[#E8E5DD]">
            {timelineEvents.map((evt, idx) => (
              <div key={idx} className="relative pl-6 space-y-1">
                <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-white border-2 border-[#C76A2A]" />
                <div className="flex items-baseline justify-between">
                  <h4 className="text-sm font-bold text-[#1B1B1B]">{evt.title}</h4>
                  <span className="text-[11px] font-mono text-[#6F6A60]">{evt.month}</span>
                </div>
                <span className="text-[11px] font-semibold text-[#C76A2A] block">{evt.type}</span>
                <p className="text-xs text-[#6F6A60]">{evt.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

      </div>

      {/* Add Evidence Modal */}
      {isAddEvidenceOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-[#E8E5DD] max-w-md w-full p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-[#1B1B1B]">Submit Proof of Work</h3>
              <button onClick={() => setIsAddEvidenceOpen(false)} className="text-[#6F6A60] hover:text-[#1B1B1B]">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleCreateEvidence} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-[#1B1B1B] block mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Distributed Key-Value Store"
                  className="w-full p-2 bg-[#F6F4EE] border border-[#E8E5DD] rounded-xl text-[#1B1B1B]"
                />
              </div>
              <div>
                <label className="font-semibold text-[#1B1B1B] block mb-1">Type</label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value as any)}
                  className="w-full p-2 bg-[#F6F4EE] border border-[#E8E5DD] rounded-xl text-[#1B1B1B]"
                >
                  <option>GitHub Repo</option>
                  <option>Live Product</option>
                  <option>Research Paper</option>
                  <option>Hackathon Win</option>
                  <option>Open Source PR</option>
                </select>
              </div>
              <div>
                <label className="font-semibold text-[#1B1B1B] block mb-1">URL</label>
                <input
                  type="url"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  placeholder="https://github.com/username/project"
                  className="w-full p-2 bg-[#F6F4EE] border border-[#E8E5DD] rounded-xl text-[#1B1B1B]"
                />
              </div>
              <div>
                <label className="font-semibold text-[#1B1B1B] block mb-1">Description &amp; Impact</label>
                <textarea
                  rows={3}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Explain architecture, test coverage, and benchmark results..."
                  className="w-full p-2 bg-[#F6F4EE] border border-[#E8E5DD] rounded-xl text-[#1B1B1B]"
                />
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddEvidenceOpen(false)}
                  className="px-4 py-2 rounded-xl bg-[#F6F4EE] text-[#6F6A60] font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#1B1B1B] text-white font-semibold hover:bg-[#C76A2A]"
                >
                  Submit for Verification
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Skill Modal */}
      {isAddSkillOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-[#E8E5DD] max-w-md w-full p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-[#1B1B1B]">Add Skill Competency</h3>
              <button onClick={() => setIsAddSkillOpen(false)} className="text-[#6F6A60] hover:text-[#1B1B1B]">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleCreateSkill} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-[#1B1B1B] block mb-1">Skill Name</label>
                <input
                  type="text"
                  required
                  value={newSkillName}
                  onChange={(e) => setNewSkillName(e.target.value)}
                  placeholder="e.g. Apache Kafka or Rust"
                  className="w-full p-2 bg-[#F6F4EE] border border-[#E8E5DD] rounded-xl text-[#1B1B1B]"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-[#1B1B1B] block mb-1">Category</label>
                  <select
                    value={newSkillCategory}
                    onChange={(e) => setNewSkillCategory(e.target.value as any)}
                    className="w-full p-2 bg-[#F6F4EE] border border-[#E8E5DD] rounded-xl text-[#1B1B1B]"
                  >
                    <option value="Programming">Programming</option>
                    <option value="Database">Database</option>
                    <option value="DevOps">DevOps</option>
                    <option value="Cloud">Cloud</option>
                    <option value="AI & ML">AI &amp; ML</option>
                    <option value="Soft Skills">Soft Skills</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-[#1B1B1B] block mb-1">Level</label>
                  <select
                    value={newSkillLevel}
                    onChange={(e) => setNewSkillLevel(e.target.value as any)}
                    className="w-full p-2 bg-[#F6F4EE] border border-[#E8E5DD] rounded-xl text-[#1B1B1B]"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddSkillOpen(false)}
                  className="px-4 py-2 rounded-xl bg-[#F6F4EE] text-[#6F6A60] font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#1B1B1B] text-white font-semibold hover:bg-[#C76A2A]"
                >
                  Add Skill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </PortalLayout>
  );
}
