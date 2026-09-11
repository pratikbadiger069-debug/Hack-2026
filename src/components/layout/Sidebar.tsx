'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import {
  LayoutDashboard,
  Compass,
  Bot,
  Settings,
  Users,
  Building,
  FileSpreadsheet,
  LineChart,
  UserCheck,
  TrendingUp,
  Briefcase,
  FileCheck,
  Code,
  Layers,
  Sparkles,
  Award,
  Swords,
  Trophy,
  Flame,
  Zap,
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
  const { currentRole, studentProfile, level, streakDays } = useAppStore();

  const studentLinks: NavItem[] = [
    { name: 'Home', href: '/student', icon: LayoutDashboard },
    {
      name: 'My Journey',
      href: '/student/journey',
      icon: Award,
      badge: `Lv.${level}`,
    },
    {
      name: 'Assessments',
      href: '/student/assessments',
      icon: Swords,
      badge: 'Quests',
      highlight: true,
    },
    { name: 'Career Copilot', href: '/student/career-copilot', icon: Bot },
    {
      name: 'Opportunities',
      href: '/student/opportunities',
      icon: Compass,
      badge: '6',
    },
    {
      name: 'Leaderboard',
      href: '/student/leaderboard',
      icon: Trophy,
    },
    { name: 'Settings', href: '/student/settings', icon: Settings },
  ];

  const instituteLinks: NavItem[] = [
    { name: 'Dashboard', href: '/institute', icon: LayoutDashboard },
    { name: 'Students Roster', href: '/institute/students', icon: Users },
    { name: 'Departments', href: '/institute/departments', icon: Building },
    { name: 'Curriculum Analysis', href: '/institute/curriculum', icon: FileSpreadsheet, highlight: true },
    { name: 'Placement Cell', href: '/institute/placement', icon: UserCheck },
    { name: 'Reports', href: '/institute/reports', icon: LineChart },
    { name: 'Settings', href: '/institute/settings', icon: Settings },
  ];

  const industryLinks: NavItem[] = [
    { name: 'Dashboard', href: '/industry', icon: LayoutDashboard },
    { name: 'Job Requirements', href: '/industry/jobs', icon: Briefcase },
    { name: 'Talent Discovery', href: '/industry/talent', icon: Sparkles, highlight: true },
    { name: 'Assignments', href: '/industry/assignments', icon: Code },
    { name: 'Pipeline', href: '/industry/pipeline', icon: Layers },
    { name: 'Reports', href: '/industry/reports', icon: LineChart },
    { name: 'Settings', href: '/industry/settings', icon: Settings },
  ];

  const adminLinks: NavItem[] = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Skill Demand Intel', href: '/admin/demand', icon: TrendingUp, highlight: true },
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

  return (
    <aside className="w-60 bg-transparent border-r border-zinc-200 dark:border-zinc-800 flex flex-col shrink-0 min-h-[calc(100vh-4rem)] p-3">
      {/* Navigation Links */}
      <nav className="flex-1 space-y-1">
        {links.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== '/student' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-3.5 py-2.5 text-xs rounded-xl font-medium transition-all group lift-hover ${
                isActive
                  ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-semibold shadow-sm'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon
                  className={`w-4 h-4 transition-colors ${
                    isActive
                      ? 'text-blue-400 dark:text-blue-600'
                      : item.highlight
                      ? 'text-orange-500'
                      : 'text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white'
                  }`}
                />
                <span>{item.name}</span>
              </div>

              {item.badge && (
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-semibold ${
                    isActive
                      ? 'bg-zinc-800 dark:bg-zinc-100 text-zinc-300 dark:text-zinc-700'
                      : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Builder Quick Card at Bottom */}
      <div className="p-3.5 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 text-xs space-y-2 mt-auto shadow-2xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 font-bold text-zinc-900 dark:text-white text-xs">
            <Flame className="w-4 h-4 text-orange-500" />
            <span>Builder Tier</span>
          </div>
          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold">
            Lv. {level}
          </span>
        </div>
        <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-snug">
          Complete quests to unlock tier badges and placement fast-tracks.
        </p>
      </div>
    </aside>
  );
}
