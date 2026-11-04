export interface ServiceCapability {
  index: string;
  id: string;
  title: string;
  titleAr?: string;
  summary: string;
  summaryAr?: string;
  deliverables: string[];
  deliverablesAr?: string[];
  typicalUseCases: string;
  typicalUseCasesAr?: string;
}

export interface PricingTierConfig {
  id: 'ready-made' | 'customized' | 'custom-built';
  code: string;
  codeAr?: string;
  title: string;
  titleAr?: string;
  subtitle: string;
  subtitleAr?: string;
  pricingMode: 'starting_from' | 'custom_quote';
  configurablePriceUSD: string;
  configurablePriceEGP: string;
  pricingNote: string;
  pricingNoteAr?: string;
  description: string;
  descriptionAr?: string;
  included: string[];
  includedAr?: string[];
  excluded: string[];
  excludedAr?: string[];
  ctaLabel: string;
  ctaLabelAr?: string;
  inquiryProjectType: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  titleAr?: string;
  description: string;
  descriptionAr?: string;
}

export const STUDIO_SERVICES: ServiceCapability[] = [
  {
    index: '01',
    id: 'web-mobile',
    title: 'Web & Mobile Development',
    titleAr: 'تطوير تطبيقات الويب والهواتف الذكية',
    summary:
      'Production-grade web applications, responsive client portals, and cross-platform mobile products engineered for clarity, speed, and long-term maintainability.',
    summaryAr:
      'تطبيقات ويب احترافية للإنتاج، وبوابات عملاء سريعة الاستجابة، وتطبيقات هواتف ذكية متعددة المنصات مصممة للسرعة والاستقرار وسهولة الصيانة طويلة الأمد.',
    deliverables: [
      'Custom web applications and internal operational dashboards',
      'Cross-platform mobile applications (iOS & Android)',
      'Responsive frontend architecture and accessible design systems',
      'Progressive web apps and customer-facing booking or commerce portals',
    ],
    deliverablesAr: [
      'تطبيقات ويب مخصصة ولوحات تحكم تشغيلية داخلية للشركات',
      'تطبيقات هواتف ذكية متعددة المنصات لنظامي iOS و Android',
      'معمارية واجهات مستخدم متقدمة ونظم تصميم قياسية متجاوبة',
      'تطبيقات ويب تقدمية (PWA) وبوابات حجز وتجارة إلكترونية متطورة',
    ],
    typicalUseCases: 'New product launches, customer portals, and replacing spreadsheet-driven operations.',
    typicalUseCasesAr: 'إطلاق المنتجات الرقمية الجديدة، وبوابات العملاء، وأتمتة العمليات اليدوية المعقدة.',
  },
  {
    index: '02',
    id: 'ai-solutions',
    title: 'AI Solutions',
    titleAr: 'حلول ونماذج الذكاء الاصطناعي التطبيقي',
    summary:
      'Practical AI integrations embedded into real business workflows—focused on document processing, semantic search, structured extraction, and assistive automation.',
    summaryAr:
      'دمج عملي لنماذج الذكاء الاصطناعي داخل مسارات العمل الحقيقية — مع التركيز على استرجاع المعرفة بالبحث الدلالي (RAG)، واستخراج البيانات، وأتمتة المهام المعقدة.',
    deliverables: [
      'LLM API integration with strict schema validation and guardrails',
      'Retrieval-augmented generation (RAG) over internal knowledge bases',
      'Automated document classification, extraction, and summarization pipelines',
      'Human-in-the-loop review interfaces for quality assurance',
    ],
    deliverablesAr: [
      'دمج واجهات النماذج اللغوية الكبيرة مع معايير حماية وتحقق صارمة',
      'أنظمة التوليد المدعوم بالاسترجاع (RAG) على قواعد المعرفة والوثائق الداخلية',
      'خطوط أتمتة تصنيف واستخراج وتلخيص الوثائق والمستندات الرسمية',
      'واجهات تدقيق ومراجعة بشرية لضمان دقة المخرجات بنسبة ١٠٠٪',
    ],
    typicalUseCases: 'Automating repetitive document triage, internal knowledge retrieval, and workflow routing.',
    typicalUseCasesAr: 'أتمتة فرز ومراجعة المستندات، واسترجاع المعرفة المؤسسية، وتوجيه مسارات العمل آلياً.',
  },
  {
    index: '03',
    id: 'backend-integrations',
    title: 'Backend & Integrations',
    titleAr: 'الأنظمة الخلفية وتكامل البنى التحتية',
    summary:
      'Resilient APIs, database architectures, and third-party software integrations that connect payment gateways, ERPs, CRMs, and external services.',
    summaryAr:
      'واجهات برمجية (APIs) عالية الاعتمادية، ومعمارية قواعد بيانات موزعة، وتكامل سلس مع بوابات الدفع، وأنظمة ERP وCRM، ومختلف الخدمات الخارجية.',
    deliverables: [
      'RESTful and event-driven API design and implementation',
      'Database schema modeling, indexing, and migration workflows',
      'Payment gateway, messaging, and regional logistics integrations (Egypt & global)',
      'Webhook orchestration, background job queues, and data synchronization',
    ],
    deliverablesAr: [
      'تصميم وبناء واجهات برمجية RESTful وموجهة بالأحداث (Event-Driven)',
      'تصميم مخططات قواعد البيانات والفهرسة المتقدمة وهجرة البيانات الآمنة',
      'تكامل بوابات الدفع الإلكتروني، والرسائل، وخدمات الشحن (مصر وعالمياً)',
      'إدارة خطوط Webhooks، وطوابير المهام الخلفية، وتزامن البيانات اللحظي',
    ],
    typicalUseCases: 'Connecting disconnected business tools, building scalable APIs, and stabilizing data pipelines.',
    typicalUseCasesAr: 'ربط الأنظمة المنفصلة، وبناء واجهات برمجية قابلة للتوسع، وتأمين تدفقات البيانات الحساسة.',
  },
  {
    index: '04',
    id: 'maintenance-improvement',
    title: 'Maintenance & Product Improvement',
    titleAr: 'الصيانة والتطوير المستمر للمنتجات',
    summary:
      'Structured technical care for existing applications—focusing on performance bottlenecks, dependency maintenance, security, and steady feature evolution.',
    summaryAr:
      'رعاية فنية وهندسية ممنهجة للتطبيقات والأنظمة القائمة — معالجة بطء الأداء، وتحديث الاعتماديات، وسد الثغرات الأمنية، وتطوير الميزات بصورة مستمرة.',
    deliverables: [
      'Codebase refactoring, TypeScript migration, and dependency upgrades',
      'Frontend rendering and backend query performance optimization',
      'Security patching, error tracking setup, and reliability hardening',
      'Scheduled retainer support and iterative feature enhancements',
    ],
    deliverablesAr: [
      'إعادة هيكلة الأكواد البرمجية، والترقية إلى TypeScript، وتحديث الحزم',
      'تحسين سرعة رندرة الواجهات وتحسين استعلامات قواعد البيانات المعقدة',
      'سد الثغرات الأمنية، وتركيب أدوات رصد الأخطاء، ورفع استقرار النظام',
      'عقود دعم شهري منتظمة وجلسات تطوير دورية للميزات الجديدة',
    ],
    typicalUseCases: 'Stabilizing inherited software, resolving technical debt, and extending live products.',
    typicalUseCasesAr: 'استقرار البرمجيات الموروثة، وحل الديون التقنية، وتوسيع المنتجات الحية بنجاح.',
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: '01',
    title: 'Discovery & Technical Scope',
    titleAr: 'الاكتشاف والمعمارية الفنية',
    description:
      'We review your operational problem, define concrete functional requirements, identify integration constraints, and agree on a written specification and milestone schedule.',
    descriptionAr:
      'ندرس التحدي التشغيلي بدقة، ونحدد المتطلبات الوظيفية والمعمارية، ونضع مواصفات فنية وجدولاً زمنياً معتمداً ومحكماً قبل بدء كتابة أي سطر كود.',
  },
  {
    step: '02',
    title: 'Architecture & Interface Design',
    titleAr: 'تصميم الواجهات والمعمارية',
    description:
      'We structure the data models, API contracts, and user interface flows—choosing the most straightforward, maintainable stack for your project.',
    descriptionAr:
      'نبني نماذج البيانات وعقود الـ API ومسارات تجربة المستخدم — ونختار أكثر حزم التقنيات كفاءة وسهولة في الصيانة لضمان استقرار مشروعك المستقبلي.',
  },
  {
    step: '03',
    title: 'Iterative Engineering',
    titleAr: 'التطوير الهندسي والاختبار المستمر',
    description:
      'We build in transparent milestones with staging previews, automated validation, and clean version-controlled code so you can verify progress directly.',
    descriptionAr:
      'نطور البرمجيات عبر مراحل واضحة مع بيئات معاينة تجريبية، واختبارات تحقق آلية، وأكواد نظيفة وموثقة تمكّنك من متابعة الإنجاز لحظة بلحظة.',
  },
  {
    step: '04',
    title: 'Verification, Deployment & Handover',
    titleAr: 'النشر والتشغيل والتسليم للإنتاج',
    description:
      'We test core user flows, configure production deployment, and deliver full technical documentation with optional ongoing maintenance.',
    descriptionAr:
      'نختبر كافة مسارات المستخدمين، ونهيئ خوادم الإنتاج المباشر، ونسلّم الوثائق الفنية الكاملة والأكواد مع توفير الدعم الهندسي والصيانة المستمرة.',
  },
];

