import { motion } from 'motion/react';
import { OFFICE_INFO, STATS_DATA } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';
import ThmanyahBannerScreen from './ThmanyahBannerScreen';
import ServicesMarqueeStrip from './ServicesMarqueeStrip';
import InteractiveVillaBackground from './InteractiveVillaBackground';
import { 
  MessageSquare, 
  ArrowLeft, 
  ShieldCheck, 
  MapPin,
  ChevronDown
} from 'lucide-react';

interface HeroProps {
  onExploreClick?: () => void;
  onEstimateClick?: () => void;
}

export default function Hero({ onExploreClick, onEstimateClick }: HeroProps) {
  const { isAr, t } = useLanguage();

  return (
    <section 
      id="hero" 
      className="relative flex flex-col items-center justify-center pt-24 sm:pt-28 pb-0 overflow-hidden bg-[#F5F4F0] border-b border-[#E0E1DC] min-h-[92vh]"
    >
      {/* 1. Cinematic Architectural Villa Background - First and continuous element visible upon opening */}
      <InteractiveVillaBackground />
      
      {/* Subtle Corner Architectural Accents: Top-Left & Bottom-Right */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="absolute top-24 left-8 w-16 h-16 border-l border-t border-[#343A2F]/30 pointer-events-none hidden sm:block z-10" 
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="absolute bottom-24 right-8 w-16 h-16 border-r border-b border-[#343A2F]/30 pointer-events-none hidden sm:block z-10" 
      />

      {/* 2. SECOND STAGE: Black Curved Screen ("الفَلَق هو النور...") */}
      <motion.div 
        initial={{ opacity: 0, y: 25, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ 
          duration: 0.55, 
          delay: 0.2, 
          ease: [0.16, 1, 0.3, 1] 
        }}
        className="relative z-20 w-full pt-1 sm:pt-3"
      >
        <ThmanyahBannerScreen />
      </motion.div>

      {/* 3. THIRD STAGE: The Content & Text */}
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full text-center">
        
        {/* Top Badges: Saudi Accreditation & Location */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-2.5 mb-6"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0E1910] text-[#F5F4F0] text-xs font-thmanyah-sans font-th-medium shadow-sm transition-transform hover:scale-105">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F4E95B] animate-pulse" />
            <ShieldCheck className="w-3.5 h-3.5 text-[#F4E95B]" />
            <span>{t('heroBadgeAccredited')}</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-xs border border-[#E0E1DC] text-xs text-[#343A2F] font-thmanyah-sans shadow-xs transition-transform hover:scale-105">
            <span className="font-th-bold text-[#0E1910]">FEC</span>
            <span className="text-[#E0E1DC]">|</span>
            <MapPin className="w-3 h-3 text-[#C0886A]" />
            <span>{t('locationShort')}</span>
          </div>
        </motion.div>

        {/* Headline & Subtitles with Staggered Cascading Reveal */}
        <div className="space-y-4 max-w-4xl mx-auto">
          {/* Brand Eyebrow Tag */}
          <motion.span 
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.48, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs sm:text-sm font-thmanyah-sans font-th-bold uppercase tracking-widest text-[#343A2F] block"
          >
            FALAQ ENGINEERING CONSULTANTS • FEC
          </motion.span>
          
          {/* Main H1 Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-5xl lg:text-[56px] font-th-heavy text-[#000000] tracking-tight leading-[1.25] font-thmanyah-display"
          >
            {isAr ? (
              <>
                مكتب <span className="text-[#0E1910] relative inline-block underline decoration-[#C0886A]/50 decoration-2 underline-offset-8">
                  فَلَق
                </span> للإستشارات الهندسية
              </>
            ) : (
              <>
                <span className="text-[#0E1910] relative inline-block underline decoration-[#C0886A]/50 decoration-2 underline-offset-8">
                  Falaq
                </span> Engineering Consultancy
              </>
            )}
          </motion.h1>

          {/* Subtitle */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.62, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl sm:text-2xl lg:text-3xl font-th-bold text-[#0E1910] font-thmanyah-display pt-1"
          >
            {t('heroSubtitle')}
          </motion.div>

          {/* Descriptive Paragraph */}
          <motion.p 
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.68, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg text-[#343A2F] max-w-3xl mx-auto leading-relaxed font-thmanyah-text pt-2"
          >
            {t('heroDescription')}
          </motion.p>
        </div>

        {/* CTAs with Engaging Entrance & Hover Effects */}
        <motion.div 
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.74, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-3.5 pt-6 sm:pt-8"
        >
          <motion.a
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            id="hero-whatsapp-cta"
            href={`https://wa.me/${OFFICE_INFO.whatsapp}?text=${encodeURIComponent(
              'مرحباً مكتب فلق (FEC)، أود الاستفسار عن باقات التصميم والإشراف الهندسي لمشروعي.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-sm bg-[#0E1910] hover:bg-[#000000] text-[#F5F4F0] font-th-bold text-sm sm:text-base shadow-md transition-all border border-[#0E1910] font-thmanyah-sans cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 text-[#F4E95B]" />
            <span>{t('heroCtaWhatsApp')}</span>
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            id="hero-explore-cta"
            href="#packages"
            onClick={onExploreClick}
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-sm bg-white/95 hover:bg-[#E0E1DC]/40 text-[#000000] border border-[#E0E1DC] hover:border-[#343A2F] font-th-bold text-sm sm:text-base transition-all font-thmanyah-sans cursor-pointer shadow-xs"
          >
            <span>{t('heroCtaExplore')}</span>
            <ArrowLeft className="w-4 h-4 text-[#0E1910]" />
          </motion.a>
        </motion.div>

        {/* Trust Stats Counter Bar - Cascading Cards raised up to replace micro-trust list */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 pt-6 border-t border-[#E0E1DC]/80 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-right"
        >
          {STATS_DATA.map((stat, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.82 + idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="p-5 rounded-sm bg-white/90 backdrop-blur-xs border border-[#E0E1DC] hover:border-[#343A2F] transition-colors shadow-xs text-center cursor-default"
            >
              <div className="text-2xl sm:text-3xl font-th-black text-[#0E1910] font-thmanyah-sans mb-1">
                {isAr ? stat.value : (stat.valueEn || stat.value)}
              </div>
              <div className="text-xs sm:text-sm font-th-bold text-[#000000] font-thmanyah-display mb-0.5">
                {isAr ? stat.label : (stat.labelEn || stat.label)}
              </div>
              <div className="text-[11px] text-[#343A2F] font-thmanyah-sans">
                {isAr ? stat.sub : (stat.subEn || stat.sub)}
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>

      {/* Down Scroll Arrow */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.95 }}
        className="mt-8 mb-6 text-[#343A2F] animate-bounce pointer-events-none hidden md:block z-10"
      >
        <ChevronDown className="w-4 h-4 text-[#0E1910]" />
      </motion.div>

      {/* 4. Animated Services Marquee Strip (Continuous Horizontal Ribbon) */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
        className="w-full mt-4 z-20"
      >
        <ServicesMarqueeStrip />
      </motion.div>
    </section>
  );
}

