import React, { useState, useEffect } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  Copy,
  Check,
  Loader2,
  Send,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { getProjectBySlug } from '../data/projects';
import { PRICING_MODELS } from '../data/pricing';
import { PageSEO } from '../components/PageSEO';
import { Card3DTilt } from '../components/3d/Card3DTilt';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';

interface ContactPageProps {
  searchQuery: string;
  onNavigate: (path: string) => void;
}

interface InquiryFormData {
  name: string;
  email: string;
  company: string;
  projectType: string;
  platform: string;
  description: string;
  budget: string;
  timeline: string;
  consent: boolean;
}

interface FieldErrors {
  name?: string;
  email?: string;
  projectType?: string;
  platform?: string;
  description?: string;
  budget?: string;
  timeline?: string;
  consent?: string;
}

const PROJECT_TYPES_DATA = [
  { en: 'Ready-Made Solution (Model A)', ar: 'حل جاهز للتسليم السريع (النموذج أ)' },
  { en: 'Customized Solution (Model B)', ar: 'تطوير وتخصيص نظام قائم (النموذج ب)' },
  { en: 'Custom-Built Software / Web Application (Model C)', ar: 'بناء وتطوير برمجيات مخصصة بالكامل (النموذج ج)' },
  { en: 'AI Solutions & Workflow Integration', ar: 'حلول الذكاء الاصطناعي وأتمتة مسارات العمل' },
  { en: 'Backend Architecture & API Integration', ar: 'هندسة البنى التحتية والتكامل البرمجي' },
  { en: 'Software Maintenance & Improvement', ar: 'الصيانة والدعم والتطوير المستمر' },
];

const PLATFORMS_DATA = [
  { en: 'Web Application', ar: 'تطبيق ويب متكامل' },
  { en: 'Mobile Application (iOS / Android)', ar: 'تطبيق هواتف ذكية (iOS / Android)' },
  { en: 'Web & Mobile Cross-Platform', ar: 'منصة ويب وتطبيق هاتف معاً' },
  { en: 'Backend API / Data Pipeline Only', ar: 'واجهات برمجية خلفية ومسارات بيانات فقط' },
  { en: 'AI / LLM Integration into Existing System', ar: 'دمج نماذج ذكاء اصطناعي في نظام حالي' },
  { en: 'Not Sure Yet — Need Architectural Guidance', ar: 'غير متأكد بعد — أحتاج استشارة هندسية' },
];

const BUDGET_RANGES_DATA = [
  { en: 'Starting From Base Package ($1,200 – $2,500 / EGP Equivalent)', ar: 'الباقة الابتدائية الأساسية ($1,200 – $2,500 / ما يعادلها بالجنيه)' },
  { en: '$2,500 – $5,000 (EGP Equivalent)', ar: '$2,500 – $5,000 (أو ما يعادلها بالجنيه)' },
  { en: '$5,000 – $12,000 (EGP Equivalent)', ar: '$5,000 – $12,000 (أو ما يعادلها بالجنيه)' },
  { en: '$12,000+ / Custom Enterprise Scope', ar: '+12,000$ فأكثر / نطاق مؤسسي مخصص' },
  { en: 'Need a Scoped Quote After Discovery', ar: 'أحتاج تقييماً وعرض سعر بعد مراجعة المتطلبات' },
];

const TIMELINES_DATA = [
  { en: 'Urgent (Under 4 weeks — best for Ready-Made)', ar: 'عاجل (أقل من 4 أسابيع — الأنسب للحلول الجاهزة)' },
  { en: '1 – 2 Months', ar: 'شهر إلى شهرين' },
  { en: '2 – 4 Months', ar: 'شهران إلى 4 أشهر' },
  { en: 'Flexible / Phased Rollout', ar: 'مرن / تسليم على مراحل متتابعة' },
];

