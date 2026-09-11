'use client';

import React, { useState } from 'react';
import { PortalLayout } from '@/components/layout/PortalLayout';
import { mockPlatformUsers } from '@/lib/mock-data';
import { UserRole } from '@/types';
import { Users, Search, Filter, ShieldCheck, UserCheck, MoreVertical, Plus } from 'lucide-react';

export default function AdminUsersPage() {
  const [roleFilter, setRoleFilter] = useState<string>('All');
  const [search, setSearch] = useState('');

  const filtered = mockPlatformUsers.filter((u) => {
    const matchRole = roleFilter === 'All' || u.role === roleFilter;
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.organization.toLowerCase().includes(search.toLowerCase());
    return matchRole && matchSearch;
  });

  return (
    <PortalLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                Governance & RBAC
              </span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Enterprise User Management</h1>
            <p className="text-xs text-slate-500 mt-1">
              Audit and manage Students, Institute Administrators, Recruiters, and Platform Security Operators.
            </p>
          </div>
          <button className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-xs flex items-center gap-1.5 self-start md:self-auto">
            <Plus className="w-3.5 h-3.5" />
            Provision User
          </button>
        </div>

        {/* Filter & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-lg border border-slate-200">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, or org..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-600 text-slate-900"
            />
          </div>

          <div className="flex items-center gap-1.5 self-start sm:self-auto">
            {['All', 'student', 'institute', 'industry', 'admin'].map((role) => (
              <button
                key={role}
                onClick={() => setRoleFilter(role)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md capitalize transition-colors ${
                  roleFilter === role
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {role === 'All' ? 'All Roles' : role}
              </button>
            ))}
          </div>
        </div>

        {/* Users Table */}
        <div className="saas-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-slate-400 font-semibold border-b border-slate-100 bg-slate-50/50">
                  <th className="py-3 pl-4">User</th>
                  <th className="py-3">Role</th>
                  <th className="py-3">Organization</th>
                  <th className="py-3">Status</th>
                  <th className="py-3">Joined Date</th>
                  <th className="py-3 pr-4 text-right">Activity Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 pl-4">
                      <div className="font-bold text-slate-900">{user.name}</div>
                      <div className="text-[11px] text-slate-400">{user.email}</div>
                    </td>
                    <td className="py-3.5">
                      <span className="px-2 py-0.5 rounded font-bold text-[10px] uppercase tracking-wider bg-blue-50 text-blue-700">
                        {user.role}
                      </span>
                    </td>
                    <td className="py-3.5 text-slate-700 font-medium">{user.organization}</td>
                    <td className="py-3.5">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold">
                        {user.status}
                      </span>
                    </td>
                    <td className="py-3.5 text-slate-500">{user.joinedDate}</td>
                    <td className="py-3.5 pr-4 text-right font-bold text-blue-600">
                      {user.activityScore} / 100
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
