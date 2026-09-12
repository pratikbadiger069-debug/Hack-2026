'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { useAppStore } from '@/lib/store';
import { AIProviderModal } from '@/components/ai/AIProviderModal';
import { CopilotMarkdown } from '@/components/copilot/CopilotMarkdown';
import {
  CopilotMentorMode,
  CopilotChatMessage,
  CopilotChatSession,
  CopilotMemoryItem,
  GitHubProfileAnalysis,
} from '@/types';
import {
  analyzeStudentCareerContext,
  generateSmartCopilotResponse,
  analyzeGitHubProfileDeeply,
} from '@/lib/copilot-engine';
import { getUserDisplayName, getUserFirstName } from '@/lib/user-utils';
import {
  Sparkles,
  Send,
  Loader2,
  Target,
  CheckCircle2,
  RotateCcw,
  KeyRound,
  Compass,
  Code2,
  Layers,
  GraduationCap,
  Flame,
  Check,
  Brain,
  GitBranch,
  TrendingUp,
  AlertTriangle,
  BookOpen,
  Briefcase,
  Mic,
  Calendar,
  Zap,
  Plus,
  Trash2,
  FileCode2,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  RefreshCw,
  ExternalLink,
  Award,
  Pin,
  PinOff,
  Edit2,
  Search,
  MessageSquare,
  Bot,
  User,
  SlidersHorizontal,
  X,
} from 'lucide-react';

const MENTOR_MODES: {
  id: CopilotMentorMode;
  label: string;
  icon: any;
  desc: string;
  badge: string;
}[] = [
  {
    id: 'career',
    label: 'Career Mentor',
    icon: Compass,
    desc: 'Strategic roadmaps, placement advice & resume tailoring',
    badge: 'Strategic',
  },
  {
    id: 'project',
    label: 'Project Mentor',
    icon: Layers,
    desc: 'System architecture, database schema & MVP design',
    badge: 'Architecture',
  },
  {
    id: 'interview',
    label: 'Interview Sim',
    icon: Mic,
    desc: 'Live technical coding, DSA & behavioral mock screening',
    badge: 'Mock Prep',
  },
  {
    id: 'learning',
    label: 'Learning Coach',
    icon: BookOpen,
    desc: 'Daily & weekly micro-sprints to bridge skill gaps',
    badge: 'Sprint Plan',
  },
  {
    id: 'opportunity',
    label: 'Opportunity Match',
    icon: Briefcase,
    desc: 'Verified internship & job recommendations with match proof',
    badge: 'Placement',
  },
  {
    id: 'general',
    label: 'Code Assistant',
    icon: Code2,
    desc: 'ChatGPT-style technical assistant, debugging & algorithms',
    badge: 'Full-Stack',
  },
];

