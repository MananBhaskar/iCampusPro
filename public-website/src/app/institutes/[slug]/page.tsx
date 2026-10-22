'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Globe,
  Award,
  Calendar,
  CheckCircle2,
  XCircle,
  Star,
  MessageSquare,
  ArrowRight,
  Shield,
  Loader2,
  ExternalLink,
  PlusCircle,
  Sparkles,
  X,
  AlertCircle,
  Check,
  Share2,
} from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  issuingOrg: string;
  year: number;
  description: string;
}

interface FacilityMap {
  hostel: boolean;
  transport: boolean;
  smartClassrooms: boolean;
  sportsComplex: boolean;
  scienceLabs: boolean;
  library: boolean;
  cafeteria: boolean;
  wifi: boolean;
}

interface InstituteReview {
  id: string;
  userName: string;
  userRole: string;
  score: number;
  comment: string;
  status: string;
  createdAt: string;
}

interface InstituteProfileData {
  id: string;
  slug: string;
  name: string;
  type: string;
  status: string;
  city: string;
  state: string;
  address: string;
  description: string;
  contactNumber: string;
  email: string;
  website: string;
  affiliation: string;
  establishedYear: number;
  facilities: FacilityMap;
  achievements: Achievement[];
  ratingSummary: {
    averageRating: number;
    totalReviews: number;
  };
  reviews: InstituteReview[];
}

