import { NextResponse } from 'next/server';
import { getPrivacyPolicy } from '@/lib/db';

export async function GET() {
  try {
    const policy = await getPrivacyPolicy();
    return NextResponse.json({ success: true, data: policy });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to load privacy policy' },
      { status: 500 }
    );
  }
}
