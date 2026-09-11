import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  UserRole,
  AIProvider,
  StudentProfile,
  CandidateApplication,
  PipelineStage,
  JobRequirement,
  InternshipOpportunity,
  Assessment,
  CurriculumAnalysisResult,
  CopilotAnalysisResult,
  ThemeColor,
  ColorMode,
  GitHubData,
  AchievementBadge,
  LearningQuest,
  LearningPath,
} from '@/types';
import { AuthUser, DEMO_USERS } from './auth-service';
import {
  mockStudentProfile,
  mockCandidatesPipeline,
  mockJobRequirements,
  mockInternships,
  mockAssessments,
  mockCurriculumAnalysis,
  mockAchievements,
  mockQuests,
  mockLearningPaths,
  mockGitHubData,
} from './mock-data';

export const CLEAN_SCRATCH_STUDENT_PROFILE: StudentProfile = {
  id: 'std-scratch',
  name: 'New Student',
  email: '',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
  headline: '',
  targetRole: 'Software Engineer',
  academic: {
    college: 'HITAM',
    department: 'CSE',
    year: '3rd Year',
    semester: '6th Semester',
    cgpa: 9.14,
    studentId: 'HITAM-CSE-2023-042',
  },
  professional: {
    githubUrl: 'https://github.com/aarav-builder',
    linkedinUrl: '',
    portfolioUrl: '',
    bio: 'Passionate builder crafting distributed backends, LLM inference pipelines, and cloud native tools.',
    totalProjects: 14,
    hackathonWins: 3,
    researchPapers: 1,
    openSourceContributions: 48,
  },
  builderScores: {
    overall: 885,
    execution: 92,
    leadership: 84,
    innovation: 90,
    problemSolving: 94,
    consistency: 82,
  },
  employabilityScore: 91,
  verifiedSkills: [
    {
      id: 'vs-1',
      name: 'Python & FastAPI',
      category: 'Programming',
      level: 'Expert',
      score: 95,
      verificationSources: ['Assessment', 'Project', 'Faculty Validation'],
      verifiedDate: 'Aug 14, 2025',
      verificationCode: 'SB-PY-95821',
      evidenceCount: 6,
    },
    {
      id: 'vs-2',
      name: 'PyTorch & Transformers',
      category: 'AI & ML',
      level: 'Advanced',
      score: 88,
      verificationSources: ['Project', 'Assessment'],
      verifiedDate: 'Oct 02, 2025',
      verificationCode: 'SB-AI-88301',
      evidenceCount: 4,
    },
    {
      id: 'vs-3',
      name: 'TypeScript & Next.js',
      category: 'Programming',
      level: 'Advanced',
      score: 86,
      verificationSources: ['Project', 'Assessment'],
      verifiedDate: 'Nov 19, 2025',
      verificationCode: 'SB-TS-86102',
      evidenceCount: 5,
    },
    {
      id: 'vs-4',
      name: 'PostgreSQL & pgvector',
      category: 'Database',
      level: 'Advanced',
      score: 89,
      verificationSources: ['Assessment', 'Project'],
      verifiedDate: 'Jan 10, 2026',
      verificationCode: 'SB-DB-89412',
      evidenceCount: 3,
    },
  ],
  evidences: [
    {
      id: 'ev-1',
      title: 'Real-time Multimodal Vector Retrieval Engine',
      type: 'GitHub Repo',
      url: 'https://github.com/aarav-builder/vectormind-core',
      description: 'Engineered high-throughput HNSW index search serving 40k QPS with sub-15ms p99 latency in C++ and Python bindings.',
      date: 'Jan 2026',
      impactScore: 96,
      verified: true,
    },
  ],
};

export type FullProfileUpdates = Partial<Omit<StudentProfile, 'academic' | 'professional'>> & {
  academic?: Partial<StudentProfile['academic']>;
  professional?: Partial<StudentProfile['professional']>;
};

interface AppState {
  // Auth & Mode State
  isDemoMode: boolean;
  setDemoMode: (isDemo: boolean) => void;
  currentUser: AuthUser | null;
  setCurrentUser: (user: AuthUser | null) => void;
  loginUser: (email: string, role: UserRole, password?: string, name?: string) => Promise<void>;
  registerUser: (email: string, name: string, role: UserRole, password?: string) => Promise<void>;
  logoutUser: () => void;

  currentRole: UserRole;
  setRole: (role: UserRole) => void;

  // Stored Profiles Dictionary per email
  userProfilesByEmail: Record<string, StudentProfile>;

