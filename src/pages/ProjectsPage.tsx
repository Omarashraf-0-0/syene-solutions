import React, { useState, useMemo } from 'react';
import { ArrowRight, ArrowLeft, Code2, RotateCcw } from 'lucide-react';
import { PROJECTS } from '../data/projects';
import { ProjectCategory, ProjectStatus } from '../types/project';
import { ProjectCard } from '../components/ProjectCard';
import { PageSEO } from '../components/PageSEO';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

interface ProjectsPageProps {
  onNavigate: (path: string) => void;
}

const CATEGORIES: Array<{ key: 'All' | ProjectCategory; labelEn: string; labelAr: string }> = [
  { key: 'All', labelEn: 'All', labelAr: 'الكل' },
  { key: 'Web & Mobile Development', labelEn: 'Web & Mobile Development', labelAr: 'تطوير الويب والموبايل' },
  { key: 'AI Solutions', labelEn: 'AI Solutions', labelAr: 'حلول الذكاء الاصطناعي' },
  { key: 'Backend & Integrations', labelEn: 'Backend & Integrations', labelAr: 'البنى التحتية والتكامل' },
  { key: 'Maintenance & Improvement', labelEn: 'Maintenance & Improvement', labelAr: 'الصيانة والتطوير' },
];

const STATUSES: Array<{ key: 'All' | ProjectStatus; labelEn: string; labelAr: string }> = [
  { key: 'All', labelEn: 'All', labelAr: 'الكل' },
  { key: 'Live', labelEn: 'Live', labelAr: 'نشط للإنتاج' },
  { key: 'Prototype', labelEn: 'Prototype', labelAr: 'نموذج أولي' },
  { key: 'Completed', labelEn: 'Completed', labelAr: 'مكتمل ومسلّم' },
];

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | ProjectCategory>('All');
  const [selectedStatus, setSelectedStatus] = useState<'All' | ProjectStatus>('All');
  const [showSchemaGuide, setShowSchemaGuide] = useState(false);
  const { theme } = useTheme();
  const { language, isRTL, t } = useLanguage();
  const isDark = theme === 'dark';
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((project) => {
      const matchesCategory =
        selectedCategory === 'All' || project.category === selectedCategory;
      const matchesStatus = selectedStatus === 'All' || project.status === selectedStatus;
      return matchesCategory && matchesStatus;
    });
  }, [selectedCategory, selectedStatus]);

  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedStatus('All');
  };

  return (
    <main className="min-h-screen tech-grid-bg transition-colors duration-300">
      <PageSEO
        title={
          language === 'ar'
            ? 'معرض المشاريع ودراسات الحالة الهندسية | سايين سوليوشنز'
            : 'Project Portfolio & 3D Case Studies | Syene Solutions — Software & AI Studio'
        }
        description={
          language === 'ar'
            ? 'استعرض مشاريعنا في هندسة البرمجيات، وتطبيقات الويب والموبايل، وحلول الذكاء الاصطناعي التطبيقية من سايين سوليوشنز.'
            : 'Explore software engineering, web and mobile development, and applied AI case studies by Syene Solutions.'
        }
        path="/projects"
      />

      {/* Portfolio Header with Crimson Ambient Glow */}
      <section
        className={`py-16 lg:py-24 border-b relative transition-colors duration-300 ${
          isDark
            ? 'syene-ambient-glow text-[#FAF6EE] border-[#143C5A]/50'
            : 'bg-gradient-to-b from-[#FAF6EE] to-[#F1ECE0] text-[#0A1622] border-[#143C5A]/15'
        }`}
      >
        <div className="max-w-[1240px] mx-auto px-6 space-y-6">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <span className={`font-semibold ${isDark ? 'text-[#D9A441]' : 'text-[#143C5A]'}`}>
              {t.portfolioPage.kicker}
            </span>
            <span aria-hidden="true" className={isDark ? 'text-[#FAF6EE]/30' : 'text-[#143C5A]/30'}>
              ·
            </span>
            <span className={`tabular-nums ${isDark ? 'text-[#FAF6EE]/80' : 'text-[#143C5A]/80'}`}>
              {PROJECTS.length} {language === 'ar' ? 'مشاريع موثقة' : 'Documented Projects'}
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <h1 className={`font-display text-4xl sm:text-5xl font-bold tracking-tight ${
                isDark ? 'text-[#FAF6EE]' : 'text-[#0A1622]'
              }`}>
                {t.portfolioPage.title}
              </h1>
              <p className={`text-base sm:text-lg leading-relaxed ${
                isDark ? 'text-[#FAF6EE]/80' : 'text-[#143C5A]/85'
              }`}>
                {t.portfolioPage.subtitle}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowSchemaGuide((prev) => !prev)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 text-xs font-mono font-medium rounded-xl border transition-colors self-start lg:self-auto whitespace-nowrap shrink-0 shadow-sm ${
                isDark
                  ? 'text-[#FAF6EE] bg-[#0E2336] border-[#143C5A]/70 hover:border-[#D9A441] hover:text-[#D9A441]'
                  : 'text-[#0A1622] bg-white border-[#143C5A]/25 hover:border-[#143C5A] hover:bg-[#FAF6EE]/40'
              }`}
            >
              <Code2 className={`w-4 h-4 ${isDark ? 'text-[#D9A441]' : 'text-[#143C5A]'}`} aria-hidden="true" />
              <span>
                {showSchemaGuide
                  ? (language === 'ar' ? 'إخفاء دليل البيانات' : 'Hide Replacement Guide')
                  : (language === 'ar' ? 'دليل استبدال بيانات المشاريع' : 'Content Replacement Guide')}
              </span>
            </button>
          </div>

          {/* Interactive Schema Guide Drawer for Replacing Placeholders */}
          {showSchemaGuide && (
            <div
              className={`mt-6 p-6 rounded-2xl glass-panel-3d border text-xs space-y-3 ${
                isDark ? 'border-[#D9A441]/35 bg-[#0E2336]/90 text-[#FAF6EE]' : 'border-[#143C5A]/30 bg-white/95 text-[#0A1622]'
              }`}
            >
              <div className={`font-mono font-semibold ${isDark ? 'text-[#D9A441]' : 'text-[#143C5A]'}`}>
                {language === 'ar'
                  ? 'تحديث بيانات المشاريع في الملف (src/data/projects.ts)'
                  : 'Manage Projects Data (src/data/projects.ts)'}
              </div>
              <p className="opacity-80 leading-relaxed">
                {language === 'ar'
                  ? 'يمكنك استبدال أي مشروع تجريبي ببيانات مشروعك الحقيقي بسهولة عبر تعديل حقول: title, client, metrics, technologies, coverImage.'
                  : 'Easily customize any project item with real company case studies by editing title, client, metrics, technologies, and coverImage in src/data/projects.ts.'}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Filter Controls & 3D Grid */}
      <section className="py-14 lg:py-20">
        <div className="max-w-[1240px] mx-auto px-6 space-y-10">
          {/* Interactive Filter Controls Bar */}
          <div className={`flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b ${
            isDark ? 'border-[#143C5A]/50' : 'border-[#143C5A]/15'
          }`}>
            {/* Category Filter Buttons */}
            <div className="space-y-2">
              <span className={`block text-xs font-mono ${isDark ? 'text-[#FAF6EE]/60' : 'text-[#143C5A]/70'}`}>
                {t.portfolioPage.filterCategory}
              </span>
              <div
                role="group"
                aria-label="Filter projects by category"
                className={`flex flex-wrap items-center gap-1.5 p-1 border rounded-xl ${
                  isDark ? 'bg-[#0E2336] border-[#143C5A]/70' : 'bg-white border-[#143C5A]/20 shadow-sm'
                }`}
              >
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.key}
                    type="button"
                    onClick={() => setSelectedCategory(cat.key)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                      selectedCategory === cat.key
                        ? isDark
                          ? 'bg-[#D9A441] text-[#FAF6EE] font-bold shadow-md'
                          : 'bg-[#143C5A] text-[#FAF6EE] font-bold shadow-sm'
                        : isDark
                        ? 'text-[#FAF6EE]/70 hover:text-[#FAF6EE] hover:bg-[#143C5A]/30'
                        : 'text-[#143C5A]/80 hover:text-[#0A1622] hover:bg-[#FAF6EE]'
                    }`}
                  >
                    {language === 'ar' ? cat.labelAr : cat.labelEn}
                  </button>
                ))}
              </div>
            </div>

            {/* Status Filter Buttons */}
            <div className="space-y-2">
              <span className={`block text-xs font-mono ${isDark ? 'text-[#FAF6EE]/60' : 'text-[#143C5A]/70'}`}>
                {t.portfolioPage.filterStatus}
              </span>
              <div
                role="group"
                aria-label="Filter projects by status"
                className={`inline-flex flex-wrap items-center gap-1.5 p-1 border rounded-xl ${
                  isDark ? 'bg-[#0E2336] border-[#143C5A]/70' : 'bg-white border-[#143C5A]/20 shadow-sm'
                }`}
              >
                {STATUSES.map((st) => (
                  <button
                    key={st.key}
                    type="button"
                    onClick={() => setSelectedStatus(st.key)}
                    className={`px-3 py-1.5 text-xs font-mono font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                      selectedStatus === st.key
                        ? isDark
                          ? 'bg-[#D9A441] text-[#FAF6EE] font-bold shadow-md'
                          : 'bg-[#143C5A] text-[#FAF6EE] font-bold shadow-sm'
                        : isDark
                        ? 'text-[#FAF6EE]/70 hover:text-[#FAF6EE] hover:bg-[#143C5A]/30'
                        : 'text-[#143C5A]/80 hover:text-[#0A1622] hover:bg-[#FAF6EE]'
                    }`}
                  >
                    {language === 'ar' ? st.labelAr : st.labelEn}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Count & Active Filter Reset */}
          <div className={`flex items-center justify-between text-xs font-mono ${
            isDark ? 'text-[#FAF6EE]/65' : 'text-[#143C5A]/70'
          }`}>
            <span className="tabular-nums">
              {language === 'ar'
                ? `عرض ${filteredProjects.length} من أصل ${PROJECTS.length} مشاريع`
                : `Showing ${filteredProjects.length} of ${PROJECTS.length} projects`}
            </span>
            {(selectedCategory !== 'All' || selectedStatus !== 'All') && (
              <button
                type="button"
                onClick={resetFilters}
                className={`inline-flex items-center gap-1.5 font-semibold hover:underline ${
                  isDark ? 'text-[#D9A441]' : 'text-[#143C5A]'
                }`}
              >
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{t.portfolioPage.resetFilters}</span>
              </button>
            )}
          </div>

          {/* Project Cards or Empty State */}
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  onSelectProject={(slug) => onNavigate(`/projects/${slug}`)}
                />
              ))}
            </div>
          ) : (
            <div className="p-12 rounded-2xl glass-panel-3d text-center space-y-4">
              <div className={`text-sm font-mono ${isDark ? 'text-[#D9A441]' : 'text-[#143C5A]'}`}>
                {t.portfolioPage.noResults}
              </div>
              <h2 className={`font-display text-2xl font-bold ${isDark ? 'text-[#FAF6EE]' : 'text-[#0A1622]'}`}>
                {t.portfolioPage.noResultsDesc}
              </h2>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={resetFilters}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-xl transition-colors ${
                    isDark
                      ? 'syene-gold-gradient text-[#FAF6EE] font-bold shadow-md'
                      : 'bg-[#143C5A] text-[#FAF6EE]'
                  }`}
                >
                  <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{t.portfolioPage.resetFilters}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Bottom Portfolio CTA */}
      <section className={`py-16 border-t ${
        isDark ? 'bg-[#0E2336]/30 border-[#143C5A]/50' : 'bg-[#FAF6EE]/50 border-[#143C5A]/15'
      }`}>
        <div className="max-w-[1240px] mx-auto px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <h2 className={`font-display text-2xl font-bold ${isDark ? 'text-[#FAF6EE]' : 'text-[#0A1622]'}`}>
              {language === 'ar' ? 'هل تحتاج إلى حل تقني مخصص أو تطوير خاص؟' : 'Need a custom solution or adaptation?'}
            </h2>
            <p className={`text-sm ${isDark ? 'text-[#FAF6EE]/75' : 'text-[#143C5A]/80'}`}>
              {language === 'ar'
                ? 'أخبرنا عن متطلبات مشروعك، والجدول الزمني المفضل لديك.'
                : 'Tell us about your project requirements and desired timeline.'}
            </p>
          </div>
          <a
            href="/contact"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/contact');
            }}
            className={`inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold rounded-xl shadow-md transition-all whitespace-nowrap shrink-0 ${
              isDark
                ? 'syene-gold-gradient text-[#0A1622] font-bold shadow-[0_0_20px_rgba(217,164,65,0.28)] hover:shadow-[0_0_28px_rgba(217,164,65,0.45)]'
                : 'bg-[#143C5A] text-[#FAF6EE] hover:bg-[#0E2336]'
            }`}
          >
            <span>{t.common.startProject}</span>
            <ArrowIcon className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        </div>
      </section>
    </main>
  );
};
