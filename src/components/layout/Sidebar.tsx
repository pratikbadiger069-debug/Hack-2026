'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import {
  LayoutDashboard,
  User,
  Award,
  ShieldCheck,
  CheckSquare,
  Bot,
  GitPullRequest,
  Map,
  BookOpen,
  Briefcase,
  Sparkles,
  Bell,
  Settings,
  Users,
  Building,
  FileSpreadsheet,
  LineChart,
  UserCheck,
  TrendingUp,
  Compass,
  FileCheck,
  Code,
  Layers,
} from 'lucide-react';

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  highlight?: boolean;
}

export function Sidebar() {
  const pathname = usePathname();
  const { currentRole, isDemoMode, studentProfile, jobs } = useAppStore();

  const studentLinks: NavItem[] = [
    { name: 'Home', href: '/student', icon: LayoutDashboard },
    {
      name: 'My Journey',
      href: '/student/journey',
      icon: Award,
      badge: isDemoMode ? 'Score 885' : studentProfile.builderScores.overall > 0 ? `Score ${studentProfile.builderScores.overall}` : undefined,
    },
    { name: 'Career Copilot', href: '/student/career-copilot', icon: Bot, highlight: true },
    {
      name: 'Opportunities',
      href: '/student/opportunities',
      icon: Compass,
      badge: '6 Matched',
    },
    { name: 'Settings', href: '/student/settings', icon: Settings },
  ];

  const instituteLinks: NavItem[] = [
    { name: 'Dashboard', href: '/institute', icon: LayoutDashboard },
    { name: 'Students Roster', href: '/institute/students', icon: Users, badge: isDemoMode ? '320' : undefined },
    { name: 'Departments', href: '/institute/departments', icon: Building },
    { name: 'Curriculum Analysis', href: '/institute/curriculum', icon: FileSpreadsheet, highlight: true },
    { name: 'Placement Cell', href: '/institute/placement', icon: UserCheck },
    { name: 'Assessments', href: '/institute/assessments', icon: CheckSquare },
    { name: 'Reports', href: '/institute/reports', icon: LineChart },
    { name: 'Settings', href: '/institute/settings', icon: Settings },
  ];

  const industryLinks: NavItem[] = [
    { name: 'Dashboard', href: '/industry', icon: LayoutDashboard },
    { name: 'Job Requirements', href: '/industry/jobs', icon: Briefcase, badge: isDemoMode ? '3 Active' : jobs.length > 0 ? `${jobs.length} Active` : undefined },
    { name: 'Talent Discovery', href: '/industry/talent', icon: Sparkles, highlight: true },
    { name: 'Assignments', href: '/industry/assignments', icon: Code },
    { name: 'Pipeline', href: '/industry/pipeline', icon: Layers, badge: 'Kanban' },
    { name: 'Reports', href: '/industry/reports', icon: LineChart },
    { name: 'Settings', href: '/industry/settings', icon: Settings },
  ];

  const adminLinks: NavItem[] = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Skill Demand Intelligence', href: '/admin/demand', icon: TrendingUp, highlight: true },
    { name: 'User Management', href: '/admin/users', icon: Users },
    { name: 'Content Management', href: '/admin/content', icon: FileCheck },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  const links: NavItem[] =
    currentRole === 'student'
      ? studentLinks
      : currentRole === 'institute'
      ? instituteLinks
      : currentRole === 'industry'
      ? industryLinks
      : adminLinks;

  const roleTitle =
    currentRole === 'student'
      ? 'Student Hub'
      : currentRole === 'institute'
      ? 'Institute Administration'
      : currentRole === 'industry'
      ? 'Talent Intelligence'
      : 'Global Platform Admin';

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col shrink-0 min-h-[calc(100vh-4rem)]">
      {/* Portal Header */}
      <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
        <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          {roleTitle}
        </span>
        <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium">
          Enterprise
        </span>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 px-3 py-3 space-y-1 overflow-y-auto">
        {links.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-3 py-2 text-xs rounded-lg font-medium transition-all group ${
                isActive
                  ? 'bg-blue-50 text-blue-700 font-semibold shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              } ${item.highlight && !isActive ? 'text-blue-600' : ''}`}
            >
              <div className="flex items-center gap-2.5">
                <Icon
                  className={`w-4 h-4 transition-colors ${
                    isActive
                      ? 'text-blue-600'
                      : item.highlight
                      ? 'text-blue-600'
                      : 'text-slate-400 group-hover:text-slate-600'
                  }`}
                />
                <span>{item.name}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer Status */}
      <div className="p-3 border-t border-slate-100 bg-slate-50/50 m-2 rounded-lg">
        <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
          <span>Engine Status</span>
          <span className="flex items-center gap-1 text-emerald-700 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Connected
          </span>
        </div>
        <p className="text-[10px] text-slate-400">
          Academia–Industry Verification Pipeline Online
        </p>
      </div>
    </aside>
  );
}
