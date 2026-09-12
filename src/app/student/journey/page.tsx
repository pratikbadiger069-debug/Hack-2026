'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { useAppStore } from '@/lib/store';
import { getLevelInfo, calculateTransparentBuilderScore } from '@/lib/xp-engine';
import { formatUserProfileLocation } from '@/lib/location-utils';
import { UserAvatar } from '@/components/avatar/UserAvatar';
import { AvatarModal } from '@/components/avatar/AvatarModal';
import { GrowthInsights } from '@/components/growth/GrowthInsights';
import { BadgeGrid } from '@/components/badges/BadgeGrid';
import { GitHubStreakCard } from '@/components/github/GitHubStreakCard';
import { EditProfileModal } from '@/components/profile/EditProfileModal';
import {
  ShieldCheck,
  ExternalLink,
  PlusCircle,
  X,
  CheckCircle2,
  Building,
  Target,
  MapPin,
  Sparkles,
  Flame,
  Award,
  GraduationCap,
  FileText,
  Globe,
  Edit3,
  Download,
  Settings,
  ArrowUpRight,
  School,
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

function LinkedinIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c-.97 0-1.75-.79-1.75-1.76s.78-1.75 1.75-1.75 1.75.78 1.75 1.75-.78 1.76-1.75 1.76m1.4 9.74v-8.37H5.06v8.37h2.8z" />
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
  } = useAppStore();

  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
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

  const readinessScore = studentProfile.careerReadinessScore || 92;
  const rawGithub = studentProfile.professional?.githubUrl || (githubData?.connected ? `https://github.com/${githubData.username}` : '');
  const githubUsername = rawGithub ? rawGithub.replace('https://github.com/', '').replace('/', '') : 'manutejreddy';
  const githubUrl = rawGithub || `https://github.com/${githubUsername}`;

  const rawLinkedin = studentProfile.professional?.linkedinUrl || '';
  const linkedinUrl = rawLinkedin || 'https://linkedin.com/in/manutejreddy';
  const linkedinUsername = rawLinkedin ? rawLinkedin.split('/in/')[1]?.replace('/', '') || 'LinkedIn' : 'manutejreddy';

  const portfolioUrl = studentProfile.professional?.portfolioUrl || 'https://manutejreddy.dev';
  const resumeUrl = studentProfile.professional?.resumeUrl || '/resumes/manutej-reddy-resume.pdf';

  const degree = studentProfile.academic?.degree || studentProfile.degree || 'B.Tech';
  const branch = studentProfile.academic?.branch || studentProfile.academic?.department || studentProfile.branch || 'Computer Science & Engineering';
  const department = studentProfile.academic?.department || studentProfile.department || 'CSE';
  const college = studentProfile.academic?.college || studentProfile.college || 'HITAM';
  const graduationYear = studentProfile.academic?.graduationYear || studentProfile.graduationYear || '2026';
  const year = studentProfile.academic?.year || '3rd Year';
  const semester = studentProfile.academic?.semester || '6th Semester';
  const studentId = studentProfile.academic?.studentId || 'HITAM-CSE-2023-042';
  const cgpa = studentProfile.academic?.cgpa || 9.14;

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

  return (
    <PortalLayout>
      <div className="space-y-8 max-w-[1200px] mx-auto pb-16">
        
        {/* SECTION 1: ABOUT & DIGITAL IDENTITY HEADER WITH AVATAR & PROFESSIONAL LINKS */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="p-8 rounded-3xl bg-white border border-[#E8E5DD] shadow-xs space-y-6"
        >
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              {/* Clickable Interactive Avatar */}
              <div
                onClick={() => setIsAvatarModalOpen(true)}
                className="group relative cursor-pointer shrink-0"
                title="Click to customize or generate AI avatar"
              >
                <UserAvatar
                  src={studentProfile.avatar}
                  name={studentProfile.name}
                  size="2xl"
                  interactive
                />
                <div className="absolute inset-0 rounded-3xl bg-black/40 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center text-[10px] font-bold transition-opacity">
                  <span>Edit Avatar</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-2xl sm:text-3xl font-bold text-[#1B1B1B] tracking-tight">
                    {studentProfile.name}
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#C76A2A]/10 text-[#C76A2A] text-xs font-semibold">
                    Level {levelInfo.level} {levelInfo.title}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#2F7A45]/10 text-[#2F7A45] text-xs font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified Builder
                  </span>
                </div>

                {/* Professional Headline */}
                <p className="text-sm font-semibold text-[#1B1B1B]">
                  {studentProfile.headline || 'Aspiring Systems & AI Builder | High-Performance Engineer'}
                </p>

                {/* Academic & Location Metadata */}
                <p className="text-xs text-[#6F6A60] flex items-center gap-3 flex-wrap">
                  <span className="flex items-center gap-1 font-medium">
                    <GraduationCap className="w-3.5 h-3.5 text-[#C76A2A]" /> {degree} in {branch} • {graduationYear}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Building className="w-3.5 h-3.5" /> {college}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" /> {formatUserProfileLocation(studentProfile)}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 font-mono text-[#C76A2A] font-semibold">
                    <Flame className="w-3.5 h-3.5" /> {streakDays}d Streak
                  </span>
                </p>

                {/* Bio */}
                <p className="text-xs text-[#4A4A46] pt-1 max-w-2xl leading-relaxed">
                  {studentProfile.professional?.bio ||
                    'Systems engineer focused on high-throughput backend services, distributed cache protocols, and zero-downtime containerized workloads.'}
                </p>
              </div>
            </div>

            {/* Builder Action Buttons */}
            <div className="flex items-center gap-2 self-start flex-wrap">
              <button
                onClick={() => setIsEditProfileOpen(true)}
                className="px-3.5 py-2 bg-[#FAF9F5] hover:bg-[#E8E5DD] border border-[#E8E5DD] text-[#1B1B1B] rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5"
              >
                <Edit3 className="w-3.5 h-3.5 text-[#C76A2A]" />
                <span>Edit Profile</span>
              </button>
              <Link
                href="/student/settings"
                className="px-3.5 py-2 bg-[#FAF9F5] hover:bg-[#E8E5DD] border border-[#E8E5DD] text-[#1B1B1B] rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5"
                title="Configure College and Academic credentials in Settings"
              >
                <Settings className="w-3.5 h-3.5 text-[#C76A2A]" />
                <span>College Settings</span>
              </Link>
              <button
                onClick={() => setIsAvatarModalOpen(true)}
                className="px-3.5 py-2 bg-[#F6F4EE] hover:bg-[#E8E5DD] text-[#1B1B1B] rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C76A2A]" />
                <span>Avatar</span>
              </button>
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

          {/* DEDICATED PROFESSIONAL LINKS & METRICS BAR (CRITICAL SPECIFICATION) */}
          <div className="pt-4 border-t border-[#E8E5DD] flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            {/* Dedicated Professional Links */}
            <div className="flex items-center gap-2.5 flex-wrap">
              {/* GitHub Button */}
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-[#1B1B1B] text-white text-xs font-semibold hover:bg-[#C76A2A] transition-all flex items-center gap-2 shadow-xs group"
              >
                <GithubIcon className="w-4 h-4 text-white" />
                <span className="font-mono">{githubUsername}</span>
                <ExternalLink className="w-3 h-3 opacity-70 group-hover:opacity-100" />
              </a>

              {/* LinkedIn Button */}
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-[#0077B5]/10 border border-[#0077B5]/30 text-[#0077B5] text-xs font-semibold hover:bg-[#0077B5]/20 transition-all flex items-center gap-2 group"
              >
                <LinkedinIcon className="w-4 h-4 text-[#0077B5]" />
                <span>{linkedinUsername}</span>
                <ExternalLink className="w-3 h-3 opacity-70 group-hover:opacity-100" />
              </a>

              {/* Portfolio Button */}
              <a
                href={portfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-[#FAF9F5] border border-[#E8E5DD] text-[#1B1B1B] text-xs font-semibold hover:border-[#1B1B1B] transition-all flex items-center gap-1.5 group"
              >
                <Globe className="w-3.5 h-3.5 text-[#C76A2A]" />
                <span>Portfolio</span>
                <ExternalLink className="w-3 h-3 opacity-70 group-hover:opacity-100" />
              </a>

              {/* Resume Button */}
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-[#2F7A45]/10 border border-[#2F7A45]/30 text-[#2F7A45] text-xs font-semibold hover:bg-[#2F7A45]/20 transition-all flex items-center gap-1.5 group"
              >
                <FileText className="w-3.5 h-3.5 text-[#2F7A45]" />
                <span>Resume</span>
                <Download className="w-3 h-3 opacity-70 group-hover:opacity-100" />
              </a>
            </div>

            {/* Core Verification Badges & Metrics */}
            <div className="flex items-center gap-3 bg-[#FAF9F5] px-4 py-2 rounded-2xl border border-[#E8E5DD] text-xs">
              <div>
                <span className="text-[9px] font-mono text-[#6F6A60] block uppercase">Builder Score</span>
                <strong className="text-sm font-extrabold text-[#1B1B1B] font-mono">{builderScoreData.totalScore}</strong>
                <span className="text-[10px] text-[#6F6A60] font-mono"> / 1000</span>
              </div>
              <div className="h-6 w-px bg-[#E8E5DD]" />
              <div>
                <span className="text-[9px] font-mono text-[#6F6A60] block uppercase">Readiness</span>
                <strong className="text-sm font-extrabold text-[#2F7A45] font-mono">{readinessScore}%</strong>
                <span className="text-[10px] text-[#2F7A45] font-semibold"> Verified</span>
              </div>
              <div className="h-6 w-px bg-[#E8E5DD]" />
              <div>
                <span className="text-[9px] font-mono text-[#6F6A60] block uppercase">Experience</span>
                <strong className="text-sm font-extrabold text-[#C76A2A] font-mono">{xp}</strong>
                <span className="text-[10px] text-[#C76A2A] font-semibold"> XP</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Edit Profile Modal Integration */}
        <EditProfileModal isOpen={isEditProfileOpen} onClose={() => setIsEditProfileOpen(false)} />

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

        {/* SECTION 4: COLLEGE & ACADEMIC CREDENTIALS (SYNCHRONIZED WITH SETTINGS) */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.12 }}
          className="p-6 rounded-2xl bg-white border border-[#E8E5DD] shadow-xs space-y-5"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E8E5DD]">
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 rounded-xl bg-[#C76A2A]/10 text-[#C76A2A]">
                <Building className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-base font-bold text-[#1B1B1B]">Academic Credentials &amp; College Verification</h2>
                  <span className="px-2 py-0.5 rounded-full bg-[#2F7A45]/10 text-[#2F7A45] text-[10px] font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    Verified Institution Node
                  </span>
                </div>
                <p className="text-xs text-[#6F6A60] mt-0.5">
                  Synchronized with <strong className="text-[#1B1B1B]">Settings &amp; Configuration</strong> • Single Source of Truth
                </p>
              </div>
            </div>

            <Link
              href="/student/settings"
              className="px-3.5 py-2 bg-[#FAF9F5] hover:bg-[#E8E5DD] border border-[#E8E5DD] text-[#1B1B1B] rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 self-start sm:self-auto"
            >
              <Settings className="w-3.5 h-3.5 text-[#C76A2A]" />
              <span>Edit in Settings ⚙️</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Institution Card */}
            <div className="p-4 rounded-xl bg-[#F6F4EE] border border-[#E8E5DD] space-y-1.5">
              <span className="text-[11px] font-bold text-[#6F6A60] uppercase tracking-wider block">Institution</span>
              <div className="flex items-center gap-1.5 text-sm font-bold text-[#1B1B1B]">
                <Building className="w-4 h-4 text-[#C76A2A] shrink-0" />
                <span className="truncate">{college}</span>
              </div>
              <p className="text-[10px] text-[#6F6A60]">{studentProfile.city || 'Hyderabad'}, {studentProfile.state || 'Telangana'}</p>
            </div>

            {/* Degree & Specialization */}
            <div className="p-4 rounded-xl bg-[#F6F4EE] border border-[#E8E5DD] space-y-1.5">
              <span className="text-[11px] font-bold text-[#6F6A60] uppercase tracking-wider block">Degree &amp; Branch</span>
              <div className="flex items-center gap-1.5 text-sm font-bold text-[#1B1B1B]">
                <GraduationCap className="w-4 h-4 text-[#C76A2A] shrink-0" />
                <span className="truncate">{degree} • {department}</span>
              </div>
              <p className="text-[10px] text-[#6F6A60] truncate">{branch}</p>
            </div>

            {/* Academic Standing & Timeline */}
            <div className="p-4 rounded-xl bg-[#F6F4EE] border border-[#E8E5DD] space-y-1.5">
              <span className="text-[11px] font-bold text-[#6F6A60] uppercase tracking-wider block">Batch &amp; Semester</span>
              <div className="flex items-center gap-1.5 text-sm font-bold text-[#1B1B1B] font-mono">
                <School className="w-4 h-4 text-[#C76A2A] shrink-0" />
                <span>Class of {graduationYear}</span>
              </div>
              <p className="text-[10px] text-[#6F6A60]">{year} • {semester}</p>
            </div>

            {/* Verified CGPA & Roll Number */}
            <div className="p-4 rounded-xl bg-[#F6F4EE] border border-[#E8E5DD] space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#6F6A60] uppercase tracking-wider">Academic CGPA</span>
                <span className="text-[10px] font-bold text-[#2F7A45] bg-[#2F7A45]/10 px-1.5 py-0.5 rounded">
                  Top 5%
                </span>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-bold font-mono text-[#1B1B1B]">{cgpa}</span>
                <span className="text-xs text-[#6F6A60] font-mono">/ 10.0</span>
              </div>
              <p className="text-[10px] text-[#6F6A60] font-mono truncate">Roll: {studentId}</p>
            </div>
          </div>
        </motion.div>

        {/* SECTION 5: GROWTH INSIGHTS (REPLACING STATIC BUILDER TIMELINE) */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.15 }}
        >
          <GrowthInsights />
        </motion.div>

        {/* SECTION 5: BADGE SYSTEM 2.0 (PRESTIGIOUS 6-TIER SYSTEM) */}
        <motion.div
          id="achievements"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.2 }}
        >
          <BadgeGrid />
        </motion.div>

        {/* SECTION 6: GITHUB STREAK SYSTEM 2.0 */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.25 }}
        >
          <GitHubStreakCard />
        </motion.div>

        {/* SECTION 7: VERIFIED SKILLS PASSPORT */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.3 }}
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

        {/* SECTION 8: VERIFIED EVIDENCE & PROJECTS */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.35 }}
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

      </div>

      {/* Avatar Selector / Generator Modal */}
      <AvatarModal
        isOpen={isAvatarModalOpen}
        onClose={() => setIsAvatarModalOpen(false)}
      />

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
                  onChange={(e: any) => setNewType(e.target.value)}
                  className="w-full p-2 bg-[#F6F4EE] border border-[#E8E5DD] rounded-xl text-[#1B1B1B]"
                >
                  <option value="GitHub Repo">GitHub Repo</option>
                  <option value="Live Product">Live Product</option>
                  <option value="Research Paper">Research Paper</option>
                  <option value="Hackathon Win">Hackathon Win</option>
                  <option value="Open Source PR">Open Source PR</option>
                </select>
              </div>
              <div>
                <label className="font-semibold text-[#1B1B1B] block mb-1">Repository / Deployment URL</label>
                <input
                  type="url"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  placeholder="https://github.com/..."
                  className="w-full p-2 bg-[#F6F4EE] border border-[#E8E5DD] rounded-xl text-[#1B1B1B]"
                />
              </div>
              <div>
                <label className="font-semibold text-[#1B1B1B] block mb-1">Description</label>
                <textarea
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Summarize the system architecture..."
                  className="w-full p-2 bg-[#F6F4EE] border border-[#E8E5DD] rounded-xl text-[#1B1B1B] h-20"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddEvidenceOpen(false)}
                  className="px-3 py-1.5 text-[#6F6A60] hover:text-[#1B1B1B]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#1B1B1B] text-white rounded-xl hover:bg-[#C76A2A] font-semibold"
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
              <h3 className="text-base font-bold text-[#1B1B1B]">Add Competency for Verification</h3>
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
                  placeholder="e.g. Distributed Consensus"
                  className="w-full p-2 bg-[#F6F4EE] border border-[#E8E5DD] rounded-xl text-[#1B1B1B]"
                />
              </div>
              <div>
                <label className="font-semibold text-[#1B1B1B] block mb-1">Category</label>
                <select
                  value={newSkillCategory}
                  onChange={(e: any) => setNewSkillCategory(e.target.value)}
                  className="w-full p-2 bg-[#F6F4EE] border border-[#E8E5DD] rounded-xl text-[#1B1B1B]"
                >
                  <option value="Programming">Programming</option>
                  <option value="Cloud">Cloud</option>
                  <option value="AI & ML">AI & ML</option>
                  <option value="DevOps">DevOps</option>
                  <option value="Database">Database</option>
                  <option value="Soft Skills">Soft Skills</option>
                </select>
              </div>
              <div>
                <label className="font-semibold text-[#1B1B1B] block mb-1">Proficiency Level</label>
                <select
                  value={newSkillLevel}
                  onChange={(e: any) => setNewSkillLevel(e.target.value)}
                  className="w-full p-2 bg-[#F6F4EE] border border-[#E8E5DD] rounded-xl text-[#1B1B1B]"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Expert">Expert</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddSkillOpen(false)}
                  className="px-3 py-1.5 text-[#6F6A60] hover:text-[#1B1B1B]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#1B1B1B] text-white rounded-xl hover:bg-[#C76A2A] font-semibold"
                >
                  Save &amp; Queue Verification
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </PortalLayout>
  );
}
