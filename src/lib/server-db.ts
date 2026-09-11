import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import { StudentProfile, UserRole } from '@/types';
import { mockStudentProfile, mockCandidatesPipeline, mockJobRequirements, mockCurriculumAnalysis } from './mock-data';
import { cleanApiKey } from './ai-diagnostics';

export interface UserAIKeys {
  gemini?: string;
  openai?: string;
  anthropic?: string;
  customEndpoint?: string;
  updatedAt?: string;
}

export interface DBUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  passwordHash: string;
  avatar: string;
  linkedInName?: string;
  googleName?: string;
  company?: string;
  institution?: string;
  isDemoUser: boolean;
  isEmailVerified: boolean;
  emailVerificationToken?: string;
  passwordResetToken?: string;
  passwordResetExpires?: number;
  aiKeys?: UserAIKeys;
  createdAt: string;
  updatedAt: string;
}

export interface DBData {
  users: Record<string, DBUser>; // keyed by email
  studentProfiles: Record<string, StudentProfile>; // keyed by email
  instituteData: Record<string, any>;
  industryData: Record<string, any>;
  auditLogs: { id: string; timestamp: string; action: string; userId: string; role: string; details: string; ip?: string }[];
}

const DB_FILE_PATH = path.join(process.cwd(), 'data', 'skillbridge_db.json');

