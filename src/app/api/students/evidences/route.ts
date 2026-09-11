import { NextRequest, NextResponse } from 'next/server';
import { dbService } from '@/lib/server-db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, evidence } = body;

    if (!email || !evidence) {
      return NextResponse.json({ error: 'Email and evidence payload are required' }, { status: 400 });
    }

    const updatedProfile = dbService.addStudentEvidence(email, evidence);
    return NextResponse.json({
      success: true,
      message: 'Evidence added and Builder Score updated in database',
      profile: updatedProfile,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
