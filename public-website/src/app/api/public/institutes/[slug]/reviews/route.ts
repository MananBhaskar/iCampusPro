import { NextResponse } from 'next/server';
import { getInstituteBySlug, getReviews, addReview } from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const institute = await getInstituteBySlug(slug);
    if (!institute) {
      return NextResponse.json({ success: false, error: 'Institute not found' }, { status: 404 });
    }
    const reviews = await getReviews(institute.id);
    return NextResponse.json({ success: true, data: reviews });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch reviews' }, { status: 500 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const institute = await getInstituteBySlug(slug);
    if (!institute) {
      return NextResponse.json({ success: false, error: 'Institute not found' }, { status: 404 });
    }

    const body = await request.json();
    const { userName, userRole, score, comment } = body;

    // Server-side validation
    if (!userName || typeof userName !== 'string' || userName.trim().length === 0) {
      return NextResponse.json({ success: false, error: 'Your name is required.' }, { status: 400 });
    }

    const parsedScore = Number(score);
    if (!parsedScore || parsedScore < 1 || parsedScore > 5) {
      return NextResponse.json({ success: false, error: 'Rating must be between 1 and 5 stars.' }, { status: 400 });
    }

    if (!comment || typeof comment !== 'string' || comment.trim().length === 0) {
      return NextResponse.json({ success: false, error: 'Review comment cannot be empty.' }, { status: 400 });
    }

    if (comment.length > 3000) {
      return NextResponse.json({ success: false, error: 'Review comment cannot exceed 3,000 characters.' }, { status: 400 });
    }

    const newReview = await addReview(institute.id, {
      userName: userName.trim(),
      userRole: userRole || 'Parent',
      score: parsedScore,
      comment: comment.trim(),
    });

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your rating and review have been recorded.',
      data: newReview,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to submit review' }, { status: 500 });
  }
}
