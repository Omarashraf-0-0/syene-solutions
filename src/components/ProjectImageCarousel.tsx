import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, type Variants } from 'motion/react';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Play,
  Pause,
  Smartphone,
  Monitor,
} from 'lucide-react';
import { ProjectGalleryItem } from '../types/project';
import { ResilientImage } from './ResilientImage';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

interface ProjectImageCarouselProps {
  items: ProjectGalleryItem[];
  projectTitle: string;
  onOpenLightbox?: (item: ProjectGalleryItem) => void;
}

const slideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 320 : -320,
    opacity: 0,
    scale: 0.98,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: 'spring' as const, stiffness: 320, damping: 32 },
      opacity: { duration: 0.28 },
      scale: { duration: 0.28 },
    },
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 320 : -320,
    opacity: 0,
    scale: 0.98,
    transition: {
      x: { type: 'spring' as const, stiffness: 320, damping: 32 },
      opacity: { duration: 0.22 },
    },
  }),
};

export const ProjectImageCarousel: React.FC<ProjectImageCarouselProps> = ({
  items,
  projectTitle,
  onOpenLightbox,
}) => {
  const { theme } = useTheme();
  const { language, isRTL } = useLanguage();
  const isDark = theme === 'dark';

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const total = items.length;

  const paginate = useCallback(
    (newDirection: number) => {
      if (total <= 1) return;
      setDirection(newDirection);
      setCurrentIndex((prev) => {
        let next = prev + newDirection;
        if (next < 0) next = total - 1;
        if (next >= total) next = 0;
        return next;
      });
    },
    [total]
  );

  const goToSlide = useCallback(
    (targetIndex: number) => {
      if (targetIndex === currentIndex || targetIndex < 0 || targetIndex >= total) return;
      setDirection(targetIndex > currentIndex ? 1 : -1);
      setCurrentIndex(targetIndex);
    },
    [currentIndex, total]
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;

      if (e.key === 'ArrowLeft') {
        paginate(isRTL ? 1 : -1);
      } else if (e.key === 'ArrowRight') {
        paginate(isRTL ? -1 : 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [paginate, isRTL]);

  // Autoplay loop
  useEffect(() => {
    if (!isPlaying || isHovered || total <= 1) return;

    const timer = setInterval(() => {
      paginate(1);
    }, 4500);

    return () => clearInterval(timer);
  }, [isPlaying, isHovered, paginate, total]);

  if (!items || items.length === 0) {
    return null;
  }

  const currentItem = items[currentIndex];
  const currentTitle = language === 'ar' && currentItem.titleAr ? currentItem.titleAr : currentItem.title;
  const currentCaption = language === 'ar' && currentItem.captionAr ? currentItem.captionAr : currentItem.caption;
  const currentTag = language === 'ar' && currentItem.tagAr ? currentItem.tagAr : currentItem.tag;

  return (
    <div
      ref={containerRef}
      role="region"
      aria-roledescription="carousel"
      aria-label={`${projectTitle} UI Mockups and Screenshots Carousel`}
      className={`rounded-2xl border transition-all duration-300 relative overflow-hidden select-none shadow-2xl ${
        isDark
          ? 'bg-[#0E2336]/90 border-[#143C5A]/40 shadow-[0_20px_50px_rgba(0,0,0,0.7)]'
          : 'bg-white/95 border-slate-200/90 shadow-[0_20px_50px_rgba(16,24,32,0.08)]'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Browser / Studio Mockup Header */}
      <div
        className={`px-4 sm:px-6 py-3 border-b flex items-center justify-between gap-4 text-xs font-mono transition-colors ${
          isDark
            ? 'bg-[#0A1622]/90 border-[#143C5A]/30 text-[#FAF6EE]/75'
            : 'bg-slate-50 border-slate-200 text-slate-700'
        }`}
      >
        <div className="flex items-center gap-2">
          {/* Mac-style Window Controls */}
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
          </div>

          <div
            className={`hidden sm:inline-flex items-center gap-1.5 ms-3 px-2.5 py-0.5 rounded-md text-[11px] border ${
              isDark
                ? 'bg-[#0E2336] border-[#143C5A]/40 text-[#FAF6EE]/70'
                : 'bg-white border-slate-200 text-slate-600'
            }`}
            dir="ltr"
          >
            {currentItem.tag?.toLowerCase().includes('mobile') ? (
              <Smartphone className="w-3 h-3" />
            ) : (
              <Monitor className="w-3 h-3" />
            )}
            <span>preview.nubix.studio/{currentIndex + 1}</span>
          </div>
        </div>

        {/* Current Tag Badge & Counter */}
        <div className="flex items-center gap-3">
          {currentTag && (
            <span
              className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${
                isDark
                  ? 'bg-[#D9A441]/15 text-[#D9A441] border-[#D9A441]/40'
                  : 'bg-[#FAF6EE] text-[#143C5A] border-[#143C5A]/20'
              }`}
            >
              {currentTag}
            </span>
          )}

          <div className="flex items-center gap-1 font-mono">
            <span
              className={`font-bold tabular-nums ${isDark ? 'text-[#D9A441]' : 'text-[#143C5A]'}`}
            >
              {String(currentIndex + 1).padStart(2, '0')}
            </span>
            <span className="opacity-40">/</span>
            <span className="opacity-60 tabular-nums">
              {String(total).padStart(2, '0')}
            </span>
          </div>

          {/* Autoplay & Zoom Controls */}
          <div className="flex items-center gap-1 ps-2 border-s border-current/10">
            <button
              type="button"
              onClick={() => setIsPlaying((prev) => !prev)}
              aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
              title={isPlaying ? (language === 'ar' ? 'إيقاف التشغيل التلقائي' : 'Pause slideshow') : (language === 'ar' ? 'تشغيل تلقائي' : 'Play slideshow')}
              className={`p-1.5 rounded-lg border transition-colors ${
                isPlaying
                  ? isDark
                    ? 'bg-[#D9A441] text-[#FAF6EE] border-[#D9A441]'
                    : 'bg-[#0A1622] text-[#FAF6EE] border-[#0A1622]'
                  : isDark
                  ? 'bg-transparent text-[#FAF6EE]/70 hover:text-[#FAF6EE] border-transparent hover:border-[#143C5A]/50'
                  : 'bg-transparent text-slate-600 hover:text-[#0A1622] border-transparent hover:border-slate-300'
              }`}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>

            {onOpenLightbox && (
              <button
                type="button"
                onClick={() => onOpenLightbox(currentItem)}
                aria-label={language === 'ar' ? 'تكبير الصورة' : 'Expand full screen'}
                title={language === 'ar' ? 'تكبير بملء الشاشة' : 'Expand preview in lightbox'}
                className={`p-1.5 rounded-lg border transition-colors ${
                  isDark
                    ? 'bg-transparent text-[#FAF6EE]/70 hover:text-[#FAF6EE] border-transparent hover:border-[#143C5A]/50'
                    : 'bg-transparent text-slate-600 hover:text-[#0A1622] border-transparent hover:border-slate-300'
                }`}
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Image Viewport with Smooth Swipe & Crossfade */}
      <div className="relative aspect-video overflow-hidden bg-black/40 flex items-center justify-center">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, { offset, velocity }) => {
              const swipe = Math.abs(offset.x) * velocity.x;
              if (swipe < -8000 || offset.x < -60) {
                paginate(isRTL ? -1 : 1);
              } else if (swipe > 8000 || offset.x > 60) {
                paginate(isRTL ? 1 : -1);
              }
            }}
            onClick={() => onOpenLightbox && onOpenLightbox(currentItem)}
            className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing flex items-center justify-center"
          >
            <ResilientImage
              src={currentItem.url}
              alt={currentItem.alt}
              priority
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.015]"
            />

            {/* Click to Enlarge Overlay Indicator */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-6 pointer-events-none">
              <span className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-white/90 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/15">
                <Maximize2 className="w-3.5 h-3.5 text-[#D9A441]" />
                <span>{language === 'ar' ? 'انقر للتكبير بملء الشاشة' : 'Click to zoom in fullscreen'}</span>
              </span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Previous Button */}
        {total > 1 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              paginate(-1);
            }}
            aria-label={language === 'ar' ? 'الشريحة السابقة' : 'Previous screenshot'}
            className={`absolute start-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md border shadow-lg transition-all duration-200 hover:scale-105 ${
              isDark
                ? 'bg-[#0A1622]/80 text-[#FAF6EE] border-[#143C5A]/50 hover:border-[#D9A441] hover:text-[#D9A441]'
                : 'bg-white/85 text-[#0A1622] border-slate-200 hover:border-[#143C5A] hover:text-[#143C5A]'
            }`}
          >
            {isRTL ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        )}

        {/* Next Button */}
        {total > 1 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              paginate(1);
            }}
            aria-label={language === 'ar' ? 'الشريحة التالية' : 'Next screenshot'}
            className={`absolute end-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md border shadow-lg transition-all duration-200 hover:scale-105 ${
              isDark
                ? 'bg-[#0A1622]/80 text-[#FAF6EE] border-[#143C5A]/50 hover:border-[#D9A441] hover:text-[#D9A441]'
                : 'bg-white/85 text-[#0A1622] border-slate-200 hover:border-[#143C5A] hover:text-[#143C5A]'
            }`}
          >
            {isRTL ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
          </button>
        )}
      </div>

      {/* Autoplay Progress Line */}
      {isPlaying && (
        <div className="w-full h-0.5 bg-current/10 relative overflow-hidden">
          <motion.div
            key={currentIndex}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 4.5, ease: 'linear' }}
            style={{ originX: isRTL ? 1 : 0 }}
            className={`h-full ${isDark ? 'bg-[#D9A441]' : 'bg-[#143C5A]'}`}
          />
        </div>
      )}

      {/* Caption & Metadata Bar */}
      <div
        className={`p-4 sm:p-5 border-t transition-colors ${
          isDark
            ? 'bg-[#0A1622]/70 border-[#143C5A]/30 text-[#FAF6EE]'
            : 'bg-slate-50/90 border-slate-200 text-[#0A1622]'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className={`text-xs font-mono font-semibold ${isDark ? 'text-[#D9A441]' : 'text-[#143C5A]'}`}>
                {language === 'ar' ? `لقطة شاشة ${currentIndex + 1}` : `Screenshot ${currentIndex + 1}`}
              </span>
              {currentTitle && (
                <>
                  <span className="opacity-30">·</span>
                  <span className="text-xs font-semibold">{currentTitle}</span>
                </>
              )}
            </div>
            <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-[#FAF6EE]/75' : 'text-slate-600'}`}>
              {currentCaption}
            </p>
          </div>

          {/* Quick Swipe Hint */}
          <div className="shrink-0 flex items-center gap-1.5 text-[11px] font-mono opacity-50">
            <span>{language === 'ar' ? 'اسحب أو استخدم الأسهم للتنقل' : 'Swipe or click arrows'}</span>
          </div>
        </div>

        {/* Thumbnail Selector Strip */}
        {total > 1 && (
          <div className="mt-4 pt-3 border-t border-current/10 grid grid-cols-4 gap-2 sm:gap-3">
            {items.map((item, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={`${item.url}-${idx}`}
                  type="button"
                  onClick={() => goToSlide(idx)}
                  className={`relative rounded-xl overflow-hidden border aspect-[16/10] transition-all duration-200 group text-start ${
                    isActive
                      ? isDark
                        ? 'border-[#D9A441] ring-2 ring-[#D9A441]/30 scale-[1.02]'
                        : 'border-[#143C5A] ring-2 ring-[#143C5A]/20 scale-[1.02]'
                      : isDark
                      ? 'border-[#143C5A]/40 hover:border-[#D9A441]/60 opacity-60 hover:opacity-100'
                      : 'border-slate-200 hover:border-slate-400 opacity-60 hover:opacity-100'
                  }`}
                >
                  <ResilientImage
                    src={item.url}
                    alt={item.alt}
                    className="w-full h-full object-cover"
                  />
                  <div
                    className={`absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors ${
                      isActive ? 'bg-transparent' : ''
                    }`}
                  />
                  <div className="absolute bottom-1 inset-x-1.5 flex items-center justify-between">
                    <span
                      className={`text-[10px] font-mono px-1 rounded backdrop-blur-md ${
                        isActive
                          ? isDark
                            ? 'bg-[#D9A441] text-[#FAF6EE] font-bold'
                            : 'bg-[#143C5A] text-[#FAF6EE] font-bold'
                          : 'bg-black/60 text-white/80'
                      }`}
                    >
                      0{idx + 1}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
