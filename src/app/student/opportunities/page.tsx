'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { useAppStore } from '@/lib/store';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  ArrowUpRight,
  Search,
  Check,
  Building2,
  MapPin,
  Clock,
  Briefcase,
  Zap,
  ShieldCheck,
  TrendingUp,
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
      whyItMatches: 'Your verified skills in Python, FastAPI, and PyTorch (95% score) match their model serving and evaluation infrastructure directly.',
      howToImprove: 'Complete the Docker Multi-Stage quest to reach 99% match calibration.',
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
      whyItMatches: 'Your Builder Passport highlights extensive PostgreSQL vector indexing and distributed RPC pipelines with 92% Execution rating.',
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
      whyItMatches: 'Top 1% candidate match based on your 3 national hackathon wins and autonomous agent capstone repositories.',
      howToImprove: 'You meet 100% eligibility! Form a team to maximize top prize chances.',
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
      whyItMatches: 'Direct match for your published academic paper and speculative decoding benchmark models on low-power edge GPUs.',
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
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 },
    });
  };

  return (
    <PortalLayout>
      <div className="space-y-8 max-w-[1300px] mx-auto pb-20">
        {/* Header HUD */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-zinc-200 dark:border-zinc-800"
        >
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Workforce Intelligence Engine
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-heading font-black tracking-tight text-zinc-900 dark:text-white mt-1">
              Curated Opportunities
            </h1>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-sans">
              Algorithmic match scores computed from your verified GitHub repositories, Builder Score, and skill assessments.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/80 px-3 py-1.5 rounded-xl border border-emerald-200 dark:border-emerald-800">
              Average Fit: 93% Verified Match
            </span>
          </div>
        </motion.section>

        {/* Filter bar & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-heading font-bold transition-all lift-hover ${
                  selectedCategory === cat
                    ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-xs'
                    : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 border border-zinc-200 dark:border-zinc-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by role, company, or tech stack..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full focus:outline-none focus:border-blue-600 text-zinc-900 dark:text-white placeholder:text-zinc-400 transition-all shadow-2xs"
            />
          </div>
        </div>

        {/* Opportunities List */}
        <div className="space-y-4">
          {filtered.map((opp, idx) => {
            const isApplied = appliedIds[opp.id];
            return (
              <motion.div
                key={opp.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: idx * 0.05 }}
                whileHover={{ scale: 1.005 }}
                className="builder-card p-6 sm:p-7 space-y-5"
              >
                {/* Main Row */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <img
                      src={opp.logo}
                      alt={opp.company}
                      className="w-12 h-12 rounded-2xl object-cover border border-zinc-200 dark:border-zinc-800 shrink-0 shadow-xs"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <h2 className="text-base font-heading font-extrabold text-zinc-900 dark:text-white">
                          {opp.title}
                        </h2>
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold">
                          {opp.category}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-zinc-500 font-sans">
                        <span className="font-bold text-zinc-900 dark:text-white">{opp.company}</span>
                        <span>•</span>
                        <span>{opp.location}</span>
                        <span>•</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">
                          {opp.compensation}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Match & Apply CTA */}
                  <div className="flex items-center sm:flex-col sm:items-end justify-between sm:justify-start gap-2.5 pt-2 sm:pt-0">
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 text-xs font-mono font-bold">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{opp.matchScore}% Match</span>
                    </div>

                    <button
                      onClick={() => handleApply(opp.id)}
                      disabled={isApplied}
                      className={`px-5 py-2 text-xs font-heading font-bold rounded-xl transition-all shadow-xs flex items-center gap-1.5 lift-hover ${
                        isApplied
                          ? 'bg-emerald-600 text-white cursor-default'
                          : 'bg-blue-600 hover:bg-blue-700 text-white'
                      }`}
                    >
                      {isApplied ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Applied with Passport</span>
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

                {/* Match Narrative & How to Improve */}
                <div className="p-4 bg-zinc-50 dark:bg-zinc-900/60 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 space-y-3 text-xs">
                  <div>
                    <span className="text-[10px] font-mono uppercase font-bold text-zinc-400 block mb-1">
                      Why you match this role
                    </span>
                    <p className="text-xs text-zinc-800 dark:text-zinc-200 leading-relaxed">
                      {opp.whyItMatches}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-zinc-200 dark:border-zinc-800">
                    <div>
                      <span className="text-[10px] font-mono uppercase font-bold text-emerald-600 dark:text-emerald-400 block mb-1">
                        Verified Skills Matched:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {opp.matchedSkills.map((s) => (
                          <span
                            key={s}
                            className="text-[11px] font-mono px-2 py-0.5 rounded bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white"
                          >
                            ✓ {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono uppercase font-bold text-orange-600 dark:text-orange-400 block mb-1">
                        How to reach 99% calibration:
                      </span>
                      <p className="text-[11px] text-zinc-600 dark:text-zinc-400 leading-snug">
                        {opp.howToImprove}
                      </p>
                    </div>
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
