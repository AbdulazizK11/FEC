export interface Expert {
  id: string;
  name: string;
  title: string;
  academicDegree: string;
  specialization: string;
  sceNumber?: string; // Saudi Council of Engineers membership
  bio: string;
  experienceYears: number;
  image: string;
  linkedinUrl?: string;
  publicationsOrAchievements?: string[];
}

export type ProjectCategory = 'all' | 'residential' | 'commercial' | 'interior' | 'hospitality';

export interface PortfolioProject {
  id: string;
  projectNumber?: number; // e.g. 1, 2, 3 ... 10
  title: string;
  titleEn?: string;
  category: 'residential' | 'commercial' | 'interior' | 'hospitality';
  categoryLabel: string;
  location: string;
  city: string;
  area: number; // m²
  year: string;
  architecturalStyle: string; // e.g. "مودرن معاصر", "طراز سلماني حديث", "نيوكلاسيك فاخر"
  description: string;
  mainImage: string;
  images: string[];
  galleryImages: string[];
  highlightFeatures: string[];
  deliverables: string[];
  clientType: string;
  deedNumber?: string;
  plotInfo?: string;
  gregorianDate?: string;
  hijriDate?: string;
  areaBreakdown?: { label: string; area: string; ratio?: string }[];
  fenceLength?: string;
  needsImageUpload?: boolean;
}

export interface ServicePackage {
  id: 'economic' | 'premium' | 'comprehensive';
  name: string;
  nameEn: string;
  tagline: string;
  badge?: string;
  isPopular?: boolean;
  basePricePerMeter: number; // SAR / m² approx
  minPrice?: number;
  deliveryWeeks: string;
  targetAudience: string;
  features: {
    title: string;
    description: string;
    included: boolean;
  }[];
  whatsAppMessage: string;
}

export interface ConsultationFormData {
  fullName: string;
  phone: string;
  email?: string;
  city: string;
  projectType: 'villa' | 'commercial' | 'interior' | 'chalet' | 'supervision' | 'other';
  selectedPackage: 'economic' | 'premium' | 'comprehensive' | 'custom';
  landArea: number;
  builtUpArea?: number;
  notes?: string;
}
