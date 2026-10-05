import { useState, useEffect, useRef } from 'react';
import { 
  ACHIEVEMENT_METRICS, 
  SECTOR_ACHIEVEMENTS, 
  CLIENT_TESTIMONIALS, 
  OFFICE_INFO,
  AchievementMetric 
} from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';
import { 
  Building2, 
  Users2, 
  GraduationCap, 
  Layers, 
  ShieldCheck, 
  TrendingUp, 
  Star, 
  Award, 
  Sparkles, 
  CheckCircle2, 
  ArrowLeft,
  ArrowRight,
  MessageSquare,
  Calculator,
  Quote
} from 'lucide-react';

// Icon Map resolver
function MetricIcon({ name, className }: { name: string; className?: string }) {
  switch (name) {
    case 'Building2':
      return <Building2 className={className} />;
    case 'Users2':
      return <Users2 className={className} />;
    case 'GraduationCap':
      return <GraduationCap className={className} />;
    case 'Layers':
      return <Layers className={className} />;
    case 'ShieldCheck':
      return <ShieldCheck className={className} />;
    case 'TrendingUp':
      return <TrendingUp className={className} />;
    default:
      return <Award className={className} />;
  }
}

// Convert numbers to Arabic numeral string with comma formatting
function formatArabicNumber(num: number): string {
  const formatted = num.toLocaleString('en-US');
  const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return formatted.replace(/[0-9]/g, (d) => arabicDigits[parseInt(d, 10)]);
}

// Custom Hook & Component for Smooth Animated Counter
interface AnimatedCounterProps {
  target: number;
  duration?: number; // ms
  prefix?: string;
  suffix?: string;
  isVisible: boolean;
  useArabicDigits?: boolean;
}

function AnimatedCounter({
  target,
  duration = 2200,
  prefix = '',
  suffix = '',
  isVisible,
  useArabicDigits = true,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) {
      return;
    }

    let startTimestamp: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.floor(easeOutExpo * target);
      setCount(current);

      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    animationFrameId = window.requestAnimationFrame(step);

    return () => {
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [target, duration, isVisible]);

  const displayString = useArabicDigits
    ? formatArabicNumber(count)
    : count.toLocaleString('en-US');

  return (
    <span className="font-thmanyah-sans font-th-black tracking-tight tabular-nums inline-block" dir="ltr">
      {suffix && <span className="text-xl sm:text-2xl font-th-bold text-[#0E1910] ml-1">{suffix}</span>}
      <span>{displayString}</span>
      {prefix && <span className="text-xl sm:text-2xl font-th-bold text-[#0E1910] mr-1">{prefix}</span>}
    </span>
  );
}

interface OurAchievementsProps {
  onOpenEstimator?: () => void;
}

