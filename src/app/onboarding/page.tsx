'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/lib/store';
import { getUserDisplayName } from '@/lib/user-utils';
import {
  Compass,
  GraduationCap,
  Briefcase,
  Upload,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Share2,
  Globe,
  Sparkles,
  Award,
  BookOpen,
  Code2,
  Cpu,
  Layers,
  Check,
  AlertCircle,
  Loader2,
  ShieldCheck,
  Flame,
  FileText,
} from 'lucide-react';

const DEGREE_OPTIONS = [
  'B.Tech',
  'B.E.',
  'B.S. / B.Sc',
  'BCA',
  'M.Tech',
  'M.S.',
  'MCA',
  'Other',
];

const BRANCH_OPTIONS = [
  'Computer Science & Engineering (CSE)',
  'AI & Machine Learning (AIML)',
  'Data Science',
  'Information Technology (IT)',
  'Electronics & Communication (ECE)',
  'Electrical & Electronics (EEE)',
  'Mechanical Engineering',
  'Other',
];

const GRAD_YEAR_OPTIONS = ['2025', '2026', '2027', '2028', '2029', '2030'];

const SEMESTER_OPTIONS = [
  '1st Semester',
  '2nd Semester',
  '3rd Semester',
  '4th Semester',
  '5th Semester',
  '6th Semester',
  '7th Semester',
  '8th Semester',
];

const CAREER_PATH_OPTIONS = [
  { id: 'Software Development', label: 'Software Development', icon: '💻', desc: 'Full-stack, Backend, and Frontend Systems' },
  { id: 'AI / Machine Learning', label: 'AI / Machine Learning', icon: '🧠', desc: 'LLMs, PyTorch, Deep Learning, and RAG' },
  { id: 'Data Science', label: 'Data Science', icon: '📊', desc: 'Analytics, Feature Pipelines, and Predictive Models' },
  { id: 'Cybersecurity', label: 'Cybersecurity', icon: '🛡️', desc: 'Threat Hunting, SIEM, and Pen-testing' },
  { id: 'Cloud Computing', label: 'Cloud Computing', icon: '☁️', desc: 'AWS, Azure, Microservices, and Serverless' },
  { id: 'DevOps', label: 'DevOps & Site Reliability', icon: '⚙️', desc: 'Kubernetes, CI/CD, Docker, and Monitoring' },
  { id: 'Product Management', label: 'Product Management', icon: '🎯', desc: 'Product PRDs, Roadmaps, and UX Strategy' },
  { id: 'UI/UX Design', label: 'UI/UX Design', icon: '🎨', desc: 'Figma, Design Systems, and Motion UX' },
  { id: 'Entrepreneurship', label: 'Entrepreneurship', icon: '🚀', desc: '0-to-1 Startup Building and Tech Innovation' },
  { id: 'Other', label: 'Other Engineering Field', icon: '🔬', desc: 'Specialized Emerging Technologies' },
];

const SKILL_LEVEL_OPTIONS = [
  { id: 'Beginner', label: 'Beginner', desc: 'Learning core fundamentals and writing first programs' },
  { id: 'Intermediate', label: 'Intermediate', desc: 'Built a few projects, comfortable with frameworks and APIs' },
  { id: 'Advanced', label: 'Advanced', desc: 'Production-ready builder, high concurrency or deep AI pipelines' },
];

const PRIMARY_GOAL_OPTIONS = [
  { id: 'Internship', label: 'Internship', icon: '💼', desc: 'Land a tier-1 summer or off-campus internship' },
  { id: 'Job Placement', label: 'Job Placement', icon: '🎓', desc: 'Secure full-time campus or industry placement' },
  { id: 'Freelancing', label: 'Freelancing', icon: '🌐', desc: 'Earn by building client products and consulting' },
  { id: 'Startup Building', label: 'Startup Building', icon: '⚡', desc: 'Ship a high-growth SaaS or tech startup' },
  { id: 'Higher Studies', label: 'Higher Studies', icon: '📚', desc: 'Pursue Master’s or Research programs abroad/India' },
];

const TECH_OPTIONS = [
  'C',
  'C++',
  'Java',
  'Python',
  'JavaScript',
  'TypeScript',
  'SQL',
  'React',
  'Node.js',
  'Next.js',
  'Machine Learning',
  'Cloud',
  'Other',
];

