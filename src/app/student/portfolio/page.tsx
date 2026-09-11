'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PortalLayout } from '@/components/layout/PortalLayout';
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
  Eye,
  Plus,
} from 'lucide-react';

export default function StudentPortfolioPage() {
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

  const publicPortfolioUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/portfolio/${studentProfile.id || 'builder-me'}`
    : '/portfolio/builder-me';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(publicPortfolioUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <PortalLayout>
      <div className="space-y-8 max-w-[1100px] mx-auto pb-16">
        
        {/* Header with Share Controls */}
        <div className="p-8 rounded-3xl bg-white border border-[#E8E5DD] shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-0.5 rounded-full bg-[#2F7A45]/10 text-[#2F7A45] text-xs font-bold font-mono uppercase">
                  Verified Digital Portfolio
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#C76A2A]/10 text-[#C76A2A] text-xs font-bold">
                  Public Shareable URL Active
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#1B1B1B] tracking-tight mt-1.5">
                Digital Builder Portfolio
              </h1>
              <p className="text-xs sm:text-sm text-[#6F6A60] mt-1">
                Your authenticated digital portfolio consolidating production projects, verified skills passport, GitHub activity, and Assessment 4.0 certifications.
              </p>
            </div>

            <div className="flex items-center gap-3 self-start md:self-auto shrink-0">
              <button
                onClick={handleCopyLink}
                className="px-4 py-2.5 rounded-xl border border-[#E8E5DD] bg-white hover:border-[#1B1B1B] text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#2F7A45]" /> : <Copy className="w-3.5 h-3.5 text-[#6F6A60]" />}
                <span>{copied ? 'Share Link Copied!' : 'Copy Share Link'}</span>
              </button>

              <Link
                href={`/portfolio/${studentProfile.id || 'me'}`}
                target="_blank"
                className="px-4 py-2.5 rounded-xl bg-[#1B1B1B] hover:bg-[#C76A2A] text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Open Public View</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Portfolio Live Preview Component */}
        <div className="p-8 rounded-3xl bg-white border border-[#E8E5DD] shadow-xs space-y-6">
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
                  <h2 className="text-2xl font-bold tracking-tight text-[#1B1B1B]">{displayName}</h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#2F7A45]/10 text-[#2F7A45] text-xs font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Verified Builder
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-medium text-[#6F6A60]">
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

          {/* Verified Skills Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#6F6A60]">
                Verified Skills Passport ({(studentProfile.verifiedSkills || []).length})
              </h3>
              <Link
                href="/student/assessments"
                className="text-xs font-bold text-[#C76A2A] hover:underline flex items-center gap-1"
              >
                <span>Take Benchmark Assessments</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {(studentProfile.verifiedSkills || []).map((skill) => (
                <div key={skill.id || skill.name} className="p-3.5 rounded-xl bg-[#FAF9F5] border border-[#E8E5DD] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-[#1B1B1B]">{skill.name}</span>
                    <span className="font-mono text-xs font-bold text-[#2F7A45]">{skill.score}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#E8E5DD] rounded-full overflow-hidden">
                    <div className="h-full bg-[#2F7A45] rounded-full" style={{ width: `${skill.score}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Flagship Projects */}
          <div className="space-y-4 pt-4 border-t border-[#E8E5DD]">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#6F6A60]">
                Production Evidence &amp; Capstones ({(studentProfile.evidences || []).length})
              </h3>
              <Link
                href="/student/journey"
                className="text-xs font-bold text-[#1B1B1B] hover:text-[#C76A2A] flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Project Proof</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {(studentProfile.evidences || []).map((ev) => (
                <div key={ev.id} className="p-4 rounded-xl bg-[#FAF9F5] border border-[#E8E5DD] space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-xs text-[#1B1B1B]">{ev.title}</h4>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#1B1B1B] text-white">
                      {ev.type}
                    </span>
                  </div>
                  <p className="text-xs text-[#6F6A60] line-clamp-2">{ev.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </PortalLayout>
  );
}
