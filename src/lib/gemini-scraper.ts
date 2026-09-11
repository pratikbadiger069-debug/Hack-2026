import { AnalysisResult, analyzeGitHubRepositories, GitHubRepoItem } from './github-analyzer';
import { cleanApiKey } from './ai-diagnostics';

export interface ScrapedGitHubData {
  username: string;
  rawBio: string;
  avatarUrl: string;
  publicRepos: number;
  followers: number;
  following: number;
  repos: GitHubRepoItem[];
  scrapedHtmlText?: string;
}

export async function scrapePublicGitHubProfile(username: string): Promise<ScrapedGitHubData> {
  const cleanUsername = username.trim();
  const headers: Record<string, string> = {
    'User-Agent': 'SkillBridge-Builder-Verification/1.0',
    Accept: 'application/vnd.github.v3+json',
  };

  let userAvatar = `https://github.com/${cleanUsername}.png`;
  let userBio = '';
  let publicReposCount = 0;
  let followersCount = 0;
  let followingCount = 0;
  let scrapedHtmlText = '';

  // 1. Fetch public profile from GitHub REST API
  try {
    const userRes = await fetch(`https://api.github.com/users/${cleanUsername}`, { headers });
    if (userRes.ok) {
      const u = await userRes.json();
      userAvatar = u.avatar_url || userAvatar;
      userBio = u.bio || '';
      publicReposCount = u.public_repos || 0;
      followersCount = u.followers || 0;
      followingCount = u.following || 0;
    }
  } catch (err) {
    console.warn('Error fetching GitHub user from REST API:', err);
  }

  // 2. Fetch public repositories
  let repos: GitHubRepoItem[] = [];
  try {
    const reposRes = await fetch(`https://api.github.com/users/${cleanUsername}/repos?sort=updated&per_page=30`, {
      headers,
    });
    if (reposRes.ok) {
      const json = await reposRes.json();
      if (Array.isArray(json)) {
        repos = json;
      }
    }
  } catch (err) {
    console.warn('Error fetching repositories from REST API:', err);
  }

  // 3. Attempt direct HTML scraping of profile page for pinned items & bio context
  try {
    const htmlRes = await fetch(`https://github.com/${cleanUsername}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    });
    if (htmlRes.ok) {
      const html = await htmlRes.text();
      // Extract visible text content snippet
      scrapedHtmlText = html
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .slice(0, 4000);
    }
  } catch (err) {
    console.warn('Direct HTML scrape fallback:', err);
  }

  return {
    username: cleanUsername,
    rawBio: userBio,
    avatarUrl: userAvatar,
    publicRepos: publicReposCount || repos.length,
    followers: followersCount,
    following: followingCount,
    repos,
    scrapedHtmlText,
  };
}

export async function analyzeWithGeminiAI(
  scraped: ScrapedGitHubData,
  apiKey?: string
): Promise<AnalysisResult> {
  const geminiKey = cleanApiKey(apiKey || process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

  // Fallback to deterministic static analyzer if no Gemini key is configured
  if (!geminiKey || geminiKey.length < 8) {
    return analyzeGitHubRepositories(scraped.repos, scraped.username);
  }

  const prompt = `You are the SkillBridge AI Skill Verification Engine.
Analyze the following public GitHub developer profile and repositories for user @${scraped.username}:

Developer Bio: "${scraped.rawBio}"
Public Repositories Count: ${scraped.publicRepos}
Scraped Page Excerpt: "${scraped.scrapedHtmlText?.slice(0, 1500) || 'None'}"

Repositories Data:
${JSON.stringify(
  scraped.repos.map((r) => ({
    name: r.name,
    description: r.description,
    language: r.language,
    stars: r.stargazers_count,
    topics: r.topics || [],
    url: r.html_url,
  })),
  null,
  2
)}

Perform a deep technical skill audit and extract verified builder competencies.
Return ONLY a valid JSON object with the exact following schema:
{
  "detectedTechnologies": ["Java", "Spring Boot", "PostgreSQL", "Docker", "React", "Next.js", "TypeScript", "Python", "PyTorch"],
  "mostUsedLanguages": [
    { "name": "TypeScript", "percentage": 45, "color": "#3178C6" },
    { "name": "Python", "percentage": 35, "color": "#3572A5" }
  ],
  "totalStars": 142,
  "totalForks": 28,
  "verifiedSkills": [
    {
      "id": "vs-gh-backend-engineering",
      "name": "Backend Engineering",
      "category": "Programming",
      "level": "Expert",
      "score": 94,
      "verificationSources": ["GitHub Repository Analysis"],
      "verifiedDate": "Today",
      "verificationCode": "GH-BAC-94821",
      "evidenceCount": 4
    }
  ],
  "topProjects": [
    {
      "title": "repo-name",
      "description": "Production repo summary",
      "githubUrl": "https://github.com/...",
      "stars": 12,
      "language": "TypeScript",
      "technologies": ["Next.js", "Docker", "PostgreSQL"]
    }
  ]
}
Note: category must be one of: "Programming", "Cloud", "AI & ML", "DevOps", "Database", "Soft Skills".
Do not wrap in markdown quotes. Return pure raw JSON.`;

  try {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${encodeURIComponent(geminiKey)}`;
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': geminiKey,
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
        generationConfig: {
          temperature: 0.2,
          responseMimeType: 'application/json',
        },
      }),
    });

    if (response.ok) {
      const data = await response.json();
      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (rawText) {
        const cleaned = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
        const parsed = JSON.parse(cleaned);

        if (parsed.detectedTechnologies && parsed.verifiedSkills && parsed.topProjects) {
          return {
            detectedTechnologies: parsed.detectedTechnologies || [],
            mostUsedLanguages: parsed.mostUsedLanguages || [],
            totalStars: parsed.totalStars || 0,
            totalForks: parsed.totalForks || 0,
            verifiedSkills: parsed.verifiedSkills || [],
            topProjects: parsed.topProjects || [],
          };
        }
      }
    }
  } catch (geminiError) {
    console.warn('Gemini extraction error, falling back to local analyzer:', geminiError);
  }

  // Fallback to local rule-based engine
  return analyzeGitHubRepositories(scraped.repos, scraped.username);
}
