'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  School,
  BookOpen,
  Sparkles,
  Users,
  ShieldCheck,
  Award,
  ArrowRight,
  Star,
  MapPin,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Brain,
  MessageSquare,
  Building,
  CheckCircle,
  ExternalLink,
} from 'lucide-react';
import RegistrationModal from '@/components/RegistrationModal';

interface Institute {
  id: string;
  slug: string;
  name: string;
  type: string;
  city: string;
  state: string;
  ratingSummary: {
    averageRating: number;
    totalReviews: number;
  };
}

interface Advertisement {
  id: string;
  title: string;
  advertiser: string;
  badge?: string;
  description: string;
  ctaText: string;
  destinationUrl: string;
}

interface Testimonial {
  id: string;
  displayName: string;
  role: string;
  instituteName: string;
  avatar: string;
  text: string;
  rating: number;
}

export default function HomePage() {
  const [counts, setCounts] = useState<Record<string, number>>({
    'Play Schools': 1,
    'Schools': 2,
    'Colleges': 1,
    'Coaching Institutes': 1,
    'Others': 1,
  });
  const [topRated, setTopRated] = useState<Institute[]>([]);
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [activeSegment, setActiveSegment] = useState<'schools' | 'colleges' | 'coaching'>('schools');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHomeData() {
      try {
        const res = await fetch('/api/public/home');
        const json = await res.json();
        if (json.success && json.data) {
          setCounts(json.data.counts || {});
          setTopRated(json.data.topRated || []);
          setAdvertisements(json.data.advertisements || []);
          setTestimonials(json.data.testimonials || []);
        }
      } catch (err) {
        console.error('Failed to load homepage data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadHomeData();
  }, []);

  // Advertisement carousel rotation
  useEffect(() => {
    if (advertisements.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentAdIndex((prev) => (prev + 1) % advertisements.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [advertisements.length]);

  const categories = [
    { label: 'Play Schools', countKey: 'Play Schools', icon: Sparkles, color: '#ec4899', query: 'Play School' },
    { label: 'Schools', countKey: 'Schools', icon: School, color: '#2563eb', query: 'School' },
    { label: 'Colleges', countKey: 'Colleges', icon: GraduationCap, color: '#06b6d4', query: 'College' },
    { label: 'Coaching Institutes', countKey: 'Coaching Institutes', icon: BookOpen, color: '#f59e0b', query: 'Coaching Institute' },
    { label: 'Others', countKey: 'Others', icon: Building, color: '#8b5cf6', query: 'Others' },
  ];

  const features = [
    {
      icon: Building,
      title: 'Institute Registration & Profile',
      desc: 'Seamless onboarding for educational campuses with verification workflows, verified accreditation badges, and public discovery profiles.',
      color: '#2563eb',
    },
    {
      icon: BookOpen,
      title: 'Academic Management',
      desc: 'End-to-end curriculum mapping, automated timetable generator, continuous evaluation, and real-time report card publishing.',
      color: '#06b6d4',
    },
    {
      icon: MessageSquare,
      title: 'Parent & Faculty Communication',
      desc: 'Real-time multi-channel alerts via SMS, WhatsApp, and push notifications for attendance, exam results, and fee notices.',
      color: '#10b981',
    },
    {
      icon: Brain,
      title: 'Smart AI Insights & Analytics',
      desc: 'Predictive student performance trends, dropout prevention indicators, automated grading aids, and executive campus intelligence.',
      color: '#8b5cf6',
    },
    {
      icon: Users,
      title: 'Public Institute Discovery',
      desc: 'Search, compare, and explore verified academic institutions with validated reviews, facility inspections, and fee clarity.',
      color: '#f59e0b',
    },
    {
      icon: ShieldCheck,
      title: 'Centralized Administration',
      desc: 'Role-based access control, PCI-DSS compliant fee gateways, biometric transport tracking, and automated audit trails.',
      color: '#ef4444',
    },
  ];

  return (
    <>
      {/* 2. Hero Section (FR-HOME-002) */}
      <section className="hero-section" id="hero-section">
        <div className="container">
          <div className="hero-grid">
            <div>
              <div className="hero-tag" id="hero-version-tag">
                <Sparkles size={16} />
                <span>Next-Gen Campus Intelligence Platform &bull; Phase 1</span>
              </div>
              <h1 className="hero-headline" id="hero-main-headline">
                Smart Campus Management for{' '}
                <span className="text-highlight">Schools, Colleges & Coaching Institutes</span>
              </h1>
              <p className="hero-desc">
                Elevate institutional governance with a unified ecosystem connecting school heads, faculty, parents, and students. Discover accredited institutes, streamline digital admissions, and automate academic workflows.
              </p>

              <div className="hero-cta-group">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setIsRegisterModalOpen(true)}
                  id="btn-hero-register-institute"
                  style={{ padding: '0.85rem 1.75rem', fontSize: '1rem' }}
                >
                  <span>Register Institute</span>
                  <ArrowRight size={18} />
                </button>

                <Link
                  href="/institutes"
                  className="btn btn-outline-white"
                  id="btn-hero-explore-institutes"
                  style={{ padding: '0.85rem 1.75rem', fontSize: '1rem' }}
                >
                  <span>Explore Institutes</span>
                  <ExternalLink size={17} />
                </Link>
              </div>

              <div className="hero-stats-inline">
                <div className="hero-stat-item">
                  <h4>500+</h4>
                  <p>Partner Campuses</p>
                </div>
                <div className="hero-stat-item">
                  <h4>250,000+</h4>
                  <p>Students Managed</p>
                </div>
                <div className="hero-stat-item">
                  <h4>99.98%</h4>
                  <p>Platform Uptime</p>
                </div>
              </div>
            </div>

            {/* Dashboard Visual Preview */}
            <div className="hero-visual">
              <div className="dashboard-card-mockup" id="hero-dashboard-preview">
                <div className="mockup-header">
                  <div className="mockup-dots">
                    <span className="mockup-dot dot-red" />
                    <span className="mockup-dot dot-yellow" />
                    <span className="mockup-dot dot-green" />
                  </div>
                  <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 600 }}>
                    iCampusPro Live Console
                  </span>
                </div>

                <div className="mockup-metrics-grid">
                  <div className="mockup-metric-box">
                    <span className="metric-label">Daily Attendance</span>
                    <h5>98.4%</h5>
                    <span style={{ fontSize: '0.75rem', color: '#34d399', display: 'flex', alignItems: 'center', gap: 2 }}>
                      <TrendingUp size={12} /> +2.1% vs last term
                    </span>
                  </div>

                  <div className="mockup-metric-box">
                    <span className="metric-label">Fee Reconciliation</span>
                    <h5>100%</h5>
                    <span style={{ fontSize: '0.75rem', color: '#38bdf8' }}>
                      Automated Settlement
                    </span>
                  </div>
                </div>

                <div
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    padding: '1rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.8rem', color: '#e2e8f0' }}>
                    <span>Active Academic Sessions</span>
                    <span style={{ color: '#34d399', fontWeight: 600 }}>Term 2026-27</span>
                  </div>
                  <div style={{ width: '100%', height: 6, background: 'rgba(255, 255, 255, 0.15)', borderRadius: 3, overflow: 'hidden' }}>
                    <div style={{ width: '84%', height: '100%', background: 'linear-gradient(90deg, #38bdf8, #818cf8)' }} />
                  </div>
                </div>

                {/* Floating Badges */}
                <div className="mockup-floating-badge badge-top-left">
                  <Award size={18} color="#2563eb" />
                  <span>NAAC & CBSE Certified</span>
                </div>

                <div className="mockup-floating-badge badge-bottom-right">
                  <CheckCircle size={18} color="#10b981" />
                  <span>Enquiries Automated: 100%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Trust & Compliance Strip */}
      <div className="compliance-strip">
        <div className="container">
          <div className="compliance-grid">
            <div className="compliance-item">
              <ShieldCheck size={18} color="#38bdf8" />
              <span>Dedicated Suites for <strong style={{ color: 'white' }}>Schools, Colleges & Coaching Centers</strong></span>
            </div>
            <div className="compliance-item">
              <Award size={18} color="#38bdf8" />
              <span>NEP 2020, UGC & NAAC Accreditation Compliant</span>
            </div>
            <div className="compliance-item">
              <ShieldCheck size={18} color="#38bdf8" />
              <span>India MeitY Sovereign Cloud & AES-256 Storage</span>
            </div>
            <div className="compliance-item">
              <CheckCircle size={18} color="#34d399" />
              <span>99.99% Enterprise SLA & SAML 2.0 SSO</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Institute Statistics Strip (FR-HOME-004) */}
      <section className="statistics-section" id="categories" aria-label="Institute Category Statistics">
        <div className="container">
          <div className="stats-grid">
            {categories.map((cat) => {
              const IconComp = cat.icon;
              const countVal = counts[cat.countKey] || 0;
              return (
                <Link
                  key={cat.label}
                  href={`/institutes?category=${encodeURIComponent(cat.query)}`}
                  className="stat-category-card"
                  id={`cat-card-${cat.label.toLowerCase().replace(/\s+/g, '-')}`}
                  title={`Browse ${cat.label}`}
                >
                  <div className="stat-icon-wrap" style={{ color: cat.color }}>
                    <IconComp size={24} />
                  </div>
                  <div className="stat-info">
                    <h3>{countVal}</h3>
                    <span>{cat.label}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Platform Features Section (FR-HOME-005) */}
      <section className="features-section" id="features">
        <div className="container">
          <div className="section-header">
            <span className="section-pill">Core Architecture</span>
            <h2 className="section-title">Built for Modern Educational Excellence</h2>
            <p className="section-subtitle">
              Engineered with micro-services and role-based segregation, iCampusPro eliminates fragmented spreadsheets and disjointed tools.
            </p>
          </div>

          <div className="features-grid">
            {features.map((feat, index) => {
              const IconComponent = feat.icon;
              return (
                <div key={index} className="feature-card" id={`feature-card-${index}`}>
                  <div className="feature-icon-box" style={{ color: feat.color, backgroundColor: `${feat.color}15` }}>
                    <IconComponent size={26} />
                  </div>
                  <h3>{feat.title}</h3>
                  <p>{feat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enterprise Multi-Segment Solutions Switcher */}
      <section style={{ padding: '5rem 0', background: 'var(--bg-subtle)' }} id="solutions">
        <div className="container">
          <div className="section-header">
            <span className="section-pill">Enterprise Specialization</span>
            <h2 className="section-title">Engineered Specifically For Your Institution Type</h2>
            <p className="section-subtitle">
              Every educational segment requires unique workflows. iCampusPro delivers tailored operating environments with zero generic compromises.
            </p>
          </div>

          {/* Segment Switcher Tabs */}
          <div className="segment-tab-nav" role="tablist">
            <button
              type="button"
              className={`segment-tab-btn ${activeSegment === 'schools' ? 'active' : ''}`}
              onClick={() => setActiveSegment('schools')}
              role="tab"
              aria-selected={activeSegment === 'schools'}
              id="tab-segment-schools"
            >
              <School size={18} />
              <span>For K-12 Schools</span>
            </button>

            <button
              type="button"
              className={`segment-tab-btn ${activeSegment === 'colleges' ? 'active' : ''}`}
              onClick={() => setActiveSegment('colleges')}
              role="tab"
              aria-selected={activeSegment === 'colleges'}
              id="tab-segment-colleges"
            >
              <GraduationCap size={18} />
              <span>For Colleges & Universities</span>
            </button>

            <button
              type="button"
              className={`segment-tab-btn ${activeSegment === 'coaching' ? 'active' : ''}`}
              onClick={() => setActiveSegment('coaching')}
              role="tab"
              aria-selected={activeSegment === 'coaching'}
              id="tab-segment-coaching"
            >
              <BookOpen size={18} />
              <span>For Coaching Institutes</span>
            </button>
          </div>

          {/* Active Segment Card */}
          <div className="segment-content-card">
            {activeSegment === 'schools' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '3rem', alignItems: 'center' }}>
                <div>
                  <div className="enterprise-pill badge-school" style={{ marginBottom: '1rem' }}>
                    <School size={13} /> Day, Boarding & Multi-Branch K-12
                  </div>
                  <h3 style={{ fontSize: '2rem', color: 'var(--primary-deep)', marginBottom: '1rem', lineHeight: 1.25 }}>
                    Next-Generation Governance, Safe Transit & Gradebook
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '2rem' }}>
                    Automate continuous comprehensive evaluation (CCE), live RFID GPS bus tracking with arrival WhatsApp alerts, and end-to-end fee reconciliation with zero human errors.
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.925rem' }}>
                      <CheckCircle size={18} color="var(--primary)" style={{ flexShrink: 0, marginTop: 2 }} />
                      <span>CBSE, ICSE & IB digital report card publishing</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.925rem' }}>
                      <CheckCircle size={18} color="var(--primary)" style={{ flexShrink: 0, marginTop: 2 }} />
                      <span>Live GPS bus tracking & geofence notifications</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.925rem' }}>
                      <CheckCircle size={18} color="var(--primary)" style={{ flexShrink: 0, marginTop: 2 }} />
                      <span>Parent mobile app with instant broadcasts</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.925rem' }}>
                      <CheckCircle size={18} color="var(--primary)" style={{ flexShrink: 0, marginTop: 2 }} />
                      <span>Multi-branch central society administration</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <Link href="/solutions/schools" className="btn btn-primary">
                      <span>Explore School Suite</span>
                      <ArrowRight size={16} />
                    </Link>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setIsRegisterModalOpen(true)}
                    >
                      <span>Request School Sandbox</span>
                    </button>
                  </div>
                </div>

                <div
                  style={{
                    background: 'linear-gradient(135deg, #1e3a8a 0%, #0284c7 100%)',
                    borderRadius: 'var(--radius-xl)',
                    padding: '2.5rem',
                    color: 'white',
                    boxShadow: 'var(--shadow-lg)',
                  }}
                >
                  <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#7dd3fc', fontWeight: 700 }}>
                    K-12 Key Metrics
                  </span>
                  <div style={{ margin: '1.5rem 0', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div>
                      <h4 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'white', lineHeight: 1 }}>99.4%</h4>
                      <p style={{ color: '#bae6fd', fontSize: '0.85rem' }}>Parent portal adoption within 14 days of launch</p>
                    </div>
                    <div>
                      <h4 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'white', lineHeight: 1 }}>100%</h4>
                      <p style={{ color: '#bae6fd', fontSize: '0.85rem' }}>Automated fee reconciliation without bank mismatch</p>
                    </div>
                    <div>
                      <h4 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'white', lineHeight: 1 }}>Zero</h4>
                      <p style={{ color: '#bae6fd', fontSize: '0.85rem' }}>Lost report cards with tamper-proof digital certificates</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSegment === 'colleges' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '3rem', alignItems: 'center' }}>
                <div>
                  <div className="enterprise-pill badge-college" style={{ marginBottom: '1rem' }}>
                    <GraduationCap size={13} /> Autonomous Colleges & Universities
                  </div>
                  <h3 style={{ fontSize: '2rem', color: 'var(--primary-deep)', marginBottom: '1rem', lineHeight: 1.25 }}>
                    Credit Curricula, COE Exam Suite & NAAC Compliance
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '2rem' }}>
                    Built for high-volume higher education campuses. Manage Choice Based Credit System (CBCS), examination barcoding and double-blind evaluation, campus placements, and NAAC SSR reports.
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.925rem' }}>
                      <CheckCircle size={18} color="var(--primary)" style={{ flexShrink: 0, marginTop: 2 }} />
                      <span>CBCS semester course registration & credit engine</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.925rem' }}>
                      <CheckCircle size={18} color="var(--primary)" style={{ flexShrink: 0, marginTop: 2 }} />
                      <span>COE hall tickets, barcoded marks & CGPA calculator</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.925rem' }}>
                      <CheckCircle size={18} color="var(--primary)" style={{ flexShrink: 0, marginTop: 2 }} />
                      <span>NAAC, NBA & NIRF automated data export vault</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.925rem' }}>
                      <CheckCircle size={18} color="var(--primary)" style={{ flexShrink: 0, marginTop: 2 }} />
                      <span>Campus recruitment drive portal & industry CRM</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <Link href="/solutions/colleges" className="btn btn-primary">
                      <span>Explore College Suite</span>
                      <ArrowRight size={16} />
                    </Link>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setIsRegisterModalOpen(true)}
                    >
                      <span>Request University Walkthrough</span>
                    </button>
                  </div>
                </div>

                <div
                  style={{
                    background: 'linear-gradient(135deg, #0f172a 0%, #0369a1 100%)',
                    borderRadius: 'var(--radius-xl)',
                    padding: '2.5rem',
                    color: 'white',
                    boxShadow: 'var(--shadow-lg)',
                  }}
                >
                  <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#67e8f9', fontWeight: 700 }}>
                    Higher Ed Benchmarks
                  </span>
                  <div style={{ margin: '1.5rem 0', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div>
                      <h4 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'white', lineHeight: 1 }}>50,000+</h4>
                      <p style={{ color: '#cbd5e1', fontSize: '0.85rem' }}>Concurrent students supported per autonomous university instance</p>
                    </div>
                    <div>
                      <h4 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'white', lineHeight: 1 }}>70% Less</h4>
                      <p style={{ color: '#cbd5e1', fontSize: '0.85rem' }}>Time spent gathering NAAC Criterion documentation</p>
                    </div>
                    <div>
                      <h4 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'white', lineHeight: 1 }}>Instant</h4>
                      <p style={{ color: '#cbd5e1', fontSize: '0.85rem' }}>Digilocker & National Academic Depository integration</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSegment === 'coaching' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '3rem', alignItems: 'center' }}>
                <div>
                  <div className="enterprise-pill badge-coaching" style={{ marginBottom: '1rem' }}>
                    <BookOpen size={13} /> Competitive Coaching & Test Academies
                  </div>
                  <h3 style={{ fontSize: '2rem', color: 'var(--primary-deep)', marginBottom: '1rem', lineHeight: 1.25 }}>
                    AIR Rank Predictions, OMR Speed Scanning & Batch Velocity
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '2rem' }}>
                    Engineered for JEE, NEET, UPSC, and Foundation academies. Deliver real-time All-India Rank percentiles, dynamic student batch reshuffling, and instant WhatsApp graphical report cards to parents.
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.925rem' }}>
                      <CheckCircle size={18} color="#f59e0b" style={{ flexShrink: 0, marginTop: 2 }} />
                      <span>AIR normalized percentile prediction simulator</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.925rem' }}>
                      <CheckCircle size={18} color="#f59e0b" style={{ flexShrink: 0, marginTop: 2 }} />
                      <span>High-speed 10k/hr OMR scanning & CBT engine</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.925rem' }}>
                      <CheckCircle size={18} color="#f59e0b" style={{ flexShrink: 0, marginTop: 2 }} />
                      <span>Automated batch reshuffling (Star & Super-30)</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.925rem' }}>
                      <CheckCircle size={18} color="#f59e0b" style={{ flexShrink: 0, marginTop: 2 }} />
                      <span>TALLENTEX-style scholarship entrance exam engine</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <Link href="/solutions/coaching" className="btn btn-primary" style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>
                      <span>Explore Coaching Suite</span>
                      <ArrowRight size={16} />
                    </Link>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setIsRegisterModalOpen(true)}
                    >
                      <span>Request Coaching Trial</span>
                    </button>
                  </div>
                </div>

                <div
                  style={{
                    background: 'linear-gradient(135deg, #1c1917 0%, #78350f 100%)',
                    borderRadius: 'var(--radius-xl)',
                    padding: '2.5rem',
                    color: 'white',
                    boxShadow: 'var(--shadow-lg)',
                  }}
                >
                  <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#fef08a', fontWeight: 700 }}>
                    Coaching Performance Engine
                  </span>
                  <div style={{ margin: '1.5rem 0', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div>
                      <h4 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'white', lineHeight: 1 }}>&lt; 30 Mins</h4>
                      <p style={{ color: '#fde68a', fontSize: '0.85rem' }}>Turnaround time from exam end to parent WhatsApp scorecards</p>
                    </div>
                    <div>
                      <h4 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'white', lineHeight: 1 }}>3.2x</h4>
                      <p style={{ color: '#fde68a', fontSize: '0.85rem' }}>Improvement in student weak-topic remedial velocity</p>
                    </div>
                    <div>
                      <h4 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'white', lineHeight: 1 }}>Multi-City</h4>
                      <p style={{ color: '#fde68a', fontSize: '0.85rem' }}>Consolidated test series across 100+ national branch centers</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 5. Top-Rated Institutes Section (FR-HOME-006) */}
      <section className="institutes-section" id="top-rated" aria-label="Top-Rated Institutes Carousel">
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="section-pill">Verified Accreditation</span>
              <h2 className="section-title" style={{ marginBottom: '0.5rem' }}>Top-Rated Educational Institutions</h2>
              <p className="section-subtitle" style={{ margin: 0, textAlign: 'left' }}>
                Curated collection of published institutes based on verified reviews and academic excellence.
              </p>
            </div>

            {/* Carousel navigation controls (FR-HOME-006) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <button
                type="button"
                className="btn btn-secondary"
                style={{ padding: '0.6rem', borderRadius: '50%' }}
                aria-label="Previous institute"
                onClick={() => {
                  const el = document.getElementById('top-rated-institutes-track');
                  if (el) el.scrollBy({ left: -340, behavior: 'smooth' });
                }}
                id="btn-prev-top-institute"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                style={{ padding: '0.6rem', borderRadius: '50%' }}
                aria-label="Next institute"
                onClick={() => {
                  const el = document.getElementById('top-rated-institutes-track');
                  if (el) el.scrollBy({ left: 340, behavior: 'smooth' });
                }}
                id="btn-next-top-institute"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {topRated.length === 0 ? (
            <div
              style={{
                background: 'var(--bg-page)',
                padding: '4rem 2rem',
                borderRadius: 'var(--radius-xl)',
                textAlign: 'center',
                border: '1px solid var(--border-light)',
              }}
              id="top-rated-empty-state"
            >
              <School size={44} color="#94a3b8" style={{ margin: '0 auto 1rem auto' }} />
              <h3 style={{ fontSize: '1.25rem', color: 'var(--primary-deep)', marginBottom: '0.5rem' }}>
                No published institutes yet
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                Newly approved educational institutions will appear here once verified.
              </p>
            </div>
          ) : (
            <div
              id="top-rated-institutes-track"
              style={{
                display: 'grid',
                gridAutoFlow: 'column',
                gridAutoColumns: 'calc(33.333% - 1.33rem)',
                gap: '2rem',
                overflowX: 'auto',
                scrollSnapType: 'x mandatory',
                paddingBottom: '1rem',
                scrollbarWidth: 'none',
              }}
              tabIndex={0}
              role="region"
              aria-label="Institutes carousel cards"
            >
              {topRated.map((inst) => (
                <div
                  key={inst.id}
                  className="institute-card"
                  style={{ scrollSnapAlign: 'start', minWidth: '290px' }}
                  id={`top-institute-${inst.id}`}
                >
                  <div className="institute-card-media">
                    <div className="institute-card-category">{inst.type}</div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                      <GraduationCap size={44} strokeWidth={1.5} color="#93c5fd" />
                      <span style={{ fontSize: '0.85rem', color: '#cbd5e1', fontWeight: 600 }}>
                        Verified Campus
                      </span>
                    </div>
                  </div>

                  <div className="institute-card-body">
                    <h3 className="institute-card-title">{inst.name}</h3>
                    <div className="institute-location">
                      <MapPin size={15} />
                      <span>
                        {inst.city}, {inst.state}
                      </span>
                    </div>

                    <div className="rating-badge-row">
                      <div className="rating-pill">
                        <Star size={14} fill="#b45309" color="#b45309" />
                        <span>
                          {inst.ratingSummary?.averageRating
                            ? inst.ratingSummary.averageRating.toFixed(1)
                            : 'Not yet rated'}
                        </span>
                      </div>
                      <span className="review-count-label">
                        ({inst.ratingSummary?.totalReviews || 0} reviews)
                      </span>
                    </div>

                    <div className="institute-card-footer">
                      <Link
                        href={`/institutes/${inst.slug}`}
                        className="btn btn-secondary"
                        style={{ width: '100%', justifyContent: 'center' }}
                        id={`btn-view-profile-${inst.slug}`}
                      >
                        <span>View Profile</span>
                        <ArrowRight size={15} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link href="/institutes" className="btn btn-primary" style={{ padding: '0.8rem 2rem' }}>
              <span>View All Registered Institutes</span>
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Advertisement Carousel (FR-HOME-007) */}
      {advertisements.length > 0 && (
        <section className="advertisements-section" id="promotions">
          <div className="container">
            <div className="section-header" style={{ marginBottom: '2.5rem' }}>
              <span className="section-pill">Featured Highlights</span>
              <h2 className="section-title">Sponsored Announcements & Admissions</h2>
            </div>

            <div className="ad-banner-card" id="ad-banner-active">
              <div>
                {advertisements[currentAdIndex].badge && (
                  <span className="ad-badge">{advertisements[currentAdIndex].badge}</span>
                )}
                <h3>{advertisements[currentAdIndex].title}</h3>
                <p>{advertisements[currentAdIndex].description}</p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                  <Link
                    href={advertisements[currentAdIndex].destinationUrl}
                    className="btn btn-primary"
                    style={{ background: 'white', color: 'var(--primary-deep)' }}
                  >
                    <span>{advertisements[currentAdIndex].ctaText || 'Learn More'}</span>
                    <ArrowRight size={16} />
                  </Link>

                  <div className="ad-advertiser-name">
                    Sponsored by {advertisements[currentAdIndex].advertiser}
                  </div>
                </div>
              </div>

              {/* Carousel navigation controls */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center', gap: '1rem' }}>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button
                    type="button"
                    onClick={() =>
                      setCurrentAdIndex((prev) => (prev === 0 ? advertisements.length - 1 : prev - 1))
                    }
                    className="btn btn-outline-white"
                    style={{ padding: '0.5rem', borderRadius: '50%' }}
                    aria-label="Previous advertisement"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setCurrentAdIndex((prev) => (prev + 1) % advertisements.length)
                    }
                    className="btn btn-outline-white"
                    style={{ padding: '0.5rem', borderRadius: '50%' }}
                    aria-label="Next advertisement"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>

                <div style={{ display: 'flex', gap: 6 }}>
                  {advertisements.map((_, i) => (
                    <span
                      key={i}
                      onClick={() => setCurrentAdIndex(i)}
                      style={{
                        width: i === currentAdIndex ? 24 : 8,
                        height: 8,
                        borderRadius: 4,
                        background: i === currentAdIndex ? '#38bdf8' : 'rgba(255, 255, 255, 0.3)',
                        cursor: 'pointer',
                        transition: 'all 200ms ease',
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 7. Testimonials Section (FR-HOME-008) */}
      <section className="testimonials-section" id="testimonials" aria-label="Community Testimonials">
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="section-pill">Community Trust</span>
              <h2 className="section-title" style={{ marginBottom: '0.5rem' }}>What Parents, Students & Deans Say</h2>
              <p className="section-subtitle" style={{ margin: 0, textAlign: 'left' }}>
                Authentic feedback from educational leaders and families experiencing iCampusPro daily.
              </p>
            </div>

            {/* Testimonials Carousel Controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <button
                type="button"
                className="btn btn-secondary"
                style={{ padding: '0.6rem', borderRadius: '50%' }}
                aria-label="Previous testimonials"
                onClick={() => {
                  const el = document.getElementById('testimonials-track');
                  if (el) el.scrollBy({ left: -360, behavior: 'smooth' });
                }}
                id="btn-prev-testimonial"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                style={{ padding: '0.6rem', borderRadius: '50%' }}
                aria-label="Next testimonials"
                onClick={() => {
                  const el = document.getElementById('testimonials-track');
                  if (el) el.scrollBy({ left: 360, behavior: 'smooth' });
                }}
                id="btn-next-testimonial"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {testimonials.length === 0 ? (
            <div
              style={{
                background: 'var(--bg-page)',
                padding: '3.5rem 2rem',
                borderRadius: 'var(--radius-xl)',
                textAlign: 'center',
                border: '1px solid var(--border-light)',
              }}
              id="testimonials-empty-state"
            >
              <Users size={40} color="#94a3b8" style={{ margin: '0 auto 0.75rem auto' }} />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--primary-deep)', marginBottom: '0.35rem' }}>
                No approved testimonials yet
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                Verified community reviews will be featured here as they are published.
              </p>
            </div>
          ) : (
            <div
              id="testimonials-track"
              style={{
                display: 'grid',
                gridAutoFlow: 'column',
                gridAutoColumns: 'calc(33.333% - 1.25rem)',
                gap: '1.75rem',
                overflowX: 'auto',
                scrollSnapType: 'x mandatory',
                paddingBottom: '1rem',
                scrollbarWidth: 'none',
              }}
              role="region"
              aria-label="Testimonials cards"
            >
              {testimonials.map((t) => (
                <div
                  key={t.id}
                  className="testimonial-card"
                  style={{ scrollSnapAlign: 'start', minWidth: '300px' }}
                  id={`testimonial-${t.id}`}
                >
                  <div>
                    <div style={{ display: 'flex', gap: 4, marginBottom: '1rem', color: '#f59e0b' }}>
                      {[...Array(t.rating || 5)].map((_, i) => (
                        <Star key={i} size={16} fill="#f59e0b" color="#f59e0b" />
                      ))}
                    </div>
                    <p className="testimonial-text">&ldquo;{t.text}&rdquo;</p>
                  </div>

                  <div className="testimonial-author-box">
                    <div className="avatar-circle">{t.avatar}</div>
                    <div className="author-info">
                      <h4>{t.displayName}</h4>
                      <p>
                        {t.role} &bull; {t.instituteName}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Final Call to Action */}
      <section style={{ padding: '5rem 0', background: 'var(--hero-gradient)', color: 'white', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontSize: '2.5rem', color: 'white', marginBottom: '1rem' }}>
            Ready to Digitize Your Educational Campus?
          </h2>
          <p style={{ color: '#cbd5e1', fontSize: '1.15rem', maxWidth: '640px', margin: '0 auto 2.5rem auto' }}>
            Submit an enquiry today. Receive our comprehensive Phase 1 onboarding kit, platform live demonstration, and setup migration roadmap.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setIsRegisterModalOpen(true)}
              style={{ padding: '0.85rem 2rem', fontSize: '1.05rem' }}
              id="btn-footer-cta-register"
            >
              <span>Register Institute Now</span>
              <ArrowRight size={18} />
            </button>
            <Link
              href="/contact"
              className="btn btn-outline-white"
              style={{ padding: '0.85rem 2rem', fontSize: '1.05rem' }}
            >
              <span>Speak to Our Experts</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Registration Enquiry Modal */}
      <RegistrationModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
      />
    </>
  );
}
