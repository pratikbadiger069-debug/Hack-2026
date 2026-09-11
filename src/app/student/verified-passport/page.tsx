'use client';

import React, { useState } from 'react';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { useAppStore } from '@/lib/store';
import { SkillLevel, VerificationSource } from '@/types';
import {
  ShieldCheck,
  CheckCircle2,
  Award,
  BookOpen,
  Code,
  Building,
  Plus,
  Filter,
  Search,
  ExternalLink,
  QrCode,
  X,
} from 'lucide-react';

export default function VerifiedSkillPassportPage() {
  const { studentProfile, addVerifiedSkill } = useAppStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState('Programming');
  const [newSkillLevel, setNewSkillLevel] = useState<SkillLevel>('Intermediate');

  const categories = ['All', 'Programming', 'AI & ML', 'Database', 'DevOps', 'Cloud'];

  const filteredSkills = studentProfile.verifiedSkills.filter(
    (skill) => selectedCategory === 'All' || skill.category === selectedCategory
  );

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName) return;
    addVerifiedSkill(newSkillName, newSkillLevel, newSkillCategory);
    setIsModalOpen(false);
    setNewSkillName('');
  };

  const getSourceIcon = (source: VerificationSource) => {
    switch (source) {
      case 'Assessment':
        return <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />;
      case 'Project':
        return <Code className="w-3.5 h-3.5 text-purple-600" />;
      case 'Certification':
        return <Award className="w-3.5 h-3.5 text-amber-600" />;
      case 'Faculty Validation':
        return <Building className="w-3.5 h-3.5 text-emerald-600" />;
    }
  };

  const getLevelBadgeClass = (level: SkillLevel) => {
    switch (level) {
      case 'Expert':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Advanced':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Intermediate':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Beginner':
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <PortalLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-100">
                Institutional Verification Engine
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-500">Industry Credential Standard</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Verified Skill Passport</h1>
            <p className="text-xs text-slate-500 mt-1">
              Multi-source authenticated competencies verified through automated assessments, code repositories, and faculty endorsement.
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-xs flex items-center gap-1.5 self-start md:self-auto"
          >
            <Plus className="w-3.5 h-3.5" />
            Request Skill Verification
          </button>
        </div>

        {/* Categories Bar & Search */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3 rounded-lg border border-slate-200">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="text-xs text-slate-500 font-medium px-2">
            Showing {filteredSkills.length} Verified Competencies
          </div>
        </div>

        {/* Skill Cards Grid */}
        {filteredSkills.length === 0 ? (
          <div className="text-center py-12 px-4 bg-white rounded-xl border border-dashed border-slate-200 shadow-2xs">
            <ShieldCheck className="w-10 h-10 text-slate-400 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-slate-800">No verified skills claimed yet</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
              Verify your technical competencies across assessments, GitHub project code, or faculty validations.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-4 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors inline-flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Claim First Verified Skill</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSkills.map((skill) => (
              <div key={skill.id} className="saas-card p-5 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                        {skill.category}
                      </span>
                      <h3 className="text-sm font-bold text-slate-900">{skill.name}</h3>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getLevelBadgeClass(
                        skill.level
                      )}`}
                    >
                      {skill.level}
                    </span>
                  </div>

                  {/* Score bar */}
                  <div className="space-y-1 my-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 text-[11px]">Proficiency Index</span>
                      <span className="font-bold text-blue-600">{skill.score} / 100</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-blue-600 h-full rounded-full" style={{ width: `${skill.score}%` }} />
                    </div>
                  </div>

                  {/* Verification Sources */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-100">
                    <span className="text-[10px] font-semibold text-slate-400 uppercase block">
                      Verification Sources ({skill.verificationSources.length})
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {skill.verificationSources.map((source) => (
                        <span
                          key={source}
                          className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded bg-slate-50 border border-slate-200 text-slate-700 font-medium"
                        >
                          {getSourceIcon(source)}
                          <span>{source}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer: Code & Date */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                  <span>Code: {skill.verificationCode}</span>
                  <span>{skill.verifiedDate}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal: Request Skill Verification */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                <h3 className="font-semibold text-slate-900 text-sm">Add Competency For Verification</h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 text-slate-400 hover:text-slate-600 rounded-md hover:bg-slate-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleAddSkill} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Skill Name</label>
                  <input
                    type="text"
                    required
                    value={newSkillName}
                    onChange={(e) => setNewSkillName(e.target.value)}
                    placeholder="e.g. Distributed Consensus (Raft/Paxos)"
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:ring-1 focus:ring-blue-600 focus:outline-none text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Category</label>
                  <select
                    value={newSkillCategory}
                    onChange={(e) => setNewSkillCategory(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:ring-1 focus:ring-blue-600 focus:outline-none text-slate-900"
                  >
                    <option value="Programming">Programming</option>
                    <option value="AI & ML">AI & ML</option>
                    <option value="Database">Database</option>
                    <option value="Cloud">Cloud</option>
                    <option value="DevOps">DevOps</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Claimed Proficiency Level</label>
                  <select
                    value={newSkillLevel}
                    onChange={(e) => setNewSkillLevel(e.target.value as SkillLevel)}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:ring-1 focus:ring-blue-600 focus:outline-none text-slate-900"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Expert">Expert</option>
                  </select>
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
                    Submit For Verification
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
