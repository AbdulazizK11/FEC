import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ThmanyahBannerScreen() {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Auto-slide transition every 5 seconds
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === 0 ? 1 : 0));
    }, 5200);

    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <div 
      className="w-full max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 mb-8 sm:mb-12 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Thmanyah-Style Dark Curved Screen Frame */}
      <div className="relative w-full min-h-[190px] sm:min-h-[220px] md:min-h-[250px] bg-[#000000] rounded-[24px] sm:rounded-[36px] md:rounded-[44px] border-2 border-[#1E2B20] shadow-2xl flex items-center justify-center px-4 sm:px-8 md:px-14 py-8 sm:py-12 overflow-hidden">
        
        {/* Subtle Ambient Background Depth */}
        <div className="absolute inset-0 bg-radial from-[#0E1F12]/70 via-[#000000] to-[#000000] pointer-events-none rounded-[22px] sm:rounded-[34px] md:rounded-[42px]" />
        <div className="absolute top-0 right-1/4 w-[500px] h-96 bg-[#16361D]/30 rounded-full blur-3xl pointer-events-none" />

        {/* Ambient Light Sweep representing the dawn light of Al-Falaq */}
        <motion.div 
          initial={{ x: '-150%', opacity: 0 }}
          animate={{ x: '250%', opacity: [0, 0.45, 0] }}
          transition={{ duration: 2.2, delay: 0.3, ease: 'easeInOut' }}
          className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-[#F4E95B]/15 to-transparent skew-x-12 pointer-events-none" 
        />

        {/* Dynamic Screen Content with Smooth Transitions */}
        <div className="relative z-10 w-full flex items-center justify-center py-2">
          <AnimatePresence mode="wait">
            {currentSlide === 0 ? (
              /* SLIDE 1: "الفَلَق هو النور الذي يشقّ ظلمة الليل، ويعلن بداية الصباح." - Uniform Large 1 Line */
              <motion.div
                key="slide-1"
                initial={{ opacity: 0, scale: 0.98, filter: 'blur(3px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 1.02, filter: 'blur(3px)' }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="w-full text-center px-2 sm:px-4 flex items-center justify-center"
              >
                <div className="w-full flex items-center justify-center py-1">
                  <h2 className="text-sm sm:text-xl md:text-2xl lg:text-[34px] xl:text-[38px] font-th-bold font-thmanyah-display text-[#FFFFFF] tracking-tight whitespace-nowrap text-center leading-normal sm:leading-relaxed select-none">
                    الفَـلَـق هو النور الذي يشقّ ظلمة الليل، ويعلن بداية الصباح.
                  </h2>
                </div>
              </motion.div>
            ) : (
              /* SLIDE 2: Arabic & English Office Name - Uniform Large 1 Line */
              <motion.div
                key="slide-2"
                initial={{ opacity: 0, scale: 0.98, filter: 'blur(3px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 1.02, filter: 'blur(3px)' }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="w-full flex flex-row items-center justify-between gap-4 sm:gap-8 px-2 sm:px-6 whitespace-nowrap py-1"
              >
                {/* Right Side: Arabic Name ("فَلَق للاستشارات الهندسية") */}
                <div className="text-right flex items-center justify-start shrink-0">
                  <h2 className="text-sm sm:text-xl md:text-2xl lg:text-[34px] xl:text-[38px] font-th-bold font-thmanyah-display text-[#FFFFFF] tracking-normal leading-normal sm:leading-relaxed select-none">
                    فَـلَـق للاستشارات الهندسية
                  </h2>
                </div>

                {/* Left Side: English Office Name ("Falaq Engineering Consultant") */}
                <div className="text-left shrink-0">
                  <span className="text-sm sm:text-xl md:text-2xl lg:text-[32px] xl:text-[36px] font-bold font-serif text-[#FFFFFF] tracking-normal block font-thmanyah-display leading-normal sm:leading-relaxed select-none">
                    Falaq Engineering Consultant
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Slide Indicators */}
        <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
          <button
            onClick={() => setCurrentSlide(0)}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              currentSlide === 0 
                ? 'w-7 sm:w-8 h-1.5 bg-[#F4E95B]' 
                : 'w-2 h-1.5 bg-[#E0E1DC]/30 hover:bg-[#E0E1DC]/60'
            }`}
            aria-label="الشاشة الأولى: تعريف الفلق"
          />
          <button
            onClick={() => setCurrentSlide(1)}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              currentSlide === 1 
                ? 'w-7 sm:w-8 h-1.5 bg-[#F4E95B]' 
                : 'w-2 h-1.5 bg-[#E0E1DC]/30 hover:bg-[#E0E1DC]/60'
            }`}
            aria-label="الشاشة الثانية: اسم المكتب"
          />
        </div>

        {/* Manual Navigation Controls */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev === 0 ? 1 : 0))}
          className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 p-2 rounded-full text-[#E0E1DC]/40 hover:text-[#FFFFFF] hover:bg-white/10 transition-colors z-20 hidden sm:flex items-center justify-center cursor-pointer"
          aria-label="السابق"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <button
          onClick={() => setCurrentSlide((prev) => (prev === 0 ? 1 : 0))}
          className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 p-2 rounded-full text-[#E0E1DC]/40 hover:text-[#FFFFFF] hover:bg-white/10 transition-colors z-20 hidden sm:flex items-center justify-center cursor-pointer"
          aria-label="التالي"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

      </div>
    </div>
  );
}
