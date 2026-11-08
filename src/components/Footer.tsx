import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { Newsletter } from './Newsletter';
import { RevealOnScroll } from './RevealOnScroll';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { theme } = useTheme();
  const { language, isRTL, t } = useLanguage();
  const isDark = theme === 'dark';

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    if (path.startsWith('/#')) {
      const id = path.replace('/#', '');
      onNavigate('/');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 60);
      return;
    }
    onNavigate(path);
  };

  return (
    <footer
      className={`border-t transition-colors duration-200 ${
        isDark
          ? 'bg-[#0A1622] text-[#FAF6EE] border-[#143C5A]/40'
          : 'bg-[#FAF6EE] text-[#1D2733] border-[#143C5A]/15'
      }`}
    >
      <div className="max-w-[1240px] mx-auto px-6 py-16">
        {/* Newsletter Radar Card */}
        <RevealOnScroll>
          <Newsletter />
        </RevealOnScroll>

        <div className={`grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b ${
          isDark ? 'border-[#143C5A]/40' : 'border-[#143C5A]/15'
        }`}>
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center p-1.5 shrink-0 bg-white dark:bg-[#0E2336] border border-[#143C5A]/15 dark:border-[#D9A441]/35 shadow-xs">
                <img
                  src="/syene-emblem.png"
                  alt="Syene Solutions"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className={`font-display text-2xl font-bold tracking-tight leading-tight ${
                  isDark ? 'text-[#FAF6EE]' : 'text-[#143C5A]'
                }`}>
                  {language === 'ar' ? 'سايين سوليوشنز' : 'Syene Solutions'}
                </span>
                <span className={`text-xs font-mono font-medium ${isDark ? 'text-[#D9A441]' : 'text-[#143C5A]'}`}>
                  {language === 'ar' ? 'استوديو البرمجيات والذكاء الاصطناعي · أسوان' : 'Software & AI Studio · Aswan, Egypt'}
                </span>
              </div>
            </div>
            <p className={`text-sm ${isDark ? 'text-[#8FA4BC]' : 'text-[#1D2733]/80'} max-w-md leading-relaxed`}>
              {t.footer.description}
            </p>
            <div className={`text-xs font-mono pt-1 ${isDark ? 'text-[#D9A441]/85' : 'text-[#143C5A]/85'}`}>
              {t.footer.heritageNote}
            </div>
          </div>

          {/* Navigation Column */}
          <div className="md:col-span-3 space-y-3">
            <h2 className={`text-xs font-mono tracking-wider uppercase ${
              isDark ? 'text-[#8FA4BC]/70' : 'text-[#6E87A0]'
            }`}>
              {t.footer.navigation}
            </h2>
            <ul className={`space-y-2 text-sm ${isDark ? 'text-[#FAF6EE]/80' : 'text-[#1D2733]'}`}>
              <li>
                <a
                  href="/"
                  onClick={(e) => handleNav(e, '/')}
                  className={`transition-colors ${isDark ? 'hover:text-[#D9A441]' : 'hover:text-[#143C5A]'}`}
                >
                  {t.nav.home}
                </a>
              </li>
              <li>
                <a
                  href="/projects"
                  onClick={(e) => handleNav(e, '/projects')}
                  className={`transition-colors ${isDark ? 'hover:text-[#D9A441]' : 'hover:text-[#143C5A]'}`}
                >
                  {t.nav.projects}
                </a>
              </li>
              <li>
                <a
                  href="/#services"
                  onClick={(e) => handleNav(e, '/#services')}
                  className={`transition-colors ${isDark ? 'hover:text-[#D9A441]' : 'hover:text-[#143C5A]'}`}
                >
                  {t.nav.services}
                </a>
              </li>
              <li>
                <a
                  href="/#how-we-work"
                  onClick={(e) => handleNav(e, '/#how-we-work')}
                  className={`transition-colors ${isDark ? 'hover:text-[#D9A441]' : 'hover:text-[#143C5A]'}`}
                >
                  {t.nav.howWeWork}
                </a>
              </li>
              <li>
                <a
                  href="/#work"
                  onClick={(e) => handleNav(e, '/#work')}
                  className={`transition-colors ${isDark ? 'hover:text-[#D9A441]' : 'hover:text-[#143C5A]'}`}
                >
                  {t.nav.projects}
                </a>
              </li>
              <li>
                <a
                  href="/#why-us"
                  onClick={(e) => handleNav(e, '/#why-us')}
                  className={`transition-colors ${isDark ? 'hover:text-[#D9A441]' : 'hover:text-[#143C5A]'}`}
                >
                  {language === 'ar' ? 'لماذا سايين' : 'Why Us'}
                </a>
              </li>
              <li>
                <a
                  href="/#contact"
                  onClick={(e) => handleNav(e, '/#contact')}
                  className={`transition-colors ${isDark ? 'hover:text-[#D9A441]' : 'hover:text-[#143C5A]'}`}
                >
                  {t.nav.startProject}
                </a>
              </li>
            </ul>
          </div>

          {/* Capabilities & Engagement Column */}
          <div className="md:col-span-4 space-y-3">
            <h2 className={`text-xs font-mono tracking-wider uppercase ${
              isDark ? 'text-[#8FA4BC]/70' : 'text-[#6E87A0]'
            }`}>
              {t.footer.capabilities}
            </h2>
            <ul className={`space-y-2 text-sm ${isDark ? 'text-[#8FA4BC]' : 'text-[#1D2733]/85'}`}>
              <li>{language === 'ar' ? '٠١. هندسة البرمجيات والمعمارية السحابية' : '01. Software Engineering & Cloud'}</li>
              <li>{language === 'ar' ? '٠٢. منصات وبوابات الويب المتقدمة' : '02. Web Platforms & Client Portals'}</li>
              <li>{language === 'ar' ? '٠٣. تطبيقات الهواتف الذكية (iOS & Android)' : '03. Mobile Applications (iOS & Android)'}</li>
              <li>{language === 'ar' ? '٠٤. حلول ومسارات الذكاء الاصطناعي التطبيقي' : '04. Applied AI & Intelligent Pipelines'}</li>
              <li>{language === 'ar' ? '٠٥. الاستشارات التقنية وهندسة التوسع' : '05. Technical Consulting & Modernization'}</li>
            </ul>
            <div className="pt-3">
              <a
                href="/contact"
                onClick={(e) => handleNav(e, '/contact')}
                className={`inline-flex items-center gap-1.5 text-sm font-semibold hover:underline ${
                  isDark ? 'text-[#D9A441]' : 'text-[#143C5A]'
                }`}
              >
                <span>{language === 'ar' ? 'ناقش مشروعك مع مهندسينا' : 'Discuss a project with our engineers'}</span>
                <ArrowUpRight className={`w-4 h-4 ${isRTL ? 'rotate-[-90deg]' : ''}`} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Technical Index Bar */}
        <div className={`pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs ${
          isDark ? 'text-[#8FA4BC]/70' : 'text-[#6E87A0]'
        }`}>
          <div className="flex flex-wrap items-center gap-2">
            <span>
              &copy; {new Date().getFullYear()}{' '}
              {language === 'ar'
                ? 'سايين سوليوشنز — استوديو هندسة البرمجيات والذكاء الاصطناعي · أسوان، مصر.'
                : 'Syene Solutions — Software & AI Studio · Aswan, Egypt.'}
            </span>
            <span aria-hidden="true">·</span>
            <span>{language === 'ar' ? 'كافة الحقوق محفوظة.' : 'All rights reserved.'}</span>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors ${isDark ? 'hover:text-[#D9A441]' : 'hover:text-[#143C5A]'}`}
            >
              Sitemap
            </a>
            <span aria-hidden="true">·</span>
            <a
              href="/robots.txt"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors ${isDark ? 'hover:text-[#D9A441]' : 'hover:text-[#143C5A]'}`}
            >
              Robots
            </a>
            <span aria-hidden="true">·</span>
            <a
              href="/contact"
              onClick={(e) => handleNav(e, '/contact')}
              className={`transition-colors ${isDark ? 'hover:text-[#D9A441]' : 'hover:text-[#143C5A]'}`}
            >
              {language === 'ar' ? 'الخصوصية وشروط الاستفسار' : 'Privacy & Inquiry Terms'}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
