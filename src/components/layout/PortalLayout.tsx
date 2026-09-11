'use client';

import React from 'react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';

export function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F5] text-[#1F1F1F]">
      <Navbar />
      <div className="flex-1 flex max-w-[1400px] w-full mx-auto">
        <Sidebar />
        <main className="flex-1 p-6 md:p-10 overflow-y-auto min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}
