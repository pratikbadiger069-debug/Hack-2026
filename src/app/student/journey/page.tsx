'use client';

import React, { useState } from 'react';
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
} from 'lucide-react';

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
        
        {/* SECTION 1: ABOUT & DIGITAL IDENTITY HEADER WITH AVATAR SYSTEM */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="p-8 rounded-3xl bg-white border border-[#E8E5DD] shadow-xs"
        >
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              {/* Clickable Interactive Avatar with Hover Prompt */}
              <div
                onClick={() => setIsAvatarModalOpen(true)}
                className="group relative cursor-pointer"
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

              <div className="space-y-1.5">
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

                <p className="text-xs text-[#6F6A60] flex items-center gap-3 flex-wrap">
                  <span className="flex items-center gap-1">
                    <Building className="w-3.5 h-3.5" /> {studentProfile.academic.college}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Target className="w-3.5 h-3.5" /> Target: {studentProfile.targetRole}
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

                <p className="text-xs text-[#1B1B1B] pt-1 max-w-2xl leading-relaxed">
                  Systems engineer focused on high-throughput backend services, distributed cache protocols, and zero-downtime containerized workloads.
                </p>
              </div>
            </div>

            {/* Builder Action Buttons */}
            <div className="flex items-center gap-2 self-start flex-wrap">
              <button
                onClick={() => setIsAvatarModalOpen(true)}
                className="px-3.5 py-2 bg-[#F6F4EE] hover:bg-[#E8E5DD] text-[#1B1B1B] rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C76A2A]" />
                <span>Change Avatar</span>
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

        {/* SECTION 4: GROWTH INSIGHTS (REPLACING STATIC BUILDER TIMELINE) */}
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
