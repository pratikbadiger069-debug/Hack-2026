'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { useAppStore } from '@/lib/store';
import {
  Handshake,
  Sparkles,
  Users,
  Trophy,
  Video,
  FileCode2,
  Calendar,
  Clock,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Check,
  Building,
  DollarSign,
  Cpu,
  Layers,
  MapPin,
  Flame,
  ShieldCheck,
} from 'lucide-react';

interface CapstoneProject {
  id: string;
  title: string;
  sponsor: string;
  domain: string;
  difficulty: string;
  teamSize: string;
  stipendOrPrize: string;
  deadline: string;
  description: string;
  techStack: string[];
}

interface HackathonChallenge {
  id: string;
  title: string;
  organizer: string;
  prizePool: string;
  participantsCount: number;
  dates: string;
  mode: string;
  description: string;
  tags: string[];
}

interface GuestLecture {
  id: string;
  topic: string;
  speaker: string;
  speakerRole: string;
  company: string;
  date: string;
  time: string;
  attendeesCount: number;
  description: string;
}

export default function AcademiaIndustryCollaborationPage() {
  const { studentProfile } = useAppStore();
  const [activeTab, setActiveTab] = useState<'capstones' | 'hackathons' | 'lectures' | 'mentors'>('capstones');
  const [registeredIds, setRegisteredIds] = useState<Record<string, boolean>>({});

  const capstones: CapstoneProject[] = [
    {
      id: 'cap-1',
      title: 'Distributed Multi-Region Cache Synchronization Engine',
      sponsor: 'Razorpay Cloud Squad',
      domain: 'Backend Infrastructure',
      difficulty: 'Advanced',
      teamSize: '3–4 Builders',
      stipendOrPrize: '₹1,00,000 Milestone Grant',
      deadline: 'Oct 30, 2026',
      description: 'Design a CRDT-backed cross-region Redis cluster with conflict-free resolution and sub-10ms latency guarantees.',
      techStack: ['Go', 'Redis', 'Docker', 'CRDTs'],
    },
    {
      id: 'cap-2',
      title: 'Enterprise Multi-Modal RAG Document Retrieval Pipeline',
      sponsor: 'Postman Labs',
      domain: 'AI & Data Engineering',
      difficulty: 'Industry Expert',
      teamSize: '2–3 Builders',
      stipendOrPrize: '₹1,50,000 + Internship Fast-Track',
      deadline: 'Nov 15, 2026',
      description: 'Implement an automated API documentation extractor with hybrid sparse/dense vector search and live code generation.',
      techStack: ['Python', 'FastAPI', 'pgvector', 'LangChain'],
    },
    {
      id: 'cap-3',
      title: 'Zero-Knowledge Cryptographic Authentication Gateway',
      sponsor: 'Polygon & Devfolio',
      domain: 'Web3 & Cryptography',
      difficulty: 'Advanced',
      teamSize: '2–4 Builders',
      stipendOrPrize: '₹80,000 Grant',
      deadline: 'Nov 20, 2026',
      description: 'Build a privacy-preserving student credential verification system using zk-SNARK circuits on browser clients.',
      techStack: ['Circom', 'Rust', 'TypeScript', 'Next.js'],
    },
  ];

  const hackathons: HackathonChallenge[] = [
    {
      id: 'hack-1',
      title: 'National High-Concurrency Algorithmic Hackathon 2026',
      organizer: 'AWS & Devpost Consortium',
      prizePool: '₹15,00,000 Prize Pool',
      participantsCount: 1420,
      dates: 'Oct 24–26, 2026',
      mode: 'Virtual 48-Hour Sprint',
      description: 'Compete with 1,500+ elite student builders to architect resilient, auto-scaling microservices under extreme simulated traffic spikes.',
      tags: ['Distributed Systems', 'AWS Lambda', 'DynamoDB', 'Rust'],
    },
    {
      id: 'hack-2',
      title: 'GenAI Healthcare Innovation Challenge',
      organizer: 'Google Cloud & Apollo Hospitals',
      prizePool: '₹10,00,000 + Incubation',
      participantsCount: 890,
      dates: 'Nov 10–12, 2026',
      mode: 'Hybrid (Bangalore Finals)',
      description: 'Build autonomous multimodal agents to assist clinical triage and radiology report indexing.',
      tags: ['Gemini API', 'PyTorch', 'FastAPI', 'Healthcare'],
    },
  ];

  const guestLectures: GuestLecture[] = [
    {
      id: 'lec-1',
      topic: 'Architecting for 100 Million RPS: Lessons from Swiggy High-Throughput Core',
      speaker: 'Siddharth Raman',
      speakerRole: 'Principal Staff Engineer',
      company: 'Swiggy',
      date: 'Oct 18, 2026',
      time: '6:00 PM IST',
      attendeesCount: 380,
      description: 'Deep-dive into event-driven architecture, partition key sharding, and real-world disaster recovery strategies.',
    },
    {
      id: 'lec-2',
      topic: 'From Academic PyTorch to Production LLM Inference Serving',
      speaker: 'Dr. Ananya Sen',
      speakerRole: 'Director of AI Research',
      company: 'Microsoft GenAI Labs',
      date: 'Oct 28, 2026',
      time: '5:30 PM IST',
      attendeesCount: 520,
      description: 'Explore vLLM, TensorRT-LLM, KV caching optimizations, and speculative decoding techniques.',
    },
  ];

  const handleRegister = (id: string) => {
    setRegisteredIds((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <PortalLayout>
      <div className="space-y-8 max-w-[1240px] mx-auto pb-20">
        
        {/* Header */}
        <div className="p-8 rounded-3xl bg-white border border-[#E8E5DD] shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-0.5 rounded-full bg-[#1B1B1B] text-white text-xs font-bold font-mono uppercase">
                  Academia–Industry Collaboration Hub
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#2F7A45]/10 text-[#2F7A45] text-xs font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Direct Corporate Co-Creation
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#1B1B1B] tracking-tight mt-1.5">
                Industry Capstones, Hackathons &amp; Masterclasses
              </h1>
              <p className="text-xs sm:text-sm text-[#6F6A60] mt-1">
                Collaborate directly with staff engineers, solve real-world corporate sponsored capstones, participate in national innovation sprints, and book mentorship office hours.
              </p>
            </div>

            <div className="flex items-center gap-3 bg-[#F6F4EE] p-3.5 rounded-2xl border border-[#E8E5DD] text-xs self-start md:self-auto shrink-0">
              <div>
                <span className="text-[10px] text-[#6F6A60] block font-medium uppercase">Active Grants</span>
                <strong className="text-[#2F7A45] font-mono font-bold">₹45 Lakhs Pool</strong>
              </div>
              <div className="w-px h-8 bg-[#E8E5DD]" />
              <div>
                <span className="text-[10px] text-[#6F6A60] block font-medium uppercase">Corporate Partners</span>
                <strong className="text-[#1B1B1B] font-bold">34 Enterprise Partners</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-[#E8E5DD] pb-2 overflow-x-auto text-xs font-bold">
          {[
            { id: 'capstones', label: 'Corporate Capstone Projects', icon: FileCode2 },
            { id: 'hackathons', label: 'National Hackathons & Challenges', icon: Trophy },
            { id: 'lectures', label: 'Industry Masterclasses & Tech Talks', icon: Video },
            { id: 'mentors', label: 'Staff Engineer Mentorship Connect', icon: Users },
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

        {/* Tab 1: Capstones */}
        {activeTab === 'capstones' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-[#1B1B1B]">Corporate Sponsored Capstones</h2>
                <p className="text-xs text-[#6F6A60]">Real production problem statements with milestone grants, corporate code reviews, and direct hiring interviews.</p>
              </div>
              <span className="text-xs font-mono font-bold text-[#2F7A45] bg-[#2F7A45]/10 px-3 py-1 rounded-full">
                Verified Hiring Pipeline
              </span>
            </div>

            <div className="space-y-4">
              {capstones.map((cap) => {
                const isRegistered = registeredIds[cap.id];
                return (
                  <div
                    key={cap.id}
                    className="p-6 rounded-3xl bg-white border border-[#E8E5DD] hover:border-[#1B1B1B] transition-all space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E8E5DD]">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-md bg-[#1B1B1B] text-white text-[10px] font-mono font-bold">
                            {cap.domain}
                          </span>
                          <span className="text-xs font-semibold text-[#6F6A60]">Sponsor: {cap.sponsor}</span>
                        </div>
                        <h3 className="text-base font-bold text-[#1B1B1B] mt-1">{cap.title}</h3>
                      </div>

                      <div className="text-left sm:text-right shrink-0">
                        <span className="text-sm font-mono font-bold text-[#2F7A45] block">{cap.stipendOrPrize}</span>
                        <span className="text-[10px] text-[#6F6A60]">Team: {cap.teamSize} • Due: {cap.deadline}</span>
                      </div>
                    </div>

                    <p className="text-xs text-[#6F6A60] leading-relaxed">{cap.description}</p>

                    <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {cap.techStack.map((t) => (
                          <span key={t} className="px-2.5 py-0.5 bg-[#FAF9F5] border border-[#E8E5DD] text-[#1B1B1B] text-[10px] font-mono font-medium rounded-md">
                            {t}
                          </span>
                        ))}
                      </div>

                      <button
                        onClick={() => handleRegister(cap.id)}
                        className={`px-5 py-2.5 rounded-xl font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs ${
                          isRegistered ? 'bg-[#2F7A45] text-white' : 'bg-[#1B1B1B] hover:bg-[#C76A2A] text-white'
                        }`}
                      >
                        {isRegistered ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Team Proposal Registered</span>
                          </>
                        ) : (
                          <>
                            <span>Claim Capstone Challenge</span>
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

        {/* Tab 2: Hackathons */}
        {activeTab === 'hackathons' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-[#1B1B1B]">National University Hackathons &amp; Innovation Sprints</h2>
                <p className="text-xs text-[#6F6A60]">Compete with verified university builders nationwide for substantial prize pools and incubator fast-tracks.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {hackathons.map((hack) => {
                const isRegistered = registeredIds[hack.id];
                return (
                  <div
                    key={hack.id}
                    className="p-6 rounded-3xl bg-white border border-[#E8E5DD] hover:border-[#1B1B1B] transition-all space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded-md bg-[#C76A2A]/10 text-[#C76A2A] text-[10px] font-mono font-bold">
                          {hack.prizePool}
                        </span>
                        <span className="text-[10px] text-[#6F6A60]">{hack.participantsCount} Registered</span>
                      </div>

                      <h3 className="text-base font-bold text-[#1B1B1B]">{hack.title}</h3>
                      <span className="text-xs font-semibold text-[#6F6A60] block">Organized by: {hack.organizer}</span>
                      <p className="text-xs text-[#6F6A60] leading-relaxed">{hack.description}</p>
                    </div>

                    <div className="space-y-3 pt-3 border-t border-[#E8E5DD] text-xs">
                      <div className="flex items-center justify-between text-[11px] text-[#6F6A60]">
                        <span className="font-mono">{hack.dates}</span>
                        <span>{hack.mode}</span>
                      </div>

                      <button
                        onClick={() => handleRegister(hack.id)}
                        className={`w-full py-2.5 rounded-xl font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs ${
                          isRegistered ? 'bg-[#2F7A45] text-white' : 'bg-[#1B1B1B] hover:bg-[#C76A2A] text-white'
                        }`}
                      >
                        {isRegistered ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Registered for Hackathon</span>
                          </>
                        ) : (
                          <>
                            <span>Register Team</span>
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

        {/* Tab 3: Guest Lectures & Masterclasses */}
        {activeTab === 'lectures' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-[#1B1B1B]">Live Staff Engineer Masterclasses</h2>
                <p className="text-xs text-[#6F6A60]">Interactive technical deep-dives hosted by industry leaders.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {guestLectures.map((lec) => {
                const isBooked = registeredIds[lec.id];
                return (
                  <div
                    key={lec.id}
                    className="p-6 rounded-3xl bg-white border border-[#E8E5DD] hover:border-[#1B1B1B] transition-all space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded-md bg-[#1B1B1B] text-white text-[10px] font-mono font-bold">
                          {lec.company}
                        </span>
                        <span className="text-[10px] text-[#6F6A60]">{lec.attendeesCount} Attending</span>
                      </div>

                      <h3 className="text-base font-bold text-[#1B1B1B]">{lec.topic}</h3>
                      <p className="text-xs text-[#6F6A60]">
                        Speaker: <strong className="text-[#1B1B1B]">{lec.speaker}</strong> ({lec.speakerRole})
                      </p>
                      <p className="text-xs text-[#6F6A60] leading-relaxed pt-1">{lec.description}</p>
                    </div>

                    <div className="space-y-3 pt-3 border-t border-[#E8E5DD] text-xs">
                      <div className="flex items-center justify-between text-[11px] text-[#6F6A60] font-mono">
                        <span>{lec.date}</span>
                        <span>{lec.time}</span>
                      </div>

                      <button
                        onClick={() => handleRegister(lec.id)}
                        className={`w-full py-2.5 rounded-xl font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs ${
                          isBooked ? 'bg-[#2F7A45] text-white' : 'bg-[#1B1B1B] hover:bg-[#C76A2A] text-white'
                        }`}
                      >
                        {isBooked ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Spot Confirmed</span>
                          </>
                        ) : (
                          <>
                            <span>Reserve Free Seat</span>
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

        {/* Tab 4: Mentorship */}
        {activeTab === 'mentors' && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-white border border-[#E8E5DD] space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#E8E5DD]">
                <div>
                  <h3 className="text-base font-bold text-[#1B1B1B]">1-on-1 Staff Engineer Mentorship Office Hours</h3>
                  <p className="text-xs text-[#6F6A60]">Book 30-minute code architecture and resume mock interviews with engineers from top tech companies.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { name: 'Rohan Sharma', role: 'Staff SRE', company: 'Google', focus: 'Distributed Systems & Go', availability: 'Friday, 5 PM' },
                  { name: 'Kavita Verma', role: 'Senior AI Engineer', company: 'NVIDIA', focus: 'PyTorch & CUDA Tuning', availability: 'Saturday, 11 AM' },
                  { name: 'Arun Nair', role: 'VP Engineering', company: 'Razorpay', focus: 'System Design & High Concurrency', availability: 'Sunday, 4 PM' },
                ].map((mentor, mIdx) => {
                  const isBooked = registeredIds[`mentor-${mIdx}`];
                  return (
                    <div key={mentor.name} className="p-4 bg-[#FAF9F5] rounded-2xl border border-[#E8E5DD] space-y-3 flex flex-col justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold text-[#1B1B1B]">{mentor.name}</h4>
                          <span className="px-2 py-0.5 rounded bg-[#1B1B1B] text-white text-[10px] font-mono">{mentor.company}</span>
                        </div>
                        <p className="text-[11px] text-[#6F6A60]">{mentor.role}</p>
                        <p className="text-[10px] text-[#C76A2A] font-medium pt-1">Focus: {mentor.focus}</p>
                      </div>

                      <button
                        onClick={() => handleRegister(`mentor-${mIdx}`)}
                        className={`w-full py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                          isBooked ? 'bg-[#2F7A45] text-white' : 'bg-white border border-[#E8E5DD] hover:border-[#1B1B1B] text-[#1B1B1B]'
                        }`}
                      >
                        {isBooked ? 'Slot Booked' : `Book ${mentor.availability}`}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

      </div>
    </PortalLayout>
  );
}
