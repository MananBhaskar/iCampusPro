import { NextResponse } from 'next/server';
import { getPublishedInstitutes, getInstituteCounts } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message } = body;

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Message cannot be empty.' },
        { status: 400 }
      );
    }

    const text = message.toLowerCase().trim();
    let reply = '';
    let suggestedActions: { label: string; action: string; target?: string }[] = [];

    if (text.includes('register') || text.includes('enquiry') || text.includes('onboard') || text.includes('join')) {
      reply = "To register your educational institution (School, College, Coaching Center, or Preschool), click 'Register Institute' at the top of the page. You will receive a unique reference ID (e.g. ENQ-2026-XXXX) and our onboarding team will reach out with a personalized demonstration and setup guide.";
      suggestedActions = [
        { label: 'Register Institute Now', action: 'open_registration_modal' },
        { label: 'Contact Support', action: 'navigate', target: '/contact' },
      ];
    } else if (text.includes('institute') || text.includes('school') || text.includes('college') || text.includes('find') || text.includes('search')) {
      const counts = await getInstituteCounts();
      reply = `You can explore verified educational institutions across India. Currently published on iCampusPro: ${counts['Schools']} Schools, ${counts['Colleges']} Colleges, ${counts['Coaching Institutes']} Coaching Institutes, and ${counts['Play Schools']} Play Schools.`;
      suggestedActions = [
        { label: 'Explore Institutes Directory', action: 'navigate', target: '/institutes' },
        { label: 'Top-Rated Institutes', action: 'navigate', target: '/#top-rated' },
      ];
    } else if (text.includes('contact') || text.includes('support') || text.includes('help') || text.includes('phone') || text.includes('email')) {
      reply = "Our support team is available Monday through Friday, 9:00 AM to 6:00 PM IST. You can reach us at contact@icampuspro.com or +91 11 4987 6500. You can also submit an enquiry through our Contact Us page.";
      suggestedActions = [
        { label: 'Go to Contact Us', action: 'navigate', target: '/contact' },
        { label: 'Register Institute', action: 'open_registration_modal' },
      ];
    } else if (text.includes('privacy') || text.includes('data') || text.includes('security') || text.includes('gdpr') || text.includes('safe')) {
      reply = "iCampusPro adheres strictly to enterprise-grade data protection, AES-256 encryption, and role-based data isolation. We do not sell or monetize student, parent, or institutional records.";
      suggestedActions = [
        { label: 'Read Privacy Policy', action: 'navigate', target: '/privacy' },
        { label: 'Contact Grievance Officer', action: 'navigate', target: '/contact' },
      ];
    } else if (text.includes('feature') || text.includes('academic') || text.includes('fee') || text.includes('ai') || text.includes('attendance')) {
      reply = "iCampusPro includes integrated Academic Management, Automated Biometric Attendance, PCI-DSS Level 1 compliant online fee collection, Smart AI analytics for student progress, and instant parent communication channels.";
      suggestedActions = [
        { label: 'View Platform Features', action: 'navigate', target: '/#features' },
        { label: 'Request Institute Demo', action: 'open_registration_modal' },
      ];
    } else {
      reply = "Hello! I am your iCampusPro Assistant. I can assist you with discovering educational institutions, registering your school or college, learning about platform modules, or contacting our support desk. How may I help you today?";
      suggestedActions = [
        { label: 'Register My Institute', action: 'open_registration_modal' },
        { label: 'Browse Verified Institutes', action: 'navigate', target: '/institutes' },
        { label: 'Contact Support Team', action: 'navigate', target: '/contact' },
        { label: 'Privacy & Security', action: 'navigate', target: '/privacy' },
      ];
    }

    return NextResponse.json({
      success: true,
      data: {
        reply,
        timestamp: new Date().toISOString(),
        suggestedActions,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Chatbot service encountered a temporary error. Please try again or visit Contact Us.',
      },
      { status: 500 }
    );
  }
}
