export type UserRole = 'student' | 'institute' | 'industry' | 'admin';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  institution?: string;
  company?: string;
  emailVerified?: boolean;
}

export type AIProvider = 'gemini' | 'openai' | 'claude' | 'groq' | 'openrouter' | 'deepseek';

export interface AIKeys {
  gemini: string;
  openai: string;
  claude: string;
  groq?: string;
  openrouter?: string;
  deepseek?: string;
}

export interface AIProviderConfig {
  id: AIProvider;
  name: string;
  model: string;
  models: string[];
  apiKey: string;
  enabled: boolean;
  isDefault: boolean;
  latencyMs?: number;
  status: 'connected' | 'untested' | 'error' | 'disconnected';
  lastTested?: string;
  errorMessage?: string;
  docsUrl: string;
}

export type CopilotMentorMode =
  | 'career'
  | 'project'
  | 'interview'
  | 'learning'
  | 'opportunity'
  | 'general';

export interface CopilotChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  content: string;
  text?: string;
  timestamp: string;
  mode?: CopilotMentorMode;
  provider?: AIProvider;
  model?: string;
  isStreaming?: boolean;
  suggestedActions?: string[];
  codeSnippets?: { language: string; code: string; title?: string }[];
  evidencePills?: { label: string; type: 'github' | 'assessment' | 'project' | 'skill' }[];
  scoreImpact?: { builderScore?: number; xp?: number };
  structuredType?: 'roadmap' | 'gps' | 'missions' | 'projects' | 'gaps' | 'opportunities' | 'readiness' | 'memory' | 'profile_analysis';
  structuredPayload?: any;
}

export interface CopilotChatSession {
  id: string;
  title: string;
  mode: CopilotMentorMode;
  pinned: boolean;
  createdAt: string;
  updatedAt: string;
  messages: CopilotChatMessage[];
}

export type ThemeColor = 'blue' | 'orange' | 'green' | 'gray' | 'ocean-blue' | 'sunset-orange' | 'forest-green' | 'purple-haze' | 'monochrome' | 'cyber-teal';

export type ColorMode = 'light' | 'dark' | 'system';

export type BuilderLevelTitle =
  | 'Explorer'
  | 'Builder'
  | 'Creator'
  | 'Architect'
  | 'Innovator'
  | 'Elite Builder'
  | 'Industry Ready';

export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';

export type VerificationSource = 'Assessment' | 'Project' | 'Certification' | 'Faculty Validation' | 'GitHub Repository Analysis';

export interface VerifiedSkill {
  id: string;
  name: string;
  category: 'Programming' | 'Cloud' | 'AI & ML' | 'DevOps' | 'Database' | 'Soft Skills';
  level: SkillLevel;
  score: number; // 0 - 100
  verificationSources: VerificationSource[];
  verifiedDate: string;
  verificationCode: string;
  evidenceCount: number;
}

export interface BuilderScores {
  overall: number; // 0 - 1000
  execution: number; // 0 - 100
  leadership: number; // 0 - 100
  innovation: number; // 0 - 100
  problemSolving: number; // 0 - 100
  consistency: number; // 0 - 100
}

export interface BuilderEvidence {
  id: string;
  title: string;
  type: 'GitHub Repo' | 'Live Product' | 'Research Paper' | 'Hackathon Win' | 'Open Source PR';
  url: string;
  description: string;
  date: string;
  impactScore: number;
  verified: boolean;
}

export interface AcademicDetails {
  college: string;
  department: 'CSE' | 'IT' | 'ECE' | 'AIML' | 'Mechanical' | 'Civil' | string;
  year: '1st Year' | '2nd Year' | '3rd Year' | '4th Year' | string;
  semester: string;
  cgpa: number;
  studentId: string;
  degree?: string;
  branch?: string;
  graduationYear?: string;
  country?: string;
  state?: string;
  city?: string;
}

