import React, { useState, useEffect, useCallback } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { ContactPage } from './pages/ContactPage';
import { Background3D } from './components/3d/Background3D';

function MainApp() {
  const { theme } = useTheme();
  const { isRTL, language } = useLanguage();
  const [routeState, setRouteState] = useState<{
    pathname: string;
    search: string;
  }>(() => ({
    pathname: typeof window !== 'undefined' ? window.location.pathname : '/',
    search: typeof window !== 'undefined' ? window.location.search : '',
  }));

  useEffect(() => {
    const handlePopState = () => {
      setRouteState({
        pathname: window.location.pathname,
        search: window.location.search,
      });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = useCallback((to: string) => {
    const [rawPath, rawSearch] = to.split('?');
    const pathname = rawPath || '/';
    const search = rawSearch ? `?${rawSearch}` : '';
    const fullUrl = `${pathname}${search}`;

    if (
      window.location.pathname !== pathname ||
      window.location.search !== search
    ) {
      window.history.pushState({}, '', fullUrl);
    }

    setRouteState({ pathname, search });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const renderRoute = () => {
    const { pathname, search } = routeState;

    if (pathname === '/' || pathname === '') {
      return <HomePage onNavigate={navigate} />;
    }

    if (pathname === '/projects' || pathname === '/projects/') {
      return <ProjectsPage onNavigate={navigate} />;
    }

    if (pathname.startsWith('/projects/')) {
      const slug = decodeURIComponent(pathname.replace('/projects/', '').replace(/\/$/, ''));
      return <ProjectDetailPage slug={slug} onNavigate={navigate} />;
    }

    if (pathname === '/contact' || pathname === '/contact/') {
      return <ContactPage searchQuery={search} onNavigate={navigate} />;
    }

    // 404 Route
    return (
      <main className="min-h-[70vh] flex items-center justify-center px-6 py-20 bg-transparent">
        <div className="max-w-md w-full p-8 rounded-2xl glass-panel-3d text-center space-y-4">
          <div className="text-xs font-mono text-[#C50337]">
            {language === 'ar' ? '٤٠٤ · المسار غير موجود' : '404 · Route Not Found'}
          </div>
          <h1 className="font-display text-2xl font-bold text-[#F5EAF0] dark:text-[#F5EAF0] light:text-[#02060E]">
            {language === 'ar' ? 'الصفحة غير موجودة' : 'Page not found'}
          </h1>
          <p className="text-sm text-[#F5EAF0]/75 dark:text-[#F5EAF0]/75 light:text-[#69001F] leading-relaxed">
            {language === 'ar' ? 'المسار المطلوب غير موجود في موقع نوبيكس.' : 'The requested route does not exist.'}
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="px-5 py-2.5 text-xs font-semibold crimson-noir-gradient text-[#F5EAF0] font-bold rounded-xl hover:opacity-90 transition-opacity shadow-md"
            >
              {language === 'ar' ? 'العودة للرئيسية' : 'Return Home'}
            </button>
          </div>
        </div>
      </main>
    );
  };

  return (
    <div
      dir={isRTL ? 'rtl' : 'ltr'}
      className={`min-h-screen flex flex-col relative transition-colors duration-300 selection:bg-[#C50337] selection:text-[#F5EAF0] ${
        theme === 'dark' ? 'bg-[#02060E] text-[#F5EAF0]' : 'bg-[#F5EAF0] text-[#02060E]'
      }`}
    >
      {/* Persistent, Layered 3D Floating Glass Spheres Background with interactive physics */}
      <Background3D />

      {/* Main Content & Navigation Layer */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar currentPath={routeState.pathname} onNavigate={navigate} />
        <div className="flex-1">{renderRoute()}</div>
        <Footer onNavigate={navigate} />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <ToastProvider>
          <MainApp />
        </ToastProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
