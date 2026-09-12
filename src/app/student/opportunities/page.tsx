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
  XCircle,
  GitBranch,
  FileCheck,
  Compass,
} from 'lucide-react';

function GithubIcon({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

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
  evidenceTypes: ('GitHub Evidence' | 'LinkedIn Evidence' | 'Assessment Evidence' | 'Project Evidence' | 'Certification Evidence')[];
  strengths: string[];
  missing: string[];
  link: string;
}

export default function StudentOpportunitiesPage() {
  const { studentProfile, applyForInternship, candidates, githubData } = useAppStore();
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
      whyItMatches: 'Your verified score in Python/Go, SQL, and Docker containerization directly matches their high-concurrency payment gateway routing squad.',
      howToImprove: 'Complete the Distributed Rate Limiter challenge to reach 99% match calibration.',
      matchedSkills: ['Python', 'SQL', 'Docker', 'FastAPI'],
      missingSkills: ['Redis Clustered Streams'],
      evidenceTypes: ['GitHub Evidence', 'Assessment Evidence', 'Project Evidence', 'Certification Evidence'],
      strengths: [
        '✓ Python & FastAPI Microservices',
        '✓ SQL & Relational Indexing',
        '✓ GitHub Projects (High-Concurrency Repo)',
        '✓ Assessment Performance (94% Score)',
      ],
      missing: [
        '✗ Spring Boot',
        '✗ Redis Clustered Streams',
      ],
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
      matchedSkills: ['REST APIs', 'Docker', 'TypeScript', 'Git'],
      missingSkills: ['Kubernetes Operators'],
      evidenceTypes: ['GitHub Evidence', 'LinkedIn Evidence', 'Assessment Evidence', 'Project Evidence'],
      strengths: [
        '✓ REST & OpenAPI Specification Design',
        '✓ TypeScript & Full-Stack Systems',
        '✓ Active GitHub Streak & Verified Commits',
        '✓ Assessment Performance (90%+ Pass)',
      ],
      missing: [
        '✗ Kubernetes Operators (CRD controllers)',
        '✗ Helm Custom Charts',
      ],
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
      matchedSkills: ['Algorithms', 'Python', 'Problem Solving', 'Data Structures'],
      missingSkills: [],
      evidenceTypes: ['GitHub Evidence', 'Assessment Evidence', 'Project Evidence'],
      strengths: [
        '✓ Algorithms & Data Structures Mastery',
        '✓ Active Daily SkillBridge Problem Solving Streak',
        '✓ High Velocity GitHub Code Deliveries',
        '✓ Hackathon Experience Verified',
      ],
      missing: [
        '✗ Dedicated Frontend Teammate (Recommended)',
      ],
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
      matchedSkills: ['PyTorch', 'Python', 'Transformers', 'Vector Embeddings'],
      missingSkills: ['Triton Kernels'],
      evidenceTypes: ['GitHub Evidence', 'Project Evidence', 'Certification Evidence', 'Assessment Evidence'],
      strengths: [
        '✓ PyTorch & Transformers Architecture',
        '✓ Vector Search & Embedding Indexer GitHub Code',
        '✓ Verified Deep Learning Specialization',
        '✓ AI Assessment Benchmark (94%)',
      ],
      missing: [
        '✗ Triton GPU Kernel Profiling',
        '✗ CUDA Custom Memory Allocation',
      ],
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
      evidenceTypes: ['GitHub Evidence', 'LinkedIn Evidence', 'Project Evidence', 'Assessment Evidence'],
      strengths: [
        '✓ TypeScript & Next.js App Router',
        '✓ PostgreSQL Relational Schema Design',
        '✓ Multi-Tenant SaaS Project Verified on GitHub',
        '✓ LinkedIn Professional Profile Alignment',
      ],
      missing: [
        '✗ Server-Driven UI Schemas',
        '✗ Mobile React Native (Optional)',
      ],
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
      <div className="space-y-8 max-w-[1200px] mx-auto pb-16">
        
        {/* Header */}
        <div className="p-8 rounded-3xl bg-white border border-[#E8E5DD] shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-3 py-0.5 rounded-full bg-[#C76A2A]/10 text-[#C76A2A] text-xs font-bold font-mono uppercase">
                  Opportunity Engine 4.0
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#2F7A45]/10 text-[#2F7A45] text-xs font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Multi-Source Evidence Matching Active
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#1B1B1B] tracking-tight mt-1.5">
                Verified Opportunities &amp; Matching Intelligence
              </h1>
              <p className="text-xs sm:text-sm text-[#6F6A60] mt-1">
                Matches calculated using GitHub code evidence, LinkedIn career signals, Assessment certifications, and production project proofs.
              </p>
            </div>

            <div className="flex items-center gap-3 bg-[#FAF9F5] p-3.5 rounded-2xl border border-[#E8E5DD] text-xs self-start md:self-auto shrink-0">
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
                className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#1B1B1B] text-white shadow-xs'
                    : 'bg-white border border-[#E8E5DD] text-[#6F6A60] hover:text-[#1B1B1B]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative min-w-[280px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6F6A60]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search roles, companies, or verified skills..."
              className="w-full pl-9 pr-3 py-2 bg-white border border-[#E8E5DD] rounded-xl text-xs text-[#1B1B1B] focus:outline-none focus:border-[#C76A2A]"
            />
          </div>
        </div>

        {/* Opportunities List */}
        <div className="space-y-5">
          {filtered.map((opp) => {
            const isApplied = candidates.some(
              (c) =>
                (c.id === opp.id || c.jobId === opp.id || c.targetRole === opp.title) &&
                (c.studentId === studentProfile.id || c.name === studentProfile.name)
            );

            return (
              <div
                key={opp.id}
                className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E8E5DD] hover:border-[#1B1B1B] hover:shadow-md transition-all space-y-5"
              >
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E8E5DD]">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2.5 py-0.5 rounded-md bg-[#1B1B1B] text-white text-[10px] font-mono font-bold uppercase">
                        {opp.category}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-[#1B1B1B]">{opp.title}</h3>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#2F7A45]/10 text-[#2F7A45] text-xs font-bold font-mono border border-[#2F7A45]/20">
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

                {/* Evidence Source Tags */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[11px] font-bold text-[#6F6A60] uppercase tracking-wider">
                    Evidence Signals:
                  </span>
                  {opp.evidenceTypes.map((ev) => (
                    <span
                      key={ev}
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-lg bg-[#FAF9F5] border border-[#E8E5DD] text-[#1B1B1B] flex items-center gap-1"
                    >
                      <ShieldCheck className="w-3 h-3 text-[#2F7A45]" />
                      {ev}
                    </span>
                  ))}
                </div>

                {/* Match Analysis: Strengths (✓) & Missing (✗) per User Specification */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  {/* Strengths */}
                  <div className="p-4 rounded-2xl bg-[#2F7A45]/5 border border-[#2F7A45]/20 space-y-2">
                    <span className="font-bold text-[#2F7A45] flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                      <CheckCircle2 className="w-4 h-4 text-[#2F7A45]" /> Strengths (Verified Alignment)
                    </span>
                    <ul className="space-y-1.5 text-[#1B1B1B] text-xs">
                      {opp.strengths.map((s, idx) => (
                        <li key={idx} className="flex items-center gap-2 font-medium">
                          <span className="text-[#2F7A45] font-bold">{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Missing Skills */}
                  <div className="p-4 rounded-2xl bg-[#C76A2A]/5 border border-[#C76A2A]/20 space-y-2">
                    <span className="font-bold text-[#C76A2A] flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                      <XCircle className="w-4 h-4 text-[#C76A2A]" /> Missing (Actionable Skill Gaps)
                    </span>
                    <ul className="space-y-1.5 text-[#1B1B1B] text-xs">
                      {opp.missing.map((m, idx) => (
                        <li key={idx} className="flex items-center gap-2 font-medium">
                          <span className="text-[#C76A2A] font-bold">{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Why It Matches & Improvement Guidance */}
                <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#E8E5DD] text-xs space-y-1.5">
                  <p className="text-[#1B1B1B]">
                    <strong className="text-[#6F6A60]">Matching Rationale:</strong> {opp.whyItMatches}
                  </p>
                  <p className="text-[#6F6A60] flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#C76A2A]" />
                    <span><strong>How to reach 99% match:</strong> {opp.howToImprove}</span>
                  </p>
                </div>

                {/* Skills Tagged & Deadline Footer */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-[#E8E5DD] text-xs">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[#6F6A60] text-[11px] font-medium">Matched Skills:</span>
                    {opp.matchedSkills.map((s) => (
                      <span key={s} className="px-2.5 py-0.5 rounded-lg bg-[#2F7A45]/10 text-[#2F7A45] text-[11px] font-bold">
                        ✓ {s}
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
