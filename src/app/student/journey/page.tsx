'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { useAppStore } from '@/lib/store';
import {
  Award,
  ShieldCheck,
  Code,
  Calendar,
  ExternalLink,
  PlusCircle,
  Trophy,
  X,
  CheckCircle2,
  Lock,
  GitBranch,
  Star,
  BookOpen,
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
    level,
    githubData,
    connectGitHub,
    achievements,
    unlockAchievement,
  } = useAppStore();

  const [activeFilter, setActiveFilter] = useState<'all' | 'github' | 'skills' | 'projects' | 'badges' | 'timeline'>('all');
  const [isConnectingGitHub, setIsConnectingGitHub] = useState(false);
  const [isAddEvidenceOpen, setIsAddEvidenceOpen] = useState(false);
  const [isAddSkillOpen, setIsAddSkillOpen] = useState(false);

  // Form states
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState<any>('GitHub Repo');
  const [newUrl, setNewUrl] = useState('');
  const [newDesc, setNewDesc] = useState('');

  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState<any>('Programming');
  const [newSkillLevel, setNewSkillLevel] = useState<any>('Advanced');

  const handleOAuthConnect = () => {
    setIsConnectingGitHub(true);
    setTimeout(() => {
      connectGitHub('aarav-builder');
      setIsConnectingGitHub(false);
    }, 600);
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

  const bScores = studentProfile.builderScores;

  const timelineEvents = [
    {
      month: 'Jan 2026',
      title: 'Real-time Multimodal Vector Retrieval Engine Deployed',
      type: 'Project Verified (+100 XP)',
      description: 'Built HNSW vector search serving 40k QPS with sub-15ms p99 latency in C++ and Python.',
    },
    {
      month: 'Dec 2025',
      title: 'SmartCampus IoT Edge Guardian — 1st Place National Hackathon',
      type: 'Hackathon Win (+150 XP)',
      description: 'Led a 4-person engineering squad to build on-device vision models for university energy conservation.',
    },
    {
      month: 'Nov 2025',
      title: 'TypeScript & Next.js Advanced Competency Certified',
      type: 'Assessment Passed (+50 XP)',
      description: 'Scored 86% in rigorous async concurrency and SSR performance evaluations.',
    },
    {
      month: 'Aug 2025',
      title: 'Python & FastAPI Expert Diagnostic Assessment',
      type: 'Assessment Passed (+50 XP)',
      description: 'Scored 95% across 30 algorithm questions, API rate limiting, and async generators.',
    },
  ];

  return (
    <PortalLayout>
      <div className="space-y-6 max-w-[1200px] mx-auto pb-16">
        {/* Top Hero & Header */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#E6E4DD] dark:border-[#2D333B]"
        >
          <div>
            <h1 className="text-2xl font-semibold text-[#1F2328] dark:text-[#F0F6FC] tracking-tight">
              My Journey
            </h1>
            <p className="text-xs text-[#656D76] dark:text-[#8B949E] mt-0.5">
              Verified proof-of-work, GitHub activity, skill passport, and builder milestones.
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={handleOAuthConnect}
              disabled={isConnectingGitHub || githubData.connected}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-2 ${
                githubData.connected
                  ? 'bg-[#FAF9F5] dark:bg-[#161B22] border border-[#E6E4DD] dark:border-[#2D333B] text-[#1F2328] dark:text-[#F0F6FC]'
                  : 'bg-[#1F2328] dark:bg-[#F0F6FC] text-white dark:text-[#0F1115] hover:bg-black dark:hover:bg-white'
              }`}
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>
                {isConnectingGitHub ? 'Connecting...' : githubData.connected ? 'GitHub Connected' : 'Connect GitHub (+25 XP)'}
              </span>
            </button>

            <button
              onClick={() => setIsAddEvidenceOpen(true)}
              className="px-3.5 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>+ Add Project (+100 XP)</span>
            </button>
          </div>
        </motion.div>

        {/* Builder Score Overview Card */}
        <div className="p-6 bg-white dark:bg-[#161B22] rounded-xl border border-[#E6E4DD] dark:border-[#2D333B] space-y-5">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-18 h-18 rounded-xl bg-[#FAF9F5] dark:bg-[#0F1115] border border-[#E6E4DD] dark:border-[#2D333B] flex flex-col items-center justify-center text-center shrink-0 p-3">
                <span className="text-2xl font-bold text-[#1F2328] dark:text-[#F0F6FC] font-mono">{bScores.overall || 885}</span>
                <span className="text-[10px] text-[#8C959F] dark:text-[#6E7681] font-mono">/ 1000</span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-[#1F2328] dark:text-[#F0F6FC]">
                    Builder Score &amp; Track Record
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 font-medium">
                    Top 5%
                  </span>
                </div>
                <p className="text-xs text-[#656D76] dark:text-[#8B949E] max-w-lg">
                  Algorithmic index calculated from repository complexity, commit frequency, verified challenges, and peer validations.
                </p>
              </div>
            </div>

            {/* Sub-Score Dimensions */}
            <div className="grid grid-cols-5 gap-2 pt-4 lg:pt-0 border-t lg:border-t-0 lg:border-l border-[#E6E4DD] dark:border-[#2D333B] lg:pl-6">
              <div className="p-2.5 bg-[#FAF9F5] dark:bg-[#0F1115] rounded-lg border border-[#E6E4DD] dark:border-[#2D333B] text-center">
                <span className="text-[10px] font-mono text-[#8C959F] dark:text-[#6E7681] block">EXEC</span>
                <strong className="text-xs font-mono font-bold text-[#1F2328] dark:text-[#F0F6FC]">{bScores.execution || 92}%</strong>
              </div>
              <div className="p-2.5 bg-[#FAF9F5] dark:bg-[#0F1115] rounded-lg border border-[#E6E4DD] dark:border-[#2D333B] text-center">
                <span className="text-[10px] font-mono text-[#8C959F] dark:text-[#6E7681] block">LEAD</span>
                <strong className="text-xs font-mono font-bold text-[#1F2328] dark:text-[#F0F6FC]">{bScores.leadership || 85}%</strong>
              </div>
              <div className="p-2.5 bg-[#FAF9F5] dark:bg-[#0F1115] rounded-lg border border-[#E6E4DD] dark:border-[#2D333B] text-center">
                <span className="text-[10px] font-mono text-[#8C959F] dark:text-[#6E7681] block">INNOV</span>
                <strong className="text-xs font-mono font-bold text-[#1F2328] dark:text-[#F0F6FC]">{bScores.innovation || 90}%</strong>
              </div>
              <div className="p-2.5 bg-[#FAF9F5] dark:bg-[#0F1115] rounded-lg border border-[#E6E4DD] dark:border-[#2D333B] text-center">
                <span className="text-[10px] font-mono text-[#8C959F] dark:text-[#6E7681] block">SOLVE</span>
                <strong className="text-xs font-mono font-bold text-[#1F2328] dark:text-[#F0F6FC]">{bScores.problemSolving || 94}%</strong>
              </div>
              <div className="p-2.5 bg-[#FAF9F5] dark:bg-[#0F1115] rounded-lg border border-[#E6E4DD] dark:border-[#2D333B] text-center">
                <span className="text-[10px] font-mono text-[#8C959F] dark:text-[#6E7681] block">CONSIST</span>
                <strong className="text-xs font-mono font-bold text-[#1F2328] dark:text-[#F0F6FC]">{bScores.consistency || 88}%</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 border-b border-[#E6E4DD] dark:border-[#2D333B] pb-2 overflow-x-auto no-scrollbar">
          {[
            { id: 'all', label: 'All Items' },
            { id: 'github', label: `GitHub Repos (${githubData.publicRepos})` },
            { id: 'skills', label: `Verified Skills (${studentProfile.verifiedSkills.length})` },
            { id: 'projects', label: `Projects (${studentProfile.evidences.length})` },
            { id: 'badges', label: `Badges (${achievements.length})` },
            { id: 'timeline', label: 'Growth Timeline' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as any)}
              className={`px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                activeFilter === tab.id
                  ? 'bg-[#1F2328] dark:bg-[#F0F6FC] text-white dark:text-[#0F1115]'
                  : 'text-[#656D76] dark:text-[#8B949E] hover:text-[#1F2328] dark:hover:text-[#F0F6FC] hover:bg-black/5 dark:hover:bg-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* GitHub Intelligence Section */}
        {(activeFilter === 'all' || activeFilter === 'github') && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#1F2328] dark:text-[#F0F6FC]">
                <GithubIcon className="w-4 h-4" />
                <span>GitHub Repositories &amp; Analysis</span>
              </div>
              <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
                Connected: @{githubData.username}
              </span>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 bg-white dark:bg-[#161B22] rounded-xl border border-[#E6E4DD] dark:border-[#2D333B] text-center">
                <span className="text-[11px] text-[#656D76] dark:text-[#8B949E] block">Public Repos</span>
                <strong className="text-base font-mono font-semibold text-[#1F2328] dark:text-[#F0F6FC]">{githubData.publicRepos}</strong>
              </div>
              <div className="p-3.5 bg-white dark:bg-[#161B22] rounded-xl border border-[#E6E4DD] dark:border-[#2D333B] text-center">
                <span className="text-[11px] text-[#656D76] dark:text-[#8B949E] block">Stars Earned</span>
                <strong className="text-base font-mono font-semibold text-[#1F2328] dark:text-[#F0F6FC]">★ {githubData.totalStars}</strong>
              </div>
              <div className="p-3.5 bg-white dark:bg-[#161B22] rounded-xl border border-[#E6E4DD] dark:border-[#2D333B] text-center">
                <span className="text-[11px] text-[#656D76] dark:text-[#8B949E] block">Commits (12m)</span>
                <strong className="text-base font-mono font-semibold text-[#1F2328] dark:text-[#F0F6FC]">{githubData.recentCommitsCount}</strong>
              </div>
              <div className="p-3.5 bg-white dark:bg-[#161B22] rounded-xl border border-[#E6E4DD] dark:border-[#2D333B] text-center">
                <span className="text-[11px] text-[#656D76] dark:text-[#8B949E] block">Followers</span>
                <strong className="text-base font-mono font-semibold text-[#1F2328] dark:text-[#F0F6FC]">{githubData.followers}</strong>
              </div>
            </div>

            {/* Pinned Repos */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {githubData.pinnedRepos.map((repo, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-white dark:bg-[#161B22] rounded-xl border border-[#E6E4DD] dark:border-[#2D333B] space-y-2.5 flex flex-col justify-between"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-[#1F2328] dark:text-[#F0F6FC]">
                        <BookOpen className="w-3.5 h-3.5 text-[#656D76] dark:text-[#8B949E]" />
                        <span className="truncate">{repo.name}</span>
                      </div>
                      <span className="text-[11px] font-mono text-[#656D76] dark:text-[#8B949E]">
                        ★ {repo.stars}
                      </span>
                    </div>
                    <p className="text-xs text-[#656D76] dark:text-[#8B949E] line-clamp-2">
                      {repo.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#E6E4DD] dark:border-[#2D333B] flex items-center justify-between text-xs">
                    <span className="font-mono text-[11px] text-blue-600 dark:text-blue-400">{repo.language}</span>
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-[#656D76] dark:text-[#8B949E] hover:text-[#1F2328] dark:hover:text-[#F0F6FC] inline-flex items-center gap-1 font-medium"
                    >
                      <span>View</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Verified Skills Passport */}
        {(activeFilter === 'all' || activeFilter === 'skills') && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#1F2328] dark:text-[#F0F6FC]">
                <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>Verified Skills Passport</span>
              </div>
              <button
                onClick={() => setIsAddSkillOpen(true)}
                className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                + Add Verified Skill
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {studentProfile.verifiedSkills.map((skill) => (
                <div
                  key={skill.id}
                  className="p-4 bg-white dark:bg-[#161B22] rounded-xl border border-[#E6E4DD] dark:border-[#2D333B] space-y-2"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-semibold text-xs text-[#1F2328] dark:text-[#F0F6FC]">
                        {skill.name}
                      </div>
                      <span className="text-[11px] text-[#656D76] dark:text-[#8B949E]">{skill.category}</span>
                    </div>
                    <span className="text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                      {skill.score}%
                    </span>
                  </div>

                  <div className="w-full bg-[#E6E4DD] dark:bg-[#2D333B] rounded-full h-1 overflow-hidden">
                    <div className="bg-emerald-600 dark:bg-emerald-400 h-full progress-fill" style={{ width: `${skill.score}%` }} />
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-[#8C959F] dark:text-[#6E7681] pt-1 font-mono">
                    <span>{skill.level}</span>
                    <span>{skill.verificationCode}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Project Evidence */}
        {(activeFilter === 'all' || activeFilter === 'projects') && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#1F2328] dark:text-[#F0F6FC]">
                <Code className="w-4 h-4 text-[#1F2328] dark:text-[#F0F6FC]" />
                <span>Production Project Evidence</span>
              </div>
              <span className="text-xs font-mono text-[#656D76] dark:text-[#8B949E]">
                {studentProfile.evidences.length} Verified
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {studentProfile.evidences.map((ev) => (
                <div
                  key={ev.id}
                  className="p-5 bg-white dark:bg-[#161B22] rounded-xl border border-[#E6E4DD] dark:border-[#2D333B] space-y-2.5 flex flex-col justify-between"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#FAF9F5] dark:bg-[#0F1115] border border-[#E6E4DD] dark:border-[#2D333B] text-[#656D76] dark:text-[#8B949E]">
                          {ev.type}
                        </span>
                        <h4 className="text-sm font-semibold text-[#1F2328] dark:text-[#F0F6FC] mt-1">
                          {ev.title}
                        </h4>
                      </div>
                      <span className="text-xs font-mono font-medium text-emerald-600 dark:text-emerald-400">
                        {ev.impactScore}/100 Impact
                      </span>
                    </div>
                    <p className="text-xs text-[#656D76] dark:text-[#8B949E] leading-relaxed">
                      {ev.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2.5 border-t border-[#E6E4DD] dark:border-[#2D333B] text-xs">
                    <span className="text-[#8C959F] dark:text-[#6E7681] font-mono text-[11px]">{ev.date}</span>
                    {ev.url && (
                      <a
                        href={ev.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-medium text-[#1F2328] dark:text-[#F0F6FC] hover:text-blue-600 inline-flex items-center gap-1"
                      >
                        <span>View Repository</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Badges */}
        {(activeFilter === 'all' || activeFilter === 'badges') && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#1F2328] dark:text-[#F0F6FC]">
                <Trophy className="w-4 h-4 text-[#1F2328] dark:text-[#F0F6FC]" />
                <span>Builder Badges</span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {achievements.map((badge) => (
                <div
                  key={badge.id}
                  onClick={() => handleBadgeClick(badge.id, badge.unlocked)}
                  className={`p-4 bg-white dark:bg-[#161B22] rounded-xl border border-[#E6E4DD] dark:border-[#2D333B] text-center space-y-1.5 cursor-pointer transition-opacity ${
                    badge.unlocked ? 'opacity-100' : 'opacity-40'
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg mx-auto flex items-center justify-center bg-[#FAF9F5] dark:bg-[#0F1115] border border-[#E6E4DD] dark:border-[#2D333B]">
                    {badge.unlocked ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <Lock className="w-4 h-4 text-[#8C959F]" />
                    )}
                  </div>
                  <div>
                    <div className="font-semibold text-xs text-[#1F2328] dark:text-[#F0F6FC]">
                      {badge.title}
                    </div>
                    <p className="text-[11px] text-[#656D76] dark:text-[#8B949E] line-clamp-2 mt-0.5">
                      {badge.description}
                    </p>
                  </div>
                  <div className="text-[10px] font-mono text-[#8C959F] dark:text-[#6E7681]">
                    +{badge.xpReward} XP
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Growth Timeline */}
        {(activeFilter === 'all' || activeFilter === 'timeline') && (
          <div className="p-6 bg-white dark:bg-[#161B22] rounded-xl border border-[#E6E4DD] dark:border-[#2D333B] space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#E6E4DD] dark:border-[#2D333B]">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#1F2328] dark:text-[#F0F6FC]">
                <Calendar className="w-4 h-4 text-[#1F2328] dark:text-[#F0F6FC]" />
                <span>Growth Timeline</span>
              </div>
              <span className="text-xs font-mono text-[#656D76] dark:text-[#8B949E]">Milestone Log</span>
            </div>

            <div className="space-y-4 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-px before:bg-[#E6E4DD] dark:before:bg-[#2D333B]">
              {timelineEvents.map((evt, idx) => (
                <div key={idx} className="relative pl-6 space-y-0.5">
                  <div className="absolute left-1.25 top-1.5 w-1.5 h-1.5 rounded-full bg-blue-600" />
                  <div className="flex items-center justify-between text-xs">
                    <strong className="font-semibold text-[#1F2328] dark:text-[#F0F6FC]">
                      {evt.title}
                    </strong>
                    <span className="text-[11px] font-mono text-blue-600 dark:text-blue-400">
                      {evt.type}
                    </span>
                  </div>
                  <p className="text-xs text-[#656D76] dark:text-[#8B949E] leading-relaxed">
                    {evt.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Add Project Evidence Modal */}
      {isAddEvidenceOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="w-full max-w-md bg-white dark:bg-[#161B22] rounded-xl border border-[#E6E4DD] dark:border-[#2D333B] p-5 space-y-4 shadow-lg text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-[#E6E4DD] dark:border-[#2D333B]">
              <h3 className="font-semibold text-sm text-[#1F2328] dark:text-[#F0F6FC]">Add Project Evidence (+100 XP)</h3>
              <button onClick={() => setIsAddEvidenceOpen(false)} className="text-[#8C959F] hover:text-[#1F2328] dark:hover:text-[#F0F6FC]">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleCreateEvidence} className="space-y-3">
              <div>
                <label className="font-medium text-[#656D76] dark:text-[#8B949E] block mb-1">Project Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Distributed Token Bucket Rate Limiter"
                  className="w-full p-2 bg-[#FAF9F5] dark:bg-[#0F1115] border border-[#E6E4DD] dark:border-[#2D333B] rounded-lg text-[#1F2328] dark:text-[#F0F6FC] focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-medium text-[#656D76] dark:text-[#8B949E] block mb-1">Type</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                    className="w-full p-2 bg-[#FAF9F5] dark:bg-[#0F1115] border border-[#E6E4DD] dark:border-[#2D333B] rounded-lg text-[#1F2328] dark:text-[#F0F6FC]"
                  >
                    <option value="GitHub Repo">GitHub Repo</option>
                    <option value="Live Product">Live Product</option>
                    <option value="Research Paper">Research Paper</option>
                    <option value="Hackathon Win">Hackathon Win</option>
                  </select>
                </div>
                <div>
                  <label className="font-medium text-[#656D76] dark:text-[#8B949E] block mb-1">URL</label>
                  <input
                    type="url"
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    placeholder="https://github.com/..."
                    className="w-full p-2 bg-[#FAF9F5] dark:bg-[#0F1115] border border-[#E6E4DD] dark:border-[#2D333B] rounded-lg text-[#1F2328] dark:text-[#F0F6FC]"
                  />
                </div>
              </div>
              <div>
                <label className="font-medium text-[#656D76] dark:text-[#8B949E] block mb-1">Description</label>
                <textarea
                  rows={3}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Architecture, key libraries, benchmark metrics..."
                  className="w-full p-2 bg-[#FAF9F5] dark:bg-[#0F1115] border border-[#E6E4DD] dark:border-[#2D333B] rounded-lg text-[#1F2328] dark:text-[#F0F6FC]"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t border-[#E6E4DD] dark:border-[#2D333B]">
                <button
                  type="button"
                  onClick={() => setIsAddEvidenceOpen(false)}
                  className="px-3 py-1.5 text-[#656D76] dark:text-[#8B949E]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#1F2328] dark:bg-[#F0F6FC] text-white dark:text-[#0F1115] rounded-lg font-medium"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Skill Modal */}
      {isAddSkillOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="w-full max-w-sm bg-white dark:bg-[#161B22] rounded-xl border border-[#E6E4DD] dark:border-[#2D333B] p-5 space-y-4 shadow-lg text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-[#E6E4DD] dark:border-[#2D333B]">
              <h3 className="font-semibold text-sm text-[#1F2328] dark:text-[#F0F6FC]">Add Verified Skill (+50 XP)</h3>
              <button onClick={() => setIsAddSkillOpen(false)} className="text-[#8C959F] hover:text-[#1F2328] dark:hover:text-[#F0F6FC]">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleCreateSkill} className="space-y-3">
              <div>
                <label className="font-medium text-[#656D76] dark:text-[#8B949E] block mb-1">Skill Name</label>
                <input
                  type="text"
                  required
                  value={newSkillName}
                  onChange={(e) => setNewSkillName(e.target.value)}
                  placeholder="e.g. Docker, PyTorch, Kubernetes"
                  className="w-full p-2 bg-[#FAF9F5] dark:bg-[#0F1115] border border-[#E6E4DD] dark:border-[#2D333B] rounded-lg text-[#1F2328] dark:text-[#F0F6FC]"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-medium text-[#656D76] dark:text-[#8B949E] block mb-1">Category</label>
                  <select
                    value={newSkillCategory}
                    onChange={(e) => setNewSkillCategory(e.target.value as any)}
                    className="w-full p-2 bg-[#FAF9F5] dark:bg-[#0F1115] border border-[#E6E4DD] dark:border-[#2D333B] rounded-lg text-[#1F2328] dark:text-[#F0F6FC]"
                  >
                    <option value="Programming">Programming</option>
                    <option value="AI & ML">AI & ML</option>
                    <option value="Database">Database</option>
                    <option value="DevOps">DevOps</option>
                    <option value="Cloud">Cloud</option>
                  </select>
                </div>
                <div>
                  <label className="font-medium text-[#656D76] dark:text-[#8B949E] block mb-1">Level</label>
                  <select
                    value={newSkillLevel}
                    onChange={(e) => setNewSkillLevel(e.target.value as any)}
                    className="w-full p-2 bg-[#FAF9F5] dark:bg-[#0F1115] border border-[#E6E4DD] dark:border-[#2D333B] rounded-lg text-[#1F2328] dark:text-[#F0F6FC]"
                  >
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t border-[#E6E4DD] dark:border-[#2D333B]">
                <button
                  type="button"
                  onClick={() => setIsAddSkillOpen(false)}
                  className="px-3 py-1.5 text-[#656D76] dark:text-[#8B949E]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-blue-600 text-white rounded-lg font-medium"
                >
                  Verify Skill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </PortalLayout>
  );
}
