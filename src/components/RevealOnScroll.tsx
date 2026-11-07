import React, { ElementType, HTMLAttributes, ReactNode } from 'react';
import { useFadeInUp, UseFadeInUpOptions } from '../hooks/useFadeInUp';

export interface RevealOnScrollProps extends HTMLAttributes<HTMLElement>, UseFadeInUpOptions {
  children: ReactNode;
  className?: string;
  delayMs?: number;
  direction?: 'up' | 'down' | 'none';
  as?: ElementType;
}

export const RevealOnScroll: React.FC<RevealOnScrollProps> = ({
  children,
  className = '',
  delayMs = 0,
  duration = 650,
  distance = 24,
  direction = 'up',
  threshold = 0.12,
  rootMargin = '0px 0px -50px 0px',
  triggerOnce = true,
  disabled = false,
  as: Component = 'div',
  style,
  ...rest
}) => {
  const { ref, isVisible, style: hookStyle } = useFadeInUp<HTMLElement>({
    threshold,
    rootMargin,
    triggerOnce,
    distance,
    duration,
    delay: delayMs,
    disabled,
  });

  const getTransform = () => {
    if (isVisible) return 'translate3d(0, 0, 0)';
    if (direction === 'up') return `translate3d(0, ${distance}px, 0)`;
    if (direction === 'down') return `translate3d(0, -${distance}px, 0)`;
    return 'none';
  };

  const dynamicStyles: React.CSSProperties = {
    ...hookStyle,
    transform: getTransform(),
    ...style,
  };

  return (
    <Component
      ref={ref as any}
      style={dynamicStyles}
      className={`reveal-on-scroll ${className}`}
      {...rest}
    >
      {children}
    </Component>
  );
};
