export interface TranslationKeys {
  common: {
    startProject: string;
    exploreWork: string;
    viewAll: string;
    back: string;
    reset: string;
    submit: string;
    loading: string;
  };
  nav: {
    brandName: string;
    brandTagline: string;
    home: string;
    projects: string;
    services: string;
    howWeWork: string;
    pricing: string;
    contact: string;
    startProject: string;
    switchToLight: string;
    switchToDark: string;
    langSwitch: string;
    langSwitchShort: string;
    openMenu: string;
    closeMenu: string;
  };
  hero: {
    kicker: string;
    kickerBrand: string;
    kickerTagline: string;
    kickerSub: string;
    title: string;
    subtitle: string;
    description: string;
    ctaPrimary: string;
    ctaSecondary: string;
    exploreWork: string;
    startProject: string;
    metric1Value: string;
    metric1Val: string;
    metric1Label: string;
    metric2Value: string;
    metric2Val: string;
    metric2Label: string;
    metric3Value: string;
    metric3Val: string;
    metric3Label: string;
    pillar1Tag: string;
    pillar1Title: string;
    pillar2Tag: string;
    pillar2Title: string;
    pillar3Tag: string;
    pillar3Title: string;
    pillar4Tag: string;
    pillar4Title: string;
  };
  projectsSection: {
    kicker: string;
    title: string;
    subtitle: string;
    description: string;
    viewAll: string;
    statusLabel: string;
    exploreCaseStudy: string;
    liveStatus: string;
    prototypeStatus: string;
    completedStatus: string;
  };
  servicesSection: {
    kicker: string;
    title: string;
    subtitle: string;
    description: string;
    capabilityTag: string;
    disciplineLabel: string;
    bestFor: string;
  };
  processSection: {
    kicker: string;
    title: string;
    subtitle: string;
    description: string;
    phaseLabel: string;
  };
  methodologySection: {
    kicker: string;
    title: string;
    description: string;
    phaseLabel: string;
  };
  pricingSection: {
    kicker: string;
    title: string;
    subtitle: string;
    description: string;
    currency: string;
    currencyLabel: string;
    usdLabel: string;
    egpLabel: string;
    requestQuote: string;
    included: string;
    excluded: string;
    disclaimerTitle: string;
    disclaimersTitle: string;
    typicalTimeframe: string;
    includedScope: string;
    mostRequested: string;
  };
  finalCta: {
    kicker: string;
    title: string;
    subtitle: string;
    description: string;
    ctaPrimary: string;
    ctaSecondary: string;
    startProject: string;
    exploreWork: string;
  };
  portfolioPage: {
    kicker: string;
    title: string;
    subtitle: string;
    filterCategory: string;
    filterStatus: string;
    resetFilters: string;
    noResults: string;
    noResultsDesc: string;
  };
  projectsPage: {
    title: string;
    metaDescription: string;
    kicker: string;
    heading: string;
    subheading: string;
    searchPlaceholder: string;
    allFilter: string;
    noResultsTitle: string;
    noResultsDesc: string;
    resetFilters: string;
    cardBadge: string;
  };
  projectDetail: {
    backToProjects: string;
    backToPortfolio: string;
    statusLabel: string;
    structuredSlot: string;
    liveDemo: string;
    repoUrl: string;
    startSimilar: string;
    problemStatement: string;
    challengeTitle: string;
    solutionOverview: string;
    solutionTitle: string;
    keyFeatures: string;
    keyFeaturesTitle: string;
    verifiedOutcomes: string;
    outcomesTitle: string;
    galleryTitle: string;
    nubixContribution: string;
    contributionTitle: string;
    technologies: string;
    technologiesTitle: string;
    relatedProjects: string;
    testimonialTitle: string;
    readyTitle: string;
    readySubtitle: string;
    discussButton: string;
    notFoundTitle: string;
    notFoundDesc: string;
    returnButton: string;
  };
  contactPage: {
    metaTitle: string;
    metaDescription: string;
    kicker: string;
    title: string;
    heading: string;
    subtitle: string;
    subheading: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    companyLabel: string;
    companyPlaceholder: string;
    projectTypeLabel: string;
    platformLabel: string;
    budgetLabel: string;
    timelineLabel: string;
    descriptionLabel: string;
    descriptionPlaceholder: string;
    consent: string;
    submitButton: string;
    successTitle: string;
    successMessage: string;
    formName: string;
    formEmail: string;
    formOrg: string;
    formProjectType: string;
    formModel: string;
    formTimeline: string;
    formBudget: string;
    formDetails: string;
    formSubmit: string;
    formSubmitting: string;
    formSuccessTitle: string;
    formSuccessDesc: string;
    formSendAnother: string;
    directTitle: string;
    responseGuarantee: string;
    responseGuaranteeText: string;
    location: string;
    locationVal: string;
    models: {
      ready: string;
      customized: string;
      customBuilt: string;
    };
    projectTypes: {
      web: string;
      ai: string;
      backend: string;
      modernization: string;
    };
  };
  newsletter: {
    kicker: string;
    title: string;
    subtitle: string;
    description: string;
    placeholder: string;
    button: string;
    subscribing: string;
    privacy: string;
    success: string;
    successToast: string;
    invalidEmailToast: string;
    alreadySubscribedToast: string;
  };
  footer: {
    description: string;
    navigation: string;
    capabilities: string;
    brandTagline: string;
    navColTitle: string;
    capsColTitle: string;
    homeLink: string;
    portfolioLink: string;
    servicesLink: string;
    howWeWorkLink: string;
    pricingLink: string;
    contactLink: string;
    rights: string;
  };
  console3D: {
    consoleTitle: string;
    statusActive: string;
    metrics: {
      uptime: string;
      aiPipeline: string;
      p99Latency: string;
      security: string;
    };
    modes: {
      architecture: string;
      pipeline: string;
      mesh: string;
    };
  };
}

