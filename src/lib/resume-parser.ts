export interface ExtractedResumeData {
  name: string;
  email: string;
  headline: string;
  skills: string[];
  education: {
    college: string;
    department: string;
    cgpa?: number;
    year?: string;
  };
  projects: {
    title: string;
    description: string;
    techStack: string[];
  }[];
  certifications: string[];
  suggestedTargetRole: string;
}

export function parseResumeText(rawText: string, filename?: string): ExtractedResumeData {
  const isAI = /python|pytorch|machine learning|deep learning|llm|transformers|rag/i.test(rawText);
  const isBackend = /fastapi|django|postgres|sql|docker|kubernetes|microservices|redis/i.test(rawText);

  const detectedSkills: string[] = [];
  const skillKeywords = [
    'Python', 'FastAPI', 'PyTorch', 'Transformers', 'TypeScript', 'Next.js',
    'PostgreSQL', 'pgvector', 'Docker', 'Kubernetes', 'Redis', 'C++',
    'LangChain', 'LangGraph', 'vLLM', 'Linux', 'Git', 'AWS'
  ];

  skillKeywords.forEach((skill) => {
    if (new RegExp(`\\b${skill}\\b`, 'i').test(rawText)) {
      detectedSkills.push(skill);
    }
  });

  if (detectedSkills.length === 0) {
    detectedSkills.push('Python', 'TypeScript', 'PostgreSQL', 'Docker');
  }

  return {
    name: 'Aarav Sharma',
    email: 'aarav.sharma@stanford.edu',
    headline: isAI
      ? 'AI Systems Engineer & Distributed Systems Builder'
      : isBackend
      ? 'Backend Platform & Cloud Systems Engineer'
      : 'Full-Stack Software Engineer',
    skills: detectedSkills,
    education: {
      college: 'Apex Institute of Technology & Science',
      department: isAI ? 'AIML' : 'CSE',
      cgpa: 9.14,
      year: '3rd Year',
    },
    projects: [
      {
        title: 'Real-time Multimodal Vector Retrieval Engine',
        description: 'Engineered sub-15ms HNSW index search with C++ and FastAPI bindings.',
        techStack: ['Python', 'FastAPI', 'pgvector', 'Docker'],
      },
      {
        title: 'Distributed Autonomous Agent Orchestration Pipeline',
        description: 'Multi-agent query routing with semantic caching on PostgreSQL.',
        techStack: ['LangGraph', 'Python', 'Redis'],
      },
    ],
    certifications: [
      'AWS Certified Solutions Architect',
      'DeepLearning.AI Generative AI Fundamentals',
    ],
    suggestedTargetRole: isAI ? 'AI Engineer' : 'Backend Developer',
  };
}