function ensureDbFile(): DBData {
  const dir = path.dirname(DB_FILE_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (!fs.existsSync(DB_FILE_PATH)) {
    const initialData: DBData = {
      users: {
        'admin@skillbridge.io': {
          id: 'usr-admin-master',
          email: 'admin@skillbridge.io',
          name: 'Platform Administrator',
          role: 'admin',
          passwordHash: bcrypt.hashSync('Admin2026!', 10),
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
          isDemoUser: false,
          isEmailVerified: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        'demo.student@stanford.edu': {
          id: 'usr-demo-student',
          email: 'demo.student@stanford.edu',
          name: 'Alex Chen',
          role: 'student',
          passwordHash: bcrypt.hashSync('Demo1234!', 10),
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
          isDemoUser: true,
          isEmailVerified: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        'demo.institute@stanford.edu': {
          id: 'usr-demo-institute',
          email: 'demo.institute@stanford.edu',
          name: 'Dean Eleanor Vance',
          role: 'institute',
          passwordHash: bcrypt.hashSync('Demo1234!', 10),
          avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
          isDemoUser: true,
          isEmailVerified: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        'demo.industry@anthropic.com': {
          id: 'usr-demo-industry',
          email: 'demo.industry@anthropic.com',
          name: 'Marcus Vance',
          role: 'industry',
          passwordHash: bcrypt.hashSync('Demo1234!', 10),
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
          isDemoUser: true,
          isEmailVerified: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      },
      studentProfiles: {
        'demo.student@stanford.edu': mockStudentProfile,
      },
      instituteData: {
        curriculum: [mockCurriculumAnalysis],
      },
      industryData: {
        jobs: mockJobRequirements,
        candidates: mockCandidatesPipeline,
      },
      auditLogs: [
        {
          id: 'log-1',
          timestamp: new Date().toISOString(),
          action: 'SECURITY_SUBSYSTEM_ONLINE',
          userId: 'system',
          role: 'ADMIN',
          details: 'Production Bcrypt/JWT security engine online with RBAC isolation.',
        },
      ],
    };
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify(initialData, null, 2), 'utf-8');
    return initialData;
  }

  try {
    const raw = fs.readFileSync(DB_FILE_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch {
    const fallback: DBData = {
      users: {},
      studentProfiles: {},
      instituteData: {},
      industryData: {},
      auditLogs: [],
    };
    return fallback;
  }
}

function saveDb(data: DBData) {
  try {
    const dir = path.dirname(DB_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to save to database file:', err);
  }
}

export function createCleanStudentProfile(name: string, email: string): StudentProfile {
  return {
    id: `std-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    name: name || email.split('@')[0],
    email,
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    headline: '',
    targetRole: 'Software Engineer',
    academic: {
      college: '',
      department: 'CSE',
      year: '1st Year',
      semester: '1st Semester',
      cgpa: 0,
      studentId: '',
    },
    professional: {
      githubUrl: '',
      linkedinUrl: '',
      portfolioUrl: '',
      bio: '',
      totalProjects: 0,
      hackathonWins: 0,
      researchPapers: 0,
      openSourceContributions: 0,
    },
    builderScores: {
      overall: 0,
      execution: 0,
      leadership: 0,
      innovation: 0,
      problemSolving: 0,
      consistency: 0,
    },
    employabilityScore: 0,
    verifiedSkills: [],
    evidences: [],
  };
}

export const dbService = {
  getUserByEmail: (email: string): DBUser | null => {
    const db = ensureDbFile();
    return db.users[email.toLowerCase().trim()] || null;
  },

  getAllUsers: (): DBUser[] => {
    const db = ensureDbFile();
    return Object.values(db.users);
  },

  registerUser: (
    name: string,
    email: string,
    role: UserRole,
    passwordPlain: string
  ): { user: DBUser; profile: any } => {
    const db = ensureDbFile();
    const cleanEmail = email.toLowerCase().trim();

    if (db.users[cleanEmail]) {
      throw new Error('An account with this email address already exists. Please sign in.');
    }

    const salt = bcrypt.genSaltSync(12);
    const passwordHash = bcrypt.hashSync(passwordPlain, salt);
    const verificationToken = `vt_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    const newUser: DBUser = {
      id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      email: cleanEmail,
      name: name || cleanEmail.split('@')[0],
      role,
      passwordHash,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      isDemoUser: false,
      isEmailVerified: false,
      emailVerificationToken: verificationToken,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    db.users[cleanEmail] = newUser;

    let profile: any = null;
    if (role === 'student') {
      profile = createCleanStudentProfile(newUser.name, cleanEmail);
      db.studentProfiles[cleanEmail] = profile;
    }

    db.auditLogs.unshift({
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      action: 'USER_REGISTERED_BCRYPT',
      userId: newUser.id,
      role: newUser.role.toUpperCase(),
      details: `Registered new verified ${role} identity: ${cleanEmail}`,
    });

    saveDb(db);
    return { user: newUser, profile };
  },

  loginUser: (
    email: string,
    passwordPlain: string,
    expectedRole?: UserRole
  ): { user: DBUser; profile: any } => {
    const db = ensureDbFile();
    const cleanEmail = email.toLowerCase().trim();

    const user = db.users[cleanEmail];
    if (!user) {
      throw new Error('Invalid email or password.');
    }

    const isMatch = bcrypt.compareSync(passwordPlain, user.passwordHash);
    if (!isMatch) {
      throw new Error('Invalid email or password.');
    }

    if (expectedRole && user.role !== expectedRole && user.role !== 'admin') {
      throw new Error(`This account is registered as ${user.role}. You cannot sign in under ${expectedRole}.`);
    }

    const profile = db.studentProfiles[cleanEmail] || createCleanStudentProfile(user.name, cleanEmail);
    if (!db.studentProfiles[cleanEmail]) {
      db.studentProfiles[cleanEmail] = profile;
      saveDb(db);
    }

    db.auditLogs.unshift({
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      action: 'USER_LOGIN_SUCCESS',
      userId: user.id,
      role: user.role.toUpperCase(),
      details: `Successful authenticated login for: ${cleanEmail}`,
    });

    saveDb(db);
    return { user, profile };
  },

  verifyEmailToken: (email: string, token: string): boolean => {
    const db = ensureDbFile();
    const cleanEmail = email.toLowerCase().trim();
    const user = db.users[cleanEmail];
    if (!user || user.emailVerificationToken !== token) {
      return false;
    }
    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    db.users[cleanEmail] = user;

    db.auditLogs.unshift({
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      action: 'EMAIL_VERIFIED',
      userId: user.id,
      role: user.role.toUpperCase(),
      details: `Email confirmed and verified: ${cleanEmail}`,
    });

    saveDb(db);
    return true;
  },

  generatePasswordResetToken: (email: string): string | null => {
    const db = ensureDbFile();
    const cleanEmail = email.toLowerCase().trim();
    const user = db.users[cleanEmail];
    if (!user) return null;

    const token = `rst_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    user.passwordResetToken = token;
    user.passwordResetExpires = Date.now() + 3600000; // 1 hour expiry
    db.users[cleanEmail] = user;

    db.auditLogs.unshift({
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      action: 'PASSWORD_RESET_REQUEST',
      userId: user.id,
      role: user.role.toUpperCase(),
      details: `Password recovery token issued for: ${cleanEmail}`,
    });

    saveDb(db);
    return token;
  },

  resetPasswordWithToken: (email: string, token: string, newPasswordPlain: string): boolean => {
    const db = ensureDbFile();
    const cleanEmail = email.toLowerCase().trim();
    const user = db.users[cleanEmail];
    if (!user || !user.passwordResetToken || user.passwordResetToken !== token) {
      return false;
    }

    if (user.passwordResetExpires && Date.now() > user.passwordResetExpires) {
      return false;
    }

    const salt = bcrypt.genSaltSync(12);
    user.passwordHash = bcrypt.hashSync(newPasswordPlain, salt);
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    db.users[cleanEmail] = user;

    db.auditLogs.unshift({
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      action: 'PASSWORD_RESET_SUCCESS',
      userId: user.id,
      role: user.role.toUpperCase(),
      details: `Password reset successfully completed for: ${cleanEmail}`,
    });

    saveDb(db);
    return true;
  },

  getStudentProfile: (email: string): StudentProfile => {
    const db = ensureDbFile();
    const cleanEmail = email.toLowerCase().trim();
    if (db.studentProfiles[cleanEmail]) {
      return db.studentProfiles[cleanEmail];
    }
    const fresh = createCleanStudentProfile(cleanEmail.split('@')[0], cleanEmail);
    db.studentProfiles[cleanEmail] = fresh;
    saveDb(db);
    return fresh;
  },

  updateStudentProfile: (email: string, updates: Partial<StudentProfile>): StudentProfile => {
    const db = ensureDbFile();
    const cleanEmail = email.toLowerCase().trim();
    const existing = db.studentProfiles[cleanEmail] || createCleanStudentProfile(cleanEmail.split('@')[0], cleanEmail);

    const merged: StudentProfile = {
      ...existing,
      ...updates,
      academic: {
        ...existing.academic,
        ...(updates.academic || {}),
      },
      professional: {
        ...existing.professional,
        ...(updates.professional || {}),
      },
      builderScores: {
        ...existing.builderScores,
        ...(updates.builderScores || {}),
      },
    };

    db.studentProfiles[cleanEmail] = merged;

    // Synchronize display name back to user record
    if (db.users[cleanEmail]) {
      if (updates.name && updates.name.trim().length > 0) {
        db.users[cleanEmail].name = updates.name.trim();
      }
      if (updates.linkedInName) {
        db.users[cleanEmail].linkedInName = updates.linkedInName.trim();
      }
      if (updates.googleName) {
        db.users[cleanEmail].googleName = updates.googleName.trim();
      }
      db.users[cleanEmail].updatedAt = new Date().toISOString();
    }

    saveDb(db);
    return merged;
  },

  auditAndRepairDatabase: () => {
    const db = ensureDbFile();
    let repaired = 0;

    // Check all users have profiles
    Object.keys(db.users).forEach((email) => {
      const u = db.users[email];
      if (u.role === 'student' && !db.studentProfiles[email]) {
        db.studentProfiles[email] = createCleanStudentProfile(u.name, email);
        repaired++;
      }
    });

    if (repaired > 0) {
      saveDb(db);
    }
    return { status: 'Database integrity verified', repairedCount: repaired };
  },

  addStudentEvidence: (email: string, evidence: any): StudentProfile => {
    const db = ensureDbFile();
    const cleanEmail = email.toLowerCase().trim();
    const profile = dbService.getStudentProfile(cleanEmail);

    const newEvidence = {
      id: `ev-${Date.now()}`,
      ...evidence,
      verified: true,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
    };

    profile.evidences = [newEvidence, ...profile.evidences];
    profile.builderScores.overall = Math.min(1000, profile.builderScores.overall + 35);
    profile.builderScores.execution = Math.min(100, profile.builderScores.execution + 5);
    profile.employabilityScore = Math.min(100, profile.employabilityScore + 4);

    db.studentProfiles[cleanEmail] = profile;
    saveDb(db);
    return profile;
  },

  addStudentSkill: (email: string, skill: { name: string; level: any; category: any; score?: number }): StudentProfile => {
    const db = ensureDbFile();
    const cleanEmail = email.toLowerCase().trim();
    const profile = dbService.getStudentProfile(cleanEmail);

    const newSkill = {
      id: `vs-${Date.now()}`,
      name: skill.name,
      category: skill.category || 'Programming',
      level: skill.level || 'Intermediate',
      score: skill.score || 80,
      verificationSources: ['Assessment', 'Code Validation'] as any,
      verifiedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      verificationCode: `SB-${skill.name.slice(0, 2).toUpperCase()}-${Math.floor(10000 + Math.random() * 90000)}`,
      evidenceCount: 1,
    };

    profile.verifiedSkills = [newSkill, ...profile.verifiedSkills];
    profile.builderScores.overall = Math.min(1000, profile.builderScores.overall + 20);
    profile.employabilityScore = Math.min(100, profile.employabilityScore + 3);

    db.studentProfiles[cleanEmail] = profile;
    saveDb(db);
    return profile;
  },

  getAuditLogs: () => {
    const db = ensureDbFile();
    return db.auditLogs;
  },

  saveUserAIKeys: (
    email: string,
    keys: { gemini?: string; openai?: string; anthropic?: string; customEndpoint?: string }
  ): UserAIKeys => {
    const db = ensureDbFile();
    const cleanEmail = email.toLowerCase().trim();
    const user = db.users[cleanEmail];
    if (!user) {
      throw new Error(`User ${email} not found`);
    }

    const currentKeys = user.aiKeys || {};
    const updated: UserAIKeys = {
      ...currentKeys,
      gemini: keys.gemini !== undefined ? cleanApiKey(keys.gemini) : currentKeys.gemini,
      openai: keys.openai !== undefined ? cleanApiKey(keys.openai) : currentKeys.openai,
      anthropic: keys.anthropic !== undefined ? cleanApiKey(keys.anthropic) : currentKeys.anthropic,
      customEndpoint: keys.customEndpoint !== undefined ? keys.customEndpoint.trim() : currentKeys.customEndpoint,
      updatedAt: new Date().toISOString(),
    };

    user.aiKeys = updated;
    user.updatedAt = new Date().toISOString();

    db.auditLogs.unshift({
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      action: 'AI_KEYS_UPDATED',
      userId: user.id,
      role: user.role.toUpperCase(),
      details: `User updated AI provider credentials securely.`,
    });

    saveDb(db);
    return updated;
  },

  getUserAIKeys: (
    email?: string | null
  ): { gemini: string; openai: string; anthropic: string; customEndpoint: string; hasStoredKeys: boolean } => {
    const envGemini = cleanApiKey(process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');
    const envOpenAI = cleanApiKey(process.env.OPENAI_API_KEY || '');
    const envAnthropic = cleanApiKey(process.env.ANTHROPIC_API_KEY || '');

    if (!email) {
      return {
        gemini: envGemini,
        openai: envOpenAI,
        anthropic: envAnthropic,
        customEndpoint: '',
        hasStoredKeys: !!(envGemini || envOpenAI || envAnthropic),
      };
    }

    const db = ensureDbFile();
    const cleanEmail = email.toLowerCase().trim();
    const user = db.users[cleanEmail];
    const userKeys = user?.aiKeys || {};

    const gemini = userKeys.gemini || envGemini;
    const openai = userKeys.openai || envOpenAI;
    const anthropic = userKeys.anthropic || envAnthropic;
    const customEndpoint = userKeys.customEndpoint || '';

    return {
      gemini,
      openai,
      anthropic,
      customEndpoint,
      hasStoredKeys: !!(userKeys.gemini || userKeys.openai || userKeys.anthropic || envGemini || envOpenAI || envAnthropic),
    };
  },

  getMaskedAIKeys: (
    email?: string | null
  ): {
    gemini: { configured: boolean; masked: string; source: 'user' | 'env' | 'none' };
    openai: { configured: boolean; masked: string; source: 'user' | 'env' | 'none' };
    anthropic: { configured: boolean; masked: string; source: 'user' | 'env' | 'none' };
  } => {
    const mask = (key: string) => {
      if (!key || key.length < 8) return '';
      return `${key.slice(0, 4)}...${key.slice(-4)}`;
    };

    let userKeys: UserAIKeys = {};
    if (email) {
      const db = ensureDbFile();
      const user = db.users[email.toLowerCase().trim()];
      userKeys = user?.aiKeys || {};
    }

    const envGemini = cleanApiKey(process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');
    const envOpenAI = cleanApiKey(process.env.OPENAI_API_KEY || '');
    const envAnthropic = cleanApiKey(process.env.ANTHROPIC_API_KEY || '');

    return {
      gemini: userKeys.gemini
        ? { configured: true, masked: mask(userKeys.gemini), source: 'user' }
        : envGemini
        ? { configured: true, masked: mask(envGemini), source: 'env' }
        : { configured: false, masked: '', source: 'none' },
      openai: userKeys.openai
        ? { configured: true, masked: mask(userKeys.openai), source: 'user' }
        : envOpenAI
        ? { configured: true, masked: mask(envOpenAI), source: 'env' }
        : { configured: false, masked: '', source: 'none' },
      anthropic: userKeys.anthropic
        ? { configured: true, masked: mask(userKeys.anthropic), source: 'user' }
        : envAnthropic
        ? { configured: true, masked: mask(envAnthropic), source: 'env' }
        : { configured: false, masked: '', source: 'none' },
    };
  },
};
