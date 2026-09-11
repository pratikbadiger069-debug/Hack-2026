'use client';

import React, { useState } from 'react';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { BookOpen, Clock, Award, CheckCircle2, Play, ExternalLink, Sparkles } from 'lucide-react';

export default function StudentCoursesPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const courses = [
    {
      id: 'crs-1',
      title: 'High-Throughput Model Serving with vLLM & TensorRT',
      provider: 'SkillBridge Masterclass',
      category: 'AI Systems',
      duration: '4 Weeks',
      level: 'Advanced',
      status: 'In Progress',
      progress: 65,
      instructor: 'Dr. Yann LeCun Advisory Series',
      enrolled: true,
    },
    {
      id: 'crs-2',
      title: 'Production FastAPI & Distributed Systems Architecture',
      provider: 'Coursera Enterprise',
      category: 'Backend',
      duration: '5 Weeks',
      level: 'Advanced',
      status: 'Completed',
      progress: 100,
      instructor: 'FastAPI Core Maintainers',
      enrolled: true,
    },
    {
      id: 'crs-3',
      title: 'Vector Embeddings, HNSW Graphs & pgvector Internals',
      provider: 'DeepLearning.AI',
      category: 'Databases',
      duration: '3 Weeks',
      level: 'Advanced',
      status: 'Completed',
      progress: 100,
      instructor: 'Andrew Ng & Guest Engineers',
      enrolled: true,
    },
    {
      id: 'crs-4',
      title: 'Kubernetes for Machine Learning (KubeFlow & Triton)',
      provider: 'Cloud Native Academy',
      category: 'DevOps',
      duration: '4 Weeks',
      level: 'Advanced',
      status: 'Not Enrolled',
      progress: 0,
      instructor: 'CNCF Certified Architects',
      enrolled: false,
    },
    {
      id: 'crs-5',
      title: 'Enterprise Event Streaming with Apache Kafka',
      provider: 'Confluent Developer Hub',
      category: 'Backend',
      duration: '4 Weeks',
      level: 'Intermediate',
      status: 'Not Enrolled',
      progress: 0,
      instructor: 'Apache Kafka PMC',
      enrolled: false,
    },
  ];

  const categories = ['All', 'AI Systems', 'Backend', 'Databases', 'DevOps'];

  const filtered = courses.filter((c) => activeCategory === 'All' || c.category === activeCategory);

  return (
    <PortalLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                Curated SkillBridge Catalog
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-500">Industry-Aligned Modules</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Courses & Curriculum Upskilling</h1>
            <p className="text-xs text-slate-500 mt-1">
              Deep engineering courses mapped directly to bridge your verified skill gaps.
            </p>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-1.5 bg-white p-2.5 rounded-lg border border-slate-200 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors shrink-0 ${
                activeCategory === cat
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((course) => (
            <div key={course.id} className="saas-card p-5 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    {course.category}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      course.status === 'Completed'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : course.status === 'In Progress'
                        ? 'bg-blue-50 text-blue-700 border-blue-200'
                        : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    {course.status}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 line-clamp-2">{course.title}</h3>
                <p className="text-xs text-slate-500 mt-1">{course.instructor}</p>

                <div className="flex items-center gap-3 text-xs text-slate-500 mt-3 pt-2 border-t border-slate-100">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {course.duration}
                  </span>
                  <span>•</span>
                  <span>{course.provider}</span>
                </div>

                {course.enrolled && (
                  <div className="mt-3 space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-500">Progress</span>
                      <span className="font-bold text-blue-600">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-blue-600 h-full rounded-full" style={{ width: `${course.progress}%` }} />
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-100">
                {course.status === 'Completed' ? (
                  <button className="w-full py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center justify-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Verified Certificate Issued
                  </button>
                ) : course.status === 'In Progress' ? (
                  <button className="w-full py-1.5 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-1 shadow-xs">
                    <Play className="w-3.5 h-3.5" />
                    Continue Module
                  </button>
                ) : (
                  <button className="w-full py-1.5 text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100">
                    Enroll Course
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </PortalLayout>
  );
}
