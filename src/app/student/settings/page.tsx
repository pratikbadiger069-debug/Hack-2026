'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { useAppStore } from '@/lib/store';
import { AIProvider, AcademicDetails } from '@/types';
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
} from 'lucide-react';
import { cleanApiKey, DiagnosticResult } from '@/lib/ai-diagnostics';

export default function StudentSettingsPage() {
  const { studentProfile, updateStudentFullProfile, aiKeys, setAIKey, activeProvider, setActiveAIProvider } = useAppStore();
  const [userName, setUserName] = useState(studentProfile.name || '');
  const [department, setDepartment] = useState<AcademicDetails['department']>(studentProfile.academic.department || 'CSE');
  const [cgpa, setCgpa] = useState(studentProfile.academic.cgpa?.toString() || '9.14');
  const [targetRole, setTargetRole] = useState(studentProfile.targetRole || 'AI Engineer');

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
      const res = await fetch('/api/ai/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          provider,
          apiKey: cleaned,
          testPrompt: 'SkillBridge live ping. Output "OK".',
        }),
      });

      const data = await res.json();
      setTestStates((prev) => ({
        ...prev,
        [provider]: {
          testing: false,
          result: data,
        },
      }));
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
            error: err.message || 'Network unreachable or server offline.',
          },
        },
      }));
    }
  };

  const handleSaveAll = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanGemini = cleanApiKey(geminiKey);
    const cleanOpenAI = cleanApiKey(openaiKey);
    const cleanClaude = cleanApiKey(claudeKey);

    setAIKey('gemini', cleanGemini);
    setAIKey('openai', cleanOpenAI);
    setAIKey('claude', cleanClaude);

    updateStudentFullProfile({
      name: userName,
      targetRole,
      academic: {
        department,
        cgpa: parseFloat(cgpa) || 9.14,
      },
    });

    try {
      await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          geminiKey: cleanGemini,
          openaiKey: cleanOpenAI,
          anthropicKey: cleanClaude,
        }),
      });
    } catch {
      // offline fallback
    }

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const renderStatusBox = (result: DiagnosticResult | null) => {
    if (!result) return null;

    const isSuccess = result.status === 'Connected';

    return (
      <div
        className={`p-3.5 rounded-xl border text-xs space-y-1.5 ${
          isSuccess
            ? 'bg-[#16A34A]/5 border-[#16A34A]/20 text-[#1F1F1F]'
            : 'bg-red-50/50 border-red-200 text-[#1F1F1F]'
        }`}
      >
        <div className="flex items-center justify-between font-medium">
          <div className="flex items-center gap-1.5">
            {isSuccess ? (
              <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            )}
            <span className={isSuccess ? 'text-[#16A34A]' : 'text-red-700'}>
              Status: {result.status}
            </span>
          </div>
          {result.latencyMs !== undefined && result.latencyMs > 0 && (
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white border border-[#ECEAE4] text-[#6B6B6B] flex items-center gap-1">
              <Clock className="w-2.5 h-2.5" />
              {result.latencyMs}ms
            </span>
          )}
        </div>

        <p className="text-xs text-[#6B6B6B] leading-relaxed">
          {isSuccess ? result.message || 'Connection established successfully.' : result.error}
        </p>

        {result.echoResponse && (
          <div className="mt-1.5 p-2 bg-white rounded-lg border border-[#ECEAE4] text-[11px] font-mono flex items-center gap-2 text-[#1F1F1F]">
            <Terminal className="w-3.5 h-3.5 text-[#16A34A] shrink-0" />
            <span className="text-[#6B6B6B]">Echo:</span>
            <span className="truncate">&quot;{result.echoResponse}&quot;</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <PortalLayout>
      <div className="space-y-8 max-w-[1000px] mx-auto pb-16">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-4 border-b border-[#ECEAE4]">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#D97706]" />
              <h1 className="text-2xl font-serif font-normal text-[#1F1F1F] tracking-tight">
                Settings
              </h1>
            </div>
            <p className="text-sm text-[#6B6B6B] mt-0.5 font-sans">
              Manage your personal identity, academic records, and private AI inference keys.
            </p>
          </div>

          {savedSuccess && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#16A34A]/10 text-[#16A34A] text-xs font-medium"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Settings saved</span>
            </motion.div>
          )}
        </div>

        <form onSubmit={handleSaveAll} className="space-y-6">
          {/* Section 1: Profile & Identity */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#ECEAE4] shadow-xs space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-[#ECEAE4]">
              <User className="w-4 h-4 text-[#D97706]" />
              <h2 className="text-base font-serif text-[#1F1F1F]">Personal Profile &amp; Goal</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#6B6B6B] mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-[#FAF9F5] border border-[#ECEAE4] rounded-xl focus:outline-none focus:bg-white focus:border-[#D97706] text-[#1F1F1F]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#6B6B6B] mb-1.5">
                  Target Career Role
                </label>
                <input
                  type="text"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-[#FAF9F5] border border-[#ECEAE4] rounded-xl focus:outline-none focus:bg-white focus:border-[#D97706] text-[#1F1F1F]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#6B6B6B] mb-1.5">
                  Department
                </label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value as AcademicDetails['department'])}
                  className="w-full px-3.5 py-2 text-xs bg-[#FAF9F5] border border-[#ECEAE4] rounded-xl focus:outline-none focus:bg-white focus:border-[#D97706] text-[#1F1F1F]"
                >
                  <option value="CSE">CSE</option>
                  <option value="AIML">AIML</option>
                  <option value="IT">IT</option>
                  <option value="ECE">ECE</option>
                  <option value="Mechanical">Mechanical</option>
                  <option value="Civil">Civil</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#6B6B6B] mb-1.5">
                  CGPA
                </label>
                <input
                  type="text"
                  value={cgpa}
                  onChange={(e) => setCgpa(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-[#FAF9F5] border border-[#ECEAE4] rounded-xl focus:outline-none focus:bg-white focus:border-[#D97706] text-[#1F1F1F]"
                />
              </div>
            </div>
          </div>

          {/* Section 2: AI Provider (BYOK) */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#ECEAE4] shadow-xs space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#ECEAE4]">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#D97706]" />
                <h2 className="text-base font-serif text-[#1F1F1F]">AI Model Routing &amp; Credentials</h2>
              </div>
              <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-[#FAF9F5] border border-[#ECEAE4] text-[#6B6B6B]">
                BYOK Encrypted
              </span>
            </div>

            {/* Active Provider Selector */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#6B6B6B] mb-2">
                Default Active Provider
              </label>
              <div className="grid grid-cols-3 gap-3">
                {(['gemini', 'openai', 'claude'] as AIProvider[]).map((prov) => (
                  <button
                    key={prov}
                    type="button"
                    onClick={() => setActiveAIProvider(prov)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      activeProvider === prov
                        ? 'border-[#1F1F1F] bg-[#FAF9F5] text-[#1F1F1F]'
                        : 'border-[#ECEAE4] bg-white text-[#6B6B6B] hover:border-[#D97706]/40'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium capitalize">{prov}</span>
                      {activeProvider === prov && <div className="w-2 h-2 rounded-full bg-[#D97706]" />}
                    </div>
                    <span className="text-[10px] text-[#6B6B6B] font-mono block mt-1">
                      {aiKeys[prov] ? 'Configured' : 'Empty'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Google Gemini */}
            <div className="p-4 bg-[#FAF9F5] rounded-xl border border-[#ECEAE4] space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-[#1F1F1F]">Google Gemini AI (Gemini 1.5 Flash)</label>
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] text-[#D97706] hover:underline inline-flex items-center gap-1 font-mono"
                >
                  Get Gemini Key <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
              <div className="flex gap-2">
                <input
                  type="password"
                  value={geminiKey}
                  onChange={(e) => {
                    setGeminiKey(cleanApiKey(e.target.value));
                    setTestStates((prev) => ({ ...prev, gemini: { testing: false, result: null } }));
                  }}
                  placeholder="AIzaSy..."
                  className="flex-1 px-3.5 py-2 text-xs bg-white border border-[#ECEAE4] rounded-xl focus:outline-none focus:border-[#D97706] font-mono text-[#1F1F1F]"
                />
                <button
                  type="button"
                  onClick={() => runProviderTest('gemini', geminiKey)}
                  disabled={testStates.gemini.testing || !geminiKey}
                  className="px-4 py-2 bg-white hover:bg-[#F8F7F3] border border-[#ECEAE4] text-[#1F1F1F] rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all disabled:opacity-50"
                >
                  {testStates.gemini.testing ? (
                    <Loader2 className="w-3 h-3 animate-spin text-[#D97706]" />
                  ) : (
                    <Activity className="w-3 h-3 text-[#D97706]" />
                  )}
                  <span>Test</span>
                </button>
              </div>
              {renderStatusBox(testStates.gemini.result)}
            </div>

            {/* OpenAI */}
            <div className="p-4 bg-[#FAF9F5] rounded-xl border border-[#ECEAE4] space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-[#1F1F1F]">OpenAI (GPT-4o / GPT-4o-mini)</label>
                <a
                  href="https://platform.openai.com/api-keys"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] text-[#D97706] hover:underline inline-flex items-center gap-1 font-mono"
                >
                  Get OpenAI Key <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
              <div className="flex gap-2">
                <input
                  type="password"
                  value={openaiKey}
                  onChange={(e) => {
                    setOpenaiKey(cleanApiKey(e.target.value));
                    setTestStates((prev) => ({ ...prev, openai: { testing: false, result: null } }));
                  }}
                  placeholder="sk-proj-..."
                  className="flex-1 px-3.5 py-2 text-xs bg-white border border-[#ECEAE4] rounded-xl focus:outline-none focus:border-[#D97706] font-mono text-[#1F1F1F]"
                />
                <button
                  type="button"
                  onClick={() => runProviderTest('openai', openaiKey)}
                  disabled={testStates.openai.testing || !openaiKey}
                  className="px-4 py-2 bg-white hover:bg-[#F8F7F3] border border-[#ECEAE4] text-[#1F1F1F] rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all disabled:opacity-50"
                >
                  {testStates.openai.testing ? (
                    <Loader2 className="w-3 h-3 animate-spin text-[#D97706]" />
                  ) : (
                    <Activity className="w-3 h-3 text-[#D97706]" />
                  )}
                  <span>Test</span>
                </button>
              </div>
              {renderStatusBox(testStates.openai.result)}
            </div>

            {/* Anthropic Claude */}
            <div className="p-4 bg-[#FAF9F5] rounded-xl border border-[#ECEAE4] space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-[#1F1F1F]">Anthropic Claude (Claude 3.5 Sonnet)</label>
                <a
                  href="https://console.anthropic.com/settings/keys"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] text-[#D97706] hover:underline inline-flex items-center gap-1 font-mono"
                >
                  Get Claude Key <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
              <div className="flex gap-2">
                <input
                  type="password"
                  value={claudeKey}
                  onChange={(e) => {
                    setClaudeKey(cleanApiKey(e.target.value));
                    setTestStates((prev) => ({ ...prev, claude: { testing: false, result: null } }));
                  }}
                  placeholder="sk-ant-..."
                  className="flex-1 px-3.5 py-2 text-xs bg-white border border-[#ECEAE4] rounded-xl focus:outline-none focus:border-[#D97706] font-mono text-[#1F1F1F]"
                />
                <button
                  type="button"
                  onClick={() => runProviderTest('claude', claudeKey)}
                  disabled={testStates.claude.testing || !claudeKey}
                  className="px-4 py-2 bg-white hover:bg-[#F8F7F3] border border-[#ECEAE4] text-[#1F1F1F] rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all disabled:opacity-50"
                >
                  {testStates.claude.testing ? (
                    <Loader2 className="w-3 h-3 animate-spin text-[#D97706]" />
                  ) : (
                    <Activity className="w-3 h-3 text-[#D97706]" />
                  )}
                  <span>Test</span>
                </button>
              </div>
              {renderStatusBox(testStates.claude.result)}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 text-xs font-medium text-[#FAF9F5] bg-[#1F1F1F] hover:bg-black rounded-xl transition-all shadow-xs"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </PortalLayout>
  );
}
