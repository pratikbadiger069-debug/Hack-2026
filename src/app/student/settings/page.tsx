'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { useAppStore } from '@/lib/store';
import { AIProvider, AcademicDetails, ThemeColor, ColorMode } from '@/types';
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
  Palette,
  Sun,
  Moon,
  ShieldCheck,
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
    themeColor,
    setThemeColor,
    colorMode,
    setColorMode,
  } = useAppStore();

  const [activeTab, setActiveTab] = useState<'appearance' | 'profile' | 'ai'>('appearance');

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

  const themes: { id: ThemeColor; name: string; hex: string; desc: string }[] = [
    { id: 'ocean-blue', name: 'Ocean Blue', hex: '#2563EB', desc: 'Linear & Stripe inspired crisp blue' },
    { id: 'sunset-orange', name: 'Sunset Orange', hex: '#F97316', desc: 'High momentum builder accent' },
    { id: 'forest-green', name: 'Forest Green', hex: '#16A34A', desc: 'Calm growth & verified craft' },
    { id: 'purple-haze', name: 'Purple Haze', hex: '#8B5CF6', desc: 'Modern web & Framer aesthetic' },
    { id: 'cyber-teal', name: 'Cyber Teal', hex: '#0D9488', desc: 'Arc Browser dynamic teal' },
    { id: 'monochrome', name: 'Monochrome', hex: '#18181B', desc: 'Raycast minimal dark/light' },
  ];

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

    confetti({
      particleCount: 70,
      spread: 50,
    });
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
            ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 text-zinc-900 dark:text-zinc-100'
            : 'bg-rose-50/70 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800 text-zinc-900 dark:text-zinc-100'
        }`}
      >
        <div className="flex items-center justify-between font-bold">
          <div className="flex items-center gap-1.5">
            {isSuccess ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-600" />
            )}
            <span className={isSuccess ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400'}>
              Status: {result.status}
            </span>
          </div>
          {result.latencyMs !== undefined && result.latencyMs > 0 && (
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center gap-1">
              <Clock className="w-2.5 h-2.5" />
              {result.latencyMs}ms
            </span>
          )}
        </div>

        <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
          {isSuccess ? result.message || 'Connection established successfully.' : result.error}
        </p>

        {result.echoResponse && (
          <div className="mt-1.5 p-2 bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 text-[11px] font-mono flex items-center gap-2 text-zinc-900 dark:text-white">
            <Terminal className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span className="text-zinc-400">Echo:</span>
            <span className="truncate">&quot;{result.echoResponse}&quot;</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <PortalLayout>
      <div className="space-y-8 max-w-[1000px] mx-auto pb-20">
        {/* Header HUD */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-zinc-200 dark:border-zinc-800"
        >
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Workspace Preferences
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-heading font-black tracking-tight text-zinc-900 dark:text-white mt-1">
              Settings &amp; Identity
            </h1>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-sans">
              Personalize your builder theme, dark mode, personal details, and private AI keys.
            </p>
          </div>

          {savedSuccess && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-heading font-bold"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Preferences Saved</span>
            </motion.div>
          )}
        </motion.section>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-3">
          {[
            { id: 'appearance', label: '🎨 Appearance & Themes' },
            { id: 'profile', label: '👤 Profile & Target Goal' },
            { id: 'ai', label: '🤖 AI Model Routing (BYOK)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-1.5 rounded-full text-xs font-heading font-bold transition-all lift-hover ${
                activeTab === tab.id
                  ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-xs'
                  : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 border border-zinc-200 dark:border-zinc-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSaveAll} className="space-y-6">
          {/* TAB 1: APPEARANCE & THEMES */}
          {activeTab === 'appearance' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="builder-card p-7 space-y-6"
            >
              <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center gap-2">
                  <Palette className="w-5 h-5 text-blue-600" />
                  <h2 className="text-base font-heading font-extrabold text-zinc-900 dark:text-white">
                    Color Palette Customization
                  </h2>
                </div>
                <span className="text-xs font-mono text-zinc-400">Persists across sessions</span>
              </div>

              {/* Mode Toggle */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-500 mb-2">
                  Display Mode
                </label>
                <div className="grid grid-cols-2 gap-3 max-w-sm">
                  <button
                    type="button"
                    onClick={() => setColorMode('light')}
                    className={`p-3 rounded-2xl border text-xs font-heading font-bold flex items-center justify-center gap-2 transition-all ${
                      colorMode === 'light'
                        ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200 ring-2 ring-blue-600'
                        : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400'
                    }`}
                  >
                    <Sun className="w-4 h-4 text-amber-500" />
                    <span>Light Mode</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setColorMode('dark')}
                    className={`p-3 rounded-2xl border text-xs font-heading font-bold flex items-center justify-center gap-2 transition-all ${
                      colorMode === 'dark'
                        ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200 ring-2 ring-blue-600'
                        : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400'
                    }`}
                  >
                    <Moon className="w-4 h-4 text-blue-400" />
                    <span>Dark Mode</span>
                  </button>
                </div>
              </div>

              {/* Theme Swatches */}
              <div className="space-y-2">
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-500 mb-2">
                  Accent Preset
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {themes.map((th) => (
                    <button
                      key={th.id}
                      type="button"
                      onClick={() => setThemeColor(th.id)}
                      className={`p-4 rounded-2xl border text-left transition-all flex items-start gap-3 lift-hover ${
                        themeColor === th.id
                          ? 'border-blue-600 ring-2 ring-blue-600 bg-blue-50/20 dark:bg-blue-950/20'
                          : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60'
                      }`}
                    >
                      <div
                        className="w-7 h-7 rounded-xl shrink-0 shadow-xs"
                        style={{ backgroundColor: th.hex }}
                      />
                      <div>
                        <span className="font-heading font-bold text-xs text-zinc-900 dark:text-white block">
                          {th.name}
                        </span>
                        <span className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-tight block">
                          {th.desc}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: PROFILE & TARGET GOAL */}
          {activeTab === 'profile' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="builder-card p-7 space-y-5"
            >
              <div className="flex items-center gap-2 pb-3 border-b border-zinc-100 dark:border-zinc-800">
                <User className="w-5 h-5 text-blue-600" />
                <h2 className="text-base font-heading font-extrabold text-zinc-900 dark:text-white">
                  Academic &amp; Target Goal Details
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-500 mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:border-blue-600 text-zinc-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-500 mb-1.5">
                    Target Career Goal
                  </label>
                  <input
                    type="text"
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:border-blue-600 text-zinc-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-500 mb-1.5">
                    Department
                  </label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value as AcademicDetails['department'])}
                    className="w-full px-3.5 py-2 text-xs bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:border-blue-600 text-zinc-900 dark:text-white"
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
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-500 mb-1.5">
                    Cumulative CGPA
                  </label>
                  <input
                    type="text"
                    value={cgpa}
                    onChange={(e) => setCgpa(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:border-blue-600 text-zinc-900 dark:text-white"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 3: AI MODEL ROUTING */}
          {activeTab === 'ai' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="builder-card p-7 space-y-6"
            >
              <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-blue-600" />
                  <h2 className="text-base font-heading font-extrabold text-zinc-900 dark:text-white">
                    AI Inference Model Routing (BYOK)
                  </h2>
                </div>
                <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 font-bold">
                  Zero-Leakage Encrypted
                </span>
              </div>

              {/* Active Provider Selector */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-500 mb-2">
                  Active Model Engine
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {(['gemini', 'openai', 'claude'] as AIProvider[]).map((prov) => (
                    <button
                      key={prov}
                      type="button"
                      onClick={() => setActiveAIProvider(prov)}
                      className={`p-3.5 rounded-2xl border text-left transition-all ${
                        activeProvider === prov
                          ? 'border-blue-600 bg-blue-50/40 dark:bg-blue-950/40 ring-2 ring-blue-600 font-bold'
                          : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-heading capitalize text-zinc-900 dark:text-white">{prov}</span>
                        {activeProvider === prov && <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />}
                      </div>
                      <span className="text-[10px] text-zinc-400 font-mono block mt-1">
                        {aiKeys[prov] ? 'Key Active' : 'Empty'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Google Gemini */}
              <div className="p-4 bg-zinc-50 dark:bg-zinc-900/60 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-heading font-bold text-zinc-900 dark:text-white">
                    Google Gemini AI (Gemini 1.5 Flash)
                  </label>
                  <a
                    href="https://aistudio.google.com/app/apikey"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] text-blue-600 dark:text-blue-400 hover:underline font-mono inline-flex items-center gap-1"
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
                    className="flex-1 px-3.5 py-2 text-xs bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:border-blue-600 font-mono text-zinc-900 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={() => runProviderTest('gemini', geminiKey)}
                    disabled={testStates.gemini.testing || !geminiKey}
                    className="px-4 py-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl text-xs font-heading font-bold flex items-center gap-1.5 transition-all disabled:opacity-50 lift-hover"
                  >
                    {testStates.gemini.testing ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : (
                      <Activity className="w-3 h-3" />
                    )}
                    <span>Test</span>
                  </button>
                </div>
                {renderStatusBox(testStates.gemini.result)}
              </div>

              {/* OpenAI */}
              <div className="p-4 bg-zinc-50 dark:bg-zinc-900/60 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-heading font-bold text-zinc-900 dark:text-white">
                    OpenAI (GPT-4o / GPT-4o-mini)
                  </label>
                  <a
                    href="https://platform.openai.com/api-keys"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] text-blue-600 dark:text-blue-400 hover:underline font-mono inline-flex items-center gap-1"
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
                    className="flex-1 px-3.5 py-2 text-xs bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:border-blue-600 font-mono text-zinc-900 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={() => runProviderTest('openai', openaiKey)}
                    disabled={testStates.openai.testing || !openaiKey}
                    className="px-4 py-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl text-xs font-heading font-bold flex items-center gap-1.5 transition-all disabled:opacity-50 lift-hover"
                  >
                    {testStates.openai.testing ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : (
                      <Activity className="w-3 h-3" />
                    )}
                    <span>Test</span>
                  </button>
                </div>
                {renderStatusBox(testStates.openai.result)}
              </div>

              {/* Anthropic Claude */}
              <div className="p-4 bg-zinc-50 dark:bg-zinc-900/60 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-heading font-bold text-zinc-900 dark:text-white">
                    Anthropic Claude (Claude 3.5 Sonnet)
                  </label>
                  <a
                    href="https://console.anthropic.com/settings/keys"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] text-blue-600 dark:text-blue-400 hover:underline font-mono inline-flex items-center gap-1"
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
                    className="flex-1 px-3.5 py-2 text-xs bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:border-blue-600 font-mono text-zinc-900 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={() => runProviderTest('claude', claudeKey)}
                    disabled={testStates.claude.testing || !claudeKey}
                    className="px-4 py-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl text-xs font-heading font-bold flex items-center gap-1.5 transition-all disabled:opacity-50 lift-hover"
                  >
                    {testStates.claude.testing ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : (
                      <Activity className="w-3 h-3" />
                    )}
                    <span>Test</span>
                  </button>
                </div>
                {renderStatusBox(testStates.claude.result)}
              </div>
            </motion.div>
          )}

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 text-xs font-heading font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-md lift-hover"
            >
              Save All Preferences
            </button>
          </div>
        </form>
      </div>
    </PortalLayout>
  );
}
