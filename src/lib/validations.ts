import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().trim().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
  role: z.enum(['student', 'institute', 'industry', 'admin']).optional(),
});

export const registerSchema = z.object({
  name: z.string().trim().min(2, { message: 'Full name must be at least 2 characters.' }),
  email: z.string().trim().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters long.' }),
  role: z.enum(['student', 'institute', 'industry', 'admin']).default('student'),
});

export const verifyEmailSchema = z.object({
  email: z.string().trim().email(),
  token: z.string().min(6),
});

export const resetPasswordRequestSchema = z.object({
  email: z.string().trim().email({ message: 'Please enter a valid email address.' }),
});

export const resetPasswordSubmitSchema = z.object({
  email: z.string().trim().email(),
  token: z.string().min(6),
  newPassword: z.string().min(8, { message: 'New password must be at least 8 characters.' }),
});

export const updateProfileSchema = z.object({
  email: z.string().trim().email(),
  name: z.string().optional(),
  headline: z.string().optional(),
  targetRole: z.string().optional(),
  academic: z
    .object({
      college: z.string().optional(),
      department: z.enum(['CSE', 'AIML', 'IT', 'ECE', 'Mechanical', 'Civil']).optional(),
      year: z.enum(['1st Year', '2nd Year', '3rd Year', '4th Year']).optional(),
      semester: z.string().optional(),
      cgpa: z.number().min(0).max(10).optional(),
      studentId: z.string().optional(),
    })
    .optional(),
  professional: z
    .object({
      githubUrl: z.string().optional(),
      linkedinUrl: z.string().optional(),
      portfolioUrl: z.string().optional(),
      bio: z.string().optional(),
      totalProjects: z.number().optional(),
      hackathonWins: z.number().optional(),
      researchPapers: z.number().optional(),
      openSourceContributions: z.number().optional(),
    })
    .optional(),
});

export const addEvidenceSchema = z.object({
  email: z.string().trim().email(),
  evidence: z.object({
    title: z.string().min(3, { message: 'Title must be at least 3 characters.' }),
    type: z.enum(['GitHub Repo', 'Live Product', 'Research Paper', 'Hackathon Win', 'Open Source PR']),
    url: z.string().url({ message: 'Please provide a valid URL proof link.' }),
    description: z.string().optional(),
    impactScore: z.number().min(10).max(100).default(75),
  }),
});

export const addSkillSchema = z.object({
  email: z.string().trim().email(),
  skill: z.object({
    name: z.string().min(2, { message: 'Skill name is required.' }),
    category: z.enum(['Programming', 'Cloud & DevOps', 'AI & Machine Learning', 'Systems & Architecture', 'Data & Analytics', 'Soft Skills']).default('Programming'),
    level: z.enum(['Beginner', 'Intermediate', 'Advanced', 'Expert']).default('Intermediate'),
    score: z.number().min(50).max(100).default(80),
  }),
});