  // AI Provider Keys (BYOK)
  aiKeys: Record<AIProvider, string>;
  activeProvider: AIProvider;
  setAIKey: (provider: AIProvider, key: string) => void;
  setActiveAIProvider: (provider: AIProvider) => void;
  hasConfiguredAI: () => boolean;

  // Gen Z Builder System & Gamification
  xp: number;
  level: number;
  streakDays: number;
  rankings: {
    collegeRank: number;
    collegeName: string;
    deptRank: number;
    deptName: string;
    globalPercentile: string;
  };
  achievements: AchievementBadge[];
  quests: LearningQuest[];
  learningPaths: LearningPath[];
  githubData: GitHubData;

  // Appearance & Themes
  themeColor: ThemeColor;
  colorMode: ColorMode;
  setThemeColor: (color: ThemeColor) => void;
  setColorMode: (mode: ColorMode) => void;

  // Gamification Actions
  addXP: (amount: number, reason?: string) => void;
  connectGitHub: (username?: string) => void;
  completeQuest: (questId: string) => void;
  unlockAchievement: (id: string) => void;

  // Student Portal State
  studentProfile: StudentProfile;
  updateStudentTargetRole: (role: string) => void;
  updateStudentAcademic: (academic: Partial<StudentProfile['academic']>) => void;
  updateStudentSocials: (socials: Partial<StudentProfile['professional']>) => void;
  updateStudentFullProfile: (updates: FullProfileUpdates) => void;
  addVerifiedSkill: (skillName: string, level: any, category: any) => void;
  addBuilderEvidence: (evidence: any) => void;
  applyForInternship: (internshipId: string) => void;
  completeAssessment: (assessmentId: string, score: number) => void;

  // AI Copilot Results History
  copilotResults: Record<string, CopilotAnalysisResult>;
  saveCopilotResult: (targetRole: string, result: CopilotAnalysisResult) => void;

  // Industry Portal State
  candidates: CandidateApplication[];
  moveCandidateStage: (candidateId: string, newStage: PipelineStage) => void;
  jobs: JobRequirement[];
  addJobRequirement: (job: Omit<JobRequirement, 'id' | 'createdAt' | 'activeApplicants'>) => void;

  // Institute Portal State
  curriculumAnalyses: CurriculumAnalysisResult[];
  saveCurriculumAnalysis: (analysis: CurriculumAnalysisResult) => void;

  // Global Notifications
  unreadNotificationsCount: number;
  clearNotifications: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      isDemoMode: false,
      currentUser: null,
      userProfilesByEmail: {},
      candidates: [],
      jobs: [],
      curriculumAnalyses: [],

      // Builder Gamification State
      xp: 2450,
      level: 18,
      streakDays: 7,
      rankings: {
        collegeRank: 5,
        collegeName: 'HITAM',
        deptRank: 2,
        deptName: 'CSE',
        globalPercentile: 'Top 3%',
      },
      achievements: mockAchievements as AchievementBadge[],
      quests: mockQuests as LearningQuest[],
      learningPaths: mockLearningPaths as LearningPath[],
      githubData: mockGitHubData as GitHubData,

      // Appearance
      themeColor: 'ocean-blue',
      colorMode: 'light',
      setThemeColor: (color) => set({ themeColor: color }),
      setColorMode: (mode) => set({ colorMode: mode }),

      addXP: (amount, reason) =>
        set((state) => {
          const newXP = state.xp + amount;
          const newLevel = Math.floor(newXP / 150) + 1;
          return { xp: newXP, level: Math.max(state.level, newLevel) };
        }),

      connectGitHub: (username = 'aarav-builder') =>
        set((state) => {
          const newDetectedSkills: any[] = [
            {
              id: `vs-gh-${Date.now()}-1`,
              name: 'Docker Containerization',
              category: 'DevOps',
              level: 'Advanced',
              score: 88,
              verificationSources: ['GitHub Repository Analysis'],
              verifiedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
              verificationCode: `GH-DOC-${Math.floor(10000 + Math.random() * 90000)}`,
              evidenceCount: 3,
            },
            {
              id: `vs-gh-${Date.now()}-2`,
              name: 'Java 21 & Spring Boot',
              category: 'Programming',
              level: 'Intermediate',
              score: 82,
              verificationSources: ['GitHub Repository Analysis'],
              verifiedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
              verificationCode: `GH-JAV-${Math.floor(10000 + Math.random() * 90000)}`,
              evidenceCount: 2,
            },
          ];

          const updatedSkills = [...newDetectedSkills, ...state.studentProfile.verifiedSkills];
          const newOverall = Math.min(1000, state.studentProfile.builderScores.overall + 50);

          return {
            xp: state.xp + 50,
            githubData: {
              ...state.githubData,
              connected: true,
              username,
            },
            studentProfile: {
              ...state.studentProfile,
              verifiedSkills: updatedSkills,
              builderScores: {
                ...state.studentProfile.builderScores,
                overall: newOverall,
              },
            },
          };
        }),