export const PRICING_MODELS: PricingTierConfig[] = [
  {
    id: 'ready-made',
    code: 'Model A',
    codeAr: 'النموذج أ',
    title: 'Ready-Made Solutions',
    titleAr: 'الأنظمة والحلول الجاهزة',
    subtitle: 'Existing products or reusable systems with a defined base price.',
    subtitleAr: 'منتجات برمجية جاهزة وأنظمة معتمدة لبدء العمل في أسرع وقت بتكلفة محددة.',
    pricingMode: 'starting_from',
    configurablePriceUSD: '$1,200',
    configurablePriceEGP: '٦٠,٠٠٠ ج.م',
    pricingNote: 'Configurable base package · One-time license & deployment setup',
    pricingNoteAr: 'باقة أساسية محددة · ترخيص لمرة واحدة وتهيئة سحابية متكاملة',
    description:
      'Pre-engineered Nubix software modules and foundational templates deployed directly to your environment for rapid launch.',
    descriptionAr:
      'وحدات برمجية وقوالب تأسيسية مبنية مسبقاً لدى نوبيكس، يتم نشرها مباشرة على خوادمك للإطلاق السريع دون انتظار دورات تطوير طويلة.',
    included: [
      'Standard production deployment on your hosting account',
      'Core pre-built features and responsive user interface',
      'Initial environment configuration and basic brand color alignment',
      '14-day post-deployment bug fix warranty',
    ],
    includedAr: [
      'نشر احترافي للنسخة الإنتاجية على حساب الاستضافة السحابية الخاص بك',
      'الميزات الأساسية المبنية مسبقاً وواجهة مستخدم متجاوبة عالية السرعة',
      'تهيئة البيئة السحابية وتنسيق ألوان وشعار الهوية البصرية لمشروعك',
      'ضمان دعم فني وإصلاح فوري للأخطاء لمدة ١٤ يوماً بعد الإطلاق',
    ],
    excluded: [
      'Custom workflow logic or database schema structural changes',
      'Bespoke third-party ERP/CRM integrations',
      'Third-party cloud hosting, domain, or API usage fees',
      'Ongoing monthly feature development or SLA retainers',
    ],
    excludedAr: [
      'تعديل منطق مسارات العمل الخاصة أو تغييرات جوهرية في هيكل البيانات',
      'تكامل مخصص مع أنظمة ERP أو CRM خارجية غير مدرجة بالباقة',
      'رسوم الاستضافة السحابية أو النطاقات أو استهلاك الـ APIs الخارجية',
      'التطوير المستمر للميزات الجديدة بعد انتهاء فترة الضمان',
    ],
    ctaLabel: 'Inquire About Ready-Made',
    ctaLabelAr: 'طلب استشارة لنظام جاهز',
    inquiryProjectType: 'Ready-Made Solution',
  },
  {
    id: 'customized',
    code: 'Model B',
    codeAr: 'النموذج ب',
    title: 'Customized Solutions',
    titleAr: 'التخصيص وتوسيع الأنظمة',
    subtitle: 'Existing products adapted to client requirements, priced as a base package plus agreed customization costs.',
    subtitleAr: 'تطويع وتعديل حلولنا القائمة لتلائم متطلباتك التشغيلية بدقة — الباقة الأكثر طلباً.',
    pricingMode: 'starting_from',
    configurablePriceUSD: '$2,500',
    configurablePriceEGP: '١٢٥,٠٠٠ ج.م',
    pricingNote: 'Base package + scoped customization milestones',
    pricingNoteAr: 'الباقة الأساسية + مراحل التخصيص والميزات الإضافية المحددة',
    description:
      'Accelerate delivery by starting with a proven Nubix foundation and tailoring workflows, UI components, and integrations to your operations.',
    descriptionAr:
      'اختصر وقت وجهد البناء من الصفر بالبدء من قاعدة نوبيكس المثبتة وتخصيص تدفقات العمل، وواجهات الاستخدام، والتكاملات بما يتناسب مع مؤسستك.',
    included: [
      'Full Ready-Made base system plus scoped custom feature modules',
      'UI/UX adaptation to match your brand identity and language requirements',
      'Integration with agreed payment, messaging, or external APIs',
      'Staging environment review and 30-day post-launch warranty',
    ],
    includedAr: [
      'النظام الأساسي بالكامل مع وحدات وميزات مخصصة محددة بنطاق العمل',
      'مواءمة كاملة لتجربة المستخدم والهوية البصرية ودعم اللغتين العربية والإنجليزية',
      'تكامل بوابات الدفع الإلكتروني، وخدمات الإشعارات، والواجهات الخارجية',
      'بيئة معاينة تجريبية لاختبار النظام وضمان فني لمدة ٣٠ يوماً بعد الإطلاق',
    ],
    excluded: [
      'Unscoped feature additions outside the written customization brief',
      'External SaaS subscriptions, LLM token billing, or cloud server costs',
      'Content writing, legal copy, or manual historical data entry',
      'Continuous post-warranty maintenance without a support plan',
    ],
    excludedAr: [
      'الميزات الإضافية غير المتفق عليها خارج وثيقة العمل الرسمية',
      'اشتراكات الخدمات السحابية واستهلاك توكنز الذكاء الاصطناعي',
      'كتابة المحتوى أو الصياغة القانونية أو الإدخال اليدوي للبيانات التاريخية',
      'الصيانة المستمرة بعد انتهاء فترة الضمان بدون عقد دعم شهري',
    ],
    ctaLabel: 'Scope a Customized Solution',
    ctaLabelAr: 'تحديد نطاق حل مخصص',
    inquiryProjectType: 'Customized Solution',
  },
  {
    id: 'custom-built',
    code: 'Model C',
    codeAr: 'النموذج ج',
    title: 'Custom-Built Solutions',
    titleAr: 'الهندسة البرمجية المخصصة بالكامل',
    subtitle: 'New applications and AI solutions scoped and quoted individually.',
    subtitleAr: 'تطبيقات وأنظمة ذكاء اصطناعي جديدة كلياً يتم تخطيطها وتسعيرها وفق متطلباتك الخاصة.',
    pricingMode: 'custom_quote',
    configurablePriceUSD: 'Request a Quote',
    configurablePriceEGP: 'تسعير مخصص',
    pricingNote: 'Individually scoped milestone proposal based on technical specification',
    pricingNoteAr: 'عرض سعر فني مفصل ومحدد بالمراحل وفق المواصفات المعمارية',
    description:
      'Ground-up software engineering and custom AI workflow development architected specifically around your business logic and scale requirements.',
    descriptionAr:
      'بناء برمجي من الصفر وتطوير مسارات ذكاء اصطناعي مصممة خصيصاً حول منطق عملك التجاري ومتطلبات الأمان والتوسع الخاصة بمؤسستك.',
    included: [
      'Dedicated technical discovery, architecture blueprint, and UI/UX design',
      'Custom frontend, backend, mobile, or AI pipeline engineering',
      'End-to-end testing, deployment automation, and source code handover',
      'Technical documentation and team onboarding session',
    ],
    includedAr: [
      'جلسات اكتشاف فني مخصصة، ومخطط معماري شامل، وتصميم UI/UX استثنائي',
      'هندسة متكاملة للواجهات الأمامية، والخلفية، والهواتف، ومسارات الذكاء الاصطناعي',
      'اختبارات شاملة، وأتمتة النشر السحابي (CI/CD)، وتسليم كامل للأكواد المصدرية',
      'توثيق فني شامل وجلسات تدريبية لفريقك التقني لاستلام النظام',
    ],
    excluded: [
      'Third-party infrastructure, cloud hosting, and external AI/API provider billing',
      'Post-handover operational management unless covered by a Maintenance agreement',
      'Third-party licensing fees (e.g., paid fonts, proprietary SDKs)',
    ],
    excludedAr: [
      'تكاليف الخوادم السحابية والخدمات الخارجية واستهلاك نماذج الذكاء الاصطناعي',
      'الإدارة التشغيلية بعد التسليم ما لم يتم تغطيتها بعقد صيانة مستمر',
      'رسوم التراخيص الخاصة بالطرف الثالث (مثل الخطوط المدفوعة أو الـ SDKs)',
    ],
    ctaLabel: 'Request a Quote',
    ctaLabelAr: 'طلب دراسة وعرض سعر',
    inquiryProjectType: 'Custom-Built Solution',
  },
];

