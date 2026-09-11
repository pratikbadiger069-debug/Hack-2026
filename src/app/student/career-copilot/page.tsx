'use client';

import React, { useState } from 'react';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { useAppStore } from '@/lib/store';
import { AIProviderModal } from '@/components/ai/AIProviderModal';
import { generateCopilotAnalysis } from '@/lib/ai-engine';
import { CopilotAnalysisResult } from '@/types';
import {
  Sparkles,
  Bot,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Clock,
  Award,
  Layers,
  Code,
  Lightbulb,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';

export default function CareerCopilotPage() {
  const { studentProfile, aiKeys, activeProvider, copilotResults, saveCopilotResult } = useAppStore();
  const [targetRoleInput, setTargetRoleInput] = useState(studentProfile.targetRole || 'AI Engineer');
  const [loading, setLoading] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  const activeKey = aiKeys[activeProvider];
  const hasKey = Boolean(activeKey && activeKey.trim().length > 5);

  const currentResult: CopilotAnalysisResult | undefined = copilotResults[targetRoleInput];

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetRoleInput) return;

    setLoading(true);
    try {
      const result = await generateCopilotAnalysis({
        targetRole: targetRoleInput,
        studentName: studentProfile.name,
        department: studentProfile.academic.department,
        cgpa: studentProfile.academic.cgpa,
        currentSkills: studentProfile.verifiedSkills.map((s) => s.name),
        verifiedSkillsCount: studentProfile.verifiedSkills.length,
        builderScore: studentProfile.builderScores.overall,
        provider: activeProvider,
        apiKey: activeKey,
      });

      saveCopilotResult(targetRoleInput, result);
    } catch (err) {
      console.error('Failed to generate copilot analysis:', err);
    } finally {
      setLoading(false);
    }
  };

  const sampleRoles = ['AI Engineer', 'Backend Developer', 'Cloud & DevOps Architect', 'Full-Stack Engineer', 'Data Scientist'];

  return (
    <PortalLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-blue-600" />
                Workforce Intelligence Copilot
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-500 capitalize">{activeProvider} AI Engine</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Career Copilot</h1>
            <p className="text-xs text-slate-500 mt-1">
              Autonomous AI career path planner diagnosing real-time skill deltas, project blueprints, and timeline to hire.
            </p>
          </div>
          <button
            onClick={() => setIsAiModalOpen(true)}
            className={`px-4 py-2 text-xs font-semibold rounded-lg border transition-all flex items-center gap-1.5 self-start md:self-auto ${
              hasKey
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-xs'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            {hasKey ? `Connected to ${activeProvider.toUpperCase()}` : 'Connect AI Provider'}
          </button>
        </div>

        {/* AI Key Disconnected Banner */}
        {!hasKey && (
          <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5 text-amber-900">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <div>
                <span className="font-semibold">Connect your AI Provider:</span> You can test the platform in simulated mode, or add your Gemini/OpenAI/Claude API key for live inference.
              </div>
            </div>
            <button
              onClick={() => setIsAiModalOpen(true)}
              className="px-3 py-1.5 text-xs font-semibold text-amber-900 bg-amber-100 hover:bg-amber-200 rounded-md transition-colors shrink-0"
            >
              Configure API Key
            </button>
          </div>
        )}

        {/* Prompt Input Form */}
        <div className="saas-card p-6 space-y-4">
          <form onSubmit={handleGenerate} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                What target role do you want to achieve?
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Bot className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={targetRoleInput}
                    onChange={(e) => setTargetRoleInput(e.target.value)}
                    placeholder="e.g. I want to become an AI Engineer"
                    className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent text-slate-900 font-medium"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2.5 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-xs flex items-center justify-center gap-2 shrink-0 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Analyzing Skill Graph...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      Generate Career Intelligence
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Quick Chips */}
            <div className="flex items-center gap-2 flex-wrap pt-1">
              <span className="text-[11px] text-slate-400">Try popular roles:</span>
              {sampleRoles.map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => setTargetRoleInput(role)}
                  className="text-[11px] px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                >
                  {role}
                </button>
              ))}
            </div>
          </form>
        </div>

        {/* AI Output View */}
        {currentResult ? (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Top Readiness Summary Card */}
            <div className="saas-card p-6 bg-gradient-to-r from-slate-900 to-blue-950 text-white">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-400/30">
                      Target Role: {currentResult.targetRole}
                    </span>
                    <span className="text-xs text-slate-400">
                      Estimated Timeline: {currentResult.estimatedTimeline}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white">Executive Readiness Diagnosis</h3>
                  <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                    {currentResult.summary}
                  </p>
                </div>

                <div className="p-4 bg-white/10 backdrop-blur-xs rounded-xl border border-white/10 text-center min-w-[150px]">
                  <span className="text-[10px] uppercase font-bold text-blue-300 tracking-wider">
                    Current Readiness
                  </span>
                  <div className="text-4xl font-black text-white my-1">
                    {currentResult.currentReadinessScore}%
                  </div>
                  <span className="text-[11px] text-emerald-300 font-medium">
                    Strong Candidate Base
                  </span>
                </div>
              </div>
            </div>

            {/* 2-Column Grid: Missing Skills & Projects Needed */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left: Missing Skills & Strengths */}
              <div className="lg:col-span-5 space-y-6">
                {/* Missing Skills */}
                <div className="saas-card p-6">
                  <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                    Missing Skills & Industry Gaps ({currentResult.missingSkills.length})
                  </h4>
                  <div className="space-y-2">
                    {currentResult.missingSkills.map((skill, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-amber-50/50 border border-amber-100 rounded-lg text-xs font-medium text-amber-900 flex items-center justify-between"
                      >
                        <span>{skill}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                          Priority Delta
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Candidate Strengths */}
                <div className="saas-card p-6">
                  <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Verified Strengths & Assets
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-600">
                    {currentResult.strengths?.map((str, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                        <span>{str}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Certifications Needed */}
                <div className="saas-card p-6">
                  <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <Award className="w-4 h-4 text-purple-600" />
                    Recommended Industry Certifications
                  </h4>
                  <div className="space-y-2.5">
                    {currentResult.certificationsNeeded.map((cert, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-slate-50 border border-slate-100 rounded-lg text-xs flex items-center justify-between"
                      >
                        <div>
                          <span className="font-semibold text-slate-900 block">{cert.name}</span>
                          <span className="text-[10px] text-slate-500">{cert.issuer}</span>
                        </div>
                        <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
                          {cert.priority} Priority
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Projects Needed & Step-by-Step Action Plan */}
              <div className="lg:col-span-7 space-y-6">
                {/* Projects Needed */}
                <div className="saas-card p-6">
                  <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <Code className="w-4 h-4 text-blue-600" />
                    Production Projects Needed for 95%+ Alignment
                  </h4>
                  <div className="space-y-3">
                    {currentResult.projectsNeeded.map((proj, idx) => (
                      <div
                        key={idx}
                        className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <h5 className="text-xs font-bold text-slate-900">{proj.title}</h5>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                            {proj.difficulty}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600">{proj.description}</p>
                        <div className="flex flex-wrap gap-1 pt-1">
                          {proj.techStack.map((tech) => (
                            <span
                              key={tech}
                              className="text-[10px] font-medium bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-700"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Step-by-Step Milestone Roadmap */}
                <div className="saas-card p-6">
                  <h4 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-emerald-600" />
                    Milestone-by-Milestone Execution Path
                  </h4>
                  <div className="space-y-4">
                    {currentResult.actionPlan.map((plan, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="w-7 h-7 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                          {idx + 1}
                        </div>
                        <div className="flex-1 p-3.5 bg-slate-50 border border-slate-100 rounded-lg">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <span className="text-xs font-bold text-slate-900">{plan.milestone}</span>
                            <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                              {plan.week}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600">{plan.focusArea}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="saas-card p-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
              <Bot className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Career Copilot Standing By</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Enter your target engineering role above to trigger our multi-vector skill graph and generate a tailored roadmap.
            </p>
          </div>
        )}
      </div>

      <AIProviderModal isOpen={isAiModalOpen} onClose={() => setIsAiModalOpen(false)} />
    </PortalLayout>
  );
}
