import { OFFICE_INFO, SOCIAL_LINKS } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';
import { Compass, ShieldCheck, Phone, Mail, MapPin, ArrowUp, ExternalLink } from 'lucide-react';

export default function Footer() {
  const { isAr, t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={`bg-[#0E1910] text-[#F5F4F0] border-t border-[#343A2F] ${isAr ? 'text-right' : 'text-left'} pt-16 pb-20 sm:pb-14 font-thmanyah-sans`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-[#343A2F]/80">
          
          {/* Col 1: Brand & Bio */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-sm bg-[#F5F4F0] flex items-center justify-center text-[#0E1910]">
                <Compass className="w-4 h-4" />
              </div>
              <div>
                <span className="text-base font-th-heavy text-[#F5F4F0] font-thmanyah-display block leading-none">
                  {isAr ? (
                    <>مكتب <span className="text-[#F4E95B]">فَلَق</span></>
                  ) : (
                    <><span className="text-[#F4E95B]">FALAQ</span> (FEC)</>
                  )}
                </span>
                <span className="text-[11px] text-[#E0E1DC] font-th-medium">
                  {isAr ? 'للإستشارات الهندسية' : 'Engineering Consultants'}
                </span>
              </div>
            </div>

            <p className="text-xs text-[#E0E1DC] leading-relaxed font-thmanyah-text">
              {isAr 
                ? 'نبتكر الفكرة.. لنبني الواقع. صرح استشاري هندسي معتمد بالرس ومنطقة القصيم يقوده نخبة من الأكاديميين والمستشارين المتخصصين.'
                : 'Pioneering architectural and structural consulting in Al-Rass and Al-Qassim, led by doctorate-level engineering consultants and certified Saudi experts.'}
            </p>

            <div className="flex items-center gap-2 text-[11px] text-[#E0E1DC]">
              <ShieldCheck className="w-4 h-4 text-[#F4E95B]" />
              <span>{isAr ? `ترخيص هيئة المهندسين: ${OFFICE_INFO.sceLicense}` : `SCE License: ${OFFICE_INFO.sceLicense}`}</span>
            </div>

            {/* Social Links */}
            <div className="pt-1 flex flex-wrap items-center gap-2">
              <a
                href={SOCIAL_LINKS.x}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 rounded-sm bg-[#343A2F] text-xs text-[#F5F4F0] hover:bg-black transition-colors"
              >
                X
              </a>
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 rounded-sm bg-[#343A2F] text-xs text-[#F5F4F0] hover:bg-black transition-colors"
              >
                Instagram
              </a>
              <a
                href={SOCIAL_LINKS.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 rounded-sm bg-[#343A2F] text-xs text-[#F5F4F0] hover:bg-black transition-colors"
              >
                TikTok
              </a>
              <a
                href={SOCIAL_LINKS.snapchat}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 rounded-sm bg-[#343A2F] text-xs text-[#F5F4F0] hover:bg-black transition-colors"
              >
                Snapchat
              </a>
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 rounded-sm bg-[#343A2F] text-xs text-[#F5F4F0] hover:bg-black transition-colors"
              >
                LinkedIn
              </a>
              <a
                href={SOCIAL_LINKS.linktree}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 rounded-sm bg-[#F4E95B] text-xs text-[#000000] font-th-bold hover:bg-[#F5F4F0] transition-colors flex items-center gap-1"
              >
                <span>Linktree</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-th-bold text-[#F5F4F0] font-thmanyah-display">
              {t('footerQuickLinks')}
            </h4>
            <ul className="space-y-1.5 text-xs text-[#E0E1DC]">
              <li><a href="#about" className="hover:text-[#F4E95B] transition-colors">{t('navAbout')}</a></li>
              <li><a href="#achievements" className="hover:text-[#F4E95B] transition-colors">{t('navAchievements')}</a></li>
              <li><a href="#packages" className="hover:text-[#F4E95B] transition-colors">{t('navPackages')}</a></li>
              <li><a href="#portfolio" className="hover:text-[#F4E95B] transition-colors">{t('navPortfolio')}</a></li>
              <li><a href="#estimator" className="hover:text-[#F4E95B] transition-colors">{t('navEstimator')}</a></li>
              <li><a href="#workflow" className="hover:text-[#F4E95B] transition-colors">{t('navWorkflow')}</a></li>
            </ul>
          </div>

          {/* Col 3: Engineering Services */}
          <div className="space-y-3">
            <h4 className="text-sm font-th-bold text-[#F5F4F0] font-thmanyah-display">
              {t('footerServices')}
            </h4>
            <ul className="space-y-1.5 text-xs text-[#E0E1DC]">
              <li><span>{isAr ? 'التصميم المعماري والطراز السلماني' : 'Architectural & Salmani Design'}</span></li>
              <li><span>{isAr ? 'التصميم الإنشائي ومطابقة كود SBC' : 'SBC-Compliant Structural Engineering'}</span></li>
              <li><span>{isAr ? 'التصميم الداخلي والإضاءة الفاخرة' : 'Luxury Interior & Lighting Design'}</span></li>
              <li><span>{isAr ? 'الإشراف الميداني وإصدار رخص بلدي' : 'Site Supervision & Balady Permits'}</span></li>
              <li><span>{isAr ? 'إصدار شهادات إشغال البناء وإطلاق التيار' : 'Occupancy & IDI Certification'}</span></li>
            </ul>
          </div>

          {/* Col 4: Location & Contact */}
          <div className="space-y-3">
            <h4 className="text-sm font-th-bold text-[#F5F4F0] font-thmanyah-display">
              {t('footerHQ')}
            </h4>
            <div className="space-y-2 text-xs text-[#E0E1DC]">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#F4E95B] shrink-0" />
                <span>{isAr ? OFFICE_INFO.locationAddress : 'King Fahd Road, Al-Rass, Al-Qassim'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#F4E95B] shrink-0" />
                <span dir="ltr">{OFFICE_INFO.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#F4E95B] shrink-0" />
                <span>{OFFICE_INFO.email}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-[#343A2F] border border-[#343A2F] text-xs text-[#F5F4F0] hover:bg-black transition-all cursor-pointer"
              >
                <span>{t('footerBackToTop')}</span>
                <ArrowUp className="w-3 h-3 text-[#F4E95B]" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Accreditation Numbers */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#E0E1DC]">
          <div>
            {isAr 
              ? `جميع الحقوق محفوظة © ${new Date().getFullYear()} مكتب فَلَق للإستشارات الهندسية (FEC).`
              : `All Rights Reserved © ${new Date().getFullYear()} Falaq Engineering Consultants (FEC).`}
          </div>

          <div className="flex items-center gap-3 text-[11px]">
            <span>{isAr ? 'الرس، منطقة القصيم' : 'Al-Rass, Al-Qassim'}</span>
            <span>•</span>
            <span>{isAr ? `س.ت: ${OFFICE_INFO.crNumber}` : `CR: ${OFFICE_INFO.crNumber}`}</span>
            <span>•</span>
            <span>{isAr ? `بلدي: ${OFFICE_INFO.baladyId}` : `Balady: ${OFFICE_INFO.baladyId}`}</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

