import { useState } from 'react';
import { PORTFOLIO_PROJECTS } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';
import { PortfolioProject, ProjectCategory } from '../types';
import ProjectModal from './ProjectModal';
import { 
  FolderKanban, 
  MapPin, 
  Compass, 
  Layers, 
  ArrowUpLeft,
  ArrowUpRight
} from 'lucide-react';

export default function PortfolioGallery() {
  const { isAr, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');
  const [activeProjectModal, setActiveProjectModal] = useState<PortfolioProject | null>(null);

  const categories: { id: ProjectCategory; label: string }[] = isAr ? [
    { id: 'all', label: 'كافة المشاريع' },
    { id: 'residential', label: 'فلل وقصور سكنية' },
    { id: 'commercial', label: 'مجمعات تجارية وإدارية' },
    { id: 'interior', label: 'تصميم داخلي ومجالس' },
    { id: 'hospitality', label: 'شاليهات واستراحات' },
  ] : [
    { id: 'all', label: 'All Projects' },
    { id: 'residential', label: 'Residential Villas & Mansions' },
    { id: 'commercial', label: 'Commercial & Office Hubs' },
    { id: 'interior', label: 'Interior Fit-Out & Majlis' },
    { id: 'hospitality', label: 'Chalets & Private Resorts' },
  ];

  const englishProjects: PortfolioProject[] = [
    {
      id: 'villa-alrass-salmani',
      title: 'Al-Haramain Modern Villa',
      titleEn: 'Modern Salmani Villa - Al-Rass',
      category: 'residential',
      categoryLabel: 'Salmani Luxury Villa',
      location: 'Al-Rass, Al-Qassim',
      city: 'Al-Rass',
      area: 680,
      year: '2024',
      architecturalStyle: 'Modern Salmani Architecture',
      clientType: 'Private Owner',
      mainImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      floorPlanImage: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=80',
      galleryImages: [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      ],
      description: 'A luxurious private residence combining Najdi authenticity with contemporary minimalism, optimizing privacy and energy efficiency according to Saudi Building Code.',
      highlightFeatures: [
        'Central private courtyard providing natural ventilation & family seclusion',
        'Natural local stone cladding paired with dark brass accents',
        'High-performance insulated double-glazing reducing AC load by 35%',
        'Integrated subterranean parking and private guest Majlis suite'
      ],
      deliverables: ['Full Architectural SBC Drawings', '3D Facade & Interior Renders', 'Balady Official Building Permit', 'BOQ Schedule'],
    },
    {
      id: 'commercial-center-qassim',
      title: 'Falaq Plaza Commercial Center',
      titleEn: 'Falaq Strip Mall - Al-Qassim',
      category: 'commercial',
      categoryLabel: 'Commercial Strip Mall',
      location: 'King Fahd Road, Al-Rass',
      city: 'Al-Rass',
      area: 2400,
      year: '2024',
      architecturalStyle: 'Contemporary Commercial',
      clientType: 'Real Estate Investment Group',
      mainImage: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80',
      floorPlanImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80',
      galleryImages: [
        'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      ],
      description: 'An iconic two-story retail complex featuring double-height storefronts, drive-thru lanes, and spacious underground customer parking.',
      highlightFeatures: [
        'Expansive 8-meter clear glazed storefronts maximizing tenant visibility',
        'Smart traffic circulation and municipal civil defense compliant exits',
        'BIM structural steel roof optimization saving 18% fabrication cost'
      ],
      deliverables: ['Commercial SBC Permit', 'Structural BIM Engineering', 'Civil Defense Safety Approval', 'Facade Lighting Lux Study'],
    },
    {
      id: 'luxury-interior-majlis',
      title: 'Royal Najdi Modern Majlis',
      titleEn: 'Luxury Interior Majlis - Buraidah',
      category: 'interior',
      categoryLabel: 'Interior Architecture & Majlis',
      location: 'Al-Qassim',
      city: 'Buraidah',
      area: 320,
      year: '2023',
      architecturalStyle: 'Neo-Classical Luxury',
      clientType: 'Private Residence',
      mainImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
      galleryImages: [
        'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
      ],
      description: 'Interior architecture for a formal VIP reception Majlis, blending warm fluted wood paneling, indirect LED lighting, and Italian travertine marble.',
      highlightFeatures: [
        'Acoustic wall panelling engineered for crystal-clear conversation acoustics',
        'Custom coffered ceiling geometry with architectural brass trim',
        'Smart scene lighting automation (Welcome, Dining, Evening)'
      ],
      deliverables: ['3D Photorealistic Interior Blueprints', 'Material Board & Shop Drawings', 'Custom Joinery Schedules'],
    },
    {
      id: 'modern-resort-chalet',
      title: 'The Palm Oasis Luxury Chalet',
      titleEn: 'Private Resort & Chalet - Al-Rass',
      category: 'hospitality',
      categoryLabel: 'Resort & Chalet',
      location: 'Al-Shnanah, Al-Rass',
      city: 'Al-Rass',
      area: 950,
      year: '2024',
      architecturalStyle: 'Minimalist Tropical',
      clientType: 'Private Investor',
      mainImage: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
      floorPlanImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80',
      galleryImages: [
        'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      ],
      description: 'A tranquil weekend retreat featuring an infinity pool, sunken outdoor fireplace seating, and panoramic glass walls overlooking lush palm gardens.',
      highlightFeatures: [
        'Seamless indoor-outdoor entertaining flow with motorized sliding partitions',
        'Zero-edge swimming pool with integrated heating & filtration systems',
        'Drought-tolerant native landscaping with automated drip irrigation'
      ],
      deliverables: ['Full Architectural & Structural Plans', 'Landscape & Pool MEP Blueprints', 'Municipal Permit'],
    },
    {
      id: 'minimalist-cube-villa',
      title: 'The Cube Contemporary Residence',
      titleEn: 'Cube Villa - Al-Rass',
      category: 'residential',
      categoryLabel: 'Minimalist Villa',
      location: 'Al-Qadsiah, Al-Rass',
      city: 'Al-Rass',
      area: 520,
      year: '2023',
      architecturalStyle: 'Modern Brutalist Minimalist',
      clientType: 'Private Owner',
      mainImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
      galleryImages: [
        'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
      ],
      description: 'A bold geometric composition utilizing fair-faced concrete, warm wood louvers, and expansive cantilevered upper terraces.',
      highlightFeatures: [
        'Cantilevered 4.5m upper volume creating sheltered ground floor shade',
        'Integrated solar panel roof arrays meeting net-zero residential standards',
        'Smart rain drainage hidden within architectural facade reveals'
      ],
      deliverables: ['SBC Structural Optimization', 'Architectural 3D Virtual Tour', 'Balady Permit Issuance'],
    },
    {
      id: 'medical-complex-qassim',
      title: 'Al-Shifa Healthcare Center',
      titleEn: 'Specialized Medical Clinic - Al-Rass',
      category: 'commercial',
      categoryLabel: 'Healthcare & Clinics',
      location: 'Al-Rass',
      city: 'Al-Rass',
      area: 1600,
      year: '2023',
      architecturalStyle: 'Modern Healthcare Architecture',
      clientType: 'Medical Group',
      mainImage: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
      galleryImages: [
        'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
      ],
      description: 'State-of-the-art outpatient polyclinic compliant with Ministry of Health (MOH) medical standards and Saudi Building Code requirements.',
      highlightFeatures: [
        'Specialized medical gas pipelines, sterile HVAC air filtration, and isolation zones',
        'Full universal accessibility (ADA ramps, specialized elevators, and tactile paths)',
        'Civil defense emergency evacuation routes and fire suppression systems'
      ],
      deliverables: ['MOH Medical Accreditation Drawings', 'Specialized Medical MEP Plans', 'Occupancy Certificate'],
    },
  ];

  const projects = isAr ? PORTFOLIO_PROJECTS : englishProjects;

  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  return (
    <section id="portfolio" className={`py-20 bg-[#F5F4F0] relative overflow-hidden border-b border-[#E0E1DC] ${isAr ? 'text-right' : 'text-left'}`}>
      
      {/* Background grid */}
      <div className="absolute inset-0 bg-editorial-grid opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-[#0E1910] text-[#F5F4F0] text-xs font-thmanyah-sans font-th-medium">
            <FolderKanban className="w-3.5 h-3.5 text-[#F4E95B]" />
            <span>{t('portfolioBadge')}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-4xl font-th-heavy text-[#000000] font-thmanyah-display">
            {t('portfolioTitle')}
          </h2>

          <p className="text-base sm:text-lg text-[#343A2F] leading-relaxed font-thmanyah-text">
            {t('portfolioIntro')}
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-3 font-thmanyah-sans">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-sm text-xs sm:text-sm transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#0E1910] text-[#F5F4F0] font-th-bold shadow-xs'
                    : 'bg-white text-[#343A2F] hover:text-[#000000] border border-[#E0E1DC]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Masonry/Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setActiveProjectModal(project)}
              className={`group relative rounded-sm overflow-hidden bg-white border border-[#E0E1DC] hover:border-[#343A2F] shadow-xs transition-all duration-300 cursor-pointer flex flex-col justify-between ${isAr ? 'text-right' : 'text-left'}`}
            >
              {/* Image Container */}
              <div className="relative h-60 sm:h-64 w-full overflow-hidden bg-[#E0E1DC]">
                <img
                  src={project.mainImage}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Top Badges */}
                <div className="absolute top-3 right-3 left-3 flex items-center justify-between pointer-events-none">
                  <span className="text-[11px] px-2.5 py-0.5 rounded-sm bg-[#0E1910]/90 text-[#F5F4F0] font-thmanyah-sans font-th-medium">
                    {project.categoryLabel}
                  </span>
                  <div className="w-7 h-7 rounded-sm bg-[#0E1910]/80 flex items-center justify-center text-[#F4E95B] opacity-0 group-hover:opacity-100 transition-opacity">
                    {isAr ? <ArrowUpLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                  </div>
                </div>

                {/* Floor Plan Indicator */}
                {project.floorPlanImage && (
                  <div className={`absolute bottom-3 ${isAr ? 'right-3' : 'left-3'} bg-[#0E1910]/90 px-2 py-0.5 rounded-sm text-[10px] text-[#F5F4F0] font-thmanyah-sans flex items-center gap-1`}>
                    <Layers className="w-3 h-3 text-[#F4E95B]" />
                    <span>{isAr ? 'مخطط 2D متاح' : '2D Plan Available'}</span>
                  </div>
                )}
              </div>

              {/* Card Content Text */}
              <div className="p-5 space-y-2.5">
                <div className="flex items-center justify-between text-xs text-[#343A2F] font-thmanyah-sans">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#0E1910]" />
                    <span>{project.location}</span>
                  </div>
                  <span className="font-th-bold text-[#000000]">{project.area} {t('meterSq')}</span>
                </div>

                <h3 className="text-lg font-th-bold text-[#000000] font-thmanyah-display group-hover:text-[#0E1910] transition-colors">
                  {project.title}
                </h3>

                <p className="text-xs text-[#343A2F] line-clamp-2 leading-relaxed font-thmanyah-text">
                  {project.description}
                </p>

                {/* Style & Specs Footer */}
                <div className="pt-3 border-t border-[#E0E1DC] flex items-center justify-between text-[11px] font-thmanyah-sans">
                  <div className="flex items-center gap-1 text-[#343A2F]">
                    <Compass className="w-3 h-3 text-[#0E1910]" />
                    <span>{project.architecturalStyle}</span>
                  </div>

                  <span className="text-[#0E1910] font-th-bold group-hover:underline flex items-center gap-1">
                    <span>{t('portfolioViewDetails')}</span>
                    <span>{isAr ? '←' : '→'}</span>
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Project Detail Modal Overlay */}
      <ProjectModal
        project={activeProjectModal}
        onClose={() => setActiveProjectModal(null)}
      />
    </section>
  );
}
