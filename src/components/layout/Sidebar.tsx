'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import {
  Home,
  MapPin,
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
  CheckCircle2,
  Compass,
  FileText,
} from 'lucide-react';

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

export function Sidebar() {
  const pathname = usePathname();
  const { currentRole, level, xp } = useAppStore();

  const studentLinks: NavItem[] = [
    { name: 'Home', href: '/student', icon: Home },
    { name: 'My Journey', href: '/student/journey', icon: MapPin },
    { name: 'Assessments', href: '/student/assessments', icon: CheckCircle2 },
    { name: 'Career Copilot', href: '/student/career-copilot', icon: Bot },
    { name: 'Opportunities', href: '/student/opportunities', icon: Compass },
    { name: 'Settings', href: '/student/settings', icon: Settings },
  ];

  const instituteLinks: NavItem[] = [
    { name: 'Dashboard', href: '/institute', icon: Home },
    { name: 'Students Roster', href: '/institute/students', icon: Users },
    { name: 'Departments', href: '/institute/departments', icon: Building },
    { name: 'Curriculum Analysis', href: '/institute/curriculum', icon: FileSpreadsheet },
    { name: 'Placement Cell', href: '/institute/placement', icon: UserCheck },
    { name: 'Reports', href: '/institute/reports', icon: LineChart },
    { name: 'Settings', href: '/institute/settings', icon: Settings },
  ];

  const industryLinks: NavItem[] = [
    { name: 'Dashboard', href: '/industry', icon: Home },
    { name: 'Job Requirements', href: '/industry/jobs', icon: Briefcase },
    { name: 'Talent Discovery', href: '/industry/talent', icon: Sparkles },
    { name: 'Assignments', href: '/industry/assignments', icon: Code },
    { name: 'Pipeline', href: '/industry/pipeline', icon: Layers },
    { name: 'Reports', href: '/industry/reports', icon: LineChart },
    { name: 'Settings', href: '/industry/settings', icon: Settings },
  ];

  const adminLinks: NavItem[] = [
    { name: 'Dashboard', href: '/admin', icon: Home },
    { name: 'Skill Demand Intel', href: '/admin/demand', icon: TrendingUp },
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
    <aside className="w-56 bg-transparent border-r border-[#E6E4DD] dark:border-[#2D333B] flex flex-col shrink-0 min-h-[calc(100vh-3.5rem)] p-3">
      {/* Navigation Links */}
      <nav className="flex-1 space-y-0.5">
        {links.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-3 py-2 text-xs rounded-lg font-medium transition-colors ${
                isActive
                  ? 'bg-[#1F2328] dark:bg-[#F0F6FC] text-white dark:text-[#0F1115] font-semibold'
                  : 'text-[#656D76] dark:text-[#8B949E] hover:text-[#1F2328] dark:hover:text-[#F0F6FC] hover:bg-black/5 dark:hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon
                  className={`w-4 h-4 ${
                    isActive
                      ? 'text-white dark:text-[#0F1115]'
                      : 'text-[#8C959F] dark:text-[#6E7681]'
                  }`}
                />
                <span>{item.name}</span>
              </div>

              {item.badge && (
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                    isActive
                      ? 'bg-white/20 dark:bg-black/20 text-white dark:text-[#0F1115]'
                      : 'bg-[#E6E4DD] dark:bg-[#2D333B] text-[#656D76] dark:text-[#8B949E]'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Subtle Student Profile Pill */}
      {currentRole === 'student' && (
        <div className="p-3 bg-white dark:bg-[#161B22] rounded-lg border border-[#E6E4DD] dark:border-[#2D333B] text-xs space-y-1.5 mt-auto">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-[#1F2328] dark:text-[#F0F6FC]">
              Level {level} Builder
            </span>
            <span className="text-[10px] font-mono text-[#656D76] dark:text-[#8B949E]">
              {xp} XP
            </span>
          </div>
          <div className="w-full h-1 bg-[#E6E4DD] dark:bg-[#2D333B] rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 dark:bg-blue-400 progress-fill"
              style={{ width: `${Math.min(100, (xp % 1000) / 10)}%` }}
            />
          </div>
        </div>
      )}
    </aside>
  );
}