export const TRANSLATIONS: Record<'ar' | 'en', TranslationKeys> = {
  ar: {
    common: {
      startProject: 'بدء المشروع',
      exploreWork: 'استعرض أعمالنا',
      viewAll: 'عرض الكل',
      back: 'رجوع',
      reset: 'إعادة تعيين',
      submit: 'إرسال',
      loading: 'جارٍ التحميل...',
    },
    nav: {
      brandName: 'نوبيكس',
      brandTagline: 'استوديو البرمجيات والذكاء الاصطناعي',
      home: 'الرئيسية',
      projects: 'المشاريع',
      services: 'الخدمات',
      howWeWork: 'منهجية العمل',
      pricing: 'الأسعار',
      contact: 'تواصل معنا',
      startProject: 'ابدأ مشروعك',
      switchToLight: 'التبديل إلى الوضع الفاتح',
      switchToDark: 'التبديل إلى الوضع الداكن',
      langSwitch: 'English',
      langSwitchShort: 'EN',
      openMenu: 'فتح القائمة الرئيسية',
      closeMenu: 'إغلاق القائمة',
    },
    hero: {
      kicker: 'استوديو البرمجيات والذكاء الاصطناعي للشركات',
      kickerBrand: 'نوبيكس',
      kickerTagline: 'استوديو البرمجيات والذكاء الاصطناعي',
      kickerSub: 'هندسة برمجية للإنتاج الفعلي',
      title: 'نبني برمجيات فائقة الأداء وأنظمة ذكاء اصطناعي ذكية.',
      subtitle: 'نصمم ونطور منصات رقمية وحلول أتمتة مخصصة تساعد الشركات على التوسع والريادة.',
      description: 'نصمم ونطور منصات رقمية وحلول أتمتة مخصصة تساعد الشركات على التوسع والريادة.',
      ctaPrimary: 'استكشف أعمالنا',
      ctaSecondary: 'ابدأ مشروعك معنا',
      exploreWork: 'استكشف أعمالنا',
      startProject: 'ابدأ مشروعك معنا',
      metric1Value: '< 65ms',
      metric1Val: '< 65ms',
      metric1Label: 'زمن استجابة فائق',
      metric2Value: '100%',
      metric2Val: '100%',
      metric2Label: 'أمان وأنظمة محكمة',
      metric3Value: '99.98%',
      metric3Val: '99.98%',
      metric3Label: 'جاهزية تشغيلية',
      pillar1Tag: '٠١ · التركيز الأساسي',
      pillar1Title: 'برمجيات مخصصة وذكاء اصطناعي',
      pillar2Tag: '٠٢ · نماذج التنفيذ',
      pillar2Title: 'حلول جاهزة · مخصصة · هجينة',
      pillar3Tag: '٠٣ · معايير الجودة',
      pillar3Title: 'كود محكم، موثوق وقابل للتوسع',
      pillar4Tag: '٠٤ · نطاق العمل',
      pillar4Title: 'مصر وجميع أنحاء العالم',
    },
    projectsSection: {
      kicker: '٠١. معرض الأعمال',
      title: 'مشاريع هندسية ذات أثر تشغيلي حقيقي',
      subtitle: 'استكشف منصات الويب، ومسارات عمل الذكاء الاصطناعي، والبنى التحتية الموزعة التي أنجزناها.',
      description: 'استكشف منصات الويب، ومسارات عمل الذكاء الاصطناعي، والبنى التحتية الموزعة التي أنجزناها.',
      viewAll: 'عرض جميع المشاريع',
      statusLabel: 'الحالة:',
      exploreCaseStudy: 'عرض دراسة الحالة',
      liveStatus: 'نشط للإنتاج',
      prototypeStatus: 'نموذج أولي',
      completedStatus: 'مكتمل ومسلّم',
    },
    servicesSection: {
      kicker: '٠٢. قدرات وخدمات الاستوديو',
      title: 'هندسة عملية عبر أربعة تخصصات محورية',
      subtitle: 'نركز حصرياً على القدرات التي ننفذها داخلياً بأعلى معايير الانضباط الهندسي—من البنية الأولية إلى دمج مسارات الذكاء الاصطناعي.',
      description: 'نركز حصرياً على القدرات التي ننفذها داخلياً بأعلى معايير الانضباط الهندسي—من البنية الأولية إلى دمج مسارات الذكاء الاصطناعي.',
      capabilityTag: 'قدرة استوديو',
      disciplineLabel: 'خبرات شركة نوبيكس',
      bestFor: 'الأفضل لـ',
    },
    processSection: {
      kicker: '٠٣. منهجية التنفيذ',
      title: 'كيف نعمل من الفكرة الأولى وحتى التسليم للإنتاج',
      subtitle: 'مواصفات دقيقة، ومراحل واضحة، وتواصل شفاف ومباشر بدون تعقيدات.',
      description: 'مواصفات دقيقة، ومراحل واضحة، وتواصل شفاف ومباشر بدون تعقيدات.',
      phaseLabel: 'المرحلة',
    },
    methodologySection: {
      kicker: '٠٣. منهجية العمل',
      title: 'كيف نعمل من الفكرة وحتى التسليم والتشغيل',
      description: 'مواصفات دقيقة، ومراحل واضحة، وتواصل شفاف ومباشر بدون تعقيدات.',
      phaseLabel: 'المرحلة',
    },
    pricingSection: {
      kicker: '٠٤. نماذج تسعير واضحة',
      title: 'هياكل تعاقد شفافة ومرنة',
      subtitle: 'اختر بين الأنظمة الجاهزة للتسليم، أو تكييف وحدات قائمة، أو بناء نظام مخصص بالكامل من البداية.',
      description: 'اختر بين الأنظمة الجاهزة للتسليم، أو تكييف وحدات قائمة، أو بناء نظام مخصص بالكامل من البداية.',
      currency: 'العملة المرجعية',
      currencyLabel: 'العملة المرجعية:',
      usdLabel: 'دولار أمريكي ($)',
      egpLabel: 'جنيه مصري (EGP)',
      requestQuote: 'طلب دراسة وعرض سعر',
      included: 'ما تشمله الباقة',
      excluded: 'ما لا تشمله الباقة',
      disclaimerTitle: 'ملاحظات هامة حول التسعير وخدمات الأطراف الثالثة',
      disclaimersTitle: 'ملاحظات هامة حول التسعير وخدمات الأطراف الثالثة',
      typicalTimeframe: 'الجدول الزمني المعتاد',
      includedScope: 'نطاق العمل الأساسي',
      mostRequested: 'الأكثر طلباً',
    },
    finalCta: {
      kicker: '٠٥. بدء المشروع',
      title: 'هل لديك فكرة منتج برمجي أو مسار ذكاء اصطناعي؟',
      subtitle: 'شاركنا متطلباتك، والجدول الزمني المستهدف، والنموذج المفضل. نراجع كل طلب باهتمام ونرد بتقييم معماري وخطوات عملية.',
      description: 'شاركنا متطلباتك، والجدول الزمني المستهدف، والنموذج المفضل. نراجع كل طلب باهتمام ونرد بتقييم معماري وخطوات عملية.',
      ctaPrimary: 'ابدأ مشروعك الآن',
      ctaSecondary: 'استكشف أعمالنا السابقة',
      startProject: 'ابدأ مشروعك الآن',
      exploreWork: 'استكشف أعمالنا السابقة',
    },
    portfolioPage: {
      kicker: 'معرض الأعمال والمشاريع',
      title: 'مشاريع البرمجيات والذكاء الاصطناعي المختارة',
      subtitle: 'كل مشروع موثق بالتفصيل مع بيان المشكلة، والحل المعماري، وحزمة التقنيات المستخدمة، ومساهمة نوبيكس المباشرة.',
      filterCategory: 'تصفية حسب التخصص',
      filterStatus: 'تصفية حسب الحالة',
      resetFilters: 'إعادة تعيين المرشحات',
      noResults: 'لا توجد مشاريع مطابقة',
      noResultsDesc: 'جرب إزالة مرشح التخصص أو الحالة لعرض كافة مشاريع نوبيكس الموثقة.',
    },
    projectsPage: {
      title: 'معرض المشاريع ودراسات الحالة | نوبيكس',
      metaDescription: 'استعرض دراسات الحالة في تطوير البرمجيات وحلول الذكاء الاصطناعي التطبيقية من استوديو نوبيكس.',
      kicker: 'سجل المشاريع والأعمال',
      heading: 'مشاريع برمجية وحلول ذكاء اصطناعي موثقة',
      subheading: 'كل مشروع موثق بالتفصيل مع بيان المشكلة، والحل المعماري، والتقنيات المستخدمة، ونتائج التنفيذ.',
      searchPlaceholder: 'البحث في المشاريع والتقنيات...',
      allFilter: 'الكل',
      noResultsTitle: 'لا توجد مشاريع مطابقة للبحث',
      noResultsDesc: 'يرجى تجربة كلمات بحث أخرى أو إعادة ضبط التصفية لعرض المشاريع المتاحة.',
      resetFilters: 'إعادة ضبط التصفية',
      cardBadge: 'دراسة حالة',
    },
    projectDetail: {
      backToProjects: 'العودة لمعرض المشاريع',
      backToPortfolio: 'العودة لمعرض المشاريع',
      statusLabel: 'الحالة:',
      structuredSlot: 'دراسة حالة موثقة',
      liveDemo: 'فتح العرض المباشر',
      repoUrl: 'عرض المستودع المصدري',
      startSimilar: 'طلب بناء مشروع مماثل',
      problemStatement: 'بيان المشكلة والتحدي',
      challengeTitle: 'التحدي والمشكلة',
      solutionOverview: 'الحل المعماري والتنفيذ',
      solutionTitle: 'الحل المعماري',
      keyFeatures: 'الميزات والقدرات الأساسية',
      keyFeaturesTitle: 'الميزات والقدرات الأساسية',
      verifiedOutcomes: 'النتائج الموثقة',
      outcomesTitle: 'النتائج الموثقة',
      galleryTitle: 'معرض لقطات الشاشة ونماذج الواجهات',
      nubixContribution: 'مساهمة نوبيكس الهندسية',
      contributionTitle: 'مساهمة نوبيكس الهندسية',
      technologies: 'حزمة التقنيات المستخدمة',
      technologiesTitle: 'حزمة التقنيات المستخدمة',
      relatedProjects: 'مشاريع ذات صلة',
      testimonialTitle: 'آراء وشهادات الشركاء',
      readyTitle: 'هل تخطط لبناء نظام مشابه؟',
      readySubtitle: 'اطلب تكييف حل جاهز أو مقترح بناء مخصص بالكامل وفق هذه البنية.',
      discussButton: 'ابدأ مشروعاً مشابهاً',
      notFoundTitle: 'دراسة الحالة غير متوفرة',
      notFoundDesc: 'تعذر العثور على دراسة الحالة المطلوبة. يرجى مراجعة قائمة المشاريع.',
      returnButton: 'العودة إلى المشاريع',
    },
    contactPage: {
      metaTitle: 'ابدأ مشروعك — استفسار وتقييم فني | نوبيكس',
      metaDescription: 'أرسل تفاصيل مشروعك إلى نوبيكس لتطوير البرمجيات وحلول الذكاء الاصطناعي.',
      kicker: 'استفسار عن مشروع · مقترحات هندسية مدروسة',
      title: 'ابدأ مشروعك التقني مع نوبيكس',
      heading: 'ابدأ مشروعك التقني مع نوبيكس',
      subtitle: 'أخبرنا عن الفكرة أو المشكلة التي تريد حلها، والمنصة المستهدفة، وسواء كنت تبحث عن حل جاهز أو تطوير مخصص.',
      subheading: 'أخبرنا عن الفكرة أو المشكلة التي تريد حلها، والمنصة المستهدفة، وسواء كنت تبحث عن حل جاهز أو تطوير مخصص.',
      nameLabel: 'الاسم أو جهة الاتصال المفضلة',
      namePlaceholder: 'مثال: طارق منصور',
      emailLabel: 'عنوان البريد الإلكتروني',
      emailPlaceholder: 'you@company.com',
      companyLabel: 'اسم الشركة أو المنظمة',
      companyPlaceholder: 'اسم الشركة أو مبادرة مستقلة',
      projectTypeLabel: 'نوع المشروع أو نموذج العمل',
      platformLabel: 'المنصة المستهدفة',
      budgetLabel: 'الميزانية التقديرية',
      timelineLabel: 'الجدول الزمني المستهدف',
      descriptionLabel: 'وصف المشروع والمتطلبات الأساسية',
      descriptionPlaceholder: 'صف المشكلة الأساسية، والمستخدمين المستهدفين، والتكاملات المطلوبة، أو الوحدة الجاهزة التي تريد تكييفها...',
      consent: 'أوافق على قيام نوبيكس بمعالجة وتخزين بيانات التواصل والمشروع أعلاه حصرياً بهدف تقييم هذا الاستفسار وإعداد الرد الفني.',
      submitButton: 'إرسال تفاصيل المشروع',
      successTitle: 'تم إرسال استفسارك بنجاح',
      successMessage: 'تم استلام تفاصيل مشروعك بنجاح وسيقوم فريق الاستوديو الهندسي بمراجعتها والرد عليك بالبريد.',
      formName: 'الاسم الكامل',
      formEmail: 'البريد الإلكتروني للعمل',
      formOrg: 'اسم الشركة / المؤسسة',
      formProjectType: 'نوع الخدمة المطلوبة',
      formModel: 'نموذج التعاقد المفضل',
      formTimeline: 'الجدول الزمني المتوقع',
      formBudget: 'الميزانية التقديرية',
      formDetails: 'تفاصيل ومتطلبات المشروع',
      formSubmit: 'إرسال طلب المشروع',
      formSubmitting: 'جارٍ التحقق والإرسال...',
      formSuccessTitle: 'تم إرسال استفسارك بنجاح',
      formSuccessDesc: 'سنراجع تفاصيل مشروعك ونرد عليك خلال ٢٤ إلى ٤٨ ساعة عمل مع تقييم أولي.',
      formSendAnother: 'إرسال استفسار إضافي',
      directTitle: 'تواصل مباشر مع الاستوديو',
      responseGuarantee: 'ضمان الاستجابة السريعة',
      responseGuaranteeText: 'نرد على كافة الاستفسارات الهندسية خلال يومين عمل بحد أقصى.',
      location: 'الموقع الجغرافي',
      locationVal: 'القاهرة، مصر (نعمل مع عملاء محلياً ودولياً)',
      models: {
        ready: 'حل جاهز للتسليم السريع (النموذج أ)',
        customized: 'تطوير وتخصيص نظام قائم (النموذج ب)',
        customBuilt: 'بناء وتطوير مخصص بالكامل (النموذج ج)',
      },
      projectTypes: {
        web: 'تطوير تطبيقات الويب والهواتف',
        ai: 'حلول الذكاء الاصطناعي وأتمتة مسارات العمل',
        backend: 'البنى التحتية والتكاملات البرمجية',
        modernization: 'تحديث الأنظمة والصيانة المستمرة',
      },
    },
    newsletter: {
      kicker: 'رادار نوبيكس التقني · نشرة نصف شهرية',
      title: 'رؤى هندسية معمقة وتطبيقات عملية في الذكاء الاصطناعي',
      subtitle: 'مخططات معمارية مدروسة، وتفاصيل نشر الأنظمة الموزعة، وتطبيقات عملية لنماذج الذكاء الاصطناعي مباشرة من مهندسينا. محتوى تقني خالص بدون رسائل ترويجية.',
      description: 'مخططات معمارية مدروسة، وتفاصيل نشر الأنظمة الموزعة، وتطبيقات عملية لنماذج الذكاء الاصطناعي مباشرة من مهندسينا. محتوى تقني خالص بدون رسائل ترويجية.',
      placeholder: 'engineer@company.com',
      button: 'اشتراك في النشرة',
      subscribing: 'جارٍ التسجيل...',
      privacy: 'بدون رسائل مزعجة. يمكنك إلغاء الاشتراك بنقرة واحدة في أي وقت.',
      success: 'لقد حجزنا مكانك للإصدار القادم من نشرتنا الهندسية.',
      successToast: 'تم تأكيد اشتراكك في نشرة نوبيكس التقنية بنجاح!',
      invalidEmailToast: 'يرجى إدخال بريد إلكتروني صحيح للاشتراك.',
      alreadySubscribedToast: 'أنت مسجل بالفعل في قائمة النشرة التقنية.',
    },
    footer: {
      description: 'أفكارك.. منتجات رقمية ذكية.',
      navigation: 'روابط التنقل',
      capabilities: 'القدرات الهندسية الأساسية',
      brandTagline: 'أفكارك.. منتجات رقمية ذكية.',
      navColTitle: 'روابط التنقل',
      capsColTitle: 'القدرات الأساسية',
      homeLink: 'الرئيسية',
      portfolioLink: 'معرض المشاريع',
      servicesLink: 'الخدمات والقدرات',
      howWeWorkLink: 'منهجية العمل',
      pricingLink: 'نماذج التسعير',
      contactLink: 'طلب مشروع',
      rights: 'جميع الحقوق محفوظة.',
    },
    console3D: {
      consoleTitle: 'لوحة التحكم والتحليل الهندسي ثلاثية الأبعاد',
      statusActive: 'الأنظمة نشطة وجاهزة',
      metrics: {
        uptime: 'نسبة الجاهزية ٩٩.٩٨٪',
        aiPipeline: 'مسارات الذكاء الاصطناعي نشطة',
        p99Latency: 'زمن الاستجابة P99: ٤٢ مللي ثانية',
        security: 'تشفير كامل وحماية متقدمة',
      },
      modes: {
        architecture: 'المعمارية',
        pipeline: 'المسارات',
        mesh: 'الهيكل',
      },
    },
  },
  en: {
    common: {
      startProject: 'Start a Project',
      exploreWork: 'Explore Our Work',
      viewAll: 'View All',
      back: 'Back',
      reset: 'Reset',
      submit: 'Submit',
      loading: 'Loading...',
    },
    nav: {
      brandName: 'Nubix',
      brandTagline: 'Software & AI Studio',
      home: 'Home',
      projects: 'Projects',
      services: 'Services',
      howWeWork: 'How We Work',
      pricing: 'Pricing',
      contact: 'Contact',
      startProject: 'Start a Project',
      switchToLight: 'Switch to Light Mode',
      switchToDark: 'Switch to Dark Mode',
      langSwitch: 'العربية',
      langSwitchShort: 'عربي',
      openMenu: 'Open main menu',
      closeMenu: 'Close menu',
    },
    hero: {
      kicker: 'AI & Software Engineering Studio',
      kickerBrand: 'Nubix',
      kickerTagline: 'AI & Software Studio',
      kickerSub: 'Production-Grade Software',
      title: 'High-performance software and applied AI systems.',
      subtitle: 'We engineer custom digital platforms and intelligent automation built for production scale.',
      description: 'We engineer custom digital platforms and intelligent automation built for production scale.',
      ctaPrimary: 'Explore Our Work',
      ctaSecondary: 'Start a Project',
      exploreWork: 'Explore Our Work',
      startProject: 'Start a Project',
      metric1Value: '< 65ms',
      metric1Val: '< 65ms',
      metric1Label: 'Edge Latency',
      metric2Value: '100%',
      metric2Val: '100%',
      metric2Label: 'Type Safety & Security',
      metric3Value: '99.98%',
      metric3Val: '99.98%',
      metric3Label: 'System Availability',
      pillar1Tag: '01 · Core Focus',
      pillar1Title: 'Custom Software & AI',
      pillar2Tag: '02 · Delivery Models',
      pillar2Title: 'Ready · Custom · Hybrid',
      pillar3Tag: '03 · Engineering Rigor',
      pillar3Title: 'Typed, Tested & Scalable',
      pillar4Tag: '04 · Coverage',
      pillar4Title: 'Egypt & Worldwide',
    },
    projectsSection: {
      kicker: '01. Selected Projects',
      title: 'Engineered for real operational outcomes',
      subtitle: 'Explore our web platforms, intelligent AI pipelines, and enterprise architectures built for performance and scale.',
      description: 'Explore our web platforms, intelligent AI pipelines, and enterprise architectures built for performance and scale.',
      viewAll: 'View All Projects',
      statusLabel: 'Status:',
      exploreCaseStudy: 'Explore Case Study',
      liveStatus: 'Live',
      prototypeStatus: 'Prototype',
      completedStatus: 'Completed',
    },
    servicesSection: {
      kicker: '02. Studio Capabilities',
      title: 'Practical engineering across four core disciplines',
      subtitle: 'We focus strictly on capabilities we deliver in-house with high technical rigor—from initial architecture to AI pipeline integration and long-term optimization.',
      description: 'We focus strictly on capabilities we deliver in-house with high technical rigor—from initial architecture to AI pipeline integration and long-term optimization.',
      capabilityTag: 'Capability',
      disciplineLabel: 'Nubix Company Expertise',
      bestFor: 'Best for',
    },
    processSection: {
      kicker: '03. Delivery Methodology',
      title: 'How we work from first brief to production handover',
      subtitle: 'Clear specifications, predictable milestones, and transparent communication without unnecessary layers.',
      description: 'Clear specifications, predictable milestones, and transparent communication without unnecessary layers.',
      phaseLabel: 'Phase',
    },
    methodologySection: {
      kicker: '03. Delivery Methodology',
      title: 'How we work from first brief to production handover',
      description: 'Clear specifications, predictable milestones, and transparent communication without unnecessary layers.',
      phaseLabel: 'Phase',
    },
    pricingSection: {
      kicker: '04. Transparent Pricing Models',
      title: 'Transparent engagement structures',
      subtitle: 'Choose between ready-to-deploy systems, tailored adaptations of existing modules, or ground-up custom engineering.',
      description: 'Choose between ready-to-deploy systems, tailored adaptations of existing modules, or ground-up custom engineering.',
      currency: 'Currency',
      currencyLabel: 'Currency:',
      usdLabel: 'USD ($)',
      egpLabel: 'EGP (Egypt)',
      requestQuote: 'Request a Quote',
      included: 'What is included',
      excluded: 'What is excluded',
      disclaimerTitle: 'Important Pricing & Third-Party Service Notes',
      disclaimersTitle: 'Important Pricing & Third-Party Service Notes',
      typicalTimeframe: 'Typical Timeframe',
      includedScope: 'Included in Base Scope',
      mostRequested: 'Most Requested',
    },
    finalCta: {
      kicker: '05. Project Initiation',
      title: 'Have a software product or AI workflow in mind?',
      subtitle: 'Share your requirements, target timeline, and preferred model. We review every inquiry and respond with concrete architectural feedback and next steps.',
      description: 'Share your requirements, target timeline, and preferred model. We review every inquiry and respond with concrete architectural feedback and next steps.',
      ctaPrimary: 'Start a Project',
      ctaSecondary: 'Explore Our Work',
      startProject: 'Start a Project',
      exploreWork: 'Explore Our Work',
    },
    portfolioPage: {
      kicker: 'Portfolio Index',
      title: 'Selected software & AI projects',
      subtitle: 'Every project is documented with its problem statement, architectural solution, technology stack, and Nubix\'s direct engineering contribution.',
      filterCategory: 'Filter by Capability',
      filterStatus: 'Filter by Status',
      resetFilters: 'Reset Filters',
      noResults: 'No Matching Projects',
      noResultsDesc: 'Try clearing the capability or status filter to view all documented Nubix project entries.',
    },
    projectsPage: {
      title: 'Project Portfolio & 3D Case Studies | Nubix — Software & AI Studio',
      metaDescription: 'Explore software engineering, web and mobile development, and applied AI case studies by Nubix.',
      kicker: 'Portfolio Index',
      heading: 'Selected software & AI projects',
      subheading: 'Every project is documented with its problem statement, architectural solution, technology stack, and Nubix\'s direct engineering contribution.',
      searchPlaceholder: 'Search projects by technology, category or keywords...',
      allFilter: 'All',
      noResultsTitle: 'No Matching Projects',
      noResultsDesc: 'Try clearing the capability or status filter to view all documented Nubix project entries.',
      resetFilters: 'Reset Filters',
      cardBadge: 'Case Study',
    },
    projectDetail: {
      backToProjects: 'Back to Portfolio Index',
      backToPortfolio: 'Back to Portfolio Index',
      statusLabel: 'Status:',
      structuredSlot: 'Structured Case Study Slot',
      liveDemo: 'Open Live Demo',
      repoUrl: 'View Public Repository',
      startSimilar: 'Start a Similar Project',
      problemStatement: 'Problem Statement',
      challengeTitle: 'The Challenge',
      solutionOverview: 'Solution Overview',
      solutionTitle: 'Architectural Approach',
      keyFeatures: 'Key Features',
      keyFeaturesTitle: 'Key Features',
      verifiedOutcomes: 'Verified Outcomes',
      outcomesTitle: 'Documented Results',
      galleryTitle: 'Screenshots & UI Mockups',
      nubixContribution: 'Nubix\'s Contribution',
      contributionTitle: 'Nubix\'s Contribution',
      technologies: 'Technology Stack',
      technologiesTitle: 'Technology Stack',
      relatedProjects: 'Related Projects',
      testimonialTitle: 'Client Testimonial',
      readyTitle: 'Planning a similar system?',
      readySubtitle: 'Request a Ready-Made adaptation or a custom-scoped proposal based on this architecture.',
      discussButton: 'Start a Similar Project',
      notFoundTitle: 'Project case study unavailable',
      notFoundDesc: 'We couldn\'t find the requested project. Return to the portfolio index to browse available work.',
      returnButton: 'Back to Projects',
    },
    contactPage: {
      metaTitle: 'Start a Project — Project Inquiry | Nubix — Software & AI Studio',
      metaDescription: 'Submit a project inquiry to Nubix for custom web and mobile development, applied AI solutions, or Ready-Made software adaptations.',
      kicker: 'Project Inquiry · Scoped Proposals',
      title: 'Start a project with Nubix',
      heading: 'Start a project with Nubix',
      subtitle: 'Tell us about the problem you are solving, your target platform, and whether you are looking for a Ready-Made package, a Customized adaptation, or a Custom-Built solution.',
      subheading: 'Tell us about the problem you are solving, your target platform, and whether you are looking for a Ready-Made package, a Customized adaptation, or a Custom-Built solution.',
      nameLabel: 'Name or Preferred Contact Name',
      namePlaceholder: 'e.g. Tariq Mansour',
      emailLabel: 'Email Address',
      emailPlaceholder: 'you@company.com',
      companyLabel: 'Company or Organization Name',
      companyPlaceholder: 'Company name or independent project',
      projectTypeLabel: 'Project Type',
      platformLabel: 'Target Platform',
      budgetLabel: 'Estimated Budget',
      timelineLabel: 'Desired Timeline',
      descriptionLabel: 'Project Description & Core Requirements',
      descriptionPlaceholder: 'Describe the core problem, target users, required integrations, or specific Ready-Made module you want to adapt...',
      consent: 'I consent to Nubix storing and processing the contact and project details provided above strictly for the purpose of evaluating this inquiry and preparing a project response.',
      submitButton: 'Submit Project Inquiry',
      successTitle: 'Your project inquiry has been delivered',
      successMessage: 'Our delivery provider confirmed receipt of your project brief. We will review your requirements and respond via email.',
      formName: 'Your Name',
      formEmail: 'Work Email',
      formOrg: 'Company / Organization',
      formProjectType: 'Project Category',
      formModel: 'Preferred Model',
      formTimeline: 'Target Timeline',
      formBudget: 'Estimated Budget',
      formDetails: 'Project Details & Goals',
      formSubmit: 'Submit Project Inquiry',
      formSubmitting: 'Verifying & Sending...',
      formSuccessTitle: 'Inquiry Submitted Successfully',
      formSuccessDesc: 'We have received your brief and will review it within 24 to 48 hours.',
      formSendAnother: 'Submit Another Inquiry',
      directTitle: 'Direct Studio Channels',
      responseGuarantee: 'Response Guarantee',
      responseGuaranteeText: 'Every qualified inquiry receives an architectural review within 2 business days.',
      location: 'Primary Studio',
      locationVal: 'Cairo, Egypt (Serving clients globally)',
      models: {
        ready: 'Ready-Made Solution (Model A)',
        customized: 'Customized Adaptation (Model B)',
        customBuilt: 'Custom-Built Architecture (Model C)',
      },
      projectTypes: {
        web: 'Web & Mobile Development',
        ai: 'AI Solutions & Automation',
        backend: 'Backend Architecture & APIs',
        modernization: 'Maintenance & Improvement',
      },
    },
    newsletter: {
      kicker: 'Nubix Technical Radar · Bi-Weekly Dispatch',
      title: 'Engineering breakthroughs & applied AI insights',
      subtitle: 'Curated blueprints, production system architectures, and practical AI implementations directly from our engineering team. No marketing spam, strictly technical substance.',
      description: 'Curated blueprints, production system architectures, and practical AI implementations directly from our engineering team. No marketing spam, strictly technical substance.',
      placeholder: 'engineer@company.com',
      button: 'Subscribe',
      subscribing: 'Joining...',
      privacy: 'Zero spam. Unsubscribe in 1 click at any time.',
      success: 'We\'ve reserved your spot for our next release.',
      successToast: 'Successfully subscribed to Nubix Studio Dispatches!',
      invalidEmailToast: 'Please enter a valid email address.',
      alreadySubscribedToast: 'You are already subscribed with this email address.',
    },
    footer: {
      description: 'Ideas into intelligent digital products.',
      navigation: 'Navigation',
      capabilities: 'Core Capabilities',
      brandTagline: 'Ideas into intelligent digital products.',
      navColTitle: 'Navigation',
      capsColTitle: 'Core Capabilities',
      homeLink: 'Home',
      portfolioLink: 'Project Portfolio',
      servicesLink: 'Capabilities & Services',
      howWeWorkLink: 'How We Work',
      pricingLink: 'Service & Pricing Models',
      contactLink: 'Project Inquiry',
      rights: 'All rights reserved.',
    },
    console3D: {
      consoleTitle: '3D Studio Engineering & Architecture Console',
      statusActive: 'Systems Active & Operational',
      metrics: {
        uptime: '99.98% SLA Availability',
        aiPipeline: 'Inference Pipelines Active',
        p99Latency: 'P99 Latency: 42ms',
        security: 'Zero Trust Enforced',
      },
      modes: {
        architecture: 'Architecture',
        pipeline: 'Pipelines',
        mesh: 'Mesh',
      },
    },
  },
};
