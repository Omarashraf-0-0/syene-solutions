import React, { useRef, useState, useCallback } from 'react';
import { useTheme } from '../../context/ThemeContext';

interface Card3DTiltProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  glareOpacity?: number;
}

export const Card3DTilt: React.FC<Card3DTiltProps> = ({
  children,
  className = '',
  maxTilt = 2.5,
  glareOpacity = 0.12,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Limit rotation strictly to a subtle, elegant angle (max 2.5 - 3 degrees)
  const effectiveTilt = Math.min(Math.max(maxTilt, 1), 3);

  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [transformStyle, setTransformStyle] = useState<string>(
    'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)'
  );
  const [glarePosition, setGlarePosition] = useState<{ x: number; y: number; opacity: number }>({
    x: 50,
    y: 50,
    opacity: 0,
  });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Subtle, smooth rotational deflection bounded within 2-3 degrees
      const rawRotateX = ((y - centerY) / centerY) * -effectiveTilt;
      const rawRotateY = ((x - centerX) / centerX) * effectiveTilt;

      const rotateX = Math.max(-effectiveTilt, Math.min(effectiveTilt, rawRotateX));
      const rotateY = Math.max(-effectiveTilt, Math.min(effectiveTilt, rawRotateY));

      setIsHovered(true);
      setTransformStyle(
        `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(4px)`
      );

      setGlarePosition({
        x: (x / rect.width) * 100,
        y: (y / rect.height) * 100,
        opacity: glareOpacity,
      });
    },
    [effectiveTilt, glareOpacity]
  );

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setTransformStyle('perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)');
    setGlarePosition((prev) => ({ ...prev, opacity: 0 }));
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: transformStyle,
        transition: isHovered
          ? 'transform 0.18s cubic-bezier(0.2, 0.8, 0.25, 1)'
          : 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
        transformStyle: 'preserve-3d',
      }}
      className={`relative rounded-xl overflow-hidden will-change-transform ${className}`}
    >
      {/* Specular 3D glare overlay (adaptive light/dark) */}
      <div
        className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-300"
        style={{
          opacity: glarePosition.opacity,
          background: isDark
            ? `radial-gradient(circle 320px at ${glarePosition.x}% ${glarePosition.y}%, rgba(197, 3, 55, 0.14), transparent 70%)`
            : `radial-gradient(circle 320px at ${glarePosition.x}% ${glarePosition.y}%, rgba(255, 255, 255, 0.5), transparent 70%)`,
        }}
        aria-hidden="true"
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
};
