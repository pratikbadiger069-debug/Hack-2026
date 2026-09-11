'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { AIProvider } from '@/types';
import {
  Sparkles,
  Key,
  CheckCircle2,
  ShieldCheck,
  ExternalLink,
  X,
  AlertCircle,
  Activity,
  Loader2,
  Zap,
  Terminal,
} from 'lucide-react';
import { maskApiKey } from '@/lib/user-utils';

interface AIProviderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AIProviderModal({ isOpen, onClose }: AIProviderModalProps) {
  const { aiKeys, setAIKey, activeProvider, setActiveAIProvider } = useAppStore();
  const [selectedProvider, setSelectedProvider] = useState<AIProvider>(activeProvider);
  const [keyInput, setKeyInput] = useState(aiKeys[activeProvider] || '');
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{
    status: 'Connected' | 'Invalid API Key' | 'Connection Failed' | null;
    message?: string;
    latencyMs?: number;
    echoResponse?: string;
    error?: string;
  }>({ status: null });
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  const handleProviderSelect = (provider: AIProvider) => {
    setSelectedProvider(provider);
    setKeyInput(aiKeys[provider] || '');
    setTestResult({ status: null });
    setIsSaved(false);
  };

  const runConnectionTest = async () => {
    if (!keyInput || keyInput.trim().length < 8) {
      setTestResult({
        status: 'Invalid API Key',
        error: 'Please enter a valid API key before testing connection.',
      });
      return;
    }

    setTesting(true);
    setTestResult({ status: null });

    try {
      const res = await fetch('/api/ai/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          provider: selectedProvider,
          apiKey: keyInput.trim(),
          testPrompt: 'Connection probe test. Respond: "SkillBridge AI verified."',
        }),
      });

      const data = await res.json();
      if (res.ok && data.status === 'Connected') {
        setTestResult({
          status: 'Connected',
          message: data.message,
          latencyMs: data.latencyMs,
          echoResponse: data.echoResponse,
        });
      } else {
        setTestResult({
          status: data.status || 'Invalid API Key',
          error: data.error || 'Provider authentication failed.',
          latencyMs: data.latencyMs,
        });
      }
    } catch (err: any) {
      setTestResult({
        status: 'Connection Failed',
        error: err.message || 'Network error reaching diagnostic probe.',
      });
    } finally {
      setTesting(false);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setAIKey(selectedProvider, keyInput.trim());
    setActiveAIProvider(selectedProvider);
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 1000);
  };

  const getProviderInfo = (provider: AIProvider) => {
    switch (provider) {
      case 'gemini':
        return {
          title: 'Google Gemini AI',
          description: 'Gemini 1.5 Flash & Pro for low-latency reasoning and multimodel analysis.',
          linkText: 'Get Gemini Key from Google AI Studio',
          link: 'https://aistudio.google.com/app/apikey',
          placeholder: 'AIzaSy...',
        };
      case 'openai':
        return {
          title: 'OpenAI (GPT-4o)',
          description: 'GPT-4o & GPT-4o-mini for industry benchmark reasoning and evaluations.',
          linkText: 'Get OpenAI Key from Platform Console',
          link: 'https://platform.openai.com/api-keys',
          placeholder: 'sk-proj-...',
        };
      case 'claude':
        return {
          title: 'Anthropic Claude',
          description: 'Claude 3.5 Sonnet for deep architectural synthesis and code review.',
          linkText: 'Get Anthropic Key from Console',
          link: 'https://console.anthropic.com/settings/keys',
          placeholder: 'sk-ant-...',
        };
    }
  };

  const currentInfo = getProviderInfo(selectedProvider);
  const currentSavedKey = aiKeys[selectedProvider];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 text-base">Connect AI Provider (BYOK)</h3>
              <p className="text-xs text-slate-500">Live API diagnostics, latency probe &amp; key management</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-md hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Privacy Guarantee Note */}
          <div className="flex items-start gap-3 p-3 bg-blue-50/60 border border-blue-100 rounded-lg text-xs text-blue-900">
            <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold">Zero-Leakage BYOK Architecture:</span> Keys are stored safely and verified server-side. SkillBridge AI never logs your private API tokens.
            </div>
          </div>

          {/* Provider Selector Tabs */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">Select Provider</label>
            <div className="grid grid-cols-3 gap-2">
              {(['gemini', 'openai', 'claude'] as AIProvider[]).map((p) => {
                const isSelected = selectedProvider === p;
                const isConfigured = Boolean(aiKeys[p] && aiKeys[p].length > 8);
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => handleProviderSelect(p)}
                    className={`p-3 rounded-lg border text-left flex flex-col justify-between transition-all ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/40 ring-1 ring-blue-600'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className="text-xs font-bold capitalize text-slate-900">{p}</span>
                      {isConfigured && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                    </div>
                    <span className="text-[10px] text-slate-500">
                      {isConfigured ? maskApiKey(aiKeys[p]) : 'Not configured'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Key Input & Test Console */}
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-700">{currentInfo.title} API Key</label>
                <a
                  href={currentInfo.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-1"
                >
                  <span>{currentInfo.linkText}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Key className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  value={keyInput}
                  onChange={(e) => {
                    setKeyInput(e.target.value);
                    setTestResult({ status: null });
                  }}
                  placeholder={currentInfo.placeholder}
                  className="w-full pl-9 pr-24 py-2 text-xs font-mono bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white text-slate-900"
                />
                <button
                  type="button"
                  onClick={runConnectionTest}
                  disabled={testing || !keyInput}
                  className="absolute right-1 top-1 bottom-1 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md text-[11px] font-semibold flex items-center gap-1 transition-colors disabled:opacity-50"
                >
                  {testing ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : (
                    <Activity className="w-3 h-3 text-blue-600" />
                  )}
                  <span>Test Key</span>
                </button>
              </div>
            </div>

            {/* Live Diagnostic Status Banner */}
            {testResult.status && (
              <div
                className={`p-3 rounded-lg border text-xs space-y-1 animate-in fade-in duration-150 ${
                  testResult.status === 'Connected'
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                    : testResult.status === 'Invalid API Key'
                    ? 'bg-red-50 border-red-200 text-red-900'
                    : 'bg-amber-50 border-amber-200 text-amber-900'
                }`}
              >
                <div className="flex items-center justify-between font-bold">
                  <div className="flex items-center gap-1.5">
                    {testResult.status === 'Connected' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-red-600" />
                    )}
                    <span>Status: {testResult.status}</span>
                  </div>
                  {testResult.latencyMs && (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/70">
                      {testResult.latencyMs}ms latency
                    </span>
                  )}
                </div>

                <p className="text-[11px] leading-relaxed">
                  {testResult.status === 'Connected' ? testResult.message : testResult.error}
                </p>

                {testResult.echoResponse && (
                  <div className="mt-2 p-2 bg-white/80 rounded border border-emerald-200 text-[10px] font-mono flex items-center gap-1.5">
                    <Terminal className="w-3 h-3 text-emerald-600 shrink-0" />
                    <span>Ping Echo: &quot;{testResult.echoResponse}&quot;</span>
                  </div>
                )}
              </div>
            )}

            {/* Footer Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <span className="text-[11px] text-slate-500">
                Active Provider: <strong className="capitalize text-slate-800">{activeProvider}</strong>
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-3.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-2xs flex items-center gap-1.5"
                >
                  {isSaved ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Zap className="w-3.5 h-3.5" />}
                  <span>{isSaved ? 'Saved & Activated!' : 'Save & Activate Key'}</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
