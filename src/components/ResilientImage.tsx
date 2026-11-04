import React, { useState } from 'react';
import { Layers } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackLabel?: string;
  priority?: boolean;
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  className = '',
  fallbackLabel,
  priority = false,
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-[#082820] text-[#E6FBF6]/80 p-6 text-center select-none ${className}`}
      >
        <div className="w-10 h-10 rounded-lg border border-[#06D6A0]/30 flex items-center justify-center mb-3 text-[#06D6A0]">
          <Layers className="w-5 h-5" aria-hidden="true" />
        </div>
        <span className="text-xs font-mono tracking-tight text-[#E6FBF6]/70 max-w-xs">
          {fallbackLabel || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setHasError(true)}
      className={className}
    />
  );
};
