'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { useAppStore } from '@/lib/store';
import { AIProviderModal } from '@/components/ai/AIProviderModal';
import {
  CopilotChatMessage,
  WeeklyMission,
  CopilotAssistantMode,
  CopilotMemoryItem,
  GitHubProfileAnalysis,
} from '@/types';
import {
  analyzeStudentCareerContext,
  generateSmartCopilotResponse,
  analyzeGitHubProfileDeeply,
  ROLE_BENCHMARKS,
} from '@/lib/copilot-engine';
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
  RefreshCw,
  ExternalLink,
  Award,
} from 'lucide-react';

export default function CareerCopilotPage() {
  const {
    studentProfile,
    aiKeys,
    activeProvider,
    githubData,
    copilotMemory,
    updateCopilotMemory,
    addCopilotMemoryItem,
    clearCopilotMemory,
    xp,
    level,
    streakDays,
  } = useAppStore();

  const [activeMode, setActiveMode] = useState<CopilotAssistantMode>('career');
  const [rightTab, setRightTab] = useState<'readiness' | 'memory' | 'github'>('readiness');
  const [targetRole, setTargetRole] = useState(
    studentProfile.careerPath || studentProfile.targetRole || 'Software Development'
  );
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [newMemoryText, setNewMemoryText] = useState('');
  const [newMemoryCategory, setNewMemoryCategory] = useState<CopilotMemoryItem['category']>('goal');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Analyze student profile context
  const context = analyzeStudentCareerContext(studentProfile, targetRole);
  const [missions, setMissions] = useState<WeeklyMission[]>(context.weeklyMissions);

  // GitHub deep analysis
  const [gitAnalysis, setGitAnalysis] = useState<GitHubProfileAnalysis>(() =>
    analyzeGitHubProfileDeeply(githubData, studentProfile)
  );

  useEffect(() => {
    setMissions(context.weeklyMissions);
  }, [targetRole]);

  useEffect(() => {
    setGitAnalysis(analyzeGitHubProfileDeeply(githubData, studentProfile));
  }, [githubData, studentProfile]);

  const firstName = studentProfile?.name?.split(' ')[0] || 'Builder';
  const collegeName = studentProfile?.academic?.college || studentProfile?.college || 'HITAM';
  const builderScore = studentProfile?.builderScores?.overall || 785;
  const currentGoal = studentProfile?.careerGoal || 'Internship';

  // Initial personalized messages
  const [messages, setMessages] = useState<CopilotChatMessage[]>([
    {
      id: 'msg-init',
      sender: 'copilot',
      mode: 'career',
      text: `Hello **${firstName}**! I am your **Personal AI Career Copilot 2.0**.\n\nI have loaded your complete builder context from **${collegeName}**:\n- **Target Career Path:** **${targetRole}**\n- **Primary Goal:** **${currentGoal}**\n- **Builder Score:** **${builderScore} / 1000** (Level ${level} • ${xp} XP • ${streakDays}-day streak)\n- **Readiness Index:** **${context.readinessScore}%** (Benchmark: ${context.industryAvg}%)\n\nI retain persistent memory across your goals and project ideas. Select an assistant mode above or ask me anything to accelerate your trajectory!`,
      timestamp: 'Just now',
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSendMessage = async (queryText?: string, overrideMode?: CopilotAssistantMode) => {
    const textToSend = (queryText || inputQuery).trim();
    if (!textToSend || loading) return;

    const currentMode = overrideMode || activeMode;

    const userMsg: CopilotChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      mode: currentMode,
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
        activeKey,
        currentMode,
        copilotMemory,
        githubData
      );

      const copilotMsg: CopilotChatMessage = {
        id: `copilot-${Date.now()}`,
        sender: 'copilot',
        text: response.text,
        mode: currentMode,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        structuredType: response.structuredType,
        structuredPayload: response.structuredPayload,
      };

      setMessages((prev) => [...prev, copilotMsg]);

      if (response.memoryUpdate) {
        updateCopilotMemory(response.memoryUpdate);
      }
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: `copilot-err-${Date.now()}`,
          sender: 'copilot',
          mode: currentMode,
          text: `Based on your profile data, your readiness for **${targetRole}** is **${context.readinessScore}%**. Bridging **${context.missingSkills[0] || 'System Design'}** is your highest ROI step this week.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemoryText.trim()) return;
    addCopilotMemoryItem({
      category: newMemoryCategory,
      content: newMemoryText.trim(),
      relevance: 9,
    });
    setNewMemoryText('');
  };

  const toggleMission = (missionId: string) => {
    setMissions((prev) =>
      prev.map((m) => (m.id === missionId ? { ...m, completed: !m.completed } : m))
    );
  };

  const sampleRoles = Object.keys(ROLE_BENCHMARKS);

  // 5 Assistant Modes Configuration
  const modesConfig: {
    id: CopilotAssistantMode;
    label: string;
    icon: React.ReactNode;
    tagline: string;
    quickPrompts: { label: string; query: string }[];
  }[] = [
    {
      id: 'career',
      label: 'Career Strategy',
      icon: <Briefcase className="w-4 h-4" />,
      tagline: 'Internship positioning, placement defense & job readiness',
      quickPrompts: [
        { label: '🎯 Strategic Career Playbook', query: `Give me a strategic career playbook for ${targetRole}` },
        { label: '💼 Matched Internships', query: `What tier-1 internships match my current ${builderScore} builder score?` },
        { label: '📊 Placement Readiness Audit', query: `Audit my placement readiness and show probability of success.` },
        { label: '🚀 6-Month Trajectory', query: `Build my 6-month career roadmap toward becoming an industry-ready ${targetRole}.` },
      ],
    },
    {
      id: 'learning',
      label: 'Learning & Skills',
      icon: <BookOpen className="w-4 h-4" />,
      tagline: 'Adaptive study plans, skill gap bridging & curated roadmap milestones',
      quickPrompts: [
        { label: '🔍 Diagnose Top Skill Gaps', query: `Diagnose my exact skill gaps for ${targetRole} and rank them by ROI.` },
        { label: '📚 Step-by-Step Study Plan', query: `Generate a 4-week step-by-step study plan for ${context.missingSkills[0] || 'System Architecture'}.` },
        { label: '⚡ Highest ROI Skill', query: `What single skill will raise my readiness score the most right now?` },
        { label: '🏆 Assessment Prep', query: `How should I prepare to score 90%+ in the next SkillBridge assessment?` },
      ],
    },
    {
      id: 'projects',
      label: 'Projects & Architecture',
      icon: <Code2 className="w-4 h-4" />,
      tagline: 'High-leverage capstone blueprints, system design & tech stack recommendations',
      quickPrompts: [
        { label: '🛠️ Recommend Capstone Projects', query: `Suggest 3 production-grade capstone projects for ${targetRole} with system architectures.` },
        { label: '📐 Architecture Review', query: `How should I architect a high-throughput microservice backend in Go/TypeScript?` },
        { label: '💡 Tech Stack Recommendations', query: `What modern tech stack gives me the highest hiring leverage in 2026?` },
        { label: '📦 Production Readiness Checklist', query: `Give me a production readiness checklist for my portfolio project.` },
      ],
    },
    {
      id: 'interview',
      label: 'Interview Prep',
      icon: <Mic className="w-4 h-4" />,
      tagline: 'Technical screening drills, system design mock interviews & STAR resume defense',
      quickPrompts: [
        { label: '🎙️ Technical Screening Questions', query: `Simulate a tier-1 technical screening for a junior ${targetRole} position.` },
        { label: '🧠 System Design Mock', query: `Conduct a system design interview with me on designing a distributed cache.` },
        { label: '📝 Resume Bullets Defense', query: `How do I write high-impact STAR resume bullets for my verified projects?` },
        { label: '⚡ Live Problem Solving', query: `Give me 3 algorithmic problem patterns I must master this week.` },
      ],
    },
    {
      id: 'productivity',
      label: 'Productivity & Goals',
      icon: <Zap className="w-4 h-4" />,
      tagline: 'Weekly goal tracking, daily task schedules & builder streak acceleration',
      quickPrompts: [
        { label: '📅 Weekly Execution Plan', query: `Build a daily time-blocked schedule for this week to maximize my XP and readiness.` },
        { label: '🔥 Streak Maintenance', query: `What is the highest priority 45-minute task I can complete today?` },
        { label: '📈 Weekly Growth Report', query: `Generate my comprehensive weekly growth report and builder progress summary.` },
        { label: '🎯 Milestone Breakdown', query: `Break down my next level milestone into bite-sized actionable tasks.` },
      ],
    },
  ];

  const currentModeObj = modesConfig.find((m) => m.id === activeMode) || modesConfig[0];
  const completedMissionsCount = missions.filter((m) => m.completed).length;

  return (
    <PortalLayout>
      <div className="space-y-6 max-w-[1340px] mx-auto pb-14">
        {/* Top Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#E8E5DD]">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C76A2A] animate-pulse" />
              <h1 className="text-2xl font-bold text-[#1B1B1B] tracking-tight flex items-center gap-2">
                AI Career Copilot <span className="text-xs px-2 py-0.5 rounded-full bg-[#1B1B1B] text-white font-mono">v2.0</span>
              </h1>
            </div>
            <p className="text-xs text-[#6F6A60] mt-0.5">
              Personalized AI Mentor calibrated continuously on your Builder Profile, GitHub Activity, and Persistent Memory.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Target Role Selector */}
            <div className="flex items-center gap-2 bg-white border border-[#E8E5DD] rounded-xl px-3.5 py-1.5 shadow-none">
              <Target className="w-3.5 h-3.5 text-[#C76A2A]" />
              <span className="text-xs text-[#6F6A60] font-medium">Path:</span>
              <select
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="text-xs font-semibold text-[#1B1B1B] bg-transparent focus:outline-none cursor-pointer"
              >
                {sampleRoles.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            {/* API Key Modal Button */}
            <button
              onClick={() => setIsAiModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-[#FAF9F5] border border-[#E8E5DD] rounded-xl text-xs font-semibold text-[#1B1B1B] transition-all shadow-none cursor-pointer"
            >
              <KeyRound className="w-3.5 h-3.5 text-[#C76A2A]" />
              <span className="capitalize">{activeProvider} API</span>
              {aiKeys.gemini ? (
                <span className="w-1.5 h-1.5 rounded-full bg-[#2F7A45]" />
              ) : (
                <span className="w-1.5 h-1.5 rounded-full bg-[#C76A2A]" />
              )}
            </button>
          </div>
        </div>

        {/* PROACTIVE INTELLIGENCE BANNER */}
        <div className="bg-white border border-[#E8E5DD] rounded-2xl p-4 shadow-none">
          <div className="flex items-center justify-between pb-3 border-b border-[#E8E5DD] text-xs">
            <div className="flex items-center gap-2 font-bold text-[#1B1B1B]">
              <Sparkles className="w-4 h-4 text-[#C76A2A]" />
              <span>Proactive Growth Intelligence</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FAF9F5] border border-[#E8E5DD] text-[#6F6A60]">
                Live Evaluation
              </span>
            </div>
            <span className="text-[11px] text-[#6F6A60]">Updated automatically from your profile</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 pt-3">
            {/* 1. Growth Report */}
            <div
              onClick={() => handleSendMessage('Generate my comprehensive weekly growth report')}
              className="p-3 bg-[#FAF9F5] hover:bg-[#F6F4EE] border border-[#E8E5DD] rounded-xl transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between text-xs font-semibold text-[#1B1B1B] mb-1">
                <span className="flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-[#2F7A45]" />
                  Growth Velocity
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-[#6F6A60] group-hover:translate-x-0.5 transition-transform" />
              </div>
              <p className="text-[11px] text-[#6F6A60] leading-snug">
                Level {level} • {streakDays}-day active streak. Velocity in top 10%.
              </p>
            </div>

            {/* 2. Skill Gap Alert */}
            <div
              onClick={() => handleSendMessage(`What should I do to bridge my skill gap in ${context.missingSkills[0] || 'System Design'}?`)}
              className="p-3 bg-[#FAF9F5] hover:bg-[#F6F4EE] border border-[#E8E5DD] rounded-xl transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between text-xs font-semibold text-[#1B1B1B] mb-1">
                <span className="flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-[#C76A2A]" />
                  Skill Gap Alert
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-[#6F6A60] group-hover:translate-x-0.5 transition-transform" />
              </div>
              <p className="text-[11px] text-[#6F6A60] leading-snug">
                Missing: <strong className="text-[#1B1B1B]">{context.missingSkills[0] || 'Distributed Caching'}</strong>. High impact on readiness.
              </p>
            </div>

            {/* 3. Next Milestone */}
            <div
              onClick={() => handleSendMessage(`Break down the requirements for my next milestone in ${targetRole}`)}
              className="p-3 bg-[#FAF9F5] hover:bg-[#F6F4EE] border border-[#E8E5DD] rounded-xl transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between text-xs font-semibold text-[#1B1B1B] mb-1">
                <span className="flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-[#1B1B1B]" />
                  Next Milestone
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-[#6F6A60] group-hover:translate-x-0.5 transition-transform" />
              </div>
              <p className="text-[11px] text-[#6F6A60] leading-snug">
                Pass verified assessment with &ge;80% score to reach Top 3% tier.
              </p>
            </div>

            {/* 4. GitHub Improvement */}
            <div
              onClick={() => handleSendMessage('Review my GitHub profile and suggest specific repository README improvements')}
              className="p-3 bg-[#FAF9F5] hover:bg-[#F6F4EE] border border-[#E8E5DD] rounded-xl transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between text-xs font-semibold text-[#1B1B1B] mb-1">
                <span className="flex items-center gap-1.5">
                  <GitBranch className="w-3.5 h-3.5 text-[#1B1B1B]" />
                  GitHub Polish
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-[#6F6A60] group-hover:translate-x-0.5 transition-transform" />
              </div>
              <p className="text-[11px] text-[#6F6A60] leading-snug">
                Add architecture diagrams and benchmark latency charts to pinned repos.
              </p>
            </div>
          </div>
        </div>

        {/* 5 ASSISTANT MODE SELECTOR TABS */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {modesConfig.map((m) => {
            const isSelected = activeMode === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setActiveMode(m.id)}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#1B1B1B] text-white border-[#1B1B1B]'
                    : 'bg-white hover:bg-[#FAF9F5] border-[#E8E5DD] text-[#1B1B1B]'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className={isSelected ? 'text-[#C76A2A]' : 'text-[#6F6A60]'}>
                    {m.icon}
                  </span>
                  <span className="text-xs font-bold">{m.label}</span>
                </div>
                <p className={`text-[10px] line-clamp-1 ${isSelected ? 'text-white/70' : 'text-[#6F6A60]'}`}>
                  {m.tagline}
                </p>
              </button>
            );
          })}
        </div>

        {/* 2-Column Experience: Conversation + Dynamic Insights / Memory / GitHub Engine */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* CENTER / LEFT: Copilot Interactive Chat Stream */}
          <div className="lg:col-span-8 flex flex-col h-[760px] bg-white border border-[#E8E5DD] rounded-2xl shadow-none overflow-hidden">
            {/* Mode Sub-Header */}
            <div className="px-6 py-3 border-b border-[#E8E5DD] bg-[#FAF9F5] flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-[#6F6A60]">
                <span className="font-semibold text-[#1B1B1B] flex items-center gap-1.5">
                  {currentModeObj.icon}
                  {currentModeObj.label} Mode
                </span>
                <span>•</span>
                <span className="text-xs font-mono">{context.readinessScore}% Ready</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() =>
                    setMessages([
                      {
                        id: `msg-${Date.now()}`,
                        sender: 'copilot',
                        mode: activeMode,
                        text: `Switched to **${currentModeObj.label} Mode**. Context calibrated for **${targetRole}**. What would you like to explore?`,
                        timestamp: 'Just now',
                      },
                    ])
                  }
                  className="text-[#6F6A60] hover:text-[#1B1B1B] flex items-center gap-1 font-medium transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Clear</span>
                </button>
              </div>
            </div>

            {/* Chat Feed */}
            <div className="flex-1 p-6 overflow-y-auto space-y-5 bg-[#FAF9F5]/30">
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.sender === 'copilot' && (
                      <div className="w-7 h-7 rounded-xl bg-[#1B1B1B] text-white flex items-center justify-center shrink-0 text-xs font-bold mt-1 shadow-none">
                        SB
                      </div>
                    )}

                    <div
                      className={`max-w-[85%] rounded-2xl p-4 text-xs leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-[#1B1B1B] text-white rounded-br-xs'
                          : 'bg-white text-[#1B1B1B] border border-[#E8E5DD] rounded-bl-xs shadow-none'
                      }`}
                    >
                      <div className="space-y-2 whitespace-pre-wrap">
                        {msg.text.split('\n\n').map((para, pIdx) => {
                          if (
                            para.startsWith('- ') ||
                            para.startsWith('1. ') ||
                            para.startsWith('2. ') ||
                            para.startsWith('3. ') ||
                            para.startsWith('4. ')
                          ) {
                            return (
                              <div key={pIdx} className="space-y-1.5 my-2 pl-1">
                                {para.split('\n').map((line, lIdx) => (
                                  <div key={lIdx} className="flex items-start gap-2">
                                    <span className="text-[#C76A2A] font-bold text-xs mt-0.5">•</span>
                                    <span
                                      dangerouslySetInnerHTML={{
                                        __html: line
                                          .replace(/^[-0-9.]+\s*/, '')
                                          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                          .replace(/\*(.*?)\*/g, '<em>$1</em>'),
                                      }}
                                    />
                                  </div>
                                ))}
                              </div>
                            );
                          }
                          return (
                            <p
                              key={pIdx}
                              dangerouslySetInnerHTML={{
                                __html: para
                                  .replace(/^### (.*$)/gim, '<strong class="block text-sm font-bold text-[#1B1B1B] pt-1 pb-0.5">$1</strong>')
                                  .replace(/^#### (.*$)/gim, '<strong class="block text-xs font-bold text-[#1B1B1B] pt-1">$1</strong>')
                                  .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                  .replace(/\*(.*?)\*/g, '<em>$1</em>'),
                              }}
                            />
                          );
                        })}
                      </div>

                      {/* Structured Roadmap */}
                      {msg.structuredType === 'roadmap' && (
                        <div className="mt-3 space-y-2 pt-3 border-t border-[#E8E5DD]">
                          {context.roadmapPhases.map((phase) => (
                            <div
                              key={phase.id}
                              className="p-3 bg-[#FAF9F5] border border-[#E8E5DD] rounded-xl space-y-1"
                            >
                              <div className="flex items-center justify-between text-xs">
                                <span className="font-semibold text-[#1B1B1B]">
                                  Phase {phase.phaseNumber}: {phase.title}
                                </span>
                                <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#C76A2A]/10 text-[#C76A2A]">
                                  {phase.duration}
                                </span>
                              </div>
                              <p className="text-xs text-[#6E6E6A]">{phase.description}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Structured Projects */}
                      {msg.structuredType === 'projects' && (
                        <div className="mt-3 space-y-2 pt-3 border-t border-[#E8E5DD]">
                          {context.benchmark.recommendedProjects.map((proj, idx) => (
                            <div
                              key={idx}
                              className="p-3 bg-[#FAF9F5] border border-[#E8E5DD] rounded-xl space-y-1.5"
                            >
                              <div className="flex items-center justify-between text-xs">
                                <span className="font-semibold text-[#1B1B1B]">{proj.title}</span>
                                <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-white border border-[#E8E5DD] text-[#6E6E6A]">
                                  {proj.difficulty}
                                </span>
                              </div>
                              <p className="text-xs text-[#6E6E6A]">{proj.description}</p>
                              <div className="flex flex-wrap gap-1 pt-1">
                                {proj.techStack.map((tech) => (
                                  <span
                                    key={tech}
                                    className="text-[10px] px-2 py-0.5 rounded bg-white border border-[#E8E5DD] text-[#1B1B1B] font-mono"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Structured Opportunities */}
                      {msg.structuredType === 'opportunities' && (
                        <div className="mt-3 space-y-2 pt-3 border-t border-[#E8E5DD]">
                          {context.opportunityMatches.map((opp) => (
                            <div
                              key={opp.id}
                              className="p-3 bg-[#FAF9F5] border border-[#E8E5DD] rounded-xl space-y-1"
                            >
                              <div className="flex items-center justify-between text-xs">
                                <span className="font-semibold text-[#1B1B1B]">
                                  {opp.title} — {opp.company}
                                </span>
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#2F7A45]/10 text-[#2F7A45]">
                                  {opp.matchScore}% Match
                                </span>
                              </div>
                              <p className="text-[11px] text-[#6E6E6A]">{opp.matchReasons[0]}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      <div
                        className={`text-[10px] mt-2 font-mono ${
                          msg.sender === 'user' ? 'text-white/60' : 'text-[#6E6E6A]'
                        } text-right flex items-center justify-between`}
                      >
                        <span className="capitalize">{msg.mode || activeMode}</span>
                        <span>{msg.timestamp}</span>
                      </div>
                    </div>

                    {msg.sender === 'user' && (
                      <div className="w-7 h-7 rounded-full bg-[#E8E5DD] text-[#1B1B1B] flex items-center justify-center shrink-0 text-xs font-medium mt-1">
                        {studentProfile.name ? studentProfile.name.charAt(0) : 'U'}
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              {loading && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3 justify-start"
                >
                  <div className="w-7 h-7 rounded-xl bg-[#1B1B1B] text-white flex items-center justify-center shrink-0 text-xs font-bold mt-1 shadow-none">
                    SB
                  </div>
                  <div className="bg-white border border-[#E8E5DD] rounded-2xl rounded-bl-xs p-4 text-xs text-[#6F6A60] flex items-center gap-2 shadow-none">
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-[#C76A2A]" />
                    <span>Analyzing your verified builder profile and synthesizing response...</span>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts for Current Mode */}
            <div className="px-6 py-2.5 bg-white border-t border-[#E8E5DD] flex items-center gap-2 overflow-x-auto no-scrollbar">
              <span className="text-[11px] text-[#6F6A60] shrink-0 font-medium">Quick Prompts:</span>
              {currentModeObj.quickPrompts.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(item.query)}
                  className="text-xs px-3 py-1 rounded-xl bg-[#FAF9F5] hover:bg-[#F6F4EE] text-[#1B1B1B] border border-[#E8E5DD] hover:border-[#C76A2A] transition-all shrink-0 font-medium cursor-pointer whitespace-nowrap"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Message Input Box */}
            <div className="p-4 bg-white border-t border-[#E8E5DD]">
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
                  placeholder={`Ask in ${currentModeObj.label} mode (e.g. "What should I learn next?", "Mock interview me")...`}
                  className="flex-1 px-4 py-2.5 text-xs bg-[#FAF9F5] border border-[#E8E5DD] rounded-xl focus:outline-none focus:bg-white focus:border-[#C76A2A] text-[#1B1B1B] placeholder:text-[#6F6A60] transition-all"
                />
                <button
                  type="submit"
                  disabled={loading || !inputQuery.trim()}
                  className="px-4 py-2.5 bg-[#C76A2A] hover:bg-[#B55D22] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all disabled:opacity-40 shrink-0 cursor-pointer shadow-none"
                >
                  {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                  <span>Send</span>
                </button>
              </form>
            </div>
          </div>

          {/* RIGHT COLUMN: Tabbed Intelligence Panel (Profile Readiness | Persistent Memory | GitHub Analysis) */}
          <div className="lg:col-span-4 space-y-4">
            {/* Right Panel Tabs */}
            <div className="flex items-center p-1 bg-white border border-[#E8E5DD] rounded-2xl">
              <button
                onClick={() => setRightTab('readiness')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  rightTab === 'readiness'
                    ? 'bg-[#1B1B1B] text-white'
                    : 'text-[#6F6A60] hover:text-[#1B1B1B]'
                }`}
              >
                Readiness
              </button>
              <button
                onClick={() => setRightTab('memory')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1 ${
                  rightTab === 'memory'
                    ? 'bg-[#1B1B1B] text-white'
                    : 'text-[#6F6A60] hover:text-[#1B1B1B]'
                }`}
              >
                <Brain className="w-3.5 h-3.5" />
                Memory
              </button>
              <button
                onClick={() => setRightTab('github')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1 ${
                  rightTab === 'github'
                    ? 'bg-[#1B1B1B] text-white'
                    : 'text-[#6F6A60] hover:text-[#1B1B1B]'
                }`}
              >
                <GitBranch className="w-3.5 h-3.5" />
                GitHub
              </button>
            </div>

            {/* TAB 1: Profile & Readiness */}
            {rightTab === 'readiness' && (
              <div className="space-y-4">
                {/* 1. Readiness Index */}
                <div className="bg-white p-5 rounded-2xl border border-[#E8E5DD] shadow-none space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-wider text-[#6F6A60]">
                      Career Readiness Index
                    </span>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#2F7A45]/10 text-[#2F7A45]">
                      Top Tier
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <div className="text-3xl font-bold text-[#1B1B1B]">
                      {context.readinessScore}%
                    </div>
                    <div className="text-xs text-[#6F6A60]">
                      Target: <strong className="text-[#1B1B1B]">{targetRole}</strong>
                    </div>
                  </div>
                  <div className="w-full bg-[#FAF9F5] rounded-full h-1.5 overflow-hidden border border-[#E8E5DD]">
                    <div
                      className="bg-[#C76A2A] h-1.5 rounded-full transition-all duration-700"
                      style={{ width: `${context.readinessScore}%` }}
                    />
                  </div>
                </div>

                {/* 2. Builder Profile Context Card */}
                <div className="bg-white p-5 rounded-2xl border border-[#E8E5DD] shadow-none space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-wider text-[#6F6A60]">
                      Builder Context
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#1B1B1B] text-white font-mono">
                      Level {level}
                    </span>
                  </div>
                  <div className="pt-1">
                    <h3 className="text-sm font-bold text-[#1B1B1B]">{studentProfile.name}</h3>
                    <p className="text-xs text-[#6E6E6A] mt-0.5">
                      {studentProfile.degree || studentProfile.academic?.degree || 'B.Tech'} in {studentProfile.academic?.department || studentProfile.branch || 'CSE'} • {collegeName}
                    </p>
                    <div className="flex items-center justify-between pt-2 border-t border-[#E8E5DD] mt-2 text-xs">
                      <span className="text-[#6E6E6A]">Builder Score:</span>
                      <strong className="text-[#1B1B1B] font-mono">{builderScore} / 1000</strong>
                    </div>
                    <div className="flex items-center justify-between pt-1 text-xs">
                      <span className="text-[#6E6E6A]">Primary Goal:</span>
                      <strong className="text-[#C76A2A]">{currentGoal}</strong>
                    </div>
                  </div>
                </div>

                {/* 3. Skill Gaps */}
                <div className="bg-white p-5 rounded-2xl border border-[#E8E5DD] shadow-none space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-wider text-[#6F6A60]">
                      Skill Gaps to Close
                    </span>
                    <span className="text-xs text-[#C76A2A] font-semibold">High ROI</span>
                  </div>
                  <div className="space-y-2">
                    {context.missingSkills.slice(0, 3).map((skill, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-xl bg-[#FAF9F5] border border-[#E8E5DD] flex items-center justify-between text-xs"
                      >
                        <span className="font-semibold text-[#1B1B1B]">{skill}</span>
                        <span className="text-[10px] text-[#C76A2A] font-mono font-semibold">+18% readiness</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. Weekly Missions */}
                <div className="bg-white p-5 rounded-2xl border border-[#E8E5DD] shadow-none space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-wider text-[#6F6A60]">
                      Weekly Action Plan
                    </span>
                    <span className="text-xs font-mono text-[#1B1B1B] font-semibold">
                      {completedMissionsCount} of {missions.length} Done
                    </span>
                  </div>

                  <div className="space-y-2">
                    {missions.map((m) => (
                      <div
                        key={m.id}
                        onClick={() => toggleMission(m.id)}
                        className={`p-2.5 rounded-xl border text-xs cursor-pointer flex items-center gap-2.5 transition-all ${
                          m.completed
                            ? 'bg-[#FAF9F5] border-[#E8E5DD] text-[#6F6A60]'
                            : 'bg-white border-[#E8E5DD] hover:border-[#C76A2A] text-[#1B1B1B]'
                        }`}
                      >
                        {m.completed ? (
                          <CheckCircle2 className="w-4 h-4 text-[#2F7A45] shrink-0" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-[#E8E5DD] shrink-0" />
                        )}
                        <span className={`text-xs flex-1 ${m.completed ? 'line-through text-[#6F6A60]' : 'font-medium'}`}>
                          {m.title}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: Persistent GPT Memory Layer */}
            {rightTab === 'memory' && (
              <div className="space-y-4">
                <div className="bg-white p-5 rounded-2xl border border-[#E8E5DD] shadow-none space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#1B1B1B]">
                      <Brain className="w-4 h-4 text-[#C76A2A]" />
                      <span>Persistent Copilot Memory</span>
                    </div>
                    <button
                      onClick={clearCopilotMemory}
                      className="text-[11px] text-[#6F6A60] hover:text-[#C76A2A] flex items-center gap-1 font-medium transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Reset</span>
                    </button>
                  </div>
                  <p className="text-xs text-[#6F6A60]">
                    The Copilot remembers these preferences across your sessions to tailor future answers.
                  </p>

                  {/* Add memory cue form */}
                  <form onSubmit={handleAddMemory} className="pt-2 space-y-2">
                    <div className="flex gap-2">
                      <select
                        value={newMemoryCategory}
                        onChange={(e) => setNewMemoryCategory(e.target.value as any)}
                        className="text-[11px] bg-[#FAF9F5] border border-[#E8E5DD] rounded-xl px-2 py-1.5 text-[#1B1B1B] font-medium focus:outline-none"
                      >
                        <option value="goal">Goal</option>
                        <option value="tech_stack">Tech Stack</option>
                        <option value="learning_plan">Learning Plan</option>
                        <option value="project_idea">Project Idea</option>
                        <option value="weakness">Weakness</option>
                        <option value="strength">Strength</option>
                      </select>
                      <input
                        type="text"
                        placeholder="Add memory cue (e.g., 'Targeting Go backends')..."
                        value={newMemoryText}
                        onChange={(e) => setNewMemoryText(e.target.value)}
                        className="flex-1 px-3 py-1.5 text-xs bg-[#FAF9F5] border border-[#E8E5DD] rounded-xl focus:outline-none text-[#1B1B1B]"
                      />
                      <button
                        type="submit"
                        className="p-1.5 bg-[#1B1B1B] text-white rounded-xl text-xs hover:bg-[#C76A2A] transition-colors cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </form>
                </div>

                {/* Memory Items List */}
                <div className="bg-white p-5 rounded-2xl border border-[#E8E5DD] shadow-none space-y-3">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#6F6A60]">
                    Remembered Items ({copilotMemory?.items?.length || 0})
                  </span>

                  <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
                    {copilotMemory?.items?.map((item) => (
                      <div
                        key={item.id}
                        className="p-3 rounded-xl bg-[#FAF9F5] border border-[#E8E5DD] text-xs space-y-1"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded uppercase bg-white border border-[#E8E5DD] text-[#C76A2A] font-semibold">
                            {item.category.replace('_', ' ')}
                          </span>
                          <span className="text-[10px] text-[#6F6A60] font-mono">{item.timestamp}</span>
                        </div>
                        <p className="text-xs text-[#1B1B1B] font-medium pt-0.5">{item.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: GitHub Deep Profile Analysis Engine */}
            {rightTab === 'github' && (
              <div className="space-y-4">
                <div className="bg-white p-5 rounded-2xl border border-[#E8E5DD] shadow-none space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#1B1B1B]">
                      <GitBranch className="w-4 h-4 text-[#1B1B1B]" />
                      <span>@{gitAnalysis.username} Analysis</span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#2F7A45]/10 text-[#2F7A45] font-bold">
                      Complexity: {gitAnalysis.complexityScore}/100
                    </span>
                  </div>

                  {/* Skill Map */}
                  <div className="space-y-2 pt-1">
                    <span className="text-[11px] font-mono uppercase text-[#6F6A60]">Extracted Skill Map</span>
                    {gitAnalysis.skillMap.map((sm, idx) => (
                      <div key={idx} className="p-2.5 bg-[#FAF9F5] border border-[#E8E5DD] rounded-xl space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-[#1B1B1B]">{sm.skill}</span>
                          <span className="text-[10px] font-mono font-semibold text-[#2F7A45]">{sm.confidence}%</span>
                        </div>
                        <p className="text-[11px] text-[#6F6A60]">{sm.evidence}</p>
                      </div>
                    ))}
                  </div>

                  {/* Strengths Map */}
                  <div className="space-y-2 pt-2 border-t border-[#E8E5DD]">
                    <span className="text-[11px] font-mono uppercase text-[#6F6A60]">Strength Map</span>
                    {gitAnalysis.strengthMap.map((st, idx) => (
                      <div key={idx} className="p-2.5 bg-[#FAF9F5] border border-[#E8E5DD] rounded-xl text-xs space-y-0.5">
                        <span className="font-bold text-[#1B1B1B] block">{st.area}</span>
                        <p className="text-[11px] text-[#6F6A60]">{st.description}</p>
                      </div>
                    ))}
                  </div>

                  {/* Weakness Map */}
                  <div className="space-y-2 pt-2 border-t border-[#E8E5DD]">
                    <span className="text-[11px] font-mono uppercase text-[#6F6A60]">Weakness & Recommendations</span>
                    {gitAnalysis.weaknessMap.map((wk, idx) => (
                      <div key={idx} className="p-2.5 bg-[#FAF9F5] border border-[#E8E5DD] rounded-xl text-xs space-y-0.5">
                        <span className="font-bold text-[#C76A2A] block">{wk.gap}</span>
                        <p className="text-[11px] text-[#6F6A60]">{wk.recommendation}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <AIProviderModal isOpen={isAiModalOpen} onClose={() => setIsAiModalOpen(false)} />
    </PortalLayout>
  );
}