export default function CareerCopilotPage() {
  const {
    studentProfile,
    currentUser,
    aiKeys,
    activeProvider,
    aiProviderConfigs,
    githubData,
    copilotMemory,
    updateCopilotMemory,
    addCopilotMemoryItem,
    clearCopilotMemory,
    xp,
    level,
    streakDays,
    assessmentHistory,
    copilotSessions,
    activeCopilotSessionId,
    activeCopilotMode,
    createCopilotSession,
    switchCopilotSession,
    renameCopilotSession,
    deleteCopilotSession,
    pinCopilotSession,
    addMessageToActiveSession,
    updateLastAssistantMessage,
    clearActiveSessionMessages,
    setCopilotMentorMode,
  } = useAppStore();

  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [rightPanelOpen, setRightPanelOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingSessionId, setEditingSessionId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [rightTab, setRightTab] = useState<'readiness' | 'memory' | 'github'>('readiness');
  const [newMemoryText, setNewMemoryText] = useState('');
  const [newMemoryCategory, setNewMemoryCategory] = useState<CopilotMemoryItem['category']>('goal');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const activeSession =
    copilotSessions.find((s) => s.id === activeCopilotSessionId) ||
    copilotSessions[0] || {
      id: 'session-master-1',
      title: 'Full-Stack & Systems Architecture Mentor',
      mode: 'career' as CopilotMentorMode,
      pinned: true,
      createdAt: 'Today',
      updatedAt: 'Just now',
      messages: [],
    };

  const targetRole = studentProfile.careerPath || studentProfile.targetRole || 'Full-Stack Software Engineer';
  const context = analyzeStudentCareerContext(studentProfile, targetRole);

  // GitHub deep analysis
  const [gitAnalysis, setGitAnalysis] = useState<GitHubProfileAnalysis>(() =>
    analyzeGitHubProfileDeeply(githubData, studentProfile)
  );

  useEffect(() => {
    setGitAnalysis(analyzeGitHubProfileDeeply(githubData, studentProfile));
  }, [githubData, studentProfile]);

  const displayName = getUserDisplayName(studentProfile, currentUser);
  const firstName = getUserFirstName(studentProfile, currentUser);
  const collegeName = studentProfile?.academic?.college || studentProfile?.college || 'HITAM';
  const branchName = studentProfile?.academic?.department || studentProfile?.branch || 'CSE';
  const builderScore = studentProfile?.builderScores?.overall || 885;

  const activeConfig = aiProviderConfigs?.[activeProvider] || {
    id: activeProvider,
    name: activeProvider === 'gemini' ? 'Google Gemini' : activeProvider,
    model: 'gemini-1.5-flash',
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeSession?.messages, loading]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputQuery).trim();
    if (!query || loading) return;

    setInputQuery('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    // 1. Add User Message
    addMessageToActiveSession({
      sender: 'user',
      content: query,
      mode: activeSession.mode,
    });

    setLoading(true);

    // 2. Add Assistant placeholder with streaming state
    const assistantMsgId = `msg-ai-${Date.now()}`;
    addMessageToActiveSession({
      id: assistantMsgId,
      sender: 'assistant',
      content: '',
      mode: activeSession.mode,
      provider: activeProvider,
      model: activeConfig.model,
      isStreaming: true,
    });

    try {
      const response = await generateSmartCopilotResponse(
        query,
        studentProfile,
        targetRole,
        activeProvider,
        aiKeys[activeProvider],
        activeSession.mode,
        copilotMemory,
        githubData,
        assessmentHistory,
        activeConfig.model
      );

      updateLastAssistantMessage(response.text, response.suggestedActions, response.codeSnippets);

      // Auto-extract memory cue
      if (query.toLowerCase().includes('i want to') || query.toLowerCase().includes('my goal is')) {
        addCopilotMemoryItem({
          category: 'goal',
          content: query.slice(0, 120),
        });
      }
    } catch (err: any) {
      updateLastAssistantMessage(
        `⚠️ I encountered a temporary connection glitch. Please check your **${activeConfig.name}** API key in Settings or try again.\n\n*Error details: ${err.message || 'Network timeout'}*`,
        ['🔑 Check AI Provider Settings', '⚡ Try again']
      );
    } finally {
      setLoading(false);
    }
  };

  const handleStartNewChat = (mode: CopilotMentorMode = 'career') => {
    createCopilotSession(mode);
  };

  const handleRenameSubmit = (e: React.FormEvent, sessionId: string) => {
    e.preventDefault();
    if (editingTitle.trim()) {
      renameCopilotSession(sessionId, editingTitle.trim());
    }
    setEditingSessionId(null);
  };

  const handleAddMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemoryText.trim()) return;
    addCopilotMemoryItem({
      category: newMemoryCategory,
      content: newMemoryText.trim(),
    });
    setNewMemoryText('');
  };

  // Filter sessions by search query
  const filteredSessions = copilotSessions.filter((s) =>
    s.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const pinnedSessions = filteredSessions.filter((s) => s.pinned);
  const recentSessions = filteredSessions.filter((s) => !s.pinned);

  return (
    <PortalLayout>
      <div className="flex h-[calc(100vh-5.5rem)] -mt-2 -mb-8 overflow-hidden rounded-2xl border border-[#E8E5DD] bg-white font-sans text-[#1B1B1B] shadow-xs">
        
        {/* ========================================================= */}
        {/* LEFT SIDEBAR: Persistent ChatGPT-Style Sessions */}
        {/* ========================================================= */}
        <div
          className={`h-full bg-[#FAF9F5] border-r border-[#E8E5DD] flex flex-col transition-all duration-200 shrink-0 ${
            sidebarOpen ? 'w-72' : 'w-0 overflow-hidden border-none'
          }`}
        >
          {/* Top Actions */}
          <div className="p-3.5 border-b border-[#E8E5DD] space-y-2.5">
            <button
              onClick={() => handleStartNewChat(activeSession.mode)}
              className="w-full py-2.5 px-3 bg-[#1B1B1B] text-white rounded-xl text-xs font-semibold hover:bg-[#C76A2A] transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>New Mentorship Chat</span>
            </button>

            {/* Search sessions */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-[#6F6A60]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search conversations..."
                className="w-full pl-8 pr-3 py-1.5 bg-white border border-[#E8E5DD] rounded-lg text-[11px] text-[#1B1B1B] placeholder:text-[#6F6A60] focus:outline-none focus:border-[#C76A2A]"
              />
            </div>
          </div>

          {/* Session List */}
          <div className="flex-1 overflow-y-auto p-2 space-y-3">
            {/* Pinned Section */}
            {pinnedSessions.length > 0 && (
              <div className="space-y-1">
                <span className="px-2 text-[10px] font-mono uppercase tracking-wider text-[#6F6A60] font-semibold flex items-center gap-1">
                  <Pin className="w-3 h-3 text-[#C76A2A]" />
                  Pinned
                </span>
                {pinnedSessions.map((session) => (
                  <SessionRow
                    key={session.id}
                    session={session}
                    isActive={session.id === activeSession.id}
                    onSelect={() => switchCopilotSession(session.id)}
                    onPin={() => pinCopilotSession(session.id)}
                    onDelete={() => deleteCopilotSession(session.id)}
                    onStartRename={() => {
                      setEditingSessionId(session.id);
                      setEditingTitle(session.title);
                    }}
                    isEditing={editingSessionId === session.id}
                    editingTitle={editingTitle}
                    setEditingTitle={setEditingTitle}
                    onRenameSubmit={(e) => handleRenameSubmit(e, session.id)}
                  />
                ))}
              </div>
            )}

            {/* Recent Section */}
            <div className="space-y-1">
              <span className="px-2 text-[10px] font-mono uppercase tracking-wider text-[#6F6A60] font-semibold">
                Conversations ({recentSessions.length})
              </span>
              {recentSessions.map((session) => (
                <SessionRow
                  key={session.id}
                  session={session}
                  isActive={session.id === activeSession.id}
                  onSelect={() => switchCopilotSession(session.id)}
                  onPin={() => pinCopilotSession(session.id)}
                  onDelete={() => deleteCopilotSession(session.id)}
                  onStartRename={() => {
                    setEditingSessionId(session.id);
                    setEditingTitle(session.title);
                  }}
                  isEditing={editingSessionId === session.id}
                  editingTitle={editingTitle}
                  setEditingTitle={setEditingTitle}
                  onRenameSubmit={(e) => handleRenameSubmit(e, session.id)}
                />
              ))}
            </div>
          </div>

          {/* User & AI Status Footer */}
          <div className="p-3 border-t border-[#E8E5DD] bg-white/70 space-y-2">
            <button
              onClick={() => setIsAiModalOpen(true)}
              className="w-full p-2 bg-[#FAF9F5] border border-[#E8E5DD] rounded-xl hover:border-[#C76A2A] transition-colors flex items-center justify-between text-left cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold text-[#1B1B1B]">{activeConfig.name}</span>
                  <span className="text-[9px] font-mono text-[#6F6A60]">{activeConfig.model}</span>
                </div>
              </div>
              <KeyRound className="w-3.5 h-3.5 text-[#6F6A60]" />
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* CENTER MAIN: Interactive Mentorship Workspace */}
        {/* ========================================================= */}
        <div className="flex-1 flex flex-col h-full bg-[#FCFBF8] min-w-0">
          
          {/* Top Bar: Mode Selector & Context Header */}
          <div className="p-3 border-b border-[#E8E5DD] bg-white flex items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-1.5 text-[#6F6A60] hover:text-[#1B1B1B] rounded-lg hover:bg-[#FAF9F5] transition-colors"
                title={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
              >
                {sidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>

              <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 max-w-full">
                {MENTOR_MODES.map((m) => {
                  const Icon = m.icon;
                  const isSelected = activeSession.mode === m.id;
                  return (
                    <button
                      key={m.id}
                      onClick={() => setCopilotMentorMode(m.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
                        isSelected
                          ? 'bg-[#1B1B1B] text-white shadow-xs'
                          : 'bg-[#FAF9F5] text-[#6F6A60] hover:text-[#1B1B1B] border border-[#E8E5DD] hover:border-[#C76A2A]'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{m.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={clearActiveSessionMessages}
                className="px-2.5 py-1.5 rounded-lg border border-[#E8E5DD] text-[11px] font-semibold text-[#6F6A60] hover:text-rose-600 hover:border-rose-200 transition-colors flex items-center gap-1"
                title="Clear current conversation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Clear</span>
              </button>

              <button
                onClick={() => setRightPanelOpen(!rightPanelOpen)}
                className={`p-1.5 rounded-lg border text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                  rightPanelOpen
                    ? 'bg-[#C76A2A] text-white border-[#C76A2A]'
                    : 'bg-[#FAF9F5] text-[#1B1B1B] border-[#E8E5DD] hover:border-[#C76A2A]'
                }`}
                title="Toggle Context Ledger"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span className="hidden md:inline">Context Radar</span>
              </button>
            </div>
          </div>

          {/* Context Banner */}
          <div className="px-4 py-2 bg-[#F6F4EE]/60 border-b border-[#E8E5DD] text-[11px] flex items-center justify-between text-[#6F6A60]">
            <div className="flex items-center gap-2 truncate">
              <Sparkles className="w-3.5 h-3.5 text-[#C76A2A] shrink-0" />
              <span className="truncate">
                Live Single Source of Truth: <strong>{displayName}</strong> • {branchName} @ {collegeName} • Builder Score <strong>{builderScore}/1000</strong>
              </span>
            </div>
            <span className="font-mono text-[10px] text-[#C76A2A] uppercase font-bold shrink-0">
              {activeSession.mode} mode
            </span>
          </div>

          {/* Message Stream */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            {activeSession.messages.map((msg, index) => {
              const isUser = msg.sender === 'user';
              return (
                <div
                  key={msg.id || index}
                  className={`flex items-start gap-3 max-w-3xl ${isUser ? 'ml-auto flex-row-reverse' : ''}`}
                >
                  {/* Avatar Badge */}
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
                      isUser
                        ? 'bg-[#1B1B1B] text-white'
                        : 'bg-[#C76A2A] text-white shadow-xs'
                    }`}
                  >
                    {isUser ? firstName.charAt(0) : <Bot className="w-4 h-4" />}
                  </div>

                  {/* Message Bubble */}
                  <div className={`space-y-2.5 max-w-[88%] ${isUser ? 'items-end' : ''}`}>
                    <div
                      className={`p-4 rounded-2xl text-xs ${
                        isUser
                          ? 'bg-[#1B1B1B] text-white shadow-xs rounded-tr-xs'
                          : 'bg-white border border-[#E8E5DD] shadow-xs rounded-tl-xs'
                      }`}
                    >
                      {isUser ? (
                        <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                      ) : msg.isStreaming && !msg.content ? (
                        <div className="flex items-center gap-2 py-1 text-[#6F6A60]">
                          <Loader2 className="w-4 h-4 animate-spin text-[#C76A2A]" />
                          <span className="font-mono text-[11px]">Analyzing your builder context with {activeConfig.name}...</span>
                        </div>
                      ) : (
                        <CopilotMarkdown content={msg.content} />
                      )}
                    </div>

                    {/* Suggested Follow-up Action Chips */}
                    {!isUser && msg.suggestedActions && msg.suggestedActions.length > 0 && !loading && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {msg.suggestedActions.map((action, actionIdx) => (
                          <button
                            key={actionIdx}
                            onClick={() => handleSendMessage(action)}
                            className="px-2.5 py-1 bg-white border border-[#E8E5DD] hover:border-[#C76A2A] hover:bg-[#FAF9F5] text-[11px] font-medium text-[#1B1B1B] rounded-lg transition-all flex items-center gap-1 shadow-2xs cursor-pointer"
                          >
                            <span>{action}</span>
                            <ChevronRight className="w-2.5 h-2.5 text-[#C76A2A]" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Bottom Chat Prompt Input */}
          <div className="p-3 sm:p-4 bg-white border-t border-[#E8E5DD] shrink-0 space-y-2">
            <div className="relative rounded-2xl border border-[#E8E5DD] bg-[#FAF9F5] focus-within:border-[#C76A2A] focus-within:bg-white transition-all shadow-xs">
              <textarea
                ref={textareaRef}
                value={inputQuery}
                onChange={(e) => {
                  setInputQuery(e.target.value);
                  e.target.style.height = 'auto';
                  e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder={`Ask your Personal AI Mentor (e.g. "What should I build next to reach 95% readiness for ${targetRole}?")`}
                rows={1}
                className="w-full pl-4 pr-12 py-3 bg-transparent text-xs text-[#1B1B1B] placeholder:text-[#6F6A60] focus:outline-none resize-none leading-relaxed"
              />

              <button
                type="button"
                onClick={() => handleSendMessage()}
                disabled={!inputQuery.trim() || loading}
                className="absolute right-2.5 bottom-2.5 p-2 bg-[#1B1B1B] text-white rounded-xl hover:bg-[#C76A2A] disabled:opacity-30 disabled:hover:bg-[#1B1B1B] transition-colors cursor-pointer"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </button>
            </div>

            <div className="flex items-center justify-between text-[10px] text-[#6F6A60] px-1 font-mono">
              <div className="flex items-center gap-2">
                <span>Press <strong>Enter</strong> to send • <strong>Shift + Enter</strong> for new line</span>
              </div>
              <span>Powered by {activeConfig.name}</span>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* RIGHT PANEL: Career Radar & Memory Drawer */}
        {/* ========================================================= */}
        <AnimatePresence>
          {rightPanelOpen && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 340, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="h-full bg-[#FAF9F5] border-l border-[#E8E5DD] flex flex-col shrink-0 overflow-hidden"
            >
              {/* Header */}
              <div className="p-3.5 border-b border-[#E8E5DD] flex items-center justify-between bg-white">
                <div className="flex items-center gap-1.5 font-bold text-xs">
                  <SlidersHorizontal className="w-4 h-4 text-[#C76A2A]" />
                  <span>Context Radar</span>
                </div>
                <button
                  onClick={() => setRightPanelOpen(false)}
                  className="p-1 text-[#6F6A60] hover:text-[#1B1B1B] rounded-md hover:bg-[#FAF9F5]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Tabs */}
              <div className="grid grid-cols-3 p-2 bg-white border-b border-[#E8E5DD] gap-1 text-[11px] font-semibold text-center">
                <button
                  onClick={() => setRightTab('readiness')}
                  className={`py-1.5 rounded-lg transition-colors ${
                    rightTab === 'readiness' ? 'bg-[#1B1B1B] text-white' : 'text-[#6F6A60] hover:text-[#1B1B1B]'
                  }`}
                >
                  Readiness
                </button>
                <button
                  onClick={() => setRightTab('memory')}
                  className={`py-1.5 rounded-lg transition-colors ${
                    rightTab === 'memory' ? 'bg-[#1B1B1B] text-white' : 'text-[#6F6A60] hover:text-[#1B1B1B]'
                  }`}
                >
                  Memory
                </button>
                <button
                  onClick={() => setRightTab('github')}
                  className={`py-1.5 rounded-lg transition-colors ${
                    rightTab === 'github' ? 'bg-[#1B1B1B] text-white' : 'text-[#6F6A60] hover:text-[#1B1B1B]'
                  }`}
                >
                  GitHub
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
                {rightTab === 'readiness' && (
                  <div className="space-y-4">
                    {/* Metrics card */}
                    <div className="p-4 bg-white rounded-xl border border-[#E8E5DD] space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] uppercase text-[#6F6A60]">Target Benchmark</span>
                        <span className="text-xs font-bold text-[#C76A2A]">{targetRole}</span>
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs font-semibold">
                          <span>Career Readiness</span>
                          <span className="text-[#2F7A45]">{context.readinessScore}%</span>
                        </div>
                        <div className="h-2 bg-[#F6F4EE] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#2F7A45] rounded-full transition-all"
                            style={{ width: `${context.readinessScore}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Missing Skills */}
                    <div className="p-4 bg-white rounded-xl border border-[#E8E5DD] space-y-2">
                      <span className="font-mono text-[10px] uppercase text-[#6F6A60] block">Priority Gaps to Close</span>
                      <div className="space-y-1.5">
                        {context.missingSkills.slice(0, 4).map((skill, i) => (
                          <div
                            key={i}
                            onClick={() => handleSendMessage(`How do I bridge my gap in ${skill}?`)}
                            className="p-2 bg-[#FAF9F5] border border-[#E8E5DD] hover:border-[#C76A2A] rounded-lg text-xs flex items-center justify-between cursor-pointer transition-colors"
                          >
                            <span className="font-semibold text-[#1B1B1B]">{skill}</span>
                            <span className="text-[10px] text-[#C76A2A] font-mono">+15 XP</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {rightTab === 'memory' && (
                  <div className="space-y-4">
                    <div className="p-4 bg-white rounded-xl border border-[#E8E5DD] space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] uppercase text-[#6F6A60]">Remembered Cues</span>
                        <button
                          onClick={clearCopilotMemory}
                          className="text-[10px] text-[#6F6A60] hover:text-rose-600 font-semibold"
                        >
                          Reset
                        </button>
                      </div>

                      <form onSubmit={handleAddMemory} className="flex gap-1.5">
                        <input
                          type="text"
                          value={newMemoryText}
                          onChange={(e) => setNewMemoryText(e.target.value)}
                          placeholder="Remember preference..."
                          className="flex-1 px-2.5 py-1 text-xs bg-[#FAF9F5] border border-[#E8E5DD] rounded-lg focus:outline-none"
                        />
                        <button type="submit" className="p-1.5 bg-[#1B1B1B] text-white rounded-lg">
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </form>

                      <div className="space-y-1.5 max-h-60 overflow-y-auto">
                        {copilotMemory?.items?.map((item) => (
                          <div key={item.id} className="p-2 bg-[#FAF9F5] border border-[#E8E5DD] rounded-lg text-xs space-y-0.5">
                            <span className="text-[9px] font-mono text-[#C76A2A] uppercase font-bold">{item.category}</span>
                            <p className="text-[11px] text-[#1B1B1B]">{item.content}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {rightTab === 'github' && (
                  <div className="space-y-4">
                    <div className="p-4 bg-white rounded-xl border border-[#E8E5DD] space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs">@{gitAnalysis.username}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#2F7A45]/10 text-[#2F7A45] font-bold">
                          {gitAnalysis.complexityScore}/100 Score
                        </span>
                      </div>

                      <div className="space-y-2">
                        <span className="font-mono text-[10px] uppercase text-[#6F6A60]">Extracted Strengths</span>
                        {gitAnalysis.strengthMap.slice(0, 2).map((s, idx) => (
                          <div key={idx} className="p-2 bg-[#FAF9F5] border border-[#E8E5DD] rounded-lg space-y-0.5">
                            <span className="font-bold text-[#1B1B1B] text-[11px] block">{s.area}</span>
                            <p className="text-[10px] text-[#6F6A60]">{s.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AIProviderModal isOpen={isAiModalOpen} onClose={() => setIsAiModalOpen(false)} />
    </PortalLayout>
  );
}

interface SessionRowProps {
  session: CopilotChatSession;
  isActive: boolean;
  onSelect: () => void;
  onPin: () => void;
  onDelete: () => void;
  onStartRename: () => void;
  isEditing: boolean;
  editingTitle: string;
  setEditingTitle: (v: string) => void;
  onRenameSubmit: (e: React.FormEvent) => void;
}

function SessionRow({
  session,
  isActive,
  onSelect,
  onPin,
  onDelete,
  onStartRename,
  isEditing,
  editingTitle,
  setEditingTitle,
  onRenameSubmit,
}: SessionRowProps) {
  if (isEditing) {
    return (
      <form onSubmit={onRenameSubmit} className="p-1">
        <input
          type="text"
          value={editingTitle}
          onChange={(e) => setEditingTitle(e.target.value)}
          autoFocus
          className="w-full px-2 py-1 bg-white border border-[#C76A2A] rounded-lg text-xs text-[#1B1B1B] focus:outline-none"
        />
      </form>
    );
  }

  return (
    <div
      onClick={onSelect}
      className={`group px-2.5 py-2 rounded-xl text-xs flex items-center justify-between gap-2 transition-all cursor-pointer ${
        isActive
          ? 'bg-white text-[#1B1B1B] font-bold border border-[#E8E5DD] shadow-2xs'
          : 'text-[#6F6A60] hover:text-[#1B1B1B] hover:bg-white/60'
      }`}
    >
      <div className="flex items-center gap-2 truncate min-w-0">
        <MessageSquare className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-[#C76A2A]' : 'text-[#6F6A60]'}`} />
        <span className="truncate">{session.title}</span>
      </div>

      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onPin();
          }}
          className="p-1 hover:text-[#C76A2A]"
          title={session.pinned ? 'Unpin' : 'Pin'}
        >
          {session.pinned ? <PinOff className="w-3 h-3" /> : <Pin className="w-3 h-3" />}
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onStartRename();
          }}
          className="p-1 hover:text-[#1B1B1B]"
          title="Rename"
        >
          <Edit2 className="w-3 h-3" />
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="p-1 hover:text-rose-600"
          title="Delete"
        >
          <Trash2 className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
