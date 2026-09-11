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
  ShieldCheck,
  Target,
  ArrowRight,
} from 'lucide-react';

interface Opportunity {
  id: string;
  title: string;
  company: string;
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
      title: 'Distributed Backend Infrastructure Intern',
      company: 'Razorpay Systems',
      category: 'Internships',
      matchScore: 94,
      location: 'Bengaluru, India (Hybrid)',
      type: 'Hybrid',
      compensation: '₹65,000 / mo',
      deadline: 'In 5 days',
      whyItMatches: 'Your verified score in Java, SQL, and Docker containerization directly matches their high-concurrency payment gateway routing squad.',
      howToImprove: 'Complete the Distributed Rate Limiter challenge to reach 99% match calibration.',
      matchedSkills: ['Java', 'SQL', 'Docker'],
      missingSkills: ['Redis Clustered Streams'],
      link: 'https://razorpay.com/jobs',
    },
    {
      id: 'opp-2',
      title: 'Systems & Cloud Platform Engineer',
      company: 'Postman Platform',
      category: 'Jobs',
      matchScore: 91,
      location: 'Remote / Bengaluru',
      type: 'Remote',
      compensation: '₹22 - ₹28 LPA',
      deadline: 'Rolling 2026',
      whyItMatches: 'Your builder profile demonstrates 4 backend GitHub repositories and verified REST API contract design.',
      howToImprove: 'Earn the Advanced Cloud & Kubernetes badge on SkillBridge.',
      matchedSkills: ['REST APIs', 'Docker', 'Git'],
      missingSkills: ['Kubernetes Operators'],
      link: 'https://postman.com/careers',
    },
    {
      id: 'opp-3',
      title: 'National High-Concurrency Algorithmic Hackathon',
      company: 'Devpost & AWS',
      category: 'Hackathons',
      matchScore: 98,
      location: 'Virtual',
      type: 'Remote',
      compensation: '₹10,00,000 Prize Pool',
      deadline: 'Apr 20, 2026',
      whyItMatches: 'Top builder match based on your algorithmic consistency streak and Level 18 Builder rank.',
      howToImprove: 'Form a verified team of builders from your university roster.',
      matchedSkills: ['Algorithms', 'Java', 'Problem Solving'],
      missingSkills: [],
      link: 'https://devpost.com',
    },
    {
      id: 'opp-4',
      title: 'AI Systems Performance Fellowship',
      company: 'DeepMind Research Fellowships',
      category: 'Research',
      matchScore: 88,
      location: 'London / Remote',
      type: 'Remote',
      compensation: '£4,500 / mo Grant',
      deadline: 'May 10, 2026',
      whyItMatches: 'Direct match for your verified research benchmarks and high-throughput vector index implementation.',
      howToImprove: 'Add benchmark telemetry graphs to your GitHub proof of work.',
      matchedSkills: ['PyTorch', 'Python', 'Algorithms'],
      missingSkills: ['Triton Kernels'],
      link: 'https://deepmind.google',
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

  const handleApply = (id: string, link: string) => {
    setAppliedIds((prev) => ({ ...prev, [id]: true }));
    window.open(link, '_blank');
  };

  return (
    <PortalLayout>
      <div className="space-y-8 max-w-[1100px] mx-auto pb-16">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="pb-5 border-b border-[#E8E5DD] flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C76A2A] mb-1 block">
              Verified Talent Pipeline
            </span>
            <h1 className="text-3xl font-bold text-[#1B1B1B] tracking-tight">
              Verified Opportunities
            </h1>
            <p className="text-xs text-[#6F6A60] mt-0.5">
              Matched strictly using your verified skills, projects, GitHub code, and Builder Score.
            </p>
          </div>
        </motion.div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#1B1B1B] text-white shadow-xs'
                    : 'bg-white text-[#6F6A60] hover:text-[#1B1B1B] border border-[#E8E5DD]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#6F6A60]" />
            <input
              type="text"
              placeholder="Search companies, skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-[#E8E5DD] rounded-xl focus:outline-none focus:border-[#C76A2A] text-[#1B1B1B]"
            />
          </div>
        </div>

        {/* Opportunities List */}
        <div className="space-y-4">
          {filtered.map((opp) => {
            const isApplied = appliedIds[opp.id];

            return (
              <motion.div
                key={opp.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="p-6 rounded-2xl bg-white border border-[#E8E5DD] shadow-xs space-y-4 hover:border-[#C76A2A] transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base font-bold text-[#1B1B1B]">{opp.title}</h3>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#2F7A45]/10 text-[#2F7A45] text-xs font-bold font-mono">
                        {opp.matchScore}% Match
                      </span>
                    </div>
                    <p className="text-xs text-[#6F6A60] mt-0.5 flex items-center gap-3">
                      <span className="font-semibold text-[#1B1B1B]">{opp.company}</span>
                      <span>•</span>
                      <span>{opp.location}</span>
                      <span>•</span>
                      <span className="font-mono font-medium text-[#C76A2A]">{opp.compensation}</span>
                    </p>
                  </div>

                  <button
                    onClick={() => handleApply(opp.id, opp.link)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors shrink-0 flex items-center gap-1.5 ${
                      isApplied
                        ? 'bg-[#2F7A45] text-white'
                        : 'bg-[#1B1B1B] text-white hover:bg-[#C76A2A]'
                    }`}
                  >
                    {isApplied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Profile Submitted</span>
                      </>
                    ) : (
                      <>
                        <span>Apply with Builder Passport</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>

                {/* Match Reason & Improvement Tips */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs">
                  <div className="p-3.5 rounded-xl bg-[#F6F4EE] border border-[#E8E5DD] space-y-1">
                    <strong className="text-[#1B1B1B] block">Why You Match:</strong>
                    <p className="text-[#6F6A60]">{opp.whyItMatches}</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#F6F4EE] border border-[#E8E5DD] space-y-1">
                    <strong className="text-[#1B1B1B] block">How to Improve Fit:</strong>
                    <p className="text-[#6F6A60]">{opp.howToImprove}</p>
                  </div>
                </div>

                {/* Skills Tagged */}
                <div className="flex items-center justify-between pt-1 border-t border-[#E8E5DD] text-xs">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[#6F6A60] text-[11px] font-medium">Matched Skills:</span>
                    {opp.matchedSkills.map((s) => (
                      <span key={s} className="px-2 py-0.5 rounded-md bg-[#2F7A45]/10 text-[#2F7A45] text-[11px] font-semibold">
                        ✓ {s}
                      </span>
                    ))}
                    {opp.missingSkills.map((s) => (
                      <span key={s} className="px-2 py-0.5 rounded-md bg-[#F6F4EE] text-[#6F6A60] text-[11px]">
                        + {s}
                      </span>
                    ))}
                  </div>
                  <span className="text-[11px] font-mono text-[#6F6A60]">Deadline: {opp.deadline}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </PortalLayout>
  );
}
