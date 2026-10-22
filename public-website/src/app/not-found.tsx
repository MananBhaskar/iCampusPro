import React from 'react';
import Link from 'next/link';
import { FileQuestion, Home, Search, ArrowRight, ShieldAlert } from 'lucide-react';

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '75vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg-page)',
        padding: '3rem 1.5rem',
      }}
    >
      <div
        style={{
          background: 'white',
          maxWidth: '560px',
          width: '100%',
          padding: '3.5rem 2.5rem',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border-light)',
          boxShadow: 'var(--shadow-md)',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            width: '4.5rem',
            height: '4.5rem',
            borderRadius: '50%',
            background: 'var(--primary-soft)',
            color: 'var(--primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem auto',
          }}
        >
          <FileQuestion size={40} />
        </div>

        <span
          style={{
            background: 'var(--danger-soft)',
            color: 'var(--danger)',
            fontSize: '0.8rem',
            fontWeight: 700,
            padding: '0.25rem 0.75rem',
            borderRadius: 'var(--radius-full)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          404 &bull; Page Not Found
        </span>

        <h1
          style={{
            fontSize: '2rem',
            color: 'var(--primary-deep)',
            marginTop: '1rem',
            marginBottom: '0.75rem',
          }}
        >
          Resource Not Located
        </h1>

        <p
          style={{
            color: 'var(--text-secondary)',
            fontSize: '0.975rem',
            lineHeight: 1.6,
            marginBottom: '2rem',
          }}
        >
          The page or institute profile you are attempting to access does not exist, has been archived, or the URL was entered incorrectly.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/" className="btn btn-primary" id="btn-404-home">
            <Home size={16} />
            <span>Return to Homepage</span>
          </Link>
          <Link href="/institutes" className="btn btn-secondary" id="btn-404-institutes">
            <Search size={16} />
            <span>Browse Institutes</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
