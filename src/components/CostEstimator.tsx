import { useState, useEffect } from 'react';
import { OFFICE_INFO } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';
import { 
  Calculator, 
  Check, 
  Home, 
  Building2, 
  Palmtree, 
  Layers, 
  Clock, 
  FileText,
  Star,
  Gem,
  HardHat,
  MessageCircle,
  ArrowLeft,
  ArrowRight,
  ChevronDown,
} from 'lucide-react';

interface CostEstimatorProps {
  initialPackage?: 'economic' | 'premium' | 'comprehensive';
  onConsultationRequest?: (summary: string) => void;
}

export default function CostEstimator({ initialPackage = 'premium' }: CostEstimatorProps) {
  const { isAr } = useLanguage();
  const [projectType, setProjectType] = useState<'villa' | 'commercial' | 'chalet' | 'interior'>('villa');
  const [landArea, setLandArea] = useState<number>(2500);
  const [floorsCount, setFloorsCount] = useState<number>(2.5);
  const [selectedPackage, setSelectedPackage] = useState<'economic' | 'premium' | 'comprehensive'>(initialPackage);
  const [additionalService, setAdditionalService] = useState<string>('');
  const [isSetupComplete, setIsSetupComplete] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [hasUserInteracted, setHasUserInteracted] = useState<boolean>(false);

  useEffect(() => {
    if (initialPackage) {
      setSelectedPackage(initialPackage);
    }
  }, [initialPackage]);

  // Turn the checkmark green once the user finishes adjusting project settings
  useEffect(() => {
    if (!hasUserInteracted) return;

    // If the user selected the final step (additional services), complete immediately
    if (additionalService !== '') {
      setIsUpdating(false);
      setIsSetupComplete(true);
      return;
    }

    setIsUpdating(true);
    const timer = setTimeout(() => {
      setIsUpdating(false);
      setIsSetupComplete(true);
    }, 650);

    return () => clearTimeout(timer);
  }, [projectType, landArea, floorsCount, selectedPackage, additionalService, hasUserInteracted]);

  const projectTypeLabels = {
    villa: isAr ? 'فيلا سكنية' : 'Residential Villa',
    commercial: isAr ? 'مبنى تجاري' : 'Commercial Building',
    chalet: isAr ? 'مبنى / شاليه' : 'Building / Chalet',
    interior: isAr ? 'تصميم داخلي وديكور' : 'Interior Design & Decor',
  };

  const floorsLabels: Record<number, string> = {
    1: isAr ? 'دور واحد' : 'Single Floor',
    2: isAr ? 'دورين (أرضي + أول)' : '2 Floors (Ground + First)',
    2.5: isAr ? 'دورين ومباني (أول + ملحق)' : '2 Floors & Annex (First + Annex)',
  };

  const packageNames = {
    economic: isAr ? 'الباقة الاقتصادية' : 'Economic Package',
    premium: isAr ? 'الباقة المميزة' : 'Premium Package',
    comprehensive: isAr ? 'الباقة الشاملة' : 'Comprehensive Package',
  };

  const packageCards = [
    {
      id: 'economic' as const,
      icon: Home,
      title: isAr ? 'الباقة الاقتصادية' : 'Economic Package',
      desc: isAr
        ? 'الحل الهندسي الأساسي لإصدار الرخصة والبدء بالمشروع.'
        : 'Essential engineering solution for issuing the permit and starting the project.',
      subDesc: isAr
        ? 'مناسبة للمشاريع التي تبحث عن حل عملي واقتصادي.'
        : 'Suitable for projects seeking a practical and economical solution.',
    },
    {
      id: 'premium' as const,
      icon: Star,
      title: isAr ? 'الباقة المميزة' : 'Premium Package',
      desc: isAr
        ? 'تصميم معماري متكامل مع دراسة الواجهات والفراغات الداخلية.'
        : 'Integrated architectural design with facade and interior space studies.',
      subDesc: isAr
        ? 'الخيار الأكثر طلباً للمشاريع السكنية.'
        : 'The most requested choice for residential projects.',
    },
    {
      id: 'comprehensive' as const,
      icon: Gem,
      title: isAr ? 'الباقة الشاملة' : 'Comprehensive Package',
      desc: isAr
        ? 'تجربة هندسية متكاملة من الفكرة وحتى تسليم المخططات النهائية.'
        : 'Complete engineering experience from concept to final blueprint delivery.',
      subDesc: isAr
        ? 'لمن يرغب في أعلى مستوى من التفاصيل والتكامل.'
        : 'For those seeking the highest level of detail and integration.',
    },
  ];

  const additionalServiceOptions = isAr
    ? [
        { value: '', label: 'اختر الخدمات الإضافية' },
        { value: 'الإشراف الهندسي الميداني ومطابقة الكود', label: 'الإشراف الهندسي الميداني ومطابقة الكود' },
        { value: 'التصميم الداخلي وتنسيق الحدائق', label: 'التصميم الداخلي وتنسيق الحدائق' },
        { value: 'حصر الكميات والمواصفات الفنية', label: 'حصر الكميات والمواصفات الفنية' },
        { value: 'بدون خدمات إضافية', label: 'بدون خدمات إضافية' },
      ]
    : [
        { value: '', label: 'Select Additional Services' },
        { value: 'On-Site Engineering Supervision & SBC Compliance', label: 'On-Site Engineering Supervision & SBC Compliance' },
        { value: 'Interior Design & Landscaping', label: 'Interior Design & Landscaping' },
        { value: 'BOQ & Technical Specifications', label: 'BOQ & Technical Specifications' },
        { value: 'No Additional Services', label: 'No Additional Services' },
      ];

  const generateWhatsAppEstimateMessage = () => {
    const pkgName = packageNames[selectedPackage];
    const typeLabel = projectTypeLabels[projectType];
    const floorLabel = projectType === 'interior'
      ? (isAr ? 'داخلي' : 'Interior')
      : floorsLabels[floorsCount];
    const extraLabel = additionalService || (isAr ? 'غير محدد' : 'None');

    const message = isAr
      ? `مرحباً مكتب فلق للإستشارات الهندسية (FEC)،
أود طلب عرض سعر مخصص لمشروعي بالتفاصيل التالية:
- المساحة التقريبية للمشروع: ${landArea} م²
- نوع المشروع: ${typeLabel}
- عدد الأدوار: ${floorLabel}
- الباقة الهندسية المختارة: ${pkgName}
- الخدمات الإضافية: ${extraLabel}

يرجى تزويدي بعرض السعر التفصيلي والمخصص لمشروعي.`
      : `Hello Falaq Engineering Consultants (FEC),
I would like to request a tailored price quote for my project with the following details:
- Approximate Project Area: ${landArea} m²
- Project Type: ${typeLabel}
- Number of Floors: ${floorLabel}
- Selected Engineering Package: ${pkgName}
- Additional Services: ${extraLabel}

Please provide me with a detailed and customized quotation for my project.`;

    return `https://wa.me/${OFFICE_INFO.whatsapp}?text=${encodeURIComponent(message)}`;
  };

  return (
    <section
      id="estimator"
      className={`py-20 bg-[#F5F4F0] relative overflow-hidden border-b border-[#E0E1DC] ${
        isAr ? 'text-right' : 'text-left'
      }`}
    >
      {/* Background grid */}
      <div className="absolute inset-0 bg-editorial-grid opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3.5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-md bg-[#122B22] text-white text-xs sm:text-sm font-thmanyah-sans font-th-medium shadow-xs">
            <Calculator className="w-4 h-4 text-[#D8E2DC]" />
            <span>
              {isAr ? 'حاسبة التكلفة التقديرية للمشاريع' : 'Project Estimate & Scope Calculator'}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-th-heavy text-[#122B22] font-thmanyah-display leading-tight">
            {isAr
              ? 'اكتشف احتياجات مشروعك واحصل على تقدير مخصص'
              : 'Discover Your Project Needs & Get a Custom Estimate'}
          </h2>

          <p className="text-sm sm:text-base text-[#343A2F] leading-relaxed font-thmanyah-text">
            {isAr
              ? 'حدد تفاصيل مشروعك لتحصل على تصور مبدئي للخدمات المناسبة، ثم اطلب عرض سعر مخصص من فريقنا.'
              : 'Define your project details to get an initial overview of suitable services, then request a custom quote from our team.'}
          </p>
        </div>

        {/* Main Content Grid: Form (7 cols on right in RTL) & Summary Card (5 cols on left in RTL) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Controls Form (7 Cols) */}
          <div
            className={`lg:col-span-7 bg-white rounded-xl border border-[#E2E4DF] p-6 sm:p-8 space-y-7 ${
              isAr ? 'text-right' : 'text-left'
            } shadow-xs font-thmanyah-sans`}
          >
            {/* 1. Project Type Selector */}
            <div className="space-y-3">
              <label className="block text-sm font-th-bold text-[#122B22] font-thmanyah-display">
                {isAr ? '1. نوع المشروع' : '1. Project Type'}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: 'villa', label: projectTypeLabels.villa, icon: Home },
                  { id: 'commercial', label: projectTypeLabels.commercial, icon: Building2 },
                  { id: 'chalet', label: projectTypeLabels.chalet, icon: Palmtree },
                  { id: 'interior', label: projectTypeLabels.interior, icon: Layers },
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = projectType === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setHasUserInteracted(true);
                        setProjectType(item.id as any);
                      }}
                      className={`flex flex-col items-center justify-center py-3.5 px-3 rounded-lg border text-xs sm:text-sm font-th-bold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#122B22] border-[#122B22] text-white shadow-xs'
                          : 'bg-[#F3F4F1] border-[#E2E4DF] text-[#2C352E] hover:bg-[#E8EAE5]'
                      }`}
                    >
                      <Icon
                        className={`w-5 h-5 mb-2 ${
                          isSelected ? 'text-[#D8E2DC]' : 'text-[#2C352E]'
                        }`}
                      />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Total Land Area Slider */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-th-bold text-[#122B22] font-thmanyah-display">
                  {isAr ? '2. مساحة الأرض الإجمالية:' : '2. Total Land Area:'}
                </span>
                <span className="text-sm font-th-bold text-[#122B22] bg-[#F8F9F7] px-4 py-1.5 rounded-lg border border-[#E2E4DF]">
                  {landArea} {isAr ? 'م²' : 'm²'}
                </span>
              </div>

              <div className="pt-1">
                <input
                  type="range"
                  min="150"
                  max="2500"
                  step="25"
                  value={landArea}
                  onChange={(e) => {
                    setHasUserInteracted(true);
                    setLandArea(Number(e.target.value));
                  }}
                  className="w-full h-1.5 bg-[#E2E4DF] rounded-lg appearance-none cursor-pointer accent-[#122B22]"
                />
                <div className="flex justify-between text-xs text-[#4A524A] mt-2 px-0.5">
                  <div className="flex flex-col items-center">
                    <span className="h-1.5 w-px bg-[#B8BDB5] mb-1" />
                    <span>150 {isAr ? 'م²' : 'm²'}</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="h-1.5 w-px bg-[#B8BDB5] mb-1" />
                    <span>500 {isAr ? 'م²' : 'm²'}</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="h-1.5 w-px bg-[#B8BDB5] mb-1" />
                    <span>1000 {isAr ? 'م²' : 'm²'}</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="h-1.5 w-px bg-[#B8BDB5] mb-1" />
                    <span>2500 {isAr ? 'م²' : 'm²'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Floors Count & Height */}
            <div className="space-y-3">
              <span className="block text-sm font-th-bold text-[#122B22] font-thmanyah-display">
                {isAr ? '3. عدد الأدوار والإرتفاع:' : '3. Number of Floors & Height:'}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  { val: 1, label: floorsLabels[1] },
                  { val: 2, label: floorsLabels[2] },
                  { val: 2.5, label: floorsLabels[2.5] },
                ].map((f) => {
                  const isSel = floorsCount === f.val;
                  return (
                    <button
                      key={f.val}
                      type="button"
                      onClick={() => {
                        setHasUserInteracted(true);
                        setFloorsCount(f.val);
                      }}
                      className={`py-2.5 px-3 rounded-lg text-xs sm:text-sm font-th-bold border transition-all cursor-pointer ${
                        isSel
                          ? 'bg-[#122B22] border-[#122B22] text-white shadow-xs'
                          : 'bg-[#F3F4F1] border-[#E2E4DF] text-[#2C352E] hover:bg-[#E8EAE5]'
                      }`}
                    >
                      {f.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Selected Engineering Package (No Prices) */}
            <div className="space-y-3">
              <label className="block text-sm font-th-bold text-[#122B22] font-thmanyah-display">
                {isAr ? '4. الباقة الهندسية المختارة:' : '4. Selected Engineering Package:'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {packageCards.map((pkg) => {
                  const Icon = pkg.icon;
                  const isSel = selectedPackage === pkg.id;
                  return (
                    <div
                      key={pkg.id}
                      onClick={() => {
                        setHasUserInteracted(true);
                        setSelectedPackage(pkg.id);
                      }}
                      className={`relative cursor-pointer p-4 rounded-lg border transition-all text-center flex flex-col items-center justify-between min-h-[155px] ${
                        isSel
                          ? 'bg-[#EBEee8] border-[#122B22] ring-1 ring-[#122B22] shadow-xs'
                          : 'bg-[#F9FAF8] border-[#E2E4DF] hover:border-[#9CA59E]'
                      }`}
                    >
                      {isSel && (
                        <Check
                          className={`w-4 h-4 text-[#122B22] absolute top-3 ${
                            isAr ? 'left-3' : 'right-3'
                          }`}
                        />
                      )}
                      <div className="flex flex-col items-center space-y-1.5">
                        <Icon className="w-5 h-5 text-[#122B22] mb-0.5" />
                        <div className="text-sm font-th-bold text-[#122B22]">
                          {pkg.title}
                        </div>
                        <p className="text-[11px] text-[#343A2F] leading-relaxed font-thmanyah-text">
                          {pkg.desc}
                        </p>
                      </div>
                      <p className="text-[10px] text-[#5C645C] mt-3 pt-2 border-t border-[#E2E4DF]/80 w-full leading-snug">
                        {pkg.subDesc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 5. Optional Additional Engineering Services */}
            <div className="space-y-3">
              <span className="block text-sm font-th-bold text-[#122B22] font-thmanyah-display">
                {isAr
                  ? '5. خدمات هندسية إضافية (اختيارية):'
                  : '5. Additional Engineering Services (Optional):'}
              </span>

              <div className="p-4 rounded-lg bg-[#F3F4F1] border border-[#E2E4DF] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-md bg-white border border-[#E2E4DF] text-[#122B22] shrink-0 mt-0.5">
                    <HardHat className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs sm:text-sm font-th-bold text-[#122B22]">
                      {isAr
                        ? 'الإشراف الهندسي الميداني ومطابقة الكود'
                        : 'On-Site Engineering Supervision & Code Compliance'}
                    </div>
                    <p className="text-[11px] text-[#4A524A] leading-relaxed font-thmanyah-text">
                      {isAr
                        ? 'زيارات استشارية ومتابعة مراحل التنفيذ وفق المخططات والكود السعودي.'
                        : 'Consultancy visits and stage-by-stage construction follow-up according to blueprints and SBC.'}
                    </p>
                    <p className="text-[11px] text-[#5C645C] font-thmanyah-text">
                      {isAr
                        ? 'يتم تحديد الأتعاب حسب طبيعة المشروع ونطاق الإشراف.'
                        : 'Fees are determined based on project nature and supervision scope.'}
                    </p>
                  </div>
                </div>

                <div className="relative w-full sm:w-auto shrink-0">
                  <select
                    value={additionalService}
                    onChange={(e) => {
                      setHasUserInteracted(true);
                      setAdditionalService(e.target.value);
                    }}
                    aria-label={isAr ? 'اختر الخدمات الإضافية' : 'Select Additional Services'}
                    className="w-full sm:w-48 appearance-none bg-white border border-[#D5D8D2] hover:border-[#122B22] rounded-md py-2 px-3.5 pr-8 pl-8 text-xs font-th-medium text-[#2C352E] cursor-pointer focus:outline-none focus:border-[#122B22]"
                  >
                    {additionalServiceOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-[#4A524A] pointer-events-none absolute top-1/2 -translate-y-1/2 ${
                      isAr ? 'left-3' : 'right-3'
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Project Summary Card Without Price (5 Cols) */}
          <div
            className={`lg:col-span-5 bg-white rounded-xl border border-[#8E9B92] p-6 sm:p-7 space-y-5 ${
              isAr ? 'text-right' : 'text-left'
            } shadow-xs font-thmanyah-sans`}
          >
            {/* Top Row: Badge & Expected Duration */}
            <div className="flex items-center justify-between pb-2">
              <span className="text-xs sm:text-sm font-th-bold text-white bg-[#122B22] px-4 py-1.5 rounded-md">
                {isAr ? 'ملخص مشروعك' : 'Project Summary'}
              </span>
              <div className="flex items-center gap-1.5 text-xs text-[#343A2F] font-th-medium">
                <Clock className="w-4 h-4 text-[#343A2F]" />
                <span>
                  {isAr
                    ? 'المدة الزمنية المتوقعة: 4 - 8 أسابيع'
                    : 'Expected Duration: 4 - 8 Weeks'}
                </span>
              </div>
            </div>

            {/* 5 Summary Rows */}
            <div className="divide-y divide-[#EAECE8] border-t border-b border-[#EAECE8] text-xs sm:text-sm">
              <div className="flex items-center justify-between py-3">
                <span className="text-[#2C352E] font-th-medium">
                  {isAr ? 'المساحة التقريبية للمشروع:' : 'Approximate Project Area:'}
                </span>
                <span className="font-th-bold text-[#122B22]">
                  {landArea ? `${landArea} ${isAr ? 'م²' : 'm²'}` : '—'}
                </span>
              </div>

              <div className="flex items-center justify-between py-3">
                <span className="text-[#2C352E] font-th-medium">
                  {isAr ? 'نوع المشروع:' : 'Project Type:'}
                </span>
                <span className="font-th-bold text-[#122B22]">
                  {projectTypeLabels[projectType] || '—'}
                </span>
              </div>

              <div className="flex items-center justify-between py-3">
                <span className="text-[#2C352E] font-th-medium">
                  {isAr ? 'عدد الأدوار:' : 'Number of Floors:'}
                </span>
                <span className="font-th-bold text-[#122B22]">
                  {projectType === 'interior' ? '—' : floorsLabels[floorsCount] || '—'}
                </span>
              </div>

              <div className="flex items-center justify-between py-3">
                <span className="text-[#2C352E] font-th-medium">
                  {isAr ? 'الباقة الهندسية المختارة:' : 'Selected Engineering Package:'}
                </span>
                <span className="font-th-bold text-[#122B22]">
                  {packageNames[selectedPackage] || '—'}
                </span>
              </div>

              <div className="flex items-center justify-between py-3">
                <span className="text-[#2C352E] font-th-medium">
                  {isAr ? 'الخدمات الإضافية:' : 'Additional Services:'}
                </span>
                <span className="font-th-bold text-[#122B22]">
                  {additionalService || '—'}
                </span>
              </div>
            </div>

            {/* Scope Ready Callout Box */}
            <div
              onClick={() => setIsSetupComplete((prev) => !prev)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setIsSetupComplete((prev) => !prev);
                }
              }}
              className={`p-5 rounded-lg space-y-3.5 transition-all duration-300 cursor-pointer select-none border ${
                isSetupComplete
                  ? 'bg-[#EAF4ED] border-[#16A34A]/40 shadow-xs'
                  : 'bg-[#EFF1EE] border-transparent hover:border-[#D0D5CE]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span
                  aria-label={isAr ? 'حالة اكتمال إعداد المشروع' : 'Project setup completion status'}
                  className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                    isSetupComplete
                      ? 'bg-[#16A34A] border-2 border-[#16A34A] text-white ring-4 ring-[#16A34A]/20 scale-105 shadow-xs'
                      : isUpdating
                      ? 'bg-white border-2 border-[#16A34A] text-[#16A34A] animate-pulse'
                      : 'bg-transparent border-2 border-[#122B22] text-[#122B22] hover:border-[#16A34A] hover:text-[#16A34A]'
                  }`}
                >
                  <Check className="w-3.5 h-3.5 stroke-[2.75]" />
                </span>
                <h3
                  className={`text-sm sm:text-base font-th-bold font-thmanyah-display transition-colors duration-300 ${
                    isSetupComplete ? 'text-[#14532D]' : 'text-[#122B22]'
                  }`}
                >
                  {isAr
                    ? 'تم إعداد التقدير المبدئي لمشروعك بنجاح'
                    : 'Initial Project Scope Prepared Successfully'}
                </h3>
              </div>

              <p className="text-xs text-[#343A2F] leading-relaxed font-thmanyah-text">
                {isAr
                  ? 'بناءً على مساحة المشروع ونوعه وعدد الأدوار والخدمات المختارة، تم تحديد نطاق الأعمال المناسب لمشروعك.'
                  : 'Based on your project area, type, number of floors, and selected services, the appropriate scope of work has been defined.'}
              </p>

              <div
                className={`pt-3 border-t flex items-center gap-2 text-xs font-th-bold transition-colors duration-300 ${
                  isSetupComplete
                    ? 'border-[#16A34A]/25 text-[#14532D]'
                    : 'border-[#DCE0D9] text-[#122B22]'
                }`}
              >
                <FileText
                  className={`w-4 h-4 shrink-0 transition-colors duration-300 ${
                    isSetupComplete ? 'text-[#16A34A]' : 'text-[#122B22]'
                  }`}
                />
                <span>
                  {isAr
                    ? 'احصل على عرض السعر التفصيلي والمخصص لمشروعك'
                    : 'Get a detailed and tailored price quote for your project'}
                </span>
              </div>
            </div>

            {/* Direct WhatsApp CTA */}
            <div className="space-y-2.5 pt-1">
              <a
                id="estimator-whatsapp-submit"
                href={generateWhatsAppEstimateMessage()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-5 rounded-lg bg-[#122B22] hover:bg-[#0E1910] text-white font-th-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-xs transition-all cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 text-white" />
                <span>
                  {isAr ? 'اطلب عرض السعر عبر واتساب' : 'Request Quote via WhatsApp'}
                </span>
                {isAr ? (
                  <ArrowLeft className="w-4 h-4" />
                ) : (
                  <ArrowRight className="w-4 h-4" />
                )}
              </a>

              <p className="text-[11px] text-center text-[#5A625A]">
                {isAr
                  ? 'العرض النهائي يعتمد على تفاصيل المشروع ونطاق الخدمات المطلوبة.'
                  : 'Final quote depends on project details and required scope of services.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
