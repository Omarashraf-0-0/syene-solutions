import React from 'react';
import { ArrowRight, ArrowLeft, ExternalLink } from 'lucide-react';
import { Project } from '../types/project';
import { ResilientImage } from './ResilientImage';
import { Card3DTilt } from './3d/Card3DTilt';
import { ProjectBadge } from './ProjectBadge';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

interface ProjectCardProps {
  project: Project;
  onSelectProject: (slug: string) => void;
  featured?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onSelectProject,
  featured = false,
}) => {
  const { theme } = useTheme();
  const { language, isRTL, t } = useLanguage();
  const isDark = theme === 'dark';

  const title = (language === 'ar' && project.titleAr) ? project.titleAr : project.title;
  const description = (language === 'ar' && project.shortDescriptionAr) ? project.shortDescriptionAr : project.shortDescription;
  const category = (language === 'ar' && project.categoryAr) ? project.categoryAr : project.category;
  const status = (language === 'ar' && project.statusAr) ? project.statusAr : project.status;

  const handleCardClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onSelectProject(project.slug);
  };

  return (
    <Card3DTilt
      className={`group glass-panel-3d rounded-2xl flex flex-col justify-between transition-all duration-300 ${
        featured ? 'md:col-span-2 lg:col-span-1' : ''
      }`}
    >
      <article className="flex flex-col justify-between h-full">
        <div>
          {/* Media Container with 3D Depth */}
          <a
            href={`/projects/${project.slug}`}
            onClick={handleCardClick}
            className={`block relative aspect-video overflow-hidden border-b ${
              isDark ? 'bg-[#0A1622] border-[#D9A441]/20' : 'bg-[#FAF6EE]/50 border-[#143C5A]/15'
            }`}
          >
            <ResilientImage
              src={project.coverImage}
              alt={project.coverImageAlt}
              fallbackLabel={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Subtle Gradient Scrim in Nile Night */}
            <div
              className={`absolute inset-0 bg-gradient-to-t pointer-events-none ${
                isDark
                  ? 'from-[#0A1622]/90 via-transparent to-transparent'
                  : 'from-[#143C5A]/30 via-transparent to-transparent'
              }`}
            />

            {/* Floating 3D Badge */}
            <div
              className={`absolute bottom-3 ${isRTL ? 'right-4' : 'left-4'} flex items-center gap-2 text-[11px] font-mono backdrop-blur-md px-2.5 py-1 rounded-md border shadow-sm ${
                isDark
                  ? 'text-[#FAF6EE]/90 bg-[#0E2336]/90 border-[#D9A441]/35'
                  : 'text-[#143C5A] bg-white/95 border-[#143C5A]/20'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-[#D9A441]' : 'bg-[#143C5A]'}`} />
              <span className="font-medium">{status}</span>
            </div>
          </a>

          {/* Content Body */}
          <div className="p-6 space-y-3">
            {/* Clean Metadata Row */}
            <div
              className={`flex flex-wrap items-center gap-2 text-xs font-mono ${
                isDark ? 'text-[#D9A441]' : 'text-[#143C5A]'
              }`}
            >
              <span className="font-semibold">{category}</span>
              {project.isPlaceholder && (
                <>
                  <span aria-hidden="true" className={isDark ? 'text-[#FAF6EE]/30' : 'text-[#143C5A]/40'}>
                    ·
                  </span>
                  <span className={isDark ? 'text-[#FAF6EE]/50' : 'text-[#6E87A0]'}>
                    {language === 'ar' ? 'دراسة حالة' : 'Case Study'}
                  </span>
                </>
              )}
            </div>

            <h3 className="font-display text-xl font-bold tracking-tight transition-colors">
              <a
                href={`/projects/${project.slug}`}
                onClick={handleCardClick}
                className={`hover:underline ${
                  isDark
                    ? 'text-[#FAF6EE] group-hover:text-[#D9A441]'
                    : 'text-[#143C5A] group-hover:text-[#D9A441]'
                }`}
              >
                {title}
              </a>
            </h3>

            <p className={`text-sm leading-relaxed line-clamp-3 ${
              isDark ? 'text-[#8FA4BC]' : 'text-[#1D2733]/80'
            }`}>
              {description}
            </p>
          </div>
        </div>

        {/* Footer Metadata & Action Links */}
        <div
          className={`px-6 pb-6 pt-4 border-t space-y-4 ${
            isDark
              ? 'border-[#D9A441]/15 bg-[#0E2336]/40'
              : 'border-[#143C5A]/15 bg-[#FAF6EE]/40'
          }`}
        >
          {/* Highlighted Technology Stack */}
          <div className="flex flex-wrap items-center gap-1.5">
            {project.technologies.slice(0, 3).map((tech) => (
              <ProjectBadge key={tech} tech={tech} size="xs" />
            ))}
            {project.technologies.length > 3 && (
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded-md backdrop-blur-md border transition-colors ${
                  isDark
                    ? 'bg-[#0A1622]/60 text-[#8FA4BC] border-[#6E87A0]/30 hover:border-[#D9A441]/50 hover:text-[#D9A441]'
                    : 'bg-white/80 text-[#143C5A]/70 border-[#143C5A]/20 hover:border-[#D9A441] hover:text-[#143C5A]'
                }`}
                title={project.technologies.slice(3).join(', ')}
              >
                +{project.technologies.length - 3}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between gap-4 pt-1">
            <a
              href={`/projects/${project.slug}`}
              onClick={handleCardClick}
              className={`inline-flex items-center gap-1.5 text-xs font-semibold group/link whitespace-nowrap shrink-0 transition-colors ${
                isDark
                  ? 'text-[#D9A441] hover:text-[#FAF6EE]'
                  : 'text-[#143C5A] hover:text-[#D9A441]'
              }`}
            >
              <span>{t.projectsSection.exploreCaseStudy}</span>
              {isRTL ? (
                <ArrowLeft
                  className="w-3.5 h-3.5 transition-transform duration-150 group-link:-translate-x-1"
                  aria-hidden="true"
                />
              ) : (
                <ArrowRight
                  className="w-3.5 h-3.5 transition-transform duration-150 group-link:translate-x-1"
                  aria-hidden="true"
                />
              )}
            </a>

            <div className={`flex items-center gap-3 text-xs ${isDark ? 'text-[#8FA4BC]' : 'text-[#6E87A0]'}`}>
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1 whitespace-nowrap shrink-0 transition-colors ${
                    isDark ? 'hover:text-[#D9A441]' : 'hover:text-[#143C5A]'
                  }`}
                >
                  <span>{language === 'ar' ? 'معاينة حية' : 'Live Demo'}</span>
                  <ExternalLink className="w-3 h-3" aria-hidden="true" />
                </a>
              )}
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1 whitespace-nowrap shrink-0 transition-colors ${
                    isDark ? 'hover:text-[#D9A441]' : 'hover:text-[#143C5A]'
                  }`}
                >
                  <span>{language === 'ar' ? 'المصدر' : 'Source'}</span>
                  <ExternalLink className="w-3 h-3" aria-hidden="true" />
                </a>
              )}
            </div>
          </div>
        </div>
      </article>
    </Card3DTilt>
  );
};
