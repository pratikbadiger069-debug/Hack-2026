'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { useAppStore } from '@/lib/store';
import { getLevelInfo, calculateTransparentBuilderScore } from '@/lib/xp-engine';
import { formatUserProfileLocation } from '@/lib/location-utils';
import { User, ShieldCheck, Building, Target, MapPin, Trophy, CheckCircle2, ExternalLink, Flame, Award, BookOpen, ArrowRight, Settings, RefreshCw, GitPullRequest, Star, Sparkles, LogOut, Key, Trash2, Check, AlertCircle, Unlink } from 'lucide-react';
import { UserAvatar } from '@/components/avatar/UserAvatar';
import { AvatarModal } from '@/components/avatar/AvatarModal';


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

function GoogleIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  );
}

function LinkedInIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="#0A66C2" viewBox="0 0 24 24">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c.97 0 1.76-.79 1.76-1.76s-.79-1.76-1.76-1.76-1.76.79-1.76 1.76.79 1.76 1.76 1.76M5.07 18.5h2.78v-8.37H5.07v8.37Z" />
    </svg>
  );
}

export default function StudentProfilePage() {
  const router = useRouter();
  const {
    studentProfile,
    currentUser,
    xp,
    streakDays,
    quests,
    githubData,
    connectGitHub,
    disconnectGitHub,
    syncGitHub,
    achievements,
    unlockAchievement,
    logoutUser,
    updateStudentSocials,
  } = useAppStore();

  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [isSyncingGitHub, setIsSyncingGitHub] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showLinkedInInput, setShowLinkedInInput] = useState(false);
  const [linkedInUrl, setLinkedInUrl] = useState(studentProfile.professional.linkedinUrl || '');

  const levelInfo = getLevelInfo(xp);
  const completedQuestsCount = (quests || []).filter((q) => q.completed).length;
  const totalQuestsCount = (quests || []).length || 16;

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
      syncGitHub();
      setIsSyncingGitHub(false);
    }, 800);
  };

  const handleBadgeClick = (badgeId: string, unlocked: boolean) => {
    if (!unlocked) {
      unlockAchievement(badgeId);
    }
  };

  const handleSignOut = () => {
    logoutUser();
    router.push('/login');
  };

  const handleSaveLinkedIn = (e: React.FormEvent) => {
    e.preventDefault();
    updateStudentSocials({ linkedinUrl: linkedInUrl });
    setShowLinkedInInput(false);
  };


  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) {
      setPasswordMsg('Please fill all password fields.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordMsg('Passwords do not match.');
      return;
    }
    setPasswordMsg('Password successfully updated!');
    setTimeout(() => {
      setShowPasswordModal(false);
      setPasswordMsg(null);
      setNewPassword('');
      setConfirmPassword('');
    }, 1500);
  };

  return (
    <PortalLayout>
      <div className="space-y-8 max-w-[1100px] mx-auto pb-16 font-sans text-[#1B1B1B]">
        
        {/* SECTION 1: BASIC INFORMATION & HERO IDENTITY */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="p-8 rounded-3xl bg-white border border-[#E8E5DD] shadow-xs"
        >
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div
                onClick={() => setIsAvatarModalOpen(true)}
                className="relative group cursor-pointer"
                title="Click to customize AI avatar"
              >
                <UserAvatar
                  src={studentProfile.avatar || currentUser?.avatar}
                  name={studentProfile.name || currentUser?.name || 'Aarav Sharma'}
                  size="2xl"
                  interactive
                />
                <div className="absolute inset-0 rounded-3xl bg-black/40 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center text-[10px] font-bold transition-opacity">
                  <span>Edit Avatar</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-2xl md:text-3xl font-bold text-[#1B1B1B] tracking-tight">
                    {studentProfile.name || currentUser?.name || 'Aarav Sharma'}
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#C76A2A]/10 text-[#C76A2A] text-xs font-semibold">
                    Level {levelInfo.level} {levelInfo.title}
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
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {formatUserProfileLocation(studentProfile)}</span>
                </p>

                <p className="text-xs text-[#1B1B1B] max-w-2xl leading-relaxed font-medium">
                  {studentProfile.professional.bio || 'Systems engineer focused on high-throughput backend services, distributed cache protocols, and zero-downtime containerized workloads.'}
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2 self-start flex-wrap">
              <button
                onClick={() => setIsAvatarModalOpen(true)}
                className="px-3.5 py-2 bg-[#F6F4EE] hover:bg-[#E8E5DD] text-[#1B1B1B] rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C76A2A]" />
                <span>Change Avatar</span>
              </button>
              <Link
                href="/student/settings"
                className="px-4 py-2 bg-[#1B1B1B] text-white hover:bg-[#C76A2A] rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Settings</span>
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
            className="p-5 rounded-2xl bg-white border border-[#E8E5DD] shadow-none space-y-1"
          >
            <span className="text-[11px] font-semibold text-[#6F6A60] uppercase tracking-wider block">Career Goal</span>
            <h3 className="text-base font-bold text-[#1B1B1B]">{studentProfile.targetRole}</h3>
            <span className="text-[11px] text-[#2F7A45] font-semibold">91% Readiness Match</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.1 }}
            className="p-5 rounded-2xl bg-white border border-[#E8E5DD] shadow-none space-y-1"
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
            className="p-5 rounded-2xl bg-white border border-[#E8E5DD] shadow-none space-y-1"
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
            className="p-5 rounded-2xl bg-white border border-[#E8E5DD] shadow-none space-y-1"
          >
            <span className="text-[11px] font-semibold text-[#6F6A60] uppercase tracking-wider block">Global Builder Rank</span>
            <div className="flex items-baseline gap-1.5">
              <h3 className="text-2xl font-bold font-mono text-[#1B1B1B]">#{levelInfo.rank * 14}</h3>
              <span className="text-xs text-[#6F6A60]">National</span>
            </div>
            <span className="text-[10px] text-[#6F6A60]">Top 8% nationally</span>
          </motion.div>
        </div>

        {/* SECTION 3: CONNECTED ACCOUNTS INTEGRATION */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.1 }}
          className="p-6 rounded-2xl bg-white border border-[#E8E5DD] shadow-none space-y-5"
        >
          <div>
            <h2 className="text-base font-bold text-[#1B1B1B]">Connected Accounts &amp; Social Proof</h2>
            <p className="text-xs text-[#6F6A60]">
              Link your developer and institutional identities for verified credentials and automated sync.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Google */}
            <div className="p-4 rounded-xl bg-[#F6F4EE] border border-[#E8E5DD] flex flex-col justify-between space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <GoogleIcon className="w-5 h-5" />
                  <div>
                    <h3 className="text-xs font-bold text-[#1B1B1B]">Google Account</h3>
                    <p className="text-[11px] text-[#6F6A60] truncate max-w-[160px]">
                      {currentUser?.email || studentProfile.email || 'student@skillbridge.edu'}
                    </p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-[#2F7A45]/10 text-[#2F7A45] text-[10px] font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Linked
                </span>
              </div>
              <div className="text-[11px] text-[#6F6A60]">
                Single Sign-On &amp; institutional identity verification active.
              </div>
            </div>

            {/* GitHub */}
            <div className="p-4 rounded-xl bg-[#F6F4EE] border border-[#E8E5DD] flex flex-col justify-between space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <GithubIcon className="w-5 h-5 text-[#1B1B1B]" />
                  <div>
                    <h3 className="text-xs font-bold text-[#1B1B1B]">GitHub Account</h3>
                    <p className="text-[11px] text-[#6F6A60]">
                      {githubData.connected ? `@${githubData.username}` : 'Not connected'}
                    </p>
                  </div>
                </div>
                {githubData.connected ? (
                  <span className="px-2 py-0.5 rounded-full bg-[#2F7A45]/10 text-[#2F7A45] text-[10px] font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Synced
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full bg-[#6F6A60]/10 text-[#6F6A60] text-[10px] font-semibold">
                    Disconnected
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 pt-1">
                {githubData.connected ? (
                  <>
                    <button
                      onClick={handleSyncGitHub}
                      disabled={isSyncingGitHub}
                      className="px-2.5 py-1.5 bg-white border border-[#E8E5DD] hover:border-[#1B1B1B] text-[#1B1B1B] rounded-lg text-[11px] font-semibold transition-colors flex items-center gap-1"
                    >
                      <RefreshCw className={`w-3 h-3 ${isSyncingGitHub ? 'animate-spin' : ''}`} />
                      <span>{isSyncingGitHub ? 'Syncing...' : 'Sync'}</span>
                    </button>
                    <button
                      onClick={() => disconnectGitHub()}
                      className="px-2.5 py-1.5 bg-white border border-[#E8E5DD] hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200 text-[#6F6A60] rounded-lg text-[11px] font-semibold transition-colors flex items-center gap-1"
                    >
                      <Unlink className="w-3 h-3" />
                      <span>Disconnect</span>
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => connectGitHub('aarav-builder')}
                    className="w-full py-1.5 bg-[#1B1B1B] text-white rounded-lg text-[11px] font-semibold hover:bg-[#C76A2A] transition-colors"
                  >
                    Connect GitHub
                  </button>
                )}
              </div>
            </div>

            {/* LinkedIn */}
            <div className="p-4 rounded-xl bg-[#F6F4EE] border border-[#E8E5DD] flex flex-col justify-between space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <LinkedInIcon className="w-5 h-5" />
                  <div>
                    <h3 className="text-xs font-bold text-[#1B1B1B]">LinkedIn Profile</h3>
                    <p className="text-[11px] text-[#6F6A60] truncate max-w-[160px]">
                      {studentProfile.professional.linkedinUrl || 'Not connected'}
                    </p>
                  </div>
                </div>
                {studentProfile.professional.linkedinUrl ? (
                  <span className="px-2 py-0.5 rounded-full bg-[#2F7A45]/10 text-[#2F7A45] text-[10px] font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Connected
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full bg-[#6F6A60]/10 text-[#6F6A60] text-[10px] font-semibold">
                    Optional
                  </span>
                )}
              </div>

              {showLinkedInInput ? (
                <div className="space-y-2">
                  <input
                    type="url"
                    value={linkedInUrl}
                    onChange={(e) => setLinkedInUrl(e.target.value)}
                    placeholder="https://linkedin.com/in/username"
                    className="w-full px-2.5 py-1 text-[11px] bg-white border border-[#E8E5DD] rounded-lg text-[#1B1B1B] outline-none"
                  />
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={handleSaveLinkedIn}
                      className="px-2.5 py-1 bg-[#1B1B1B] text-white rounded-md text-[10px] font-semibold hover:bg-[#C76A2A]"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setShowLinkedInInput(false)}
                      className="px-2.5 py-1 bg-white border border-[#E8E5DD] rounded-md text-[10px] font-semibold text-[#6F6A60]"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowLinkedInInput(true)}
                  className="w-full py-1.5 bg-white border border-[#E8E5DD] hover:border-[#1B1B1B] text-[#1B1B1B] rounded-lg text-[11px] font-semibold transition-colors"
                >
                  {studentProfile.professional.linkedinUrl ? 'Edit URL' : 'Connect LinkedIn'}
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* SECTION 4: BUILDER LEVEL & SCORE BREAKDOWN */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Builder Level Progress */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.1 }}
            className="lg:col-span-5 p-6 rounded-2xl bg-white border border-[#E8E5DD] shadow-none space-y-4"
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
            className="lg:col-span-7 p-6 rounded-2xl bg-white border border-[#E8E5DD] shadow-none space-y-4"
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

        {/* SECTION 5: ASSESSMENT PROGRESS & VERIFIED SKILLS */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.25 }}
          className="p-6 rounded-2xl bg-white border border-[#E8E5DD] shadow-none space-y-4"
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
          className="p-6 rounded-2xl bg-white border border-[#E8E5DD] shadow-none space-y-4"
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

        {/* SECTION 7: ACCOUNT MANAGEMENT & SECURITY */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.35 }}
          className="p-6 rounded-2xl bg-white border border-[#E8E5DD] shadow-none space-y-5"
        >
          <div>
            <h2 className="text-base font-bold text-[#1B1B1B]">Account Management &amp; Security</h2>
            <p className="text-xs text-[#6F6A60]">Manage security credentials, session tokens, and account access.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link
              href="/student/settings"
              className="p-4 rounded-xl border border-[#E8E5DD] hover:border-[#1B1B1B] bg-[#F6F4EE] transition-all flex flex-col justify-between space-y-2 text-left group"
            >
              <div className="flex items-center gap-2">
                <Settings className="w-4 h-4 text-[#6F6A60] group-hover:text-[#1B1B1B]" />
                <span className="text-xs font-bold text-[#1B1B1B]">Update Profile &amp; Bio</span>
              </div>
              <p className="text-[11px] text-[#6F6A60]">Configure target roles, academic details, and personal statement.</p>
            </Link>

            <button
              onClick={() => setShowPasswordModal(true)}
              className="p-4 rounded-xl border border-[#E8E5DD] hover:border-[#1B1B1B] bg-[#F6F4EE] transition-all flex flex-col justify-between space-y-2 text-left group"
            >
              <div className="flex items-center gap-2">
                <Key className="w-4 h-4 text-[#6F6A60] group-hover:text-[#1B1B1B]" />
                <span className="text-xs font-bold text-[#1B1B1B]">Change Password</span>
              </div>
              <p className="text-[11px] text-[#6F6A60]">Update login passphrase and refresh authenticated sessions.</p>
            </button>

            <button
              onClick={handleSignOut}
              className="p-4 rounded-xl border border-rose-200 hover:border-rose-300 bg-rose-50/50 hover:bg-rose-50 transition-all flex flex-col justify-between space-y-2 text-left group"
            >
              <div className="flex items-center gap-2">
                <LogOut className="w-4 h-4 text-rose-600" />
                <span className="text-xs font-bold text-rose-800">Sign Out Session</span>
              </div>
              <p className="text-[11px] text-rose-600">Safely log out of your current device and clear credentials.</p>
            </button>
          </div>
        </motion.div>

        {/* Change Password Modal */}
        {showPasswordModal && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
            <div className="bg-white border border-[#E8E5DD] rounded-2xl p-6 max-w-md w-full shadow-lg space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-[#1B1B1B]">Update Password</h3>
                <button
                  onClick={() => setShowPasswordModal(false)}
                  className="text-xs text-[#6F6A60] hover:text-[#1B1B1B]"
                >
                  ✕
                </button>
              </div>

              {passwordMsg && (
                <div
                  className={`p-3 rounded-xl text-xs flex items-start gap-2 ${
                    passwordMsg.includes('success')
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-rose-50 text-rose-800 border border-rose-200'
                  }`}
                >
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{passwordMsg}</span>
                </div>
              )}

              <form onSubmit={handleUpdatePassword} className="space-y-3 text-xs">
                <div>
                  <label className="font-semibold text-[#1B1B1B] block mb-1">New Password</label>
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Min. 8 characters"
                    className="w-full p-2.5 bg-[#F6F4EE] border border-[#E8E5DD] rounded-xl text-[#1B1B1B] outline-none"
                  />
                </div>
                <div>
                  <label className="font-semibold text-[#1B1B1B] block mb-1">Confirm New Password</label>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full p-2.5 bg-[#F6F4EE] border border-[#E8E5DD] rounded-xl text-[#1B1B1B] outline-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowPasswordModal(false)}
                    className="px-4 py-2 rounded-xl border border-[#E8E5DD] bg-white text-xs font-semibold text-[#6F6A60]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[#C76A2A] text-white text-xs font-semibold hover:bg-[#b05c22]"
                  >
                    Update Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Avatar Selector / Generator Modal */}
        <AvatarModal
          isOpen={isAvatarModalOpen}
          onClose={() => setIsAvatarModalOpen(false)}
        />

      </div>
    </PortalLayout>
  );
}


