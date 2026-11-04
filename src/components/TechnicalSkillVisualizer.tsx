import React, { useState, useMemo } from 'react';
import {
  TECHNICAL_SKILLS,
  SKILL_CATEGORIES,
  SkillCategory,
  TechnicalSkill,
} from '../data/skills';
import { RadarChart } from './RadarChart';
import { AnimatedProgressBar } from './AnimatedProgressBar';
import { useTheme } from '../context/ThemeContext';
import {
  Radar,
  BarChart3,
  Columns2,
  Sparkles,
  Terminal,
  Cpu,
  Layers,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';

interface TechnicalSkillVisualizerProps {
  onNavigateContact?: () => void;
}

export const TechnicalSkillVisualizer: React.FC<TechnicalSkillVisualizerProps> = ({
  onNavigateContact,
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [activeCategory, setActiveCategory] = useState<SkillCategory>('all');
  const [viewMode, setViewMode] = useState<'split' | 'radar' | 'bars'>('split');
  const [selectedSkill, setSelectedSkill] = useState<TechnicalSkill>(
    TECHNICAL_SKILLS[0]
  );
  const [hoveredSkill, setHoveredSkill] = useState<TechnicalSkill | null>(null);

  // Filter skills based on chosen category
  const filteredSkills = useMemo(() => {
    if (activeCategory === 'all') {
      return TECHNICAL_SKILLS;
    }
    return TECHNICAL_SKILLS.filter((s) => s.category === activeCategory);
  }, [activeCategory]);

  const activeCategoryMeta = useMemo(() => {
    return (
      SKILL_CATEGORIES.find((c) => c.id === activeCategory) ||
      SKILL_CATEGORIES[0]
    );
  }, [activeCategory]);

  // The displayed inspector skill is either the hovered one or the selected one
  const displayedSkill = hoveredSkill || selectedSkill;

  // Aggregate telemetry stats for current category
  const stats = useMemo(() => {
    const count = filteredSkills.length;
    const avgProf =
      Math.round(
        (filteredSkills.reduce((acc, s) => acc + s.proficiency, 0) / count) * 10
      ) / 10;
    const totalDeployments = filteredSkills.reduce(
      (acc, s) => acc + s.productionDeployments,
      0
    );
    return { count, avgProf, totalDeployments };
  }, [filteredSkills]);

  return (
    <section
      id="technical-radar"
      className={`py-20 lg:py-28 border-b relative transition-colors duration-300 ${
        isDark
          ? 'bg-[#02060E]/90 border-[#69001F]/30'
          : 'bg-[#F5EAF0]/80 border-[#69001F]/15'
      }`}
    >
      {/* Background ambient lighting */}
      <div
        className={`absolute top-1/3 left-10 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none ${
          isDark ? 'bg-[#C50337]/5' : 'bg-[#69001F]/5'
        }`}
        aria-hidden="true"
      />
      <div
        className={`absolute bottom-10 right-10 w-[450px] h-[450px] rounded-full blur-[130px] pointer-events-none ${
          isDark ? 'bg-[#1E020C]/40' : 'bg-[#EEDBE6]/60'
        }`}
        aria-hidden="true"
      />

      <div className="max-w-[1240px] mx-auto px-6 space-y-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div
              className={`flex items-center gap-2 text-xs font-mono font-semibold ${
                isDark ? 'text-[#C50337]' : 'text-[#69001F]'
              }`}
            >
              <span>03. Engineering &amp; AI Radar</span>
              <span aria-hidden="true">·</span>
              <span className={isDark ? 'text-[#F5EAF0]/60' : 'text-slate-500'}>
                Technical Proficiency Matrix
              </span>
            </div>

            <h2
              className={`font-display text-3xl sm:text-4xl font-bold tracking-tight text-balance ${
                isDark ? 'text-[#F5EAF0]' : 'text-[#02060E]'
              }`}
            >
              High-precision technical skills &amp; AI capabilities
            </h2>

            <p
              className={`text-base leading-relaxed ${
                isDark ? 'text-[#F5EAF0]/75' : 'text-slate-600'
              }`}
            >
              Real production benchmarks across autonomous agents, distributed
              systems, cloud MLOps, and 3D spatial engineering. Explore our
              competency radar or review detailed telemetry bars below.
            </p>
          </div>

          {/* View Mode Toggle */}
          <div
            className={`flex items-center p-1.5 rounded-xl border self-start lg:self-auto shrink-0 ${
              isDark
                ? 'bg-[#1E020C] border-[#69001F]/40'
                : 'bg-white border-slate-200 shadow-sm'
            }`}
          >
            <button
              type="button"
              onClick={() => setViewMode('split')}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-mono font-medium rounded-lg transition-all ${
                viewMode === 'split'
                  ? isDark
                    ? 'bg-[#C50337] text-[#F5EAF0] font-bold shadow-md'
                    : 'bg-[#02060E] text-[#F5EAF0] font-bold shadow-sm'
                  : isDark
                  ? 'text-[#F5EAF0]/70 hover:text-[#F5EAF0]'
                  : 'text-slate-600 hover:text-[#02060E]'
              }`}
            >
              <Columns2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Split Matrix</span>
              <span className="sm:hidden">Split</span>
            </button>

            <button
              type="button"
              onClick={() => setViewMode('radar')}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-mono font-medium rounded-lg transition-all ${
                viewMode === 'radar'
                  ? isDark
                    ? 'bg-[#C50337] text-[#F5EAF0] font-bold shadow-md'
                    : 'bg-[#02060E] text-[#F5EAF0] font-bold shadow-sm'
                  : isDark
                  ? 'text-[#F5EAF0]/70 hover:text-[#F5EAF0]'
                  : 'text-slate-600 hover:text-[#02060E]'
              }`}
            >
              <Radar className="w-3.5 h-3.5" />
              <span>Radar Chart</span>
            </button>

            <button
              type="button"
              onClick={() => setViewMode('bars')}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-mono font-medium rounded-lg transition-all ${
                viewMode === 'bars'
                  ? isDark
                    ? 'bg-[#C50337] text-[#F5EAF0] font-bold shadow-md'
                    : 'bg-[#02060E] text-[#F5EAF0] font-bold shadow-sm'
                  : isDark
                  ? 'text-[#F5EAF0]/70 hover:text-[#F5EAF0]'
                  : 'text-slate-600 hover:text-[#02060E]'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Telemetry Bars</span>
            </button>
          </div>
        </div>

        {/* Category Navigation Bar (Zero-pill discipline) */}
        <div className="space-y-4">
          <div
            className={`flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b ${
              isDark ? 'border-[#69001F]/30' : 'border-[#69001F]/15'
            }`}
          >
            {SKILL_CATEGORIES.map((cat) => {
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setActiveCategory(cat.id);
                    // Select first skill of category if current is outside
                    const match =
                      cat.id === 'all'
                        ? TECHNICAL_SKILLS[0]
                        : TECHNICAL_SKILLS.find((s) => s.category === cat.id);
                    if (match) setSelectedSkill(match);
                  }}
                  className={`flex items-center gap-2.5 px-4 py-2.5 text-xs font-mono transition-all whitespace-nowrap shrink-0 border-b-2 -mb-[1px] ${
                    isSelected
                      ? isDark
                        ? 'border-[#C50337] text-[#C50337] font-bold'
                        : 'border-[#69001F] text-[#69001F] font-bold'
                      : isDark
                      ? 'border-transparent text-[#F5EAF0]/60 hover:text-[#F5EAF0]'
                      : 'border-transparent text-slate-500 hover:text-[#02060E]'
                  }`}
                >
                  <span
                    className={`text-[10px] ${
                      isSelected
                        ? isDark
                          ? 'text-[#C50337]'
                          : 'text-[#69001F]'
                        : isDark
                        ? 'text-[#F5EAF0]/40'
                        : 'text-slate-400'
                    }`}
                  >
                    {cat.code}
                  </span>
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Category Description & Live Metrics Bar */}
          <div
            className={`p-4 rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs font-mono border ${
              isDark
                ? 'bg-[#1E020C]/70 border-[#69001F]/30 text-[#F5EAF0]/80'
                : 'bg-white border-slate-200 text-slate-700 shadow-sm'
            }`}
          >
            <div className="flex items-center gap-3">
              <span
                className={`w-2 h-2 rounded-full ${
                  isDark ? 'bg-[#C50337]' : 'bg-[#69001F]'
                }`}
              />
              <span className="leading-relaxed">
                {activeCategoryMeta.description}
              </span>
            </div>

            <div className="flex items-center gap-5 shrink-0 self-end md:self-auto">
              <span>
                INDEX:{' '}
                <strong
                  className={isDark ? 'text-[#C50337]' : 'text-[#69001F]'}
                >
                  {stats.avgProf}%
                </strong>
              </span>
              <span>·</span>
              <span>
                DEPLOYS:{' '}
                <strong
                  className={isDark ? 'text-[#C50337]' : 'text-[#69001F]'}
                >
                  {stats.totalDeployments}
                </strong>
              </span>
              <span>·</span>
              <span>
                TRACKS:{' '}
                <strong
                  className={isDark ? 'text-[#C50337]' : 'text-[#69001F]'}
                >
                  {stats.count}
                </strong>
              </span>
            </div>
          </div>
        </div>

        {/* Dynamic Display Layout */}
        {viewMode === 'split' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 5 Cols: Radar Visualizer */}
            <div className="lg:col-span-6 glass-panel-3d p-6 rounded-2xl md:rounded-3xl flex flex-col items-center justify-center">
              <div className="w-full text-left mb-2">
                <span
                  className={`text-[10px] font-mono uppercase tracking-wider ${
                    isDark ? 'text-[#C50337]' : 'text-[#69001F]'
                  }`}
                >
                  Architectural Vector Analysis
                </span>
                <h3
                  className={`font-display text-lg font-bold ${
                    isDark ? 'text-[#F5EAF0]' : 'text-[#02060E]'
                  }`}
                >
                  Domain Competency Radar
                </h3>
              </div>

              <RadarChart
                skills={filteredSkills}
                activeSkillId={displayedSkill.id}
                onSelectSkill={(skill) => setSelectedSkill(skill)}
                onHoverSkill={(skill) => setHoveredSkill(skill)}
              />

              {/* Inspector Preview Card Under Radar */}
              <div
                className={`w-full mt-6 p-5 rounded-xl border text-left transition-all ${
                  isDark
                    ? 'bg-[#02060E]/80 border-[#69001F]/40'
                    : 'bg-slate-50 border-[#69001F]/20'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <div
                      className={`text-[10px] font-mono uppercase font-semibold ${
                        isDark ? 'text-[#C50337]' : 'text-[#69001F]'
                      }`}
                    >
                      Selected Capability // {displayedSkill.architectureTier}
                    </div>
                    <h4
                      className={`font-display text-base font-bold ${
                        isDark ? 'text-[#F5EAF0]' : 'text-[#02060E]'
                      }`}
                    >
                      {displayedSkill.name}
                    </h4>
                  </div>
                  <div
                    className={`font-mono text-xl font-bold ${
                      isDark ? 'text-[#C50337]' : 'text-[#69001F]'
                    }`}
                  >
                    {displayedSkill.proficiency}%
                  </div>
                </div>

                <p
                  className={`text-xs leading-relaxed mb-3 ${
                    isDark ? 'text-[#F5EAF0]/75' : 'text-slate-600'
                  }`}
                >
                  {displayedSkill.summary}
                </p>

                <div className="grid grid-cols-3 gap-2 py-2 border-t border-b border-black/5 dark:border-white/5 text-xs font-mono">
                  {displayedSkill.metrics.map((m) => (
                    <div key={m.label}>
                      <div
                        className={`text-[9px] uppercase truncate ${
                          isDark ? 'text-[#F5EAF0]/40' : 'text-slate-400'
                        }`}
                      >
                        {m.label}
                      </div>
                      <div
                        className={`font-semibold ${
                          isDark ? 'text-[#C50337]' : 'text-[#69001F]'
                        }`}
                      >
                        {m.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right 6 Cols: Telemetry Progress Bars */}
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center justify-between px-1">
                <div>
                  <span
                    className={`text-[10px] font-mono uppercase tracking-wider ${
                      isDark ? 'text-[#C50337]' : 'text-[#69001F]'
                    }`}
                  >
                    Production Benchmarks
                  </span>
                  <h3
                    className={`font-display text-lg font-bold ${
                      isDark ? 'text-[#F5EAF0]' : 'text-[#02060E]'
                    }`}
                  >
                    Engineered Technology Telemetry
                  </h3>
                </div>
                <span
                  className={`text-xs font-mono ${
                    isDark ? 'text-[#F5EAF0]/50' : 'text-slate-500'
                  }`}
                >
                  Showing {filteredSkills.length} competencies
                </span>
              </div>

              <div className="space-y-3.5 max-h-[820px] overflow-y-auto pr-1">
                {filteredSkills.map((skill, idx) => (
                  <AnimatedProgressBar
                    key={skill.id}
                    skill={skill}
                    isActive={displayedSkill.id === skill.id}
                    onSelect={(s) => setSelectedSkill(s)}
                    onHover={(s) => setHoveredSkill(s)}
                    delayIndex={idx}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {viewMode === 'radar' && (
          <div className="glass-panel-3d p-8 md:p-12 rounded-3xl flex flex-col items-center justify-center max-w-3xl mx-auto space-y-6">
            <div className="text-center space-y-2 max-w-md">
              <span
                className={`text-xs font-mono uppercase font-semibold ${
                  isDark ? 'text-[#C50337]' : 'text-[#69001F]'
                }`}
              >
                Comprehensive 360° Studio Coverage
              </span>
              <h3
                className={`font-display text-2xl font-bold ${
                  isDark ? 'text-[#F5EAF0]' : 'text-[#02060E]'
                }`}
              >
                Engineering &amp; AI Radar Map
              </h3>
              <p
                className={`text-xs ${
                  isDark ? 'text-[#F5EAF0]/70' : 'text-slate-600'
                }`}
              >
                Hover any vertex to view verified uptime SLA, benchmark latency, and production stack implementations.
              </p>
            </div>

            <RadarChart
              skills={filteredSkills}
              activeSkillId={displayedSkill.id}
              onSelectSkill={(skill) => setSelectedSkill(skill)}
              onHoverSkill={(skill) => setHoveredSkill(skill)}
            />

            {/* In-depth Skill Card */}
            <div
              className={`w-full max-w-xl p-6 rounded-2xl border transition-all ${
                isDark
                  ? 'bg-[#1E020C] border-[#C50337]/30'
                  : 'bg-white border-[#69001F]/30 shadow-md'
              }`}
            >
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <div
                    className={`text-xs font-mono uppercase font-semibold ${
                      isDark ? 'text-[#C50337]' : 'text-[#69001F]'
                    }`}
                  >
                    {displayedSkill.architectureTier} · {displayedSkill.experience} Production Experience
                  </div>
                  <h4
                    className={`font-display text-lg font-bold ${
                      isDark ? 'text-[#F5EAF0]' : 'text-[#02060E]'
                    }`}
                  >
                    {displayedSkill.name}
                  </h4>
                </div>
                <div
                  className={`text-2xl font-mono font-bold ${
                    isDark ? 'text-[#C50337]' : 'text-[#69001F]'
                  }`}
                >
                  {displayedSkill.proficiency}%
                </div>
              </div>

              <p
                className={`text-xs leading-relaxed mb-4 ${
                  isDark ? 'text-[#F5EAF0]/80' : 'text-slate-600'
                }`}
              >
                {displayedSkill.summary}
              </p>

              <div className="grid grid-cols-3 gap-3 py-3 border-t border-b border-black/10 dark:border-white/10 text-xs font-mono">
                {displayedSkill.metrics.map((m) => (
                  <div key={m.label}>
                    <div
                      className={`text-[10px] uppercase ${
                        isDark ? 'text-[#F5EAF0]/40' : 'text-slate-400'
                      }`}
                    >
                      {m.label}
                    </div>
                    <div
                      className={`font-semibold ${
                        isDark ? 'text-[#C50337]' : 'text-[#69001F]'
                      }`}
                    >
                      {m.value}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-2 mt-4 text-xs font-mono">
                <span
                  className={isDark ? 'text-[#F5EAF0]/50' : 'text-slate-400'}
                >
                  Verified Stack:
                </span>
                {displayedSkill.tags.map((tag, i) => (
                  <span
                    key={tag}
                    className={`font-medium ${
                      isDark ? 'text-[#C50337]' : 'text-[#69001F]'
                    }`}
                  >
                    {tag}
                    {i < displayedSkill.tags.length - 1 ? ' ·' : ''}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {viewMode === 'bars' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredSkills.map((skill, idx) => (
                <AnimatedProgressBar
                  key={skill.id}
                  skill={skill}
                  isActive={displayedSkill.id === skill.id}
                  onSelect={(s) => setSelectedSkill(s)}
                  onHover={(s) => setHoveredSkill(s)}
                  delayIndex={idx}
                />
              ))}
            </div>
          </div>
        )}

        {/* Studio Technical Rigor Summary Banner */}
        <div
          className={`p-6 sm:p-8 rounded-2xl glass-panel-3d border flex flex-col md:flex-row items-start md:items-center justify-between gap-6 ${
            isDark ? 'border-[#C50337]/30' : 'border-[#69001F]/20'
          }`}
        >
          <div className="space-y-1.5 max-w-xl">
            <div
              className={`text-xs font-mono uppercase font-semibold ${
                isDark ? 'text-[#C50337]' : 'text-[#69001F]'
              }`}
            >
              Enterprise Engineering Assurance
            </div>
            <h4
              className={`font-display text-lg font-bold ${
                isDark ? 'text-[#F5EAF0]' : 'text-[#02060E]'
              }`}
            >
              All competencies adhere to strict typed architectural standards
            </h4>
            <p
              className={`text-xs leading-relaxed ${
                isDark ? 'text-[#F5EAF0]/75' : 'text-slate-600'
              }`}
            >
              Every production delivery includes automated unit &amp; e2e regression testing,
              OpenTelemetry instrumentation, and zero-downtime containerized blue/green deployments.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {onNavigateContact && (
              <button
                type="button"
                onClick={onNavigateContact}
                className={`inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-xl transition-all shadow-md ${
                  isDark
                    ? 'crimson-noir-gradient text-[#F5EAF0] font-bold shadow-[0_0_15px_rgba(197,3,55,0.25)]'
                    : 'bg-[#69001F] text-[#F5EAF0] hover:bg-[#3B0018]'
                }`}
              >
                <span>Inquire Technical Specs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
