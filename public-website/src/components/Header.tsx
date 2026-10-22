'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  GraduationCap,
  School,
  BookOpen,
  Menu,
  X,
  ArrowRight,
  ShieldCheck,
  LogIn,
  ChevronDown,
} from 'lucide-react';
import RegistrationModal from './RegistrationModal';

const ADMIN_URL = process.env.NEXT_PUBLIC_ADMIN_URL || 'https://icampusproadmin.vercel.app';

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(true);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const dropdownRef = useRef<HTMLLIElement>(null);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setSolutionsOpen(false);
  }, [pathname]);

  // Handle scroll effect for shadow and blur
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle click outside to close desktop solutions dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setSolutionsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setSolutionsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const solutions = [
    {
      title: 'For Schools',
      description: 'K-12 & Senior Secondary Campuses',
      href: '/solutions/schools',
      icon: School,
    },
    {
      title: 'For Colleges',
      description: 'Universities & Higher Education',
      href: '/solutions/colleges',
      icon: GraduationCap,
    },
    {
      title: 'For Coaching',
      description: 'Competitive Prep & Coaching Centers',
      href: '/solutions/coaching',
      icon: BookOpen,
    },
  ];

  const isSolutionsActive = pathname?.startsWith('/solutions');

  return (
    <>
      <header className={`site-header ${isScrolled ? 'scrolled' : ''}`} id="site-header">
        <div className="container">
          <div className="header-inner">
            {/* BRAND LOGO */}
            <Link href="/" className="brand-logo" id="header-brand-logo">
              <div className="logo-mark">
                <GraduationCap size={22} strokeWidth={2.5} />
              </div>
              <span>
                iCampus<span style={{ color: 'var(--primary)' }}>Pro</span>
              </span>
              <span className="pro-badge">Enterprise</span>
            </Link>

            {/* DESKTOP NAVIGATION */}
            <nav aria-label="Main Navigation">
              <ul className="nav-links">
                <li className="nav-item">
                  <Link
                    href="/"
                    className={pathname === '/' ? 'active' : ''}
                    id="nav-link-home"
                  >
                    Home
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    href="/institutes"
                    className={pathname === '/institutes' ? 'active' : ''}
                    id="nav-link-institutes"
                  >
                    Institutes
                  </Link>
                </li>

                {/* SOLUTIONS DROPDOWN */}
                <li className="nav-item" ref={dropdownRef}>
                  <button
                    type="button"
                    className={`nav-dropdown-trigger ${isSolutionsActive ? 'active' : ''}`}
                    onClick={() => setSolutionsOpen(!solutionsOpen)}
                    aria-expanded={solutionsOpen}
                    id="nav-dropdown-solutions"
                  >
                    <span>Solutions</span>
                    <ChevronDown
                      size={15}
                      className={`dropdown-chevron ${solutionsOpen ? 'open' : ''}`}
                    />
                  </button>

                  {solutionsOpen && (
                    <div className="nav-dropdown-menu" role="menu">
                      {solutions.map((item) => {
                        const Icon = item.icon;
                        const active = pathname === item.href;
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            role="menuitem"
                            className={`dropdown-item ${active ? 'active' : ''}`}
                            id={`nav-link-${item.title.toLowerCase().replace(/\s+/g, '-')}`}
                            onClick={() => setSolutionsOpen(false)}
                          >
                            <div className="dropdown-item-icon">
                              <Icon size={18} />
                            </div>
                            <div className="dropdown-item-content">
                              <span className="dropdown-item-title">{item.title}</span>
                              <span className="dropdown-item-desc">{item.description}</span>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </li>

                <li className="nav-item">
                  <Link
                    href="/how-it-works"
                    className={pathname === '/how-it-works' ? 'active' : ''}
                    id="nav-link-how-it-works"
                  >
                    How It Works
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    href="/blog"
                    className={pathname === '/blog' ? 'active' : ''}
                    id="nav-link-blog"
                  >
                    Blog
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    href="/contact"
                    className={pathname === '/contact' ? 'active' : ''}
                    id="nav-link-contact"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>

            {/* HEADER ACTIONS */}
            <div className="header-actions">
              <Link
                href="/login"
                className={`btn btn-ghost ${pathname === '/login' ? 'active' : ''}`}
                id="btn-header-login"
                title="Platform Sign In"
              >
                <LogIn size={16} />
                <span>Login</span>
              </Link>

              <a
                href={ADMIN_URL}
                target="_blank"
                rel="noreferrer"
                className="btn btn-secondary header-btn-admin"
                id="header-admin-portal-link"
                title="Open Administrative Dashboard"
              >
                <ShieldCheck size={16} color="var(--primary)" />
                <span>Admin</span>
              </a>

              <button
                type="button"
                className="btn btn-primary header-btn-cta"
                id="btn-header-register-institute"
                onClick={() => setIsRegisterModalOpen(true)}
              >
                <span>Register Institute</span>
                <ArrowRight size={16} />
              </button>

              <button
                type="button"
                className="mobile-menu-btn"
                aria-label="Toggle navigation menu"
                aria-expanded={mobileMenuOpen}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                id="mobile-menu-toggle"
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE NAVIGATION DRAWER & BACKDROP */}
        {mobileMenuOpen && (
          <>
            <div
              className="mobile-nav-backdrop"
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden="true"
            />
            <div className="mobile-nav-drawer" id="mobile-nav-drawer">
              <div className="mobile-links-section">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`mobile-nav-link ${pathname === '/' ? 'active' : ''}`}
                >
                  Home
                </Link>

                <Link
                  href="/institutes"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`mobile-nav-link ${pathname === '/institutes' ? 'active' : ''}`}
                >
                  Institutes
                </Link>

                {/* Mobile Solutions Collapsible */}
                <div className="mobile-solutions-group">
                  <button
                    type="button"
                    className="mobile-solutions-toggle"
                    onClick={() => setMobileSolutionsOpen(!mobileSolutionsOpen)}
                  >
                    <span>Solutions</span>
                    <ChevronDown
                      size={16}
                      className={`dropdown-chevron ${mobileSolutionsOpen ? 'open' : ''}`}
                    />
                  </button>

                  {mobileSolutionsOpen && (
                    <div className="mobile-solutions-sublist">
                      {solutions.map((item) => {
                        const Icon = item.icon;
                        const active = pathname === item.href;
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`mobile-sub-link ${active ? 'active' : ''}`}
                          >
                            <div className="mobile-sub-icon">
                              <Icon size={16} />
                            </div>
                            <div>
                              <div className="mobile-sub-title">{item.title}</div>
                              <div className="mobile-sub-desc">{item.description}</div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>

                <Link
                  href="/how-it-works"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`mobile-nav-link ${pathname === '/how-it-works' ? 'active' : ''}`}
                >
                  How It Works
                </Link>

                <Link
                  href="/blog"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`mobile-nav-link ${pathname === '/blog' ? 'active' : ''}`}
                >
                  Blog
                </Link>

                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`mobile-nav-link ${pathname === '/contact' ? 'active' : ''}`}
                >
                  Contact
                </Link>
              </div>

              {/* Action Buttons in Drawer */}
              <div className="mobile-actions-section">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn btn-secondary mobile-btn"
                >
                  <LogIn size={16} />
                  <span>Login to Portal</span>
                </Link>

                <a
                  href={ADMIN_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-secondary mobile-btn"
                >
                  <ShieldCheck size={16} color="var(--primary)" />
                  <span>Admin Console</span>
                </a>

                <button
                  type="button"
                  className="btn btn-primary mobile-btn"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsRegisterModalOpen(true);
                  }}
                >
                  <span>Register Institute</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </>
        )}
      </header>

      {/* Phase 1 Registration Enquiry Modal */}
      <RegistrationModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
      />
    </>
  );
}
