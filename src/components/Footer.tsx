import { OFFICE_INFO, SOCIAL_LINKS } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';
import {
  Compass,
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
  ArrowUp,
  ExternalLink,
  Globe,
  Award,
  Building2,
  FileCheck2,
  Layers,
  CheckCircle2,
} from 'lucide-react';

export default function Footer() {
  const { isAr, t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerBadges = [
    {
      id: 'sce',
      title: isAr ? 'ترخيص الهيئة السعودية للمهندسين (SCE)' : 'SCE Engineering License',
      value: isAr ? `رقم ${OFFICE_INFO.sceLicense}` : `No. ${OFFICE_INFO.sceLicense}`,
      sub: isAr ? 'مكتب استشاري مهني معتمد' : 'Certified Engineering Office',
      icon: Award,
    },
    {
      id: 'cr',
      title: isAr ? 'الرقم الوطني الموحد / السجل التجاري' : 'Unified National No. / CR',
      value: OFFICE_INFO.crNumber,
      sub: isAr ? 'شركة ذات مسؤولية محدودة - مهنية' : 'Professional LLC',
      icon: Building2,
    },
    {
      id: 'balady',
      title: isAr ? 'رخصة النشاط التجاري (بلدي)' : 'Balady Commercial License',
      value: isAr ? `رقم ${OFFICE_INFO.baladyId}` : `No. ${OFFICE_INFO.baladyId}`,
      sub: isAr ? 'ربط إلكتروني فوري مع الأمانات' : 'Direct Municipal Integration',
      icon: FileCheck2,
    },
    {
      id: 'sbc',
      title: isAr ? 'كود البناء السعودي (SBC)' : 'Saudi Building Code (SBC)',
      value: isAr ? 'SBC 1101 & الأكواد المعتمدة' : 'SBC 1101 Compliant',
      sub: isAr ? 'مطابقة هندسية وإشراف 100%' : '100% Engineering Compliance',
      icon: Layers,
    },
  ];

  return (
    <footer
      className={`bg-[#091426] text-[#F5F4F0] border-t-2 border-[#D4AF37]/50 ${
        isAr ? 'text-right' : 'text-left'
      } pt-14 pb-20 sm:pb-14 font-thmanyah-sans`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* 1. Official Accreditations & Municipal Compliance Visual Section in Footer */}
        <div className="p-5 sm:p-6 rounded-xl bg-gradient-to-l from-[#0F223D] via-[#0B192C] to-[#0E1910] border border-[#D4AF37]/40 shadow-lg space-y-5">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-white/15">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 text-xs font-th-bold text-[#F4E95B]">
                <ShieldCheck className="w-4 h-4 text-[#F4E95B]" />
                <span>
                  {isAr
                    ? 'البيانات النظامية والتراخيص الرسمية الموثقة'
                    : 'Official Verified Corporate & Engineering Licenses'}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-th-heavy text-white font-thmanyah-display">
                {isAr ? OFFICE_INFO.officialLegalNameAr : OFFICE_INFO.officialLegalNameEn}
              </h3>
              <div className="flex items-center gap-1.5 text-xs text-[#CBD5E1]">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                <span>
                  {isAr
                    ? `المقر الجغرافي: ${OFFICE_INFO.locationAddress}`
                    : `Headquarters: ${OFFICE_INFO.locationAddressEn}`}
                </span>
              </div>
            </div>
          </div>

          {/* 4 Visual License Badges Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 items-stretch">
            {footerBadges.map((b) => {
              const Icon = b.icon;
              return (
                <div
                  key={b.id}
                  className="p-4 rounded-lg bg-white/8 hover:bg-white/12 border border-[#D4AF37]/30 hover:border-[#F4E95B] transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="w-8 h-8 rounded-md bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#F4E95B] flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="text-[11px] text-[#CBD5E1] font-th-medium">{b.title}</div>
                    <div className="text-sm sm:text-base font-th-heavy text-[#F4E95B] font-thmanyah-display">
                      {b.value}
                    </div>
                  </div>
                  <div className="text-[10px] text-white/75 pt-2 mt-2 border-t border-white/10">
                    {b.sub}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Municipal Compliance Bar in Footer */}
          <div className="pt-3 border-t border-white/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs text-[#E2E8F0]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#F4E95B] shrink-0" />
              <span>
                {isAr
                  ? 'جميع التصاميم والإشراف تنفذ وفق معايير كود البناء السعودي (SBC).'
                  : 'All designs and supervision are executed in accordance with Saudi Building Code (SBC).'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#F4E95B] shrink-0" />
              <span>
                {isAr
                  ? "اعتماد الربط الإلكتروني المباشر مع منصات 'بلدي' والأمانات لإصدار الرخص وشهادات الإشغال فورياً."
                  : "Direct electronic integration with 'Balady' and municipal platforms for instant permits and occupancy certificates."}
              </span>
            </div>
          </div>
        </div>

        {/* 2. Main Footer Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-white/15">
          {/* Col 1: Brand & Bio */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-sm bg-[#F5F4F0] flex items-center justify-center text-[#0B192C]">
                <Compass className="w-4 h-4" />
              </div>
              <div>
                <span className="text-base font-th-heavy text-[#F5F4F0] font-thmanyah-display block leading-none">
                  {isAr ? (
                    <>
                      شركة مكتب <span className="text-[#F4E95B]">فَلَق</span>
                    </>
                  ) : (
                    <>
                      <span className="text-[#F4E95B]">FALAQ</span> (FEC)
                    </>
                  )}
                </span>
                <span className="text-[11px] text-[#CBD5E1] font-th-medium">
                  {isAr
                    ? 'للإستشارات الهندسية (شركة ذات مسؤولية محدودة - مهنية)'
                    : 'Engineering Consultants Co. (Professional LLC)'}
                </span>
              </div>
            </div>

            <p className="text-xs text-[#CBD5E1] leading-relaxed font-thmanyah-text">
              {isAr
                ? 'نبتكر الفكرة.. لنبني الواقع. صرح استشاري هندسي مهني معتمد بمنطقة القصيم (محافظة الرس) يقوده نخبة من الأكاديميين والمستشارين المتخصصين.'
                : 'Pioneering architectural and structural consulting in Al-Rass, Al-Qassim, led by doctorate-level engineering consultants and certified Saudi experts.'}
            </p>

            {/* Social Links */}
            <div className="pt-1 flex flex-wrap items-center gap-2">
              <a
                href={SOCIAL_LINKS.x}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 rounded-sm bg-white/10 text-xs text-[#F5F4F0] hover:bg-[#D4AF37] hover:text-[#0B192C] transition-colors"
              >
                X
              </a>
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 rounded-sm bg-white/10 text-xs text-[#F5F4F0] hover:bg-[#D4AF37] hover:text-[#0B192C] transition-colors"
              >
                Instagram
              </a>
              <a
                href={SOCIAL_LINKS.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 rounded-sm bg-white/10 text-xs text-[#F5F4F0] hover:bg-[#D4AF37] hover:text-[#0B192C] transition-colors"
              >
                TikTok
              </a>
              <a
                href={SOCIAL_LINKS.snapchat}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 rounded-sm bg-white/10 text-xs text-[#F5F4F0] hover:bg-[#D4AF37] hover:text-[#0B192C] transition-colors"
              >
                Snapchat
              </a>
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 rounded-sm bg-white/10 text-xs text-[#F5F4F0] hover:bg-[#D4AF37] hover:text-[#0B192C] transition-colors"
              >
                LinkedIn
              </a>
              <a
                href={SOCIAL_LINKS.linktree}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 rounded-sm bg-[#F4E95B] text-xs text-[#0B192C] font-th-bold hover:bg-white transition-colors flex items-center gap-1"
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
            <ul className="space-y-1.5 text-xs text-[#CBD5E1]">
              <li>
                <a href="#about" className="hover:text-[#F4E95B] transition-colors">
                  {t('navAbout')}
                </a>
              </li>
              <li>
                <a href="#achievements" className="hover:text-[#F4E95B] transition-colors">
                  {t('navAchievements')}
                </a>
              </li>
              <li>
                <a href="#packages" className="hover:text-[#F4E95B] transition-colors">
                  {t('navPackages')}
                </a>
              </li>
              <li>
                <a href="#portfolio" className="hover:text-[#F4E95B] transition-colors">
                  {t('navPortfolio')}
                </a>
              </li>
              <li>
                <a href="#estimator" className="hover:text-[#F4E95B] transition-colors">
                  {t('navEstimator')}
                </a>
              </li>
              <li>
                <a href="#workflow" className="hover:text-[#F4E95B] transition-colors">
                  {t('navWorkflow')}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Engineering Services */}
          <div className="space-y-3">
            <h4 className="text-sm font-th-bold text-[#F5F4F0] font-thmanyah-display">
              {t('footerServices')}
            </h4>
            <ul className="space-y-1.5 text-xs text-[#CBD5E1]">
              <li>
                <span>
                  {isAr
                    ? 'التصميم المعماري والطراز السلماني'
                    : 'Architectural & Salmani Design'}
                </span>
              </li>
              <li>
                <span>
                  {isAr
                    ? 'التصميم الإنشائي ومطابقة كود SBC'
                    : 'SBC-Compliant Structural Engineering'}
                </span>
              </li>
              <li>
                <span>
                  {isAr
                    ? 'التصميم الداخلي والإضاءة الفاخرة'
                    : 'Luxury Interior & Lighting Design'}
                </span>
              </li>
              <li>
                <span>
                  {isAr
                    ? 'الإشراف الميداني وإصدار رخص بلدي'
                    : 'Site Supervision & Balady Permits'}
                </span>
              </li>
              <li>
                <span>
                  {isAr
                    ? 'إصدار شهادات إشغال البناء وإطلاق التيار'
                    : 'Occupancy & IDI Certification'}
                </span>
              </li>
            </ul>
          </div>

          {/* Col 4: Location & Contact */}
          <div className="space-y-3">
            <h4 className="text-sm font-th-bold text-[#F5F4F0] font-thmanyah-display">
              {t('footerHQ')}
            </h4>
            <div className="space-y-2 text-xs text-[#CBD5E1]">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#F4E95B] shrink-0 mt-0.5" />
                <span>
                  {isAr ? OFFICE_INFO.locationAddress : OFFICE_INFO.locationAddressEn}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#F4E95B] shrink-0" />
                <span dir="ltr">{OFFICE_INFO.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#F4E95B] shrink-0" />
                <span>{OFFICE_INFO.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-[#F4E95B] shrink-0" />
                <a
                  href={OFFICE_INFO.website}
                  className="text-[#F5F4F0] hover:text-[#F4E95B] transition-colors font-th-bold"
                  dir="ltr"
                >
                  {OFFICE_INFO.domain}
                </a>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-white/10 border border-white/15 text-xs text-[#F5F4F0] hover:bg-[#D4AF37] hover:text-[#0B192C] transition-all cursor-pointer"
              >
                <span>{t('footerBackToTop')}</span>
                <ArrowUp className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* 3. Bottom Copyright & Official Numbers Bar */}
        <div className="pt-2 flex flex-col lg:flex-row items-center justify-between gap-3 text-xs text-[#CBD5E1]">
          <div>
            {isAr
              ? `جميع الحقوق محفوظة © ${new Date().getFullYear()} ${OFFICE_INFO.officialLegalNameAr}.`
              : `All Rights Reserved © ${new Date().getFullYear()} ${OFFICE_INFO.officialLegalNameEn}.`}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5 text-[11px]">
            <span>{isAr ? `ترخيص SCE: ${OFFICE_INFO.sceLicense}` : `SCE: ${OFFICE_INFO.sceLicense}`}</span>
            <span>•</span>
            <span>{isAr ? `الرقم الوطني الموحد / س.ت: ${OFFICE_INFO.crNumber}` : `CR: ${OFFICE_INFO.crNumber}`}</span>
            <span>•</span>
            <span>{isAr ? `رخصة بلدي: ${OFFICE_INFO.baladyId}` : `Balady: ${OFFICE_INFO.baladyId}`}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
