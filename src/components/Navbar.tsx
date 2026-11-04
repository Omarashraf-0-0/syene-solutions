import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Menu,
  X,
  Sun,
  Moon,
  ArrowUpRight,
  FolderGit2,
  Layers,
  Workflow,
  CreditCard,
  Send,
  Sparkles,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t, isRTL } = useLanguage();

  const isDark = theme === 'dark';
  const isProjectsActive = currentPath === '/projects' || currentPath.startsWith('/projects/');
  const isContactActive = currentPath === '/contact' || currentPath.startsWith('/contact');

  // Track scroll position to adjust navbar density
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on screen resize to desktop (>= 1024px)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu is open, preventing background scroll while open
  useEffect(() => {
    if (mobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [mobileMenuOpen]);

  // Keyboard accessibility: Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const handleLinkClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
      e.preventDefault();
      setMobileMenuOpen(false);

      if (target.startsWith('/#')) {
        const sectionId = target.replace('/#', '');
        if (currentPath !== '/') {
          onNavigate('/');
          setTimeout(() => {
            document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
          }, 80);
        } else {
          document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
        }
        return;
      }

      onNavigate(target);
    },
    [currentPath, onNavigate]
  );

  const navLinks = [
    { label: t.nav.projects, path: '/projects', isActive: isProjectsActive, icon: FolderGit2 },
    { label: t.nav.services, path: '/#services', isActive: false, icon: Layers },
    { label: t.nav.howWeWork, path: '/#how-we-work', isActive: false, icon: Workflow },
    { label: t.nav.pricing, path: '/#pricing', isActive: false, icon: CreditCard },
    { label: t.nav.contact, path: '/contact', isActive: isContactActive, icon: Send },
  ];

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled ? 'py-2' : 'py-3'
      }`}
    >
      {/* 
        Background layer isolated to an absolute child so the root <header>
        does NOT create a containing block for fixed positioning elements.
      */}
      <div
        className={`absolute inset-0 -z-10 transition-all duration-300 pointer-events-none ${
          isScrolled
            ? isDark
              ? 'bg-[#02060E]/92 backdrop-blur-xl border-b border-[#69001F]/50 shadow-[0_12px_36px_-10px_rgba(2,6,14,0.8)]'
              : 'bg-[#F5EAF0]/94 backdrop-blur-xl border-b border-[#69001F]/20 shadow-[0_12px_36px_-10px_rgba(105,0,31,0.08)]'
            : isDark
            ? 'bg-[#02060E]/80 backdrop-blur-md border-b border-[#69001F]/30'
            : 'bg-[#F5EAF0]/80 backdrop-blur-md border-b border-[#69001F]/10'
        }`}
        aria-hidden="true"
      />

      {/* Subtle top edge glow highlight in Crimson Red */}
      <div
        className={`absolute top-0 left-0 right-0 h-[1.5px] pointer-events-none transition-opacity duration-300 ${
          isDark
            ? 'bg-gradient-to-r from-transparent via-[#C50337]/50 to-transparent opacity-85'
            : 'bg-gradient-to-r from-transparent via-[#69001F]/25 to-transparent opacity-65'
        }`}
        aria-hidden="true"
      />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 flex items-center justify-between gap-3">
        {/* Left: Confident Brand Logo */}
        <a
          href="/"
          onClick={(e) => handleLinkClick(e, '/')}
          className="group flex items-center gap-2.5 outline-none focus-visible:ring-2 focus-visible:ring-[#C50337] rounded-lg shrink-0"
          aria-label="Nubix Studio Home"
        >
          {/* Luminous Geometric Prism Mark */}
          <div className="relative w-8 h-8 flex items-center justify-center">
            <div
              className={`absolute inset-0 rounded-lg transition-all duration-300 ${
                isDark
                  ? 'bg-[#1E020C] border border-[#C50337]/35 group-hover:border-[#C50337] group-hover:shadow-[0_0_16px_rgba(197,3,55,0.4)]'
                  : 'bg-white border border-[#69001F]/20 group-hover:border-[#69001F]/50 shadow-xs'
              }`}
            />
            <svg
              className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover:rotate-12"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 3L20 7.5V16.5L12 21L4 16.5V7.5L12 3Z"
                className={isDark ? 'stroke-[#C50337]' : 'stroke-[#69001F]'}
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              <path
                d="M12 3V12M12 12L20 7.5M12 12L4 7.5M12 12V21"
                className={isDark ? 'stroke-[#C50337]/55' : 'stroke-[#69001F]/50'}
                strokeWidth="1.4"
              />
              <circle
                cx="12"
                cy="12"
                r="2"
                className={isDark ? 'fill-[#C50337]' : 'fill-[#69001F]'}
              />
            </svg>
          </div>

          <span
            className={`font-display text-xl font-extrabold tracking-tight transition-colors duration-150 ${
              isDark ? 'text-[#F5EAF0] group-hover:text-[#C50337]' : 'text-[#02060E] group-hover:text-[#69001F]'
            }`}
          >
            {t.nav.brandName}
          </span>
        </a>

        {/* Center: Floating Frosted Dock for Desktop (>= 1024px) */}
        <nav
          aria-label="Primary navigation"
          className={`hidden lg:flex items-center p-1 rounded-full border transition-all duration-200 ${
            isDark
              ? 'bg-[#1E020C]/85 border-[#69001F]/60 shadow-[inset_0_1px_0_rgba(245,234,240,0.05)]'
              : 'bg-white/92 border-[#69001F]/15 shadow-xs'
          }`}
        >
          {navLinks.slice(0, 4).map((link) => (
            <a
              key={link.path}
              href={link.path}
              onClick={(e) => handleLinkClick(e, link.path)}
              className={`relative px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-[#C50337] ${
                link.isActive
                  ? isDark
                    ? 'bg-[#69001F] text-[#F5EAF0] font-semibold border border-[#C50337]/40 shadow-[0_0_12px_rgba(197,3,55,0.22)]'
                    : 'bg-[#69001F] text-[#F5EAF0] font-semibold shadow-xs'
                  : isDark
                  ? 'text-[#F5EAF0]/70 hover:text-[#F5EAF0] hover:bg-[#69001F]/35'
                  : 'text-[#69001F]/80 hover:text-[#02060E] hover:bg-[#69001F]/10'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right: Controls & CTAs */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Segmented Language Switcher [ EN | عربي ] - visible on tablets and desktops */}
          <div
            className={`hidden md:flex items-center p-0.5 rounded-lg border text-xs font-mono font-medium ${
              isDark
                ? 'bg-[#1E020C] border-[#69001F]/70'
                : 'bg-white border-[#69001F]/20 shadow-2xs'
            }`}
          >
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`px-2 py-1 rounded-md transition-all ${
                language === 'en'
                  ? isDark
                    ? 'bg-[#C50337] text-[#F5EAF0] font-bold shadow-xs'
                    : 'bg-[#69001F] text-[#F5EAF0] font-bold shadow-xs'
                  : isDark
                  ? 'text-[#F5EAF0]/65 hover:text-[#F5EAF0]'
                  : 'text-[#69001F]/80 hover:text-[#02060E]'
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLanguage('ar')}
              className={`px-2 py-1 rounded-md transition-all ${
                language === 'ar'
                  ? isDark
                    ? 'bg-[#C50337] text-[#F5EAF0] font-bold shadow-xs'
                    : 'bg-[#69001F] text-[#F5EAF0] font-bold shadow-xs'
                  : isDark
                  ? 'text-[#F5EAF0]/65 hover:text-[#F5EAF0]'
                  : 'text-[#69001F]/80 hover:text-[#02060E]'
              }`}
            >
              عربي
            </button>
          </div>

          {/* Theme Toggle Button - always available for instant accessibility */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? t.nav.switchToLight : t.nav.switchToDark}
            title={isDark ? t.nav.switchToLight : t.nav.switchToDark}
            className={`inline-flex items-center justify-center w-8.5 h-8.5 rounded-lg border transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[#C50337] ${
              isDark
                ? 'bg-[#1E020C] border-[#69001F]/70 text-[#C50337] hover:border-[#C50337]/60'
                : 'bg-white border-[#69001F]/20 text-[#69001F] hover:border-[#69001F]/40 shadow-2xs'
            }`}
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-[#C50337] transition-transform duration-300 rotate-0 hover:rotate-90" />
            ) : (
              <Moon className="w-4 h-4 text-[#69001F] transition-transform duration-300 rotate-0 hover:-rotate-45" />
            )}
          </button>

          {/* Header CTA Button - visible on sm+ screens */}
          <a
            href="/contact"
            onClick={(e) => handleLinkClick(e, '/contact')}
            className={`group hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg transition-all duration-200 whitespace-nowrap shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-[#C50337] ${
              isDark
                ? 'crimson-noir-gradient text-[#F5EAF0] font-bold shadow-[0_0_18px_rgba(197,3,55,0.32)] hover:shadow-[0_0_26px_rgba(197,3,55,0.50)] hover:scale-[1.02] active:scale-[0.98]'
                : 'bg-[#69001F] text-[#F5EAF0] hover:bg-[#3B0018] shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98]'
            }`}
          >
            <span>{t.nav.startProject}</span>
            <ArrowUpRight
              className={`w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                isRTL ? 'rotate-[-90deg] group-hover:-translate-x-0.5' : ''
              }`}
              aria-hidden="true"
            />
          </a>

          {/* Mobile & Tablet Navigation Toggle Button (visible < 1024px) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-panel"
            aria-label={mobileMenuOpen ? t.nav.closeMenu : t.nav.openMenu}
            className={`lg:hidden inline-flex items-center justify-center w-8.5 h-8.5 rounded-lg border transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[#C50337] ${
              mobileMenuOpen
                ? 'bg-[#C50337] border-[#C50337] text-[#F5EAF0] shadow-[0_0_14px_rgba(197,3,55,0.5)]'
                : isDark
                ? 'bg-[#1E020C] border-[#69001F]/70 text-[#F5EAF0] hover:border-[#C50337]/60'
                : 'bg-white border-[#69001F]/20 text-[#02060E] hover:bg-slate-50 shadow-2xs'
            }`}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-white transition-transform duration-200 rotate-90 scale-105" />
            ) : (
              <Menu className="w-5 h-5 transition-transform duration-200" />
            )}
          </button>
        </div>
      </div>

      {/* 
        Mobile & Tablet Downward-Opening Menu System:
        - Anchored directly to bottom edge of navbar using `absolute top-full left-0 right-0`
        - Opens DOWNWARD with smooth scale and slide animation
        - Max height bound to viewport (max-h-[calc(100dvh-4.25rem)]) with smooth internal scroll
        - Backdrop overlay dimming remaining page content
      */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop Dimmer: covers the full viewport behind the open dropdown */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 top-0 bg-black/65 backdrop-blur-xs z-40 lg:hidden cursor-pointer"
              aria-hidden="true"
            />

            {/* Downward-Opening Menu Container */}
            <motion.div
              id="mobile-nav-panel"
              role="region"
              aria-label="Mobile and tablet navigation"
              initial={{ opacity: 0, y: -14, scaleY: 0.96 }}
              animate={{ opacity: 1, y: 0, scaleY: 1 }}
              exit={{ opacity: 0, y: -10, scaleY: 0.98 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: 'top' }}
              className={`absolute top-full left-0 right-0 w-full z-50 lg:hidden border-b shadow-[0_24px_50px_-10px_rgba(2,6,14,0.92)] max-h-[calc(100dvh-4.25rem)] overflow-y-auto overscroll-contain transition-colors ${
                isDark
                  ? 'bg-[#02060E] border-[#69001F]/70 text-[#F5EAF0]'
                  : 'bg-[#F5EAF0] border-[#69001F]/20 text-[#02060E]'
              }`}
            >
              {/* Subtle accent border line on top */}
              <div
                className={`h-[1px] w-full ${
                  isDark
                    ? 'bg-gradient-to-r from-transparent via-[#C50337]/60 to-transparent'
                    : 'bg-gradient-to-r from-transparent via-[#69001F]/25 to-transparent'
                }`}
                aria-hidden="true"
              />

              <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-5 space-y-4">
                {/* Studio Live Availability Status */}
                <div
                  className={`p-3 rounded-xl border flex items-center justify-between text-xs transition-colors ${
                    isDark
                      ? 'bg-[#1E020C] border-[#C50337]/35 text-[#F5EAF0]'
                      : 'bg-white border-[#69001F]/20 text-[#02060E] shadow-xs'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C50337] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C50337]"></span>
                    </span>
                    <span className="font-semibold tracking-wide">
                      {language === 'ar'
                        ? 'متاح للتعاقد والمشاريع الجديدة'
                        : 'Available for new client engagements'}
                    </span>
                  </div>
                  <Sparkles className="w-3.5 h-3.5 text-[#C50337] shrink-0" />
                </div>

                {/* Primary Navigation Links */}
                <nav className="space-y-1.5" aria-label="Mobile links">
                  {navLinks.map((link) => {
                    const IconComponent = link.icon;
                    return (
                      <a
                        key={link.path}
                        href={link.path}
                        onClick={(e) => handleLinkClick(e, link.path)}
                        className={`flex items-center justify-between min-h-[48px] px-3.5 py-3 rounded-xl font-medium text-sm transition-all duration-150 outline-none focus-visible:ring-2 focus-visible:ring-[#C50337] ${
                          link.isActive
                            ? isDark
                              ? 'bg-[#69001F] text-[#F5EAF0] border border-[#C50337]/50 font-semibold shadow-[0_0_16px_rgba(197,3,55,0.2)]'
                              : 'bg-white text-[#02060E] font-semibold border border-[#69001F]/25 shadow-xs'
                            : isDark
                            ? 'text-[#F5EAF0]/85 hover:bg-[#1E020C] hover:text-[#F5EAF0]'
                            : 'text-[#69001F]/85 hover:bg-white hover:text-[#02060E]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                              link.isActive
                                ? isDark
                                  ? 'bg-[#C50337]/30 text-[#F5EAF0]'
                                  : 'bg-[#69001F] text-[#F5EAF0]'
                                : isDark
                                ? 'bg-[#1E020C] border border-[#69001F]/40 text-[#F5EAF0]/70'
                                : 'bg-[#EEDBE6] border border-[#69001F]/15 text-[#69001F]'
                            }`}
                          >
                            <IconComponent className="w-4 h-4" />
                          </div>
                          <span className="font-medium tracking-tight">{link.label}</span>
                        </div>

                        <ArrowUpRight
                          className={`w-4 h-4 opacity-50 shrink-0 ${
                            isRTL ? 'rotate-[-90deg]' : ''
                          }`}
                        />
                      </a>
                    );
                  })}
                </nav>

                {/* Preferences Drawer: Language & Appearance */}
                <div
                  className={`p-3.5 rounded-xl border space-y-3 ${
                    isDark
                      ? 'bg-[#1E020C] border-[#69001F]/50'
                      : 'bg-white border-[#69001F]/20 shadow-xs'
                  }`}
                >
                  {/* Language Selector */}
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-mono uppercase tracking-wider opacity-75">
                      {language === 'ar' ? 'اللغة' : 'Language'}
                    </span>
                    <div
                      className={`flex items-center p-0.5 rounded-lg border text-xs font-mono font-medium ${
                        isDark ? 'bg-[#02060E] border-[#69001F]/60' : 'bg-slate-100 border-[#69001F]/15'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => setLanguage('en')}
                        className={`min-h-[32px] px-3.5 py-1 rounded-md transition-all ${
                          language === 'en'
                            ? isDark
                              ? 'bg-[#C50337] text-[#F5EAF0] font-bold shadow-xs'
                              : 'bg-[#69001F] text-white font-bold shadow-xs'
                            : isDark
                            ? 'text-[#F5EAF0]/60 hover:text-[#F5EAF0]'
                            : 'text-[#69001F]/75 hover:text-[#02060E]'
                        }`}
                      >
                        English
                      </button>
                      <button
                        type="button"
                        onClick={() => setLanguage('ar')}
                        className={`min-h-[32px] px-3.5 py-1 rounded-md transition-all ${
                          language === 'ar'
                            ? isDark
                              ? 'bg-[#C50337] text-[#F5EAF0] font-bold shadow-xs'
                              : 'bg-[#69001F] text-white font-bold shadow-xs'
                            : isDark
                            ? 'text-[#F5EAF0]/60 hover:text-[#F5EAF0]'
                            : 'text-[#69001F]/75 hover:text-[#02060E]'
                        }`}
                      >
                        العربية
                      </button>
                    </div>
                  </div>

                  {/* Theme Switcher */}
                  <div className="flex items-center justify-between gap-3 pt-2.5 border-t border-current/10">
                    <span className="text-xs font-mono uppercase tracking-wider opacity-75">
                      {language === 'ar' ? 'المظهر' : 'Appearance'}
                    </span>
                    <button
                      type="button"
                      onClick={toggleTheme}
                      className={`inline-flex items-center gap-2 min-h-[32px] px-3.5 py-1.5 rounded-lg border text-xs font-mono transition-colors ${
                        isDark
                          ? 'bg-[#02060E] border-[#69001F]/60 text-[#C50337] hover:border-[#C50337]/60'
                          : 'bg-slate-100 border-[#69001F]/15 text-[#69001F] hover:bg-slate-200'
                      }`}
                    >
                      {isDark ? <Sun className="w-3.5 h-3.5 text-[#C50337]" /> : <Moon className="w-3.5 h-3.5 text-[#69001F]" />}
                      <span className="font-medium">
                        {isDark
                          ? language === 'ar'
                            ? 'الوضع الداكن'
                            : 'Dark Mode'
                          : language === 'ar'
                          ? 'الوضع الفاتح'
                          : 'Light Mode'}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Primary CTA Button */}
                <div className="pt-1">
                  <a
                    href="/contact"
                    onClick={(e) => handleLinkClick(e, '/contact')}
                    className={`w-full flex items-center justify-center gap-2 min-h-[46px] py-3 px-5 text-sm font-bold rounded-xl shadow-lg transition-transform active:scale-[0.98] outline-none focus-visible:ring-2 focus-visible:ring-[#C50337] ${
                      isDark
                        ? 'crimson-noir-gradient text-[#F5EAF0] shadow-[0_0_22px_rgba(197,3,55,0.35)] hover:shadow-[0_0_30px_rgba(197,3,55,0.50)]'
                        : 'bg-[#69001F] text-[#F5EAF0] hover:bg-[#3B0018]'
                    }`}
                  >
                    <span>{t.nav.startProject}</span>
                    <ArrowUpRight
                      className={`w-4 h-4 ${isRTL ? 'rotate-[-90deg]' : ''}`}
                    />
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};
