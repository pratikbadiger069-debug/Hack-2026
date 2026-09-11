import { NextRequest, NextResponse } from 'next/server';
import { dbService } from '@/lib/server-db';
import { VerifiedSkill } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      fullName,
      email,
      college,
      degree,
      branch,
      graduationYear,
      semester,
      country,
      city,
      careerPath,
      skillLevel,
      careerGoal,
      githubUrl,
      linkedinUrl,
      portfolioUrl,
      resumeUrl,
      knownSkills = [],
      projectCount = '0',
      hackathonExperience = 'No',
    } = body;

    const cleanEmail = (email || '').toLowerCase().trim();
    if (!cleanEmail) {
      return NextResponse.json({ error: 'Email address is required.' }, { status: 400 });
    }

    // Calculate Initial Builder Score
    // Base score (300) + Skills bonus + Project bonus + Hackathon bonus
    let calculatedBuilderScore = 320;
    
    // Skills weight
    calculatedBuilderScore += Math.min(180, (knownSkills.length || 0) * 20);
    
    // Project count weight
    if (projectCount === '1–2' || projectCount === '1-2') calculatedBuilderScore += 60;
    else if (projectCount === '3–5' || projectCount === '3-5') calculatedBuilderScore += 120;
    else if (projectCount === '5+') calculatedBuilderScore += 180;

    // Hackathon weight
    if (hackathonExperience === 'Yes') calculatedBuilderScore += 80;

    // GitHub presence weight
    if (githubUrl && githubUrl.includes('github.com')) calculatedBuilderScore += 60;

    calculatedBuilderScore = Math.min(950, calculatedBuilderScore);

    // Calculate Career Readiness Score
    const careerReadinessScore = Math.min(96, Math.max(55, Math.round(calculatedBuilderScore / 10) + 12));

    // Starter XP
    const starterXP = 100;
    const builderLevel = 'Explorer';

    // Auto-generate Verified Skills from selected known technologies
    const initialVerifiedSkills: VerifiedSkill[] = knownSkills.map((tech: string, idx: number) => {
      let category: 'Programming' | 'Cloud' | 'AI & ML' | 'DevOps' | 'Database' | 'Soft Skills' = 'Programming';
      if (['Cloud', 'AWS', 'GCP', 'Azure'].includes(tech)) category = 'Cloud';
      if (['Machine Learning', 'AI & ML', 'PyTorch', 'TensorFlow', 'Python'].includes(tech)) category = 'AI & ML';
      if (['Docker', 'Kubernetes', 'DevOps'].includes(tech)) category = 'DevOps';
      if (['SQL', 'PostgreSQL', 'MongoDB'].includes(tech)) category = 'Database';

      const baseSkillScore = skillLevel === 'Advanced' ? 88 : skillLevel === 'Intermediate' ? 80 : 72;
      return {
        id: `vs-onboard-${Date.now()}-${idx}`,
        name: tech,
        category,
        level: (skillLevel as any) || 'Intermediate',
        score: baseSkillScore + Math.min(10, idx * 2),
        verificationSources: ['Assessment', 'Project'] as any,
        verifiedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
        verificationCode: `SB-${tech.slice(0, 3).toUpperCase()}-${Math.floor(10000 + Math.random() * 90000)}`,
        evidenceCount: 1,
      };
    });

    // Recommended personalized roadmap milestones
    const recommendedRoadmap = {
      title: `${careerPath || 'Software Development'} Acceleration Roadmap`,
      targetRole: careerPath || 'Software Development',
      skillLevel: skillLevel || 'Beginner',
      primaryGoal: careerGoal || 'Internship',
      suggestedFirstAssessment: careerPath?.includes('AI')
        ? 'AI & Neural Foundations Challenge'
        : careerPath?.includes('Cybersecurity')
        ? 'Network Protocols & Vulnerability Assessment'
        : 'Core Software Architecture & Algorithms Benchmark',
      milestones: [
        { title: 'Core Foundations Verification', status: 'ready', xp: 50 },
        { title: 'Fullstack / Systems Evidence Project', status: 'locked', xp: 100 },
        { title: 'Industry Readiness & Mock Interview', status: 'locked', xp: 150 },
      ],
    };

    // Update or create in Database
    const updatedProfile = dbService.updateStudentProfile(cleanEmail, {
      name: fullName,
      headline: `${careerPath || 'Software Engineer'} Candidate | ${college || 'University'} '${graduationYear?.slice(-2) || '26'}`,
      targetRole: careerPath || 'Software Development',
      academic: {
        college: college || 'University',
        department: (branch as any) || 'CSE',
        year: '1st Year',
        semester: semester || '1st Semester',
        cgpa: 8.5,
        studentId: `STU-${graduationYear || '2026'}-${Math.floor(1000 + Math.random() * 9000)}`,
        degree,
        branch,
        graduationYear,
        country,
        city,
      },
      professional: {
        githubUrl: githubUrl || '',
        linkedinUrl: linkedinUrl || '',
        portfolioUrl: portfolioUrl || '',
        resumeUrl: resumeUrl || '',
        bio: `${skillLevel || 'Aspiring'} builder focused on ${careerPath || 'Software Development'} with a target goal of ${careerGoal || 'Internship'}.`,
        totalProjects: projectCount === '5+' ? 6 : projectCount === '3–5' ? 4 : projectCount === '1–2' ? 2 : 0,
        hackathonWins: hackathonExperience === 'Yes' ? 1 : 0,
        researchPapers: 0,
        openSourceContributions: githubUrl ? 12 : 0,
        careerPath,
        skillLevel,
        careerGoal,
        knownSkills,
        projectCountRange: projectCount,
        hasHackathonExperience: hackathonExperience === 'Yes',
      },
      builderScores: {
        overall: calculatedBuilderScore,
        execution: Math.round(calculatedBuilderScore * 0.1),
        leadership: 70,
        innovation: hackathonExperience === 'Yes' ? 85 : 72,
        problemSolving: 78,
        consistency: 75,
      },
      employabilityScore: careerReadinessScore,
      careerReadinessScore,
      verifiedSkills: initialVerifiedSkills,
      onboardingCompleted: true,
      college,
      department: branch,
      branch,
      degree,
      graduationYear,
      country,
      city,
      careerPath,
      skillLevel,
      careerGoal,
      knownSkills,
      projectCount,
      hackathonExperience,
    });

    return NextResponse.json({
      success: true,
      message: 'Builder Profile successfully generated and registered.',
      profile: updatedProfile,
      starterXP,
      builderLevel,
      calculatedBuilderScore,
      careerReadinessScore,
      recommendedRoadmap,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Onboarding submission failed.' }, { status: 500 });
  }
}
