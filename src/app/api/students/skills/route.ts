import { NextRequest, NextResponse } from 'next/server';
import { dbService } from '@/lib/server-db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, skill } = body;

    if (!email || !skill) {
      return NextResponse.json({ error: 'Email and skill payload are required' }, { status: 400 });
    }

    const updatedProfile = dbService.addStudentSkill(email, skill);
    return NextResponse.json({
      success: true,
      message: 'Verified skill added to passport in database',
      profile: updatedProfile,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
