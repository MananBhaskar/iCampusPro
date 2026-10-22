import { NextResponse } from 'next/server';
import { getTopRatedInstitutes } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '6', 10);
    const institutes = await getTopRatedInstitutes(limit);
    return NextResponse.json({ success: true, data: institutes });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve top-rated institutes' },
      { status: 500 }
    );
  }
}
