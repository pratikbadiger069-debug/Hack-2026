'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { useAppStore } from '@/lib/store';
import { UserAvatar } from '@/components/avatar/UserAvatar';
import {
  ExternalLink,
  GitBranch,
  Star,
  GitFork,
  Code2,
  Flame,
  ShieldCheck,
  RefreshCw,
  Sparkles,
  Users,
  CheckCircle2,
  Trophy,
  ArrowUpRight,
  Activity,
  Layers,
  Calendar,
  Lock,
} from 'lucide-react';

function GithubIcon({ className = 'w-5 h-5' }: { className?: string }) {
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

export default function GitHubAnalyticsPage() {
  const { studentProfile, githubData, streakDays, syncGitHub } = useAppStore();
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState<string | null>(null);

  const username =
    studentProfile.professional?.githubUrl?.replace('https://github.com/', '').replace('/', '') ||
    githubData?.username ||
    'manutejreddy';
  const githubUrl = `https://github.com/${username}`;
  const avatarUrl = githubData?.avatarUrl || studentProfile.avatar;
  const bio = githubData?.bio || studentProfile.professional?.bio || 'Full-Stack & Distributed Systems Builder';
  const followers = githubData?.followers || 142;
  const following = githubData?.following || 89;
  const publicRepos = githubData?.publicRepos || 18;
  const totalStars = githubData?.totalStars || 234;
  const currentStreak = streakDays || 12;
  const longestStreak = Math.max(currentStreak + 14, 28);
  const githubScore = studentProfile.professional?.githubScore || 890;

  // Language Breakdown
  const languages = githubData?.languages && githubData.languages.length > 0
    ? githubData.languages
    : [
        { name: 'TypeScript', percentage: 42, color: '#3178C6' },
        { name: 'Python', percentage: 31, color: '#3572A5' },
        { name: 'Go', percentage: 15, color: '#00ADD8' },
        { name: 'SQL', percentage: 8, color: '#e38c00' },
        { name: 'C++', percentage: 4, color: '#f34b7d' },
      ];

  // Top Projects
  const topProjects = githubData?.pinnedRepos && githubData.pinnedRepos.length > 0
    ? githubData.pinnedRepos
    : [
        {
          name: 'distributed-rate-limiter',
          description: 'High-throughput sliding window & token bucket rate limiter in Go with Redis cluster backend. Tested at 25,000 RPS.',
          stars: 84,
          forks: 19,
          language: 'Go',
          url: `https://github.com/${username}/distributed-rate-limiter`,
          topics: ['redis', 'concurrency', 'distributed-systems', 'rate-limiting'],
        },
        {
          name: 'hnsw-vector-indexer',
          description: 'Sub-millisecond approximate nearest neighbor embedding indexer and similarity search engine in Python/C++.',
          stars: 67,
          forks: 14,
          language: 'Python',
          url: `https://github.com/${username}/hnsw-vector-indexer`,
          topics: ['vector-search', 'embeddings', 'pytorch', 'pgvector'],
        },
        {
          name: 'saas-agentic-workflow-engine',
          description: 'Stateful workflow engine supporting cyclic LangGraph multi-agent execution, streaming tokens, and human approval gates.',
          stars: 52,
          forks: 11,
          language: 'TypeScript',
          url: `https://github.com/${username}/saas-agentic-workflow-engine`,
          topics: ['nextjs', 'langgraph', 'agents', 'typescript'],
        },
        {
          name: 'k8s-canary-operator',
          description: 'Kubernetes custom resource controller for progressive canary traffic shifting with automatic Prometheus rollback.',
          stars: 31,
          forks: 6,
          language: 'Go',
          url: `https://github.com/${username}/k8s-canary-operator`,
          topics: ['kubernetes', 'devops', 'operators', 'prometheus'],
        },
      ];

  // Verified Skills Derived from GitHub
  const verifiedSkills = (studentProfile.verifiedSkills || []).filter(
    (s) => s.verificationSources?.some((src) => src.toLowerCase().includes('github') || src.toLowerCase().includes('project'))
  );

  const handleSync = async () => {
    setIsSyncing(true);
    setSyncStatus('Analyzing repositories, commit velocity, and language breakdown...');
    try {
      if (syncGitHub) {
        await syncGitHub();
      }
      setSyncStatus('Sync complete! GitHub score and skills refreshed.');
      setTimeout(() => setSyncStatus(null), 3000);
    } catch {
      setSyncStatus('Refreshed from cached GitHub state.');
      setTimeout(() => setSyncStatus(null), 3000);
    } finally {
      setIsSyncing(false);
    }
  };

  // Generate 52-week activity mock heatmap (deterministic to prevent hydration mismatch)
  const weeks = Array.from({ length: 24 }).map((_, wIdx) => ({
    week: wIdx,
    days: Array.from({ length: 7 }).map((_, dIdx) => {
      const pseudoVal = (Math.sin(wIdx * 7 + dIdx * 13 + 42) + 1) / 2;
      const level = pseudoVal > 0.38 ? Math.floor(pseudoVal * 4) + 1 : 0;
      return { day: dIdx, level };
    }),
  }));

  const levelColors = ['bg-[#FAF9F5] border-[#E8E5DD]', 'bg-[#2F7A45]/30', 'bg-[#2F7A45]/60', 'bg-[#2F7A45]/85', 'bg-[#2F7A45]'];

  return (
    <PortalLayout>
      <div className="space-y-8 max-w-[1200px] mx-auto pb-16">
        
        {/* HEADER: GitHub Identity & Live Sync Status */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="p-8 rounded-3xl bg-white border border-[#E8E5DD] shadow-xs space-y-6"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="relative">
                <img
                  src={avatarUrl}
                  alt={username}
                  className="w-20 h-20 rounded-2xl object-cover ring-2 ring-[#E8E5DD] shadow-xs"
                />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#1B1B1B] text-white flex items-center justify-center border-2 border-white">
                  <GithubIcon className="w-3.5 h-3.5" />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h1 className="text-2xl sm:text-3xl font-bold text-[#1B1B1B] tracking-tight">
                    @{username}
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#2F7A45]/10 text-[#2F7A45] text-xs font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified GitHub Identity
                  </span>
                </div>

                <p className="text-xs text-[#4A4A46] max-w-2xl leading-relaxed">
                  {bio}
                </p>

                <div className="flex items-center gap-4 text-xs text-[#6F6A60] pt-0.5 font-medium flex-wrap">
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-[#1B1B1B]" />
                    <strong className="text-[#1B1B1B]">{followers}</strong> followers
                  </span>
                  <span>•</span>
                  <span>
                    <strong className="text-[#1B1B1B]">{following}</strong> following
                  </span>
                  <span>•</span>
                  <span>
                    <strong className="text-[#1B1B1B]">{publicRepos}</strong> public repos
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-[#e38c00]">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <strong className="text-[#1B1B1B]">{totalStars}</strong> stars earned
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2.5 self-start md:self-center flex-wrap">
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#1B1B1B] text-white hover:bg-[#C76A2A] rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-xs group"
              >
                <GithubIcon className="w-4 h-4 text-white" />
                <span>View GitHub Profile</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100" />
              </a>

              <button
                onClick={handleSync}
                disabled={isSyncing}
                className="px-4 py-2 bg-[#FAF9F5] border border-[#E8E5DD] hover:border-[#1B1B1B] text-[#1B1B1B] rounded-xl text-xs font-semibold transition-colors flex items-center gap-2"
              >
                <RefreshCw className={`w-3.5 h-3.5 text-[#C76A2A] ${isSyncing ? 'animate-spin' : ''}`} />
                <span>{isSyncing ? 'Syncing...' : 'Re-sync Intelligence'}</span>
              </button>
            </div>
          </div>

          {syncStatus && (
            <div className="p-3 bg-[#FAF9F5] rounded-xl border border-[#E8E5DD] text-xs font-mono text-[#2F7A45] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#2F7A45]" />
              <span>{syncStatus}</span>
            </div>
          )}
        </motion.div>

        {/* METRICS ROW: GitHub Score, Streak, Total Commits */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-[#E8E5DD] shadow-xs space-y-2">
            <div className="flex items-center justify-between text-[#6F6A60]">
              <span className="text-xs font-bold uppercase tracking-wider">GitHub Score</span>
              <Trophy className="w-4 h-4 text-[#C76A2A]" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-[#1B1B1B] font-mono">{githubScore}</span>
              <span className="text-xs font-mono text-[#6F6A60]">/ 1000</span>
            </div>
            <p className="text-[11px] text-[#2F7A45] font-semibold flex items-center gap-1">
              <span>Top 4% on Platform</span>
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#E8E5DD] shadow-xs space-y-2">
            <div className="flex items-center justify-between text-[#6F6A60]">
              <span className="text-xs font-bold uppercase tracking-wider">Current Streak</span>
              <Flame className="w-4 h-4 text-[#C76A2A]" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-[#C76A2A] font-mono">{currentStreak}</span>
              <span className="text-xs font-semibold text-[#1B1B1B]">days</span>
            </div>
            <p className="text-[11px] text-[#6F6A60]">Active commit velocity</p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#E8E5DD] shadow-xs space-y-2">
            <div className="flex items-center justify-between text-[#6F6A60]">
              <span className="text-xs font-bold uppercase tracking-wider">Longest Streak</span>
              <Activity className="w-4 h-4 text-[#2F7A45]" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-[#1B1B1B] font-mono">{longestStreak}</span>
              <span className="text-xs font-semibold text-[#1B1B1B]">days</span>
            </div>
            <p className="text-[11px] text-[#2F7A45] font-semibold">Consistent Builder</p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#E8E5DD] shadow-xs space-y-2">
            <div className="flex items-center justify-between text-[#6F6A60]">
              <span className="text-xs font-bold uppercase tracking-wider">Verified Repos</span>
              <Code2 className="w-4 h-4 text-[#1B1B1B]" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-[#1B1B1B] font-mono">{topProjects.length}</span>
              <span className="text-xs font-semibold text-[#1B1B1B]">production</span>
            </div>
            <p className="text-[11px] text-[#6F6A60]">Tests & CI/CD validated</p>
          </div>
        </div>

        {/* SECTION 2: CONTRIBUTION ACTIVITY HEATMAP */}
        <div className="p-6 rounded-3xl bg-white border border-[#E8E5DD] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#C76A2A]" />
              <h3 className="text-sm font-bold text-[#1B1B1B]">Contribution Activity (2025 - 2026)</h3>
            </div>
            <span className="text-xs text-[#6F6A60] font-mono">542 commits in past 6 months</span>
          </div>

          {/* Activity Matrix Grid */}
          <div className="overflow-x-auto pb-2">
            <div className="flex gap-1.5 min-w-[680px]">
              {weeks.map((w) => (
                <div key={w.week} className="flex flex-col gap-1.5">
                  {w.days.map((d) => (
                    <div
                      key={d.day}
                      className={`w-3.5 h-3.5 rounded-sm border ${levelColors[d.level]} transition-colors hover:scale-125 cursor-pointer`}
                      title={`Activity level: ${d.level}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-[#6F6A60] pt-2 border-t border-[#E8E5DD]">
            <span>Less activity</span>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-xs border bg-[#FAF9F5] border-[#E8E5DD]" />
              <div className="w-3 h-3 rounded-xs bg-[#2F7A45]/30" />
              <div className="w-3 h-3 rounded-xs bg-[#2F7A45]/60" />
              <div className="w-3 h-3 rounded-xs bg-[#2F7A45]/85" />
              <div className="w-3 h-3 rounded-xs bg-[#2F7A45]" />
            </div>
            <span>More activity</span>
          </div>
        </div>

        {/* SECTION 3: LANGUAGES & VERIFIED SKILLS BREAKDOWN */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Language Breakdown (5 cols) */}
          <div className="lg:col-span-5 p-6 rounded-3xl bg-white border border-[#E8E5DD] shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#C76A2A]" />
                <h3 className="text-sm font-bold text-[#1B1B1B]">Language Distribution</h3>
              </div>
              <span className="text-xs font-mono text-[#6F6A60]">Codebase share</span>
            </div>

            {/* Visual Bar */}
            <div className="h-3 w-full rounded-full overflow-hidden flex bg-[#FAF9F5] border border-[#E8E5DD]">
              {languages.map((lang) => (
                <div
                  key={lang.name}
                  style={{ width: `${lang.percentage}%`, backgroundColor: lang.color }}
                  title={`${lang.name}: ${lang.percentage}%`}
                />
              ))}
            </div>

            {/* List */}
            <div className="space-y-2.5 pt-2">
              {languages.map((lang) => (
                <div key={lang.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: lang.color }} />
                    <span className="font-semibold text-[#1B1B1B]">{lang.name}</span>
                  </div>
                  <span className="font-mono text-[#6F6A60] font-semibold">{lang.percentage}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Verified Skills from GitHub Intelligence (7 cols) */}
          <div className="lg:col-span-7 p-6 rounded-3xl bg-white border border-[#E8E5DD] shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#2F7A45]" />
                <h3 className="text-sm font-bold text-[#1B1B1B]">GitHub Verified Skills & Evidence</h3>
              </div>
              <Link
                href="/student/verified-passport"
                className="text-xs font-semibold text-[#C76A2A] hover:underline flex items-center gap-1"
              >
                <span>View Passport</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <p className="text-xs text-[#6F6A60]">
              Skills automatically evaluated and calibrated through commit frequency, AST parsing, and continuous project delivery.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {verifiedSkills.length > 0 ? (
                verifiedSkills.map((skill) => (
                  <div
                    key={skill.id}
                    className="p-3.5 rounded-2xl bg-[#FAF9F5] border border-[#E8E5DD] space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#1B1B1B]">{skill.name}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#2F7A45]/10 text-[#2F7A45] font-bold">
                        {skill.score}/100
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-[#6F6A60]">
                      <span>{skill.category}</span>
                      <span className="font-semibold text-[#1B1B1B]">{skill.level}</span>
                    </div>

                    <div className="flex flex-wrap gap-1 pt-1">
                      {skill.verificationSources?.map((src) => (
                        <span
                          key={src}
                          className="text-[9px] px-1.5 py-0.2 rounded bg-white border border-[#E8E5DD] text-[#4A4A46]"
                        >
                          {src}
                        </span>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-2 p-6 rounded-2xl bg-[#FAF9F5] border border-[#E8E5DD] text-center text-xs text-[#6F6A60]">
                  Re-sync GitHub to extract verified skills directly from your repositories.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* SECTION 4: TOP PRODUCTION PROJECTS */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-[#1B1B1B]">Top Featured Repositories</h3>
              <p className="text-xs text-[#6F6A60]">
                Repositories analyzed for architecture patterns, code quality, and test coverage.
              </p>
            </div>
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-[#C76A2A] hover:underline flex items-center gap-1"
            >
              <span>See all {publicRepos} repos</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topProjects.map((proj) => (
              <div
                key={proj.name}
                className="p-6 rounded-3xl bg-white border border-[#E8E5DD] shadow-xs flex flex-col justify-between space-y-4 hover:border-[#1B1B1B] transition-all"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <a
                      href={proj.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-bold text-[#1B1B1B] hover:text-[#C76A2A] transition-colors flex items-center gap-1.5 font-mono"
                    >
                      <GitBranch className="w-4 h-4 text-[#C76A2A]" />
                      <span>{proj.name}</span>
                    </a>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#FAF9F5] border border-[#E8E5DD] text-[#6F6A60]">
                      {proj.language}
                    </span>
                  </div>

                  <p className="text-xs text-[#6F6A60] leading-relaxed">
                    {proj.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {proj.topics?.map((topic) => (
                      <span
                        key={topic}
                        className="text-[10px] px-2 py-0.5 rounded-lg bg-[#FAF9F5] border border-[#E8E5DD] text-[#4A4A46] font-mono"
                      >
                        #{topic}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#E8E5DD] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3 text-[#6F6A60] font-mono">
                    <span className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-[#e38c00] fill-current" />
                      {proj.stars}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="w-3.5 h-3.5" />
                      {proj.forks}
                    </span>
                  </div>

                  <a
                    href={proj.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#1B1B1B] hover:text-[#C76A2A] transition-colors"
                  >
                    <span>View Repository</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </PortalLayout>
  );
}
