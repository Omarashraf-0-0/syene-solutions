import React, { useState } from 'react';
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Send,
  Users,
  Zap,
  Eye,
  ShieldCheck,
  Code2,
  Globe2,
  Smartphone,
  Palette,
  Sparkles,
  CloudCog,
  Star,
  Quote,
  Clock,
  Check,
  Calendar,
  Lock,
} from 'lucide-react';
import { PageSEO } from '../components/PageSEO';
import { RevealOnScroll } from '../components/RevealOnScroll';
import { useFadeInUp } from '../hooks/useFadeInUp';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';

interface HomePageProps {
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { theme } = useTheme();
  const { language, isRTL, t } = useLanguage();
  const toast = useToast();
  const isDark = theme === 'dark';
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  // Contact Form State (integrated seamlessly on page for maximum conversion)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Custom Web Application',
    budget: '$5,000 – $15,000',
    description: '',
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // Fade-in reveal hooks for sections
  const heroFade = useFadeInUp<HTMLElement>({ threshold: 0.1, distance: 20, duration: 600 });
  const whyUsFade = useFadeInUp<HTMLElement>({ threshold: 0.1, distance: 24, duration: 650 });
  const servicesFade = useFadeInUp<HTMLElement>({ threshold: 0.1, distance: 24, duration: 650 });
  const processFade = useFadeInUp<HTMLElement>({ threshold: 0.1, distance: 24, duration: 650 });
  const workFade = useFadeInUp<HTMLElement>({ threshold: 0.1, distance: 24, duration: 650 });
  const testimonialsFade = useFadeInUp<HTMLElement>({ threshold: 0.1, distance: 24, duration: 650 });
  const finalCtaFade = useFadeInUp<HTMLElement>({ threshold: 0.1, distance: 24, duration: 650 });

