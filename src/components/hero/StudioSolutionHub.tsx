import React, { useState } from 'react';
import {
  Sparkles,
  Layers,
  Smartphone,
  Cpu,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Shield,
  Zap,
  Play,
  RotateCw,
  Server,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { Card3DTilt } from '../3d/Card3DTilt';

interface StudioSolutionHubProps {
  onNavigate: (path: string) => void;
}

type HubTab = 'solutions' | 'estimator';
type SolutionCategory = 'ai' | 'web' | 'mobile';

interface ArchitectureBlueprint {
  timeline: string;
  timelineAr: string;
  sla: string;
  deliverables: string[];
  deliverablesAr: string[];
  stack: string[];
}

const BLUEPRINTS: Record<string, ArchitectureBlueprint> = {
  'ai-mvp': {
    timeline: '3 – 5 Weeks',
    timelineAr: '٣ – ٥ أسابيع',
    sla: '99.9% Uptime',
    deliverables: [
      'Grounded RAG Pipeline on your business data',
      'Structured JSON schema inference without hallucinations',
      'Type-safe REST & streaming API gateway',
    ],
    deliverablesAr: [
      'مسار استرجاع معرفي (RAG) مؤصل على بيانات شركتك',
      'استنتاج مهيكل بدقة JSON بدون هلوسات',
      'بوابة واجهات برمجية آمنة نوعياً ومباشرة البث',
    ],
    stack: ['Gemini 2.5 Flash', 'FastAPI / Python', 'Vector Store', 'TypeScript'],
  },
  'ai-growth': {
    timeline: '6 – 8 Weeks',
    timelineAr: '٦ – ٨ أسابيع',
    sla: '99.95% SLA',
    deliverables: [
      'Autonomous multi-agent task execution system',
      'Automated fallback inference & prompt caching',
      'Enterprise role-based security & audit trails',
    ],
    deliverablesAr: [
      'نظام وكلاء ذكية متعددة لتنفيذ العمليات المعقدة',
      'تخزين مؤقت للمدخلات واسترداد تلقائي عند الأعطال',
      'أمان متعدد الأدوار وسجلات تدقيق كاملة للشركات',
    ],
    stack: ['Gemini 2.5 Flash', 'PostgreSQL', 'LangGraph / Agents', 'Redis Edge'],
  },
  'ai-enterprise': {
    timeline: '10 – 14 Weeks',
    timelineAr: '١٠ – ١٤ أسبوعاً',
    sla: '99.99% Mission-Critical',
    deliverables: [
      'Dedicated private AI cluster & VPC orchestration',
      'Real-time streaming multimodal analytics (audio/video/data)',
      'Sub-100ms p99 latency SLA on edge compute nodes',
    ],
    deliverablesAr: [
      'عنقود ذكاء اصطناعي خاص ومعزول سحابياً (VPC)',
      'تحليلات متعددة الوسائط لحظية (صوت، فيديو، بيانات)',
      'زمن استجابة أقل من ١٠٠ ملّي ثانية على الحافة',
    ],
    stack: ['Custom Models', 'Kubernetes / GCP', 'Vector DB', 'Kafka Streams'],
  },
  'web-mvp': {
    timeline: '3 – 4 Weeks',
    timelineAr: '٣ – ٤ أسابيع',
    sla: '99.9% Availability',
    deliverables: [
      'High-conversion modern responsive web platform',
      'PostgreSQL database with automated migrations',
      'Stripe / Paymob checkout & user authentication',
    ],
    deliverablesAr: [
      'منصة ويب عصرية فائقة التحويل وسريعة التجاوب',
      'قاعدة بيانات PostgreSQL مع ترحيل آلي للبيانات',
      'تكامل بوابات الدفع (Stripe/Paymob) وتسجيل الدخول',
    ],
    stack: ['React 19', 'Next.js 15', 'PostgreSQL', 'Tailwind CSS'],
  },
  'web-growth': {
    timeline: '6 – 8 Weeks',
    timelineAr: '٦ – ٨ أسابيع',
    sla: '99.98% High Availability',
    deliverables: [
      'Multi-tenant enterprise SaaS workspace architecture',
      'Real-time collaboration engine & websocket sync',
      'Comprehensive administrative analytics & reporting',
    ],
    deliverablesAr: [
      'معمارية SaaS متعددة المستأجرين للشركات الكبرى',
      'محرك تعاون حي ومزامنة فورية عبر WebSockets',
      'لوحة تحكم إدارية متقدمة مع تحليلات ورسوم بيانية',
    ],
    stack: ['TypeScript', 'Next.js', 'PostgreSQL', 'Redis', 'Docker'],
  },
  'web-enterprise': {
    timeline: '10 – 14 Weeks',
    timelineAr: '١٠ – ١٤ أسبوعاً',
    sla: '99.99% Fault-Tolerant',
    deliverables: [
      'Zero-downtime blue/green deployment pipeline',
      'Microservices architecture & high-throughput message bus',
      'Global CDN edge caching with sub-50ms TTFB',
    ],
    deliverablesAr: [
      'مسار نشر آلي بلا توقف نهائياً (Blue/Green Deployment)',
      'معمارية خدمات مصغرة مع ناقل رسائل عالي الإنتاجية',
      'تخزين مؤقت على شبكات CDN العالمية باستجابة فائقة',
    ],
    stack: ['Go / TypeScript', 'PostgreSQL Cluster', 'Kubernetes', 'Cloudflare'],
  },
  'mobile-mvp': {
    timeline: '4 – 6 Weeks',
    timelineAr: '٤ – ٦ أسابيع',
    sla: 'Native 60fps',
    deliverables: [
      'Cross-platform iOS & Android mobile application',
      'Native biometric authentication (FaceID / Fingerprint)',
      'Instant push notifications & automated deep-linking',
    ],
    deliverablesAr: [
      'تطبيق جوال متوافق بالكامل مع نظامي iOS و Android',
      'تسجيل دخول بيومتري بالبصمة والوجه (FaceID/Fingerprint)',
      'إشعارات فورية لحظية وروابط عميقة مباشرة',
    ],
    stack: ['React Native', 'Expo SDK 52', 'Tailwind', 'SecureStore'],
  },
  'mobile-growth': {
    timeline: '7 – 9 Weeks',
    timelineAr: '٧ – ٩ أسابيع',
    sla: 'Offline-First',
    deliverables: [
      'Offline-first local SQLite sync & conflict resolution',
      'Custom interactive charts & haptic tactile feedback',
      'In-app subscriptions & cross-platform billing',
    ],
    deliverablesAr: [
      'مزامنة محلية تعمل بدون إنترنت مع حل التعارضات آلياً',
      'رسوم بيانية تفاعلية مع استجابات لمسية ذكية (Haptics)',
      'نظام اشتراكات ومشتريات داخل التطبيق لكلا المتجرين',
    ],
    stack: ['React Native', 'WatermelonDB', 'Reanimated 3', 'RevenueCat'],
  },
  'mobile-enterprise': {
    timeline: '12 – 16 Weeks',
    timelineAr: '١٢ – ١٦ أسبوعاً',
    sla: 'Enterprise Ready',
    deliverables: [
      'End-to-end encrypted messaging & real-time telemetry',
      'Custom native Swift / Kotlin modules for hardware integration',
      'White-label multi-brand distribution architecture',
    ],
    deliverablesAr: [
      'تراسل مشفر طرف-إلى-طرف مع تيليميتري فوري',
      'وحدات Swift و Kotlin أصلية للتكامل مع عتاد الأجهزة',
      'معمارية توزيع متعددة العلامات التجارية (White-label)',
    ],
    stack: ['Swift', 'Kotlin', 'WebRTC', 'Rust Core', 'CI/CD Fastlane'],
  },
};

export const StudioSolutionHub: React.FC<StudioSolutionHubProps> = ({ onNavigate }) => {
  const { theme } = useTheme();
  const { language, isRTL } = useLanguage();
  const isDark = theme === 'dark';
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const [activeTab, setActiveTab] = useState<HubTab>('solutions');
  const [activeSolution, setActiveSolution] = useState<SolutionCategory>('ai');

  // Estimator State
  const [projectType, setProjectType] = useState<'ai' | 'web' | 'mobile'>('ai');
  const [projectScale, setProjectScale] = useState<'mvp' | 'growth' | 'enterprise'>('growth');

  // Interactive Live Pipeline Simulation State
  const [simRunning, setSimRunning] = useState(false);
  const [simTokens, setSimTokens] = useState(148);
  const [simLatency, setSimLatency] = useState(185);

  const handleRunSimulation = () => {
    if (simRunning) return;
    setSimRunning(true);
    setSimTokens(12);
    setSimLatency(85);

    const interval = setInterval(() => {
      setSimTokens((prev) => {
        if (prev >= 320) {
          clearInterval(interval);
          setSimRunning(false);
          setSimLatency(Math.floor(140 + Math.random() * 40));
          return 342;
        }
        return prev + Math.floor(25 + Math.random() * 30);
      });
    }, 70);
  };

  const currentBlueprintKey = `${projectType}-${projectScale}`;
  const currentBlueprint = BLUEPRINTS[currentBlueprintKey] || BLUEPRINTS['ai-growth'];

  return (
    <Card3DTilt className="w-full max-w-xl">
      <div
        className={`rounded-2xl border transition-all duration-300 relative overflow-hidden backdrop-blur-xl ${
          isDark
            ? 'bg-[#0E2336]/85 border-[#D9A441]/35 shadow-[0_15px_40px_rgba(0,0,0,0.5),0_0_25px_rgba(217,164,65,0.12)] text-[#FAF6EE]'
            : 'bg-white/95 border-[#143C5A]/20 shadow-[0_15px_40px_rgba(20,60,90,0.08)] text-[#1D2733]'
        }`}
      >
        {/* Subtle Ambient Accent Glow at the top */}
        <div
          className={`absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-32 rounded-full blur-3xl pointer-events-none ${
            isDark ? 'bg-[#D9A441]/20' : 'bg-[#143C5A]/10'
          }`}
          aria-hidden="true"
        />

        {/* Top Control Bar: Active Status & Mode Switch */}
        <div
          className={`p-4 sm:p-5 border-b flex items-center justify-between gap-3 relative z-10 ${
            isDark ? 'border-[#143C5A]/40 bg-[#0A1622]/60' : 'border-[#143C5A]/15 bg-[#FAF6EE]/60'
          }`}
        >
          {/* Active Lab Telemetry Badge */}
          <div className="flex items-center gap-2.5">
            <div className="relative w-7 h-7 rounded-lg overflow-hidden flex items-center justify-center p-1 bg-[#143C5A]/20 border border-[#D9A441]/40 shrink-0">
              <img src="/syene-emblem.png" alt="Syene Lab" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col">
              <span className={`text-[11px] font-mono font-bold leading-tight ${isDark ? 'text-[#FAF6EE]' : 'text-[#143C5A]'}`}>
                {language === 'ar' ? 'مختبر سايين الهندسي' : 'SYENE ARCHITECTURE LAB'}
              </span>
              <span className="text-[10px] font-mono text-[#D9A441] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D9A441] animate-pulse" />
                <span>{language === 'ar' ? 'جاهزية ٩٩.٩٨٪ · زمن <٦٥ملّي ثانية' : 'Active 99.98% · Edge <65ms'}</span>
              </span>
            </div>
          </div>

          {/* Segmented Mode Selector */}
          <div
            className={`flex items-center p-1 rounded-xl border text-xs font-mono shrink-0 ${
              isDark ? 'bg-[#0E2336] border-[#6E87A0]/30' : 'bg-white border-[#143C5A]/20 shadow-xs'
            }`}
          >
            <button
              type="button"
              onClick={() => setActiveTab('solutions')}
              className={`px-3 py-1.5 rounded-lg transition-all duration-200 cursor-pointer font-medium ${
                activeTab === 'solutions'
                  ? isDark
                    ? 'syene-gold-gradient text-[#0A1622] font-bold shadow-xs'
                    : 'bg-[#143C5A] text-[#FAF6EE] font-bold shadow-xs'
                  : isDark
                  ? 'text-[#8FA4BC] hover:text-[#FAF6EE]'
                  : 'text-[#6E87A0] hover:text-[#143C5A]'
              }`}
            >
              {language === 'ar' ? 'استكشاف النظم' : 'Live Systems'}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('estimator')}
              className={`px-3 py-1.5 rounded-lg transition-all duration-200 cursor-pointer font-medium ${
                activeTab === 'estimator'
                  ? isDark
                    ? 'syene-gold-gradient text-[#0A1622] font-bold shadow-xs'
                    : 'bg-[#143C5A] text-[#FAF6EE] font-bold shadow-xs'
                  : isDark
                  ? 'text-[#8FA4BC] hover:text-[#FAF6EE]'
                  : 'text-[#6E87A0] hover:text-[#143C5A]'
              }`}
            >
              {language === 'ar' ? 'مُقدِّر المعمارية' : 'Blueprint Estimator'}
            </button>
          </div>
        </div>

        {/* Tab 1: Live Interactive Solutions Navigator */}
        {activeTab === 'solutions' && (
          <div className="p-5 sm:p-6 space-y-5 relative z-10">
            {/* Discipline Selector Pills */}
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setActiveSolution('ai')}
                className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer text-center ${
                  activeSolution === 'ai'
                    ? isDark
                      ? 'bg-[#143C5A]/40 border-[#D9A441] shadow-[0_0_15px_rgba(217,164,65,0.2)]'
                      : 'bg-white border-[#143C5A] shadow-sm'
                    : isDark
                    ? 'bg-[#0A1622]/50 border-[#143C5A]/40 hover:border-[#D9A441]/50 text-[#8FA4BC]'
                    : 'bg-[#FAF6EE]/50 border-[#143C5A]/15 hover:border-[#143C5A]/40 text-[#6E87A0]'
                }`}
              >
                <Cpu className={`w-4 h-4 ${activeSolution === 'ai' ? 'text-[#D9A441]' : ''}`} />
                <span className="text-xs font-semibold leading-none">
                  {language === 'ar' ? 'الذكاء التطبيقي' : 'Applied AI'}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveSolution('web')}
                className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer text-center ${
                  activeSolution === 'web'
                    ? isDark
                      ? 'bg-[#143C5A]/40 border-[#D9A441] shadow-[0_0_15px_rgba(217,164,65,0.2)]'
                      : 'bg-white border-[#143C5A] shadow-sm'
                    : isDark
                    ? 'bg-[#0A1622]/50 border-[#143C5A]/40 hover:border-[#D9A441]/50 text-[#8FA4BC]'
                    : 'bg-[#FAF6EE]/50 border-[#143C5A]/15 hover:border-[#143C5A]/40 text-[#6E87A0]'
                }`}
              >
                <Layers className={`w-4 h-4 ${activeSolution === 'web' ? 'text-[#D9A441]' : ''}`} />
                <span className="text-xs font-semibold leading-none">
                  {language === 'ar' ? 'تطبيقات الويب' : 'Web & SaaS'}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveSolution('mobile')}
                className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer text-center ${
                  activeSolution === 'mobile'
                    ? isDark
                      ? 'bg-[#143C5A]/40 border-[#D9A441] shadow-[0_0_15px_rgba(217,164,65,0.2)]'
                      : 'bg-white border-[#143C5A] shadow-sm'
                    : isDark
                    ? 'bg-[#0A1622]/50 border-[#143C5A]/40 hover:border-[#D9A441]/50 text-[#8FA4BC]'
                    : 'bg-[#FAF6EE]/50 border-[#143C5A]/15 hover:border-[#143C5A]/40 text-[#6E87A0]'
                }`}
              >
                <Smartphone className={`w-4 h-4 ${activeSolution === 'mobile' ? 'text-[#D9A441]' : ''}`} />
                <span className="text-xs font-semibold leading-none">
                  {language === 'ar' ? 'تطبيقات الجوال' : 'Mobile Apps'}
                </span>
              </button>
            </div>

            {/* Dynamic System Preview Card */}
            <div
              className={`p-4 sm:p-5 rounded-2xl border space-y-4 transition-all ${
                isDark ? 'bg-[#0A1622] border-[#143C5A]/50' : 'bg-[#FAF6EE]/60 border-[#143C5A]/15'
              }`}
            >
              {/* Solution Specific Interactive Viewport */}
              {activeSolution === 'ai' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="flex items-center gap-1.5 font-semibold text-[#D9A441]">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{language === 'ar' ? 'مسار استنتاج الذكاء الاصطناعي' : 'Inference Pipeline'}</span>
                    </span>
                    <span className={`tabular-nums ${isDark ? 'text-[#8FA4BC]' : 'text-[#6E87A0]'}`}>
                      {simLatency}ms TTFT · {simTokens} tokens/s
                    </span>
                  </div>

                  {/* Interactive Query Simulator Box */}
                  <div
                    className={`p-3 rounded-xl border text-xs font-mono space-y-2 ${
                      isDark ? 'bg-[#0E2336] border-[#143C5A]/60 text-[#FAF6EE]' : 'bg-white border-[#143C5A]/20 text-[#1D2733]'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] opacity-70">
                      <span>{language === 'ar' ? 'الطلب النموذجي:' : 'Sample Query:'}</span>
                      <span className="text-[#D9A441]">Gemini 2.5 Flash</span>
                    </div>
                    <p className="font-sans text-xs italic">
                      {language === 'ar'
                        ? '"تحليل وتصنيف بيانات سلاسل التوريد عبر صعيد مصر وتحديد المسار الأمثل."'
                        : '"Analyze multi-modal supply chain telemetry across Upper Egypt and generate optimal route."'}
                    </p>
                    <div className="pt-1 flex items-center justify-between border-t border-inherit/10">
                      <div className="flex items-center gap-1.5 text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#D9A441]" />
                        <span>{language === 'ar' ? 'استجابة مهيكلة ومحققة ١٠٠٪' : 'Type-Safe JSON Validated'}</span>
                      </div>
                      <button
                        type="button"
                        onClick={handleRunSimulation}
                        disabled={simRunning}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
                          isDark
                            ? 'bg-[#D9A441] text-[#0A1622] hover:bg-[#F2BD5B]'
                            : 'bg-[#143C5A] text-[#FAF6EE] hover:bg-[#0E2336]'
                        }`}
                      >
                        {simRunning ? <RotateCw className="w-3 h-3 animate-spin" /> : <Play className="w-3 h-3" />}
                        <span>{language === 'ar' ? 'اختبار الاستجابة' : 'Test Stream'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeSolution === 'web' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="flex items-center gap-1.5 font-semibold text-[#D9A441]">
                      <Server className="w-3.5 h-3.5" />
                      <span>{language === 'ar' ? 'منصة الشركات الموزعة' : 'Distributed Cloud SaaS'}</span>
                    </span>
                    <span className={`tabular-nums ${isDark ? 'text-[#8FA4BC]' : 'text-[#6E87A0]'}`}>
                      P99 &lt;42ms · 99.98% SLA
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
                    <div className={`p-2.5 rounded-xl border ${isDark ? 'bg-[#0E2336] border-[#143C5A]/60' : 'bg-white border-[#143C5A]/15'}`}>
                      <div className="text-[#D9A441] font-bold text-sm tabular-nums">&lt;45ms</div>
                      <div className="text-[10px] opacity-70 mt-0.5">{language === 'ar' ? 'زمن الاستجابة' : 'Latency'}</div>
                    </div>
                    <div className={`p-2.5 rounded-xl border ${isDark ? 'bg-[#0E2336] border-[#143C5A]/60' : 'bg-white border-[#143C5A]/15'}`}>
                      <div className="text-[#D9A441] font-bold text-sm tabular-nums">0.00%</div>
                      <div className="text-[10px] opacity-70 mt-0.5">{language === 'ar' ? 'نسبة الخطأ' : 'Error Rate'}</div>
                    </div>
                    <div className={`p-2.5 rounded-xl border ${isDark ? 'bg-[#0E2336] border-[#143C5A]/60' : 'bg-white border-[#143C5A]/15'}`}>
                      <div className="text-[#D9A441] font-bold text-sm tabular-nums">100%</div>
                      <div className="text-[10px] opacity-70 mt-0.5">{language === 'ar' ? 'أمان الأنواع' : 'Type-Safe'}</div>
                    </div>
                  </div>
                </div>
              )}

              {activeSolution === 'mobile' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="flex items-center gap-1.5 font-semibold text-[#D9A441]">
                      <Smartphone className="w-3.5 h-3.5" />
                      <span>{language === 'ar' ? 'تطبيقات الهاتف فائقة السرعة' : 'Native 60fps Experience'}</span>
                    </span>
                    <span className={`tabular-nums ${isDark ? 'text-[#8FA4BC]' : 'text-[#6E87A0]'}`}>
                      Offline SQLite · Biometric
                    </span>
                  </div>

                  <div className={`p-3 rounded-xl border flex items-center justify-between text-xs font-mono ${
                    isDark ? 'bg-[#0E2336] border-[#143C5A]/60' : 'bg-white border-[#143C5A]/15'
                  }`}>
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-[#D9A441]" />
                      <span>{language === 'ar' ? 'تزامن بدون إنترنت + حماية بيومترية' : 'Offline-First SQLite + FaceID'}</span>
                    </div>
                    <span className="text-[11px] font-bold text-[#D9A441]">60 FPS</span>
                  </div>
                </div>
              )}

              {/* Stack Pill Tags */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                {currentBlueprint.stack.map((tech) => (
                  <span
                    key={tech}
                    className={`text-[11px] font-mono px-2 py-0.5 rounded-md border ${
                      isDark
                        ? 'bg-[#0E2336] border-[#143C5A]/70 text-[#8FA4BC]'
                        : 'bg-white border-[#143C5A]/20 text-[#143C5A]'
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Action to Discuss with Syene */}
            <div className="pt-1 flex items-center justify-between gap-3">
              <span className={`text-xs ${isDark ? 'text-[#8FA4BC]' : 'text-[#6E87A0]'}`}>
                {language === 'ar' ? 'حلول هندسية مصممة خصيصاً لمؤسستك' : 'Custom engineering for high-growth firms'}
              </span>
              <button
                type="button"
                onClick={() => onNavigate(`/contact?type=${activeSolution}`)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold shadow-sm transition-all cursor-pointer ${
                  isDark
                    ? 'syene-gold-gradient text-[#0A1622] font-bold hover:opacity-95'
                    : 'bg-[#143C5A] text-[#FAF6EE] hover:bg-[#0E2336]'
                }`}
              >
                <span>{language === 'ar' ? 'طلب استشارة' : 'Inquire Solution'}</span>
                <ArrowIcon className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Architecture Blueprint Estimator */}
        {activeTab === 'estimator' && (
          <div className="p-5 sm:p-6 space-y-5 relative z-10">
            {/* Step 1: Select Type */}
            <div className="space-y-1.5">
              <label className={`text-xs font-mono font-medium ${isDark ? 'text-[#8FA4BC]' : 'text-[#6E87A0]'}`}>
                {language === 'ar' ? '١. نوع الحل المطلوب' : '1. Select Solution Discipline'}
              </label>
              <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                {[
                  { id: 'ai', label: 'AI Solutions', labelAr: 'ذكاء اصطناعي' },
                  { id: 'web', label: 'Web Platform', labelAr: 'منصة ويب' },
                  { id: 'mobile', label: 'Mobile App', labelAr: 'تطبيق جوال' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setProjectType(item.id as any)}
                    className={`py-2 px-2 rounded-xl border text-center transition-all cursor-pointer ${
                      projectType === item.id
                        ? isDark
                          ? 'bg-[#143C5A] border-[#D9A441] text-[#FAF6EE] font-bold shadow-xs'
                          : 'bg-[#143C5A] border-[#143C5A] text-[#FAF6EE] font-bold shadow-xs'
                        : isDark
                        ? 'bg-[#0A1622]/40 border-[#143C5A]/40 text-[#8FA4BC] hover:border-[#D9A441]/40'
                        : 'bg-white border-[#143C5A]/20 text-[#6E87A0] hover:border-[#143C5A]/40'
                    }`}
                  >
                    {language === 'ar' ? item.labelAr : item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Select Scale */}
            <div className="space-y-1.5">
              <label className={`text-xs font-mono font-medium ${isDark ? 'text-[#8FA4BC]' : 'text-[#6E87A0]'}`}>
                {language === 'ar' ? '٢. حجم ومرحلة المشروع' : '2. Scope & Target Scale'}
              </label>
              <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                {[
                  { id: 'mvp', label: 'MVP / Fast', labelAr: 'إطلاق سريع' },
                  { id: 'growth', label: 'Growth SaaS', labelAr: 'نمو متسارع' },
                  { id: 'enterprise', label: 'Enterprise', labelAr: 'مؤسسات كبرى' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setProjectScale(item.id as any)}
                    className={`py-2 px-2 rounded-xl border text-center transition-all cursor-pointer ${
                      projectScale === item.id
                        ? isDark
                          ? 'bg-[#D9A441] text-[#0A1622] font-bold border-[#D9A441] shadow-xs'
                          : 'bg-[#143C5A] text-[#FAF6EE] font-bold border-[#143C5A] shadow-xs'
                        : isDark
                        ? 'bg-[#0A1622]/40 border-[#143C5A]/40 text-[#8FA4BC] hover:border-[#D9A441]/40'
                        : 'bg-white border-[#143C5A]/20 text-[#6E87A0] hover:border-[#143C5A]/40'
                    }`}
                  >
                    {language === 'ar' ? item.labelAr : item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Calculated Blueprint Output */}
            <div
              className={`p-4 rounded-2xl border space-y-3 ${
                isDark ? 'bg-[#0A1622] border-[#D9A441]/40' : 'bg-[#FAF6EE] border-[#143C5A]/25'
              }`}
            >
              <div className="flex items-center justify-between border-b pb-2.5 border-inherit/20">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#D9A441]" />
                  <span className="text-xs font-mono font-semibold">
                    {language === 'ar' ? 'الجدول الزمني التقديري:' : 'Estimated Timeline:'}
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-[#D9A441] tabular-nums">
                  {language === 'ar' ? currentBlueprint.timelineAr : currentBlueprint.timeline}
                </span>
              </div>

              {/* Deliverables Bullet List */}
              <div className="space-y-1.5 text-xs">
                {(language === 'ar' ? currentBlueprint.deliverablesAr : currentBlueprint.deliverables).map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D9A441] shrink-0 mt-0.5" />
                    <span className="leading-snug opacity-90">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Launch with this Blueprint CTA */}
            <button
              type="button"
              onClick={() => onNavigate(`/contact?type=${projectType}&scale=${projectScale}`)}
              className={`w-full py-3 px-4 rounded-xl text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer ${
                isDark
                  ? 'syene-gold-gradient text-[#0A1622] font-bold hover:opacity-95'
                  : 'bg-[#143C5A] text-[#FAF6EE] hover:bg-[#0E2336]'
              }`}
            >
              <Zap className="w-4 h-4 text-inherit" />
              <span>
                {language === 'ar'
                  ? 'طلب هذا الحل والبدء في التنفيذ'
                  : 'Request This Architecture Blueprint'}
              </span>
              <ArrowIcon className="w-3.5 h-3.5 text-inherit" />
            </button>
          </div>
        )}
      </div>
    </Card3DTilt>
  );
};
