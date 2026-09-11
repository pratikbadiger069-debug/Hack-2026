'use client';

import React, { useState } from 'react';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { useAppStore } from '@/lib/store';
import { mockAssessments, mockLeaderboard } from '@/lib/mock-data';
import { Assessment } from '@/types';
import {
  CheckSquare,
  Award,
  Clock,
  Play,
  CheckCircle2,
  Trophy,
  Filter,
  BarChart2,
  Code,
  Sparkles,
  AlertCircle,
  X,
} from 'lucide-react';

export default function StudentAssessmentsPage() {
  const { completeAssessment } = useAppStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeQuiz, setActiveQuiz] = useState<Assessment | null>(null);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizFinished, setQuizFinished] = useState(false);
  const [finalScore, setFinalScore] = useState<number | null>(null);

  const categories = ['All', 'Programming', 'AI', 'Cloud', 'Aptitude', 'Communication'];

  const filteredAssessments = mockAssessments.filter(
    (a) => selectedCategory === 'All' || a.category === selectedCategory
  );

  const handleStartAssessment = (assessment: Assessment) => {
    setActiveQuiz(assessment);
    setCurrentQIndex(0);
    setSelectedAnswers({});
    setQuizFinished(false);
    setFinalScore(null);
  };

  const handleAnswerSelect = (optionIdx: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQIndex]: optionIdx,
    });
  };

  const handleSubmitQuiz = () => {
    if (!activeQuiz || !activeQuiz.questions) return;
    let correct = 0;
    activeQuiz.questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) {
        correct++;
      }
    });
    const calculatedScore = Math.round((correct / activeQuiz.questions.length) * 100);
    setFinalScore(calculatedScore);
    setQuizFinished(true);
    completeAssessment(activeQuiz.id, calculatedScore);
  };

  return (
    <PortalLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                Automated Evaluation Gateway
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-500">Industry Calibrated</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Assessments & Benchmarks</h1>
            <p className="text-xs text-slate-500 mt-1">
              Test domain knowledge, programming concurrency, system design, and quantitative aptitude.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <span className="text-xs font-bold text-slate-900">Leaderboard Rank #3</span>
              <p className="text-[11px] text-emerald-600 font-medium">Top 1.5% Percentile</p>
            </div>
            <div className="p-2.5 bg-amber-50 text-amber-600 rounded-lg border border-amber-200">
              <Trophy className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-1.5 bg-white p-2.5 rounded-lg border border-slate-200 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors shrink-0 ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Assessments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAssessments.map((item) => (
            <div key={item.id} className="saas-card p-5 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    {item.category}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      item.difficulty === 'Hard'
                        ? 'bg-rose-50 text-rose-700 border-rose-200'
                        : item.difficulty === 'Medium'
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    }`}
                  >
                    {item.difficulty}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 line-clamp-2">{item.title}</h3>

                <div className="flex items-center gap-3 text-xs text-slate-500 mt-3">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {item.durationMinutes} mins
                  </span>
                  <span>•</span>
                  <span>{item.questionsCount} Questions</span>
                </div>

                {/* Skills Tested */}
                <div className="flex flex-wrap gap-1 mt-3">
                  {item.skillsEvaluated.map((skill) => (
                    <span
                      key={skill}
                      className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Assessment Action */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                {item.completed ? (
                  <div className="flex items-center justify-between w-full">
                    <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Score: {item.score}% ({item.percentile}th %ile)
                    </span>
                    <button
                      onClick={() => handleStartAssessment(item)}
                      className="text-xs text-blue-600 hover:underline font-medium"
                    >
                      Retake
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleStartAssessment(item)}
                    className="w-full py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-xs flex items-center justify-center gap-1.5"
                  >
                    <Play className="w-3.5 h-3.5" />
                    Start Assessment
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Global Percentile Leaderboard */}
        <div className="saas-card p-6">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-500" />
              <div>
                <h2 className="text-sm font-bold text-slate-900">National Collegiate Leaderboard</h2>
                <p className="text-xs text-slate-500">Ranked by Builder Score, verified competencies & problem solving</p>
              </div>
            </div>
            <span className="text-xs font-semibold text-blue-600">Updated Daily</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-slate-400 font-semibold border-b border-slate-100">
                  <th className="pb-2.5 pl-2">Rank</th>
                  <th className="pb-2.5">Candidate</th>
                  <th className="pb-2.5">College & Dept</th>
                  <th className="pb-2.5 text-center">Verified Skills</th>
                  <th className="pb-2.5 text-right pr-2">Builder Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {mockLeaderboard.map((entry) => {
                  const isUser = entry.rank === 3;
                  return (
                    <tr
                      key={entry.rank}
                      className={`hover:bg-slate-50 transition-colors ${
                        isUser ? 'bg-blue-50/40 font-semibold' : ''
                      }`}
                    >
                      <td className="py-3 pl-2">
                        <span
                          className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                            entry.rank === 1
                              ? 'bg-amber-100 text-amber-800'
                              : entry.rank === 2
                              ? 'bg-slate-200 text-slate-700'
                              : entry.rank === 3
                              ? 'bg-amber-700/20 text-amber-900'
                              : 'text-slate-500'
                          }`}
                        >
                          {entry.rank}
                        </span>
                      </td>
                      <td className="py-3">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={entry.avatar}
                            alt={entry.studentName}
                            className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-200"
                          />
                          <div>
                            <span className="text-slate-900">{entry.studentName}</span>
                            <span className="block text-[10px] text-slate-400 font-normal">
                              {entry.badge}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 text-slate-600">
                        {entry.college} • <span className="font-mono">{entry.department}</span>
                      </td>
                      <td className="py-3 text-center">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-100 font-medium text-[11px]">
                          <CheckCircle2 className="w-3 h-3" />
                          {entry.verifiedSkillsCount} Skills
                        </span>
                      </td>
                      <td className="py-3 text-right pr-2 font-bold text-slate-900">
                        {entry.builderScore} / 1000
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Live Interactive Assessment Runner Modal */}
        {activeQuiz && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
            <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{activeQuiz.title}</h3>
                  <span className="text-[11px] text-slate-500">
                    {activeQuiz.category} • {activeQuiz.durationMinutes} Minutes
                  </span>
                </div>
                <button
                  onClick={() => setActiveQuiz(null)}
                  className="p-1 text-slate-400 hover:text-slate-600 rounded-md hover:bg-slate-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {!quizFinished ? (
                <div className="p-6 space-y-6">
                  {/* Question Progress */}
                  <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-100">
                    <span>
                      Question {currentQIndex + 1} of {activeQuiz.questions?.length || 2}
                    </span>
                    <span className="flex items-center gap-1 text-blue-600 font-medium">
                      <Clock className="w-3.5 h-3.5" /> Live Assessment Mode
                    </span>
                  </div>

                  {/* Question Content */}
                  {activeQuiz.questions && activeQuiz.questions[currentQIndex] ? (
                    <div className="space-y-4">
                      <h4 className="text-sm font-semibold text-slate-900 leading-snug">
                        {activeQuiz.questions[currentQIndex].question}
                      </h4>

                      <div className="space-y-2.5">
                        {activeQuiz.questions[currentQIndex].options.map((opt, oIdx) => {
                          const isSelected = selectedAnswers[currentQIndex] === oIdx;
                          return (
                            <button
                              key={oIdx}
                              type="button"
                              onClick={() => handleAnswerSelect(oIdx)}
                              className={`w-full p-3 rounded-lg border text-left text-xs font-medium transition-all ${
                                isSelected
                                  ? 'border-blue-600 bg-blue-50/40 text-blue-900 ring-1 ring-blue-600'
                                  : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                              }`}
                            >
                              <span className="inline-block w-5 font-bold text-slate-400">
                                {String.fromCharCode(65 + oIdx)}.
                              </span>
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-6 text-xs text-slate-500">
                      Standardized algorithmic simulation running...
                    </div>
                  )}

                  {/* Modal Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <button
                      type="button"
                      disabled={currentQIndex === 0}
                      onClick={() => setCurrentQIndex((prev) => Math.max(0, prev - 1))}
                      className="px-3.5 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg disabled:opacity-40"
                    >
                      Previous
                    </button>

                    {activeQuiz.questions && currentQIndex < activeQuiz.questions.length - 1 ? (
                      <button
                        type="button"
                        onClick={() => setCurrentQIndex((prev) => prev + 1)}
                        className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                      >
                        Next Question
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleSubmitQuiz}
                        className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 shadow-xs"
                      >
                        Submit & Calculate Percentile
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                /* Quiz Results View */
                <div className="p-6 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900">Assessment Completed!</h4>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 max-w-sm mx-auto">
                    <span className="text-xs text-slate-500 uppercase tracking-wider block">Final Score</span>
                    <span className="text-3xl font-black text-blue-600">{finalScore}%</span>
                    <p className="text-xs text-emerald-700 font-medium mt-1">
                      +10 Builder Pts added to Problem Solving
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveQuiz(null)}
                    className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                  >
                    Return to Assessments
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </PortalLayout>
  );
}
