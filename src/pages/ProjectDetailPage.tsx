import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, ExternalLink, X, Layers } from 'lucide-react';
import { motion } from 'motion/react';
import { getProjectBySlug, getRelatedProjects } from '../data/projects';
import { ProjectCard } from '../components/ProjectCard';
import { ProjectBadge } from '../components/ProjectBadge';
import { ReadingProgressBar } from '../components/ReadingProgressBar';
import { ResilientImage } from '../components/ResilientImage';
import { PageSEO } from '../components/PageSEO';
import { Card3DTilt } from '../components/3d/Card3DTilt';
import { ProjectImageCarousel } from '../components/ProjectImageCarousel';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

interface ProjectDetailPageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({ slug, onNavigate }) => {
  const project = getProjectBySlug(slug);
  const { theme } = useTheme();
  const { language, isRTL, t } = useLanguage();
  const isDark = theme === 'dark';
  const BackArrow = isRTL ? ArrowRight : ArrowLeft;
  const ForwardArrow = isRTL ? ArrowLeft : ArrowRight;

  const [lightboxImage, setLightboxImage] = useState<{
    url: string;
    alt: string;
    caption: string;
  } | null>(null);

  if (!project) {
    return (
      <main className="min-h-[70vh] flex items-center justify-center px-6 py-20 bg-transparent">
        <PageSEO
          title={language === 'ar' ? 'المشروع غير موجود | سايين سوليوشنز' : 'Project Not Found | Syene Solutions — Software & AI Studio'}
          description={language === 'ar' ? 'تعذر العثور على دراسة الحالة المطلوبة.' : 'The requested project case study could not be found.'}
          path={`/projects/${slug}`}
        />
        <div className="max-w-md w-full p-8 rounded-2xl glass-panel-3d text-center space-y-4">
          <div className={`text-xs font-mono font-semibold ${isDark ? 'text-[#D9A441]' : 'text-[#143C5A]'}`}>
            {language === 'ar' ? '٤٠٤ · دراسة الحالة غير متوفرة' : '404 · Case Study Not Found'}
          </div>
          <h1 className={`font-display text-2xl font-bold ${isDark ? 'text-[#FAF6EE]' : 'text-[#0A1622]'}`}>
            {language === 'ar' ? 'دراسة حالة المشروع غير متاحة' : 'Project case study unavailable'}
          </h1>
          <p className={`text-sm leading-relaxed ${isDark ? 'text-[#FAF6EE]/75' : 'text-[#143C5A]/80'}`}>
            {language === 'ar'
              ? `تعذر العثور على مشروع يطابق المعرف "${slug}". يرجى العودة إلى صفحة المشاريع.`
              : `We couldn't find a project matching "${slug}". Return to the portfolio index to browse available work.`}
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => onNavigate('/projects')}
              className={`inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-xl transition-colors ${
                isDark
                  ? 'syene-gold-gradient text-[#0A1622] font-bold shadow-md'
                  : 'bg-[#143C5A] text-[#FAF6EE]'
              }`}
            >
              <BackArrow className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{t.projectDetail.backToProjects}</span>
            </button>
          </div>
        </div>
      </main>
    );
  }

  const currentTitle = language === 'ar' && project.titleAr ? project.titleAr : project.title;
  const currentCategory = language === 'ar' && project.categoryAr ? project.categoryAr : project.category;
  const currentStatus = language === 'ar' && project.statusAr ? project.statusAr : project.status;
  const currentShortDesc = language === 'ar' && project.shortDescriptionAr ? project.shortDescriptionAr : project.shortDescription;
  const currentProblem = language === 'ar' && project.problemStatementAr ? project.problemStatementAr : project.problemStatement;
  const currentSolution = language === 'ar' && project.solutionOverviewAr ? project.solutionOverviewAr : project.solutionOverview;
  const currentFeatures = language === 'ar' && project.keyFeaturesAr ? project.keyFeaturesAr : project.keyFeatures;
  const currentContributions = language === 'ar' && project.nubixContributionAr ? project.nubixContributionAr : project.nubixContribution;

  const relatedProjects = getRelatedProjects(project.slug, 2);

  return (
    <main className="min-h-screen tech-grid-bg transition-colors duration-300">
      {/* Thin reading progress bar with Crimson Noir Gradient */}
      <ReadingProgressBar showBadge={false} />

      <PageSEO
        title={`${currentTitle} — ${language === 'ar' ? 'دراسة حالة هندسية' : 'Case Study'} | Syene Solutions`}
        description={currentShortDesc}
        path={`/projects/${project.slug}`}
        ogType="article"
      />

      {/* 1. Project Hero with Crimson Ambient Glow */}
      <section
        className={`py-14 lg:py-20 border-b relative transition-colors duration-300 ${
          isDark
            ? 'syene-ambient-glow text-[#FAF6EE] border-[#143C5A]/50'
            : 'bg-gradient-to-b from-[#FAF6EE] to-[#F1ECE0] text-[#0A1622] border-[#143C5A]/15'
        }`}
      >
        <div className="max-w-[1240px] mx-auto px-6 space-y-8">
          <div>
            <a
              href="/projects"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/projects');
              }}
              className={`inline-flex items-center gap-2 text-xs font-mono font-semibold hover:underline transition-colors ${
                isDark ? 'text-[#D9A441]' : 'text-[#143C5A]'
              }`}
            >
              <BackArrow className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{t.projectDetail.backToProjects}</span>
            </a>
          </div>

          <div className="space-y-4 max-w-3xl">
            {/* Unboxed Metadata Row */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className={`flex flex-wrap items-center gap-2.5 text-xs font-mono ${
                isDark ? 'text-[#D9A441]' : 'text-[#143C5A]'
              }`}
            >
              <span className="font-semibold">{currentCategory}</span>
              <span aria-hidden="true" className={isDark ? 'text-[#FAF6EE]/30' : 'text-[#143C5A]/30'}>·</span>
              <span className={isDark ? 'text-[#FAF6EE]' : 'text-[#0A1622]'}>
                {language === 'ar' ? 'الحالة التشغيلية:' : 'Status:'} {currentStatus}
              </span>
              {project.isPlaceholder && (
                <>
                  <span aria-hidden="true" className={isDark ? 'text-[#FAF6EE]/30' : 'text-[#143C5A]/30'}>·</span>
                  <span className={isDark ? 'text-[#FAF6EE]/60' : 'text-[#143C5A]/65'}>
                    {language === 'ar' ? 'دراسة حالة مفصلة' : 'Detailed Case Study'}
                  </span>
                </>
              )}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className={`font-display text-3xl sm:text-5xl font-bold tracking-tight ${
                isDark ? 'text-[#FAF6EE]' : 'text-[#0A1622]'
              }`}
            >
              {currentTitle}
            </motion.h1>

            {/* Project Short Description */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className={`text-base sm:text-lg leading-relaxed ${
                isDark ? 'text-[#FAF6EE]/80' : 'text-[#143C5A]/85'
              }`}
            >
              {currentShortDesc}
            </motion.p>

            {/* Public Demo & Repo Links */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-xl transition-colors whitespace-nowrap shrink-0 shadow-md ${
                    isDark
                      ? 'syene-gold-gradient text-[#0A1622] font-bold shadow-[0_0_16px_rgba(217,164,65,0.25)]'
                      : 'bg-[#143C5A] text-[#FAF6EE] hover:bg-[#0E2336]'
                  }`}
                >
                  <span>{t.projectDetail.liveDemo}</span>
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              )}
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-xl border transition-colors whitespace-nowrap shrink-0 ${
                    isDark
                      ? 'bg-[#0E2336] text-[#FAF6EE] border-[#143C5A]/70 hover:border-[#D9A441]'
                      : 'bg-white text-[#0A1622] border-[#143C5A]/25 hover:border-[#143C5A] hover:bg-[#FAF6EE]/30'
                  }`}
                >
                  <span>{t.projectDetail.repoUrl}</span>
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              )}
              {project.gallery.length > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    document.getElementById('interface-gallery')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-xl border transition-colors whitespace-nowrap shrink-0 ${
                    isDark
                      ? 'bg-[#0E2336] text-[#D9A441] border-[#D9A441]/35 hover:bg-[#0E2336]/40'
                      : 'bg-[#FAF6EE] text-[#143C5A] border-[#143C5A]/30 hover:bg-[#F1ECE0]'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>
                    {language === 'ar'
                      ? `معرض الواجهات (${project.gallery.length} لقطات)`
                      : `UI Carousel (${project.gallery.length} Views)`}
                  </span>
                </button>
              )}
              <a
                href={`/contact?project=${project.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(`/contact?project=${project.slug}`);
                }}
                className={`inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-xl border transition-colors whitespace-nowrap shrink-0 ${
                  isDark
                    ? 'bg-[#0E2336] text-[#FAF6EE] border-[#143C5A]/70 hover:border-[#D9A441] hover:text-[#D9A441]'
                    : 'bg-white text-[#0A1622] border-[#143C5A]/25 hover:border-[#143C5A] hover:bg-[#FAF6EE]/30'
                }`}
              >
                <span>{t.projectDetail.startSimilar}</span>
                <ForwardArrow className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </motion.div>
          </div>

          {/* Primary Cover Image with 3D Depth Card & Carousel Indicator */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              onClick={() => {
                document.getElementById('interface-gallery')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="cursor-pointer group relative"
              title={language === 'ar' ? 'انقر لاستعراض معرض الشاشات والواجهات' : 'Click to explore full screenshot & mockup carousel below'}
            >
              <Card3DTilt
                className={`rounded-2xl overflow-hidden border aspect-video shadow-2xl relative ${
                  isDark ? 'border-[#143C5A]/60 bg-[#0E2336]' : 'border-[#143C5A]/20 bg-white'
                }`}
              >
                <ResilientImage
                  src={project.coverImage}
                  alt={project.coverImageAlt}
                  priority
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.015]"
                />

                {/* Floating Carousel Indicator Badge */}
                <div className="absolute bottom-4 right-4 z-20">
                  <span
                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-mono font-medium backdrop-blur-md border shadow-lg transition-transform duration-200 group-hover:scale-105 ${
                      isDark
                        ? 'bg-[#0A1622]/85 text-[#D9A441] border-[#D9A441]/30'
                        : 'bg-white/95 text-[#143C5A] border-[#143C5A]/30'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>
                      {language === 'ar'
                        ? `استعرض ${project.gallery.length} واجهات في المعرض ▾`
                        : `Explore ${project.gallery.length} UI Views in Carousel ▾`}
                    </span>
                  </span>
                </div>
              </Card3DTilt>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Case Study Body */}
      <section className={`py-16 lg:py-24 border-b ${isDark ? 'border-[#143C5A]/50' : 'border-[#143C5A]/15'}`}>
        <div className="max-w-[1240px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Narrative Column */}
          <div className="lg:col-span-8 space-y-12">
            {/* Challenge */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-3"
            >
              <div className={`text-xs font-mono font-semibold ${isDark ? 'text-[#D9A441]' : 'text-[#143C5A]'}`}>
                {language === 'ar' ? '٠١ · التحدي' : '01 · The Challenge'}
              </div>
              <h2 className={`font-display text-2xl sm:text-3xl font-bold ${isDark ? 'text-[#FAF6EE]' : 'text-[#0A1622]'}`}>
                {t.projectDetail.problemStatement}
              </h2>
              <p className={`text-base leading-relaxed ${isDark ? 'text-[#FAF6EE]/80' : 'text-[#143C5A]/85'}`}>
                {currentProblem}
              </p>
            </motion.div>

            {/* Solution Overview */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className={`space-y-3 pt-8 border-t ${isDark ? 'border-[#143C5A]/50' : 'border-[#143C5A]/15'}`}
            >
              <div className={`text-xs font-mono font-semibold ${isDark ? 'text-[#D9A441]' : 'text-[#143C5A]'}`}>
                {language === 'ar' ? '٠٢ · المنهج الهندسي' : '02 · Architectural Approach'}
              </div>
              <h2 className={`font-display text-2xl sm:text-3xl font-bold ${isDark ? 'text-[#FAF6EE]' : 'text-[#0A1622]'}`}>
                {t.projectDetail.solutionOverview}
              </h2>
              <p className={`text-base leading-relaxed ${isDark ? 'text-[#FAF6EE]/80' : 'text-[#143C5A]/85'}`}>
                {currentSolution}
              </p>
            </motion.div>

            {/* Key Features */}
            <div className={`space-y-4 pt-8 border-t ${isDark ? 'border-[#143C5A]/50' : 'border-[#143C5A]/15'}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-1"
              >
                <div className={`text-xs font-mono font-semibold ${isDark ? 'text-[#D9A441]' : 'text-[#143C5A]'}`}>
                  {language === 'ar' ? '٠٣ · قدرات النظام' : '03 · System Capabilities'}
                </div>
                <h2 className={`font-display text-2xl sm:text-3xl font-bold ${isDark ? 'text-[#FAF6EE]' : 'text-[#0A1622]'}`}>
                  {t.projectDetail.keyFeatures}
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {currentFeatures.map((feature, idx) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, y: 26, scale: 0.98 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: '-30px' }}
                    transition={{
                      duration: 0.55,
                      delay: idx * 0.08,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="h-full"
                  >
                    <Card3DTilt
                      className="p-5 rounded-xl glass-panel-3d space-y-2 h-full flex flex-col justify-between"
                    >
                      <div className={`text-xs font-mono font-semibold tabular-nums ${
                        isDark ? 'text-[#D9A441]' : 'text-[#143C5A]'
                      }`}>
                        {language === 'ar' ? `الميزة ٠${idx + 1}` : `Feature 0${idx + 1}`}
                      </div>
                      <p className={`text-sm font-medium leading-relaxed ${
                        isDark ? 'text-[#FAF6EE]' : 'text-[#0A1622]'
                      }`}>
                        {feature}
                      </p>
                    </Card3DTilt>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Verified Outcomes */}
            {project.verifiedOutcomes && project.verifiedOutcomes.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className={`space-y-4 pt-8 border-t ${isDark ? 'border-[#143C5A]/50' : 'border-[#143C5A]/15'}`}
              >
                <div className={`text-xs font-mono font-semibold ${isDark ? 'text-[#D9A441]' : 'text-[#143C5A]'}`}>
                  {language === 'ar' ? '٠٤ · النتائج الموثقة' : '04 · Verified Outcomes'}
                </div>
                <h2 className={`font-display text-2xl sm:text-3xl font-bold ${isDark ? 'text-[#FAF6EE]' : 'text-[#0A1622]'}`}>
                  {t.projectDetail.verifiedOutcomes}
                </h2>
                <ul className="space-y-3">
                  {project.verifiedOutcomes.map((outcome, idx) => (
                    <motion.li
                      key={outcome}
                      initial={{ opacity: 0, x: isRTL ? 16 : -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-20px' }}
                      transition={{
                        duration: 0.45,
                        delay: idx * 0.08,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="p-4 rounded-xl glass-panel-3d flex items-start gap-3 text-sm"
                    >
                      <Check
                        className={`w-4 h-4 shrink-0 mt-0.5 ${isDark ? 'text-[#D9A441]' : 'text-[#143C5A]'}`}
                        aria-hidden="true"
                      />
                      <span className={isDark ? 'text-[#FAF6EE]/85' : 'text-[#143C5A]'}>{outcome}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Gallery: Responsive Image Carousel */}
            {project.gallery.length > 0 && (
              <motion.div
                id="interface-gallery"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className={`space-y-4 pt-8 border-t scroll-mt-24 ${isDark ? 'border-[#143C5A]/50' : 'border-[#143C5A]/15'}`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className={`text-xs font-mono font-semibold ${isDark ? 'text-[#D9A441]' : 'text-[#143C5A]'}`}>
                      {language === 'ar' ? '٠٥ · معرض الواجهات والنماذج' : '05 · Interface Gallery & Mockups'}
                    </div>
                    <h2 className={`font-display text-2xl sm:text-3xl font-bold ${isDark ? 'text-[#FAF6EE]' : 'text-[#0A1622]'}`}>
                      {t.projectDetail.galleryTitle}
                    </h2>
                  </div>
                  <div
                    className={`inline-flex items-center gap-2 text-xs font-mono px-3 py-1 rounded-full border self-start sm:self-auto ${
                      isDark
                        ? 'bg-[#0E2336] text-[#D9A441] border-[#D9A441]/30'
                        : 'bg-white text-[#143C5A] border-[#143C5A]/30'
                    }`}
                  >
                    <span>
                      {language === 'ar'
                        ? `اسحب أو استخدم الأسهم للتنقل · ${project.gallery.length} واجهات`
                        : `Swipe or click arrows · ${project.gallery.length} Views`}
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  <ProjectImageCarousel
                    items={project.gallery}
                    projectTitle={currentTitle}
                    onOpenLightbox={(item) => setLightboxImage(item)}
                  />
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="p-6 rounded-2xl glass-panel-3d space-y-6"
            >
              {/* Project Metadata */}
              <div className={`space-y-3 pb-6 border-b ${isDark ? 'border-[#143C5A]/50' : 'border-[#143C5A]/15'}`}>
                <h3 className={`text-xs font-mono font-semibold ${isDark ? 'text-[#D9A441]' : 'text-[#143C5A]'}`}>
                  {language === 'ar' ? 'التصنيف' : 'Classification'}
                </h3>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between gap-2">
                    <dt className={isDark ? 'text-[#FAF6EE]/60' : 'text-[#143C5A]/70'}>
                      {language === 'ar' ? 'المجال' : 'Category'}
                    </dt>
                    <dd className={`font-medium text-right ${isDark ? 'text-[#FAF6EE]' : 'text-[#0A1622]'}`}>
                      {currentCategory}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className={isDark ? 'text-[#FAF6EE]/60' : 'text-[#143C5A]/70'}>
                      {language === 'ar' ? 'الحالة الحالية' : 'Current Status'}
                    </dt>
                    <dd className={`font-mono font-semibold ${isDark ? 'text-[#D9A441]' : 'text-[#143C5A]'}`}>
                      {currentStatus}
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Syene Solutions Contribution */}
              <div className={`space-y-3 pb-6 border-b ${isDark ? 'border-[#143C5A]/50' : 'border-[#143C5A]/15'}`}>
                <h3 className={`text-xs font-mono font-semibold ${isDark ? 'text-[#D9A441]' : 'text-[#143C5A]'}`}>
                  {t.projectDetail.nubixContribution}
                </h3>
                <ul className={`space-y-2 text-xs leading-relaxed ${isDark ? 'text-[#FAF6EE]/80' : 'text-[#143C5A]'}`}>
                  {currentContributions.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className={`font-mono ${isDark ? 'text-[#D9A441]' : 'text-[#143C5A]'}`} aria-hidden="true">
                        ▸
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technology Stack */}
              <div className={`space-y-3 pb-6 border-b ${isDark ? 'border-[#143C5A]/50' : 'border-[#143C5A]/15'}`}>
                <h3 className={`text-xs font-mono font-semibold ${isDark ? 'text-[#D9A441]' : 'text-[#143C5A]'}`}>
                  {t.projectDetail.technologies}
                </h3>
                <div className="flex flex-wrap gap-2 pt-1">
                  {project.technologies.map((tech) => (
                    <ProjectBadge key={tech} tech={tech} size="sm" />
                  ))}
                </div>
              </div>

              {/* Direct Inquiry CTA */}
              <div className="space-y-3">
                <h3 className={`font-display text-base font-bold ${isDark ? 'text-[#FAF6EE]' : 'text-[#0A1622]'}`}>
                  {language === 'ar' ? 'هل تخطط لبناء نظام مشابه؟' : 'Planning a similar system?'}
                </h3>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-[#FAF6EE]/70' : 'text-[#143C5A]/80'}`}>
                  {language === 'ar'
                    ? 'اطلب تكييف حل جاهز أو مقترح بناء مخصص بالكامل وفق هذه البنية الهندسية.'
                    : 'Request a Ready-Made adaptation or a custom-scoped proposal based on this architecture.'}
                </p>
                <a
                  href={`/contact?project=${project.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(`/contact?project=${project.slug}`);
                  }}
                  className={`w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-semibold rounded-xl shadow-md transition-all whitespace-nowrap shrink-0 ${
                    isDark
                      ? 'syene-gold-gradient text-[#0A1622] font-bold shadow-[0_0_16px_rgba(217,164,65,0.25)] hover:shadow-[0_0_24px_rgba(217,164,65,0.45)]'
                      : 'bg-[#143C5A] text-[#FAF6EE] hover:bg-[#0E2336]'
                  }`}
                >
                  <span>{t.projectDetail.startSimilar}</span>
                  <ForwardArrow className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </div>
            </motion.div>
          </aside>
        </div>
      </section>

      {/* 3. Related Projects */}
      {relatedProjects.length > 0 && (
        <section className={`py-16 lg:py-24 ${isDark ? 'bg-[#0E2336]/30' : 'bg-[#FAF6EE]/50'}`}>
          <div className="max-w-[1240px] mx-auto px-6 space-y-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className={`text-xs font-mono font-semibold ${isDark ? 'text-[#D9A441]' : 'text-[#143C5A]'}`}>
                  {language === 'ar' ? 'المزيد من استوديو سايين سوليوشنز' : 'More From Syene Solutions'}
                </div>
                <h2 className={`font-display text-2xl sm:text-3xl font-bold ${isDark ? 'text-[#FAF6EE]' : 'text-[#0A1622]'}`}>
                  {t.projectDetail.relatedProjects}
                </h2>
              </div>
              <a
                href="/projects"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/projects');
                }}
                className={`text-xs font-semibold hover:underline whitespace-nowrap shrink-0 ${
                  isDark ? 'text-[#D9A441]' : 'text-[#143C5A]'
                }`}
              >
                {t.projectDetail.backToProjects}
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedProjects.map((rel) => (
                <ProjectCard
                  key={rel.slug}
                  project={rel}
                  onSelectProject={(targetSlug) => onNavigate(`/projects/${targetSlug}`)}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Lightbox Modal for Gallery */}
      {lightboxImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lightboxImage.alt}
          className={`fixed inset-0 z-50 backdrop-blur-md flex items-center justify-center p-6 ${
            isDark ? 'bg-[#0A1622]/95' : 'bg-[#0A1622]/80'
          }`}
          onClick={() => setLightboxImage(null)}
        >
          <div
            className={`max-w-4xl w-full border rounded-2xl overflow-hidden shadow-2xl ${
              isDark ? 'bg-[#0E2336] border-[#D9A441]/40' : 'bg-white border-[#143C5A]/30'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`flex items-center justify-between px-5 py-3 border-b ${
              isDark ? 'border-[#143C5A]/50 text-[#FAF6EE]' : 'border-[#143C5A]/15 text-[#0A1622]'
            }`}>
              <span className={`text-xs font-mono font-semibold truncate ${
                isDark ? 'text-[#D9A441]' : 'text-[#143C5A]'
              }`}>
                {lightboxImage.alt}
              </span>
              <button
                type="button"
                onClick={() => setLightboxImage(null)}
                aria-label={language === 'ar' ? 'إغلاق المعاينة' : 'Close image preview'}
                className={`p-1.5 rounded-lg ${isDark ? 'hover:bg-[#0A1622] text-[#FAF6EE]' : 'hover:bg-[#FAF6EE] text-[#0A1622]'}`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className={`aspect-video ${isDark ? 'bg-[#0A1622]' : 'bg-[#FAF6EE]/30'}`}>
              <ResilientImage
                src={lightboxImage.url}
                alt={lightboxImage.alt}
                className="w-full h-full object-contain"
              />
            </div>
            <div className={`p-4 text-xs border-t ${
              isDark ? 'text-[#FAF6EE]/80 border-[#143C5A]/50' : 'text-[#143C5A]/80 border-[#143C5A]/15'
            }`}>
              {lightboxImage.caption}
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