export const PRICING_DISCLAIMERS = [
  'All initial Starting From figures are configurable baseline estimates for well-defined packages; final pricing is confirmed in a written scope before work begins.',
  'Third-party services—including cloud hosting, domain registration, SMS/email gateways, and external AI/LLM API token consumption—are billed directly by their respective providers and are excluded from studio development fees.',
  'Ongoing maintenance, server monitoring, and post-warranty feature iterations are available via separate monthly retainers or on-demand improvement scopes.',
];

export const PRICING_DISCLAIMERS_AR = [
  'كافة الأسعار الابتدائية (تبدأ من) هي تقديرات أساسية للباقات المحددة بدقة؛ ويتم تأكيد السعر النهائي الموثق في وثيقة نطاق العمل قبل بدء التنفيذ.',
  'الخدمات الخارجية التابعة لأطراف ثالثة — بما فيها الاستضافة السحابية، وحجز النطاقات، وبوابات الرسائل والبريد، واستهلاك توكنز نماذج الذكاء الاصطناعي — تُدفع مباشرة لمزوديها ولا تشملها أتعاب تطوير الاستوديو.',
  'الصيانة المستمرة، ومراقبة أداء الخوادم، وتطوير الميزات الجديدة بعد انتهاء فترة الضمان متاحة عبر عقود دعم شهرية مستقلة أو نطاقات عمل عند الطلب.',
];