export interface ProfessionalDetails {
  githubUrl: string;
  linkedinUrl: string;
  portfolioUrl?: string;
  resumeUrl?: string;
  bio: string;
  totalProjects: number;
  hackathonWins: number;
  researchPapers: number;
  openSourceContributions: number;
  careerPath?: string;
  skillLevel?: 'Beginner' | 'Intermediate' | 'Advanced' | string;
  careerGoal?: 'Internship' | 'Job Placement' | 'Freelancing' | 'Startup Building' | 'Higher Studies' | string;
  knownSkills?: string[];
  projectCountRange?: string;
  hasHackathonExperience?: boolean;
  githubScore?: number;
}

export interface GitHubPinnedRepo {
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  url: string;
  topics: string[];
}

export interface GitHubData {
  connected: boolean;
  username: string;
  avatarUrl: string;
  bio: string;
  publicRepos: number;
  totalStars: number;
  followers: number;
  following: number;
  languages: { name: string; percentage: number; color: string }[];
  pinnedRepos: GitHubPinnedRepo[];
  detectedSkills: string[];
  recentCommitsCount: number;
  streakDays: number;
  // Aliases for Builder OS V5
  repositories?: { name: string; description: string; stars: number; language: string; url: string; lastUpdated: string }[];
  starsCount?: number;
  followersCount?: number;
  inferredSkills?: { skill: string; confidence: number; sourceRepo: string }[];
}

export interface AchievementBadge {
  id: string;
  title: string;
  category: 'Code' | 'Hackathon' | 'Community' | 'Streak' | 'Architecture';
  description: string;
  icon: string;
  xpReward: number;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface QuestOption {
  id: string;
  text: string;
  correct: boolean;
}

export interface QuestQuestion {
  id: string;
  question: string;
  codeSnippet?: string;
  options: QuestOption[] | string[];
  correctAnswer?: number;
  explanation: string;
  topic?: string;
}

export interface LearningQuest {
  id: string;
  title: string;
  category:
    | 'Backend'
    | 'Frontend'
    | 'AI & ML'
    | 'Data Science'
    | 'Cloud'
    | 'Cybersecurity'
    | 'Communication'
    | 'Aptitude'
    | 'Problem Solving'
    | 'Database'
    | 'DevOps'
    | 'Systems';
  difficulty: 'Easy' | 'Medium' | 'Advanced' | 'Expert' | 'Boss';
  xpReward: number;
  estimatedMinutes: number;
  description: string;
  skillsGained: string[];
  completed: boolean;
  status?: 'completed' | 'in_progress' | 'locked';
  pathId?: string;
  skillCategory?: string;
  isBossChallenge?: boolean;
  portfolioImpact?: string;
  questions?: QuestQuestion[];
}

export interface LearningPathStep {
  id: string;
  stepNumber: number;
  title: string;
  status: 'completed' | 'in_progress' | 'locked';
  xpReward: number;
  questId?: string;
}

export interface LearningPath {
  id: string;
  title: string;
  targetRole: string;
  description: string;
  totalSteps: number;
  completedSteps: number;
  steps: LearningPathStep[];
  // Aliases
  category?: string;
  milestones?: LearningPathStep[];
}

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  headline: string;
  linkedInName?: string;
  googleName?: string;
  academic: AcademicDetails;
  professional: ProfessionalDetails;
  builderScores: BuilderScores;
  employabilityScore: number; // 0 - 100
  careerReadinessScore?: number; // 0 - 100
  verifiedSkills: VerifiedSkill[];
  evidences: BuilderEvidence[];
  targetRole: string;
  onboardingCompleted?: boolean;
  // Aliases for Builder OS V5 & V7
  college?: string;
  department?: string;
  branch?: string;
  degree?: string;
  graduationYear?: string;
  country?: string;
  state?: string;
  city?: string;
  careerPath?: string;
  skillLevel?: string;
  careerGoal?: string;
  knownSkills?: string[];
  projectCount?: string;
  hackathonExperience?: string;
  builderLevel?: string;
  xp?: number;
  skills?: { name: string; score: number; level: string; category: string; verified: boolean }[];
  projects?: { id: string; title: string; description: string; techStack: string[]; verified: boolean; githubUrl?: string }[];
}

