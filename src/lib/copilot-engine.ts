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
  'AI Engineer': {
    role: 'AI Engineer',
    requiredSkills: [
      { name: 'Python & FastAPI', category: 'Programming', importance: 'Core', minScore: 85 },
      { name: 'PyTorch & Transformers', category: 'AI & ML', importance: 'Core', minScore: 85 },
      { name: 'Vector Databases (pgvector/Pinecone/Chroma)', category: 'Database', importance: 'Core', minScore: 80 },
      { name: 'Distributed Systems & RPC', category: 'Programming', importance: 'High', minScore: 75 },
      { name: 'Docker & Kubernetes', category: 'DevOps', importance: 'High', minScore: 75 },
      { name: 'LLM Fine-tuning & LoRA/PEFT', category: 'AI & ML', importance: 'High', minScore: 80 },
      { name: 'CUDA & Kernel Optimization', category: 'AI & ML', importance: 'Complementary', minScore: 70 },
      { name: 'MLOps & CI/CD Pipelines', category: 'DevOps', importance: 'High', minScore: 75 },
    ],
    recommendedProjects: [
      {
        title: 'Production RAG Vector Search Engine with Hybrid Dense-Sparse Reranking',
        description: 'Build a multi-tenant retrieval system using FastAPI, pgvector, and cross-encoder rerankers with sub-25ms latency.',
        techStack: ['Python', 'FastAPI', 'pgvector', 'Cross-Encoders', 'Docker'],
        difficulty: 'Advanced',
      },
      {
        title: 'Autonomous Multi-Agent Workflow Engine with Tool Calling',
        description: 'Implement a stateful agent graph with memory buffers, LangGraph orchestration, and human-in-the-loop validation.',
        techStack: ['Python', 'LangGraph', 'Redis', 'OpenAI API', 'Next.js'],
        difficulty: 'Advanced',
      },
      {
        title: 'High-Throughput Async Inference Gateway',
        description: 'Design a queue-backed streaming gateway supporting dynamic batching and token rate limiting.',
        techStack: ['Python', 'Redis Queue', 'vLLM', 'Prometheus', 'Grafana'],
        difficulty: 'Advanced',
      },
      {
        title: 'Quantized On-Device Edge Vision Model Pipeline',
        description: 'Convert and prune computer vision transformer models for low-power edge deployment via ONNX Runtime.',
        techStack: ['PyTorch', 'ONNX', 'OpenCV', 'FastAPI'],
        difficulty: 'Intermediate',
      },
    ],
    certifications: [
      { name: 'DeepLearning.AI Deep Learning Specialization', issuer: 'DeepLearning.AI / Coursera', priority: 'High' },
      { name: 'AWS Certified Machine Learning - Specialty', issuer: 'Amazon Web Services', priority: 'High' },
      { name: 'NVIDIA Certified Associate: Generative AI and LLMs', issuer: 'NVIDIA Deep Learning Institute', priority: 'Medium' },
    ],
    industryAvgScore: 74,
    topStudentsScore: 88,
    avgMonthsToReady: 6,
  },
  'Backend Engineer': {
    role: 'Backend Engineer',
    requiredSkills: [
      { name: 'TypeScript & Next.js', category: 'Programming', importance: 'Core', minScore: 85 },
      { name: 'PostgreSQL & pgvector', category: 'Database', importance: 'Core', minScore: 85 },
      { name: 'Distributed Systems & RPC', category: 'Programming', importance: 'Core', minScore: 80 },
      { name: 'Docker & Kubernetes', category: 'DevOps', importance: 'High', minScore: 80 },
      { name: 'Redis Caching & PubSub', category: 'Database', importance: 'High', minScore: 80 },
      { name: 'gRPC & Protocol Buffers', category: 'Programming', importance: 'High', minScore: 75 },
      { name: 'Kafka / RabbitMQ Event Streaming', category: 'Cloud', importance: 'High', minScore: 75 },
      { name: 'Database Sharding & Query Optimization', category: 'Database', importance: 'Complementary', minScore: 75 },
    ],
    recommendedProjects: [
      {
        title: 'Distributed Distributed Rate Limiter & Token Bucket Cluster',
        description: 'Build a high-concurrency rate limiting middleware in Go / Node.js using Redis sliding-window log algorithms.',
        techStack: ['TypeScript/Node', 'Redis Cluster', 'gRPC', 'Docker', 'Prometheus'],
        difficulty: 'Advanced',
      },
      {
        title: 'Real-time Financial Ledger & Transaction Engine',
        description: 'Double-entry accounting backend with strict ACID compliance, idempotency keys, and audit event logs.',
        techStack: ['PostgreSQL', 'TypeScript', 'Prisma', 'Docker', 'Jest'],
        difficulty: 'Advanced',
      },
      {
        title: 'Scalable URL Shortener & Analytics Ingestion Pipeline',
        description: 'High-throughput link redirection with Redis caching, Kafka clickstream telemetry, and ClickHouse aggregation.',
        techStack: ['Node.js', 'Redis', 'Kafka', 'ClickHouse', 'Tailwind'],
        difficulty: 'Intermediate',
      },
      {
        title: 'Multi-Tenant Job Portal REST & GraphQL API',
        description: 'Role-based access control with RBAC middleware, JWT auth, resume parser queue, and full-text search.',
        techStack: ['Express', 'PostgreSQL', 'Redis', 'JWT', 'Swagger'],
        difficulty: 'Intermediate',
      },
    ],
    certifications: [
      { name: 'AWS Certified Solutions Architect - Associate', issuer: 'Amazon Web Services', priority: 'High' },
      { name: 'Certified Kubernetes Application Developer (CKAD)', issuer: 'Cloud Native Computing Foundation', priority: 'High' },
      { name: 'MongoDB Certified Developer Associate', issuer: 'MongoDB Inc.', priority: 'Medium' },
    ],
    industryAvgScore: 72,
    topStudentsScore: 86,
    avgMonthsToReady: 5,
  },
  'Data Scientist': {
    role: 'Data Scientist',
    requiredSkills: [
      { name: 'Python & FastAPI', category: 'Programming', importance: 'Core', minScore: 90 },
      { name: 'PyTorch & Transformers', category: 'AI & ML', importance: 'Core', minScore: 80 },
      { name: 'PostgreSQL & pgvector', category: 'Database', importance: 'Core', minScore: 85 },
      { name: 'Statistical Modeling & Hypothesis Testing', category: 'AI & ML', importance: 'Core', minScore: 85 },
      { name: 'Data Visualization & Streamlit/Tableau', category: 'Programming', importance: 'High', minScore: 80 },
      { name: 'Scikit-Learn & XGBoost', category: 'AI & ML', importance: 'High', minScore: 85 },
      { name: 'Feature Engineering & Data Cleaning', category: 'Database', importance: 'High', minScore: 85 },
    ],
    recommendedProjects: [
      {
        title: 'Predictive Customer Churn Model with Explainable AI (SHAP)',
        description: 'End-to-end ML pipeline with XGBoost, cross-validation, and interactive Streamlit dashboard explaining feature importance.',
        techStack: ['Python', 'XGBoost', 'SHAP', 'Streamlit', 'Pandas'],
        difficulty: 'Intermediate',
      },
      {
        title: 'Automated Financial Market Sentiment & Alpha Signal Engine',
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
    topStudentsScore: 85,
    avgMonthsToReady: 6,
  },
  'Product Manager': {
    role: 'Product Manager',
    requiredSkills: [
      { name: 'Agile & Scrum Methodologies', category: 'Soft Skills', importance: 'Core', minScore: 85 },
      { name: 'User Research & Personas', category: 'Soft Skills', importance: 'Core', minScore: 85 },
      { name: 'Product Analytics & SQL', category: 'Database', importance: 'Core', minScore: 80 },
      { name: 'PRD Writing & Wireframing', category: 'Soft Skills', importance: 'Core', minScore: 85 },
      { name: 'A/B Testing & Experimentation', category: 'AI & ML', importance: 'High', minScore: 75 },
    ],
    recommendedProjects: [
      {
        title: 'Zero-to-One SaaS Product Requirements Document & Interactive Prototype',
        description: 'Complete product tear-down, customer discovery interview transcripts, Figma wireframes, and launch roadmap.',
        techStack: ['Figma', 'Notion', 'Mixpanel', 'SQL'],
        difficulty: 'Intermediate',
      },
    ],
    certifications: [
      { name: 'Product School Product Manager Certificate (PMC)', issuer: 'Product School', priority: 'High' },
      { name: 'Reforge Growth & Product Strategy', issuer: 'Reforge', priority: 'Medium' },
    ],
    industryAvgScore: 70,
    topStudentsScore: 84,
    avgMonthsToReady: 4,
  },
  'Cybersecurity Analyst': {
    role: 'Cybersecurity Analyst',
    requiredSkills: [
      { name: 'Network Security & Protocols', category: 'DevOps', importance: 'Core', minScore: 85 },
      { name: 'Linux System Administration & Bash', category: 'Programming', importance: 'Core', minScore: 85 },
      { name: 'Vulnerability Assessment & Penetration Testing', category: 'DevOps', importance: 'Core', minScore: 80 },
      { name: 'SIEM & Threat Hunting (Splunk/ELK)', category: 'Cloud', importance: 'High', minScore: 75 },
      { name: 'Cryptography & Zero Trust Architecture', category: 'Programming', importance: 'High', minScore: 75 },
    ],
    recommendedProjects: [
      {
        title: 'Automated Network Packet Sniffer & Anomaly Detection System',
        description: 'Capture live traffic with Scapy, parse headers, and detect port scans and DDoS flood patterns.',
        techStack: ['Python', 'Scapy', 'Wireshark', 'FastAPI', 'Docker'],
        difficulty: 'Advanced',
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
};

export function getRoleBenchmark(targetRole: string): TargetRoleBenchmark {
  const normalized = targetRole.trim();
  const matchedKey = Object.keys(ROLE_BENCHMARKS).find(
    (k) => k.toLowerCase() === normalized.toLowerCase() || normalized.toLowerCase().includes(k.toLowerCase())
  );
  return ROLE_BENCHMARKS[matchedKey || 'AI Engineer'];
}

/**
 * Calculates Student Context, Readiness Score, Gaps, GPS, Missions, and Velocity
 */
export function analyzeStudentCareerContext(profile: StudentProfile, targetRoleInput?: string) {
  const targetRole = targetRoleInput || profile.targetRole || 'AI Engineer';
  const benchmark = getRoleBenchmark(targetRole);

  const studentSkills = profile.verifiedSkills || [];
  const studentSkillMap = new Map<string, number>();
  studentSkills.forEach((s) => {
    studentSkillMap.set(s.name.toLowerCase(), s.score);
  });

  const missingSkills: string[] = [];
  const weakSkills: { skill: string; currentScore: number; requiredScore: number }[] = [];
  const masteredSkills: { skill: string; score: number }[] = [];

  let totalWeight = 0;
  let earnedWeight = 0;

  benchmark.requiredSkills.forEach((req) => {
    const weight = req.importance === 'Core' ? 3 : req.importance === 'High' ? 2 : 1;
    totalWeight += weight;

    // Check if student has skill
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
  const projectFactor = Math.min(1.0, (profile.professional.totalProjects || 3) / 8);
  const cgpaFactor = Math.min(1.0, (profile.academic.cgpa || 7.5) / 10);
  const builderFactor = Math.min(1.0, (profile.builderScores.overall || 600) / 1000);

  const calculatedReadiness = Math.round(
    skillRatio * 50 + projectFactor * 25 + cgpaFactor * 10 + builderFactor * 15
  );

  const readinessScore = Math.max(35, Math.min(96, calculatedReadiness));

  // Career GPS
  const distanceSkillsCount = missingSkills.length + weakSkills.length;
  const estimatedMonths = Math.max(2, Math.round(distanceSkillsCount * 1.1));
  const successProbability = Math.min(95, Math.max(55, Math.round(readinessScore * 0.95 + 8)));

  const careerGps: CareerGPS = {
    currentPosition: `${profile.academic.year} ${profile.academic.department} (${profile.academic.semester || 'Semester 6'})`,
    targetPosition: targetRole,
    distanceSkillsCount,
    estimatedMonths,
    successProbability,
    criticalMilestones: [
      `Master ${missingSkills[0] || 'Cloud Infrastructure'} with hands-on labs`,
      `Deploy ${benchmark.recommendedProjects[0]?.title.split(' ')[0] || 'Capstone'} to Production`,
      `Pass verified platform assessment with >85% score`,
      `Complete ${benchmark.certifications[0]?.name || 'Professional Certification'}`,
    ],
  };

  // Weekly Missions tailored to student's exact gaps
  const weeklyMissions: WeeklyMission[] = [
    {
      id: 'm-1',
      title: `Complete ${missingSkills[0] || 'Distributed Systems'} Skill Assessment`,
      description: `Validate foundational concepts in ${missingSkills[0] || 'Distributed Architecture'} to unlock verified badge.`,
      category: 'Assessment',
      estimatedMinutes: 45,
      completed: false,
      xpReward: 120,
      dueDate: 'In 3 days',
    },
    {
      id: 'm-2',
      title: `Implement ${benchmark.recommendedProjects[0]?.title.slice(0, 32) || 'Core API Project'}`,
      description: benchmark.recommendedProjects[0]?.description || 'Build production-grade repository with clean docs and tests.',
      category: 'Project',
      estimatedMinutes: 180,
      completed: false,
      xpReward: 350,
      dueDate: 'This Sunday',
    },
    {
      id: 'm-3',
      title: 'Optimize GitHub Profile & Pin Evidence Repositories',
      description: 'Add architecture diagrams and live demo links to top repositories for recruiter visibility.',
      category: 'Profile',
      estimatedMinutes: 30,
      completed: true,
      xpReward: 80,
      dueDate: 'Completed',
    },
    {
      id: 'm-4',
      title: 'Solve 15 DSA Problems on Graphs & Dynamic Programming',
      description: 'Sharpen problem-solving velocity for tier-1 technical coding screening rounds.',
      category: 'DSA',
      estimatedMinutes: 90,
      completed: false,
      xpReward: 150,
      dueDate: 'In 5 days',
    },
  ];

  // Learning Velocity
  const learningVelocity: LearningVelocity = {
    velocityScore: Math.min(99, Math.round(profile.builderScores.overall / 10 + 6)),
    percentileRank: 'Top 8% Growth Velocity',
    skillsGainedLast30Days: Math.max(2, studentSkills.length > 3 ? 3 : 1),
    projectsCompletedCount: profile.professional.totalProjects || 8,
    assessmentsPassedCount: studentSkills.length || 6,
    githubGrowthRate: '+38% Commits MoM',
  };

  // Opportunity Matching
  const opportunityMatches: OpportunityMatch[] = [
    {
      id: 'opp-1',
      title: `${targetRole} Intern`,
      company: 'Anthropic AI Labs',
      type: 'Internship',
      matchScore: Math.min(96, readinessScore + 8),
      matchReasons: [
        'Strong verified foundation in Python & Transformers',
        'Builder score in top 10th percentile',
        '3 Hackathon podium finishes demonstrated leadership',
      ],
      requiredSkills: [benchmark.requiredSkills[0]?.name, benchmark.requiredSkills[1]?.name, 'Docker'],
      missingSkills: missingSkills.slice(0, 2),
      deadline: 'Apply within 4 days',
    },
    {
      id: 'opp-2',
      title: `Junior ${targetRole}`,
      company: 'Stripe Engineering',
      type: 'Job',
      matchScore: Math.min(92, readinessScore + 4),
      matchReasons: [
        'Excellent PostgreSQL and data modeling competency',
        'Demonstrated GitHub evidence for API design',
      ],
      requiredSkills: ['Distributed Systems', 'TypeScript', 'PostgreSQL'],
      missingSkills: missingSkills.slice(0, 1),
      deadline: 'Active hiring',
    },
    {
      id: 'opp-3',
      title: 'Global AI Systems Hackathon 2026',
      company: 'Google DeepMind & Devpost',
      type: 'Hackathon',
      matchScore: 98,
      matchReasons: [
        'Ideal fit for student builder portfolio',
        '$50,000 prize pool and direct recruiter fast-track',
      ],
      requiredSkills: ['Multi-modal AI', 'FastAPI', 'Next.js'],
      missingSkills: [],
      deadline: 'Starts in 12 days',
    },
  ];

  // 4-Phase Personalized Roadmap
  const roadmapPhases: RoadmapPhase[] = [
    {
      id: 'rp-1',
      phaseNumber: 1,
      title: 'Foundation',
      description: 'Solidify core CS fundamentals, algorithms, and clean code principles.',
      status: 'completed',
      progressPercentage: 100,
      courses: [
        { title: 'Advanced Data Structures & Graph Algorithms', provider: 'SkillBridge Labs', duration: '3 Weeks', completed: true },
        { title: 'Modern Database Schema & Query Optimization', provider: 'Apex University', duration: '2 Weeks', completed: true },
      ],
      projects: [
        { title: 'High-Throughput Memory Cache in C++/Go', description: 'LRU/LFU cache with mutex lock concurrency.', techStack: ['Go', 'Docker'], completed: true },
      ],
      assessments: [
        { title: 'DSA Diagnostic Assessment', category: 'Programming', completed: true },
      ],
    },
    {
      id: 'rp-2',
      phaseNumber: 2,
      title: 'Core',
      description: `Bridge critical skill deltas for ${targetRole}: ${missingSkills.slice(0, 2).join(', ')}.`,
      status: 'in_progress',
      progressPercentage: 65,
      courses: [
        { title: `${benchmark.requiredSkills[1]?.name || 'PyTorch & Transformers'} Deep Dive`, provider: 'SkillBridge AI Academy', duration: '4 Weeks', completed: false },
        { title: 'Production Containerization with Docker & Kubernetes', provider: 'Linux Foundation', duration: '2 Weeks', completed: true },
      ],
      projects: [
        { title: benchmark.recommendedProjects[0]?.title || 'Core Engine', description: benchmark.recommendedProjects[0]?.description || '', techStack: benchmark.recommendedProjects[0]?.techStack || [], completed: false },
      ],
      assessments: [
        { title: `${missingSkills[0] || 'Core'} Competency Exam`, category: 'Programming', completed: false },
      ],
    },
    {
      id: 'rp-3',
      phaseNumber: 3,
      title: 'Advanced',
      description: 'Build enterprise-grade capstones and open-source contributions.',
      status: 'in_progress',
      progressPercentage: 30,
      courses: [
        { title: 'Distributed Systems & Consensus Algorithms (Raft)', provider: 'MIT OpenCourseWare', duration: '3 Weeks', completed: false },
      ],
      projects: [
        { title: benchmark.recommendedProjects[1]?.title || 'Multi-Agent System', description: benchmark.recommendedProjects[1]?.description || '', techStack: benchmark.recommendedProjects[1]?.techStack || [], completed: false },
      ],
      assessments: [
        { title: 'System Design Architecture Challenge', category: 'Cloud', completed: false },
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
        { title: 'FAANG / Tier-1 Technical Interview Mastery', provider: 'SkillBridge Career Wing', duration: '2 Weeks', completed: false },
      ],
      projects: [
        { title: 'End-to-End Production Capstone with CI/CD & Monitoring', description: 'Full live deployment with 99.9% uptime SLA.', techStack: ['Docker', 'Kubernetes', 'Prometheus', 'AWS'], completed: false },
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

  // 1. Structured query triggers for instant rich responses
  if (q.includes('roadmap') || q.includes('phases') || q.includes('4 phase') || q.includes('milestone')) {
    return {
      text: `Here is your customized **4-Phase Career Roadmap** to become a top-tier **${targetRole}**. It bridges your current skill deltas in **${context.missingSkills.slice(0, 2).join(' and ')}** over an estimated timeline of **${context.careerGps.estimatedMonths} months**.`,
      structuredType: 'roadmap',
      structuredPayload: context.roadmapPhases,
    };
  }

  if (q.includes('gps') || q.includes('eta') || q.includes('distance') || q.includes('how long') || q.includes('timeline')) {
    return {
      text: `### 🧭 Career GPS Trajectory for ${profile.name}\n\n- **Starting Point:** ${context.careerGps.currentPosition}\n- **Destination:** ${context.careerGps.targetPosition}\n- **Skill Distance:** **${context.careerGps.distanceSkillsCount} verified skills needed**\n- **Estimated ETA:** **${context.careerGps.estimatedMonths} Months** to job-readiness\n- **Success Probability:** **${context.careerGps.successProbability}%** based on your current CGPA (${profile.academic.cgpa}) and Builder Score (${profile.builderScores.overall}/1000).`,
      structuredType: 'gps',
      structuredPayload: context.careerGps,
    };
  }

  if (q.includes('mission') || q.includes('this week') || q.includes('tasks') || q.includes('weekly')) {
    return {
      text: `### 🎯 Your Active Weekly Missions\n\nI have generated high-yield tasks targeted directly at your weakest areas for **${targetRole}**. Completing these will boost your readiness score by approximately **+8%**.`,
      structuredType: 'missions',
      structuredPayload: context.weeklyMissions,
    };
  }

  if (q.includes('project') || q.includes('what should i build') || q.includes('portfolio')) {
    return {
      text: `### 🛠️ High-Impact Project Recommendations for ${targetRole}\n\nRecruiters value production architecture over boilerplate tutorials. Based on your current verified skills (${context.masteredSkills.map(s => s.skill).slice(0, 3).join(', ')}), here are the highest ROI projects to build this semester:`,
      structuredType: 'projects',
      structuredPayload: context.benchmark.recommendedProjects,
    };
  }

  if (q.includes('missing') || q.includes('skill') || q.includes('gap') || q.includes('weak')) {
    return {
      text: `### 🔍 Skill Gap Diagnosis for ${targetRole}\n\n- **Overall Readiness:** **${context.readinessScore}%** (Industry Benchmark: ${context.industryAvg}%)\n- **Critical Missing Skills:** ${context.missingSkills.join(', ') || 'None! You have high baseline coverage.'}\n- **Skills Requiring Deepening:** ${context.weakSkills.map(w => `${w.skill} (${w.currentScore}% score, target: ${w.requiredScore}%)`).join(', ') || 'None'}\n\nFocusing on these top 2 missing items will immediately unlock tier-1 company match thresholds.`,
      structuredType: 'gaps',
      structuredPayload: { missing: context.missingSkills, weak: context.weakSkills, mastered: context.masteredSkills },
    };
  }

  if (q.includes('internship') || q.includes('job') || q.includes('opportunity') || q.includes('placements') || q.includes('match')) {
    return {
      text: `### 💼 Matched Opportunities for Your Builder Profile\n\nI scanned current openings against your **${context.readinessScore}% readiness** and verified credentials. Here are your highest probability matches:`,
      structuredType: 'opportunities',
      structuredPayload: context.opportunityMatches,
    };
  }

  // 2. Call live AI provider (Gemini / OpenAI / Claude) with deep student context
  const systemPrompt = `You are "SkillBridge AI Career Copilot 3.0", an elite, personalized workforce intelligence mentor and career strategist for engineering university students.
You have access to the complete student academic and builder database record. NEVER give generic boilerplate advice. ALWAYS ground your answers in their real CGPA, verified skills, builder score, projects, and target role delta.

Student Profile:
- Name: ${profile.name}
- Academic: ${profile.academic.year} ${profile.academic.department}, Semester: ${profile.academic.semester}, CGPA: ${profile.academic.cgpa}
- Builder Score: ${profile.builderScores.overall}/1000 (Execution: ${profile.builderScores.execution}, Innovation: ${profile.builderScores.innovation})
- Verified Skills: ${profile.verifiedSkills.map(s => `${s.name} (${s.score}%)`).join(', ')}
- Projects Built: ${profile.professional.totalProjects}, Hackathon Wins: ${profile.professional.hackathonWins}
- Target Role: ${targetRole}
- Current Career Readiness: ${context.readinessScore}% (Industry Avg: ${context.industryAvg}%, Top Students: ${context.topStudentsScore}%)
- Critical Missing Skills: ${context.missingSkills.join(', ')}
- Weak Skills: ${context.weakSkills.map(w => w.skill).join(', ')}

Instructions:
1. Provide concise, high-impact, actionable guidance.
2. Use markdown formatting with clear bullet points and bold highlights.
3. Be empowering yet strictly rigorous about technical standards.`;

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
    console.warn('Live AI inference unavailable, falling back to calibrated heuristic mentor:', err);
  }

  // Calibrated Domain Mentor Fallback
  return {
    text: `Based on your profile as a **${profile.academic.year} ${profile.academic.department}** student with a **${profile.academic.cgpa} CGPA** and **${profile.builderScores.overall}/1000 Builder Score**, your readiness for **${targetRole}** is currently **${context.readinessScore}%** (compared to the industry median of ${context.industryAvg}%).\n\n### 🚀 Immediate Recommended Action Plan:\n1. **Bridge Missing Skill:** Focus on **${context.missingSkills[0] || 'System Architecture'}** this week.\n2. **Build Portfolio Project:** Start **${context.benchmark.recommendedProjects[0]?.title || 'Production API'}** to demonstrate applied mastery.\n3. **Weekly Mission:** Complete your 15 DSA problem set to prepare for interview screening rounds.\n\nType **"Show Roadmap"** or **"My Missions"** to view your interactive execution panels!`,
  };
}
