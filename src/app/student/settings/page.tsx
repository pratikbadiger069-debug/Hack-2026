'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { useAppStore } from '@/lib/store';
import { AIProvider, AcademicDetails } from '@/types';
import confetti from 'canvas-confetti';
import {
  Key,
  CheckCircle2,
  ExternalLink,
  Activity,
  AlertCircle,
  Loader2,
  Terminal,
  Clock,
  User,
  Check,
  Cpu,
  ShieldCheck,
  Sparkles,
  Lock,
  Link2,
  RefreshCw,
  Unlink,
  Bell,
  Eye,
  LogOut,
  Building,
  GraduationCap,
  School,
  BookOpen,
  MapPin,
  ArrowRight,
  Compass,
} from 'lucide-react';
import { cleanApiKey, DiagnosticResult } from '@/lib/ai-diagnostics';

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

export default function StudentSettingsPage() {
  const {
    studentProfile,
    updateStudentFullProfile,
    updateStudentAcademic,
    updateStudentSocials,
    tierRankings,
    aiKeys,
    setAIKey,
    activeProvider,
    setActiveAIProvider,
    currentUser,
    githubData,
    connectGitHub,
    disconnectGitHub,
    syncGitHub,
  } = useAppStore();

  const [activeTab, setActiveTab] = useState<'profile' | 'college' | 'security' | 'accounts' | 'ai' | 'system'>('profile');

  // Profile Form
  const [userName, setUserName] = useState(studentProfile.name || '');
  const [targetRole, setTargetRole] = useState(studentProfile.targetRole || 'AI Systems Engineer');
  const [bio, setBio] = useState(studentProfile.professional?.bio || '');

  // College & Academic Details (Single Source of Truth)
  const [college, setCollege] = useState(studentProfile.academic?.college || studentProfile.college || 'HITAM');
  const [degree, setDegree] = useState(studentProfile.academic?.degree || studentProfile.degree || 'B.Tech');
  const [branch, setBranch] = useState(studentProfile.academic?.branch || studentProfile.branch || 'Computer Science & Engineering');
  const [department, setDepartment] = useState<AcademicDetails['department']>(studentProfile.academic?.department || studentProfile.department || 'CSE');
  const [graduationYear, setGraduationYear] = useState(studentProfile.academic?.graduationYear || studentProfile.graduationYear || '2026');
  const [year, setYear] = useState(studentProfile.academic?.year || '3rd Year');
  const [semester, setSemester] = useState(studentProfile.academic?.semester || '6th Semester');
  const [studentId, setStudentId] = useState(studentProfile.academic?.studentId || 'HITAM-CSE-2023-042');
  const [cgpa, setCgpa] = useState(studentProfile.academic?.cgpa?.toString() || '9.14');
  const [city, setCity] = useState(studentProfile.academic?.city || studentProfile.city || 'Hyderabad');
  const [state, setState] = useState(studentProfile.academic?.state || studentProfile.state || 'Telangana');
  const [country, setCountry] = useState(studentProfile.academic?.country || studentProfile.country || 'India');

  // Connected Accounts
  const [linkedInUrl, setLinkedInUrl] = useState(studentProfile.professional?.linkedinUrl || '');
  const [githubUsername, setGithubUsername] = useState(githubData.username || 'manutejreddy');
  const [isSyncingGitHub, setIsSyncingGitHub] = useState(false);

  // Security Form
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [securityMsg, setSecurityMsg] = useState<string | null>(null);

  // AI Keys
  const [geminiKey, setGeminiKey] = useState(aiKeys.gemini || '');
  const [openaiKey, setOpenaiKey] = useState(aiKeys.openai || '');
  const [claudeKey, setClaudeKey] = useState(aiKeys.claude || '');
  const [groqKey, setGroqKey] = useState(aiKeys.groq || '');
  const [openrouterKey, setOpenrouterKey] = useState(aiKeys.openrouter || '');
  const [deepseekKey, setDeepseekKey] = useState(aiKeys.deepseek || '');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [savedSuccessMessage, setSavedSuccessMessage] = useState('Saved and synchronized successfully');

  const [testStates, setTestStates] = useState<
    Record<
      AIProvider,
      {
        testing: boolean;
        result: DiagnosticResult | null;
      }
    >
  >({
    gemini: { testing: false, result: null },
    openai: { testing: false, result: null },
    claude: { testing: false, result: null },
    groq: { testing: false, result: null },
    openrouter: { testing: false, result: null },
    deepseek: { testing: false, result: null },
  });

  const runProviderTest = async (provider: AIProvider, rawKey: string) => {
    const cleaned = cleanApiKey(rawKey);
    if (!cleaned || cleaned.length < 8) {
      const providerNames: Record<AIProvider, string> = {
        gemini: 'Google Gemini AI',
        openai: 'OpenAI (GPT-4o)',
        claude: 'Anthropic Claude',
        groq: 'Groq Cloud (LLaMA 3.3)',
        openrouter: 'OpenRouter AI',
        deepseek: 'DeepSeek AI',
      };
      setTestStates((prev) => ({
        ...prev,
        [provider]: {
          testing: false,
          result: {
            status: 'Invalid API Key',
            provider: providerNames[provider] || provider,
            model: provider,
            latencyMs: 0,
            error: 'Please enter a valid API key string before testing.',
          },
        },
      }));
      return;
    }

    setTestStates((prev) => ({
      ...prev,
      [provider]: { testing: true, result: null },
    }));

    try {
      const res = await fetch('/api/ai/test-key', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ provider, apiKey: cleaned }),
      });
      const data: DiagnosticResult = await res.json();
      setTestStates((prev) => ({
        ...prev,
        [provider]: { testing: false, result: data },
      }));

      if (data.status === 'Connected') {
        confetti({ particleCount: 35, spread: 50, origin: { y: 0.8 } });
      }
    } catch (err: any) {
      setTestStates((prev) => ({
        ...prev,
        [provider]: {
          testing: false,
          result: {
            status: 'Provider Unavailable',
            provider: provider,
            model: 'unknown',
            latencyMs: 0,
            error: err.message || 'Failed to connect to backend diagnostics.',
          },
        },
      }));
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateStudentFullProfile({
      name: userName,
      targetRole: targetRole,
      college,
      degree,
      branch,
      department,
      graduationYear,
      city,
      state,
      country,
      academic: {
        ...studentProfile.academic,
        college,
        degree,
        branch,
        department,
        graduationYear,
        year,
        semester,
        studentId,
        cgpa: parseFloat(cgpa) || 9.0,
        city,
        state,
        country,
      },
      professional: {
        ...studentProfile.professional,
        bio,
      },
    });
    setSavedSuccessMessage('Profile details saved & synced across My Journey');
    setSavedSuccess(true);
    confetti({ particleCount: 25, spread: 45, origin: { y: 0.7 } });
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleSaveCollegeDetails = (e: React.FormEvent) => {
    e.preventDefault();
    updateStudentFullProfile({
      college,
      degree,
      branch,
      department,
      graduationYear,
      city,
      state,
      country,
      academic: {
        ...studentProfile.academic,
        college,
        degree,
        branch,
        department,
        graduationYear,
        year,
        semester,
        studentId,
        cgpa: parseFloat(cgpa) || 9.0,
        city,
        state,
        country,
      },
    });
    setSavedSuccessMessage('College details saved & live synced with My Journey');
    setSavedSuccess(true);
    confetti({ particleCount: 35, spread: 50, origin: { y: 0.75 } });
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleSaveSecurity = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPass.length < 8) {
      setSecurityMsg('New password must be at least 8 characters.');
      return;
    }
    if (newPass !== confirmPass) {
      setSecurityMsg('Passwords do not match.');
      return;
    }
    setSecurityMsg('Password updated successfully.');
    setCurrentPass('');
    setNewPass('');
    setConfirmPass('');
    setTimeout(() => setSecurityMsg(null), 3000);
  };

  const handleSaveAccounts = (e: React.FormEvent) => {
    e.preventDefault();
    updateStudentSocials({
      linkedinUrl: linkedInUrl,
      githubUrl: `https://github.com/${githubUsername}`,
    });
    setSavedSuccessMessage('Connected accounts updated');
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleSyncGitHub = () => {
    setIsSyncingGitHub(true);
    setTimeout(() => {
      syncGitHub();
      setIsSyncingGitHub(false);
    }, 600);
  };

  const handleSaveKeys = (e: React.FormEvent) => {
    e.preventDefault();
    setAIKey('gemini', cleanApiKey(geminiKey));
    setAIKey('openai', cleanApiKey(openaiKey));
    setAIKey('claude', cleanApiKey(claudeKey));
    setAIKey('groq', cleanApiKey(groqKey));
    setAIKey('openrouter', cleanApiKey(openrouterKey));
    setAIKey('deepseek', cleanApiKey(deepseekKey));
    setSavedSuccessMessage('AI Provider API keys saved');
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <PortalLayout>
      <div className="space-y-8 max-w-[1050px] mx-auto pb-16 font-sans text-[#1B1B1B]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="pb-5 border-b border-[#E8E5DD] flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C76A2A] mb-1 block">
              Workspace Settings
            </span>
            <h1 className="text-3xl font-bold text-[#1B1B1B] tracking-tight">
              Settings &amp; Configuration
            </h1>
            <p className="text-xs text-[#6F6A60] mt-0.5">
              Manage your builder profile, college credentials, connected accounts, security parameters, and AI keys.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {savedSuccess && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#2F7A45]/15 text-[#2F7A45] text-xs font-semibold animate-fade-in">
                <Check className="w-3.5 h-3.5" />
                <span>{savedSuccessMessage}</span>
              </div>
            )}
            <Link
              href="/student/journey"
              className="px-3.5 py-2 bg-[#FAF9F5] hover:bg-[#E8E5DD] border border-[#E8E5DD] text-[#1B1B1B] rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5"
            >
              <Compass className="w-3.5 h-3.5 text-[#C76A2A]" />
              <span>View My Journey ↗</span>
            </Link>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-[#E8E5DD] pb-3 overflow-x-auto">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'profile'
                ? 'bg-[#1B1B1B] text-white shadow-none'
                : 'bg-white text-[#6F6A60] hover:text-[#1B1B1B] border border-[#E8E5DD]'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Profile &amp; Bio</span>
          </button>
          <button
            onClick={() => setActiveTab('college')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'college'
                ? 'bg-[#1B1B1B] text-white shadow-none'
                : 'bg-white text-[#6F6A60] hover:text-[#1B1B1B] border border-[#E8E5DD]'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5 text-[#C76A2A]" />
            <span>College &amp; Academic</span>
          </button>
          <button
            onClick={() => setActiveTab('accounts')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'accounts'
                ? 'bg-[#1B1B1B] text-white shadow-none'
                : 'bg-white text-[#6F6A60] hover:text-[#1B1B1B] border border-[#E8E5DD]'
            }`}
          >
            <Link2 className="w-3.5 h-3.5" />
            <span>Connected Accounts</span>
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'security'
                ? 'bg-[#1B1B1B] text-white shadow-none'
                : 'bg-white text-[#6F6A60] hover:text-[#1B1B1B] border border-[#E8E5DD]'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Security &amp; Auth</span>
          </button>
          <button
            onClick={() => setActiveTab('ai')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'ai'
                ? 'bg-[#1B1B1B] text-white shadow-none'
                : 'bg-white text-[#6F6A60] hover:text-[#1B1B1B] border border-[#E8E5DD]'
            }`}
          >
            <Key className="w-3.5 h-3.5" />
            <span>AI Copilot Engine (BYOK)</span>
          </button>
          <button
            onClick={() => setActiveTab('system')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'system'
                ? 'bg-[#1B1B1B] text-white shadow-none'
                : 'bg-white text-[#6F6A60] hover:text-[#1B1B1B] border border-[#E8E5DD]'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Verification Specs</span>
          </button>
        </div>

        {/* TAB 1: PROFILE & BIO */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-2xl bg-white border border-[#E8E5DD] shadow-none space-y-6"
            >
              <div>
                <h2 className="text-base font-bold text-[#1B1B1B]">Builder Profile Details</h2>
                <p className="text-xs text-[#6F6A60]">Used to calibrate assessments, leaderboard rank, and recruiter matches.</p>
              </div>

              <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold text-[#1B1B1B] block mb-1.5">Full Name</label>
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full p-2.5 bg-[#F6F4EE] border border-[#E8E5DD] rounded-xl text-[#1B1B1B] focus:border-[#C76A2A] outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-[#1B1B1B] block mb-1.5">Target Career Goal</label>
                    <input
                      type="text"
                      value={targetRole}
                      onChange={(e) => setTargetRole(e.target.value)}
                      className="w-full p-2.5 bg-[#F6F4EE] border border-[#E8E5DD] rounded-xl text-[#1B1B1B] focus:border-[#C76A2A] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-[#1B1B1B] block mb-1.5">Personal Statement / Bio</label>
                  <textarea
                    rows={3}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Describe your technical focus and builder mindset..."
                    className="w-full p-2.5 bg-[#F6F4EE] border border-[#E8E5DD] rounded-xl text-[#1B1B1B] focus:border-[#C76A2A] outline-none resize-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-[#E8E5DD]">
                  <button
                    type="button"
                    onClick={() => setActiveTab('college')}
                    className="text-xs font-semibold text-[#C76A2A] hover:underline flex items-center gap-1"
                  >
                    <span>Configure College Credentials &amp; Journey Sync</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#1B1B1B] text-white font-semibold rounded-xl hover:bg-[#C76A2A] transition-colors"
                  >
                    Save Profile
                  </button>
                </div>
              </form>
            </motion.div>

            {/* EMBEDDED COLLEGE DETAILS BOX IN PROFILE VIEW */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="p-6 rounded-2xl bg-white border border-[#E8E5DD] shadow-none space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E8E5DD]">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-[#C76A2A]/10 text-[#C76A2A]">
                    <Building className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#1B1B1B]">College &amp; Academic Credentials</h3>
                    <p className="text-xs text-[#6F6A60]">
                      Directly linked and synchronized with <strong className="text-[#1B1B1B]">My Journey</strong>, verified transcripts, and campus leaderboard.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-[#2F7A45]/10 text-[#2F7A45] text-[11px] font-bold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2F7A45] animate-pulse" />
                    Synced with My Journey
                  </span>
                </div>
              </div>

              <form onSubmit={handleSaveCollegeDetails} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold text-[#1B1B1B] block mb-1.5">College / Institution Name</label>
                    <input
                      type="text"
                      value={college}
                      onChange={(e) => setCollege(e.target.value)}
                      placeholder="e.g. HITAM / IIT Hyderabad"
                      className="w-full p-2.5 bg-[#F6F4EE] border border-[#E8E5DD] rounded-xl text-[#1B1B1B] focus:border-[#C76A2A] outline-none font-medium"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-[#1B1B1B] block mb-1.5">Degree Program</label>
                    <select
                      value={degree}
                      onChange={(e) => setDegree(e.target.value)}
                      className="w-full p-2.5 bg-[#F6F4EE] border border-[#E8E5DD] rounded-xl text-[#1B1B1B] focus:border-[#C76A2A] outline-none"
                    >
                      <option value="B.Tech">B.Tech (Bachelor of Technology)</option>
                      <option value="B.E.">B.E. (Bachelor of Engineering)</option>
                      <option value="B.Sc">B.Sc (Computer Science / IT)</option>
                      <option value="BCA">BCA (Bachelor of Computer Applications)</option>
                      <option value="M.Tech">M.Tech (Master of Technology)</option>
                      <option value="MCA">MCA (Master of Computer Applications)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold text-[#1B1B1B] block mb-1.5">Branch / Specialization</label>
                    <input
                      type="text"
                      value={branch}
                      onChange={(e) => setBranch(e.target.value)}
                      placeholder="e.g. Computer Science & Engineering"
                      className="w-full p-2.5 bg-[#F6F4EE] border border-[#E8E5DD] rounded-xl text-[#1B1B1B] focus:border-[#C76A2A] outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-[#1B1B1B] block mb-1.5">Department Code</label>
                    <select
                      value={department}
                      onChange={(e) => setDepartment(e.target.value as any)}
                      className="w-full p-2.5 bg-[#F6F4EE] border border-[#E8E5DD] rounded-xl text-[#1B1B1B] focus:border-[#C76A2A] outline-none"
                    >
                      <option value="CSE">Computer Science &amp; Engineering (CSE)</option>
                      <option value="IT">Information Technology (IT)</option>
                      <option value="AIML">Artificial Intelligence &amp; ML (AIML)</option>
                      <option value="ECE">Electronics &amp; Communication (ECE)</option>
                      <option value="Mechanical">Mechanical Engineering</option>
                      <option value="Civil">Civil Engineering</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <label className="font-semibold text-[#1B1B1B] block mb-1.5">Academic Year</label>
                    <select
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      className="w-full p-2.5 bg-[#F6F4EE] border border-[#E8E5DD] rounded-xl text-[#1B1B1B] focus:border-[#C76A2A] outline-none"
                    >
                      <option value="1st Year">1st Year</option>
                      <option value="2nd Year">2nd Year</option>
                      <option value="3rd Year">3rd Year</option>
                      <option value="4th Year">4th Year</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-semibold text-[#1B1B1B] block mb-1.5">Current Semester</label>
                    <select
                      value={semester}
                      onChange={(e) => setSemester(e.target.value)}
                      className="w-full p-2.5 bg-[#F6F4EE] border border-[#E8E5DD] rounded-xl text-[#1B1B1B] focus:border-[#C76A2A] outline-none"
                    >
                      <option value="1st Semester">1st Semester</option>
                      <option value="2nd Semester">2nd Semester</option>
                      <option value="3rd Semester">3rd Semester</option>
                      <option value="4th Semester">4th Semester</option>
                      <option value="5th Semester">5th Semester</option>
                      <option value="6th Semester">6th Semester</option>
                      <option value="7th Semester">7th Semester</option>
                      <option value="8th Semester">8th Semester</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-semibold text-[#1B1B1B] block mb-1.5">Graduation Batch</label>
                    <select
                      value={graduationYear}
                      onChange={(e) => setGraduationYear(e.target.value)}
                      className="w-full p-2.5 bg-[#F6F4EE] border border-[#E8E5DD] rounded-xl text-[#1B1B1B] focus:border-[#C76A2A] outline-none font-mono"
                    >
                      <option value="2024">Class of 2024</option>
                      <option value="2025">Class of 2025</option>
                      <option value="2026">Class of 2026</option>
                      <option value="2027">Class of 2027</option>
                      <option value="2028">Class of 2028</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-semibold text-[#1B1B1B] block mb-1.5">CGPA (Out of 10.0)</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max="10"
                      value={cgpa}
                      onChange={(e) => setCgpa(e.target.value)}
                      className="w-full p-2.5 bg-[#F6F4EE] border border-[#E8E5DD] rounded-xl text-[#1B1B1B] focus:border-[#C76A2A] outline-none font-mono font-bold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="font-semibold text-[#1B1B1B] block mb-1.5">Student Roll No / ID</label>
                    <input
                      type="text"
                      value={studentId}
                      onChange={(e) => setStudentId(e.target.value)}
                      placeholder="e.g. HITAM-CSE-2023-042"
                      className="w-full p-2.5 bg-[#F6F4EE] border border-[#E8E5DD] rounded-xl text-[#1B1B1B] focus:border-[#C76A2A] outline-none font-mono"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-[#1B1B1B] block mb-1.5">Campus City</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Hyderabad"
                      className="w-full p-2.5 bg-[#F6F4EE] border border-[#E8E5DD] rounded-xl text-[#1B1B1B] focus:border-[#C76A2A] outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-[#1B1B1B] block mb-1.5">State / Province</label>
                    <input
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      placeholder="e.g. Telangana"
                      className="w-full p-2.5 bg-[#F6F4EE] border border-[#E8E5DD] rounded-xl text-[#1B1B1B] focus:border-[#C76A2A] outline-none"
                    />
                  </div>
                </div>

                <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-[#E8E5DD]">
                  <div className="flex items-center gap-2 text-xs text-[#6F6A60]">
                    <Sparkles className="w-3.5 h-3.5 text-[#C76A2A]" />
                    <span>Instant reactivity across My Journey, Leaderboard &amp; Recruiter Passport</span>
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#C76A2A] text-white font-semibold rounded-xl hover:bg-[#A85820] transition-colors flex items-center justify-center gap-2 shadow-xs"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Save College Details &amp; Sync Journey</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {/* TAB 2: STANDALONE COLLEGE & ACADEMIC TAB */}
        {activeTab === 'college' && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Live Sync Banner */}
            <div className="p-5 rounded-2xl bg-[#FAF9F5] border border-[#E8E5DD] flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-[#2F7A45]/15 text-[#2F7A45] shrink-0 mt-0.5">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-[#1B1B1B]">Live Sync Active with My Journey</h3>
                    <span className="px-2 py-0.5 rounded-full bg-[#2F7A45]/10 text-[#2F7A45] text-[10px] font-bold">
                      Synchronized
                    </span>
                  </div>
                  <p className="text-xs text-[#6F6A60] mt-0.5 max-w-xl leading-relaxed">
                    College details configured here automatically update your <strong className="text-[#1B1B1B]">My Journey header</strong> ({degree} in {branch} • {graduationYear}), campus leaderboard standings (#{tierRankings?.collegeRank || 5} in {college}), and AI Copilot academic context.
                  </p>
                </div>
              </div>

              <Link
                href="/student/journey"
                className="px-4 py-2.5 bg-[#1B1B1B] text-white hover:bg-[#C76A2A] rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap self-start md:self-auto"
              >
                <span>Open My Journey</span>
                <Compass className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* College Details Form Card */}
            <div className="p-6 rounded-2xl bg-white border border-[#E8E5DD] shadow-none space-y-6">
              <div>
                <h2 className="text-base font-bold text-[#1B1B1B]">Institutional Identity &amp; Academic Records</h2>
                <p className="text-xs text-[#6F6A60]">Accredited institution details and enrollment verification fields.</p>
              </div>

              <form onSubmit={handleSaveCollegeDetails} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold text-[#1B1B1B] block mb-1.5">College / Institution Name</label>
                    <input
                      type="text"
                      value={college}
                      onChange={(e) => setCollege(e.target.value)}
                      placeholder="e.g. HITAM / IIT Hyderabad"
                      className="w-full p-2.5 bg-[#F6F4EE] border border-[#E8E5DD] rounded-xl text-[#1B1B1B] focus:border-[#C76A2A] outline-none font-medium text-sm"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-[#1B1B1B] block mb-1.5">Degree Program</label>
                    <select
                      value={degree}
                      onChange={(e) => setDegree(e.target.value)}
                      className="w-full p-2.5 bg-[#F6F4EE] border border-[#E8E5DD] rounded-xl text-[#1B1B1B] focus:border-[#C76A2A] outline-none font-medium"
                    >
                      <option value="B.Tech">B.Tech (Bachelor of Technology)</option>
                      <option value="B.E.">B.E. (Bachelor of Engineering)</option>
                      <option value="B.Sc">B.Sc (Computer Science / IT)</option>
                      <option value="BCA">BCA (Bachelor of Computer Applications)</option>
                      <option value="M.Tech">M.Tech (Master of Technology)</option>
                      <option value="MCA">MCA (Master of Computer Applications)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold text-[#1B1B1B] block mb-1.5">Branch / Specialization</label>
                    <input
                      type="text"
                      value={branch}
                      onChange={(e) => setBranch(e.target.value)}
                      placeholder="e.g. Computer Science & Engineering"
                      className="w-full p-2.5 bg-[#F6F4EE] border border-[#E8E5DD] rounded-xl text-[#1B1B1B] focus:border-[#C76A2A] outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-[#1B1B1B] block mb-1.5">Department Code</label>
                    <select
                      value={department}
                      onChange={(e) => setDepartment(e.target.value as any)}
                      className="w-full p-2.5 bg-[#F6F4EE] border border-[#E8E5DD] rounded-xl text-[#1B1B1B] focus:border-[#C76A2A] outline-none"
                    >
                      <option value="CSE">Computer Science &amp; Engineering (CSE)</option>
                      <option value="IT">Information Technology (IT)</option>
                      <option value="AIML">Artificial Intelligence &amp; ML (AIML)</option>
                      <option value="ECE">Electronics &amp; Communication (ECE)</option>
                      <option value="Mechanical">Mechanical Engineering</option>
                      <option value="Civil">Civil Engineering</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <label className="font-semibold text-[#1B1B1B] block mb-1.5">Current Academic Year</label>
                    <select
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      className="w-full p-2.5 bg-[#F6F4EE] border border-[#E8E5DD] rounded-xl text-[#1B1B1B] focus:border-[#C76A2A] outline-none"
                    >
                      <option value="1st Year">1st Year</option>
                      <option value="2nd Year">2nd Year</option>
                      <option value="3rd Year">3rd Year</option>
                      <option value="4th Year">4th Year</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-semibold text-[#1B1B1B] block mb-1.5">Current Semester</label>
                    <select
                      value={semester}
                      onChange={(e) => setSemester(e.target.value)}
                      className="w-full p-2.5 bg-[#F6F4EE] border border-[#E8E5DD] rounded-xl text-[#1B1B1B] focus:border-[#C76A2A] outline-none"
                    >
                      <option value="1st Semester">1st Semester</option>
                      <option value="2nd Semester">2nd Semester</option>
                      <option value="3rd Semester">3rd Semester</option>
                      <option value="4th Semester">4th Semester</option>
                      <option value="5th Semester">5th Semester</option>
                      <option value="6th Semester">6th Semester</option>
                      <option value="7th Semester">7th Semester</option>
                      <option value="8th Semester">8th Semester</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-semibold text-[#1B1B1B] block mb-1.5">Graduation Batch Year</label>
                    <select
                      value={graduationYear}
                      onChange={(e) => setGraduationYear(e.target.value)}
                      className="w-full p-2.5 bg-[#F6F4EE] border border-[#E8E5DD] rounded-xl text-[#1B1B1B] focus:border-[#C76A2A] outline-none font-mono"
                    >
                      <option value="2024">Class of 2024</option>
                      <option value="2025">Class of 2025</option>
                      <option value="2026">Class of 2026</option>
                      <option value="2027">Class of 2027</option>
                      <option value="2028">Class of 2028</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-semibold text-[#1B1B1B] block mb-1.5">Cumulative CGPA</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max="10"
                      value={cgpa}
                      onChange={(e) => setCgpa(e.target.value)}
                      className="w-full p-2.5 bg-[#F6F4EE] border border-[#E8E5DD] rounded-xl text-[#1B1B1B] focus:border-[#C76A2A] outline-none font-mono font-bold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="font-semibold text-[#1B1B1B] block mb-1.5">Student Roll / Registration ID</label>
                    <input
                      type="text"
                      value={studentId}
                      onChange={(e) => setStudentId(e.target.value)}
                      placeholder="e.g. HITAM-CSE-2023-042"
                      className="w-full p-2.5 bg-[#F6F4EE] border border-[#E8E5DD] rounded-xl text-[#1B1B1B] focus:border-[#C76A2A] outline-none font-mono"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-[#1B1B1B] block mb-1.5">Campus City</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Hyderabad"
                      className="w-full p-2.5 bg-[#F6F4EE] border border-[#E8E5DD] rounded-xl text-[#1B1B1B] focus:border-[#C76A2A] outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-[#1B1B1B] block mb-1.5">State / Province</label>
                    <input
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      placeholder="e.g. Telangana"
                      className="w-full p-2.5 bg-[#F6F4EE] border border-[#E8E5DD] rounded-xl text-[#1B1B1B] focus:border-[#C76A2A] outline-none"
                    />
                  </div>
                </div>

                <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-[#E8E5DD]">
                  <div className="flex items-center gap-2 text-xs text-[#6F6A60]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2F7A45]" />
                    <span>Changes take effect immediately without requiring a browser refresh</span>
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#C76A2A] text-white font-semibold rounded-xl hover:bg-[#A85820] transition-colors flex items-center justify-center gap-2 shadow-xs"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Save College Details &amp; Sync Journey</span>
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}

        {/* TAB 2: CONNECTED ACCOUNTS */}
        {activeTab === 'accounts' && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-2xl bg-white border border-[#E8E5DD] shadow-none space-y-6"
          >
            <div>
              <h2 className="text-base font-bold text-[#1B1B1B]">OAuth &amp; Social Proof Integrations</h2>
              <p className="text-xs text-[#6F6A60]">Connect external platforms to streamline login and extract verified competencies.</p>
            </div>

            <form onSubmit={handleSaveAccounts} className="space-y-4 text-xs">
              {/* Google Account */}
              <div className="p-4 rounded-xl bg-[#F6F4EE] border border-[#E8E5DD] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <GoogleIcon className="w-5 h-5" />
                  <div>
                    <strong className="text-xs text-[#1B1B1B] block">Google Account SSO</strong>
                    <span className="text-[11px] text-[#6F6A60]">
                      {currentUser?.email || studentProfile.email || 'student@skillbridge.edu'}
                    </span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-[#2F7A45]/10 text-[#2F7A45] text-xs font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Linked
                </span>
              </div>

              {/* GitHub Integration */}
              <div className="p-4 rounded-xl bg-[#F6F4EE] border border-[#E8E5DD] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <GithubIcon className="w-5 h-5 text-[#1B1B1B]" />
                    <div>
                      <strong className="text-xs text-[#1B1B1B] block">GitHub Account Integration</strong>
                      <span className="text-[11px] text-[#6F6A60]">
                        {githubData.connected ? `Connected as @${githubData.username || githubUsername}` : 'Not connected'}
                      </span>
                    </div>
                  </div>
                  {githubData.connected ? (
                    <span className="px-2.5 py-1 rounded-full bg-[#2F7A45]/10 text-[#2F7A45] text-xs font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Synced
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 rounded-full bg-[#6F6A60]/10 text-[#6F6A60] text-xs font-semibold">
                      Disconnected
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={githubUsername}
                    onChange={(e) => setGithubUsername(e.target.value)}
                    placeholder="GitHub username"
                    className="flex-1 p-2 bg-white border border-[#E8E5DD] rounded-xl text-xs text-[#1B1B1B] outline-none"
                  />
                  {githubData.connected ? (
                    <>
                      <button
                        type="button"
                        onClick={handleSyncGitHub}
                        disabled={isSyncingGitHub}
                        className="px-3 py-2 bg-white border border-[#E8E5DD] hover:border-[#1B1B1B] text-[#1B1B1B] rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${isSyncingGitHub ? 'animate-spin' : ''}`} />
                        <span>{isSyncingGitHub ? 'Syncing...' : 'Sync'}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => disconnectGitHub()}
                        className="px-3 py-2 bg-white border border-[#E8E5DD] hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200 text-[#6F6A60] rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5"
                      >
                        <Unlink className="w-3.5 h-3.5" />
                        <span>Disconnect</span>
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => connectGitHub(githubUsername)}
                      className="px-4 py-2 bg-[#1B1B1B] text-white rounded-xl text-xs font-semibold hover:bg-[#C76A2A] transition-colors"
                    >
                      Connect
                    </button>
                  )}
                </div>
              </div>

              {/* LinkedIn Integration */}
              <div className="p-4 rounded-xl bg-[#F6F4EE] border border-[#E8E5DD] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <LinkedInIcon className="w-5 h-5" />
                    <div>
                      <strong className="text-xs text-[#1B1B1B] block">LinkedIn Profile</strong>
                      <span className="text-[11px] text-[#6F6A60]">
                        Public profile URL for recruiter discovery
                      </span>
                    </div>
                  </div>
                  {studentProfile.professional.linkedinUrl ? (
                    <span className="px-2.5 py-1 rounded-full bg-[#2F7A45]/10 text-[#2F7A45] text-xs font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Linked
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 rounded-full bg-[#6F6A60]/10 text-[#6F6A60] text-xs font-semibold">
                      Optional
                    </span>
                  )}
                </div>
                <input
                  type="url"
                  value={linkedInUrl}
                  onChange={(e) => setLinkedInUrl(e.target.value)}
                  placeholder="https://linkedin.com/in/username"
                  className="w-full p-2 bg-white border border-[#E8E5DD] rounded-xl text-xs text-[#1B1B1B] outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#1B1B1B] text-white font-semibold rounded-xl hover:bg-[#C76A2A] transition-colors"
                >
                  Save Accounts
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* TAB 3: SECURITY */}
        {activeTab === 'security' && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-2xl bg-white border border-[#E8E5DD] shadow-none space-y-6"
          >
            <div>
              <h2 className="text-base font-bold text-[#1B1B1B]">Authentication &amp; Security Credentials</h2>
              <p className="text-xs text-[#6F6A60]">Update password, manage session tokens, and enable two-factor protection.</p>
            </div>

            {securityMsg && (
              <div
                className={`p-3.5 rounded-xl text-xs flex items-start gap-2 ${
                  securityMsg.includes('success')
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-rose-50 text-rose-800 border border-rose-200'
                }`}
              >
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{securityMsg}</span>
              </div>
            )}

            <form onSubmit={handleSaveSecurity} className="space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-[#F6F4EE] border border-[#E8E5DD] space-y-3">
                <h3 className="font-bold text-xs text-[#1B1B1B]">Change Password</h3>
                <div>
                  <label className="font-semibold text-[#1B1B1B] block mb-1">Current Password</label>
                  <input
                    type="password"
                    value={currentPass}
                    onChange={(e) => setCurrentPass(e.target.value)}
                    placeholder="••••••••"
                    className="w-full p-2.5 bg-white border border-[#E8E5DD] rounded-xl text-[#1B1B1B] outline-none"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-[#1B1B1B] block mb-1">New Password</label>
                    <input
                      type="password"
                      value={newPass}
                      onChange={(e) => setNewPass(e.target.value)}
                      placeholder="Min. 8 characters"
                      className="w-full p-2.5 bg-white border border-[#E8E5DD] rounded-xl text-[#1B1B1B] outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-[#1B1B1B] block mb-1">Confirm New Password</label>
                    <input
                      type="password"
                      value={confirmPass}
                      onChange={(e) => setConfirmPass(e.target.value)}
                      placeholder="••••••••"
                      className="w-full p-2.5 bg-white border border-[#E8E5DD] rounded-xl text-[#1B1B1B] outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* 2FA Toggle */}
              <div className="p-4 rounded-xl bg-[#F6F4EE] border border-[#E8E5DD] flex items-center justify-between">
                <div>
                  <strong className="text-xs text-[#1B1B1B] block">Two-Factor Authentication (2FA)</strong>
                  <span className="text-[11px] text-[#6F6A60]">
                    Protect your builder credentials with time-based one-time passcodes (TOTP).
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                    twoFactorEnabled
                      ? 'bg-emerald-600 text-white'
                      : 'bg-white border border-[#E8E5DD] text-[#6F6A60] hover:text-[#1B1B1B]'
                  }`}
                >
                  {twoFactorEnabled ? 'Enabled' : 'Disabled'}
                </button>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#1B1B1B] text-white font-semibold rounded-xl hover:bg-[#C76A2A] transition-colors"
                >
                  Update Credentials
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* TAB 4: AI BYOK */}
        {activeTab === 'ai' && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-2xl bg-white border border-[#E8E5DD] shadow-none space-y-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-base font-bold text-[#1B1B1B]">Bring Your Own Key (BYOK) & AI Providers</h2>
                <p className="text-xs text-[#6F6A60]">Connect your own LLM API keys for ultra-fast, uncapped Personal AI Copilot mentoring.</p>
              </div>
              <span className="text-[11px] font-mono text-[#C76A2A] bg-[#C76A2A]/10 px-2.5 py-1 rounded-full font-semibold self-start sm:self-auto capitalize">
                Active Provider: {activeProvider}
              </span>
            </div>

            <form onSubmit={handleSaveKeys} className="space-y-4 text-xs">
              {/* 1. Google Gemini */}
              <div className="p-4 rounded-xl bg-[#F6F4EE] border border-[#E8E5DD] space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      id="gemini-radio"
                      name="activeProvider"
                      checked={activeProvider === 'gemini'}
                      onChange={() => setActiveAIProvider('gemini')}
                      className="accent-[#C76A2A]"
                    />
                    <label htmlFor="gemini-radio" className="font-bold text-sm text-[#1B1B1B]">
                      Google Gemini (Recommended • Fast & Multimodal)
                    </label>
                  </div>
                  <button
                    type="button"
                    onClick={() => runProviderTest('gemini', geminiKey)}
                    disabled={testStates.gemini.testing}
                    className="px-3 py-1 bg-white border border-[#E8E5DD] rounded-lg text-xs font-semibold text-[#1B1B1B] hover:border-[#C76A2A]"
                  >
                    {testStates.gemini.testing ? 'Testing...' : 'Test Connection'}
                  </button>
                </div>
                <input
                  type="password"
                  value={geminiKey}
                  onChange={(e) => setGeminiKey(e.target.value)}
                  placeholder="AIzaSy... (Gemini 1.5 Flash / 2.0 Flash)"
                  className="w-full p-2.5 bg-white border border-[#E8E5DD] rounded-xl text-[#1B1B1B] font-mono text-xs"
                />
                {testStates.gemini.result && (
                  <div className="text-[11px] p-2 bg-white rounded-lg border border-[#E8E5DD] flex items-center justify-between">
                    <span className={testStates.gemini.result.status === 'Connected' ? 'text-[#2F7A45] font-semibold' : 'text-red-600 font-semibold'}>
                      Status: {testStates.gemini.result.status}
                    </span>
                    <span className="text-[#6F6A60]">{testStates.gemini.result.latencyMs}ms latency</span>
                  </div>
                )}
              </div>

              {/* 2. OpenAI */}
              <div className="p-4 rounded-xl bg-[#F6F4EE] border border-[#E8E5DD] space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      id="openai-radio"
                      name="activeProvider"
                      checked={activeProvider === 'openai'}
                      onChange={() => setActiveAIProvider('openai')}
                      className="accent-[#C76A2A]"
                    />
                    <label htmlFor="openai-radio" className="font-bold text-sm text-[#1B1B1B]">
                      OpenAI (GPT-4o & GPT-4o-mini)
                    </label>
                  </div>
                  <button
                    type="button"
                    onClick={() => runProviderTest('openai', openaiKey)}
                    disabled={testStates.openai.testing}
                    className="px-3 py-1 bg-white border border-[#E8E5DD] rounded-lg text-xs font-semibold text-[#1B1B1B] hover:border-[#C76A2A]"
                  >
                    {testStates.openai.testing ? 'Testing...' : 'Test Connection'}
                  </button>
                </div>
                <input
                  type="password"
                  value={openaiKey}
                  onChange={(e) => setOpenaiKey(e.target.value)}
                  placeholder="sk-proj-... (GPT-4o / GPT-4o-mini)"
                  className="w-full p-2.5 bg-white border border-[#E8E5DD] rounded-xl text-[#1B1B1B] font-mono text-xs"
                />
                {testStates.openai.result && (
                  <div className="text-[11px] p-2 bg-white rounded-lg border border-[#E8E5DD] flex items-center justify-between">
                    <span className={testStates.openai.result.status === 'Connected' ? 'text-[#2F7A45] font-semibold' : 'text-red-600 font-semibold'}>
                      Status: {testStates.openai.result.status}
                    </span>
                    <span className="text-[#6F6A60]">{testStates.openai.result.latencyMs}ms latency</span>
                  </div>
                )}
              </div>

              {/* 3. Anthropic Claude */}
              <div className="p-4 rounded-xl bg-[#F6F4EE] border border-[#E8E5DD] space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      id="claude-radio"
                      name="activeProvider"
                      checked={activeProvider === 'claude'}
                      onChange={() => setActiveAIProvider('claude')}
                      className="accent-[#C76A2A]"
                    />
                    <label htmlFor="claude-radio" className="font-bold text-sm text-[#1B1B1B]">
                      Anthropic Claude (Claude 3.5 Sonnet)
                    </label>
                  </div>
                  <button
                    type="button"
                    onClick={() => runProviderTest('claude', claudeKey)}
                    disabled={testStates.claude.testing}
                    className="px-3 py-1 bg-white border border-[#E8E5DD] rounded-lg text-xs font-semibold text-[#1B1B1B] hover:border-[#C76A2A]"
                  >
                    {testStates.claude.testing ? 'Testing...' : 'Test Connection'}
                  </button>
                </div>
                <input
                  type="password"
                  value={claudeKey}
                  onChange={(e) => setClaudeKey(e.target.value)}
                  placeholder="sk-ant-... (Claude 3.5 Sonnet)"
                  className="w-full p-2.5 bg-white border border-[#E8E5DD] rounded-xl text-[#1B1B1B] font-mono text-xs"
                />
                {testStates.claude.result && (
                  <div className="text-[11px] p-2 bg-white rounded-lg border border-[#E8E5DD] flex items-center justify-between">
                    <span className={testStates.claude.result.status === 'Connected' ? 'text-[#2F7A45] font-semibold' : 'text-red-600 font-semibold'}>
                      Status: {testStates.claude.result.status}
                    </span>
                    <span className="text-[#6F6A60]">{testStates.claude.result.latencyMs}ms latency</span>
                  </div>
                )}
              </div>

              {/* 4. Groq Cloud */}
              <div className="p-4 rounded-xl bg-[#F6F4EE] border border-[#E8E5DD] space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      id="groq-radio"
                      name="activeProvider"
                      checked={activeProvider === 'groq'}
                      onChange={() => setActiveAIProvider('groq')}
                      className="accent-[#C76A2A]"
                    />
                    <label htmlFor="groq-radio" className="font-bold text-sm text-[#1B1B1B]">
                      Groq Cloud (LLaMA 3.3 70B • Ultra-Fast LPU)
                    </label>
                  </div>
                  <button
                    type="button"
                    onClick={() => runProviderTest('groq', groqKey)}
                    disabled={testStates.groq.testing}
                    className="px-3 py-1 bg-white border border-[#E8E5DD] rounded-lg text-xs font-semibold text-[#1B1B1B] hover:border-[#C76A2A]"
                  >
                    {testStates.groq.testing ? 'Testing...' : 'Test Connection'}
                  </button>
                </div>
                <input
                  type="password"
                  value={groqKey}
                  onChange={(e) => setGroqKey(e.target.value)}
                  placeholder="gsk_... (LLaMA 3.3 70B Versatile)"
                  className="w-full p-2.5 bg-white border border-[#E8E5DD] rounded-xl text-[#1B1B1B] font-mono text-xs"
                />
                {testStates.groq.result && (
                  <div className="text-[11px] p-2 bg-white rounded-lg border border-[#E8E5DD] flex items-center justify-between">
                    <span className={testStates.groq.result.status === 'Connected' ? 'text-[#2F7A45] font-semibold' : 'text-red-600 font-semibold'}>
                      Status: {testStates.groq.result.status}
                    </span>
                    <span className="text-[#6F6A60]">{testStates.groq.result.latencyMs}ms latency</span>
                  </div>
                )}
              </div>

              {/* 5. OpenRouter AI */}
              <div className="p-4 rounded-xl bg-[#F6F4EE] border border-[#E8E5DD] space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      id="openrouter-radio"
                      name="activeProvider"
                      checked={activeProvider === 'openrouter'}
                      onChange={() => setActiveAIProvider('openrouter')}
                      className="accent-[#C76A2A]"
                    />
                    <label htmlFor="openrouter-radio" className="font-bold text-sm text-[#1B1B1B]">
                      OpenRouter AI (Unified Multi-Model Gateway)
                    </label>
                  </div>
                  <button
                    type="button"
                    onClick={() => runProviderTest('openrouter', openrouterKey)}
                    disabled={testStates.openrouter.testing}
                    className="px-3 py-1 bg-white border border-[#E8E5DD] rounded-lg text-xs font-semibold text-[#1B1B1B] hover:border-[#C76A2A]"
                  >
                    {testStates.openrouter.testing ? 'Testing...' : 'Test Connection'}
                  </button>
                </div>
                <input
                  type="password"
                  value={openrouterKey}
                  onChange={(e) => setOpenrouterKey(e.target.value)}
                  placeholder="sk-or-v1-... (DeepSeek / Claude / LLaMA)"
                  className="w-full p-2.5 bg-white border border-[#E8E5DD] rounded-xl text-[#1B1B1B] font-mono text-xs"
                />
                {testStates.openrouter.result && (
                  <div className="text-[11px] p-2 bg-white rounded-lg border border-[#E8E5DD] flex items-center justify-between">
                    <span className={testStates.openrouter.result.status === 'Connected' ? 'text-[#2F7A45] font-semibold' : 'text-red-600 font-semibold'}>
                      Status: {testStates.openrouter.result.status}
                    </span>
                    <span className="text-[#6F6A60]">{testStates.openrouter.result.latencyMs}ms latency</span>
                  </div>
                )}
              </div>

              {/* 6. DeepSeek AI */}
              <div className="p-4 rounded-xl bg-[#F6F4EE] border border-[#E8E5DD] space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      id="deepseek-radio"
                      name="activeProvider"
                      checked={activeProvider === 'deepseek'}
                      onChange={() => setActiveAIProvider('deepseek')}
                      className="accent-[#C76A2A]"
                    />
                    <label htmlFor="deepseek-radio" className="font-bold text-sm text-[#1B1B1B]">
                      DeepSeek AI (DeepSeek-V3 & DeepSeek-R1)
                    </label>
                  </div>
                  <button
                    type="button"
                    onClick={() => runProviderTest('deepseek', deepseekKey)}
                    disabled={testStates.deepseek.testing}
                    className="px-3 py-1 bg-white border border-[#E8E5DD] rounded-lg text-xs font-semibold text-[#1B1B1B] hover:border-[#C76A2A]"
                  >
                    {testStates.deepseek.testing ? 'Testing...' : 'Test Connection'}
                  </button>
                </div>
                <input
                  type="password"
                  value={deepseekKey}
                  onChange={(e) => setDeepseekKey(e.target.value)}
                  placeholder="sk-... (DeepSeek Chat & Reasoner)"
                  className="w-full p-2.5 bg-white border border-[#E8E5DD] rounded-xl text-[#1B1B1B] font-mono text-xs"
                />
                {testStates.deepseek.result && (
                  <div className="text-[11px] p-2 bg-white rounded-lg border border-[#E8E5DD] flex items-center justify-between">
                    <span className={testStates.deepseek.result.status === 'Connected' ? 'text-[#2F7A45] font-semibold' : 'text-red-600 font-semibold'}>
                      Status: {testStates.deepseek.result.status}
                    </span>
                    <span className="text-[#6F6A60]">{testStates.deepseek.result.latencyMs}ms latency</span>
                  </div>
                )}
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#1B1B1B] text-white font-semibold rounded-xl hover:bg-[#C76A2A] transition-colors shadow-xs"
                >
                  Save All AI Provider Keys
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* TAB 5: SYSTEM */}
        {activeTab === 'system' && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-2xl bg-white border border-[#E8E5DD] shadow-none space-y-5"
          >
            <div>
              <h2 className="text-base font-bold text-[#1B1B1B]">Builder Operating System Specifications</h2>
              <p className="text-xs text-[#6F6A60]">Audit rules governing verified skills, anti-cheat detection, and deterministic score formulas.</p>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-xl bg-[#F6F4EE] border border-[#E8E5DD] space-y-1">
                <strong className="text-[#1B1B1B] block">Formula: Transparent Builder Score (30/30/20/10/10)</strong>
                <p className="text-[#6F6A60]">
                  Builder Score = (30% Verified Assessments) + (30% Verified Projects) + (20% GitHub Proof of Work) + (10% Daily Consistency) + (10% Challenge Milestones).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#F6F4EE] border border-[#E8E5DD] space-y-1">
                <strong className="text-[#1B1B1B] block">Anti-Cheat Active Engine</strong>
                <p className="text-[#6F6A60]">
                  Detects abnormally fast answers (&lt;2.0s per question), repeated guessing patterns, and tab switching. Flagged attempts forfeit all XP rewards and trigger confidence score reductions.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#F6F4EE] border border-[#E8E5DD] space-y-1">
                <strong className="text-[#1B1B1B] block">Single Unified Theme Identity</strong>
                <p className="text-[#6F6A60]">
                  SkillBridge uses a curated single palette (#F6F4EE Canvas, #1B1B1B Text, #C76A2A Terracotta Accent). Theme switching and dark mode have been permanently retired to establish a distinct, recognizable builder identity.
                </p>
              </div>
            </div>
          </motion.div>
        )}

      </div>
    </PortalLayout>
  );
}
