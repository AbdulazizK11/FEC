import { useState, useEffect } from 'react';
import { OFFICE_INFO } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';
import { MessageSquare, Phone, Calculator, ChevronUp } from 'lucide-react';

interface StickyActionBarProps {
  onOpenEstimator?: () => void;
}

export default function StickyActionBar({ onOpenEstimator }: StickyActionBarProps) {
  const { isAr, t } = useLanguage();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Floating WhatsApp Action Button */}
      <div className={`fixed bottom-6 ${isAr ? 'left-6' : 'right-6'} z-40 flex flex-col items-center gap-2.5 font-thmanyah-sans`}>
        
        {/* Scroll To Top Button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            aria-label={t('footerBackToTop')}
            className="w-9 h-9 rounded-sm bg-white text-[#000000] border border-[#E0E1DC] hover:border-[#0E1910] flex items-center justify-center shadow-md transition-all hover:scale-105 cursor-pointer animate-in fade-in"
          >
            <ChevronUp className="w-4 h-4" />
          </button>
        )}

        {/* Primary Floating WhatsApp Pulse Button */}
        <a
          id="floating-whatsapp-btn"
          href={`https://wa.me/${OFFICE_INFO.whatsapp}?text=${encodeURIComponent(isAr ? 'مرحباً مكتب فلق للإستشارات الهندسية (FEC)، أود استشارة هندسية سريعة.' : 'Hello Falaq Engineering (FEC), I would like to inquire about engineering consultation.')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-center w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-[#0E1910] hover:bg-[#000000] text-[#F5F4F0] shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer border border-[#343A2F]"
          aria-label={isAr ? "تواصل عبر الواتساب" : "Chat on WhatsApp"}
        >
          {/* Animated ping ring */}
          <span className="absolute -inset-0.5 rounded-full bg-[#0E1910]/30 animate-ping pointer-events-none" />
          
          <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-[#F4E95B] relative z-10" />

          {/* Tooltip on hover */}
          <span className={`absolute ${isAr ? 'right-14' : 'left-14'} bg-[#0E1910] text-[#F5F4F0] text-xs font-th-bold py-1.5 px-3 rounded-sm border border-[#343A2F] shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none hidden sm:block`}>
            {isAr ? 'تحدث معنا على الواتساب 💬' : 'Chat on WhatsApp 💬'}
          </span>
        </a>
      </div>

      {/* Mobile Sticky Bottom Floating Bar */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0E1910] border-t border-[#343A2F] p-2 flex items-center justify-around gap-2 font-thmanyah-sans">
        <a
          href={`https://wa.me/${OFFICE_INFO.whatsapp}?text=${encodeURIComponent(isAr ? 'مرحباً مكتب فلق (FEC)، أود استشارة هندسية.' : 'Hello Falaq (FEC), I would like an engineering consultation.')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xs bg-[#F4E95B] text-[#000000] text-xs font-th-bold shadow-xs"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>{isAr ? 'واتساب فوري' : 'WhatsApp'}</span>
        </a>

        <a
          href={`tel:${OFFICE_INFO.phone}`}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xs bg-[#343A2F] text-[#F5F4F0] text-xs font-th-medium border border-[#343A2F]"
        >
          <Phone className="w-3.5 h-3.5 text-[#E0E1DC]" />
          <span>{isAr ? 'اتصال' : 'Call'}</span>
        </a>

        <a
          href="#estimator"
          onClick={() => onOpenEstimator && onOpenEstimator()}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xs bg-black text-[#F5F4F0] text-xs font-th-medium border border-[#343A2F]"
        >
          <Calculator className="w-3.5 h-3.5 text-[#F4E95B]" />
          <span>{isAr ? 'حاسبة التكلفة' : 'Estimator'}</span>
        </a>
      </div>
    </>
  );
}

