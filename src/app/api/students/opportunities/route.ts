import { NextRequest, NextResponse } from 'next/server';

const ALL_OPPORTUNITIES = [
  {
    id: 'opp-1',
    title: 'AI Infrastructure Engineer Intern',
    organization: 'Anthropic Labs Partner Network',
    category: 'INTERNSHIP',
    stipendOrPrize: '$7,500 / month',
    deadline: 'Rolling 2026',
    location: 'San Francisco, CA (Hybrid)',
    description: 'Help architect low-latency inference pipelines and multi-tenant vector indexes.',
    linkUrl: 'https://anthropic.com',
  },
  {
    id: 'opp-2',
    title: 'Global Autonomous Agents Hackathon',
    organization: 'OpenAI & LangChain Foundation',
    category: 'HACKATHON',
    stipendOrPrize: '$50,000 Prize Pool',
    deadline: 'Apr 15, 2026',
    location: 'Online / Global',
    description: 'Build enterprise-grade multi-agent autonomous decision workflows using LangGraph.',
    linkUrl: 'https://devpost.com',
  },
  {
    id: 'opp-3',
    title: 'Undergraduate AI & Systems Research Fellowship',
    organization: 'Stanford & DeepLearning.AI',
    category: 'RESEARCH',
    stipendOrPrize: '$12,000 Grant',
    deadline: 'May 01, 2026',
    location: 'Hybrid Fellowship',
    description: 'Funded 3-month research residency focusing on on-device LLM quantization.',
    linkUrl: 'https://arxiv.org',
  },
  {
    id: 'opp-4',
    title: 'vLLM Kernel Optimization Challenge',
    organization: 'Linux Foundation CNCF',
    category: 'CHALLENGE',
    stipendOrPrize: '$4,000 per merged RFC',
    deadline: 'Rolling 2026',
    location: 'Remote',
    description: 'Implement optimized CUDA memory kernels for speculative decoding.',
    linkUrl: 'https://github.com',
  },
  {
    id: 'opp-5',
    title: 'Next-Gen FinTech Startup Founder Incubator',
    organization: 'Y Combinator Partner Cohort',
    category: 'STARTUP',
    stipendOrPrize: '$100,000 Pre-Seed',
    deadline: 'Jun 30, 2026',
    location: 'San Francisco / Remote',
    description: 'Fast-track collegiate technical founders building scalable AI platforms.',
    linkUrl: 'https://ycombinator.com',
  },
  {
    id: 'opp-6',
    title: 'National Collegiate Engineering Merit Scholarship',
    organization: 'Tech Leaders Academic Trust',
    category: 'SCHOLARSHIP',
    stipendOrPrize: '$5,000 Tuition Grant',
    deadline: 'Jul 15, 2026',
    location: 'National',
    description: 'Merit-based financial aid for top 5th percentile Builder Score students.',
    linkUrl: 'https://scholarships.org',
  },
];

export async function GET(req: NextRequest) {
  const category = req.nextUrl.searchParams.get('category');
  let filtered = ALL_OPPORTUNITIES;
  if (category && category !== 'ALL') {
    filtered = ALL_OPPORTUNITIES.filter((o) => o.category === category.toUpperCase());
  }

  return NextResponse.json({
    success: true,
    total: filtered.length,
    opportunities: filtered,
  });
}
