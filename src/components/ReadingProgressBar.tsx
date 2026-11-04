import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

interface ReadingProgressBarProps {
  className?: string;
  showBadge?: boolean;
}

export const ReadingProgressBar: React.FC<ReadingProgressBarProps> = ({
  className = '',
  showBadge = false,
}) => {
  const [progress, setProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme } = useTheme();
  const { isRTL, language } = useLanguage();
  const isDark = theme === 'dark';

  useEffect(() => {
    let ticking = false;

    const calculateProgress = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;

      if (scrollHeight <= 0) {
        setProgress(0);
        setIsScrolled(false);
        return;
      }

      const rawProgress = (scrollY / scrollHeight) * 100;
      const clamped = Math.min(100, Math.max(0, rawProgress));
      setProgress(clamped);
      setIsScrolled(scrollY > 40);
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          calculateProgress();
          ticking = false;
        });
        ticking = true;
      }
    };

    calculateProgress();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const roundedProgress = Math.round(progress);

  return (
    <div
      role="progressbar"
      aria-valuenow={roundedProgress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={language === 'ar' ? 'مستوى قراءة دراسة الحالة' : 'Case study reading progress'}
      className={`fixed top-0 left-0 right-0 z-50 pointer-events-none select-none transition-opacity duration-300 ${
        isScrolled ? 'opacity-100' : 'opacity-70 hover:opacity-100'
      } ${className}`}
    >
      {/* Background Track */}
      <div className="w-full h-[3px] bg-black/10 dark:bg-white/10 backdrop-blur-xs relative overflow-hidden">
        {/* Dynamic Progress Fill with Crimson Noir Gradient */}
        <div
          className={`h-full relative transition-[width] duration-75 ease-out ${
            isDark
              ? 'bg-gradient-to-r from-[#02060E] via-[#850021] to-[#C50337] shadow-[0_0_10px_rgba(197,3,55,0.7)]'
              : 'bg-gradient-to-r from-[#69001F] via-[#850021] to-[#C50337] shadow-[0_0_8px_rgba(105,0,31,0.4)]'
          }`}
          style={{
            width: `${progress}%`,
            ...(isRTL
              ? { marginRight: 0, marginLeft: 'auto' }
              : { marginLeft: 0, marginRight: 'auto' }),
          }}
        >
          {/* Subtle leading edge glow indicator */}
          {progress > 0 && progress < 100 && (
            <span
              className={`absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full ${
                isRTL ? 'left-0 -translate-x-1/2' : 'right-0 translate-x-1/2'
              } ${
                isDark
                  ? 'bg-[#C50337] shadow-[0_0_8px_#C50337]'
                  : 'bg-[#69001F] shadow-[0_0_6px_#69001F]'
              }`}
              aria-hidden="true"
            />
          )}
        </div>
      </div>

      {/* Optional discrete percentage indicator pill */}
      {showBadge && isScrolled && (
        <div
          className={`absolute top-2 transition-transform duration-200 pointer-events-auto ${
            isRTL ? 'left-4' : 'right-4'
          }`}
        >
          <div
            className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-medium backdrop-blur-md border shadow-xs transition-colors ${
              isDark
                ? 'bg-[#1E020C]/80 text-[#C50337] border-[#69001F]/60'
                : 'bg-white/85 text-[#69001F] border-[#69001F]/30'
            }`}
          >
            {roundedProgress}%
          </div>
        </div>
      )}
    </div>
  );
};
