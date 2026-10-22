'use client';

import React, { useState } from 'react';
import { X, Building2, CheckCircle2, AlertCircle, ArrowRight, Loader2 } from 'lucide-react';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RegistrationModal({ isOpen, onClose }: RegistrationModalProps) {
  const [formData, setFormData] = useState({
    instituteName: '',
    instituteType: 'School',
    city: '',
    contactPerson: '',
    mobile: '',
    email: '',
    studentStrength: '1,000 - 5,000 Students',
    deploymentNeed: 'Dedicated Sovereign Cloud',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [referenceId, setReferenceId] = useState<string | null>(null);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.instituteName || !formData.instituteName.trim()) {
      errs.instituteName = 'Institute Name is required and must not contain only whitespace.';
    }
    if (!formData.instituteType) {
      errs.instituteType = 'Please select an institute type.';
    }
    if (!formData.city || !formData.city.trim()) {
      errs.city = 'City is required.';
    }
    if (!formData.contactPerson || !formData.contactPerson.trim()) {
      errs.contactPerson = 'Contact Person name is required.';
    }
    const phonePattern = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{7,15}$/;
    if (!formData.mobile || !phonePattern.test(formData.mobile.trim())) {
      errs.mobile = 'Enter a valid telephone/mobile number.';
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailPattern.test(formData.email.trim())) {
      errs.email = 'Enter a valid official email address.';
    }
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionError(null);
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setSubmitting(true);

    try {
      const response = await fetch('/api/public/registration-enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const resData = await response.json();
      if (response.ok && resData.success) {
        setReferenceId(resData.referenceId);
      } else {
        setSubmissionError(resData.error || 'Submission failed. Please verify your entries.');
      }
    } catch (err) {
      setSubmissionError('Network error occurred. Please check your connection and retry.');
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      instituteName: '',
      instituteType: 'School',
      city: '',
      contactPerson: '',
      mobile: '',
      email: '',
      studentStrength: '1,000 - 5,000 Students',
      deploymentNeed: 'Cloud SaaS (Managed Cloud)',
    });
    setErrors({});
    setReferenceId(null);
    setSubmissionError(null);
    onClose();
  };

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal-dialog">
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              style={{
                width: '2.5rem',
                height: '2.5rem',
                borderRadius: 'var(--radius-md)',
                background: 'var(--primary-soft)',
                color: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Building2 size={20} />
            </div>
            <div>
              <h3 id="modal-title">Institute Registration Enquiry</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Phase 1 Onboarding & Demonstration Request
              </p>
            </div>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={resetForm}
            aria-label="Close dialog"
            id="btn-close-registration-modal"
          >
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          {referenceId ? (
            <div style={{ textAlign: 'center', padding: '1rem 0' }} id="enquiry-success-view">
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
              <h3 style={{ fontSize: '1.45rem', marginBottom: '0.5rem', color: 'var(--primary-deep)' }}>
                Enquiry Successfully Registered!
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.5rem', maxWidth: '420px', margin: '0 auto 1.5rem auto' }}>
                Thank you for choosing iCampusPro. Our App Admin and institutional onboarding team will review your enquiry and schedule an onboarding demonstration.
              </p>

              <div
                style={{
                  background: 'var(--bg-subtle)',
                  padding: '1.25rem',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border-light)',
                  marginBottom: '2rem',
                }}
              >
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Enquiry Reference ID
                </span>
                <div style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--primary)', marginTop: '0.25rem' }}>
                  {referenceId}
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                  Please quote this reference number during correspondence.
                </p>
              </div>

              <button
                type="button"
                className="btn btn-primary"
                onClick={resetForm}
                style={{ width: '100%' }}
                id="btn-done-registration-enquiry"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate id="registration-enquiry-form">
              {submissionError && (
                <div
                  style={{
                    padding: '0.75rem 1rem',
                    background: 'var(--danger-soft)',
                    border: '1px solid #fecaca',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--danger)',
                    fontSize: '0.875rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '1.25rem',
                  }}
                  id="registration-enquiry-error"
                >
                  <AlertCircle size={16} />
                  <span>{submissionError}</span>
                </div>
              )}

              <div className="form-group">
                <label className="form-label" htmlFor="reg-inst-name">
                  Institute Name *
                </label>
                <input
                  type="text"
                  id="reg-inst-name"
                  value={formData.instituteName}
                  onChange={(e) => setFormData({ ...formData, instituteName: e.target.value })}
                  placeholder="e.g. Modern International Public School"
                  className={`form-input ${errors.instituteName ? 'error' : ''}`}
                  required
                />
                {errors.instituteName && (
                  <span className="form-error-msg">
                    <AlertCircle size={14} /> {errors.instituteName}
                  </span>
                )}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="reg-inst-type">
                    Institute Category *
                  </label>
                  <select
                    id="reg-inst-type"
                    value={formData.instituteType}
                    onChange={(e) => setFormData({ ...formData, instituteType: e.target.value as any })}
                    className={`form-select ${errors.instituteType ? 'error' : ''}`}
                    required
                  >
                    <option value="Play School">Play School</option>
                    <option value="School">School</option>
                    <option value="College">College</option>
                    <option value="Coaching Institute">Coaching Institute</option>
                    <option value="Others">Others</option>
                  </select>
                  {errors.instituteType && (
                    <span className="form-error-msg">
                      <AlertCircle size={14} /> {errors.instituteType}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="reg-city">
                    City / Location *
                  </label>
                  <input
                    type="text"
                    id="reg-city"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="e.g. New Delhi"
                    className={`form-input ${errors.city ? 'error' : ''}`}
                    required
                  />
                  {errors.city && (
                    <span className="form-error-msg">
                      <AlertCircle size={14} /> {errors.city}
                    </span>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="reg-contact-person">
                  Contact Person Name *
                </label>
                <input
                  type="text"
                  id="reg-contact-person"
                  value={formData.contactPerson}
                  onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                  placeholder="Principal, Director, or Administrative Head"
                  className={`form-input ${errors.contactPerson ? 'error' : ''}`}
                  required
                />
                {errors.contactPerson && (
                  <span className="form-error-msg">
                    <AlertCircle size={14} /> {errors.contactPerson}
                  </span>
                )}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="reg-mobile">
                    Contact Mobile *
                  </label>
                  <input
                    type="tel"
                    id="reg-mobile"
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    placeholder="+91 98123 45678"
                    className={`form-input ${errors.mobile ? 'error' : ''}`}
                    required
                  />
                  {errors.mobile && (
                    <span className="form-error-msg">
                      <AlertCircle size={14} /> {errors.mobile}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="reg-email">
                    Official Email *
                  </label>
                  <input
                    type="email"
                    id="reg-email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="admin@school.edu.in"
                    className={`form-input ${errors.email ? 'error' : ''}`}
                    required
                  />
                  {errors.email && (
                    <span className="form-error-msg">
                      <AlertCircle size={14} /> {errors.email}
                    </span>
                  )}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '0.25rem' }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="reg-student-strength">
                    Current Student Strength / Scale
                  </label>
                  <select
                    id="reg-student-strength"
                    value={formData.studentStrength}
                    onChange={(e) => setFormData({ ...formData, studentStrength: e.target.value })}
                    className="form-select"
                  >
                    <option value="Under 1,000 Students">Under 1,000 Students</option>
                    <option value="1,000 - 5,000 Students">1,000 – 5,000 Students</option>
                    <option value="5,000 - 20,000 Students">5,000 – 20,000 Students</option>
                    <option value="20,000+ Multi-Campus Network">20,000+ Multi-Campus Network</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="reg-deployment-need">
                    Preferred Cloud Architecture
                  </label>
                  <select
                    id="reg-deployment-need"
                    value={formData.deploymentNeed}
                    onChange={(e) => setFormData({ ...formData, deploymentNeed: e.target.value })}
                    className="form-select"
                  >
                    <option value="Dedicated Sovereign Cloud">Dedicated Sovereign Cloud (India)</option>
                    <option value="Multi-Tenant SaaS">Multi-Tenant SaaS (Standard)</option>
                    <option value="On-Premises Hybrid Air-Gapped">On-Premises Hybrid Air-Gapped</option>
                  </select>
                </div>
              </div>

              <div style={{ marginTop: '0.5rem', marginBottom: '1.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                * By submitting this enquiry, you authorize iCampusPro support representatives to contact your administration for platform qualification and onboarding.
              </div>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={resetForm}
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={submitting}
                  id="btn-submit-registration-enquiry"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Submitting Enquiry...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Registration Enquiry</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
