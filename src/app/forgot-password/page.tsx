'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Mail, CheckCircle2, Loader2, KeyRound, AlertCircle, ArrowRight } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedToken, setGeneratedToken] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'request', email }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to dispatch reset instructions');
      }

      if (data.resetToken) {
        setGeneratedToken(data.resetToken);
      }
      setIsSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'An error occurred while requesting password reset.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-md">
              S
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-2xl text-slate-900 tracking-tight">SkillBridge</span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                AI SaaS
              </span>
            </div>
          </Link>
        </div>

        <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-slate-900">
          Reset your password
        </h2>
        <p className="mt-2 text-center text-xs text-slate-600">
          Enter your registered email address to receive secure recovery instructions.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 shadow-xs border border-slate-200 rounded-2xl sm:px-10">
          {error && (
            <div className="mb-5 p-3.5 bg-red-50/90 border border-red-200 rounded-xl flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <p className="text-xs font-medium text-red-700 leading-snug">{error}</p>
            </div>
          )}

          {isSubmitted ? (
            <div className="text-center space-y-4">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Recovery Instructions Dispatched</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                If an account exists for <strong className="text-slate-800">{email}</strong>, recovery instructions have been sent.
              </p>

              {generatedToken && (
                <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-xl text-left space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-blue-900">
                    <KeyRound className="w-4 h-4 text-blue-600" />
                    <span>Development Environment Reset Token:</span>
                  </div>
                  <div className="p-2 bg-white rounded border border-blue-200 font-mono text-[11px] text-slate-800 break-all select-all">
                    {generatedToken}
                  </div>
                  <Link
                    href={`/reset-password?email=${encodeURIComponent(email)}&token=${encodeURIComponent(generatedToken)}`}
                    className="w-full inline-flex justify-center items-center gap-2 py-2 px-3 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-2xs mt-2"
                  >
                    <span>Click to Set New Password</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <Link
                  href="/login"
                  className="flex-1 inline-flex justify-center items-center gap-2 py-2.5 px-4 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Return to Sign In
                </Link>
                <Link
                  href="/reset-password"
                  className="flex-1 inline-flex justify-center items-center gap-2 py-2.5 px-4 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors"
                >
                  Enter Token
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-xs font-semibold text-slate-700 mb-1">
                  Registered Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex.chen@stanford.edu"
                    className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white text-slate-900 transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-2xs disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Sending Recovery Link...</span>
                  </>
                ) : (
                  <span>Send Recovery Instructions</span>
                )}
              </button>

              <div className="text-center pt-2">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700"
                >
                  <ArrowLeft className="w-3 h-3" />
                  Back to Sign In
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
