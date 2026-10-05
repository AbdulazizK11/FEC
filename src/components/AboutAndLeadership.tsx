import { EXPERTS_LIST } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';
import { 
  GraduationCap, 
  Linkedin, 
  ShieldCheck, 
  Award, 
  BookOpen, 
  CheckCircle2, 
  ExternalLink,
  User,
  MapPin
} from 'lucide-react';

export default function AboutAndLeadership() {
  const { isAr, t } = useLanguage();

  const englishExperts = [
    {
      id: '1',
      name: 'Dr. Talal Alharbi',
      title: 'Executive & Strategic Advisor | Governance, Energy, Arbitration & AI',
      academicDegree: 'PhD in Electrical Engineering (Ph.D., P.Eng.) • Associate Professor at Qassim University',
      sceNumber: 'P.Eng. • Licensed Consultant',
      experienceYears: 16,
      image: '/images/experts/dr_talal.jpg',
      bio: 'Executive and academic leader with extensive competencies in executive management, governance, strategy, marketing, and investments. Associate Professor at Qassim University focusing on sustainable energy and EV suitability research in Saudi Arabia.',
      publicationsOrAchievements: [
        'Associate Professor at Qassim University & Sustainable Energy Researcher',
        'Executive Governance, Corporate Strategy & Engineering Arbitration',
        'Lead advisor in sustainable energy solutions and EV adaptation',
      ],
      linkedinUrl: 'https://www.linkedin.com/in/etalal',
    },
    {
      id: '2',
      name: 'Dr. Omar Al-Rumaih',
      title: 'Strategic Advisor | Executive in Research, Innovation & Energy Efficiency',
      academicDegree: 'PhD in Electrical & Computer Engineering (University of Waterloo)',
      sceNumber: 'PhD, PEng • Licensed Consultant',
      experienceYears: 15,
      image: '/images/experts/dr_omar.jpg',
      bio: 'Executive leader in research strategy and innovation. Secretary General of Research Chairs and former Director of the Scientific Faculties Research Center at Qassim University. Specialized in smart grids, energy optimization, and digital transformation.',
      publicationsOrAchievements: [
        'Secretary General of Research Chairs at Qassim University',
        'PhD from University of Waterloo in Smart Grids & Energy Optimization',
        'Strategic Advisor in Research Governance & National Priority Alignment',
      ],
      linkedinUrl: 'https://www.linkedin.com/in/omar-alrumayh-phd-peng-88972480',
    },
    {
      id: '3',
      name: 'Eng. Sulaiman Al-Jumaili',
      title: 'Partner & Consultant | Project Management, Quality & Engineering Supervision',
      academicDegree: 'Consultant Engineer in Construction & Infrastructure Management',
      sceNumber: 'SCE Consultant: 382910',
      experienceYears: 17,
      image: '/images/experts/dr_sulaiman.jpg',
      bio: 'Engineering consultant specializing in construction management systems, on-site quality compliance with Saudi Building Code (SBC), and municipal occupancy certifications.',
      publicationsOrAchievements: [
        'Certified Auditor & Consultant by the Saudi Council of Engineers',
        'Lead supervisor on iconic architectural and municipal infrastructure projects',
        'Accredited consultant for building safety and Balady certifications',
      ],
    },
    {
      id: 'eng-mohanad-altayeb',
      name: 'Eng. Mohanad Al-Tayeb',
      title: 'Design & Supervision Consultant | Shop Drawings & SBC Expert',
      academicDegree: 'Bachelor of Architectural & Environmental Engineering • Certified Consultant Engineer',
      sceNumber: 'P.Eng - Consultant & Professional Engineer',
      specialization: 'Architectural Coordination, Shop Drawings & On-Site Supervision',
      experienceYears: 6,
      image: '/images/experts/eng_mohanad.jpg',
      linkedinUrl: 'https://linkedin.com/in/muhannad-altayb-897867234',
      bio: 'Architectural engineer with 6 years of expertise in the Saudi engineering sector, specializing in architectural design coordination, shop drawings, and on-site supervision for residential and commercial developments. Highly experienced in Saudi Building Code (SBC) compliance and Balady municipal procedures.',
      publicationsOrAchievements: [
        'Engineering Supervision: Comprehensive on-site supervision and tracking for major commercial and residential developments, ensuring strict field quality compliance.',
        'Professional Accreditation: Accredited member of Saudi Council of Engineers (SCE) with consultant professional license.',
        'Shop Drawings Development: Developed and reviewed advanced shop drawings aligned with SBC and municipal design guidelines.',
        'Technical Inspection Services (TIS): Managed project safety and quality assurance inspections with certified inspection bodies and insurers.',
      ],
    },
    {
      id: 'eng-ghala-alzahrani',
      name: 'Eng. Ghala Al-Zahrani',
      title: 'Architectural & Interior Design Engineer | Facade & Spatial Planning',
      academicDegree: 'Bachelor of Architectural Engineering & Interior Design',
      sceNumber: 'Accredited Member - Saudi Council of Engineers (SCE)',
      specialization: 'Modern Architecture, 3D Visualization & Interior Spatial Design',
      experienceYears: 4,
      image: '/images/experts/eng_ghala.jpg',
      bio: 'Architectural engineer specializing in modern architectural aesthetics, interior space planning, and 3D visualization for high-end residential and commercial projects at Falaq Engineering Consultants. Dedicated to harmonious integration of modern functionality, local identity, and Saudi Building Code compliance.',
      publicationsOrAchievements: [
        'Modern & Neoclassical Facade Concepts for Residential Villas and Palaces',
        'Detailed Architectural Planning & Interior Space Optimization',
        'Advanced 3D Visualization, Material Selection & Lighting Design',
        'Balady & Saudi Building Code Compliance and Permitting Coordination',
      ],
    },
  ];

  const experts = isAr ? EXPERTS_LIST : englishExperts;

  return (
    <section id="about" className="py-20 bg-[#F5F4F0] relative overflow-hidden border-b border-[#E0E1DC]">
      
      {/* Editorial Grid Lines */}
      <div className="absolute inset-0 bg-editorial-grid opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-[#0E1910] text-[#F5F4F0] text-xs font-thmanyah-sans font-th-medium">
            <GraduationCap className="w-3.5 h-3.5 text-[#F4E95B]" />
            <span>{t('aboutBadge')}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-4xl font-th-heavy text-[#000000] font-thmanyah-display">
            {t('aboutTitle')}
          </h2>

          <p className="text-base sm:text-lg text-[#343A2F] leading-relaxed font-thmanyah-text">
            {t('aboutIntro')}
          </p>
        </div>

        {/* Firm Vision & High-Trust Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
          <div className={`p-6 rounded-sm bg-white border border-[#E0E1DC] hover:border-[#343A2F] transition-all shadow-xs ${isAr ? 'text-right' : 'text-left'} group`}>
            <div className="w-10 h-10 rounded-sm bg-[#0E1910] flex items-center justify-center text-[#F4E95B] mb-4 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-th-bold text-[#000000] font-thmanyah-display mb-2">
              {t('aboutPillar1Title')}
            </h3>
            <p className="text-xs sm:text-sm text-[#343A2F] leading-relaxed font-thmanyah-text">
              {t('aboutPillar1Desc')}
            </p>
          </div>

          <div className={`p-6 rounded-sm bg-white border border-[#E0E1DC] hover:border-[#343A2F] transition-all shadow-xs ${isAr ? 'text-right' : 'text-left'} group`}>
            <div className="w-10 h-10 rounded-sm bg-[#0E1910] flex items-center justify-center text-[#F4E95B] mb-4 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-th-bold text-[#000000] font-thmanyah-display mb-2">
              {t('aboutPillar2Title')}
            </h3>
            <p className="text-xs sm:text-sm text-[#343A2F] leading-relaxed font-thmanyah-text">
              {t('aboutPillar2Desc')}
            </p>
          </div>

          <div className={`p-6 rounded-sm bg-white border border-[#E0E1DC] hover:border-[#343A2F] transition-all shadow-xs ${isAr ? 'text-right' : 'text-left'} group`}>
            <div className="w-10 h-10 rounded-sm bg-[#0E1910] flex items-center justify-center text-[#F4E95B] mb-4 group-hover:scale-105 transition-transform">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-th-bold text-[#000000] font-thmanyah-display mb-2">
              {t('aboutPillar3Title')}
            </h3>
            <p className="text-xs sm:text-sm text-[#343A2F] leading-relaxed font-thmanyah-text">
              {t('aboutPillar3Desc')}
            </p>
          </div>
        </div>

        {/* Board of Experts Cards */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#E0E1DC] pb-4">
            <div className={isAr ? 'text-right' : 'text-left'}>
              <h3 className="text-xl sm:text-2xl font-th-bold text-[#000000] font-thmanyah-display">
                {t('leadershipTitle')}
              </h3>
            </div>
            <span className="text-xs font-th-bold text-[#0E1910] bg-white px-3 py-1 rounded-sm border border-[#E0E1DC] font-thmanyah-sans">
              {isAr ? 'FEC • كفاءات معتمدة' : 'FEC • Certified Experts'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {experts.map((expert) => (
              <div
                key={expert.id}
                className={`bg-white border border-[#E0E1DC] p-6 sm:p-7 rounded-sm shadow-xs hover:border-[#343A2F] transition-all ${isAr ? 'text-right' : 'text-left'} flex flex-col justify-between group`}
              >
                <div>
                  {/* Top Bar: Avatar & SCE Badge */}
                  <div className="flex items-start justify-between gap-4 mb-5">
                    
                    {/* SCE & Verification Badge */}
                    <div className="flex flex-col items-start gap-1">
                      {expert.sceNumber && (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-[#F5F4F0] border border-[#E0E1DC] text-[11px] font-th-medium text-[#0E1910] font-thmanyah-sans">
                          <ShieldCheck className="w-3.5 h-3.5 text-[#0E1910]" />
                          <span>{expert.sceNumber}</span>
                        </div>
                      )}
                      <span className="text-[11px] text-[#343A2F] font-thmanyah-sans">
                        {isAr ? `خبرة ${expert.experienceYears} عاماً` : `${expert.experienceYears} Years Exp.`}
                      </span>
                    </div>

                    {/* Expert Photo / Placeholder Avatar */}
                    <div className="relative shrink-0">
                      <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-sm overflow-hidden border border-[#E0E1DC] shadow-xs group-hover:border-[#343A2F] transition-colors bg-[#F5F4F0]">
                        {expert.image ? (
                          <img
                            src={expert.image}
                            alt={expert.name}
                            className="w-full h-full object-cover object-top"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center bg-[#F5F4F0] text-[#343A2F] group-hover:bg-[#0E1910] group-hover:text-[#F4E95B] transition-all p-2">
                            <User className="w-7 h-7 sm:w-8 sm:h-8 stroke-[1.6] mb-0.5 opacity-85 group-hover:opacity-100 transition-opacity" />
                            <span className="text-[9px] font-th-bold tracking-wider font-thmanyah-sans text-center leading-none">
                              {isAr ? 'مستشار هندسي' : 'Consultant'}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className={`absolute -bottom-1 ${isAr ? '-right-1' : '-left-1'} w-5 h-5 rounded-sm bg-[#0E1910] flex items-center justify-center text-[#F4E95B] shadow`}>
                        <GraduationCap className="w-3 h-3" />
                      </div>
                    </div>
                  </div>

                  {/* Name & Academic Title */}
                  <div className="space-y-0.5 mb-3">
                    <h4 className="text-lg sm:text-xl font-th-bold text-[#000000] font-thmanyah-display">
                      {expert.name}
                    </h4>
                    <p className="text-xs sm:text-sm font-th-medium text-[#0E1910] font-thmanyah-sans">
                      {expert.title}
                    </p>
                    <div className="inline-block text-[11px] px-2 py-0.5 rounded-sm bg-[#F5F4F0] text-[#343A2F] mt-1 border border-[#E0E1DC] font-thmanyah-sans">
                      {expert.academicDegree}
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-xs sm:text-sm text-[#343A2F] leading-relaxed mb-5 font-thmanyah-text">
                    {expert.bio}
                  </p>

                  {/* Key Achievements */}
                  {expert.publicationsOrAchievements && (
                    <div className="space-y-1.5 mb-5 pt-3 border-t border-[#E0E1DC]">
                      <div className={`text-[11px] font-th-bold text-[#000000] flex items-center gap-1 font-thmanyah-sans ${isAr ? 'justify-start' : 'justify-start'}`}>
                        <BookOpen className="w-3 h-3 text-[#C0886A]" />
                        <span>{isAr ? 'أبرز الإنجازات والاعتمادات:' : 'Key Credentials & Accreditations:'}</span>
                      </div>
                      {expert.publicationsOrAchievements.map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-[#343A2F] font-thmanyah-text">
                          <CheckCircle2 className="w-3 h-3 text-[#0E1910] shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bottom Verification & LinkedIn Link */}
                <div className="pt-3 border-t border-[#E0E1DC] flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-[11px] font-th-bold text-[#0E1910] bg-[#F5F4F0] px-2 py-1 rounded-sm border border-[#E0E1DC] font-thmanyah-sans">
                    <MapPin className="w-3 h-3 text-[#8C7767] shrink-0" />
                    <span>{isAr ? 'القصيم • الرياض' : 'Al Qassim • Riyadh'}</span>
                  </div>

                  {expert.linkedinUrl ? (
                    <a
                      href={expert.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-[#0E1910] hover:bg-[#000000] text-[#F5F4F0] text-xs font-th-bold transition-all border border-[#0E1910] font-thmanyah-sans group/btn shadow-xs"
                      title={isAr ? `زيارة الحساب المهني لـ ${expert.name} على لينكد إن` : `Visit ${expert.name}'s LinkedIn profile`}
                    >
                      <span>LinkedIn</span>
                      <Linkedin className="w-3 h-3 text-[#F4E95B]" />
                      <ExternalLink className="w-2.5 h-2.5 opacity-70 group-hover/btn:opacity-100 transition-opacity" />
                    </a>
                  ) : (
                    <div className="inline-flex items-center gap-1 text-[11px] font-th-bold text-[#0E1910] bg-white px-2.5 py-1 rounded-sm border border-[#E0E1DC] font-thmanyah-sans">
                      <span>{isAr ? 'مستشار معتمد' : 'Certified Consultant'}</span>
                    </div>
                  )}
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

