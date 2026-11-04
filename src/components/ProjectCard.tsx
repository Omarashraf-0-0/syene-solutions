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
              isDark ? 'bg-[#02060E] border-[#69001F]/40' : 'bg-[#F5EAF0]/50 border-[#69001F]/15'
            }`}
          >
            <ResilientImage
              src={project.coverImage}
              alt={project.coverImageAlt}
              fallbackLabel={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Subtle Gradient Scrim in Midnight Noir */}
            <div
              className={`absolute inset-0 bg-gradient-to-t pointer-events-none ${
                isDark
                  ? 'from-[#02060E]/85 via-transparent to-transparent'
                  : 'from-[#69001F]/30 via-transparent to-transparent'
              }`}
            />

            {/* Floating 3D Badge */}
            <div
              className={`absolute bottom-3 ${isRTL ? 'right-4' : 'left-4'} flex items-center gap-2 text-[11px] font-mono backdrop-blur-md px-2.5 py-1 rounded-md border shadow-sm ${
                isDark
                  ? 'text-[#F5EAF0]/90 bg-[#1E020C]/90 border-[#69001F]/60'
                  : 'text-[#02060E] bg-white/95 border-[#69001F]/20'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-[#C50337]' : 'bg-[#69001F]'}`} />
              <span className="font-medium">{status}</span>
            </div>
          </a>

          {/* Content Body */}
          <div className="p-6 space-y-3">
            {/* Clean Metadata Row */}
            <div
              className={`flex flex-wrap items-center gap-2 text-xs font-mono ${
                isDark ? 'text-[#C50337]' : 'text-[#69001F]'
              }`}
            >
              <span className="font-semibold">{category}</span>
              {project.isPlaceholder && (
                <>
                  <span aria-hidden="true" className={isDark ? 'text-[#F5EAF0]/30' : 'text-[#69001F]/40'}>
                    ·
                  </span>
                  <span className={isDark ? 'text-[#F5EAF0]/50' : 'text-[#69001F]/60'}>
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
                    ? 'text-[#F5EAF0] group-hover:text-[#C50337]'
                    : 'text-[#02060E] group-hover:text-[#69001F]'
                }`}
              >
                {title}
              </a>
            </h3>

            <p className={`text-sm leading-relaxed line-clamp-3 ${
              isDark ? 'text-[#F5EAF0]/70' : 'text-[#69001F]/80'
            }`}>
              {description}
            </p>
          </div>
        </div>

        {/* Footer Metadata & Action Links */}
        <div
          className={`px-6 pb-6 pt-4 border-t space-y-4 ${
            isDark
              ? 'border-[#69001F]/40 bg-[#1E020C]/40'
              : 'border-[#69001F]/15 bg-[#F5EAF0]/30'
          }`}
        >
          {/* Highlighted Glassmorphic Technology Stack */}
          <div className="flex flex-wrap items-center gap-1.5">
            {project.technologies.slice(0, 3).map((tech) => (
              <ProjectBadge key={tech} tech={tech} size="xs" />
            ))}
            {project.technologies.length > 3 && (
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded-md backdrop-blur-md border transition-colors ${
                  isDark
                    ? 'bg-[#02060E]/60 text-[#F5EAF0]/60 border-[#69001F]/60 hover:border-[#C50337]/40 hover:text-[#C50337]'
                    : 'bg-white/80 text-[#69001F]/70 border-[#69001F]/20 hover:border-[#69001F]/40 hover:text-[#02060E]'
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
                  ? 'text-[#C50337] hover:text-[#F5EAF0]'
                  : 'text-[#69001F] hover:text-[#02060E]'
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

            <div className={`flex items-center gap-3 text-xs ${isDark ? 'text-[#F5EAF0]/60' : 'text-[#69001F]/60'}`}>
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1 whitespace-nowrap shrink-0 transition-colors ${
                    isDark ? 'hover:text-[#C50337]' : 'hover:text-[#69001F]'
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
                    isDark ? 'hover:text-[#C50337]' : 'hover:text-[#69001F]'
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
