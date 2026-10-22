'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  Search,
  Filter,
  MapPin,
  Star,
  GraduationCap,
  Building,
  School,
  BookOpen,
  Sparkles,
  ArrowRight,
  CheckCircle,
  XCircle,
  Loader2,
} from 'lucide-react';

interface Institute {
  id: string;
  slug: string;
  name: string;
  type: string;
  city: string;
  state: string;
  description: string;
  affiliation: string;
  establishedYear: number;
  ratingSummary: {
    averageRating: number;
    totalReviews: number;
  };
  facilities: {
    hostel: boolean;
    transport: boolean;
    smartClassrooms: boolean;
    sportsComplex: boolean;
    scienceLabs: boolean;
    library: boolean;
    cafeteria: boolean;
    wifi: boolean;
  };
}

function InstitutesContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';

  const [institutes, setInstitutes] = useState<Institute[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedCity, setSelectedCity] = useState('');
  const [sortBy, setSortBy] = useState('rating_desc');

  const categories = [
    { label: 'All Categories', value: 'All' },
    { label: 'Schools', value: 'School' },
    { label: 'Colleges', value: 'College' },
    { label: 'Coaching Institutes', value: 'Coaching Institute' },
    { label: 'Play Schools', value: 'Play School' },
    { label: 'Others', value: 'Others' },
  ];

  useEffect(() => {
    async function fetchInstitutes() {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (searchQuery) params.append('q', searchQuery);
        if (selectedCategory && selectedCategory !== 'All') params.append('category', selectedCategory);
        if (selectedCity) params.append('city', selectedCity);
        if (sortBy) params.append('sort', sortBy);

        const res = await fetch(`/api/public/institutes?${params.toString()}`);
        const data = await res.json();
        if (data.success) {
          setInstitutes(data.data || []);
        }
      } catch (err) {
        console.error('Failed to load institutes:', err);
      } finally {
        setLoading(false);
      }
    }

    const timer = setTimeout(() => {
      fetchInstitutes();
    }, 200);

    return () => clearTimeout(timer);
  }, [searchQuery, selectedCategory, selectedCity, sortBy]);

  return (
    <div style={{ padding: '3.5rem 0', background: 'var(--bg-page)', minHeight: '80vh' }}>
      <div className="container">
        {/* Header Breadcrumb & Title */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
            <Link href="/" style={{ color: 'var(--primary)', fontWeight: 500 }}>
              Home
            </Link>
            <span>/</span>
            <span>Institutes Directory</span>
          </div>
          <h1 style={{ fontSize: '2.4rem', color: 'var(--primary-deep)', marginBottom: '0.5rem' }}>
            Discover Educational Institutions
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '720px' }}>
            Explore verified schools, colleges, preschools, and coaching centers across India. Compare amenities, affiliations, verified ratings, and admission criteria.
          </p>
        </div>

        {/* Search & Filter Toolbar */}
        <div
          style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--border-light)',
            boxShadow: 'var(--shadow-sm)',
            marginBottom: '2.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
          }}
          id="institutes-search-toolbar"
        >
          {/* Top row: search + city + sort */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr 1fr', gap: '1rem' }}>
            <div style={{ position: 'relative' }}>
              <Search
                size={18}
                style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}
              />
              <input
                type="text"
                placeholder="Search by institute name, board, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-input"
                style={{ paddingLeft: '2.75rem' }}
                id="input-search-institutes"
              />
            </div>

            <div>
              <input
                type="text"
                placeholder="Filter by city (e.g. Delhi, Mumbai)"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="form-input"
                id="input-filter-city"
              />
            </div>

            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="form-select"
                id="select-sort-institutes"
              >
                <option value="rating_desc">Highest Rated</option>
                <option value="reviews_desc">Most Reviewed</option>
                <option value="name_asc">Name: A to Z</option>
              </select>
            </div>
          </div>

          {/* Category Tabs */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', borderTop: '1px solid var(--border-light)', paddingTop: '1rem' }}>
            {categories.map((c) => (
              <button
                key={c.value}
                type="button"
                onClick={() => setSelectedCategory(c.value)}
                style={{
                  padding: '0.45rem 1rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  background: selectedCategory === c.value ? 'var(--primary)' : 'var(--bg-subtle)',
                  color: selectedCategory === c.value ? 'white' : 'var(--text-secondary)',
                  border: selectedCategory === c.value ? '1px solid var(--primary)' : '1px solid var(--border-light)',
                  transition: 'all var(--transition-fast)',
                }}
                id={`cat-filter-btn-${c.value.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count & Grid */}
        <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
            Showing {institutes.length} verified institution{institutes.length === 1 ? '' : 's'}
          </span>
        </div>

        {loading ? (
          <div style={{ padding: '5rem 0', textAlign: 'center', color: 'var(--text-muted)' }}>
            <Loader2 size={36} className="animate-spin" style={{ margin: '0 auto 1rem auto', color: 'var(--primary)' }} />
            <p>Loading verified institutions...</p>
          </div>
        ) : institutes.length === 0 ? (
          <div
            style={{
              background: 'white',
              borderRadius: 'var(--radius-xl)',
              padding: '4rem 2rem',
              textAlign: 'center',
              border: '1px solid var(--border-light)',
            }}
            id="institutes-empty-state"
          >
            <Building size={48} color="#94a3b8" style={{ margin: '0 auto 1rem auto' }} />
            <h3 style={{ fontSize: '1.35rem', color: 'var(--primary-deep)', marginBottom: '0.5rem' }}>
              No institutes found
            </h3>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '450px', margin: '0 auto 1.5rem auto' }}>
              We could not find any institutions matching your search criteria. Try adjusting your search query, category filter, or city.
            </p>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedCity('');
              }}
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="institutes-grid">
            {institutes.map((inst) => (
              <div key={inst.id} className="institute-card" id={`card-inst-${inst.id}`}>
                <div className="institute-card-media">
                  <div className="institute-card-category">{inst.type}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
                    <GraduationCap size={40} strokeWidth={1.5} color="#93c5fd" />
                    <span style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>
                      Est. {inst.establishedYear || 'N/A'}
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

                  <p
                    style={{
                      fontSize: '0.875rem',
                      color: 'var(--text-secondary)',
                      lineHeight: '1.5',
                      marginBottom: '1rem',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {inst.description}
                  </p>

                  <div className="rating-badge-row">
                    <div className="rating-pill">
                      <Star size={14} fill="#b45309" color="#b45309" />
                      <span>{inst.ratingSummary?.averageRating?.toFixed(1) || 'Not yet rated'}</span>
                    </div>
                    <span className="review-count-label">
                      ({inst.ratingSummary?.totalReviews || 0} reviews)
                    </span>
                  </div>

                  {/* Quick Facilities Icons */}
                  <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                      {inst.facilities?.hostel ? (
                        <CheckCircle size={13} color="var(--success)" />
                      ) : (
                        <XCircle size={13} color="#94a3b8" />
                      )}
                      Hostel
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                      {inst.facilities?.transport ? (
                        <CheckCircle size={13} color="var(--success)" />
                      ) : (
                        <XCircle size={13} color="#94a3b8" />
                      )}
                      Transport
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                      {inst.facilities?.smartClassrooms ? (
                        <CheckCircle size={13} color="var(--success)" />
                      ) : (
                        <XCircle size={13} color="#94a3b8" />
                      )}
                      Smart Class
                    </span>
                  </div>

                  <div className="institute-card-footer">
                    <Link
                      href={`/institutes/${inst.slug}`}
                      className="btn btn-secondary"
                      style={{ width: '100%', justifyContent: 'center' }}
                      id={`btn-explore-${inst.slug}`}
                    >
                      <span>Explore Institute</span>
                      <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function InstitutesPage() {
  return (
    <Suspense fallback={<div style={{ padding: '5rem', textAlign: 'center' }}>Loading Institutes...</div>}>
      <InstitutesContent />
    </Suspense>
  );
}