export const ContactPage: React.FC<ContactPageProps> = ({ searchQuery, onNavigate }) => {
  const { theme } = useTheme();
  const { language, isRTL, t } = useLanguage();
  const toast = useToast();
  const isDark = theme === 'dark';

  const [formData, setFormData] = useState<InquiryFormData>({
    name: '',
    email: '',
    company: '',
    projectType: '',
    platform: '',
    description: '',
    budget: '',
    timeline: '',
    consent: false,
  });

  const [lastSubmittedInquiry, setLastSubmittedInquiry] = useState<InquiryFormData | null>(null);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deliveryStatus, setDeliveryStatus] = useState<{
    configured: boolean;
    provider: string;
  } | null>(null);

  const [submissionOutcome, setSubmissionOutcome] = useState<{
    status: 'idle' | 'confirmed' | 'unconfigured' | 'error';
    message?: string;
    deliveryId?: string;
    provider?: string;
  }>({ status: 'idle' });

  const [copiedBrief, setCopiedBrief] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(searchQuery);
    const pkgId = params.get('package');
    const projSlug = params.get('project');

    if (pkgId) {
      const matchedTier = PRICING_MODELS.find((t) => t.id === pkgId);
      if (matchedTier) {
        setFormData((prev) => ({
          ...prev,
          projectType:
            matchedTier.id === 'ready-made'
              ? 'Ready-Made Solution (Model A)'
              : matchedTier.id === 'customized'
              ? 'Customized Solution (Model B)'
              : 'Custom-Built Software / Web Application (Model C)',
        }));
      }
    }

    if (projSlug) {
      const matchedProject = getProjectBySlug(projSlug);
      if (matchedProject) {
        setFormData((prev) => ({
          ...prev,
          projectType:
            matchedProject.category === 'AI Solutions'
              ? 'AI Solutions & Workflow Integration'
              : matchedProject.category === 'Backend & Integrations'
              ? 'Backend Architecture & API Integration'
              : 'Custom-Built Software / Web Application (Model C)',
          description: prev.description
            ? prev.description
            : language === 'ar'
            ? `استفسار عن بناء مشروع مماثل لمشروع "${matchedProject.titleAr || matchedProject.title}" (${matchedProject.categoryAr || matchedProject.category}).\n\nالأهداف الرئيسية: `
            : `Inquiring about a project similar to "${matchedProject.title}" (${matchedProject.category}).\n\nKey goals: `,
        }));
      }
    }
  }, [searchQuery, language]);

  useEffect(() => {
    fetch('/api/contact/status')
      .then((res) => res.json())
      .then((data) => {
        setDeliveryStatus(data);
      })
      .catch(() => {
        setDeliveryStatus({ configured: true, provider: 'studio-inbox' });
      });
  }, []);

  const handleFillDemo = () => {
    const demoData: InquiryFormData = {
      name: language === 'ar' ? 'أحمد الشريف' : 'Alex Vance',
      email: 'alex.vance@studio-inquiry.com',
      company: language === 'ar' ? 'مؤسسة التقنية المتقدمة' : 'Vance Dynamics Corp',
      projectType: 'Custom-Built Software / Web Application (Model C)',
      platform: 'Web & Mobile Cross-Platform',
      description:
        language === 'ar'
          ? 'نحتاج إلى بناء منصة سحابية متكاملة لفرق العمل مع لوحة تحكم فورية ودعم الذكاء الاصطناعي لأتمتة معالجة البيانات وبوابة دفع موثوقة.'
          : 'We need to engineer a modern full-stack web and mobile platform with real-time analytics, automated AI pipelines, and payment processing.',
      budget: '$5,000 – $12,000 (EGP Equivalent)',
      timeline: '1 – 2 Months',
      consent: true,
    };
    setFormData(demoData);
    setErrors({});
    toast.info(
      language === 'ar' ? 'تم ملء النموذج التجريبي' : 'Sample Brief Loaded',
      language === 'ar'
        ? 'تم إدراج بيانات استفسار نموذجية جاهزة للإرسال الفوري.'
        : 'Sample project brief loaded for testing the submission flow.',
      { duration: 3500 }
    );
  };

  const validateClient = (data: InquiryFormData): FieldErrors => {
    const newErrors: FieldErrors = {};

    if (!data.name.trim() || data.name.trim().length < 2) {
      newErrors.name =
        language === 'ar'
          ? 'يرجى إدخال اسمك أو الاسم المفضل للتواصل (حرفين على الأقل).'
          : 'Please enter your name or preferred contact name (at least 2 characters).';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email.trim() || !emailRegex.test(data.email.trim())) {
      newErrors.email =
        language === 'ar'
          ? 'يرجى إدخال بريد إلكتروني صحيح حتى نتمكن من الرد عليك.'
          : 'Please enter a valid email address so we can reply to your inquiry.';
    }

    if (!data.projectType) {
      newErrors.projectType =
        language === 'ar'
          ? 'يرجى تحديد نوع المشروع أو نموذج العمل.'
          : 'Please select a project or engagement type.';
    }

    if (!data.platform) {
      newErrors.platform =
        language === 'ar'
          ? 'يرجى اختيار المنصة المستهدفة للمشروع.'
          : 'Please select a target platform.';
    }

    if (!data.description.trim() || data.description.trim().length < 10) {
      newErrors.description =
        language === 'ar'
          ? 'يرجى تقديم وصف موجز للمشروع (١٠ أحرف على الأقل) يوضح فكرتك أو أهدافك.'
          : 'Please provide a brief project description (at least 10 characters) outlining your problem or goal.';
    }

    if (!data.budget) {
      newErrors.budget =
        language === 'ar'
          ? 'يرجى اختيار نطاق الميزانية التقديرية.'
          : 'Please select an estimated budget range.';
    }

    if (!data.timeline) {
      newErrors.timeline =
        language === 'ar'
          ? 'يرجى اختيار الجدول الزمني المفضل.'
          : 'Please select your desired timeline.';
    }

    if (!data.consent) {
      newErrors.consent =
        language === 'ar'
          ? 'يجب الموافقة على معالجة بيانات الاستفسار للتواصل معك.'
          : 'You must consent to the privacy notice so we can process your inquiry details.';
    }

    return newErrors;
  };

  const handleChange = (
    field: keyof InquiryFormData,
    value: string | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FieldErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionOutcome({ status: 'idle' });

    const validationErrors = validateClient(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.confirmed === true) {
        setLastSubmittedInquiry({ ...formData });
        setSubmissionOutcome({
          status: 'confirmed',
          message:
            result.message ||
            (language === 'ar'
              ? 'تم استلام تفاصيل مشروعك في الاستوديو بنجاح. سيراجع الفريق الهندسي متطلباتك ويوافيك بملخص نطاق العمل خلال ٢٤ ساعة.'
              : 'Your project inquiry was successfully received by the studio. An engineer will review your brief and respond with scope notes within 24 hours.'),
          deliveryId: result.deliveryId,
          provider: result.provider,
        });

        toast.success(
          language === 'ar' ? 'تم استلام الاستفسار بنجاح' : 'Inquiry Confirmed',
          language === 'ar'
            ? `تم تسجيل طلبك برقم مرجعي: ${result.deliveryId}`
            : `Your project brief is logged with reference: ${result.deliveryId}`,
          { duration: 6000 }
        );
      } else if (response.status === 202) {
        setSubmissionOutcome({
          status: 'unconfigured',
          message:
            result.message ||
            (language === 'ar'
              ? 'تم التحقق من بيانات الاستفسار بنجاح. بيئة الإنتاج لم تربط مزود بريد بعد؛ يمكنك نسخ الملخص فوراً ومشاركته معنا مباشرة.'
              : 'Your project brief is validated and recorded. Production email is pending setup; you can copy the full structured brief below.'),
          provider: result.provider,
        });
      } else {
        setSubmissionOutcome({
          status: 'error',
          message: result.error || result.message || 'Server error occurred during transmission.',
        });
        toast.error(
          language === 'ar' ? 'تعذر الإرسال' : 'Submission Error',
          result.error || result.message || 'Please check your inputs and try again.'
        );
      }
    } catch {
      setSubmissionOutcome({
        status: 'error',
        message:
          language === 'ar'
            ? 'تعذر الاتصال بخادم الاستوديو. يرجى التحقق من اتصالك بالإنترنت والمحاولة مجدداً.'
            : 'Unable to reach the server. Please check your connection and try again.',
      });
      toast.error(
        language === 'ar' ? 'خطأ في الاتصال' : 'Connection Error',
        language === 'ar'
          ? 'تعذر الوصول إلى الخادم. يرجى التحقق من الاتصال والمحاولة مجدداً.'
          : 'Unable to reach server. Please check connection.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyBrief = () => {
    const sourceData = lastSubmittedInquiry || formData;
    const briefText = `SYENE SOLUTIONS PROJECT INQUIRY\n${'='.repeat(35)}\nClient: ${sourceData.name}\nEmail: ${sourceData.email}\nCompany: ${sourceData.company || 'N/A'}\nProject Type: ${sourceData.projectType}\nPlatform: ${sourceData.platform}\nBudget Range: ${sourceData.budget}\nTimeline: ${sourceData.timeline}\nReference ID: ${submissionOutcome.deliveryId || 'Pending'}\n\nProject Scope Description:\n${sourceData.description}\n`;

    navigator.clipboard.writeText(briefText).then(() => {
      setCopiedBrief(true);
      setTimeout(() => setCopiedBrief(false), 3000);
      toast.info(
        language === 'ar' ? 'تم نسخ الملخص' : 'Brief Copied',
        language === 'ar' ? 'تم نسخ ملخص الطلب إلى الحافظة بنجاح.' : 'Inquiry brief copied to clipboard.'
      );
    });
  };

  return (
    <main className="min-h-screen tech-grid-bg transition-colors duration-300">
      <PageSEO
        title={
          language === 'ar'
            ? 'بدء مشروع جديد — استفسار وتقييم فني | سايين سوليوشنز'
            : 'Start a Project — Project Inquiry | Syene Solutions — Software & AI Studio'
        }
        description={
          language === 'ar'
            ? 'أرسل تفاصيل مشروعك إلى سايين سوليوشنز لتطوير تطبيقات الويب والموبايل، وحلول الذكاء الاصطناعي، وتكييف الأنظمة الجاهزة.'
            : 'Submit a project inquiry to Syene Solutions for custom web and mobile development, applied AI solutions, or Ready-Made software adaptations.'
        }
        path="/contact"
      />

      {/* Header with Crimson Ambient Glow */}
      <section
        className={`py-16 lg:py-24 border-b relative transition-colors duration-300 ${
          isDark
            ? 'syene-ambient-glow text-[#FAF6EE] border-[#143C5A]/50'
            : 'bg-gradient-to-b from-[#FAF6EE] to-[#F1ECE0] text-[#0A1622] border-[#143C5A]/15'
        }`}
      >
        <div className="max-w-[1240px] mx-auto px-6 space-y-4">
          <div className={`text-xs font-mono font-semibold ${isDark ? 'text-[#D9A441]' : 'text-[#143C5A]'}`}>
            {t.contactPage.kicker}
          </div>
          <h1 className={`font-display text-4xl sm:text-5xl font-bold tracking-tight ${
            isDark ? 'text-[#FAF6EE]' : 'text-[#0A1622]'
          }`}>
            {t.contactPage.title}
          </h1>
          <p className={`text-base sm:text-lg max-w-2xl leading-relaxed ${
            isDark ? 'text-[#FAF6EE]/80' : 'text-[#143C5A]/85'
          }`}>
            {t.contactPage.subtitle}
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-14 lg:py-20">
        <div className="max-w-[1240px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Form Column */}
          <div className="lg:col-span-8">
            {submissionOutcome.status === 'confirmed' ? (
              <div
                role="status"
                aria-live="polite"
                className="p-8 sm:p-10 rounded-2xl glass-panel-3d space-y-6 animate-fadeIn"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border shadow-lg ${
                    isDark
                      ? 'bg-[#0E2336] text-[#D9A441] border-[#D9A441]/40 shadow-[0_0_20px_rgba(217,164,65,0.25)]'
                      : 'bg-white text-[#143C5A] border-[#143C5A]/30 shadow-md'
                  }`}>
                    <CheckCircle2 className="w-6 h-6" aria-hidden="true" />
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <span className={`text-[11px] font-mono font-semibold px-2.5 py-1 rounded-md border ${
                      isDark
                        ? 'bg-[#0E2336] border-[#D9A441]/40 text-[#D9A441]'
                        : 'bg-white border-[#143C5A]/30 text-[#143C5A]'
                    }`}>
                      {language === 'ar' ? 'مؤكد وقيد المراجعة' : 'Confirmed & Logged'}
                    </span>
                    <span className={`text-[10px] font-mono opacity-70 ${isDark ? 'text-[#FAF6EE]' : 'text-[#0A1622]'}`}>
                      {submissionOutcome.provider === 'resend'
                        ? 'Resend Email Dispatch'
                        : submissionOutcome.provider === 'webhook'
                        ? 'Studio Webhook Dispatch'
                        : 'Studio Direct Inbox'}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className={`text-xs font-mono font-semibold ${isDark ? 'text-[#D9A441]' : 'text-[#143C5A]'}`}>
                    {language === 'ar' ? 'تم تأكيد الإرسال · رقم المرجع:' : 'Delivery Confirmed · Reference ID:'}{' '}
                    <span className="font-bold underline">{submissionOutcome.deliveryId}</span>
                  </div>
                  <h2 className={`font-display text-2xl sm:text-3xl font-bold ${isDark ? 'text-[#FAF6EE]' : 'text-[#0A1622]'}`}>
                    {t.contactPage.successTitle}
                  </h2>
                  <p className={`text-sm leading-relaxed ${isDark ? 'text-[#FAF6EE]/80' : 'text-[#143C5A]/85'}`}>
                    {submissionOutcome.message || t.contactPage.successMessage}
                  </p>
                </div>

                {/* Submitted Summary Overview Card */}
                {lastSubmittedInquiry && (
                  <div className={`p-5 rounded-xl border text-xs font-mono space-y-3 ${
                    isDark
                      ? 'bg-[#0A1622]/80 border-[#143C5A]/50 text-[#FAF6EE]'
                      : 'bg-white/80 border-[#143C5A]/20 text-[#0A1622]'
                  }`}>
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-[#D9A441] flex items-center justify-between">
                      <span>{language === 'ar' ? 'ملخص الاستفسار المسجل' : 'Logged Inquiry Summary'}</span>
                      <span className="opacity-60">{new Date().toLocaleTimeString()}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div>
                        <span className="opacity-50 block">{language === 'ar' ? 'العميل' : 'Client'}:</span>
                        <span className="font-semibold">{lastSubmittedInquiry.name}</span>
                      </div>
                      <div>
                        <span className="opacity-50 block">{language === 'ar' ? 'البريد الإلكتروني' : 'Email'}:</span>
                        <span className="font-semibold truncate block">{lastSubmittedInquiry.email}</span>
                      </div>
                      <div>
                        <span className="opacity-50 block">{language === 'ar' ? 'نوع المشروع' : 'Project Type'}:</span>
                        <span className="font-semibold">{lastSubmittedInquiry.projectType}</span>
                      </div>
                      <div>
                        <span className="opacity-50 block">{language === 'ar' ? 'المنصة' : 'Platform'}:</span>
                        <span className="font-semibold">{lastSubmittedInquiry.platform}</span>
                      </div>
                      <div>
                        <span className="opacity-50 block">{language === 'ar' ? 'الميزانية' : 'Budget'}:</span>
                        <span className="font-semibold">{lastSubmittedInquiry.budget}</span>
                      </div>
                      <div>
                        <span className="opacity-50 block">{language === 'ar' ? 'الجدول الزمني' : 'Timeline'}:</span>
                        <span className="font-semibold">{lastSubmittedInquiry.timeline}</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-current/10">
                      <span className="opacity-50 block mb-1">{language === 'ar' ? 'الوصف والنطاق' : 'Scope Description'}:</span>
                      <p className="font-sans leading-relaxed text-xs opacity-90 line-clamp-3">
                        {lastSubmittedInquiry.description}
                      </p>
                    </div>
                  </div>
                )}

                <div className={`pt-4 border-t flex flex-wrap items-center gap-3 ${
                  isDark ? 'border-[#143C5A]/50' : 'border-[#143C5A]/15'
                }`}>
                  <button
                    type="button"
                    onClick={handleCopyBrief}
                    className={`inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold rounded-xl border transition-colors ${
                      isDark
                        ? 'bg-[#0E2336] text-[#FAF6EE] border-[#143C5A]/70 hover:border-[#D9A441]'
                        : 'bg-white text-[#0A1622] border-[#143C5A]/30 hover:border-[#143C5A]'
                    }`}
                  >
                    {copiedBrief ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                        <span>{language === 'ar' ? 'تم نسخ الملخص' : 'Copied to Clipboard'}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>{language === 'ar' ? 'نسخ ملخص الطلب' : 'Copy Inquiry Summary'}</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSubmissionOutcome({ status: 'idle' });
                      setFormData({
                        name: '',
                        email: '',
                        company: '',
                        projectType: '',
                        platform: '',
                        description: '',
                        budget: '',
                        timeline: '',
                        consent: false,
                      });
                      setLastSubmittedInquiry(null);
                    }}
                    className={`px-5 py-2.5 text-xs font-semibold rounded-xl transition-colors ${
                      isDark
                        ? 'syene-gold-gradient text-[#0A1622] font-bold shadow-md hover:opacity-95'
                        : 'bg-[#143C5A] text-[#FAF6EE] hover:bg-[#0E2336]'
                    }`}
                  >
                    {language === 'ar' ? 'إرسال استفسار آخر' : 'Submit Another Inquiry'}
                  </button>

                  <button
                    type="button"
                    onClick={() => onNavigate('/projects')}
                    className={`px-5 py-2.5 text-xs font-semibold border rounded-xl transition-colors ${
                      isDark
                        ? 'text-[#FAF6EE] border-[#143C5A]/70 hover:border-[#D9A441]'
                        : 'text-[#0A1622] border-[#143C5A]/30 hover:border-[#143C5A]'
                    }`}
                  >
                    {language === 'ar' ? 'العودة لمعرض المشاريع' : 'Return to Portfolio'}
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="p-6 sm:p-10 rounded-2xl glass-panel-3d space-y-6"
              >
                {/* Form Quick Fill Bar */}
                <div className={`pb-4 border-b flex items-center justify-between gap-3 text-xs ${
                  isDark ? 'border-[#143C5A]/40' : 'border-[#143C5A]/15'
                }`}>
                  <div className={`font-mono text-[11px] ${isDark ? 'text-[#FAF6EE]/60' : 'text-[#143C5A]/70'}`}>
                    {language === 'ar' ? 'استمارة استفسار المشاريع الرسمية' : 'Official Project Inquiry Form'}
                  </div>

                  <button
                    type="button"
                    onClick={handleFillDemo}
                    title={language === 'ar' ? 'ملء بيانات تجريبية للاختبار السريع' : 'Fill sample data for quick testing'}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                      isDark
                        ? 'bg-[#0E2336] text-[#D9A441] hover:bg-[#143C5A] border border-[#143C5A]/60'
                        : 'bg-white text-[#143C5A] hover:bg-slate-50 border border-[#143C5A]/25 shadow-xs'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{language === 'ar' ? 'ملء بيانات تجريبية للاختبار' : 'Fill Sample Brief'}</span>
                  </button>
                </div>

                {/* Delivery Notice when unconfigured */}
                {submissionOutcome.status === 'unconfigured' && (
                  <div
                    role="alert"
                    className={`p-5 rounded-2xl border space-y-4 ${
                      isDark
                        ? 'bg-[#0E2336] border-[#D9A441]/40 text-[#FAF6EE]'
                        : 'bg-[#FAF6EE] border-[#143C5A]/30 text-[#0A1622]'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <AlertCircle
                        className={`w-5 h-5 shrink-0 mt-0.5 ${isDark ? 'text-[#D9A441]' : 'text-[#143C5A]'}`}
                        aria-hidden="true"
                      />
                      <div className="space-y-1.5">
                        <div className={`text-xs font-mono font-semibold ${isDark ? 'text-[#D9A441]' : 'text-[#143C5A]'}`}>
                          {language === 'ar' ? 'ملاحظة الإرسال المباشر' : 'Delivery Notice'}
                        </div>
                        <p className={`text-xs leading-relaxed ${isDark ? 'text-[#FAF6EE]/85' : 'text-[#143C5A]/85'}`}>
                          {submissionOutcome.message}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 pt-1">
                      <button
                        type="button"
                        onClick={handleCopyBrief}
                        className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl transition-colors shadow-md ${
                          isDark
                            ? 'syene-gold-gradient text-[#0A1622] font-bold shadow-[0_0_16px_rgba(217,164,65,0.25)]'
                            : 'bg-[#143C5A] text-[#FAF6EE]'
                        }`}
                      >
                        {copiedBrief ? (
                          <>
                            <Check className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>{language === 'ar' ? 'تم نسخ الملخص للحافظة' : 'Copied Brief to Clipboard'}</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>{language === 'ar' ? 'نسخ ملخص الطلب' : 'Copy Validated Brief'}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {submissionOutcome.status === 'error' && (
                  <div
                    role="alert"
                    className="p-4 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 flex items-start gap-3 text-xs leading-relaxed"
                  >
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <strong className="font-semibold block">
                        {language === 'ar' ? 'تعذر إرسال الطلب' : 'Submission could not be confirmed'}
                      </strong>
                      <span>{submissionOutcome.message}</span>
                    </div>
                  </div>
                )}

                {/* Row 1: Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="inquiry-name"
                      className={`block text-xs font-semibold ${isDark ? 'text-[#FAF6EE]' : 'text-[#0A1622]'}`}
                    >
                      {t.contactPage.nameLabel} <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="inquiry-name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'error-name' : undefined}
                      placeholder={t.contactPage.namePlaceholder}
                      className={`w-full px-4 py-3 text-sm rounded-xl border transition-colors ${
                        isDark
                          ? 'bg-[#0E2336]/90 text-[#FAF6EE] placeholder:text-[#FAF6EE]/30 border-[#143C5A]/70 focus:border-[#D9A441] focus:ring-2 focus:ring-[#D9A441]/20'
                          : 'bg-white text-[#0A1622] placeholder:text-slate-400 border-[#143C5A]/25 focus:border-[#143C5A] focus:ring-2 focus:ring-[#143C5A]/20'
                      } ${errors.name ? 'border-red-500 bg-red-50 dark:bg-red-950/20' : ''}`}
                    />
                    {errors.name && (
                      <p id="error-name" className="text-xs text-red-500">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="inquiry-email"
                      className={`block text-xs font-semibold ${isDark ? 'text-[#FAF6EE]' : 'text-[#0A1622]'}`}
                    >
                      {t.contactPage.emailLabel} <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="inquiry-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'error-email' : undefined}
                      placeholder={t.contactPage.emailPlaceholder}
                      className={`w-full px-4 py-3 text-sm rounded-xl border transition-colors ${
                        isDark
                          ? 'bg-[#0E2336]/90 text-[#FAF6EE] placeholder:text-[#FAF6EE]/30 border-[#143C5A]/70 focus:border-[#D9A441] focus:ring-2 focus:ring-[#D9A441]/20'
                          : 'bg-white text-[#0A1622] placeholder:text-slate-400 border-[#143C5A]/25 focus:border-[#143C5A] focus:ring-2 focus:ring-[#143C5A]/20'
                      } ${errors.email ? 'border-red-500 bg-red-50 dark:bg-red-950/20' : ''}`}
                    />
                    {errors.email && (
                      <p id="error-email" className="text-xs text-red-500">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Row 2: Company Name */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="inquiry-company"
                    className={`block text-xs font-semibold ${isDark ? 'text-[#FAF6EE]' : 'text-[#0A1622]'}`}
                  >
                    {t.contactPage.companyLabel}{' '}
                    <span className={`font-normal ${isDark ? 'text-[#FAF6EE]/50' : 'text-[#143C5A]/60'}`}>
                      ({language === 'ar' ? 'اختياري' : 'Optional'})
                    </span>
                  </label>
                  <input
                    id="inquiry-company"
                    name="company"
                    type="text"
                    autoComplete="organization"
                    value={formData.company}
                    onChange={(e) => handleChange('company', e.target.value)}
                    placeholder={t.contactPage.companyPlaceholder}
                    className={`w-full px-4 py-3 text-sm rounded-xl border transition-colors ${
                      isDark
                        ? 'border-[#143C5A]/70 bg-[#0E2336]/90 text-[#FAF6EE] placeholder:text-[#FAF6EE]/30 focus:border-[#D9A441]'
                        : 'border-[#143C5A]/25 bg-white text-[#0A1622] placeholder:text-slate-400 focus:border-[#143C5A]'
                    }`}
                  />
                </div>

                {/* Row 3: Project Type & Platform */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="inquiry-project-type"
                      className={`block text-xs font-semibold ${isDark ? 'text-[#FAF6EE]' : 'text-[#0A1622]'}`}
                    >
                      {t.contactPage.projectTypeLabel} <span className="text-red-400">*</span>
                    </label>
                    <select
                      id="inquiry-project-type"
                      name="projectType"
                      required
                      value={formData.projectType}
                      onChange={(e) => handleChange('projectType', e.target.value)}
                      aria-invalid={Boolean(errors.projectType)}
                      aria-describedby={errors.projectType ? 'error-project-type' : undefined}
                      className={`w-full px-4 py-3 text-sm rounded-xl border transition-colors ${
                        isDark
                          ? 'bg-[#0E2336]/90 text-[#FAF6EE] border-[#143C5A]/70 focus:border-[#D9A441]'
                          : 'bg-white text-[#0A1622] border-[#143C5A]/25 focus:border-[#143C5A]'
                      } ${errors.projectType ? 'border-red-500 bg-red-50 dark:bg-red-950/20' : ''}`}
                    >
                      <option value="" className={isDark ? 'bg-[#0E2336] text-[#FAF6EE]' : 'bg-white text-[#0A1622]'}>
                        {language === 'ar' ? 'اختر نوع المشروع...' : 'Select project type...'}
                      </option>
                      {PROJECT_TYPES_DATA.map((pt) => (
                        <option key={pt.en} value={pt.en} className={isDark ? 'bg-[#0E2336] text-[#FAF6EE]' : 'bg-white text-[#0A1622]'}>
                          {language === 'ar' ? pt.ar : pt.en}
                        </option>
                      ))}
                    </select>
                    {errors.projectType && (
                      <p id="error-project-type" className="text-xs text-red-500">
                        {errors.projectType}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="inquiry-platform"
                      className={`block text-xs font-semibold ${isDark ? 'text-[#FAF6EE]' : 'text-[#0A1622]'}`}
                    >
                      {t.contactPage.platformLabel} <span className="text-red-400">*</span>
                    </label>
                    <select
                      id="inquiry-platform"
                      name="platform"
                      required
                      value={formData.platform}
                      onChange={(e) => handleChange('platform', e.target.value)}
                      aria-invalid={Boolean(errors.platform)}
                      aria-describedby={errors.platform ? 'error-platform' : undefined}
                      className={`w-full px-4 py-3 text-sm rounded-xl border transition-colors ${
                        isDark
                          ? 'bg-[#0E2336]/90 text-[#FAF6EE] border-[#143C5A]/70 focus:border-[#D9A441]'
                          : 'bg-white text-[#0A1622] border-[#143C5A]/25 focus:border-[#143C5A]'
                      } ${errors.platform ? 'border-red-500 bg-red-50 dark:bg-red-950/20' : ''}`}
                    >
                      <option value="" className={isDark ? 'bg-[#0E2336] text-[#FAF6EE]' : 'bg-white text-[#0A1622]'}>
                        {language === 'ar' ? 'اختر المنصة المستهدفة...' : 'Select target platform...'}
                      </option>
                      {PLATFORMS_DATA.map((plat) => (
                        <option key={plat.en} value={plat.en} className={isDark ? 'bg-[#0E2336] text-[#FAF6EE]' : 'bg-white text-[#0A1622]'}>
                          {language === 'ar' ? plat.ar : plat.en}
                        </option>
                      ))}
                    </select>
                    {errors.platform && (
                      <p id="error-platform" className="text-xs text-red-500">
                        {errors.platform}
                      </p>
                    )}
                  </div>
                </div>

                {/* Row 4: Estimated Budget & Timeline */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="inquiry-budget"
                      className={`block text-xs font-semibold ${isDark ? 'text-[#FAF6EE]' : 'text-[#0A1622]'}`}
                    >
                      {t.contactPage.budgetLabel} <span className="text-red-400">*</span>
                    </label>
                    <select
                      id="inquiry-budget"
                      name="budget"
                      required
                      value={formData.budget}
                      onChange={(e) => handleChange('budget', e.target.value)}
                      aria-invalid={Boolean(errors.budget)}
                      aria-describedby={errors.budget ? 'error-budget' : undefined}
                      className={`w-full px-4 py-3 text-sm rounded-xl border transition-colors ${
                        isDark
                          ? 'bg-[#0E2336]/90 text-[#FAF6EE] border-[#143C5A]/70 focus:border-[#D9A441]'
                          : 'bg-white text-[#0A1622] border-[#143C5A]/25 focus:border-[#143C5A]'
                      } ${errors.budget ? 'border-red-500 bg-red-50 dark:bg-red-950/20' : ''}`}
                    >
                      <option value="" className={isDark ? 'bg-[#0E2336] text-[#FAF6EE]' : 'bg-white text-[#0A1622]'}>
                        {language === 'ar' ? 'اختر نطاق الميزانية...' : 'Select budget range...'}
                      </option>
                      {BUDGET_RANGES_DATA.map((b) => (
                        <option key={b.en} value={b.en} className={isDark ? 'bg-[#0E2336] text-[#FAF6EE]' : 'bg-white text-[#0A1622]'}>
                          {language === 'ar' ? b.ar : b.en}
                        </option>
                      ))}
                    </select>
                    {errors.budget && (
                      <p id="error-budget" className="text-xs text-red-500">
                        {errors.budget}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="inquiry-timeline"
                      className={`block text-xs font-semibold ${isDark ? 'text-[#FAF6EE]' : 'text-[#0A1622]'}`}
                    >
                      {t.contactPage.timelineLabel} <span className="text-red-400">*</span>
                    </label>
                    <select
                      id="inquiry-timeline"
                      name="timeline"
                      required
                      value={formData.timeline}
                      onChange={(e) => handleChange('timeline', e.target.value)}
                      aria-invalid={Boolean(errors.timeline)}
                      aria-describedby={errors.timeline ? 'error-timeline' : undefined}
                      className={`w-full px-4 py-3 text-sm rounded-xl border transition-colors ${
                        isDark
                          ? 'bg-[#0E2336]/90 text-[#FAF6EE] border-[#143C5A]/70 focus:border-[#D9A441]'
                          : 'bg-white text-[#0A1622] border-[#143C5A]/25 focus:border-[#143C5A]'
                      } ${errors.timeline ? 'border-red-500 bg-red-50 dark:bg-red-950/20' : ''}`}
                    >
                      <option value="" className={isDark ? 'bg-[#0E2336] text-[#FAF6EE]' : 'bg-white text-[#0A1622]'}>
                        {language === 'ar' ? 'اختر الجدول الزمني المستهدف...' : 'Select target timeline...'}
                      </option>
                      {TIMELINES_DATA.map((tm) => (
                        <option key={tm.en} value={tm.en} className={isDark ? 'bg-[#0E2336] text-[#FAF6EE]' : 'bg-white text-[#0A1622]'}>
                          {language === 'ar' ? tm.ar : tm.en}
                        </option>
                      ))}
                    </select>
                    {errors.timeline && (
                      <p id="error-timeline" className="text-xs text-red-500">
                        {errors.timeline}
                      </p>
                    )}
                  </div>
                </div>

                {/* Row 5: Project Description */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="inquiry-description"
                      className={`block text-xs font-semibold ${isDark ? 'text-[#FAF6EE]' : 'text-[#0A1622]'}`}
                    >
                      {t.contactPage.descriptionLabel} <span className="text-red-400">*</span>
                    </label>
                    <span className={`text-xs font-mono tabular-nums ${isDark ? 'text-[#FAF6EE]/50' : 'text-[#143C5A]/65'}`}>
                      {formData.description.trim().length} {language === 'ar' ? 'حرفاً (الحد الأدنى ١٠)' : 'chars (min 10)'}
                    </span>
                  </div>
                  <textarea
                    id="inquiry-description"
                    name="description"
                    rows={5}
                    required
                    value={formData.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    aria-invalid={Boolean(errors.description)}
                    aria-describedby={errors.description ? 'error-description' : undefined}
                    placeholder={t.contactPage.descriptionPlaceholder}
                    className={`w-full px-4 py-3 text-sm rounded-xl border transition-colors ${
                      isDark
                        ? 'bg-[#0E2336]/90 text-[#FAF6EE] placeholder:text-[#FAF6EE]/30 border-[#143C5A]/70 focus:border-[#D9A441] focus:ring-2 focus:ring-[#D9A441]/20'
                        : 'bg-white text-[#0A1622] placeholder:text-slate-400 border-[#143C5A]/25 focus:border-[#143C5A] focus:ring-2 focus:ring-[#143C5A]/20'
                    } ${errors.description ? 'border-red-500 bg-red-50 dark:bg-red-950/20' : ''}`}
                  />
                  {errors.description && (
                    <p id="error-description" className="text-xs text-red-500">
                      {errors.description}
                    </p>
                  )}
                </div>

                {/* Row 6: Privacy Notice Consent */}
                <div className="pt-2 space-y-1.5">
                  <label className="flex items-start gap-3 cursor-pointer select-none">
                    <input
                      id="inquiry-consent"
                      name="consent"
                      type="checkbox"
                      checked={formData.consent}
                      onChange={(e) => handleChange('consent', e.target.checked)}
                      aria-invalid={Boolean(errors.consent)}
                      aria-describedby={errors.consent ? 'error-consent' : undefined}
                      className="mt-1 w-4 h-4 rounded border-[#143C5A]/40 text-[#D9A441] focus:ring-[#D9A441]"
                    />
                    <span className={`text-xs leading-relaxed ${isDark ? 'text-[#FAF6EE]/80' : 'text-[#143C5A]/85'}`}>
                      {t.contactPage.consent} <span className="text-red-400">*</span>
                    </span>
                  </label>
                  {errors.consent && (
                    <p id="error-consent" className="text-xs text-red-500 pl-7">
                      {errors.consent}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div className={`pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t ${
                  isDark ? 'border-[#143C5A]/50' : 'border-[#143C5A]/15'
                }`}>
                  <div className={`text-xs flex items-center gap-2 ${isDark ? 'text-[#FAF6EE]/60' : 'text-[#143C5A]/70'}`}>
                    <ShieldCheck className={`w-4 h-4 shrink-0 ${isDark ? 'text-[#D9A441]' : 'text-[#143C5A]'}`} aria-hidden="true" />
                    <span>
                      {language === 'ar'
                        ? 'طلب خاضع للتحقق البرمجي · حماية وأمان كامل للبيانات'
                        : 'Server-validated inquiry · Zero secrets exposed'}
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold rounded-xl shadow-md disabled:opacity-60 transition-all whitespace-nowrap shrink-0 ${
                      isDark
                        ? 'syene-gold-gradient text-[#0A1622] font-bold shadow-[0_0_24px_rgba(217,164,65,0.32)] hover:shadow-[0_0_32px_rgba(217,164,65,0.5)]'
                        : 'bg-[#143C5A] text-[#FAF6EE] hover:bg-[#0E2336]'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                        <span>{language === 'ar' ? 'جارٍ التحقق والإرسال...' : 'Verifying & Sending...'}</span>
                      </>
                    ) : (
                      <>
                        <span>{t.contactPage.submitButton}</span>
                        <Send className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} aria-hidden="true" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            <Card3DTilt className="p-7 rounded-2xl glass-panel-3d space-y-6">
              <div className={`space-y-2 pb-5 border-b ${isDark ? 'border-[#143C5A]/50' : 'border-[#143C5A]/15'}`}>
                <div className={`text-xs font-mono font-semibold ${isDark ? 'text-[#D9A441]' : 'text-[#143C5A]'}`}>
                  {language === 'ar' ? 'ماذا يحدث بعد الإرسال؟' : 'What Happens Next'}
                </div>
                <h2 className={`font-display text-xl font-bold ${isDark ? 'text-[#FAF6EE]' : 'text-[#0A1622]'}`}>
                  {language === 'ar' ? 'مراجعة هندسية دقيقة' : 'Structured inquiry review'}
                </h2>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-[#FAF6EE]/75' : 'text-[#143C5A]/80'}`}>
                  {language === 'ar'
                    ? 'تتم مراجعة كل استفسار مباشرة من مهندسي الاستوديو دون الاعتماد على رسائل آلية أو قوالب عامة.'
                    : 'Every inquiry is reviewed directly by our engineering studio. We do not use automated sales bots or generic templates.'}
                </p>
              </div>

              <ol className={`space-y-4 text-xs ${isDark ? 'text-[#FAF6EE]/80' : 'text-[#143C5A]'}`}>
                <li className="space-y-1">
                  <div className={`font-mono font-semibold ${isDark ? 'text-[#D9A441]' : 'text-[#143C5A]'}`}>
                    {language === 'ar' ? '٠١ · فحص الجدوى والمتطلبات التقنية' : '01 · Technical Feasibility Check'}
                  </div>
                  <p className={`leading-relaxed ${isDark ? 'text-[#FAF6EE]/70' : 'text-[#143C5A]/80'}`}>
                    {language === 'ar'
                      ? 'ندرس أهدافك الوظيفية، والمنصة المختارة، واحتياجات التكامل مع الأنظمة الخارجية.'
                      : 'We review your functional goals, platform choice, and integration needs.'}
                  </p>
                </li>
                <li className="space-y-1">
                  <div className={`font-mono font-semibold ${isDark ? 'text-[#D9A441]' : 'text-[#143C5A]'}`}>
                    {language === 'ar' ? '٠٢ · التوصية بنموذج التنفيذ الأنسب' : '02 · Model Recommendation'}
                  </div>
                  <p className={`leading-relaxed ${isDark ? 'text-[#FAF6EE]/70' : 'text-[#143C5A]/80'}`}>
                    {language === 'ar'
                      ? 'إذا كانت هناك وحدة جاهزة أو نظام قابل للتخصيص يفي بالغرض، نوصي به أولاً لتوفير الوقت والتكلفة.'
                      : 'If an existing Ready-Made or Customized module fits your brief, we recommend it first to save you time and budget.'}
                  </p>
                </li>
                <li className="space-y-1">
                  <div className={`font-mono font-semibold ${isDark ? 'text-[#D9A441]' : 'text-[#143C5A]'}`}>
                    {language === 'ar' ? '٠٣ · وثيقة نطاق العمل وعرض السعر' : '03 · Written Scope & Quote'}
                  </div>
                  <p className={`leading-relaxed ${isDark ? 'text-[#FAF6EE]/70' : 'text-[#143C5A]/80'}`}>
                    {language === 'ar'
                      ? 'نعد تفصيلاً واضحاً للمراحل الزمنية، وقائمة المخرجات بدقة، وعرض سعر محدد وشفاف.'
                      : 'We prepare a clear milestone breakdown, deliverables list, and fixed or starting package quote.'}
                  </p>
                </li>
              </ol>

              {/* Delivery Integration Status Indicator */}
              {deliveryStatus && (
                <div className={`pt-5 border-t space-y-1.5 text-xs ${isDark ? 'border-[#143C5A]/50' : 'border-[#143C5A]/15'}`}>
                  <div className={`font-mono ${isDark ? 'text-[#FAF6EE]/60' : 'text-[#143C5A]/70'}`}>
                    {language === 'ar' ? 'نقطة استقبال الاستفسارات' : 'Inquiry Delivery Endpoint'}
                  </div>
                  <div className={`font-medium ${isDark ? 'text-[#D9A441]' : 'text-[#143C5A]'}`}>
                    {deliveryStatus.configured
                      ? (language === 'ar' ? `نشط (${deliveryStatus.provider.toUpperCase()} معتمد)` : `Active (${deliveryStatus.provider.toUpperCase()} verified)`)
                      : (language === 'ar' ? 'في انتظار مفاتيح البيئة (RESEND_API_KEY / CONTACT_WEBHOOK_URL)' : 'Awaiting Production Env Vars (RESEND_API_KEY / CONTACT_WEBHOOK_URL)')}
                  </div>
                </div>
              )}
            </Card3DTilt>
          </aside>
        </div>
      </section>
    </main>
  );
};
