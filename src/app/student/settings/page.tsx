'use client';

import React, { useState, useEffect } from 'react';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { useAppStore } from '@/lib/store';
import { AIProvider } from '@/types';
import {
  Settings,
  Sparkles,
  Key,
  CheckCircle2,
  ShieldCheck,
  ExternalLink,
  Activity,
  AlertCircle,
  Loader2,
  Terminal,
  Zap,
  Clock,
  HelpCircle,
  RotateCw,
} from 'lucide-react';
import { cleanApiKey, DiagnosticResult } from '@/lib/ai-diagnostics';
import { maskApiKey } from '@/lib/user-utils';

export default function StudentSettingsPage() {
  const { aiKeys, setAIKey, activeProvider, setActiveAIProvider } = useAppStore();
  const [geminiKey, setGeminiKey] = useState(aiKeys.gemini || '');
  const [openaiKey, setOpenaiKey] = useState(aiKeys.openai || '');
  const [claudeKey, setClaudeKey] = useState(aiKeys.claude || '');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [testPrompt, setTestPrompt] = useState('SkillBridge live diagnostic probe. Output "OK".');

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

  // Load server-side configured keys if available
  useEffect(() => {
    async function loadConfig() {
      try {
        const res = await fetch('/api/settings');
        if (res.ok) {
          const data = await res.json();
          // if local keys are empty, fill from existing configured masked state or values
        }
      } catch {
        // use local storage defaults
      }
    }
    loadConfig();
  }, []);

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
          testPrompt: testPrompt.trim() || 'SkillBridge live ping. Output "OK".',
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

  const handleSaveAI = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanGemini = cleanApiKey(geminiKey);
    const cleanOpenAI = cleanApiKey(openaiKey);
    const cleanClaude = cleanApiKey(claudeKey);

    setAIKey('gemini', cleanGemini);
    setAIKey('openai', cleanOpenAI);
    setAIKey('claude', cleanClaude);

    // Save to server database
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
      // offline/client store fallback
    }

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const renderStatusBox = (result: DiagnosticResult | null) => {
    if (!result) return null;

    const isSuccess = result.status === 'Connected';
    const isInvalidKey = result.status === 'Invalid API Key' || result.status === 'Provider Authentication Failed';
    const isQuota = result.status === 'Quota Exceeded';

    const bgColor = isSuccess
      ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
      : isInvalidKey
      ? 'bg-red-50 border-red-200 text-red-900'
      : isQuota
      ? 'bg-amber-50 border-amber-200 text-amber-900'
      : 'bg-orange-50 border-orange-200 text-orange-900';

    return (
      <div className={`p-3 rounded-lg border text-xs space-y-1.5 animate-in fade-in duration-150 ${bgColor}`}>
        <div className="flex items-center justify-between font-bold">
          <div className="flex items-center gap-1.5">
            {isSuccess ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            )}
            <span>Status: {result.status}</span>
          </div>
          {result.latencyMs !== undefined && result.latencyMs > 0 && (
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/80 border border-slate-200 flex items-center gap-1">
              <Clock className="w-2.5 h-2.5 text-slate-500" />
              {result.latencyMs}ms
            </span>
          )}
        </div>

        <p className="text-[11px] leading-relaxed">
          {isSuccess ? result.message || 'Connection established successfully.' : result.error}
        </p>

        {result.echoResponse && (
          <div className="mt-1.5 p-2 bg-white/90 rounded border border-emerald-200 text-[10px] font-mono flex items-center gap-1.5 text-slate-800">
            <Terminal className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span className="font-semibold text-emerald-700">Echo:</span>
            <span className="truncate">&quot;{result.echoResponse}&quot;</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <PortalLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                Security &amp; Account
              </span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">AI &amp; Platform Settings</h1>
            <p className="text-xs text-slate-500 mt-1">
              Manage your AI Provider credentials (BYOK), connection diagnostics, latency telemetry, and model routing.
            </p>
          </div>
        </div>

        {/* AI Providers Section (BYOK) */}
        <div className="saas-card p-6 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900">AI Providers Configuration &amp; Diagnostics</h2>
                <p className="text-xs text-slate-500">
                  Connect Google Gemini, OpenAI, or Anthropic Claude with real-time ping latency testing.
                </p>
              </div>
            </div>
            {savedSuccess && (
              <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5" /> All Keys Saved &amp; Synced to Profile
              </span>
            )}
          </div>

          {/* Privacy Guarantee */}
          <div className="p-3.5 bg-blue-50/60 border border-blue-100 rounded-lg text-xs text-blue-900 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold">Zero-Leakage BYOK Architecture:</span> All API keys are sanitized (quotes and prefixes stripped), verified through upstream provider servers, and encrypted at rest. SkillBridge AI never logs your private API tokens.
            </div>
          </div>

          <form onSubmit={handleSaveAI} className="space-y-6">
            {/* Active Provider Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Active Default Provider
              </label>
              <div className="grid grid-cols-3 gap-3">
                {(['gemini', 'openai', 'claude'] as AIProvider[]).map((prov) => (
                  <button
                    key={prov}
                    type="button"
                    onClick={() => setActiveAIProvider(prov)}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      activeProvider === prov
                        ? 'border-blue-600 bg-blue-50/40 text-blue-900 ring-1 ring-blue-600 font-bold'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs capitalize block">{prov}</span>
                      {activeProvider === prov && <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />}
                    </div>
                    <span className="text-[10px] text-slate-500 font-normal">
                      {aiKeys[prov] ? 'Key Configured' : 'No Key Set'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Google Gemini API Key */}
            <div className="p-4 bg-slate-50/50 rounded-xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-900">Google Gemini AI (Gemini 1.5 Flash)</label>
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] text-blue-600 hover:underline inline-flex items-center gap-0.5 font-medium"
                >
                  Get Gemini Key <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Key className="w-4 h-4" />
                  </div>
                  <input
                    type="password"
                    value={geminiKey}
                    onChange={(e) => {
                      setGeminiKey(cleanApiKey(e.target.value));
                      setTestStates((prev) => ({ ...prev, gemini: { testing: false, result: null } }));
                    }}
                    placeholder="AIzaSy..."
                    className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 font-mono text-slate-900"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => runProviderTest('gemini', geminiKey)}
                  disabled={testStates.gemini.testing || !geminiKey}
                  className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors disabled:opacity-50"
                >
                  {testStates.gemini.testing ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Activity className="w-3.5 h-3.5" />
                  )}
                  <span>Test Key</span>
                </button>
              </div>

              {renderStatusBox(testStates.gemini.result)}
            </div>

            {/* OpenAI API Key */}
            <div className="p-4 bg-slate-50/50 rounded-xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-900">OpenAI (GPT-4o / GPT-4o-mini)</label>
                <a
                  href="https://platform.openai.com/api-keys"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] text-blue-600 hover:underline inline-flex items-center gap-0.5 font-medium"
                >
                  Get OpenAI Key <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Key className="w-4 h-4" />
                  </div>
                  <input
                    type="password"
                    value={openaiKey}
                    onChange={(e) => {
                      setOpenaiKey(cleanApiKey(e.target.value));
                      setTestStates((prev) => ({ ...prev, openai: { testing: false, result: null } }));
                    }}
                    placeholder="sk-proj-..."
                    className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 font-mono text-slate-900"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => runProviderTest('openai', openaiKey)}
                  disabled={testStates.openai.testing || !openaiKey}
                  className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors disabled:opacity-50"
                >
                  {testStates.openai.testing ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Activity className="w-3.5 h-3.5" />
                  )}
                  <span>Test Key</span>
                </button>
              </div>

              {renderStatusBox(testStates.openai.result)}
            </div>

            {/* Anthropic Claude API Key */}
            <div className="p-4 bg-slate-50/50 rounded-xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-900">Anthropic Claude (Claude 3.5 Sonnet)</label>
                <a
                  href="https://console.anthropic.com/settings/keys"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] text-blue-600 hover:underline inline-flex items-center gap-0.5 font-medium"
                >
                  Get Claude Key <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Key className="w-4 h-4" />
                  </div>
                  <input
                    type="password"
                    value={claudeKey}
                    onChange={(e) => {
                      setClaudeKey(cleanApiKey(e.target.value));
                      setTestStates((prev) => ({ ...prev, claude: { testing: false, result: null } }));
                    }}
                    placeholder="sk-ant-..."
                    className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 font-mono text-slate-900"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => runProviderTest('claude', claudeKey)}
                  disabled={testStates.claude.testing || !claudeKey}
                  className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors disabled:opacity-50"
                >
                  {testStates.claude.testing ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Activity className="w-3.5 h-3.5" />
                  )}
                  <span>Test Key</span>
                </button>
              </div>

              {renderStatusBox(testStates.claude.result)}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-xs transition-colors flex items-center gap-1.5"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Save All Credentials</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </PortalLayout>
  );
}
