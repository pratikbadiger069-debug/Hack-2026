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
  AlertTriangle,
  ExternalLink,
  Layers,
  Award,
  CheckCircle2,
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
  strengths: string[];
  weaknesses: string[];
  link: string;
}

export default function StudentOpportunitiesPage() {
  const { studentProfile, applyForInternship, candidates } = useAppStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

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
      strengths: ['High-concurrency data models', 'Strong SQL joins & indexing', 'Verified Java collections score'],
      weaknesses: ['Missing distributed lock implementation proof in GitHub repos'],
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
      whyItMatches: 'Your builder profile demonstrates backend GitHub repositories and verified REST API contract design.',
      howToImprove: 'Earn the Advanced Cloud & Kubernetes badge on SkillBridge.',
      matchedSkills: ['REST APIs', 'Docker', 'Git'],
      missingSkills: ['Kubernetes Operators'],
      strengths: ['Proven REST & OpenAPI architecture', 'Active GitHub commit streak', 'Clean schema design'],
      weaknesses: ['Kubernetes CRD controllers not yet verified'],
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
      strengths: ['Consistent daily LeetCode/SkillBridge assessment streak', 'Fast execution velocity'],
      weaknesses: ['None detected for this hackathon tier'],
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
      strengths: ['Strong linear algebra foundation', 'Vector search embeddings codebase live on GitHub'],
      weaknesses: ['GPU kernel profiling (Triton / CUDA) requires completion'],
      link: 'https://deepmind.google',
    },
    {
      id: 'opp-5',
      title: 'Full-Stack Product Engineering Resident',
      company: 'Swiggy Consumer Tech',
      category: 'Internships',
      matchScore: 93,
      location: 'Bengaluru (On-site)',
      type: 'Full-time Intern',
      compensation: '₹50,000 / mo',
      deadline: 'In 8 days',
      whyItMatches: 'Matches your Next.js full-stack profile, WebSockets real-time state sync, and clean component architecture.',
      howToImprove: 'Build a simulated live delivery tracking map with WebSockets.',
      matchedSkills: ['Next.js', 'TypeScript', 'Tailwind', 'PostgreSQL'],
      missingSkills: ['Server-Driven UI'],
      strengths: ['Clean responsive Apple/Linear design sensibility', 'Fast frontend rendering performance'],
      weaknesses: ['Server-driven UI configuration experience needed'],
      link: 'https://swiggy.com/careers',
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

  const handleApply = (opp: Opportunity) => {
    applyForInternship(opp.id, {
      role: opp.title,
      title: opp.title,
      matchScore: opp.matchScore,
    });
    if (opp.link && opp.link.startsWith('http')) {
      window.open(opp.link, '_blank');
    }
  };

  return (
    <PortalLayout>
      <div className="space-y-8 max-w-[1140px] mx-auto pb-16">
        
        {/* Header */}
        <div className="p-8 rounded-3xl bg-white border border-[#E8E5DD] shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-0.5 rounded-full bg-[#C76A2A]/10 text-[#C76A2A] text-xs font-bold font-mono uppercase">
                  Opportunity Engine 3.0
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#2F7A45]/10 text-[#2F7A45] text-xs font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Proof-Based Matching Active
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#1B1B1B] tracking-tight mt-1.5">
                Verified Internships &amp; Placements
              </h1>
              <p className="text-xs sm:text-sm text-[#6F6A60] mt-1">
                Matched strictly using your verified skills passport, GitHub code proof, Assessment 4.0 certifications, and Builder Score.
              </p>
            </div>

            <div className="flex items-center gap-3 bg-[#F6F4EE] p-3.5 rounded-2xl border border-[#E8E5DD] text-xs self-start md:self-auto shrink-0">
              <div>
                <span className="text-[10px] text-[#6F6A60] block font-medium uppercase">Active Submissions</span>
                <strong className="text-[#1B1B1B] font-mono font-bold">
                  {candidates.filter((c) => c.studentId === studentProfile.id || c.name === studentProfile.name).length} Pipeline Active
                </strong>
              </div>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-bold">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#1B1B1B] text-white shadow-xs'
                    : 'bg-white border border-[#E8E5DD] text-[#6F6A60] hover:text-[#1B1B1B]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative min-w-[260px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6F6A60]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search roles, companies, or tech..."
              className="w-full pl-9 pr-3 py-1.5 bg-white border border-[#E8E5DD] rounded-xl text-xs focus:outline-none focus:border-[#1B1B1B]"
            />
          </div>
        </div>

        {/* Opportunities List */}
        <div className="space-y-4">
          {filtered.map((opp) => {
            const isApplied = candidates.some(
              (c) =>
                (c.id === opp.id || c.jobId === opp.id || c.targetRole === opp.title) &&
                (c.studentId === studentProfile.id || c.name === studentProfile.name)
            );

            return (
              <div
                key={opp.id}
                className="p-6 rounded-3xl bg-white border border-[#E8E5DD] hover:border-[#1B1B1B] transition-all space-y-4"
              >
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E8E5DD]">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2.5 py-0.5 rounded-md bg-[#1B1B1B] text-white text-[10px] font-mono font-bold uppercase">
                        {opp.category}
                      </span>
                      <h3 className="text-base font-bold text-[#1B1B1B]">{opp.title}</h3>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#2F7A45]/10 text-[#2F7A45] text-xs font-bold font-mono">
                        {opp.matchScore}% Match
                      </span>
                    </div>
                    <p className="text-xs text-[#6F6A60] flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-[#1B1B1B]">{opp.company}</span>
                      <span>•</span>
                      <span>{opp.location}</span>
                      <span>•</span>
                      <span className="font-mono font-bold text-[#C76A2A]">{opp.compensation}</span>
                    </p>
                  </div>

                  <button
                    onClick={() => handleApply(opp)}
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer shadow-xs ${
                      isApplied
                        ? 'bg-[#2F7A45] text-white'
                        : 'bg-[#1B1B1B] hover:bg-[#C76A2A] text-white'
                    }`}
                  >
                    {isApplied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Passport Submitted</span>
                      </>
                    ) : (
                      <>
                        <span>Apply with Builder Passport</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>

                {/* Match Analysis: Strengths & Weaknesses (Audit requirement) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-2xl bg-[#2F7A45]/5 border border-[#2F7A45]/20 space-y-1.5">
                    <span className="font-bold text-[#2F7A45] flex items-center gap-1 uppercase tracking-wider text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Profile Strengths for this Role:
                    </span>
                    <ul className="space-y-1 text-[#1B1B1B] text-[11px]">
                      {opp.strengths.map((s, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <span className="text-[#2F7A45] font-bold">✓</span> {s}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-orange-50/50 border border-orange-200/80 space-y-1.5">
                    <span className="font-bold text-[#C76A2A] flex items-center gap-1 uppercase tracking-wider text-[11px]">
                      <AlertTriangle className="w-3.5 h-3.5" /> Identified Skill Gaps to Bridge:
                    </span>
                    <ul className="space-y-1 text-[#1B1B1B] text-[11px]">
                      {opp.weaknesses.map((w, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <span className="text-[#C76A2A] font-bold">⚠</span> {w}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Skills Tagged & Deadline */}
                <div className="flex items-center justify-between pt-2 border-t border-[#E8E5DD] text-xs">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[#6F6A60] text-[11px] font-medium">Matched Skills:</span>
                    {opp.matchedSkills.map((s) => (
                      <span key={s} className="px-2.5 py-0.5 rounded-md bg-[#2F7A45]/10 text-[#2F7A45] text-[11px] font-bold">
                        ✓ {s}
                      </span>
                    ))}
                    {opp.missingSkills.map((s) => (
                      <span key={s} className="px-2.5 py-0.5 rounded-md bg-[#F6F4EE] text-[#6F6A60] text-[11px] font-medium">
                        + Missing: {s}
                      </span>
                    ))}
                  </div>

                  <span className="text-[11px] font-mono text-[#6F6A60]">Deadline: {opp.deadline}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </PortalLayout>
  );
}