      completeQuest: (questId) =>
        set((state) => {
          const targetQuest = state.quests.find((q) => q.id === questId);
          const reward = targetQuest ? targetQuest.xpReward : 25;
          const updatedQuests = state.quests.map((q) =>
            q.id === questId ? { ...q, completed: true } : q
          );
          const newXP = state.xp + reward;
          const newLevel = Math.floor(newXP / 150) + 1;
          return {
            quests: updatedQuests,
            xp: newXP,
            level: Math.max(state.level, newLevel),
          };
        }),

      unlockAchievement: (id) =>
        set((state) => {
          const target = state.achievements.find((a) => a.id === id);
          if (!target || target.unlocked) return state;

          const updated = state.achievements.map((a) =>
            a.id === id
              ? {
                  ...a,
                  unlocked: true,
                  unlockedAt: new Date().toLocaleDateString('en-US', {
                    month: 'short',
                    day: '2-digit',
                    year: 'numeric',
                  }),
                }
              : a
          );
          const newXP = state.xp + target.xpReward;
          return {
            achievements: updated,
            xp: newXP,
            level: Math.max(state.level, Math.floor(newXP / 150) + 1),
          };
        }),

      setDemoMode: (isDemo: boolean) => {
        if (isDemo) {
          const role = get().currentRole;
          set({
            isDemoMode: true,
            currentUser: DEMO_USERS[role],
            studentProfile: mockStudentProfile,
            candidates: mockCandidatesPipeline,
            jobs: mockJobRequirements,
            curriculumAnalyses: [mockCurriculumAnalysis],
          });
        } else {
          const currentEmail = get().currentUser?.email?.toLowerCase().trim();
          const existingProfile = currentEmail ? get().userProfilesByEmail[currentEmail] : null;
          set({
            isDemoMode: false,
            studentProfile: existingProfile || {
              ...CLEAN_SCRATCH_STUDENT_PROFILE,
              email: currentEmail || '',
              name: get().currentUser?.name || 'New Student',
            },
            candidates: [],
            jobs: [],
            curriculumAnalyses: [],
          });
        }
      },

      setCurrentUser: (user) => set({ currentUser: user }),

