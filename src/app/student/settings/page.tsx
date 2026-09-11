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
  User,
  Bell,
  Lock,
} from 'lucide-react';

export default function StudentSettingsPage() {
  const { aiKeys, setAIKey, activeProvider, setActiveAIProvider, studentProfile } = useAppStore();
  const [geminiKey, setGeminiKey] = useState(aiKeys.gemini || '');
  const [openaiKey, setOpenaiKey] = useState(aiKeys.openai || '');
  const [claudeKey, setClaudeKey] = useState(aiKeys.claude || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveAI = (e: React.FormEvent) => {
    e.preventDefault();
    setAIKey('gemini', geminiKey);
    setAIKey('openai', openaiKey);
    setAIKey('claude', claudeKey);
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
                Security & Account
              </span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Platform Settings</h1>
            <p className="text-xs text-slate-500 mt-1">
              Manage your AI Provider keys (BYOK), security credentials, and institutional profile preferences.
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
                <h2 className="text-sm font-bold text-slate-900">AI Providers Configuration (BYOK)</h2>
                <p className="text-xs text-slate-500">
                  Connect your Google Gemini, OpenAI, or Anthropic Claude API keys for Career Copilot & Intelligence modules.
                </p>
              </div>
            </div>
            {savedSuccess && (
              <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Keys Saved
              </span>
            )}
          </div>

          {/* Privacy Guarantee */}
          <div className="p-3.5 bg-blue-50/60 border border-blue-100 rounded-lg text-xs text-blue-900 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold">Local Session Security:</span> All API keys are stored strictly in client-side secure browser storage. They are never logged or stored on central database servers.
            </div>
          </div>

          <form onSubmit={handleSaveAI} className="space-y-5">
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
                        : 'border-slate-200 bg-white text-slate-700'
                    }`}
                  >
                    <span className="text-xs capitalize block">{prov}</span>
                    <span className="text-[10px] text-slate-500 font-normal">
                      {aiKeys[prov] ? 'Key Configured' : 'No Key Set'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Google Gemini API Key */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-800">
                  Google Gemini API Key (Recommended for Fast Inference)
                </label>
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] text-blue-600 hover:underline inline-flex items-center gap-0.5 font-medium"
                >
                  Get Gemini Key <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Key className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  value={geminiKey}
                  onChange={(e) => setGeminiKey(e.target.value)}
                  placeholder="AIzaSy..."
                  className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-600 font-mono text-slate-900"
                />
              </div>
            </div>

            {/* OpenAI API Key */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-800">
                  OpenAI API Key (GPT-4o & GPT-4o-mini)
                </label>
                <a
                  href="https://platform.openai.com/api-keys"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] text-blue-600 hover:underline inline-flex items-center gap-0.5 font-medium"
                >
                  Get OpenAI Key <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Key className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  value={openaiKey}
                  onChange={(e) => setOpenaiKey(e.target.value)}
                  placeholder="sk-proj-..."
                  className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-600 font-mono text-slate-900"
                />
              </div>
            </div>

            {/* Anthropic Claude API Key */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-800">
                  Anthropic Claude API Key (Claude 3.5 Sonnet)
                </label>
                <a
                  href="https://console.anthropic.com/settings/keys"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] text-blue-600 hover:underline inline-flex items-center gap-0.5 font-medium"
                >
                  Get Claude Key <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Key className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  value={claudeKey}
                  onChange={(e) => setClaudeKey(e.target.value)}
                  placeholder="sk-ant-..."
                  className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-600 font-mono text-slate-900"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-5 py-2.5 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-xs transition-colors"
              >
                Save All AI Credentials
              </button>
            </div>
          </form>
        </div>
      </div>
    </PortalLayout>
  );
}