export interface AssessmentQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Assessment {
  id: string;
  title: string;
  category: 'Programming' | 'Aptitude' | 'Communication' | 'Cloud' | 'AI';
  durationMinutes: number;
  questionsCount: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  skillsEvaluated: string[];
  passingScore: number;
  completed?: boolean;
  score?: number;
  percentile?: number;
  questions?: AssessmentQuestion[];
}

export type PipelineStage = 'Matched' | 'Shortlisted' | 'Assessment' | 'Interview' | 'Selected';

export interface LeaderboardEntry {
  rank: number;
  studentName: string;
  college: string;
  department: string;
  builderScore: number;
  verifiedSkillsCount: number;
  level?: number;
  xp?: number;
  badge: string;
  avatar: string;
}

export interface SkillGapItem {
  skill: string;
  requiredLevel: SkillLevel;
  currentLevel: SkillLevel | 'None';
  gapSeverity: 'Low' | 'Medium' | 'High' | 'Critical';
  matchScore: number;
  recommendedCourse: string;
}

export interface RoleSkillGapAnalysis {
  targetRole: string;
  matchPercentage: number;
  totalRequiredSkills: number;
  matchedSkillsCount: number;
  missingSkills: string[];
  skillGaps: SkillGapItem[];
  overview: string;
}

export interface RoadmapPhase {
  id: string;
  phaseNumber: number;
  title: string;
  description: string;
  status: 'completed' | 'in_progress' | 'locked' | 'active' | 'upcoming' | string;
  progressPercentage?: number;
  duration?: string;
  courses?: {
    title: string;
    provider: string;
    duration: string;
    completed: boolean;
    url?: string;
  }[];
  milestones?: { id: string; title: string; completed: boolean; xpReward?: number }[];
  projects?: {
    title: string;
    description: string;
    techStack: string[];
    completed: boolean;
  }[];
  assessments?: {
    title: string;
    category: string;
    completed: boolean;
  }[];
}

export interface CopilotAnalysisResult {
  targetRole: string;
  currentReadinessScore: number; // 0 - 100
  summary: string;
  missingSkills: string[];
  strengths: string[];
  projectsNeeded: {
    title: string;
    description: string;
    techStack: string[];
    difficulty: string;
  }[];
  certificationsNeeded: {
    name: string;
    issuer: string;
    priority: 'High' | 'Medium' | 'Recommended';
  }[];
  estimatedTimeline: string;
  actionPlan: {
    week: string;
    milestone: string;
    focusArea: string;
  }[];
}

// AI Career Copilot 3.0 Models
export interface WeeklyMission {
  id: string;
  title: string;
  description: string;
  category: 'Assessment' | 'Project' | 'Profile' | 'DSA' | 'Skill';
  estimatedMinutes: number;
  completed: boolean;
  xpReward: number;
  dueDate?: string;
}

export interface CareerGPS {
  currentPosition: string; // e.g. "Year 3 CSE (Semester 6)"
  targetPosition: string; // e.g. "AI Engineer"
  distanceSkillsCount: number; // e.g. 5 skills needed
  estimatedMonths: number; // e.g. 6 Months
  successProbability: number; // e.g. 84%
  criticalMilestones: string[];
}

export interface OpportunityMatch {
  id: string;
  title: string;
  company: string;
  type: 'Job' | 'Internship' | 'Hackathon' | 'Competition';
  matchScore: number; // %
  matchReasons: string[];
  requiredSkills: string[];
  missingSkills: string[];
  url?: string;
  deadline?: string;
}

export interface LearningVelocity {
  velocityScore: number; // 0 - 100
  percentileRank: string; // e.g. "Top 10% Growth Rate"
  skillsGainedLast30Days: number;
  projectsCompletedCount: number;
  assessmentsPassedCount: number;
  githubGrowthRate: string; // e.g. "+34% Commits MoM"
}

export type CopilotAssistantMode = 'career' | 'learning' | 'projects' | 'interview' | 'productivity';

