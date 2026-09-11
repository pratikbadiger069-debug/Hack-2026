'use client';

import React, { useState } from 'react';
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
} from 'lucide-react';

export default function StudentSettingsPage() {
  const { aiKeys, setAIKey, activeProvider, setActiveAIProvider } = useAppStore();
  const [geminiKey, setGeminiKey] = useState(aiKeys.gemini || '');
  const [openaiKey, setOpenaiKey] = useState(aiKeys.openai || '');
  const [claudeKey, setClaudeKey] = useState(aiKeys.claude || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [testStates, setTestStates] = useState<
    Record<
      AIProvider,
      {
        testing: boolean;
        status: 'Connected' | 'Invalid API Key' | 'Connection Failed' | null;
        message?: string;
        latencyMs?: number;
        echoResponse?: string;
        error?: string;
      }
    >
  >({
    gemini: { testing: false, status: null },
    openai: { testing: false, status: null },
    claude: { testing: false, status: null },
  });

  const runProviderTest = async (provider: AIProvider, keyToTest: string) => {
    if (!keyToTest || keyToTest.trim().length < 8) {
      setTestStates((prev) => ({
        ...prev,
        [provider]: {
          testing: false,
          status: 'Invalid API Key',
          error: 'Please enter a valid API key string.',
        },
      }));
      return;
    }

    setTestStates((prev) => ({
      ...prev,
      [provider]: { testing: true, status: null },
    }));

    try {
      const res = await fetch('/api/ai/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          provider,
          apiKey: keyToTest.trim(),
          testPrompt: 'SkillBridge live ping. Output "OK".',
        }),
      });

      const data = await res.json();
      if (res.ok && data.status === 'Connected') {
        setTestStates((prev) => ({
          ...prev,
          [provider]: {
            testing: false,
            status: 'Connected',
            message: data.message,
            latencyMs: data.latencyMs,
            echoResponse: data.echoResponse,
          },
        }));
      } else {
        setTestStates((prev) => ({
          ...prev,
          [provider]: {
            testing: false,
            status: data.status || 'Invalid API Key',
            error: data.error || 'Authentication failure.',
            latencyMs: data.latencyMs,
          },
        }));
      }
    } catch (err: any) {
      setTestStates((prev) => ({
        ...prev,
        [provider]: {
          testing: false,
          status: 'Connection Failed',
          error: err.message || 'Network unreachable',
        },
      }));
    }
  };

  const handleSaveAI = (e: React.FormEvent) => {
    e.preventDefault();
    setAIKey('gemini', geminiKey.trim());
    setAIKey('openai', openaiKey.trim());
    setAIKey('claude', claudeKey.trim());
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <PortalLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                Security &amp; Account
              </span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Platform Settings</h1>
            <p className="text-xs text-slate-500 mt-1">
              Manage your AI Provider credentials (BYOK), connection diagnostics, and telemetry preferences.
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
              <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> All Keys Saved &amp; Synced
              </span>
            )}
          </div>

          {/* Privacy Guarantee */}
          <div className="p-3.5 bg-blue-50/60 border border-blue-100 rounded-lg text-xs text-blue-900 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold">Local Session Security:</span> All API keys are stored securely in browser state and verified through server-side inference. SkillBridge AI never logs your private API tokens.
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
                <label className="text-xs font-bold text-slate-900">Google Gemini AI</label>
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
                    onChange={(e) => setGeminiKey(e.target.value)}
                    placeholder="AIzaSy..."
                    className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 font-mono text-slate-900"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => runProviderTest('gemini', geminiKey)}
                  disabled={testStates.gemini.testing || !geminiKey}
                  className="px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors disabled:opacity-50"
                >
                  {testStates.gemini.testing ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Activity className="w-3.5 h-3.5 text-blue-600" />
                  )}
                  <span>Test Connection</span>
                </button>
              </div>

              {testStates.gemini.status && (
                <div
                  className={`p-2.5 rounded-lg border text-xs flex items-center justify-between ${
                    testStates.gemini.status === 'Connected'
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                      : 'bg-red-50 border-red-200 text-red-900'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    {testStates.gemini.status === 'Connected' ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <AlertCircle className="w-3.5 h-3.5 text-red-600" />
                    )}
                    <span className="font-bold">{testStates.gemini.status}</span>
                    <span className="text-[11px] font-normal text-slate-700 ml-1">
                      {testStates.gemini.status === 'Connected' ? testStates.gemini.message : testStates.gemini.error}
                    </span>
                  </div>
                  {testStates.gemini.latencyMs && (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/80">
                      {testStates.gemini.latencyMs}ms
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* OpenAI API Key */}
            <div className="p-4 bg-slate-50/50 rounded-xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-900">OpenAI (GPT-4o)</label>
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
                    onChange={(e) => setOpenaiKey(e.target.value)}
                    placeholder="sk-proj-..."
                    className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 font-mono text-slate-900"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => runProviderTest('openai', openaiKey)}
                  disabled={testStates.openai.testing || !openaiKey}
                  className="px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors disabled:opacity-50"
                >
                  {testStates.openai.testing ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Activity className="w-3.5 h-3.5 text-blue-600" />
                  )}
                  <span>Test Connection</span>
                </button>
              </div>

              {testStates.openai.status && (
                <div
                  className={`p-2.5 rounded-lg border text-xs flex items-center justify-between ${
                    testStates.openai.status === 'Connected'
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                      : 'bg-red-50 border-red-200 text-red-900'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    {testStates.openai.status === 'Connected' ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <AlertCircle className="w-3.5 h-3.5 text-red-600" />
                    )}
                    <span className="font-bold">{testStates.openai.status}</span>
                    <span className="text-[11px] font-normal text-slate-700 ml-1">
                      {testStates.openai.status === 'Connected' ? testStates.openai.message : testStates.openai.error}
                    </span>
                  </div>
                  {testStates.openai.latencyMs && (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/80">
                      {testStates.openai.latencyMs}ms
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Anthropic Claude API Key */}
            <div className="p-4 bg-slate-50/50 rounded-xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-900">Anthropic Claude</label>
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
                    onChange={(e) => setClaudeKey(e.target.value)}
                    placeholder="sk-ant-..."
                    className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 font-mono text-slate-900"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => runProviderTest('claude', claudeKey)}
                  disabled={testStates.claude.testing || !claudeKey}
                  className="px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors disabled:opacity-50"
                >
                  {testStates.claude.testing ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Activity className="w-3.5 h-3.5 text-blue-600" />
                  )}
                  <span>Test Connection</span>
                </button>
              </div>

              {testStates.claude.status && (
                <div
                  className={`p-2.5 rounded-lg border text-xs flex items-center justify-between ${
                    testStates.claude.status === 'Connected'
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                      : 'bg-red-50 border-red-200 text-red-900'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    {testStates.claude.status === 'Connected' ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <AlertCircle className="w-3.5 h-3.5 text-red-600" />
                    )}
                    <span className="font-bold">{testStates.claude.status}</span>
                    <span className="text-[11px] font-normal text-slate-700 ml-1">
                      {testStates.claude.status === 'Connected' ? testStates.claude.message : testStates.claude.error}
                    </span>
                  </div>
                  {testStates.claude.latencyMs && (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/80">
                      {testStates.claude.latencyMs}ms
                    </span>
                  )}
                </div>
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-5 py-2.5 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-2xs transition-colors flex items-center gap-1.5"
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
