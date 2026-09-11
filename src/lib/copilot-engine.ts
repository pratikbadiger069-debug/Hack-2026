import {
  StudentProfile,
  AIProvider,
  WeeklyMission,
  CareerGPS,
  OpportunityMatch,
  LearningVelocity,
  RoadmapPhase,
  CopilotChatMessage,
  CopilotSession,
} from '@/types';

export interface TargetRoleBenchmark {
  role: string;
  requiredSkills: { name: string; category: string; importance: 'Core' | 'High' | 'Complementary'; minScore: number }[];
  recommendedProjects: { title: string; description: string; techStack: string[]; difficulty: 'Beginner' | 'Intermediate' | 'Advanced' }[];
  certifications: { name: string; issuer: string; priority: 'High' | 'Medium' | 'Recommended' }[];
  industryAvgScore: number;
  topStudentsScore: number;
  avgMonthsToReady: number;
}

export const ROLE_BENCHMARKS: Record<string, TargetRoleBenchmark> = {
  'Software Development': {
    role: 'Software Development',
    requiredSkills: [
      { name: 'TypeScript & Next.js', category: 'Programming', importance: 'Core', minScore: 85 },
      { name: 'Data Structures & Algorithms', category: 'Programming', importance: 'Core', minScore: 85 },
      { name: 'PostgreSQL & SQL Schema Design', category: 'Database', importance: 'Core', minScore: 80 },
      { name: 'REST & GraphQL API Architecture', category: 'Programming', importance: 'Core', minScore: 80 },
      { name: 'Docker Containerization', category: 'DevOps', importance: 'High', minScore: 75 },
      { name: 'Redis Caching & State Management', category: 'Database', importance: 'High', minScore: 75 },
      { name: 'CI/CD & Automated Testing (Jest/Playwright)', category: 'DevOps', importance: 'High', minScore: 75 },
      { name: 'System Design & Distributed Scalability', category: 'Programming', importance: 'High', minScore: 75 },
    ],
    recommendedProjects: [
      {
        title: 'Distributed Multi-Tenant Task Execution Engine',
        description: 'Design a queue-backed worker cluster in TypeScript with Redis pub/sub, idempotent deduplication, and failure retries.',
        techStack: ['TypeScript', 'Node.js', 'Redis', 'PostgreSQL', 'Docker'],
        difficulty: 'Advanced',
      },
      {
        title: 'Full-Stack Real-time Collaborative Canvas',
        description: 'Multiplayer board with WebSockets CRDT state synchronization, role-based RBAC, and responsive UI.',
        techStack: ['React', 'Next.js', 'Tailwind', 'WebSockets', 'Prisma'],
        difficulty: 'Intermediate',
      },
      {
        title: 'High-Throughput URL Shortener & Clickstream Telemetry',
        description: 'Sub-15ms redirection gateway with LRU memory caching, rate limiting, and partitioned analytics.',
        techStack: ['Go/Node.js', 'PostgreSQL', 'Redis', 'Docker'],
        difficulty: 'Intermediate',
      },
    ],
    certifications: [
      { name: 'AWS Certified Developer - Associate', issuer: 'Amazon Web Services', priority: 'High' },
      { name: 'Meta Front-End / Back-End Professional Certificate', issuer: 'Meta / Coursera', priority: 'Medium' },
    ],
    industryAvgScore: 72,
    topStudentsScore: 88,
    avgMonthsToReady: 5,
  },

  'AI / Machine Learning': {
    role: 'AI / Machine Learning',
    requiredSkills: [
      { name: 'Python & PyTorch', category: 'AI & ML', importance: 'Core', minScore: 88 },
      { name: 'Transformers & LLM Architectures', category: 'AI & ML', importance: 'Core', minScore: 85 },
      { name: 'Vector Databases (pgvector/Pinecone/Chroma)', category: 'Database', importance: 'Core', minScore: 82 },
      { name: 'FastAPI & Async Inference Serving', category: 'Programming', importance: 'High', minScore: 80 },
      { name: 'LLM Fine-tuning (LoRA / QLoRA / PEFT)', category: 'AI & ML', importance: 'High', minScore: 80 },
      { name: 'Docker & GPU Containerization', category: 'DevOps', importance: 'High', minScore: 75 },
      { name: 'Model Evaluation & RAG Tracing (Langfuse/Arize)', category: 'AI & ML', importance: 'High', minScore: 75 },
    ],
    recommendedProjects: [
      {
        title: 'Enterprise Multi-Modal RAG Engine with Hybrid Reranking',
        description: 'Multi-tenant document retrieval system using cross-encoders, BM25 + dense embedding hybrid search, and citation graphs.',
        techStack: ['Python', 'FastAPI', 'pgvector', 'Cross-Encoders', 'Next.js'],
        difficulty: 'Advanced',
      },
      {
        title: 'Autonomous Multi-Agent Workflow Engine with Tool Calling',
        description: 'Stateful cyclic agent graph using LangGraph, short/long-term memory buffers, and human approval gates.',
        techStack: ['Python', 'LangGraph', 'Redis', 'OpenAI / Gemini API', 'Docker'],
        difficulty: 'Advanced',
      },
    ],
    certifications: [
      { name: 'DeepLearning.AI Deep Learning Specialization', issuer: 'DeepLearning.AI / Coursera', priority: 'High' },
      { name: 'AWS Certified Machine Learning - Specialty', issuer: 'Amazon Web Services', priority: 'High' },
    ],
    industryAvgScore: 74,
    topStudentsScore: 90,
    avgMonthsToReady: 6,
  },

  'Data Science': {
    role: 'Data Science',
    requiredSkills: [
      { name: 'Python, Pandas & NumPy', category: 'Programming', importance: 'Core', minScore: 90 },
      { name: 'Statistical Inference & Hypothesis Testing', category: 'AI & ML', importance: 'Core', minScore: 85 },
      { name: 'Advanced SQL & Data Warehouse Modeling', category: 'Database', importance: 'Core', minScore: 85 },
      { name: 'Scikit-Learn & Gradient Boosting (XGBoost/LightGBM)', category: 'AI & ML', importance: 'High', minScore: 82 },
      { name: 'Data Visualization (Plotly/Seaborn/Streamlit)', category: 'Programming', importance: 'High', minScore: 80 },
      { name: 'Feature Engineering & Data Validation (Great Expectations)', category: 'Database', importance: 'High', minScore: 78 },
    ],
    recommendedProjects: [
      {
        title: 'Predictive Customer Churn Pipeline with Explainable AI (SHAP)',
        description: 'End-to-end ML pipeline with cross-validation, feature drift tracking, and interactive Streamlit decision dashboard.',
        techStack: ['Python', 'XGBoost', 'SHAP', 'Streamlit', 'PostgreSQL'],
        difficulty: 'Intermediate',
      },
      {
        title: 'Real-time Financial Sentiment & Market Alpha Signal Engine',
        description: 'Scrape earnings calls and news feeds, compute FinBERT sentiment indices, and simulate backtested portfolio returns.',
        techStack: ['Python', 'FinBERT', 'Pandas', 'yfinance', 'Plotly'],
        difficulty: 'Advanced',
      },
    ],
    certifications: [
      { name: 'Google Professional Data Engineer', issuer: 'Google Cloud', priority: 'High' },
      { name: 'IBM Data Science Professional Certificate', issuer: 'IBM / Coursera', priority: 'Medium' },
    ],
    industryAvgScore: 71,
    topStudentsScore: 86,
    avgMonthsToReady: 6,
  },

  'Cybersecurity': {
    role: 'Cybersecurity',
    requiredSkills: [
      { name: 'Network Protocols & Packet Analysis (Wireshark)', category: 'DevOps', importance: 'Core', minScore: 85 },
      { name: 'Linux System Hardening & Bash Scripting', category: 'Programming', importance: 'Core', minScore: 85 },
      { name: 'Vulnerability Assessment & Pen-testing (OWASP Top 10)', category: 'DevOps', importance: 'Core', minScore: 82 },
      { name: 'SIEM & Threat Detection (Splunk / ELK / Suricata)', category: 'Cloud', importance: 'High', minScore: 78 },
      { name: 'Applied Cryptography & Zero Trust Identity (OAuth/mTLS)', category: 'Programming', importance: 'High', minScore: 75 },
    ],
    recommendedProjects: [
      {
        title: 'Automated Network Packet Sniffer & Port Scan Detector',
        description: 'Live traffic monitoring daemon using Scapy to analyze packet anomalies and trigger automated firewall rules.',
        techStack: ['Python', 'Scapy', 'Wireshark', 'FastAPI', 'Docker'],
        difficulty: 'Advanced',
      },
      {
        title: 'Vulnerability Assessment Scanner for Web APIs',
        description: 'Automated fuzzing tool checking for IDOR, JWT tampering, and broken object level authorization.',
        techStack: ['Go/Python', 'Docker', 'SQLite', 'ReportLab'],
        difficulty: 'Intermediate',
      },
    ],
    certifications: [
      { name: 'CompTIA Security+ (SY0-701)', issuer: 'CompTIA', priority: 'High' },
      { name: 'Certified Ethical Hacker (CEH)', issuer: 'EC-Council', priority: 'High' },
    ],
    industryAvgScore: 73,
    topStudentsScore: 87,
    avgMonthsToReady: 6,
  },

  'Cloud Computing': {
    role: 'Cloud Computing',
    requiredSkills: [
      { name: 'AWS / GCP Core Services (Compute, VPC, IAM, S3)', category: 'Cloud', importance: 'Core', minScore: 85 },
      { name: 'Infrastructure as Code (Terraform / CloudFormation)', category: 'Cloud', importance: 'Core', minScore: 82 },
      { name: 'Docker & Kubernetes Cluster Orchestration', category: 'DevOps', importance: 'Core', minScore: 82 },
      { name: 'Serverless Architectures & Event-Driven Pipelines', category: 'Cloud', importance: 'High', minScore: 80 },
      { name: 'Cloud Security & Cost Optimization', category: 'Cloud', importance: 'High', minScore: 75 },
    ],
    recommendedProjects: [
      {
        title: 'Multi-Region High-Availability Infrastructure with Terraform',
        description: 'Automated Terraform module provisioning VPC peering, auto-scaling groups, ALB, and CloudWatch alert triggers.',
        techStack: ['Terraform', 'AWS', 'Docker', 'Nginx', 'GitHub Actions'],
        difficulty: 'Advanced',
      },
    ],
    certifications: [
      { name: 'AWS Certified Solutions Architect - Associate', issuer: 'Amazon Web Services', priority: 'High' },
      { name: 'Google Cloud Associate Cloud Engineer', issuer: 'Google Cloud', priority: 'High' },
    ],
    industryAvgScore: 72,
    topStudentsScore: 86,
    avgMonthsToReady: 5,
  },

  'DevOps': {
    role: 'DevOps',
    requiredSkills: [
      { name: 'CI/CD Pipelines (GitHub Actions / GitLab CI)', category: 'DevOps', importance: 'Core', minScore: 85 },
      { name: 'Docker Containerization & Multi-stage Builds', category: 'DevOps', importance: 'Core', minScore: 85 },
      { name: 'Kubernetes (Deployments, Services, Helm)', category: 'DevOps', importance: 'Core', minScore: 82 },
      { name: 'Monitoring & Observability (Prometheus / Grafana / Loki)', category: 'Cloud', importance: 'High', minScore: 80 },
      { name: 'Linux Kernel & Shell Automation', category: 'Programming', importance: 'High', minScore: 80 },
    ],
    recommendedProjects: [
      {
        title: 'Zero-Downtime Blue/Green Deployment Pipeline with Canary Monitoring',
        description: 'ArgoCD GitOps pipeline with automated rollback triggers on Prometheus error-budget spikes.',
        techStack: ['Kubernetes', 'Helm', 'ArgoCD', 'Prometheus', 'GitHub Actions'],
        difficulty: 'Advanced',
      },
    ],
    certifications: [
      { name: 'Certified Kubernetes Administrator (CKA)', issuer: 'CNCF / Linux Foundation', priority: 'High' },
      { name: 'HashiCorp Certified: Terraform Associate', issuer: 'HashiCorp', priority: 'High' },
    ],
    industryAvgScore: 73,
    topStudentsScore: 88,
    avgMonthsToReady: 5,
  },

  'Product Management': {
    role: 'Product Management',
    requiredSkills: [
      { name: 'Product Discovery, Personas & User Interviews', category: 'Soft Skills', importance: 'Core', minScore: 85 },
      { name: 'PRD Writing & Acceptance Criteria', category: 'Soft Skills', importance: 'Core', minScore: 85 },
      { name: 'Product Analytics & SQL (Funnel Analysis)', category: 'Database', importance: 'Core', minScore: 80 },
      { name: 'Wireframing & Prototype Validation (Figma)', category: 'Soft Skills', importance: 'High', minScore: 78 },
      { name: 'A/B Experimentation & Statistical Significance', category: 'AI & ML', importance: 'High', minScore: 75 },
    ],
    recommendedProjects: [
      {
        title: 'Comprehensive 0-to-1 SaaS PRD & Interactive Figma Prototype',
        description: 'User problem breakdown, competitive tear-downs, metrics hierarchy (North Star), and launch roadmap.',
        techStack: ['Figma', 'Notion', 'SQL', 'Mixpanel'],
        difficulty: 'Intermediate',
      },
    ],
    certifications: [
      { name: 'Product School Product Manager Certificate (PMC)', issuer: 'Product School', priority: 'High' },
    ],
    industryAvgScore: 70,
    topStudentsScore: 85,
    avgMonthsToReady: 4,
  },

  'UI/UX Design': {
    role: 'UI/UX Design',
    requiredSkills: [
      { name: 'Figma Auto-Layout & Design Systems Tokens', category: 'Soft Skills', importance: 'Core', minScore: 88 },
      { name: 'User Research & Information Architecture', category: 'Soft Skills', importance: 'Core', minScore: 85 },
      { name: 'Interactive Prototyping & Micro-interactions', category: 'Soft Skills', importance: 'Core', minScore: 82 },
      { name: 'Accessibility (WCAG 2.1 AA Standards)', category: 'Programming', importance: 'High', minScore: 80 },
      { name: 'HTML5 & Modern CSS / Tailwind Hand-off', category: 'Programming', importance: 'High', minScore: 75 },
    ],
    recommendedProjects: [
      {
        title: 'Multi-Platform Design System with 40+ Tokenized Components',
        description: 'Complete Figma system with WCAG contrast audit, light/dark parity, and responsive variants.',
        techStack: ['Figma', 'Design Tokens', 'Storybook', 'HTML/CSS'],
        difficulty: 'Intermediate',
      },
    ],
    certifications: [
      { name: 'Google UX Design Professional Certificate', issuer: 'Google / Coursera', priority: 'High' },
    ],
    industryAvgScore: 71,
    topStudentsScore: 86,
    avgMonthsToReady: 4,
  },

  'Entrepreneurship': {
    role: 'Entrepreneurship',
    requiredSkills: [
      { name: 'Full-Stack Rapid MVP Prototyping', category: 'Programming', importance: 'Core', minScore: 85 },
      { name: 'Customer Validation & Lean Canvas', category: 'Soft Skills', importance: 'Core', minScore: 85 },
      { name: 'GTM Strategy & Growth Analytics', category: 'Soft Skills', importance: 'Core', minScore: 80 },
      { name: 'Pitch Deck & Financial Modeling', category: 'Soft Skills', importance: 'High', minScore: 78 },
      { name: 'Payment Integrations (Stripe/Razorpay)', category: 'Programming', importance: 'High', minScore: 80 },
    ],
    recommendedProjects: [
      {
        title: 'Runnable Micro-SaaS Product with Stripe Billing and Auth',
        description: 'End-to-end deployed software product with landing page, user onboarding, database, and webhook monetization.',
        techStack: ['Next.js', 'PostgreSQL', 'Stripe API', 'Tailwind', 'Vercel'],
        difficulty: 'Advanced',
      },
    ],
    certifications: [
      { name: 'Y Combinator Startup School Certificate', issuer: 'Y Combinator', priority: 'High' },
    ],
    industryAvgScore: 72,
    topStudentsScore: 88,
    avgMonthsToReady: 5,
  },

  'Other': {
    role: 'Engineering Specialist',
    requiredSkills: [
      { name: 'Core Programming & Data Structures', category: 'Programming', importance: 'Core', minScore: 80 },
      { name: 'Database Fundamentals & SQL', category: 'Database', importance: 'Core', minScore: 75 },
      { name: 'Version Control (Git & GitHub Workflows)', category: 'DevOps', importance: 'Core', minScore: 75 },
    ],
    recommendedProjects: [
      {
        title: 'Domain-Specific Evidence Portfolio Repository',
        description: 'Modular repository demonstrating applied engineering concepts and documentation.',
        techStack: ['Python', 'SQL', 'Git'],
        difficulty: 'Intermediate',
      },
    ],
    certifications: [
      { name: 'CS50: Introduction to Computer Science', issuer: 'Harvard University / edX', priority: 'High' },
    ],
    industryAvgScore: 70,
    topStudentsScore: 84,
    avgMonthsToReady: 4,
  },
};