export interface CopilotMemoryItem {
  id: string;
  category: 'goal' | 'tech_stack' | 'learning_plan' | 'project_idea' | 'weakness' | 'strength' | 'custom';
  content: string;
  timestamp: string;
  relevance?: number;
}

export interface CopilotMemory {
  rememberedGoals: string[];
  preferredTechnologies: string[];
  activeLearningPlans: string[];
  savedProjectIdeas: string[];
  identifiedWeaknesses: string[];
  identifiedStrengths: string[];
  lastSummary: string;
  items: CopilotMemoryItem[];
}

export interface GitHubProfileAnalysis {
  analyzedAt: string;
  username: string;
  skillMap: { skill: string; confidence: number; evidence: string }[];
  strengthMap: { area: string; description: string }[];
  weaknessMap: { gap: string; recommendation: string }[];
  careerRecommendations: string[];
  complexityScore: number; // 0 - 100
}

export interface CopilotSession {
  id: string;
  title: string;
  targetRole: string;
  createdAt: string;
  lastActive: string;
  messages: CopilotChatMessage[];
  readinessScore: number;
  industryAvg: number;
  topStudentsScore: number;
}


export interface InternshipOpportunity {
  id: string;
  role: string;
  company: string;
  companyLogo: string;
  location: string;
  type: 'Remote' | 'Hybrid' | 'On-site';
  stipend: string;
  duration: string;
  matchScore: number;
  requiredSkills: string[];
  postedDate: string;
  applied: boolean;
  applicantsCount: number;
  description: string;
}

// Institute Portal Models
export interface DepartmentMetric {
  name: 'CSE' | 'IT' | 'ECE' | 'AIML';
  totalStudents: number;
  overallReadiness: number; // %
  programming: number; // %
  cloud: number; // %
  ai: number; // %
  devOps: number; // %
  dataScience: number; // %
}

export interface CurriculumAnalysisResult {
  syllabusTitle: string;
  department: string;
  semester: string;
  industryRelevanceScore: number; // 0 - 100
  totalTopicsAnalyzed: number;
  modernTopicsCount: number;
  missingTopics: {
    topic: string;
    importance: 'Critical' | 'High' | 'Moderate';
    industryUsagePercentage: number;
    recommendedModule: string;
  }[];
  outdatedTopics: string[];
  suggestedImprovements: string[];
  topSkillsCovered: string[];
}

// Industry Portal Models
export interface JobRequirement {
  id: string;
  title: string;
  department: string;
  experienceLevel: 'Entry Level (0-1 yrs)' | 'Associate (1-3 yrs)' | 'Mid-Senior (3-5 yrs)';
  location: string;
  type: 'Full-Time' | 'Internship' | 'Contract';
  salaryRange: string;
  minMatchScore: number;
  requiredSkills: string[];
  preferredSkills: string[];
  activeApplicants: number;
  createdAt: string;
  status: 'Active' | 'Draft' | 'Closed';
}

export interface CandidateApplication {
  id: string;
  studentId: string;
  name: string;
  avatar: string;
  college: string;
  institution?: string;
  department: string;
  branch?: string;
  degree?: string;
  graduationYear?: string;
  location?: string;
  targetRole: string;
  jobId: string;
  builderScore: number;
  employabilityScore: number;
  careerReadinessScore?: number;
  githubScore?: number;
  matchScore: number;
  stage: 'Matched' | 'Shortlisted' | 'Assessment' | 'Interview' | 'Selected';
  appliedDate: string;
  topSkills: string[];
  githubUrl: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  resumeUrl?: string;
  verifiedSkills?: {
    name: string;
    category?: string;
    level?: string;
    score?: number;
    sources?: string[];
  }[];
  projects?: {
    title: string;
    techStack: string[];
    githubUrl?: string;
    projectScore?: number;
    description?: string;
  }[];
  certifications?: {
    title: string;
    issuer: string;
    date?: string;
    score?: number;
  }[];
  assessments?: {
    title: string;
    score: number;
    passed: boolean;
    date?: string;
  }[];
}

