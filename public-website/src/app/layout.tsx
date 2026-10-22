import type { Metadata } from 'next';
import { Suspense } from 'react';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingChatbot from '@/components/FloatingChatbot';

export const metadata: Metadata = {
  title: 'iCampusPro | Smart Campus Management for Schools, Colleges & Coaching Institutes',
  description:
    'Discover premier educational institutions and manage campus workflows with iCampusPro. Empowering schools, colleges, and coaching centers with digital admissions, academic tracking, and AI-driven intelligence.',
  keywords: [
    'campus management software',
    'school ERP',
    'college management system',
    'educational institute discovery',
    'preschool admission portal',
    'coaching institute management',
    'iCampusPro',
  ],
  authors: [{ name: 'iCampusPro Platform Engineering' }],
  openGraph: {
    title: 'iCampusPro | Unified Education & Campus Intelligence',
    description:
      'Discover educational institutes, streamline administrative workflows, track academic milestones, and experience next-generation campus operations.',
    type: 'website',
    locale: 'en_US',
    siteName: 'iCampusPro',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Suspense fallback={<div style={{ height: '4.5rem', background: '#fff' }} />}>
          <Header />
        </Suspense>
        <main className="main-content">{children}</main>
        <Footer />
        <Suspense fallback={null}>
          <FloatingChatbot />
        </Suspense>
      </body>
    </html>
  );
}
