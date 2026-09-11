'use client';

import React, { useState } from 'react';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { useAppStore } from '@/lib/store';
import {
  Compass,
  Briefcase,
  Trophy,
  Award,
  ExternalLink,
  Calendar,
  Users,
  DollarSign,
  ArrowUpRight,
  Filter,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Zap,
  Clock,
  Search,
  Check,
  Building,
  GraduationCap,
  Code,
} from 'lucide-react';

interface FullOpportunity {
  id: string;
  title: string;
  organization: string;
  logo: string;
  category: 'Internships' | 'Jobs' | 'Hackathons' | 'Scholarships' | 'Challenges' | 'Research Programs';
  matchScore: number;
  location: string;
  type: 'Remote' | 'Hybrid' | 'On-site';
  stipendOrPrize: string;
  deadline: string;
  skillsRequired: string[];
  matchedSkills: string[];
  missingSkills: string[];
  recommendedImprovement: string;
  description: string;
  link: string;
  applied?: boolean;
}

export default function StudentOpportunitiesPage() {
  const { studentProfile } = useAppStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [appliedIds, setAppliedIds] = useState<Record<string, boolean>>({});

  const opportunitiesList: FullOpportunity[] = [
    {
      id: 'opp-1',
      title: 'AI Systems & LLM Platform Intern',
      organization: 'Anthropic AI Labs',
      logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80',
      category: 'Internships',
      matchScore: 94,
      location: 'San Francisco, CA (Hybrid)',
      type: 'Hybrid',
      stipendOrPrize: '$8,500 / month',
      deadline: 'In 4 days',
      skillsRequired: ['Python & FastAPI', 'PyTorch & Transformers', 'Docker & Kubernetes'],
      matchedSkills: ['Python & FastAPI', 'PyTorch & Transformers'],
      missingSkills: ['CUDA Optimization'],
      recommendedImprovement: 'Complete 1 CUDA/GPU memory optimization project to reach 99% match score.',
      description: 'Work alongside research scientists building scalable model serving infrastructure and automated evaluation pipelines.',
      link: 'https://anthropic.com/careers',
    },
    {
      id: 'opp-2',
      title: 'Distributed Backend Infrastructure Engineer',
      organization: 'Stripe Engineering',
      logo: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=100&auto=format&fit=crop&q=80',
      category: 'Jobs',
      matchScore: 91,
      location: 'Seattle, WA (Remote Eligible)',
      type: 'Remote',
      stipendOrPrize: '$145,000 - $175,000 / yr',
      deadline: 'Rolling 2026',
      skillsRequired: ['PostgreSQL & pgvector', 'TypeScript & Next.js', 'Distributed Systems & RPC'],
      matchedSkills: ['PostgreSQL & pgvector', 'TypeScript & Next.js'],
      missingSkills: ['Kafka Event Streaming'],
      recommendedImprovement: 'Add a Kafka-backed event queue project to your Builder Passport.',
      description: 'Design and operate high-availability transactional ledgers and developer APIs with 99.999% uptime guarantees.',
      link: 'https://stripe.com/jobs',
    },
    {
      id: 'opp-3',
      title: 'Global Multi-Agent AI Systems Hackathon 2026',
      organization: 'OpenAI & Devpost',
      logo: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=100&auto=format&fit=crop&q=80',
      category: 'Hackathons',
      matchScore: 98,
      location: 'Global Virtual',
      type: 'Remote',
      stipendOrPrize: '$50,000 Prize Pool',
      deadline: 'Apr 18, 2026',
      skillsRequired: ['FastAPI', 'Multi-Agent Frameworks', 'Next.js'],
      matchedSkills: ['FastAPI', 'Next.js', 'PyTorch & Transformers'],
      missingSkills: [],
      recommendedImprovement: 'Your builder profile is in top 1% fit. Form a 3-person squad to maximize prize winning chances.',
      description: 'Compete against university builders globally to architect enterprise multi-agent workflows with tool calling.',
      link: 'https://devpost.com',
    },
    {
      id: 'opp-4',
      title: 'Undergraduate AI & Systems Research Fellowship',
      organization: 'DeepLearning.AI & Stanford',
      logo: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=100&auto=format&fit=crop&q=80',
      category: 'Research Programs',
      matchScore: 89,
      location: 'Stanford, CA / Remote',
      type: 'Remote',
      stipendOrPrize: '$12,000 Fellowship Grant',
      deadline: 'May 01, 2026',
      skillsRequired: ['PyTorch', 'Model Quantization', 'Academic Writing'],
      matchedSkills: ['PyTorch', 'Research Papers (1 Published)'],
      missingSkills: ['ONNX Runtime Edge Deployment'],
      recommendedImprovement: 'Publish your HNSW vector retrieval experiment benchmarks.',
      description: 'Fully funded 3-month faculty-guided research fellowship investigating speculative decoding on low-power edge GPUs.',
      link: 'https://deeplearning.ai',
    },
    {
      id: 'opp-5',
      title: 'NextGen Engineering Diversity & Excellence Scholarship',
      organization: 'Google Cloud Foundation',
      logo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=100&auto=format&fit=crop&q=80',
      category: 'Scholarships',
      matchScore: 92,
      location: 'Pan-University',
      type: 'Remote',
      stipendOrPrize: '$10,000 Merit Award + Mentorship',
      deadline: 'May 15, 2026',
      skillsRequired: ['CGPA > 8.5', 'Verified Builder Score > 800', 'Faculty Recommendation'],
      matchedSkills: ['CGPA 9.14', 'Builder Score 885', 'Faculty Validated'],
      missingSkills: [],
      recommendedImprovement: 'You satisfy all eligibility criteria! Complete your statement of intent before deadline.',
      description: 'Prestigious merit scholarship providing tuition grants, dedicated Google engineering mentors, and placement fast-tracking.',
      link: 'https://buildyourfuture.withgoogle.com',
    },
    {
      id: 'opp-6',
      title: 'Distributed Token Bucket Rate Limiter RFP Challenge',
      organization: 'Cloudflare Engineering',
      logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&auto=format&fit=crop&q=80',
      category: 'Challenges',
      matchScore: 88,
      location: 'Async Online',
      type: 'Remote',
      stipendOrPrize: '$5,000 Bounty + Interview Fast-Track',
      deadline: 'Rolling 2026',
      skillsRequired: ['Distributed Systems', 'Redis Sliding Log', 'gRPC'],
      matchedSkills: ['Distributed Systems & RPC', 'TypeScript'],
      missingSkills: ['Redis Cluster Sharding'],
      recommendedImprovement: 'Implement sliding window log algorithm with tests to qualify for immediate review.',
      description: 'Solve a real-world edge traffic challenge: design a distributed rate limiter resilient to network partitions.',
      link: 'https://cloudflare.com/careers',
    },
  ];

  const categories = ['All', 'Internships', 'Jobs', 'Hackathons', 'Scholarships', 'Challenges', 'Research Programs'];

  const filtered = opportunitiesList.filter((opp) => {
    const matchesCat = selectedCategory === 'All' || opp.category === selectedCategory;
    const matchesSearch =
      opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.skillsRequired.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const handleApply = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    setAppliedIds((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <PortalLayout>
      <div className="space-y-6">
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100 flex items-center gap-1">
                <Compass className="w-3.5 h-3.5" />
                Workforce Intel &amp; Matching Engine
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-500">6 High-Probability Matches</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Opportunities &amp; Placements</h1>
            <p className="text-xs text-slate-500 mt-1">
              Curated internships, placements, hackathons, bounties, and research grants matched directly to your verified Builder Score.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <div>
                <strong>Top Match Quality:</strong> 94% Avg Fit with Verified Skills
              </div>
            </div>
          </div>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full sm:w-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white shadow-2xs'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by role, company, or skill..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-600 text-slate-900"
            />
          </div>
        </div>

        {/* Opportunities List */}
        <div className="space-y-4">
          {filtered.map((opp) => {
            const isApplied = appliedIds[opp.id];
            return (
              <div
                key={opp.id}
                className="saas-card p-6 border border-slate-200 hover:border-indigo-300 transition-all space-y-4"
              >
                {/* Main Row */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="flex items-start gap-4">
                    <img
                      src={opp.logo}
                      alt={opp.organization}
                      className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0 shadow-2xs"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200 uppercase">
                          {opp.category}
                        </span>
                        <h2 className="text-base font-bold text-slate-900">{opp.title}</h2>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-slate-600 font-medium">
                        <span className="font-semibold text-slate-900">{opp.organization}</span>
                        <span>•</span>
                        <span>{opp.location}</span>
                        <span>•</span>
                        <span className="text-emerald-700 font-semibold">{opp.stipendOrPrize}</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed max-w-2xl pt-1">
                        {opp.description}
                      </p>
                    </div>
                  </div>

                  {/* Match Pill & CTA Button */}
                  <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between gap-3 shrink-0 border-t lg:border-t-0 pt-3 lg:pt-0 border-slate-100">
                    <div className="text-left lg:text-right">
                      <span className="text-xs font-bold text-emerald-800 bg-emerald-100 border border-emerald-200 px-2.5 py-1 rounded-full inline-flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                        {opp.matchScore}% Match Score
                      </span>
                      <span className="text-[10px] text-slate-400 block mt-1">
                        Deadline: {opp.deadline}
                      </span>
                    </div>

                    <button
                      onClick={(e) => handleApply(opp.id, e)}
                      disabled={isApplied}
                      className={`px-5 py-2 text-xs font-semibold rounded-lg transition-all shadow-2xs flex items-center gap-1.5 ${
                        isApplied
                          ? 'bg-emerald-600 text-white cursor-default'
                          : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                      }`}
                    >
                      {isApplied ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Application Sent!</span>
                        </>
                      ) : (
                        <>
                          <span>Apply with 1-Click Passport</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* "Why This Matches You" Breakdown */}
                <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-100 space-y-2 text-xs">
                  <div className="flex items-center justify-between font-bold text-slate-800">
                    <span className="flex items-center gap-1 text-[11px] uppercase tracking-wider text-slate-500">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                      Why This Matches You:
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
                    {/* Matched Skills */}
                    <div>
                      <span className="text-[10px] font-bold text-emerald-700 uppercase block mb-1">
                        ✓ Verified Matched Skills ({opp.matchedSkills.length})
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {opp.matchedSkills.map((s, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] font-medium px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Missing Skills */}
                    <div>
                      <span className="text-[10px] font-bold text-amber-700 uppercase block mb-1">
                        ⚡ Skill Deltas ({opp.missingSkills.length})
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {opp.missingSkills.length > 0 ? (
                          opp.missingSkills.map((s, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] font-medium px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200"
                            >
                              {s}
                            </span>
                          ))
                        ) : (
                          <span className="text-[10px] text-emerald-600 font-semibold">100% Skill Coverage!</span>
                        )}
                      </div>
                    </div>

                    {/* Recommended Improvement */}
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                        💡 Fast-Track Recommendation
                      </span>
                      <p className="text-[11px] text-slate-600 leading-snug">
                        {opp.recommendedImprovement}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </PortalLayout>
  );
}
