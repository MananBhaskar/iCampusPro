'use client';

import React from 'react';
import Link from 'next/link';
import {
  Compass,
  Building2,
  Users,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  FileText,
  Calendar,
  CreditCard,
  GraduationCap,
} from 'lucide-react';

export default function HowItWorksPage() {
  const steps = [
    {
      num: '01',
      title: 'Institute Discovery & Verification',
      desc: 'Prospective parents and students discover accredited educational institutions through structured search, verified amenities inspections, board affiliations, and validated reviews.',
      icon: Compass,
      color: '#2563eb',
    },
    {
      num: '02',
      title: 'Enquiry & Digital Admissions',
      desc: 'During Phase 1, educational institutes submit registration enquiries. Our onboarding division validates accreditation credentials and equips campus administrators with demo sandboxes.',
      icon: Building2,
      color: '#06b6d4',
    },
    {
      num: '03',
      title: 'Automated Academic & Fee Workflows',
      desc: 'Institutions automate timetable generation, continuous evaluations, student biometric attendance, and PCI-DSS Level 1 compliant online fee collection with real-time reconciliations.',
      icon: CreditCard,
      color: '#10b981',
    },
    {
      num: '04',
      title: 'Smart AI Governance & Parent Sync',
      desc: 'Automated notification pipelines via SMS and WhatsApp keep parents informed on attendance and exam marks, while AI predictive analytics spot early performance dips.',
      icon: Sparkles,
      color: '#8b5cf6',
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
            <span>How It Works</span>
          </div>

          <div className="hero-tag" style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)' }}>
            <GraduationCap size={16} />
            <span>Operational Architecture &bull; iCampusPro Platform</span>
          </div>

          <h1 style={{ fontSize: '2.85rem', color: 'white', marginBottom: '0.85rem', letterSpacing: '-0.02em' }}>
            How iCampusPro Transforms Education
          </h1>
          <p style={{ fontSize: '1.15rem', color: '#cbd5e1', maxWidth: '720px', lineHeight: 1.65 }}>
            A unified educational operating system designed for educational leaders, educators, families, and learners. From discovery to graduation.
          </p>
        </div>
      </section>

      {/* Step by Step Progression */}
      <div className="container" style={{ marginTop: '4rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem' }}>
          {steps.map((step) => {
            const IconComp = step.icon;
            return (
              <div
                key={step.num}
                style={{
                  background: 'white',
                  borderRadius: 'var(--radius-xl)',
                  padding: '2.5rem',
                  border: '1px solid var(--border-light)',
                  boxShadow: 'var(--shadow-sm)',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                    <div
                      style={{
                        width: '3.5rem',
                        height: '3.5rem',
                        borderRadius: 'var(--radius-lg)',
                        background: `${step.color}15`,
                        color: step.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <IconComp size={26} />
                    </div>
                    <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--border-light)' }}>
                      {step.num}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.45rem', color: 'var(--primary-deep)', marginBottom: '0.75rem' }}>
                    {step.title}
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                    {step.desc}
                  </p>
                </div>

                <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '1rem', display: 'flex', alignItems: 'center', gap: 6, color: step.color, fontWeight: 600, fontSize: '0.875rem' }}>
                  <CheckCircle2 size={16} />
                  <span>Verified Operational Module</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Banner */}
        <div
          style={{
            marginTop: '4rem',
            background: 'linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%)',
            color: 'white',
            borderRadius: 'var(--radius-xl)',
            padding: '3.5rem 3rem',
            textAlign: 'center',
            boxShadow: 'var(--shadow-lg)',
          }}
        >
          <h2 style={{ fontSize: '2.25rem', color: 'white', marginBottom: '1rem' }}>
            Experience the Future of Campus Operations
          </h2>
          <p style={{ color: '#cbd5e1', fontSize: '1.1rem', maxWidth: '620px', margin: '0 auto 2rem auto' }}>
            Get in touch with our institutional onboarding specialists or explore accredited campuses across India.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/institutes" className="btn btn-primary" style={{ padding: '0.85rem 2rem' }}>
              <span>Explore Verified Institutes</span>
              <ArrowRight size={17} />
            </Link>
            <Link href="/contact" className="btn btn-outline-white" style={{ padding: '0.85rem 2rem' }}>
              <span>Contact Platform Support</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
