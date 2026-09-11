import { StudentProfile } from '@/types';

export interface VerificationAuditReport {
  completenessScore: number;
  verificationScore: number;
  trustTier: 'UNVERIFIED' | 'TIER_1_STANDARD' | 'TIER_2_PROCTORED' | 'TIER_3_ENTERPRISE_CERTIFIED';
  breakdown: {
    source: string;
    verified: boolean;
    weight: number;
    score: number;
    evidenceDetails: string;
  }[];
  recommendations: string[];
}

export function calculateVerificationAudit(profile: StudentProfile): VerificationAuditReport {
  const breakdown = [];
  const recommendations = [];

  // 1. LinkedIn Professional Verification (20 pts)
  const hasLinkedIn = Boolean(profile.professional.linkedinUrl && profile.professional.linkedinUrl.includes('linkedin.com'));
  const linkedInScore = hasLinkedIn ? 20 : 0;
  breakdown.push({
    source: 'LinkedIn OAuth Identity',
    verified: hasLinkedIn,
    weight: 20,
    score: linkedInScore,
    evidenceDetails: hasLinkedIn ? `Connected profile: ${profile.professional.linkedinUrl}` : 'LinkedIn account not linked',
  });
  if (!hasLinkedIn) {
    recommendations.push('Connect your LinkedIn profile via OAuth to verify student identity (+20 pts).');
  }

  // 2. GitHub Code Repository & Commit Evidence (25 pts)
  const hasGitHub = Boolean(profile.professional.githubUrl && profile.professional.githubUrl.includes('github.com'));
  const hasCodeProofs = profile.evidences.some((ev) => ev.type === 'GitHub Repo' || ev.type === 'Open Source PR');
  const gitHubScore = hasGitHub && hasCodeProofs ? 25 : hasGitHub ? 15 : 0;
  breakdown.push({
    source: 'GitHub Code Repositories & Commits',
    verified: hasGitHub && hasCodeProofs,
    weight: 25,
    score: gitHubScore,
    evidenceDetails: hasCodeProofs
      ? `${profile.evidences.filter((e) => e.type === 'GitHub Repo' || e.type === 'Open Source PR').length} audited repositories verified`
      : hasGitHub
      ? 'GitHub linked, awaiting repository evidence submission'
      : 'GitHub account not linked',
  });
  if (!hasCodeProofs) {
    recommendations.push('Submit at least 1 public GitHub repository proof to verify code authorship (+25 pts).');
  }

  // 3. Verified Skills & Proctored Assessments (25 pts)
  const skillCount = profile.verifiedSkills.length;
  const assessmentTaken = profile.builderScores.problemSolving > 0;
  const skillsScore = Math.min(25, skillCount * 6 + (assessmentTaken ? 7 : 0));
  breakdown.push({
    source: 'Proctored Skill Assessments',
    verified: skillCount > 0,
    weight: 25,
    score: skillsScore,
    evidenceDetails: `${skillCount} skills verified with cryptographic code hashes`,
  });
  if (skillCount < 3) {
    recommendations.push(`Complete ${3 - skillCount} more skill assessments to maximize technical trust (+${25 - skillsScore} pts).`);
  }

  // 4. Academic Institution Verification (15 pts)
  const hasAcademic = Boolean(profile.academic.college && profile.academic.cgpa > 0);
  const academicScore = hasAcademic ? 15 : 0;
  breakdown.push({
    source: 'Institution & CGPA Verification',
    verified: hasAcademic,
    weight: 15,
    score: academicScore,
    evidenceDetails: hasAcademic ? `${profile.academic.college} (${profile.academic.department} - CGPA ${profile.academic.cgpa})` : 'Academic institution not registered',
  });
  if (!hasAcademic) {
    recommendations.push('Complete college name and official CGPA details (+15 pts).');
  }

  // 5. Resume PDF & Project Artifacts (15 pts)
  const hasEvidences = profile.evidences.length >= 2;
  const resumeScore = hasEvidences ? 15 : profile.evidences.length === 1 ? 8 : 0;
  breakdown.push({
    source: 'Resume & Multi-Project Evidence',
    verified: hasEvidences,
    weight: 15,
    score: resumeScore,
    evidenceDetails: `${profile.evidences.length} verified project artifacts on record`,
  });
  if (!hasEvidences) {
    recommendations.push('Upload your PDF resume or add 2+ verified project artifacts (+15 pts).');
  }

  const totalVerificationScore = linkedInScore + gitHubScore + skillsScore + academicScore + resumeScore;

  // Calculate completeness score (based on non-empty fields)
  let completePoints = 0;
  if (profile.name && profile.email) completePoints += 20;
  if (profile.headline) completePoints += 15;
  if (profile.academic.college && profile.academic.department) completePoints += 20;
  if (profile.professional.githubUrl || profile.professional.linkedinUrl) completePoints += 15;
  if (profile.verifiedSkills.length > 0) completePoints += 15;
  if (profile.evidences.length > 0) completePoints += 15;

  let trustTier: VerificationAuditReport['trustTier'] = 'UNVERIFIED';
  if (totalVerificationScore >= 85) trustTier = 'TIER_3_ENTERPRISE_CERTIFIED';
  else if (totalVerificationScore >= 55) trustTier = 'TIER_2_PROCTORED';
  else if (totalVerificationScore >= 25) trustTier = 'TIER_1_STANDARD';

  return {
    completenessScore: Math.min(100, completePoints),
    verificationScore: Math.min(100, totalVerificationScore),
    trustTier,
    breakdown,
    recommendations,
  };
}
