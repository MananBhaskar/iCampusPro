'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  Award,
  ShieldCheck,
  CheckCircle2,
  Users,
  Building2,
  FileText,
  Briefcase,
  Layers,
  ArrowRight,
  Sparkles,
  BookOpen,
  Calendar,
  Lock,
} from 'lucide-react';
import RegistrationModal from '@/components/RegistrationModal';

export default function CollegesEnterpriseSolutionPage() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const modules = [
    {
      title: 'Choice Based Credit System (CBCS) Engine',
      desc: 'Automates elective selection, credit distribution, prerequisite validation, and automated conflict-free timetable generation across departments.',
      icon: BookOpen,
      color: '#06b6d4',
    },
    {
      title: 'Controller of Examinations (COE) Suite',
      desc: 'Hall ticket issuance, seat allotment blueprints, barcoded question paper packing, double-blind marks entry, and automated CGPA/SGPA calculations.',
      icon: Award,
      color: '#2563eb',
    },
    {
      title: 'NAAC, NBA & NIRF Accreditation Vault',
      desc: 'Continuous institutional data harvesting directly into Criterion 1 to 7 SSR templates. Export verified AQAR submissions with zero manual formatting.',
      icon: ShieldCheck,
      color: '#10b981',
    },
    {
      title: 'Campus Placements & Corporate Relations CRM',
      desc: 'Track student eligibility criteria, automate job opening broadcasts, schedule interview slots, and monitor package statistics for NIRF metrics.',
      icon: Briefcase,
      color: '#8b5cf6',
    },
    {
      title: 'Hostel, Mess & Gate Security Automation',
      desc: 'Digital room allocations, mess rebate requests, visitor pass issuance, and biometric night curfews with automated warden oversight.',
      icon: Building2,
      color: '#f59e0b',
    },
    {
      title: 'Research Grants & Faculty Publication Hub',
      desc: 'Catalog patents, Scopus-indexed citations, seed money allocations, and sponsored project reconciliations with live dean dashboards.',
      icon: Sparkles,
      color: '#ec4899',
    },
  ];

  return (
    <div style={{ background: 'var(--bg-page)', paddingBottom: '6rem' }}>
      {/* Hero */}
      <section
        style={{
          background: 'linear-gradient(135deg, #060911 0%, #0c1527 45%, #0369a1 100%)',
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
            <span>Colleges & Universities</span>
          </div>

          <div className="enterprise-pill" style={{ background: 'rgba(6, 182, 212, 0.2)', color: '#67e8f9', border: '1px solid #06b6d4', marginBottom: '1.25rem' }}>
            <GraduationCap size={14} />
            <span>Autonomous Colleges & University ERP Suite</span>
          </div>

          <h1 style={{ fontSize: '3rem', color: 'white', marginBottom: '1rem', lineHeight: 1.15, maxWidth: '850px' }}>
            Next-Gen Higher Education ERP for{' '}
            <span style={{ background: 'linear-gradient(135deg, #a5f3fc, #60a5fa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Autonomous Excellence
            </span>
          </h1>

          <p style={{ fontSize: '1.2rem', color: '#cbd5e1', maxWidth: '720px', lineHeight: 1.6, marginBottom: '2.5rem' }}>
            Architected for state, central, private, and autonomous universities. Manage 50,000+ students, semester credit curricula, and complex examination evaluations with military-grade security.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setIsRegisterOpen(true)}
              style={{ padding: '0.85rem 2rem', fontSize: '1rem' }}
            >
              <span>Schedule University Demonstration</span>
              <ArrowRight size={18} />
            </button>
            <Link href="/contact" className="btn btn-outline-white" style={{ padding: '0.85rem 2rem', fontSize: '1rem' }}>
              <span>Request University RFP</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Compliance Strip */}
      <div className="compliance-strip">
        <div className="container">
          <div className="compliance-grid">
            <div className="compliance-item">
              <ShieldCheck size={18} color="#38bdf8" />
              <span>UGC & AICTE Guidelines Conformance</span>
            </div>
            <div className="compliance-item">
              <ShieldCheck size={18} color="#38bdf8" />
              <span>National Academic Depository (NAD) & Digilocker Ready</span>
            </div>
            <div className="compliance-item">
              <ShieldCheck size={18} color="#38bdf8" />
              <span>SAML 2.0 / Azure Active Directory Single Sign-On</span>
            </div>
            <div className="compliance-item">
              <ShieldCheck size={18} color="#38bdf8" />
              <span>Role-Based Multi-Campus Data Isolation</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modules */}
      <div className="container" style={{ marginTop: '4.5rem' }}>
        <div className="section-header">
          <span className="section-pill">Higher Ed Operating System</span>
          <h2 className="section-title">Built for Autonomous Rigor and UGC Accreditation</h2>
          <p className="section-subtitle">
            Consolidate admissions, faculty workloads, examination secrecy, placements, and alumni relations into one synchronized data fabric.
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
                  <span>Higher Education Enterprise Feature</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <RegistrationModal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />
    </div>
  );
}
