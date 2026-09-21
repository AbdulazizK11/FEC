import { WORKFLOW_STAGES, FAQ_ITEMS, OFFICE_INFO } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';
import { 
  Compass, 
  Layers, 
  FileCheck, 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  HelpCircle, 
  ChevronDown,
  MessageSquare
} from 'lucide-react';
import { useState } from 'react';

export default function WorkflowTimeline() {
  const { isAr, t } = useLanguage();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const getIcon = (name: string) => {
    switch (name) {
      case 'Compass': return Compass;
      case 'Layers': return Layers;
      case 'FileCheck': return FileCheck;
      case 'ShieldCheck': return ShieldCheck;
      case 'Award': return Award;
      default: return CheckCircle2;
    }
  };

  const englishWorkflow = [
    {
      step: '01',
      title: 'Initial Consultation & Land Survey',
      desc: 'Free engineering meeting to review deed boundaries, soil report data, zoning codes, and your functional vision.',
      icon: 'Compass',
    },
    {
      step: '02',
      title: '2D Planning & 3D Concepts',
      desc: 'Crafting modern spatial floor plans and photorealistic 3D external/internal renders aligned with your style.',
      icon: 'Layers',
    },
    {
      step: '03',
      title: 'Structural & MEP Integration',
      desc: 'Detailed engineering calculations in full compliance with the Saudi Building Code (SBC) using BIM optimization.',
      icon: 'FileCheck',
    },
    {
      step: '04',
      title: 'Balady & Civil Defense Permits',
      desc: 'Handling digital municipal submissions, approvals, and swift issuance of official construction building permits.',
      icon: 'ShieldCheck',
    },
    {
      step: '05',
      title: 'Site Supervision & Handover',
      desc: 'Engineers inspect reinforcing steel, concrete pours, and structure stages up to final Occupancy Certification.',
      icon: 'Award',
    },
  ];

  const englishFaq = [
    {
      q: 'What are the essential requirements to start building permit drawings in Al-Rass and Al-Qassim?',
      a: 'You will need the official electronic title deed (Sak), Cadastral Survey Decision (Qarar Masahi) issued from the Balady platform, and the geotechnical soil test report. Our team handles everything afterwards directly.',
    },
    {
      q: 'How long does it take from initial architectural design to permit issuance?',
      a: 'The initial concept and floor plans take 7 to 12 business days. Following your approval, detailed SBC structural & MEP plans plus Balady permit issuance typically take 10 to 14 business days.',
    },
    {
      q: 'Does Falaq ensure 100% compliance with Saudi Building Code (SBC) & Balady regulations?',
      a: 'Yes, absolutely. Falaq (FEC) is a licensed Class-A accredited engineering office. All structural, thermal, electrical, and plumbing drawings strictly adhere to SBC 1101 standards and Balady requirements.',
    },
    {
      q: 'Do you offer site inspection and construction supervision during the build phase?',
      a: 'Yes, our certified structural engineers supervise concrete rebar inspections, casting quality tests, structural integrity, and issue certified inspection reports for the 10-year Decennial Structural Insurance (Inherent Defect Insurance - IDI) and final Occupancy Certificate.',
    },
  ];

  const stages = isAr ? WORKFLOW_STAGES : englishWorkflow;
  const faqs = isAr ? FAQ_ITEMS : englishFaq;

  return (
    <section id="workflow" className={`py-20 bg-white relative overflow-hidden border-b border-[#E0E1DC] ${isAr ? 'text-right' : 'text-left'}`}>
      
      {/* Background grid */}
      <div className="absolute inset-0 bg-editorial-grid opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Workflow Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-[#0E1910] text-[#F5F4F0] text-xs font-thmanyah-sans font-th-medium">
            <Layers className="w-3.5 h-3.5 text-[#F4E95B]" />
            <span>{t('workflowBadge')}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-4xl font-th-heavy text-[#000000] font-thmanyah-display">
            {t('workflowTitle')}
          </h2>

          <p className="text-base sm:text-lg text-[#343A2F] leading-relaxed font-thmanyah-text">
            {t('workflowIntro')}
          </p>
        </div>

        {/* 5-Step Process Timeline Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative mb-20">
          {stages.map((stage, idx) => {
            const Icon = getIcon(stage.icon);
            return (
              <div
                key={idx}
                className={`relative bg-[#F5F4F0] rounded-sm border border-[#E0E1DC] p-5 ${isAr ? 'text-right' : 'text-left'} hover:border-[#0E1910] transition-all flex flex-col justify-between group shadow-xs font-thmanyah-sans`}
              >
                <div>
                  {/* Step Number Badge */}
                  <div className="flex items-center justify-between mb-3.5">
                    <span className="text-2xl font-th-heavy text-[#000000] font-thmanyah-display group-hover:text-[#0E1910] transition-colors">
                      {stage.step}
                    </span>
                    <div className="w-8 h-8 rounded-sm bg-white border border-[#E0E1DC] flex items-center justify-center text-[#0E1910]">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-sm font-th-bold text-[#000000] font-thmanyah-display mb-1.5">
                    {stage.title}
                  </h3>

                  <p className="text-xs text-[#343A2F] leading-relaxed font-thmanyah-text">
                    {stage.desc}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-[#E0E1DC] text-[11px] text-[#000000] font-th-medium">
                  {isAr ? 'مرحلة معتمدة وموثقة' : 'Verified & Certified Stage'}
                </div>
              </div>
            );
          })}
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs text-[#0E1910] font-th-bold font-thmanyah-sans">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{t('faqBadge')}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-th-heavy text-[#000000] font-thmanyah-display">
              {t('faqTitle')}
            </h3>
          </div>

          <div className="space-y-2.5">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-sm bg-[#F5F4F0] border border-[#E0E1DC] overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                  className={`w-full p-4 sm:p-5 flex items-center justify-between ${isAr ? 'text-right' : 'text-left'} gap-4 text-[#000000] hover:text-[#0E1910] transition-colors cursor-pointer`}
                >
                  <span className="text-sm sm:text-base font-th-bold font-thmanyah-display">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#0E1910] shrink-0 transition-transform duration-200 ${
                      openFaqIndex === i ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {openFaqIndex === i && (
                  <div className={`px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-[#343A2F] leading-relaxed border-t border-[#E0E1DC] bg-white font-thmanyah-text ${isAr ? 'text-right' : 'text-left'}`}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Quick FAQ WhatsApp CTA */}
          <div className="mt-8 p-5 rounded-sm bg-[#0E1910] text-center space-y-2.5">
            <h4 className="text-base font-th-bold text-[#F5F4F0] font-thmanyah-display">
              {isAr ? 'لديك استفسار خاص بأرضك أو نظام البناء في الرس والقصيم؟' : 'Have questions about your plot or zoning codes in Al-Rass & Al-Qassim?'}
            </h4>
            <p className="text-xs text-[#E0E1DC] font-thmanyah-text">
              {isAr ? 'مهندسونا متاحون للإجابة على كافة التساؤلات الفنية وتوضيح الاشتراطات البلدية مجاناً.' : 'Our engineers are ready to clarify technical requirements and municipal guidelines free of charge.'}
            </p>
            <a
              href={`https://wa.me/${OFFICE_INFO.whatsapp}?text=${encodeURIComponent(isAr ? 'مرحباً مكتب فلق للإستشارات الهندسية (FEC)، لدي استفسار بخصوص اشتراطات البناء ومخططي.' : 'Hello Falaq (FEC), I have an inquiry regarding building regulations and my plot.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-sm bg-[#F5F4F0] text-[#000000] font-th-bold text-xs sm:text-sm hover:bg-[#E0E1DC] transition-colors cursor-pointer font-thmanyah-sans"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#0E1910]" />
              <span>{isAr ? 'استفسر عبر الواتساب الآن' : 'Inquire via WhatsApp Now'}</span>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}

