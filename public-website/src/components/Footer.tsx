'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  Share2,
  Globe,
} from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setMessage({ text: 'Please enter a valid email address.', type: 'error' });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch('/api/public/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setMessage({ text: data.message || 'Subscribed successfully!', type: 'success' });
        setEmail('');
      } else {
        setMessage({ text: data.error || 'Subscription failed. Please try again.', type: 'error' });
      }
    } catch (err) {
      setMessage({ text: 'Network error. Please try again.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="site-footer" id="site-footer">
      <div className="container">
        <div className="footer-top-grid">
          {/* Brand Col */}
          <div className="footer-col">
            <Link href="/" className="brand-logo" style={{ color: 'white', marginBottom: '1.25rem', display: 'inline-flex' }}>
              <div className="logo-mark">
                <GraduationCap size={22} strokeWidth={2.5} />
              </div>
              <span>
                iCampus<span style={{ color: '#38bdf8' }}>Pro</span>
              </span>
            </Link>
            <p style={{ fontSize: '0.925rem', lineHeight: '1.65', marginBottom: '1.5rem', color: '#94a3b8' }}>
              The comprehensive campus management and institutional discovery platform serving schools, colleges, play schools, and coaching academies with seamless workflows and AI analytics.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={15} color="#38bdf8" />
                <span>Cyber Heights, Sector 62, Noida, India</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Phone size={15} color="#38bdf8" />
                <span>+91 11 4987 6500</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Mail size={15} color="#38bdf8" />
                <span>contact@icampuspro.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul className="footer-links-list">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/institutes">Explore Institutes</Link>
              </li>
              <li>
                <Link href="/#categories">Institute Categories</Link>
              </li>
              <li>
                <Link href="/#features">Platform Modules</Link>
              </li>
              <li>
                <Link href="/#top-rated">Top-Rated Institutes</Link>
              </li>
              <li>
                <a
                  href={process.env.NEXT_PUBLIC_ADMIN_URL || 'https://icampusproadmin.vercel.app'}
                  target="_blank"
                  rel="noreferrer"
                >
                  Admin Console
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Governance */}
          <div className="footer-col">
            <h4>Governance & Legal</h4>
            <ul className="footer-links-list">
              <li>
                <Link href="/privacy">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/privacy#data-usage">Data Usage Guidelines</Link>
              </li>
              <li>
                <Link href="/privacy#user-rights">Student & Parent Rights</Link>
              </li>
              <li>
                <Link href="/privacy#payment-subscription">Payment & Billing Security</Link>
              </li>
              <li>
                <Link href="/contact">Support & Dispute Center</Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div className="footer-col">
            <h4>Stay Updated</h4>
            <p style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '1rem' }}>
              Subscribe to our monthly institutional governance briefing, admission technology insights, and compliance digests.
            </p>

            <form onSubmit={handleSubscribe} className="footer-newsletter-form" id="newsletter-form">
              <input
                type="email"
                placeholder="Enter official email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="newsletter-input"
                id="newsletter-email-input"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
                style={{ padding: '0.65rem 1rem' }}
                id="btn-newsletter-subscribe"
              >
                {loading ? '...' : <Send size={16} />}
              </button>
            </form>

            {message && (
              <div
                style={{
                  marginTop: '0.75rem',
                  fontSize: '0.825rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  color: message.type === 'success' ? '#34d399' : '#f87171',
                }}
              >
                {message.type === 'success' ? <CheckCircle2 size={15} /> : <AlertCircle size={15} />}
                <span>{message.text}</span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <div>
            &copy; 2026 iCampusPro Platforms Pvt. Ltd. All rights reserved.
          </div>

          <div className="social-links">
            {/* SVG Twitter / X */}
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="Twitter">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            {/* SVG LinkedIn */}
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="LinkedIn">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            {/* SVG Facebook */}
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="Facebook">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
              </svg>
            </a>
            {/* SVG Globe */}
            <a href="https://icampuspro.com" target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="Global Web Portal">
              <Globe size={15} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
