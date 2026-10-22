import fs from 'fs/promises';
import path from 'path';

// Locate shared db.json
const DB_PATH = path.resolve(process.cwd(), '../data/db.json');

export interface FacilityMap {
  hostel: boolean;
  transport: boolean;
  smartClassrooms: boolean;
  sportsComplex: boolean;
  scienceLabs: boolean;
  library: boolean;
  cafeteria: boolean;
  wifi: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  issuingOrg: string;
  year: number;
  description: string;
  certificateUrl?: string;
}

export interface RatingSummary {
  averageRating: number;
  totalReviews: number;
}

export interface Institute {
  id: string;
  slug: string;
  name: string;
  type: 'Play School' | 'School' | 'College' | 'Coaching Institute' | 'Others';
  status: 'Published' | 'Draft' | 'Suspended';
  city: string;
  state: string;
  address: string;
  description: string;
  contactNumber: string;
  email: string;
  website: string;
  affiliation: string;
  establishedYear: number;
  logo: string;
  coverImage: string;
  facilities: FacilityMap;
  achievements: Achievement[];
  ratingSummary: RatingSummary;
}

export interface InstituteRating {
  id: string;
  instituteId: string;
  userId: string;
  userName: string;
  userRole: string;
  score: number;
  comment: string;
  status: 'Published' | 'Pending' | 'Rejected' | 'Hidden';
  createdAt: string;
}

export interface RegistrationEnquiry {
  id: string;
  instituteName: string;
  instituteType: 'Play School' | 'School' | 'College' | 'Coaching Institute' | 'Others';
  city: string;
  contactPerson: string;
  mobile: string;
  email: string;
  status: 'New' | 'Under Review' | 'Contacted' | 'Qualified' | 'Converted' | 'Rejected' | 'Closed';
  studentStrength?: string;
  deploymentNeed?: string;
  createdAt: string;
  adminNotes?: string;
}

export interface ContactRequest {
  id: string;
  name: string;
  email: string;
  phone?: string;
  queryType: 'General' | 'Registration' | 'Subscription' | 'Technical';
  message: string;
  status: 'New' | 'Assigned' | 'In Progress' | 'Awaiting User' | 'Resolved' | 'Closed' | 'Spam';
  assignedTo?: string;
  createdAt: string;
  adminNotes?: string;
}

export interface Advertisement {
  id: string;
  title: string;
  advertiser: string;
  instituteId?: string;
  badge?: string;
  image: string;
  description: string;
  ctaText: string;
  destinationUrl: string;
  startDate: string;
  endDate: string;
  status: 'Active' | 'Expired' | 'Pending';
  priority: number;
}

export interface Testimonial {
  id: string;
  displayName: string;
  role: string;
  instituteName: string;
  avatar: string;
  text: string;
  rating: number;
  publicationStatus: 'Published' | 'Draft';
}

export interface PolicySection {
  id: string;
  title: string;
  content: string;
}

export interface PrivacyPolicy {
  version: string;
  lastUpdated: string;
  sections: PolicySection[];
}

export interface DatabaseData {
  institutes: Institute[];
  ratings: InstituteRating[];
  enquiries: RegistrationEnquiry[];
  contacts: ContactRequest[];
  advertisements: Advertisement[];
  testimonials: Testimonial[];
  privacyPolicy: PrivacyPolicy;
  newsletters: { id: string; email: string; subscribedAt: string }[];
}

