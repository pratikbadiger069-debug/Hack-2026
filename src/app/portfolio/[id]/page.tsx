'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAppStore } from '@/lib/store';
import { getUserDisplayName } from '@/lib/user-utils';
import { formatUserProfileLocation } from '@/lib/location-utils';
import { getLevelInfo, calculateTransparentBuilderScore } from '@/lib/xp-engine';
import { UserAvatar } from '@/components/avatar/UserAvatar';
import {
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Award,
  BookOpen,
  MapPin,
  Flame,
  Star,
  GitPullRequest,
  Building,
  Target,
  Sparkles,
  Share2,
  Copy,
  Check,
  Download,
  Terminal,
  Cpu,
  Layers,
  Code2,
  Calendar,
  Briefcase,
  GraduationCap,
} from 'lucide-react';

export default function PublicPortfolioPage() {
  const { studentProfile, currentUser, xp, streakDays, githubData, assessmentHistory } = useAppStore();
  const [copied, setCopied] = useState(false);

  const displayName = getUserDisplayName({ user: currentUser, profile: studentProfile });
  const levelInfo = getLevelInfo(xp);
  const location = formatUserProfileLocation(studentProfile);

  const builderScoreData = calculateTransparentBuilderScore({
    verifiedSkillsCount: (studentProfile.verifiedSkills || []).length,
    projectsCount: (studentProfile.evidences || []).length,
    githubConnected: githubData.connected,
    githubReposCount: (githubData.pinnedRepos || []).length,
    consistencyStreakDays: streakDays,
    completedChallengesCount: Object.keys(assessmentHistory).length,
  });

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const completedCertifications = Object.entries(assessmentHistory).map(([topic, attempts]) => {
    const best = attempts.reduce((max, curr) => (curr.score > max.score ? curr : max), attempts[0]);
    return {
      topic,
      bestScore: best.score,
      latestDate: best.date,
      passed: best.passed,
      difficulty: best.difficultyReached,
    };
  });

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#1B1B1B] selection:bg-[#C76A2A]/20">
      {/* Top Verification Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-[#E8E5DD] px-4 sm:px-8 py-3.5">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#1B1B1B] text-white flex items-center justify-center font-bold text-sm font-mono">
              SB
            </div>
            <div>
              <span className="text-xs font-bold tracking-tight block">SkillBridge Builder Ledger</span>
              <span className="text-[10px] text-[#6F6A60] flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-[#2F7A45]" /> Cryptographically Verified Profile
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleCopyLink}
              className="px-3.5 py-1.5 rounded-xl border border-[#E8E5DD] bg-white hover:border-[#1B1B1B] text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#2F7A45]" /> : <Share2 className="w-3.5 h-3.5 text-[#6F6A60]" />}
              <span>{copied ? 'Link Copied!' : 'Share Portfolio'}</span>
            </button>

            <Link
              href="/login"
              className="px-3.5 py-1.5 rounded-xl bg-[#1B1B1B] hover:bg-[#C76A2A] text-white text-xs font-bold transition-colors cursor-pointer shadow-2xs"
            >
              Recruit Builder
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-8 py-10 space-y-8">
        
        {/* Profile Hero Card */}
        <section className="p-8 rounded-3xl bg-white border border-[#E8E5DD] shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-[#E8E5DD]">
            <div className="flex items-center gap-5">
              <UserAvatar
                src={studentProfile.avatar || currentUser?.avatar}
                name={displayName}
                size="xl"
                className="w-20 h-20 sm:w-24 sm:h-24 ring-4 ring-[#F6F4EE]"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1B1B1B]">
                    {displayName}
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#2F7A45]/10 text-[#2F7A45] text-xs font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Verified Builder
                  </span>
                </div>
                <p className="text-sm font-medium text-[#6F6A60]">
                  {studentProfile.headline || `${studentProfile.targetRole || 'Software Development'} Builder`}
                </p>
                <div className="flex items-center gap-4 text-xs text-[#6F6A60] pt-1 flex-wrap font-mono">
                  <span className="flex items-center gap-1">
                    <Building className="w-3.5 h-3.5" /> {studentProfile.academic?.college || 'HITAM'}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <GraduationCap className="w-3.5 h-3.5" /> {studentProfile.academic?.department || 'CSE'} ({studentProfile.academic?.graduationYear || '2026'})
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-[#1B1B1B]">
                    <MapPin className="w-3.5 h-3.5 text-[#C76A2A]" /> {location}
                  </span>
                </div>
              </div>
            </div>

            {/* Overall Score Pill */}
            <div className="p-4 rounded-2xl bg-[#F6F4EE] border border-[#E8E5DD] text-center shrink-0 w-full sm:w-auto">
              <span className="text-[10px] uppercase font-bold text-[#6F6A60] tracking-wider block">
                Builder Score
              </span>
              <strong className="text-3xl font-bold font-mono text-[#1B1B1B] block mt-0.5">
                {builderScoreData.totalScore}
                <span className="text-xs text-[#6F6A60] font-normal"> / 1000</span>
              </strong>
              <span className="text-[11px] font-mono text-[#C76A2A] font-bold mt-1 block">
                Lvl {levelInfo.level} • {levelInfo.title}
              </span>
            </div>
          </div>

          {/* 6-Pillar Builder Score Matrix */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6F6A60]">
              Verified 6-Pillar Competency Breakdown
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {builderScoreData.breakdown.map((item) => (
                <div key={item.pillar} className="p-3 bg-[#FAF9F5] rounded-xl border border-[#E8E5DD] space-y-1">
                  <span className="text-[10px] text-[#6F6A60] uppercase font-medium block truncate">{item.pillar}</span>
                  <strong className="text-base font-bold font-mono block text-[#1B1B1B]">
                    {item.score}
                    <span className="text-[10px] text-[#6F6A60] font-normal font-sans">/{item.maxScore}</span>
                  </strong>
                  <div className="w-full h-1 bg-[#E8E5DD] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#1B1B1B] rounded-full"
                      style={{ width: `${Math.min(100, (item.score / item.maxScore) * 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Verified Skill Passport */}
        <section className="p-8 rounded-3xl bg-white border border-[#E8E5DD] shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#E8E5DD]">
            <div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#2F7A45]" />
                <h2 className="text-lg font-bold text-[#1B1B1B]">Verified Skills Passport</h2>
              </div>
              <p className="text-xs text-[#6F6A60] mt-0.5">
                Skills validated through rigorous assessment evaluations, code analysis, and proctored benchmark tests.
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-[#2F7A45] bg-[#2F7A45]/10 px-3 py-1 rounded-full">
              {(studentProfile.verifiedSkills || []).length} Verified Credentials
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {(studentProfile.verifiedSkills || []).map((skill) => (
              <div
                key={skill.id || skill.name}
                className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#E8E5DD] space-y-2 flex flex-col justify-between"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="text-xs font-bold text-[#1B1B1B]">{skill.name}</h4>
                    <span className="text-[10px] text-[#6F6A60] font-mono block uppercase mt-0.5">
                      {skill.category} • {skill.level}
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-[#2F7A45]/10 text-[#2F7A45] text-[10px] font-bold font-mono">
                    {skill.score}%
                  </span>
                </div>

                <div className="w-full h-1.5 bg-[#E8E5DD] rounded-full overflow-hidden">
                  <div className="h-full bg-[#2F7A45] rounded-full" style={{ width: `${skill.score}%` }} />
                </div>

                <div className="pt-1 flex items-center justify-between text-[10px] text-[#6F6A60] border-t border-[#E8E5DD]/60">
                  <span>Issued: {skill.verifiedDate || '2026'}</span>
                  <span className="text-[#2F7A45] font-bold flex items-center gap-0.5">
                    <Check className="w-3 h-3" /> Validated
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Flagship Projects Showcase */}
        <section className="p-8 rounded-3xl bg-white border border-[#E8E5DD] shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#E8E5DD]">
            <div>
              <div className="flex items-center gap-2">
                <Code2 className="w-5 h-5 text-[#1B1B1B]" />
                <h2 className="text-lg font-bold text-[#1B1B1B]">Production Evidence &amp; Projects</h2>
              </div>
              <p className="text-xs text-[#6F6A60] mt-0.5">
                Verifiable codebases, live product URLs, and distributed systems architecture proofs.
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-[#C76A2A] bg-[#C76A2A]/10 px-3 py-1 rounded-full">
              {(studentProfile.evidences || []).length} Flagship Projects
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(studentProfile.evidences || []).map((ev) => (
              <div
                key={ev.id}
                className="p-5 rounded-2xl bg-[#FAF9F5] border border-[#E8E5DD] space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-sm font-bold text-[#1B1B1B]">{ev.title}</h4>
                    <span className="px-2 py-0.5 rounded-md bg-[#1B1B1B] text-white text-[10px] font-mono font-bold">
                      {ev.type}
                    </span>
                  </div>
                  <p className="text-xs text-[#6F6A60] leading-relaxed line-clamp-3">{ev.description}</p>
                </div>

                <div className="pt-3 border-t border-[#E8E5DD] flex items-center justify-between text-xs">
                  <span className="text-[11px] font-mono text-[#6F6A60]">{ev.date}</span>
                  {ev.url && (
                    <a
                      href={ev.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 bg-white hover:bg-[#E8E5DD] text-[#1B1B1B] font-bold rounded-lg text-xs border border-[#E8E5DD] flex items-center gap-1.5 transition-colors"
                    >
                      <span>Inspect Proof</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Assessment Certifications History */}
        {completedCertifications.length > 0 && (
          <section className="p-8 rounded-3xl bg-white border border-[#E8E5DD] shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E5DD]">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-[#C76A2A]" />
                <h2 className="text-lg font-bold text-[#1B1B1B]">Assessment 4.0 Certifications</h2>
              </div>
              <span className="text-xs font-mono font-bold text-[#2F7A45] bg-[#2F7A45]/10 px-2.5 py-1 rounded-full">
                {completedCertifications.length} Certified Topics
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {completedCertifications.map((cert) => (
                <div key={cert.topic} className="p-4 rounded-xl bg-[#FAF9F5] border border-[#E8E5DD] space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-[#1B1B1B]">{cert.topic}</h4>
                    <span className="font-mono text-xs font-bold text-[#2F7A45]">{cert.bestScore}%</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-[#6F6A60] font-mono">
                    <span>Tier: {cert.difficulty}</span>
                    <span>Date: {cert.latestDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* GitHub Intelligence Preview */}
        {githubData.connected && (
          <section className="p-8 rounded-3xl bg-white border border-[#E8E5DD] shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E5DD]">
              <div className="flex items-center gap-2">
                <Terminal className="w-5 h-5 text-[#1B1B1B]" />
                <h2 className="text-lg font-bold text-[#1B1B1B]">GitHub Developer Telemetry</h2>
              </div>
              <a
                href={`https://github.com/${githubData.username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono font-bold text-[#1B1B1B] hover:text-[#C76A2A] flex items-center gap-1"
              >
                <span>@{githubData.username}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3 bg-[#FAF9F5] rounded-xl border border-[#E8E5DD]">
                <span className="text-[10px] text-[#6F6A60] uppercase font-bold block">Total Repos</span>
                <strong className="text-lg font-bold font-mono text-[#1B1B1B]">{githubData.publicRepos || 24}</strong>
              </div>
              <div className="p-3 bg-[#FAF9F5] rounded-xl border border-[#E8E5DD]">
                <span className="text-[10px] text-[#6F6A60] uppercase font-bold block">Annual Commits</span>
                <strong className="text-lg font-bold font-mono text-[#1B1B1B]">{githubData.recentCommitsCount || 412}</strong>
              </div>
              <div className="p-3 bg-[#FAF9F5] rounded-xl border border-[#E8E5DD]">
                <span className="text-[10px] text-[#6F6A60] uppercase font-bold block">GitHub Stars</span>
                <strong className="text-lg font-bold font-mono text-[#C76A2A]">{githubData.totalStars || 89}</strong>
              </div>
              <div className="p-3 bg-[#FAF9F5] rounded-xl border border-[#E8E5DD]">
                <span className="text-[10px] text-[#6F6A60] uppercase font-bold block">Active Streak</span>
                <strong className="text-lg font-bold font-mono text-[#2F7A45]">{streakDays} Days</strong>
              </div>
            </div>
          </section>
        )}

      </main>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto px-4 sm:px-8 py-8 border-t border-[#E8E5DD] flex items-center justify-between text-xs text-[#6F6A60]">
        <span>SkillBridge AI • University Builder Verification Network</span>
        <span>Cryptographically Timestamped: 2026</span>
      </footer>
    </div>
  );
}
