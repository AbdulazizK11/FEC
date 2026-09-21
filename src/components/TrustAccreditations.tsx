import { ShieldCheck, CheckCircle2 } from 'lucide-react';
import { OFFICE_INFO } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';

export default function TrustAccreditations() {
  const { isAr, t } = useLanguage();

  const trustPartners = isAr ? [
    {
      title: 'الهيئة السعودية للمهندسين',
      subtitle: `رقم الترخيص: ${OFFICE_INFO.sceLicense}`,
      badge: 'مكتب استشاري معتمد',
    },
    {
      title: 'منصة بلدي والأمانات',
      subtitle: `اعتماد الربط الإلكتروني: ${OFFICE_INFO.baladyId}`,
      badge: 'إصدار رخص فوري',
    },
    {
      title: 'كود البناء السعودي (SBC)',
      subtitle: 'SBC 1101 للمباني السكنية وكافة الأكواد',
      badge: 'مطابقة هندسية 100%',
    },
    {
      title: 'تأمين المباني والعيوب الخفية',
      subtitle: 'مخططات مستوفية لشركة ملاذ والتأمين الإلزامي',
      badge: 'معتمد لشركات التأمين',
    },
  ] : [
    {
      title: 'Saudi Council of Engineers (SCE)',
      subtitle: `License No: ${OFFICE_INFO.sceLicense}`,
      badge: 'Certified Consultant Office',
    },
    {
      title: 'Balady Municipal Platform',
      subtitle: `Digital Integration: ${OFFICE_INFO.baladyId}`,
      badge: 'Instant Permit Issuance',
    },
    {
      title: 'Saudi Building Code (SBC)',
      subtitle: 'SBC 1101 Residential & Universal Codes',
      badge: '100% Technical Match',
    },
    {
      title: 'Inherent Defects Insurance',
      subtitle: 'Compliant with Malath & National Insurers',
      badge: 'Insurer Approved',
    },
  ];

  return (
    <section className="py-10 bg-white border-b border-[#E0E1DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className={`flex flex-col md:flex-row items-center justify-between gap-4 mb-6 ${isAr ? 'text-right' : 'text-left'}`}>
          <div>
            <div className={`text-xs font-th-bold text-[#0E1910] flex items-center gap-1.5 font-thmanyah-sans ${isAr ? 'justify-end md:justify-start' : 'justify-start'}`}>
              <ShieldCheck className="w-4 h-4" />
              <span>{t('trustBadge')}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-th-heavy text-[#000000] font-thmanyah-display mt-0.5">
              {t('trustTitle')}
            </h3>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#343A2F] bg-[#F5F4F0] px-3.5 py-1.5 rounded-sm border border-[#E0E1DC] font-thmanyah-sans">
            <span>{t('crLabel')}</span>
            <span className="text-[#000000] font-th-bold">{OFFICE_INFO.crNumber}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 font-thmanyah-sans">
          {trustPartners.map((partner, index) => (
            <div
              key={index}
              className={`p-4 rounded-sm bg-[#F5F4F0] border border-[#E0E1DC] hover:border-[#0E1910] transition-all ${isAr ? 'text-right' : 'text-left'} flex flex-col justify-between shadow-xs`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-th-bold text-[#0E1910] bg-white px-2 py-0.5 rounded-xs border border-[#E0E1DC]">
                    {partner.badge}
                  </span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0E1910]" />
                </div>
                <h4 className="text-sm font-th-bold text-[#000000] font-thmanyah-display">
                  {partner.title}
                </h4>
              </div>
              <p className="text-[11px] text-[#343A2F] mt-2 pt-2 border-t border-[#E0E1DC] font-thmanyah-text">
                {partner.subtitle}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

