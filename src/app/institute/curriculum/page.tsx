'use client';

import React, { useState } from 'react';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { useAppStore } from '@/lib/store';
import { analyzeCurriculum } from '@/lib/ai-engine';
import { CurriculumAnalysisResult } from '@/types';
import {
  FileSpreadsheet,
  Upload,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  TrendingUp,
  FileText,
  Clock,
  Layers,
  Award,
} from 'lucide-react';

export default function InstituteCurriculumPage() {
  const { curriculumAnalyses, saveCurriculumAnalysis, aiKeys, activeProvider } = useAppStore();
  const [department, setDepartment] = useState('Computer Science & Engineering');
  const [syllabusText, setSyllabusText] = useState(
    `Department: Computer Science & Engineering
Semester: 6th Semester
Course: Advanced Computing & Distributed Systems

Module 1: Multithreading & Synchronization
Process vs Threads, Mutex, Semaphores, Deadlock Avoidance Algorithms (Banker's Algorithm).

Module 2: Legacy Web Services & SOAP
SOAP 1.2 XML specifications, WSDL schemas, UDDI registries, CORBA object request brokers.

Module 3: Relational Query Optimization
B+ Tree indexing, Normalization 1NF-BCNF, SQL Joins, Two-Phase Locking (2PL).

Module 4: Distributed Computing
Client-Server paradigms, Remote Procedure Calls (RMI), Vector Clocks, Byzantine Fault Tolerance basics.

Module 5: Introduction to Neural Networks
Perceptrons, Backpropagation algorithm, Sigmoid and ReLU activations.`
  );
  const [loading, setLoading] = useState(false);

  const activeResult: CurriculumAnalysisResult = curriculumAnalyses[0];

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!syllabusText) return;

    setLoading(true);
    try {
      const result = await analyzeCurriculum({
        syllabusText,
        department,
        provider: activeProvider,
        apiKey: aiKeys[activeProvider],
      });
      saveCurriculumAnalysis(result);
    } catch (err) {
      console.error('Error analyzing curriculum:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PortalLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-blue-600" />
                AI Curriculum Intelligence
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-500">2026 Industry Calibration</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Curriculum Analysis</h1>
            <p className="text-xs text-slate-500 mt-1">
              Extract syllabus text or upload course outlines to identify curriculum-industry gaps, outdated modules, and accreditation upgrades.
            </p>
          </div>
        </div>

        {/* Input Card */}
        <div className="saas-card p-6 space-y-4">
          <form onSubmit={handleAnalyze} className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="w-full sm:w-72">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Department
                </label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-semibold focus:ring-1 focus:ring-blue-600"
                >
                  <option value="Computer Science & Engineering">Computer Science & Engineering (CSE)</option>
                  <option value="Artificial Intelligence & Machine Learning">AI & Machine Learning (AIML)</option>
                  <option value="Information Technology">Information Technology (IT)</option>
                  <option value="Electronics & Communication">Electronics & Communication (ECE)</option>
                </select>
              </div>

              <div className="text-xs text-slate-500 self-end">
                <span>Upload PDF / Syllabus text below to compare with 10,000+ job descriptions</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Syllabus Outline / Text
                </label>
                <span className="text-[11px] text-slate-400">PDF OCR / Direct Text Extraction</span>
              </div>
              <textarea
                rows={6}
                required
                value={syllabusText}
                onChange={(e) => setSyllabusText(e.target.value)}
                className="w-full p-3.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-600 text-slate-900 font-mono"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <FileText className="w-4 h-4 text-blue-600" />
                <span>44 Core topics detected in current buffer</span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-xs flex items-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Extracting Industry Alignment...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    Run AI Market Comparison
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Results View */}
        {activeResult && (
          <div className="space-y-6">
            {/* Top Relevance Card */}
            <div className="saas-card p-6 bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 text-white">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-400/30">
                      {activeResult.syllabusTitle}
                    </span>
                    <span className="text-xs text-slate-400">
                      {activeResult.totalTopicsAnalyzed} Topics Benchmarked
                    </span>
                  </div>
                  <h2 className="text-lg font-bold text-white">Curriculum Market Relevance Index</h2>
                  <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                    Syllabus exhibits high core mathematical and systems strength, but lacks 4 cutting-edge industry standards required by modern enterprise tech stacks.
                  </p>
                </div>

                <div className="p-4 bg-white/10 backdrop-blur-xs rounded-xl border border-white/10 text-center min-w-[160px]">
                  <span className="text-[10px] uppercase font-bold text-blue-300 tracking-wider">
                    Relevance Score
                  </span>
                  <div className="text-4xl font-black text-white my-1">
                    {activeResult.industryRelevanceScore}%
                  </div>
                  <span className="text-[11px] text-amber-300 font-medium">
                    Modernization Recommended
                  </span>
                </div>
              </div>
            </div>

            {/* 2-Column Grid: Missing Topics & Outdated Modules */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Missing Topics List */}
              <div className="lg:col-span-7 saas-card p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                    Missing Industry-Demanded Topics ({activeResult.missingTopics.length})
                  </h3>
                  <span className="text-[10px] bg-rose-50 text-rose-700 px-2 py-0.5 rounded font-bold">
                    Critical Gap
                  </span>
                </div>

                <div className="space-y-3">
                  {activeResult.missingTopics.map((topic, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg space-y-1.5"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-xs font-bold text-slate-900">{topic.topic}</h4>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                          {topic.industryUsagePercentage}% Market Adoption
                        </span>
                      </div>
                      <p className="text-[11px] text-blue-700 font-medium">
                        Suggested Integration: {topic.recommendedModule}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Outdated Topics & Modernization Recommendations */}
              <div className="lg:col-span-5 space-y-6">
                {/* Outdated Topics */}
                <div className="saas-card p-6">
                  <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                    Outdated Curriculum Topics To Retire
                  </h3>
                  <div className="space-y-2">
                    {activeResult.outdatedTopics.map((topic, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 bg-amber-50/60 border border-amber-100 rounded-lg text-xs font-medium text-amber-900"
                      >
                        {topic}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Suggested Actionable Improvements */}
                <div className="saas-card p-6">
                  <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Suggested Syllabus Upgrades
                  </h3>
                  <ul className="space-y-2 text-xs text-slate-600">
                    {activeResult.suggestedImprovements.map((imp, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                        <span>{imp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </PortalLayout>
  );
}
