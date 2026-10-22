import { NextResponse } from 'next/server';
import { savePrivacyPolicy } from '@/lib/db';

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { version, lastUpdated, sections } = body;

    const saved = await savePrivacyPolicy({
      version: version || '1.1',
      lastUpdated: lastUpdated || new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }),
      sections: sections || [],
    });

    return NextResponse.json({
      success: true,
      message: 'Privacy policy updated and published successfully',
      data: saved,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update privacy policy' },
      { status: 500 }
    );
  }
}
