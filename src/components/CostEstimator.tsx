import { useState, useMemo } from 'react';
import { SERVICE_PACKAGES, OFFICE_INFO } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';
import { 
  Calculator, 
  MessageSquare, 
  Check, 
  Home, 
  Store, 
  Palmtree, 
  Layers, 
  Clock, 
  FileCheck2,
} from 'lucide-react';

interface CostEstimatorProps {
  initialPackage?: 'economic' | 'premium' | 'comprehensive';
  onConsultationRequest?: (summary: string) => void;
}

export default function CostEstimator({ initialPackage = 'premium' }: CostEstimatorProps) {
  const { isAr, t } = useLanguage();
  const [projectType, setProjectType] = useState<'villa' | 'commercial' | 'chalet' | 'interior'>('villa');
  const [landArea, setLandArea] = useState<number>(450);
  const [floorsCount, setFloorsCount] = useState<number>(2.5); // 2 floors + roof
  const [selectedPackage, setSelectedPackage] = useState<'economic' | 'premium' | 'comprehensive'>(initialPackage);
  const [includeSupervision, setIncludeSupervision] = useState<boolean>(true);
  const [includeInterior] = useState<boolean>(false);

  // Auto calculate built-up area estimation
  const estimatedBuiltUpArea = useMemo(() => {
    if (projectType === 'interior') return landArea; // In interior, area is the interior area
    if (projectType === 'chalet') return Math.round(landArea * 0.4); // single story with outdoor
    // Standard Villa building coefficient in Saudi Arabia ~ 60% coverage * floors
    const footprint = landArea * 0.6;
    return Math.round(footprint * floorsCount);
  }, [landArea, floorsCount, projectType]);

  // Pricing calculations
  const calculationResults = useMemo(() => {
    const pkg = SERVICE_PACKAGES.find(p => p.id === selectedPackage) || SERVICE_PACKAGES[1];
    
    let ratePerMeter = pkg.basePricePerMeter;
    if (projectType === 'commercial') ratePerMeter += 6;
    if (projectType === 'chalet') ratePerMeter += 3;

    let baseDesignFee = Math.round(estimatedBuiltUpArea * ratePerMeter);
    if (baseDesignFee < pkg.minPrice) baseDesignFee = pkg.minPrice;

    let supervisionFee = 0;
    if (selectedPackage === 'comprehensive') {
      supervisionFee = 0; // Included in comprehensive
    } else if (includeSupervision) {
      supervisionFee = Math.round(estimatedBuiltUpArea * 12); // ~12 SAR/m² for periodic stage supervision
    }

    let extraInteriorFee = 0;
    if (selectedPackage !== 'comprehensive' && includeInterior) {
      extraInteriorFee = Math.round(estimatedBuiltUpArea * 18);
    }

    const totalEstimate = baseDesignFee + supervisionFee + extraInteriorFee;

    // Delivery time estimate
    let weeks = isAr ? pkg.deliveryWeeks : (pkg.id === 'economic' ? '2 - 3 Weeks' : pkg.id === 'premium' ? '3 - 4 Weeks' : '4 - 6 Weeks');
    if (estimatedBuiltUpArea > 1000) weeks = isAr ? '٤ - ٦ أسابيع' : '4 - 6 Weeks';

    return {
      baseDesignFee,
      supervisionFee,
      extraInteriorFee,
      totalEstimate,
      weeks,
      ratePerMeter,
    };
  }, [selectedPackage, estimatedBuiltUpArea, projectType, includeSupervision, includeInterior, isAr]);

  const packageNames = {
    economic: isAr ? 'الباقة الاقتصادية' : 'Economic Package',
    premium: isAr ? 'الباقة المميزة' : 'Premium Package',
    comprehensive: isAr ? 'الباقة الشاملة' : 'Comprehensive Package',
  };

  const generateWhatsAppEstimateMessage = () => {
    const pkgName = packageNames[selectedPackage];
    const typeLabel = {
      villa: isAr ? 'فيلا سكنية' : 'Residential Villa',
      commercial: isAr ? 'مبنى تجاري / مكاتب' : 'Commercial / Office Building',
      chalet: isAr ? 'شاليه / استراحة' : 'Chalet / Resort',
      interior: isAr ? 'تصميم داخلي' : 'Interior Architecture',
    }[projectType];

    const message = isAr ? `مرحباً مكتب فلق للإستشارات الهندسية (FEC)،
لقد قمت بحساب تقديري عبر موقعكم بالتفاصيل التالية:
- نوع المشروع: ${typeLabel}
- مساحة الأرض: ${landArea} م²
- مسطح البناء التقديري: ${estimatedBuiltUpArea} م²
- الباقة المختارة: ${pkgName}
- الإشراف الميداني: ${includeSupervision || selectedPackage === 'comprehensive' ? 'نعم (مطلوب)' : 'غير محدد'}
- التكلفة التقديرية المحسوبة: حوالي ${calculationResults.totalEstimate.toLocaleString('ar-SA')} ريال سعودي

أود حجز موعد استشارة ومراجعة المخطط والتسعير النهائي.` : `Hello Falaq Engineering Consultants (FEC),
I calculated an instant estimate on your website with the following details:
- Project Type: ${typeLabel}
- Land / Plot Area: ${landArea} m²
- Estimated Built-Up Area: ${estimatedBuiltUpArea} m²
- Selected Package: ${pkgName}
- On-Site Supervision: ${includeSupervision || selectedPackage === 'comprehensive' ? 'Yes (Included)' : 'Not selected'}
- Calculated Estimate: Approx ${calculationResults.totalEstimate.toLocaleString('en-US')} SAR

I would like to book a consultation session to review drawings and finalize pricing.`;

    return `https://wa.me/${OFFICE_INFO.whatsapp}?text=${encodeURIComponent(message)}`;
  };

  return (
    <section id="estimator" className={`py-20 bg-[#F5F4F0] relative overflow-hidden border-b border-[#E0E1DC] ${isAr ? 'text-right' : 'text-left'}`}>
      
      {/* Background grid */}
      <div className="absolute inset-0 bg-editorial-grid opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-[#0E1910] text-[#F5F4F0] text-xs font-thmanyah-sans font-th-medium">
            <Calculator className="w-3.5 h-3.5 text-[#F4E95B]" />
            <span>{t('calcBadge')}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-4xl font-th-heavy text-[#000000] font-thmanyah-display">
            {t('calcTitle')}
          </h2>

          <p className="text-base sm:text-lg text-[#343A2F] leading-relaxed font-thmanyah-text">
            {t('calcIntro')}
          </p>
        </div>

        {/* Interactive Calculator Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Form (7 Cols) */}
          <div className={`lg:col-span-7 bg-white rounded-sm border border-[#E0E1DC] p-6 sm:p-7 space-y-6 ${isAr ? 'text-right' : 'text-left'} shadow-xs font-thmanyah-sans`}>
            
            {/* 1. Project Type Selector */}
            <div>
              <label className="block text-xs font-th-bold text-[#000000] uppercase tracking-wider mb-2.5 font-thmanyah-display">
                {t('calcStep1')}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'villa', label: t('typeVilla'), icon: Home },
                  { id: 'commercial', label: t('typeCommercial'), icon: Store },
                  { id: 'chalet', label: t('typeChalet'), icon: Palmtree },
                  { id: 'interior', label: t('typeInterior'), icon: Layers },
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = projectType === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setProjectType(item.id as any)}
                      className={`flex flex-col items-center justify-center p-3 rounded-sm border text-xs font-th-bold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#0E1910] border-[#0E1910] text-[#F5F4F0] shadow-xs'
                          : 'bg-[#F5F4F0] border-[#E0E1DC] text-[#343A2F] hover:bg-[#E0E1DC] hover:text-[#000000]'
                      }`}
                    >
                      <Icon className={`w-4 h-4 mb-1.5 ${isSelected ? 'text-[#F4E95B]' : 'text-[#343A2F]'}`} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Land Area Slider & Input */}
            <div className="space-y-2.5 pt-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-th-bold text-[#000000] font-thmanyah-display">
                  {t('calcStep2')}
                </span>
                <span className="text-sm font-th-bold text-[#000000] bg-[#F5F4F0] px-3 py-0.5 rounded-sm border border-[#E0E1DC]">
                  {landArea} {t('meterSq')}
                </span>
              </div>
              <input
                type="range"
                min="150"
                max="2500"
                step="25"
                value={landArea}
                onChange={(e) => setLandArea(Number(e.target.value))}
                className="w-full h-1.5 bg-[#E0E1DC] rounded-none appearance-none cursor-pointer accent-[#0E1910]"
              />
              <div className="flex justify-between text-[11px] text-[#343A2F]">
                <span>150 {t('meterSq')}</span>
                <span>500 {t('meterSq')}</span>
                <span>1000 {t('meterSq')}</span>
                <span>2500 {t('meterSq')}</span>
              </div>
            </div>

            {/* 3. Floors Count (if not interior) */}
            {projectType !== 'interior' && (
              <div className="space-y-2.5 pt-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-th-bold text-[#000000] font-thmanyah-display">
                    {t('calcStep3')}
                  </span>
                  <span className="text-xs text-[#343A2F]">
                    {floorsCount === 1 
                      ? (isAr ? 'دور أرضي فقط' : 'Ground Floor Only')
                      : floorsCount === 2 
                        ? (isAr ? 'دورين (أرضي + أول)' : '2 Floors (Ground + 1st)') 
                        : (isAr ? 'دورين + ملحق علوي' : '2 Floors + Upper Annex')}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { val: 1, label: t('floors1') },
                    { val: 2, label: t('floors2') },
                    { val: 2.5, label: t('floorsVilla') },
                  ].map((f) => (
                    <button
                      key={f.val}
                      type="button"
                      onClick={() => setFloorsCount(f.val)}
                      className={`py-2 px-3 rounded-sm text-xs font-th-bold border transition-all cursor-pointer ${
                        floorsCount === f.val
                          ? 'bg-[#0E1910] border-[#0E1910] text-[#F5F4F0]'
                          : 'bg-[#F5F4F0] border-[#E0E1DC] text-[#343A2F] hover:bg-[#E0E1DC] hover:text-[#000000]'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 4. Package Selection */}
            <div className="space-y-2.5 pt-1">
              <label className="block text-xs font-th-bold text-[#000000] font-thmanyah-display">
                {t('calcStep4')}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {SERVICE_PACKAGES.map((p) => {
                  const isSel = selectedPackage === p.id;
                  const displayName = packageNames[p.id as keyof typeof packageNames];
                  const taglineText = isAr ? p.tagline : (
                    p.id === 'economic' ? 'Official municipal license with full SBC structural, MEP & architectural codes.' :
                    p.id === 'premium' ? 'Complete 3D facade renders, landscape, interior layout, and BOQ.' :
                    'Turnkey blueprints, interior fit-out, and continuous on-site concrete inspection.'
                  );
                  return (
                    <div
                      key={p.id}
                      onClick={() => setSelectedPackage(p.id)}
                      className={`cursor-pointer p-3.5 rounded-sm border transition-all flex flex-col justify-between ${
                        isSel
                          ? 'bg-[#F5F4F0] border-[#0E1910] shadow-xs'
                          : 'bg-white border-[#E0E1DC] hover:border-[#343A2F]'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className={`text-xs font-th-bold ${isSel ? 'text-[#000000]' : 'text-[#343A2F]'}`}>
                            {displayName}
                          </span>
                          {isSel && <Check className="w-3.5 h-3.5 text-[#0E1910]" />}
                        </div>
                        <p className="text-[11px] text-[#343A2F] line-clamp-2 leading-tight font-thmanyah-text">
                          {taglineText}
                        </p>
                      </div>
                      <div className="mt-2.5 pt-2 border-t border-[#E0E1DC] text-[11px] text-[#000000] font-th-bold">
                        {isAr ? `تبدأ من ${p.basePricePerMeter} ر.س/م²` : `From ${p.basePricePerMeter} SAR/m²`}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 5. Add-ons Toggles */}
            {selectedPackage !== 'comprehensive' && (
              <div className="pt-2 border-t border-[#E0E1DC] space-y-2">
                <span className="text-xs font-th-bold text-[#000000] block font-thmanyah-display">
                  {t('calcStep5')}
                </span>
                
                <label className="flex items-center justify-between p-3 rounded-sm bg-[#F5F4F0] border border-[#E0E1DC] cursor-pointer hover:bg-[#E0E1DC]/60 transition-colors">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={includeSupervision}
                      onChange={(e) => setIncludeSupervision(e.target.checked)}
                      className="w-4 h-4 accent-[#0E1910] rounded-none cursor-pointer"
                    />
                    <div>
                      <div className="text-xs font-th-bold text-[#000000]">
                        {isAr ? 'الإشراف الهندسي الميداني ومطابقة الكود' : 'On-Site Engineering Supervision & SBC Compliance'}
                      </div>
                      <div className="text-[11px] text-[#343A2F] font-thmanyah-text">
                        {isAr 
                          ? 'زيارات استشارية رسمية لكل مرحلة صب مع تقارير بلدي وشهادة الإشغال'
                          : 'Official stage-by-stage concrete inspection visits with Balady reports'}
                      </div>
                    </div>
                  </div>
                  <span className={`text-xs text-[#000000] font-th-bold whitespace-nowrap ${isAr ? 'mr-2' : 'ml-2'}`}>
                    {isAr ? '+١٢ ر.س / م²' : '+12 SAR / m²'}
                  </span>
                </label>
              </div>
            )}

          </div>

          {/* Quotation Summary Card (5 Cols) */}
          <div className={`lg:col-span-5 bg-white rounded-sm border-2 border-[#0E1910] p-6 sm:p-7 space-y-5 ${isAr ? 'text-right' : 'text-left'} shadow-sm relative font-thmanyah-sans`}>
            
            {/* Top Badge */}
            <div className="flex items-center justify-between border-b border-[#E0E1DC] pb-3.5">
              <span className="text-xs font-th-bold text-[#F5F4F0] bg-[#0E1910] px-2.5 py-0.5 rounded-sm">
                {t('calcInstantBadge')}
              </span>
              <div className="flex items-center gap-1.5 text-xs text-[#343A2F]">
                <Clock className="w-3.5 h-3.5 text-[#0E1910]" />
                <span>{t('calcDuration')}: {calculationResults.weeks}</span>
              </div>
            </div>

            {/* Calculated Metrics */}
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-[#E0E1DC]">
                <span className="text-[#343A2F]">{t('calcBuiltArea')}:</span>
                <span className="text-sm font-th-bold text-[#000000]">
                  {estimatedBuiltUpArea.toLocaleString(isAr ? 'ar-SA' : 'en-US')} {t('meterSq')}
                </span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-[#E0E1DC]">
                <span className="text-[#343A2F]">{t('calcSelectedPkg')}:</span>
                <span className="font-th-bold text-[#000000]">
                  {packageNames[selectedPackage]}
                </span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-[#E0E1DC]">
                <span className="text-[#343A2F]">{t('calcBlueprintFees')}:</span>
                <span className="font-th-bold text-[#000000]">
                  {calculationResults.baseDesignFee.toLocaleString(isAr ? 'ar-SA' : 'en-US')} {t('sar')}
                </span>
              </div>

              {calculationResults.supervisionFee > 0 && (
                <div className="flex items-center justify-between py-1 border-b border-[#E0E1DC]">
                  <span className="text-[#343A2F]">{t('calcSupervisionFees')}:</span>
                  <span className="font-th-bold text-[#000000]">
                    {calculationResults.supervisionFee.toLocaleString(isAr ? 'ar-SA' : 'en-US')} {t('sar')}
                  </span>
                </div>
              )}

              {selectedPackage === 'comprehensive' && (
                <div className="flex items-center justify-between py-1 border-b border-[#E0E1DC] text-[#0E1910]">
                  <span>{isAr ? 'الإشراف وشهادة الإشغال والتصميم الداخلي:' : 'Supervision & Occupancy Certificate:'}</span>
                  <span className="font-th-bold">{isAr ? 'مشمول بالكامل ✓' : 'Fully Included ✓'}</span>
                </div>
              )}
            </div>

            {/* Total Highlight */}
            <div className="p-4 rounded-sm bg-[#F5F4F0] border border-[#E0E1DC] text-center space-y-0.5">
              <span className="text-xs text-[#343A2F] block">
                {t('calcTotalHeading')}
              </span>
              <div className="text-2xl sm:text-3xl font-th-heavy text-[#000000] font-thmanyah-display">
                {calculationResults.totalEstimate.toLocaleString(isAr ? 'ar-SA' : 'en-US')} <span className="text-sm font-th-medium text-[#343A2F]">{t('sar')}</span>
              </div>
              <p className="text-[11px] text-[#343A2F] pt-1 font-thmanyah-text">
                {t('calcDisclaimer')}
              </p>
            </div>

            {/* What's Included Bullets */}
            <div className="space-y-1.5 text-xs text-[#343A2F] pt-1 font-thmanyah-sans">
              <div className="flex items-center gap-2">
                <FileCheck2 className="w-3.5 h-3.5 text-[#0E1910] shrink-0" />
                <span>{isAr ? 'إصدار رخصة البناء المعتمدة عبر منصة بلدي' : 'Official Building Permit approval on Balady platform'}</span>
              </div>
              <div className="flex items-center gap-2">
                <FileCheck2 className="w-3.5 h-3.5 text-[#0E1910] shrink-0" />
                <span>{isAr ? 'مخططات إنشائية مدققة ومطابقة لكود SBC 1101' : 'Audited structural blueprints compliant with SBC 1101'}</span>
              </div>
              <div className="flex items-center gap-2">
                <FileCheck2 className="w-3.5 h-3.5 text-[#0E1910] shrink-0" />
                <span>{isAr ? 'جلسات مراجعة وتعديل مباشرة مع المهندس المشرف' : 'Direct design review sessions with the lead consultant'}</span>
              </div>
            </div>

            {/* Direct WhatsApp CTA */}
            <div className="space-y-2 pt-1">
              <a
                id="estimator-whatsapp-submit"
                href={generateWhatsAppEstimateMessage()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-sm bg-[#0E1910] hover:bg-[#000000] text-[#F5F4F0] font-th-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-[#F4E95B]" />
                <span>{t('calcRequestOfficialQuote')}</span>
              </a>

              <p className="text-[11px] text-center text-[#343A2F]">
                {isAr ? 'أو تفضل بزيارة مكتبنا في الرس - طريق الملك فهد' : 'Or visit our office in Al Rass - King Fahd Road'}
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

