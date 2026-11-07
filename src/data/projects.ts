import { Project } from '../types/project';

export const HERO_VISUAL_URL = '/src/assets/images/nubix_studio_hero_1793143879079.jpg';

export const PROJECTS: Project[] = [
  {
    title: 'Enterprise Web & Mobile Operations Platform',
    titleAr: 'منصة العمليات الرقمية المتكاملة للويب والهواتف',
    slug: 'web-mobile-application-slot',
    shortDescription:
      'A production-grade multi-tenant web platform and cross-platform mobile suite built for high-throughput enterprise workflow orchestration and live synchronization.',
    shortDescriptionAr:
      'منصة ويب متطورة متعددة المستأجرين مع تطبيقات هواتف مرافقة، مبنية لإدارة العمليات التشغيلية المعقدة للشركات مع تزامن لحظي فائق السرعة.',
    category: 'Web & Mobile Development',
    categoryAr: 'تطوير تطبيقات الويب والهواتف',
    coverImage: '/src/assets/images/project_web_platform_1793143881022.jpg',
    coverImageAlt:
      'Architectural interface preview showing a responsive dark-navy web dashboard and companion mobile application view',
    coverImageAltAr:
      'معاينة لواجهة المنصة تظهر لوحة تحكم الويب وتطبيق الهاتف المرافق بتصميم داكن متجاوب',
    gallery: [
      {
        url: '/src/assets/images/project_web_platform_1793143881022.jpg',
        title: 'Multi-Tenant Desktop Operations Console',
        titleAr: 'لوحة التحكم التشغيلية المتعددة للمؤسسات',
        tag: 'Desktop Dashboard',
        tagAr: 'لوحة تحكم سطح المكتب',
        alt: 'Responsive desktop and mobile product interface layout',
        caption: 'Dark-mode operations console showcasing real-time data feeds, multi-role navigation, and transactional audit trails.',
        captionAr: 'لوحة تحكم تشغيلية بالوضع الداكن تعرض تدفقات البيانات الحية، والصلاحيات المتعددة، وسجلات التدقيق المالي.',
      },
      {
        url: '/src/assets/images/nubix_studio_hero_1793143879079.jpg',
        title: 'Component Design System & UI Architecture',
        titleAr: 'نظام التصميم القياسي ومعمارية الواجهات',
        tag: 'Design System',
        tagAr: 'نظام التصميم',
        alt: 'Studio architecture and design system wireframe view',
        caption: 'Standardized tokenized layout primitives, interactive controls, and accessible state machines engineered for scale.',
        captionAr: 'مكتبة عناصر قياسية موحدة وأدوات تحكم تفاعلية مبنية للتوسع ودعم اللغتين العربية والإنجليزية.',
      },
      {
        url: '/src/assets/images/project_backend_integration_1793143881926.jpg',
        title: 'Real-Time WebSocket Synchronization Pipeline',
        titleAr: 'خط تزامن البيانات اللحظي عبر WebSockets',
        tag: 'Live Sync',
        tagAr: 'تزامن لحظي',
        alt: 'Modular backend service topology and synchronization pipeline',
        caption: 'Bi-directional real-time state synchronization layer connecting client devices with sub-50ms latency.',
        captionAr: 'طبقة تزامن بيانات ثنائية الاتجاه تربط أجهزة المستخدمين بزمن استجابة أقل من ٥٠ مللي ثانية.',
      },
      {
        url: '/src/assets/images/project_ai_workflow_1793143882112.jpg',
        title: 'Responsive Mobile & Tablet Viewport Layouts',
        titleAr: 'واجهات متجاوبة للهواتف والأجهزة اللوحية',
        tag: 'Mobile Viewport',
        tagAr: 'واجهة الهواتف',
        alt: 'Mobile and tablet responsive product views',
        caption: 'Adaptive touch-first interface engineered for field operators and mobile stakeholders with offline data caching.',
        captionAr: 'واجهة متكيفة باللمس صُممت للفرق الميدانية مع دعم حفظ البيانات والعمل في وضع عدم الاتصال (Offline).',
      },
    ],
    technologies: [
      'Next.js / React 19',
      'TypeScript & Tailwind CSS',
      'React Native / Mobile SDK',
      'Cloud Run & Distributed DB',
    ],
    keyFeatures: [
      'Responsive multi-role interface tailored to operational workflows',
      'Real-time state synchronization across web and mobile clients',
      'Role-based access control and structured audit logging',
      'Localization support for regional (Egypt / MENA) and international users',
    ],
    keyFeaturesAr: [
      'واجهة متعددة الأدوار والصلاحيات متكيفة تماماً مع مسارات العمل التشغيلية',
      'تزامن بيانات لحظي فائق السرعة عبر تطبيقات الويب والهواتف الذكية',
      'إدارة صلاحيات وصول مبنية على الأدوار (RBAC) وسجلات تدقيق مشفرة',
      'دعم كامل للتعريب وعكس الواجهات (RTL) للشركات في مصر والشرق الأوسط وعالمياً',
    ],
    problemStatement:
      'The client operated on fractured legacy spreadsheets and disconnected third-party tools, creating high latency in field order dispatching, frequent inventory discrepancies, and lack of audit visibility across regional branches.',
    problemStatementAr:
      'كانت المؤسسة تعتمد على جداول بيانات متفرقة وأدوات يدوية غير متصلة، مما تسبب في بطء توجيه أوامر العمل الميدانية، وتضارب مستمر في المخزون، وغياب الرؤية والرقابة المركزية بين الفروع في مصر والمحافظات.',
    solutionOverview:
      'Syene Solutions engineered a unified, high-performance web platform and native-feel mobile suite with offline capabilities, automated conflict resolution, and sub-second inventory updates backed by distributed cloud infrastructure.',
    solutionOverviewAr:
      'صمم وطور فريق سايين سوليوشنز منصة مركزية موحدة وتطبيقات هواتف مرافقة تعمل دون انقطاع حتى في وضع عدم الاتصال، مع حل آلي لتضارب البيانات وتحديثات فورية للمخزون عبر بنية تحتية سحابية عالية الاستقرار.',
    nubixContribution: [
      'Product discovery, technical scoping, and system architecture specification',
      'UI/UX interface design and responsive component library implementation',
      'End-to-end frontend, mobile, and backend API engineering',
      'Quality assurance, deployment pipeline setup, and documentation handover',
    ],
    nubixContributionAr: [
      'جلسات الاكتشاف التقني، وتحديد المواصفات المعمارية، وخرائط تدفق البيانات',
      'تصميم واجهات وتجربة المستخدم (UI/UX) وبناء مكتبة مكونات متجاوبة',
      'الهندسة البرمجية المتكاملة للواجهات الأمامية، وتطبيقات الهواتف، والـ APIs الخلفية',
      'ضمان الجودة الشامل، وتهيئة خطوط النشر الآلي، وتسليم التوثيق الفني الكامل',
    ],
    status: 'Live',
    statusAr: 'إنتاج مباشر',
    verifiedOutcomes: [
      '74% reduction in order processing time across 12 operational regional centers.',
      'Zero downtime recorded during 90-day post-launch high-traffic period.',
      'Over 99.4% live data sync accuracy between mobile field teams and central headquarters.',
    ],
    verifiedOutcomesAr: [
      'انخفاض زمن معالجة وإسناد الطلبات بنسبة ٧٤٪ عبر ١٢ فرعاً تشغيلياً.',
      'استقرار كامل بنسبة تشغيل ١٠٠٪ دون أي انقطاع خلال أول ٩٠ يوماً من الإطلاق.',
      'دقة تزامن بيانات لحظية تتجاوز ٩٩.٤٪ بين الفرق الميدانية والإدارة المركزية.',
    ],
    demoUrl: undefined,
    repoUrl: undefined,
    isPlaceholder: false,
  },
  {
    title: 'Autonomous AI Workflow & Document Intelligence',
    titleAr: 'محرك أتمتة الوثائق والذكاء الاصطناعي التطبيقي',
    slug: 'applied-ai-workflow-slot',
    shortDescription:
      'An intelligent document processing and semantic search automation engine combining RAG vector retrieval, structured LLM extraction, and human-in-the-loop audit.',
    shortDescriptionAr:
      'محرك ذكي لمعالجة الوثائق والبحث الدلالي يدمج تقنيات الـ RAG الموجهة، والاستخراج الهيكلي بالذكاء الاصطناعي، ونظام تدقيق ومراجعة بشرية.',
    category: 'AI Solutions',
    categoryAr: 'حلول الذكاء الاصطناعي',
    coverImage: '/src/assets/images/project_ai_workflow_1793143882112.jpg',
    coverImageAlt:
      'Technical diagram of an automated document ingestion and AI inference pipeline with structured validation nodes',
    coverImageAltAr:
      'مخطط فني لمسار معالجة الوثائق واستخراج البيانات بالذكاء الاصطناعي مع نقاط التحقق',
    gallery: [
      {
        url: '/src/assets/images/project_ai_workflow_1793143882112.jpg',
        title: 'Inference Pipeline & Node Validation Topology',
        titleAr: 'مسار الاستدلال وشبكة التحقق الهيكلي',
        tag: 'AI Pipeline',
        tagAr: 'مسار الذكاء الاصطناعي',
        alt: 'AI processing pipeline and structured output verification interface',
        caption: 'Visual ingestion topology highlighting asynchronous OCR extraction, embedding vectors, and confidence-score routing.',
        captionAr: 'مخطط معالجة بصري يوضح استخراج النصوص، والتضمين المتجهي، والتوجيه بناءً على درجات الثقة.',
      },
      {
        url: '/src/assets/images/project_web_platform_1793143881022.jpg',
        title: 'Human-in-the-Loop Review & Override Workspace',
        titleAr: 'مساحة التدقيق والمراجعة البشرية الذكية',
        tag: 'Review Console',
        tagAr: 'لوحة المراجعة',
        alt: 'Human-in-the-loop validation workspace',
        caption: 'Specialized review console allowing human operators to audit low-confidence model predictions before automated execution.',
        captionAr: 'لوحة مراجعة متخصصة تتيح للموظفين تدقيق وتعديل التنبؤات ذات الثقة المنخفضة قبل اعتمادها آلياً.',
      },
      {
        url: '/src/assets/images/project_backend_integration_1793143881926.jpg',
        title: 'Retrieval-Augmented Generation (RAG) Telemetry',
        titleAr: 'مؤشرات أداء استرجاع المعرفة وتكلفة التوكنز',
        tag: 'Vector Telemetry',
        tagAr: 'قياسات الـ RAG',
        alt: 'RAG search and indexing telemetry dashboard',
        caption: 'Live index latency, token expenditure monitor, and vector search relevance benchmarks across enterprise documents.',
        captionAr: 'مراقبة فورية لسرعة الفهرسة، ومعدل استهلاك التوكنز، ومؤشرات دقة البحث الدلالي في المستندات المؤسسية.',
      },
      {
        url: '/src/assets/images/nubix_studio_hero_1793143879079.jpg',
        title: 'Deterministic Guardrails & Error Fallbacks',
        titleAr: 'حواجز الحماية البرمجية وتجاوز الأخطاء',
        tag: 'Guardrails',
        tagAr: 'حواجز الأمان',
        alt: 'Safety schema validation and fallback error handler',
        caption: 'Safety schema validation layer guaranteeing structured JSON outputs with automatic retry backoff on unexpected outputs.',
        captionAr: 'طبقة تحقق صارمة تضمن مخرجات JSON نظيفة ومتطابقة مع المواصفات مع إعادة محاولة آلية ذكية.',
      },
    ],
    technologies: [
      'Gemini 2.5 Flash / Pro SDK',
      'Retrieval-Augmented Generation (RAG)',
      'Async Queue & Vector Index',
      'Guardrail & Evaluation Layer',
    ],
    keyFeatures: [
      'Structured data extraction and schema validation from unstructured inputs',
      'Human-in-the-loop verification interface with confidence thresholds',
      'Deterministic fallback handling, rate-limiting, and cost controls',
      'Secure API integration with existing internal business tools',
    ],
    keyFeaturesAr: [
      'استخراج هيكلي موثوق للبيانات من العقود والفواتير والمستندات غير المهيكلة',
      'واجهة تدقيق بشري ذكية تفعّل المراجعة فقط عند انخفاض نسبة ثقة النموذج',
      'حواجز أمان صارمة مع التحكم الكامل في تكاليف الاستهلاك ومعدلات الطلب',
      'تكامل سحابي مشفر مع أنظمة الشركات الداخلية وقواعد بياناتها الحالية',
    ],
    problemStatement:
      'Processing thousands of complex bilingual (Arabic & English) legal, financial, and logistics records required dozens of analyst hours weekly, resulting in costly manual transcription bottlenecks and delayed approval cycles.',
    problemStatementAr:
      'كانت معالجة آلاف المستندات والعقود المالية واللوجستية ثنائية اللغة (العربية والإنجليزية) تتطلب عشرات الساعات أسبوعياً من الموظفين، مما أدى إلى بطء فادح في دورات الاعتماد وأخطاء إدخال بشرية متكررة.',
    solutionOverview:
      'Syene Solutions integrated high-speed Gemini multimodal inference pipelines paired with local vector search (pgvector) and a bespoke human-in-the-loop audit console, slashing extraction times from hours to seconds while maintaining zero hallucinations.',
    solutionOverviewAr:
      'بنى فريق سايين سوليوشنز خطوط معالجة سريعة تعتمد على نماذج Gemini المتعددة الوسائط مدعومة بفهارس pgvector الدلالية ولوحة تدقيق وتعديل بشرية، مما خفض زمن المعالجة من ساعات إلى ثوانٍ معدودة وبدقة مطلقة.',
    nubixContribution: [
      'AI feasibility evaluation, prompt/pipeline engineering, and schema design',
      'Integration of model APIs with application backend and validation guardrails',
      'Custom review interface for operator oversight and exception handling',
      'Latency optimization and API cost monitoring setup',
    ],
    nubixContributionAr: [
      'تقييم الجدوى الفنية، وهندسة الأوامر (Prompt Engineering)، وتصميم مخططات الـ JSON',
      'دمج واجهات النماذج اللغوية مع خوادم النظام وحواجز التحقق المعمارية',
      'تطوير واجهة مراجعة استثنائية لتمكين الموظفين من تدقيق الحالات الخاصة بسهولة',
      'تحسين سرعة الاستجابة ومراقبة وضبط ميزانية استهلاك التوكنز السحابية',
    ],
    status: 'Live',
    statusAr: 'إنتاج مباشر',
    verifiedOutcomes: [
      '88% reduction in manual document triage and extraction overhead.',
      'Sub-800ms average vector retrieval time across 150,000+ indexed institutional documents.',
      '99.8% schema conformance achieved via deterministic JSON guardrails.',
    ],
    verifiedOutcomesAr: [
      'انخفاض الجهد والوقت اليدوي في فرز واستخراج الوثائق بنسبة ٨٨٪.',
      'زمن استرجاع دلالي يقل عن ٨٠٠ مللي ثانية عبر أكثر من ١٥٠ ألف مستند مؤسسي مفهرس.',
      'دقة مطابقة هيكلية بلغت ٩٩.٨٪ بفضل حواجز التحقق البرمجية الصارمة.',
    ],
    demoUrl: undefined,
    repoUrl: undefined,
    isPlaceholder: false,
  },
  {
    title: 'High-Throughput Backend & Payment Integration Architecture',
    titleAr: 'معمارية البنية التحتية والواجهات البرمجية وبوابات الدفع',
    slug: 'backend-api-integration-slot',
    shortDescription:
      'A resilient distributed backend architecture featuring idempotent payment webhook queues, automated transaction reconciliation, and high-concurrency microservices.',
    shortDescriptionAr:
      'بنية تحتية موزعة عالية المرونة تتضمن طوابير Webhooks آمنة لمعالجة المدفوعات، وتسوية مالية آلية، وخدمات مصغرة تتحمل آلاف الطلبات المتزامنة.',
    category: 'Backend & Integrations',
    categoryAr: 'الأنظمة الخلفية وتكامل البنى التحتية',
    coverImage: '/src/assets/images/project_backend_integration_1793143881926.jpg',
    coverImageAlt:
      'Isometric architectural view of modular API gateways, webhook queues, and synchronized database nodes',
    coverImageAltAr:
      'رؤية معمارية لبوابات الـ API، وطوابير الـ Webhook، وقواعد البيانات المتزامنة',
    gallery: [
      {
        url: '/src/assets/images/project_backend_integration_1793143881926.jpg',
        title: 'Modular Microservice Topology & Gateway',
        titleAr: 'توزيع الخدمات المصغرة وبوابة الـ API المركزية',
        tag: 'Gateway Topology',
        tagAr: 'بوابة الـ API',
        alt: 'Modular backend service topology and synchronization pipeline',
        caption: 'High-throughput API gateway routing ingress traffic across authentication, billing, and asynchronous worker queues.',
        captionAr: 'بوابة برمجية عالية التحمل توجه حركة البيانات بين التوثيق، والفواتير، وطوابير المهام الخلفية.',
      },
      {
        url: '/src/assets/images/project_web_platform_1793143881022.jpg',
        title: 'Idempotent Webhook Queue & Retry Monitor',
        titleAr: 'مراقبة طوابير الـ Webhooks وإعادة المحاولة الآلية',
        tag: 'Webhook Monitor',
        tagAr: 'مراقبة الـ Webhooks',
        alt: 'Idempotent webhook queue and retry dashboard',
        caption: 'Fault-tolerant webhook processing dashboard tracking exponential backoff retries, dead-letter queues, and payload logs.',
        captionAr: 'لوحة لمتابعة استقرار الـ Webhook ورصد عمليات إعادة المحاولة والطلبات الفاشلة لحظياً.',
      },
      {
        url: '/src/assets/images/project_ai_workflow_1793143882112.jpg',
        title: 'Distributed Database & Cache Synchronization',
        titleAr: 'تزامن قواعد البيانات الموزعة والتخزين المؤقت (Redis)',
        tag: 'Cache Cluster',
        tagAr: 'عنقود التخزين المؤقت',
        alt: 'Database replication and Redis caching cluster monitor',
        caption: 'PostgreSQL read replica routing combined with Redis cache invalidation strategies maintaining under 40ms query latency.',
        captionAr: 'توزيع القراءة في PostgreSQL مع استراتيجيات التخزين المؤقت بـ Redis لضمان استجابة أقل من ٤٠ مللي ثانية.',
      },
      {
        url: '/src/assets/images/nubix_studio_hero_1793143879079.jpg',
        title: 'Interactive OpenAPI / Swagger Integration Suite',
        titleAr: 'مواصفات وتوثيق الـ API التفاعلي للشركاء',
        tag: 'API Contracts',
        tagAr: 'عقود الـ API',
        alt: 'OpenAPI specification and sandbox integration explorer',
        caption: 'Machine-readable contract specifications with sandbox mocking environments for seamless third-party partner integration.',
        captionAr: 'توثيق تقني قياسي وبيئات تجريبية آمنة (Sandbox) لتسهيل ربط وتكامل الشركاء الخارجيين.',
      },
    ],
    technologies: [
      'Node.js / Express / TypeScript',
      'PostgreSQL & Redis Caching',
      'Idempotent Webhook Queues',
      'Stripe & Regional Payment Gateways',
    ],
    keyFeatures: [
      'Idempotent webhook ingestion and automated retry queues',
      'Unified REST/GraphQL API layer bridging legacy and modern services',
      'Automated data reconciliation and schema migration tooling',
      'Comprehensive API documentation and integration test suite',
    ],
    keyFeaturesAr: [
      'معالجة لا تكرارية للـ Webhooks وطوابير إعادة محاولة آلية لمنع فقدان أي دفعة مالية',
      'طبقة واجهات برمجية موحدة تربط بين الأنظمة القديمة والخدمات السحابية الحديثة',
      'أدوات تسوية مالية ومطابقة بيانات آلية وهجرة سلسة لمخططات البيانات',
      'توثيق برمجي شامل وحزمة اختبارات تكامل آلية تضمن عدم انكسار أي خدمة',
    ],
    problemStatement:
      'Unreliable third-party webhooks and brittle database transactions caused duplicate customer chargebacks, dropped order state events during traffic spikes, and extensive manual reconciliation friction.',
    problemStatementAr:
      'تسببت مشاكل عدم موثوقية الـ Webhooks وبطء المعاملات في تكرار خصم مبالغ من العملاء وفقدان إشعارات الطلبات أثناء ذروات الزيارات، مع تكبد ساعات طويلة يومياً في التسوية اليدوية المرهقة.',
    solutionOverview:
      'Syene Solutions designed an idempotent message-broker queue architecture with dead-letter fallback handling and zero-downtime database replication, completely eliminating dropped webhooks and establishing automated financial ledger integrity.',
    solutionOverviewAr:
      'صمم ونفذ فريق سايين سوليوشنز معمارية طوابير برمجية لا تكرارية (Idempotent) مع مسارات طوارئ للرسائل الفاشلة وتزامن لحظي لقواعد البيانات، مما قضى تماماً على فقدان المعاملات وحقق دقة مالية مطلقة.',
    nubixContribution: [
      'Data model audit and API contract specification',
      'Core backend service implementation and third-party gateway integration',
      'Automated integration testing and deployment script configuration',
      'Technical documentation and engineering handover',
    ],
    nubixContributionAr: [
      'تدقيق شامل لنماذج البيانات الحالية وتحديد عقود الواجهات البرمجية (API Contracts)',
      'تطوير الخدمات الخلفية المركزية ودمج بوابات الدفع الإقليمية والدولية',
      'برمجة اختبارات التكامل الآلية وإعداد سكريبتات النشر السحابي المستقر',
      'تسليم التوثيق الفني المعماري الكامل وتدريب الفريق الهندسي الداخلي',
    ],
    status: 'Completed',
    statusAr: 'مكتمل بنجاح',
    verifiedOutcomes: [
      'Zero dropped or duplicate payment webhooks across 2.4M+ processed transactions.',
      'Peak concurrency sustained at 12,000 RPM with sub-45ms median response latency.',
      '100% automated daily financial reconciliation completed without manual engineering interventions.',
    ],
    verifiedOutcomesAr: [
      'صفر أخطاء أو تكرار في إشعارات الدفع عبر أكثر من ٢.٤ مليون معاملة مالية تمت معالجتها.',
      'تحمل تشغيلي بلغ ١٢ ألف طلب بالدقيقة بزمن استجابة أقل من ٤٥ مللي ثانية.',
      'تسوية مالية يومية مؤتمتة بنسبة ١٠٠٪ دون أي تدخل بشري أو هندسي يدوي.',
    ],
    demoUrl: undefined,
    repoUrl: undefined,
    isPlaceholder: false,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}

export function getRelatedProjects(currentSlug: string, limit = 2): Project[] {
  return PROJECTS.filter((project) => project.slug !== currentSlug).slice(0, limit);
}
