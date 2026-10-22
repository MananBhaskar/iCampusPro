'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Award,
  TrendingUp,
  Brain,
  CheckCircle2,
  Users,
  Target,
  FileSpreadsheet,
  ArrowRight,
  Sparkles,
  Smartphone,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import RegistrationModal from '@/components/RegistrationModal';

export default function CoachingEnterpriseSolutionPage() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const modules = [
    {
      title: 'All-India Rank (AIR) Percentile Prediction Engine',
      desc: 'Simulate national percentile benchmarks across thousands of test takers using multi-parameter normalized difficulty ratings and negative marking calculations.',
      icon: Target,
      color: '#f59e0b',
    },
    {
      title: 'High-Speed OMR Sheet & Digital CBT Engine',
      desc: 'Process 10,000+ OMR sheets per hour with automated error detection, double-pass OCR verification, and instant test report generation.',
      icon: Zap,
      color: '#2563eb',
    },
    {
      title: 'Dynamic Batch Scheduling & Reshuffling',
      desc: 'Seamlessly shift top-performing students into Star/Super-30 batches based on weighted test rankings, with automated timetable reassignment.',
      icon: Users,
      color: '#06b6d4',
    },
    {
      title: 'Daily Practice Problem (DPP) & Question Bank',
      desc: 'Curate categorized questions with difficulty levels, hint solutions, and chapter tagging. Track individual completion and topic mastery.',
      icon: BookOpen,
      color: '#10b981',
    },
    {
      title: 'Instant Parent Performance Alerts (WhatsApp/SMS)',
      desc: 'Deliver automated graphical scorecard cards directly to parents within 30 minutes of test completion, highlighting weak subjects and attendance.',
      icon: Smartphone,
      color: '#8b5cf6',
    },
    {
      title: 'Scholarship Admission Test (TALLENTEX Style) Engine',
      desc: 'Host national talent search exams with instant percentage fee concessions, hall ticket generation, and automated multi-center registration.',
      icon: Award,
      color: '#ec4899',
    },
  ];

  return (
    <div style={{ background: 'var(--bg-page)', paddingBottom: '6rem' }}>
      {/* Hero */}
      <section
        style={{
          background: 'linear-gradient(135deg, #060911 0%, #1c1917 45%, #78350f 100%)',
          color: 'white',
          padding: '5rem 0 4rem 0',
        }}
      >
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#fde68a', marginBottom: '1.25rem' }}>
            <Link href="/" style={{ color: '#fef3c7' }}>
              Home
            </Link>
            <span>/</span>
            <span>Enterprise Solutions</span>
            <span>/</span>
            <span>Coaching Academies</span>
          </div>

          <div className="enterprise-pill" style={{ background: 'rgba(245, 158, 11, 0.2)', color: '#fde68a', border: '1px solid #f59e0b', marginBottom: '1.25rem' }}>
            <Target size={14} />
            <span>Competitive Coaching & Test Series Enterprise ERP</span>
          </div>

          <h1 style={{ fontSize: '3rem', color: 'white', marginBottom: '1rem', lineHeight: 1.15, maxWidth: '850px' }}>
            Engineered for Top AIRs in{' '}
            <span style={{ background: 'linear-gradient(135deg, #fef08a, #fb923c)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              JEE, NEET, UPSC & Foundation
            </span>
          </h1>

          <p style={{ fontSize: '1.2rem', color: '#e7e5e4', maxWidth: '720px', lineHeight: 1.6, marginBottom: '2.5rem' }}>
            Empowering premier coaching networks and test preparation academies. Deliver instant test analytics, optimize batch velocity, and scale across multi-city branches with zero lag.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setIsRegisterOpen(true)}
              style={{ padding: '0.85rem 2rem', fontSize: '1rem', background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}
            >
              <span>Schedule Coaching ERP Demo</span>
              <ArrowRight size={18} />
            </button>
            <Link href="/contact" className="btn btn-outline-white" style={{ padding: '0.85rem 2rem', fontSize: '1rem' }}>
              <span>Request Custom Coaching Quote</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Compliance Strip */}
      <div className="compliance-strip" style={{ background: '#0c0a09' }}>
        <div className="container">
          <div className="compliance-grid">
            <div className="compliance-item">
              <ShieldCheck size={18} color="#f59e0b" />
              <span>Handles 50,000+ Concurrent Online CBT Examinees</span>
            </div>
            <div className="compliance-item">
              <ShieldCheck size={18} color="#f59e0b" />
              <span>Multi-Center Batch & Dropper Section Optimizer</span>
            </div>
            <div className="compliance-item">
              <ShieldCheck size={18} color="#f59e0b" />
              <span>Automated Daily WhatsApp Parent Report Cards</span>
            </div>
            <div className="compliance-item">
              <ShieldCheck size={18} color="#f59e0b" />
              <span>Sub-Second Scorecard & AIR Rank Generation</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modules */}
      <div className="container" style={{ marginTop: '4.5rem' }}>
        <div className="section-header">
          <span className="section-pill" style={{ background: '#fef3c7', color: '#b45309' }}>
            Test Preparation Suite
          </span>
          <h2 className="section-title">Everything a Top National Coaching Institute Needs</h2>
          <p className="section-subtitle">
            From OMR scanning to AI-driven weak topic diagnostics, turn test data into student rank breakthroughs.
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
                  <span>Coaching Enterprise Core</span>
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
