import { useEffect, useRef, useState, CSSProperties } from 'react';

export interface UseFadeInUpOptions {
  /**
   * The percentage of the target element's visibility required before triggering.
   * Default: 0.12 (12%)
   */
  threshold?: number;
  /**
   * Margin around the root. Negative bottom margin triggers slightly before
   * the element enters the viewport bottom for natural rhythm.
   * Default: '0px 0px -50px 0px'
   */
  rootMargin?: string;
  /**
   * Whether the animation should trigger only once (recommended) or re-trigger on leave/enter.
   * Default: true
   */
  triggerOnce?: boolean;
  /**
   * Vertical distance in pixels for the slide-up effect.
   * Default: 24 (subtle, editorial, not jarring)
   */
  distance?: number;
  /**
   * Duration of the animation in milliseconds.
   * Default: 650ms
   */
  duration?: number;
  /**
   * Delay in milliseconds before the transition starts.
   * Useful for staggered cards or sections.
   * Default: 0ms
   */
  delay?: number;
  /**
   * Custom cubic-bezier easing curve.
   * Default: 'cubic-bezier(0.16, 1, 0.3, 1)' (smooth, luxury settling curve)
   */
  easing?: string;
  /**
   * If true, disables the observer and reveals immediately.
   */
  disabled?: boolean;
}

export interface UseFadeInUpReturn<T extends HTMLElement = HTMLElement> {
  ref: React.RefObject<T | null>;
  isVisible: boolean;
  style: CSSProperties;
  className: string;
}

/**
 * Custom hook powered by IntersectionObserver that triggers a subtle,
 * high-performance 'fade-in-up' reveal effect as elements enter the viewport.
 *
 * Honors `prefers-reduced-motion` and provides both precalculated CSSProperties
 * and utility classNames for maximum flexibility.
 */
export function useFadeInUp<T extends HTMLElement = HTMLElement>({
  threshold = 0.12,
  rootMargin = '0px 0px -50px 0px',
  triggerOnce = true,
  distance = 24,
  duration = 650,
  delay = 0,
  easing = 'cubic-bezier(0.16, 1, 0.3, 1)',
  disabled = false,
}: UseFadeInUpOptions = {}): UseFadeInUpReturn<T> {
  const ref = useRef<T | null>(null);

  // Check prefers-reduced-motion to respect accessibility preferences
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const [isVisible, setIsVisible] = useState<boolean>(() => {
    if (typeof window === 'undefined' || disabled || prefersReducedMotion) {
      return true;
    }
    if (!('IntersectionObserver' in window)) {
      return true;
    }
    return false;
  });

  useEffect(() => {
    if (isVisible && triggerOnce) return;
    if (disabled || prefersReducedMotion || typeof window === 'undefined') {
      setIsVisible(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (triggerOnce) {
              observer.unobserve(entry.target);
            }
          } else if (!triggerOnce) {
            setIsVisible(false);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce, disabled, prefersReducedMotion, isVisible]);

  // Compute compositor-only transform and opacity
  const transform = prefersReducedMotion
    ? 'none'
    : isVisible
    ? 'translate3d(0, 0, 0)'
    : `translate3d(0, ${distance}px, 0)`;

  const opacity = prefersReducedMotion ? 1 : isVisible ? 1 : 0;

  const transition = prefersReducedMotion
    ? 'none'
    : `opacity ${duration}ms ${easing} ${delay}ms, transform ${duration}ms ${easing} ${delay}ms`;

  const style: CSSProperties = {
    opacity,
    transform,
    transition,
    willChange: isVisible ? 'auto' : 'opacity, transform',
  };

  const className = `transition-all duration-${Math.min(1000, duration)} ease-out ${
    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 pointer-events-none'
  }`;

  return {
    ref,
    isVisible,
    style,
    className,
  };
}
