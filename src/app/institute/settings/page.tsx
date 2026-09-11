'use client';

import React from 'react';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { Building2, ShieldCheck, Mail, Users, Save } from 'lucide-react';

export default function InstituteSettingsPage() {
  return (
    <PortalLayout>
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200">
          <h1 className="text-2xl font-bold text-slate-900">Institute Configuration</h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage institutional verification authority, faculty evaluators, and API webhooks.
          </p>
        </div>

        <div className="saas-card p-6 space-y-4 max-w-2xl">
          <h2 className="text-sm font-bold text-slate-900 pb-3 border-b border-slate-100">
            Institutional Profile
          </h2>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">University / Institute Name</label>
            <input
              type="text"
              defaultValue="Apex Institute of Technology & Science"
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Official Dean Email</label>
            <input
              type="email"
              defaultValue="radhika.sen@apexinstitute.edu"
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
            />
          </div>
          <div className="pt-2">
            <button className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700">
              Save Institutional Profile
            </button>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
