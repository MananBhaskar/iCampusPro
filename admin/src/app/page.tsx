'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  ClipboardList,
  Headphones,
  Building2,
  Star,
  Megaphone,
  ShieldAlert,
  FileText,
  ExternalLink,
  CheckCircle2,
  XCircle,
  Clock,
  UserCheck,
  Search,
  Filter,
  RefreshCw,
  Edit,
  Save,
  ShieldCheck,
  AlertCircle,
  Building,
  Mail,
  Phone,
  Eye,
  Check,
  X,
} from 'lucide-react';

interface DatabaseData {
  institutes: any[];
  ratings: any[];
  enquiries: any[];
  contacts: any[];
  advertisements: any[];
  testimonials: any[];
  privacyPolicy: any;
  newsletters: any[];
}

export default function AdminDashboardPage() {
  const [data, setData] = useState<DatabaseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    'overview' | 'enquiries' | 'contacts' | 'institutes' | 'reviews' | 'advertisements' | 'privacy'
  >('overview');

  const [notification, setNotification] = useState<string | null>(null);

  // Filters
  const [enquiryStatusFilter, setEnquiryStatusFilter] = useState('ALL');
  const [enquirySegmentFilter, setEnquirySegmentFilter] = useState('ALL');
  const [contactTypeFilter, setContactTypeFilter] = useState('ALL');
  const [reviewStatusFilter, setReviewStatusFilter] = useState('ALL');

  // Policy Editor State
  const [editPolicyVersion, setEditPolicyVersion] = useState('');
  const [editPolicySections, setEditPolicySections] = useState<any[]>([]);

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/data');
      const json = await res.json();
      if (json.success && json.data) {
        setData(json.data);
        if (json.data.privacyPolicy) {
          setEditPolicyVersion(json.data.privacyPolicy.version || '1.0');
          setEditPolicySections(json.data.privacyPolicy.sections || []);
        }
      }
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 3500);
  };

  // 1. Update Enquiry Status
  const handleUpdateEnquiry = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/enquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const resData = await res.json();
      if (res.ok && resData.success) {
        showToast(`Enquiry ${id} status updated to ${newStatus}`);
        await loadData();
      }
    } catch (err) {
      showToast('Failed to update enquiry status.');
    }
  };

  // 2. Update Contact Ticket Status
  const handleUpdateContact = async (id: string, newStatus: string, assignedTo?: string) => {
    try {
      const res = await fetch(`/api/admin/contacts/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus, assignedTo }),
      });
      const resData = await res.json();
      if (res.ok && resData.success) {
        showToast(`Contact ticket ${id} marked as ${newStatus}`);
        await loadData();
      }
    } catch (err) {
      showToast('Failed to update contact ticket.');
    }
  };

  // 3. Moderate Review (Approve / Reject / Hide)
  const handleModerateReview = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/admin/reviews/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      const resData = await res.json();
      if (res.ok && resData.success) {
        showToast(`Review ${id} status changed to ${status}`);
        await loadData();
      }
    } catch (err) {
      showToast('Review moderation update failed.');
    }
  };

  // 4. Update Institute Status (Published, Draft, Suspended)
  const handleUpdateInstituteStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/admin/institutes/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      const resData = await res.json();
      if (res.ok && resData.success) {
        showToast(`Institute ${id} status set to ${status}`);
        await loadData();
      }
    } catch (err) {
      showToast('Failed to change institute publication status.');
    }
  };

  // 5. Save and Publish Privacy Policy
  const handleSavePolicy = async () => {
    try {
      const res = await fetch('/api/admin/privacy-policy', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          version: editPolicyVersion,
          lastUpdated: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }),
          sections: editPolicySections,
        }),
      });
      const resData = await res.json();
      if (res.ok && resData.success) {
        showToast('Privacy Policy updated and published to public website!');
        await loadData();
      }
    } catch (err) {
      showToast('Failed to publish privacy policy.');
    }
  };

  if (loading && !data) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0b0f19', color: '#94a3b8' }}>
        <RefreshCw size={32} className="animate-spin" style={{ color: '#3b82f6', marginRight: 12 }} />
        <span>Loading iCampusPro Administrative Console...</span>
      </div>
    );
  }

  const pendingReviewsCount = data?.ratings.filter((r) => r.status === 'Pending').length || 0;
  const newEnquiriesCount = data?.enquiries.filter((e) => e.status === 'New').length || 0;
  const openContactsCount = data?.contacts.filter((c) => c.status === 'New' || c.status === 'In Progress').length || 0;
  const totalInstitutesCount = data?.institutes.length || 0;

  return (
    <div className="admin-shell">
      {/* Toast Notification */}
      {notification && (
        <div
          style={{
            position: 'fixed',
            top: '1.5rem',
            right: '2rem',
            background: '#1e293b',
            color: '#f8fafc',
            border: '1px solid #3b82f6',
            boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
            padding: '0.85rem 1.5rem',
            borderRadius: '10px',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            fontWeight: 600,
            fontSize: '0.9rem',
          }}
        >
          <CheckCircle2 size={18} color="#34d399" />
          <span>{notification}</span>
        </div>
      )}

      {/* LEFT SIDEBAR */}
      <aside className="admin-sidebar">
        <div className="sidebar-brand">
          <div
            style={{
              width: '2rem',
              height: '2rem',
              borderRadius: '6px',
              background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
            }}
          >
            <ShieldCheck size={18} />
          </div>
          <div>
            iCampus<span style={{ color: '#60a5fa' }}>Admin</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <button
            type="button"
            className={`sidebar-nav-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
            id="tab-btn-overview"
          >
            <LayoutDashboard size={18} />
            <span>Dashboard Overview</span>
          </button>

          <button
            type="button"
            className={`sidebar-nav-item ${activeTab === 'enquiries' ? 'active' : ''}`}
            onClick={() => setActiveTab('enquiries')}
            id="tab-btn-enquiries"
          >
            <ClipboardList size={18} />
            <span>Registration Enquiries</span>
            {newEnquiriesCount > 0 && (
              <span style={{ marginLeft: 'auto', background: '#2563eb', color: 'white', fontSize: '0.7rem', padding: '0.15rem 0.5rem', borderRadius: 9999 }}>
                {newEnquiriesCount}
              </span>
            )}
          </button>

          <button
            type="button"
            className={`sidebar-nav-item ${activeTab === 'contacts' ? 'active' : ''}`}
            onClick={() => setActiveTab('contacts')}
            id="tab-btn-contacts"
          >
            <Headphones size={18} />
            <span>Support Contacts</span>
            {openContactsCount > 0 && (
              <span style={{ marginLeft: 'auto', background: '#f59e0b', color: '#78350f', fontSize: '0.7rem', padding: '0.15rem 0.5rem', borderRadius: 9999, fontWeight: 700 }}>
                {openContactsCount}
              </span>
            )}
          </button>

          <button
            type="button"
            className={`sidebar-nav-item ${activeTab === 'institutes' ? 'active' : ''}`}
            onClick={() => setActiveTab('institutes')}
            id="tab-btn-institutes"
          >
            <Building2 size={18} />
            <span>Institute Profiles</span>
          </button>

          <button
            type="button"
            className={`sidebar-nav-item ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={() => setActiveTab('reviews')}
            id="tab-btn-reviews"
          >
            <Star size={18} />
            <span>Review Moderation</span>
            {pendingReviewsCount > 0 && (
              <span style={{ marginLeft: 'auto', background: '#ef4444', color: 'white', fontSize: '0.7rem', padding: '0.15rem 0.5rem', borderRadius: 9999 }}>
                {pendingReviewsCount}
              </span>
            )}
          </button>

          <button
            type="button"
            className={`sidebar-nav-item ${activeTab === 'advertisements' ? 'active' : ''}`}
            onClick={() => setActiveTab('advertisements')}
            id="tab-btn-advertisements"
          >
            <Megaphone size={18} />
            <span>Promotions & Ads</span>
          </button>

          <button
            type="button"
            className={`sidebar-nav-item ${activeTab === 'privacy' ? 'active' : ''}`}
            onClick={() => setActiveTab('privacy')}
            id="tab-btn-privacy"
          >
            <FileText size={18} />
            <span>Privacy Policy Editor</span>
          </button>
        </nav>

        {/* Public Website Link */}
        <div style={{ padding: '1.25rem', borderTop: '1px solid var(--admin-border)' }}>
          <a
            href="http://localhost:3000"
            target="_blank"
            rel="noreferrer"
            className="admin-btn admin-btn-outline"
            style={{ width: '100%', justifyContent: 'center' }}
            id="btn-open-public-site"
          >
            <span>Open Public Website</span>
            <ExternalLink size={14} />
          </a>
        </div>
      </aside>

      {/* MAIN ADMIN AREA */}
      <div className="admin-main">
        {/* Top Header */}
        <header className="admin-topbar">
          <div>
            <h2 style={{ fontSize: '1.25rem', color: 'white' }}>
              {activeTab === 'overview' && 'Executive Operations Dashboard'}
              {activeTab === 'enquiries' && 'Phase 1 Institute Registration Enquiries'}
              {activeTab === 'contacts' && 'Support & Dispute Contact Queue'}
              {activeTab === 'institutes' && 'Educational Institutes Directory Management'}
              {activeTab === 'reviews' && 'Public Ratings & Review Moderation Desk'}
              {activeTab === 'advertisements' && 'Promotional Campaigns & Banner Manager'}
              {activeTab === 'privacy' && 'Privacy Policy Content & Version Manager'}
            </h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              type="button"
              onClick={loadData}
              className="admin-btn admin-btn-outline"
              title="Refresh database records"
            >
              <RefreshCw size={14} />
              <span>Sync DB</span>
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <div
                style={{
                  width: '2.25rem',
                  height: '2.25rem',
                  borderRadius: '50%',
                  background: '#374151',
                  color: '#93c5fd',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                }}
              >
                AP
              </div>
              <div style={{ fontSize: '0.85rem' }}>
                <strong style={{ display: 'block', color: 'white' }}>App Admin</strong>
                <span style={{ color: '#94a3b8', fontSize: '0.75rem' }}>Central Ops Head</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Views */}
        <div className="admin-content">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div>
              {/* Metric Cards Row */}
              <div className="metrics-row">
                <div className="metric-card">
                  <div className="metric-card-header">
                    <span className="label">Registered Institutes</span>
                    <div className="metric-icon-box" style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa' }}>
                      <Building2 size={20} />
                    </div>
                  </div>
                  <h3>{totalInstitutesCount}</h3>
                  <span style={{ fontSize: '0.75rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: 4, marginTop: '0.5rem' }}>
                    <CheckCircle2 size={12} /> {data?.institutes.filter((i) => i.status === 'Published').length} Published
                  </span>
                </div>

                <div className="metric-card">
                  <div className="metric-card-header">
                    <span className="label">Registration Enquiries</span>
                    <div className="metric-icon-box" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399' }}>
                      <ClipboardList size={20} />
                    </div>
                  </div>
                  <h3>{data?.enquiries.length || 0}</h3>
                  <span style={{ fontSize: '0.75rem', color: '#93c5fd', display: 'flex', alignItems: 'center', gap: 4, marginTop: '0.5rem' }}>
                    <Clock size={12} /> {newEnquiriesCount} New Submissions
                  </span>
                </div>

                <div className="metric-card">
                  <div className="metric-card-header">
                    <span className="label">Support Inquiries</span>
                    <div className="metric-icon-box" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24' }}>
                      <Headphones size={20} />
                    </div>
                  </div>
                  <h3>{data?.contacts.length || 0}</h3>
                  <span style={{ fontSize: '0.75rem', color: '#fcd34d', display: 'flex', alignItems: 'center', gap: 4, marginTop: '0.5rem' }}>
                    <AlertCircle size={12} /> {openContactsCount} Open Tickets
                  </span>
                </div>

                <div className="metric-card">
                  <div className="metric-card-header">
                    <span className="label">Awaiting Moderation</span>
                    <div className="metric-icon-box" style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#f87171' }}>
                      <Star size={20} />
                    </div>
                  </div>
                  <h3>{pendingReviewsCount}</h3>
                  <span style={{ fontSize: '0.75rem', color: pendingReviewsCount > 0 ? '#f87171' : '#10b981', display: 'flex', alignItems: 'center', gap: 4, marginTop: '0.5rem' }}>
                    {pendingReviewsCount > 0 ? 'Requires Content Approval' : 'All Reviews Verified'}
                  </span>
                </div>
              </div>

              {/* Recent Enquiries & Support Tickets Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '2rem' }}>
                {/* Recent Enquiries */}
                <div className="admin-card">
                  <div className="admin-card-header">
                    <h3 style={{ fontSize: '1.1rem', color: 'white' }}>Recent Registration Enquiries</h3>
                    <button
                      type="button"
                      onClick={() => setActiveTab('enquiries')}
                      className="admin-btn admin-btn-outline"
                      style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem' }}
                    >
                      View All
                    </button>
                  </div>
                  <div style={{ overflowX: 'auto' }}>
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Ref ID</th>
                          <th>Institute Name</th>
                          <th>Type</th>
                          <th>Contact</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data?.enquiries.slice(0, 5).map((e) => (
                          <tr key={e.id}>
                            <td>
                              <strong style={{ color: '#60a5fa' }}>{e.id}</strong>
                            </td>
                            <td>{e.instituteName}</td>
                            <td>{e.instituteType}</td>
                            <td>
                              <div>{e.contactPerson}</div>
                              <small style={{ color: '#94a3b8' }}>{e.mobile}</small>
                            </td>
                            <td>
                              <span className={`status-badge status-${e.status.toLowerCase().replace(/\s+/g, '-')}`}>
                                {e.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Queue Summary */}
                <div className="admin-card">
                  <div className="admin-card-header">
                    <h3 style={{ fontSize: '1.1rem', color: 'white' }}>Query Routing Queues</h3>
                  </div>
                  <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {[
                      { name: 'Institute Onboarding Team', count: data?.contacts.filter((c) => c.queryType === 'Registration').length || 0, color: '#3b82f6' },
                      { name: 'General Enquiries Queue', count: data?.contacts.filter((c) => c.queryType === 'General').length || 0, color: '#10b981' },
                      { name: 'Billing Support', count: data?.contacts.filter((c) => c.queryType === 'Subscription').length || 0, color: '#f59e0b' },
                      { name: 'Technical Architecture Team', count: data?.contacts.filter((c) => c.queryType === 'Technical').length || 0, color: '#8b5cf6' },
                    ].map((q) => (
                      <div
                        key={q.name}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '0.75rem 1rem',
                          background: 'rgba(31, 41, 55, 0.4)',
                          borderRadius: '8px',
                          borderLeft: `4px solid ${q.color}`,
                        }}
                      >
                        <span style={{ fontSize: '0.85rem', color: '#e2e8f0' }}>{q.name}</span>
                        <strong style={{ color: 'white', fontSize: '1rem' }}>{q.count}</strong>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ENQUIRIES */}
          {activeTab === 'enquiries' && (
            <div>
              <div className="admin-card">
                <div className="admin-card-header" style={{ flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.15rem', color: 'white' }}>Phase 1 Registration Enquiries</h3>
                    <p style={{ fontSize: '0.825rem', color: '#94a3b8' }}>
                      Enquiries submitted by prospective educational institutes through the public homepage.
                    </p>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'flex-end' }}>
                    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '0.75rem', color: '#64748b', alignSelf: 'center', marginRight: '0.25rem' }}>Segment:</span>
                      {['ALL', 'School', 'College', 'Coaching Institute'].map((seg) => (
                        <button
                          key={seg}
                          type="button"
                          onClick={() => setEnquirySegmentFilter(seg)}
                          style={{
                            padding: '0.25rem 0.65rem',
                            borderRadius: '6px',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            background: enquirySegmentFilter === seg ? '#6366f1' : 'rgba(31, 41, 55, 0.4)',
                            color: enquirySegmentFilter === seg ? 'white' : '#94a3b8',
                            border: '1px solid ' + (enquirySegmentFilter === seg ? '#818cf8' : '#374151'),
                          }}
                        >
                          {seg}
                        </button>
                      ))}
                    </div>

                    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '0.75rem', color: '#64748b', alignSelf: 'center', marginRight: '0.25rem' }}>Status:</span>
                      {['ALL', 'New', 'Under Review', 'Contacted', 'Qualified', 'Converted', 'Rejected'].map((status) => (
                        <button
                          key={status}
                          type="button"
                          onClick={() => setEnquiryStatusFilter(status)}
                          style={{
                            padding: '0.25rem 0.65rem',
                            borderRadius: 9999,
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            background: enquiryStatusFilter === status ? '#3b82f6' : 'rgba(31, 41, 55, 0.6)',
                            color: enquiryStatusFilter === status ? 'white' : '#94a3b8',
                            border: '1px solid #374151',
                          }}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={{ overflowX: 'auto' }}>
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Ref ID</th>
                        <th>Institute & Scale</th>
                        <th>Deployment Model</th>
                        <th>City</th>
                        <th>Contact Representative</th>
                        <th>Status Workflow</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.enquiries
                        .filter((e) => (enquiryStatusFilter === 'ALL' || e.status === enquiryStatusFilter) &&
                                       (enquirySegmentFilter === 'ALL' || e.instituteType.toLowerCase().includes(enquirySegmentFilter.toLowerCase())))
                        .map((enq) => (
                          <tr key={enq.id}>
                            <td>
                              <strong style={{ color: '#60a5fa' }}>{enq.id}</strong>
                              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                                {new Date(enq.createdAt).toLocaleDateString()}
                              </div>
                            </td>
                            <td>
                              <div style={{ fontWeight: 600, color: 'white' }}>{enq.instituteName}</div>
                              <div style={{ display: 'flex', gap: '0.35rem', marginTop: '0.25rem', flexWrap: 'wrap' }}>
                                <span style={{ fontSize: '0.72rem', background: '#1e293b', color: '#93c5fd', padding: '0.1rem 0.4rem', borderRadius: 4, border: '1px solid #334155' }}>
                                  {enq.instituteType}
                                </span>
                                {enq.studentStrength && (
                                  <span style={{ fontSize: '0.72rem', background: '#312e81', color: '#c7d2fe', padding: '0.1rem 0.4rem', borderRadius: 4 }}>
                                    👥 {enq.studentStrength}
                                  </span>
                                )}
                              </div>
                            </td>
                            <td>
                              <span style={{ 
                                fontSize: '0.75rem', 
                                padding: '0.2rem 0.5rem', 
                                borderRadius: 4, 
                                background: enq.deploymentNeed?.includes('Hybrid') ? 'rgba(217, 119, 6, 0.15)' : 'rgba(16, 185, 129, 0.15)', 
                                color: enq.deploymentNeed?.includes('Hybrid') ? '#fcd34d' : '#6ee7b7',
                                border: '1px solid ' + (enq.deploymentNeed?.includes('Hybrid') ? 'rgba(217, 119, 6, 0.4)' : 'rgba(16, 185, 129, 0.4)'),
                                display: 'inline-block'
                              }}>
                                ☁️ {enq.deploymentNeed || 'Cloud Enterprise (SaaS)'}
                              </span>
                            </td>
                            <td>{enq.city}</td>
                            <td>
                              <div style={{ fontWeight: 500 }}>{enq.contactPerson}</div>
                              <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{enq.mobile}</div>
                              <div style={{ fontSize: '0.8rem', color: '#60a5fa' }}>{enq.email}</div>
                            </td>
                            <td>
                              <select
                                value={enq.status}
                                onChange={(e) => handleUpdateEnquiry(enq.id, e.target.value)}
                                style={{
                                  background: '#1f2937',
                                  color: 'white',
                                  border: '1px solid #374151',
                                  borderRadius: '6px',
                                  padding: '0.35rem 0.5rem',
                                  fontSize: '0.8rem',
                                }}
                              >
                                <option value="New">New</option>
                                <option value="Under Review">Under Review</option>
                                <option value="Contacted">Contacted</option>
                                <option value="Qualified">Qualified</option>
                                <option value="Converted">Converted</option>
                                <option value="Rejected">Rejected</option>
                                <option value="Closed">Closed</option>
                              </select>
                            </td>
                            <td>
                              <button
                                type="button"
                                className="admin-btn admin-btn-outline"
                                style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem' }}
                                onClick={() => handleUpdateEnquiry(enq.id, 'Contacted')}
                              >
                                <Phone size={12} /> Contacted
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CONTACTS */}
          {activeTab === 'contacts' && (
            <div>
              <div className="admin-card">
                <div className="admin-card-header" style={{ flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.15rem', color: 'white' }}>Support & Dispute Requests</h3>
                    <p style={{ fontSize: '0.825rem', color: '#94a3b8' }}>
                      Inbound inquiries submitted through the public Contact Us page.
                    </p>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {['ALL', 'General', 'Registration', 'Subscription', 'Technical'].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setContactTypeFilter(type)}
                        style={{
                          padding: '0.35rem 0.75rem',
                          borderRadius: 9999,
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          background: contactTypeFilter === type ? '#06b6d4' : 'rgba(31, 41, 55, 0.6)',
                          color: contactTypeFilter === type ? 'white' : '#94a3b8',
                          border: '1px solid #374151',
                        }}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ overflowX: 'auto' }}>
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Ticket ID</th>
                        <th>Sender Details</th>
                        <th>Category & Queue</th>
                        <th>Message Content</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.contacts
                        .filter((c) => contactTypeFilter === 'ALL' || c.queryType === contactTypeFilter)
                        .map((req) => (
                          <tr key={req.id}>
                            <td>
                              <strong style={{ color: '#38bdf8' }}>{req.id}</strong>
                              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                                {new Date(req.createdAt).toLocaleDateString()}
                              </div>
                            </td>
                            <td>
                              <div style={{ fontWeight: 600, color: 'white' }}>{req.name}</div>
                              <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{req.email}</div>
                              {req.phone && <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{req.phone}</div>}
                            </td>
                            <td>
                              <span style={{ fontWeight: 600, color: '#fcd34d', fontSize: '0.8rem' }}>{req.queryType}</span>
                              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{req.assignedTo}</div>
                            </td>
                            <td style={{ maxWidth: '320px' }}>
                              <p style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: '1.4' }}>{req.message}</p>
                            </td>
                            <td>
                              <select
                                value={req.status}
                                onChange={(e) => handleUpdateContact(req.id, e.target.value)}
                                style={{
                                  background: '#1f2937',
                                  color: 'white',
                                  border: '1px solid #374151',
                                  borderRadius: '6px',
                                  padding: '0.35rem 0.5rem',
                                  fontSize: '0.8rem',
                                }}
                              >
                                <option value="New">New</option>
                                <option value="Assigned">Assigned</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Awaiting User">Awaiting User</option>
                                <option value="Resolved">Resolved</option>
                                <option value="Closed">Closed</option>
                                <option value="Spam">Spam</option>
                              </select>
                            </td>
                            <td>
                              <button
                                type="button"
                                className="admin-btn admin-btn-outline"
                                style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem' }}
                                onClick={() => handleUpdateContact(req.id, 'Resolved')}
                              >
                                <Check size={12} /> Resolve
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: INSTITUTES */}
          {activeTab === 'institutes' && (
            <div>
              <div className="admin-card">
                <div className="admin-card-header">
                  <div>
                    <h3 style={{ fontSize: '1.15rem', color: 'white' }}>Registered Institutes</h3>
                    <p style={{ fontSize: '0.825rem', color: '#94a3b8' }}>
                      Publish, suspend, or manage visibility for academic institutions.
                    </p>
                  </div>
                </div>

                <div style={{ overflowX: 'auto' }}>
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Institute Name</th>
                        <th>Category</th>
                        <th>Location</th>
                        <th>Rating & Reviews</th>
                        <th>Publication Status</th>
                        <th>Public Link</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.institutes.map((inst) => (
                        <tr key={inst.id}>
                          <td>
                            <div style={{ fontWeight: 600, color: 'white' }}>{inst.name}</div>
                            <small style={{ color: '#94a3b8' }}>Affiliation: {inst.affiliation}</small>
                          </td>
                          <td>
                            <span style={{ background: '#1f2937', color: '#93c5fd', padding: '0.2rem 0.5rem', borderRadius: 4, fontSize: '0.8rem' }}>
                              {inst.type}
                            </span>
                          </td>
                          <td>
                            {inst.city}, {inst.state}
                          </td>
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#f59e0b', fontWeight: 700 }}>
                              <Star size={14} fill="#f59e0b" />
                              <span>{inst.ratingSummary?.averageRating?.toFixed(1) || '0.0'}</span>
                              <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 400 }}>
                                ({inst.ratingSummary?.totalReviews || 0})
                              </span>
                            </div>
                          </td>
                          <td>
                            <select
                              value={inst.status}
                              onChange={(e) => handleUpdateInstituteStatus(inst.id, e.target.value)}
                              style={{
                                background: '#1f2937',
                                color: 'white',
                                border: '1px solid #374151',
                                borderRadius: '6px',
                                padding: '0.35rem 0.5rem',
                                fontSize: '0.8rem',
                              }}
                            >
                              <option value="Published">Published</option>
                              <option value="Draft">Draft (Hidden)</option>
                              <option value="Suspended">Suspended</option>
                            </select>
                          </td>
                          <td>
                            <a
                              href={`http://localhost:3000/institutes/${inst.slug}`}
                              target="_blank"
                              rel="noreferrer"
                              className="admin-btn admin-btn-outline"
                              style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem' }}
                            >
                              <Eye size={12} /> View Page
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: REVIEWS MODERATION */}
          {activeTab === 'reviews' && (
            <div>
              <div className="admin-card">
                <div className="admin-card-header" style={{ flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.15rem', color: 'white' }}>Public Ratings & Review Moderation</h3>
                    <p style={{ fontSize: '0.825rem', color: '#94a3b8' }}>
                      Approve or reject parent/student reviews. Approving immediately recalculates the institute's public rating.
                    </p>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {['ALL', 'Pending', 'Published', 'Rejected'].map((status) => (
                      <button
                        key={status}
                        type="button"
                        onClick={() => setReviewStatusFilter(status)}
                        style={{
                          padding: '0.35rem 0.75rem',
                          borderRadius: 9999,
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          background: reviewStatusFilter === status ? '#ef4444' : 'rgba(31, 41, 55, 0.6)',
                          color: reviewStatusFilter === status ? 'white' : '#94a3b8',
                          border: '1px solid #374151',
                        }}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ overflowX: 'auto' }}>
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Institute</th>
                        <th>Reviewer</th>
                        <th>Stars</th>
                        <th>Written Comment</th>
                        <th>Status</th>
                        <th>Moderation Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.ratings
                        .filter((r) => reviewStatusFilter === 'ALL' || r.status === reviewStatusFilter)
                        .map((rev) => {
                          const inst = data.institutes.find((i) => i.id === rev.instituteId);
                          return (
                            <tr key={rev.id}>
                              <td>
                                <strong style={{ color: 'white' }}>{inst?.name || rev.instituteId}</strong>
                              </td>
                              <td>
                                <div style={{ fontWeight: 500 }}>{rev.userName}</div>
                                <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{rev.userRole}</span>
                              </td>
                              <td>
                                <div style={{ display: 'flex', gap: 2, color: '#f59e0b' }}>
                                  {[...Array(rev.score)].map((_, i) => (
                                    <Star key={i} size={13} fill="#f59e0b" />
                                  ))}
                                </div>
                              </td>
                              <td style={{ maxWidth: '320px' }}>
                                <p style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>{rev.comment}</p>
                              </td>
                              <td>
                                <span className={`status-badge status-${rev.status.toLowerCase()}`}>
                                  {rev.status}
                                </span>
                              </td>
                              <td>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                  {rev.status !== 'Published' && (
                                    <button
                                      type="button"
                                      className="admin-btn admin-btn-success"
                                      style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem' }}
                                      onClick={() => handleModerateReview(rev.id, 'Published')}
                                    >
                                      <Check size={12} /> Approve
                                    </button>
                                  )}
                                  {rev.status !== 'Rejected' && (
                                    <button
                                      type="button"
                                      className="admin-btn admin-btn-danger"
                                      style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem' }}
                                      onClick={() => handleModerateReview(rev.id, 'Rejected')}
                                    >
                                      <X size={12} /> Reject
                                    </button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: ADVERTISEMENTS */}
          {activeTab === 'advertisements' && (
            <div>
              <div className="admin-card">
                <div className="admin-card-header">
                  <div>
                    <h3 style={{ fontSize: '1.15rem', color: 'white' }}>Promotional Campaigns & Banners</h3>
                    <p style={{ fontSize: '0.825rem', color: '#94a3b8' }}>
                      Active banners rotating on the public homepage.
                    </p>
                  </div>
                </div>

                <div style={{ overflowX: 'auto' }}>
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Campaign Title</th>
                        <th>Advertiser</th>
                        <th>Badge</th>
                        <th>Valid Period</th>
                        <th>Priority</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.advertisements.map((ad) => (
                        <tr key={ad.id}>
                          <td>
                            <strong style={{ color: 'white' }}>{ad.title}</strong>
                            <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{ad.description}</div>
                          </td>
                          <td>{ad.advertiser}</td>
                          <td>
                            <span style={{ fontSize: '0.75rem', background: '#0e7490', color: '#67e8f9', padding: '0.15rem 0.5rem', borderRadius: 4 }}>
                              {ad.badge || 'Ad'}
                            </span>
                          </td>
                          <td>
                            {ad.startDate} to {ad.endDate}
                          </td>
                          <td>#{ad.priority}</td>
                          <td>
                            <span className={`status-badge status-${ad.status.toLowerCase()}`}>
                              {ad.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: PRIVACY POLICY EDITOR */}
          {activeTab === 'privacy' && (
            <div>
              <div className="admin-card">
                <div className="admin-card-header">
                  <div>
                    <h3 style={{ fontSize: '1.15rem', color: 'white' }}>Publish Privacy Policy Version</h3>
                    <p style={{ fontSize: '0.825rem', color: '#94a3b8' }}>
                      Editing sections here immediately updates the live public privacy page at /privacy.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleSavePolicy}
                    className="admin-btn admin-btn-primary"
                    id="btn-publish-privacy-policy"
                  >
                    <Save size={14} />
                    <span>Publish Policy Changes</span>
                  </button>
                </div>

                <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1.5rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '0.4rem', fontWeight: 600 }}>
                        Policy Version Number
                      </label>
                      <input
                        type="text"
                        value={editPolicyVersion}
                        onChange={(e) => setEditPolicyVersion(e.target.value)}
                        style={{
                          width: '100%',
                          background: '#1f2937',
                          border: '1px solid #374151',
                          color: 'white',
                          borderRadius: '8px',
                          padding: '0.65rem 1rem',
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <h4 style={{ color: 'white', fontSize: '1rem' }}>Policy Content Sections</h4>
                    {editPolicySections.map((sec, idx) => (
                      <div
                        key={sec.id}
                        style={{
                          background: 'rgba(31, 41, 55, 0.5)',
                          padding: '1.25rem',
                          borderRadius: '10px',
                          border: '1px solid #374151',
                        }}
                      >
                        <div style={{ marginBottom: '0.75rem' }}>
                          <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.25rem' }}>
                            Section Title
                          </label>
                          <input
                            type="text"
                            value={sec.title}
                            onChange={(e) => {
                              const updated = [...editPolicySections];
                              updated[idx].title = e.target.value;
                              setEditPolicySections(updated);
                            }}
                            style={{
                              width: '100%',
                              background: '#111827',
                              border: '1px solid #374151',
                              color: 'white',
                              borderRadius: '6px',
                              padding: '0.5rem 0.75rem',
                              fontWeight: 600,
                            }}
                          />
                        </div>

                        <div>
                          <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.25rem' }}>
                            Section Body Text
                          </label>
                          <textarea
                            rows={4}
                            value={sec.content}
                            onChange={(e) => {
                              const updated = [...editPolicySections];
                              updated[idx].content = e.target.value;
                              setEditPolicySections(updated);
                            }}
                            style={{
                              width: '100%',
                              background: '#111827',
                              border: '1px solid #374151',
                              color: '#cbd5e1',
                              borderRadius: '6px',
                              padding: '0.65rem',
                              lineHeight: 1.6,
                              fontSize: '0.9rem',
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
