'use client';

import React, { useEffect, useState, createContext, useContext } from 'react';
import { useAppStore } from '@/lib/store';

interface AuthContextType {
  isHydrated: boolean;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  isHydrated: false,
  refreshSession: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false);
  const { setCurrentUser, setRole, setDemoMode, studentProfile } = useAppStore();

  const refreshSession = async () => {
    try {
      // Check if accessing demo route
      if (typeof window !== 'undefined') {
        const isDemoRoute = window.location.pathname === '/demo' || window.location.search.includes('demo=true');
        if (isDemoRoute) {
          setDemoMode(true);
          setIsHydrated(true);
          return;
        }
      }

      const res = await fetch('/api/auth/me');
      if (res.ok) {
        const data = await res.json();
        if (data.authenticated && data.user) {
          setCurrentUser(data.user);
          setRole(data.user.role);
          setDemoMode(false);
          if (data.profile) {
            useAppStore.setState({ studentProfile: data.profile });
          }
        }
      }
    } catch {
      // Session fetch error, fallback gracefully
    } finally {
      setIsHydrated(true);
    }
  };

  useEffect(() => {
    refreshSession();
  }, []);

  return (
    <AuthContext.Provider value={{ isHydrated, refreshSession }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
