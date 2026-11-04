import React, { useState } from 'react';
import { Card3DTilt } from './Card3DTilt';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

interface ArchitectureLayer {
  id: string;
  index: string;
  title: string;
  titleAr?: string;
  shortLabel: string;
  shortLabelAr?: string;
  category: string;
  categoryAr?: string;
  metrics: { label: string; labelAr?: string; value: string }[];
  stack: string[];
  snippet: {
    filename: string;
    code: string;
  };
  highlights: string[];
  highlightsAr?: string[];
}

const LAYERS: ArchitectureLayer[] = [
  {
    id: 'platform',
    index: '01',
    title: 'Enterprise Custom Software & Web Platforms',
    titleAr: 'تطوير البرمجيات المخصصة ومنصات الويب للشركات',
    shortLabel: 'Software Solutions',
    shortLabelAr: 'حلول البرمجيات',
    category: 'Nubix Core Engineering',
    categoryAr: 'خدمات الشركة الأساسية',
    metrics: [
      { label: 'Type Safety', labelAr: 'أمان الأنواع', value: '100% End-to-End' },
      { label: 'Edge Latency', labelAr: 'زمن الاستجابة', value: '< 65ms p99' },
      { label: 'Availability', labelAr: 'نسبة الجاهزية', value: '99.98% SLA' },
    ],
    stack: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'tRPC'],
    snippet: {
      filename: 'src/server/trpc/appRouter.ts',
      code: `export const appRouter = router({
  project: projectRouter,
  inquiry: protectedProcedure
    .input(z.object({ email: z.string().email(), brief: z.string().min(25) }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.inquiry.create({ data: input });
    }),
});`,
    },
    highlights: [
      'Tailored full-stack platforms engineered for high-concurrency business operations',
      'Production-grade reliability with PostgreSQL & automated connection pooling',
    ],
    highlightsAr: [
      'منصات برمجية مخصصة ومصممة خصيصاً لتناسب عمليات ونمو شركتك',
      'موثوقية تشغيلية عالية مع قواعد بيانات PostgreSQL علائقية سريعة ومحمية',
    ],
  },
  {
    id: 'ai-engine',
    index: '02',
    title: 'Applied AI & Custom Autonomous Agents',
    titleAr: 'حلول الذكاء الاصطناعي التطبيقي والوكلاء المؤتمتة',
    shortLabel: 'AI Systems',
    shortLabelAr: 'أنظمة الذكاء',
    category: 'Nubix Applied Intelligence',
    categoryAr: 'حلول الذكاء للشركات',
    metrics: [
      { label: 'Inference Model', labelAr: 'نموذج الاستدلال', value: 'Gemini 2.5 Flash' },
      { label: 'Stream TTFT', labelAr: 'سرعة أول استجابة', value: '< 220ms' },
      { label: 'Schema Precision', labelAr: 'دقة الهيكلة', value: 'Structured JSON' },
    ],
    stack: ['@google/genai', 'Python', 'Vector Store', 'Embeddings', 'Function Calling'],
    snippet: {
      filename: 'src/services/ai/pipeline.ts',
      code: `const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const response = await ai.models.generateContent({
  model: 'gemini-2.5-flash',
  contents: [{ role: 'user', parts: [{ text: userQuery }] }],
  config: { responseMimeType: 'application/json', responseSchema: analysisSchema },
});`,
    },
    highlights: [
      'Enterprise LLM workflows & custom RAG grounded in your company data',
      'Autonomous agentic task pipelines that eliminate repetitive manual workflows',
    ],
    highlightsAr: [
      'دمج نماذج الذكاء الاصطناعي واسترجاع معرفي مؤصل (RAG) على بيانات شركتك',
      'أتمتة المهام بالوكلاء الذكية لتوفير آلاف الساعات اليدوية لفريق عملك',
    ],
  },
  {
    id: 'infrastructure',
    index: '03',
    title: 'High-Scale Cloud & Edge Infrastructure',
    titleAr: 'البنية التحتية السحابية والأنظمة الموزعة عالية التوسع',
    shortLabel: 'Cloud & Scale',
    shortLabelAr: 'السحابة والتوسع',
    category: 'Nubix Cloud & Reliability',
    categoryAr: 'كفاءة التشغيل والتوسع',
    metrics: [
      { label: 'Global CDN', labelAr: 'شبكة التوزيع', value: 'Edge Multi-Region' },
      { label: 'Cache Hit Rate', labelAr: 'نسبة التخزين المؤقت', value: '98.6%' },
      { label: 'Cold Starts', labelAr: 'إقلاع سريع', value: '< 180ms' },
    ],
    stack: ['Cloud Run', 'Redis Multi-Zone', 'Docker', 'OpenTelemetry', 'Vite'],
    snippet: {
      filename: 'deploy/cloudrun.service.yaml',
      code: `apiVersion: serving.knative.dev/v1
kind: Service
metadata:
  name: nubix-production-cluster
spec:
  template:
    spec:
      containers:
        - image: gcr.io/nubix/engine:v1.4
          resources:
            limits: { cpu: '2000m', memory: '2Gi' }`,
    },
    highlights: [
      'Multi-region container deployment with zero-downtime auto-scaling',
      'Low-latency Redis caching with 24/7 proactive health monitoring',
    ],
    highlightsAr: [
      'نشر الحاويات سحابياً عبر مناطق متعددة مع توسع تلقائي دون أي توقف',
      'مزامنة سريعة عبر Redis مع مراقبة تشغيلية استباقية على مدار الساعة',
    ],
  },
];

