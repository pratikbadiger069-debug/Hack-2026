'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { useAppStore } from '@/lib/store';
import {
  ArrowUpRight,
  Search,
  Check,
  Building2,
  MapPin,
  Briefcase,
  Sparkles,
} from 'lucide-react';

interface Opportunity {
  id: string;
  title: string;
  company: string;
  logo: string;
  category: 'Internships' | 'Jobs' | 'Hackathons' | 'Research';
  matchScore: number;
  location: string;
  type: string;
  compensation: string;
  deadline: string;
  whyItMatches: string;
  howToImprove: string;
  matchedSkills: string[];
  missingSkills: string[];
  link: string;
}

export default function StudentOpportunitiesPage() {
  const { studentProfile } = useAppStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [appliedIds, setAppliedIds] = useState<Record<string, boolean>>({});

  const opportunities: Opportunity[] = [
    {
      id: 'opp-1',
      title: 'AI Systems & LLM Platform Intern',
      company: 'Anthropic AI Labs',
      logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80',
      category: 'Internships',
      matchScore: 94,
      location: 'San Francisco, CA (Hybrid)',
      type: 'Hybrid',
      compensation: '$8,500 / mo',
      deadline: 'In 4 days',
      whyItMatches: 'Your verified scores in Python, FastAPI, and PyTorch (95% score) match their model serving and evaluation infrastructure directly.',
      howToImprove: 'Complete the Docker Multi-Stage challenge to reach 99% match calibration.',
      matchedSkills: ['Python', 'FastAPI', 'PyTorch'],
      missingSkills: ['CUDA Optimization', 'Triton'],
      link: 'https://anthropic.com/careers',
    },
    {
      id: 'opp-2',
      title: 'Distributed Backend Infrastructure Engineer',
      company: 'Stripe Engineering',
      logo: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=100&auto=format&fit=crop&q=80',
      category: 'Jobs',
      matchScore: 91,
      location: 'Seattle, WA (Remote)',
      type: 'Remote',
      compensation: '$145k – $175k / yr',
      deadline: 'Rolling 2026',
      whyItMatches: 'Your builder profile highlights extensive PostgreSQL vector indexing and distributed RPC pipelines with 92% Execution rating.',
      howToImprove: 'Add an event streaming repository (Kafka/RabbitMQ) to your builder profile.',
      matchedSkills: ['PostgreSQL', 'TypeScript', 'Next.js'],
      missingSkills: ['Kafka Event Streaming'],
      link: 'https://stripe.com/jobs',
    },
    {
      id: 'opp-3',
      title: 'Global Multi-Agent AI Hackathon',
      company: 'OpenAI & Devpost',
      logo: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=100&auto=format&fit=crop&q=80',
      category: 'Hackathons',
      matchScore: 98,
      location: 'Global Virtual',
      type: 'Remote',
      compensation: '$50,000 Prize Pool',
      deadline: 'Apr 18, 2026',
      whyItMatches: 'Top candidate match based on your 3 national hackathon wins and autonomous agent capstone repositories.',
      howToImprove: 'You meet 100% eligibility. Register your team to participate.',
      matchedSkills: ['FastAPI', 'Next.js', 'PyTorch'],
      missingSkills: [],
      link: 'https://devpost.com',
    },
    {
      id: 'opp-4',
      title: 'AI Systems Research Fellowship',
      company: 'DeepLearning.AI',
      logo: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=100&auto=format&fit=crop&q=80',
      category: 'Research',
      matchScore: 89,
      location: 'Stanford / Remote',
      type: 'Remote',
      compensation: '$12,000 Grant',
      deadline: 'May 01, 2026',
      whyItMatches: 'Direct match for your published academic paper and speculative decoding benchmark models on edge GPUs.',
      howToImprove: 'Upload benchmarks of your HNSW vector index latency to reach 96% fit.',
      matchedSkills: ['PyTorch', 'Research Papers'],
      missingSkills: ['ONNX Runtime'],
      link: 'https://deeplearning.ai',
    },
  ];

  const categories = ['All', 'Internships', 'Jobs', 'Hackathons', 'Research'];

  const filtered = opportunities.filter((opp) => {
    const matchesCat = selectedCategory === 'All' || opp.category === selectedCategory;
    const matchesSearch =
      opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.matchedSkills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const handleApply = (id: string) => {
    setAppliedIds((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <PortalLayout>
      <div className="space-y-6 max-w-[1200px] mx-auto pb-16">
        {/* Top Header */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#E6E4DD] dark:border-[#2D333B]"
        >
          <div>
            <h1 className="text-2xl font-semibold text-[#1F2328] dark:text-[#F0F6FC] tracking-tight">
              Matched Opportunities
            </h1>
            <p className="text-xs text-[#656D76] dark:text-[#8B949E] mt-0.5">
              Calibrated match scores generated from your verified skills, repositories, and assessments.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-lg border border-emerald-200 dark:border-emerald-800/50">
              Avg Calibration: 93% Fit
            </span>
          </div>
        </motion.div>

        {/* Filter bar & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-md text-xs whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#1F2328] dark:bg-[#F0F6FC] text-white dark:text-[#0F1115] font-medium'
                    : 'text-[#656D76] dark:text-[#8B949E] hover:text-[#1F2328] dark:hover:text-[#F0F6FC] hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-[#8C959F] dark:text-[#6E7681] absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by role or company..."
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-white dark:bg-[#161B22] border border-[#E6E4DD] dark:border-[#2D333B] rounded-lg focus:outline-none focus:border-blue-500 text-[#1F2328] dark:text-[#F0F6FC] placeholder:text-[#8C959F] dark:placeholder:text-[#6E7681]"
            />
          </div>
        </div>

        {/* Opportunities List */}
        <div className="space-y-3">
          {filtered.map((opp) => {
            const isApplied = appliedIds[opp.id];
            return (
              <div
                key={opp.id}
                className="p-5 bg-white dark:bg-[#161B22] rounded-xl border border-[#E6E4DD] dark:border-[#2D333B] space-y-4"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <img
                      src={opp.logo}
                      alt={opp.company}
                      className="w-10 h-10 rounded-lg object-cover border border-[#E6E4DD] dark:border-[#2D333B] shrink-0"
                    />
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h2 className="text-sm font-semibold text-[#1F2328] dark:text-[#F0F6FC]">
                          {opp.title}
                        </h2>
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#FAF9F5] dark:bg-[#0F1115] border border-[#E6E4DD] dark:border-[#2D333B] text-[#656D76] dark:text-[#8B949E]">
                          {opp.category}
                        </span>
                      </div>
                      <div className="flex items-center gap-2.5 text-xs text-[#656D76] dark:text-[#8B949E]">
                        <span className="font-medium text-[#1F2328] dark:text-[#F0F6FC]">{opp.company}</span>
                        <span>•</span>
                        <span>{opp.location}</span>
                        <span>•</span>
                        <span className="font-mono text-emerald-600 dark:text-emerald-400 font-medium">
                          {opp.compensation}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center sm:flex-col sm:items-end justify-between sm:justify-start gap-2">
                    <div className="text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                      {opp.matchScore}% Match
                    </div>

                    <button
                      onClick={() => handleApply(opp.id)}
                      disabled={isApplied}
                      className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
                        isApplied
                          ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/50 cursor-default'
                          : 'bg-[#1F2328] dark:bg-[#F0F6FC] text-white dark:text-[#0F1115] hover:bg-black dark:hover:bg-white'
                      }`}
                    >
                      {isApplied ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Applied</span>
                        </>
                      ) : (
                        <>
                          <span>1-Click Apply</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Match Details */}
                <div className="p-3.5 bg-[#FAF9F5] dark:bg-[#0F1115] rounded-lg border border-[#E6E4DD] dark:border-[#2D333B] space-y-2.5 text-xs">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#8C959F] dark:text-[#6E7681] block mb-0.5">
                      Why matched
                    </span>
                    <p className="text-xs text-[#1F2328] dark:text-[#F0F6FC] leading-relaxed">
                      {opp.whyItMatches}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-[#E6E4DD] dark:border-[#2D333B]">
                    <div>
                      <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 block mb-1">
                        Verified Skills Matched:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {opp.matchedSkills.map((s) => (
                          <span
                            key={s}
                            className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white dark:bg-[#161B22] border border-[#E6E4DD] dark:border-[#2D333B] text-[#1F2328] dark:text-[#F0F6FC]"
                          >
                            ✓ {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono text-[#656D76] dark:text-[#8B949E] block mb-0.5">
                        How to improve:
                      </span>
                      <p className="text-[11px] text-[#656D76] dark:text-[#8B949E]">
                        {opp.howToImprove}
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
