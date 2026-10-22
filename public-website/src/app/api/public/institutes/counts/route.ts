import { NextResponse } from 'next/server';
import { getInstituteCounts } from '@/lib/db';

export async function GET() {
  try {
    const counts = await getInstituteCounts();
    return NextResponse.json({ success: true, data: counts });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve institute counts' },
      { status: 500 }
    );
  }
}
