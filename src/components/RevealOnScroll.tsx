import React, { ElementType, HTMLAttributes, ReactNode } from 'react';
import { useScrollReveal, ScrollRevealOptions } from '../hooks/useScrollReveal';

export interface RevealOnScrollProps extends HTMLAttributes<HTMLElement>, ScrollRevealOptions {
  children: ReactNode;
  className?: string;
  delayMs?: number;
  duration?: number;
  distance?: number;
  direction?: 'up' | 'down' | 'none';
  as?: ElementType;
}

export const RevealOnScroll: React.FC<RevealOnScrollProps> = ({
  children,
  className = '',
  delayMs = 0,
  duration = 700,
  distance = 20,
  direction = 'up',
  threshold = 0.1,
  rootMargin = '0px 0px -60px 0px',
  triggerOnce = true,
  disabled = false,
  as: Component = 'div',
  style,
  ...rest
}) => {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({
    threshold,
    rootMargin,
    triggerOnce,
    disabled,
  });

  const getTransform = () => {
    if (isVisible) return 'translate3d(0, 0, 0)';
    if (direction === 'up') return `translate3d(0, ${distance}px, 0)`;
    if (direction === 'down') return `translate3d(0, -${distance}px, 0)`;
    return 'none';
  };

  const dynamicStyles: React.CSSProperties = {
    opacity: isVisible ? 1 : 0,
    transform: getTransform(),
    transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms`,
    willChange: isVisible ? 'auto' : 'opacity, transform',
    ...style,
  };

  return (
    <Component
      ref={ref}
      style={dynamicStyles}
      className={`reveal-on-scroll ${className}`}
      {...rest}
    >
      {children}
    </Component>
  );
};
