import { NextRequest, NextResponse } from 'next/server';
import { dbService } from '@/lib/server-db';
import { mockStudentProfile } from '@/lib/mock-data';

export async function GET(req: NextRequest) {
  const isDemo = req.nextUrl.searchParams.get('demo') === 'true';
  const email = req.nextUrl.searchParams.get('email');

  if (isDemo || !email) {
    return NextResponse.json({
      success: true,
      isDemo: true,
      profile: mockStudentProfile,
    });
  }

  const profile = dbService.getStudentProfile(email);
  return NextResponse.json({
    success: true,
    isDemo: false,
    profile,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, ...updates } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const updatedProfile = dbService.updateStudentProfile(email, updates);
    return NextResponse.json({
      success: true,
      message: 'Student profile updated in database',
      profile: updatedProfile,
      updatedAt: new Date().toISOString(),
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
