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

export type AIProvider = 'gemini' | 'openai' | 'claude';

export interface AIKeys {
  gemini: string;
  openai: string;
  claude: string;
}

export type ThemeColor =
  | 'ocean-blue'
  | 'sunset-orange'
  | 'forest-green'
  | 'purple-haze'
  | 'monochrome'
  | 'cyber-teal';

export type ColorMode = 'light' | 'dark';

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
  department: 'CSE' | 'IT' | 'ECE' | 'AIML' | 'Mechanical' | 'Civil';
  year: '1st Year' | '2nd Year' | '3rd Year' | '4th Year';
  semester: string;
  cgpa: number;
  studentId: string;
}

export interface ProfessionalDetails {
  githubUrl: string;
  linkedinUrl: string;
  portfolioUrl?: string;
  bio: string;
  totalProjects: number;
  hackathonWins: number;
  researchPapers: number;
  openSourceContributions: number;
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
  options: QuestOption[];
  explanation: string;
}

export interface LearningQuest {
  id: string;
  title: string;
  category: 'Backend' | 'Frontend' | 'DevOps' | 'AI & ML' | 'Database' | 'Systems';
  difficulty: 'Easy' | 'Medium' | 'Advanced' | 'Expert';
  xpReward: number;
  estimatedMinutes: number;
  description: string;
  skillsGained: string[];
  completed: boolean;
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
  verifiedSkills: VerifiedSkill[];
  evidences: BuilderEvidence[];
  targetRole: string;
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
  phaseNumber: 1 | 2 | 3 | 4;
  title: 'Foundation' | 'Core' | 'Advanced' | 'Industry Ready';
  description: string;
  status: 'completed' | 'in_progress' | 'locked';
  progressPercentage: number;
  courses: {
    title: string;
    provider: string;
    duration: string;
    completed: boolean;
    url?: string;
  }[];
  projects: {
    title: string;
    description: string;
    techStack: string[];
    completed: boolean;
  }[];
  assessments: {
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

export interface CopilotChatMessage {
  id: string;
  sender: 'user' | 'copilot';
  text: string;
  timestamp: string;
  structuredType?: 'roadmap' | 'gps' | 'missions' | 'projects' | 'gaps' | 'opportunities' | 'readiness';
  structuredPayload?: any;
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
  department: string;
  targetRole: string;
  jobId: string;
  builderScore: number;
  employabilityScore: number;
  matchScore: number;
  stage: 'Matched' | 'Shortlisted' | 'Assessment' | 'Interview' | 'Selected';
  appliedDate: string;
  topSkills: string[];
  githubUrl: string;
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
