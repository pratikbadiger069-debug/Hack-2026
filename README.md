# 🚀 SkillBridge — The Builder Operating System

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fpratikbadiger069-debug%2FHack-2026&project-name=skillbridge-ai&repository-name=skillbridge-ai)

SkillBridge is an enterprise-grade Student → Industry Intelligence Platform and Skill Verification Engine. It transforms academic potential into verified developer proof of work through deterministic scoring, anti-cheat challenge engines, and real-time GitHub codebase scraping with Gemini 1.5 Flash AI extraction.

---

## ⚡ 1-Click Vercel Deployment

You can deploy SkillBridge instantly to **Vercel** with zero configuration required:

1. Click the **[Deploy with Vercel](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fpratikbadiger069-debug%2FHack-2026&project-name=skillbridge-ai&repository-name=skillbridge-ai)** button above, or import `https://github.com/pratikbadiger069-debug/Hack-2026.git` directly in your [Vercel Dashboard](https://vercel.com/new).
2. Configure your Environment Variables in Vercel Project Settings:

| Variable | Description | Default / Example |
|---|---|---|
| `AUTH_SECRET` | Secret key for JWT session signing | `skillbridge-production-secret-token-2026` |
| `NEXTAUTH_URL` | Public canonical URL | `https://your-project.vercel.app` |
| `GEMINI_API_KEY` | Google Gemini API Key for AI Scraper | `AIzaSy...` (Optional, BYOK supported) |
| `GOOGLE_CLIENT_ID` | Google OAuth Client ID | `your-google-client-id` (Optional) |
| `GOOGLE_CLIENT_SECRET` | Google OAuth Secret | `your-google-client-secret` (Optional) |
| `GITHUB_CLIENT_ID` | GitHub OAuth App Client ID | `your-github-client-id` (Optional) |
| `GITHUB_CLIENT_SECRET` | GitHub OAuth App Secret | `your-github-client-secret` (Optional) |
| `DATABASE_URL` | PostgreSQL Connection String | `postgresql://user:pass@localhost:5432/sb` (Optional) |

3. Click **Deploy** — Vercel will build and launch all 74 static and serverless routes automatically.

---

## 🛠️ Dynamic Post-Deployment Editability

SkillBridge is designed to be **100% interactive and editable even after deployment in production**:

- **Profile & Bio Customization:** Update full name, target engineering roles, college, department, CGPA, and personal statement live from `/student/settings` and `/student/profile`.
- **Live GitHub Codebase Re-Sync:** Enter any public GitHub handle or click **Sync GitHub** to trigger live profile scraping, commit density calculation, and Gemini skill inference.
- **Proof of Work Submission:** Add, edit, or remove project repositories, live URLs, hackathon wins, and research papers from `/student/journey`.
- **Bring Your Own Key (BYOK) AI Copilot:** Test and switch between Google Gemini, Anthropic Claude, and OpenAI keys with real-time latency diagnostics directly in the live app.
- **Assessments & Challenges:** Solve interactive coding challenges and MCQs with active anti-cheat detection to dynamically earn XP and unlock badges in real time.
- **Cross-Session Persistence:** Local profile state, verified credentials, and settings are preserved via robust hybrid client-server storage.

---

## 🏃 Local Development

```bash
# Clone the repository
git clone https://github.com/pratikbadiger069-debug/Hack-2026.git
cd Hack-2026

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
