'use client';

import React, { useState, useEffect, useRef } from 'react';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { useAppStore } from '@/lib/store';
import { AIProviderModal } from '@/components/ai/AIProviderModal';
import { AIProvider, CopilotChatMessage, WeeklyMission } from '@/types';
import {
  analyzeStudentCareerContext,
  generateSmartCopilotResponse,
  ROLE_BENCHMARKS,
} from '@/lib/copilot-engine';
import {
  Sparkles,
  Bot,
  User,
  Send,
  Loader2,
  Compass,
  Target,
  Layers,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Award,
  Code,
  Briefcase,
  TrendingUp,
  Zap,
  HelpCircle,
  Plus,
  MessageSquare,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  RotateCcw,
  CheckSquare,
  Square,
  Activity,
  ArrowUpRight,
  Calendar,
  Flame,
} from 'lucide-react';

export default function CareerCopilotPage() {
  const { studentProfile, aiKeys, activeProvider, setActiveAIProvider } = useAppStore();
  const [targetRole, setTargetRole] = useState(studentProfile.targetRole || 'AI Engineer');
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeSessionId, setActiveSessionId] = useState('session-1');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Analyze student profile context
  const context = analyzeStudentCareerContext(studentProfile, targetRole);
  const [missions, setMissions] = useState<WeeklyMission[]>(context.weeklyMissions);

  // Update missions when targetRole changes
  useEffect(() => {
    setMissions(context.weeklyMissions);
  }, [targetRole]);

  // Initial chat history with rich student context greeting
  const [messages, setMessages] = useState<CopilotChatMessage[]>([
    {
      id: 'msg-init',
      sender: 'copilot',
      text: `Hello **${studentProfile.name.split(' ')[0]}**! 👋 I am your **SkillBridge Career Copilot 3.0**.\n\nI have ingested your **Academic Records** (${studentProfile.academic.year} ${studentProfile.academic.department}, CGPA: **${studentProfile.academic.cgpa}**), **Verified Skills** (${studentProfile.verifiedSkills.length} verified badges), and **Builder Score** (**${studentProfile.builderScores.overall}/1000**).\n\nYour current readiness for **${targetRole}** is **${context.readinessScore}%** (Industry Median: ${context.industryAvg}%).\n\nHow can I accelerate your trajectory today? You can ask me what to learn next, explore your 4-phase roadmap, check your weekly missions, or analyze skill gaps.`,
      timestamp: 'Just now',
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSendMessage = async (queryText?: string) => {
    const textToSend = (queryText || inputQuery).trim();
    if (!textToSend || loading) return;

    const userMsg: CopilotChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!queryText) setInputQuery('');
    setLoading(true);

    try {
      const activeKey = aiKeys[activeProvider];
      const response = await generateSmartCopilotResponse(
        textToSend,
        studentProfile,
        targetRole,
        activeProvider,
        activeKey
      );

      const copilotMsg: CopilotChatMessage = {
        id: `copilot-${Date.now()}`,
        sender: 'copilot',
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        structuredType: response.structuredType,
        structuredPayload: response.structuredPayload,
      };

      setMessages((prev) => [...prev, copilotMsg]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: `copilot-err-${Date.now()}`,
          sender: 'copilot',
          text: `⚠️ **Diagnostic Notice:** I encountered a temporary connection issue reaching the AI inference engine. However, based on your local database records, your readiness for **${targetRole}** is **${context.readinessScore}%**. Focus on **${context.missingSkills[0] || 'System Architecture'}** this week.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const toggleMission = (missionId: string) => {
    setMissions((prev) =>
      prev.map((m) => (m.id === missionId ? { ...m, completed: !m.completed } : m))
    );
  };

  const sampleRoles = Object.keys(ROLE_BENCHMARKS);

  const quickQuestions = [
    'What should I learn next?',
    'Am I ready for placements?',
    'What projects should I build?',
    'How can I become an AI Engineer?',
    'Which internship suits me?',
    'What skills am I missing?',
    'Why is my readiness score low?',
  ];

  const sessions = [
    { id: 'session-1', title: `${targetRole} Trajectory`, date: 'Active Now', count: messages.length },
    { id: 'session-2', title: 'Placement Mock Prep', date: 'Yesterday', count: 6 },
    { id: 'session-3', title: 'System Design Capstones', date: '3 days ago', count: 4 },
  ];

  const completedMissionsCount = missions.filter((m) => m.completed).length;

  return (
    <PortalLayout>
      <div className="space-y-4">
        {/* Top Header Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-xs">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-slate-900">Career Copilot 3.0</h1>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 uppercase tracking-wide">
                  Intelligence Engine
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Personalized career mentor analyzing academic, builder, and skill graphs in real time.
              </p>
            </div>
          </div>

          {/* AI Key & Role Controls */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setIsAiModalOpen(true)}
              className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span className="capitalize">{activeProvider} AI</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 font-bold">
                BYOK
              </span>
            </button>

            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1">
              <Target className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <select
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="text-xs font-semibold bg-transparent text-slate-900 focus:outline-none cursor-pointer"
              >
                {sampleRoles.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* 3-Column Modern Intelligence Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
          {/* LEFT COLUMN: Sessions, Memory & Quick Prompts Library */}
          <div className="lg:col-span-3 space-y-4">
            {/* Memory & Goal Snapshot */}
            <div className="saas-card p-4 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                  Copilot Memory
                </span>
                <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                  Live DB Synced
                </span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-600">
                  <span>Target Role:</span>
                  <strong className="text-slate-900 font-semibold">{targetRole}</strong>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>Academic Standing:</span>
                  <span className="font-semibold text-slate-900">
                    {studentProfile.academic.year} ({studentProfile.academic.cgpa} CGPA)
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>Builder Score:</span>
                  <strong className="text-blue-600 font-bold">
                    {studentProfile.builderScores.overall}/1000
                  </strong>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>Missions Completed:</span>
                  <span className="font-semibold text-emerald-600">
                    {completedMissionsCount} of {missions.length}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Prompts Library */}
            <div className="saas-card p-4 space-y-2.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 pb-1 border-b border-slate-100">
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                <span>Quick Prompt Library</span>
              </div>
              <div className="space-y-1.5">
                {quickQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(q)}
                    className="w-full text-left p-2 rounded-lg text-[11px] font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50/60 transition-all border border-transparent hover:border-blue-100 flex items-center justify-between group"
                  >
                    <span className="truncate">&quot;{q}&quot;</span>
                    <ChevronRight className="w-3 h-3 text-slate-300 group-hover:text-blue-500 shrink-0" />
                  </button>
                ))}
              </div>
            </div>

            {/* Conversation Sessions History */}
            <div className="saas-card p-4 space-y-2.5">
              <div className="flex items-center justify-between text-xs font-bold text-slate-900 pb-1 border-b border-slate-100">
                <span className="flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
                  <span>Session History</span>
                </span>
                <button
                  onClick={() => {
                    setMessages([
                      {
                        id: `msg-${Date.now()}`,
                        sender: 'copilot',
                        text: `Starting a fresh career session for **${targetRole}**. How can I assist you with your trajectory, projects, or placement readiness?`,
                        timestamp: 'Just now',
                      },
                    ]);
                  }}
                  className="p-1 hover:bg-slate-100 text-slate-500 hover:text-slate-800 rounded transition-colors"
                  title="New Session"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-1.5">
                {sessions.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setActiveSessionId(s.id)}
                    className={`w-full text-left p-2.5 rounded-lg text-xs transition-all border ${
                      activeSessionId === s.id
                        ? 'bg-blue-50/70 border-blue-200 text-blue-900 font-semibold'
                        : 'bg-white border-slate-100 hover:border-slate-200 text-slate-600'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-semibold truncate">{s.title}</span>
                      <span className="text-[10px] text-slate-400">{s.date}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* CENTER COLUMN: Live Interactive Chat Window */}
          <div className="lg:col-span-6 saas-card flex flex-col h-[760px] overflow-hidden border border-slate-200">
            {/* Chat Context Status Header */}
            <div className="px-5 py-3 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-slate-700">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-medium text-slate-600">
                  Target Context: <strong className="text-slate-900">{targetRole}</strong>
                </span>
                <span className="text-slate-300">|</span>
                <span className="text-[11px] text-slate-500">Readiness: {context.readinessScore}%</span>
              </div>
              <button
                onClick={() =>
                  setMessages([
                    {
                      id: `msg-${Date.now()}`,
                      sender: 'copilot',
                      text: `Dialogue refreshed. Ready to strategize for **${targetRole}**.`,
                      timestamp: 'Just now',
                    },
                  ])
                }
                className="text-slate-400 hover:text-slate-600 text-[11px] flex items-center gap-1 font-medium"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Chat</span>
              </button>
            </div>

            {/* Chat Messages Stream */}
            <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-slate-50/20">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'copilot' && (
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] rounded-xl p-4 text-xs space-y-3 leading-relaxed shadow-2xs ${
                      msg.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none'
                    }`}
                  >
                    {/* Message Text with Simple Markdown Handling */}
                    <div className="space-y-2 whitespace-pre-wrap">
                      {msg.text.split('\n\n').map((para, pIdx) => {
                        // Render bold and bullet points cleanly
                        if (para.startsWith('- ') || para.startsWith('1. ') || para.startsWith('2. ') || para.startsWith('3. ')) {
                          return (
                            <div key={pIdx} className="space-y-1 my-1">
                              {para.split('\n').map((line, lIdx) => (
                                <div key={lIdx} className="flex items-start gap-1.5">
                                  <span className="text-blue-500 font-bold shrink-0">•</span>
                                  <span
                                    dangerouslySetInnerHTML={{
                                      __html: line
                                        .replace(/^[-0-9.]+\s*/, '')
                                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'),
                                    }}
                                  />
                                </div>
                              ))}
                            </div>
                          );
                        }
                        if (para.startsWith('### ')) {
                          return (
                            <h4
                              key={pIdx}
                              className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-1 mt-2 mb-1"
                              dangerouslySetInnerHTML={{
                                __html: para.replace('### ', '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'),
                              }}
                            />
                          );
                        }
                        return (
                          <p
                            key={pIdx}
                            dangerouslySetInnerHTML={{
                              __html: para.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'),
                            }}
                          />
                        );
                      })}
                    </div>

                    {/* Structured Payload Rendering (Roadmap / GPS / Missions / Projects / Gaps / Opportunities) */}
                    {msg.structuredType === 'roadmap' && (
                      <div className="mt-3 space-y-2.5 pt-2 border-t border-slate-100">
                        {context.roadmapPhases.map((phase) => (
                          <div
                            key={phase.id}
                            className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-slate-900">
                                Phase {phase.phaseNumber}: {phase.title}
                              </span>
                              <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-700">
                                {phase.progressPercentage}% Complete
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-600">{phase.description}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {msg.structuredType === 'projects' && (
                      <div className="mt-3 space-y-2.5 pt-2 border-t border-slate-100">
                        {context.benchmark.recommendedProjects.map((proj, idx) => (
                          <div
                            key={idx}
                            className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1.5"
                          >
                            <div className="flex items-start justify-between gap-2">
                              <span className="font-bold text-slate-900">{proj.title}</span>
                              <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-blue-100 text-blue-800">
                                {proj.difficulty}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-600">{proj.description}</p>
                            <div className="flex flex-wrap gap-1">
                              {proj.techStack.map((tech) => (
                                <span
                                  key={tech}
                                  className="text-[9px] px-1.5 py-0.5 rounded bg-white border border-slate-200 font-mono text-slate-700"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {msg.structuredType === 'missions' && (
                      <div className="mt-3 space-y-2 pt-2 border-t border-slate-100">
                        {missions.map((m) => (
                          <div
                            key={m.id}
                            onClick={() => toggleMission(m.id)}
                            className={`p-2.5 rounded-lg border cursor-pointer flex items-center justify-between transition-all ${
                              m.completed
                                ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900'
                                : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              {m.completed ? (
                                <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0" />
                              ) : (
                                <Square className="w-4 h-4 text-slate-400 shrink-0" />
                              )}
                              <span
                                className={`text-xs ${
                                  m.completed ? 'line-through text-slate-500 font-normal' : 'font-semibold'
                                }`}
                              >
                                {m.title}
                              </span>
                            </div>
                            <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                              +{m.xpReward} XP
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div
                      className={`text-[10px] ${
                        msg.sender === 'user' ? 'text-blue-100' : 'text-slate-400'
                      } text-right`}
                    >
                      {msg.timestamp}
                    </div>
                  </div>

                  {msg.sender === 'user' && (
                    <div className="w-8 h-8 rounded-lg bg-slate-800 text-white flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}

              {loading && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-white border border-slate-200 rounded-xl p-4 text-xs text-slate-600 rounded-bl-none flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                    <span>Synthesizing student context &amp; skill graph...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Action Suggestion Chips */}
            <div className="px-5 py-2 bg-white border-t border-slate-100 flex items-center gap-2 overflow-x-auto no-scrollbar">
              <span className="text-[10px] text-slate-400 shrink-0 font-medium">Quick Actions:</span>
              <button
                onClick={() => handleSendMessage('Show my 4-phase roadmap for this role')}
                className="text-[11px] px-2.5 py-1 rounded-full bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 transition-colors shrink-0 font-medium border border-transparent hover:border-blue-200"
              >
                🗺️ 4-Phase Roadmap
              </button>
              <button
                onClick={() => handleSendMessage('Calculate my Career GPS trajectory and ETA')}
                className="text-[11px] px-2.5 py-1 rounded-full bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 transition-colors shrink-0 font-medium border border-transparent hover:border-blue-200"
              >
                🧭 Career GPS
              </button>
              <button
                onClick={() => handleSendMessage('What projects should I build for high ROI?')}
                className="text-[11px] px-2.5 py-1 rounded-full bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 transition-colors shrink-0 font-medium border border-transparent hover:border-blue-200"
              >
                🛠️ Project Blueprints
              </button>
              <button
                onClick={() => handleSendMessage('Give me my weekly missions')}
                className="text-[11px] px-2.5 py-1 rounded-full bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 transition-colors shrink-0 font-medium border border-transparent hover:border-blue-200"
              >
                🎯 Weekly Missions
              </button>
              <button
                onClick={() => handleSendMessage('Which internships and jobs match my profile?')}
                className="text-[11px] px-2.5 py-1 rounded-full bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 transition-colors shrink-0 font-medium border border-transparent hover:border-blue-200"
              >
                💼 Opportunity Match
              </button>
            </div>

            {/* Input Box */}
            <div className="p-4 bg-white border-t border-slate-200">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  placeholder={`Ask Copilot anything about becoming a top ${targetRole}...`}
                  className="flex-1 px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-600 text-slate-900"
                />
                <button
                  type="submit"
                  disabled={loading || !inputQuery.trim()}
                  className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors disabled:opacity-50 shrink-0 shadow-2xs"
                >
                  {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                  <span>Send</span>
                </button>
              </form>
            </div>
          </div>

          {/* RIGHT COLUMN: Real-Time Career Insights & Live Telemetry Panel */}
          <div className="lg:col-span-3 space-y-4">
            {/* Career Readiness Score Card */}
            <div className="saas-card p-4 space-y-3 bg-gradient-to-br from-slate-900 to-blue-950 text-white border-none shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  Readiness Score
                </span>
                <span className="text-[10px] font-semibold text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                  {context.readinessScore > context.industryAvg ? 'Above Average' : 'Target Growth'}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4 pt-1">
                <div>
                  <div className="text-4xl font-black tracking-tight text-white">
                    {context.readinessScore}%
                  </div>
                  <span className="text-[11px] text-slate-300 font-medium">
                    {targetRole}
                  </span>
                </div>

                <div className="text-right space-y-1 text-[11px] text-slate-300">
                  <div>
                    Industry Avg: <strong className="text-white">{context.industryAvg}%</strong>
                  </div>
                  <div>
                    Top Students: <strong className="text-emerald-400">{context.topStudentsScore}%</strong>
                  </div>
                </div>
              </div>

              {/* Progress bar comparison */}
              <div className="space-y-1.5 pt-1">
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-emerald-400 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${context.readinessScore}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Career GPS Trajectory */}
            <div className="saas-card p-4 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-blue-600" />
                  Career GPS
                </span>
                <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                  {context.careerGps.successProbability}% Success Prob
                </span>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 space-y-1">
                  <div className="text-[10px] text-slate-400 font-semibold uppercase">Current Origin</div>
                  <div className="font-bold text-slate-900">{context.careerGps.currentPosition}</div>
                </div>

                <div className="flex items-center justify-center">
                  <div className="text-[10px] font-mono font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                    Distance: {context.careerGps.distanceSkillsCount} Skills • ETA: {context.careerGps.estimatedMonths} Months
                  </div>
                </div>

                <div className="p-2.5 bg-blue-50/50 rounded-lg border border-blue-100 space-y-1">
                  <div className="text-[10px] text-blue-600 font-semibold uppercase">Destination Target</div>
                  <div className="font-bold text-slate-900">{context.careerGps.targetPosition}</div>
                </div>
              </div>
            </div>

            {/* Gap Analysis Summary */}
            <div className="saas-card p-4 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                  Gap Diagnosis
                </span>
                <span className="text-[10px] text-slate-500">
                  {context.missingSkills.length} Missing
                </span>
              </div>

              <div className="space-y-2">
                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                    Missing Skills
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {context.missingSkills.slice(0, 4).map((s, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-medium px-2 py-0.5 rounded bg-red-50 text-red-700 border border-red-200"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {context.weakSkills.length > 0 && (
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                      Needs Strengthening
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {context.weakSkills.slice(0, 3).map((w, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-medium px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200"
                        >
                          {w.skill} ({w.currentScore}%)
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Interactive Weekly Missions Checklist */}
            <div className="saas-card p-4 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Weekly Missions
                </span>
                <span className="text-[10px] font-bold text-slate-600">
                  {completedMissionsCount}/{missions.length}
                </span>
              </div>

              <div className="space-y-2">
                {missions.map((m) => (
                  <div
                    key={m.id}
                    onClick={() => toggleMission(m.id)}
                    className={`p-2 rounded-lg border text-xs cursor-pointer flex items-start gap-2 transition-all ${
                      m.completed
                        ? 'bg-emerald-50/40 border-emerald-200 text-emerald-950'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {m.completed ? (
                      <CheckSquare className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <Square className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1 min-w-0">
                      <div
                        className={`text-[11px] font-semibold truncate ${
                          m.completed ? 'line-through text-slate-400' : 'text-slate-800'
                        }`}
                      >
                        {m.title}
                      </div>
                      <div className="text-[10px] text-slate-400 flex items-center justify-between mt-0.5">
                        <span>{m.category}</span>
                        <span className="font-semibold text-blue-600">+{m.xpReward} XP</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Learning Velocity Score */}
            <div className="saas-card p-4 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-900 pb-1 border-b border-slate-100">
                <span className="flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
                  Learning Velocity
                </span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  {context.learningVelocity.percentileRank}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                <div className="p-2 bg-slate-50 rounded border border-slate-100">
                  <span className="text-slate-500 block text-[10px]">GitHub Growth</span>
                  <strong className="text-slate-900 font-bold">{context.learningVelocity.githubGrowthRate}</strong>
                </div>
                <div className="p-2 bg-slate-50 rounded border border-slate-100">
                  <span className="text-slate-500 block text-[10px]">Projects Built</span>
                  <strong className="text-slate-900 font-bold">{context.learningVelocity.projectsCompletedCount}</strong>
                </div>
              </div>
            </div>

            {/* Opportunity Match Preview */}
            <div className="saas-card p-4 space-y-2.5">
              <div className="flex items-center justify-between text-xs font-bold text-slate-900 pb-1 border-b border-slate-100">
                <span className="flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-indigo-600" />
                  Matched Openings
                </span>
                <span className="text-[10px] text-blue-600 font-semibold">
                  {context.opportunityMatches.length} Live
                </span>
              </div>
              <div className="space-y-2">
                {context.opportunityMatches.slice(0, 2).map((opp) => (
                  <div
                    key={opp.id}
                    className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{opp.title}</span>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                        {opp.matchScore}% Match
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-500">{opp.company} • {opp.type}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <AIProviderModal isOpen={isAiModalOpen} onClose={() => setIsAiModalOpen(false)} />
    </PortalLayout>
  );
}
