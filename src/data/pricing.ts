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
    id: 'software-engineering',
    title: 'Software Engineering & Cloud Architecture',
    titleAr: 'هندسة البرمجيات والمعمارية السحابية',
    summary:
      'High-throughput distributed backends, resilient microservices, and idempotent API gateways engineered for rock-solid stability and massive transactional scale.',
    summaryAr:
      'أنظمة خلفية موزعة فائقة السرعة، ومعمارية خدمات صغرى (Microservices) مرنة، وبوابات APIs محكمة مبنية للاستقرار المطلق والتعامل مع ملايين العمليات المتزامنة.',
    deliverables: [
      'Distributed systems architecture and transactional data modeling',
      'High-performance RESTful, gRPC, and GraphQL API gateways',
      'Event-driven message queues, Redis caching, and automated dead-letter triage',
      'Cloud infrastructure automation (Docker, Kubernetes, zero-downtime CI/CD)',
    ],
    deliverablesAr: [
      'معمارية النظم الموزعة ونمذجة تدفقات البيانات وقواعد المعاملات المالية الحساسة',
      'بوابات واجهات برمجية عالية الأداء بتقنيات RESTful و gRPC و GraphQL',
      'طوابير معالجة الأحداث (Event-Driven)، والتخزين المؤقت، ومعالجة الأخطاء الآلية',
      'أتمتة البنية التحتية السحابية وحاويات Docker وخطوط النشر الآلي دون أي انقطاع',
    ],
    typicalUseCases: 'Mission-critical core platforms, financial ledgers, and enterprise infrastructure consolidation.',
    typicalUseCasesAr: 'المنصات التشغيلية الحيوية، والأنظمة المالية، وتوحيد البنى التحتية المتفرقة للشركات الكبرى.',
  },
  {
    index: '02',
    id: 'web-development',
    title: 'Web Platforms & Client Portals',
    titleAr: 'تطوير منصات وتطبيقات الويب المتقدمة',
    summary:
      'Ultra-responsive web applications, multi-role client portals, and bespoke SaaS dashboards engineered with modern TypeScript frameworks and fluid tactile interactions.',
    summaryAr:
      'تطبيقات ويب فائقة السرعة، وبوابات عملاء متعددة الأدوار والصلاحيات، ولوحات تحكم سحابية مخصصة مبنية بأحدث معايير TypeScript وتجربة استخدام تفاعلية فخمة.',
    deliverables: [
      'Interactive SaaS dashboards and enterprise workflow portals',
      'Real-time collaborative interfaces and state synchronization',
      'Accessibility-compliant (WCAG AA), localized, and RTL-first design systems',
      'Sub-second first-contentful paint and edge-rendered architectures',
    ],
    deliverablesAr: [
      'لوحات تحكم SaaS تفاعلية وبوابات رقمية لإدارة العمليات المعقدة',
      'واجهات تفاعلية تدعم العمل التعاوني وتزامن البيانات اللحظي',
      'نظم تصميم قياسية متوافقة مع معايير الوصول (WCAG AA) ومصممة بالكامل لدعم اللغة العربية (RTL)',
      'سرعة تحميل فائقة وتصيير عبر شبكات الحافة (Edge Rendering) بأقل من ثانية',
    ],
    typicalUseCases: 'Operational portals, business-to-business SaaS platforms, and enterprise data visualization.',
    typicalUseCasesAr: 'بوابات الأعمال B2B، ومنصات الخدمات السحابية، وعرض وإدارة البيانات الضخمة.',
  },
  {
    index: '03',
    id: 'mobile-applications',
    title: 'Mobile Applications (iOS & Android)',
    titleAr: 'تطبيقات الهواتف الذكية (iOS & Android)',
    summary:
      'Cross-platform mobile applications that feel indistinguishable from native apps—featuring robust offline synchronization, biometrics, and push notification pipelines.',
    summaryAr:
      'تطبيقات هواتف ذكية متعددة المنصات تضاهي التطبيقات الأصلية في الأداء والانسيابية — مع دعم كامل للعمل دون اتصال، والمصادقة البيومترية، والإشعارات اللحظية.',
    deliverables: [
      'Unified cross-platform codebases (React Native / modern native bridges)',
      'Local-first offline state persistence and conflict-free data resolution',
      'Secure biometric authentication, background geo-tracking, and camera feeds',
      'App Store and Google Play compliance, submission, and release management',
    ],
    deliverablesAr: [
      'كود برمجي موحد عبر المنصات يقلل تكاليف ووقت التطوير للنصف',
      'تخزين محلي وتزامن آلي للبيانات عند عودة الاتصال دون أي فقد أو تضارب',
      'مصادقة بيومترية آمنة (بصمة الوجه والإصبع)، وتتبع جغرافي، وإشعارات موجهة',
      'إدارة متكاملة لنشر واعتماد التطبيقات على متجري App Store و Google Play',
    ],
    typicalUseCases: 'Field workforce mobility, consumer client applications, and logistics fleet tracking.',
    typicalUseCasesAr: 'تطبيقات الفرق الميدانية، وتطبيقات العملاء والمستهلكين، وتتبع أساطيل الشحن والخدمات اللوجستية.',
  },
  {
    index: '04',
    id: 'ai-solutions',
    title: 'Applied AI & Intelligent Pipelines',
    titleAr: 'حلول ومسارات الذكاء الاصطناعي التطبيقي',
    summary:
      'Practical, deterministic AI integrations embedded into operational workflows—semantic search, retrieval-augmented generation (RAG), and zero-hallucination document extraction.',
    summaryAr:
      'دمج عملي محكم لنماذج الذكاء الاصطناعي في مسارات العمل التشغيلية — يشمل البحث الدلالي المتجهي، وأنظمة RAG لقواعد المعرفة، واستخراج البيانات المجدولة دون أي هلوسات.',
    deliverables: [
      'Retrieval-Augmented Generation (RAG) engines over internal enterprise archives',
      'Deterministic structured JSON extraction from invoices, contracts, and scans',
      'Local vector database indexing (pgvector, LanceDB) and semantic search',
      'Human-in-the-loop audit console with comprehensive confidence scoring',
    ],
    deliverablesAr: [
      'محركات توليد مدعوم بالاسترجاع (RAG) تبحث وتستنبط من وثائق المؤسسة الداخلية بدقة',
      'استخراج آلي مهيكل للمعلومات من الفواتير والعقود والتقارير الطبية والمالية',
      'فهرسة متجهات محلية (Vector Search) للبحث الدلالي اللحظي باللغة العربية والإنجليزية',
      'واجهة تدقيق ومراجعة بشرية تضمن سلامة النتائج وتدريب النماذج المستمر',
    ],
    typicalUseCases: 'Automating high-volume contract review, internal knowledge discovery, and intelligent customer support.',
    typicalUseCasesAr: 'أتمتة مراجعة العقود والمستندات الكثيفة، واسترجاع المعرفة المؤسسية، ودعم العملاء فائق الذكاء.',
  },
  {
    index: '05',
    id: 'technical-consulting',
    title: 'Technical Consulting & System Modernization',
    titleAr: 'الاستشارات التقنية وتحديث الأنظمة القديمة',
    summary:
      'Elite advisory and hands-on re-engineering for organizations dealing with sluggish legacy monoliths, mounting technical debt, or scaling bottlenecks.',
    summaryAr:
      'استشارات هندسية رفيعة المستوى وتطوير مباشر للشركات التي تعاني من بطء الأنظمة الموروثة، وتراكم الديون التقنية، أو عوائق التوسع أمام آلاف المستخدمين.',
    deliverables: [
      'Comprehensive codebase security, performance, and scalability audits',
      'Incremental microservice migration strategies without operational downtime',
      'Database optimization, query indexing, and caching topology redesign',
      'Architecture blueprints, vendor evaluations, and senior technical advisory',
    ],
    deliverablesAr: [
      'تدقيق معماري شامل للأكواد، ومعايير الأمان، وجاهزية التوسع للأحمال المليونية',
      'استراتيجيات ترقية تدريجية للأنظمة القديمة دون إيقاف الخدمات دقيقة واحدة',
      'إعادة هيكلة استعلامات قواعد البيانات ورفع سرعة الاستجابة بأكثر من ٨٠٪',
      'تخطيط معماري متكامل واختيار أدوات البنية التحتية الأنسب لتوفير النفقات السحابية',
    ],
    typicalUseCases: 'Legacy system rewrites, technical debt liquidation, and preparing infrastructure for high-traffic surges.',
    typicalUseCasesAr: 'تحديث الأنظمة القديمة، وتخفيض فواتير السحابة، وتهيئة المنصات لقفزات النمو السريعة.',
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: '01',
    title: 'Discover',
    titleAr: 'الاستكشاف والتحليل الفني',
    description:
      'We deeply analyze your operational challenge, audit existing workflows, define concrete success metrics, and formulate an airtight technical scope.',
    descriptionAr:
      'ندرس التحدي التشغيلي بدقة، ونحلل مسارات العمل والبيانات، ونحدد معايير النجاح القابلة للقياس، ونضع وثيقة مواصفات فنية واضحة ومحكمة قبل البدء.',
  },
  {
    step: '02',
    title: 'Define',
    titleAr: 'التحديد والتصميم المعماري',
    description:
      'We blueprint the system architecture, model data schemas, draft API contracts, and design polished, accessible interfaces with precision engineering math.',
    descriptionAr:
      'نصمم المخطط المعماري الكامل، ونبني نماذج البيانات وعقود الـ APIs، ونرسم واجهات المستخدم التفاعلية بأعلى معايير الانضباط والذوق الرفيع.',
  },
  {
    step: '03',
    title: 'Build',
    titleAr: 'البناء البرمجي والذكاء الاصطناعي',
    description:
      'Our senior engineers write type-safe, tested code and train AI pipelines with live staging previews and continuous validation so you verify every milestone.',
    descriptionAr:
      'يكتب مهندسونا أكواداً برمجية محكمة ومختبرة، ويدمجون مسارات الذكاء الاصطناعي مع توفير بيئات معاينة تجريبية حية تمكنك من متابعة التقدم خطوة بخطوة.',
  },
  {
    step: '04',
    title: 'Deliver',
    titleAr: 'التسليم والتشغيل والتمكين',
    description:
      'We conduct stress tests, execute zero-downtime production deployment, transfer full repository ownership, and empower your team with comprehensive documentation.',
    descriptionAr:
      'نجري اختبارات الحمل والضغط، ونطلق النسخة الإنتاجية دون أي انقطاع، مع تسليم كامل للأكواد المصدرية وتوثيق فني شامل يضمن استقلالك التام.',
  },
];

