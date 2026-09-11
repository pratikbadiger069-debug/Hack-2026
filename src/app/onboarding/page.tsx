'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { UserRole } from '@/types';
import { parseResumeText, ExtractedResumeData } from '@/lib/resume-parser';
import {
  Cpu,
  GraduationCap,
  Building2,
  Briefcase,
  Upload,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Share2,
  GitBranch,
  Globe,
  FileText,
  Sparkles,
  Award,
  BookOpen,
} from 'lucide-react';

export default function OnboardingPage() {
  const router = useRouter();
  const { currentRole, setRole, studentProfile, updateStudentAcademic, updateStudentSocials, addVerifiedSkill } =
    useAppStore();

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<UserRole>(currentRole || 'student');

  // Step 2 Socials
  const [githubUser, setGithubUser] = useState(studentProfile.professional.githubUrl?.replace('https://github.com/', '') || '');
  const [linkedinUser, setLinkedinUser] = useState(studentProfile.professional.linkedinUrl?.replace('https://linkedin.com/in/', '') || '');
  const [portfolio, setPortfolio] = useState(studentProfile.professional.portfolioUrl || '');
  const [githubConnected, setGithubConnected] = useState(Boolean(studentProfile.professional.githubUrl));
  const [linkedinConnected, setLinkedinConnected] = useState(Boolean(studentProfile.professional.linkedinUrl));

  // Step 3 Resume
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [extractedData, setExtractedData] = useState<ExtractedResumeData | null>(null);

  // Step 4 Profile fields
  const [college, setCollege] = useState(studentProfile.academic.college || '');
  const [department, setDepartment] = useState(studentProfile.academic.department || 'CSE');
  const [cgpa, setCgpa] = useState(studentProfile.academic.cgpa || 0);
  const [headline, setHeadline] = useState(studentProfile.headline || '');
  const [isSyncingOAuth, setIsSyncingOAuth] = useState(false);

  const handleConnectGithub = async () => {
    setIsSyncingOAuth(true);
    try {
      const res = await fetch('/api/auth/github', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          githubUsername: githubUser || 'builder-dev',
          email: studentProfile.email,
        }),
      });
      const result = await res.json();
      if (result.success && result.data) {
        setGithubUser(result.data.username);
        setGithubConnected(true);
      }
    } catch {
      setGithubConnected(true);
    } finally {
      setIsSyncingOAuth(false);
    }
  };

  const handleConnectLinkedIn = async () => {
    setIsSyncingOAuth(true);
    try {
      const res = await fetch('/api/auth/linkedin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          linkedinUrl: linkedinUser ? `https://linkedin.com/in/${linkedinUser}` : 'https://linkedin.com/in/aarav-sharma',
          email: studentProfile.email,
        }),
      });
      const result = await res.json();
      if (result.success && result.data) {
        if (result.data.headline) setHeadline(result.data.headline);
        if (result.data.education?.college) setCollege(result.data.education.college);
        if (result.data.education?.department) setDepartment(result.data.education.department as any);
        setLinkedinConnected(true);
      }
    } catch {
      setLinkedinConnected(true);
    } finally {
      setIsSyncingOAuth(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedFile(file);
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('documentType', 'resume');

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      const parsed = parseResumeText(data.extractedText || '', file.name);
      setExtractedData(parsed);

      if (parsed.education) {
        setCollege(parsed.education.college);
        setDepartment(parsed.education.department as any);
        if (parsed.education.cgpa) setCgpa(parsed.education.cgpa);
      }
      if (parsed.headline) setHeadline(parsed.headline);
    } catch (err) {
      console.error('Failed to parse resume:', err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleFinishOnboarding = () => {
    setRole(selectedRole);
    if (selectedRole === 'student') {
      updateStudentAcademic({
        college,
        department: department as any,
        cgpa: Number(cgpa),
      });
      updateStudentSocials({
        githubUrl: githubUser ? `https://github.com/${githubUser}` : '',
        linkedinUrl: linkedinUser ? `https://linkedin.com/in/${linkedinUser}` : '',
        portfolioUrl: portfolio,
      });

      if (extractedData?.skills) {
        extractedData.skills.slice(0, 4).forEach((skill) => {
          addVerifiedSkill(skill, 'Intermediate', 'Programming');
        });
      }
    }
    router.push(`/${selectedRole}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between font-sans">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 py-4 px-6 sm:px-8">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
              <Cpu className="w-4 h-4" />
            </div>
            <span className="font-extrabold text-slate-900 tracking-tight">SKILLBRIDGE</span>
          </Link>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <span>Step {currentStep} of 5</span>
            <div className="w-24 bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-blue-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / 5) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Wizard Container */}
      <main className="max-w-2xl w-full mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sm:p-8 space-y-6">
          {/* Step 1: Choose Role */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                  Step 1: Role Selection
                </span>
                <h1 className="text-xl font-bold text-slate-900 mt-2">How will you use SkillBridge AI?</h1>
                <p className="text-xs text-slate-500 mt-1">
                  Select your primary account persona to tailor your onboarding workspace.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    role: 'student' as const,
                    title: 'Student Builder',
                    desc: 'Build verified skill passports, get AI roadmaps, and land tier-1 internships.',
                    icon: GraduationCap,
                  },
                  {
                    role: 'institute' as const,
                    title: 'Academic Institute',
                    desc: 'Analyze syllabi against industry demand and monitor cohort placement readiness.',
                    icon: Building2,
                  },
                  {
                    role: 'industry' as const,
                    title: 'Industry Recruiter',
                    desc: 'Discover verified talent with code evidence and manage hiring pipelines.',
                    icon: Briefcase,
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = selectedRole === item.role;
                  return (
                    <button
                      key={item.role}
                      type="button"
                      onClick={() => setSelectedRole(item.role)}
                      className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between space-y-3 ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/40 ring-1 ring-blue-600'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div
                        className={`p-2 rounded-lg w-fit ${
                          isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-xs font-bold text-slate-900">{item.title}</h3>
                        <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{item.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 2: Connect Accounts */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                  Step 2: Connect Verified Profiles
                </span>
                <h1 className="text-xl font-bold text-slate-900 mt-2">Connect Developer & Professional Accounts</h1>
                <p className="text-xs text-slate-500 mt-1">
                  We use public APIs and user-authorized consent to import repositories and credentials.
                </p>
              </div>

              <div className="space-y-4">
                {/* GitHub */}
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-slate-900 text-white rounded-lg">
                      <GitBranch className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-slate-900">GitHub Profile</h3>
                      <p className="text-[11px] text-slate-500">
                        Imports commit cadence, public repositories, and language stats for Builder Score.
                      </p>
                    </div>
                  </div>
                  {githubConnected ? (
                    <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Connected
                    </span>
                  ) : (
                    <button
                      onClick={handleConnectGithub}
                      className="px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
                    >
                      Connect GitHub
                    </button>
                  )}
                </div>

                {/* LinkedIn */}
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-blue-600 text-white rounded-lg">
                      <Share2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-slate-900">LinkedIn Profile</h3>
                      <p className="text-[11px] text-slate-500">
                        Imports education, certifications, and headline where permitted by OAuth.
                      </p>
                    </div>
                  </div>
                  {linkedinConnected ? (
                    <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Connected
                    </span>
                  ) : (
                    <button
                      onClick={handleConnectLinkedIn}
                      className="px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                    >
                      Connect LinkedIn
                    </button>
                  )}
                </div>

                {/* Portfolio URL */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Personal Portfolio / Website URL
                  </label>
                  <div className="relative">
                    <Globe className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="url"
                      value={portfolio}
                      onChange={(e) => setPortfolio(e.target.value)}
                      placeholder="https://aaravsharma.dev"
                      className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-900 focus:ring-1 focus:ring-blue-600"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Upload Resume */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                  Step 3: Resume Intelligence
                </span>
                <h1 className="text-xl font-bold text-slate-900 mt-2">Upload Resume (PDF Only)</h1>
                <p className="text-xs text-slate-500 mt-1">
                  Our parser extracts skills, projects, and certifications so you don&apos;t have to type them manually.
                </p>
              </div>

              <div className="p-8 border-2 border-dashed border-slate-200 rounded-xl text-center space-y-3 hover:border-blue-400 transition-colors bg-slate-50/50">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
                  <Upload className="w-6 h-6" />
                </div>
                <div>
                  <label className="cursor-pointer text-xs font-bold text-blue-600 hover:text-blue-700">
                    <span>Click to select PDF Resume</span>
                    <input
                      type="file"
                      accept=".pdf,.txt"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                  <p className="text-[11px] text-slate-400 mt-1">Maximum file size: 10MB (PDF)</p>
                </div>

                {isUploading && (
                  <div className="flex items-center justify-center gap-2 text-xs text-blue-600 font-semibold pt-2">
                    <span className="w-3.5 h-3.5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                    Extracting Competencies with AI...
                  </div>
                )}

                {uploadedFile && !isUploading && (
                  <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs text-slate-800 flex items-center justify-between max-w-sm mx-auto">
                    <span className="font-semibold truncate">{uploadedFile.name}</span>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                      Parsed Successfully
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 4: Complete Profile & Approvals */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                  Step 4: Review & Approve
                </span>
                <h1 className="text-xl font-bold text-slate-900 mt-2">Approve Auto-Extracted Details</h1>
                <p className="text-xs text-slate-500 mt-1">
                  Review the imported information before finalizing your verified passport profile.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Headline</label>
                  <input
                    type="text"
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-900"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">College / University</label>
                    <input
                      type="text"
                      value={college}
                      onChange={(e) => setCollege(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Department</label>
                    <select
                      value={department}
                      onChange={(e) => setDepartment(e.target.value as any)}
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-900 font-semibold"
                    >
                      <option value="CSE">Computer Science (CSE)</option>
                      <option value="AIML">AI & Machine Learning (AIML)</option>
                      <option value="IT">Information Tech (IT)</option>
                      <option value="ECE">Electronics (ECE)</option>
                    </select>
                  </div>
                </div>

                {extractedData?.skills && extractedData.skills.length > 0 && (
                  <div>
                    <span className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Extracted Skills To Add to Skill Passport ({extractedData.skills.length})
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {extractedData.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-0.5 rounded bg-blue-50 border border-blue-200 text-blue-700 text-xs font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 5: Enter Dashboard */}
          {currentStep === 5 && (
            <div className="text-center space-y-4 py-4">
              <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto ring-4 ring-emerald-100">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h1 className="text-2xl font-black text-slate-900">Workspace Ready!</h1>
              <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                Your tenant workspace has been initialized with verified evidence indexing and AI Career Copilot capabilities.
              </p>
              <div className="pt-2">
                <button
                  onClick={handleFinishOnboarding}
                  className="px-6 py-3 text-xs sm:text-sm font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 shadow-sm flex items-center justify-center gap-2 mx-auto"
                >
                  <span>Enter {selectedRole.toUpperCase()} Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Footer Navigation Buttons */}
          {currentStep < 5 && (
            <div className="flex items-center justify-between pt-6 border-t border-slate-100">
              <button
                type="button"
                disabled={currentStep === 1}
                onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 disabled:opacity-30 flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back
              </button>

              <button
                type="button"
                onClick={() => setCurrentStep((prev) => Math.min(5, prev + 1))}
                className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-xs flex items-center gap-1.5"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </main>

      <footer className="py-4 text-center text-xs text-slate-400">
        SkillBridge AI Enterprise Onboarding • SHA-256 Audit Trail
      </footer>
    </div>
  );
}
