'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { useAppStore } from '@/lib/store';
import {
  GraduationCap,
  Briefcase,
  BookOpen,
  Award,
  Users,
  Search,
  Filter,
  CheckCircle2,
  Calendar,
  Clock,
  ArrowRight,
  ExternalLink,
  Sparkles,
  Building,
  Check,
  TrendingUp,
  BarChart3,
  Cpu,
  Layers,
  FileText,
  Mail,
  ShieldCheck,
} from 'lucide-react';

interface FacultyInternship {
  id: string;
  company: string;
  role: string;
  domain: string;
  duration: string;
  location: string;
  stipendOrGrant: string;
  eligibility: string;
  deadline: string;
  description: string;
  tags: string[];
}

interface FDPProgram {
  id: string;
  title: string;
  provider: string;
  topics: string[];
  credits: number;
  duration: string;
  mode: string;
  certification: string;
  nextCohort: string;
  seatsRemaining: number;
}

interface ResearchRFP {
  id: string;
  title: string;
  sponsor: string;
  fundingAmount: string;
  deadline: string;
  domain: string;
  focusArea: string;
  status: 'Open for Proposals' | 'Under Review';
}

export default function AcademicianFacultyPortalPage() {
  const { studentProfile, candidates } = useAppStore();
  const [activeTab, setActiveTab] = useState<'fdp' | 'internships' | 'research' | 'mentorship' | 'analytics'>('fdp');
  const [appliedIds, setAppliedIds] = useState<Record<string, boolean>>({});

  // FDP Programs Catalog
  const fdpPrograms: FDPProgram[] = [
    {
      id: 'fdp-1',
      title: 'Advanced Generative AI, RAG Systems & LLM Architecture for Educators',
      provider: 'Google Cloud & DeepLearning.AI',
      topics: ['Transformers', 'RAG Pipelines', 'Vector Indexing', 'Model Evaluation'],
      credits: 4,
      duration: '4 Weeks (Weekends)',
      mode: 'Live Virtual Masterclass',
      certification: 'Google Cloud Faculty AI Fellow',
      nextCohort: 'Oct 15, 2026',
      seatsRemaining: 18,
    },
    {
      id: 'fdp-2',
      title: 'Cloud-Native Distributed Systems, Kubernetes & Microservices Immersion',
      provider: 'AWS Academy & Red Hat',
      topics: ['K8s Orchestration', 'Service Mesh', 'CI/CD Pipelines', 'Distributed Observability'],
      credits: 3,
      duration: '3 Weeks (Hybrid)',
      mode: 'Hands-on Lab Immersion',
      certification: 'AWS Certified Faculty Educator',
      nextCohort: 'Nov 02, 2026',
      seatsRemaining: 24,
    },
    {
      id: 'fdp-3',
      title: 'Cybersecurity Threat Defense, Zero Trust & SOC Automation Workshop',
      provider: 'Palo Alto Networks & Microsoft Security',
      topics: ['Zero Trust Architecture', 'Threat Intelligence', 'MITRE ATT&CK', 'Cloud Security'],
      credits: 4,
      duration: '2 Weeks (Full-time)',
      mode: 'Executive Industry Sandbox',
      certification: 'Microsoft Certified Security Trainer',
      nextCohort: 'Nov 20, 2026',
      seatsRemaining: 12,
    },
  ];

  // Faculty Internships / Sabbaticals
  const facultyInternships: FacultyInternship[] = [
    {
      id: 'fi-1',
      company: 'NVIDIA Research & Autonomous Systems',
      role: 'Faculty Research Fellow — High Performance AI Kernels',
      domain: 'AI & Systems Architecture',
      duration: '8 Weeks (Summer 2026)',
      location: 'Bengaluru / Hybrid',
      stipendOrGrant: '₹1,50,000 / mo Fellowship',
      eligibility: 'Faculty with 3+ years teaching Operating Systems / Machine Learning',
      deadline: 'In 12 days',
      description: 'Collaborate with senior NVIDIA GPU architects on tensor compiler optimizations, Triton kernels, and university curriculum co-design.',
      tags: ['CUDA', 'Triton', 'GPU Acceleration', 'Curriculum Design'],
    },
    {
      id: 'fi-2',
      company: 'Razorpay Systems Engineering',
      role: 'Visiting Faculty Engineer — Distributed FinTech Protocols',
      domain: 'Backend & Distributed Systems',
      duration: '6 Weeks',
      location: 'Bengaluru / Hybrid',
      stipendOrGrant: '₹1,20,000 / mo Fellowship',
      eligibility: 'Assistant / Associate Professors teaching DBMS, Networks, or Cloud',
      deadline: 'In 20 days',
      description: 'Work directly inside Razorpay Core Routing squads on zero-downtime database sharding and idempotency verification systems.',
      tags: ['PostgreSQL', 'Go', 'Distributed Systems', 'Fault Tolerance'],
    },
    {
      id: 'fi-3',
      company: 'Microsoft Azure Academic Immersion',
      role: 'Faculty Fellow — Next-Gen Cloud Infrastructure',
      domain: 'Cloud & Systems',
      duration: '4 Weeks (Flexible)',
      location: 'Hyderabad / Remote',
      stipendOrGrant: '₹1,00,000 / mo Grant + Azure Credits',
      eligibility: 'Computer Science & IT Faculty',
      deadline: 'Rolling 2026',
      description: 'Gain insider mastery into Azure hyperscale architecture to revamp university Distributed Computing laboratory syllabi.',
      tags: ['Azure Cloud', 'Terraform', 'Distributed Storage'],
    },
  ];

  // Research Collaborations & Grant RFPs
  const researchRFPs: ResearchRFP[] = [
    {
      id: 'rfp-1',
      title: 'Decentralized Edge AI for Real-time Healthcare Diagnostic Telemetry',
      sponsor: 'Apollo Health Tech & Intel Labs',
      fundingAmount: '₹25,00,000 Grant',
      deadline: 'Nov 30, 2026',
      domain: 'AI & Healthcare IoT',
      focusArea: 'On-device neural inference and federated learning on low-power microcontrollers.',
      status: 'Open for Proposals',
    },
    {
      id: 'rfp-2',
      title: 'Post-Quantum Cryptographic Protocols for High-Throughput Financial Ledgers',
      sponsor: 'National Cyber Security Council & State Bank Consortium',
      fundingAmount: '₹40,00,000 Grant',
      deadline: 'Dec 15, 2026',
      domain: 'Cybersecurity',
      focusArea: 'Lattice-based cryptography hardware accelerators and side-channel attack mitigation.',
      status: 'Open for Proposals',
    },
  ];

  const handleApply = (id: string) => {
    setAppliedIds((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <PortalLayout>
      <div className="space-y-8 max-w-[1240px] mx-auto pb-20">
        
        {/* Header Banner */}
        <div className="p-8 rounded-3xl bg-white border border-[#E8E5DD] shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-0.5 rounded-full bg-[#1B1B1B] text-white text-xs font-bold font-mono uppercase">
                  Academician &amp; Faculty Portal
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#2F7A45]/10 text-[#2F7A45] text-xs font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Industry-Academia Co-Creation Network
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#1B1B1B] tracking-tight mt-1.5">
                Faculty Industry Immersion &amp; Growth
              </h1>
              <p className="text-xs sm:text-sm text-[#6F6A60] mt-1">
                Upskill with industry-sponsored Faculty Development Programs, apply for corporate research fellowships, guide student builders, and track classroom readiness telemetry.
              </p>
            </div>

            <div className="flex items-center gap-3 bg-[#F6F4EE] p-3.5 rounded-2xl border border-[#E8E5DD] text-xs self-start md:self-auto shrink-0">
              <div>
                <span className="text-[10px] text-[#6F6A60] block font-medium uppercase">Institution</span>
                <strong className="text-[#1B1B1B] font-bold">HITAM University</strong>
              </div>
              <div className="w-px h-8 bg-[#E8E5DD]" />
              <div>
                <span className="text-[10px] text-[#6F6A60] block font-medium uppercase">Active Cohorts</span>
                <strong className="text-[#C76A2A] font-mono font-bold">12 Active FDPs</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Portal Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-[#E8E5DD] pb-2 overflow-x-auto text-xs font-bold">
          {[
            { id: 'fdp', label: 'Faculty Development Programs (FDP)', icon: BookOpen },
            { id: 'internships', label: 'Faculty Industry Internships', icon: Briefcase },
            { id: 'research', label: 'Research Grants & Industry RFPs', icon: Cpu },
            { id: 'mentorship', label: 'Student Mentorship Office Hours', icon: Users },
            { id: 'analytics', label: 'Department Readiness Telemetry', icon: BarChart3 },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-[#1B1B1B] text-white shadow-xs'
                    : 'bg-white border border-[#E8E5DD] text-[#6F6A60] hover:text-[#1B1B1B]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Faculty Development Programs (FDPs) */}
        {activeTab === 'fdp' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-[#1B1B1B]">Accredited Faculty Development Programs (FDPs)</h2>
                <p className="text-xs text-[#6F6A60]">Earn AICTE/UGC recognized professional credits and corporate educator credentials.</p>
              </div>
              <span className="text-xs font-mono font-bold text-[#2F7A45] bg-[#2F7A45]/10 px-3 py-1 rounded-full">
                100% Industry Sponsored
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {fdpPrograms.map((fdp) => {
                const isEnrolled = appliedIds[fdp.id];
                return (
                  <div
                    key={fdp.id}
                    className="p-6 rounded-3xl bg-white border border-[#E8E5DD] hover:border-[#1B1B1B] transition-all space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <span className="px-2.5 py-0.5 rounded-md bg-[#C76A2A]/10 text-[#C76A2A] text-[10px] font-mono font-bold">
                          {fdp.credits} Academic Credits
                        </span>
                        <span className="text-[10px] font-mono text-[#6F6A60]">{fdp.seatsRemaining} seats left</span>
                      </div>

                      <h3 className="text-sm font-bold text-[#1B1B1B] leading-snug">{fdp.title}</h3>
                      <span className="text-xs font-semibold text-[#6F6A60] block">Sponsored by: {fdp.provider}</span>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {fdp.topics.map((t) => (
                          <span key={t} className="px-2 py-0.5 bg-[#FAF9F5] border border-[#E8E5DD] text-[#1B1B1B] text-[10px] font-medium rounded-md">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3 pt-3 border-t border-[#E8E5DD] text-xs">
                      <div className="flex items-center justify-between text-[11px] text-[#6F6A60]">
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {fdp.duration}</span>
                        <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Starts {fdp.nextCohort}</span>
                      </div>

                      <button
                        onClick={() => handleApply(fdp.id)}
                        className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs ${
                          isEnrolled
                            ? 'bg-[#2F7A45] text-white'
                            : 'bg-[#1B1B1B] hover:bg-[#C76A2A] text-white'
                        }`}
                      >
                        {isEnrolled ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Enrolled in Cohort</span>
                          </>
                        ) : (
                          <>
                            <span>Enroll in FDP</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 2: Faculty Industry Internships & Sabbaticals */}
        {activeTab === 'internships' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-[#1B1B1B]">Corporate Faculty Sabbaticals &amp; Immersion</h2>
                <p className="text-xs text-[#6F6A60]">Spend 4 to 8 weeks embedding within tier-1 enterprise R&amp;D engineering teams.</p>
              </div>
              <span className="text-xs font-mono font-bold text-[#C76A2A] bg-[#C76A2A]/10 px-3 py-1 rounded-full">
                Summer &amp; Semester Fellowships
              </span>
            </div>

            <div className="space-y-4">
              {facultyInternships.map((fi) => {
                const isApplied = appliedIds[fi.id];
                return (
                  <div
                    key={fi.id}
                    className="p-6 rounded-3xl bg-white border border-[#E8E5DD] hover:border-[#1B1B1B] transition-all space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E8E5DD]">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-md bg-[#1B1B1B] text-white text-[10px] font-mono font-bold">
                            {fi.domain}
                          </span>
                          <span className="text-xs font-semibold text-[#6F6A60]">{fi.company}</span>
                        </div>
                        <h3 className="text-base font-bold text-[#1B1B1B] mt-1">{fi.role}</h3>
                      </div>

                      <div className="text-left sm:text-right shrink-0">
                        <span className="text-sm font-mono font-bold text-[#C76A2A] block">{fi.stipendOrGrant}</span>
                        <span className="text-[10px] text-[#6F6A60]">{fi.duration} • {fi.location}</span>
                      </div>
                    </div>

                    <p className="text-xs text-[#6F6A60] leading-relaxed">{fi.description}</p>

                    <div className="p-3 bg-[#FAF9F5] rounded-xl border border-[#E8E5DD] text-xs space-y-1">
                      <strong className="text-[#1B1B1B] block">Eligibility Criteria:</strong>
                      <p className="text-[#6F6A60]">{fi.eligibility}</p>
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {fi.tags.map((t) => (
                          <span key={t} className="px-2 py-0.5 bg-[#F6F4EE] text-[#1B1B1B] text-[10px] font-medium rounded-md">
                            {t}
                          </span>
                        ))}
                      </div>

                      <button
                        onClick={() => handleApply(fi.id)}
                        className={`px-5 py-2.5 rounded-xl font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs ${
                          isApplied
                            ? 'bg-[#2F7A45] text-white'
                            : 'bg-[#1B1B1B] hover:bg-[#C76A2A] text-white'
                        }`}
                      >
                        {isApplied ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Application Submitted</span>
                          </>
                        ) : (
                          <>
                            <span>Apply for Sabbatical</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 3: Research Grants & Industry RFPs */}
        {activeTab === 'research' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-[#1B1B1B]">Industry-Academia Joint Research Grants &amp; RFPs</h2>
                <p className="text-xs text-[#6F6A60]">Submit proposals for corporate research funding, lab equipment sponsorships, and co-authorships.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {researchRFPs.map((rfp) => {
                const isSubmitted = appliedIds[rfp.id];
                return (
                  <div
                    key={rfp.id}
                    className="p-6 rounded-3xl bg-white border border-[#E8E5DD] hover:border-[#1B1B1B] transition-all space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded-md bg-[#2F7A45]/10 text-[#2F7A45] text-[10px] font-mono font-bold">
                          {rfp.fundingAmount}
                        </span>
                        <span className="text-[10px] text-[#6F6A60]">Deadline: {rfp.deadline}</span>
                      </div>

                      <h3 className="text-sm font-bold text-[#1B1B1B]">{rfp.title}</h3>
                      <span className="text-xs font-semibold text-[#C76A2A] block">Funded by: {rfp.sponsor}</span>
                      <p className="text-xs text-[#6F6A60] leading-relaxed pt-1">{rfp.focusArea}</p>
                    </div>

                    <div className="pt-3 border-t border-[#E8E5DD]">
                      <button
                        onClick={() => handleApply(rfp.id)}
                        className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs ${
                          isSubmitted ? 'bg-[#2F7A45] text-white' : 'bg-[#1B1B1B] hover:bg-[#C76A2A] text-white'
                        }`}
                      >
                        {isSubmitted ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Proposal Registered</span>
                          </>
                        ) : (
                          <>
                            <span>Submit Research Proposal</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 4: Student Mentorship Hub */}
        {activeTab === 'mentorship' && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-white border border-[#E8E5DD] space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#E8E5DD]">
                <div>
                  <h3 className="text-base font-bold text-[#1B1B1B]">1-on-1 Student Guidance Office Hours</h3>
                  <p className="text-xs text-[#6F6A60]">Manage student booking slots for capstone reviews, career mentorship, and code architecture clinics.</p>
                </div>
                <button className="px-3.5 py-1.5 bg-[#1B1B1B] text-white text-xs font-bold rounded-xl hover:bg-[#C76A2A] transition-colors cursor-pointer">
                  + Add Available Slot
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#E8E5DD] space-y-2">
                  <span className="text-[10px] text-[#6F6A60] uppercase font-bold block">Scheduled Today</span>
                  <strong className="text-2xl font-bold font-mono text-[#1B1B1B]">4 Sessions</strong>
                  <p className="text-[11px] text-[#6F6A60]">3 Capstone reviews, 1 Resume audit</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#E8E5DD] space-y-2">
                  <span className="text-[10px] text-[#6F6A60] uppercase font-bold block">Students Mentored</span>
                  <strong className="text-2xl font-bold font-mono text-[#2F7A45]">48 Students</strong>
                  <p className="text-[11px] text-[#6F6A60]">Across CSE &amp; AI/ML Departments</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#E8E5DD] space-y-2">
                  <span className="text-[10px] text-[#6F6A60] uppercase font-bold block">Avg Rating</span>
                  <strong className="text-2xl font-bold font-mono text-[#C76A2A]">4.9 / 5.0</strong>
                  <p className="text-[11px] text-[#6F6A60]">Based on 36 peer student evaluations</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Department Readiness Telemetry */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-white border border-[#E8E5DD] space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#E8E5DD]">
                <div>
                  <h3 className="text-base font-bold text-[#1B1B1B]">Computer Science &amp; Engineering — Cohort Skill Telemetry</h3>
                  <p className="text-xs text-[#6F6A60]">Real-time student assessment diagnostic mastery and curriculum market alignment.</p>
                </div>
                <span className="text-xs font-mono font-bold text-[#2F7A45] bg-[#2F7A45]/10 px-3 py-1 rounded-full">
                  Batch 2026 • 240 Students
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-4 bg-[#FAF9F5] rounded-2xl border border-[#E8E5DD] space-y-1">
                  <span className="text-[10px] text-[#6F6A60] uppercase font-bold block">Average Builder Score</span>
                  <strong className="text-2xl font-bold font-mono text-[#1B1B1B]">742/1000</strong>
                  <span className="text-[10px] text-[#2F7A45] font-bold block">+34 pts this month</span>
                </div>

                <div className="p-4 bg-[#FAF9F5] rounded-2xl border border-[#E8E5DD] space-y-1">
                  <span className="text-[10px] text-[#6F6A60] uppercase font-bold block">Industry Placement Ready</span>
                  <strong className="text-2xl font-bold font-mono text-[#2F7A45]">82%</strong>
                  <span className="text-[10px] text-[#6F6A60] block">Above 70% threshold</span>
                </div>

                <div className="p-4 bg-[#FAF9F5] rounded-2xl border border-[#E8E5DD] space-y-1">
                  <span className="text-[10px] text-[#6F6A60] uppercase font-bold block">Verified Skills Passport</span>
                  <strong className="text-2xl font-bold font-mono text-[#C76A2A]">680 Skills</strong>
                  <span className="text-[10px] text-[#6F6A60] block">Validated in Assessment 4.0</span>
                </div>

                <div className="p-4 bg-[#FAF9F5] rounded-2xl border border-[#E8E5DD] space-y-1">
                  <span className="text-[10px] text-[#6F6A60] uppercase font-bold block">Active GitHub Repos</span>
                  <strong className="text-2xl font-bold font-mono text-[#1B1B1B]">340 Repos</strong>
                  <span className="text-[10px] text-[#2F7A45] font-bold block">12k total commits</span>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </PortalLayout>
  );
}
