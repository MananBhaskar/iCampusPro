import { NextResponse } from 'next/server';
import { createContactRequest } from '@/lib/db';

const VALID_QUERY_TYPES = ['General', 'Registration', 'Subscription', 'Technical'];
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{7,15}$/;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, queryType, message } = body;

    // Server-side validation
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json(
        { success: false, field: 'name', error: 'Full name is mandatory and cannot be empty.' },
        { status: 400 }
      );
    }

    if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
      return NextResponse.json(
        { success: false, field: 'email', error: 'A valid email address is required.' },
        { status: 400 }
      );
    }

    if (phone && phone.trim().length > 0 && !PHONE_REGEX.test(phone.trim())) {
      return NextResponse.json(
        { success: false, field: 'phone', error: 'Phone number format is invalid.' },
        { status: 400 }
      );
    }

    if (!queryType || !VALID_QUERY_TYPES.includes(queryType)) {
      return NextResponse.json(
        { success: false, field: 'queryType', error: 'Query Type must be General, Registration, Subscription, or Technical.' },
        { status: 400 }
      );
    }

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json(
        { success: false, field: 'message', error: 'Message cannot be empty.' },
        { status: 400 }
      );
    }

    if (message.length > 5000) {
      return NextResponse.json(
        { success: false, field: 'message', error: 'Message exceeds the maximum limit of 5,000 characters.' },
        { status: 400 }
      );
    }

    const contactRequest = await createContactRequest({
      name,
      email,
      phone,
      queryType,
      message,
    });

    return NextResponse.json({
      success: true,
      message: 'Your request has been received.',
      referenceId: contactRequest.id,
      routedTo: contactRequest.assignedTo,
      data: contactRequest,
    });
  } catch (error) {
    console.error('Error in /api/public/contact-requests:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit contact request. Please try again.' },
      { status: 500 }
    );
  }
}
