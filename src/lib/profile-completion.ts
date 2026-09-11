import { StudentProfile } from '@/types';

export interface ProfileCompletionResult {
  percentage: number;
  completedSections: string[];
  pendingSections: {
    name: string;
    points: number;
    actionHref: string;
    actionText: string;
  }[];
}

export function calculateProfileCompletion(profile: StudentProfile): ProfileCompletionResult {
  let score = 0;
  const completedSections: string[] = [];
  const pendingSections: { name: string; points: number; actionHref: string; actionText: string }[] = [];

  // 1. Personal & Basic (15 pts)
  if (profile.name && profile.email && profile.avatar && profile.headline) {
    score += 15;
    completedSections.push('Personal Details');
  } else {
    pendingSections.push({
      name: 'Personal Information & Avatar',
      points: 15,
      actionHref: '/student/profile',
      actionText: 'Complete Personal Details',
    });
  }

  // 2. Academic Information (15 pts)
  if (profile.academic.college && profile.academic.department && profile.academic.cgpa > 0) {
    score += 15;
    completedSections.push('Academic Information');
  } else {
    pendingSections.push({
      name: 'Academic Information & CGPA',
      points: 15,
      actionHref: '/student/profile',
      actionText: 'Add College & CGPA',
    });
  }

  // 3. Social & Code Links (15 pts)
  if (profile.professional.githubUrl || profile.professional.linkedinUrl) {
    score += 15;
    completedSections.push('Social & Developer Links');
  } else {
    pendingSections.push({
      name: 'GitHub & LinkedIn Verification',
      points: 15,
      actionHref: '/student/profile',
      actionText: 'Connect GitHub / LinkedIn',
    });
  }

  // 4. Verified Skills (20 pts)
  if (profile.verifiedSkills.length > 0) {
    const pts = Math.min(20, profile.verifiedSkills.length * 5);
    score += pts;
    if (profile.verifiedSkills.length >= 4) {
      completedSections.push('Verified Skills (4+ Validated)');
    } else {
      pendingSections.push({
        name: `Verify ${4 - profile.verifiedSkills.length} More Skills`,
        points: 20 - pts,
        actionHref: '/student/verified-passport',
        actionText: 'Verify Skills',
      });
    }
  } else {
    pendingSections.push({
      name: 'Verified Skill Passport',
      points: 20,
      actionHref: '/student/verified-passport',
      actionText: 'Claim Your First Skill',
    });
  }

  // 5. Projects & Builder Evidence (20 pts)
  if (profile.evidences.length > 0) {
    const pts = Math.min(20, profile.evidences.length * 10);
    score += pts;
    if (profile.evidences.length >= 2) {
      completedSections.push('Builder Evidence & Projects');
    } else {
      pendingSections.push({
        name: 'Add Second Project Artifact',
        points: 10,
        actionHref: '/student/builder-passport',
        actionText: 'Submit Project Proof',
      });
    }
  } else {
    pendingSections.push({
      name: 'Projects & Builder Evidences',
      points: 20,
      actionHref: '/student/builder-passport',
      actionText: 'Upload Project Proof',
    });
  }

  // 6. Assessments (15 pts)
  if (profile.builderScores.problemSolving > 50) {
    score += 15;
    completedSections.push('Domain Assessment Evaluation');
  } else {
    pendingSections.push({
      name: 'Initial Benchmark Assessment',
      points: 15,
      actionHref: '/student/assessments',
      actionText: 'Take Benchmark Exam',
    });
  }

  return {
    percentage: Math.min(100, score),
    completedSections,
    pendingSections,
  };
}
