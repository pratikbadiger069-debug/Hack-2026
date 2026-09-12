'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/lib/store';
import {
  X,
  User,
  Building,
  GraduationCap,
  Briefcase,
  MapPin,
  Target,
  FileText,
  Globe,
  Save,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

function GithubIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

function LinkedinIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c-.97 0-1.75-.79-1.75-1.76s.78-1.75 1.75-1.75 1.75.78 1.75 1.75-.78 1.76-1.75 1.76m1.4 9.74v-8.37H5.06v8.37h2.8z" />
    </svg>
  );
}

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EditProfileModal({ isOpen, onClose }: EditProfileModalProps) {
  const { studentProfile, updateStudentFullProfile, addXP } = useAppStore();

  const [name, setName] = useState(studentProfile.name || '');
  const [headline, setHeadline] = useState(studentProfile.headline || '');
  const [bio, setBio] = useState(studentProfile.professional?.bio || '');
  const [degree, setDegree] = useState(studentProfile.academic?.degree || studentProfile.degree || 'B.Tech');
  const [branch, setBranch] = useState(studentProfile.academic?.branch || studentProfile.academic?.department || studentProfile.branch || 'CSE');
  const [college, setCollege] = useState(studentProfile.academic?.college || studentProfile.college || 'HITAM');
  const [graduationYear, setGraduationYear] = useState(studentProfile.academic?.graduationYear || studentProfile.graduationYear || '2026');
  const [city, setCity] = useState(studentProfile.academic?.city || studentProfile.city || 'Hyderabad');
  const [stateName, setStateName] = useState(studentProfile.academic?.state || studentProfile.state || 'Telangana');
  const [careerGoal, setCareerGoal] = useState(studentProfile.careerGoal || studentProfile.professional?.careerGoal || 'High-Impact AI Systems Internship');
  const [targetRole, setTargetRole] = useState(studentProfile.targetRole || 'AI Engineer');
  
  // Professional Links
  const [githubUsername, setGithubUsername] = useState(
    studentProfile.professional?.githubUrl?.replace('https://github.com/', '').replace('/', '') || 'manutejreddy'
  );
  const [linkedinUrl, setLinkedinUrl] = useState(
    studentProfile.professional?.linkedinUrl || 'https://linkedin.com/in/manutejreddy'
  );
  const [portfolioUrl, setPortfolioUrl] = useState(
    studentProfile.professional?.portfolioUrl || 'https://manutejreddy.dev'
  );
  const [resumeUrl, setResumeUrl] = useState(
    studentProfile.professional?.resumeUrl || '/resumes/manutej-reddy-resume.pdf'
  );

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const cleanGithub = githubUsername.trim().replace('https://github.com/', '').replace('/', '');
    const cleanGithubUrl = cleanGithub ? `https://github.com/${cleanGithub}` : '';
    const cleanLinkedin = linkedinUrl.trim();

    updateStudentFullProfile({
      name,
      headline,
      degree,
      branch,
      college,
      graduationYear,
      city,
      state: stateName,
      careerGoal,
      targetRole,
      academic: {
        college,
        department: branch,
        branch,
        degree,
        graduationYear,
        city,
        state: stateName,
      },
      professional: {
        ...studentProfile.professional,
        bio,
        githubUrl: cleanGithubUrl,
        linkedinUrl: cleanLinkedin,
        portfolioUrl: portfolioUrl.trim(),
        resumeUrl: resumeUrl.trim(),
        careerGoal,
      },
    });

    addXP(30, 'Updated Verified Professional Identity');
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            className="relative w-full max-w-3xl bg-white rounded-3xl border border-[#E8E5DD] shadow-2xl z-10 overflow-hidden my-8"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#E8E5DD] bg-[#FAF9F5]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#1B1B1B] text-white flex items-center justify-center">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#1B1B1B]">Edit Professional Identity</h3>
                  <p className="text-xs text-[#6F6A60]">
                    SkillBridge uses this unified identity layer for verification, opportunity matching, and industry recruiter discovery.
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-[#6F6A60] hover:text-[#1B1B1B] hover:bg-[#E8E5DD] rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSave} className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
              
              {/* Section 1: Personal & Professional Identity */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-[#6F6A60] uppercase tracking-wider flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-[#C76A2A]" />
                  Personal Information
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1B1B1B] mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-[#FAF9F5] border border-[#E8E5DD] rounded-xl text-[#1B1B1B] focus:outline-none focus:border-[#C76A2A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1B1B1B] mb-1">Professional Headline</label>
                    <input
                      type="text"
                      required
                      value={headline}
                      onChange={(e) => setHeadline(e.target.value)}
                      placeholder="e.g. Distributed Systems Engineer | AI Systems Builder"
                      className="w-full px-3 py-2 text-xs bg-[#FAF9F5] border border-[#E8E5DD] rounded-xl text-[#1B1B1B] focus:outline-none focus:border-[#C76A2A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1B1B1B] mb-1">Bio / Summary</label>
                  <textarea
                    rows={3}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Briefly describe your technical passion, engineering domain, and key achievements..."
                    className="w-full px-3 py-2 text-xs bg-[#FAF9F5] border border-[#E8E5DD] rounded-xl text-[#1B1B1B] focus:outline-none focus:border-[#C76A2A]"
                  />
                </div>
              </div>

              {/* Section 2: Academic Details */}
              <div className="space-y-4 pt-4 border-t border-[#E8E5DD]">
                <h4 className="text-xs font-bold text-[#6F6A60] uppercase tracking-wider flex items-center gap-2">
                  <GraduationCap className="w-3.5 h-3.5 text-[#C76A2A]" />
                  Academic Information
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1B1B1B] mb-1">Degree</label>
                    <input
                      type="text"
                      value={degree}
                      onChange={(e) => setDegree(e.target.value)}
                      placeholder="e.g. B.Tech / B.E / M.S"
                      className="w-full px-3 py-2 text-xs bg-[#FAF9F5] border border-[#E8E5DD] rounded-xl text-[#1B1B1B] focus:outline-none focus:border-[#C76A2A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1B1B1B] mb-1">Branch / Department</label>
                    <input
                      type="text"
                      value={branch}
                      onChange={(e) => setBranch(e.target.value)}
                      placeholder="e.g. CSE / AIML / ECE"
                      className="w-full px-3 py-2 text-xs bg-[#FAF9F5] border border-[#E8E5DD] rounded-xl text-[#1B1B1B] focus:outline-none focus:border-[#C76A2A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1B1B1B] mb-1">Graduation Year</label>
                    <input
                      type="text"
                      value={graduationYear}
                      onChange={(e) => setGraduationYear(e.target.value)}
                      placeholder="e.g. 2026"
                      className="w-full px-3 py-2 text-xs bg-[#FAF9F5] border border-[#E8E5DD] rounded-xl text-[#1B1B1B] focus:outline-none focus:border-[#C76A2A]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1B1B1B] mb-1">Institution / College</label>
                    <input
                      type="text"
                      value={college}
                      onChange={(e) => setCollege(e.target.value)}
                      placeholder="e.g. HITAM / IIT Hyderabad"
                      className="w-full px-3 py-2 text-xs bg-[#FAF9F5] border border-[#E8E5DD] rounded-xl text-[#1B1B1B] focus:outline-none focus:border-[#C76A2A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1B1B1B] mb-1">City</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-[#FAF9F5] border border-[#E8E5DD] rounded-xl text-[#1B1B1B] focus:outline-none focus:border-[#C76A2A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1B1B1B] mb-1">State</label>
                    <input
                      type="text"
                      value={stateName}
                      onChange={(e) => setStateName(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-[#FAF9F5] border border-[#E8E5DD] rounded-xl text-[#1B1B1B] focus:outline-none focus:border-[#C76A2A]"
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: Career Goals & Target Role */}
              <div className="space-y-4 pt-4 border-t border-[#E8E5DD]">
                <h4 className="text-xs font-bold text-[#6F6A60] uppercase tracking-wider flex items-center gap-2">
                  <Target className="w-3.5 h-3.5 text-[#C76A2A]" />
                  Career Goals & Target Role
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1B1B1B] mb-1">Primary Career Goal</label>
                    <input
                      type="text"
                      value={careerGoal}
                      onChange={(e) => setCareerGoal(e.target.value)}
                      placeholder="e.g. Tier-1 High-Throughput Backend Internship"
                      className="w-full px-3 py-2 text-xs bg-[#FAF9F5] border border-[#E8E5DD] rounded-xl text-[#1B1B1B] focus:outline-none focus:border-[#C76A2A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1B1B1B] mb-1">Target Role</label>
                    <input
                      type="text"
                      value={targetRole}
                      onChange={(e) => setTargetRole(e.target.value)}
                      placeholder="e.g. AI Systems Engineer"
                      className="w-full px-3 py-2 text-xs bg-[#FAF9F5] border border-[#E8E5DD] rounded-xl text-[#1B1B1B] focus:outline-none focus:border-[#C76A2A]"
                    />
                  </div>
                </div>
              </div>

              {/* Section 4: Professional Verification Links */}
              <div className="space-y-4 pt-4 border-t border-[#E8E5DD]">
                <h4 className="text-xs font-bold text-[#6F6A60] uppercase tracking-wider flex items-center gap-2">
                  <Globe className="w-3.5 h-3.5 text-[#C76A2A]" />
                  Professional Verification Links (Core Identity)
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1B1B1B] mb-1 flex items-center gap-1.5">
                      <GithubIcon className="w-3.5 h-3.5 text-[#1B1B1B]" />
                      <span>GitHub Username</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-[#6F6A60]">
                        github.com/
                      </span>
                      <input
                        type="text"
                        value={githubUsername}
                        onChange={(e) => setGithubUsername(e.target.value)}
                        placeholder="yourusername"
                        className="w-full pl-24 pr-3 py-2 text-xs bg-[#FAF9F5] border border-[#E8E5DD] rounded-xl text-[#1B1B1B] focus:outline-none focus:border-[#C76A2A]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1B1B1B] mb-1 flex items-center gap-1.5">
                      <LinkedinIcon className="w-3.5 h-3.5 text-[#0077B5]" />
                      <span>LinkedIn Profile URL</span>
                    </label>
                    <input
                      type="url"
                      value={linkedinUrl}
                      onChange={(e) => setLinkedinUrl(e.target.value)}
                      placeholder="https://linkedin.com/in/yourprofile"
                      className="w-full px-3 py-2 text-xs bg-[#FAF9F5] border border-[#E8E5DD] rounded-xl text-[#1B1B1B] focus:outline-none focus:border-[#C76A2A]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1B1B1B] mb-1 flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-[#C76A2A]" />
                      <span>Portfolio Website URL (Optional)</span>
                    </label>
                    <input
                      type="url"
                      value={portfolioUrl}
                      onChange={(e) => setPortfolioUrl(e.target.value)}
                      placeholder="https://yourportfolio.dev"
                      className="w-full px-3 py-2 text-xs bg-[#FAF9F5] border border-[#E8E5DD] rounded-xl text-[#1B1B1B] focus:outline-none focus:border-[#C76A2A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1B1B1B] mb-1 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-[#2F7A45]" />
                      <span>Resume Link / Document Path</span>
                    </label>
                    <input
                      type="text"
                      value={resumeUrl}
                      onChange={(e) => setResumeUrl(e.target.value)}
                      placeholder="/resumes/your-resume.pdf"
                      className="w-full px-3 py-2 text-xs bg-[#FAF9F5] border border-[#E8E5DD] rounded-xl text-[#1B1B1B] focus:outline-none focus:border-[#C76A2A]"
                    />
                  </div>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-[#E8E5DD] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-[#6F6A60] hover:text-[#1B1B1B] hover:bg-[#FAF9F5] rounded-xl transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={savedSuccess}
                  className={`px-5 py-2 rounded-xl text-xs font-bold text-white flex items-center gap-2 transition-all ${
                    savedSuccess ? 'bg-[#2F7A45]' : 'bg-[#1B1B1B] hover:bg-[#C76A2A]'
                  }`}
                >
                  {savedSuccess ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Saved & Synced!</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Save Professional Identity</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