export const ArchitectureConsole3D: React.FC = () => {
  const [activeLayerId, setActiveLayerId] = useState<string>('platform');
  const [viewMode, setViewMode] = useState<'overview' | 'code'>('overview');
  const { theme } = useTheme();
  const { language } = useLanguage();
  const isDark = theme === 'dark';

  const activeLayer = LAYERS.find((l) => l.id === activeLayerId) || LAYERS[0];
  const layerTitle = language === 'ar' && activeLayer.titleAr ? activeLayer.titleAr : activeLayer.title;
  const layerCategory = language === 'ar' && activeLayer.categoryAr ? activeLayer.categoryAr : activeLayer.category;
  const layerHighlights = language === 'ar' && activeLayer.highlightsAr ? activeLayer.highlightsAr : activeLayer.highlights;

  return (
    <Card3DTilt className="w-full max-w-xl" maxTilt={2.5}>
      <div
        className={`p-6 sm:p-7 rounded-2xl border backdrop-blur-xl transition-all duration-300 shadow-2xl relative overflow-hidden ${
          isDark
            ? 'bg-[#1E020C]/90 border-[#69001F]/70 shadow-[0_20px_50px_rgba(2,6,14,0.7)] text-[#F5EAF0]'
            : 'bg-white/95 border-[#69001F]/20 shadow-[0_20px_50px_rgba(105,0,31,0.08)] text-[#02060E]'
        }`}
      >
        {/* Top Edge Gradient Highlight */}
        <div
          className={`absolute top-0 left-0 right-0 h-[2px] ${
            isDark
              ? 'bg-gradient-to-r from-transparent via-[#C50337] to-transparent'
              : 'bg-gradient-to-r from-transparent via-[#69001F] to-transparent'
          }`}
          aria-hidden="true"
        />

        {/* Console Header Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-current/10">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#69001F]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#850021]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#C50337]" />
            <span className="ms-2 font-mono text-[11px] opacity-75 font-medium">
              {language === 'ar' ? 'شركة نوبيكس · مركز الحلول' : 'nubix.company // core solutions'}
            </span>
          </div>

          {/* View Mode Toggle */}
          <div
            className={`flex items-center p-0.5 rounded-lg border text-[11px] font-mono ${
              isDark ? 'bg-[#02060E] border-[#69001F]/70' : 'bg-[#F5EAF0]/60 border-[#69001F]/20'
            }`}
          >
            <button
              type="button"
              onClick={() => setViewMode('overview')}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                viewMode === 'overview'
                  ? isDark
                    ? 'bg-[#69001F] text-[#F5EAF0] font-semibold shadow-xs'
                    : 'bg-[#69001F] text-[#F5EAF0] font-semibold shadow-xs'
                  : 'opacity-60 hover:opacity-100'
              }`}
            >
              {language === 'ar' ? 'نظرة عامة على الحل' : 'Solutions'}
            </button>
            <button
              type="button"
              onClick={() => setViewMode('code')}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                viewMode === 'code'
                  ? isDark
                    ? 'bg-[#69001F] text-[#F5EAF0] font-semibold shadow-xs'
                    : 'bg-[#69001F] text-[#F5EAF0] font-semibold shadow-xs'
                  : 'opacity-60 hover:opacity-100'
              }`}
            >
              {language === 'ar' ? 'الكود والتقنيات' : 'Tech Stack'}
            </button>
          </div>
        </div>

        {/* Interactive Layer Tabs */}
        <div className="pt-4 pb-3">
          <div className="text-[11px] font-mono uppercase tracking-wider opacity-60 mb-2 font-semibold">
            {language === 'ar' ? 'حلول وخدمات شركة نوبيكس' : 'Nubix Company Solutions & Services'}
          </div>
          <div className="grid grid-cols-3 gap-2">
            {LAYERS.map((layer) => {
              const isSelected = layer.id === activeLayerId;
              const shortLabel = language === 'ar' && layer.shortLabelAr ? layer.shortLabelAr : layer.shortLabel;
              return (
                <button
                  key={layer.id}
                  type="button"
                  onClick={() => setActiveLayerId(layer.id)}
                  className={`p-2.5 rounded-xl border text-start transition-all cursor-pointer ${
                    isSelected
                      ? isDark
                        ? 'bg-[#3B0018] border-[#C50337]/70 text-[#F5EAF0] shadow-sm'
                        : 'bg-[#F5EAF0] border-[#69001F]/50 text-[#02060E] shadow-sm'
                      : isDark
                      ? 'bg-[#02060E]/50 border-[#69001F]/40 text-[#F5EAF0]/70 hover:border-[#C50337]/30'
                      : 'bg-white border-[#69001F]/15 text-[#69001F] hover:border-[#69001F]/30'
                  }`}
                >
                  <div
                    className={`font-mono text-[10px] font-bold ${
                      isSelected
                        ? isDark
                          ? 'text-[#C50337]'
                          : 'text-[#69001F]'
                        : 'opacity-50'
                    }`}
                  >
                    {layer.index}
                  </div>
                  <div className="text-xs font-semibold truncate mt-0.5">
                    {shortLabel}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Layer Details */}
        <div className="py-3">
          {viewMode === 'overview' ? (
            <div className="space-y-4">
              <div className="space-y-1">
                <div
                  className={`text-[11px] font-mono ${
                    isDark ? 'text-[#C50337]' : 'text-[#69001F]'
                  }`}
                >
                  {layerCategory}
                </div>
                <h4 className="font-display text-base font-bold tracking-tight">
                  {layerTitle}
                </h4>
              </div>

              {/* Highlights List */}
              <ul className="space-y-2 text-xs leading-relaxed">
                {layerHighlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span
                      className={`font-mono text-xs mt-0.5 ${
                        isDark ? 'text-[#C50337]' : 'text-[#69001F]'
                      }`}
                      aria-hidden="true"
                    >
                      ▸
                    </span>
                    <span className={isDark ? 'text-[#F5EAF0]/80' : 'text-[#69001F]/85'}>{h}</span>
                  </li>
                ))}
              </ul>

              {/* Real Metrics Strip */}
              <div className="grid grid-cols-3 gap-2 pt-2">
                {activeLayer.metrics.map((m, i) => {
                  const metricLabel = language === 'ar' && m.labelAr ? m.labelAr : m.label;
                  return (
                    <div
                      key={i}
                      className={`p-2.5 rounded-xl border text-center ${
                        isDark
                          ? 'bg-[#02060E]/70 border-[#69001F]/50'
                          : 'bg-[#F5EAF0]/40 border-[#69001F]/15'
                      }`}
                    >
                      <div
                        className={`font-mono text-xs font-bold ${
                          isDark ? 'text-[#C50337]' : 'text-[#69001F]'
                        }`}
                      >
                        {m.value}
                      </div>
                      <div className="text-[10px] opacity-65 truncate mt-0.5">
                        {metricLabel}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="space-y-2 font-mono text-xs">
              <div className="flex items-center justify-between text-[11px] opacity-60 pb-1">
                <span>{activeLayer.snippet.filename}</span>
                <span>TypeScript</span>
              </div>
              <pre
                className={`p-3.5 rounded-xl overflow-x-auto text-[11px] leading-relaxed border ${
                  isDark
                    ? 'bg-[#02060E] border-[#69001F]/60 text-[#C50337]'
                    : 'bg-[#1E020C] border-[#69001F]/40 text-[#F5EAF0]'
                }`}
                dir="ltr"
              >
                <code>{activeLayer.snippet.code}</code>
              </pre>
            </div>
          )}
        </div>

        {/* Stack Tags */}
        <div className="pt-3 border-t border-current/10 flex flex-wrap items-center gap-1.5 text-[11px] font-mono">
          <span className="opacity-50 me-1">
            {language === 'ar' ? 'حزمة التقنيات:' : 'Stack:'}
          </span>
          {activeLayer.stack.map((tech) => (
            <span
              key={tech}
              className={`px-2 py-0.5 rounded border ${
                isDark
                  ? 'bg-[#02060E]/60 border-[#69001F]/50 text-[#F5EAF0]/85'
                  : 'bg-[#F5EAF0]/60 border-[#69001F]/15 text-[#69001F]'
              }`}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </Card3DTilt>
  );
};
