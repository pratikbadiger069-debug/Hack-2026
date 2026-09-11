'use client';

import React, { useEffect, useState } from 'react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { useAppStore } from '@/lib/store';

export function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#F6F4EE] text-[#1B1B1B] selection:bg-[#C76A2A]/20 selection:text-[#C76A2A]">
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
