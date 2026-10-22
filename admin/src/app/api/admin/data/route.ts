import { NextResponse } from 'next/server';
import { getAllData } from '@/lib/db';

export async function GET() {
  try {
    const data = await getAllData();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Admin API error in /api/admin/data:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to load administrative database records' },
      { status: 500 }
    );
  }
}
