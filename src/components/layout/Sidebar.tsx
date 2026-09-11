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
      badge: studentProfile.builderScores.overall > 0 ? `${studentProfile.builderScores.overall}` : undefined,
    },
    { name: 'Career Copilot', href: '/student/career-copilot', icon: Bot, highlight: true },
    {
      name: 'Opportunities',
      href: '/student/opportunities',
      icon: Compass,
      badge: '6',
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
    <aside className="w-60 bg-[#FAF9F5] border-r border-[#ECEAE4] flex flex-col shrink-0 min-h-[calc(100vh-4rem)] p-3">
      {/* Navigation Links */}
      <nav className="flex-1 space-y-1">
        {links.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== '/student' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-3.5 py-2.5 text-xs rounded-xl font-medium transition-all group btn-anthropic ${
                isActive
                  ? 'bg-[#F0EEE6] text-[#1F1F1F] font-semibold shadow-2xs'
                  : 'text-[#6B6B6B] hover:text-[#1F1F1F] hover:bg-[#F5F3EB]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon
                  className={`w-4 h-4 transition-colors ${
                    isActive
                      ? 'text-[#D97706]'
                      : item.highlight
                      ? 'text-[#D97706]'
                      : 'text-[#6B6B6B] group-hover:text-[#1F1F1F]'
                  }`}
                />
                <span>{item.name}</span>
              </div>

              {item.badge && (
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                    isActive
                      ? 'bg-[#E3E0D5] text-[#1F1F1F]'
                      : 'bg-[#ECEAE4] text-[#6B6B6B] group-hover:bg-[#E3E0D5]'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Subtle Quote / Philosophy at Bottom */}
      <div className="p-3 bg-[#FFFFFF] rounded-2xl border border-[#ECEAE4] text-[11px] text-[#6B6B6B] space-y-1 mt-auto shadow-2xs">
        <div className="font-semibold text-[#1F1F1F] flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-[#D97706]" />
          <span>SkillBridge V3</span>
        </div>
        <p className="leading-snug text-[10px]">
          Build proof. Not just profiles.
        </p>
      </div>
    </aside>
  );
}
