'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { UserRole } from '@/types';
import {
  Cpu,
  Mail,
  Lock,
  ArrowRight,
  ShieldCheck,
  GraduationCap,
  Building2,
  Briefcase,
  AlertCircle,
  Loader2,
  Share2,
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { loginUser, setDemoMode } = useAppStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('student');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent, customEmail?: string, customPassword?: string) => {
    if (e?.preventDefault) e.preventDefault();
    const loginEmail = customEmail || email;
    const loginPassword = customPassword || password;

    if (!loginEmail || !loginPassword) {
      setErrorMessage('Please enter both email address and password.');
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    try {
      await loginUser(loginEmail, role, loginPassword);
      setLoading(false);
      router.push(`/${role}`);
    } catch (err: any) {
      setLoading(false);
      setErrorMessage(err.message || 'Invalid credentials. Please verify your email and password.');
    }
  };

  const handleQuickFill = (demoEmail: string, demoRole: UserRole, demoPw = 'Demo1234!') => {
    setEmail(demoEmail);
    setPassword(demoPw);
    setRole(demoRole);
    setErrorMessage(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href="/" className="flex items-center justify-center gap-2.5 mb-6 group">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-xs group-hover:bg-blue-700 transition-colors">
            <Cpu className="w-6 h-6" />
          </div>
          <div className="flex flex-col text-left">
            <div className="flex items-center gap-1.5">
              <span className="font-black text-slate-900 tracking-tight text-xl">SKILLBRIDGE</span>
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                Enterprise
              </span>
            </div>
            <span className="text-[10px] text-slate-500 font-medium">Workforce Intelligence Platform</span>
          </div>
        </Link>
        <h2 className="text-center text-2xl font-bold tracking-tight text-slate-900">
          Sign in to your account
        </h2>
        <p className="mt-1 text-center text-xs text-slate-500">
          Or{' '}
          <Link href="/register" className="font-semibold text-blue-600 hover:text-blue-500">
            create a new production account
          </Link>
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-sm border border-slate-200 sm:rounded-xl sm:px-10 space-y-5">
          {errorMessage && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg flex items-start gap-2 text-xs text-rose-700 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Account Role
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { role: 'student' as const, label: 'Student', icon: GraduationCap },
                  { role: 'institute' as const, label: 'Institute', icon: Building2 },
                  { role: 'industry' as const, label: 'Recruiter', icon: Briefcase },
                  { role: 'admin' as const, label: 'Admin', icon: ShieldCheck },
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = role === item.role;
                  return (
                    <button
                      key={item.role}
                      type="button"
                      onClick={() => {
                        setRole(item.role);
                        setErrorMessage(null);
                      }}
                      className={`flex items-center gap-2 p-2.5 rounded-lg border text-xs font-semibold transition-all ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/50 text-blue-700 ring-1 ring-blue-600'
                          : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isSelected ? 'text-blue-600' : 'text-slate-400'}`} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@organization.edu"
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-600"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-700">Password</label>
                <Link
                  href="/forgot-password"
                  className="text-[11px] font-medium text-blue-600 hover:text-blue-700"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-600"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-xs transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <span>Sign In to Production</span>
              )}
            </button>
          </form>

          {/* Quick Demo Pre-fill Seed Credentials */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-700">
              <span>Quick-Fill Verified Test Accounts</span>
              <span className="text-[10px] text-slate-400 font-normal">PW: Demo1234!</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5 pt-1 text-[11px]">
              <button
                type="button"
                onClick={() => handleQuickFill('demo.student@stanford.edu', 'student', 'Demo1234!')}
                className="py-1 px-2 text-[10px] font-medium bg-white border border-slate-200 text-slate-700 rounded hover:border-blue-300 text-left truncate"
              >
                🎓 Student
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill('demo.institute@stanford.edu', 'institute', 'Demo1234!')}
                className="py-1 px-2 text-[10px] font-medium bg-white border border-slate-200 text-slate-700 rounded hover:border-blue-300 text-left truncate"
              >
                🏛️ Institute
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill('demo.industry@anthropic.com', 'industry', 'Demo1234!')}
                className="py-1 px-2 text-[10px] font-medium bg-white border border-slate-200 text-slate-700 rounded hover:border-blue-300 text-left truncate"
              >
                💼 Recruiter
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill('admin@skillbridge.io', 'admin', 'Admin2026!')}
                className="py-1 px-2 text-[10px] font-medium bg-white border border-slate-200 text-slate-700 rounded hover:border-blue-300 text-left truncate"
              >
                🛡️ Admin
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
