import React from 'react';
import { Home, ChevronRight, ChevronLeft, FolderGit2, Sparkles, Send } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { getProjectBySlug } from '../data/projects';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  isCurrent?: boolean;
}

interface BreadcrumbNavProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const BreadcrumbNav: React.FC<BreadcrumbNavProps> = ({ currentPath, onNavigate }) => {
  const { theme } = useTheme();
  const { language, isRTL } = useLanguage();
  const isDark = theme === 'dark';

  // Do not render breadcrumbs on homepage root
  if (currentPath === '/' || currentPath === '') {
    return null;
  }

  const SeparatorIcon = isRTL ? ChevronLeft : ChevronRight;

  // Resolve breadcrumb trail based on current path
  const items: BreadcrumbItem[] = [
    {
      label: language === 'ar' ? 'الرئيسية' : 'Home',
      href: '/',
      icon: <Home className="w-3.5 h-3.5" aria-hidden="true" />,
    },
  ];

  if (currentPath === '/projects' || currentPath === '/projects/') {
    items.push({
      label: language === 'ar' ? 'المشاريع' : 'Projects',
      isCurrent: true,
      icon: <FolderGit2 className="w-3.5 h-3.5" aria-hidden="true" />,
    });
  } else if (currentPath.startsWith('/projects/')) {
    const slug = decodeURIComponent(currentPath.replace('/projects/', '').replace(/\/$/, ''));
    const project = getProjectBySlug(slug);

    items.push({
      label: language === 'ar' ? 'المشاريع' : 'Projects',
      href: '/projects',
      icon: <FolderGit2 className="w-3.5 h-3.5" aria-hidden="true" />,
    });

    const projectTitle = project
      ? (language === 'ar' && project.titleAr ? project.titleAr : project.title)
      : (language === 'ar' ? 'دراسة حالة' : 'Case Study');

    items.push({
      label: projectTitle,
      isCurrent: true,
      icon: <Sparkles className="w-3.5 h-3.5 text-[#D9A441]" aria-hidden="true" />,
    });
  } else if (currentPath === '/contact' || currentPath.startsWith('/contact')) {
    items.push({
      label: language === 'ar' ? 'بدء مشروع / استشارة' : 'Start a Project / Inquiry',
      isCurrent: true,
      icon: <Send className="w-3.5 h-3.5" aria-hidden="true" />,
    });
  } else {
    // 404 or other arbitrary page
    items.push({
      label: language === 'ar' ? 'الصفحة غير موجودة' : 'Not Found',
      isCurrent: true,
    });
  }

  // Generate BreadcrumbList Schema (JSON-LD) for SEO
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://syenesolutions.com';
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.href ? `${origin}${item.href}` : `${origin}${currentPath}`,
    })),
  };

  return (
    <div
      className={`w-full border-b backdrop-blur-md transition-colors duration-200 relative z-20 ${
        isDark
          ? 'bg-[#0A1622]/85 border-[#143C5A]/40 text-[#8FA4BC]'
          : 'bg-[#FAF6EE]/90 border-[#143C5A]/10 text-[#6E87A0]'
      }`}
    >
      {/* Schema.org BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-2.5">
        <nav aria-label={language === 'ar' ? 'مسار التنقل' : 'Breadcrumb'}>
          <ol className="flex items-center flex-wrap gap-1.5 sm:gap-2 text-xs">
            {items.map((item, index) => {
              const isLast = index === items.length - 1;

              return (
                <li
                  key={item.label + index}
                  className="inline-flex items-center min-w-0"
                >
                  {index > 0 && (
                    <SeparatorIcon
                      className={`w-3.5 h-3.5 mx-1 shrink-0 ${
                        isDark ? 'text-[#8FA4BC]/50' : 'text-[#6E87A0]/60'
                      }`}
                      aria-hidden="true"
                    />
                  )}

                  {isLast ? (
                    <span
                      aria-current="page"
                      className={`inline-flex items-center gap-1.5 font-medium truncate max-w-[200px] sm:max-w-md ${
                        isDark ? 'text-[#FAF6EE]' : 'text-[#143C5A] font-semibold'
                      }`}
                      title={item.label}
                    >
                      {item.icon && <span className="shrink-0">{item.icon}</span>}
                      <span className="truncate">{item.label}</span>
                    </span>
                  ) : (
                    <a
                      href={item.href || '#'}
                      onClick={(e) => {
                        e.preventDefault();
                        if (item.href) onNavigate(item.href);
                      }}
                      className={`inline-flex items-center gap-1.5 transition-colors duration-150 truncate hover:underline ${
                        isDark
                          ? 'text-[#8FA4BC] hover:text-[#D9A441]'
                          : 'text-[#6E87A0] hover:text-[#143C5A]'
                      }`}
                    >
                      {item.icon && <span className="shrink-0 opacity-80">{item.icon}</span>}
                      <span className="truncate">{item.label}</span>
                    </a>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
    </div>
  );
};
