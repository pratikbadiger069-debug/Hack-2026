'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { useAppStore } from '@/lib/store';
import { AIProviderModal } from '@/components/ai/AIProviderModal';
import { CopilotChatMessage, WeeklyMission } from '@/types';
import {
  analyzeStudentCareerContext,
  generateSmartCopilotResponse,
  ROLE_BENCHMARKS,
} from '@/lib/copilot-engine';
import {
  Sparkles,
  Send,
  Loader2,
  Target,
  CheckCircle2,
  RotateCcw,
  CheckSquare,
  Square,
  ArrowUpRight,
  TrendingUp,
  AlertCircle,
  Award,
  ChevronRight,
  KeyRound,
} from 'lucide-react';

export default function CareerCopilotPage() {
  const { studentProfile, aiKeys, activeProvider } = useAppStore();
  const [targetRole, setTargetRole] = useState(studentProfile.targetRole || 'AI Engineer');
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Analyze student profile context
  const context = analyzeStudentCareerContext(studentProfile, targetRole);
  const [missions, setMissions] = useState<WeeklyMission[]>(context.weeklyMissions);

  useEffect(() => {
    setMissions(context.weeklyMissions);
  }, [targetRole]);

  // Initial conversational greeting in Claude/Anthropic tone
  const [messages, setMessages] = useState<CopilotChatMessage[]>([
    {
      id: 'msg-init',
      sender: 'copilot',
      text: `Good evening ${studentProfile.name.split(' ')[0]}. I've reviewed your verified skills in Python and PyTorch, your academic standing (${studentProfile.academic.cgpa} CGPA), and your recent vector search capstones.\n\nYour current readiness for **${targetRole}** is at **${context.readinessScore}%**.\n\nBased on your projects and recent assessment history, focusing on **Docker** and **System Design** this week would provide the fastest improvement toward your goal. Where would you like to begin?`,
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
          text: `Based on your profile data, your readiness for **${targetRole}** is **${context.readinessScore}%**. Strengthening **${context.missingSkills[0] || 'System Design'}** is your highest ROI step this week.`,
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

  const quickPrompts = [
    'What should I learn next?',
    'Review my readiness for placements',
    'Which project should I build next?',
    'Diagnose my skill gaps',
  ];

  const completedMissionsCount = missions.filter((m) => m.completed).length;

  return (
    <PortalLayout>
      <div className="space-y-6 max-w-[1300px] mx-auto pb-12">
        {/* Top Minimalist Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#ECEAE4]">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#D97706]" />
              <h1 className="text-2xl font-serif font-normal text-[#1F1F1F] tracking-tight">
                Career Copilot
              </h1>
            </div>
            <p className="text-sm text-[#6B6B6B] mt-0.5 font-sans">
              Personalized mentor analyzing your verified skills, projects, and target role trajectory.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Goal Selector */}
            <div className="flex items-center gap-2 bg-white border border-[#ECEAE4] rounded-full px-3.5 py-1.5 shadow-xs">
              <Target className="w-3.5 h-3.5 text-[#D97706]" />
              <span className="text-xs text-[#6B6B6B] font-medium">Goal:</span>
              <select
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="text-xs font-semibold text-[#1F1F1F] bg-transparent focus:outline-none cursor-pointer"
              >
                {sampleRoles.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            {/* Provider Pill */}
            <button
              onClick={() => setIsAiModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-[#F8F7F3] border border-[#ECEAE4] rounded-full text-xs font-medium text-[#1F1F1F] transition-all shadow-xs"
            >
              <KeyRound className="w-3 h-3 text-[#D97706]" />
              <span className="capitalize">{activeProvider} AI</span>
            </button>
          </div>
        </div>

        {/* 2-Column Claude-Inspired Experience: Center Conversation + Right Career Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* CENTER: Main Conversation View */}
          <div className="lg:col-span-8 flex flex-col h-[740px] bg-white border border-[#ECEAE4] rounded-2xl shadow-xs overflow-hidden">
            {/* Chat Status Header */}
            <div className="px-6 py-3.5 border-b border-[#ECEAE4] bg-[#FAF9F5]/70 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-[#6B6B6B]">
                <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
                <span className="font-medium text-[#1F1F1F]">{targetRole} Intelligence Engine</span>
                <span>•</span>
                <span>{context.readinessScore}% Readiness</span>
              </div>
              <button
                onClick={() =>
                  setMessages([
                    {
                      id: `msg-${Date.now()}`,
                      sender: 'copilot',
                      text: `Conversation cleared. I am ready to guide your next steps toward **${targetRole}**.`,
                      timestamp: 'Just now',
                    },
                  ])
                }
                className="text-[#6B6B6B] hover:text-[#1F1F1F] flex items-center gap-1 font-medium transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* Message Feed */}
            <div className="flex-1 p-6 overflow-y-auto space-y-5 bg-[#FAF9F5]/20">
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.sender === 'copilot' && (
                      <div className="w-7 h-7 rounded-full bg-[#1F1F1F] text-white flex items-center justify-center shrink-0 text-xs font-serif mt-1">
                        C
                      </div>
                    )}

                    <div
                      className={`max-w-[85%] rounded-2xl p-4 text-[13px] leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-[#1F1F1F] text-[#FAF9F5] rounded-br-sm'
                          : 'bg-white text-[#1F1F1F] border border-[#ECEAE4] rounded-bl-sm shadow-xs'
                      }`}
                    >
                      <div className="space-y-2 whitespace-pre-wrap font-sans">
                        {msg.text.split('\n\n').map((para, pIdx) => {
                          if (para.startsWith('- ') || para.startsWith('1. ') || para.startsWith('2. ') || para.startsWith('3. ')) {
                            return (
                              <div key={pIdx} className="space-y-1.5 my-2 pl-1">
                                {para.split('\n').map((line, lIdx) => (
                                  <div key={lIdx} className="flex items-start gap-2">
                                    <span className="text-[#D97706] font-bold text-xs mt-0.5">•</span>
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

                      {/* Structured Roadmap rendering */}
                      {msg.structuredType === 'roadmap' && (
                        <div className="mt-3 space-y-2 pt-3 border-t border-[#ECEAE4]">
                          {context.roadmapPhases.map((phase) => (
                            <div
                              key={phase.id}
                              className="p-3 bg-[#FAF9F5] border border-[#ECEAE4] rounded-xl space-y-1"
                            >
                              <div className="flex items-center justify-between text-xs">
                                <span className="font-semibold text-[#1F1F1F]">
                                  Phase {phase.phaseNumber}: {phase.title}
                                </span>
                                <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#D97706]/10 text-[#D97706]">
                                  {phase.progressPercentage}%
                                </span>
                              </div>
                              <p className="text-xs text-[#6B6B6B]">{phase.description}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Structured Projects rendering */}
                      {msg.structuredType === 'projects' && (
                        <div className="mt-3 space-y-2 pt-3 border-t border-[#ECEAE4]">
                          {context.benchmark.recommendedProjects.map((proj, idx) => (
                            <div
                              key={idx}
                              className="p-3 bg-[#FAF9F5] border border-[#ECEAE4] rounded-xl space-y-1.5"
                            >
                              <div className="flex items-center justify-between text-xs">
                                <span className="font-semibold text-[#1F1F1F]">{proj.title}</span>
                                <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-white border border-[#ECEAE4] text-[#6B6B6B]">
                                  {proj.difficulty}
                                </span>
                              </div>
                              <p className="text-xs text-[#6B6B6B]">{proj.description}</p>
                              <div className="flex flex-wrap gap-1 pt-1">
                                {proj.techStack.map((tech) => (
                                  <span
                                    key={tech}
                                    className="text-[10px] px-2 py-0.5 rounded bg-white border border-[#ECEAE4] text-[#1F1F1F] font-mono"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      <div
                        className={`text-[10px] mt-2 font-mono ${
                          msg.sender === 'user' ? 'text-[#FAF9F5]/60' : 'text-[#6B6B6B]'
                        } text-right`}
                      >
                        {msg.timestamp}
                      </div>
                    </div>

                    {msg.sender === 'user' && (
                      <div className="w-7 h-7 rounded-full bg-[#ECEAE4] text-[#1F1F1F] flex items-center justify-center shrink-0 text-xs font-medium mt-1">
                        {studentProfile.name.charAt(0)}
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
                  <div className="w-7 h-7 rounded-full bg-[#1F1F1F] text-white flex items-center justify-center shrink-0 text-xs font-serif mt-1">
                    C
                  </div>
                  <div className="bg-white border border-[#ECEAE4] rounded-2xl rounded-bl-sm p-4 text-xs text-[#6B6B6B] flex items-center gap-2 shadow-xs">
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-[#D97706]" />
                    <span>Analyzing your verified skills and generating guidance...</span>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompt Chips */}
            <div className="px-6 py-2.5 bg-white border-t border-[#ECEAE4] flex items-center gap-2 overflow-x-auto no-scrollbar">
              <span className="text-[11px] text-[#6B6B6B] shrink-0">Prompts:</span>
              {quickPrompts.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(q)}
                  className="text-xs px-3 py-1 rounded-full bg-[#FAF9F5] hover:bg-[#F8F7F3] text-[#1F1F1F] border border-[#ECEAE4] hover:border-[#D97706]/40 transition-all shrink-0"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Conversational Input Bar */}
            <div className="p-4 bg-white border-t border-[#ECEAE4]">
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
                  placeholder={`Ask anything about your path to ${targetRole}...`}
                  className="flex-1 px-4 py-2.5 text-xs bg-[#FAF9F5] border border-[#ECEAE4] rounded-xl focus:outline-none focus:bg-white focus:border-[#D97706] text-[#1F1F1F] placeholder:text-[#6B6B6B] transition-all"
                />
                <button
                  type="submit"
                  disabled={loading || !inputQuery.trim()}
                  className="px-4 py-2.5 bg-[#1F1F1F] hover:bg-black text-[#FAF9F5] rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all disabled:opacity-40 shrink-0"
                >
                  {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                  <span>Send</span>
                </button>
              </form>
            </div>
          </div>

          {/* RIGHT: Career Insights Panel (Anthropic Specification) */}
          <div className="lg:col-span-4 space-y-4">
            {/* 1. Readiness */}
            <div className="bg-white p-5 rounded-2xl border border-[#ECEAE4] shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-[#6B6B6B]">
                  Career Readiness
                </span>
                <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-[#16A34A]/10 text-[#16A34A]">
                  Top 10%
                </span>
              </div>
              <div className="flex items-baseline justify-between">
                <div className="text-3xl font-serif text-[#1F1F1F]">
                  {context.readinessScore}%
                </div>
                <div className="text-xs text-[#6B6B6B]">
                  Target: <strong className="text-[#1F1F1F]">{targetRole}</strong>
                </div>
              </div>
              <div className="w-full bg-[#FAF9F5] rounded-full h-1.5 overflow-hidden border border-[#ECEAE4]">
                <div
                  className="bg-[#D97706] h-1.5 rounded-full transition-all duration-700"
                  style={{ width: `${context.readinessScore}%` }}
                />
              </div>
            </div>

            {/* 2. Current Goal */}
            <div className="bg-white p-5 rounded-2xl border border-[#ECEAE4] shadow-xs space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-[#6B6B6B]">
                Current Goal
              </span>
              <div className="flex items-center justify-between pt-1">
                <div>
                  <h3 className="text-base font-serif text-[#1F1F1F]">{targetRole}</h3>
                  <p className="text-xs text-[#6B6B6B] mt-0.5">
                    ETA: {context.careerGps.estimatedMonths} Months to full readiness
                  </p>
                </div>
                <div className="p-2 rounded-xl bg-[#FAF9F5] border border-[#ECEAE4]">
                  <Target className="w-4 h-4 text-[#D97706]" />
                </div>
              </div>
            </div>

            {/* 3. Top Skills */}
            <div className="bg-white p-5 rounded-2xl border border-[#ECEAE4] shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-[#6B6B6B]">
                  Verified Top Skills
                </span>
                <span className="text-xs text-[#6B6B6B] font-mono">
                  {studentProfile.verifiedSkills.length} Verified
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {studentProfile.verifiedSkills.slice(0, 5).map((skill, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2.5 py-1 rounded-lg bg-[#FAF9F5] border border-[#ECEAE4] text-[#1F1F1F] font-medium"
                  >
                    {skill.name} <span className="text-[#6B6B6B] text-[10px]">({skill.score}%)</span>
                  </span>
                ))}
              </div>
            </div>

            {/* 4. Skill Gaps */}
            <div className="bg-white p-5 rounded-2xl border border-[#ECEAE4] shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-[#6B6B6B]">
                  Skill Gaps to Close
                </span>
                <span className="text-xs text-[#D97706] font-medium">High Impact</span>
              </div>
              <div className="space-y-2">
                {context.missingSkills.slice(0, 3).map((skill, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-[#FAF9F5] border border-[#ECEAE4] flex items-center justify-between text-xs"
                  >
                    <span className="font-medium text-[#1F1F1F]">{skill}</span>
                    <span className="text-[10px] text-[#D97706] font-mono font-semibold">+18% readiness</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Weekly Progress */}
            <div className="bg-white p-5 rounded-2xl border border-[#ECEAE4] shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-[#6B6B6B]">
                  Weekly Progress
                </span>
                <span className="text-xs font-mono text-[#1F1F1F]">
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
                        ? 'bg-[#FAF9F5] border-[#ECEAE4] text-[#6B6B6B]'
                        : 'bg-white border-[#ECEAE4] hover:border-[#D97706]/40 text-[#1F1F1F]'
                    }`}
                  >
                    {m.completed ? (
                      <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-[#ECEAE4] shrink-0" />
                    )}
                    <span className={`text-xs flex-1 ${m.completed ? 'line-through text-[#6B6B6B]' : 'font-medium'}`}>
                      {m.title}
                    </span>
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
