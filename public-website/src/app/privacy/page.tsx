'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Calendar,
  Lock,
  ChevronRight,
  Mail,
  Building,
  FileText,
  AlertCircle,
  Loader2,
  ExternalLink,
} from 'lucide-react';

interface PolicySection {
  id: string;
  title: string;
  content: string;
}

interface PrivacyPolicyData {
  version: string;
  lastUpdated: string;
  sections: PolicySection[];
}

export default function PrivacyPolicyPage() {
  const [policy, setPolicy] = useState<PrivacyPolicyData | null>(null);
  const [activeSection, setActiveSection] = useState<string>('data-usage');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPolicy() {
      try {
        setLoading(true);
        const res = await fetch('/api/public/privacy-policy');
        const json = await res.json();
        if (json.success && json.data) {
          setPolicy(json.data);
          if (json.data.sections && json.data.sections.length > 0) {
            setActiveSection(json.data.sections[0].id);
          }
        } else {
          setError('Failed to load privacy policy content.');
        }
      } catch (err) {
        setError('Network error loading legal policy document.');
      } finally {
        setLoading(false);
      }
    }
    fetchPolicy();
  }, []);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '6rem 0', textAlign: 'center' }}>
        <Loader2 size={36} className="animate-spin" style={{ margin: '0 auto 1rem auto', color: 'var(--primary)' }} />
        <p style={{ color: 'var(--text-muted)' }}>Loading Privacy Policy...</p>
      </div>
    );
  }

  if (error || !policy) {
    return (
      <div className="container" style={{ padding: '6rem 0', textAlign: 'center' }}>
        <div style={{ maxWidth: '500px', margin: '0 auto', background: 'white', padding: '3rem', borderRadius: 'var(--radius-xl)' }}>
          <AlertCircle size={44} color="#ef4444" style={{ margin: '0 auto 1rem auto' }} />
          <h2 style={{ fontSize: '1.4rem', color: 'var(--primary-deep)', marginBottom: '0.5rem' }}>
            Privacy Policy Unavailable
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>{error || 'Unable to load privacy statements.'}</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: 'var(--bg-page)', paddingBottom: '6rem' }}>
      {/* Policy Hero Header */}
      <section
        style={{
          background: 'linear-gradient(135deg, #090d16 0%, #0f172a 40%, #1e3a8a 100%)',
          color: 'white',
          padding: '4rem 0 3.5rem 0',
        }}
      >
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#93c5fd', marginBottom: '1.25rem' }}>
            <Link href="/" style={{ color: '#e0f2fe' }}>
              Home
            </Link>
            <span>/</span>
            <span>Legal</span>
            <span>/</span>
            <span>Privacy Policy</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <span
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                color: '#67e8f9',
                padding: '0.25rem 0.75rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.8rem',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5,
              }}
            >
              <ShieldCheck size={14} /> Official Policy v{policy.version}
            </span>

            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5,
                color: '#cbd5e1',
                fontSize: '0.85rem',
              }}
            >
              <Calendar size={14} /> Last Updated: {policy.lastUpdated}
            </span>
          </div>

          <h1 style={{ fontSize: '2.75rem', color: 'white', marginBottom: '0.75rem' }}>
            iCampusPro Privacy Policy
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#cbd5e1', maxWidth: '720px', lineHeight: 1.6 }}>
            How iCampusPro collects, stores, protects, and governs institutional records, student data, and personal information across our campus management ecosystem.
          </p>
        </div>
      </section>

      {/* Main Layout: Sticky Left TOC + Right Content (FR-PRIV-002) */}
      <div className="container" style={{ marginTop: '3.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '0.8fr 2.2fr', gap: '3rem', alignItems: 'flex-start' }}>
          {/* Left Table of Contents */}
          <aside
            style={{
              position: 'sticky',
              top: '6rem',
              background: 'white',
              padding: '1.75rem',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--border-light)',
              boxShadow: 'var(--shadow-sm)',
            }}
            id="privacy-table-of-contents"
            aria-label="Table of Contents"
          >
            <h3
              style={{
                fontSize: '1.05rem',
                color: 'var(--primary-deep)',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <FileText size={18} color="var(--primary)" />
              Table of Contents
            </h3>

            <nav>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                {policy.sections.map((sec) => {
                  const isActive = activeSection === sec.id;
                  return (
                    <li key={sec.id}>
                      <button
                        type="button"
                        onClick={() => scrollToSection(sec.id)}
                        style={{
                          width: '100%',
                          textAlign: 'left',
                          padding: '0.55rem 0.75rem',
                          borderRadius: 'var(--radius-md)',
                          fontSize: '0.875rem',
                          fontWeight: isActive ? 700 : 500,
                          background: isActive ? 'var(--primary-soft)' : 'transparent',
                          color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
                          border: isActive ? '1px solid var(--primary-border)' : '1px solid transparent',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}
                      >
                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {sec.title}
                        </span>
                        {isActive && <ChevronRight size={14} color="var(--primary)" />}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-light)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Need legal clarification?
              <Link href="/contact" style={{ display: 'block', color: 'var(--primary)', fontWeight: 600, marginTop: '0.25rem' }}>
                Contact Grievance Desk &rarr;
              </Link>
            </div>
          </aside>

          {/* Right Policy Content (FR-PRIV-003 to FR-PRIV-007) */}
          <main style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {policy.sections.map((sec) => (
              <section
                key={sec.id}
                id={sec.id}
                style={{
                  background: 'white',
                  padding: '2.25rem',
                  borderRadius: 'var(--radius-xl)',
                  border: '1px solid var(--border-light)',
                  boxShadow: 'var(--shadow-xs)',
                  scrollMarginTop: '6rem',
                }}
              >
                <h2 style={{ fontSize: '1.45rem', color: 'var(--primary-deep)', marginBottom: '1rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.75rem' }}>
                  {sec.title}
                </h2>
                <div style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.8' }}>
                  {sec.content}
                </div>
              </section>
            ))}

            {/* Grievance & Compliance Box */}
            <div
              style={{
                background: 'linear-gradient(135deg, #eff6ff 0%, #ecfeff 100%)',
                padding: '2rem',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid #bfdbfe',
              }}
            >
              <h3 style={{ fontSize: '1.25rem', color: 'var(--primary-deep)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: 6 }}>
                <Lock size={20} color="var(--primary)" />
                Direct Privacy Inquiries
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.25rem' }}>
                If you have questions regarding personal data access, rectification, or withdrawal of consent, please email our Compliance Office directly or submit a ticket through our Contact Us portal.
              </p>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <a
                  href="mailto:privacy@icampuspro.com"
                  className="btn btn-secondary"
                  style={{ background: 'white' }}
                >
                  <Mail size={16} color="var(--primary)" />
                  <span>privacy@icampuspro.com</span>
                </a>
                <Link href="/contact" className="btn btn-primary">
                  <span>Open Contact Us</span>
                  <ExternalLink size={15} />
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