async function readDB(): Promise<DatabaseData> {
  try {
    const raw = await fs.readFile(DB_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    const fallbackPath = path.resolve(process.cwd(), 'data/db.json');
    const raw = await fs.readFile(fallbackPath, 'utf-8');
    return JSON.parse(raw);
  }
}

async function writeDB(data: DatabaseData): Promise<void> {
  try {
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    const fallbackPath = path.resolve(process.cwd(), 'data/db.json');
    await fs.writeFile(fallbackPath, JSON.stringify(data, null, 2), 'utf-8');
  }
}

export async function getAllData(): Promise<DatabaseData> {
  return await readDB();
}

export async function updateEnquiryStatus(
  id: string,
  status: RegistrationEnquiry['status'],
  notes?: string
): Promise<RegistrationEnquiry | null> {
  const db = await readDB();
  const item = db.enquiries.find((e) => e.id === id);
  if (!item) return null;
  item.status = status;
  if (notes !== undefined) item.adminNotes = notes;
  await writeDB(db);
  return item;
}

export async function updateContactStatus(
  id: string,
  status: ContactRequest['status'],
  assignedTo?: string,
  notes?: string
): Promise<ContactRequest | null> {
  const db = await readDB();
  const item = db.contacts.find((c) => c.id === id);
  if (!item) return null;
  item.status = status;
  if (assignedTo !== undefined) item.assignedTo = assignedTo;
  if (notes !== undefined) item.adminNotes = notes;
  await writeDB(db);
  return item;
}

export async function updateReviewStatus(
  id: string,
  status: InstituteRating['status']
): Promise<InstituteRating | null> {
  const db = await readDB();
  const item = db.ratings.find((r) => r.id === id);
  if (!item) return null;
  item.status = status;

  const institute = db.institutes.find((inst) => inst.id === item.instituteId);
  if (institute) {
    const published = db.ratings.filter(
      (r) => r.instituteId === item.instituteId && r.status === 'Published'
    );
    const sum = published.reduce((acc, curr) => acc + curr.score, 0);
    const avg = published.length > 0 ? Number((sum / published.length).toFixed(1)) : 0;
    institute.ratingSummary = {
      averageRating: avg,
      totalReviews: published.length,
    };
  }

  await writeDB(db);
  return item;
}

export async function updateInstituteStatus(
  id: string,
  status: Institute['status']
): Promise<Institute | null> {
  const db = await readDB();
  const inst = db.institutes.find((i) => i.id === id);
  if (!inst) return null;
  inst.status = status;
  await writeDB(db);
  return inst;
}

export async function saveInstitute(instituteData: Partial<Institute>): Promise<Institute> {
  const db = await readDB();
  const index = db.institutes.findIndex((i) => i.id === instituteData.id);
  if (index >= 0) {
    db.institutes[index] = { ...db.institutes[index], ...instituteData } as Institute;
    await writeDB(db);
    return db.institutes[index];
  } else {
    const newInst: Institute = {
      id: `inst-${Date.now()}`,
      slug: (instituteData.name || 'new-institute').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      name: instituteData.name || 'New Institute',
      type: instituteData.type || 'School',
      status: instituteData.status || 'Published',
      city: instituteData.city || 'New Delhi',
      state: instituteData.state || 'Delhi',
      address: instituteData.address || '',
      description: instituteData.description || '',
      contactNumber: instituteData.contactNumber || '',
      email: instituteData.email || '',
      website: instituteData.website || '',
      affiliation: instituteData.affiliation || 'CBSE',
      establishedYear: instituteData.establishedYear || 2000,
      logo: instituteData.logo || '/images/institutes/default-logo.png',
      coverImage: instituteData.coverImage || '/images/institutes/default-cover.jpg',
      facilities: instituteData.facilities || {
        hostel: false,
        transport: true,
        smartClassrooms: true,
        sportsComplex: false,
        scienceLabs: true,
        library: true,
        cafeteria: true,
        wifi: true,
      },
      achievements: instituteData.achievements || [],
      ratingSummary: { averageRating: 0, totalReviews: 0 },
    };
    db.institutes.push(newInst);
    await writeDB(db);
    return newInst;
  }
}

export async function savePrivacyPolicy(policy: PrivacyPolicy): Promise<PrivacyPolicy> {
  const db = await readDB();
  db.privacyPolicy = policy;
  await writeDB(db);
  return db.privacyPolicy;
}

export async function saveAdvertisement(ad: Advertisement): Promise<Advertisement> {
  const db = await readDB();
  const idx = db.advertisements.findIndex((a) => a.id === ad.id);
  if (idx >= 0) {
    db.advertisements[idx] = ad;
  } else {
    db.advertisements.push(ad);
  }
  await writeDB(db);
  return ad;
}

export async function saveTestimonial(t: Testimonial): Promise<Testimonial> {
  const db = await readDB();
  const idx = db.testimonials.findIndex((item) => item.id === t.id);
  if (idx >= 0) {
    db.testimonials[idx] = t;
  } else {
    db.testimonials.push(t);
  }
  await writeDB(db);
  return t;
}
