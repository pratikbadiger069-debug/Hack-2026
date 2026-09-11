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
import { getLevelInfo } from './xp-engine';

export const EMPTY_FRESH_STUDENT_PROFILE: StudentProfile = {
  id: 'std-fresh',
  name: 'New Builder',
  email: '',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  headline: 'Aspiring Software Builder',
  targetRole: 'Backend Engineer',
  college: 'HITAM',
  department: 'CSE',
  branch: 'CSE',
  academic: {
    college: 'HITAM',
    department: 'CSE',
    year: '1st Year',
    semester: '1st Semester',
    cgpa: 8.5,
    studentId: 'SB-2026-001',
  },
  professional: {
    githubUrl: '',
    linkedinUrl: '',
    portfolioUrl: '',
    bio: 'Starting my verified builder journey on SkillBridge.',
    totalProjects: 0,
    hackathonWins: 0,
    researchPapers: 0,
    openSourceContributions: 0,
  },
  builderScores: {
    overall: 100,
    execution: 15,
    leadership: 10,
    innovation: 15,
    problemSolving: 20,
    consistency: 10,
  },
  employabilityScore: 35,
  verifiedSkills: [],
  evidences: [],
};

export const CLEAN_SCRATCH_STUDENT_PROFILE: StudentProfile = {
  id: 'std-scratch',
  name: 'New Student',
  email: '',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
  headline: '',
  targetRole: 'Software Engineer',
  college: 'HITAM',
  department: 'CSE',
  branch: 'CSE',
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
      verificationCode: 'SB-TS-86124',
      evidenceCount: 5,
    },
    {
      id: 'vs-4',
      name: 'Docker & Microservices',
      category: 'DevOps',
      level: 'Advanced',
      score: 91,
      verificationSources: ['Assessment', 'Project', 'GitHub Repository Analysis'],
      verifiedDate: 'Dec 05, 2025',
      verificationCode: 'SB-DC-91402',
      evidenceCount: 4,
    },
    {
      id: 'vs-5',
      name: 'PostgreSQL & Query Optimization',
      category: 'Database',
      level: 'Intermediate',
      score: 82,
      verificationSources: ['Assessment'],
      verifiedDate: 'Jan 10, 2026',
      verificationCode: 'SB-SQL-82910',
      evidenceCount: 2,
    },
  ],
  evidences: [
    {
      id: 'ev-1',
      title: 'Distributed Rate Limiting Gateway',
      type: 'GitHub Repo',
      url: 'https://github.com/aarav-builder/distributed-rate-limiter',
      description: 'Token bucket and sliding window rate limiter in Go with Redis backend handling 15k RPS.',
      date: 'Jan 2026',
      impactScore: 94,
      verified: true,
    },
    {
      id: 'ev-2',
      title: 'Vector Search Embedding Indexer',
      type: 'Live Product',
      url: 'https://vectormind.ai-demo.dev',
      description: 'High performance HNSW vector search API indexing 500k research documents.',
      date: 'Dec 2025',
      impactScore: 91,
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
  loginWithGoogle: (email: string, name?: string, avatar?: string) => Promise<void>;
  loginWithGitHub: (username: string) => Promise<void>;
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
  tierRankings: {
    deptRank: number;
    deptName: string;
    collegeRank: number;
    collegeName: string;
    stateRank: number;
    stateName: string;
    nationalRank: number;
    globalPercentile: string;
  };
  achievements: AchievementBadge[];
  quests: LearningQuest[];
  learningPaths: LearningPath[];
  githubData: GitHubData;
  checklist: {
    id: string;
    title: string;
    description: string;
    category: 'Onboarding' | 'Verification' | 'Capstone' | 'Industry';
    xpReward: number;
    completed: boolean;
    actionUrl: string;
    completedAt?: string;
  }[];

  // Appearance & Themes
  themeColor: ThemeColor;
  colorMode: ColorMode;
  setThemeColor: (color: ThemeColor) => void;
  setColorMode: (mode: ColorMode) => void;

  // Gamification Actions
  addXP: (amount: number, reason?: string) => void;
  connectGitHub: (username?: string) => Promise<void> | void;
  disconnectGitHub: () => void;
  syncGitHub: () => Promise<void> | void;
  completeQuest: (questId: string) => void;
  unlockAchievement: (id: string) => void;
  completeChecklistItem: (itemId: string) => void;
  publishIndustryAssessment: (draft: any) => void;

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
      tierRankings: {
        deptRank: 2,
        deptName: 'CSE',
        collegeRank: 5,
        collegeName: 'HITAM',
        stateRank: 18,
        stateName: 'Telangana',
        nationalRank: 142,
        globalPercentile: 'Top 3%',
      },
      checklist: [
        {
          id: 'chk-profile',
          title: 'Complete Builder Profile',
          description: 'Define target engineering role, university metadata, and bio.',
          category: 'Onboarding',
          xpReward: 25,
          completed: true,
          actionUrl: '/student/profile',
          completedAt: 'Yesterday',
        },
        {
          id: 'chk-github',
          title: 'Connect GitHub Account',
          description: 'Authenticate GitHub OAuth to enable commit scanning and repo verification.',
          category: 'Verification',
          xpReward: 50,
          completed: true,
          actionUrl: '/student/journey#github',
          completedAt: '3 days ago',
        },
        {
          id: 'chk-assessment',
          title: 'Pass First Skill Verification Challenge',
          description: 'Score >= 70% in a proctored MCQ or coding benchmark test.',
          category: 'Verification',
          xpReward: 50,
          completed: true,
          actionUrl: '/student/assessments',
          completedAt: 'Yesterday',
        },
        {
          id: 'chk-project',
          title: 'Submit Verified Production Project',
          description: 'Upload runnable repository URL with architecture documentation.',
          category: 'Capstone',
          xpReward: 100,
          completed: true,
          actionUrl: '/student/journey',
          completedAt: '2 days ago',
        },
        {
          id: 'chk-boss',
          title: 'Conquer Boss Architecture Exam',
          description: 'Pass the Distributed Rate Limiter enterprise capstone evaluation.',
          category: 'Capstone',
          xpReward: 250,
          completed: false,
          actionUrl: '/student/assessments',
        },
        {
          id: 'chk-opportunity',
          title: 'Apply to First Verified Opportunity',
          description: 'Submit verified builder passport to top matching industry roles.',
          category: 'Industry',
          xpReward: 50,
          completed: false,
          actionUrl: '/student/opportunities',
        },
      ],
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
          const newXP = Math.max(0, state.xp + amount);
          const levelInfo = getLevelInfo(newXP);

          // Auto-unlock XP milestone achievements
          const updatedAchievements = state.achievements.map((ach) => {
            if (ach.unlocked) return ach;
            if (ach.title.includes('100 XP') && newXP >= 100) return { ...ach, unlocked: true, unlockedAt: 'Today' };
            if (ach.title.includes('500 XP') && newXP >= 500) return { ...ach, unlocked: true, unlockedAt: 'Today' };
            if (ach.title.includes('1000 XP') && newXP >= 1000) return { ...ach, unlocked: true, unlockedAt: 'Today' };
            return ach;
          });

          return {
            xp: newXP,
            level: levelInfo.level,
            achievements: updatedAchievements,
          };
        }),

      connectGitHub: async (username = 'aarav-builder') => {
        const cleanUser = username.trim();
        const currentEmail = get().studentProfile.email || get().currentUser?.email || '';

        try {
          const res = await fetch('/api/auth/github/sync', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: cleanUser, email: currentEmail }),
          });
          const data = await res.json();
          if (data.success && data.githubData) {
            const newSkills = data.analysis?.verifiedSkills || [];
            const existingSkills = get().studentProfile.verifiedSkills || [];
            const mergedSkills = [...newSkills, ...existingSkills.filter((s) => !newSkills.some((ns: any) => ns.name === s.name))];
            
            const newXP = get().xp + 50;
            const levelInfo = getLevelInfo(newXP);
            const updatedAchievements = get().achievements.map((ach) =>
              ach.title.includes('GitHub') ? { ...ach, unlocked: true, unlockedAt: 'Today' } : ach
            );

            set((state) => ({
              xp: newXP,
              level: levelInfo.level,
              achievements: updatedAchievements,
              githubData: data.githubData,
              studentProfile: {
                ...state.studentProfile,
                professional: {
                  ...state.studentProfile.professional,
                  githubUrl: `https://github.com/${cleanUser}`,
                },
                verifiedSkills: mergedSkills,
                builderScores: {
                  ...state.studentProfile.builderScores,
                  overall: Math.min(1000, state.studentProfile.builderScores.overall + 60),
                },
              },
            }));
            return;
          }
        } catch (err) {
          console.warn('API sync error, applying optimistic connection', err);
        }

        // Fallback optimistic update
        set((state) => ({
          githubData: {
            ...state.githubData,
            connected: true,
            username: cleanUser,
            avatarUrl: `https://github.com/${cleanUser}.png`,
          },
          studentProfile: {
            ...state.studentProfile,
            professional: {
              ...state.studentProfile.professional,
              githubUrl: `https://github.com/${cleanUser}`,
            },
          },
        }));
      },

      disconnectGitHub: () =>
        set((state) => ({
          githubData: {
            ...state.githubData,
            connected: false,
          },
          studentProfile: {
            ...state.studentProfile,
            professional: {
              ...state.studentProfile.professional,
              githubUrl: '',
            },
          },
        })),

      syncGitHub: async () => {
        const username = get().githubData?.username || 'aarav-builder';
        const currentEmail = get().studentProfile.email || get().currentUser?.email || '';

        try {
          const res = await fetch('/api/auth/github/sync', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email: currentEmail }),
          });
          const data = await res.json();
          if (data.success && data.githubData) {
            const newSkills = data.analysis?.verifiedSkills || [];
            const existingSkills = get().studentProfile.verifiedSkills || [];
            const mergedSkills = [...newSkills, ...existingSkills.filter((s) => !newSkills.some((ns: any) => ns.name === s.name))];
            
            const syncedXP = get().xp + 25;
            const levelInfo = getLevelInfo(syncedXP);

            set((state) => ({
              xp: syncedXP,
              level: levelInfo.level,
              githubData: data.githubData,
              studentProfile: {
                ...state.studentProfile,
                verifiedSkills: mergedSkills,
              },
            }));
            return;
          }
        } catch (err) {
          console.warn('GitHub live sync error', err);
        }

        // Fallback optimistic increment
        set((state) => {
          const syncedXP = state.xp + 10;
          const levelInfo = getLevelInfo(syncedXP);
          return {
            xp: syncedXP,
            level: levelInfo.level,
            githubData: {
              ...state.githubData,
              connected: true,
              recentCommitsCount: (state.githubData?.recentCommitsCount || 348) + 12,
              streakDays: Math.max(state.streakDays, 7),
            },
          };
        });
      },

      completeQuest: (questId) =>
        set((state) => {
          const targetQuest = state.quests.find((q) => q.id === questId);
          const reward = targetQuest ? targetQuest.xpReward : 25;
          const updatedQuests = state.quests.map((q) =>
            q.id === questId ? { ...q, completed: true } : q
          );
          const newXP = state.xp + reward;
          const levelInfo = getLevelInfo(newXP);
          const completedCount = updatedQuests.filter((q) => q.completed).length;

          // Add verified skill if challenge is advanced/expert/boss
          let updatedSkills = [...state.studentProfile.verifiedSkills];
          if (targetQuest && targetQuest.skillsGained.length > 0) {
            const primarySkill = targetQuest.skillsGained[0];
            const alreadyExists = updatedSkills.some((s) => s.name.toLowerCase().includes(primarySkill.toLowerCase()));
            if (!alreadyExists) {
              updatedSkills.push({
                id: `vs-quest-${Date.now()}`,
                name: primarySkill,
                category: 'Programming',
                level: targetQuest.difficulty === 'Boss' || targetQuest.difficulty === 'Expert' ? 'Expert' : 'Advanced',
                score: targetQuest.difficulty === 'Boss' ? 98 : targetQuest.difficulty === 'Expert' ? 94 : 88,
                verificationSources: ['Assessment'],
                verifiedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
                verificationCode: `SB-${primarySkill.substring(0, 3).toUpperCase()}-${Math.floor(10000 + Math.random() * 90000)}`,
                evidenceCount: 1,
              });
            }
          }

          // Unlock achievements
          const updatedAchievements = state.achievements.map((ach) => {
            if (ach.unlocked) return ach;
            if (ach.id === 'ach-first-assessment' || ach.title.includes('First Assessment')) {
              return { ...ach, unlocked: true, unlockedAt: 'Today' };
            }
            if ((ach.id === 'ach-100-xp' || ach.title.includes('100 XP')) && newXP >= 100) {
              return { ...ach, unlocked: true, unlockedAt: 'Today' };
            }
            if ((ach.id === 'ach-500-xp' || ach.title.includes('500 XP')) && newXP >= 500) {
              return { ...ach, unlocked: true, unlockedAt: 'Today' };
            }
            if ((ach.id === 'ach-assessment-master' || ach.title.includes('Assessment Master')) && completedCount >= 5) {
              return { ...ach, unlocked: true, unlockedAt: 'Today' };
            }
            if (targetQuest?.category === 'Backend' && (ach.id === 'ach-backend-specialist' || ach.title.includes('Backend'))) {
              return { ...ach, unlocked: true, unlockedAt: 'Today' };
            }
            if (targetQuest?.category === 'AI & ML' && (ach.id === 'ach-ai-explorer' || ach.title.includes('AI'))) {
              return { ...ach, unlocked: true, unlockedAt: 'Today' };
            }
            return ach;
          });

          // Auto-tick checklist
          const updatedChecklist = state.checklist.map((chk) => {
            if (chk.id === 'chk-assessment') return { ...chk, completed: true, completedAt: 'Today' };
            if (chk.id === 'chk-boss' && targetQuest?.isBossChallenge) return { ...chk, completed: true, completedAt: 'Today' };
            return chk;
          });

          return {
            quests: updatedQuests,
            xp: newXP,
            level: levelInfo.level,
            achievements: updatedAchievements,
            checklist: updatedChecklist,
            studentProfile: {
              ...state.studentProfile,
              verifiedSkills: updatedSkills,
              builderScores: {
                ...state.studentProfile.builderScores,
                overall: Math.min(1000, state.studentProfile.builderScores.overall + 8),
              },
            },
          };
        }),

      completeChecklistItem: (itemId) =>
        set((state) => {
          const target = state.checklist.find((c) => c.id === itemId);
          if (!target || target.completed) return state;

          const updatedChecklist = state.checklist.map((c) =>
            c.id === itemId ? { ...c, completed: true, completedAt: 'Today' } : c
          );
          const newXP = state.xp + target.xpReward;
          const levelInfo = getLevelInfo(newXP);

          return {
            checklist: updatedChecklist,
            xp: newXP,
            level: levelInfo.level,
          };
        }),

      publishIndustryAssessment: (draft) =>
        set((state) => {
          const newQuest: LearningQuest = {
            id: draft.id || `quest-ind-${Date.now()}`,
            title: draft.title || 'Industry Hiring Benchmark',
            category: draft.category || 'Backend',
            difficulty: draft.difficulty || 'Advanced',
            xpReward: draft.xpReward || 50,
            estimatedMinutes: draft.estimatedMinutes || 20,
            description: draft.description || 'Industry-verified technical assessment.',
            skillsGained: draft.skillsGained || ['API Architecture'],
            completed: false,
            questions: draft.questions || [],
          };

          return {
            quests: [newQuest, ...state.quests],
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
          const levelInfo = getLevelInfo(newXP);
          return {
            achievements: updated,
            xp: newXP,
            level: levelInfo.level,
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

      loginWithGoogle: async (email, name, avatar) => {
        const cleanEmail = (email || 'builder@gmail.com').toLowerCase().trim();
        const cleanName = name || cleanEmail.split('@')[0].split('.').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

        const res = await fetch('/api/auth/google', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: cleanEmail, name: cleanName, avatar }),
        });

        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.error || 'Google authentication failed.');
        }

        const user = data.user;
        const isExisting = Boolean(get().userProfilesByEmail[cleanEmail]);
        const profile = data.profile || (isExisting ? get().userProfilesByEmail[cleanEmail] : {
          ...EMPTY_FRESH_STUDENT_PROFILE,
          id: `std-${Date.now()}`,
          name: user.name || cleanName,
          email: cleanEmail,
          avatar: avatar || user.avatar || EMPTY_FRESH_STUDENT_PROFILE.avatar,
          googleName: user.name || cleanName,
        });

        set((state) => ({
          currentUser: user,
          currentRole: 'student',
          isDemoMode: false,
          studentProfile: profile,
          xp: isExisting ? state.xp : 0,
          level: isExisting ? state.level : 1,
          userProfilesByEmail: {
            ...state.userProfilesByEmail,
            [cleanEmail]: profile,
          },
        }));
      },

      loginWithGitHub: async (username) => {
        const cleanUsername = (username || 'builder-dev').trim();
        const email = `${cleanUsername.toLowerCase()}@github.user`;

        const res = await fetch('/api/auth/github', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ githubUsername: cleanUsername, email }),
        });

        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.error || 'GitHub authentication failed.');
        }

        const isExisting = Boolean(get().userProfilesByEmail[email]);
        const profile = isExisting ? get().userProfilesByEmail[email] : {
          ...EMPTY_FRESH_STUDENT_PROFILE,
          id: `std-${Date.now()}`,
          name: cleanUsername,
          email,
          avatar: `https://github.com/${cleanUsername}.png`,
          professional: {
            ...EMPTY_FRESH_STUDENT_PROFILE.professional,
            githubUrl: `https://github.com/${cleanUsername}`,
          },
        };

        set((state) => ({
          currentUser: {
            id: `gh-user-${Date.now()}`,
            name: cleanUsername,
            email,
            role: 'student',
            avatar: `https://github.com/${cleanUsername}.png`,
            isEmailVerified: true,
            isDemoMode: false,
            createdAt: new Date().toISOString(),
          },
          currentRole: 'student',
          isDemoMode: false,
          studentProfile: profile,
          githubData: {
            connected: true,
            username: cleanUsername,
            avatarUrl: `https://github.com/${cleanUsername}.png`,
            bio: `Verified GitHub builder @${cleanUsername}`,
            publicRepos: data.repositoriesCount || 6,
            totalStars: data.totalStars || 18,
            followers: 12,
            following: 8,
            languages: [
              { name: 'TypeScript', percentage: 48, color: '#3178C6' },
              { name: 'Python', percentage: 32, color: '#3572A5' },
              { name: 'Go', percentage: 20, color: '#00ADD8' },
            ],
            pinnedRepos: data.repositories || [],
            detectedSkills: data.detectedSkills || ['Git', 'TypeScript', 'REST APIs'],
            recentCommitsCount: data.totalCommits || 45,
            streakDays: 3,
          },
          xp: isExisting ? state.xp : 25,
          level: isExisting ? state.level : 1,
          userProfilesByEmail: {
            ...state.userProfilesByEmail,
            [email]: profile,
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
          ...EMPTY_FRESH_STUDENT_PROFILE,
          id: `std-${Date.now()}`,
          name,
          email: cleanEmail,
        };

        set((state) => ({
          currentUser: registeredUser,
          currentRole: role,
          isDemoMode: false,
          studentProfile: freshProfile,
          xp: 0,
          level: 1,
          streakDays: 0,
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
