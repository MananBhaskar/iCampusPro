import { NextResponse } from 'next/server';
import { createRegistrationEnquiry } from '@/lib/db';

const VALID_TYPES = ['Play School', 'School', 'College', 'Coaching Institute', 'Others'];
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{7,15}$/;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { instituteName, instituteType, city, contactPerson, mobile, email, studentStrength, deploymentNeed } = body;

    // Server-side validation
    if (!instituteName || typeof instituteName !== 'string' || instituteName.trim().length === 0) {
      return NextResponse.json(
        { success: false, field: 'instituteName', error: 'Institute Name is required and must not contain only whitespace.' },
        { status: 400 }
      );
    }

    if (!instituteType || !VALID_TYPES.includes(instituteType)) {
      return NextResponse.json(
        { success: false, field: 'instituteType', error: 'Please select a valid approved Institute Type.' },
        { status: 400 }
      );
    }

    if (!city || typeof city !== 'string' || city.trim().length === 0) {
      return NextResponse.json(
        { success: false, field: 'city', error: 'City is required.' },
        { status: 400 }
      );
    }

    if (!contactPerson || typeof contactPerson !== 'string' || contactPerson.trim().length === 0) {
      return NextResponse.json(
        { success: false, field: 'contactPerson', error: 'Contact Person name is required.' },
        { status: 400 }
      );
    }

    if (!mobile || typeof mobile !== 'string' || !PHONE_REGEX.test(mobile.trim())) {
      return NextResponse.json(
        { success: false, field: 'mobile', error: 'Please enter a valid telephone/mobile number.' },
        { status: 400 }
      );
    }

    if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
      return NextResponse.json(
        { success: false, field: 'email', error: 'Please enter a valid official email address.' },
        { status: 400 }
      );
    }

    const newEnquiry = await createRegistrationEnquiry({
      instituteName,
      instituteType,
      city,
      contactPerson,
      mobile,
      email,
      studentStrength,
      deploymentNeed,
    });

    return NextResponse.json({
      success: true,
      message: 'Your institute registration enquiry has been successfully registered.',
      referenceId: newEnquiry.id,
      data: newEnquiry,
    });
  } catch (error) {
    console.error('Error in /api/public/registration-enquiries:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process registration enquiry. Please try again.' },
      { status: 500 }
    );
  }
}
