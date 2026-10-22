# iCampusPro &bull; Unified Educational Platform

Enterprise campus and education management platform serving Schools, Colleges, Coaching Institutes, Play Schools, and Specialized Academic Organizations.

Built according to the **iCampusPro Functional Requirements Specification (FRS Version 1.0)** and modern UI/UX design specifications.

---

## 🏗️ Architecture & Directory Structure

The project is structured into two decoupled, full-featured Next.js applications sharing an authoritative data layer:

```
d:/iCampusPro/
├── data/
│   └── db.json                    # Shared authoritative database (Institutes, Enquiries, Contacts, Reviews, Ads, Policies)
│
├── public-website/                # Next.js Public Website (Port 3000)
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx           # FRS-01: Comprehensive Homepage (All 10 required sections)
│   │   │   ├── institutes/
│   │   │   │   ├── page.tsx       # Institute Directory (Search, Category Tabs, City Filter, Sort)
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx   # FRS-04: Institute Public Profile (Cover, About, Ratings, Reviews, Facilities)
│   │   │   ├── privacy/
│   │   │   │   └── page.tsx       # FRS-02: Privacy Policy (Sticky TOC, Version Badge, Legal Content)
│   │   │   ├── contact/
│   │   │   │   └── page.tsx       # FRS-03: Contact Us (Validated form, Query Routing, Headquarter details)
│   │   │   ├── api/public/...     # Public REST APIs conforming to FRS Section 8
│   │   │   ├── layout.tsx         # Root layout with Header, Footer & Floating Chatbot
│   │   │   └── globals.css        # Vanilla CSS Design System (Inter/Outfit, Tokens, Glassmorphism)
│   │   ├── components/
│   │   │   ├── Header.tsx         # Consistent responsive navigation with Admin Portal quick link
│   │   │   ├── Footer.tsx         # Governance links, newsletter subscription with live validation
│   │   │   ├── RegistrationModal.tsx # Phase 1 Institute Registration Enquiry form with Reference ID
│   │   │   └── FloatingChatbot.tsx   # Interactive AI Assistant with quick actions & help desk routing
│   │   └── lib/
│   │       └── db.ts              # Typed Data Access Layer
│   └── package.json
│
├── admin/                         # Next.js Administration Console (Port 3001)
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx           # Multi-tab Executive Console (Enquiries, Contacts, Moderation, Ads, Policy)
│   │   │   ├── api/admin/...      # Administrative CRUD and Moderation APIs
│   │   │   ├── layout.tsx         # Dark-themed Admin Shell with Sidebar & Status indicators
│   │   │   └── globals.css        # Slate & Indigo Executive Theme
│   │   └── lib/
│   │       └── db.ts              # Admin Data Access Layer
│   └── package.json
│
└── package.json                   # Root monorepo coordination scripts
```

---

## 🚀 Running the Platform

### 1. Run Public Website (Port 3000)
```bash
cd d:\iCampusPro\public-website
npm run dev
# Accessible at http://localhost:3000
```

### 2. Run Admin Portal (Port 3001)
```bash
cd d:\iCampusPro\admin
npm run dev
# Accessible at http://localhost:3001
```

### 3. Run Both from Root
```bash
npm run dev:public   # Starts public website on http://localhost:3000
npm run dev:admin    # Starts administration portal on http://localhost:3001
npm run build:all    # Compiles and validates both apps for production
```

---

## 📋 FRS Requirement Compliance Matrix

| FRS Module | Requirement Description | Implementation Status |
| :--- | :--- | :--- |
| **FRS-01: Home Page** | Header, Hero, Category Statistics Strip, Platform Features, Top-Rated Institutes, Advertisements Carousel, Testimonials, Footer, Floating Chatbot | ✅ **Implemented & Verified** |
| **FR-HOME-003** | Phase 1 Institute Registration Enquiry Modal with validation & Reference ID (`ENQ-2026-XXXX`) | ✅ **Implemented & Verified** |
| **FR-HOME-010** | Floating Chatbot Launcher, context-aware AI answers, quick actions & fallback to support | ✅ **Implemented & Verified** |
| **FRS-02: Privacy Policy** | Left-hand sticky Table of Contents, version badge, data usage, user rights, billing security, dispute contacts | ✅ **Implemented & Verified** |
| **FRS-03: Contact Us** | Form validation (Name, Email, Phone, Query Type, Message), automatic queue routing, Reference ID (`REQ-2026-XXXX`), office card | ✅ **Implemented & Verified** |
| **FRS-04: Institute Profile** | Cover banner, logo fallback, About details, live star rating calculation, interactive Review Modal, achievements, quick facts & facilities checklist | ✅ **Implemented & Verified** |
| **FR-HOME-011** | Institute Discovery Listing Page (`/institutes`) with category filtering, search, city filter, and sorting | ✅ **Implemented & Verified** |
| **Admin Enquiries** | App Admin reviewing, filtering by status (New, Under Review, Contacted, Qualified, Converted, Rejected, Closed), adding notes | ✅ **Implemented & Verified** |
| **Admin Support Queue** | Support team processing tickets categorized by General, Registration, Subscription, and Technical queues | ✅ **Implemented & Verified** |
| **Review Moderation** | Content Admin 1-click Approve / Reject / Hide reviews with automatic institute rating recalculation | ✅ **Implemented & Verified** |
| **Privacy Policy Editor** | Admin publishing updated policy text and version numbers with live synchronization to `/privacy` | ✅ **Implemented & Verified** |

---

## 🎨 Visual Aesthetics & Design System
- **Typography**: Google Fonts *Outfit* (headings) & *Plus Jakarta Sans* (body).
- **Color Palette**: Deep Royal Blue (`#2563EB`), Electric Cyan (`#06B6D4`), Slate Navy (`#0F172A`), Emerald Success (`#10B981`), Warm Amber (`#F59E0B`).
- **Cards & Micro-Interactions**: Multi-layered elevation shadows, glassmorphic backdrops, smooth hover transitions, and responsive mobile drawers.
