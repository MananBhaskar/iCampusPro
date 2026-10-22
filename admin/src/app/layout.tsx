import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'iCampusPro Administration Console',
  description: 'Centralized Administrative and Moderation Portal for iCampusPro Platform',
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
