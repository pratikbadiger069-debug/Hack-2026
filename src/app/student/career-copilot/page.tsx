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
  Compass,
  Code2,
  Layers,
  GraduationCap,
  Flame,
  Check,
} from 'lucide-react';

export default function CareerCopilotPage() {
  const { studentProfile, aiKeys, activeProvider } = useAppStore();
  const [targetRole, setTargetRole] = useState(
    studentProfile.careerPath || studentProfile.targetRole || 'Software Development'
  );
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

  // Initial personalized greeting
  const firstName = studentProfile?.name?.split(' ')[0] || 'Builder';
  const collegeName = studentProfile?.academic?.college || studentProfile?.college || 'University';
  const builderScore = studentProfile?.builderScores?.overall || 480;
  const currentGoal = studentProfile?.careerGoal || 'Internship';

  const [messages, setMessages] = useState<CopilotChatMessage[]>([
    {
      id: 'msg-init',
      sender: 'copilot',
      text: `Welcome back, **${firstName}**! I've loaded your verified profile at **${collegeName}**.\n\n- **Target Career:** **${targetRole}**\n- **Primary Goal:** **${currentGoal}**\n- **Builder Score:** **${builderScore} / 1000** (Readiness: **${context.readinessScore}%**)\n\nI can analyze your skill gaps, generate a weekly plan, review your GitHub repos, or prepare you for technical interviews. What shall we tackle first?`,
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

  // 10 Copilot Abilities Chips
  const copilotAbilities = [
    { label: '🔍 Diagnose Skill Gaps', query: 'Diagnose my skill gaps for ' + targetRole },
    { label: '🚀 Next Skills to Learn', query: 'What should I learn next to improve my readiness?' },
    { label: '🛠️ Recommended Projects', query: 'Suggest high-impact projects based on my career path' },
    { label: '📅 Weekly Learning Plan', query: 'Generate a personalized weekly learning plan for me' },
    { label: '💼 Internships & Hackathons', query: 'Recommend internships and hackathons matched to my profile' },
    { label: '🐙 Review GitHub Repos', query: 'Review my GitHub profile and repository evidence' },
    { label: '💡 Explain Skill Importance', query: 'Why is system design and data structures important for ' + targetRole + '?' },
    { label: '🎯 Interview Prep Plan', query: 'Generate a technical interview preparation plan for ' + targetRole },
    { label: '🧭 Career GPS & Progress', query: 'Track my progress and roadmap trajectory against my career goals' },
    { label: '🧑‍🏫 Personal Career Mentor', query: 'Act as my personal career mentor and tell me my immediate next action step' },
  ];

  const completedMissionsCount = missions.filter((m) => m.completed).length;

  return (
    <PortalLayout>
      <div className="space-y-6 max-w-[1300px] mx-auto pb-12">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E8E5DD]">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C76A2A]" />
              <h1 className="text-2xl font-bold text-[#1B1B1B] tracking-tight">
                AI Career Copilot
              </h1>
            </div>
            <p className="text-xs text-[#6F6A60] mt-0.5">
              Personalized mentor calibrated on your Builder Score, verified skills, and career goals.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Goal Selector */}
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

            {/* Provider Pill */}
            <button
              onClick={() => setIsAiModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-[#FAF9F5] border border-[#E8E5DD] rounded-xl text-xs font-semibold text-[#1B1B1B] transition-all shadow-none cursor-pointer"
            >
              <KeyRound className="w-3.5 h-3.5 text-[#C76A2A]" />
              <span className="capitalize">{activeProvider} AI</span>
            </button>
          </div>
        </div>

        {/* 2-Column Experience: Center Conversation + Right Career Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* CENTER: Main Conversation View */}
          <div className="lg:col-span-8 flex flex-col h-[740px] bg-white border border-[#E8E5DD] rounded-2xl shadow-none overflow-hidden">
            {/* Chat Status Header */}
            <div className="px-6 py-3.5 border-b border-[#E8E5DD] bg-[#FAF9F5] flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-[#6F6A60]">
                <Sparkles className="w-3.5 h-3.5 text-[#C76A2A]" />
                <span className="font-semibold text-[#1B1B1B]">{targetRole} Intelligence Engine</span>
                <span>•</span>
                <span>{context.readinessScore}% Readiness</span>
              </div>
              <button
                onClick={() =>
                  setMessages([
                    {
                      id: `msg-${Date.now()}`,
                      sender: 'copilot',
                      text: `Conversation reset. Ready to guide your path toward **${targetRole}**. How can I help you?`,
                      timestamp: 'Just now',
                    },
                  ])
                }
                className="text-[#6F6A60] hover:text-[#1B1B1B] flex items-center gap-1 font-medium transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>

            {/* Message Feed */}
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
                            para.startsWith('3. ')
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
                                  {phase.progressPercentage}%
                                </span>
                              </div>
                              <p className="text-xs text-[#6E6E6A]">{phase.description}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Structured Projects rendering */}
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

                      <div
                        className={`text-[10px] mt-2 font-mono ${
                          msg.sender === 'user' ? 'text-white/60' : 'text-[#6E6E6A]'
                        } text-right`}
                      >
                        {msg.timestamp}
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
                    <span>Analyzing your profile and generating personalized strategy...</span>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* 10 Copilot Abilities Chips */}
            <div className="px-6 py-2.5 bg-white border-t border-[#E8E5DD] flex items-center gap-2 overflow-x-auto no-scrollbar">
              <span className="text-[11px] text-[#6F6A60] shrink-0 font-medium">Abilities:</span>
              {copilotAbilities.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(item.query)}
                  className="text-xs px-3 py-1 rounded-xl bg-[#FAF9F5] hover:bg-[#F6F4EE] text-[#1B1B1B] border border-[#E8E5DD] hover:border-[#C76A2A] transition-all shrink-0 font-medium cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Conversational Input Bar */}
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
                  placeholder={`Ask anything about your ${targetRole} path, skills, or interviews...`}
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

          {/* RIGHT: Career Insights Panel */}
          <div className="lg:col-span-4 space-y-4">
            {/* 1. Readiness */}
            <div className="bg-white p-5 rounded-2xl border border-[#E8E5DD] shadow-none space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-[#6F6A60]">
                  Career Readiness
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
                  Builder Profile
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#1B1B1B] text-white font-mono">
                  {studentProfile.builderLevel || 'Explorer'}
                </span>
              </div>
              <div className="pt-1">
                <h3 className="text-sm font-bold text-[#1B1B1B]">{studentProfile.name}</h3>
                <p className="text-xs text-[#6E6E6A] mt-0.5">
                  {studentProfile.degree || studentProfile.academic?.degree || 'B.Tech'} • {collegeName}
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

            {/* 3. Top Skills */}
            <div className="bg-white p-5 rounded-2xl border border-[#E8E5DD] shadow-none space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-[#6F6A60]">
                  Top Skills
                </span>
                <span className="text-xs text-[#6F6A60] font-mono">
                  {studentProfile.verifiedSkills?.length || studentProfile.knownSkills?.length || 4} Tracked
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {(studentProfile.verifiedSkills && studentProfile.verifiedSkills.length > 0
                  ? studentProfile.verifiedSkills.slice(0, 5).map((s) => s.name)
                  : studentProfile.knownSkills?.slice(0, 5) || ['Python', 'TypeScript', 'React']
                ).map((skillName, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2.5 py-1 rounded-xl bg-[#FAF9F5] border border-[#E8E5DD] text-[#1B1B1B] font-medium"
                  >
                    {skillName}
                  </span>
                ))}
              </div>
            </div>

            {/* 4. Skill Gaps */}
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

            {/* 5. Weekly Missions */}
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
        </div>
      </div>

      <AIProviderModal isOpen={isAiModalOpen} onClose={() => setIsAiModalOpen(false)} />
    </PortalLayout>
  );
}
