import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'ar' | 'en';

export interface LanguageContextType {
  language: Language;
  direction: 'rtl' | 'ltr';
  isAr: boolean;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translationsAr: Record<string, string> = {
  // Brand
  brandName: 'مكتب فَلَق للإستشارات الهندسية',
  brandOffice: 'مكتب فَلَق',
  brandType: 'استشارات هندسية',
  brandTagline: 'نبتكر الفكرة.. لنبني الواقع',
  locationShort: 'الرس، منطقة القصيم',
  
  // Header & Nav
  navHome: 'الرئيسية',
  navAbout: 'عن المكتب والخبراء',
  navAchievements: 'إنجازاتنا بالأرقام',
  navPackages: 'الباقات والخدمات',
  navPortfolio: 'معرض المشاريع',
  navEstimator: 'حاسبة التكلفة',
  navWorkflow: 'مراحل العمل',
  navContact: 'التواصل والموقع',
  navWhatsAppBtn: 'تواصل عبر الواتساب',
  navCallTitle: 'اتصال هاتفي مباشر',

  // Hero
  heroBadgeAccredited: 'مكتب استشاري معتمد لدى منصة بلدي وهيئة المهندسين',
  heroTitlePrefix: 'مكتب',
  heroTitleFalaq: 'فَلَق',
  heroTitleSuffix: 'للإستشارات الهندسية',
  heroSubtitle: 'نبتكر الفكرة.. لنبني الواقع',
  heroDescription: 'حلول هندسية ومعمارية متكاملة تشمل التصميم المعماري، الإنشائي، والتصميم الداخلي، وإصدار رخص البناء وشهادات الإشغال تحت إشراف نخبة من الخبراء وحملة الدكتوراه بأعلى معايير كود البناء السعودي (SBC).',
  heroCtaWhatsApp: 'تواصل معنا عبر الواتساب',
  heroCtaExplore: 'استكشف باقاتنا وخدماتنا',
  heroTrust1: 'مخططات معتمدة للكود السعودي',
  heroTrust2: 'رخص بلدي وشهادات إشغال',
  heroTrust3: 'إشراف ميداني موثوق',
  heroCardStyle: 'طراز سلماني معاصر',
  heroCardProjectTitle: 'فيلا الرياض الحديثة',
  heroCardLocation: 'حي النرجس • 650 م²',
  heroCardAction: 'عرض تفاصيل المشروع',

  // Trust Accreditations
  trustBadge: 'التراخيص والاعتمادات الوطنية الرسمية',
  trustTitle: 'مكتب مرخص وموثق بالكامل لخدمتكم',
  crLabel: 'السجل التجاري:',
  trustSceTitle: 'الهيئة السعودية للمهندسين',
  trustSceBadge: 'مكتب استشاري معتمد',
  trustBaladyTitle: 'منصة بلدي والأمانات',
  trustBaladyBadge: 'إصدار رخص فوري',
  trustSbcTitle: 'كود البناء السعودي (SBC)',
  trustSbcBadge: 'مطابقة هندسية 100%',
  trustInsuranceTitle: 'تأمين المباني والعيوب الخفية',
  trustInsuranceBadge: 'معتمد لشركات التأمين',

  // About & Leadership
  aboutBadge: 'الرؤية والقيادة الاستشارية',
  aboutTitle: 'صرح هندسي يقوده نخبة من الأكاديميين والممارسين',
  aboutIntro: 'تأسس مكتب فلق للإستشارات الهندسية في محافظة الرس ليكون بيتاً للخبرة الهندسية المتميزة، حيث يدمج بين العمق الأكاديمي والبحثي وأحدث الممارسات الميدانية وكود البناء السعودي الحديث.',
  aboutPillar1Title: 'كفاءة هندسية ودقة إنشائية',
  aboutPillar1Desc: 'حسابات إنشائية ثلاثية الأبعاد تحقق أعلى معايير الأمان مع ترشيد تكاليف الحديد والخرسانة بنسبة تصل إلى 25%.',
  aboutPillar2Title: 'طابع معماري يواكب الهوية',
  aboutPillar2Desc: 'نصمم واجهات معمارية أصيلة مستوحاة من الطراز السلماني والمعاصر تلائم خصوصية وثقافة العائلة السعودية.',
  aboutPillar3Title: 'سرعة الإجراءات ورخص بلدي',
  aboutPillar3Desc: 'ربط إلكتروني مباشر مع منصة بلدي لإصدار رخص البناء والقرارات المساحية دون تأخير أو ملاحظات.',
  leadershipTitle: 'مجلس الإدارة والقيادة الهندسية',
  leadershipSubtitle: '',
  sceCertified: 'معتمد هيئة المهندسين',
  specialtiesLabel: 'مجالات الاختصاص:',
  btnVerifyConsultant: 'استشارة فورية مع الخبير',

  // Our Achievements
  achievementsBadge: 'سجل حافل بالثقة والأرقام المعتمدة',
  achievementsTitle: 'إنجازاتنا بالأرقام والنتائج',
  achievementsSubtitle: 'أرقام قياسية تعكس مسيرة هندسية رائدة بالرس ومنطقة القصيم، ترتكز على الدقة الأكاديمية والالتزام المطلق بسلامة وجودة مشاريع عملائنا.',
  achievementsTabMetrics: 'المؤشرات القياسية الستة',
  achievementsTabSectors: 'توزيع المشاريع حسب القطاع',
  achievementsTabTestimonials: 'آراء وتجارب العملاء الموثقة',
  metricTagDocumented: 'مشاريع منجزة',
  metricTagSatisfaction: 'رضا ٩٩.٤٪',
  metricTagDegree: 'رتبة دكتوراه',
  metricTagApproved: 'مسطحات معتمدة',
  metricTagSbc: 'اعتماد رسمي',
  metricTagSaving: 'كفاءة اقتصادية',
  verifiedClient: 'عميل موثق',
  excellentRating: 'تقييم ممتاز استشاري',
  reviewsBasedOn: 'بناءً على أكثر من 480 تقييم وتوصية لمشاريع سكنية وتجارية بالرس والقصيم',
  joinSuccessPartners: 'انضم لشركاء النجاح واحجز استشارتك',
  calculateCostNow: 'احسب تكلفة مخطط مشروعك فوراً',

  // Common Units & Currency
  meterSq: 'م²',
  sar: 'ريال',

  // Services & Packages
  packagesBadge: 'حلول هندسية معيارية ومرنة',
  packagesTitle: 'باقات الخدمات الهندسية المتكاملة',
  packagesSubtitle: 'اختر الباقة المناسبة لمشروعك السكني أو التجاري. صممنا باقاتنا لتلبي تطلعاتك بدقة من المخطط الأساسي المعتمد وحتى الإشراف وتسليم المفتاح.',
  packagesIntro: 'اختر الباقة المناسبة لمشروعك السكني أو التجاري. صممنا باقاتنا لتلبي تطلعاتك بدقة من المخطط الأساسي المعتمد وحتى الإشراف وتسليم المفتاح.',
  packagesTabCards: 'عرض الباقات الرئيسية',
  packagesTabCompare: 'جدول المقارنة التفصيلي لكافة المخرجات',
  packagesTabTable: 'جدول المقارنة التفصيلي لكافة المخرجات',
  calculatePackageArea: 'حساب تكلفة الباقة لمشروعك',
  mostPopularBadge: 'الأكثر طلباً واختياراً',
  economicTierName: 'الباقة الاقتصادية',
  premiumTierName: 'الباقة المميزة',
  comprehensiveTierName: 'الباقة الشاملة',
  economicDesc: 'المخططات الأساسية المعتمدة لإصدار رخصة البناء ومطابقة كود البناء السعودي (SBC)',
  premiumDesc: 'التصميم المعماري المتكامل والواجهات ثلاثية الأبعاد والمخططات التنفيذية الدقيقة مع جداول الكميات',
  comprehensiveDesc: 'الحل الشامل من الفكرة وحتى المفتاح: تصميم داخلي فاخر وإشراف ميداني كامل وإصدار شهادة الإشغال',
  whatIncluded: 'المخرجات والخدمات المتضمنة:',
  btnSelectPackage: 'اختيار وحساب التكلفة',
  btnBookWhatsApp: 'طلب استشارة للباقة',
  viewDetailsModal: 'تفاصيل التسليمات',
  closeModal: 'إغلاق',

  // Cost Estimator
  estimatorBadge: 'حاسبة تقديرية تفاعلية وفورية',
  estimatorTitle: 'احسب تكلفة مخططات مشروعك بدقة',
  estimatorSubtitle: 'حدد نوع المشروع ومساحة الأرض وعدد الأدوار للحصول على تسعيرة تقديرية فورية مع تفصيل المخرجات المعتمدة.',
  calcBadge: 'حاسبة التكلفة الهندسية الفورية',
  calcTitle: 'احسب تكلفة مخططات مشروعك بدقة',
  calcIntro: 'حدد نوع المشروع ومساحة الأرض وعدد الأدوار للحصول على تسعيرة تقديرية فورية مع تفصيل المخرجات المعتمدة وفق كود البناء السعودي.',
  calcStep1: '1. نوع المشروع المعماري:',
  calcStep2: '2. مساحة الأرض الإجمالية:',
  calcStep3: '3. عدد الأدوار والارتفاع:',
  calcStep4: '4. الباقة الهندسية المختارة:',
  calcStep5: '5. خدمات هندسية إضافية (اختيارية):',
  calcInstantBadge: 'تسعيرة تقديرية فورية',
  calcDuration: 'المدة الزمنية المتوقعة',
  calcBuiltArea: 'المسطح البنائي التقديري',
  calcSelectedPkg: 'الباقة المختارة',
  calcBlueprintFees: 'أتعاب المخططات والتصميم',
  calcSupervisionFees: 'أتعاب الإشراف الميداني',
  calcTotalHeading: 'التكلفة التقديرية الإجمالية للمخططات',
  calcDisclaimer: '* السعر تقديري استرشادي شامل ضريبة القيمة المضافة ومطابقة كود البناء السعودي SBC، ويخضع للمعاينة الميدانية وطبيعة الأرض.',
  calcRequestOfficialQuote: 'طلب عرض سعر رسمي مفصل عبر الواتساب',
  typeVilla: 'فيلا سكنية',
  typeCommercial: 'مبنى تجاري',
  typeInterior: 'تصميم داخلي وديكور',
  typeChalet: 'شاليه / استراحة',
  floors1: 'دور واحد',
  floors2: 'دوران (أرضي + أول)',
  floorsVilla: 'دورين وملحق (فيلا كاملة)',
  projectTypeLabel: '1. نوع المشروع المعماري:',
  landAreaLabel: '2. مساحة الأرض الإجمالية:',
  floorsLabel: '3. عدد الأدوار:',
  packageChoiceLabel: '4. الباقة الهندسية المختارة:',
  calculatedBuiltArea: 'المسطح البنائي التقديري:',
  sqmUnit: 'م²',
  estimatedCostTotal: 'التكلفة التقديرية الإجمالية للمخططات',
  priceDisclaimer: '* السعر تقديري استرشادي شامل ضريبة القيمة المضافة ومطابقة كود البناء السعودي SBC، ويخضع للمعاينة الميدانية.',
  btnRequestExactQuote: 'طلب عرض سعر رسمي مفصل عبر الواتساب',
  packageIncludesBrief: 'المخرجات الرئيسية للباقة المختارة:',

  // Portfolio
  portfolioBadge: 'أعمالنا ومشاريعنا المتميزة',
  portfolioTitle: 'معرض المشاريع والفلل السكنية',
  portfolioSubtitle: 'استعرض نخبة من أرقى التصاميم المعمارية والإنشائية التي تم إنجازها واعتمادها بالرس ومنطقة القصيم ومختلف مدن المملكة.',
  portfolioIntro: 'استعرض نخبة من أرقى التصاميم المعمارية والإنشائية التي تم إنجازها واعتمادها بالرس ومنطقة القصيم ومختلف مدن المملكة.',
  portfolioViewDetails: 'معاينة المخططات والتفاصيل',
  filterAll: 'كافة المشاريع',
  filterResidential: 'فلل وقصور سكنية',
  filterCommercial: 'مجمعات ومراكز تجارية',
  filterInterior: 'تصميم داخلي وديكور',
  filterHospitality: 'منتجعات وشاليهات',
  btnViewProjectSpecs: 'معاينة المخططات والمواصفات',
  statusCompleted: 'منجز ومرخص',
  statusSupervision: 'تحت التنفيذ والإشراف',

  // Workflow & FAQ
  workflowBadge: 'منهجية العمل الهندسية المعتمدة',
  workflowTitle: 'كيف نبني مشروعك خطوة بخطوة',
  workflowSubtitle: 'مسار عمل واضح ومنظم يضمن لك راحة البال والدقة المتناهية من أول جلسة استشارية وحتى إطلاق التيار الكهربائي.',
  workflowIntro: 'مسار عمل واضح ومنظم يضمن لك راحة البال والدقة المتناهية من أول جلسة استشارية وحتى إطلاق التيار الكهربائي.',
  faqBadge: 'الأسئلة الأكثر شيوعاً',
  faqTitle: 'الأسئلة الشائعة حول المخططات ورخص بلدي',
  faqSubtitle: 'إجابات وافية على أبرز التساؤلات الفنية والبلدية لعملائنا في منطقة القصيم',

  // Contact & Location
  contactBadge: 'مقرنا الرئيسي ووسائل التواصل',
  contactTitle: 'تفضل بزيارتنا أو تواصل معنا فوراً',
  contactSubtitle: 'فريقنا الاستشاري في خدمتك للإجابة على استفساراتك وتقديم المشورة الفنية لمشروعك المعماري.',
  contactIntro: 'فريقنا الاستشاري في خدمتكم للإجابة على استفساراتكم وتقديم المشورة الفنية لمشروعكم المعماري.',
  contactOfficeDetails: 'بيانات المقر وأوقات العمل',
  contactDirectWhatsApp: 'محادثة مباشرة عبر الواتساب',
  contactMapTitle: 'موقعنا على خريطة جوجل',
  contactOpenInGoogleMaps: 'فتح الموقع في خرائط جوجل',
  contactFormSubtitle: 'أدخل بيانات مشروعك وسيقوم مهندس استشاري متخصص بالتواصل معك فوراً.',
  contactFullName: 'الاسم الكامل',
  contactPhone: 'رقم الجوال (واتساب)',
  contactProjectType: 'نوع المشروع',
  contactLandArea: 'مساحة الأرض التقريبية (م²)',
  contactPreferredPackage: 'الباقة الهندسية المفضلة',
  contactNotes: 'تفاصيل إضافية أو ملاحظات',
  contactSubmitBtn: 'إرسال طلب الاستشارة عبر الواتساب',
  officeLocationTitle: 'مقر مكتب فَلَق',
  addressText: 'محافظة الرس - طريق الملك عبدالعزيز، منطقة القصيم، المملكة العربية السعودية',
  workingHoursTitle: 'ساعات العمل الرسمية',
  workingHoursWeek: 'الأحد - الخميس: ٨:٠٠ ص - ٩:٠٠ م',
  workingHoursSat: 'السبت: ٤:٠٠ م - ٩:٠٠ م | الجمعة: مغلق',
  phoneDirect: 'الهاتف المباشر',
  emailSupport: 'البريد الإلكتروني',
  contactFormTitle: 'طلب استشارة أو عرض سعر رسمي',
  formName: 'الاسم الكريم',
  formNamePlaceholder: 'مثال: محمد بن فهد',
  formPhone: 'رقم الجوال (واتساب)',
  formPhonePlaceholder: '05xxxxxxxx',
  formProjectType: 'نوع المشروع',
  formArea: 'مساحة الأرض التقريبية (م²)',
  formAreaPlaceholder: 'مثال: 500',
  formLocation: 'مدينة المشروع',
  formLocationPlaceholder: 'الرس، بريدة، عنيزة، الرياض...',
  formPackage: 'الباقة المفضلة',
  formNotes: 'تفاصيل إضافية أو ملاحظات',
  formNotesPlaceholder: 'أود استشارة بخصوص تصميم فيلا مودرن مع إشراف هندسي...',
  btnSubmitForm: 'إرسال طلب الاستشارة عبر الواتساب',
  formSuccess: 'تم إرسال طلبك بنجاح! جاري تحويلك لمحادثة الواتساب مع مهندس فلق الاستشاري...',

  // Footer
  footerBio: 'نبتكر الفكرة.. لنبني الواقع. صرح استشاري هندسي معتمد بالرس ومنطقة القصيم يقوده نخبة من الأكاديميين والمستشارين المتخصصين.',
  footerQuickLinks: 'روابط سريعة',
  footerServices: 'الخدمات والاستشارات',
  footerHeadquarters: 'المقر الرئيسي',
  footerHQ: 'المقر الرئيسي ومعلومات الاتصال',
  footerRights: 'جميع الحقوق محفوظة © 2026 مكتب فَلَق للإستشارات الهندسية.',
  footerBackToTop: 'العودة للأعلى',

  // Sticky
  stickyWhatsapp: 'واتساب فوري',
  stickyCall: 'اتصال',
  stickyEstimator: 'احسب التكلفة',
  stickyTooltip: 'تحدث معنا على الواتساب 💬',
};

const translationsEn: Record<string, string> = {
  // Brand
  brandName: 'Falaq Engineering Consultancy Office (FEC)',
  brandOffice: 'Falaq Engineering',
  brandType: 'Engineering Consultancy',
  brandTagline: 'We Innovate the Concept.. To Build Reality',
  locationShort: 'Al-Rass, Al-Qassim Province',
  
  // Header & Nav
  navHome: 'Home',
  navAbout: 'About & Leadership',
  navAchievements: 'Achievements',
  navPackages: 'Packages & Services',
  navPortfolio: 'Portfolio',
  navEstimator: 'Cost Estimator',
  navWorkflow: 'Workflow',
  navContact: 'Contact & Office',
  navWhatsAppBtn: 'Contact via WhatsApp',
  navCallTitle: 'Direct Phone Call',

  // Hero
  heroBadgeAccredited: 'Certified Consultancy Office on Balady Platform & SCE',
  heroTitlePrefix: '',
  heroTitleFalaq: 'FALAQ',
  heroTitleSuffix: 'Engineering Consultancy',
  heroSubtitle: 'We Innovate the Concept.. To Build Reality',
  heroDescription: 'Integrated engineering and architectural solutions including architectural design, structural engineering, interior design, building permits, and occupancy certificates supervised by leading PhD consultants in compliance with Saudi Building Code (SBC).',
  heroCtaWhatsApp: 'Contact Us on WhatsApp',
  heroCtaExplore: 'Explore Packages & Services',
  heroTrust1: 'SBC Approved Blueprints',
  heroTrust2: 'Balady Permits & Certificates',
  heroTrust3: 'Certified Field Supervision',
  heroCardStyle: 'Contemporary Salmani Architecture',
  heroCardProjectTitle: 'Modern Riyadh Villa',
  heroCardLocation: 'Al-Narjis District • 650 m²',
  heroCardAction: 'View Project Details',

  // Trust Accreditations
  trustBadge: 'Official National Accreditation & Licensing',
  trustTitle: 'Fully Licensed & Certified Consultancy Office',
  crLabel: 'Commercial Registration:',
  trustSceTitle: 'Saudi Council of Engineers',
  trustSceBadge: 'Accredited Consultant Office',
  trustBaladyTitle: 'Balady Municipal Platform',
  trustBaladyBadge: 'Instant Permit Issuance',
  trustSbcTitle: 'Saudi Building Code (SBC)',
  trustSbcBadge: '100% Engineering Compliance',
  trustInsuranceTitle: 'Building Latent Defect Insurance',
  trustInsuranceBadge: 'Approved for Insurers',

  // About & Leadership
  aboutBadge: 'Vision & Strategic Leadership',
  aboutTitle: 'An Engineering Edifice Led by Academic & Industry Experts',
  aboutIntro: 'Falaq Engineering Consultancy was established in Al-Rass to serve as a beacon of engineering excellence, merging deep academic research with modern field practices and the latest Saudi Building Code.',
  aboutPillar1Title: 'Engineering Efficiency & Precision',
  aboutPillar1Desc: 'Advanced 3D structural analysis optimizing structural safety while reducing steel and concrete costs by up to 25%.',
  aboutPillar2Title: 'Authentic Architecture & Heritage',
  aboutPillar2Desc: 'Designing authentic facades inspired by Salmani and contemporary styles suited to Saudi family privacy and lifestyle.',
  aboutPillar3Title: 'Fast Municipal Permits',
  aboutPillar3Desc: 'Direct electronic integration with the Balady platform for swift issuance of construction permits and surveying decisions.',
  leadershipTitle: 'Board of Directors & Engineering Leadership',
  leadershipSubtitle: '',
  sceCertified: 'SCE Accredited',
  specialtiesLabel: 'Areas of Expertise:',
  btnVerifyConsultant: 'Consult with Expert',

  // Our Achievements
  achievementsBadge: 'Proven Track Record & Trusted Milestones',
  achievementsTitle: 'Our Achievements in Numbers & Facts',
  achievementsSubtitle: 'Record achievements reflecting leadership across Al-Rass and Al-Qassim region, founded on academic rigor and absolute dedication to project quality.',
  achievementsTabMetrics: 'Six Core Performance Metrics',
  achievementsTabSectors: 'Project Distribution by Sector',
  achievementsTabTestimonials: 'Verified Client Testimonials',
  metricTagDocumented: 'Completed Projects',
  metricTagSatisfaction: '99.4% Satisfaction',
  metricTagDegree: 'PhD Level Leadership',
  metricTagApproved: 'Approved Built Areas',
  metricTagSbc: 'Official Accreditations',
  metricTagSaving: 'Economic Value Created',
  verifiedClient: 'Verified Client',
  excellentRating: 'Outstanding Consultancy Rating',
  reviewsBasedOn: 'Based on 480+ reviews & recommendations for residential and commercial projects in Al-Qassim',
  joinSuccessPartners: 'Join Our Success Partners & Book a Consultation',
  calculateCostNow: 'Estimate Your Project Blueprint Cost',

  // Common Units & Currency
  meterSq: 'm²',
  sar: 'SAR',

  // Services & Packages
  packagesBadge: 'Flexible & Standardized Engineering Solutions',
  packagesTitle: 'Integrated Engineering Packages',
  packagesSubtitle: 'Select the optimal package for your residential or commercial project. Structured from approved base plans to turnkey on-site supervision.',
  packagesIntro: 'Select the optimal package for your residential or commercial project. Structured from approved base plans to turnkey on-site supervision.',
  packagesTabCards: 'Main Engineering Packages',
  packagesTabCompare: 'Comprehensive Deliverables Comparison Matrix',
  packagesTabTable: 'Comprehensive Deliverables Comparison Matrix',
  calculatePackageArea: 'Calculate Package Cost for Your Area',
  mostPopularBadge: 'Most Popular Choice',
  economicTierName: 'Economic Package',
  premiumTierName: 'Premium Package',
  comprehensiveTierName: 'Comprehensive Package',
  economicDesc: 'Standard approved blueprints for building permit issuance and Saudi Building Code (SBC) compliance.',
  premiumDesc: 'Full architectural & 3D exterior design with complete execution plans and bills of quantities.',
  comprehensiveDesc: 'Complete turnkey solution: luxury interior design, full field supervision, and occupancy certificate issuance.',
  whatIncluded: 'Included Deliverables & Services:',
  btnSelectPackage: 'Select & Calculate Cost',
  btnBookWhatsApp: 'Request Consultation for Package',
  viewDetailsModal: 'View Deliverables',
  closeModal: 'Close',

  // Cost Estimator
  estimatorBadge: 'Interactive Instant Cost Calculator',
  estimatorTitle: 'Accurately Estimate Blueprint Costs',
  estimatorSubtitle: 'Select your project type, land area, and floors to receive an instant price estimation with detailed deliverables.',
  calcBadge: 'Instant Engineering Cost Calculator',
  calcTitle: 'Estimate Your Project Blueprint Cost',
  calcIntro: 'Select project type, land area, and floors to get an instant estimate compliant with the Saudi Building Code (SBC).',
  calcStep1: '1. Project Architectural Type:',
  calcStep2: '2. Total Land Area:',
  calcStep3: '3. Number of Floors:',
  calcStep4: '4. Selected Engineering Package:',
  calcStep5: '5. Additional Engineering Services (Optional):',
  calcInstantBadge: 'Instant Estimated Quotation',
  calcDuration: 'Estimated Timeline',
  calcBuiltArea: 'Estimated Built-Up Area',
  calcSelectedPkg: 'Selected Package',
  calcBlueprintFees: 'Blueprint & Design Fees',
  calcSupervisionFees: 'Field Supervision Fees',
  calcTotalHeading: 'Total Estimated Blueprint Cost',
  calcDisclaimer: '* Guideline price including VAT and Saudi Building Code (SBC) compliance, subject to site inspection.',
  calcRequestOfficialQuote: 'Request Official Detailed Quotation on WhatsApp',
  typeVilla: 'Residential Villa',
  typeCommercial: 'Commercial Building',
  typeInterior: 'Interior Design',
  typeChalet: 'Chalet / Resort',
  floors1: 'Single Floor',
  floors2: 'Two Floors (Ground + 1st)',
  floorsVilla: 'Two Floors + Annex (Full Villa)',
  projectTypeLabel: '1. Project Architectural Type:',
  landAreaLabel: '2. Total Land Area:',
  floorsLabel: '3. Number of Floors:',
  packageChoiceLabel: '4. Selected Engineering Package:',
  calculatedBuiltArea: 'Estimated Built-Up Area:',
  sqmUnit: 'm²',
  estimatedCostTotal: 'Total Estimated Blueprint Cost',
  priceDisclaimer: '* Guideline price including VAT and Saudi Building Code (SBC) compliance, subject to site inspection.',
  btnRequestExactQuote: 'Request Official Detailed Quotation on WhatsApp',
  packageIncludesBrief: 'Key Deliverables for Selected Package:',

  // Portfolio
  portfolioBadge: 'Our Featured Projects & Blueprints',
  portfolioTitle: 'Architectural Portfolio & Residential Villas',
  portfolioSubtitle: 'Explore our finest architectural and structural designs completed across Al-Rass, Al-Qassim, and Saudi Arabia.',
  portfolioIntro: 'Explore our finest architectural and structural designs completed across Al-Rass, Al-Qassim, and Saudi Arabia.',
  portfolioViewDetails: 'View Blueprints & Specs',
  filterAll: 'All Projects',
  filterResidential: 'Residential Villas & Palaces',
  filterCommercial: 'Commercial Centers & Plazas',
  filterInterior: 'Interior Design & Decor',
  filterHospitality: 'Resorts & Chalets',
  btnViewProjectSpecs: 'View Blueprints & Specs',
  statusCompleted: 'Completed & Licensed',
  statusSupervision: 'Under Construction & Supervision',

  // Workflow & FAQ
  workflowBadge: 'Approved Engineering Workflow',
  workflowTitle: 'How We Build Your Project Step by Step',
  workflowSubtitle: 'A structured, transparent workflow ensuring peace of mind and precision from initial consultation to final electrical connection.',
  workflowIntro: 'A structured, transparent workflow ensuring peace of mind and precision from initial consultation to final electrical connection.',
  faqBadge: 'Frequently Asked Questions',
  faqTitle: 'Frequently Asked Questions',
  faqSubtitle: 'Comprehensive technical answers for clients in Al-Qassim Province',

  // Contact & Location
  contactBadge: 'Headquarters & Communication',
  contactTitle: 'Visit Our Office or Contact Us Now',
  contactSubtitle: 'Our consultancy team is ready to answer inquiries and provide technical guidance for your project.',
  contactIntro: 'Our consultancy team is ready to answer inquiries and provide technical guidance for your project.',
  contactOfficeDetails: 'Office Location & Working Hours',
  contactDirectWhatsApp: 'Direct WhatsApp Chat',
  contactMapTitle: 'Our Location on Google Maps',
  contactOpenInGoogleMaps: 'Open in Google Maps',
  contactFormSubtitle: 'Fill in your project details and a certified engineering consultant will contact you promptly.',
  contactFullName: 'Full Name',
  contactPhone: 'Mobile Number (WhatsApp)',
  contactProjectType: 'Project Type',
  contactLandArea: 'Approximate Land Area (m²)',
  contactPreferredPackage: 'Preferred Package',
  contactNotes: 'Additional Details or Notes',
  contactSubmitBtn: 'Send Consultation Request via WhatsApp',
  officeLocationTitle: 'Falaq Office Headquarters',
  addressText: 'King Abdulaziz Road, Al-Rass Province, Al-Qassim, Kingdom of Saudi Arabia',
  workingHoursTitle: 'Working Hours',
  workingHoursWeek: 'Sunday - Thursday: 8:00 AM - 9:00 PM',
  workingHoursSat: 'Saturday: 4:00 PM - 9:00 PM | Friday: Closed',
  phoneDirect: 'Direct Phone',
  emailSupport: 'Official Email',
  contactFormTitle: 'Request Consultation or Official Quotation',
  formName: 'Full Name',
  formNamePlaceholder: 'e.g. Mohammed Al-Fahad',
  formPhone: 'Mobile Number (WhatsApp)',
  formPhonePlaceholder: '05xxxxxxxx',
  formProjectType: 'Project Type',
  formArea: 'Approximate Land Area (m²)',
  formAreaPlaceholder: 'e.g. 500',
  formLocation: 'Project City',
  formLocationPlaceholder: 'Al-Rass, Buraidah, Unaizah, Riyadh...',
  formPackage: 'Preferred Package',
  formNotes: 'Additional Details or Notes',
  formNotesPlaceholder: 'Looking for modern villa design with full engineering supervision...',
  btnSubmitForm: 'Send Consultation Request via WhatsApp',
  formSuccess: 'Your request was sent successfully! Redirecting to WhatsApp with Falaq consultant...',

  // Footer
  footerBio: 'We Innovate the Concept.. To Build Reality. Certified engineering consultancy office in Al-Rass led by academic and professional consultants.',
  footerQuickLinks: 'Quick Links',
  footerServices: 'Services & Consultancy',
  footerHeadquarters: 'Headquarters',
  footerHQ: 'Headquarters & Contact Information',
  footerRights: 'All Rights Reserved © 2026 Falaq Engineering Consultancy (FEC).',
  footerBackToTop: 'Back to Top',

  // Sticky
  stickyWhatsapp: 'Instant WhatsApp',
  stickyCall: 'Call Now',
  stickyEstimator: 'Calculate Cost',
  stickyTooltip: 'Chat with us on WhatsApp 💬',
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('falaq_lang') as Language;
      if (saved === 'ar' || saved === 'en') return saved;
    }
    return 'ar';
  });

  const isAr = language === 'ar';
  const direction = isAr ? 'rtl' : 'ltr';

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
      document.documentElement.dir = direction;
      if (isAr) {
        document.documentElement.classList.add('lang-ar');
        document.documentElement.classList.remove('lang-en');
      } else {
        document.documentElement.classList.add('lang-en');
        document.documentElement.classList.remove('lang-ar');
      }
      localStorage.setItem('falaq_lang', language);
    }
  }, [language, isAr, direction]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const toggleLanguage = () => {
    setLanguageState(prev => (prev === 'ar' ? 'en' : 'ar'));
  };

  const t = (key: string): string => {
    const dict = isAr ? translationsAr : translationsEn;
    return dict[key] || translationsAr[key] || key;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        direction,
        isAr,
        setLanguage,
        toggleLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
