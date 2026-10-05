import { useState } from 'react';
import { SERVICE_PACKAGES, OFFICE_INFO } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';
import { ServicePackage } from '../types';
import { 
  Check, 
  X, 
  Sparkles, 
  MessageSquare, 
  Layers, 
  ArrowLeft,
  ArrowRight
} from 'lucide-react';

interface ServicesAndPackagesProps {
  onSelectPackageForEstimator?: (packageId: 'economic' | 'premium' | 'comprehensive') => void;
  onOpenConsultationModal?: (packageId?: string) => void;
}

export default function ServicesAndPackages({ 
  onSelectPackageForEstimator,
}: ServicesAndPackagesProps) {
  const { isAr, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'all' | 'compare'>('all');

  const englishPackages: ServicePackage[] = [
    {
      id: 'economic',
      name: 'Economic Package',
      nameEn: 'Basic SBC Compliant',
      tagline: 'Standard architectural, structural, and MEP engineering drawings for official Balady building permit issuance.',
      targetAudience: 'Clients seeking official permits with strict budget and compliant Saudi Building Code engineering standards.',
      badge: 'Basic License',
      basePricePerMeter: 22,
      deliveryWeeks: '2 - 3 Weeks',
      whatsAppMessage: 'Hello Falaq (FEC), I would like to inquire about the Economic Package for my project.',
      features: [
        { title: 'Topographical Survey & Plot Levels', description: 'Accurate boundary coordinates and municipal setback check', included: true },
        { title: 'Architectural Plans (2D & Basic 3D)', description: 'Functional floor plans, elevations, and sections', included: true },
        { title: 'Full Structural Modeling (SBC)', description: 'Safe foundation, column, and slab designs meeting SBC 1101', included: true },
        { title: 'MEP Plans (Plumbing & Electrical)', description: 'Supply & drainage piping, electrical power, and lighting paths', included: true },
        { title: 'Balady Permit Issuance Assistance', description: 'Uploading drawings and finalizing municipal licensing', included: true },
        { title: 'Detailed 3D Exterior Facade Renders', description: 'Cinematic day/night materials and lighting simulations', included: false },
        { title: 'Landscape & Garden Architecture', description: 'Outdoor courtyards, swimming pools, and boundary gates', included: false },
        { title: 'Full Interior Architecture & BOQ', description: '3D interior rooms, furniture placement, and bill of quantities', included: false },
        { title: 'On-Site Construction Supervision', description: 'Field inspection visits and stage sign-offs for concrete pours', included: false },
      ],
    },
    {
      id: 'premium',
      name: 'Premium Design Package',
      nameEn: 'Architectural Excellence & 3D',
      tagline: 'Comprehensive architectural masterpiece featuring detailed 3D daytime/nighttime facade renderings, landscape, and BOQ.',
      targetAudience: 'Villa owners seeking modern aesthetics, optimized space utilization, and cost-efficient construction solutions.',
      isPopular: true,
      badge: 'Most Popular ⭐',
      basePricePerMeter: 38,
      deliveryWeeks: '3 - 4 Weeks',
      whatsAppMessage: 'Hello Falaq (FEC), I would like to book the Premium Design Package for my project.',
      features: [
        { title: 'Topographical Survey & Plot Levels', description: 'Accurate boundary coordinates and municipal setback check', included: true },
        { title: 'Architectural Plans (2D & 3D)', description: 'Smart contemporary layouts tailored to family privacy', included: true },
        { title: 'BIM Structural Analysis (SBC)', description: 'Advanced structural optimization saving up to 20% steel', included: true },
        { title: 'Advanced MEP & Smart Home Wiring', description: 'HVAC distribution, CCTV prep, and smart home conduits', included: true },
        { title: 'Balady Permit Issuance Assistance', description: 'Direct digital approval on Balady platform', included: true },
        { title: 'Cinematic 3D Facade Design', description: 'Ultra-realistic day and evening lighting visualization', included: true },
        { title: 'Landscape & Boundary Wall Design', description: 'Integrated garden, courtyard, BBQ, and fence detailing', included: true },
        { title: 'Detailed Bill of Quantities (BOQ)', description: 'Precise material quantity schedules for accurate contractor bids', included: true },
        { title: 'On-Site Construction Supervision', description: 'Field inspection visits and stage sign-offs for concrete pours', included: false },
      ],
    },
    {
      id: 'comprehensive',
      name: 'Comprehensive Luxury Package',
      nameEn: 'Turnkey Design & Supervision',
      tagline: 'All-inclusive engineering journey from soil investigation to complete interior fit-out design and on-site construction supervision.',
      targetAudience: 'Discerning clients who value complete peace of mind, high-end finishing, and assured occupancy licensing.',
      badge: 'Turnkey Quality',
      basePricePerMeter: 55,
      deliveryWeeks: '4 - 6 Weeks',
      whatsAppMessage: 'Hello Falaq (FEC), I would like to book the Comprehensive Luxury Package with Supervision.',
      features: [
        { title: 'Soil Mechanics & Geotechnical Study', description: 'Laboratory core testing and foundation load recommendations', included: true },
        { title: 'Elite Architectural & Structural Blueprints', description: 'Custom neoclassical, modern, or Salmani luxury design', included: true },
        { title: 'Full 3D Interior Architecture', description: 'Detailed plans for all rooms, majlis, ceilings, and lighting layouts', included: true },
        { title: 'Lux Lighting & Energy Efficiency Study', description: 'Dialux architectural lighting analysis preventing glare', included: true },
        { title: 'Landscape, Pool & External Annexes', description: 'Complete outdoor living and recreational design', included: true },
        { title: 'Detailed Material Specifications & BOQ', description: 'Complete itemized tender book for contracting', included: true },
        { title: 'On-Site Structural Inspection Visits', description: 'Supervising foundations, columns, and slabs casting', included: true },
        { title: 'Balady Supervision Reports & Occupancy', description: 'Final occupancy certificate issuance and electricity grid hookup', included: true },
      ],
    },
  ];

  const packages = isAr ? SERVICE_PACKAGES : englishPackages;

  const comparisonRows = isAr ? [
    { name: 'الرفع المساحي وتحديد المناسيب بالموقع', ec: true, pr: true, full: true },
    { name: 'المخططات المعمارية والمساقط 2D/3D', ec: true, pr: true, full: true },
    { name: 'المخططات الإنشائية وفق كود SBC', ec: true, pr: true, full: true },
    { name: 'مخططات الكهروميكانيك (MEP)', ec: true, pr: true, full: true },
    { name: 'دراسة العزل وكفاءة الطاقة', ec: true, pr: true, full: true },
    { name: 'إصدار رخصة البناء عبر منصة بلدي', ec: true, pr: true, full: true },
    { name: 'تصميم الواجهات 3D سينمائي تفصيلي', ec: false, pr: true, full: true },
    { name: 'تصميم السور والمداخل والبرجولات', ec: false, pr: true, full: true },
    { name: 'تنسيق الحدائق والمساحات الخارجية (Landscape)', ec: false, pr: true, full: true },
    { name: 'مخططات شبكة كاميرات المراقبة والسمارت', ec: false, pr: true, full: true },
    { name: 'جدول حصر الكميات والمواصفات (BOQ)', ec: false, pr: true, full: true },
    { name: 'التصميم الداخلي الكامل 3D والمخططات التنفيذية', ec: false, pr: false, full: true },
    { name: 'دراسة توزيع الإضاءة المعمارية (Lux Study)', ec: false, pr: false, full: true },
    { name: 'الإشراف الهندسي الميداني لكافة مراحل الصب', ec: false, pr: false, full: true },
    { name: 'تقارير فحص الجودة المعتمدة على منصة بلدي', ec: false, pr: false, full: true },
    { name: 'متابعة وإصدار شهادة إشغال البناء التامة', ec: false, pr: false, full: true },
  ] : [
    { name: 'Topographical Survey & Plot Levels', ec: true, pr: true, full: true },
    { name: 'Architectural Floorplans 2D/3D', ec: true, pr: true, full: true },
    { name: 'Structural Blueprints (SBC Compliant)', ec: true, pr: true, full: true },
    { name: 'MEP Engineering Blueprints', ec: true, pr: true, full: true },
    { name: 'Thermal Insulation & Energy Study', ec: true, pr: true, full: true },
    { name: 'Balady Municipal Building Permit', ec: true, pr: true, full: true },
    { name: 'Cinematic 3D Facade Rendering', ec: false, pr: true, full: true },
    { name: 'Fence, Gate & Pergola Architecture', ec: false, pr: true, full: true },
    { name: 'Landscape & Outdoor Courtyard Design', ec: false, pr: true, full: true },
    { name: 'CCTV & Smart Home Conduits Plan', ec: false, pr: true, full: true },
    { name: 'Bill of Quantities Schedule (BOQ)', ec: false, pr: true, full: true },
    { name: 'Full 3D Interior Fit-Out Blueprints', ec: false, pr: false, full: true },
    { name: 'Dialux Architectural Lighting Study', ec: false, pr: false, full: true },
    { name: 'On-Site Field Pouring Supervision', ec: false, pr: false, full: true },
    { name: 'Balady Quality Inspection Reports', ec: false, pr: false, full: true },
    { name: 'Occupancy Certificate Issuance', ec: false, pr: false, full: true },
  ];

  return (
    <section id="packages" className={`py-20 bg-[#F5F4F0] relative overflow-hidden border-b border-[#E0E1DC] ${isAr ? 'text-right' : 'text-left'}`}>
      
      {/* Editorial Grid Background */}
      <div className="absolute inset-0 bg-editorial-grid opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-[#0E1910] text-[#F5F4F0] text-xs font-thmanyah-sans font-th-medium">
            <Layers className="w-3.5 h-3.5 text-[#F4E95B]" />
            <span>{t('packagesBadge')}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-4xl font-th-heavy text-[#000000] font-thmanyah-display">
            {t('packagesTitle')}
          </h2>

          <p className="text-base sm:text-lg text-[#343A2F] leading-relaxed font-thmanyah-text">
            {t('packagesIntro')}
          </p>

          {/* Toggle View: Cards vs Feature Comparison Table */}
          <div className="inline-flex p-1 bg-white border border-[#E0E1DC] rounded-sm mt-3 font-thmanyah-sans">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-1.5 text-xs sm:text-sm font-th-bold rounded-sm transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-[#0E1910] text-[#F5F4F0] shadow-xs'
                  : 'text-[#343A2F] hover:text-[#000000]'
              }`}
            >
              {t('packagesTabCards')}
            </button>
            <button
              onClick={() => setActiveTab('compare')}
              className={`px-4 py-1.5 text-xs sm:text-sm font-th-bold rounded-sm transition-all cursor-pointer ${
                activeTab === 'compare'
                  ? 'bg-[#0E1910] text-[#F5F4F0] shadow-xs'
                  : 'text-[#343A2F] hover:text-[#000000]'
              }`}
            >
              {t('packagesTabTable')}
            </button>
          </div>
        </div>

        {/* 3-Tier Package Cards View */}
        {activeTab === 'all' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative flex flex-col justify-between rounded-sm bg-white p-6 sm:p-7 transition-all duration-300 ${isAr ? 'text-right' : 'text-left'} ${
                  pkg.isPopular
                    ? 'border-2 border-[#0E1910] shadow-md lg:-translate-y-2 z-20'
                    : 'border border-[#E0E1DC] hover:border-[#343A2F] shadow-xs'
                }`}
              >
                {/* Popular Ribbon */}
                {pkg.isPopular && (
                  <div className={`absolute -top-3 ${isAr ? 'right-6' : 'left-6'} bg-[#0E1910] text-[#F4E95B] text-xs font-th-bold py-0.5 px-3 rounded-sm shadow-xs flex items-center gap-1 font-thmanyah-sans`}>
                    <Sparkles className="w-3 h-3 fill-[#F4E95B]" />
                    <span>{pkg.badge || (isAr ? 'الأكثر طلباً' : 'Most Popular')}</span>
                  </div>
                )}

                <div>
                  {/* Title & Tagline */}
                  <div className="mb-5 pt-1">
                    <span className="text-xs font-thmanyah-sans text-[#343A2F] block mb-1">
                      {pkg.nameEn}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-th-bold text-[#000000] font-thmanyah-display">
                      {pkg.name}
                    </h3>
                    <p className="text-xs text-[#343A2F] mt-1.5 leading-relaxed font-thmanyah-text min-h-[36px]">
                      {pkg.tagline}
                    </p>
                  </div>

                  {/* Duration & Delivery */}
                  <div className="flex items-center justify-between text-xs text-[#343A2F] py-2 border-y border-[#E0E1DC] mb-5 font-thmanyah-sans">
                    <span>{isAr ? 'مدة إنجاز المخططات:' : 'Delivery Timeline:'}</span>
                    <span className="text-[#000000] font-th-bold">{pkg.deliveryWeeks}</span>
                  </div>

                  {/* Features List */}
                  <div className="space-y-2.5 mb-6">
                    <div className="text-xs font-th-bold text-[#000000] font-thmanyah-display">{isAr ? 'محتويات الباقة والبنود:' : 'Included Blueprint Modules:'}</div>
                    {pkg.features.map((feat, idx) => (
                      <div
                        key={idx}
                        className={`flex items-start gap-2 text-xs ${
                          feat.included ? 'text-[#000000]' : 'text-[#343A2F]/50 opacity-40'
                        }`}
                      >
                        {feat.included ? (
                          <div className="w-4 h-4 rounded-sm bg-[#0E1910] text-[#F4E95B] flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </div>
                        ) : (
                          <div className="w-4 h-4 rounded-sm bg-[#E0E1DC] text-[#343A2F] flex items-center justify-center shrink-0 mt-0.5">
                            <X className="w-2.5 h-2.5" />
                          </div>
                        )}
                        <div>
                          <span className={feat.included ? 'font-th-medium font-thmanyah-sans text-[#000000]' : 'line-through font-thmanyah-sans'}>
                            {feat.title}
                          </span>
                          {feat.included && (
                            <p className="text-[11px] text-[#343A2F] leading-tight mt-0.5 font-thmanyah-text">
                              {feat.description}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Bottom CTAs */}
                <div className="space-y-2 pt-5 border-t border-[#E0E1DC]">
                  <a
                    href={`https://wa.me/${OFFICE_INFO.whatsapp}?text=${encodeURIComponent(pkg.whatsAppMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-2.5 px-4 rounded-sm flex items-center justify-center gap-2 font-th-bold text-xs sm:text-sm transition-all shadow-xs cursor-pointer font-thmanyah-sans ${
                      pkg.isPopular
                        ? 'bg-[#0E1910] hover:bg-[#000000] text-[#F5F4F0]'
                        : 'bg-white hover:bg-[#F5F4F0] text-[#000000] border border-[#0E1910]'
                    }`}
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{isAr ? `طلب ${pkg.name} عبر الواتساب` : `Request ${pkg.name}`}</span>
                  </a>

                  <a
                    href="#estimator"
                    onClick={() => onSelectPackageForEstimator && onSelectPackageForEstimator(pkg.id as any)}
                    className="w-full py-2 px-3 rounded-sm flex items-center justify-center gap-1 text-xs text-[#343A2F] hover:text-[#000000] hover:bg-[#F5F4F0] transition-colors cursor-pointer font-thmanyah-sans font-th-medium"
                  >
                    <span>{t('calculatePackageArea')}</span>
                    {isAr ? <ArrowLeft className="w-3 h-3" /> : <ArrowRight className="w-3 h-3" />}
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Feature Comparison Table View */}
        {activeTab === 'compare' && (
          <div className="bg-white rounded-sm border border-[#E0E1DC] overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className={`w-full ${isAr ? 'text-right' : 'text-left'} border-collapse`}>
                <thead>
                  <tr className="border-b border-[#E0E1DC] bg-[#F5F4F0]">
                    <th className="p-4 text-xs sm:text-sm font-th-bold text-[#000000] min-w-[200px] font-thmanyah-display">
                      {isAr ? 'البنود والمخرجات الهندسية' : 'Engineering Modules & Deliverables'}
                    </th>
                    <th className="p-4 text-xs sm:text-sm font-th-bold text-[#343A2F] text-center min-w-[130px] font-thmanyah-sans">
                      {isAr ? 'الباقة الاقتصادية' : 'Economic'}
                    </th>
                    <th className="p-4 text-xs sm:text-sm font-th-bold text-[#0E1910] text-center min-w-[140px] bg-[#E0E1DC]/40 font-thmanyah-sans">
                      {isAr ? 'الباقة المميزة ⭐' : 'Premium ⭐'}
                    </th>
                    <th className="p-4 text-xs sm:text-sm font-th-bold text-[#000000] text-center min-w-[150px] font-thmanyah-sans">
                      {isAr ? 'الباقة الشاملة' : 'Comprehensive'}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E0E1DC] text-xs font-thmanyah-sans">
                  {comparisonRows.map((row, i) => (
                    <tr key={i} className="hover:bg-[#F5F4F0]/60 transition-colors">
                      <td className="p-3.5 text-[#000000] font-th-medium">{row.name}</td>
                      <td className="p-3.5 text-center">
                        {row.ec ? (
                          <Check className="w-4 h-4 text-[#0E1910] mx-auto" />
                        ) : (
                          <X className="w-3.5 h-3.5 text-[#343A2F]/30 mx-auto" />
                        )}
                      </td>
                      <td className="p-3.5 text-center bg-[#E0E1DC]/20">
                        {row.pr ? (
                          <Check className="w-4 h-4 text-[#0E1910] font-bold mx-auto" />
                        ) : (
                          <X className="w-3.5 h-3.5 text-[#343A2F]/30 mx-auto" />
                        )}
                      </td>
                      <td className="p-3.5 text-center">
                        {row.full ? (
                          <Check className="w-4 h-4 text-[#0E1910] mx-auto" />
                        ) : (
                          <X className="w-3.5 h-3.5 text-[#343A2F]/30 mx-auto" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className={`p-4 bg-[#F5F4F0] border-t border-[#E0E1DC] flex flex-wrap items-center justify-between gap-4 font-thmanyah-sans ${isAr ? 'text-right' : 'text-left'}`}>
              <div className="text-xs text-[#343A2F]">
                {isAr 
                  ? 'جميع الباقات متوافقة مع متطلبات كود البناء السعودي (SBC) وتأمين ملاك المباني الإلزامي.'
                  : 'All packages comply with Saudi Building Code (SBC) and mandatory inherent defects insurance.'}
              </div>
              <a
                href={`https://wa.me/${OFFICE_INFO.whatsapp}?text=${encodeURIComponent(
                  isAr
                    ? 'مرحباً مكتب فلق (FEC)، أود استشارة هندسية لاختيار الباقة الأنسب لمشروعي.'
                    : 'Hello Falaq (FEC), I would like to consult an engineer to choose the best package for my project.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-sm bg-[#0E1910] text-[#F5F4F0] font-th-bold text-xs hover:bg-[#000000] transition-colors"
              >
                {isAr ? 'استشر مهندسنا لاختيار الباقة' : 'Consult Engineer on Best Package'}
              </a>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}

