'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  School,
  Bus,
  ShieldCheck,
  CheckCircle2,
  Users,
  Award,
  ArrowRight,
  Sparkles,
  BookOpen,
  Calendar,
  CreditCard,
  FileSpreadsheet,
  Cpu,
  Layers,
  MapPin,
} from 'lucide-react';
import RegistrationModal from '@/components/RegistrationModal';

export default function SchoolsEnterpriseSolutionPage() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const modules = [
    {
      title: 'Automated Academic Gradebook (CBSE / ICSE / IB)',
      desc: 'Compliant with NEP 2020 and global continuous evaluation rubrics. Generates tamper-proof digital report cards with 1-click publishing.',
      icon: BookOpen,
      color: '#2563eb',
    },
    {
      title: 'SafeTransit GPS Bus Tracking & Geofencing',
      desc: 'Live bus telemetry, RFID tap-in/tap-out at vehicle boarding, and automated WhatsApp/SMS arrival alerts before the bus reaches the child’s stop.',
      icon: Bus,
      color: '#06b6d4',
    },
    {
      title: 'Digital Admissions & Multi-Currency Fees',
      desc: 'Zero-touch registration enquiry pipeline, automated merit allotment, and integrated payment gateway with instant reconciliation and zero ledger errors.',
      icon: CreditCard,
      color: '#10b981',
    },
    {
      title: 'Class, Section & House Allotment Engine',
      desc: 'Algorithmic balancing of student strength, gender ratios, second language choices, and co-curricular house divisions with audit history.',
      icon: Users,
      color: '#8b5cf6',
    },
    {
      title: 'Parent-Teacher Communication & Mobile App',
      desc: 'Instant broadcasts, scheduled parent-teacher conference booking, digital leave applications, and homework sync with attachments.',
      icon: Sparkles,
      color: '#f59e0b',
    },
    {
      title: 'Central Multi-Branch Governance',
      desc: 'Oversee 10 to 100 school campuses under one executive dashboard. Consolidate financials, audit attendance, and benchmark academic performance.',
      icon: Layers,
      color: '#ef4444',
    },
  ];

  return (
    <div style={{ background: 'var(--bg-page)', paddingBottom: '6rem' }}>
      {/* Hero Section */}
      <section
        style={{
          background: 'linear-gradient(135deg, #060911 0%, #0f172a 45%, #1e3a8a 100%)',
          color: 'white',
          padding: '5rem 0 4rem 0',
        }}
      >
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#93c5fd', marginBottom: '1.25rem' }}>
            <Link href="/" style={{ color: '#e0f2fe' }}>
              Home
            </Link>
            <span>/</span>
            <span>Enterprise Solutions</span>
            <span>/</span>
            <span>K-12 Schools</span>
          </div>

          <div className="enterprise-pill" style={{ background: 'rgba(59, 130, 246, 0.2)', color: '#93c5fd', border: '1px solid #3b82f6', marginBottom: '1.25rem' }}>
            <School size={14} />
            <span>Enterprise K-12 Digital Campus Suite</span>
          </div>

          <h1 style={{ fontSize: '3rem', color: 'white', marginBottom: '1rem', lineHeight: 1.15, maxWidth: '850px' }}>
            Empower Your School With{' '}
            <span style={{ background: 'linear-gradient(135deg, #67e8f9, #60a5fa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Intelligent Governance & Safety
            </span>
          </h1>

          <p style={{ fontSize: '1.2rem', color: '#cbd5e1', maxWidth: '720px', lineHeight: 1.6, marginBottom: '2.5rem' }}>
            Designed for forward-thinking Day, Day-Boarding, and Pure Residential Schools. Trusted by India’s leading institutions for end-to-end administration, student safety, and academic mastery.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setIsRegisterOpen(true)}
              style={{ padding: '0.85rem 2rem', fontSize: '1rem' }}
            >
              <span>Schedule Institutional Demo</span>
              <ArrowRight size={18} />
            </button>
            <Link href="/contact" className="btn btn-outline-white" style={{ padding: '0.85rem 2rem', fontSize: '1rem' }}>
              <span>Request RFP / Pricing</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Compliance Bar */}
      <div className="compliance-strip">
        <div className="container">
          <div className="compliance-grid">
            <div className="compliance-item">
              <ShieldCheck size={18} color="#38bdf8" />
              <span>NEP 2020 & CCE Evaluation Framework Compliant</span>
            </div>
            <div className="compliance-item">
              <ShieldCheck size={18} color="#38bdf8" />
              <span>PCI-DSS Level 1 Encrypted Fee Gateways</span>
            </div>
            <div className="compliance-item">
              <ShieldCheck size={18} color="#38bdf8" />
              <span>India MeitY Sovereign Cloud Data Residency</span>
            </div>
            <div className="compliance-item">
              <ShieldCheck size={18} color="#38bdf8" />
              <span>99.99% Enterprise Uptime SLA</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modules Grid */}
      <div className="container" style={{ marginTop: '4.5rem' }}>
        <div className="section-header">
          <span className="section-pill">Enterprise Capabilities</span>
          <h2 className="section-title">Built Specifically for K-12 School Workflows</h2>
          <p className="section-subtitle">
            Say goodbye to fragmented third-party plugins. iCampusPro replaces 8+ separate tools with a single unified school operating system.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
          {modules.map((m, idx) => {
            const IconComp = m.icon;
            return (
              <div
                key={idx}
                style={{
                  background: 'white',
                  borderRadius: 'var(--radius-xl)',
                  border: '1px solid var(--border-light)',
                  padding: '2.25rem',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div
                    style={{
                      width: '3.5rem',
                      height: '3.5rem',
                      borderRadius: 'var(--radius-lg)',
                      background: `${m.color}15`,
                      color: m.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '1.5rem',
                    }}
                  >
                    <IconComp size={26} />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', color: 'var(--primary-deep)', marginBottom: '0.75rem' }}>
                    {m.title}
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.65 }}>
                    {m.desc}
                  </p>
                </div>

                <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.85rem', color: m.color, fontWeight: 600 }}>
                  <CheckCircle2 size={16} />
                  <span>Available in Enterprise Tier</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Campus Strength Tiers */}
      <div className="container" style={{ marginTop: '5rem' }}>
        <div
          style={{
            background: 'white',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--border-light)',
            padding: '3rem',
            boxShadow: 'var(--shadow-md)',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span className="section-pill">Capacity Scaling</span>
            <h2 style={{ fontSize: '2rem', color: 'var(--primary-deep)', marginTop: '0.5rem' }}>
              Engineered for Every School Scale
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
            <div style={{ background: 'var(--bg-page)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase' }}>
                Single Campus
              </span>
              <h3 style={{ fontSize: '1.5rem', margin: '0.5rem 0' }}>Up to 2,500 Students</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
                Ideal for independent day schools seeking complete fee, attendance, and parent communication automation.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                <li>✓ Full academic gradebook</li>
                <li>✓ GPS transport module</li>
                <li>✓ Parent mobile app</li>
              </ul>
            </div>

            <div style={{ background: 'var(--primary-soft)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--primary-border)' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase' }}>
                Large Institution
              </span>
              <h3 style={{ fontSize: '1.5rem', margin: '0.5rem 0' }}>2,500 – 10,000 Students</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
                Built for prestigious day-cum-boarding schools with high examination volumes and active bus fleets.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                <li>✓ Dedicated database instance</li>
                <li>✓ Biometric turnstile integration</li>
                <li>✓ Priority 2-hour SLA support</li>
              </ul>
            </div>

            <div style={{ background: 'var(--bg-page)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)' }}>
              <span style={{ fontSize: '0.8rem', color: '#8b5cf6', fontWeight: 700, textTransform: 'uppercase' }}>
                Multi-Branch Society
              </span>
              <h3 style={{ fontSize: '1.5rem', margin: '0.5rem 0' }}>10,000+ Multi-Campus</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
                Designed for educational trusts, societies, and chains operating across multiple states.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                <li>✓ Multi-tenant sovereign clustering</li>
                <li>✓ Dedicated account director</li>
                <li>✓ Custom ERP legacy migration</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <RegistrationModal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />
    </div>
  );
}
