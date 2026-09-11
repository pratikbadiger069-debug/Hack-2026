'use client';

import React, { useState } from 'react';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { useAppStore } from '@/lib/store';
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Plus,
  GitCommit,
  Flame,
  Zap,
  Lightbulb,
  Users,
  Compass,
  FileCheck,
  X,
} from 'lucide-react';

export default function BuilderPassportPage() {
  const { studentProfile, addBuilderEvidence } = useAppStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    type: 'GitHub Repo',
    url: '',
    description: '',
    impactScore: 85,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.url) return;
    addBuilderEvidence({
      title: formData.title,
      type: formData.type as any,
      url: formData.url,
      description: formData.description,
      date: 'Just now',
      impactScore: Number(formData.impactScore),
    });
    setIsModalOpen(false);
    setFormData({
      title: '',
      type: 'GitHub Repo',
      url: '',
      description: '',
      impactScore: 85,
    });
  };

  const scores = studentProfile.builderScores;

  const scoreCategories = [
    { name: 'Execution Score', score: scores.execution, icon: Zap, color: 'text-blue-600', bg: 'bg-blue-50', desc: 'Code velocity, PR merges & delivery' },
    { name: 'Leadership Score', score: scores.leadership, icon: Users, color: 'text-purple-600', bg: 'bg-purple-50', desc: 'Team leadership & hackathon captaincy' },
    { name: 'Innovation Score', score: scores.innovation, icon: Lightbulb, color: 'text-amber-600', bg: 'bg-amber-50', desc: 'Novel architectures & patents/papers' },
    { name: 'Problem Solving Score', score: scores.problemSolving, icon: Compass, color: 'text-emerald-600', bg: 'bg-emerald-50', desc: 'Algorithmic assessment performance' },
    { name: 'Consistency Score', score: scores.consistency, icon: Flame, color: 'text-rose-600', bg: 'bg-rose-50', desc: 'Continuous commit cadence over 180 days' },
  ];

  return (
    <PortalLayout>
      <div className="space-y-6">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                Official Credential #BP-{studentProfile.id.toUpperCase()}
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-500">Cryptographically Audited</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Builder Passport</h1>
            <p className="text-xs text-slate-500 mt-1">
              Evidence-based multidimensional engineering scoring powered by verified repository proofs.
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-xs flex items-center gap-1.5 self-start md:self-auto"
          >
            <Plus className="w-3.5 h-3.5" />
            Submit Evidence
          </button>
        </div>

        {/* Big Overall Builder Score Highlight Card */}
        <div className="saas-card p-6 bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-blue-300">
                Global Builder Rating
              </span>
              <div className="flex items-baseline gap-3">
                <span className="text-5xl font-black tracking-tight">{scores.overall}</span>
                <span className="text-sm font-medium text-slate-400">/ 1000 Maximum</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Lead Builder Rank (Top 3.2%)
                </span>
              </div>
              <p className="text-xs text-slate-300 max-w-xl">
                Calculated dynamically from 4 verified evidence artifacts, 6 validated skill credentials, and 14 shipped software repositories.
              </p>
            </div>
            <div className="flex flex-col items-center justify-center p-4 bg-white/5 backdrop-blur-xs rounded-xl border border-white/10 text-center min-w-[160px]">
              <ShieldCheck className="w-8 h-8 text-blue-400 mb-1" />
              <span className="text-xs font-bold uppercase tracking-wider">Verified Identity</span>
              <span className="text-[10px] text-slate-400 mt-0.5">SHA-256 Audit Trail Active</span>
            </div>
          </div>
        </div>

        {/* 5 Dimensional Scores Breakdown */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {scoreCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div key={cat.name} className="saas-card p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className={`p-2 rounded-lg ${cat.bg} ${cat.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-900">{cat.score} / 100</span>
                  </div>
                  <h3 className="text-xs font-bold text-slate-900">{cat.name}</h3>
                  <p className="text-[11px] text-slate-500 mt-1 leading-snug">{cat.desc}</p>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5 mt-3 overflow-hidden">
                  <div
                    className="bg-blue-600 h-full rounded-full"
                    style={{ width: `${cat.score}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Evidence Logs & Verification Audit Trail */}
        <div className="saas-card p-6">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Evidence Audit Trail</h2>
              <p className="text-xs text-slate-500">All scored milestones verified against external repositories</p>
            </div>
            <span className="text-xs font-medium text-slate-500">
              {studentProfile.evidences.length} Scored Artifacts
            </span>
          </div>

          {studentProfile.evidences.length === 0 ? (
            <div className="text-center py-12 px-4 bg-slate-50 rounded-xl border border-dashed border-slate-200">
              <Award className="w-10 h-10 text-slate-400 mx-auto mb-2" />
              <h3 className="text-sm font-bold text-slate-800">No builder evidence uploaded yet</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                Submit your first GitHub project, research paper, or hackathon repository to calculate your verified Builder Score.
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="mt-4 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors inline-flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Submit First Project Evidence</span>
              </button>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {studentProfile.evidences.map((ev) => (
                <div key={ev.id} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1 max-w-2xl">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        {ev.type}
                      </span>
                      <h3 className="text-xs font-bold text-slate-900">{ev.title}</h3>
                      {ev.verified && (
                        <span className="inline-flex items-center gap-0.5 text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.2 rounded">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          Verified
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600">{ev.description}</p>
                    <div className="flex items-center gap-3 text-[11px] text-slate-400">
                      <span>Submitted: {ev.date}</span>
                      <span>•</span>
                      <a
                        href={ev.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 hover:underline inline-flex items-center gap-1 font-medium"
                      >
                        Audit Proof Link <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg">
                      +{ev.impactScore} Pts
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit Evidence Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
            <div className="w-full max-w-lg bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                <h3 className="font-semibold text-slate-900 text-sm">Submit New Builder Evidence</h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 text-slate-400 hover:text-slate-600 rounded-md hover:bg-slate-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Artifact Title</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Distributed Task Queue in Rust"
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:ring-1 focus:ring-blue-600 focus:outline-none text-slate-900"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Evidence Type</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:ring-1 focus:ring-blue-600 focus:outline-none text-slate-900"
                    >
                      <option value="GitHub Repo">GitHub Repo</option>
                      <option value="Live Product">Live Product</option>
                      <option value="Research Paper">Research Paper</option>
                      <option value="Hackathon Win">Hackathon Win</option>
                      <option value="Open Source PR">Open Source PR</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Estimated Impact Pts</label>
                    <input
                      type="number"
                      min="10"
                      max="100"
                      value={formData.impactScore}
                      onChange={(e) => setFormData({ ...formData, impactScore: Number(e.target.value) })}
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:ring-1 focus:ring-blue-600 focus:outline-none text-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Proof URL</label>
                  <input
                    type="url"
                    required
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    placeholder="https://github.com/..."
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:ring-1 focus:ring-blue-600 focus:outline-none text-slate-900 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Impact Description</label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Summarize key metrics, architectural choices, and benchmarks..."
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:ring-1 focus:ring-blue-600 focus:outline-none text-slate-900"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-xs"
                  >
                    Validate & Index
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </PortalLayout>
  );
}
