import { NextResponse } from 'next/server';
import { getInstituteBySlug, getReviews } from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const institute = await getInstituteBySlug(slug);

    if (!institute) {
      return NextResponse.json(
        { success: false, error: 'Institute not found' },
        { status: 404 }
      );
    }

    if (institute.status === 'Draft') {
      return NextResponse.json(
        { success: false, error: 'This institute profile is not yet published' },
        { status: 403 }
      );
    }

    if (institute.status === 'Suspended') {
      return NextResponse.json(
        { success: false, error: 'This institute profile is currently suspended' },
        { status: 403 }
      );
    }

    const reviews = await getReviews(institute.id);

    return NextResponse.json({
      success: true,
      data: {
        ...institute,
        reviews,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve institute' },
      { status: 500 }
    );
  }
}