export interface Assignment {
  id: string;
  title: string;
  type: 'Coding Test' | 'Case Study' | 'Mini Project' | 'System Design Challenge';
  roleTarget: string;
  duration: string;
  totalAssigned: number;
  submissionsCount: number;
  averageScore: number;
  status: 'Active' | 'Archived';
  dueDate: string;
}

// Admin Portal Models
export interface SkillDemandMetric {
  skill: string;
  category: string;
  demandPercentage: number;
  growthRate: number; // % YoY
  avgSalary: string;
  openRolesCount: number;
  demandTrend: { month: string; value: number }[];
}

export interface PlatformUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  organization: string;
  status: 'Active' | 'Pending' | 'Suspended';
  joinedDate: string;
  activityScore: number;
}

// V7 Ecosystem Types
export interface BuilderChecklistItem {
  id: string;
  title: string;
  description: string;
  category: 'Onboarding' | 'Verification' | 'Capstone' | 'Industry';
  xpReward: number;
  completed: boolean;
  actionUrl: string;
  completedAt?: string;
}

export interface TierRankings {
  deptRank: number;
  deptName: string;
  collegeRank: number;
  collegeName: string;
  stateRank: number;
  stateName: string;
  nationalRank: number;
  globalPercentile: string;
}

export interface IndustryAssessmentDraft {
  id?: string;
  title: string;
  category: 'Backend' | 'Frontend' | 'AI & ML' | 'DevOps' | 'Database' | 'Systems';
  type: 'MCQ' | 'Coding' | 'Debugging' | 'Case Study' | 'Text Response' | 'Mixed';
  difficulty: 'Easy' | 'Medium' | 'Advanced' | 'Expert' | 'Boss';
  xpReward: number;
  estimatedMinutes: number;
  description: string;
  skillsGained: string[];
  passingScore: number;
  roleTarget: string;
  companyName: string;
  questions: QuestQuestion[];
}

// ASSESSMENT SYSTEM 4.0 MODELS
export interface QuestionLearningReferences {
  officialDocs: { title: string; url: string; provider: string };
  article: { title: string; url: string; source: string };
  videoTutorial: { title: string; url: string; channel: string };
  practiceQuestions: { title: string; count: number; url: string };
  miniAssessment: { title: string; questionsCount: number; topic: string };
}

export interface QuestionReviewItem {
  questionNumber: number;
  questionId: string;
  question: string;
  codeSnippet?: string;
  subtopic?: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
  userAnswerIndex: number;
  userAnswerText: string;
  correctAnswerIndex: number;
  correctAnswerText: string;
  isCorrect: boolean;
  explanation: string;
  whyMissed: string;
  references: QuestionLearningReferences;
}

export interface AssessmentAttemptRecord {
  id: string;
  topic: string;
  department: string;
  attemptNumber: number;
  date: string;
  timestamp: number;
  score: number;
  passed: boolean;
  totalQuestions: number;
  correctCount: number;
  wrongCount: number;
  timeTakenSeconds: number;
  timeTakenFormatted: string;
  xpEarned: number;
  builderScoreImpact: number;
  difficultyReached: 'Foundational' | 'Intermediate' | 'Advanced' | 'Industry Expert';
  reviewItems: QuestionReviewItem[];
  strongAreas: string[];
  weakAreas: string[];
  difficultyBreakdown: {
    easy: { correct: number; total: number };
    medium: { correct: number; total: number };
    hard: { correct: number; total: number };
    expert: { correct: number; total: number };
  };
  skillGapRecommendations: {
    concept: string;
    gapSeverity: 'Critical' | 'Moderate' | 'Low';
    action: string;
    resourceUrl?: string;
  }[];
  aiStudyPlan: {
    day: string;
    title: string;
    focus: string;
    task: string;
    estimatedMinutes: number;
  }[];
}

export interface AssessmentTopicSummary {
  topic: string;
  department: string;
  completed: boolean;
  attemptsCount: number;
  bestScore: number;
  latestScore: number;
  firstScore: number;
  improvementTrend: string; // e.g. "+19%" or "0%"
  latestAttemptDate: string;
  latestRecord?: AssessmentAttemptRecord;
}

