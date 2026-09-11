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

export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';

export type VerificationSource = 'Assessment' | 'Project' | 'Certification' | 'Faculty Validation';

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

export interface LeaderboardEntry {
  rank: number;
  studentName: string;
  college: string;
  department: string;
  builderScore: number;
  verifiedSkillsCount: number;
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

export type PipelineStage = 'Matched' | 'Shortlisted' | 'Assessment' | 'Interview' | 'Selected';

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
  stage: PipelineStage;
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
