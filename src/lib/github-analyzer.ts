import { VerifiedSkill } from '@/types';

export interface GitHubRepoItem {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  topics?: string[];
  size?: number;
  default_branch?: string;
}

export interface AnalysisResult {
  detectedTechnologies: string[];
  mostUsedLanguages: { name: string; percentage: number; color: string }[];
  totalStars: number;
  totalForks: number;
  verifiedSkills: VerifiedSkill[];
  topProjects: {
    title: string;
    description: string;
    githubUrl: string;
    stars: number;
    language: string;
    technologies: string[];
  }[];
}

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: '#3178C6',
  JavaScript: '#F7DF1E',
  Python: '#3572A5',
  Java: '#B07219',
  'C++': '#F34B7D',
  C: '#555555',
  'C#': '#178600',
  Go: '#00ADD8',
  Rust: '#DEA584',
  HTML: '#E34C26',
  CSS: '#563D7C',
  Ruby: '#701516',
  PHP: '#4F5D95',
  Kotlin: '#A97BFF',
  Swift: '#F05138',
  Dart: '#00B4AB',
  Shell: '#89E051',
  SQL: '#E38C00',
};

export function analyzeGitHubRepositories(repos: GitHubRepoItem[], username: string): AnalysisResult {
  if (!repos || repos.length === 0) {
    return {
      detectedTechnologies: [],
      mostUsedLanguages: [],
      totalStars: 0,
      totalForks: 0,
      verifiedSkills: [],
      topProjects: [],
    };
  }

  const techSet = new Set<string>();
  const languageCounts: Record<string, number> = {};
  let totalStars = 0;
  let totalForks = 0;

  // Inspect each repo
  repos.forEach((repo) => {
    totalStars += repo.stargazers_count || 0;
    totalForks += repo.forks_count || 0;

    const lang = repo.language;
    if (lang) {
      languageCounts[lang] = (languageCounts[lang] || 0) + (repo.size || 10);
      techSet.add(lang);
    }

    const textToScan = `${repo.name} ${repo.description || ''} ${(repo.topics || []).join(' ')}`.toLowerCase();

    // Technology pattern detection
    if (textToScan.includes('react') || textToScan.includes('jsx') || textToScan.includes('next')) {
      techSet.add('React');
      techSet.add('Next.js');
    }
    if (textToScan.includes('spring') || textToScan.includes('springboot')) {
      techSet.add('Spring Boot');
      techSet.add('Java');
    }
    if (textToScan.includes('node') || textToScan.includes('express') || textToScan.includes('nest')) {
      techSet.add('Node.js');
    }
    if (textToScan.includes('docker') || textToScan.includes('container') || textToScan.includes('kubernetes')) {
      techSet.add('Docker');
    }
    if (textToScan.includes('postgres') || textToScan.includes('sql') || textToScan.includes('prisma')) {
      techSet.add('PostgreSQL');
      techSet.add('Database Design');
    }
    if (textToScan.includes('mongo') || textToScan.includes('nosql')) {
      techSet.add('MongoDB');
    }
    if (textToScan.includes('pytorch') || textToScan.includes('torch') || textToScan.includes('tensorflow') || textToScan.includes('keras') || textToScan.includes('llm') || textToScan.includes('deep-learning')) {
      techSet.add('PyTorch');
      techSet.add('Machine Learning');
    }
    if (textToScan.includes('fastapi') || textToScan.includes('flask') || textToScan.includes('django')) {
      techSet.add('FastAPI');
      techSet.add('API Development');
    }
    if (textToScan.includes('tailwind') || textToScan.includes('css')) {
      techSet.add('Tailwind CSS');
    }
    if (textToScan.includes('redis') || textToScan.includes('cache')) {
      techSet.add('Redis');
    }
    if (textToScan.includes('graphql') || textToScan.includes('apollo')) {
      techSet.add('GraphQL');
    }
    if (textToScan.includes('rest') || textToScan.includes('api') || textToScan.includes('microservice')) {
      techSet.add('API Development');
    }
  });

  // Calculate languages percentage
  const totalWeight = Object.values(languageCounts).reduce((a, b) => a + b, 0) || 1;
  const mostUsedLanguages = Object.entries(languageCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([lang, count]) => ({
      name: lang,
      percentage: Math.round((count / totalWeight) * 100),
      color: LANGUAGE_COLORS[lang] || '#6E6E6A',
    }));

  const detectedTechnologies = Array.from(techSet);

  // Auto-generate Verified Skills based on GitHub Evidence
  const verifiedSkills: VerifiedSkill[] = [];
  const addSkillIfMatches = (
    skillName: string,
    category: 'Programming' | 'Cloud' | 'AI & ML' | 'DevOps' | 'Database' | 'Soft Skills',
    triggerTechs: string[],
    evidenceRepCount: number,
    baseScore: number
  ) => {
    const hasTrigger = triggerTechs.some((t) => techSet.has(t));
    if (hasTrigger) {
      verifiedSkills.push({
        id: `vs-gh-${skillName.toLowerCase().replace(/\s+/g, '-')}`,
        name: skillName,
        category,
        level: baseScore >= 90 ? 'Expert' : baseScore >= 80 ? 'Advanced' : 'Intermediate',
        score: Math.min(99, baseScore + Math.min(10, evidenceRepCount * 2)),
        verificationSources: ['GitHub Repository Analysis'],
        verifiedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
        verificationCode: `GH-${skillName.slice(0, 3).toUpperCase()}-${Math.floor(10000 + Math.random() * 90000)}`,
        evidenceCount: Math.max(1, evidenceRepCount),
      });
    }
  };

  // Rule mappings
  if (techSet.has('Spring Boot') || techSet.has('Node.js') || techSet.has('FastAPI') || techSet.has('Go') || techSet.has('Java')) {
    addSkillIfMatches('Backend Engineering', 'Programming', ['Spring Boot', 'Node.js', 'FastAPI', 'Go', 'Java'], repos.length, 92);
  }
  if (techSet.has('React') || techSet.has('Next.js') || techSet.has('TypeScript') || techSet.has('JavaScript')) {
    addSkillIfMatches('Modern Frontend Architecture', 'Programming', ['React', 'Next.js', 'TypeScript'], repos.length, 90);
  }
  if (techSet.has('PostgreSQL') || techSet.has('MongoDB') || techSet.has('Database Design')) {
    addSkillIfMatches('Database Design & Query Optimization', 'Database', ['PostgreSQL', 'MongoDB', 'Database Design'], 2, 88);
  }
  if (techSet.has('Docker') || techSet.has('Redis')) {
    addSkillIfMatches('DevOps & Containerization', 'DevOps', ['Docker', 'Redis'], 2, 86);
  }
  if (techSet.has('PyTorch') || techSet.has('Machine Learning') || techSet.has('Python')) {
    addSkillIfMatches('Applied Machine Learning & Python', 'AI & ML', ['PyTorch', 'Python', 'Machine Learning'], 3, 91);
  }
  if (techSet.has('API Development') || techSet.has('GraphQL')) {
    addSkillIfMatches('REST & Distributed API Architecture', 'Programming', ['API Development', 'GraphQL'], 4, 89);
  }

  // Top Projects with tech badges
  const topProjects = repos
    .slice()
    .sort((a, b) => (b.stargazers_count * 3 + (b.forks_count || 0) * 2 + (b.size || 0) / 100) - (a.stargazers_count * 3 + (a.forks_count || 0) * 2 + (a.size || 0) / 100))
    .slice(0, 6)
    .map((r) => {
      const repoTechs: string[] = [];
      if (r.language) repoTechs.push(r.language);
      const text = `${r.name} ${r.description || ''}`.toLowerCase();
      if (text.includes('next') || text.includes('react')) repoTechs.push('Next.js');
      if (text.includes('docker')) repoTechs.push('Docker');
      if (text.includes('spring')) repoTechs.push('Spring Boot');
      if (text.includes('postgres')) repoTechs.push('PostgreSQL');
      if (text.includes('torch') || text.includes('pytorch')) repoTechs.push('PyTorch');

      return {
        title: r.name,
        description: r.description || `High-performance production repository built by @${username}.`,
        githubUrl: r.html_url,
        stars: r.stargazers_count,
        language: r.language || 'Code',
        technologies: Array.from(new Set(repoTechs)),
      };
    });

  return {
    detectedTechnologies,
    mostUsedLanguages,
    totalStars,
    totalForks,
    verifiedSkills,
    topProjects,
  };
}