export const PRICING_MODELS: PricingTierConfig[] = [
  {
    id: 'ready-made',
    code: 'Model A',
    codeAr: 'النموذج أ',
    title: 'Ready-Made Solutions',
    titleAr: 'الأنظمة والحلول الجاهزة',
    subtitle: 'Existing foundational platforms with a predictable, transparent base cost.',
    subtitleAr: 'منتجات برمجية جاهزة وأنظمة معتمدة لبدء العمل في أسرع وقت بتكلفة محددة.',
    pricingMode: 'starting_from',
    configurablePriceUSD: '$1,200',
    configurablePriceEGP: '٦٠,٠٠٠ ج.م',
    pricingNote: 'Configurable base package · One-time license & deployment setup',
    pricingNoteAr: 'باقة أساسية محددة · ترخيص لمرة واحدة وتهيئة سحابية متكاملة',
    description:
      'Pre-engineered Syene Solutions software modules and foundational templates deployed directly to your environment for rapid operational launch.',
    descriptionAr:
      'وحدات برمجية وقوالب تأسيسية مبنية مسبقاً لدى سايين سوليوشنز، يتم نشرها مباشرة على خوادمك للإطلاق السريع دون انتظار دورات تطوير طويلة.',
    included: [
      'Standard production deployment on your cloud hosting account',
      'Core pre-built features and responsive user interface',
      'Initial environment configuration and brand color alignment',
      '14-day post-deployment bug fix warranty',
    ],
    includedAr: [
      'نشر احترافي للنسخة الإنتاجية على حساب الاستضافة السحابية الخاص بك',
      'الميزات الأساسية المبنية مسبقاً وواجهة مستخدم متجاوبة عالية السرعة',
      'تهيئة البيئة السحابية وتنسيق ألوان وشعار الهوية البصرية لمشروعك',
      'ضمان دعم فني وإصلاح فوري للأخطاء لمدة ١٤ يوماً بعد الإطلاق',
    ],
    excluded: [
      'Custom workflow logic or database schema structural modifications',
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
    subtitle: 'Existing foundations tailored to client workflows—our most popular engagement.',
    subtitleAr: 'تطويع وتعديل حلولنا القائمة لتلائم متطلباتك التشغيلية بدقة — الباقة الأكثر طلباً.',
    pricingMode: 'starting_from',
    configurablePriceUSD: '$2,500',
    configurablePriceEGP: '١٢٥,٠٠٠ ج.م',
    pricingNote: 'Base package + scoped customization milestones',
    pricingNoteAr: 'الباقة الأساسية + مراحل التخصيص والميزات الإضافية المحددة',
    description:
      'Accelerate delivery by starting with a proven Syene foundation and tailoring workflows, UI components, and integrations to your business operations.',
    descriptionAr:
      'اختصر وقت وجهد البناء من الصفر بالبدء من قاعدة سايين المثبتة وتخصيص تدفقات العمل، وواجهات الاستخدام، والتكاملات بما يتناسب مع مؤسستك.',
    included: [
      'Full Ready-Made base system plus scoped custom feature modules',
      'UI/UX adaptation to match your brand identity and Arabic/English language requirements',
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
    subtitle: 'Ground-up digital products, bespoke web/mobile platforms, and custom AI systems.',
    subtitleAr: 'تطبيقات وأنظمة ذكاء اصطناعي جديدة كلياً يتم تخطيطها وتسعيرها وفق متطلباتك الخاصة.',
    pricingMode: 'custom_quote',
    configurablePriceUSD: 'Request a Quote',
    configurablePriceEGP: 'تسعير مخصص',
    pricingNote: 'Individually scoped milestone proposal based on technical specification',
    pricingNoteAr: 'عرض سعر فني مفصل ومحدد بالمراحل وفق المواصفات المعمارية',
    description:
      'Ground-up software engineering and custom AI workflow development architected specifically around your unique business logic and scalability targets.',
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
      'Third-party licensing fees (e.g., proprietary commercial fonts or SDKs)',
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
