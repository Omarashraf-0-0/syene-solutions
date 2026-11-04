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
          ? 'bg-[#02060E] text-[#F5EAF0] border-[#69001F]/50'
          : 'bg-[#F5EAF0] text-[#02060E] border-[#69001F]/15'
      }`}
    >
      <div className="max-w-[1240px] mx-auto px-6 py-16">
        {/* 3D Glass Newsletter Subscription Card */}
        <RevealOnScroll>
          <Newsletter />
        </RevealOnScroll>

        <div className={`grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b ${
          isDark ? 'border-[#69001F]/50' : 'border-[#69001F]/15'
        }`}>
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-baseline gap-3">
              <span className={`font-display text-2xl font-bold tracking-tight ${
                isDark ? 'text-[#F5EAF0]' : 'text-[#02060E]'
              }`}>
                {language === 'ar' ? 'نوبيكس' : 'Nubix'}
              </span>
              <span className={`text-xs ${isDark ? 'text-[#F5EAF0]/60' : 'text-[#69001F]/60'}`} aria-hidden="true">
                ·
              </span>
              <span className={`text-sm font-medium ${isDark ? 'text-[#C50337]' : 'text-[#69001F]'}`}>
                {language === 'ar' ? 'استوديو البرمجيات والذكاء الاصطناعي' : 'Software & AI Studio'}
              </span>
            </div>
            <p className={`text-sm ${isDark ? 'text-[#F5EAF0]/70' : 'text-[#69001F]/80'} max-w-md leading-relaxed`}>
              {t.footer.description}
            </p>
          </div>

          {/* Navigation Column */}
          <div className="md:col-span-3 space-y-3">
            <h2 className={`text-xs font-mono tracking-wider uppercase ${
              isDark ? 'text-[#F5EAF0]/50' : 'text-[#69001F]/70'
            }`}>
              {t.footer.navigation}
            </h2>
            <ul className={`space-y-2.5 text-sm ${isDark ? 'text-[#F5EAF0]/80' : 'text-[#69001F]'}`}>
              <li>
                <a
                  href="/"
                  onClick={(e) => handleNav(e, '/')}
                  className={`transition-colors ${isDark ? 'hover:text-[#C50337]' : 'hover:text-[#02060E]'}`}
                >
                  {t.nav.home}
                </a>
              </li>
              <li>
                <a
                  href="/projects"
                  onClick={(e) => handleNav(e, '/projects')}
                  className={`transition-colors ${isDark ? 'hover:text-[#C50337]' : 'hover:text-[#02060E]'}`}
                >
                  {t.nav.projects}
                </a>
              </li>
              <li>
                <a
                  href="/#services"
                  onClick={(e) => handleNav(e, '/#services')}
                  className={`transition-colors ${isDark ? 'hover:text-[#C50337]' : 'hover:text-[#02060E]'}`}
                >
                  {t.nav.services}
                </a>
              </li>
              <li>
                <a
                  href="/#how-we-work"
                  onClick={(e) => handleNav(e, '/#how-we-work')}
                  className={`transition-colors ${isDark ? 'hover:text-[#C50337]' : 'hover:text-[#02060E]'}`}
                >
                  {t.nav.howWeWork}
                </a>
              </li>
              <li>
                <a
                  href="/#pricing"
                  onClick={(e) => handleNav(e, '/#pricing')}
                  className={`transition-colors ${isDark ? 'hover:text-[#C50337]' : 'hover:text-[#02060E]'}`}
                >
                  {t.nav.pricing}
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  onClick={(e) => handleNav(e, '/contact')}
                  className={`transition-colors ${isDark ? 'hover:text-[#C50337]' : 'hover:text-[#02060E]'}`}
                >
                  {t.nav.contact}
                </a>
              </li>
            </ul>
          </div>

          {/* Capabilities & Engagement Column */}
          <div className="md:col-span-4 space-y-3">
            <h2 className={`text-xs font-mono tracking-wider uppercase ${
              isDark ? 'text-[#F5EAF0]/50' : 'text-[#69001F]/70'
            }`}>
              {t.footer.capabilities}
            </h2>
            <ul className={`space-y-2 text-sm ${isDark ? 'text-[#F5EAF0]/75' : 'text-[#69001F]/80'}`}>
              <li>{language === 'ar' ? '٠١. تطوير تطبيقات الويب والهواتف الذكية' : '01. Web & Mobile Development'}</li>
              <li>{language === 'ar' ? '٠٢. حلول الذكاء الاصطناعي وأتمتة مسارات العمل' : '02. AI Solutions & Workflow Automation'}</li>
              <li>{language === 'ar' ? '٠٣. هندسة البنى التحتية والتكامل البرمجي' : '03. Backend Architecture & Integrations'}</li>
              <li>{language === 'ar' ? '٠٤. الصيانة والدعم والتطوير المستمر' : '04. Software Maintenance & Improvement'}</li>
            </ul>
            <div className="pt-3">
              <a
                href="/contact"
                onClick={(e) => handleNav(e, '/contact')}
                className={`inline-flex items-center gap-1.5 text-sm font-semibold hover:underline ${
                  isDark ? 'text-[#C50337]' : 'text-[#69001F]'
                }`}
              >
                <span>{language === 'ar' ? 'إرسال ملخص تفاصيل المشروع' : 'Submit a project brief'}</span>
                <ArrowUpRight className={`w-4 h-4 ${isRTL ? 'rotate-[-90deg]' : ''}`} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Technical Index Bar */}
        <div className={`pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs ${
          isDark ? 'text-[#F5EAF0]/55' : 'text-[#69001F]/70'
        }`}>
          <div className="flex flex-wrap items-center gap-2">
            <span>
              &copy; {new Date().getFullYear()}{' '}
              {language === 'ar'
                ? 'نوبيكس — استوديو هندسة البرمجيات والذكاء الاصطناعي.'
                : 'Nubix — Software & AI Studio.'}
            </span>
            <span aria-hidden="true">·</span>
            <span>{language === 'ar' ? 'كافة الحقوق محفوظة.' : 'All rights reserved.'}</span>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors ${isDark ? 'hover:text-[#C50337]' : 'hover:text-[#02060E]'}`}
            >
              Sitemap
            </a>
            <span aria-hidden="true">·</span>
            <a
              href="/robots.txt"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors ${isDark ? 'hover:text-[#C50337]' : 'hover:text-[#02060E]'}`}
            >
              Robots
            </a>
            <span aria-hidden="true">·</span>
            <a
              href="/contact"
              onClick={(e) => handleNav(e, '/contact')}
              className={`transition-colors ${isDark ? 'hover:text-[#C50337]' : 'hover:text-[#02060E]'}`}
            >
              {language === 'ar' ? 'الخصوصية وشروط الاستفسار' : 'Privacy & Inquiry Terms'}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
