import fs from 'fs/promises';
import path from 'path';

// Locate the shared db.json
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
    // Fallback if running directly from project root
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

export async function getInstitutes(): Promise<Institute[]> {
  const db = await readDB();
  return db.institutes;
}

export async function getPublishedInstitutes(): Promise<Institute[]> {
  const db = await readDB();
  return db.institutes.filter((inst) => inst.status === 'Published');
}

export async function getInstituteBySlug(slug: string): Promise<Institute | null> {
  const db = await readDB();
  return db.institutes.find((inst) => inst.slug === slug) || null;
}

export async function getInstituteCounts(): Promise<Record<string, number>> {
  const db = await readDB();
  const published = db.institutes.filter((inst) => inst.status === 'Published');
  const counts: Record<string, number> = {
    'Play Schools': 0,
    'Schools': 0,
    'Colleges': 0,
    'Coaching Institutes': 0,
    'Others': 0,
  };

  published.forEach((inst) => {
    if (inst.type === 'Play School') counts['Play Schools']++;
    else if (inst.type === 'School') counts['Schools']++;
    else if (inst.type === 'College') counts['Colleges']++;
    else if (inst.type === 'Coaching Institute') counts['Coaching Institutes']++;
    else counts['Others']++;
  });

  return counts;
}

export async function getTopRatedInstitutes(limit: number = 6): Promise<Institute[]> {
  const db = await readDB();
  return db.institutes
    .filter((inst) => inst.status === 'Published')
    .sort((a, b) => (b.ratingSummary.averageRating || 0) - (a.ratingSummary.averageRating || 0))
    .slice(0, limit);
}

export async function getReviews(instituteId: string): Promise<InstituteRating[]> {
  const db = await readDB();
  return db.ratings.filter(
    (rev) => rev.instituteId === instituteId && rev.status === 'Published'
  );
}

export async function addReview(
  instituteId: string,
  reviewData: { userName: string; userRole: string; score: number; comment: string }
): Promise<InstituteRating> {
  const db = await readDB();
  const newReview: InstituteRating = {
    id: `rev-${Date.now()}`,
    instituteId,
    userId: `guest-${Math.random().toString(36).substring(2, 9)}`,
    userName: reviewData.userName.trim(),
    userRole: reviewData.userRole || 'Visitor',
    score: Math.min(5, Math.max(1, reviewData.score)),
    comment: reviewData.comment.trim(),
    status: 'Published', // immediate publish or pending per moderation
    createdAt: new Date().toISOString(),
  };

  db.ratings.unshift(newReview);

  // Recalculate rating summary for institute
  const institute = db.institutes.find((inst) => inst.id === instituteId);
  if (institute) {
    const publishedReviews = db.ratings.filter(
      (r) => r.instituteId === instituteId && r.status === 'Published'
    );
    const sum = publishedReviews.reduce((acc, curr) => acc + curr.score, 0);
    const avg = publishedReviews.length > 0 ? Number((sum / publishedReviews.length).toFixed(1)) : 0;
    institute.ratingSummary = {
      averageRating: avg,
      totalReviews: publishedReviews.length,
    };
  }

  await writeDB(db);
  return newReview;
}

export async function createRegistrationEnquiry(data: {
  instituteName: string;
  instituteType: 'Play School' | 'School' | 'College' | 'Coaching Institute' | 'Others';
  city: string;
  contactPerson: string;
  mobile: string;
  email: string;
  studentStrength?: string;
  deploymentNeed?: string;
}): Promise<RegistrationEnquiry> {
  const db = await readDB();
  const refId = `ENQ-2026-${Math.floor(1000 + Math.random() * 9000)}`;
  const newEnquiry: RegistrationEnquiry = {
    id: refId,
    instituteName: data.instituteName.trim(),
    instituteType: data.instituteType,
    city: data.city.trim(),
    contactPerson: data.contactPerson.trim(),
    mobile: data.mobile.trim(),
    email: data.email.trim().toLowerCase(),
    studentStrength: data.studentStrength || '1,000 - 5,000 Students',
    deploymentNeed: data.deploymentNeed || 'Dedicated Sovereign Cloud',
    status: 'New',
    createdAt: new Date().toISOString(),
  };

  db.enquiries.unshift(newEnquiry);
  await writeDB(db);
  return newEnquiry;
}

export async function createContactRequest(data: {
  name: string;
  email: string;
  phone?: string;
  queryType: 'General' | 'Registration' | 'Subscription' | 'Technical';
  message: string;
}): Promise<ContactRequest> {
  const db = await readDB();
  const refId = `REQ-2026-${Math.floor(1000 + Math.random() * 9000)}`;

  let defaultRouting = 'General Enquiries Queue';
  if (data.queryType === 'Registration') defaultRouting = 'Institute Onboarding Team';
  else if (data.queryType === 'Subscription') defaultRouting = 'Billing Support';
  else if (data.queryType === 'Technical') defaultRouting = 'Technical Architecture Team';

  const newRequest: ContactRequest = {
    id: refId,
    name: data.name.trim(),
    email: data.email.trim().toLowerCase(),
    phone: data.phone?.trim() || undefined,
    queryType: data.queryType,
    message: data.message.trim(),
    status: 'New',
    assignedTo: defaultRouting,
    createdAt: new Date().toISOString(),
  };

  db.contacts.unshift(newRequest);
  await writeDB(db);
  return newRequest;
}

export async function getActiveAdvertisements(): Promise<Advertisement[]> {
  const db = await readDB();
  const today = new Date().toISOString().split('T')[0];
  return db.advertisements
    .filter(
      (ad) =>
        ad.status === 'Active' &&
        (!ad.startDate || ad.startDate <= today) &&
        (!ad.endDate || ad.endDate >= today)
    )
    .sort((a, b) => a.priority - b.priority);
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const db = await readDB();
  return db.testimonials.filter((t) => t.publicationStatus === 'Published');
}

export async function getPrivacyPolicy(): Promise<PrivacyPolicy> {
  const db = await readDB();
  return db.privacyPolicy;
}

export async function subscribeNewsletter(email: string): Promise<{ success: boolean; message: string }> {
  const db = await readDB();
  const normalized = email.trim().toLowerCase();
  const exists = db.newsletters.some((n) => n.email === normalized);
  if (exists) {
    return { success: true, message: 'You are already subscribed to the iCampusPro newsletter!' };
  }
  db.newsletters.push({
    id: `nl-${Date.now()}`,
    email: normalized,
    subscribedAt: new Date().toISOString(),
  });
  await writeDB(db);
  return { success: true, message: 'Successfully subscribed to platform updates and educational insights.' };
}

// Admin Operations
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

  // Recalculate institute rating
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
