import { NextResponse } from 'next/server';
import { updateReviewStatus } from '@/lib/db';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    const updated = await updateReviewStatus(id, status);
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Review not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: `Review ${id} status updated to ${status}. Institute average rating recalculated.`,
      data: updated,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update review status' }, { status: 500 });
  }
}
