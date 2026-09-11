'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { AIProvider } from '@/types';
import { Sparkles, Key, CheckCircle2, ShieldCheck, ExternalLink, X, AlertTriangle } from 'lucide-react';

interface AIProviderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AIProviderModal({ isOpen, onClose }: AIProviderModalProps) {
  const { aiKeys, setAIKey, activeProvider, setActiveAIProvider } = useAppStore();
  const [selectedProvider, setSelectedProvider] = useState<AIProvider>(activeProvider);
  const [keyInput, setKeyInput] = useState(aiKeys[activeProvider] || '');
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  const handleProviderSelect = (provider: AIProvider) => {
    setSelectedProvider(provider);
    setKeyInput(aiKeys[provider] || '');
    setIsSaved(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setAIKey(selectedProvider, keyInput);
    setActiveAIProvider(selectedProvider);
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 1200);
  };

  const getProviderInfo = (provider: AIProvider) => {
    switch (provider) {
      case 'gemini':
        return {
          title: 'Google Gemini AI',
          description: 'Gemini 1.5 Flash & Pro for low-latency reasoning and multimodel analysis.',
          linkText: 'Get Gemini API Key (Google AI Studio)',
          link: 'https://aistudio.google.com/app/apikey',
          placeholder: 'AIzaSy...',
          status: aiKeys.gemini ? 'Connected' : 'Not configured',
        };
      case 'openai':
        return {
          title: 'OpenAI (GPT-4o)',
          description: 'GPT-4o & GPT-4o-mini for industry benchmark reasoning and evaluations.',
          linkText: 'Get OpenAI API Key',
          link: 'https://platform.openai.com/api-keys',
          placeholder: 'sk-proj-...',
          status: aiKeys.openai ? 'Connected' : 'Not configured',
        };
      case 'claude':
        return {
          title: 'Anthropic Claude',
          description: 'Claude 3.5 Sonnet for deep architectural synthesis and code review.',
          linkText: 'Get Anthropic API Key',
          link: 'https://console.anthropic.com/settings/keys',
          placeholder: 'sk-ant-...',
          status: aiKeys.claude ? 'Connected' : 'Not configured',
        };
    }
  };

  const currentInfo = getProviderInfo(selectedProvider);

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
              <p className="text-xs text-slate-500">Bring Your Own Key for Career Copilot and Curriculum Analysis</p>
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
        <div className="p-6 space-y-6">
          {/* Privacy Guarantee Note */}
          <div className="flex items-start gap-3 p-3.5 bg-blue-50/60 border border-blue-100 rounded-lg text-xs text-blue-900">
            <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold">Zero-Leakage BYOK Architecture:</span> Keys are stored exclusively in your browser session/local client storage and are passed directly to provider inference endpoints. SkillBridge AI never logs your private API tokens.
            </div>
          </div>

          {/* Provider Selection Tabs */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2.5">
              Select AI Engine
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(['gemini', 'openai', 'claude'] as AIProvider[]).map((prov) => {
                const isSelected = selectedProvider === prov;
                const hasKey = Boolean(aiKeys[prov] && aiKeys[prov].length > 5);
                return (
                  <button
                    key={prov}
                    type="button"
                    onClick={() => handleProviderSelect(prov)}
                    className={`flex flex-col items-start p-3 rounded-lg border text-left transition-all ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/30 ring-1 ring-blue-600'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className="font-medium text-xs text-slate-900 capitalize">{prov}</span>
                      {hasKey && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                    </div>
                    <span className="text-[11px] text-slate-500 line-clamp-1">
                      {hasKey ? 'Configured' : 'No Key'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* API Key Form */}
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-medium text-slate-700">
                  {currentInfo.title} API Key
                </label>
                <a
                  href={currentInfo.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] text-blue-600 hover:text-blue-700 font-medium"
                >
                  {currentInfo.linkText}
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
                    setIsSaved(false);
                  }}
                  placeholder={currentInfo.placeholder}
                  className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent font-mono"
                />
              </div>
              <p className="mt-1.5 text-[11px] text-slate-500">
                {currentInfo.description}
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-xs flex items-center gap-1.5"
              >
                {isSaved ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Saved Successfully
                  </>
                ) : (
                  'Save & Activate Provider'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
