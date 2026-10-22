import { NextResponse } from 'next/server';
import { getPublishedInstitutes } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = (searchParams.get('q') || '').toLowerCase().trim();
    const category = searchParams.get('category') || '';
    const city = (searchParams.get('city') || '').toLowerCase().trim();
    const sort = searchParams.get('sort') || 'rating_desc';

    let institutes = await getPublishedInstitutes();

    if (category && category !== 'All') {
      institutes = institutes.filter(
        (i) => i.type.toLowerCase() === category.toLowerCase()
      );
    }

    if (city) {
      institutes = institutes.filter(
        (i) => i.city.toLowerCase().includes(city) || i.state.toLowerCase().includes(city)
      );
    }

    if (query) {
      institutes = institutes.filter(
        (i) =>
          i.name.toLowerCase().includes(query) ||
          i.description.toLowerCase().includes(query) ||
          i.affiliation.toLowerCase().includes(query) ||
          i.city.toLowerCase().includes(query)
      );
    }

    if (sort === 'rating_desc') {
      institutes.sort(
        (a, b) => (b.ratingSummary.averageRating || 0) - (a.ratingSummary.averageRating || 0)
      );
    } else if (sort === 'reviews_desc') {
      institutes.sort(
        (a, b) => (b.ratingSummary.totalReviews || 0) - (a.ratingSummary.totalReviews || 0)
      );
    } else if (sort === 'name_asc') {
      institutes.sort((a, b) => a.name.localeCompare(b.name));
    }

    return NextResponse.json({ success: true, data: institutes, total: institutes.length });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to search institutes' },
      { status: 500 }
    );
  }
}
