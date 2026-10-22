import { NextResponse } from 'next/server';
import {
  getInstituteCounts,
  getTopRatedInstitutes,
  getActiveAdvertisements,
  getTestimonials,
} from '@/lib/db';

export async function GET() {
  try {
    const [counts, topRated, advertisements, testimonials] = await Promise.all([
      getInstituteCounts(),
      getTopRatedInstitutes(6),
      getActiveAdvertisements(),
      getTestimonials(),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        headline: "Smart Campus Management for Schools, Colleges & Coaching Institutes",
        subheadline: "Empowering educational leaders, faculty, students, and parents with seamless administration, AI-driven insights, live fee workflows, and institutional discovery.",
        counts,
        topRated,
        advertisements,
        testimonials,
      },
    });
  } catch (error) {
    console.error("API /api/public/home error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to load homepage data" },
      { status: 500 }
    );
  }
}
