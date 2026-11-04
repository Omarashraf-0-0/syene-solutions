import React, { useState } from 'react';
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Minus,
  Sparkles,
  Terminal,
  Cpu,
  Globe,
} from 'lucide-react';
import { PROJECTS } from '../data/projects';
import {
  STUDIO_SERVICES,
  PROCESS_STEPS,
  PRICING_MODELS,
  PRICING_DISCLAIMERS,
  PRICING_DISCLAIMERS_AR,
} from '../data/pricing';
import { ProjectCard } from '../components/ProjectCard';
import { PageSEO } from '../components/PageSEO';
import { Card3DTilt } from '../components/3d/Card3DTilt';
import { ArchitectureConsole3D } from '../components/3d/ArchitectureConsole3D';
import { RevealOnScroll } from '../components/RevealOnScroll';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

interface HomePageProps {
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [currency, setCurrency] = useState<'USD' | 'EGP'>('USD');
  const { theme } = useTheme();
  const { language, isRTL, t } = useLanguage();
  const isDark = theme === 'dark';
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const handleLink = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  const currentDisclaimers = language === 'ar' ? PRICING_DISCLAIMERS_AR : PRICING_DISCLAIMERS;

  return (
    <main className="tech-grid-bg transition-colors duration-300">
      <PageSEO
        title={
          language === 'ar'
            ? 'نوبيكس — استوديو البرمجيات والذكاء الاصطناعي | تحويل الأفكار إلى منتجات رقمية ذكية'
            : 'Nubix — Software & AI Studio | Ideas into Intelligent Digital Products'
        }
        description={
          language === 'ar'
            ? 'نصمم ونبني حلول البرمجيات والذكاء الاصطناعي المتقدمة التي تحل مشكلات واقعية وتدفع أعمالك للأمام.'
            : 'We design and build software and AI solutions that solve real problems and help businesses move forward.'
        }
        path="/"
      />

      {/* 1. Hero Section with Crimson Ambient Glow */}
      <section
        className={`relative overflow-hidden border-b transition-colors duration-300 py-16 lg:py-24 crimson-ambient-glow ${
          isDark
            ? 'text-[#F5EAF0] border-[#69001F]/50'
            : 'text-[#02060E] border-[#69001F]/15'
        }`}
      >
        <div className="max-w-[1240px] mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Typographic Impact & CTAs */}
            <div className="lg:col-span-6 space-y-8">
              <div className="space-y-6">
                {/* Editorial Typography Kicker */}
                <div
                  className={`flex flex-wrap items-center gap-2 text-xs font-mono tracking-wider uppercase font-semibold ${
                    isDark ? 'text-[#C50337]' : 'text-[#69001F]'
                  }`}
                >
                  <span>{language === 'ar' ? 'نوبيكس' : 'Nubix'}</span>
                  <span aria-hidden="true" className={isDark ? 'text-[#F5EAF0]/30' : 'text-[#69001F]/30'}>·</span>
                  <span>{t.hero.kicker}</span>
                </div>

                <h1
                  className={`font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.12] text-balance ${
                    isDark ? 'text-[#F5EAF0]' : 'text-[#02060E]'
                  }`}
                >
                  {t.hero.title}
                </h1>

                <p
                  className={`text-lg sm:text-xl leading-relaxed text-balance ${
                    isDark ? 'text-[#F5EAF0]/80' : 'text-[#69001F]/85'
                  }`}
                >
                  {t.hero.subtitle}
                </p>
              </div>

              {/* Primary & Secondary CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-1">
                <a
                  href="/projects"
                  onClick={(e) => handleLink(e, '/projects')}
                  className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold rounded-xl shadow-md transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap shrink-0 ${
                    isDark
                      ? 'crimson-noir-gradient text-[#F5EAF0] font-bold shadow-[0_0_25px_rgba(197,3,55,0.32)] hover:shadow-[0_0_32px_rgba(197,3,55,0.5)]'
                      : 'bg-[#69001F] text-[#F5EAF0] hover:bg-[#3B0018]'
                  }`}
                >
                  <span>{t.hero.ctaPrimary}</span>
                  <ArrowIcon className="w-4 h-4" aria-hidden="true" />
                </a>

                <a
                  href="/contact"
                  onClick={(e) => handleLink(e, '/contact')}
                  className={`inline-flex items-center justify-center px-6 py-3.5 text-sm font-semibold rounded-xl transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap shrink-0 border ${
                    isDark
                      ? 'text-[#F5EAF0] bg-[#1E020C]/90 border-[#69001F]/70 hover:border-[#C50337] hover:text-[#C50337]'
                      : 'text-[#02060E] bg-white border-[#69001F]/25 hover:border-[#69001F] hover:bg-[#F5EAF0]/40'
                  }`}
                >
                  {t.hero.ctaSecondary}
                </a>
              </div>

              {/* Micro Metric Anchors with Tabular Rigor */}
              <div
                className={`pt-6 border-t grid grid-cols-3 gap-6 text-xs font-mono ${
                  isDark ? 'border-[#69001F]/50' : 'border-[#69001F]/15'
                }`}
              >
                <div>
                  <div className={`font-bold text-lg tabular-nums ${isDark ? 'text-[#C50337]' : 'text-[#69001F]'}`}>
                    {t.hero.metric1Value}
                  </div>
                  <div className={`mt-0.5 ${isDark ? 'text-[#F5EAF0]/60' : 'text-[#69001F]/70'}`}>
                    {t.hero.metric1Label}
                  </div>
                </div>
                <div>
                  <div className={`font-bold text-lg tabular-nums ${isDark ? 'text-[#C50337]' : 'text-[#69001F]'}`}>
                    {t.hero.metric2Value}
                  </div>
                  <div className={`mt-0.5 ${isDark ? 'text-[#F5EAF0]/60' : 'text-[#69001F]/70'}`}>
                    {t.hero.metric2Label}
                  </div>
                </div>
                <div>
                  <div className={`font-bold text-lg tabular-nums ${isDark ? 'text-[#C50337]' : 'text-[#69001F]'}`}>
                    {t.hero.metric3Value}
                  </div>
                  <div className={`mt-0.5 ${isDark ? 'text-[#F5EAF0]/60' : 'text-[#69001F]/70'}`}>
                    {t.hero.metric3Label}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Studio Engineering & Architecture Console */}
            <div className="lg:col-span-6 w-full flex items-center justify-center">
              <ArchitectureConsole3D />
            </div>
          </div>