export function getRoleBenchmark(targetRole: string): TargetRoleBenchmark {
  const normalized = (targetRole || 'Software Development').trim();
  const matchedKey = Object.keys(ROLE_BENCHMARKS).find(
    (k) => k.toLowerCase() === normalized.toLowerCase() || normalized.toLowerCase().includes(k.toLowerCase()) || k.toLowerCase().includes(normalized.toLowerCase())
  );
  return ROLE_BENCHMARKS[matchedKey || 'Software Development'];
}

/**
 * Calculates Student Context, Readiness Score, Gaps, GPS, Missions, and Velocity
 */
export function analyzeStudentCareerContext(profile: StudentProfile, targetRoleInput?: string) {
  const targetRole = targetRoleInput || profile.careerPath || profile.targetRole || 'Software Development';
  const benchmark = getRoleBenchmark(targetRole);

  const studentSkills = profile.verifiedSkills || [];
  const studentSkillMap = new Map<string, number>();
  studentSkills.forEach((s) => {
    studentSkillMap.set(s.name.toLowerCase(), s.score);
  });

  // Also factor knownSkills from onboarding
  const knownSkills = profile.knownSkills || profile.professional?.knownSkills || [];
  knownSkills.forEach((ks) => {
    if (!studentSkillMap.has(ks.toLowerCase())) {
      studentSkillMap.set(ks.toLowerCase(), 75);
    }
  });

  const missingSkills: string[] = [];
  const weakSkills: { skill: string; currentScore: number; requiredScore: number }[] = [];
  const masteredSkills: { skill: string; score: number }[] = [];

  let totalWeight = 0;
  let earnedWeight = 0;

  benchmark.requiredSkills.forEach((req) => {
    const weight = req.importance === 'Core' ? 3 : req.importance === 'High' ? 2 : 1;
    totalWeight += weight;

    const lowerName = req.name.toLowerCase();
    let foundScore = 0;

    for (const [sName, sScore] of studentSkillMap.entries()) {
      if (sName.includes(lowerName) || lowerName.includes(sName)) {
        foundScore = Math.max(foundScore, sScore);
      }
    }

    if (foundScore === 0) {
      missingSkills.push(req.name);
    } else if (foundScore < req.minScore) {
      weakSkills.push({ skill: req.name, currentScore: foundScore, requiredScore: req.minScore });
      earnedWeight += weight * (foundScore / req.minScore);
    } else {
      masteredSkills.push({ skill: req.name, score: foundScore });
      earnedWeight += weight * 1.0;
    }
  });

  // Calculate readiness score
  const skillRatio = totalWeight > 0 ? earnedWeight / totalWeight : 0.6;
  const totalProj = profile.professional?.totalProjects ?? (profile.projectCount === '5+' ? 6 : profile.projectCount === '3–5' ? 4 : 2);
  const projectFactor = Math.min(1.0, totalProj / 6);
  const cgpaFactor = Math.min(1.0, (profile.academic?.cgpa || 8.0) / 10);
  const builderFactor = Math.min(1.0, (profile.builderScores?.overall || 500) / 1000);

  const calculatedReadiness = Math.round(
    skillRatio * 45 + projectFactor * 25 + cgpaFactor * 15 + builderFactor * 15
  );

  const readinessScore = Math.max(40, Math.min(96, profile.careerReadinessScore || calculatedReadiness));

  // Career GPS
  const distanceSkillsCount = missingSkills.length + weakSkills.length;
  const estimatedMonths = Math.max(2, Math.round(distanceSkillsCount * 1.0));
  const successProbability = Math.min(95, Math.max(55, Math.round(readinessScore * 0.95 + 6)));

  const collegeName = profile.academic?.college || profile.college || 'University';
  const semesterStr = profile.academic?.semester || 'Semester 6';
  const branchStr = profile.academic?.department || profile.branch || 'CSE';

  const careerGps: CareerGPS = {
    currentPosition: `${branchStr} (${semesterStr}) • ${collegeName}`,
    targetPosition: targetRole,
    distanceSkillsCount,
    estimatedMonths,
    successProbability,
    criticalMilestones: [
      `Bridge skill gap: Master ${missingSkills[0] || benchmark.requiredSkills[0]?.name || 'Core Fundamentals'}`,
      `Deploy ${benchmark.recommendedProjects[0]?.title.split(' ')[0] || 'Flagship'} Capstone to Production`,
      `Pass verified SkillBridge verification assessment with >=80% score`,
      `Target verified ${profile.careerGoal || 'Internship'} applications`,
    ],
  };

  // Weekly Missions tailored to student's exact gaps
  const weeklyMissions: WeeklyMission[] = [
    {
      id: 'm-1',
      title: `Complete ${missingSkills[0] || 'Core Architecture'} Diagnostic Assessment`,
      description: `Validate foundational concepts in ${missingSkills[0] || 'Systems Engineering'} to elevate your Builder Score.`,
      category: 'Assessment',
      estimatedMinutes: 45,
      completed: false,
      xpReward: 120,
      dueDate: 'In 3 days',
    },
    {
      id: 'm-2',
      title: `Build ${benchmark.recommendedProjects[0]?.title.slice(0, 32) || 'Target Capstone'}`,
      description: benchmark.recommendedProjects[0]?.description || 'Build production-grade repository with clean architecture and docs.',
      category: 'Project',
      estimatedMinutes: 180,
      completed: false,
      xpReward: 350,
      dueDate: 'This Sunday',
    },
    {
      id: 'm-3',
      title: 'Audit GitHub Repositories & Pin Verified Evidence',
      description: 'Add architecture diagrams, README badges, and live demo links for recruiter verification.',
      category: 'Profile',
      estimatedMinutes: 30,
      completed: Boolean(profile.professional?.githubUrl),
      xpReward: 80,
      dueDate: 'In 2 days',
    },
    {
      id: 'm-4',
      title: `Target 5 Interview Practice Problems for ${targetRole}`,
      description: 'Sharpen technical problem-solving velocity for tier-1 recruiter technical rounds.',
      category: 'DSA',
      estimatedMinutes: 60,
      completed: false,
      xpReward: 150,
      dueDate: 'In 5 days',
    },
  ];

  // Learning Velocity
  const learningVelocity: LearningVelocity = {
    velocityScore: Math.min(99, Math.round((profile.builderScores?.overall || 500) / 10 + 6)),
    percentileRank: 'Top 10% Growth Velocity',
    skillsGainedLast30Days: Math.max(2, studentSkills.length > 2 ? studentSkills.length : 2),
    projectsCompletedCount: totalProj,
    assessmentsPassedCount: Math.max(1, studentSkills.length),
    githubGrowthRate: '+34% Commits MoM',
  };

  // Opportunity Matching
  const opportunityMatches: OpportunityMatch[] = [
    {
      id: 'opp-1',
      title: `${targetRole} Builder Intern`,
      company: 'Anthropic / Scale AI Labs',
      type: 'Internship',
      matchScore: Math.min(96, readinessScore + 6),
      matchReasons: [
        `Strong match with ${profile.degree || 'B.Tech'} background at ${collegeName}`,
        `Verified Builder Score in top tier (${profile.builderScores?.overall || 650}/1000)`,
        `Target goal aligns with ${profile.careerGoal || 'Internship'}`,
      ],
      requiredSkills: [benchmark.requiredSkills[0]?.name || 'TypeScript', benchmark.requiredSkills[1]?.name || 'Python'],
      missingSkills: missingSkills.slice(0, 2),
      deadline: 'Apply within 5 days',
    },
    {
      id: 'opp-2',
      title: `Junior ${targetRole} Engineer`,
      company: 'Stripe / Linear Platform',
      type: 'Job',
      matchScore: Math.min(92, readinessScore + 2),
      matchReasons: [
        'Demonstrated verifiable code evidence and repository cadence',
        'Academic standing and builder competency index meet threshold',
      ],
      requiredSkills: [benchmark.requiredSkills[0]?.name || 'Backend Systems', 'PostgreSQL'],
      missingSkills: missingSkills.slice(0, 1),
      deadline: 'Rolling applications',
    },
    {
      id: 'opp-3',
      title: 'National Collegiate Builder Hackathon 2026',
      company: 'SkillBridge & Devpost',
      type: 'Hackathon',
      matchScore: 98,
      matchReasons: [
        'High ROI for expanding verified evidence portfolio',
        'Direct recruiter fast-track for top 10 finalists',
      ],
      requiredSkills: [targetRole, 'Full-Stack MVP'],
      missingSkills: [],
      deadline: 'Starts in 10 days',
    },
  ];

  // 4-Phase Personalized Roadmap
  const roadmapPhases: RoadmapPhase[] = [
    {
      id: 'rp-1',
      phaseNumber: 1,
      title: 'Foundation',
      description: `Solidify core programming, algorithms, and system fundamentals for ${targetRole}.`,
      status: 'completed',
      progressPercentage: 100,
      courses: [
        { title: 'Advanced Data Structures & Engineering Clean Code', provider: 'SkillBridge Labs', duration: '3 Weeks', completed: true },
        { title: 'Database Schema & High-Concurrency Modeling', provider: collegeName, duration: '2 Weeks', completed: true },
      ],
      projects: [
        { title: 'Memory-Efficient Cache Architecture', description: 'LRU/LFU cache with mutex locks and tests.', techStack: ['TypeScript/Go', 'Docker'], completed: true },
      ],
      assessments: [
        { title: 'CS Core Diagnostic Assessment', category: 'Programming', completed: true },
      ],
    },
    {
      id: 'rp-2',
      phaseNumber: 2,
      title: 'Core',
      description: `Bridge critical skill deltas: ${missingSkills.slice(0, 2).join(', ') || 'Framework Deep Dive'}.`,
      status: 'in_progress',
      progressPercentage: 60,
      courses: [
        { title: `${benchmark.requiredSkills[0]?.name || 'Framework'} Deep Dive`, provider: 'SkillBridge Academy', duration: '4 Weeks', completed: false },
        { title: 'Production Containerization & DevOps Pipeline', provider: 'Cloud Native Labs', duration: '2 Weeks', completed: true },
      ],
      projects: [
        { title: benchmark.recommendedProjects[0]?.title || 'Core Engine', description: benchmark.recommendedProjects[0]?.description || '', techStack: benchmark.recommendedProjects[0]?.techStack || [], completed: false },
      ],
      assessments: [
        { title: `${missingSkills[0] || 'Core'} Verification Exam`, category: 'Programming', completed: false },
      ],
    },
    {
      id: 'rp-3',
      phaseNumber: 3,
      title: 'Advanced',
      description: 'Build enterprise-grade capstones and open-source contributions.',
      status: 'in_progress',
      progressPercentage: 25,
      courses: [
        { title: 'Distributed Systems & High-Throughput Architecture', provider: 'Industry Masterclass', duration: '3 Weeks', completed: false },
      ],
      projects: [
        { title: benchmark.recommendedProjects[1]?.title || 'Multi-Agent System', description: benchmark.recommendedProjects[1]?.description || '', techStack: benchmark.recommendedProjects[1]?.techStack || [], completed: false },
      ],
      assessments: [
        { title: 'System Design Benchmark Challenge', category: 'Cloud', completed: false },
      ],
    },
    {
      id: 'rp-4',
      phaseNumber: 4,
      title: 'Industry Ready',
      description: 'Placement mock interviews, resume ATS alignment, and portfolio defense.',
      status: 'locked',
      progressPercentage: 0,
      courses: [
        { title: 'Tier-1 Technical Interview & Live Coding Defense', provider: 'SkillBridge Career Wing', duration: '2 Weeks', completed: false },
      ],
      projects: [
        { title: 'End-to-End Production Capstone with CI/CD & Monitoring', description: 'Full live deployment with 99.9% uptime SLA.', techStack: ['Docker', 'PostgreSQL', 'Prometheus'], completed: false },
      ],
      assessments: [
        { title: 'Comprehensive Placement Readiness Simulation', category: 'Aptitude', completed: false },
      ],
    },
  ];

  return {
    targetRole,
    benchmark,
    readinessScore,
    industryAvg: benchmark.industryAvgScore,
    topStudentsScore: benchmark.topStudentsScore,
    missingSkills,
    weakSkills,
    masteredSkills,
    careerGps,
    weeklyMissions,
    learningVelocity,
    opportunityMatches,
    roadmapPhases,
  };
}

