import { NextResponse } from 'next/server';
import { getTestimonials } from '@/lib/db';

export async function GET() {
  try {
    const testimonials = await getTestimonials();
    return NextResponse.json({ success: true, data: testimonials });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to load testimonials' },
      { status: 500 }
    );
  }
}
