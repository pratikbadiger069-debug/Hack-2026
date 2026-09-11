'use client';

import React, { useEffect, useState } from 'react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { useAppStore } from '@/lib/store';

export function PortalLayout({ children }: { children: React.ReactNode }) {
  const { themeColor, colorMode } = useAppStore();
  const [mounted, setMounted] = useState(false);
  const [systemDark, setSystemDark] = useState(false);

  useEffect(() => {
    setMounted(true);
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    setSystemDark(media.matches);
    const listener = (e: MediaQueryListEvent) => setSystemDark(e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, []);

  const isDark = colorMode === 'dark' || (colorMode === 'system' && systemDark);

  // Normalize theme accent (blue, orange, green, gray)
  const accentKey = themeColor.includes('orange')
    ? 'orange'
    : themeColor.includes('green')
    ? 'green'
    : themeColor.includes('gray') || themeColor.includes('monochrome')
    ? 'gray'
    : 'blue';

  return (
    <div
      data-accent={mounted ? accentKey : 'blue'}
      className={`min-h-screen flex flex-col transition-colors duration-150 ${
        mounted && isDark ? 'dark bg-[#0F1115] text-[#F0F6FC]' : 'bg-[#FAF9F5] text-[#1F2328]'
      }`}
    >
      <Navbar />
      <div className="flex-1 flex max-w-[1440px] w-full mx-auto">
        <Sidebar />
        <main className="flex-1 p-6 md:p-8 overflow-y-auto min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}
