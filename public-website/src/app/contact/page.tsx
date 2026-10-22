'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  Building2,
  Headphones,
  ShieldCheck,
  Loader2,
  ExternalLink,
} from 'lucide-react';

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    queryType: 'General',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [referenceId, setReferenceId] = useState<string | null>(null);
  const [routedTo, setRoutedTo] = useState<string | null>(null);
  const [generalError, setGeneralError] = useState<string | null>(null);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name || !formData.name.trim()) {
      errs.name = 'Full name is mandatory and cannot be empty.';
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailPattern.test(formData.email.trim())) {
      errs.email = 'A valid email address is required.';
    }
    if (formData.phone && formData.phone.trim()) {
      const phonePattern = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{7,15}$/;
      if (!phonePattern.test(formData.phone.trim())) {
        errs.phone = 'Phone number format is invalid.';
      }
    }
    if (!formData.queryType) {
      errs.queryType = 'Please select a query category.';
    }
    if (!formData.message || !formData.message.trim()) {
      errs.message = 'Message cannot be empty.';
    } else if (formData.message.length > 5000) {
      errs.message = 'Message exceeds the maximum limit of 5,000 characters.';
    }
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError(null);
    const formErrors = validate();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      // Auto-focus first error field
      const firstKey = Object.keys(formErrors)[0];
      const el = document.getElementById(`contact-${firstKey}`);
      el?.focus();
      return;
    }

    setErrors({});
    setSubmitting(true);

    try {
      const res = await fetch('/api/public/contact-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const resData = await res.json();
      if (res.ok && resData.success) {
        setReferenceId(resData.referenceId);
        setRoutedTo(resData.routedTo);
      } else {
        setGeneralError(resData.error || 'Submission failed. Please check the form.');
      }
    } catch (err) {
      setGeneralError('Network failure occurred. Please retry your request.');
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      queryType: 'General',
      message: '',
    });
    setReferenceId(null);
    setRoutedTo(null);
    setErrors({});
  };

  return (
    <div style={{ background: 'var(--bg-page)', paddingBottom: '6rem' }}>
      {/* Header Banner */}
      <section
        style={{
          background: 'linear-gradient(135deg, #090d16 0%, #1e3a8a 60%, #0369a1 100%)',
          color: 'white',
          padding: '4rem 0 3.5rem 0',
        }}
      >
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#93c5fd', marginBottom: '1.25rem' }}>
            <Link href="/" style={{ color: '#e0f2fe' }}>
              Home
            </Link>
            <span>/</span>
            <span>Contact Us</span>
          </div>

          <h1 style={{ fontSize: '2.75rem', color: 'white', marginBottom: '0.75rem' }}>
            Get in Touch with iCampusPro
          </h1>
          <p style={{ fontSize: '1.15rem', color: '#cbd5e1', maxWidth: '680px', lineHeight: 1.6 }}>
            Have questions regarding institute registration, subscriptions, or technical support? Our specialized teams are here to assist you.
          </p>
        </div>
      </section>

      {/* Main 2-Column Content (FR-CON-001 & FR-CON-007) */}
      <div className="container" style={{ marginTop: '3.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '3rem', alignItems: 'flex-start' }}>
          {/* LEFT: Contact Form */}
          <div
            style={{
              background: 'white',
              padding: '2.5rem',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--border-light)',
              boxShadow: 'var(--shadow-sm)',
            }}
            id="contact-form-container"
          >
            {referenceId ? (
              <div style={{ textAlign: 'center', padding: '2rem 1rem' }} id="contact-success-banner">
                <div
                  style={{
                    width: '4.5rem',
                    height: '4.5rem',
                    borderRadius: '50%',
                    background: 'var(--success-soft)',
                    color: 'var(--success)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.5rem auto',
                  }}
                >
                  <CheckCircle2 size={40} />
                </div>

                <h3 style={{ fontSize: '1.6rem', color: 'var(--primary-deep)', marginBottom: '0.5rem' }}>
                  Your request has been received.
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '440px', margin: '0 auto 1.5rem auto' }}>
                  Our team has logged your submission into the queue and will review your inquiry within 24 business hours.
                </p>

                <div
                  style={{
                    background: 'var(--bg-subtle)',
                    padding: '1.5rem',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--border-light)',
                    marginBottom: '2rem',
                    maxWidth: '440px',
                    margin: '0 auto 2rem auto',
                  }}
                >
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Tracking Reference ID
                  </span>
                  <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary)', marginTop: '0.25rem' }}>
                    {referenceId}
                  </div>
                  {routedTo && (
                    <div style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      Assigned Queue: <strong>{routedTo}</strong>
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={resetForm}
                  id="btn-submit-another-contact"
                >
                  <span>Submit Another Inquiry</span>
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate id="contact-form">
                <h2 style={{ fontSize: '1.5rem', color: 'var(--primary-deep)', marginBottom: '0.5rem' }}>
                  Send Us a Message
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.75rem' }}>
                  Please fill in the required fields so we can route your ticket to the right department.
                </p>

                {generalError && (
                  <div
                    style={{
                      padding: '0.85rem 1rem',
                      background: 'var(--danger-soft)',
                      border: '1px solid #fecaca',
                      borderRadius: 'var(--radius-md)',
                      color: 'var(--danger)',
                      fontSize: '0.875rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      marginBottom: '1.5rem',
                    }}
                  >
                    <AlertCircle size={16} />
                    <span>{generalError}</span>
                  </div>
                )}

                <div className="form-group">
                  <label className="form-label" htmlFor="contact-name">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    className={`form-input ${errors.name ? 'error' : ''}`}
                    required
                  />
                  {errors.name && (
                    <span className="form-error-msg">
                      <AlertCircle size={14} /> {errors.name}
                    </span>
                  )}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-email">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
                      className={`form-input ${errors.email ? 'error' : ''}`}
                      required
                    />
                    {errors.email && (
                      <span className="form-error-msg">
                        <AlertCircle size={14} /> {errors.email}
                      </span>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-phone">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      id="contact-phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98000 00000"
                      className={`form-input ${errors.phone ? 'error' : ''}`}
                    />
                    {errors.phone && (
                      <span className="form-error-msg">
                        <AlertCircle size={14} /> {errors.phone}
                      </span>
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contact-queryType">
                    Query Classification / Category *
                  </label>
                  <select
                    id="contact-queryType"
                    value={formData.queryType}
                    onChange={(e) => setFormData({ ...formData, queryType: e.target.value as any })}
                    className={`form-select ${errors.queryType ? 'error' : ''}`}
                    required
                  >
                    <option value="General">General Inquiry & Overview</option>
                    <option value="Registration">Institute Onboarding & Registration</option>
                    <option value="Subscription">Subscription, Plans & Billing</option>
                    <option value="Technical">Technical Support & Integrations</option>
                  </select>
                  {errors.queryType && (
                    <span className="form-error-msg">
                      <AlertCircle size={14} /> {errors.queryType}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contact-message">
                    Message Details * ({5000 - formData.message.length} chars remaining)
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your inquiry, student strength, or question in detail..."
                    className={`form-textarea ${errors.message ? 'error' : ''}`}
                    maxLength={5000}
                    required
                  />
                  {errors.message && (
                    <span className="form-error-msg">
                      <AlertCircle size={14} /> {errors.message}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '0.85rem', fontSize: '1rem', marginTop: '0.5rem' }}
                  id="btn-submit-contact-form"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>Transmitting Inquiry...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Contact Request</span>
                      <Send size={16} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* RIGHT: Contact Information Card (FR-CON-007) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            <div
              style={{
                background: 'white',
                padding: '2rem',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--border-light)',
                boxShadow: 'var(--shadow-sm)',
              }}
              id="contact-info-card"
            >
              <h3 style={{ fontSize: '1.25rem', color: 'var(--primary-deep)', marginBottom: '1.25rem' }}>
                Corporate Headquarters
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', fontSize: '0.95rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <MapPin size={20} color="var(--primary)" style={{ flexShrink: 0, marginTop: 3 }} />
                  <div>
                    <strong style={{ display: 'block', color: 'var(--primary-deep)' }}>Office Address</strong>
                    <span style={{ color: 'var(--text-secondary)' }}>
                      iCampusPro Technologies Pvt. Ltd.<br />
                      Tower B, Cyber Heights, Sector 62,<br />
                      Noida, Uttar Pradesh 201309, India
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <Mail size={20} color="var(--primary)" style={{ flexShrink: 0, marginTop: 3 }} />
                  <div>
                    <strong style={{ display: 'block', color: 'var(--primary-deep)' }}>Email Contacts</strong>
                    <a href="mailto:contact@icampuspro.com" style={{ color: 'var(--primary)', display: 'block' }}>
                      contact@icampuspro.com
                    </a>
                    <a href="mailto:support@icampuspro.com" style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                      support@icampuspro.com
                    </a>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <Phone size={20} color="var(--primary)" style={{ flexShrink: 0, marginTop: 3 }} />
                  <div>
                    <strong style={{ display: 'block', color: 'var(--primary-deep)' }}>Helpdesk Helpline</strong>
                    <a href="tel:+911149876500" style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
                      +91 11 4987 6500
                    </a>
                    <span style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                      Toll-free across India
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <Clock size={20} color="var(--primary)" style={{ flexShrink: 0, marginTop: 3 }} />
                  <div>
                    <strong style={{ display: 'block', color: 'var(--primary-deep)' }}>Business Hours</strong>
                    <span style={{ color: 'var(--text-secondary)' }}>
                      Monday – Friday: 9:00 AM – 6:00 PM IST<br />
                      Saturday: 9:00 AM – 1:00 PM IST
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Map Visual Placeholder */}
            <div
              style={{
                background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                borderRadius: 'var(--radius-xl)',
                padding: '2rem',
                color: 'white',
                textAlign: 'center',
                boxShadow: 'var(--shadow-sm)',
                border: '1px solid var(--border-light)',
              }}
              id="map-card-placeholder"
            >
              <div
                style={{
                  width: '3.5rem',
                  height: '3.5rem',
                  borderRadius: '50%',
                  background: 'rgba(56, 189, 248, 0.15)',
                  color: '#38bdf8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem auto',
                }}
              >
                <MapPin size={24} />
              </div>
              <h4 style={{ fontSize: '1.15rem', color: 'white', marginBottom: '0.5rem' }}>
                Noida Cyber Hub Location
              </h4>
              <p style={{ fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '1.25rem' }}>
                Centrally situated 5 minutes from Electronic City Metro Station, catering to educational institutes across Delhi NCR and India.
              </p>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline-white"
                style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}
              >
                <span>Open in Maps</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
