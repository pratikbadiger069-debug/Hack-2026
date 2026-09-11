'use client';

import React from 'react';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { ShieldCheck, Database, Key, Server } from 'lucide-react';

export default function AdminSettingsPage() {
  return (
    <PortalLayout>
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200">
          <h1 className="text-2xl font-bold text-slate-900">Global System Settings</h1>
          <p className="text-xs text-slate-500 mt-1">
            Configure enterprise security policies, pgvector indexing intervals, and audit log exports.
          </p>
        </div>

        <div className="saas-card p-6 space-y-4 max-w-2xl">
          <h2 className="text-sm font-bold text-slate-900 pb-3 border-b border-slate-100">
            Vector Search & AI Configuration
          </h2>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Vector Indexing Method</label>
            <input
              type="text"
              readOnly
              defaultValue="PostgreSQL pgvector (HNSW Indexing - 1536 Dimensions)"
              className="w-full px-3 py-2 text-xs bg-slate-100 border border-slate-200 rounded-lg text-slate-600 font-mono"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Global Audit Log Level</label>
            <select className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900">
              <option>INFO (Standard Enterprise Logging)</option>
              <option>DEBUG (Verbose Vector Retrieval Scoring)</option>
              <option>WARN (Anomalies Only)</option>
            </select>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
