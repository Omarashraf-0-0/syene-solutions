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
  Compass,
  Layers,
  ShieldCheck,
  Scale,
  Users,
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
import { StudioSolutionHub } from '../components/hero/StudioSolutionHub';
import { RevealOnScroll } from '../components/RevealOnScroll';
import { useFadeInUp } from '../hooks/useFadeInUp';
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

  // IntersectionObserver-based Fade-In-Up reveal hooks for HomePage sections
  const workSectionFade = useFadeInUp<HTMLElement>({ threshold: 0.1, distance: 24, duration: 650 });
  const servicesSectionFade = useFadeInUp<HTMLElement>({ threshold: 0.1, distance: 24, duration: 650 });
  const processSectionFade = useFadeInUp<HTMLElement>({ threshold: 0.1, distance: 24, duration: 650 });
  const aboutSectionFade = useFadeInUp<HTMLElement>({ threshold: 0.1, distance: 24, duration: 650 });
  const pricingSectionFade = useFadeInUp<HTMLElement>({ threshold: 0.1, distance: 24, duration: 650 });
  const ctaSectionFade = useFadeInUp<HTMLElement>({ threshold: 0.1, distance: 24, duration: 650 });

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
            ? 'سايين سوليوشنز — استوديو البرمجيات والذكاء الاصطناعي | من مهد أسوان إلى العالمية'
            : 'Syene Solutions — Software & AI Studio | Turning Ideas into Intelligent Digital Products'
        }
        description={
          language === 'ar'
            ? 'نصمم ونبني حلول البرمجيات والذكاء الاصطناعي المتقدمة بدقة مستوحاة من مهد أسوان (سايين باللاتينية). منصات ويب، وتطبيقات هواتف، ومسارات ذكاء اصطناعي إنتاجية.'
            : 'Originating from Aswan (Syene in ancient Latin), Syene Solutions engineers high-performance custom software, web platforms, mobile apps, and applied AI systems.'
        }
        path="/"
      />

      {/* 1. Hero Section with Syene Ambient Glow */}
      <section
        className={`relative overflow-hidden border-b transition-colors duration-300 py-16 lg:py-24 syene-ambient-glow ${
          isDark
            ? 'text-[#FAF6EE] border-[#143C5A]/40'
            : 'text-[#1D2733] border-[#143C5A]/15'
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
                    isDark ? 'text-[#D9A441]' : 'text-[#143C5A]'
                  }`}
                >
                  <span>{language === 'ar' ? 'سايين سوليوشنز' : 'Syene Solutions'}</span>
                  <span aria-hidden="true" className={isDark ? 'text-[#FAF6EE]/30' : 'text-[#143C5A]/30'}>·</span>
                  <span>{t.hero.kicker}</span>
                </div>

                <h1
                  className={`font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.12] text-balance ${
                    isDark ? 'text-[#FAF6EE]' : 'text-[#143C5A]'
                  }`}
                >
                  {language === 'ar' ? (
                    <>
                      نحوّل الأفكار الطموحة إلى{' '}
                      <span className="syene-gold-text font-extrabold">منتجات رقمية ذكية</span>.
                    </>
                  ) : (
                    <>
                      We turn ambitious ideas into{' '}
                      <span className="syene-gold-text font-extrabold">intelligent digital products</span>.
                    </>
                  )}
                </h1>

                <p
                  className={`text-lg sm:text-xl leading-relaxed text-balance ${
                    isDark ? 'text-[#8FA4BC]' : 'text-[#1D2733]/85'
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
                      ? 'syene-gold-gradient text-[#0A1622] font-bold shadow-[0_0_25px_rgba(217,164,65,0.28)] hover:shadow-[0_0_32px_rgba(217,164,65,0.48)]'
                      : 'bg-[#143C5A] text-[#FAF6EE] hover:bg-[#0E2336]'
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
                      ? 'text-[#FAF6EE] bg-[#0E2336]/90 border-[#6E87A0]/35 hover:border-[#D9A441] hover:text-[#D9A441]'
                      : 'text-[#143C5A] bg-white border-[#143C5A]/25 hover:border-[#D9A441] hover:bg-[#FAF6EE]/60'
                  }`}
                >
                  {t.hero.ctaSecondary}
                </a>
              </div>

              {/* Micro Metric Anchors with Tabular Rigor */}
              <div
                className={`pt-6 border-t grid grid-cols-3 gap-6 text-xs font-mono ${
                  isDark ? 'border-[#143C5A]/40' : 'border-[#143C5A]/15'
                }`}
              >
                <div>
                  <div className={`font-bold text-lg tabular-nums ${isDark ? 'text-[#D9A441]' : 'text-[#143C5A]'}`}>
                    {t.hero.metric1Value}
                  </div>
                  <div className={`mt-0.5 ${isDark ? 'text-[#8FA4BC]' : 'text-[#6E87A0]'}`}>
                    {t.hero.metric1Label}
                  </div>
                </div>
                <div>
                  <div className={`font-bold text-lg tabular-nums ${isDark ? 'text-[#D9A441]' : 'text-[#143C5A]'}`}>
                    {t.hero.metric2Value}
                  </div>
                  <div className={`mt-0.5 ${isDark ? 'text-[#8FA4BC]' : 'text-[#6E87A0]'}`}>
                    {t.hero.metric2Label}
                  </div>
                </div>
                <div>
                  <div className={`font-bold text-lg tabular-nums ${isDark ? 'text-[#D9A441]' : 'text-[#143C5A]'}`}>
                    {t.hero.metric3Value}
                  </div>
                  <div className={`mt-0.5 ${isDark ? 'text-[#8FA4BC]' : 'text-[#6E87A0]'}`}>
                    {t.hero.metric3Label}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Studio Solution Hub & Live Blueprint Explorer */}
            <div className="lg:col-span-6 w-full flex items-center justify-center">
              <StudioSolutionHub onNavigate={onNavigate} />
            </div>
          </div>

          {/* Minimal, Sleek Pillars Row Below Hero */}
          <RevealOnScroll delayMs={100}>
            <div
              className={`mt-16 pt-8 border-t grid grid-cols-2 lg:grid-cols-4 gap-6 text-sm ${
                isDark ? 'border-[#143C5A]/40' : 'border-[#143C5A]/15'
              }`}
            >
              <div className="flex items-start gap-3">
                <Cpu className={`w-4 h-4 shrink-0 mt-1 ${isDark ? 'text-[#D9A441]' : 'text-[#143C5A]'}`} />
                <div>
                  <div className={`text-[11px] font-mono font-medium ${isDark ? 'text-[#8FA4BC]/70' : 'text-[#6E87A0]'}`}>
                    {language === 'ar' ? '٠١ · التركيز' : '01 · Focus'}
                  </div>
                  <div className={`font-semibold text-sm ${isDark ? 'text-[#FAF6EE]' : 'text-[#143C5A]'}`}>
                    {language === 'ar' ? 'برمجيات مخصصة وذكاء اصطناعي' : 'Custom Software & AI'}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Compass className={`w-4 h-4 shrink-0 mt-1 ${isDark ? 'text-[#D9A441]' : 'text-[#143C5A]'}`} />
                <div>
                  <div className={`text-[11px] font-mono font-medium ${isDark ? 'text-[#8FA4BC]/70' : 'text-[#6E87A0]'}`}>
                    {language === 'ar' ? '٠٢ · الأصل والإرث' : '02 · Provenance'}
                  </div>
                  <div className={`font-semibold text-sm ${isDark ? 'text-[#FAF6EE]' : 'text-[#143C5A]'}`}>
                    {language === 'ar' ? 'أسوان (سايين باللاتينية)' : 'Aswan (Syene in Latin)'}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Sparkles className={`w-4 h-4 shrink-0 mt-1 ${isDark ? 'text-[#D9A441]' : 'text-[#143C5A]'}`} />
                <div>
                  <div className={`text-[11px] font-mono font-medium ${isDark ? 'text-[#8FA4BC]/70' : 'text-[#6E87A0]'}`}>
                    {language === 'ar' ? '٠٣ · الجودة' : '03 · Quality'}
                  </div>
                  <div className={`font-semibold text-sm ${isDark ? 'text-[#FAF6EE]' : 'text-[#143C5A]'}`}>
                    {language === 'ar' ? 'كود محكم وقابل للتوسع' : 'Typed & Scalable Code'}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Globe className={`w-4 h-4 shrink-0 mt-1 ${isDark ? 'text-[#D9A441]' : 'text-[#143C5A]'}`} />
                <div>
                  <div className={`text-[11px] font-mono font-medium ${isDark ? 'text-[#8FA4BC]/70' : 'text-[#6E87A0]'}`}>
                    {language === 'ar' ? '٠٤ · التغطية' : '04 · Scale'}
                  </div>
                  <div className={`font-semibold text-sm ${isDark ? 'text-[#FAF6EE]' : 'text-[#143C5A]'}`}>
                    {language === 'ar' ? 'مصر، الخليج، وعالمياً' : 'Egypt, MENA & Global'}
                  </div>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* 2. Selected Work Section with Fade-In-Up Reveal */}
      <section
        id="selected-projects"
        ref={workSectionFade.ref}
        style={workSectionFade.style}
        className={`py-24 lg:py-32 border-b transition-colors duration-300 ${
          isDark ? 'border-[#143C5A]/40 bg-[#0A1622]/80' : 'border-[#143C5A]/15 bg-transparent'
        }`}
      >
        <div className="max-w-[1240px] mx-auto px-6 space-y-12">
          <RevealOnScroll>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-3 max-w-2xl">
                <div className={`text-xs font-mono font-semibold ${isDark ? 'text-[#D9A441]' : 'text-[#143C5A]'}`}>
                  {language === 'ar' ? '٠١. أعمالنا ومشاريعنا المختارة' : '01. Selected Work'}
                </div>
                <h2
                  className={`font-display text-3xl sm:text-4xl font-bold tracking-tight text-balance ${
                    isDark ? 'text-[#FAF6EE]' : 'text-[#143C5A]'
                  }`}
                >
                  {t.projectsSection.title}
                </h2>
                <p className={`text-base leading-relaxed ${isDark ? 'text-[#8FA4BC]' : 'text-[#1D2733]/80'}`}>
                  {t.projectsSection.subtitle}
                </p>
              </div>

              <a
                href="/projects"
                onClick={(e) => handleLink(e, '/projects')}
                className={`inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-xl border transition-colors whitespace-nowrap shrink-0 self-start md:self-auto ${
                  isDark
                    ? 'text-[#FAF6EE] bg-[#0E2336] border-[#6E87A0]/35 hover:border-[#D9A441] hover:text-[#D9A441]'
                    : 'text-[#143C5A] bg-white border-[#143C5A]/25 hover:border-[#D9A441] hover:bg-[#FAF6EE]/50'
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

      {/* 3. Services Section with Fade-In-Up Reveal */}
      <section
        id="services"
        ref={servicesSectionFade.ref}
        style={servicesSectionFade.style}
        className={`py-24 lg:py-32 border-b relative transition-colors duration-300 ${
          isDark ? 'bg-[#0E2336]/30 border-[#143C5A]/40' : 'bg-[#FAF6EE]/50 border-[#143C5A]/15'
        }`}
      >
        <div className="max-w-[1240px] mx-auto px-6 space-y-14">
          <RevealOnScroll>
            <div className="max-w-2xl space-y-3">
              <div className={`text-xs font-mono font-semibold ${isDark ? 'text-[#D9A441]' : 'text-[#143C5A]'}`}>
                {language === 'ar' ? '٠٢. خدمات وقدرات الاستوديو' : '02. Studio Capabilities'}
              </div>
              <h2
                className={`font-display text-3xl sm:text-4xl font-bold tracking-tight text-balance ${
                  isDark ? 'text-[#FAF6EE]' : 'text-[#143C5A]'
                }`}
              >
                {t.servicesSection.title}
              </h2>
              <p className={`text-base leading-relaxed ${isDark ? 'text-[#8FA4BC]' : 'text-[#1D2733]/80'}`}>
                {t.servicesSection.subtitle}
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delayMs={120}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {STUDIO_SERVICES.map((service, idx) => {
                const serviceTitle = language === 'ar' && service.titleAr ? service.titleAr : service.title;
                const serviceSummary = language === 'ar' && service.summaryAr ? service.summaryAr : service.summary;
                const serviceDeliverables = language === 'ar' && service.deliverablesAr ? service.deliverablesAr : service.deliverables;
                const serviceUseCases = language === 'ar' && service.typicalUseCasesAr ? service.typicalUseCasesAr : service.typicalUseCases;

                return (
                  <Card3DTilt
                    key={service.id}
                    className={`glass-panel-3d rounded-2xl p-8 flex flex-col justify-between ${
                      idx === 0 || idx === 3 ? 'lg:col-span-1' : ''
                    }`}
                  >
                    <div className="space-y-5">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className={`font-semibold ${isDark ? 'text-[#D9A441]' : 'text-[#143C5A]'}`}>
                          {language === 'ar' ? `${service.index}. خدمة استوديو` : `${service.index}. Discipline`}
                        </span>
                      </div>

                      <h3 className={`font-display text-2xl font-bold tracking-tight ${
                        isDark ? 'text-[#FAF6EE]' : 'text-[#143C5A]'
                      }`}>
                        {serviceTitle}
                      </h3>

                      <p className={`text-sm leading-relaxed ${isDark ? 'text-[#8FA4BC]' : 'text-[#1D2733]/85'}`}>
                        {serviceSummary}
                      </p>

                      <ul className={`space-y-2.5 pt-4 border-t text-sm ${
                        isDark ? 'border-[#143C5A]/40 text-[#FAF6EE]/85' : 'border-[#143C5A]/15 text-[#1D2733]'
                      }`}>
                        {serviceDeliverables.map((item) => (
                          <li key={item} className="flex items-start gap-2.5">
                            <span
                              className={`font-mono text-xs mt-1 shrink-0 ${isDark ? 'text-[#D9A441]' : 'text-[#143C5A]'}`}
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
                      isDark ? 'border-[#143C5A]/40 text-[#8FA4BC]' : 'border-[#143C5A]/15 text-[#6E87A0]'
                    }`}>
                      <strong className={`font-semibold ${isDark ? 'text-[#D9A441]' : 'text-[#143C5A]'}`}>
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

      {/* 4. Process Section with Fade-In-Up Reveal */}
      <section
        id="how-we-work"
        ref={processSectionFade.ref}
        style={processSectionFade.style}
        className={`py-24 lg:py-32 border-b transition-colors duration-300 ${
          isDark ? 'bg-[#0A1622]/70 border-[#143C5A]/40' : 'bg-transparent border-[#143C5A]/15'
        }`}
      >
        <div className="max-w-[1240px] mx-auto px-6 space-y-14">
          <RevealOnScroll>
            <div className="max-w-2xl space-y-3">
              <div className={`text-xs font-mono font-semibold ${isDark ? 'text-[#D9A441]' : 'text-[#143C5A]'}`}>
                {language === 'ar' ? '٠٣. منهجية التنفيذ' : '03. Delivery Methodology'}
              </div>
              <h2
                className={`font-display text-3xl sm:text-4xl font-bold tracking-tight text-balance ${
                  isDark ? 'text-[#FAF6EE]' : 'text-[#143C5A]'
                }`}
              >
                {t.processSection.title}
              </h2>
              <p className={`text-base leading-relaxed ${isDark ? 'text-[#8FA4BC]' : 'text-[#1D2733]/80'}`}>
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
                      <div className={`font-mono text-xs font-semibold ${isDark ? 'text-[#D9A441]' : 'text-[#143C5A]'}`}>
                        {language === 'ar' ? `المرحلة ${item.step}` : `Phase ${item.step}`}
                      </div>
                      <h3 className={`font-display text-lg font-bold ${isDark ? 'text-[#FAF6EE]' : 'text-[#143C5A]'}`}>
                        {stepTitle}
                      </h3>
                      <p className={`text-sm leading-relaxed ${isDark ? 'text-[#8FA4BC]' : 'text-[#1D2733]/80'}`}>
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

      {/* 5. DEDICATED ABOUT SECTION with Fade-In-Up Reveal */}
      <section
        id="about"
        ref={aboutSectionFade.ref}
        style={aboutSectionFade.style}
        className={`py-24 lg:py-32 border-b relative transition-colors duration-300 ${
          isDark ? 'bg-[#0E2336]/40 border-[#143C5A]/40' : 'bg-[#FAF6EE] border-[#143C5A]/15'
        }`}
      >
        <div className="max-w-[1240px] mx-auto px-6 space-y-16">
          <RevealOnScroll>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
              <div className="max-w-2xl space-y-4">
                <div className={`text-xs font-mono font-semibold tracking-wider uppercase ${isDark ? 'text-[#D9A441]' : 'text-[#143C5A]'}`}>
                  {t.aboutSection.kicker}
                </div>
                <h2
                  className={`font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance ${
                    isDark ? 'text-[#FAF6EE]' : 'text-[#143C5A]'
                  }`}
                >
                  {t.aboutSection.title}
                </h2>
                <p className={`text-base sm:text-lg leading-relaxed ${isDark ? 'text-[#8FA4BC]' : 'text-[#1D2733]/85'}`}>
                  {t.aboutSection.subtitle}
                </p>
              </div>

              {/* Geographic Coordinates & Origin Badge */}
              <div
                className={`p-4 rounded-2xl border flex flex-col gap-1 text-xs font-mono ${
                  isDark
                    ? 'bg-[#0A1622] border-[#D9A441]/30 text-[#FAF6EE]'
                    : 'bg-white border-[#143C5A]/20 text-[#143C5A] shadow-xs'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#D9A441] animate-pulse" />
                  <span className="font-semibold">{t.aboutSection.originBadge}</span>
                </div>
                <span className={`text-[11px] ${isDark ? 'text-[#8FA4BC]' : 'text-[#6E87A0]'}`}>
                  {t.aboutSection.provenanceValue}
                </span>
              </div>
            </div>
          </RevealOnScroll>

          {/* 4 Story Pillars Grid */}
          <RevealOnScroll delayMs={140}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Pillar 1: The Syene Provenance */}
              <Card3DTilt className="glass-panel-3d p-8 sm:p-10 rounded-2xl space-y-4 border">
                <div className="flex items-center gap-3.5">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center p-2 shrink-0 ${
                    isDark ? 'bg-[#0E2336] border border-[#D9A441]/40 shadow-xs' : 'bg-white border border-[#143C5A]/15 shadow-xs'
                  }`}>
                    <img src="/syene-emblem.png" alt="Syene Solutions Emblem" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <span className={`text-xs font-mono uppercase font-semibold ${isDark ? 'text-[#D9A441]' : 'text-[#143C5A]'}`}>
                      {t.aboutSection.heritageKicker}
                    </span>
                    <h3 className={`font-display text-xl font-bold ${isDark ? 'text-[#FAF6EE]' : 'text-[#143C5A]'}`}>
                      {t.aboutSection.heritageTitle}
                    </h3>
                  </div>
                </div>
                <p className={`text-sm sm:text-base leading-relaxed ${isDark ? 'text-[#8FA4BC]' : 'text-[#1D2733]/85'}`}>
                  {t.aboutSection.heritageText}
                </p>
              </Card3DTilt>

              {/* Pillar 2: The Engineering Mindset */}
              <Card3DTilt className="glass-panel-3d p-8 sm:p-10 rounded-2xl space-y-4 border">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    isDark ? 'bg-[#D9A441]/20 text-[#D9A441]' : 'bg-[#143C5A]/10 text-[#143C5A]'
                  }`}>
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <span className={`text-xs font-mono uppercase font-semibold ${isDark ? 'text-[#D9A441]' : 'text-[#143C5A]'}`}>
                      {language === 'ar' ? 'الانضباط والمعايير' : 'Standards & Discipline'}
                    </span>
                    <h3 className={`font-display text-xl font-bold ${isDark ? 'text-[#FAF6EE]' : 'text-[#143C5A]'}`}>
                      {t.aboutSection.mindsetTitle}
                    </h3>
                  </div>
                </div>
                <p className={`text-sm sm:text-base leading-relaxed ${isDark ? 'text-[#8FA4BC]' : 'text-[#1D2733]/85'}`}>
                  {t.aboutSection.mindsetText}
                </p>
              </Card3DTilt>

              {/* Pillar 3: Collaborative Partnership */}
              <Card3DTilt className="glass-panel-3d p-8 sm:p-10 rounded-2xl space-y-4 border">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    isDark ? 'bg-[#D9A441]/20 text-[#D9A441]' : 'bg-[#143C5A]/10 text-[#143C5A]'
                  }`}>
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <span className={`text-xs font-mono uppercase font-semibold ${isDark ? 'text-[#D9A441]' : 'text-[#143C5A]'}`}>
                      {language === 'ar' ? 'فريق نخبوي متكامل' : 'High-Velocity Strike Team'}
                    </span>
                    <h3 className={`font-display text-xl font-bold ${isDark ? 'text-[#FAF6EE]' : 'text-[#143C5A]'}`}>
                      {t.aboutSection.collaborationTitle}
                    </h3>
                  </div>
                </div>
                <p className={`text-sm sm:text-base leading-relaxed ${isDark ? 'text-[#8FA4BC]' : 'text-[#1D2733]/85'}`}>
                  {t.aboutSection.collaborationText}
                </p>
              </Card3DTilt>

              {/* Pillar 4: Global Reach from Southern Egypt */}
              <Card3DTilt className="glass-panel-3d p-8 sm:p-10 rounded-2xl space-y-4 border">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    isDark ? 'bg-[#D9A441]/20 text-[#D9A441]' : 'bg-[#143C5A]/10 text-[#143C5A]'
                  }`}>
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <span className={`text-xs font-mono uppercase font-semibold ${isDark ? 'text-[#D9A441]' : 'text-[#143C5A]'}`}>
                      {language === 'ar' ? 'نطاق العمل' : 'Global Operations'}
                    </span>
                    <h3 className={`font-display text-xl font-bold ${isDark ? 'text-[#FAF6EE]' : 'text-[#143C5A]'}`}>
                      {t.aboutSection.scaleTitle}
                    </h3>
                  </div>
                </div>
                <p className={`text-sm sm:text-base leading-relaxed ${isDark ? 'text-[#8FA4BC]' : 'text-[#1D2733]/85'}`}>
                  {t.aboutSection.scaleText}
                </p>
              </Card3DTilt>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* 6. Pricing Overview Section with Fade-In-Up Reveal */}
      <section
        id="pricing"
        ref={pricingSectionFade.ref}
        style={pricingSectionFade.style}
        className={`py-24 lg:py-32 border-b transition-colors duration-300 ${
          isDark ? 'border-[#143C5A]/40 bg-[#0A1622]/60' : 'border-[#143C5A]/15 bg-[#FAF6EE]/40'
        }`}
      >
        <div className="max-w-[1240px] mx-auto px-6 space-y-14">
          <RevealOnScroll>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-2xl space-y-3">
                <div className={`text-xs font-mono font-semibold ${isDark ? 'text-[#D9A441]' : 'text-[#143C5A]'}`}>
                  {language === 'ar' ? '٠٥. نماذج تسعير واضحة' : '05. Transparent Pricing Models'}
                </div>
                <h2
                  className={`font-display text-3xl sm:text-4xl font-bold tracking-tight text-balance ${
                    isDark ? 'text-[#FAF6EE]' : 'text-[#143C5A]'
                  }`}
                >
                  {t.pricingSection.title}
                </h2>
                <p className={`text-base leading-relaxed ${isDark ? 'text-[#8FA4BC]' : 'text-[#1D2733]/80'}`}>
                  {t.pricingSection.subtitle}
                </p>
              </div>

              {/* Currency Reference Toggle */}
              <div
                className={`flex items-center gap-2 self-start md:self-auto p-1.5 rounded-xl border ${
                  isDark ? 'bg-[#0E2336] border-[#6E87A0]/35' : 'bg-white border-[#143C5A]/20 shadow-sm'
                }`}
              >
                <span className={`text-xs font-mono px-2 ${isDark ? 'text-[#8FA4BC]' : 'text-[#6E87A0]'}`}>
                  {t.pricingSection.currency}:
                </span>
                <button
                  type="button"
                  onClick={() => setCurrency('USD')}
                  className={`px-3 py-1.5 text-xs font-mono font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    currency === 'USD'
                      ? isDark
                        ? 'bg-[#D9A441] text-[#0A1622] font-bold shadow-md'
                        : 'bg-[#143C5A] text-[#FAF6EE] font-bold shadow-sm'
                      : isDark
                      ? 'text-[#FAF6EE]/70 hover:text-[#FAF6EE]'
                      : 'text-[#143C5A]/80 hover:text-[#143C5A]'
                  }`}
                >
                  {language === 'ar' ? 'دولار ($)' : 'USD ($)'}
                </button>
                <button
                  type="button"
                  onClick={() => setCurrency('EGP')}
                  className={`px-3 py-1.5 text-xs font-mono font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    currency === 'EGP'
                      ? isDark
                        ? 'bg-[#D9A441] text-[#0A1622] font-bold shadow-md'
                        : 'bg-[#143C5A] text-[#FAF6EE] font-bold shadow-sm'
                      : isDark
                      ? 'text-[#FAF6EE]/70 hover:text-[#FAF6EE]'
                      : 'text-[#143C5A]/80 hover:text-[#143C5A]'
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
                        ? 'bg-gradient-to-b from-[#0E2336] via-[#11293F] to-[#0A1622] border-[#D9A441]/50 shadow-[0_0_40px_rgba(217,164,65,0.16)]'
                        : 'bg-gradient-to-b from-white to-[#FDF9F0] border-[#D9A441]/50 shadow-xl'
                      : 'glass-panel-3d'
                  }`}
                >
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className={`text-xs font-mono font-semibold ${isDark ? 'text-[#D9A441]' : 'text-[#143C5A]'}`}>
                        {tier.code}
                      </div>
                      <h3 className={`font-display text-2xl font-bold tracking-tight ${
                        isDark ? 'text-[#FAF6EE]' : 'text-[#143C5A]'
                      }`}>
                        {tierTitle}
                      </h3>
                      <p className={`text-sm leading-relaxed ${isDark ? 'text-[#8FA4BC]' : 'text-[#1D2733]/80'}`}>
                        {tierSubtitle}
                      </p>
                    </div>

                    {/* Price Block */}
                    <div className={`py-4 border-y space-y-1 ${isDark ? 'border-[#143C5A]/40' : 'border-[#143C5A]/15'}`}>
                      {tier.pricingMode === 'starting_from' ? (
                        <div>
                          <div className={`text-xs font-mono ${isDark ? 'text-[#8FA4BC]' : 'text-[#6E87A0]'}`}>
                            {language === 'ar' ? 'تبدأ من (قاعدة قابلة للتخصيص)' : 'Starting from (Configurable Base)'}
                          </div>
                          <div className={`font-mono text-3xl font-bold tracking-tight tabular-nums mt-1 ${
                            isDark ? 'text-[#D9A441]' : 'text-[#143C5A]'
                          }`}>
                            {displayPrice}
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className={`text-xs font-mono ${isDark ? 'text-[#8FA4BC]' : 'text-[#6E87A0]'}`}>
                            {language === 'ar' ? 'تنفيذ بمواصفات معمارية خاصة' : 'Custom Scoped Engagement'}
                          </div>
                          <div className={`font-display text-2xl font-bold tracking-tight mt-1 ${
                            isDark ? 'text-[#D9A441]' : 'text-[#143C5A]'
                          }`}>
                            {t.pricingSection.requestQuote}
                          </div>
                        </div>
                      )}
                      <div className={`text-xs pt-1 ${isDark ? 'text-[#8FA4BC]' : 'text-[#6E87A0]'}`}>
                        {tierNote}
                      </div>
                    </div>

                    <p className={`text-sm leading-relaxed ${isDark ? 'text-[#FAF6EE]/85' : 'text-[#1D2733]/85'}`}>
                      {tierDesc}
                    </p>

                    {/* Included */}
                    <div className="space-y-2.5">
                      <div className={`text-xs font-mono font-medium ${isDark ? 'text-[#D9A441]' : 'text-[#143C5A]'}`}>
                        {t.pricingSection.included}:
                      </div>
                      <ul className={`space-y-2 text-xs leading-relaxed ${
                        isDark ? 'text-[#FAF6EE]/85' : 'text-[#1D2733]'
                      }`}>
                        {tierIncluded.map((inc) => (
                          <li key={inc} className="flex items-start gap-2">
                            <Check
                              className={`w-4 h-4 shrink-0 mt-0.5 ${isDark ? 'text-[#D9A441]' : 'text-[#143C5A]'}`}
                              aria-hidden="true"
                            />
                            <span>{inc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Excluded */}
                    <div className="space-y-2.5 pt-2">
                      <div className={`text-xs font-mono font-medium ${isDark ? 'text-[#8FA4BC]/60' : 'text-[#6E87A0]'}`}>
                        {t.pricingSection.excluded}:
                      </div>
                      <ul className={`space-y-2 text-xs leading-relaxed ${
                        isDark ? 'text-[#8FA4BC]/70' : 'text-[#6E87A0]'
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
                      className={`w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-semibold rounded-xl transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                        isHighlighted
                          ? isDark
                            ? 'syene-gold-gradient text-[#0A1622] hover:opacity-95 shadow-lg font-bold'
                            : 'bg-[#143C5A] text-[#FAF6EE] hover:bg-[#0E2336] shadow-md font-bold'
                          : isDark
                          ? 'bg-[#0E2336] text-[#FAF6EE] hover:bg-[#143C5A] border border-[#6E87A0]/35 hover:border-[#D9A441]/50'
                          : 'bg-[#FAF6EE] text-[#143C5A] hover:bg-white border border-[#143C5A]/20'
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
              <div className={`text-xs font-mono font-semibold ${isDark ? 'text-[#D9A441]' : 'text-[#143C5A]'}`}>
                {t.pricingSection.disclaimerTitle}
              </div>
              <ul className={`space-y-1.5 text-xs leading-relaxed ${isDark ? 'text-[#8FA4BC]' : 'text-[#6E87A0]'}`}>
                {currentDisclaimers.map((note) => (
                  <li key={note} className="flex items-start gap-2">
                    <span className={`font-mono ${isDark ? 'text-[#D9A441]' : 'text-[#143C5A]'}`} aria-hidden="true">
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

      {/* 7. Final CTA Section with Fade-In-Up Reveal */}
      <section
        ref={ctaSectionFade.ref}
        style={ctaSectionFade.style}
        className="py-24 lg:py-32 relative"
      >
        <div className="max-w-[1240px] mx-auto px-6">
          <RevealOnScroll>
            <div
              className={`p-8 sm:p-14 rounded-3xl glass-panel-3d border flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative overflow-hidden ${
                isDark ? 'border-[#D9A441]/30 bg-gradient-to-br from-[#0E2336] via-[#143C5A]/35 to-[#0A1622]' : 'border-[#143C5A]/20 bg-gradient-to-br from-white via-[#FAF6EE] to-[#F7EFE0]'
              }`}
            >
              <div
                className={`absolute -right-20 -bottom-20 w-80 h-80 rounded-full blur-[90px] pointer-events-none ${
                  isDark ? 'bg-[#D9A441]/15' : 'bg-[#143C5A]/10'
                }`}
              />

              <div className="space-y-3 max-w-2xl relative z-10">
                <div className={`text-xs font-mono font-semibold ${isDark ? 'text-[#D9A441]' : 'text-[#143C5A]'}`}>
                  {language === 'ar' ? '٠٦. بدء المشروع والتعاقد' : '06. Project Initiation'}
                </div>
                <h2
                  className={`font-display text-3xl sm:text-4xl font-bold tracking-tight text-balance ${
                    isDark ? 'text-[#FAF6EE]' : 'text-[#143C5A]'
                  }`}
                >
                  {t.finalCta.title}
                </h2>
                <p className={`text-base leading-relaxed ${isDark ? 'text-[#8FA4BC]' : 'text-[#1D2733]/80'}`}>
                  {t.finalCta.subtitle}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 shrink-0 relative z-10">
                <a
                  href="/contact"
                  onClick={(e) => handleLink(e, '/contact')}
                  className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold rounded-xl shadow-md transition-all whitespace-nowrap shrink-0 ${
                    isDark
                      ? 'syene-gold-gradient text-[#0A1622] font-bold shadow-[0_0_24px_rgba(217,164,65,0.28)] hover:shadow-[0_0_32px_rgba(217,164,65,0.48)]'
                      : 'bg-[#143C5A] text-[#FAF6EE] hover:bg-[#0E2336]'
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
                      ? 'text-[#FAF6EE] bg-[#0E2336] border-[#6E87A0]/35 hover:border-[#D9A441]'
                      : 'text-[#143C5A] bg-white border-[#143C5A]/25 hover:border-[#143C5A] hover:bg-[#FAF6EE]/50'
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