const PROJECT_COUNT_OPTIONS = ['0', '1–2', '3–5', '5+'];

function isValidUrl(str: string): boolean {
  if (!str) return true; // Optional allowed
  try {
    const url = new URL(str.startsWith('http') ? str : `https://${str}`);
    return Boolean(url.hostname);
  } catch {
    return false;
  }
}

export default function OnboardingPage() {
  const router = useRouter();
  const { currentUser, studentProfile, setRole } = useAppStore();

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [urlError, setUrlError] = useState<string | null>(null);

  // Step 1: Basic Information
  const [fullName, setFullName] = useState(
    getUserDisplayName(studentProfile, currentUser)
  );
  const [college, setCollege] = useState(studentProfile?.academic?.college || studentProfile?.college || '');
  const [degree, setDegree] = useState(studentProfile?.academic?.degree || studentProfile?.degree || 'B.Tech');
  const [branch, setBranch] = useState(studentProfile?.academic?.department || studentProfile?.department || 'Computer Science & Engineering (CSE)');
  const [graduationYear, setGraduationYear] = useState(studentProfile?.academic?.graduationYear || studentProfile?.graduationYear || '2026');
  const [semester, setSemester] = useState(studentProfile?.academic?.semester || '6th Semester');
  const [city, setCity] = useState(studentProfile?.academic?.city || studentProfile?.city || 'Hyderabad');
  const [state, setState] = useState(studentProfile?.academic?.state || studentProfile?.state || 'Telangana');
  const [country, setCountry] = useState(studentProfile?.academic?.country || studentProfile?.country || 'India');

  // Step 2: Career Interests
  const [careerPath, setCareerPath] = useState(studentProfile?.careerPath || 'Software Development');
  const [skillLevel, setSkillLevel] = useState(studentProfile?.skillLevel || 'Intermediate');
  const [careerGoal, setCareerGoal] = useState(studentProfile?.careerGoal || 'Internship');

  // Step 3: Profile Links
  const autoGithub =
    studentProfile?.professional?.githubUrl ||
    (currentUser?.name && !currentUser.name.includes('@') ? `https://github.com/${currentUser.name.toLowerCase().replace(/\s+/g, '-')}` : '');

  const [githubUrl, setGithubUrl] = useState(autoGithub);
  const [linkedinUrl, setLinkedinUrl] = useState(studentProfile?.professional?.linkedinUrl || '');
  const [portfolioUrl, setPortfolioUrl] = useState(studentProfile?.professional?.portfolioUrl || '');
  const [resumeFileName, setResumeFileName] = useState('');
  const [isUploadingResume, setIsUploadingResume] = useState(false);

  // Step 4: Skills Assessment Setup
  const [knownSkills, setKnownSkills] = useState<string[]>(
    studentProfile?.knownSkills && studentProfile.knownSkills.length > 0
      ? studentProfile.knownSkills
      : ['Python', 'JavaScript', 'React']
  );
  const [projectCount, setProjectCount] = useState(studentProfile?.projectCount || '1–2');
  const [hackathonExperience, setHackathonExperience] = useState(studentProfile?.hackathonExperience || 'No');

  // Step 5: Generated Builder Profile Output
  const [generatedData, setGeneratedData] = useState<{
    calculatedBuilderScore: number;
    careerReadinessScore: number;
    starterXP: number;
    builderLevel: string;
    recommendedRoadmap: any;
  } | null>(null);

  // Auto-fill GitHub if OAuth name is present
  useEffect(() => {
    if (!githubUrl && currentUser?.name && !currentUser.name.includes('@')) {
      setGithubUrl(`https://github.com/${currentUser.name.toLowerCase().replace(/\s+/g, '-')}`);
    }
  }, [currentUser, githubUrl]);

  // Validation checks
  const isStep1Valid = Boolean(
    fullName.trim() &&
    college.trim() &&
    degree.trim() &&
    branch.trim() &&
    graduationYear.trim() &&
    semester.trim() &&
    country.trim() &&
    city.trim()
  );

  const isStep2Valid = Boolean(careerPath && skillLevel && careerGoal);

  const isStep3Valid = Boolean(
    githubUrl.trim() &&
    linkedinUrl.trim() &&
    isValidUrl(githubUrl) &&
    isValidUrl(linkedinUrl) &&
    (!portfolioUrl.trim() || isValidUrl(portfolioUrl))
  );

  const isStep4Valid = knownSkills.length > 0 && Boolean(projectCount) && Boolean(hackathonExperience);

  const handleToggleTech = (tech: string) => {
    setKnownSkills((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
  };

  const handleResumeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploadingResume(true);
    setResumeFileName(file.name);
    setTimeout(() => {
      setIsUploadingResume(false);
    }, 800);
  };

  const handleGenerateProfile = async () => {
    setIsSubmitting(true);
    setUrlError(null);

    const email = currentUser?.email || studentProfile?.email || 'builder@skillbridge.io';

    try {
      const res = await fetch('/api/students/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          email,
          college,
          degree,
          branch,
          graduationYear,
          semester,
          city,
          state,
          country,
          careerPath,
          skillLevel,
          careerGoal,
          githubUrl: githubUrl.startsWith('http') ? githubUrl : `https://${githubUrl}`,
          linkedinUrl: linkedinUrl.startsWith('http') ? linkedinUrl : `https://${linkedinUrl}`,
          portfolioUrl: portfolioUrl ? (portfolioUrl.startsWith('http') ? portfolioUrl : `https://${portfolioUrl}`) : '',
          resumeUrl: resumeFileName ? `/resumes/${resumeFileName}` : '',
          knownSkills,
          projectCount,
          hackathonExperience,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to generate builder profile.');
      }

      setGeneratedData({
        calculatedBuilderScore: data.calculatedBuilderScore || 450,
        careerReadinessScore: data.careerReadinessScore || 70,
        starterXP: data.starterXP || 100,
        builderLevel: data.builderLevel || 'Explorer',
        recommendedRoadmap: data.recommendedRoadmap || {
          targetRole: careerPath,
          suggestedFirstAssessment: `${careerPath} Foundations Benchmark`,
        },
      });

      // Update Zustand Store
      const store = useAppStore.getState();
      store.setRole('student');
      store.addXP(100, 'Completed Builder Profile Onboarding');

      // Sync verified skills & profile
      if (data.profile) {
        useAppStore.setState((state) => ({
          studentProfile: {
            ...state.studentProfile,
            ...data.profile,
            onboardingCompleted: true,
          },
        }));
      }

      setStep(5);
    } catch (err: any) {
      setUrlError(err.message || 'Error creating profile. Please check all fields.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEnterSkillBridge = () => {
    router.push('/student');
  };

  return (
    <div className="min-h-screen bg-[#F6F4EE] flex flex-col justify-between font-sans antialiased text-[#1B1B1B]">
      {/* Top Header & Brand Bar */}
      <header className="bg-white border-b border-[#E8E5DD] py-4 px-6 sm:px-8 sticky top-0 z-30 shadow-none">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-[#1B1B1B] flex items-center justify-center text-[#F6F4EE] font-bold text-xs shadow-none">
              SB
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-[#1B1B1B] text-sm tracking-tight">SkillBridge</span>
              <span className="text-[10px] text-[#6E6E6A] font-medium">Builder Onboarding</span>
            </div>
          </Link>

          {/* Stepper indicator */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#1B1B1B]">
              <span className="text-[#C76A2A]">Step {step}</span>
              <span className="text-[#6E6E6A]">of 5</span>
            </div>
            <div className="w-28 bg-[#FAF9F5] border border-[#E8E5DD] h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#C76A2A] h-full rounded-full transition-all duration-300"
                style={{ width: `${(step / 5) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Wizard Content Area */}
      <main className="max-w-2xl w-full mx-auto px-4 py-8 sm:py-10">
        <div className="bg-white rounded-2xl border border-[#E8E5DD] shadow-none p-6 sm:p-8 space-y-6">
          {/* STEP 1: Basic Information */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#C76A2A] bg-[#C76A2A]/10 px-2.5 py-1 rounded-md font-mono">
                  Step 1 • Basic Information
                </span>
                <h1 className="text-xl font-bold text-[#1B1B1B] mt-2.5">Tell us about your academic journey</h1>
                <p className="text-xs text-[#6E6E6A] mt-1">
                  We verify your credentials to construct an authentic, recruiter-trusted university builder passport.
                </p>
              </div>

              <div className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold text-[#1B1B1B] mb-1">
                    Full Name <span className="text-[#C76A2A]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Aarav Sharma"
                    className="w-full px-3.5 py-2.5 text-xs bg-white border border-[#E8E5DD] rounded-xl text-[#1B1B1B] placeholder:text-[#9E9E9A] focus:outline-none focus:border-[#C76A2A] transition-colors"
                  />
                </div>

                {/* College / University */}
                <div>
                  <label className="block text-xs font-semibold text-[#1B1B1B] mb-1">
                    College / University <span className="text-[#C76A2A]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    placeholder="e.g. Hyderabad Institute of Technology and Management (HITAM)"
                    className="w-full px-3.5 py-2.5 text-xs bg-white border border-[#E8E5DD] rounded-xl text-[#1B1B1B] placeholder:text-[#9E9E9A] focus:outline-none focus:border-[#C76A2A] transition-colors"
                  />
                </div>

                {/* Degree & Branch */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-[#1B1B1B] mb-1">
                      Degree <span className="text-[#C76A2A]">*</span>
                    </label>
                    <select
                      value={degree}
                      onChange={(e) => setDegree(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-white border border-[#E8E5DD] rounded-xl text-[#1B1B1B] font-medium focus:outline-none focus:border-[#C76A2A] transition-colors"
                    >
                      {DEGREE_OPTIONS.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1B1B1B] mb-1">
                      Branch / Specialization <span className="text-[#C76A2A]">*</span>
                    </label>
                    <select
                      value={branch}
                      onChange={(e) => setBranch(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-white border border-[#E8E5DD] rounded-xl text-[#1B1B1B] font-medium focus:outline-none focus:border-[#C76A2A] transition-colors"
                    >
                      {BRANCH_OPTIONS.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Graduation Year & Semester */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-[#1B1B1B] mb-1">
                      Graduation Year <span className="text-[#C76A2A]">*</span>
                    </label>
                    <select
                      value={graduationYear}
                      onChange={(e) => setGraduationYear(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-white border border-[#E8E5DD] rounded-xl text-[#1B1B1B] font-medium focus:outline-none focus:border-[#C76A2A] transition-colors"
                    >
                      {GRAD_YEAR_OPTIONS.map((y) => (
                        <option key={y} value={y}>
                          Class of {y}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1B1B1B] mb-1">
                      Current Semester <span className="text-[#C76A2A]">*</span>
                    </label>
                    <select
                      value={semester}
                      onChange={(e) => setSemester(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-white border border-[#E8E5DD] rounded-xl text-[#1B1B1B] font-medium focus:outline-none focus:border-[#C76A2A] transition-colors"
                    >
                      {SEMESTER_OPTIONS.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* City, State & Country */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-[#1B1B1B] mb-1">
                      City <span className="text-[#C76A2A]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Hyderabad"
                      className="w-full px-3.5 py-2.5 text-xs bg-white border border-[#E8E5DD] rounded-xl text-[#1B1B1B] placeholder:text-[#9E9E9A] focus:outline-none focus:border-[#C76A2A] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1B1B1B] mb-1">
                      State <span className="text-[#C76A2A]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      placeholder="e.g. Telangana"
                      className="w-full px-3.5 py-2.5 text-xs bg-white border border-[#E8E5DD] rounded-xl text-[#1B1B1B] placeholder:text-[#9E9E9A] focus:outline-none focus:border-[#C76A2A] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1B1B1B] mb-1">
                      Country <span className="text-[#C76A2A]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      placeholder="e.g. India"
                      className="w-full px-3.5 py-2.5 text-xs bg-white border border-[#E8E5DD] rounded-xl text-[#1B1B1B] placeholder:text-[#9E9E9A] focus:outline-none focus:border-[#C76A2A] transition-colors"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Career Interests */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#C76A2A] bg-[#C76A2A]/10 px-2.5 py-1 rounded-md font-mono">
                  Step 2 • Career Interests
                </span>
                <h1 className="text-xl font-bold text-[#1B1B1B] mt-2.5">Define your engineering trajectory</h1>
                <p className="text-xs text-[#6E6E6A] mt-1">
                  Our AI Copilot configures customized benchmarks and learning quests based on your target role.
                </p>
              </div>

              {/* 1. Career Path */}
              <div className="space-y-2.5">
                <label className="block text-xs font-semibold text-[#1B1B1B]">
                  1. What career path are you interested in? <span className="text-[#C76A2A]">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {CAREER_PATH_OPTIONS.map((item) => {
                    const isSelected = careerPath === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setCareerPath(item.id)}
                        className={`p-3 rounded-xl border text-left transition-all flex items-start gap-2.5 cursor-pointer ${
                          isSelected
                            ? 'border-[#C76A2A] bg-[#C76A2A]/5 ring-1 ring-[#C76A2A]'
                            : 'border-[#E8E5DD] hover:border-[#1B1B1B] bg-white'
                        }`}
                      >
                        <span className="text-lg shrink-0 mt-0.5">{item.icon}</span>
                        <div>
                          <div className="text-xs font-bold text-[#1B1B1B]">{item.label}</div>
                          <div className="text-[10px] text-[#6E6E6A] mt-0.5 leading-tight">{item.desc}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Skill Level */}
              <div className="space-y-2.5 pt-2">
                <label className="block text-xs font-semibold text-[#1B1B1B]">
                  2. What is your current skill level? <span className="text-[#C76A2A]">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {SKILL_LEVEL_OPTIONS.map((lvl) => {
                    const isSelected = skillLevel === lvl.id;
                    return (
                      <button
                        key={lvl.id}
                        type="button"
                        onClick={() => setSkillLevel(lvl.id)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'border-[#C76A2A] bg-[#C76A2A]/5 ring-1 ring-[#C76A2A]'
                            : 'border-[#E8E5DD] hover:border-[#1B1B1B] bg-white'
                        }`}
                      >
                        <div className="text-xs font-bold text-[#1B1B1B]">{lvl.label}</div>
                        <div className="text-[10px] text-[#6E6E6A] mt-1 leading-tight">{lvl.desc}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Primary Goal */}
              <div className="space-y-2.5 pt-2">
                <label className="block text-xs font-semibold text-[#1B1B1B]">
                  3. What is your primary goal? <span className="text-[#C76A2A]">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {PRIMARY_GOAL_OPTIONS.map((g) => {
                    const isSelected = careerGoal === g.id;
                    return (
                      <button
                        key={g.id}
                        type="button"
                        onClick={() => setCareerGoal(g.id)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'border-[#C76A2A] bg-[#C76A2A]/5 ring-1 ring-[#C76A2A]'
                            : 'border-[#E8E5DD] hover:border-[#1B1B1B] bg-white'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 text-xs font-bold text-[#1B1B1B]">
                          <span>{g.icon}</span>
                          <span>{g.label}</span>
                        </div>
                        <div className="text-[10px] text-[#6E6E6A] mt-1 leading-tight">{g.desc}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Profile Links */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#C76A2A] bg-[#C76A2A]/10 px-2.5 py-1 rounded-md font-mono">
                  Step 3 • Profile Links
                </span>
                <h1 className="text-xl font-bold text-[#1B1B1B] mt-2.5">Connect your builder presence</h1>
                <p className="text-xs text-[#6E6E6A] mt-1">
                  We use your public profiles to verify projects, commit cadence, and code evidence.
                </p>
              </div>

              {urlError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-xs text-red-700">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{urlError}</span>
                </div>
              )}

              <div className="space-y-4">
                {/* GitHub URL */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-semibold text-[#1B1B1B]">
                      GitHub Profile URL <span className="text-[#C76A2A]">*</span>
                    </label>
                    {autoGithub && (
                      <span className="text-[10px] text-[#2F7A45] font-semibold bg-[#2F7A45]/10 px-2 py-0.5 rounded">
                        Auto-detected from OAuth
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <div className="w-8 h-8 rounded-lg bg-[#1B1B1B] text-white flex items-center justify-center absolute left-2 top-1/2 -translate-y-1/2 text-xs font-bold">
                      GH
                    </div>
                    <input
                      type="url"
                      required
                      value={githubUrl}
                      onChange={(e) => {
                        setGithubUrl(e.target.value);
                        setUrlError(null);
                      }}
                      placeholder="https://github.com/username"
                      className="w-full pl-12 pr-3.5 py-2.5 text-xs bg-white border border-[#E8E5DD] rounded-xl text-[#1B1B1B] placeholder:text-[#9E9E9A] focus:outline-none focus:border-[#C76A2A] transition-colors"
                    />
                  </div>
                  <p className="text-[10px] text-[#6E6E6A] mt-1">
                    Used to calculate commit velocity and verify repository architecture.
                  </p>
                </div>

                {/* LinkedIn URL */}
                <div>
                  <label className="block text-xs font-semibold text-[#1B1B1B] mb-1">
                    LinkedIn Profile URL <span className="text-[#C76A2A]">*</span>
                  </label>
                  <div className="relative">
                    <div className="w-8 h-8 rounded-lg bg-[#0077B5] text-white flex items-center justify-center absolute left-2 top-1/2 -translate-y-1/2 text-xs font-bold">
                      in
                    </div>
                    <input
                      type="url"
                      required
                      value={linkedinUrl}
                      onChange={(e) => {
                        setLinkedinUrl(e.target.value);
                        setUrlError(null);
                      }}
                      placeholder="https://linkedin.com/in/username"
                      className="w-full pl-12 pr-3.5 py-2.5 text-xs bg-white border border-[#E8E5DD] rounded-xl text-[#1B1B1B] placeholder:text-[#9E9E9A] focus:outline-none focus:border-[#C76A2A] transition-colors"
                    />
                  </div>
                </div>

                {/* Portfolio Website (Optional) */}
                <div>
                  <label className="block text-xs font-semibold text-[#1B1B1B] mb-1">
                    Portfolio Website <span className="text-[#6E6E6A] font-normal">(Optional)</span>
                  </label>
                  <div className="relative">
                    <Globe className="w-4 h-4 text-[#6E6E6A] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="url"
                      value={portfolioUrl}
                      onChange={(e) => setPortfolioUrl(e.target.value)}
                      placeholder="https://yourname.dev"
                      className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-white border border-[#E8E5DD] rounded-xl text-[#1B1B1B] placeholder:text-[#9E9E9A] focus:outline-none focus:border-[#C76A2A] transition-colors"
                    />
                  </div>
                </div>

                {/* Resume Upload (Optional) */}
                <div className="pt-2">
                  <label className="block text-xs font-semibold text-[#1B1B1B] mb-1">
                    Resume Upload <span className="text-[#6E6E6A] font-normal">(Optional, PDF)</span>
                  </label>
                  <div className="p-4 border-2 border-dashed border-[#E8E5DD] rounded-xl text-center bg-[#FAF9F5] hover:border-[#C76A2A] transition-colors">
                    <label className="cursor-pointer block">
                      <Upload className="w-5 h-5 text-[#C76A2A] mx-auto mb-1" />
                      <span className="text-xs font-bold text-[#1B1B1B] block">
                        {resumeFileName ? resumeFileName : 'Click to select Resume (PDF)'}
                      </span>
                      <span className="text-[10px] text-[#6E6E6A] block mt-0.5">
                        Our intelligence engine extracts project milestones automatically
                      </span>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleResumeFile}
                        className="hidden"
                      />
                    </label>
                    {isUploadingResume && (
                      <div className="flex items-center justify-center gap-1.5 text-xs text-[#C76A2A] font-semibold mt-2">
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Processing resume structure...</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 4: Skills Assessment Setup */}
          {step === 4 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#C76A2A] bg-[#C76A2A]/10 px-2.5 py-1 rounded-md font-mono">
                  Step 4 • Skills Assessment Setup
                </span>
                <h1 className="text-xl font-bold text-[#1B1B1B] mt-2.5">Calibrate your initial verification engine</h1>
                <p className="text-xs text-[#6E6E6A] mt-1">
                  Select the technologies you have experience with to unlock your initial Builder Score and Starter XP.
                </p>
              </div>

              {/* Technologies Multi-select */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold text-[#1B1B1B]">
                    Which technologies do you know? <span className="text-[#C76A2A]">*</span>
                  </label>
                  <span className="text-[10px] text-[#6E6E6A] font-mono">
                    {knownSkills.length} selected
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {TECH_OPTIONS.map((tech) => {
                    const isSelected = knownSkills.includes(tech);
                    return (
                      <button
                        key={tech}
                        type="button"
                        onClick={() => handleToggleTech(tech)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-medium border transition-all flex items-center gap-1.5 cursor-pointer ${
                          isSelected
                            ? 'bg-[#1B1B1B] text-white border-[#1B1B1B] font-semibold shadow-none'
                            : 'bg-white text-[#1B1B1B] border-[#E8E5DD] hover:border-[#C76A2A]'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 text-[#C76A2A]" />}
                        <span>{tech}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Projects Built */}
              <div className="space-y-2 pt-2">
                <label className="block text-xs font-semibold text-[#1B1B1B]">
                  How many projects have you built? <span className="text-[#C76A2A]">*</span>
                </label>
                <div className="grid grid-cols-4 gap-2.5">
                  {PROJECT_COUNT_OPTIONS.map((cnt) => {
                    const isSelected = projectCount === cnt;
                    return (
                      <button
                        key={cnt}
                        type="button"
                        onClick={() => setProjectCount(cnt)}
                        className={`py-2.5 px-3 rounded-xl border text-center text-xs font-semibold transition-all cursor-pointer ${
                          isSelected
                            ? 'border-[#C76A2A] bg-[#C76A2A]/5 text-[#C76A2A] ring-1 ring-[#C76A2A]'
                            : 'border-[#E8E5DD] text-[#6E6E6A] hover:text-[#1B1B1B] bg-white'
                        }`}
                      >
                        {cnt} {cnt === '0' ? 'Projects' : 'Projects'}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Hackathon Experience */}
              <div className="space-y-2 pt-2">
                <label className="block text-xs font-semibold text-[#1B1B1B]">
                  Have you participated in Hackathons? <span className="text-[#C76A2A]">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {['Yes', 'No'].map((ans) => {
                    const isSelected = hackathonExperience === ans;
                    return (
                      <button
                        key={ans}
                        type="button"
                        onClick={() => setHackathonExperience(ans)}
                        className={`py-3 px-4 rounded-xl border text-center text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                          isSelected
                            ? 'border-[#C76A2A] bg-[#C76A2A]/5 text-[#C76A2A] ring-1 ring-[#C76A2A]'
                            : 'border-[#E8E5DD] text-[#6E6E6A] hover:text-[#1B1B1B] bg-white'
                        }`}
                      >
                        <span>{ans === 'Yes' ? '🏆 Yes, I have' : '⚡ Not yet'}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 5: Builder Profile Generation */}
          {step === 5 && generatedData && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              {/* Success Header */}
              <div className="text-center space-y-2 py-2">
                <div className="w-12 h-12 rounded-2xl bg-[#2F7A45]/10 text-[#2F7A45] flex items-center justify-center mx-auto border border-[#2F7A45]/20">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h1 className="text-2xl font-bold text-[#1B1B1B]">Your Builder Profile is Ready</h1>
                <p className="text-xs text-[#6E6E6A] max-w-md mx-auto">
                  Your Builder Passport has been minted on the SkillBridge intelligence ledger.
                </p>
              </div>

              {/* Builder Passport Card */}
              <div className="p-5 rounded-2xl bg-[#FAF9F5] border border-[#E8E5DD] space-y-5">
                {/* Header */}
                <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#E8E5DD]">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-base font-bold text-[#1B1B1B]">{fullName}</h2>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#1B1B1B] text-white font-mono">
                        Level: {generatedData.builderLevel}
                      </span>
                    </div>
                    <p className="text-xs text-[#6E6E6A] mt-0.5">
                      {degree} • {branch} • {college}, {city}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[10px] text-[#6E6E6A] block font-mono uppercase">Starter Bonus</span>
                    <span className="text-sm font-extrabold text-[#C76A2A] font-mono flex items-center gap-1 justify-end">
                      <Flame className="w-4 h-4 fill-[#C76A2A]" />
                      +{generatedData.starterXP} XP
                    </span>
                  </div>
                </div>

                {/* Score Matrix */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 bg-white rounded-xl border border-[#E8E5DD] space-y-1">
                    <span className="text-[10px] font-mono text-[#6E6E6A] uppercase tracking-wider block">
                      Initial Builder Score
                    </span>
                    <div className="text-2xl font-black text-[#1B1B1B]">
                      {generatedData.calculatedBuilderScore}
                      <span className="text-xs font-normal text-[#6E6E6A]"> / 1000</span>
                    </div>
                    <div className="w-full bg-[#FAF9F5] h-1.5 rounded-full overflow-hidden border border-[#E8E5DD]">
                      <div
                        className="bg-[#1B1B1B] h-full rounded-full"
                        style={{ width: `${Math.min(100, (generatedData.calculatedBuilderScore / 1000) * 100)}%` }}
                      />
                    </div>
                  </div>

                  <div className="p-3.5 bg-white rounded-xl border border-[#E8E5DD] space-y-1">
                    <span className="text-[10px] font-mono text-[#6E6E6A] uppercase tracking-wider block">
                      Career Readiness Score
                    </span>
                    <div className="text-2xl font-black text-[#2F7A45]">
                      {generatedData.careerReadinessScore}%
                    </div>
                    <div className="w-full bg-[#FAF9F5] h-1.5 rounded-full overflow-hidden border border-[#E8E5DD]">
                      <div
                        className="bg-[#2F7A45] h-full rounded-full"
                        style={{ width: `${generatedData.careerReadinessScore}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Top Skills Summary */}
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-[#1B1B1B] block">Top Skills Verified</span>
                  <div className="flex flex-wrap gap-1.5">
                    {knownSkills.slice(0, 6).map((sk) => (
                      <span
                        key={sk}
                        className="text-xs px-2.5 py-1 rounded-xl bg-white border border-[#E8E5DD] text-[#1B1B1B] font-medium flex items-center gap-1"
                      >
                        <Check className="w-3 h-3 text-[#2F7A45]" />
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Recommended Roadmap & First Assessment */}
                <div className="p-3.5 bg-white rounded-xl border border-[#E8E5DD] space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-[#1B1B1B]">
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#C76A2A]" />
                      <span>Recommended Roadmap: {careerPath}</span>
                    </div>
                    <span className="text-[10px] text-[#C76A2A] font-mono">ETA: 6 Months</span>
                  </div>
                  <div className="text-xs text-[#6E6E6A] flex items-center justify-between pt-1 border-t border-[#E8E5DD]">
                    <span>Suggested First Assessment:</span>
                    <strong className="text-[#1B1B1B] truncate ml-2 max-w-[200px]">
                      {generatedData.recommendedRoadmap.suggestedFirstAssessment}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Enter CTA */}
              <button
                type="button"
                onClick={handleEnterSkillBridge}
                className="w-full py-3 bg-[#C76A2A] hover:bg-[#B55D22] text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-none transition-colors"
              >
                <span>Enter SkillBridge</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {/* Navigation Controls for Steps 1-4 */}
          {step < 5 && (
            <div className="flex items-center justify-between pt-6 border-t border-[#E8E5DD]">
              <button
                type="button"
                disabled={step === 1}
                onClick={() => setStep((prev) => Math.max(1, prev - 1))}
                className="px-4 py-2 text-xs font-semibold text-[#6E6E6A] hover:text-[#1B1B1B] disabled:opacity-30 flex items-center gap-1 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>

              {step < 4 ? (
                <button
                  type="button"
                  disabled={
                    (step === 1 && !isStep1Valid) ||
                    (step === 2 && !isStep2Valid) ||
                    (step === 3 && !isStep3Valid)
                  }
                  onClick={() => setStep((prev) => prev + 1)}
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-[#C76A2A] hover:bg-[#B55D22] rounded-xl shadow-none flex items-center gap-1.5 transition-colors disabled:opacity-40 cursor-pointer"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="button"
                  disabled={!isStep4Valid || isSubmitting}
                  onClick={handleGenerateProfile}
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-[#C76A2A] hover:bg-[#B55D22] rounded-xl shadow-none flex items-center gap-1.5 transition-colors disabled:opacity-40 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Generating Builder Profile...</span>
                    </>
                  ) : (
                    <>
                      <span>Generate Builder Profile</span>
                      <Sparkles className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Footer Audit Line */}
      <footer className="py-4 text-center text-[11px] text-[#6E6E6A]">
        SkillBridge Builder Operating System • SHA-256 Verified Onboarding
      </footer>
    </div>
  );
}
