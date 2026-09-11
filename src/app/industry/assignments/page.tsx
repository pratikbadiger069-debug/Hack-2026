'use client';

import React, { useState } from 'react';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { useAppStore } from '@/lib/store';
import { mockAssignments } from '@/lib/mock-data';
import {
  Code,
  Plus,
  CheckCircle2,
  Clock,
  Sparkles,
  X,
  FileCode,
  Layers,
  Award,
  Send,
  HelpCircle,
} from 'lucide-react';

export default function IndustryAssignmentsPage() {
  const { publishIndustryAssessment, quests } = useAppStore();
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState('');

  // Assessment Builder Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'Backend' | 'Frontend' | 'AI & ML' | 'DevOps' | 'Database' | 'Systems'>('Backend');
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Advanced' | 'Expert' | 'Boss'>('Advanced');
  const [type, setType] = useState<'MCQ' | 'Coding' | 'Debugging' | 'Case Study' | 'Text Response' | 'Mixed'>('Mixed');
  const [xpReward, setXpReward] = useState<number>(50);
  const [passThreshold, setPassThreshold] = useState<number>(75);
  const [estimatedMinutes, setEstimatedMinutes] = useState<number>(25);
  const [targetRole, setTargetRole] = useState('Senior Backend Engineer');
  const [skillsGained, setSkillsGained] = useState('Distributed Caching, Redis, High Throughput');
  const [description, setDescription] = useState('');

  // Primary Question
  const [questionText, setQuestionText] = useState('');
  const [codeSnippet, setCodeSnippet] = useState('');
  const [opt1, setOpt1] = useState('');
  const [opt2, setOpt2] = useState('');
  const [opt3, setOpt3] = useState('');
  const [correctOpt, setCorrectOpt] = useState<number>(0);
  const [explanation, setExplanation] = useState('');

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !questionText) return;

    const parsedSkills = skillsGained.split(',').map((s) => s.trim()).filter(Boolean);

    publishIndustryAssessment({
      id: `quest-ind-${Date.now()}`,
      title,
      category,
      type,
      difficulty,
      xpReward: Number(xpReward),
      estimatedMinutes: Number(estimatedMinutes),
      description: description || 'Industry-verified technical challenge.',
      skillsGained: parsedSkills.length > 0 ? parsedSkills : ['System Design'],
      passingScore: Number(passThreshold),
      roleTarget: targetRole,
      companyName: 'Partner Enterprise',
      questions: [
        {
          id: `q-ind-${Date.now()}`,
          question: questionText,
          codeSnippet: codeSnippet || undefined,
          options: [
            { id: 'opt-1', text: opt1 || 'Optimal non-blocking solution', correct: correctOpt === 0 },
            { id: 'opt-2', text: opt2 || 'Synchronous blocking fallback', correct: correctOpt === 1 },
            { id: 'opt-3', text: opt3 || 'Unbounded queue allocation', correct: correctOpt === 2 },
          ],
          explanation: explanation || 'Standard enterprise architectural pattern verified by Industry Assessor.',
        },
      ],
    });

    setPublishSuccess(`Assessment "${title}" published live to Student Assessment Catalog (+50 Recruiter XP)`);
    setIsBuilderOpen(false);

    // Reset Form
    setTitle('');
    setDescription('');
    setQuestionText('');
    setCodeSnippet('');
    setOpt1('');
    setOpt2('');
    setOpt3('');
    setExplanation('');

    setTimeout(() => setPublishSuccess(''), 6000);
  };

  return (
    <PortalLayout>
      <div className="space-y-6 max-w-[1200px] mx-auto pb-16">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#E8E5DD] shadow-xs">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full bg-[#C76A2A]/10 text-[#C76A2A]">
                Recruiter Evaluation Hub
              </span>
            </div>
            <h1 className="text-2xl font-bold text-[#1B1B1B] tracking-tight">Industry Assessment Builder</h1>
            <p className="text-xs text-[#6F6A60] mt-1">
              Create and publish customized multi-format coding challenges, architecture case studies, and debugging benchmarks.
            </p>
          </div>
          <button
            onClick={() => setIsBuilderOpen(true)}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#1B1B1B] hover:bg-[#C76A2A] rounded-xl shadow-xs transition-colors flex items-center gap-1.5 self-start md:self-auto"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Assessment</span>
          </button>
        </div>

        {publishSuccess && (
          <div className="p-4 bg-[#2F7A45]/10 border border-[#2F7A45]/20 rounded-xl text-xs font-semibold text-[#2F7A45] flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{publishSuccess}</span>
          </div>
        )}

        {/* Existing Published Challenges */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6F6A60]">
              Active Company Challenges &amp; Assessments ({mockAssignments.length})
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mockAssignments.map((asg) => (
              <div
                key={asg.id}
                className="p-5 rounded-2xl bg-white border border-[#E8E5DD] shadow-xs space-y-4 flex flex-col justify-between hover:border-[#C76A2A] transition-all"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#6F6A60] bg-[#F6F4EE] px-2 py-0.5 rounded-md">
                      {asg.type}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#2F7A45]/10 text-[#2F7A45] flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> {asg.status}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-[#1B1B1B]">{asg.title}</h3>
                  <p className="text-xs text-[#6F6A60]">Target Role: <strong className="text-[#1B1B1B]">{asg.roleTarget}</strong></p>
                  
                  <div className="flex items-center gap-3 text-xs text-[#6F6A60] pt-2 border-t border-[#E8E5DD]">
                    <span className="flex items-center gap-1 font-mono">
                      <Clock className="w-3.5 h-3.5 text-[#C76A2A]" />
                      {asg.duration}
                    </span>
                    <span>•</span>
                    <span className="font-mono">Due: {asg.dueDate}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#E8E5DD] flex items-center justify-between text-xs">
                  <span className="text-[#6F6A60] font-medium font-mono">
                    {asg.submissionsCount} / {asg.totalAssigned} Submissions
                  </span>
                  <span className="font-bold text-[#2F7A45] font-mono">{asg.averageScore}% Avg Score</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Assessment Builder Modal */}
      {isBuilderOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl border border-[#E8E5DD] max-w-2xl w-full p-6 space-y-5 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E5DD]">
              <div>
                <h2 className="text-base font-bold text-[#1B1B1B] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#C76A2A]" />
                  <span>Build Industry-Verified Assessment</span>
                </h2>
                <p className="text-xs text-[#6F6A60]">Configure questions, pass thresholds, and automatically broadcast to qualified students.</p>
              </div>
              <button onClick={() => setIsBuilderOpen(false)} className="text-[#6F6A60] hover:text-[#1B1B1B]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handlePublish} className="space-y-4 text-xs">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-[#1B1B1B] block mb-1">Assessment Title</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Distributed Sliding-Window Rate Limiter Challenge"
                    className="w-full p-2.5 bg-[#F6F4EE] border border-[#E8E5DD] rounded-xl text-[#1B1B1B]"
                  />
                </div>
                <div>
                  <label className="font-semibold text-[#1B1B1B] block mb-1">Target Engineering Role</label>
                  <input
                    type="text"
                    required
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    placeholder="e.g. Backend Platform Engineer"
                    className="w-full p-2.5 bg-[#F6F4EE] border border-[#E8E5DD] rounded-xl text-[#1B1B1B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="font-semibold text-[#1B1B1B] block mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full p-2 bg-[#F6F4EE] border border-[#E8E5DD] rounded-xl text-[#1B1B1B]"
                  >
                    <option value="Backend">Backend</option>
                    <option value="Frontend">Frontend</option>
                    <option value="AI & ML">AI &amp; ML</option>
                    <option value="DevOps">DevOps</option>
                    <option value="Database">Database</option>
                    <option value="Systems">Systems</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-[#1B1B1B] block mb-1">Difficulty Tier</label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value as any)}
                    className="w-full p-2 bg-[#F6F4EE] border border-[#E8E5DD] rounded-xl text-[#1B1B1B]"
                  >
                    <option value="Easy">Easy (10 XP)</option>
                    <option value="Medium">Medium (25 XP)</option>
                    <option value="Advanced">Advanced (50 XP)</option>
                    <option value="Expert">Expert (100 XP)</option>
                    <option value="Boss">Boss (250 XP)</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-[#1B1B1B] block mb-1">Pass Threshold</label>
                  <select
                    value={passThreshold}
                    onChange={(e) => setPassThreshold(Number(e.target.value))}
                    className="w-full p-2 bg-[#F6F4EE] border border-[#E8E5DD] rounded-xl text-[#1B1B1B]"
                  >
                    <option value={60}>60% (Foundational)</option>
                    <option value={70}>70% (Standard)</option>
                    <option value={75}>75% (Strict)</option>
                    <option value={80}>80% (Enterprise)</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-[#1B1B1B] block mb-1">Time Limit (Mins)</label>
                  <input
                    type="number"
                    value={estimatedMinutes}
                    onChange={(e) => setEstimatedMinutes(Number(e.target.value))}
                    className="w-full p-2 bg-[#F6F4EE] border border-[#E8E5DD] rounded-xl text-[#1B1B1B]"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-[#1B1B1B] block mb-1">Skills Verified (Comma separated)</label>
                <input
                  type="text"
                  value={skillsGained}
                  onChange={(e) => setSkillsGained(e.target.value)}
                  placeholder="e.g. Redis, Token Bucket, gRPC, Go"
                  className="w-full p-2.5 bg-[#F6F4EE] border border-[#E8E5DD] rounded-xl text-[#1B1B1B]"
                />
              </div>

              {/* Question Configuration Section */}
              <div className="p-4 bg-[#F6F4EE] rounded-xl border border-[#E8E5DD] space-y-3">
                <span className="font-bold text-[#1B1B1B] block uppercase tracking-wider text-[11px]">
                  Primary Technical Question / Evaluation Rubric
                </span>

                <div>
                  <label className="font-semibold text-[#1B1B1B] block mb-1">Question Prompt</label>
                  <textarea
                    rows={2}
                    required
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                    placeholder="e.g. How does Redis sliding-window log maintain atomic concurrency across distributed worker nodes?"
                    className="w-full p-2 bg-white border border-[#E8E5DD] rounded-lg text-[#1B1B1B]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#1B1B1B] block mb-1">Code Snippet (Optional)</label>
                  <textarea
                    rows={2}
                    value={codeSnippet}
                    onChange={(e) => setCodeSnippet(e.target.value)}
                    placeholder="e.g. MULTI; ZREMRANGEBYSCORE key 0 now-window; ZADD key now uuid; EXEC"
                    className="w-full p-2 bg-white border border-[#E8E5DD] rounded-lg font-mono text-[11px] text-[#1B1B1B]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="font-semibold text-[#1B1B1B] block">Answer Options (Select correct answer)</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="correct"
                      checked={correctOpt === 0}
                      onChange={() => setCorrectOpt(0)}
                    />
                    <input
                      type="text"
                      value={opt1}
                      onChange={(e) => setOpt1(e.target.value)}
                      placeholder="Option 1 (Correct by default)"
                      className="w-full p-1.5 bg-white border border-[#E8E5DD] rounded-md"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="correct"
                      checked={correctOpt === 1}
                      onChange={() => setCorrectOpt(1)}
                    />
                    <input
                      type="text"
                      value={opt2}
                      onChange={(e) => setOpt2(e.target.value)}
                      placeholder="Option 2 (Distractor)"
                      className="w-full p-1.5 bg-white border border-[#E8E5DD] rounded-md"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="correct"
                      checked={correctOpt === 2}
                      onChange={() => setCorrectOpt(2)}
                    />
                    <input
                      type="text"
                      value={opt3}
                      onChange={(e) => setOpt3(e.target.value)}
                      placeholder="Option 3 (Distractor)"
                      className="w-full p-1.5 bg-white border border-[#E8E5DD] rounded-md"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-[#1B1B1B] block mb-1">Engineering Explanation</label>
                  <input
                    type="text"
                    value={explanation}
                    onChange={(e) => setExplanation(e.target.value)}
                    placeholder="e.g. Atomic MULTI/EXEC pipelines prevent race conditions across concurrent workers."
                    className="w-full p-2 bg-white border border-[#E8E5DD] rounded-lg text-[#1B1B1B]"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t border-[#E8E5DD]">
                <button
                  type="button"
                  onClick={() => setIsBuilderOpen(false)}
                  className="px-4 py-2 rounded-xl bg-[#F6F4EE] text-[#6F6A60] font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#1B1B1B] text-white font-semibold hover:bg-[#C76A2A] transition-colors flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Publish to Platform Catalog</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </PortalLayout>
  );
}
