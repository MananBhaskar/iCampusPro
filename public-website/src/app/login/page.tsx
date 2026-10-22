'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  Building2,
  Users,
  ShieldCheck,
  Lock,
  Mail,
  ArrowRight,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';

export default function LoginPage() {
  const [role, setRole] = useState<'institute' | 'parent'>('institute');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setSubmitted(true);
  };

  return (
    <div
      style={{
        minHeight: '85vh',
        background: 'var(--bg-page)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3rem 1.5rem',
      }}
    >
      <div
        style={{
          background: 'white',
          maxWidth: '480px',
          width: '100%',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border-light)',
          boxShadow: 'var(--shadow-md)',
          padding: '2.5rem',
        }}
        id="login-card-container"
      >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Link href="/" className="brand-logo" style={{ justifyContent: 'center', marginBottom: '1rem', display: 'inline-flex' }}>
            <div className="logo-mark">
              <GraduationCap size={22} strokeWidth={2.5} />
            </div>
            <span>
              iCampus<span style={{ color: 'var(--primary)' }}>Pro</span>
            </span>
          </Link>

          <h1 style={{ fontSize: '1.65rem', color: 'var(--primary-deep)', marginBottom: '0.35rem' }}>
            Platform Authentication
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Sign in to access your digital campus portal, grades, or administrative console
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            background: 'var(--bg-subtle)',
            padding: '4px',
            borderRadius: 'var(--radius-md)',
            marginBottom: '1.75rem',
          }}
        >
          <button
            type="button"
            onClick={() => {
              setRole('institute');
              setSubmitted(false);
            }}
            style={{
              padding: '0.55rem',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.85rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              background: role === 'institute' ? 'white' : 'transparent',
              color: role === 'institute' ? 'var(--primary)' : 'var(--text-muted)',
              boxShadow: role === 'institute' ? 'var(--shadow-xs)' : 'none',
              transition: 'all 150ms ease',
            }}
          >
            <Building2 size={16} />
            <span>Institute Staff</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setRole('parent');
              setSubmitted(false);
            }}
            style={{
              padding: '0.55rem',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.85rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              background: role === 'parent' ? 'white' : 'transparent',
              color: role === 'parent' ? 'var(--primary)' : 'var(--text-muted)',
              boxShadow: role === 'parent' ? 'var(--shadow-xs)' : 'none',
              transition: 'all 150ms ease',
            }}
          >
            <Users size={16} />
            <span>Parent / Student</span>
          </button>
        </div>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
            <div
              style={{
                width: '4rem',
                height: '4rem',
                borderRadius: '50%',
                background: 'var(--primary-soft)',
                color: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem auto',
              }}
            >
              <CheckCircle2 size={36} />
            </div>
            <h3 style={{ fontSize: '1.3rem', color: 'var(--primary-deep)', marginBottom: '0.5rem' }}>
              Redirecting to Authenticated Portal
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Connecting to secure {role === 'institute' ? 'Faculty & Institute Administration' : 'Parent & Student Dashboard'} environment...
            </p>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setSubmitted(false)}
              style={{ width: '100%' }}
            >
              Back to Login
            </button>
          </div>
        ) : (
          <form onSubmit={handleLogin} noValidate>
            <div className="form-group">
              <label className="form-label" htmlFor="login-email">
                Official Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <Mail
                  size={16}
                  style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}
                />
                <input
                  type="email"
                  id="login-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={role === 'institute' ? 'admin@dpsrkp.net' : 'parent@example.com'}
                  className="form-input"
                  style={{ paddingLeft: '2.5rem' }}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="login-password">
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <Lock
                  size={16}
                  style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}
                />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="login-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="form-input"
                  style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', padding: '0.85rem', fontSize: '1rem', marginTop: '0.5rem' }}
              id="btn-login-submit"
            >
              <span>Sign In to {role === 'institute' ? 'Campus Portal' : 'Student Portal'}</span>
              <ArrowRight size={16} />
            </button>
          </form>
        )}

        {/* Admin Portal Quick Switch */}
        <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-light)', textAlign: 'center' }}>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
            Looking for platform governance & review moderation?
          </p>
          <a
            href={process.env.NEXT_PUBLIC_ADMIN_URL || 'https://icampusproadmin.vercel.app'}
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              color: 'var(--primary)',
              fontWeight: 600,
              fontSize: '0.875rem',
            }}
          >
            <ShieldCheck size={16} />
            <span>Open Central Admin Console &rarr;</span>
          </a>
        </div>
      </div>
    </div>
  );
}