          {/* Minimal, Sleek Pillars Row Below Hero */}
          <RevealOnScroll delayMs={100}>
            <div
              className={`mt-16 pt-8 border-t grid grid-cols-2 lg:grid-cols-4 gap-6 text-sm ${
                isDark ? 'border-[#69001F]/50' : 'border-[#69001F]/15'
              }`}
            >
              <div className="flex items-start gap-3">
                <Cpu className={`w-4 h-4 shrink-0 mt-1 ${isDark ? 'text-[#C50337]' : 'text-[#69001F]'}`} />
                <div>
                  <div className={`text-[11px] font-mono font-medium ${isDark ? 'text-[#F5EAF0]/50' : 'text-[#69001F]/60'}`}>
                    {language === 'ar' ? '٠١ · التركيز' : '01 · Focus'}
                  </div>
                  <div className={`font-semibold text-sm ${isDark ? 'text-[#F5EAF0]' : 'text-[#02060E]'}`}>
                    {language === 'ar' ? 'برمجيات مخصصة وذكاء اصطناعي' : 'Custom Software & AI'}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Terminal className={`w-4 h-4 shrink-0 mt-1 ${isDark ? 'text-[#C50337]' : 'text-[#69001F]'}`} />
                <div>
                  <div className={`text-[11px] font-mono font-medium ${isDark ? 'text-[#F5EAF0]/50' : 'text-[#69001F]/60'}`}>
                    {language === 'ar' ? '٠٢ · النماذج' : '02 · Delivery'}
                  </div>
                  <div className={`font-semibold text-sm ${isDark ? 'text-[#F5EAF0]' : 'text-[#02060E]'}`}>
                    {language === 'ar' ? 'جاهز · مخصص · هجين' : 'Ready · Custom · Hybrid'}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Sparkles className={`w-4 h-4 shrink-0 mt-1 ${isDark ? 'text-[#C50337]' : 'text-[#69001F]'}`} />
                <div>
                  <div className={`text-[11px] font-mono font-medium ${isDark ? 'text-[#F5EAF0]/50' : 'text-[#69001F]/60'}`}>
                    {language === 'ar' ? '٠٣ · الجودة' : '03 · Quality'}
                  </div>
                  <div className={`font-semibold text-sm ${isDark ? 'text-[#F5EAF0]' : 'text-[#02060E]'}`}>
                    {language === 'ar' ? 'كود محكم وقابل للتوسع' : 'Typed & Scalable Code'}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Globe className={`w-4 h-4 shrink-0 mt-1 ${isDark ? 'text-[#C50337]' : 'text-[#69001F]'}`} />
                <div>
                  <div className={`text-[11px] font-mono font-medium ${isDark ? 'text-[#F5EAF0]/50' : 'text-[#69001F]/60'}`}>
                    {language === 'ar' ? '٠٤ · التغطية' : '04 · Scale'}
                  </div>
                  <div className={`font-semibold text-sm ${isDark ? 'text-[#F5EAF0]' : 'text-[#02060E]'}`}>
                    {language === 'ar' ? 'مصر وجميع أنحاء العالم' : 'Egypt & International'}
                  </div>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* 2. Selected Projects Section (3D Interactive Cards) */}
      <section
        id="selected-projects"
        className={`py-24 lg:py-32 border-b transition-colors duration-300 ${
          isDark ? 'border-[#69001F]/50 bg-[#02060E]/80' : 'border-[#69001F]/15 bg-transparent'
        }`}
      >
        <div className="max-w-[1240px] mx-auto px-6 space-y-12">
          <RevealOnScroll>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-3 max-w-2xl">
                <div className={`text-xs font-mono font-semibold ${isDark ? 'text-[#C50337]' : 'text-[#69001F]'}`}>
                  {language === 'ar' ? '٠١. المشاريع المختارة' : '01. Selected Projects'}
                </div>
                <h2
                  className={`font-display text-3xl sm:text-4xl font-bold tracking-tight text-balance ${
                    isDark ? 'text-[#F5EAF0]' : 'text-[#02060E]'
                  }`}
                >
                  {t.projectsSection.title}
                </h2>
                <p className={`text-base leading-relaxed ${isDark ? 'text-[#F5EAF0]/75' : 'text-[#69001F]/80'}`}>
                  {t.projectsSection.subtitle}
                </p>
              </div>

              <a
                href="/projects"
                onClick={(e) => handleLink(e, '/projects')}
                className={`inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-xl border transition-colors whitespace-nowrap shrink-0 self-start md:self-auto ${
                  isDark
                    ? 'text-[#F5EAF0] bg-[#1E020C] border-[#69001F]/70 hover:border-[#C50337] hover:text-[#C50337]'
                    : 'text-[#02060E] bg-white border-[#69001F]/25 hover:border-[#69001F] hover:bg-[#F5EAF0]/30'
                }`}
              >
                <span>{t.projectsSection.viewAll}</span>
                <ArrowIcon className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delayMs={120}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {PROJECTS.map((project) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  onSelectProject={(slug) => onNavigate(`/projects/${slug}`)}
                />
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* 3. Services Section (Modern 3D Bento Grid) */}
      <section
        id="services"
        className={`py-24 lg:py-32 border-b relative transition-colors duration-300 ${
          isDark ? 'bg-[#1E020C]/30 border-[#69001F]/50' : 'bg-[#F5EAF0]/40 border-[#69001F]/15'
        }`}
      >
        <div className="max-w-[1240px] mx-auto px-6 space-y-14">
          <RevealOnScroll>
            <div className="max-w-2xl space-y-3">
              <div className={`text-xs font-mono font-semibold ${isDark ? 'text-[#C50337]' : 'text-[#69001F]'}`}>
                {language === 'ar' ? '٠٢. قدرات وخدمات الاستوديو' : '02. Studio Capabilities'}
              </div>
              <h2
                className={`font-display text-3xl sm:text-4xl font-bold tracking-tight text-balance ${
                  isDark ? 'text-[#F5EAF0]' : 'text-[#02060E]'
                }`}
              >
                {t.servicesSection.title}
              </h2>
              <p className={`text-base leading-relaxed ${isDark ? 'text-[#F5EAF0]/75' : 'text-[#69001F]/80'}`}>
                {t.servicesSection.subtitle}
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delayMs={120}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {STUDIO_SERVICES.map((service) => {
                const serviceTitle = language === 'ar' && service.titleAr ? service.titleAr : service.title;
                const serviceSummary = language === 'ar' && service.summaryAr ? service.summaryAr : service.summary;
                const serviceDeliverables = language === 'ar' && service.deliverablesAr ? service.deliverablesAr : service.deliverables;
                const serviceUseCases = language === 'ar' && service.typicalUseCasesAr ? service.typicalUseCasesAr : service.typicalUseCases;

                return (
                  <Card3DTilt key={service.id} className="glass-panel-3d rounded-2xl p-8 flex flex-col justify-between">
                    <div className="space-y-5">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className={`font-semibold ${isDark ? 'text-[#C50337]' : 'text-[#69001F]'}`}>
                          {language === 'ar' ? `${service.index}. قدرة استوديو` : `${service.index}. Capability`}
                        </span>
                      </div>

                      <h3 className={`font-display text-2xl font-bold tracking-tight ${
                        isDark ? 'text-[#F5EAF0]' : 'text-[#02060E]'
                      }`}>
                        {serviceTitle}
                      </h3>

                      <p className={`text-sm leading-relaxed ${isDark ? 'text-[#F5EAF0]/80' : 'text-[#69001F]/85'}`}>
                        {serviceSummary}
                      </p>

                      <ul className={`space-y-2.5 pt-4 border-t text-sm ${
                        isDark ? 'border-[#69001F]/50 text-[#F5EAF0]/85' : 'border-[#69001F]/15 text-[#69001F]'
                      }`}>
                        {serviceDeliverables.map((item) => (
                          <li key={item} className="flex items-start gap-2.5">
                            <span
                              className={`font-mono text-xs mt-1 shrink-0 ${isDark ? 'text-[#C50337]' : 'text-[#69001F]'}`}
                              aria-hidden="true"
                            >
                              ▸
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className={`pt-6 mt-6 border-t text-xs ${
                      isDark ? 'border-[#69001F]/50 text-[#F5EAF0]/70' : 'border-[#69001F]/15 text-[#69001F]/75'
                    }`}>
                      <strong className={`font-semibold ${isDark ? 'text-[#C50337]' : 'text-[#69001F]'}`}>
                        {t.servicesSection.bestFor}:{' '}
                      </strong>
                      {serviceUseCases}
                    </div>
                  </Card3DTilt>
                );
              })}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* 4. How We Work Section (3D Process Steps) */}
      <section
        id="how-we-work"
        className={`py-24 lg:py-32 border-b transition-colors duration-300 ${
          isDark ? 'bg-[#02060E]/70 border-[#69001F]/50' : 'bg-transparent border-[#69001F]/15'
        }`}
      >
        <div className="max-w-[1240px] mx-auto px-6 space-y-14">
          <RevealOnScroll>
            <div className="max-w-2xl space-y-3">
              <div className={`text-xs font-mono font-semibold ${isDark ? 'text-[#C50337]' : 'text-[#69001F]'}`}>
                {language === 'ar' ? '٠٣. منهجية التنفيذ' : '03. Delivery Methodology'}
              </div>
              <h2
                className={`font-display text-3xl sm:text-4xl font-bold tracking-tight text-balance ${
                  isDark ? 'text-[#F5EAF0]' : 'text-[#02060E]'
                }`}
              >
                {t.processSection.title}
              </h2>
              <p className={`text-base leading-relaxed ${isDark ? 'text-[#F5EAF0]/75' : 'text-[#69001F]/80'}`}>
                {t.processSection.subtitle}
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delayMs={120}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {PROCESS_STEPS.map((item) => {
                const stepTitle = language === 'ar' && item.titleAr ? item.titleAr : item.title;
                const stepDesc = language === 'ar' && item.descriptionAr ? item.descriptionAr : item.description;

                return (
                  <Card3DTilt
                    key={item.step}
                    className="glass-panel-3d p-7 rounded-2xl flex flex-col justify-between space-y-6"
                  >
                    <div className="space-y-3">
                      <div className={`font-mono text-xs font-semibold ${isDark ? 'text-[#C50337]' : 'text-[#69001F]'}`}>
                        {language === 'ar' ? `المرحلة ${item.step}` : `Phase ${item.step}`}
                      </div>
                      <h3 className={`font-display text-lg font-bold ${isDark ? 'text-[#F5EAF0]' : 'text-[#02060E]'}`}>
                        {stepTitle}
                      </h3>
                      <p className={`text-sm leading-relaxed ${isDark ? 'text-[#F5EAF0]/75' : 'text-[#69001F]/80'}`}>
                        {stepDesc}
                      </p>
                    </div>
                  </Card3DTilt>
                );
              })}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* 5. Pricing Overview Section (3D Spatial Tiers) */}
      <section
        id="pricing"
        className={`py-24 lg:py-32 border-b transition-colors duration-300 ${
          isDark ? 'border-[#69001F]/50 bg-[#1E020C]/30' : 'border-[#69001F]/15 bg-[#F5EAF0]/40'
        }`}
      >
        <div className="max-w-[1240px] mx-auto px-6 space-y-14">
          <RevealOnScroll>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-2xl space-y-3">
                <div className={`text-xs font-mono font-semibold ${isDark ? 'text-[#C50337]' : 'text-[#69001F]'}`}>
                  {language === 'ar' ? '٠٤. نماذج تسعير واضحة' : '04. Transparent Pricing Models'}
                </div>
                <h2
                  className={`font-display text-3xl sm:text-4xl font-bold tracking-tight text-balance ${
                    isDark ? 'text-[#F5EAF0]' : 'text-[#02060E]'
                  }`}
                >
                  {t.pricingSection.title}
                </h2>
                <p className={`text-base leading-relaxed ${isDark ? 'text-[#F5EAF0]/75' : 'text-[#69001F]/80'}`}>
                  {t.pricingSection.subtitle}
                </p>
              </div>

              {/* Currency Reference Toggle */}
              <div
                className={`flex items-center gap-2 self-start md:self-auto p-1.5 rounded-xl border ${
                  isDark ? 'bg-[#1E020C] border-[#69001F]/70' : 'bg-white border-[#69001F]/20 shadow-sm'
                }`}
              >
                <span className={`text-xs font-mono px-2 ${isDark ? 'text-[#F5EAF0]/60' : 'text-[#69001F]/70'}`}>
                  {t.pricingSection.currency}:
                </span>
                <button
                  type="button"
                  onClick={() => setCurrency('USD')}
                  className={`px-3 py-1.5 text-xs font-mono font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                    currency === 'USD'
                      ? isDark
                        ? 'bg-[#C50337] text-[#F5EAF0] font-bold shadow-md'
                        : 'bg-[#69001F] text-[#F5EAF0] font-bold shadow-sm'
                      : isDark
                      ? 'text-[#F5EAF0]/70 hover:text-[#F5EAF0]'
                      : 'text-[#69001F]/80 hover:text-[#02060E]'
                  }`}
                >
                  {language === 'ar' ? 'دولار ($)' : 'USD ($)'}
                </button>
                <button
                  type="button"
                  onClick={() => setCurrency('EGP')}
                  className={`px-3 py-1.5 text-xs font-mono font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                    currency === 'EGP'
                      ? isDark
                        ? 'bg-[#C50337] text-[#F5EAF0] font-bold shadow-md'
                        : 'bg-[#69001F] text-[#F5EAF0] font-bold shadow-sm'
                      : isDark
                      ? 'text-[#F5EAF0]/70 hover:text-[#F5EAF0]'
                      : 'text-[#69001F]/80 hover:text-[#02060E]'
                  }`}
                >
                  {language === 'ar' ? 'جنيه مصري (EGP)' : 'EGP (Egypt)'}
                </button>
              </div>
            </div>
          </RevealOnScroll>

          {/* 3 Pricing Models Grid */}
          <RevealOnScroll delayMs={120}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {PRICING_MODELS.map((tier) => {
              const displayPrice =
                currency === 'USD' ? tier.configurablePriceUSD : tier.configurablePriceEGP;
              const isHighlighted = tier.id === 'customized';

              const tierTitle = language === 'ar' && tier.titleAr ? tier.titleAr : tier.title;
              const tierSubtitle = language === 'ar' && tier.subtitleAr ? tier.subtitleAr : tier.subtitle;
              const tierDesc = language === 'ar' && tier.descriptionAr ? tier.descriptionAr : tier.description;
              const tierNote = language === 'ar' && tier.pricingNoteAr ? tier.pricingNoteAr : tier.pricingNote;
              const tierIncluded = language === 'ar' && tier.includedAr ? tier.includedAr : tier.included;
              const tierExcluded = language === 'ar' && tier.excludedAr ? tier.excludedAr : tier.excluded;
              const tierCta = language === 'ar' && tier.ctaLabelAr ? tier.ctaLabelAr : tier.ctaLabel;

              return (
                <Card3DTilt
                  key={tier.id}
                  className={`rounded-2xl p-8 flex flex-col justify-between border transition-all duration-300 ${
                    isHighlighted
                      ? isDark
                        ? 'bg-gradient-to-b from-[#1E020C] to-[#02060E] border-[#C50337]/50 shadow-[0_0_35px_rgba(197,3,55,0.18)]'
                        : 'bg-white border-[#69001F]/40 shadow-xl'
                      : 'glass-panel-3d'
                  }`}
                >
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className={`text-xs font-mono font-semibold ${isDark ? 'text-[#C50337]' : 'text-[#69001F]'}`}>
                        {tier.code}
                      </div>
                      <h3 className={`font-display text-2xl font-bold tracking-tight ${
                        isDark ? 'text-[#F5EAF0]' : 'text-[#02060E]'
                      }`}>
                        {tierTitle}
                      </h3>
                      <p className={`text-sm leading-relaxed ${isDark ? 'text-[#F5EAF0]/75' : 'text-[#69001F]/80'}`}>
                        {tierSubtitle}
                      </p>
                    </div>

                    {/* Price Block */}
                    <div className={`py-4 border-y space-y-1 ${isDark ? 'border-[#69001F]/50' : 'border-[#69001F]/15'}`}>
                      {tier.pricingMode === 'starting_from' ? (
                        <div>
                          <div className={`text-xs font-mono ${isDark ? 'text-[#F5EAF0]/60' : 'text-[#69001F]/70'}`}>
                            {language === 'ar' ? 'تبدأ من (قاعدة قابلة للتخصيص)' : 'Starting from (Configurable Base)'}
                          </div>
                          <div className={`font-mono text-3xl font-bold tracking-tight tabular-nums mt-1 ${
                            isDark ? 'text-[#C50337]' : 'text-[#69001F]'
                          }`}>
                            {displayPrice}
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className={`text-xs font-mono ${isDark ? 'text-[#F5EAF0]/60' : 'text-[#69001F]/70'}`}>
                            {language === 'ar' ? 'تنفيذ بمواصفات متكاملة' : 'Custom Scoped Engagement'}
                          </div>
                          <div className={`font-display text-2xl font-bold tracking-tight mt-1 ${
                            isDark ? 'text-[#C50337]' : 'text-[#69001F]'
                          }`}>
                            {t.pricingSection.requestQuote}
                          </div>
                        </div>
                      )}
                      <div className={`text-xs pt-1 ${isDark ? 'text-[#F5EAF0]/60' : 'text-[#69001F]/70'}`}>
                        {tierNote}
                      </div>
                    </div>

                    <p className={`text-sm leading-relaxed ${isDark ? 'text-[#F5EAF0]/80' : 'text-[#69001F]/85'}`}>
                      {tierDesc}
                    </p>

                    {/* Included */}
                    <div className="space-y-2.5">
                      <div className={`text-xs font-mono font-medium ${isDark ? 'text-[#C50337]' : 'text-[#69001F]'}`}>
                        {t.pricingSection.included}:
                      </div>
                      <ul className={`space-y-2 text-xs leading-relaxed ${
                        isDark ? 'text-[#F5EAF0]/85' : 'text-[#69001F]'
                      }`}>
                        {tierIncluded.map((inc) => (
                          <li key={inc} className="flex items-start gap-2">
                            <Check
                              className={`w-4 h-4 shrink-0 mt-0.5 ${isDark ? 'text-[#C50337]' : 'text-[#69001F]'}`}
                              aria-hidden="true"
                            />
                            <span>{inc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Excluded */}
                    <div className="space-y-2.5 pt-2">
                      <div className={`text-xs font-mono font-medium ${isDark ? 'text-[#F5EAF0]/50' : 'text-[#69001F]/50'}`}>
                        {t.pricingSection.excluded}:
                      </div>
                      <ul className={`space-y-2 text-xs leading-relaxed ${
                        isDark ? 'text-[#F5EAF0]/60' : 'text-[#69001F]/65'
                      }`}>
                        {tierExcluded.map((exc) => (
                          <li key={exc} className="flex items-start gap-2">
                            <Minus className="w-4 h-4 shrink-0 mt-0.5 opacity-60" aria-hidden="true" />
                            <span>{exc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-8">
                    <a
                      href={`/contact?package=${tier.id}`}
                      onClick={(e) => handleLink(e, `/contact?package=${tier.id}`)}
                      className={`w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-semibold rounded-xl transition-all whitespace-nowrap shrink-0 ${
                        isHighlighted
                          ? isDark
                            ? 'crimson-noir-gradient text-[#F5EAF0] hover:opacity-90 shadow-lg font-bold'
                            : 'bg-[#69001F] text-[#F5EAF0] hover:bg-[#3B0018] shadow-md font-bold'
                          : isDark
                          ? 'bg-[#1E020C] text-[#F5EAF0] hover:bg-[#69001F] border border-[#69001F]/70 hover:border-[#C50337]/40'
                          : 'bg-[#F5EAF0] text-[#02060E] hover:bg-white border border-[#69001F]/20'
                      }`}
                    >
                      <span>{tierCta}</span>
                      <ArrowIcon className="w-3.5 h-3.5" aria-hidden="true" />
                    </a>
                  </div>
                </Card3DTilt>
              );
            })}
            </div>
          </RevealOnScroll>

          {/* Pricing Disclaimers */}
          <RevealOnScroll delayMs={160}>
            <div className="p-6 rounded-2xl glass-panel-3d space-y-2">
              <div className={`text-xs font-mono font-semibold ${isDark ? 'text-[#C50337]' : 'text-[#69001F]'}`}>
                {t.pricingSection.disclaimerTitle}
              </div>
              <ul className={`space-y-1.5 text-xs leading-relaxed ${isDark ? 'text-[#F5EAF0]/75' : 'text-[#69001F]/80'}`}>
                {currentDisclaimers.map((note) => (
                  <li key={note} className="flex items-start gap-2">
                    <span className={`font-mono ${isDark ? 'text-[#C50337]' : 'text-[#69001F]'}`} aria-hidden="true">
                      ·
                    </span>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* 6. Final CTA Section with Deep 3D Aura */}
      <section className="py-24 lg:py-32 relative">
        <div className="max-w-[1240px] mx-auto px-6">
          <RevealOnScroll>
            <div
              className={`p-8 sm:p-14 rounded-3xl glass-panel-3d border flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative overflow-hidden ${
                isDark ? 'border-[#C50337]/30 bg-gradient-to-r from-[#1E020C] via-[#69001F]/30 to-[#1E020C]' : 'border-[#69001F]/20 bg-white/95'
              }`}
            >
              <div
                className={`absolute -right-20 -bottom-20 w-80 h-80 rounded-full blur-[90px] pointer-events-none ${
                  isDark ? 'bg-[#C50337]/10' : 'bg-[#C50337]/15'
                }`}
              />

              <div className="space-y-3 max-w-2xl relative z-10">
                <div className={`text-xs font-mono font-semibold ${isDark ? 'text-[#C50337]' : 'text-[#69001F]'}`}>
                  {language === 'ar' ? '٠٥. بدء المشروع' : '05. Project Initiation'}
                </div>
                <h2
                  className={`font-display text-3xl sm:text-4xl font-bold tracking-tight text-balance ${
                    isDark ? 'text-[#F5EAF0]' : 'text-[#02060E]'
                  }`}
                >
                  {t.finalCta.title}
                </h2>
                <p className={`text-base leading-relaxed ${isDark ? 'text-[#F5EAF0]/75' : 'text-[#69001F]/80'}`}>
                  {t.finalCta.subtitle}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 shrink-0 relative z-10">
                <a
                  href="/contact"
                  onClick={(e) => handleLink(e, '/contact')}
                  className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold rounded-xl shadow-md transition-all whitespace-nowrap shrink-0 ${
                    isDark
                      ? 'crimson-noir-gradient text-[#F5EAF0] font-bold shadow-[0_0_24px_rgba(197,3,55,0.35)] hover:shadow-[0_0_32px_rgba(197,3,55,0.5)]'
                      : 'bg-[#69001F] text-[#F5EAF0] hover:bg-[#3B0018]'
                  }`}
                >
                  <span>{t.finalCta.ctaPrimary}</span>
                  <ArrowIcon className="w-4 h-4" aria-hidden="true" />
                </a>
                <a
                  href="/projects"
                  onClick={(e) => handleLink(e, '/projects')}
                  className={`inline-flex items-center justify-center px-6 py-3.5 text-sm font-semibold rounded-xl border transition-colors whitespace-nowrap shrink-0 ${
                    isDark
                      ? 'text-[#F5EAF0] bg-[#1E020C] border-[#69001F]/70 hover:border-[#C50337]'
                      : 'text-[#02060E] bg-white border-[#69001F]/25 hover:border-[#69001F] hover:bg-[#F5EAF0]/40'
                  }`}
                >
                  {t.finalCta.ctaSecondary}
                </a>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </main>
  );
};
