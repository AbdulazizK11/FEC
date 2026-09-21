export default function ServicesMarqueeStrip() {
  const items = [
    "التصميم المعماري",
    "الهندسة الإنشائية",
    "التصميم الداخلي",
    "الإشراف الهندسي",
    "كفاءة الطاقة",
    "التخطيط العمراني",
    "إصدار رخص البناء",
    "مطابقة كود البناء السعودي",
    "شهادات الإشغال وإتمام البناء",
    "الدراسات الهيدرولوجية وفحص التربة"
  ];

  return (
    <div className="w-full relative z-20 overflow-hidden bg-[#0A0F0B] py-3.5 sm:py-4 select-none border-y border-[#1E2B20]/40 shadow-sm">
      {/* Subtle Ambient Depth */}
      <div className="absolute inset-0 bg-radial from-[#122415]/40 via-[#0A0F0B] to-[#0A0F0B] pointer-events-none" />

      {/* Gentle & Comfortable Top Fade */}
      <div className="absolute top-0 inset-x-0 h-2 sm:h-2.5 bg-gradient-to-b from-black/50 to-transparent pointer-events-none z-10" />

      {/* Gentle & Comfortable Bottom Fade */}
      <div className="absolute bottom-0 inset-x-0 h-2 sm:h-2.5 bg-gradient-to-t from-black/50 to-transparent pointer-events-none z-10" />

      {/* Soft Side Fade Gradients for smooth horizontal entrance/exit */}
      <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-[#0A0F0B] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-[#0A0F0B] to-transparent z-10 pointer-events-none" />

      {/* Marquee Track */}
      <div className="flex overflow-hidden relative z-0">
        <div className="animate-marquee-track flex items-center gap-6 sm:gap-10 whitespace-nowrap">
          {/* First sequence of items */}
          {items.map((item, idx) => (
            <div key={`item-1-${idx}`} className="inline-flex items-center gap-4 sm:gap-6">
              <span className="text-sm sm:text-base md:text-lg lg:text-xl font-th-bold font-thmanyah-display text-[#FFFFFF] tracking-wide">
                {item}
              </span>
              <span 
                className="text-[#F4E95B] text-sm sm:text-base md:text-lg select-none transform hover:rotate-45 transition-transform duration-300 drop-shadow-[0_0_6px_rgba(244,233,91,0.4)]" 
                aria-hidden="true"
              >
                ✦
              </span>
            </div>
          ))}

          {/* Duplicate sequence for seamless 100% infinite loop */}
          {items.map((item, idx) => (
            <div key={`item-2-${idx}`} className="inline-flex items-center gap-4 sm:gap-6">
              <span className="text-sm sm:text-base md:text-lg lg:text-xl font-th-bold font-thmanyah-display text-[#FFFFFF] tracking-wide">
                {item}
              </span>
              <span 
                className="text-[#F4E95B] text-sm sm:text-base md:text-lg select-none transform hover:rotate-45 transition-transform duration-300 drop-shadow-[0_0_6px_rgba(244,233,91,0.4)]" 
                aria-hidden="true"
              >
                ✦
              </span>
            </div>
          ))}

          {/* Triplicate sequence for ultra-wide displays */}
          {items.map((item, idx) => (
            <div key={`item-3-${idx}`} className="inline-flex items-center gap-4 sm:gap-6">
              <span className="text-sm sm:text-base md:text-lg lg:text-xl font-th-bold font-thmanyah-display text-[#FFFFFF] tracking-wide">
                {item}
              </span>
              <span 
                className="text-[#F4E95B] text-sm sm:text-base md:text-lg select-none transform hover:rotate-45 transition-transform duration-300 drop-shadow-[0_0_6px_rgba(244,233,91,0.4)]" 
                aria-hidden="true"
              >
                ✦
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
