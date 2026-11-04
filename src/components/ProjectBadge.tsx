import React from 'react';
import {
  Sparkles,
  Code2,
  Server,
  Database,
  Smartphone,
  Layers,
  Globe,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export interface ProjectBadgeProps {
  /** The tech stack name or short description (e.g. 'React 19', 'Gemini 2.5 Flash', 'PostgreSQL') */
  tech: string;
  /** Size variant: 'xs' (ultra compact), 'sm' (standard card size), 'md' (hero/detail size) */
  size?: 'xs' | 'sm' | 'md';
  /** Whether to show a tech-specific icon. Defaults to true. */
  showIcon?: boolean;
  /** Optional interactive hover effect */
  interactive?: boolean;
  /** Additional custom classNames */
  className?: string;
}

interface TechMeta {
  type: 'ai' | 'frontend' | 'backend' | 'database' | 'mobile' | 'infra' | 'default';
  icon: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }>;
  dotColorDark: string;
  dotColorLight: string;
}

function classifyTech(techName: string): TechMeta {
  const normalized = techName.toLowerCase();

  // AI & Machine Learning
  if (
    normalized.includes('ai') ||
    normalized.includes('gemini') ||
    normalized.includes('rag') ||
    normalized.includes('llm') ||
    normalized.includes('inference') ||
    normalized.includes('vector') ||
    normalized.includes('guardrail')
  ) {
    return {
      type: 'ai',
      icon: Sparkles,
      dotColorDark: 'bg-[#C50337] shadow-[0_0_8px_#C50337]',
      dotColorLight: 'bg-[#69001F]',
    };
  }

  // Mobile
  if (
    normalized.includes('mobile') ||
    normalized.includes('react native') ||
    normalized.includes('android') ||
    normalized.includes('ios')
  ) {
    return {
      type: 'mobile',
      icon: Smartphone,
      dotColorDark: 'bg-[#C50337]',
      dotColorLight: 'bg-[#69001F]',
    };
  }

  // Database & Storage
  if (
    normalized.includes('sql') ||
    normalized.includes('postgres') ||
    normalized.includes('redis') ||
    normalized.includes('db') ||
    normalized.includes('distributed db')
  ) {
    return {
      type: 'database',
      icon: Database,
      dotColorDark: 'bg-[#850021]',
      dotColorLight: 'bg-[#69001F]',
    };
  }

  // Backend & APIs
  if (
    normalized.includes('node') ||
    normalized.includes('express') ||
    normalized.includes('api') ||
    normalized.includes('webhook') ||
    normalized.includes('queue') ||
    normalized.includes('gateway')
  ) {
    return {
      type: 'backend',
      icon: Server,
      dotColorDark: 'bg-[#C50337]',
      dotColorLight: 'bg-[#69001F]',
    };
  }

  // Frontend & UI
  if (
    normalized.includes('react') ||
    normalized.includes('next') ||
    normalized.includes('typescript') ||
    normalized.includes('tailwind') ||
    normalized.includes('frontend') ||
    normalized.includes('ui')
  ) {
    return {
      type: 'frontend',
      icon: Code2,
      dotColorDark: 'bg-[#F5EAF0]',
      dotColorLight: 'bg-[#69001F]',
    };
  }

  // Cloud & Infra
  if (
    normalized.includes('cloud') ||
    normalized.includes('docker') ||
    normalized.includes('run') ||
    normalized.includes('stripe') ||
    normalized.includes('payment')
  ) {
    return {
      type: 'infra',
      icon: Layers,
      dotColorDark: 'bg-[#69001F]',
      dotColorLight: 'bg-[#3B0018]',
    };
  }

  // Default fallback
  return {
    type: 'default',
    icon: Globe,
    dotColorDark: 'bg-[#F5EAF0]/60',
    dotColorLight: 'bg-[#69001F]/70',
  };
}

export const ProjectBadge: React.FC<ProjectBadgeProps> = ({
  tech,
  size = 'sm',
  showIcon = true,
  interactive = true,
  className = '',
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const meta = classifyTech(tech);
  const IconComponent = meta.icon;

  const sizeClasses = {
    xs: 'text-[10px] px-2 py-0.5 gap-1.5 rounded-md font-mono',
    sm: 'text-[11px] px-2.5 py-1 gap-1.5 rounded-lg font-mono',
    md: 'text-xs px-3 py-1.5 gap-2 rounded-lg font-mono',
  }[size];

  const iconSizes = {
    xs: 'w-2.5 h-2.5',
    sm: 'w-3 h-3',
    md: 'w-3.5 h-3.5',
  }[size];

  const dotSizes = {
    xs: 'w-1 h-1',
    sm: 'w-1.5 h-1.5',
    md: 'w-1.5 h-1.5',
  }[size];

  return (
    <span
      className={`inline-flex items-center backdrop-blur-md border tracking-tight select-none transition-all duration-200 ${sizeClasses} ${
        isDark
          ? `bg-[#1E020C]/75 text-[#F5EAF0]/90 border-[#69001F]/60 shadow-[0_2px_8px_rgba(2,6,14,0.4)] ${
              interactive
                ? 'hover:border-[#C50337]/50 hover:bg-[#3B0018]/40 hover:text-[#C50337] hover:-translate-y-0.5'
                : ''
            }`
          : `bg-white/85 text-[#02060E] border-[#69001F]/20 shadow-[0_1px_3px_rgba(2,6,14,0.05)] ${
              interactive
                ? 'hover:border-[#69001F]/40 hover:bg-[#F5EAF0]/80 hover:text-[#69001F] hover:-translate-y-0.5'
                : ''
            }`
      } ${className}`}
      title={tech}
    >
      {showIcon ? (
        <IconComponent
          className={`shrink-0 opacity-80 ${iconSizes} ${
            isDark ? 'text-[#C50337]' : 'text-[#69001F]'
          }`}
          aria-hidden="true"
        />
      ) : (
        <span
          className={`shrink-0 rounded-full ${dotSizes} ${
            isDark ? meta.dotColorDark : meta.dotColorLight
          }`}
          aria-hidden="true"
        />
      )}
      <span className="font-medium truncate max-w-[170px] sm:max-w-none">{tech}</span>
    </span>
  );
};