function InstituteProfileContent() {
  const params = useParams();
  const slug = params?.slug as string;

  const [institute, setInstitute] = useState<InstituteProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Review Modal State
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewName, setReviewName] = useState('');
  const [reviewRole, setReviewRole] = useState('Parent');
  const [reviewScore, setReviewScore] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(false);
  const [reviewError, setReviewError] = useState<string | null>(null);

  // Filter/Sort Reviews
  const [reviewSort, setReviewSort] = useState<'newest' | 'highest'>('newest');
  const [filterRating, setFilterRating] = useState<number | 'all'>('all');

  async function loadInstitute() {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`/api/public/institutes/${slug}`);
      const json = await res.json();
      if (res.ok && json.success) {
        setInstitute(json.data);
      } else {
        setError(json.error || 'Institute not found or unavailable');
      }
    } catch (err) {
      setError('Failed to load institute details. Please check your connection.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (slug) {
      loadInstitute();
    }
  }, [slug]);

  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewComment.trim()) {
      setReviewError('Please provide your name and review feedback.');
      return;
    }

    setSubmittingReview(true);
    setReviewError(null);

    try {
      const res = await fetch(`/api/public/institutes/${slug}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userName: reviewName,
          userRole: reviewRole,
          score: reviewScore,
          comment: reviewComment,
        }),
      });

      const resData = await res.json();
      if (res.ok && resData.success) {
        setReviewSuccess(true);
        // Refresh institute data to recalculate rating
        await loadInstitute();
        setTimeout(() => {
          setIsReviewModalOpen(false);
          setReviewSuccess(false);
          setReviewComment('');
          setReviewName('');
        }, 1800);
      } else {
        setReviewError(resData.error || 'Could not submit review.');
      }
    } catch (err) {
      setReviewError('Network error while submitting rating.');
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '6rem 0', textAlign: 'center' }}>
        <Loader2 size={40} className="animate-spin" style={{ margin: '0 auto 1rem auto', color: 'var(--primary)' }} />
        <p style={{ color: 'var(--text-muted)' }}>Loading verified institute profile...</p>
      </div>
    );
  }

  if (error || !institute) {
    return (
      <div className="container" style={{ padding: '6rem 0', textAlign: 'center' }}>
        <div style={{ maxWidth: '500px', margin: '0 auto', background: 'white', padding: '3rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-light)' }}>
          <Building2 size={48} color="#ef4444" style={{ margin: '0 auto 1.5rem auto' }} />
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.75rem', color: 'var(--primary-deep)' }}>
            Institute Profile Unavailable
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            {error || 'The requested institute profile could not be found or is not currently active.'}
          </p>
          <Link href="/institutes" className="btn btn-primary">
            <span>Browse All Institutes</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  // Filtered and sorted reviews
  let displayedReviews = [...(institute.reviews || [])];
  if (filterRating !== 'all') {
    displayedReviews = displayedReviews.filter((r) => r.score === filterRating);
  }
  if (reviewSort === 'highest') {
    displayedReviews.sort((a, b) => b.score - a.score);
  } else {
    displayedReviews.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  const facilityList = [
    { key: 'hostel', label: 'Hostel Accommodation', available: institute.facilities?.hostel },
    { key: 'transport', label: 'GPS School Bus / Transport', available: institute.facilities?.transport },
    { key: 'smartClassrooms', label: 'Interactive Smart Classrooms', available: institute.facilities?.smartClassrooms },
    { key: 'sportsComplex', label: 'Outdoor & Indoor Sports Complex', available: institute.facilities?.sportsComplex },
    { key: 'scienceLabs', label: 'Advanced Science & STEM Labs', available: institute.facilities?.scienceLabs },
    { key: 'library', label: 'Digital & Physical Library', available: institute.facilities?.library },
    { key: 'cafeteria', label: 'Nutritious Cafeteria', available: institute.facilities?.cafeteria },
    { key: 'wifi', label: 'Campus-wide High Speed Wi-Fi', available: institute.facilities?.wifi },
  ];

  return (
    <div style={{ background: 'var(--bg-page)', paddingBottom: '5rem' }}>
      {/* 1. Cover Banner & Header (FR-INS-002) */}
      <section
        style={{
          background: 'linear-gradient(135deg, #090d16 0%, #1e3a8a 60%, #0369a1 100%)',
          color: 'white',
          padding: '4rem 0 3.5rem 0',
          position: 'relative',
        }}
        id="institute-profile-banner"
      >
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#93c5fd', marginBottom: '1.5rem' }}>
            <Link href="/" style={{ color: '#e0f2fe' }}>
              Home
            </Link>
            <span>/</span>
            <Link href="/institutes" style={{ color: '#e0f2fe' }}>
              Institutes
            </Link>
            <span>/</span>
            <span>{institute.name}</span>
          </div>

          <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <div
              style={{
                width: '5.5rem',
                height: '5.5rem',
                borderRadius: 'var(--radius-xl)',
                background: 'white',
                color: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
                flexShrink: 0,
              }}
            >
              <Building2 size={40} />
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                <span
                  style={{
                    background: 'rgba(255, 255, 255, 0.18)',
                    backdropFilter: 'blur(6px)',
                    color: '#67e8f9',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    padding: '0.25rem 0.75rem',
                    borderRadius: 'var(--radius-full)',
                    textTransform: 'uppercase',
                  }}
                >
                  {institute.type}
                </span>

                <span
                  style={{
                    background: 'rgba(16, 185, 129, 0.2)',
                    color: '#6ee7b7',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    padding: '0.2rem 0.65rem',
                    borderRadius: 'var(--radius-full)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                  }}
                >
                  <Check size={12} strokeWidth={3} /> Verified Institution
                </span>
              </div>

              <h1 style={{ fontSize: '2.5rem', color: 'white', marginBottom: '0.75rem', lineHeight: 1.2 }}>
                {institute.name}
              </h1>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', color: '#cbd5e1', fontSize: '0.95rem', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <MapPin size={16} color="#38bdf8" />
                  <span>
                    {institute.city}, {institute.state}
                  </span>
                </div>
                <div>&bull;</div>
                <div>Affiliation: <strong style={{ color: 'white' }}>{institute.affiliation}</strong></div>
                <div>&bull;</div>
                <div>Est. <strong style={{ color: 'white' }}>{institute.establishedYear}</strong></div>
              </div>
            </div>

            {/* Rating Box */}
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                padding: '1.25rem 1.75rem',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                textAlign: 'center',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontSize: '2rem', fontWeight: 800, color: '#fef08a' }}>
                <Star size={26} fill="#fef08a" />
                <span>{institute.ratingSummary.averageRating ? institute.ratingSummary.averageRating.toFixed(1) : 'N/A'}</span>
              </div>
              <span style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>
                {institute.ratingSummary.totalReviews} verified reviews
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Profile Grid: Content (Left) + Sidebar (Right) */}
      <div className="container" style={{ marginTop: '2.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.9fr 1fr', gap: '2.5rem' }}>
          {/* LEFT COLUMN */}
          <div>
            {/* 3. About Section (FR-INS-003) */}
            <div
              style={{
                background: 'white',
                padding: '2rem',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--border-light)',
                marginBottom: '2rem',
                boxShadow: 'var(--shadow-sm)',
              }}
              id="section-about"
            >
              <h2 style={{ fontSize: '1.45rem', color: 'var(--primary-deep)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Building2 size={22} color="var(--primary)" />
                About {institute.name}
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
                {institute.description}
              </p>

              <div
                style={{
                  background: 'var(--bg-subtle)',
                  padding: '1.25rem',
                  borderRadius: 'var(--radius-lg)',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '1rem',
                  fontSize: '0.9rem',
                }}
              >
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.8rem' }}>Campus Address</span>
                  <strong style={{ color: 'var(--text-primary)' }}>{institute.address}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.8rem' }}>Accreditation Board</span>
                  <strong style={{ color: 'var(--text-primary)' }}>{institute.affiliation}</strong>
                </div>
              </div>
            </div>

            {/* Enterprise Institutional Credentials & Standards */}
            <div
              style={{
                background: 'linear-gradient(135deg, rgba(238, 242, 255, 0.7), rgba(240, 253, 250, 0.7))',
                padding: '1.75rem',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid #c7d2fe',
                marginBottom: '2rem',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <h3 style={{ fontSize: '1.2rem', color: '#1e1b4b', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Shield size={20} color="#4338ca" />
                  Enterprise Operational Benchmarks
                </h3>
                <span style={{ fontSize: '0.75rem', background: '#4338ca', color: 'white', padding: '0.2rem 0.6rem', borderRadius: 9999, fontWeight: 600 }}>
                  iCampusPro Verified Campus
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                {institute.type.toLowerCase().includes('school') && (
                  <>
                    <div style={{ background: 'white', padding: '0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid #e2e8f0' }}>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Board Curricula Standard</div>
                      <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.95rem' }}>{institute.affiliation} • NEP 2020</div>
                    </div>
                    <div style={{ background: 'white', padding: '0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid #e2e8f0' }}>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Faculty / Student Ratio</div>
                      <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.95rem' }}>1 : 16 High-Touch Mentorship</div>
                    </div>
                    <div style={{ background: 'white', padding: '0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid #e2e8f0' }}>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Transit Safety System</div>
                      <div style={{ fontWeight: 700, color: '#059669', fontSize: '0.95rem' }}>✓ SafeTransit Live GPS Active</div>
                    </div>
                    <div style={{ background: 'white', padding: '0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid #e2e8f0' }}>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Academic Evaluation</div>
                      <div style={{ fontWeight: 700, color: '#2563eb', fontSize: '0.95rem' }}>Automated CCE Gradebooks</div>
                    </div>
                  </>
                )}

                {institute.type.toLowerCase().includes('college') && (
                  <>
                    <div style={{ background: 'white', padding: '0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid #e2e8f0' }}>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>NAAC Quality Grade</div>
                      <div style={{ fontWeight: 700, color: '#047857', fontSize: '0.95rem' }}>Grade A++ (Highest Tier)</div>
                    </div>
                    <div style={{ background: 'white', padding: '0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid #e2e8f0' }}>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Credit Architecture</div>
                      <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.95rem' }}>UGC CBCS Modular Credit Engine</div>
                    </div>
                    <div style={{ background: 'white', padding: '0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid #e2e8f0' }}>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Examination Governance</div>
                      <div style={{ fontWeight: 700, color: '#2563eb', fontSize: '0.95rem' }}>Autonomous COE Portal Active</div>
                    </div>
                    <div style={{ background: 'white', padding: '0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid #e2e8f0' }}>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Placement Velocity</div>
                      <div style={{ fontWeight: 700, color: '#d97706', fontSize: '0.95rem' }}>92.4% Verified On-Campus Placements</div>
                    </div>
                  </>
                )}

                {institute.type.toLowerCase().includes('coaching') && (
                  <>
                    <div style={{ background: 'white', padding: '0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid #e2e8f0' }}>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Testing Speed & Accuracy</div>
                      <div style={{ fontWeight: 700, color: '#059669', fontSize: '0.95rem' }}>10k/hr Auto OMR Scanning</div>
                    </div>
                    <div style={{ background: 'white', padding: '0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid #e2e8f0' }}>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Batch Optimization</div>
                      <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.95rem' }}>Dynamic Merit Reshuffling</div>
                    </div>
                    <div style={{ background: 'white', padding: '0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid #e2e8f0' }}>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Parent Reporting</div>
                      <div style={{ fontWeight: 700, color: '#2563eb', fontSize: '0.95rem' }}>Instant WhatsApp Scorecard Dispatch</div>
                    </div>
                    <div style={{ background: 'white', padding: '0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid #e2e8f0' }}>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>AIR Predictor</div>
                      <div style={{ fontWeight: 700, color: '#7c3aed', fontSize: '0.95rem' }}>AI National Percentile Calibration</div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* 7. Achievements & Top Rankings Section (FR-INS-007) */}
            {institute.achievements && institute.achievements.length > 0 && (
              <div
                style={{
                  background: 'white',
                  padding: '2rem',
                  borderRadius: 'var(--radius-xl)',
                  border: '1px solid var(--border-light)',
                  marginBottom: '2rem',
                  boxShadow: 'var(--shadow-sm)',
                }}
                id="section-achievements"
              >
                <h2 style={{ fontSize: '1.45rem', color: 'var(--primary-deep)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Award size={22} color="#f59e0b" />
                  Achievements & National Rankings
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {institute.achievements.map((ach) => (
                    <div
                      key={ach.id}
                      style={{
                        padding: '1.25rem',
                        borderRadius: 'var(--radius-lg)',
                        border: '1px solid var(--border-light)',
                        background: 'var(--bg-page)',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '1rem',
                      }}
                    >
                      <div
                        style={{
                          width: '2.75rem',
                          height: '2.75rem',
                          borderRadius: 'var(--radius-md)',
                          background: '#fef3c7',
                          color: '#b45309',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <Sparkles size={18} />
                      </div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
                          <h4 style={{ fontSize: '1.05rem', color: 'var(--primary-deep)' }}>{ach.title}</h4>
                          <span style={{ fontSize: '0.75rem', background: '#dbeafe', color: '#1d4ed8', padding: '0.15rem 0.5rem', borderRadius: 'var(--radius-full)', fontWeight: 600 }}>
                            {ach.year}
                          </span>
                        </div>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                          Conferred by: <strong>{ach.issuingOrg}</strong>
                        </p>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{ach.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4 & 5. Ratings & Reviews Section (FR-INS-004 & FR-INS-005) */}
            <div
              style={{
                background: 'white',
                padding: '2rem',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--border-light)',
                boxShadow: 'var(--shadow-sm)',
              }}
              id="section-reviews"
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h2 style={{ fontSize: '1.45rem', color: 'var(--primary-deep)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <MessageSquare size={22} color="var(--primary)" />
                    Ratings & Reviews
                  </h2>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                    Based on verified reviews from enrolled parents, alumni, and students.
                  </p>
                </div>

                {/* FR-INS-006: Add Rating action */}
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setIsReviewModalOpen(true)}
                  id="btn-add-rating"
                >
                  <PlusCircle size={16} />
                  <span>Write a Review</span>
                </button>
              </div>

              {/* Review Filters & Sorting */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem 0',
                  borderTop: '1px solid var(--border-light)',
                  borderBottom: '1px solid var(--border-light)',
                  marginBottom: '1.5rem',
                  fontSize: '0.85rem',
                  flexWrap: 'wrap',
                  gap: '0.75rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Filter Stars:</span>
                  {[
                    { label: 'All', value: 'all' },
                    { label: '5★', value: 5 },
                    { label: '4★', value: 4 },
                    { label: '3★', value: 3 },
                  ].map((f) => (
                    <button
                      key={f.label}
                      type="button"
                      onClick={() => setFilterRating(f.value as any)}
                      style={{
                        padding: '0.25rem 0.6rem',
                        borderRadius: 'var(--radius-md)',
                        background: filterRating === f.value ? 'var(--primary)' : 'var(--bg-subtle)',
                        color: filterRating === f.value ? 'white' : 'var(--text-secondary)',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                      }}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Sort by:</span>
                  <select
                    value={reviewSort}
                    onChange={(e) => setReviewSort(e.target.value as any)}
                    className="form-select"
                    style={{ padding: '0.35rem 0.75rem', fontSize: '0.825rem' }}
                  >
                    <option value="newest">Newest First</option>
                    <option value="highest">Highest Rating</option>
                  </select>
                </div>
              </div>

              {/* Reviews List */}
              {displayedReviews.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }} id="reviews-empty-state">
                  <Star size={36} color="#cbd5e1" style={{ margin: '0 auto 0.75rem auto' }} />
                  <p style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>No reviews matching this filter</p>
                  <p style={{ fontSize: '0.85rem' }}>Be the first to share your experience with {institute.name}.</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {displayedReviews.map((rev) => (
                    <div
                      key={rev.id}
                      style={{
                        padding: '1.25rem',
                        borderRadius: 'var(--radius-lg)',
                        background: 'var(--bg-page)',
                        border: '1px solid var(--border-light)',
                      }}
                      id={`review-${rev.id}`}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <div>
                          <strong style={{ fontSize: '0.95rem', color: 'var(--primary-deep)' }}>{rev.userName}</strong>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginLeft: '0.5rem' }}>
                            ({rev.userRole})
                          </span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              fill={i < rev.score ? '#f59e0b' : 'none'}
                              color={i < rev.score ? '#f59e0b' : '#cbd5e1'}
                            />
                          ))}
                        </div>
                      </div>

                      <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '0.5rem' }}>
                        {rev.comment}
                      </p>

                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        Reviewed on {new Date(rev.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: SIDEBAR (FR-INS-009 & FR-INS-010) */}
          <div>
            {/* Quick Facts & Facilities Sidebar */}
            <div
              style={{
                background: 'white',
                padding: '1.75rem',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--border-light)',
                boxShadow: 'var(--shadow-sm)',
                marginBottom: '1.75rem',
              }}
              id="sidebar-quick-facts"
            >
              <h3 style={{ fontSize: '1.2rem', color: 'var(--primary-deep)', marginBottom: '1.25rem' }}>
                Quick Facts & Facilities
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {facilityList.map((fac) => (
                  <div
                    key={fac.key}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '0.875rem',
                      padding: '0.35rem 0',
                    }}
                  >
                    <span style={{ color: 'var(--text-secondary)' }}>{fac.label}</span>
                    {fac.available ? (
                      <span style={{ color: 'var(--success)', display: 'flex', alignItems: 'center', gap: 4, fontWeight: 600, fontSize: '0.8rem' }}>
                        <CheckCircle2 size={16} /> Available
                      </span>
                    ) : (
                      <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.8rem' }}>
                        <XCircle size={16} /> Not Offered
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Profile Contact Actions (FR-INS-010) */}
            <div
              style={{
                background: 'white',
                padding: '1.75rem',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--border-light)',
                boxShadow: 'var(--shadow-sm)',
                marginBottom: '1.75rem',
              }}
              id="sidebar-contact-actions"
            >
              <h3 style={{ fontSize: '1.2rem', color: 'var(--primary-deep)', marginBottom: '1.25rem' }}>
                Official Contact Channel
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <a
                  href={`tel:${institute.contactNumber}`}
                  className="btn btn-secondary"
                  style={{ width: '100%', justifyContent: 'flex-start' }}
                  id="btn-call-institute"
                >
                  <Phone size={16} color="var(--primary)" />
                  <span>{institute.contactNumber}</span>
                </a>

                <a
                  href={`mailto:${institute.email}`}
                  className="btn btn-secondary"
                  style={{ width: '100%', justifyContent: 'flex-start' }}
                  id="btn-email-institute"
                >
                  <Mail size={16} color="var(--primary)" />
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{institute.email}</span>
                </a>

                {institute.website && (
                  <a
                    href={institute.website}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-secondary"
                    style={{ width: '100%', justifyContent: 'flex-start' }}
                    id="btn-visit-website"
                  >
                    <Globe size={16} color="var(--primary)" />
                    <span>Visit Official Website</span>
                    <ExternalLink size={14} style={{ marginLeft: 'auto' }} />
                  </a>
                )}
              </div>
            </div>

            {/* Promotional Banner (FR-INS-008) */}
            <div
              style={{
                background: 'linear-gradient(135deg, #1e3a8a 0%, #0284c7 100%)',
                color: 'white',
                padding: '1.75rem',
                borderRadius: 'var(--radius-xl)',
                boxShadow: 'var(--shadow-md)',
              }}
              id="sidebar-ad-card"
            >
              <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#7dd3fc', fontWeight: 700 }}>
                Campus Promotion
              </span>
              <h4 style={{ fontSize: '1.15rem', color: 'white', marginTop: '0.35rem', marginBottom: '0.5rem' }}>
                Admissions for Academic Year 2026-27
              </h4>
              <p style={{ fontSize: '0.85rem', color: '#e0f2fe', lineHeight: '1.5', marginBottom: '1.25rem' }}>
                Early registration window is now active for merit scholars and boarding candidates.
              </p>
              <Link
                href="/contact"
                className="btn btn-primary"
                style={{ background: 'white', color: 'var(--primary-deep)', width: '100%', justifyContent: 'center' }}
              >
                <span>Request Campus Tour</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* FR-INS-006: Add Rating Modal */}
      {isReviewModalOpen && (
        <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="rating-modal-title">
          <div className="modal-dialog">
            <div className="modal-header">
              <div>
                <h3 id="rating-modal-title">Write a Review for {institute.name}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Share authentic experience to guide prospective students & parents
                </p>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setIsReviewModalOpen(false)}
                id="btn-close-review-modal"
              >
                <X size={18} />
              </button>
            </div>

            <div className="modal-body">
              {reviewSuccess ? (
                <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
                  <div
                    style={{
                      width: '4rem',
                      height: '4rem',
                      borderRadius: '50%',
                      background: 'var(--success-soft)',
                      color: 'var(--success)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 1rem auto',
                    }}
                  >
                    <CheckCircle2 size={36} />
                  </div>
                  <h4 style={{ fontSize: '1.35rem', color: 'var(--primary-deep)', marginBottom: '0.5rem' }}>
                    Review Submitted Successfully!
                  </h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    Thank you! Your feedback has been verified and recorded on iCampusPro.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleAddReview} noValidate id="review-submission-form">
                  {reviewError && (
                    <div
                      style={{
                        padding: '0.75rem',
                        background: 'var(--danger-soft)',
                        border: '1px solid #fecaca',
                        borderRadius: 'var(--radius-md)',
                        color: 'var(--danger)',
                        fontSize: '0.85rem',
                        marginBottom: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                      }}
                    >
                      <AlertCircle size={15} />
                      <span>{reviewError}</span>
                    </div>
                  )}

                  {/* Star Selector */}
                  <div className="form-group">
                    <label className="form-label">Your Rating (1 to 5 Stars) *</label>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewScore(star)}
                          style={{
                            background: reviewScore >= star ? '#fef3c7' : 'var(--bg-subtle)',
                            border: reviewScore >= star ? '1px solid #f59e0b' : '1px solid var(--border-light)',
                            borderRadius: 'var(--radius-md)',
                            padding: '0.5rem 0.85rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 4,
                            cursor: 'pointer',
                          }}
                        >
                          <Star
                            size={18}
                            fill={reviewScore >= star ? '#f59e0b' : 'none'}
                            color={reviewScore >= star ? '#f59e0b' : '#94a3b8'}
                          />
                          <span style={{ fontWeight: 700, fontSize: '0.9rem', color: reviewScore >= star ? '#b45309' : 'var(--text-muted)' }}>
                            {star}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label" htmlFor="review-user-name">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        id="review-user-name"
                        value={reviewName}
                        onChange={(e) => setReviewName(e.target.value)}
                        placeholder="e.g. Dr. Rajesh Sharma"
                        className="form-input"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="review-user-role">
                        Your Association *
                      </label>
                      <select
                        id="review-user-role"
                        value={reviewRole}
                        onChange={(e) => setReviewRole(e.target.value)}
                        className="form-select"
                      >
                        <option value="Parent">Parent</option>
                        <option value="Student">Student</option>
                        <option value="Alumni">Alumni</option>
                        <option value="Faculty">Faculty</option>
                        <option value="Visitor">Visitor</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="review-user-comment">
                      Written Feedback / Review Comment *
                    </label>
                    <textarea
                      id="review-user-comment"
                      rows={4}
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      placeholder="Describe the campus environment, faculty dedication, labs, safety, and academic support..."
                      className="form-textarea"
                      required
                    />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setIsReviewModalOpen(false)}
                      disabled={submittingReview}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={submittingReview}
                      id="btn-submit-review"
                    >
                      {submittingReview ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          <span>Publishing Review...</span>
                        </>
                      ) : (
                        <span>Submit Review</span>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function InstituteProfilePage() {
  return (
    <Suspense fallback={<div style={{ padding: '6rem 0', textAlign: 'center', color: 'var(--text-muted)' }}>Loading Institute Profile...</div>}>
      <InstituteProfileContent />
    </Suspense>
  );
}
