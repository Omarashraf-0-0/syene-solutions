import React, { useEffect, useState } from 'react';
import { TechnicalSkill } from '../data/skills';
import { useTheme } from '../context/ThemeContext';
import { Cpu, Terminal, ShieldCheck, Layers, Sparkles } from 'lucide-react';

interface AnimatedProgressBarProps {
  skill: TechnicalSkill;
  isActive: boolean;
  onSelect: (skill: TechnicalSkill) => void;
  onHover: (skill: TechnicalSkill | null) => void;
  delayIndex?: number;
}

export const AnimatedProgressBar: React.FC<AnimatedProgressBarProps> = ({
  skill,
  isActive,
  onSelect,
  onHover,
  delayIndex = 0,
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [fillPercent, setFillPercent] = useState(0);

  useEffect(() => {
    // Staggered animated fill entrance
    const timer = setTimeout(() => {
      setFillPercent(skill.proficiency);
    }, 60 + delayIndex * 40);

    return () => clearTimeout(timer);
  }, [skill.proficiency, delayIndex]);

  const getCategoryIcon = (cat: TechnicalSkill['category']) => {
    switch (cat) {
      case 'ai':
        return Sparkles;
      case 'fullstack':
        return Terminal;
      case 'cloud':
        return Cpu;
      case 'spatial':
        return Layers;
    }
  };

  const Icon = getCategoryIcon(skill.category);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onSelect(skill)}
      onMouseEnter={() => onHover(skill)}
      onMouseLeave={() => onHover(null)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(skill);
        }
      }}
      className={`group relative p-5 rounded-2xl border transition-all duration-300 text-left cursor-pointer ${
        isActive
          ? isDark
            ? 'bg-[#1E020C] border-[#C50337] shadow-[0_10px_30px_rgba(0,0,0,0.7),0_0_20px_rgba(197,3,55,0.25)] ring-1 ring-[#C50337]/40'
            : 'bg-white border-[#69001F] shadow-[0_10px_30px_rgba(16,24,32,0.08),0_0_15px_rgba(105,0,31,0.1)] ring-1 ring-[#69001F]/30'
          : isDark
          ? 'glass-panel-3d border-[#69001F]/30 hover:border-[#C50337]/50'
          : 'bg-white/90 border-[#69001F]/15 hover:border-[#69001F]/40 shadow-sm'
      }`}
    >
      {/* Top Header: Title, Metric, Architecture Tier */}
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex items-start gap-3 min-w-0">
          <div
            className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center border transition-transform duration-200 group-hover:scale-105 ${
              isDark
                ? 'bg-[#02060E] border-[#69001F]/40'
                : 'bg-slate-100 border-[#69001F]/20'
            }`}
          >
            <Icon
              className={`w-4 h-4 ${
                isDark ? 'text-[#C50337]' : 'text-[#69001F]'
              }`}
            />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h4
                className={`font-display text-sm font-bold tracking-tight truncate ${
                  isDark ? 'text-[#F5EAF0]' : 'text-[#02060E]'
                }`}
              >
                {skill.name}
              </h4>
            </div>

            {/* Zero-pill metadata inline */}
            <div
              className={`flex items-center gap-2 text-[11px] font-mono mt-0.5 ${
                isDark ? 'text-[#F5EAF0]/60' : 'text-slate-500'
              }`}
            >
              <span>{skill.experience} Exp</span>
              <span aria-hidden="true">·</span>
              <span>{skill.productionDeployments} Prod Deploys</span>
              <span aria-hidden="true">·</span>
              <span
                className={`font-semibold ${
                  isDark ? 'text-[#C50337]' : 'text-[#69001F]'
                }`}
              >
                {skill.architectureTier}
              </span>
            </div>
          </div>
        </div>

        {/* Big percentage display */}
        <div className="text-right shrink-0">
          <div
            className={`font-mono text-lg font-bold tracking-tight ${
              isDark ? 'text-[#C50337]' : 'text-[#69001F]'
            }`}
          >
            {skill.proficiency}%
          </div>
          <div
            className={`text-[10px] font-mono uppercase tracking-wider ${
              isDark ? 'text-[#F5EAF0]/40' : 'text-slate-400'
            }`}
          >
            Proficiency
          </div>
        </div>
      </div>

      {/* Animated Telemetry Progress Bar Channel */}
      <div className="space-y-1.5 my-3">
        <div
          role="progressbar"
          aria-valuenow={skill.proficiency}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${skill.name} proficiency level`}
          className={`h-2.5 w-full rounded-full overflow-hidden relative ${
            isDark ? 'bg-[#02060E] border border-white/5' : 'bg-slate-200/80'
          }`}
        >
          {/* Tick markers at 25%, 50%, 75% */}
          <div className="absolute inset-0 flex justify-between pointer-events-none px-[25%] opacity-30">
            <span
              className={`w-[1px] h-full ${
                isDark ? 'bg-white/40' : 'bg-black/30'
              }`}
            />
            <span
              className={`w-[1px] h-full ${
                isDark ? 'bg-white/40' : 'bg-black/30'
              }`}
            />
          </div>

          {/* Animated Fill Bar */}
          <div
            className={`h-full rounded-full transition-all duration-1000 ease-out relative ${
              isDark
                ? 'bg-gradient-to-r from-[#310014] via-[#850021] to-[#C50337]'
                : 'bg-gradient-to-r from-[#1E020C] via-[#69001F] to-[#C50337]'
            }`}
            style={{ width: `${fillPercent}%` }}
          >
            {/* Glowing leading head */}
            <div
              className={`absolute right-0 top-0 bottom-0 w-2 rounded-full ${
                isDark ? 'bg-white shadow-[0_0_8px_#C50337]' : 'bg-white shadow-[0_0_8px_#69001F]'
              }`}
            />
          </div>
        </div>

        {/* Channel ticks labels */}
        <div
          className={`flex justify-between text-[9px] font-mono px-0.5 ${
            isDark ? 'text-[#F5EAF0]/30' : 'text-slate-400'
          }`}
        >
          <span>0%</span>
          <span>25%</span>
          <span>50%</span>
          <span>75%</span>
          <span>100%</span>
        </div>
      </div>

      {/* Micro-metrics grid */}
      <div
        className={`grid grid-cols-3 gap-2 py-2 px-3 rounded-xl text-xs font-mono border ${
          isDark
            ? 'bg-[#02060E]/70 border-[#69001F]/20 text-[#F5EAF0]/80'
            : 'bg-slate-50 border-[#69001F]/10 text-slate-700'
        }`}
      >
        {skill.metrics.map((metric) => (
          <div key={metric.label} className="truncate">
            <span
              className={`block text-[10px] truncate ${
                isDark ? 'text-[#F5EAF0]/45' : 'text-slate-400'
              }`}
            >
              {metric.label}
            </span>
            <span
              className={`font-semibold ${
                isDark ? 'text-[#C50337]' : 'text-[#69001F]'
              }`}
            >
              {metric.value}
            </span>
          </div>
        ))}
      </div>

      {/* Technologies tags list (Zero-pill discipline: typography with dots) */}
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-3 text-[11px] font-mono">
        <span
          className={`text-[10px] uppercase tracking-wider font-semibold ${
            isDark ? 'text-[#F5EAF0]/40' : 'text-slate-400'
          }`}
        >
          Stack:
        </span>
        {skill.tags.map((tag, idx) => (
          <React.Fragment key={tag}>
            <span
              className={`transition-colors ${
                isDark
                  ? 'text-[#F5EAF0]/80 group-hover:text-[#F5EAF0]'
                  : 'text-slate-700 group-hover:text-[#02060E]'
              }`}
            >
              {tag}
            </span>
            {idx < skill.tags.length - 1 && (
              <span
                className={isDark ? 'text-[#F5EAF0]/25' : 'text-slate-300'}
                aria-hidden="true"
              >
                ·
              </span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
