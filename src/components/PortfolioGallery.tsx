import { useState, useEffect } from 'react';
import { PORTFOLIO_PROJECTS } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';
import { PortfolioProject, ProjectCategory } from '../types';
import ProjectModal from './ProjectModal';
import { ProjectCardGalleryItem } from './ProjectCardGalleryItem';
import { initPersistentProjectImagesSync } from '../utils/projectImages';
import { FolderKanban } from 'lucide-react';

export default function PortfolioGallery() {
  const { isAr, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');
  const [activeProjectModal, setActiveProjectModal] = useState<PortfolioProject | null>(null);
  const [activeInitialPhotoIndex, setActiveInitialPhotoIndex] = useState<number>(0);

  useEffect(() => {
    initPersistentProjectImagesSync();
  }, []);

  const handleOpenProjectModal = (project: PortfolioProject, initialIndex: number = 0) => {
    setActiveProjectModal(project);
    setActiveInitialPhotoIndex(initialIndex);
  };

  const categories: { id: ProjectCategory; label: string }[] = isAr ? [
    { id: 'all', label: 'كافة المشاريع (١٠)' },
    { id: 'residential', label: 'فلل وقصور سكنية' },
    { id: 'commercial', label: 'مشاريع تجارية وخدمية' },
    { id: 'interior', label: 'تصميم داخلي ومجالس' },
    { id: 'hospitality', label: 'شاليهات ولاندسكيب' },
  ] : [
    { id: 'all', label: 'All Projects (10)' },
    { id: 'residential', label: 'Villas & Palaces' },
    { id: 'commercial', label: 'Commercial & Services' },
    { id: 'interior', label: 'Interior Design' },
    { id: 'hospitality', label: 'Chalets & Landscapes' },
  ];

  const englishProjects: PortfolioProject[] = [
    {
      id: 'villa-modern-contemporary-rass-59',
      projectNumber: 1,
      title: 'Modern Contemporary Residential Villa',
      titleEn: 'Modern Contemporary Residential Villa - Plot 59',
      category: 'residential',
      categoryLabel: 'Residential Villa',
      location: 'Masterplan Q/R/337 | Plot 59',
      city: 'Al-Rass, Al-Qassim',
      area: 815.22,
      year: '2023',
      gregorianDate: '2023',
      hijriDate: '1444 AH',
      deedNumber: 'Deed: 263505002079',
      plotInfo: 'Plan Q/R/337 | Plot 59',
      fenceLength: '112.82 linear m',
      architecturalStyle: 'Modern Contemporary',
      clientType: 'Private Client',
      mainImage: "/images/projects/project1-1.jpg",
      images: [
        "/images/projects/project1-1.jpg",
        "/images/projects/project1-2.jpg",
        "/images/projects/project1-3.jpg"
      ],
      galleryImages: [
        "/images/projects/project1-1.jpg",
        "/images/projects/project1-2.jpg",
        "/images/projects/project1-3.jpg"
      ],
      description: 'A contemporary architectural villa combining crisp white concrete volumes with warm timber cladding, accentuated by extensive vertical glazing for natural daylight and a cantilevered first floor with hidden linear lighting.',
      highlightFeatures: [
        'Balanced harmony between natural wood panels and white insulated volumes',
        'Generous setbacks between 3.50m and 6.35m providing ample perimeter gardens and parking',
        'Precision architectural facade lighting accentuating floating overhangs',
        '112.82m boundary wall integrated seamlessly with main facade aesthetics',
      ],
      areaBreakdown: [
        { label: 'Ground Floor', area: '387.16 m²', ratio: '47.49%' },
        { label: 'Ground Annex', area: '42.30 m²', ratio: '5.18%' },
        { label: 'First Floor', area: '373.75 m²', ratio: '45.84%' },
        { label: 'Upper Annex', area: '68.56 m²', ratio: '18.34%' },
        { label: 'Fences Length', area: '112.82 linear m' },
      ],
      deliverables: ['Full Architectural & Structural Drawings', 'Approved Setbacks & Area Schedule', '3D Facade & Lighting Design', 'SBC Building Permit'],
    },
    {
      id: 'villa-modern-curtain-wall-rass-230',
      projectNumber: 2,
      title: 'Contemporary Villa with Glass Curtain Wall',
      titleEn: 'Contemporary Villa with Curtain Wall',
      category: 'residential',
      categoryLabel: 'Residential Villa',
      location: 'Masterplan Q/R/230 | Plot 2/47',
      city: 'Al-Rass, Al-Qassim',
      area: 800.00,
      year: '2022',
      gregorianDate: 'December 2022',
      hijriDate: '1444/05/21 AH',
      deedNumber: 'Deed: 963509001023',
      plotInfo: 'Plan Q/R/230 | Plot 2/47',
      fenceLength: '120.00 linear m',
      architecturalStyle: 'Modern Contemporary',
      clientType: 'Private Client',
      mainImage: "/images/projects/project2-1.jpg",
      images: [
        "/images/projects/project2-1.jpg",
        "/images/projects/project2-2.jpg"
      ],
      galleryImages: [
        "/images/projects/project2-1.jpg",
        "/images/projects/project2-2.jpg"
      ],
      description: 'Modern residence characterized by prominent grey architectural frames and double-height curtain walls, maximizing natural interior daylight while maintaining utmost family privacy through calculated overhangs.',
      highlightFeatures: [
        'Grey architectural framing contrasting with warm exterior wood cladding',
        'Double-height glass curtain wall connecting living areas with outdoor landscaping',
        'Wide 8.40m northern setback and 3.00m western setback on 15m street with southern pedestrian walkway',
        '120.00m perimeter fencing with separate vehicular and pedestrian access',
      ],
      areaBreakdown: [
        { label: 'Ground Floor', area: '359.32 m²', ratio: '44.91%' },
        { label: 'Ground Annex', area: '85.21 m²', ratio: '10.65%' },
        { label: 'First Floor', area: '365.21 m²', ratio: '45.65%' },
        { label: 'Upper Annex', area: '177.53 m²', ratio: '48.53%' },
        { label: 'Fences Length', area: '120.00 linear m' },
      ],
      deliverables: ['SBC Code Structural & Architectural Plans', 'Approved Balady Blueprints', '3D Facade & Lighting Plans'],
    },
    {
      id: 'palace-luxury-classic-rass-146',
      projectNumber: 3,
      title: 'Luxury Classic Palace & Villa',
      titleEn: 'Classic Royal Palace - Al-Rass',
      category: 'residential',
      categoryLabel: 'Classic Royal Palace',
      location: 'Masterplan Q/R/146 | Plot 17',
      city: 'Al-Rass, Al-Qassim',
      area: 572,
      year: '2022',
      gregorianDate: 'June 2022',
      hijriDate: '1443/11/23 AH',
      deedNumber: 'Deed: 963510000123',
      plotInfo: 'Plan Q/R/146 | Plot 17',
      fenceLength: '96.00 linear m',
      architecturalStyle: 'Neoclassical / Classic',
      clientType: 'Private Client',
      mainImage: "/images/projects/project3-1.jpg",
      images: [
        "/images/projects/project3-1.jpg",
        "/images/projects/project3-2.jpg",
        "/images/projects/project3-3.jpg"
      ],
      galleryImages: [
        "/images/projects/project3-1.jpg",
        "/images/projects/project3-2.jpg",
        "/images/projects/project3-3.jpg"
      ],
      description: 'An opulent classic palace featuring grand ornamental columns, cornices, arched windows, and deep navy-blue tiled roofs that harmonize with intricate wrought-iron gates.',
      highlightFeatures: [
        'Neoclassical decorative columns and sculpted gypsum cornices',
        'Grand arched window apertures maximizing warm natural light and garden vistas',
        'Navy-blue pitched tiled roofs offering timeless aesthetics and superior rainwater runoff',
        'Symmetric setbacks: 3.00m south on 15m street, 2.30m north, 2.00m east and west',
      ],
      areaBreakdown: [
        { label: 'Ground Floor', area: '304.03 m²', ratio: '53.15%' },
        { label: 'Ground Annex', area: '42.24 m²', ratio: '7.38%' },
        { label: 'First Floor', area: '264.37 m²', ratio: '46.25%' },
        { label: 'Upper Annex', area: '98.54 m²', ratio: '37.21%' },
        { label: 'Fences Length', area: '96.00 linear m' },
      ],
      deliverables: ['Full Architectural & Structural Plans', 'Municipality Approved Area Table', '3D Visualizations & Wrought Iron Details'],
    },
    {
      id: 'palace-neoclassic-rass-844',
      projectNumber: 4,
      title: 'Royal Neoclassical Palace',
      titleEn: 'Neoclassical Villa & Palace',
      category: 'residential',
      categoryLabel: 'Neoclassical Villa',
      location: 'Masterplan 844/Q | Plot 146',
      city: 'Al-Rass, Al-Qassim',
      area: 751.01,
      year: '2023',
      gregorianDate: 'February 2023',
      hijriDate: '1444/07/17 AH',
      deedNumber: 'Survey Decision: 440711445454',
      plotInfo: 'Plan 844/Q | Plot 146',
      fenceLength: '108.49 linear m',
      architecturalStyle: 'Luxury Neoclassical',
      clientType: 'Private Client (Multi-Unit)',
      mainImage: "/images/projects/project4-1.jpg",
      images: [
        "/images/projects/project4-1.jpg",
        "/images/projects/project4-2.jpg",
        "/images/projects/project4-3.jpg"
      ],
      galleryImages: [
        "/images/projects/project4-1.jpg",
        "/images/projects/project4-2.jpg",
        "/images/projects/project4-3.jpg"
      ],
      description: 'A stately neoclassical estate featuring an imposing portico entrance supported by colossal Ionic columns, sculpted pediments, pristine white finishes, and wrought-iron arched windows.',
      highlightFeatures: [
        'Grand elevated portico entrance with classical pediment and chandelier provision',
        'Sculpted arch moldings and ornamental wrought-iron window guards',
        'Corner plot optimization: 6.00m northern setback on 30m avenue, 3.00m on 15m street, with 3m chamfer',
        '108.49m perimeter boundary wall with classical pillars and integrated lighting',
      ],
      areaBreakdown: [
        { label: 'Ground Floor', area: '436.66 m²', ratio: '58.13%' },
        { label: 'First Floor', area: '382.44 m²', ratio: '50.92%' },
        { label: 'Upper Annex', area: '187.32 m²', ratio: '48.98%' },
        { label: 'Fences Length', area: '108.49 linear m' },
      ],
      deliverables: ['Full Architectural & Structural Plans', 'Survey Decision & Approved Area Schedule', '3D External Renders & Lighting Plans'],
    },
    {
      id: 'commercial-salmani-riyadh-950',
      projectNumber: 5,
      title: 'Contemporary Salmani Commercial & Office Complex',
      titleEn: 'Contemporary Salmani Commercial Complex - Riyadh',
      category: 'commercial',
      categoryLabel: 'Commercial & Retail',
      location: 'Main Commercial Avenue, Riyadh City',
      city: 'Riyadh',
      area: 950,
      year: '2026',
      gregorianDate: '2026',
      architecturalStyle: 'Contemporary Salmani / Najdi',
      clientType: 'Commercial / Investment Group',
      mainImage: "/images/projects/project5-1.jpg",
      images: [
        "/images/projects/project5-1.jpg",
        "/images/projects/project5-2.jpg",
        "/images/projects/project5-3.jpg",
        "/images/projects/project5-4.jpg"
      ],
      galleryImages: [
        "/images/projects/project5-1.jpg",
        "/images/projects/project5-2.jpg",
        "/images/projects/project5-3.jpg",
        "/images/projects/project5-4.jpg"
      ],
      description: 'An iconic commercial and corporate development celebrating Salmani architecture with warm Riyadh sandstone, repetitive rhythmic arches, integrated green terraces, and solar shading louvers.',
      highlightFeatures: [
        'Rhythmic double-height arches creating maximum street visibility and retail tenant presence',
        'Vertical solar louvers on upper office levels cutting cooling consumption significantly',
        'Green planter ribbons on balconies promoting environmental wellness and biophilic design',
        'Symmetric central entrance with pedestrian plaza and surface visitor parking',
      ],
      areaBreakdown: [
        { label: 'Total Estimated Area', area: '950 m²' },
        { label: 'Retail Showrooms', area: 'Ground & Mezzanine Levels' },
        { label: 'Executive Offices', area: 'Upper Floors with Terraces' },
      ],
      deliverables: ['Full MEP & Structural Engineering', '3D Visuals & Masterplan Landscape', 'Commercial Licensing Blueprints'],
    },
    {
      id: 'altakhi-elderly-warehouse-rass',
      projectNumber: 6,
      title: 'Al-Takhi Elderly Care Medical & Logistics Hub',
      titleEn: 'Al-Takhi Medical Logistics Hub - Al-Rass',
      category: 'commercial',
      categoryLabel: 'Services & Medical Logistics',
      location: 'Masterplan 144/Q | Plot 31',
      city: 'Al-Rass, Al-Qassim',
      area: 535.31,
      year: '2022',
      gregorianDate: 'February 2022',
      hijriDate: '1443/07/23 AH',
      deedNumber: 'Deed: 263509000302',
      plotInfo: 'Plan 144/Q | Plot 31',
      fenceLength: '165.00 linear m',
      architecturalStyle: 'Modern Industrial / Services',
      clientType: 'Non-Profit / Al-Takhi Elderly Care Association',
      mainImage: "/images/projects/project6-1.jpg",
      images: [
        "/images/projects/project6-1.jpg",
        "/images/projects/project6-2.jpg",
        "/images/projects/project6-3.jpg",
        "/images/projects/project6-4.jpg"
      ],
      galleryImages: [
        "/images/projects/project6-1.jpg",
        "/images/projects/project6-2.jpg",
        "/images/projects/project6-3.jpg",
        "/images/projects/project6-4.jpg"
      ],
      description: 'A modern medical and humanitarian storage facility combining high functional efficiency with contemporary aesthetics, engineered for smooth truck logistics, loading docks, and medical supply safety.',
      highlightFeatures: [
        'Expansive logistics apron and dedicated truck parking ensuring fluid supply chain circulation',
        'Upper level sun louvers reducing heat gain and optimizing interior climate stability',
        '6.20m southern setback on 20m road, with 2.00m side setbacks ensuring fire code egress',
        '100% compliance with Civil Defense and specialized medical storage regulations',
      ],
      areaBreakdown: [
        { label: 'Total Site Area', area: '1,700.00 m²' },
        { label: 'Built-up Area (Ground)', area: '535.31 m²', ratio: '31.48%' },
        { label: 'Boundary Walls', area: '165.00 linear m' },
      ],
      deliverables: ['Full Architectural & MEP Blueprints', 'Approved Setback Schedule', '3D Logistic Visualizations', 'Civil Defense Accreditation'],
    },
    {
      id: 'luxury-interior-majlis-dining-buraidah',
      projectNumber: 7,
      title: 'Luxury Majlis & Formal Dining Interior',
      titleEn: 'VIP Majlis & Dining Area - Buraidah',
      category: 'interior',
      categoryLabel: 'Residential Interior Design',
      location: 'Luxury Residential District, Buraidah',
      city: 'Buraidah, Al-Qassim',
      area: 98,
      year: '2026',
      gregorianDate: '2026',
      architecturalStyle: 'Luxury Contemporary Interior',
      clientType: 'Private Client',
      mainImage: "/images/projects/project7-1.jpg",
      images: [
        "/images/projects/project7-1.jpg",
        "/images/projects/project7-2.jpg",
        "/images/projects/project7-3.jpg",
        "/images/projects/project7-4.jpg",
        "/images/projects/project7-5.jpg",
        "/images/projects/project7-6.jpg",
        "/images/projects/project7-7.jpg",
        "/images/projects/project7-8.jpg"
      ],
      galleryImages: [
        "/images/projects/project7-1.jpg",
        "/images/projects/project7-2.jpg",
        "/images/projects/project7-3.jpg",
        "/images/projects/project7-4.jpg",
        "/images/projects/project7-5.jpg",
        "/images/projects/project7-6.jpg",
        "/images/projects/project7-7.jpg",
        "/images/projects/project7-8.jpg"
      ],
      description: 'Sophisticated interior architecture across 98 m² utilizing a warm neutral palette, bookmatched Italian marble accents, acoustic wood paneling, cove lighting, and curved designer furniture.',
      highlightFeatures: [
        'Harmony of luxury Statuario marble slabs, fluted wood paneling, and slim architectural bronze fittings',
        'Curved ergonomic sofa seating paired with tailored 10-seater formal banquet dining table',
        'Layered architectural illumination with indirect ceiling coves and vertical wall sconces',
        'Biophilic indoor greenery adding natural vitality to the formal entertaining suite',
      ],
      areaBreakdown: [
        { label: 'Total Suite Area', area: '98 m²' },
        { label: 'Main Reception Lounge', area: 'Formal VIP Majlis' },
        { label: 'Dining Area', area: 'Banquet Dining Table' },
      ],
      deliverables: ['Interior Layout & Furniture Plans', 'Reflected Ceiling & Lighting Plans', 'Photorealistic 3D Renders', 'Mood Board & BOQ Schedule'],
    },
    {
      id: 'warm-living-room-interior-onaizah',
      projectNumber: 8,
      title: 'Warm Contemporary Living Room Interior',
      titleEn: 'Living Room with Courtyard - Onaizah',
      category: 'interior',
      categoryLabel: 'Residential Interior Design',
      location: 'Private Villa, Onaizah',
      city: 'Onaizah, Al-Qassim',
      area: 56,
      year: '2026',
      gregorianDate: '2026',
      architecturalStyle: 'Warm Contemporary',
      clientType: 'Private Client',
      mainImage: "/images/projects/project8-1.jpg",
      images: [
        "/images/projects/project8-1.jpg",
        "/images/projects/project8-2.jpg",
        "/images/projects/project8-3.jpg",
        "/images/projects/project8-4.jpg"
      ],
      galleryImages: [
        "/images/projects/project8-1.jpg",
        "/images/projects/project8-2.jpg",
        "/images/projects/project8-3.jpg",
        "/images/projects/project8-4.jpg"
      ],
      description: 'Intimate family living space of 56 m² facing a lush private courtyard through panoramic glass walls, marrying contemporary curved sofas with vintage oriental carpets and a statement brass pendant.',
      highlightFeatures: [
        'Seamless visual continuity with private landscaped courtyard bringing green serenity indoors',
        'Contemporary plush off-white seating juxtaposed with artisanal heritage rugs and olive cushions',
        'Travertine media feature wall integrated with floating consoles and ambient backlight',
        'Optimized ergonomic flow connecting the living pavilion with circulation corridors',
      ],
      areaBreakdown: [
        { label: 'Living Room Area', area: '56 m²' },
        { label: 'Visual Vista', area: 'Enclosed Courtyard Garden' },
      ],
      deliverables: ['Furniture & Joinery Layout Plan', 'Ceiling & Electrical Plans', 'High-Res 3D Renders', 'Material Specifications Board'],
    },
    {
      id: 'luxury-modern-landscape-riyadh',
      projectNumber: 9,
      title: 'Luxury Sunken Lounge & Landscape Design',
      titleEn: 'Sunken Lounge & Swimming Pool - Riyadh',
      category: 'hospitality',
      categoryLabel: 'Landscape & Outdoor Architecture',
      location: 'Private Residence, Riyadh',
      city: 'Riyadh',
      area: 110,
      year: '2026',
      gregorianDate: '2026',
      architecturalStyle: 'Luxury Modern Landscape',
      clientType: 'Private Client',
      mainImage: "/images/projects/project9-1.jpg",
      images: [
        "/images/projects/project9-1.jpg",
        "/images/projects/project9-2.jpg",
        "/images/projects/project9-3.jpg",
        "/images/projects/project9-4.jpg"
      ],
      galleryImages: [
        "/images/projects/project9-1.jpg",
        "/images/projects/project9-2.jpg",
        "/images/projects/project9-3.jpg",
        "/images/projects/project9-4.jpg"
      ],
      description: 'Private 110 m² outdoor resort landscape integrating a cozy sunken fire-pit lounge, a swimming pool with water cascades, a steel louvered pergola, and drought-tolerant Mediterranean olive flora.',
      highlightFeatures: [
        'Sunken conversation pit with central gas fire bowl and weather-resistant lounge cushions',
        'Zero-edge swimming pool featuring soothing acoustic wall waterfalls and underwater LED lights',
        'Louvered architectural pergola providing sheltered al-fresco dining shaded from midday sun',
        'Non-slip travertine pavers with recessed step lighting and sculpted olive tree planters',
      ],
      areaBreakdown: [
        { label: 'Total Landscape Area', area: '110 m²' },
        { label: 'Pool & Water Features', area: 'Heated Pool with Cascades' },
        { label: 'Sunken Lounge & Pergola', area: 'Entertaining & Dining Pavilion' },
      ],
      deliverables: ['Master Landscape Plan', 'Irrigation & Hardscape Drainage Blueprints', '3D Photorealistic Day & Night Renders', 'Planting & Material Palette'],
    },
    {
      id: 'modern-chalet-design-rass',
      projectNumber: 10,
      title: 'Contemporary Horizontal Modern Chalet',
      titleEn: 'Minimalist Horizontal Chalet - Al-Rass',
      category: 'hospitality',
      categoryLabel: 'Chalet & Private Resort',
      location: 'Al-Rass Governorate, Al-Qassim',
      city: 'Al-Rass, Al-Qassim',
      area: 157,
      year: '2026',
      gregorianDate: '2026',
      architecturalStyle: 'Contemporary Horizontal Modern',
      clientType: 'Private Client',
      mainImage: "/images/projects/project10-1.jpg",
      images: [
        "/images/projects/project10-1.jpg",
        "/images/projects/project10-2.jpg",
        "/images/projects/project10-3.jpg"
      ],
      galleryImages: [
        "/images/projects/project10-1.jpg",
        "/images/projects/project10-2.jpg",
        "/images/projects/project10-3.jpg"
      ],
      description: 'A serene horizontal retreat across 157 m² blending seamlessly with desert surroundings via warm earthen stonework, extended cantilevered roof planes, and floor-to-ceiling glass pavilions.',
      highlightFeatures: [
        'Floor-to-ceiling panoramic glass walls dissolving the boundary between indoors and outdoor greenery',
        'Deep cantilevered concrete overhangs shielding interior spaces from harsh desert heat',
        'Universal accessibility with gentle stone ramps connecting the chalet platform to gardens',
        'Native desert landscaping illuminated by minimalist architectural bollard luminaires',
      ],
      areaBreakdown: [
        { label: 'Total Built-up Area', area: '157 m²' },
        { label: 'Architectural Mass', area: 'Single-Story Horizontal Pavilion' },
        { label: 'Outdoor Shaded Deck', area: 'Integrated Timber Sun Terrace' },
      ],
      deliverables: ['Full Architectural & Structural Blueprints', 'Masterplan & Hardscape Drawings', '3D Exterior Renderings', 'Exterior Material Board'],
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

        {/* Dynamic Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCardGalleryItem
              key={project.id}
              project={project}
              isAr={isAr}
              t={t}
              onOpenModal={handleOpenProjectModal}
            />
          ))}
        </div>

      </div>

      {/* Project Detail Modal Overlay */}
      <ProjectModal
        project={activeProjectModal}
        initialImageIndex={activeInitialPhotoIndex}
        onClose={() => setActiveProjectModal(null)}
      />
    </section>
  );
}