export default function OurAchievements({ onOpenEstimator }: OurAchievementsProps) {
  const { isAr, t } = useLanguage();
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isInView, setIsInView] = useState(false);
  const [activeTab, setActiveTab] = useState<'metrics' | 'sectors' | 'testimonials'>('metrics');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const englishSectors = [
    {
      title: 'Luxury Residential Villas & Palaces',
      percentage: 70,
      count: 384,
      description: 'Modern, neoclassical, and Salmani luxury villas with full BIM structural modeling and interior fit-out plans.',
    },
    {
      title: 'Commercial Centers & Office Plazas',
      percentage: 20,
      count: 110,
      description: 'Retail stores, multi-story commercial buildings, strip malls, and corporate offices approved by Balady.',
    },
    {
      title: 'Private Resorts, Chalets & Farms',
      percentage: 15,
      count: 80,
      description: 'Recreational country houses, eco-resorts, and hospitality destinations designed for privacy and leisure.',
    },
    {
      title: 'Occupancy Certificates & Supervisions',
      percentage: 98,
      count: 540,
      description: 'Guaranteed municipal compliance inspections without power grid connection delays across Al Qassim.',
    },
  ];

  const englishTestimonials = [
    {
      id: '1',
      author: 'Abu Fahad Al-Mutairi',
      project: 'Modern Villa (680 m²) - Ar Rass',
      package: 'Comprehensive Package',
      rating: 5,
      comment: 'Superb accuracy and professional follow-up with Dr. Faisal and the team. The structural optimization saved a significant quantity of steel, and the Balady building permit was approved in two days.',
      date: 'May 2026',
    },
    {
      id: '2',
      author: 'Eng. Khalid Al-Ghamdi',
      project: 'Al-Manar Commercial Plaza - Al Qassim',
      package: 'Premium Package',
      rating: 5,
      comment: 'Outstanding architectural creativity and rigorous adherence to the Saudi Building Code. The 3D facades and shop drawings facilitated smooth contractor execution.',
      date: 'April 2026',
    },
    {
      id: '3',
      author: 'Dr. Sultan Al-Harbi',
      project: 'Contemporary Rest Resort - Unaizah',
      package: 'Comprehensive Package',
      rating: 5,
      comment: 'Top-tier consulting office with true academic depth. Everything from soil study to occupancy certificate was handled flawlessly.',
      date: 'June 2026',
    },
  ];

  const sectors = isAr ? SECTOR_ACHIEVEMENTS : englishSectors;
  const testimonials = isAr ? CLIENT_TESTIMONIALS : englishTestimonials;

  return (
    <section
      id="achievements"
      ref={sectionRef}
      className={`py-20 bg-[#F5F4F0] relative overflow-hidden border-b border-[#E0E1DC] ${isAr ? 'text-right' : 'text-left'}`}
    >
      {/* Editorial Grid Background */}
      <div className="absolute inset-0 bg-editorial-grid opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-[#0E1910] text-[#F5F4F0] text-xs font-thmanyah-sans font-th-medium">
            <Sparkles className="w-3.5 h-3.5 text-[#F4E95B]" />
            <span>{t('achievementsBadge')}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-4xl font-th-heavy text-[#000000] font-thmanyah-display">
            {t('achievementsTitle')}
          </h2>

          <p className="text-base sm:text-lg text-[#343A2F] leading-relaxed font-thmanyah-text">
            {t('achievementsSubtitle')}
          </p>

          {/* Interactive Category Selector Pills */}
          <div className="flex items-center justify-center gap-2 pt-3 flex-wrap font-thmanyah-sans">
            <button
              onClick={() => setActiveTab('metrics')}
              className={`px-4 py-1.5 rounded-sm text-xs sm:text-sm font-th-bold transition-all cursor-pointer ${
                activeTab === 'metrics'
                  ? 'bg-[#0E1910] text-[#F5F4F0] shadow-xs'
                  : 'bg-white text-[#343A2F] hover:text-[#000000] border border-[#E0E1DC]'
              }`}
            >
              {t('achievementsTabMetrics')}
            </button>

            <button
              onClick={() => setActiveTab('sectors')}
              className={`px-4 py-1.5 rounded-sm text-xs sm:text-sm font-th-bold transition-all cursor-pointer ${
                activeTab === 'sectors'
                  ? 'bg-[#0E1910] text-[#F5F4F0] shadow-xs'
                  : 'bg-white text-[#343A2F] hover:text-[#000000] border border-[#E0E1DC]'
              }`}
            >
              {t('achievementsTabSectors')}
            </button>

            <button
              onClick={() => setActiveTab('testimonials')}
              className={`px-4 py-1.5 rounded-sm text-xs sm:text-sm font-th-bold transition-all cursor-pointer ${
                activeTab === 'testimonials'
                  ? 'bg-[#0E1910] text-[#F5F4F0] shadow-xs'
                  : 'bg-white text-[#343A2F] hover:text-[#000000] border border-[#E0E1DC]'
              }`}
            >
              {t('achievementsTabTestimonials')}
            </button>
          </div>
        </div>

        {/* View 1: Main Animated KPI Metrics Cards */}
        {activeTab === 'metrics' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* 3 Main Highlight Metric Hero Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Metric 1: Projects Completed */}
              <div 
                id="metric-card-projects"
                className={`relative overflow-hidden rounded-sm bg-white border border-[#E0E1DC] p-7 shadow-xs hover:border-[#343A2F] transition-all group ${isAr ? 'text-right' : 'text-left'}`}
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="w-12 h-12 rounded-sm bg-[#0E1910] flex items-center justify-center text-[#F4E95B] group-hover:scale-105 transition-transform">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-th-bold px-2 py-0.5 rounded-sm bg-[#F5F4F0] text-[#0E1910] border border-[#E0E1DC] font-thmanyah-sans">
                    {t('metricTagDocumented')}
                  </span>
                </div>

                <div className="space-y-1 mb-3">
                  <div className="text-4xl sm:text-5xl text-[#0E1910]">
                    <AnimatedCounter
                      target={554}
                      prefix="+"
                      isVisible={isInView}
                      useArabicDigits={isAr}
                    />
                  </div>
                  <h3 className="text-base sm:text-lg font-th-bold text-[#000000] font-thmanyah-display">
                    {isAr ? 'المشاريع المعمارية والإنشائية' : 'Architectural & Structural Projects'}
                  </h3>
                  <p className="text-xs text-[#343A2F] font-thmanyah-sans">
                    {isAr ? 'سكني، تجاري، سياحي، وإداري معتمد' : 'Residential, Commercial & Hospitality'}
                  </p>
                </div>

                <p className="text-xs text-[#343A2F] leading-relaxed border-t border-[#E0E1DC] pt-3 font-thmanyah-text">
                  {isAr 
                    ? 'أكثر من ٥٥٤ فيلا ومجمعاً تجارياً تم إعداد مخططاتها التنفيذية وإصدار رخصها عبر منصة بلدي بدقة هندسية تامة.'
                    : 'Over 554 villas and commercial complexes designed with execution blueprints and licensed via Balady platform.'}
                </p>
              </div>

              {/* Metric 2: Happy Clients */}
              <div 
                id="metric-card-clients"
                className={`relative overflow-hidden rounded-sm bg-white border border-[#E0E1DC] p-7 shadow-xs hover:border-[#343A2F] transition-all group ${isAr ? 'text-right' : 'text-left'}`}
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="w-12 h-12 rounded-sm bg-[#0E1910] flex items-center justify-center text-[#F4E95B] group-hover:scale-105 transition-transform">
                    <Users2 className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-th-bold px-2 py-0.5 rounded-sm bg-[#F5F4F0] text-[#0E1910] border border-[#E0E1DC] font-thmanyah-sans">
                    {t('metricTagSatisfaction')}
                  </span>
                </div>

                <div className="space-y-1 mb-3">
                  <div className="text-4xl sm:text-5xl text-[#0E1910]">
                    <AnimatedCounter
                      target={480}
                      prefix="+"
                      isVisible={isInView}
                      useArabicDigits={isAr}
                    />
                  </div>
                  <h3 className="text-base sm:text-lg font-th-bold text-[#000000] font-thmanyah-display">
                    {isAr ? 'العملاء والشركاء السعداء' : 'Happy Clients & Partners'}
                  </h3>
                  <p className="text-xs text-[#343A2F] font-thmanyah-sans">
                    {isAr ? 'أصحاب فلل ومستثمرون عقاريون' : 'Property Owners & Real Estate Investors'}
                  </p>
                </div>

                <p className="text-xs text-[#343A2F] leading-relaxed border-t border-[#E0E1DC] pt-3 font-thmanyah-text">
                  {isAr 
                    ? 'علاقات ثقة ممتدة ناتجة عن الاستماع الدقيق لاحتياجات الأسرة وتوفير حلول تصميمية فريدة تلائم ميزانيتهم وتطلعاتهم.'
                    : 'Enduring trust built upon attentive consultation, tailored floorplans, and family privacy solutions within budget.'}
                </p>
              </div>

              {/* Metric 3: Years of Experience */}
              <div 
                id="metric-card-experience"
                className={`relative overflow-hidden rounded-sm bg-white border border-[#E0E1DC] p-7 shadow-xs hover:border-[#343A2F] transition-all group ${isAr ? 'text-right' : 'text-left'}`}
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="w-12 h-12 rounded-sm bg-[#0E1910] flex items-center justify-center text-[#F4E95B] group-hover:scale-105 transition-transform">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-th-bold px-2 py-0.5 rounded-sm bg-[#F5F4F0] text-[#0E1910] border border-[#E0E1DC] font-thmanyah-sans">
                    {t('metricTagDegree')}
                  </span>
                </div>

                <div className="space-y-1 mb-3">
                  <div className="text-4xl sm:text-5xl text-[#0E1910]">
                    <AnimatedCounter
                      target={18}
                      prefix="+"
                      suffix={isAr ? 'عاماً' : 'Years'}
                      isVisible={isInView}
                      useArabicDigits={isAr}
                    />
                  </div>
                  <h3 className="text-base sm:text-lg font-th-bold text-[#000000] font-thmanyah-display">
                    {isAr ? 'الخبرة الأكاديمية والميدانية' : 'Academic & Field Experience'}
                  </h3>
                  <p className="text-xs text-[#343A2F] font-thmanyah-sans">
                    {isAr ? 'مستشارون معتمدون لدى هيئة المهندسين' : 'SCE Certified Consulting Engineers'}
                  </p>
                </div>

                <p className="text-xs text-[#343A2F] leading-relaxed border-t border-[#E0E1DC] pt-3 font-thmanyah-text">
                  {isAr 
                    ? 'خبرة تراكمية في التدريس الجامعي، اللجان الاستشارية لكود البناء السعودي، وإدارة كبرى المشاريع بالمنطقة.'
                    : 'Proven track record in engineering academia, Saudi Building Code advisory panels, and large-scale project management.'}
                </p>
              </div>

            </div>

            {/* Value Engineering Highlight - Spans Full Width */}
            <div className={`p-6 sm:p-7 rounded-sm bg-white border border-[#E0E1DC] shadow-xs hover:border-[#343A2F] transition-all flex flex-col md:flex-row items-center justify-between gap-6 ${isAr ? 'text-right' : 'text-left'}`}>
              <div className="flex items-center gap-4 sm:gap-5 w-full md:w-auto">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-sm bg-[#F5F4F0] text-[#0E1910] flex items-center justify-center shrink-0 border border-[#E0E1DC]">
                  <TrendingUp className="w-6 h-6 sm:w-7 sm:h-7 text-[#0E1910]" />
                </div>
                <div>
                  <h4 className="text-base sm:text-lg lg:text-xl font-th-bold text-[#000000] font-thmanyah-display mb-1">
                    {isAr ? 'متخصصين في هندسة القيمة وتحقيق التصميم الإنشائي الأمثل' : 'Specialists in Value Engineering & Optimal Structural Design'}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#343A2F] font-thmanyah-sans">
                    {isAr ? 'عبر النمذجة الإنشائية ثلاثية الأبعاد' : 'Through advanced 3D structural modeling'}
                  </p>
                </div>
              </div>

              <div className="shrink-0 flex items-center gap-2 self-start md:self-center">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-th-black text-[#000000] font-thmanyah-sans">
                  <AnimatedCounter
                    target={25}
                    suffix={isAr ? '٪' : '%'}
                    isVisible={isInView}
                    useArabicDigits={isAr}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* View 2: Sectors Breakdown with Animated Bars */}
        {activeTab === 'sectors' && (
          <div className="bg-white rounded-sm border border-[#E0E1DC] p-6 sm:p-8 space-y-6 animate-in fade-in duration-300 shadow-xs">
            <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E0E1DC] pb-4 ${isAr ? 'text-right' : 'text-left'}`}>
              <div>
                <h3 className="text-lg sm:text-xl font-th-bold text-[#000000] font-thmanyah-display">
                  {isAr ? 'حجم المشاريع المعتمدة حسب التصنيف الإنشائي' : 'Approved Project Volume by Structural Sector'}
                </h3>
                <p className="text-xs text-[#343A2F] mt-0.5 font-thmanyah-sans">
                  {isAr 
                    ? 'توزيع موثق للمشاريع المنفذة تحت إشراف وتصميم مكتب فلق للإستشارات الهندسية (FEC)'
                    : 'Documented distribution of projects designed and supervised by Falaq Consultants (FEC)'}
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-[#F5F4F0] text-[#0E1910] text-xs font-th-bold border border-[#E0E1DC] font-thmanyah-sans">
                <Award className="w-3.5 h-3.5 text-[#0E1910]" />
                <span>{isAr ? 'إجمالي +٥٥٤ مشروع منجز' : 'Total +554 Completed Projects'}</span>
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sectors.map((sector, index) => (
                <div key={index} className={`p-4 rounded-sm bg-[#F5F4F0] border border-[#E0E1DC] space-y-2.5 ${isAr ? 'text-right' : 'text-left'}`}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-th-bold text-[#000000] font-thmanyah-display">
                      {sector.title}
                    </span>
                    <span className="text-sm font-th-black text-[#0E1910] font-thmanyah-sans">
                      {isAr ? `${formatArabicNumber(sector.count)} مشروع` : `${sector.count} Projects`}
                    </span>
                  </div>

                  {/* Progress fill bar */}
                  <div className="w-full bg-[#E0E1DC] h-2 rounded-sm overflow-hidden">
                    <div
                      className="bg-[#0E1910] h-full transition-all duration-1000 ease-out"
                      style={{
                        width: isInView ? `${sector.percentage}%` : '0%',
                      }}
                    />
                  </div>

                  <p className="text-xs text-[#343A2F] leading-relaxed font-thmanyah-text">
                    {sector.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Quality Statement */}
            <div className="p-3.5 rounded-sm bg-[#F5F4F0] border border-[#E0E1DC] flex items-center justify-between flex-wrap gap-3 text-xs text-[#343A2F] font-thmanyah-sans">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0E1910] shrink-0" />
                <span>
                  {isAr 
                    ? 'كافة المشاريع خاضعة لكود البناء السعودي ومعتمدة ومسجلة رسمياً عبر منصة بلدي.'
                    : 'All projects strictly adhere to SBC regulations and are officially approved via Balady platform.'}
                </span>
              </div>
              <a
                href="#portfolio"
                className="text-[#0E1910] hover:underline font-th-bold inline-flex items-center gap-1"
              >
                <span>{isAr ? 'تصفح معرض المشاريع' : 'Browse Project Portfolio'}</span>
                {isAr ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
              </a>
            </div>
          </div>
        )}

        {/* View 3: Client Testimonials & Social Proof */}
        {activeTab === 'testimonials' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className={`p-6 rounded-sm bg-white border border-[#E0E1DC] hover:border-[#343A2F] transition-all flex flex-col justify-between group shadow-xs relative ${isAr ? 'text-right' : 'text-left'}`}
                >
                  <Quote className={`absolute top-5 ${isAr ? 'left-5' : 'right-5'} w-6 h-6 text-[#E0E1DC] group-hover:text-[#0E1910]/20 transition-colors`} />

                  <div className="space-y-3 mb-5 relative z-10">
                    {/* Stars & Verified */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-0.5 text-[#C0886A]">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded-sm bg-[#F5F4F0] text-[#0E1910] border border-[#E0E1DC] font-thmanyah-sans font-th-medium">
                        {t('verifiedClient')}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-[#343A2F] leading-relaxed italic font-thmanyah-text">
                      "{testimonial.comment}"
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#E0E1DC]">
                    <div className="font-th-bold text-[#000000] text-sm font-thmanyah-display">
                      {testimonial.author}
                    </div>
                    <div className="text-xs text-[#0E1910] font-th-medium mt-0.5 font-thmanyah-sans">
                      {testimonial.project}
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-[#343A2F] mt-2 font-thmanyah-sans">
                      <span>{testimonial.package}</span>
                      <span>{testimonial.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Google / Local Reviews Summary Box */}
            <div className={`p-5 rounded-sm bg-white border border-[#E0E1DC] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs ${isAr ? 'text-right' : 'text-left'}`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-sm bg-[#0E1910] text-[#F5F4F0] flex items-center justify-center font-th-bold text-lg font-thmanyah-sans shadow-xs">
                  {isAr ? '٥.٠' : '5.0'}
                </div>
                <div>
                  <div className="flex items-center gap-1 text-[#C0886A] mb-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                    <span className="text-xs font-th-bold text-[#000000] mr-2 ml-2 font-thmanyah-sans">{t('excellentRating')}</span>
                  </div>
                  <p className="text-xs text-[#343A2F] font-thmanyah-sans">
                    {t('reviewsBasedOn')}
                  </p>
                </div>
              </div>

              <a
                href={`https://wa.me/${OFFICE_INFO.whatsapp}?text=${encodeURIComponent(
                  isAr
                    ? 'مرحباً مكتب فلق (FEC)، اطلعت على سجل إنجازاتكم وأود استشارة هندسية لمشروعي.'
                    : 'Hello Falaq (FEC), I reviewed your achievements and would like to request an engineering consultation.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-[#0E1910] hover:bg-[#000000] text-[#F5F4F0] text-xs font-th-bold shadow-xs transition-all hover:scale-101 cursor-pointer whitespace-nowrap font-thmanyah-sans border border-[#0E1910]"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#F4E95B]" />
                <span>{t('joinSuccessPartners')}</span>
              </a>
            </div>
          </div>
        )}

        {/* Bottom Social Proof Trust Strip */}
        <div className={`mt-14 pt-8 border-t border-[#E0E1DC] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#343A2F] font-thmanyah-sans ${isAr ? 'text-right' : 'text-left'}`}>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-th-bold text-[#000000]">
              {isAr ? 'الاعتمادات والتراخيص الرسمية:' : 'Official Accreditations & Licenses:'}
            </span>
            <span className="px-2 py-0.5 rounded-sm bg-white border border-[#E0E1DC] text-[#343A2F]">
              {isAr ? `الهيئة السعودية للمهندسين (${OFFICE_INFO.sceLicense})` : `SCE License (${OFFICE_INFO.sceLicense})`}
            </span>
            <span className="px-2 py-0.5 rounded-sm bg-white border border-[#E0E1DC] text-[#343A2F]">
              {isAr ? `منصة بلدي (${OFFICE_INFO.baladyId})` : `Balady Portal (${OFFICE_INFO.baladyId})`}
            </span>
            <span className="px-2 py-0.5 rounded-sm bg-white border border-[#E0E1DC] text-[#343A2F]">
              {isAr ? 'كود البناء السعودي SBC' : 'Saudi Building Code SBC'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#estimator"
              onClick={onOpenEstimator}
              className="inline-flex items-center gap-1.5 text-xs text-[#0E1910] hover:underline font-th-bold"
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>{t('calculateCostNow')}</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}

