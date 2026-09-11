'use client';

import React, { useEffect, useState } from 'react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { useAppStore } from '@/lib/store';

export function PortalLayout({ children }: { children: React.ReactNode }) {
  const { themeColor, colorMode } = useAppStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      data-theme={mounted ? themeColor : 'ocean-blue'}
      className={`min-h-screen flex flex-col transition-colors duration-200 ${
        mounted && colorMode === 'dark' ? 'dark bg-[#09090B] text-[#FAFAFA]' : 'bg-[#FAFAF8] text-[#09090B]'
      }`}
    >
      <Navbar />
      <div className="flex-1 flex max-w-[1440px] w-full mx-auto">
        <Sidebar />
        <main className="flex-1 p-6 md:p-10 overflow-y-auto min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}
