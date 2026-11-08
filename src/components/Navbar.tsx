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
  Compass,
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
    { label: t.nav.services, path: '/#services', isActive: false, icon: Layers },
    { label: t.nav.howWeWork, path: '/#how-we-work', isActive: false, icon: Workflow },
    { label: t.nav.projects, path: '/#work', isActive: isProjectsActive, icon: FolderGit2 },
    { label: t.nav.about, path: '/#why-us', isActive: false, icon: Compass },
    { label: t.nav.contact, path: '/#contact', isActive: isContactActive, icon: Send },
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
              ? 'bg-[#0A1622]/94 backdrop-blur-xl border-b border-[#D9A441]/25 shadow-[0_12px_36px_-10px_rgba(10,22,34,0.95)]'
              : 'bg-[#FAF6EE]/95 backdrop-blur-xl border-b border-[#143C5A]/15 shadow-[0_12px_36px_-10px_rgba(20,60,90,0.08)]'
            : isDark
            ? 'bg-[#0A1622]/80 backdrop-blur-md border-b border-[#143C5A]/40'
            : 'bg-[#FAF6EE]/80 backdrop-blur-md border-b border-[#143C5A]/10'
        }`}
        aria-hidden="true"
      />

      {/* Radiant Top Edge Glow in Syene Gold */}
      <div
        className={`absolute top-0 left-0 right-0 h-[1.5px] pointer-events-none transition-opacity duration-300 ${
          isDark
            ? 'bg-gradient-to-r from-transparent via-[#D9A441]/60 to-transparent opacity-90'
            : 'bg-gradient-to-r from-transparent via-[#D9A441]/40 to-transparent opacity-75'
        }`}
        aria-hidden="true"
      />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 flex items-center justify-between gap-3">
        {/* Left: Confident Brand Logo with Syene Monolith & Well Mark */}
        <a
          href="/"
          onClick={(e) => handleLinkClick(e, '/')}
          className="group flex items-center gap-2.5 outline-none focus-visible:ring-2 focus-visible:ring-[#D9A441] rounded-lg shrink-0"
          aria-label="Syene Solutions Home"
        >
          {/* Official Syene Solutions Emblem: Golden Felucca Sail over Nile Wave */}
          <div className="relative w-9 h-9 flex items-center justify-center shrink-0">
            <div
              className={`absolute inset-0 rounded-xl transition-all duration-300 ${
                isDark
                  ? 'bg-[#0E2336]/80 border border-[#D9A441]/35 group-hover:border-[#D9A441] group-hover:shadow-[0_0_16px_rgba(217,164,65,0.35)]'
                  : 'bg-white border border-[#143C5A]/15 group-hover:border-[#D9A441] shadow-xs'
              }`}
            />
            <img
              src="/syene-emblem.png"
              alt="Syene Solutions"
              className="w-7 h-7 object-contain relative z-10 transition-transform duration-300 group-hover:scale-110 drop-shadow-sm"
            />
          </div>

          <div className="flex flex-col">
            <span
              className={`font-display text-lg sm:text-xl font-extrabold tracking-tight transition-colors duration-150 leading-none ${
                isDark ? 'text-[#FAF6EE] group-hover:text-[#D9A441]' : 'text-[#143C5A] group-hover:text-[#D9A441]'
              }`}
            >
              {t.nav.brandName}
            </span>
            <span
              className={`text-[9px] font-mono tracking-wider uppercase mt-0.5 opacity-60 ${
                isDark ? 'text-[#8FA4BC]' : 'text-[#6E87A0]'
              }`}
            >
              {language === 'ar' ? 'أسوان · مهد سايين' : 'Aswan · Ancient Syene'}
            </span>
          </div>
        </a>

        {/* Center: Floating Frosted Dock for Desktop (>= 1024px) */}
        <nav
          aria-label="Primary navigation"
          className={`hidden lg:flex items-center p-1 rounded-full border transition-all duration-200 ${
            isDark
              ? 'bg-[#0E2336]/85 border-[#6E87A0]/30 shadow-[inset_0_1px_0_rgba(250,246,238,0.06)]'
              : 'bg-white/94 border-[#143C5A]/15 shadow-xs'
          }`}
        >
          {navLinks.slice(0, 4).map((link) => (
            <a
              key={link.path}
              href={link.path}
              onClick={(e) => handleLinkClick(e, link.path)}
              className={`relative px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-[#D9A441] ${
                link.isActive
                  ? isDark
                    ? 'bg-[#143C5A] text-[#FAF6EE] font-semibold border border-[#D9A441]/50 shadow-[0_0_12px_rgba(217,164,65,0.25)]'
                    : 'bg-[#143C5A] text-[#FAF6EE] font-semibold shadow-xs'
                  : isDark
                  ? 'text-[#FAF6EE]/75 hover:text-[#FAF6EE] hover:bg-[#143C5A]/40'
                  : 'text-[#1D2733]/80 hover:text-[#143C5A] hover:bg-[#143C5A]/10'
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
                ? 'bg-[#0E2336] border-[#6E87A0]/30'
                : 'bg-white border-[#143C5A]/20 shadow-2xs'
            }`}
          >
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`px-2 py-1 rounded-md transition-all ${
                language === 'en'
                  ? isDark
                    ? 'bg-[#D9A441] text-[#0A1622] font-bold shadow-xs'
                    : 'bg-[#143C5A] text-[#FAF6EE] font-bold shadow-xs'
                  : isDark
                  ? 'text-[#FAF6EE]/65 hover:text-[#FAF6EE]'
                  : 'text-[#143C5A]/80 hover:text-[#143C5A]'
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
                    ? 'bg-[#D9A441] text-[#0A1622] font-bold shadow-xs'
                    : 'bg-[#143C5A] text-[#FAF6EE] font-bold shadow-xs'
                  : isDark
                  ? 'text-[#FAF6EE]/65 hover:text-[#FAF6EE]'
                  : 'text-[#143C5A]/80 hover:text-[#143C5A]'
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
            className={`inline-flex items-center justify-center w-8.5 h-8.5 rounded-lg border transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[#D9A441] ${
              isDark
                ? 'bg-[#0E2336] border-[#6E87A0]/35 text-[#D9A441] hover:border-[#D9A441]/60'
                : 'bg-white border-[#143C5A]/20 text-[#143C5A] hover:border-[#143C5A]/40 shadow-2xs'
            }`}
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-[#D9A441] transition-transform duration-300 rotate-0 hover:rotate-90" />
            ) : (
              <Moon className="w-4 h-4 text-[#143C5A] transition-transform duration-300 rotate-0 hover:-rotate-45" />
            )}
          </button>

          {/* Header CTA Button - Always visible for highest conversion intent */}
          <a
            href="/#contact"
            onClick={(e) => handleLinkClick(e, '/#contact')}
            className={`group inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 text-xs font-semibold rounded-lg transition-all duration-200 whitespace-nowrap shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-[#D9A441] ${
              isDark
                ? 'syene-gold-gradient text-[#0A1622] font-bold shadow-[0_0_18px_rgba(217,164,65,0.28)] hover:shadow-[0_0_26px_rgba(217,164,65,0.45)] hover:scale-[1.02] active:scale-[0.98]'
                : 'bg-[#D9A441] text-[#0A1622] font-bold hover:bg-[#F2BD5B] shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98]'
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
            className={`lg:hidden inline-flex items-center justify-center w-8.5 h-8.5 rounded-lg border transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[#D9A441] ${
              mobileMenuOpen
                ? 'bg-[#D9A441] border-[#D9A441] text-[#0A1622] shadow-[0_0_14px_rgba(217,164,65,0.5)]'
                : isDark
                ? 'bg-[#0E2336] border-[#6E87A0]/35 text-[#FAF6EE] hover:border-[#D9A441]/60'
                : 'bg-white border-[#143C5A]/20 text-[#143C5A] hover:bg-[#FAF6EE] shadow-2xs'
            }`}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 transition-transform duration-200 rotate-90 scale-105" />
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
              className={`absolute top-full left-0 right-0 w-full z-50 lg:hidden border-b shadow-[0_24px_50px_-10px_rgba(10,22,34,0.95)] max-h-[calc(100dvh-4.25rem)] overflow-y-auto overscroll-contain transition-colors ${
                isDark
                  ? 'bg-[#0A1622] border-[#D9A441]/30 text-[#FAF6EE]'
                  : 'bg-[#FAF6EE] border-[#143C5A]/20 text-[#1D2733]'
              }`}
            >
              {/* Radiant accent border line on top */}
              <div
                className={`h-[1px] w-full ${
                  isDark
                    ? 'bg-gradient-to-r from-transparent via-[#D9A441]/60 to-transparent'
                    : 'bg-gradient-to-r from-transparent via-[#143C5A]/30 to-transparent'
                }`}
                aria-hidden="true"
              />

              <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-5 space-y-4">
                {/* Syene Studio Live Status */}
                <div
                  className={`p-3 rounded-xl border flex items-center justify-between text-xs transition-colors ${
                    isDark
                      ? 'bg-[#0E2336] border-[#D9A441]/35 text-[#FAF6EE]'
                      : 'bg-white border-[#143C5A]/20 text-[#143C5A] shadow-xs'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D9A441] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D9A441]"></span>
                    </span>
                    <span className="font-semibold tracking-wide">
                      {language === 'ar'
                        ? 'متاح للمشاريع الجديدة · أسوان، مصر'
                        : 'Available for new client engagements · Aswan, Egypt'}
                    </span>
                  </div>
                  <Sparkles className="w-3.5 h-3.5 text-[#D9A441] shrink-0" />
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
                        className={`flex items-center justify-between min-h-[48px] px-3.5 py-3 rounded-xl font-medium text-sm transition-all duration-150 outline-none focus-visible:ring-2 focus-visible:ring-[#D9A441] ${
                          link.isActive
                            ? isDark
                              ? 'bg-[#143C5A] text-[#FAF6EE] border border-[#D9A441]/50 font-semibold shadow-[0_0_16px_rgba(217,164,65,0.2)]'
                              : 'bg-white text-[#143C5A] font-semibold border border-[#143C5A]/25 shadow-xs'
                            : isDark
                            ? 'text-[#FAF6EE]/85 hover:bg-[#0E2336] hover:text-[#FAF6EE]'
                            : 'text-[#1D2733]/85 hover:bg-white hover:text-[#143C5A]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                              link.isActive
                                ? isDark
                                  ? 'bg-[#D9A441]/25 text-[#D9A441]'
                                  : 'bg-[#143C5A] text-[#FAF6EE]'
                                : isDark
                                ? 'bg-[#0E2336] border border-[#6E87A0]/30 text-[#8FA4BC]'
                                : 'bg-[#FAF6EE] border border-[#143C5A]/15 text-[#143C5A]'
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
                      ? 'bg-[#0E2336] border-[#6E87A0]/30'
                      : 'bg-white border-[#143C5A]/20 shadow-xs'
                  }`}
                >
                  {/* Language Selector */}
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-mono uppercase tracking-wider opacity-75">
                      {language === 'ar' ? 'اللغة' : 'Language'}
                    </span>
                    <div
                      className={`flex items-center p-0.5 rounded-lg border text-xs font-mono font-medium ${
                        isDark ? 'bg-[#0A1622] border-[#6E87A0]/40' : 'bg-slate-100 border-[#143C5A]/15'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => setLanguage('en')}
                        className={`min-h-[32px] px-3.5 py-1 rounded-md transition-all ${
                          language === 'en'
                            ? isDark
                              ? 'bg-[#D9A441] text-[#0A1622] font-bold shadow-xs'
                              : 'bg-[#143C5A] text-white font-bold shadow-xs'
                            : isDark
                            ? 'text-[#FAF6EE]/60 hover:text-[#FAF6EE]'
                            : 'text-[#143C5A]/75 hover:text-[#143C5A]'
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
                              ? 'bg-[#D9A441] text-[#0A1622] font-bold shadow-xs'
                              : 'bg-[#143C5A] text-white font-bold shadow-xs'
                            : isDark
                            ? 'text-[#FAF6EE]/60 hover:text-[#FAF6EE]'
                            : 'text-[#143C5A]/75 hover:text-[#143C5A]'
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
                          ? 'bg-[#0A1622] border-[#6E87A0]/40 text-[#D9A441] hover:border-[#D9A441]/60'
                          : 'bg-slate-100 border-[#143C5A]/15 text-[#143C5A] hover:bg-slate-200'
                      }`}
                    >
                      {isDark ? <Sun className="w-3.5 h-3.5 text-[#D9A441]" /> : <Moon className="w-3.5 h-3.5 text-[#143C5A]" />}
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
                    href="/#contact"
                    onClick={(e) => handleLinkClick(e, '/#contact')}
                    className="w-full flex items-center justify-center gap-2 min-h-[46px] py-3 px-5 text-sm font-bold rounded-xl syene-gold-gradient text-[#0A1622] font-bold shadow-[0_0_22px_rgba(217,164,65,0.30)] hover:shadow-[0_0_30px_rgba(217,164,65,0.45)] transition-transform active:scale-[0.98] outline-none focus-visible:ring-2 focus-visible:ring-[#D9A441]"
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
