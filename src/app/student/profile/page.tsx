'use client';

import React, { useState } from 'react';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { useAppStore } from '@/lib/store';
import { calculateVerificationAudit } from '@/lib/verification-engine';
import { getUserDisplayName } from '@/lib/user-utils';
import {
  GraduationCap,
  Building,
  Calendar,
  Award,
  BookOpen,
  GitBranch,
  Share2,
  Globe,
  CheckCircle2,
  Edit3,
  Save,
  Trophy,
  ShieldCheck,
  ShieldAlert,
  AlertCircle,
  ExternalLink,
  Plus,
} from 'lucide-react';

export default function StudentProfilePage() {
  const { studentProfile, currentUser, updateStudentFullProfile, isDemoMode } = useAppStore();
  const [isEditing, setIsEditing] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Form states
  const [name, setName] = useState(studentProfile.name || currentUser?.name || '');
  const [college, setCollege] = useState(studentProfile.academic.college || '');
  const [department, setDepartment] = useState(studentProfile.academic.department || 'CSE');
  const [cgpa, setCgpa] = useState(studentProfile.academic.cgpa || 0);
  const [headline, setHeadline] = useState(studentProfile.headline || '');
  const [githubUrl, setGithubUrl] = useState(studentProfile.professional.githubUrl || '');
  const [linkedinUrl, setLinkedinUrl] = useState(studentProfile.professional.linkedinUrl || '');
  const [bio, setBio] = useState(studentProfile.professional.bio || '');

  const audit = calculateVerificationAudit(studentProfile);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateStudentFullProfile({
      name: name.trim(),
      headline: headline.trim(),
      academic: {
        college: college.trim(),
        department: department as any,
        cgpa: Number(cgpa),
      },
      professional: {
        githubUrl: githubUrl.trim(),
        linkedinUrl: linkedinUrl.trim(),
        bio: bio.trim(),
      },
    });
    setIsEditing(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <PortalLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200">
          <div className="flex items-center gap-4">
            <img
              src={studentProfile.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'}
              alt={studentProfile.name}
              className="w-16 h-16 rounded-xl object-cover ring-2 ring-blue-600/20"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-slate-900">
                  {getUserDisplayName({ user: currentUser, profile: studentProfile })}
                </h1>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {audit.trustTier.replace(/_/g, ' ')}
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">{studentProfile.headline || 'Software Engineering Student'}</p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {studentProfile.academic.college || 'College Unspecified'} • {studentProfile.academic.department}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {savedSuccess && (
              <span className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Saved to Database
              </span>
            )}
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors flex items-center gap-1.5"
            >
              <Edit3 className="w-3.5 h-3.5" />
              {isEditing ? 'Cancel Edit' : 'Edit Profile'}
            </button>
          </div>
        </div>

        {/* Profile Verification Engine Card */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-blue-600" />
                <h2 className="text-sm font-bold text-slate-900">Profile Verification Engine</h2>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Cryptographic trust scores computed across LinkedIn, GitHub code repositories, and assessments.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <span className="text-xs text-slate-500 block">Verification Score</span>
                <span className="text-lg font-bold text-blue-600">{audit.verificationScore}%</span>
              </div>
              <div className="text-right pl-4 border-l border-slate-200">
                <span className="text-xs text-slate-500 block">Completeness</span>
                <span className="text-lg font-bold text-emerald-600">{audit.completenessScore}%</span>
              </div>
            </div>
          </div>

          {/* Verification Source Checks */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {audit.breakdown.map((item, idx) => (
              <div
                key={idx}
                className={`p-3.5 rounded-lg border text-xs flex flex-col justify-between ${
                  item.verified
                    ? 'bg-emerald-50/40 border-emerald-200 text-emerald-950'
                    : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <span className="font-semibold">{item.source}</span>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${item.verified ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'}`}>
                    {item.score}/{item.weight} pts
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">{item.evidenceDetails}</p>
              </div>
            ))}
          </div>

          {audit.recommendations.length > 0 && (
            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
              <span className="font-semibold text-slate-700">Actionable Steps to 100% Trust:</span>
              {audit.recommendations.map((rec, i) => (
                <span key={i} className="text-[11px] bg-blue-50 text-blue-700 px-2.5 py-1 rounded border border-blue-100">
                  {rec}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Edit Form or View Grid */}
        {isEditing ? (
          <form onSubmit={handleSave} className="bg-white p-6 rounded-xl border border-slate-200 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
              Update Student Records
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Legal Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Pratik Badiger"
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600 font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Headline</label>
                <input
                  type="text"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  placeholder="e.g. Full Stack & AI Systems Engineer"
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">College / University</label>
                <input
                  type="text"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Department</label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600"
                >
                  <option value="CSE">Computer Science &amp; Engineering</option>
                  <option value="AIML">Artificial Intelligence &amp; ML</option>
                  <option value="IT">Information Technology</option>
                  <option value="ECE">Electronics &amp; Communication</option>
                  <option value="Mechanical">Mechanical Engineering</option>
                  <option value="Civil">Civil Engineering</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Cumulative CGPA</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="10"
                  value={cgpa}
                  onChange={(e) => setCgpa(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">GitHub Profile URL</label>
                <input
                  type="url"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  placeholder="https://github.com/username"
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">LinkedIn Profile URL</label>
                <input
                  type="url"
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  placeholder="https://linkedin.com/in/username"
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Bio / Passions</label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save to Database</span>
              </button>
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Academic Details */}
            <div className="lg:col-span-6 saas-card p-6 space-y-5">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <GraduationCap className="w-5 h-5 text-blue-600" />
                <div>
                  <h2 className="text-sm font-bold text-slate-900">Academic Details</h2>
                  <p className="text-xs text-slate-500">Institutional records &amp; verifiable credentials</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase">College / Institute</span>
                  <p className="text-xs font-semibold text-slate-800 mt-1">{studentProfile.academic.college || 'Unspecified'}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase">Department</span>
                  <p className="text-xs font-semibold text-slate-800 mt-1">{studentProfile.academic.department || 'CSE'}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase">Year &amp; Semester</span>
                  <p className="text-xs font-semibold text-slate-800 mt-1">
                    {studentProfile.academic.year} • {studentProfile.academic.semester}
                  </p>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase">CGPA</span>
                  <p className="text-xs font-bold text-blue-600 mt-1">{studentProfile.academic.cgpa} / 10.0</p>
                </div>
              </div>
            </div>

            {/* Professional & Builder Details */}
            <div className="lg:col-span-6 saas-card p-6 space-y-5">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <Award className="w-5 h-5 text-emerald-600" />
                <div>
                  <h2 className="text-sm font-bold text-slate-900">Professional &amp; Builder Proofs</h2>
                  <p className="text-xs text-slate-500">Live projects, open-source &amp; verified links</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-3 bg-blue-50/50 rounded-lg border border-blue-100">
                  <span className="text-lg font-bold text-blue-700">{studentProfile.professional.totalProjects}</span>
                  <span className="text-[10px] block text-slate-500 font-medium">Projects</span>
                </div>
                <div className="p-3 bg-amber-50/50 rounded-lg border border-amber-100">
                  <span className="text-lg font-bold text-amber-700">{studentProfile.professional.hackathonWins}</span>
                  <span className="text-[10px] block text-slate-500 font-medium">Hackathons</span>
                </div>
                <div className="p-3 bg-purple-50/50 rounded-lg border border-purple-100">
                  <span className="text-lg font-bold text-purple-700">{studentProfile.professional.researchPapers}</span>
                  <span className="text-[10px] block text-slate-500 font-medium">Papers</span>
                </div>
                <div className="p-3 bg-emerald-50/50 rounded-lg border border-emerald-100">
                  <span className="text-lg font-bold text-emerald-700">
                    {studentProfile.professional.openSourceContributions}
                  </span>
                  <span className="text-[10px] block text-slate-500 font-medium">Commits/PRs</span>
                </div>
              </div>

              {/* External Links */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-slate-700 block">External Credentials</span>
                <div className="flex flex-wrap gap-2">
                  {studentProfile.professional.githubUrl ? (
                    <a
                      href={studentProfile.professional.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-medium text-slate-700 hover:border-slate-300"
                    >
                      <GitBranch className="w-3.5 h-3.5 text-slate-900" />
                      <span>GitHub Connected</span>
                    </a>
                  ) : (
                    <span className="text-xs text-slate-400">GitHub: Not connected</span>
                  )}
                  {studentProfile.professional.linkedinUrl ? (
                    <a
                      href={studentProfile.professional.linkedinUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-medium text-slate-700 hover:border-slate-300"
                    >
                      <Share2 className="w-3.5 h-3.5 text-blue-600" />
                      <span>LinkedIn Verified</span>
                    </a>
                  ) : (
                    <span className="text-xs text-slate-400">LinkedIn: Not connected</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </PortalLayout>
  );
}
