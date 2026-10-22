'use client';

import React from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Calendar,
  User,
  ArrowRight,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Brain,
  GraduationCap,
} from 'lucide-react';

export default function BlogListingPage() {
  const articles = [
    {
      id: 'blog-1',
      title: 'How AI-Powered Analytics are Predicting Student Success & Dropout Risks',
      excerpt: 'Discover how modern machine learning models analyze continuous assessment patterns and attendance shifts to help school counselors intervene early.',
      category: 'AI & Educational Tech',
      author: 'Dr. Vivek Swaminathan',
      date: 'October 19, 2026',
      readTime: '6 min read',
      color: '#8b5cf6',
    },
    {
      id: 'blog-2',
      title: 'CBSE vs. IB Curriculum: A Comprehensive Guide for 2026-27 School Admissions',
      excerpt: 'Comparing board assessment styles, global university acceptance rates, and experiential learning pedagogies for Indian parents.',
      category: 'Curriculum & Governance',
      author: 'Sunita Mehra, Academic Advisor',
      date: 'October 12, 2026',
      readTime: '8 min read',
      color: '#2563eb',
    },
    {
      id: 'blog-3',
      title: 'Automating Campus Fee Reconciliation: Zero Leakage & Instant Parent Invoicing',
      excerpt: 'How PCI-DSS compliant payment gateways and automated reconciliation eliminate end-of-term accounting bottlenecks for large colleges.',
      category: 'Financial Operations',
      author: 'iCampusPro Fintech Division',
      date: 'October 05, 2026',
      readTime: '5 min read',
      color: '#10b981',
    },
    {
      id: 'blog-4',
      title: 'Biometric Transport Safety: Live GPS Tracking and Emergency SMS Alerts',
      excerpt: 'Enhancing student security between gate and home. Why real-time RFID tap-ins and geo-fenced bus notifications have become non-negotiable standards.',
      category: 'Campus Security',
      author: 'Operations Security Team',
      date: 'September 28, 2026',
      readTime: '4 min read',
      color: '#06b6d4',
    },
  ];

  return (
    <div style={{ background: 'var(--bg-page)', paddingBottom: '6rem' }}>
      {/* Header */}
      <section
        style={{
          background: 'linear-gradient(135deg, #090d16 0%, #1e3a8a 60%, #0369a1 100%)',
          color: 'white',
          padding: '4.5rem 0 3.5rem 0',
        }}
      >
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#93c5fd', marginBottom: '1.25rem' }}>
            <Link href="/" style={{ color: '#e0f2fe' }}>
              Home
            </Link>
            <span>/</span>
            <span>Blog & Insights</span>
          </div>

          <div className="hero-tag" style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)' }}>
            <BookOpen size={16} />
            <span>Educational Leadership & Insights</span>
          </div>

          <h1 style={{ fontSize: '2.85rem', color: 'white', marginBottom: '0.85rem' }}>
            iCampusPro Educational Blog
          </h1>
          <p style={{ fontSize: '1.15rem', color: '#cbd5e1', maxWidth: '720px', lineHeight: 1.6 }}>
            Thought leadership, regulatory guidelines, AI advancements in pedagogy, and admissions intelligence for Indian educators and parents.
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <div className="container" style={{ marginTop: '3.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem' }}>
          {articles.map((art) => (
            <article
              key={art.id}
              style={{
                background: 'white',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--border-light)',
                padding: '2.25rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: 'var(--shadow-sm)',
                transition: 'all 200ms ease',
              }}
              id={`blog-card-${art.id}`}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span
                    style={{
                      background: `${art.color}15`,
                      color: art.color,
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      padding: '0.25rem 0.75rem',
                      borderRadius: 'var(--radius-full)',
                      textTransform: 'uppercase',
                    }}
                  >
                    {art.category}
                  </span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{art.readTime}</span>
                </div>

                <h2 style={{ fontSize: '1.35rem', color: 'var(--primary-deep)', marginBottom: '0.75rem', lineHeight: 1.35 }}>
                  {art.title}
                </h2>

                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.65, marginBottom: '1.5rem' }}>
                  {art.excerpt}
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-light)', paddingTop: '1rem', fontSize: '0.85rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                  <User size={15} color="var(--primary)" />
                  <span>{art.author}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--text-muted)' }}>
                  <Calendar size={14} />
                  <span>{art.date}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
