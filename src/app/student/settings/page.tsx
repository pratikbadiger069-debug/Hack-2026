'use client';

import React, { useState } from 'react';
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
} from 'lucide-react';
import { cleanApiKey, DiagnosticResult } from '@/lib/ai-diagnostics';

export default function StudentSettingsPage() {
  const {
    studentProfile,
    updateStudentFullProfile,
    aiKeys,
    setAIKey,
    activeProvider,
    setActiveAIProvider,
  } = useAppStore();

  const [activeTab, setActiveTab] = useState<'profile' | 'ai' | 'system'>('profile');

  const [userName, setUserName] = useState(studentProfile.name || '');
  const [department, setDepartment] = useState<AcademicDetails['department']>(studentProfile.academic.department || 'CSE');
  const [cgpa, setCgpa] = useState(studentProfile.academic.cgpa?.toString() || '9.14');
  const [targetRole, setTargetRole] = useState(studentProfile.targetRole || 'Backend Engineer');

  const [geminiKey, setGeminiKey] = useState(aiKeys.gemini || '');
  const [openaiKey, setOpenaiKey] = useState(aiKeys.openai || '');
  const [claudeKey, setClaudeKey] = useState(aiKeys.claude || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

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
  });

  const runProviderTest = async (provider: AIProvider, rawKey: string) => {
    const cleaned = cleanApiKey(rawKey);
    if (!cleaned || cleaned.length < 8) {
      setTestStates((prev) => ({
        ...prev,
        [provider]: {
          testing: false,
          result: {
            status: 'Invalid API Key',
            provider: provider === 'gemini' ? 'Google Gemini AI' : provider === 'openai' ? 'OpenAI' : 'Anthropic Claude',
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
      academic: {
        ...studentProfile.academic,
        department,
        cgpa: parseFloat(cgpa) || 9.0,
      },
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleSaveKeys = (e: React.FormEvent) => {
    e.preventDefault();
    setAIKey('gemini', cleanApiKey(geminiKey));
    setAIKey('openai', cleanApiKey(openaiKey));
    setAIKey('claude', cleanApiKey(claudeKey));
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <PortalLayout>
      <div className="space-y-8 max-w-[1000px] mx-auto pb-16">
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
              Manage your builder identity, AI copilot keys, and verification parameters.
            </p>
          </div>

          {savedSuccess && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#2F7A45]/15 text-[#2F7A45] text-xs font-semibold">
              <Check className="w-3.5 h-3.5" />
              <span>Saved successfully</span>
            </div>
          )}
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-[#E8E5DD] pb-3">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'profile'
                ? 'bg-[#1B1B1B] text-white shadow-xs'
                : 'bg-white text-[#6F6A60] hover:text-[#1B1B1B] border border-[#E8E5DD]'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Profile &amp; Academics</span>
          </button>
          <button
            onClick={() => setActiveTab('ai')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'ai'
                ? 'bg-[#1B1B1B] text-white shadow-xs'
                : 'bg-white text-[#6F6A60] hover:text-[#1B1B1B] border border-[#E8E5DD]'
            }`}
          >
            <Key className="w-3.5 h-3.5" />
            <span>AI Copilot Engine (BYOK)</span>
          </button>
          <button
            onClick={() => setActiveTab('system')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'system'
                ? 'bg-[#1B1B1B] text-white shadow-xs'
                : 'bg-white text-[#6F6A60] hover:text-[#1B1B1B] border border-[#E8E5DD]'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Builder Verification Engine</span>
          </button>
        </div>

        {/* TAB 1: PROFILE */}
        {activeTab === 'profile' && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-2xl bg-white border border-[#E8E5DD] shadow-xs space-y-6"
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-[#1B1B1B] block mb-1.5">Department</label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value as any)}
                    className="w-full p-2.5 bg-[#F6F4EE] border border-[#E8E5DD] rounded-xl text-[#1B1B1B] focus:border-[#C76A2A] outline-none"
                  >
                    <option value="CSE">Computer Science &amp; Engineering (CSE)</option>
                    <option value="IT">Information Technology (IT)</option>
                    <option value="AI_ML">Artificial Intelligence &amp; ML</option>
                    <option value="ECE">Electronics &amp; Communication (ECE)</option>
                    <option value="MECH">Mechanical Engineering</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-[#1B1B1B] block mb-1.5">CGPA</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="10"
                    value={cgpa}
                    onChange={(e) => setCgpa(e.target.value)}
                    className="w-full p-2.5 bg-[#F6F4EE] border border-[#E8E5DD] rounded-xl text-[#1B1B1B] focus:border-[#C76A2A] outline-none"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#1B1B1B] text-white font-semibold rounded-xl hover:bg-[#C76A2A] transition-colors"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* TAB 2: AI BYOK */}
        {activeTab === 'ai' && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-2xl bg-white border border-[#E8E5DD] shadow-xs space-y-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-base font-bold text-[#1B1B1B]">Bring Your Own Key (BYOK)</h2>
                <p className="text-xs text-[#6F6A60]">Connect your own LLM API key for ultra-fast, uncapped Career Copilot mentoring.</p>
              </div>
              <span className="text-[11px] font-mono text-[#C76A2A] bg-[#C76A2A]/10 px-2.5 py-1 rounded-full font-semibold self-start sm:self-auto">
                Active Provider: {activeProvider}
              </span>
            </div>

            <form onSubmit={handleSaveKeys} className="space-y-5 text-xs">
              {/* Google Gemini */}
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
                      Google Gemini (Recommended)
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
                  placeholder="AIzaSy..."
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

              {/* Anthropic Claude */}
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
                      Anthropic Claude
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
                  placeholder="sk-ant-..."
                  className="w-full p-2.5 bg-white border border-[#E8E5DD] rounded-xl text-[#1B1B1B] font-mono text-xs"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#1B1B1B] text-white font-semibold rounded-xl hover:bg-[#C76A2A] transition-colors"
                >
                  Save API Keys
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* TAB 3: SYSTEM */}
        {activeTab === 'system' && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-2xl bg-white border border-[#E8E5DD] shadow-xs space-y-5"
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
