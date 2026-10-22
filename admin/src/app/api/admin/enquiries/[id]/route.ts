import { NextResponse } from 'next/server';
import { updateEnquiryStatus } from '@/lib/db';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status, adminNotes } = body;

    const updated = await updateEnquiryStatus(id, status, adminNotes);
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Enquiry not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: `Enquiry ${id} status updated to ${status}`,
      data: updated,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update enquiry' }, { status: 500 });
  }
}
