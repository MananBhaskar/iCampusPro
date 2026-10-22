import { NextResponse } from 'next/server';
import { getActiveAdvertisements } from '@/lib/db';

export async function GET() {
  try {
    const advertisements = await getActiveAdvertisements();
    return NextResponse.json({ success: true, data: advertisements });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to load advertisements' },
      { status: 500 }
    );
  }
}