      loginUser: async (email, role, password = 'Demo1234!', name) => {
        const cleanEmail = email.toLowerCase().trim();

        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: cleanEmail, password, role }),
        });

        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.error || 'Authentication failed. Please verify your credentials.');
        }

        const authenticatedUser = data.user;
        const profile = data.profile || {
          ...CLEAN_SCRATCH_STUDENT_PROFILE,
          id: `std-${Date.now()}`,
          name: authenticatedUser.name,
          email: cleanEmail,
        };

        set((state) => ({
          currentUser: authenticatedUser,
          currentRole: authenticatedUser.role || role,
          isDemoMode: false,
          studentProfile: profile,
          userProfilesByEmail: {
            ...state.userProfilesByEmail,
            [cleanEmail]: profile,
          },
        }));
      },

      registerUser: async (email, name, role, password = 'Password123!') => {
        const cleanEmail = email.toLowerCase().trim();

        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: cleanEmail, name, role, password }),
        });

        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.error || 'Registration failed. Please check your inputs.');
        }

        const registeredUser = data.user;
        const freshProfile = data.profile || {
          ...CLEAN_SCRATCH_STUDENT_PROFILE,
          id: `std-${Date.now()}`,
          name,
          email: cleanEmail,
        };

        set((state) => ({
          currentUser: registeredUser,
          currentRole: role,
          isDemoMode: false,
          studentProfile: freshProfile,
          userProfilesByEmail: {
            ...state.userProfilesByEmail,
            [cleanEmail]: freshProfile,
          },
        }));
      },

      logoutUser: () => {
        set({
          currentUser: null,
          isDemoMode: false,
          studentProfile: CLEAN_SCRATCH_STUDENT_PROFILE,
        });
      },

      currentRole: 'student',
      setRole: (role) => {
        const isDemo = get().isDemoMode;
        set({
          currentRole: role,
          currentUser: isDemo ? DEMO_USERS[role] : get().currentUser,
        });
      },

      aiKeys: {
        gemini: '',
        openai: '',
        claude: '',
      },
      activeProvider: 'gemini',
      setAIKey: (provider, key) =>
        set((state) => ({
          aiKeys: {
            ...state.aiKeys,
            [provider]: key.trim(),
          },
        })),
      setActiveAIProvider: (provider) =>
        set({ activeProvider: provider }),
      hasConfiguredAI: () => {
        const { aiKeys, activeProvider } = get();
        return Boolean(aiKeys[activeProvider] && aiKeys[activeProvider].trim().length > 5);
      },

      studentProfile: CLEAN_SCRATCH_STUDENT_PROFILE,

      updateStudentTargetRole: (role) =>
        set((state) => {
          const updated = {
            ...state.studentProfile,
            targetRole: role,
          };
          const email = state.studentProfile.email?.toLowerCase().trim();
          return {
            studentProfile: updated,
            userProfilesByEmail: email
              ? { ...state.userProfilesByEmail, [email]: updated }
              : state.userProfilesByEmail,
          };
        }),

      updateStudentAcademic: (academic) =>
        set((state) => {
          const updated = {
            ...state.studentProfile,
            academic: {
              ...state.studentProfile.academic,
              ...academic,
            },
          };
          const email = state.studentProfile.email?.toLowerCase().trim();
          if (email && !state.isDemoMode) {
            fetch('/api/students/profile', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email, academic: updated.academic }),
            }).catch(() => {});
          }
          return {
            studentProfile: updated,
            userProfilesByEmail: email
              ? { ...state.userProfilesByEmail, [email]: updated }
              : state.userProfilesByEmail,
          };
        }),

      updateStudentSocials: (socials) =>
        set((state) => {
          const updated = {
            ...state.studentProfile,
            professional: {
              ...state.studentProfile.professional,
              ...socials,
            },
          };
          const email = state.studentProfile.email?.toLowerCase().trim();
          if (email && !state.isDemoMode) {
            fetch('/api/students/profile', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email, professional: updated.professional }),
            }).catch(() => {});
          }
          return {
            studentProfile: updated,
            userProfilesByEmail: email
              ? { ...state.userProfilesByEmail, [email]: updated }
              : state.userProfilesByEmail,
          };
        }),

      updateStudentFullProfile: (updates) =>
        set((state) => {
          const updated: StudentProfile = {
            ...state.studentProfile,
            ...updates,
            academic: {
              ...state.studentProfile.academic,
              ...(updates.academic || {}),
            },
            professional: {
              ...state.studentProfile.professional,
              ...(updates.professional || {}),
            },
          };

          const email = (updates.email || state.studentProfile.email || state.currentUser?.email || '').toLowerCase().trim();
          if (email && !state.isDemoMode) {
            fetch('/api/students/profile', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email, ...updates }),
            }).catch(() => {});
          }

          const updatedUser = state.currentUser
            ? {
                ...state.currentUser,
                name: updates.name || state.currentUser.name,
                linkedInName: updates.linkedInName || state.currentUser.linkedInName,
                googleName: updates.googleName || state.currentUser.googleName,
              }
            : state.currentUser;

          return {
            currentUser: updatedUser,
            studentProfile: updated,
            userProfilesByEmail: email
              ? { ...state.userProfilesByEmail, [email]: updated }
              : state.userProfilesByEmail,
          };
        }),

      addVerifiedSkill: (skillName, level, category) =>
        set((state) => {
          const newSkill = {
            id: `vs-${Date.now()}`,
            name: skillName,
            category: category || 'Programming',
            level: level || 'Intermediate',
            score: 85,
            verificationSources: ['Assessment', 'Faculty Validation'] as any,
            verifiedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
            verificationCode: `SB-${skillName.slice(0, 2).toUpperCase()}-${Math.floor(10000 + Math.random() * 90000)}`,
            evidenceCount: 1,
          };

          const newOverall = Math.min(1000, state.studentProfile.builderScores.overall + 30);
          const newEmployability = Math.min(100, state.studentProfile.employabilityScore + 5);

          const updated = {
            ...state.studentProfile,
            verifiedSkills: [newSkill, ...state.studentProfile.verifiedSkills],
            builderScores: {
              ...state.studentProfile.builderScores,
              overall: newOverall,
            },
            employabilityScore: newEmployability,
          };

          const email = state.studentProfile.email?.toLowerCase().trim();
          if (email && !state.isDemoMode) {
            fetch('/api/students/skills', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email, skill: newSkill }),
            }).catch(() => {});
          }

          return {
            xp: state.xp + 50,
            studentProfile: updated,
            userProfilesByEmail: email
              ? { ...state.userProfilesByEmail, [email]: updated }
              : state.userProfilesByEmail,
          };
        }),

      addBuilderEvidence: (evidence) =>
        set((state) => {
          const newEvidence = {
            id: `ev-${Date.now()}`,
            ...evidence,
            verified: true,
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
          };

          const newOverall = Math.min(1000, state.studentProfile.builderScores.overall + 45);
          const newExecution = Math.min(100, state.studentProfile.builderScores.execution + 10);
          const newEmployability = Math.min(100, state.studentProfile.employabilityScore + 6);

          const updated = {
            ...state.studentProfile,
            evidences: [newEvidence, ...state.studentProfile.evidences],
            builderScores: {
              ...state.studentProfile.builderScores,
              overall: newOverall,
              execution: newExecution,
            },
            employabilityScore: newEmployability,
          };

          const email = state.studentProfile.email?.toLowerCase().trim();
          if (email && !state.isDemoMode) {
            fetch('/api/students/evidences', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email, evidence: newEvidence }),
            }).catch(() => {});
          }

          return {
            xp: state.xp + 100,
            studentProfile: updated,
            userProfilesByEmail: email
              ? { ...state.userProfilesByEmail, [email]: updated }
              : state.userProfilesByEmail,
          };
        }),

      applyForInternship: (internshipId) =>
        set((state) => ({
          candidates: state.candidates.map((c) =>
            c.studentId === state.studentProfile.id && c.jobId === internshipId
              ? { ...c, stage: 'Matched' }
              : c
          ),
        })),

      completeAssessment: (assessmentId, score) =>
        set((state) => {
          const updated = {
            ...state.studentProfile,
            builderScores: {
              ...state.studentProfile.builderScores,
              problemSolving: Math.min(100, state.studentProfile.builderScores.problemSolving + 15),
              overall: Math.min(1000, state.studentProfile.builderScores.overall + 35),
            },
            employabilityScore: Math.min(100, state.studentProfile.employabilityScore + 5),
          };
          const email = state.studentProfile.email?.toLowerCase().trim();
          return {
            xp: state.xp + 50,
            studentProfile: updated,
            userProfilesByEmail: email
              ? { ...state.userProfilesByEmail, [email]: updated }
              : state.userProfilesByEmail,
          };
        }),

      copilotResults: {},
      saveCopilotResult: (targetRole, result) =>
        set((state) => ({
          copilotResults: {
            ...state.copilotResults,
            [targetRole]: result,
          },
        })),

      moveCandidateStage: (candidateId, newStage) =>
        set((state) => ({
          candidates: state.candidates.map((cand) =>
            cand.id === candidateId ? { ...cand, stage: newStage } : cand
          ),
        })),

      addJobRequirement: (jobData) =>
        set((state) => {
          const newJob: JobRequirement = {
            id: `req-${Date.now()}`,
            ...jobData,
            activeApplicants: 0,
            createdAt: 'Just now',
          };
          return { jobs: [newJob, ...state.jobs] };
        }),

      saveCurriculumAnalysis: (analysis) =>
        set((state) => ({
          curriculumAnalyses: [analysis, ...state.curriculumAnalyses],
        })),

      unreadNotificationsCount: 3,
      clearNotifications: () => set({ unreadNotificationsCount: 0 }),
    }),
    {
      name: 'skillbridge-storage',
      partialize: (state) => ({
        isDemoMode: state.isDemoMode,
        currentUser: state.currentUser,
        currentRole: state.currentRole,
        aiKeys: state.aiKeys,
        activeProvider: state.activeProvider,
        studentProfile: state.studentProfile,
        userProfilesByEmail: state.userProfilesByEmail,
        candidates: state.candidates,
        jobs: state.jobs,
        copilotResults: state.copilotResults,
        curriculumAnalyses: state.curriculumAnalyses,
        xp: state.xp,
        level: state.level,
        streakDays: state.streakDays,
        themeColor: state.themeColor,
        colorMode: state.colorMode,
        achievements: state.achievements,
        quests: state.quests,
        learningPaths: state.learningPaths,
        githubData: state.githubData,
      }),
    }
  )
);
