'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { useAppStore } from '@/lib/store';
import {
  Sparkles,
  ArrowUpRight,
  Search,
  Check,
  Building2,
  MapPin,
  Clock,
  Briefcase,
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
      whyItMatches: 'Your verified skills in Python, FastAPI, and PyTorch align directly with their model inference serving stack.',
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
      whyItMatches: 'Your Builder Passport highlights extensive PostgreSQL vector indexing and distributed RPC pipelines.',
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
      whyItMatches: 'Top 1% candidate match based on your recent LangChain and autonomous agent capstone repositories.',
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
      whyItMatches: 'Direct match for your published academic paper and speculative decoding benchmark models.',
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
      <div className="space-y-8 max-w-[1300px] mx-auto pb-16">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-4 border-b border-[#ECEAE4]">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#D97706]" />
              <h1 className="text-2xl font-serif font-normal text-[#1F1F1F] tracking-tight">
                Opportunities
              </h1>
            </div>
            <p className="text-sm text-[#6B6B6B] mt-0.5 font-sans">
              Handpicked roles matched to your verified skills and Builder Score.
            </p>
          </div>

          <div className="text-xs text-[#6B6B6B] font-mono">
            {filtered.length} curated matches
          </div>
        </div>

        {/* Filter bar & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#1F1F1F] text-[#FAF9F5]'
                    : 'bg-white text-[#6B6B6B] hover:text-[#1F1F1F] border border-[#ECEAE4]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 text-[#6B6B6B] absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by role, company, or skill..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-[#ECEAE4] rounded-full focus:outline-none focus:border-[#D97706] text-[#1F1F1F] placeholder:text-[#6B6B6B] transition-all"
            />
          </div>
        </div>

        {/* Opportunities Minimalist Cards */}
        <div className="space-y-4">
          {filtered.map((opp, idx) => {
            const isApplied = appliedIds[opp.id];
            return (
              <motion.div
                key={opp.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                whileHover={{ scale: 1.005 }}
                className="bg-white p-6 sm:p-7 rounded-2xl border border-[#ECEAE4] shadow-xs hover:border-[#D97706]/40 transition-all space-y-5"
              >
                {/* Main Row */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <img
                      src={opp.logo}
                      alt={opp.company}
                      className="w-12 h-12 rounded-xl object-cover border border-[#ECEAE4] shrink-0"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <h2 className="text-base font-serif text-[#1F1F1F]">{opp.title}</h2>
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-[#FAF9F5] border border-[#ECEAE4] text-[#6B6B6B]">
                          {opp.category}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-[#6B6B6B] font-sans">
                        <span className="font-medium text-[#1F1F1F]">{opp.company}</span>
                        <span>•</span>
                        <span>{opp.location}</span>
                        <span>•</span>
                        <span className="text-[#1F1F1F] font-mono">{opp.compensation}</span>
                      </div>
                    </div>
                  </div>

                  {/* Match & Apply CTA */}
                  <div className="flex items-center sm:flex-col sm:items-end justify-between sm:justify-start gap-2.5 pt-2 sm:pt-0">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#16A34A]/10 text-[#16A34A] text-xs font-mono">
                      <Sparkles className="w-3 h-3 text-[#16A34A]" />
                      <span>{opp.matchScore}% Match</span>
                    </div>

                    <button
                      onClick={() => handleApply(opp.id)}
                      disabled={isApplied}
                      className={`px-4 py-2 text-xs font-medium rounded-xl transition-all flex items-center gap-1.5 ${
                        isApplied
                          ? 'bg-[#FAF9F5] border border-[#ECEAE4] text-[#16A34A] cursor-default'
                          : 'bg-[#1F1F1F] hover:bg-black text-[#FAF9F5]'
                      }`}
                    >
                      {isApplied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#16A34A]" />
                          <span>Applied</span>
                        </>
                      ) : (
                        <>
                          <span>Apply</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Why it matches & Missing Skills Narrative */}
                <div className="p-4 bg-[#FAF9F5] rounded-xl border border-[#ECEAE4] space-y-3 text-xs">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#6B6B6B] block mb-1">
                      Why this matches you
                    </span>
                    <p className="text-xs text-[#1F1F1F] leading-relaxed">
                      {opp.whyItMatches}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 pt-1 text-xs border-t border-[#ECEAE4]">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-mono text-[#6B6B6B]">Matched:</span>
                      <div className="flex flex-wrap gap-1">
                        {opp.matchedSkills.map((s) => (
                          <span
                            key={s}
                            className="text-[11px] px-2 py-0.5 rounded bg-white border border-[#ECEAE4] text-[#1F1F1F]"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    {opp.missingSkills.length > 0 && (
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono text-[#D97706]">Missing skills:</span>
                        <div className="flex flex-wrap gap-1">
                          {opp.missingSkills.map((s) => (
                            <span
                              key={s}
                              className="text-[11px] px-2 py-0.5 rounded bg-white border border-[#D97706]/30 text-[#D97706]"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </PortalLayout>
  );
}