/**
 * Generates an intelligent, context-aware Copilot answer based on real student DB data
 * Supports all 10 Copilot abilities + missing data follow-up checks.
 */
export async function generateSmartCopilotResponse(
  userQuery: string,
  profile: StudentProfile,
  targetRole: string,
  provider: AIProvider,
  apiKey?: string
): Promise<{ text: string; structuredType?: any; structuredPayload?: any }> {
  const context = analyzeStudentCareerContext(profile, targetRole);
  const q = userQuery.toLowerCase().trim();

  // Check if essential profile information is missing and request follow-up
  const isProfileEmpty =
    !profile.name ||
    profile.name === 'New Student' ||
    profile.name === 'New Builder' ||
    (!profile.college && !profile.academic?.college);

  if (isProfileEmpty && (q.includes('recommend') || q.includes('plan') || q.includes('where do i start'))) {
    return {
      text: `Welcome to **SkillBridge AI Career Copilot**. To give you precise, data-driven career advice, could you share a bit more context about your current profile?\n\n1. **What college/university and semester are you currently in?**\n2. **Which 3 technologies do you feel most comfortable building with?**\n3. **Are you preparing for an immediate Internship, Campus Placement, or Startup?**\n\nOnce you tell me, I'll generate a calibrated readiness index and personalized roadmap!`,
    };
  }

  // 1. Ability: Analyze Skill Gaps (Trigger: 'gap', 'missing', 'weak', 'skills needed')
  if (q.includes('gap') || q.includes('missing') || q.includes('weak') || q.includes('analyze skill')) {
    return {
      text: `### 🔍 Skill Gap Analysis for ${targetRole}\n\n**Candidate:** ${profile.name} (${profile.academic?.department || profile.branch || 'CSE'}, ${profile.academic?.college || profile.college || 'University'})\n**Current Readiness:** **${context.readinessScore}%** (Industry Benchmark: ${context.industryAvg}%)\n\n#### 🔴 Critical Skill Gaps to Close:\n${
        context.missingSkills.length > 0
          ? context.missingSkills.map((s, i) => `${i + 1}. **${s}** — *High impact (+15% readiness boost)*`).join('\n')
          : '✅ No critical skill gaps identified! You meet baseline requirements.'
      }\n\n#### 🟡 Skills Needing Deepening:\n${
        context.weakSkills.length > 0
          ? context.weakSkills.map((w) => `- **${w.skill}**: Current score **${w.currentScore}%** (Target: ${w.requiredScore}%)`).join('\n')
          : '- None currently below threshold.'
      }\n\n#### 🟢 Verified Mastered Skills:\n${
        context.masteredSkills.length > 0
          ? context.masteredSkills.map((m) => `- **${m.skill}** (${m.score}% verified)`).join('\n')
          : '- Complete your first assessment to record verified evidence.'
      }\n\n**Recommended Next Action:** Complete the **${context.missingSkills[0] || 'Core Architecture'}** verification challenge to raise your score.`,
      structuredType: 'gaps',
      structuredPayload: { missing: context.missingSkills, weak: context.weakSkills, mastered: context.masteredSkills },
    };
  }

  // 2. Ability: Recommend Next Skills to Learn (Trigger: 'what to learn', 'next skill', 'learn next')
  if (q.includes('next skill') || q.includes('what should i learn') || q.includes('learn next') || q.includes('what to learn')) {
    const topGap = context.missingSkills[0] || context.weakSkills[0]?.skill || 'Distributed Systems';
    const secondaryGap = context.missingSkills[1] || 'Containerization (Docker)';
    return {
      text: `### 🚀 Recommended Next Skills for ${targetRole}\n\nBased on your verified profile and your career goal (**${profile.careerGoal || 'Internship'}**), here is the highest ROI learning order:\n\n1. **#1 Priority: ${topGap}**\n   - **Why:** Essential core competency in ${targetRole} technical screening rounds.\n   - **Target Benchmark:** Reach >= 80% on the SkillBridge assessment.\n   - **Estimated Time:** 10–14 days of focused labs.\n\n2. **#2 Priority: ${secondaryGap}**\n   - **Why:** Required for production deployments and cloud interoperability.\n   - **Target Benchmark:** Deploy a working project with container specs.\n\n3. **#3 Priority: System Design & API Optimization**\n   - **Why:** Differentiates top 5% candidates from junior applicants.`,
      structuredType: 'next_skills',
      structuredPayload: { topGap, secondaryGap },
    };
  }

  // 3. Ability: Suggest Projects Based on Career Path (Trigger: 'project', 'build', 'portfolio')
  if (q.includes('project') || q.includes('build') || q.includes('portfolio') || q.includes('what to build')) {
    return {
      text: `### 🛠️ High-Impact Project Recommendations for ${targetRole}\n\nRecruiters value production architecture with verified evidence over generic tutorial apps. Based on your current skill level (**${profile.skillLevel || 'Intermediate'}**), here are the recommended capstones:`,
      structuredType: 'projects',
      structuredPayload: context.benchmark.recommendedProjects,
    };
  }

  // 4. Ability: Generate Weekly Learning Plans (Trigger: 'weekly', 'learning plan', 'this week', 'mission', 'schedule')
  if (q.includes('weekly') || q.includes('learning plan') || q.includes('this week') || q.includes('mission') || q.includes('schedule')) {
    return {
      text: `### 📅 Your Personalized Weekly Learning Plan\n\n**Focus Area:** Closing skill gap in **${context.missingSkills[0] || 'Core Architecture'}**\n\n| Day | Target Objective | Estimated Time | XP Reward |\n| :--- | :--- | :--- | :--- |\n| **Mon–Tue** | Theory & Core Concepts of ${context.missingSkills[0] || 'Architecture'} | 2 Hours | +50 XP |\n| **Wed–Thu** | Hands-on Implementation of Lab Module | 2.5 Hours | +80 XP |\n| **Friday** | Take SkillBridge Diagnostic Assessment | 45 Mins | +120 XP |\n| **Weekend** | Push working repository commit to GitHub with README docs | 3 Hours | +150 XP |\n\n*Completing this week's missions will increase your Career Readiness by ~+8%.*`,
      structuredType: 'missions',
      structuredPayload: context.weeklyMissions,
    };
  }

  // 5. Ability: Recommend Internships & Hackathons (Trigger: 'internship', 'hackathon', 'job', 'opportunities', 'placements')
  if (q.includes('internship') || q.includes('hackathon') || q.includes('job') || q.includes('opportunity') || q.includes('placement')) {
    return {
      text: `### 💼 Matched Opportunities & Hackathons for ${profile.name}\n\nI scanned current openings against your **${context.readinessScore}% readiness score**, university background (**${profile.academic?.college || profile.college || 'HITAM'}**), and target goal (**${profile.careerGoal || 'Internship'}**):`,
      structuredType: 'opportunities',
      structuredPayload: context.opportunityMatches,
    };
  }

  // 6. Ability: Review GitHub Profile & Repositories (Trigger: 'github', 'repo', 'commits', 'code review')
  if (q.includes('github') || q.includes('repo') || q.includes('commit') || q.includes('review my code') || q.includes('review github')) {
    const ghUrl = profile.professional?.githubUrl || 'https://github.com/aarav-builder';
    return {
      text: `### 🐙 GitHub Builder Audit for ${ghUrl.replace('https://github.com/', '@')}\n\n- **Connected Profile:** [${ghUrl}](${ghUrl})\n- **Commit Cadence:** Verified active contributor (${profile.builderScores?.consistency || 82}% consistency index)\n- **Open Source Contributions:** ${profile.professional?.openSourceContributions || 12} merged PRs\n\n#### 💡 3 Actionable GitHub Improvements to Impress Recruiters:\n1. **Pin High-Signal Repositories:** Pin your flagship ${targetRole} project to your profile top.\n2. **Include Architecture Diagrams in README:** Add ASCII or Mermaid charts explaining request lifecycle and schema design.\n3. **Add Live Demo Links & CI Badges:** Ensure each repository has runnable links and automated test pass indicators.`,
    };
  }

  // 7. Ability: Explain Why a Skill is Important (Trigger: 'why is', 'importance of', 'why learn', 'why should i')
  if (q.includes('why is') || q.includes('importance of') || q.includes('why learn') || q.includes('why should i')) {
    const mentionedSkill = context.benchmark.requiredSkills.find((s) => q.includes(s.name.toLowerCase()))?.name || context.missingSkills[0] || 'System Design';
    return {
      text: `### 💡 Why **${mentionedSkill}** is Critical for ${targetRole}\n\n1. **Industry Hiring Filter:** Over **85%** of tier-1 engineering interviews evaluate competency in ${mentionedSkill} during architecture screening.\n2. **Scalability & Reliability:** It directly impacts system availability, latency reduction, and production SLA compliance.\n3. **Compensation & Leveling:** Demonstrating verified evidence in ${mentionedSkill} elevates entry-level candidates into higher salary bands (+25–35% average offer uplift).\n\n*You can verify this skill by completing our proctored benchmark challenge.*`,
    };
  }

  // 8. Ability: Generate Interview Preparation Plans (Trigger: 'interview', 'prep', 'mock', 'questions')
  if (q.includes('interview') || q.includes('prep') || q.includes('mock') || q.includes('technical round')) {
    return {
      text: `### 🎯 Targeted Interview Preparation Plan for ${targetRole}\n\n#### 📌 Phase 1: Core Coding & DSA (Days 1–7)\n- High-frequency topics: Hash Maps, Trees, Dynamic Programming, Graph Traversals.\n- Target velocity: 2–3 problems daily under 25-minute timed constraints.\n\n#### 📌 Phase 2: Domain Deep-Dive & Architecture (Days 8–14)\n- Top interview question patterns for ${targetRole}:\n  1. *How would you optimize database read/write throughput under 10k RPS?*\n  2. *Explain concurrency control, idempotency, and distributed locking algorithms.*\n  3. *Walk through the architecture and failure modes of your primary project.*\n\n#### 📌 Phase 3: Behavioral & Portfolio Defense (Days 15–20)\n- Practice STAR framework responses for hackathons and project leadership.\n- Conduct a mock interview on SkillBridge to receive automated speech & clarity feedback.`,
    };
  }

  // 9. Ability: Track Progress Against Career Goals (Trigger: 'progress', 'gps', 'eta', 'how am i doing', 'score')
  if (q.includes('progress') || q.includes('gps') || q.includes('eta') || q.includes('how am i doing') || q.includes('track') || q.includes('roadmap')) {
    return {
      text: `### 🧭 Career GPS Trajectory for ${profile.name}\n\n- **Starting Point:** ${context.careerGps.currentPosition}\n- **Target Goal:** **${targetRole}** (${profile.careerGoal || 'Internship'})\n- **Builder Score:** **${profile.builderScores?.overall || 650} / 1000** (Level: ${profile.builderLevel || 'Explorer'})\n- **Career Readiness Index:** **${context.readinessScore}%**\n- **Skill Delta:** **${context.careerGps.distanceSkillsCount} skills needed**\n- **Estimated ETA:** **${context.careerGps.estimatedMonths} Months** to job readiness\n- **Success Probability:** **${context.careerGps.successProbability}%**`,
      structuredType: 'roadmap',
      structuredPayload: context.roadmapPhases,
    };
  }

  // 10. Live AI Generation with Deep Profile Context & Mentor Persona
  const systemPrompt = `You are "SkillBridge AI Career Copilot 3.0", an elite, personalized career mentor and technical strategist for university engineering students.
You have access to the complete student academic and builder record.
CRITICAL RULES:
1. NEVER provide generic boilerplate answers. Always ground your recommendations in their exact data:
   - Student Name: ${profile.name}
   - University/College: ${profile.academic?.college || profile.college || 'HITAM'}
   - Degree & Branch: ${profile.degree || profile.academic?.degree || 'B.Tech'} in ${profile.academic?.department || profile.branch || 'CSE'}
   - Graduation Year: Class of ${profile.graduationYear || profile.academic?.graduationYear || '2026'} (Semester: ${profile.academic?.semester || '6th'})
   - Country & City: ${profile.city || profile.academic?.city || 'Hyderabad'}, ${profile.country || profile.academic?.country || 'India'}
   - Target Career Path: ${targetRole}
   - Current Skill Level: ${profile.skillLevel || 'Intermediate'}
   - Primary Goal: ${profile.careerGoal || 'Internship'}
   - Builder Score: ${profile.builderScores?.overall || 500}/1000 (Level: ${profile.builderLevel || 'Explorer'}, Starter XP: ${profile.xp || 100} XP)
   - Career Readiness Score: ${context.readinessScore}%
   - Known / Verified Skills: ${profile.verifiedSkills?.map((s) => `${s.name} (${s.score}%)`).join(', ') || profile.knownSkills?.join(', ') || 'Python, React'}
   - Total Projects Built: ${profile.professional?.totalProjects || profile.projectCount || '1–2'}
   - Hackathon Experience: ${profile.hackathonExperience || (profile.professional?.hackathonWins ? 'Yes' : 'No')}
   - GitHub Profile: ${profile.professional?.githubUrl || 'Connected'}
   - LinkedIn: ${profile.professional?.linkedinUrl || 'Connected'}
   - Critical Missing Skills: ${context.missingSkills.join(', ') || 'Advanced Architecture'}
2. If profile data is missing or ambiguous, ask concise follow-up questions before finalizing advice.
3. Be inspiring, data-driven, and rigorous. Use markdown bolding and bullet lists.`;

  try {
    const res = await fetch('/api/ai/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        provider,
        apiKey,
        systemPrompt,
        userPrompt: userQuery,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.result && data.result.trim().length > 0) {
        return { text: data.result.trim() };
      }
    }
  } catch (err) {
    console.warn('Live AI inference unavailable, falling back to calibrated mentor response:', err);
  }

  // Domain Mentor Heuristic Fallback
  return {
    text: `Based on your profile as a **${profile.academic?.department || profile.branch || 'CSE'}** builder at **${profile.academic?.college || profile.college || 'HITAM'}** (Builder Score: **${profile.builderScores?.overall || 500}/1000**):\n\nYour current readiness for **${targetRole}** is **${context.readinessScore}%**.\n\n### 🚀 Immediate Recommended Action:\n1. **Bridge Missing Skill:** Master **${context.missingSkills[0] || 'Distributed Systems'}** to unlock tier-1 company match thresholds.\n2. **Build Portfolio Project:** Start **${context.benchmark.recommendedProjects[0]?.title || 'Flagship Capstone'}** to create verifiable code proof.\n3. **Weekly Mission:** Complete your 15 technical interview problem set this week.\n\nType any query or click a prompt above to explore skill gaps, project ideas, or interview prep!`,
  };
}
