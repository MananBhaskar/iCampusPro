import { NextResponse } from 'next/server';
import { updateContactStatus } from '@/lib/db';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status, assignedTo, adminNotes } = body;

    const updated = await updateContactStatus(id, status, assignedTo, adminNotes);
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Contact request not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: `Contact request ${id} updated`,
      data: updated,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update contact request' }, { status: 500 });
  }
}
