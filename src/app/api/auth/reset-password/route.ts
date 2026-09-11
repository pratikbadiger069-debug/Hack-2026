import { NextRequest, NextResponse } from 'next/server';
import { dbService } from '@/lib/server-db';
import { resetPasswordRequestSchema, resetPasswordSubmitSchema } from '@/lib/validations';

// POST: Request password reset link or submit new password
export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.json();

    // Mode 1: Request reset token
    if (rawBody.action === 'request' || (!rawBody.token && rawBody.email)) {
      const parsed = resetPasswordRequestSchema.safeParse(rawBody);
      if (!parsed.success) {
        return NextResponse.json({ error: parsed.error.issues[0]?.message || 'Invalid email' }, { status: 400 });
      }

      const token = dbService.generatePasswordResetToken(parsed.data.email);
      // In production, token is sent via verified SMTP email
      return NextResponse.json({
        success: true,
        message: 'Password reset link has been dispatched to your email.',
        resetToken: process.env.NODE_ENV === 'development' ? token : undefined,
      });
    }

    // Mode 2: Submit new password with token
    const parsed = resetPasswordSubmitSchema.safeParse(rawBody);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0]?.message || 'Invalid reset details' }, { status: 400 });
    }

    const { email, token, newPassword } = parsed.data;
    const resetSuccess = dbService.resetPasswordWithToken(email, token, newPassword);

    if (!resetSuccess) {
      return NextResponse.json({ error: 'Invalid or expired password reset token.' }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: 'Password has been successfully updated. You can now log in with your new password.',
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Password reset failed' }, { status: 500 });
  }
}
