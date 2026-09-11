'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { getLevelInfo } from '@/lib/xp-engine';
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
} from 'lucide-react';

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

export function Sidebar() {
  const pathname = usePathname();
  const { currentRole, xp } = useAppStore();
  const levelInfo = getLevelInfo(xp);

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
    <aside className="w-60 bg-transparent border-r border-[#E8E5DD] flex flex-col shrink-0 min-h-[calc(100vh-3.5rem)] p-4">
      {/* Navigation Links */}
      <nav className="flex-1 space-y-1">
        {links.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-3.5 py-2.5 text-xs rounded-xl font-medium transition-all ${
                isActive
                  ? 'bg-[#1B1B1B] text-white font-semibold shadow-xs'
                  : 'text-[#6F6A60] hover:text-[#1B1B1B] hover:bg-black/4'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 ${
                    isActive ? 'text-[#C76A2A]' : 'text-[#6F6A60]'
                  }`}
                />
                <span>{item.name}</span>
              </div>

              {item.badge && (
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-[#E8E5DD] text-[#6F6A60]'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Builder Status Pill */}
      {currentRole === 'student' && (
        <div className="p-3.5 bg-white rounded-2xl border border-[#E8E5DD] text-xs space-y-2 mt-auto shadow-xs">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[11px] font-semibold text-[#1B1B1B]">
                Level {levelInfo.level} {levelInfo.title}
              </span>
              <span className="text-[10px] text-[#6F6A60]">
                Rank #{levelInfo.rank} • {levelInfo.nextLevelXP - levelInfo.currentLevelProgress} XP to Lvl {levelInfo.level + 1}
              </span>
            </div>
            <span className="text-[11px] font-mono font-semibold text-[#C76A2A]">
              {xp} XP
            </span>
          </div>
          <div className="w-full h-1.5 bg-[#E8E5DD] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#C76A2A] rounded-full transition-all duration-500"
              style={{ width: `${levelInfo.percentToNext}%` }}
            />
          </div>
        </div>
      )}
    </aside>
  );
}
