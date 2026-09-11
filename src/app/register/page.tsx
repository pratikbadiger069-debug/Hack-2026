'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { UserRole } from '@/types';
import {
  ShieldCheck,
  Mail,
  Lock,
  User,
  ArrowRight,
  GraduationCap,
  Building2,
  Briefcase,
  AlertCircle,
  Loader2,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { registerUser, loginWithGoogle, loginWithGitHub } = useAppStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('student');
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<'google' | 'github' | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setErrorMessage('All fields are required.');
      return;
    }

    if (password.length < 8) {
      setErrorMessage('Password must be at least 8 characters long.');
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    try {
      await registerUser(email, name, role, password);
      setLoading(false);
      if (role === 'student') {
        router.push('/onboarding');
      } else {
        router.push(`/${role}`);
      }
    } catch (err: any) {
      setLoading(false);
      setErrorMessage(err.message || 'Registration failed. Please try again.');
    }
  };

  const handleGoogleSignup = async () => {
    setOauthLoading('google');
    setErrorMessage(null);
    try {
      await new Promise((res) => setTimeout(res, 600));
      const dummyEmail = email.trim() || 'student@skillbridge.edu';
      const dummyName = name.trim() || 'New Builder';
      loginWithGoogle(dummyEmail, dummyName);
      router.push('/onboarding');
    } catch (err: any) {
      setErrorMessage(err.message || 'Google signup failed');
      setOauthLoading(null);
    }
  };

  const handleGitHubSignup = async () => {
    setOauthLoading('github');
    setErrorMessage(null);
    try {
      const ghUser = name.trim() ? name.trim().toLowerCase().replace(/\s+/g, '-') : 'builder-dev';
      await loginWithGitHub(ghUser);
      router.push('/onboarding');
    } catch (err: any) {
      setErrorMessage(err.message || 'GitHub signup failed');
      setOauthLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F4EE] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans antialiased text-[#1B1B1B]">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href="/" className="flex items-center justify-center gap-2.5 mb-6 group">
          <div className="w-10 h-10 rounded-xl bg-[#1B1B1B] flex items-center justify-center text-[#F6F4EE] font-bold text-base shadow-sm group-hover:scale-105 transition-transform">
            SB
          </div>
          <div className="flex flex-col text-left">
            <span className="font-bold text-[#1B1B1B] text-lg leading-tight">SkillBridge</span>
            <span className="text-[11px] text-[#6E6E6A]">Builder Operating System</span>
          </div>
        </Link>
        <h2 className="text-center text-2xl font-bold tracking-tight text-[#1B1B1B]">
          Create your builder account
        </h2>
        <p className="mt-1.5 text-center text-sm text-[#6E6E6A]">
          Already registered?{' '}
          <Link href="/login" className="font-medium text-[#C76A2A] hover:underline underline-offset-4">
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 sm:px-8 rounded-2xl border border-[#E8E5DD] shadow-sm space-y-6">
          {errorMessage && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-2.5 text-xs text-rose-800">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Social OAuth Options */}
          <div className="space-y-2.5">
            <button
              type="button"
              onClick={handleGoogleSignup}
              disabled={oauthLoading !== null || loading}
              className="w-full h-11 px-4 rounded-xl border border-[#E8E5DD] bg-white hover:bg-[#F6F4EE] text-[#1B1B1B] text-xs font-semibold flex items-center justify-center gap-3 transition-colors shadow-none disabled:opacity-60"
            >
              {oauthLoading === 'google' ? (
                <Loader2 className="w-4 h-4 animate-spin text-[#6E6E6A]" />
              ) : (
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
              )}
              <span>Continue with Google</span>
            </button>

            <button
              type="button"
              onClick={handleGitHubSignup}
              disabled={oauthLoading !== null || loading}
              className="w-full h-11 px-4 rounded-xl border border-[#E8E5DD] bg-[#1B1B1B] hover:bg-[#2B2B2B] text-white text-xs font-semibold flex items-center justify-center gap-3 transition-colors shadow-none disabled:opacity-60"
            >
              {oauthLoading === 'github' ? (
                <Loader2 className="w-4 h-4 animate-spin text-white" />
              ) : (
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              )}
              <span>Continue with GitHub</span>
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#E8E5DD]" />
            </div>
            <div className="relative flex justify-center text-[11px] uppercase tracking-wider font-semibold">
              <span className="bg-white px-3 text-[#6E6E6A]">or register with email</span>
            </div>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#1B1B1B] mb-1.5">
                Select Persona
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { role: 'student' as const, label: 'Student', icon: GraduationCap },
                  { role: 'institute' as const, label: 'Institute', icon: Building2 },
                  { role: 'industry' as const, label: 'Recruiter', icon: Briefcase },
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = role === item.role;
                  return (
                    <button
                      key={item.role}
                      type="button"
                      onClick={() => setRole(item.role)}
                      className={`flex flex-col items-center p-2.5 rounded-xl border text-xs font-medium transition-all ${
                        isSelected
                          ? 'border-[#C76A2A] bg-[#C76A2A]/5 text-[#C76A2A] font-semibold ring-1 ring-[#C76A2A]'
                          : 'border-[#E8E5DD] hover:bg-[#F6F4EE] text-[#6E6E6A]'
                      }`}
                    >
                      <Icon className={`w-4 h-4 mb-1 ${isSelected ? 'text-[#C76A2A]' : 'text-[#6E6E6A]'}`} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1B1B1B] mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-[#6E6E6A] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Rivera"
                  className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-white border border-[#E8E5DD] rounded-xl text-[#1B1B1B] placeholder:text-[#9E9E9A] focus:outline-none focus:border-[#1B1B1B] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1B1B1B] mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#6E6E6A] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex.rivera@university.edu"
                  className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-white border border-[#E8E5DD] rounded-xl text-[#1B1B1B] placeholder:text-[#9E9E9A] focus:outline-none focus:border-[#1B1B1B] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1B1B1B] mb-1">Password (Min. 8 characters)</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#6E6E6A] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-white border border-[#E8E5DD] rounded-xl text-[#1B1B1B] placeholder:text-[#9E9E9A] focus:outline-none focus:border-[#1B1B1B] transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || oauthLoading !== null}
              className="w-full h-11 text-xs font-semibold text-white bg-[#C76A2A] hover:bg-[#b05c22] rounded-xl shadow-none transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="pt-2 border-t border-[#E8E5DD] flex items-center justify-center gap-1.5 text-[11px] text-[#6E6E6A]">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Clean account provisioning &amp; private multi-tenant workspace</span>
          </div>
        </div>
      </div>
    </div>
  );
}
