import { NextResponse } from 'next/server';
import { updateInstituteStatus, saveInstitute } from '@/lib/db';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    const updated = await updateInstituteStatus(id, status);
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Institute not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: `Institute ${id} status set to ${status}`,
      data: updated,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update institute status' }, { status: 500 });
  }
}