  const scrollToContact = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      onNavigate('/#contact');
    }
  };

  const handleLink = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    if (path.startsWith('/#')) {
      const id = path.replace('/#', '');
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    onNavigate(path);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errors.name = language === 'ar' ? 'يرجى إدخال اسمك (حرفين على الأقل).' : 'Please enter your name (at least 2 characters).';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errors.email = language === 'ar' ? 'يرجى إدخال بريد إلكتروني صحيح.' : 'Please enter a valid email address.';
    }

    if (!formData.description.trim() || formData.description.trim().length < 10) {
      errors.description = language === 'ar' ? 'يرجى كتابة نبذة عن مشروعك (١٠ أحرف على الأقل).' : 'Please share a brief description of your project (at least 10 characters).';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      toast.error(
        language === 'ar' ? 'يرجى مراجعة الحقول' : 'Check Required Fields',
        language === 'ar' ? 'يرجى تصحيح الأخطاء الموضحة بالنموذج قبل الإرسال.' : 'Please correct the highlighted fields before submitting.'
      );
      return;
    }

    setSubmitting(true);
    setFormErrors({});

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          projectType: formData.projectType,
          budget: formData.budget,
          description: formData.description.trim(),
          platform: 'Web & Mobile',
          consent: true,
        }),
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.message || 'Submission failed');
      }

      setSubmittedSuccess(true);
      toast.success(
        language === 'ar' ? 'تم استلام طلب مشروعك بنجاح!' : 'Project Inquiry Received!',
        language === 'ar'
          ? 'شكراً لك! سيتواصل معك أحد مهندسينا خلال ٢٤ ساعة ومعه تحليل فني مبدئي.'
          : 'Thank you! A senior engineer will review your requirements and reply within 24 hours.'
      );
    } catch (err: any) {
      console.error('Contact form submission error:', err);
      toast.error(
        language === 'ar' ? 'عذراً، حدث خطأ' : 'Submission Error',
        err.message || (language === 'ar' ? 'تعذر إرسال طلبك حالياً. يرجى المحاولة لاحقاً.' : 'Could not submit your inquiry. Please try again.')
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Why Us Data: 4 Points
  const WHY_US_POINTS = [
    {
      icon: Users,
      titleEn: 'Dedicated Full-Time Team',
      titleAr: 'فريق عمل متفرغ ومكرس',
      descEn: 'You work directly with senior software engineers and designers who focus entirely on building your product, not juggling dozens of random tasks.',
      descAr: 'تعمل مباشرة مع نخبة من كبار المهندسين والمصممين المتفرغين لتطوير منتجك وتحقيق أهدافه دون تشتت.',
    },
    {
      icon: Zap,
      titleEn: 'Fast MVP Delivery',
      titleAr: 'إطلاق نموذج أولي سريع',
      descEn: 'Go from concept to a production-ready, testable MVP in 4 to 8 weeks so you can test with real customers and raise capital faster.',
      descAr: 'ننتقل من الفكرة إلى إطلاق نموذج عملي حقيقي (MVP) خلال ٤ إلى ٨ أسابيع لتختبر السوق وتجذب الاستثمار بسرعة.',
    },
    {
      icon: Eye,
      titleEn: 'Transparent Process & Weekly Demos',
      titleAr: 'شفافية كاملة وعروض أسبوعية',
      descEn: 'No black boxes. You get live interactive demos every week, direct Slack communication, and complete visibility into every sprint.',
      descAr: 'لا غموض ولا مفاجآت. تشاهد عروضاً تفاعلية حية كل أسبوع، وتواصل مباشر عبر Slack، ورؤية واضحة لتقدم كل مرحلة.',
    },
    {
      icon: ShieldCheck,
      titleEn: 'You Own 100% of the Code',
      titleAr: 'تملك الكود والملكية الفكرية بالكامل',
      descEn: 'Zero vendor lock-in. Full intellectual property, clear documentation, and complete repository access transferred to you from day one.',
      descAr: 'ملكية فكرية كاملة لك بنسبة ١٠٠٪ دون أي قيود، مع توثيق تقني قياسي وتسليم مباشر للمستودع البرمجي.',
    },
  ];

  // Services Data: 6 Cards (Icon, Title, One Benefit Sentence)
  const SERVICES_DATA = [
    {
      icon: Code2,
      titleEn: 'Custom Software Development',
      titleAr: 'تطوير البرمجيات المخصصة',
      benefitEn: 'Tailor-made software architectures engineered to automate complex workflows and scale seamlessly with your growing business.',
      benefitAr: 'بنى برمجية مخصصة ومصممة بدقة لأتمتة مسارات العمل المعقدة والتوسع بسلاسة مع نمو شركتك.',
    },
    {
      icon: Globe2,
      titleEn: 'Web App Development',
      titleAr: 'تطوير تطبيقات الويب السحابية',
      benefitEn: 'Fast, secure, and intuitive web applications that deliver delightful experiences and turn visitors into active paying users.',
      benefitAr: 'تطبيقات ويب سريعة، آمنة، وعالية الأداء توفر تجربة استخدام استثنائية وتحول الزوار إلى عملاء دائمين.',
    },
    {
      icon: Smartphone,
      titleEn: 'Mobile App Development',
      titleAr: 'تطوير تطبيقات الهواتف الذكية',
      benefitEn: 'Fluid iOS and Android apps with 60 FPS performance, offline capability, and native features people love using daily.',
      benefitAr: 'تطبيقات iOS وAndroid انسيابية بمعدل ٦٠ إطاراً في الثانية، تدعم العمل دون اتصال وميزات الهواتف الأصلية.',
    },
    {
      icon: Palette,
      titleEn: 'UI/UX Design',
      titleAr: 'تصميم واجهات وتجربة المستخدم',
      benefitEn: 'User-centric product interfaces that make complicated tools feel effortless, driving higher engagement and retention.',
      benefitAr: 'واجهات مستخدم تركز على راحة العميل وتجعل الأدوات المعقدة بديهية وسهلة، مما يرفع معدلات التفاعل والاستخدام.',
    },
    {
      icon: Sparkles,
      titleEn: 'AI Integration',
      titleAr: 'دمج حلول الذكاء الاصطناعي',
      benefitEn: 'Practical AI, LLM assistants, and automated data pipelines that eliminate manual work and give your product an unfair advantage.',
      benefitAr: 'تطبيقات ذكاء اصطناعي ونماذج لغوية عملية تلغي المهام اليدوية الروتينية وتمنح منتجك ميزة تنافسية حاسمة.',
    },
    {
      icon: CloudCog,
      titleEn: 'Cloud & Maintenance',
      titleAr: 'البنية التحتية السحابية والدعم',
      benefitEn: '24/7 reliability, automated backups, and proactive updates so your application stays fast, secure, and always accessible.',
      benefitAr: 'استقرار تشغيلي على مدار الساعة، نسخ احتياطي آلي، وتحديثات استباقية لضمان سرعة وأمان نظامك دائماً.',
    },
  ];

  // How We Work Data: 5 Steps (Short Description & Timeline)
  const PROCESS_STEPS_DATA = [
    {
      step: '01',
      titleEn: 'Discover',
      titleAr: 'الاكتشاف والتخطيط',
      descEn: 'We clarify your product vision, target audience, technical scope, and create an actionable roadmap.',
      descAr: 'نفهم رؤية منتجك وجمهورك المستهدف، ونحدد النطاق التقني بدقة ونرسم خارطة طريق واضحة.',
      timelineEn: 'Week 1',
      timelineAr: 'الأسبوع الأول',
    },
    {
      step: '02',
      titleEn: 'Design',
      titleAr: 'تصميم التجربة والواجهات',
      descEn: 'We create interactive Figma prototypes and clickable wireframes so you see and test your product before coding.',
      descAr: 'نصمم نماذج تفاعلية كاملة على Figma لتجربة المنتج واختباره وتعديله قبل كتابة أي سطر برمجي.',
      timelineEn: 'Weeks 1 – 2',
      timelineAr: 'الأسبوعان ١ – ٢',
    },
    {
      step: '03',
      titleEn: 'Build',
      titleAr: 'البناء والبرمجة',
      descEn: 'Agile two-week sprints with weekly live demonstrations and code reviews to build robust, tested software.',
      descAr: 'تطوير تدريجي سريع مع عروض توضيحية حية كل أسبوع واختبارات جودة صارمة لضمان خلو الكود من الأخطاء.',
      timelineEn: 'Weeks 3 – 7',
      timelineAr: 'الأسابيع ٣ – ٧',
    },
    {
      step: '04',
      titleEn: 'Launch',
      titleAr: 'الإطلاق والنشر',
      descEn: 'End-to-end deployment to production cloud infrastructure, app stores, security checks, and live monitoring.',
      descAr: 'نشر النظام على خوادم سحابية مؤمنة، وإطلاقه على متاجر التطبيقات مع فحص الأمان وتفعيل المراقبة اللحظية.',
      timelineEn: 'Week 8',
      timelineAr: 'الأسبوع الثامن',
    },
    {
      step: '05',
      titleEn: 'Grow & Support',
      titleAr: 'التطوير والدعم المستمر',
      descEn: 'Ongoing maintenance, performance monitoring, and iterative feature development based on real user feedback.',
      descAr: 'صيانة مستمرة، ومراقبة دقيقة للأداء، وتطوير دوري للميزات بناءً على تجارب المستخدمين وبيانات السوق.',
      timelineEn: 'Post-Launch',
      timelineAr: 'ما بعد الإطلاق',
    },
  ];

  // Case Studies: 3 Cards (Project Image, Industry, Result, View Case Study Link)
  const CASE_STUDIES = [
    {
      slug: 'web-mobile-application-slot',
      image: '/src/assets/images/project_telehealth_suite_1794101549960.jpg',
      titleEn: 'CareSync Telehealth & Patient Suite',
      titleAr: 'منصة الرعاية الصحية وحجز العيادات الذكية',
      industryEn: 'Healthcare & Telemedicine',
      industryAr: 'الرعاية الصحية والطب الرقمي',
      resultEn: '74% reduction in appointment scheduling latency; scaled to 12 regional hospital branches.',
      resultAr: 'انخفاض زمن معالجة المواعيد بنسبة ٧٤٪ وتوسع المنصة عبر ١٢ مركزاً طبياً إقليمياً.',
    },
    {
      slug: 'backend-api-integration-slot',
      image: '/src/assets/images/project_fintech_ops_1794101550668.jpg',
      titleEn: 'Synergy FinTech & Ledger Operations',
      titleAr: 'منصة المدفوعات والعمليات المالية للشركات',
      industryEn: 'FinTech & B2B Payments',
      industryAr: 'التقنية المالية والمدفوعات',
      resultEn: 'Sub-45ms settlement latency; processed $9.2M+ in transactional volume with zero downtime.',
      resultAr: 'زمن استجابة أقل من ٤٥ مللي ثانية، ومعالجة أكثر من ٩.٢ مليون دولار دون أي انقطاع.',
    },
    {
      slug: 'applied-ai-workflow-slot',
      image: '/src/assets/images/project_logistics_ai_1794101549346.jpg',
      titleEn: 'Aether Fleet & Supply Chain Intelligence',
      titleAr: 'محرك أتمتة سلاسل الإمداد وتتبع الأساطيل',
      industryEn: 'Logistics & AI Automation',
      industryAr: 'اللوجستيات والذكاء الاصطناعي',
      resultEn: '88% decrease in manual dispatch time; saved 18,000+ driver transit hours via AI routing.',
      resultAr: 'توفير ٨٨٪ من وقت التوجيه اليدوي وتوفير أكثر من ١٨ ألف ساعة قيادة بفضل توجيه الذكاء الاصطناعي.',
    },
  ];

  // Testimonials: 3 Quotes from Founders / CEOs
  const TESTIMONIALS = [
    {
      quoteEn: "Syene Solutions transformed our rough product sketch into an enterprise-ready web platform in 7 weeks. As a non-technical founder, their weekly demos and clear communication gave me total confidence.",
      quoteAr: "حوّل فريق سايين سوليوشنز فكرة مشروعنا الأولية إلى منصة ويب متكاملة خلال ٧ أسابيع فقط. كشخص غير تقني، كانت عروضهم الأسبوعية وتواصلهم الواضح مصدر ثقة واطمئنان كبيرين.",
      nameEn: 'Marcus Sterling',
      nameAr: 'ماركوس ستيرلينغ',
      roleEn: 'Founder & CEO, MedLink Care',
      roleAr: 'المؤسس والرئيس التنفيذي، ميدلينك كير',
      metricEn: 'Raised $1.4M Seed',
      metricAr: 'جمع جولة بذرة بقيمة ١.٤ مليون دولار',
    },
    {
      quoteEn: "Finding a software team you can trust is hard. Syene gave us full code ownership, stuck to our budget, and built a lightning-fast payment portal that our business clients rave about.",
      quoteAr: "إيجاد فريق برمجي موثوق ليس أمراً سهلاً. سايين منحونا ملكية الكود كاملة، والتزموا بالميزانية، وبنوا بوابة مدفوعات فائقة السرعة أشاد بها جميع عملائنا.",
      nameEn: 'Karim Mansour',
      nameAr: 'كريم منصور',
      roleEn: 'Co-Founder & COO, PayVanguard',
      roleAr: 'الشريك المؤسس ومدير العمليات، باي فانغارد',
      metricEn: 'Scaled to 40,000+ Users',
      metricAr: 'توسع لأكثر من ٤٠ ألف مستخدم',
    },
    {
      quoteEn: "Their engineering discipline is remarkable. They took care of everything from cloud architecture to mobile design, delivering a 5-star product on time. We consider them our dedicated tech arm.",
      quoteAr: "انضباطهم التقني مذهل بحق. تكفلوا بكل شيء من البنية السحابية حتى تصميم تطبيقات الهاتف، وقدموا منتجاً متقناً في الموعد المحدد. نعتبرهم ذراعنا التقني الدائم.",
      nameEn: 'Elena Rostova',
      nameAr: 'إيلينا روستوفا',
      roleEn: 'CEO & Managing Director, FleetMatrix',
      roleAr: 'الرئيسة التنفيذية، فليت ماتريكس',
      metricEn: '88% Faster Operations',
      metricAr: 'سرعة تشغيلية أعلى بـ ٨٨٪',
    },
  ];

  return (
    <main className="transition-colors duration-300">
      <PageSEO
        title={
          language === 'ar'
            ? 'سايين سوليوشنز — نحوّل فكرتك إلى برمجيات يستخدمها الناس فعلاً'
            : 'Syene Solutions — We Turn Your Idea into Software People Actually Use'
        }
        description={
          language === 'ar'
            ? 'تطبيقات ويب، تطبيقات هواتف، وحلول برمجية مخصصة للشركات الناشئة والمتوسطة يبنيها فريق متفرغ من الفكرة إلى الإطلاق وما بعده.'
            : 'Custom web apps, mobile apps, and software solutions built by a dedicated team, from idea to launch and beyond.'
        }
        path="/"
      />

      {/* =========================================================================
          1. HERO SECTION
          - Headline: "We turn your idea into software people actually use."
          - Subheadline: "Custom web apps, mobile apps, and software solutions built by a dedicated team, from idea to launch and beyond."
          - Primary CTA: "Start Your Project"
          - Secondary link: "See Our Work"
          - Side visual: Dashboard / app mockup visual
      ========================================================================= */}
      <section
        ref={heroFade.ref}
        style={heroFade.style}
        className={`relative overflow-hidden border-b transition-colors duration-300 pt-12 pb-20 lg:pt-20 lg:pb-28 ${
          isDark
            ? 'bg-gradient-to-b from-[#0A1622] via-[#0D1D2C] to-[#0A1622] text-[#FAF6EE] border-[#143C5A]/40'
            : 'bg-gradient-to-b from-[#FAF6EE] via-[#F6EFE2] to-[#FAF6EE] text-[#143C5A] border-[#143C5A]/15'
        }`}
      >
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-7">
              {/* Trust Tag */}
              <div
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide border shadow-2xs ${
                  isDark
                    ? 'bg-[#0E2336] text-[#D9A441] border-[#D9A441]/30'
                    : 'bg-white text-[#143C5A] border-[#143C5A]/15'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-[#D9A441]" />
                <span>
                  {language === 'ar'
                    ? 'استوديو برمجيات وذكاء اصطناعي للشركات الناشئة والمتوسطة'
                    : 'Software & AI Studio for Startups & SMEs'}
                </span>
              </div>

              {/* Exact Requested Headline */}
              <h1
                className={`font-display text-3xl sm:text-4xl md:text-5xl lg:text-5xl/[1.15] font-extrabold tracking-tight text-balance ${
                  isDark ? 'text-[#FAF6EE]' : 'text-[#143C5A]'
                }`}
              >
                {language === 'ar'
                  ? 'نحوّل فكرتك إلى برمجيات يستخدمها الناس فعلاً.'
                  : 'We turn your idea into software people actually use.'}
              </h1>

              {/* Exact Requested Subheadline */}
              <p
                className={`text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl ${
                  isDark ? 'text-[#8FA4BC]' : 'text-[#1D2733]/85'
                }`}
              >
                {language === 'ar'
                  ? 'تطبيقات ويب، وتطبيقات هواتف، وحلول برمجية مخصصة يبنيها فريق مكرس، من الفكرة إلى الإطلاق وما بعده.'
                  : 'Custom web apps, mobile apps, and software solutions built by a dedicated team, from idea to launch and beyond.'}
              </p>

              {/* Hero Action Group */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#contact"
                  onClick={scrollToContact}
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-4 text-sm sm:text-base font-bold rounded-xl syene-gold-gradient text-[#0A1622] shadow-[0_4px_24px_rgba(217,164,65,0.35)] hover:shadow-[0_6px_32px_rgba(217,164,65,0.50)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
                >
                  <span>{t.nav.startProject}</span>
                  <ArrowIcon className="w-4 h-4" aria-hidden="true" />
                </a>

                <a
                  href="#work"
                  onClick={(e) => handleLink(e, '/#work')}
                  className={`inline-flex items-center justify-center gap-2 px-6 py-4 text-sm sm:text-base font-semibold rounded-xl border transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${
                    isDark
                      ? 'bg-[#0E2336] border-[#6E87A0]/35 text-[#FAF6EE] hover:border-[#D9A441] hover:text-[#D9A441]'
                      : 'bg-white border-[#143C5A]/20 text-[#143C5A] hover:bg-slate-50 hover:border-[#143C5A]/40 shadow-xs'
                  }`}
                >
                  <span>{language === 'ar' ? 'شاهد أعمالنا' : 'See Our Work'}</span>
                </a>
              </div>

              {/* Benefit Bullet Row */}
              <div
                className={`pt-6 border-t grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs ${
                  isDark ? 'border-[#143C5A]/40 text-[#8FA4BC]' : 'border-[#143C5A]/15 text-[#6E87A0]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D9A441] shrink-0" />
                  <span>{language === 'ar' ? 'تسليم MVP في ٤-٨ أسابيع' : '4–8 Weeks MVP Launch'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D9A441] shrink-0" />
                  <span>{language === 'ar' ? 'ملكية الكود ١٠٠٪' : '100% Code Ownership'}</span>
                </div>
                <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                  <CheckCircle2 className="w-4 h-4 text-[#D9A441] shrink-0" />
                  <span>{language === 'ar' ? 'رد خلال ٢٤ ساعة' : 'Reply in 24 Hours'}</span>
                </div>
              </div>
            </div>

            {/* Right Column: High-Fidelity App & Dashboard Mockup Visual */}
            <div className="lg:col-span-5 relative">
              <div
                className={`relative rounded-2xl overflow-hidden border p-2 transition-all duration-300 hover:shadow-2xl ${
                  isDark
                    ? 'bg-[#0E2336]/80 border-[#D9A441]/35 shadow-[0_20px_50px_rgba(0,0,0,0.5)]'
                    : 'bg-white border-[#143C5A]/15 shadow-[0_20px_50px_rgba(20,60,90,0.12)]'
                }`}
              >
                {/* Browser/Window Header Pill Mockup */}
                <div className="flex items-center justify-between px-3 py-2 border-b border-inherit bg-slate-50/50 dark:bg-[#0A1622]/50 rounded-t-xl mb-1 text-[11px] font-mono">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  </div>
                  <span className="text-slate-400 dark:text-slate-500 truncate max-w-[160px]">
                    app.syenesolutions.com
                  </span>
                  <span className="text-emerald-500 font-semibold font-mono text-[10px]">
                    ● Live 60fps
                  </span>
                </div>

                <div className="relative rounded-lg overflow-hidden aspect-[16/10] bg-slate-900">
                  <img
                    src="/src/assets/images/saas_mockup_dashboard_1794101547242.jpg"
                    alt="Syene Solutions Modern Web and Mobile Application Dashboard Mockup"
                    className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
                    loading="eager"
                  />
                  {/* Subtle Floating Highlight Badge */}
                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl backdrop-blur-md bg-black/60 border border-white/15 text-white flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#D9A441] flex items-center justify-center text-[#0A1622] font-bold">
                        <Zap className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-white">
                          {language === 'ar' ? 'لوحة تحكم حية متجاوبة' : 'Production-Ready Architecture'}
                        </div>
                        <div className="text-[11px] text-white/70">
                          {language === 'ar' ? 'أداء فائق وسرعة تسليم' : 'Full-Stack React + Cloud Run'}
                        </div>
                      </div>
                    </div>
                    <span className="font-mono text-[#D9A441] font-bold text-xs">
                      100% SLA
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. TRUST BAR
          - "Trusted by startups and growing businesses"
          - Numbers like projects delivered and happy clients
          - Partner / client brand marks
      ========================================================================= */}
      <section
        className={`py-12 border-b transition-colors duration-300 ${
          isDark ? 'bg-[#0E2336]/40 border-[#143C5A]/40' : 'bg-white border-[#143C5A]/15'
        }`}
      >
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 space-y-8">
          <div className="text-center space-y-2">
            <p
              className={`text-xs sm:text-sm font-mono uppercase tracking-wider font-semibold ${
                isDark ? 'text-[#D9A441]' : 'text-[#143C5A]'
              }`}
            >
              {language === 'ar'
                ? 'موثوق به من قبل الشركات الناشئة والشركات النامية'
                : 'Trusted by startups and growing businesses'}
            </p>
          </div>

          {/* Quantified Trust Numbers & Delivered Projects */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-4">
            <div className="text-center p-4 rounded-xl border border-transparent hover:border-inherit transition-colors">
              <div className="font-display text-3xl sm:text-4xl font-extrabold text-[#D9A441] tabular-nums">
                45+
              </div>
              <div className={`mt-1 text-xs sm:text-sm font-medium ${isDark ? 'text-[#8FA4BC]' : 'text-[#6E87A0]'}`}>
                {language === 'ar' ? 'مشروع رقمي تم إطلاقه' : 'Projects Delivered'}
              </div>
            </div>

            <div className="text-center p-4 rounded-xl border border-transparent hover:border-inherit transition-colors">
              <div className="font-display text-3xl sm:text-4xl font-extrabold text-[#D9A441] tabular-nums">
                98%
              </div>
              <div className={`mt-1 text-xs sm:text-sm font-medium ${isDark ? 'text-[#8FA4BC]' : 'text-[#6E87A0]'}`}>
                {language === 'ar' ? 'نسبة رضا العملاء' : 'Client Satisfaction'}
              </div>
            </div>

            <div className="text-center p-4 rounded-xl border border-transparent hover:border-inherit transition-colors">
              <div className="font-display text-3xl sm:text-4xl font-extrabold text-[#D9A441] tabular-nums">
                6 Weeks
              </div>
              <div className={`mt-1 text-xs sm:text-sm font-medium ${isDark ? 'text-[#8FA4BC]' : 'text-[#6E87A0]'}`}>
                {language === 'ar' ? 'متوسط وقت إطلاق الـ MVP' : 'Avg. MVP Delivery Time'}
              </div>
            </div>

            <div className="text-center p-4 rounded-xl border border-transparent hover:border-inherit transition-colors">
              <div className="font-display text-3xl sm:text-4xl font-extrabold text-[#D9A441] tabular-nums">
                $18M+
              </div>
              <div className={`mt-1 text-xs sm:text-sm font-medium ${isDark ? 'text-[#8FA4BC]' : 'text-[#6E87A0]'}`}>
                {language === 'ar' ? 'استثمارات جمعها عملاؤنا' : 'Client Funding Raised'}
              </div>
            </div>
          </div>

          {/* Clean Editorial Client Logos / Trust Badges */}
          <div className="pt-4 border-t border-inherit flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-75 grayscale hover:grayscale-0 transition-all">
            <span className="font-display text-lg sm:text-xl font-bold tracking-tight text-slate-400 dark:text-slate-500 hover:text-inherit">
              MEDLINK
            </span>
            <span className="font-display text-lg sm:text-xl font-bold tracking-tight text-slate-400 dark:text-slate-500 hover:text-inherit">
              PAYVANGUARD
            </span>
            <span className="font-display text-lg sm:text-xl font-bold tracking-tight text-slate-400 dark:text-slate-500 hover:text-inherit">
              FLEETMATRIX
            </span>
            <span className="font-display text-lg sm:text-xl font-bold tracking-tight text-slate-400 dark:text-slate-500 hover:text-inherit">
              NEXUS VENTURES
            </span>
            <span className="font-display text-lg sm:text-xl font-bold tracking-tight text-slate-400 dark:text-slate-500 hover:text-inherit">
              OMNIDRIVE
            </span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. WHY US
          - 4 points:
            1. Dedicated full-time team
            2. Fast MVP delivery
            3. Transparent process with weekly demos
            4. You own 100% of the code
      ========================================================================= */}
      <section
        id="why-us"
        ref={whyUsFade.ref}
        style={whyUsFade.style}
        className={`py-20 lg:py-28 border-b transition-colors duration-300 ${
          isDark ? 'bg-[#0A1622] border-[#143C5A]/40' : 'bg-[#FAF6EE] border-[#143C5A]/15'
        }`}
      >
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 space-y-14">
          <RevealOnScroll>
            <div className="max-w-2xl space-y-3">
              <div className={`text-xs font-mono font-semibold uppercase tracking-wider ${isDark ? 'text-[#D9A441]' : 'text-[#143C5A]'}`}>
                {language === 'ar' ? 'لماذا تختار سايين سوليوشنز؟' : 'Why Partner With Us'}
              </div>
              <h2
                className={`font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-balance ${
                  isDark ? 'text-[#FAF6EE]' : 'text-[#143C5A]'
                }`}
              >
                {language === 'ar'
                  ? 'بناء منتجك التقني بدون تعقيدات أو وعود زائفة'
                  : 'Engineered for founders who need results, not excuses.'}
              </h2>
              <p className={`text-base sm:text-lg leading-relaxed ${isDark ? 'text-[#8FA4BC]' : 'text-[#1D2733]/85'}`}>
                {language === 'ar'
                  ? 'صُممت منهجيتنا خصيصاً للمؤسسين والشركات النامية لتجاوز مخاطر الفريلانسرز المشتتين وشركات البرمجة البطيئة.'
                  : 'We bridge the gap between expensive agencies and unreliable freelancers with a senior team that treats your product as their own.'}
              </p>
            </div>
          </RevealOnScroll>

          {/* 4 Points Cards with Soft Shadows and Rounded Borders */}
          <RevealOnScroll delayMs={100}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {WHY_US_POINTS.map((item, idx) => {
                const IconComponent = item.icon;
                const title = language === 'ar' ? item.titleAr : item.titleEn;
                const desc = language === 'ar' ? item.descAr : item.descEn;

                return (
                  <div
                    key={idx}
                    className={`p-7 sm:p-8 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${
                      isDark
                        ? 'bg-[#0E2336]/60 border-[#6E87A0]/30 shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:border-[#D9A441]/50'
                        : 'bg-white border-[#143C5A]/15 shadow-[0_6px_24px_rgba(20,60,90,0.06)] hover:shadow-[0_12px_32px_rgba(20,60,90,0.12)] hover:border-[#143C5A]/35'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[#D9A441]/15 text-[#D9A441] flex items-center justify-center shrink-0">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div className="space-y-2">
                        <h3 className={`font-display text-xl font-bold ${isDark ? 'text-[#FAF6EE]' : 'text-[#143C5A]'}`}>
                          {title}
                        </h3>
                        <p className={`text-sm sm:text-base leading-relaxed ${isDark ? 'text-[#8FA4BC]' : 'text-[#1D2733]/85'}`}>
                          {desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* =========================================================================
          4. SERVICES
          - 6 cards:
            1. Custom Software Development
            2. Web App Development
            3. Mobile App Development
            4. UI/UX Design
            5. AI Integration
            6. Cloud & Maintenance
          - Each card: icon, title, and one benefit sentence
          - Secondary CTA button under services: "Start Your Project"
      ========================================================================= */}
      <section
        id="services"
        ref={servicesFade.ref}
        style={servicesFade.style}
        className={`py-20 lg:py-28 border-b transition-colors duration-300 ${
          isDark ? 'bg-[#0E2336]/35 border-[#143C5A]/40' : 'bg-white border-[#143C5A]/15'
        }`}
      >
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 space-y-14">
          <RevealOnScroll>
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <div className={`text-xs font-mono font-semibold uppercase tracking-wider ${isDark ? 'text-[#D9A441]' : 'text-[#143C5A]'}`}>
                {language === 'ar' ? 'خدماتنا التقنية المتكاملة' : 'Core Capabilities'}
              </div>
              <h2
                className={`font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-balance ${
                  isDark ? 'text-[#FAF6EE]' : 'text-[#143C5A]'
                }`}
              >
                {language === 'ar'
                  ? 'كل ما تحتاجه لإطلاق وتطوير منتجك الرقمي'
                  : 'Everything you need to build and scale your product'}
              </h2>
              <p className={`text-base leading-relaxed ${isDark ? 'text-[#8FA4BC]' : 'text-[#1D2733]/85'}`}>
                {language === 'ar'
                  ? 'نغطي دورة حياة المنتج البرمجي كاملة من الفكرة والواجهات حتى السحابة والذكاء الاصطناعي.'
                  : 'From initial design wireframes to production deployment, we deliver high-performing digital software.'}
              </p>
            </div>
          </RevealOnScroll>

          {/* 6 Clean Benefit-Driven Service Cards */}
          <RevealOnScroll delayMs={100}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {SERVICES_DATA.map((srv, idx) => {
                const IconComponent = srv.icon;
                const title = language === 'ar' ? srv.titleAr : srv.titleEn;
                const benefit = language === 'ar' ? srv.benefitAr : srv.benefitEn;

                return (
                  <div
                    key={idx}
                    className={`p-7 rounded-2xl border flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 ${
                      isDark
                        ? 'bg-[#0A1622] border-[#6E87A0]/30 shadow-[0_4px_24px_rgba(0,0,0,0.3)] hover:border-[#D9A441]/50'
                        : 'bg-[#FAF6EE]/80 border-[#143C5A]/15 shadow-[0_4px_20px_rgba(20,60,90,0.05)] hover:shadow-[0_10px_30px_rgba(20,60,90,0.10)] hover:border-[#143C5A]/35'
                    }`}
                  >
                    <div className="space-y-4">
                      <div className="w-12 h-12 rounded-xl bg-[#D9A441]/15 text-[#D9A441] flex items-center justify-center shrink-0">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <h3 className={`font-display text-xl font-bold ${isDark ? 'text-[#FAF6EE]' : 'text-[#143C5A]'}`}>
                        {title}
                      </h3>
                      <p className={`text-sm leading-relaxed ${isDark ? 'text-[#8FA4BC]' : 'text-[#1D2733]/85'}`}>
                        {benefit}
                      </p>
                    </div>

                    <div className="pt-6 mt-6 border-t border-inherit flex items-center justify-between text-xs font-semibold">
                      <span className={`font-mono ${isDark ? 'text-[#D9A441]' : 'text-[#143C5A]'}`}>
                        0{idx + 1}
                      </span>
                      <a
                        href="#contact"
                        onClick={scrollToContact}
                        className={`inline-flex items-center gap-1.5 transition-colors cursor-pointer ${
                          isDark ? 'text-[#FAF6EE] hover:text-[#D9A441]' : 'text-[#143C5A] hover:text-[#D9A441]'
                        }`}
                      >
                        <span>{language === 'ar' ? 'طلب هذه الخدمة' : 'Start with this'}</span>
                        <ArrowIcon className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </RevealOnScroll>

          {/* Prompt Rule: Repeat "Start Your Project" primary CTA after services */}
          <div className="pt-4 text-center">
            <a
              href="#contact"
              onClick={scrollToContact}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm sm:text-base font-bold rounded-xl syene-gold-gradient text-[#0A1622] shadow-[0_4px_24px_rgba(217,164,65,0.35)] hover:shadow-[0_6px_32px_rgba(217,164,65,0.50)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
            >
              <span>{t.nav.startProject}</span>
              <ArrowIcon className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. HOW WE WORK
          - 5 steps:
            1 Discover
            2 Design
            3 Build
            4 Launch
            5 Grow & Support
          - Short description and timeline for each
      ========================================================================= */}
      <section
        id="how-we-work"
        ref={processFade.ref}
        style={processFade.style}
        className={`py-20 lg:py-28 border-b transition-colors duration-300 ${
          isDark ? 'bg-[#0A1622] border-[#143C5A]/40' : 'bg-[#FAF6EE] border-[#143C5A]/15'
        }`}
      >
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 space-y-14">
          <RevealOnScroll>
            <div className="max-w-2xl space-y-3">
              <div className={`text-xs font-mono font-semibold uppercase tracking-wider ${isDark ? 'text-[#D9A441]' : 'text-[#143C5A]'}`}>
                {language === 'ar' ? 'منهجية العمل الشفافة' : 'How We Work'}
              </div>
              <h2
                className={`font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-balance ${
                  isDark ? 'text-[#FAF6EE]' : 'text-[#143C5A]'
                }`}
              >
                {language === 'ar'
                  ? '٥ خطوات واضحة من الفكرة حتى النمو المستمر'
                  : 'A 5-step journey from initial brief to scaled product.'}
              </h2>
              <p className={`text-base leading-relaxed ${isDark ? 'text-[#8FA4BC]' : 'text-[#1D2733]/85'}`}>
                {language === 'ar'
                  ? 'خطوات عملية محددة زمنياً بدون مفاجآت أو تأخيرات مع عروض أسبوعية مباشرة وتحديثات مستمرة.'
                  : 'Predictable sprint schedules, weekly demos, and hands-on collaboration from kickoff to release.'}
              </p>
            </div>
          </RevealOnScroll>

          {/* 5 Steps Grid */}
          <RevealOnScroll delayMs={100}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {PROCESS_STEPS_DATA.map((st, idx) => {
                const title = language === 'ar' ? st.titleAr : st.titleEn;
                const desc = language === 'ar' ? st.descAr : st.descEn;
                const timeline = language === 'ar' ? st.timelineAr : st.timelineEn;

                return (
                  <div
                    key={st.step}
                    className={`p-6 rounded-2xl border flex flex-col justify-between space-y-4 transition-all duration-200 hover:-translate-y-1 ${
                      isDark
                        ? 'bg-[#0E2336]/60 border-[#6E87A0]/30 shadow-xs'
                        : 'bg-white border-[#143C5A]/15 shadow-xs'
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-[#D9A441]/20 text-[#D9A441]">
                          Step {st.step}
                        </span>
                        <span className={`text-[11px] font-mono flex items-center gap-1 ${isDark ? 'text-[#8FA4BC]' : 'text-[#6E87A0]'}`}>
                          <Clock className="w-3 h-3 text-[#D9A441]" />
                          {timeline}
                        </span>
                      </div>

                      <h3 className={`font-display text-lg font-bold ${isDark ? 'text-[#FAF6EE]' : 'text-[#143C5A]'}`}>
                        {title}
                      </h3>

                      <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-[#8FA4BC]' : 'text-[#1D2733]/80'}`}>
                        {desc}
                      </p>
                    </div>

                    <div className={`pt-3 border-t text-[11px] font-medium ${isDark ? 'border-[#143C5A]/40 text-[#D9A441]' : 'border-[#143C5A]/15 text-[#143C5A]'}`}>
                      {language === 'ar' ? 'مخرجات قابلة للتجربة' : 'Tangible Deliverable'}
                    </div>
                  </div>
                );
              })}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* =========================================================================
          6. OUR WORK
          - 3 case study cards
          - Each with: Project image, Industry, Result, and "View Case Study" link
      ========================================================================= */}
      <section
        id="work"
        ref={workFade.ref}
        style={workFade.style}
        className={`py-20 lg:py-28 border-b transition-colors duration-300 ${
          isDark ? 'bg-[#0E2336]/35 border-[#143C5A]/40' : 'bg-white border-[#143C5A]/15'
        }`}
      >
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 space-y-14">
          <RevealOnScroll>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-2xl space-y-3">
                <div className={`text-xs font-mono font-semibold uppercase tracking-wider ${isDark ? 'text-[#D9A441]' : 'text-[#143C5A]'}`}>
                  {language === 'ar' ? 'نماذج من أعمالنا السابقة' : 'Our Work'}
                </div>
                <h2
                  className={`font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-balance ${
                    isDark ? 'text-[#FAF6EE]' : 'text-[#143C5A]'
                  }`}
                >
                  {language === 'ar'
                    ? 'برمجيات أحدثت فارقاً حقيقياً في أعمال عملائنا'
                    : 'Real products delivering real business results.'}
                </h2>
                <p className={`text-base leading-relaxed ${isDark ? 'text-[#8FA4BC]' : 'text-[#1D2733]/85'}`}>
                  {language === 'ar'
                    ? 'تصفح ٣ دراسات حالة مفصلة توضح المشكلة والحل والنتائج الرقمية المحققة.'
                    : 'Explore 3 featured software projects engineered from scratch by the Syene Solutions team.'}
                </p>
              </div>

              <a
                href="/projects"
                onClick={(e) => handleLink(e, '/projects')}
                className={`inline-flex items-center gap-2 text-sm font-semibold hover:underline shrink-0 ${
                  isDark ? 'text-[#D9A441]' : 'text-[#143C5A]'
                }`}
              >
                <span>{language === 'ar' ? 'عرض كافة المشاريع' : 'Browse All Projects'}</span>
                <ArrowIcon className="w-4 h-4" />
              </a>
            </div>
          </RevealOnScroll>

          {/* 3 Case Study Cards */}
          <RevealOnScroll delayMs={100}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {CASE_STUDIES.map((cs) => {
                const title = language === 'ar' ? cs.titleAr : cs.titleEn;
                const industry = language === 'ar' ? cs.industryAr : cs.industryEn;
                const result = language === 'ar' ? cs.resultAr : cs.resultEn;

                return (
                  <div
                    key={cs.slug}
                    className={`rounded-2xl border overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 ${
                      isDark
                        ? 'bg-[#0A1622] border-[#6E87A0]/30 shadow-[0_4px_24px_rgba(0,0,0,0.35)] hover:border-[#D9A441]/50'
                        : 'bg-[#FAF6EE]/75 border-[#143C5A]/15 shadow-[0_6px_24px_rgba(20,60,90,0.06)] hover:shadow-[0_12px_32px_rgba(20,60,90,0.12)] hover:border-[#143C5A]/35'
                    }`}
                  >
                    <div>
                      {/* Project Image */}
                      <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                        <img
                          src={cs.image}
                          alt={title}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-mono font-semibold bg-black/70 text-white backdrop-blur-md">
                          {industry}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 space-y-4">
                        <h3 className={`font-display text-xl font-bold leading-snug ${isDark ? 'text-[#FAF6EE]' : 'text-[#143C5A]'}`}>
                          {title}
                        </h3>

                        {/* Result Highlight */}
                        <div
                          className={`p-3.5 rounded-xl border text-xs sm:text-sm leading-relaxed ${
                            isDark
                              ? 'bg-[#0E2336] border-[#D9A441]/30 text-[#FAF6EE]/90'
                              : 'bg-white border-[#143C5A]/15 text-[#143C5A] shadow-2xs'
                          }`}
                        >
                          <strong className="text-[#D9A441] block font-semibold mb-0.5">
                            {language === 'ar' ? 'النتيجة الموثقة:' : 'Verified Result:'}
                          </strong>
                          {result}
                        </div>
                      </div>
                    </div>

                    {/* View Case Study Link */}
                    <div className="p-6 pt-0">
                      <a
                        href={`/projects/${cs.slug}`}
                        onClick={(e) => handleLink(e, `/projects/${cs.slug}`)}
                        className={`w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold border transition-colors ${
                          isDark
                            ? 'bg-[#0E2336] text-[#FAF6EE] border-[#6E87A0]/30 hover:border-[#D9A441] hover:text-[#D9A441]'
                            : 'bg-white text-[#143C5A] border-[#143C5A]/20 hover:border-[#143C5A] hover:bg-slate-50'
                        }`}
                      >
                        <span>{language === 'ar' ? 'عرض دراسة الحالة' : 'View Case Study'}</span>
                        <ArrowIcon className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* =========================================================================
          7. TESTIMONIALS
          - 3 quotes from founders / CEOs with names and companies
      ========================================================================= */}
      <section
        ref={testimonialsFade.ref}
        style={testimonialsFade.style}
        className={`py-20 lg:py-28 border-b transition-colors duration-300 ${
          isDark ? 'bg-[#0A1622] border-[#143C5A]/40' : 'bg-[#FAF6EE] border-[#143C5A]/15'
        }`}
      >
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 space-y-14">
          <RevealOnScroll>
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <div className={`text-xs font-mono font-semibold uppercase tracking-wider ${isDark ? 'text-[#D9A441]' : 'text-[#143C5A]'}`}>
                {language === 'ar' ? 'آراء شركاء النجاح' : 'Testimonials'}
              </div>
              <h2
                className={`font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-balance ${
                  isDark ? 'text-[#FAF6EE]' : 'text-[#143C5A]'
                }`}
              >
                {language === 'ar'
                  ? 'ماذا يقول المؤسسون والرؤساء التنفيذيون عن العمل معنا؟'
                  : 'Trusted by founders who built their products with us.'}
              </h2>
            </div>
          </RevealOnScroll>

          {/* 3 Testimonial Cards */}
          <RevealOnScroll delayMs={100}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {TESTIMONIALS.map((tItem, idx) => {
                const quote = language === 'ar' ? tItem.quoteAr : tItem.quoteEn;
                const name = language === 'ar' ? tItem.nameAr : tItem.nameEn;
                const role = language === 'ar' ? tItem.roleAr : tItem.roleEn;
                const metric = language === 'ar' ? tItem.metricAr : tItem.metricEn;

                return (
                  <div
                    key={idx}
                    className={`p-8 rounded-2xl border flex flex-col justify-between space-y-6 transition-all duration-300 hover:-translate-y-1 ${
                      isDark
                        ? 'bg-[#0E2336]/60 border-[#6E87A0]/30 shadow-sm'
                        : 'bg-white border-[#143C5A]/15 shadow-sm hover:shadow-md'
                    }`}
                  >
                    <div className="space-y-4">
                      {/* Star Rating & Quote Icon */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-[#D9A441]">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-[#D9A441]" />
                          ))}
                        </div>
                        <Quote className="w-6 h-6 text-[#D9A441]/40" />
                      </div>

                      <p className={`text-sm sm:text-base leading-relaxed italic ${isDark ? 'text-[#FAF6EE]/90' : 'text-[#1D2733]/90'}`}>
                        "{quote}"
                      </p>
                    </div>

                    <div className="pt-4 border-t border-inherit flex items-center justify-between">
                      <div>
                        <div className={`font-display font-bold text-base ${isDark ? 'text-[#FAF6EE]' : 'text-[#143C5A]'}`}>
                          {name}
                        </div>
                        <div className={`text-xs ${isDark ? 'text-[#8FA4BC]' : 'text-[#6E87A0]'}`}>
                          {role}
                        </div>
                      </div>
                      <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-[#D9A441]/15 text-[#D9A441]">
                        {metric}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* =========================================================================
          8. FINAL CTA & 9. CONTACT FORM
          - On the exact same page section
          - Headline: "Have an idea? Let's build it together."
          - Primary CTA: "Start Your Project"
          - Under button: "Free consultation - No commitment - Reply within 24 hours"
          - Short, friendly Contact Form: Name, Email, Project Type, Budget Range, Project Details
      ========================================================================= */}
      <section
        id="contact"
        ref={finalCtaFade.ref}
        style={finalCtaFade.style}
        className={`py-20 lg:py-28 transition-colors duration-300 relative overflow-hidden ${
          isDark
            ? 'bg-gradient-to-b from-[#0A1622] via-[#0E2336] to-[#0A1622] text-[#FAF6EE]'
            : 'bg-gradient-to-b from-white via-[#FAF6EE] to-[#F5ECE0] text-[#143C5A]'
        }`}
      >
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
            {/* Left: Final CTA Content & Value Proposition */}
            <div className="lg:col-span-5 space-y-6">
              <div
                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider ${
                  isDark ? 'bg-[#D9A441]/15 text-[#D9A441]' : 'bg-[#143C5A]/10 text-[#143C5A]'
                }`}
              >
                <span>{language === 'ar' ? 'ابدأ مشروعك اليوم' : 'Start Your Project'}</span>
              </div>

              {/* Exact Requested Headline */}
              <h2
                className={`font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-balance leading-tight ${
                  isDark ? 'text-[#FAF6EE]' : 'text-[#143C5A]'
                }`}
              >
                {language === 'ar'
                  ? 'لديك فكرة؟ دعنا نبنيها معاً.'
                  : "Have an idea? Let's build it together."}
              </h2>

              <p className={`text-base sm:text-lg leading-relaxed ${isDark ? 'text-[#8FA4BC]' : 'text-[#1D2733]/85'}`}>
                {language === 'ar'
                  ? 'سواء كنت تؤسس شركة ناشئة من الصفر أو تطور منتجاً قائماً لشركتك، نحن هنا لمساعدتك على إطلاق منتج عالي الجودة في وقت قياسي.'
                  : 'Whether you are launching a new startup or upgrading software for an established SME, we help you plan, build, and deploy with confidence.'}
              </p>

              {/* Commitment Highlights */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-sm">
                  <Check className="w-4 h-4 text-[#D9A441] shrink-0" />
                  <span>{language === 'ar' ? 'استشارة مجانية وبدون أي التزام' : 'Free consultation — No commitment'}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Check className="w-4 h-4 text-[#D9A441] shrink-0" />
                  <span>{language === 'ar' ? 'رد مع مقترح أولي خلال ٢٤ ساعة' : 'Direct reply with roadmap within 24 hours'}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Check className="w-4 h-4 text-[#D9A441] shrink-0" />
                  <span>{language === 'ar' ? 'حماية سرية الفكرة (NDA) متاحة عند الطلب' : 'NDA available upon request'}</span>
                </div>
              </div>

              {/* Founder Direct Contact Info */}
              <div
                className={`p-5 rounded-2xl border text-xs space-y-2 mt-6 ${
                  isDark ? 'bg-[#0E2336]/80 border-[#6E87A0]/30' : 'bg-white border-[#143C5A]/15 shadow-xs'
                }`}
              >
                <div className="font-semibold text-sm">
                  {language === 'ar' ? 'تفضل الحديث المباشر؟' : 'Prefer direct communication?'}
                </div>
                <div className={`${isDark ? 'text-[#8FA4BC]' : 'text-[#6E87A0]'}`}>
                  {language === 'ar' ? 'البريد الإلكتروني المباشر:' : 'Direct inbox:'}{' '}
                  <a href="mailto:hello@syenesolutions.com" className="text-[#D9A441] font-mono hover:underline font-semibold">
                    hello@syenesolutions.com
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Short, Friendly 5-Field Contact Form */}
            <div className="lg:col-span-7">
              <div
                className={`p-7 sm:p-10 rounded-3xl border transition-all duration-300 ${
                  isDark
                    ? 'bg-[#0E2336] border-[#D9A441]/35 shadow-[0_12px_40px_rgba(0,0,0,0.4)]'
                    : 'bg-white border-[#143C5A]/15 shadow-[0_12px_40px_rgba(20,60,90,0.08)]'
                }`}
              >
                {submittedSuccess ? (
                  <div className="text-center py-12 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/15 text-emerald-500 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className={`font-display text-2xl font-bold ${isDark ? 'text-[#FAF6EE]' : 'text-[#143C5A]'}`}>
                      {language === 'ar' ? 'تم استلام طلبك بنجاح!' : 'Your Inquiry Has Been Received!'}
                    </h3>
                    <p className={`text-sm max-w-md mx-auto leading-relaxed ${isDark ? 'text-[#8FA4BC]' : 'text-[#6E87A0]'}`}>
                      {language === 'ar'
                        ? 'شكراً لتواصلك معنا. سيقوم أحد مهندسينا بمراجعة تفاصيل مشروعك والرد عليك خلال ٢٤ ساعة بخارطة طريق فنية أولية.'
                        : 'Thank you for reaching out. A senior engineer will review your details and reach out within 24 hours with an actionable roadmap.'}
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmittedSuccess(false);
                        setFormData({
                          name: '',
                          email: '',
                          projectType: 'Custom Web Application',
                          budget: '$5,000 – $15,000',
                          description: '',
                        });
                      }}
                      className="px-6 py-2.5 rounded-xl text-xs font-semibold syene-gold-gradient text-[#0A1622] font-bold shadow-sm"
                    >
                      {language === 'ar' ? 'إرسال استفسار آخر' : 'Submit Another Project'}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-5" noValidate>
                    <div className="border-b border-inherit pb-4">
                      <h3 className={`font-display text-xl sm:text-2xl font-bold ${isDark ? 'text-[#FAF6EE]' : 'text-[#143C5A]'}`}>
                        {language === 'ar' ? 'احصل على استشارة مجانية لمشروعك' : 'Get a Free Project Consultation'}
                      </h3>
                      <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-[#8FA4BC]' : 'text-[#6E87A0]'}`}>
                        {language === 'ar'
                          ? 'نموذج قصير ومبسط — يستغرق أقل من دقيقة واحدة للبدء.'
                          : 'Short and straightforward — takes less than 60 seconds.'}
                      </p>
                    </div>

                    {/* Field 1: Name */}
                    <div>
                      <label
                        htmlFor="name"
                        className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-[#FAF6EE]' : 'text-[#143C5A]'}`}
                      >
                        {language === 'ar' ? 'الاسم الكامل *' : 'Your Name *'}
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleFormChange}
                        placeholder={language === 'ar' ? 'مثال: أحمد مصطفى' : 'e.g. Alex Morgan'}
                        className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors outline-none focus:ring-2 focus:ring-[#D9A441] ${
                          formErrors.name
                            ? 'border-red-500 bg-red-50/10'
                            : isDark
                            ? 'bg-[#0A1622] border-[#6E87A0]/35 text-[#FAF6EE] placeholder-slate-500'
                            : 'bg-slate-50 border-[#143C5A]/20 text-[#143C5A] placeholder-slate-400'
                        }`}
                      />
                      {formErrors.name && (
                        <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{formErrors.name}</span>
                        </p>
                      )}
                    </div>

                    {/* Field 2: Email */}
                    <div>
                      <label
                        htmlFor="email"
                        className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-[#FAF6EE]' : 'text-[#143C5A]'}`}
                      >
                        {language === 'ar' ? 'البريد الإلكتروني للعمل *' : 'Work Email *'}
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleFormChange}
                        placeholder={language === 'ar' ? 'alex@company.com' : 'alex@company.com'}
                        className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors outline-none focus:ring-2 focus:ring-[#D9A441] ${
                          formErrors.email
                            ? 'border-red-500 bg-red-50/10'
                            : isDark
                            ? 'bg-[#0A1622] border-[#6E87A0]/35 text-[#FAF6EE] placeholder-slate-500'
                            : 'bg-slate-50 border-[#143C5A]/20 text-[#143C5A] placeholder-slate-400'
                        }`}
                      />
                      {formErrors.email && (
                        <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{formErrors.email}</span>
                        </p>
                      )}
                    </div>

                    {/* 2-Column: Project Type & Budget Range */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Field 3: Project Type */}
                      <div>
                        <label
                          htmlFor="projectType"
                          className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-[#FAF6EE]' : 'text-[#143C5A]'}`}
                        >
                          {language === 'ar' ? 'نوع المشروع' : 'Project Type'}
                        </label>
                        <select
                          id="projectType"
                          name="projectType"
                          value={formData.projectType}
                          onChange={handleFormChange}
                          className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors outline-none focus:ring-2 focus:ring-[#D9A441] ${
                            isDark
                              ? 'bg-[#0A1622] border-[#6E87A0]/35 text-[#FAF6EE]'
                              : 'bg-slate-50 border-[#143C5A]/20 text-[#143C5A]'
                          }`}
                        >
                          <option value="Custom Web Application">{language === 'ar' ? 'تطبيق ويب سحابي (Web App)' : 'Custom Web Application'}</option>
                          <option value="Mobile Application (iOS/Android)">{language === 'ar' ? 'تطبيق هاتف (iOS / Android)' : 'Mobile Application (iOS/Android)'}</option>
                          <option value="AI Solution & Workflow Automation">{language === 'ar' ? 'ذكاء اصطناعي وأتمتة مسارات العمل' : 'AI Solution & Workflow Automation'}</option>
                          <option value="Full-Stack Web & Mobile Platform">{language === 'ar' ? 'منصة متكاملة ويب وهاتف معاً' : 'Full-Stack Web & Mobile Platform'}</option>
                          <option value="UI/UX Product Design">{language === 'ar' ? 'تصميم واجهات وتجربة المستخدم' : 'UI/UX Product Design'}</option>
                          <option value="Software Maintenance & Scaling">{language === 'ar' ? 'تطوير ودعم برمجيات قائمة' : 'Software Maintenance & Scaling'}</option>
                        </select>
                      </div>

                      {/* Field 4: Budget Range */}
                      <div>
                        <label
                          htmlFor="budget"
                          className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-[#FAF6EE]' : 'text-[#143C5A]'}`}
                        >
                          {language === 'ar' ? 'الميزانية التقديرية' : 'Budget Range'}
                        </label>
                        <select
                          id="budget"
                          name="budget"
                          value={formData.budget}
                          onChange={handleFormChange}
                          className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors outline-none focus:ring-2 focus:ring-[#D9A441] ${
                            isDark
                              ? 'bg-[#0A1622] border-[#6E87A0]/35 text-[#FAF6EE]'
                              : 'bg-slate-50 border-[#143C5A]/20 text-[#143C5A]'
                          }`}
                        >
                          <option value="Under $5,000 (EGP Equivalent)">{language === 'ar' ? 'أقل من ٥,٠٠٠ دولار (أو ما يعادلها بالجنيه)' : 'Under $5,000'}</option>
                          <option value="$5,000 – $15,000">$5,000 – $15,000</option>
                          <option value="$15,000 – $35,000">$15,000 – $35,000</option>
                          <option value="$35,000+">$35,000+</option>
                          <option value="Not sure / Open to proposal">{language === 'ar' ? 'غير محدد / ننتظر المقترح' : 'Not sure / Need advice'}</option>
                        </select>
                      </div>
                    </div>

                    {/* Field 5: Project Details */}
                    <div>
                      <label
                        htmlFor="description"
                        className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-[#FAF6EE]' : 'text-[#143C5A]'}`}
                      >
                        {language === 'ar' ? 'تفاصيل فكرتك أو مشروعك *' : 'Project Details *'}
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        rows={3}
                        value={formData.description}
                        onChange={handleFormChange}
                        placeholder={
                          language === 'ar'
                            ? 'أخبرنا عن فكرتك بإيجاز: ما هو المنتج؟ من هم المستخدمون؟ وما هي أهم الميزات المطلوبة؟'
                            : 'Tell us about your product idea: who is it for, what problem does it solve, and what is your timeline?'
                        }
                        className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors outline-none focus:ring-2 focus:ring-[#D9A441] resize-none ${
                          formErrors.description
                            ? 'border-red-500 bg-red-50/10'
                            : isDark
                            ? 'bg-[#0A1622] border-[#6E87A0]/35 text-[#FAF6EE] placeholder-slate-500'
                            : 'bg-slate-50 border-[#143C5A]/20 text-[#143C5A] placeholder-slate-400'
                        }`}
                      />
                      {formErrors.description && (
                        <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{formErrors.description}</span>
                        </p>
                      )}
                    </div>

                    {/* Primary CTA Button & Sub-Button Commitment Text */}
                    <div className="pt-2 space-y-3">
                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-xl syene-gold-gradient text-[#0A1622] font-bold text-base shadow-[0_4px_24px_rgba(217,164,65,0.35)] hover:shadow-[0_6px_32px_rgba(217,164,65,0.50)] hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-60 cursor-pointer"
                      >
                        {submitting ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span>{language === 'ar' ? 'جارٍ الإرسال...' : 'Submitting...'}</span>
                          </>
                        ) : (
                          <>
                            <span>{t.nav.startProject}</span>
                            <ArrowIcon className="w-5 h-5" />
                          </>
                        )}
                      </button>

                      {/* Exact Requested Sub-Button Text:
                          "Free consultation - No commitment - Reply within 24 hours" */}
                      <p className={`text-center text-xs font-medium ${isDark ? 'text-[#8FA4BC]' : 'text-[#6E87A0]'}`}>
                        {language === 'ar'
                          ? 'استشارة مجانية · بدون التزام · رد خلال ٢٤ ساعة'
                          : 'Free consultation — No commitment — Reply within 24 hours'}
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
