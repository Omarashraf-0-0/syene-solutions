import React, { useState, useMemo } from 'react';
import { TechnicalSkill } from '../data/skills';
import { useTheme } from '../context/ThemeContext';
import { Sparkles, Layers, Activity } from 'lucide-react';

interface RadarChartProps {
  skills: TechnicalSkill[];
  activeSkillId: string | null;
  onSelectSkill: (skill: TechnicalSkill) => void;
  onHoverSkill: (skill: TechnicalSkill | null) => void;
}

export const RadarChart: React.FC<RadarChartProps> = ({
  skills,
  activeSkillId,
  onSelectSkill,
  onHoverSkill,
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [isRotatingSweep, setIsRotatingSweep] = useState(true);

  // SVG Dimension Constants
  const size = 520;
  const center = size / 2;
  const maxRadius = 185;
  const levels = [0.25, 0.5, 0.75, 1.0];

  const total = skills.length;

  // Compute vertices for polygon and axes
  const vertices = useMemo(() => {
    return skills.map((skill, index) => {
      const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
      const ratio = skill.proficiency / 100;
      const r = ratio * maxRadius;

      const x = center + r * Math.cos(angle);
      const y = center + r * Math.sin(angle);

      // Axis endpoint
      const axisX = center + maxRadius * Math.cos(angle);
      const axisY = center + maxRadius * Math.sin(angle);

      // Outer label position
      const labelDist = maxRadius + 32;
      const labelX = center + labelDist * Math.cos(angle);
      const labelY = center + labelDist * Math.sin(angle);

      // Dynamic text anchor based on angle
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      let textAnchor: 'start' | 'middle' | 'end' = 'middle';
      if (cos > 0.2) textAnchor = 'start';
      else if (cos < -0.2) textAnchor = 'end';

      let dominantBaseline: 'hanging' | 'central' | 'auto' = 'central';
      if (sin > 0.6) dominantBaseline = 'hanging';
      else if (sin < -0.6) dominantBaseline = 'auto';

      return {
        skill,
        angle,
        x,
        y,
        axisX,
        axisY,
        labelX,
        labelY,
        textAnchor,
        dominantBaseline,
      };
    });
  }, [skills, total, center, maxRadius]);

  // Polygon points string
  const polygonPoints = useMemo(() => {
    return vertices.map((v) => `${v.x.toFixed(1)},${v.y.toFixed(1)}`).join(' ');
  }, [vertices]);

  // Concentric polygon rings
  const ringPolygons = useMemo(() => {
    return levels.map((lvl) => {
      const r = lvl * maxRadius;
      const pts = skills
        .map((_, i) => {
          const angle = (Math.PI * 2 * i) / total - Math.PI / 2;
          const x = center + r * Math.cos(angle);
          const y = center + r * Math.sin(angle);
          return `${x.toFixed(1)},${y.toFixed(1)}`;
        })
        .join(' ');
      return { level: lvl, points: pts };
    });
  }, [levels, maxRadius, skills, total, center]);

  const avgProficiency = useMemo(() => {
    if (skills.length === 0) return 0;
    const sum = skills.reduce((acc, s) => acc + s.proficiency, 0);
    return Math.round((sum / skills.length) * 10) / 10;
  }, [skills]);

  return (
    <div className="relative flex flex-col items-center justify-center select-none w-full max-w-[560px] mx-auto">
      {/* Dynamic 3D ambient aura behind chart */}
      <div
        className={`absolute inset-10 rounded-full blur-3xl pointer-events-none opacity-30 transition-colors duration-500 ${
          isDark ? 'bg-[#C50337]/15' : 'bg-[#69001F]/10'
        }`}
        aria-hidden="true"
      />

      {/* Radar Control & Metric Readout Bar */}
      <div className="w-full flex items-center justify-between px-3 py-2 text-xs font-mono mb-2">
        <div className="flex items-center gap-2">
          <span
            className={`w-2 h-2 rounded-full ${
              isRotatingSweep ? 'animate-ping' : ''
            } ${isDark ? 'bg-[#C50337]' : 'bg-[#69001F]'}`}
          />
          <span className={isDark ? 'text-[#C50337]' : 'text-[#69001F]'}>
            RADAR // {total} VECTORS
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className={isDark ? 'text-[#F5EAF0]/70' : 'text-slate-600'}>
            MEAN: <strong className={isDark ? 'text-[#C50337]' : 'text-[#69001F]'}>{avgProficiency}%</strong>
          </span>
          <button
            type="button"
            onClick={() => setIsRotatingSweep(!isRotatingSweep)}
            className={`text-[11px] underline underline-offset-4 transition-colors ${
              isDark
                ? 'text-[#F5EAF0]/60 hover:text-[#C50337]'
                : 'text-slate-500 hover:text-[#69001F]'
            }`}
          >
            {isRotatingSweep ? 'Pause Sweep' : 'Resume Sweep'}
          </button>
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="relative w-full aspect-square flex items-center justify-center">
        <svg
          viewBox={`0 0 ${size} ${size}`}
          className="w-full h-full max-w-[520px] overflow-visible drop-shadow-sm"
        >
          <defs>
            {/* Dark & Light Radar Gradients */}
            <linearGradient id="radarDarkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C50337" stopOpacity="0.45" />
              <stop offset="50%" stopColor="#310014" stopOpacity="0.30" />
              <stop offset="100%" stopColor="#69001F" stopOpacity="0.15" />
            </linearGradient>

            <linearGradient id="radarLightGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#69001F" stopOpacity="0.30" />
              <stop offset="50%" stopColor="#F5EAF0" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#3B0018" stopOpacity="0.10" />
            </linearGradient>

            <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
              <stop
                offset="0%"
                stopColor={isDark ? '#C50337' : '#69001F'}
                stopOpacity="0.35"
              />
              <stop
                offset="100%"
                stopColor={isDark ? '#C50337' : '#69001F'}
                stopOpacity="0.0"
              />
            </radialGradient>

            {/* Sweep Needle Mask */}
            <radialGradient id="sweepGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#C50337" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#C50337" stopOpacity="0.0" />
            </radialGradient>
          </defs>

          {/* Center Glow Aura */}
          <circle
            cx={center}
            cy={center}
            r={maxRadius * 0.4}
            fill="url(#centerGlow)"
            className="pointer-events-none"
          />

          {/* Optional Rotating Radar Sweep Conic Effect */}
          {isRotatingSweep && (
            <g className="origin-center animate-[spin_10s_linear_infinite] pointer-events-none opacity-40">
              <path
                d={`M ${center} ${center} L ${center + maxRadius} ${center} A ${maxRadius} ${maxRadius} 0 0 1 ${
                  center + maxRadius * Math.cos(Math.PI / 4)
                } ${center + maxRadius * Math.sin(Math.PI / 4)} Z`}
                fill={isDark ? '#C50337' : '#69001F'}
                opacity="0.15"
              />
              <line
                x1={center}
                y1={center}
                x2={center + maxRadius}
                y2={center}
                stroke={isDark ? '#C50337' : '#69001F'}
                strokeWidth="1.5"
                opacity="0.6"
              />
            </g>
          )}

          {/* Concentric Grid Rings */}
          {ringPolygons.map(({ level, points }) => (
            <polygon
              key={`ring-${level}`}
              points={points}
              fill="none"
              stroke={
                isDark
                  ? level === 1.0
                    ? 'rgba(197, 3, 55, 0.45)'
                    : 'rgba(245, 234, 240, 0.08)'
                  : level === 1.0
                  ? 'rgba(105, 0, 31, 0.35)'
                  : 'rgba(16, 24, 32, 0.08)'
              }
              strokeWidth={level === 1.0 ? '1.5' : '1'}
              strokeDasharray={level < 1.0 ? '4 4' : undefined}
            />
          ))}

          {/* Concentric Level Percentage Labels along top vertical axis */}
          {levels.map((lvl) => {
            const y = center - lvl * maxRadius;
            return (
              <text
                key={`lvl-text-${lvl}`}
                x={center + 6}
                y={y + 11}
                fill={isDark ? 'rgba(245, 234, 240, 0.35)' : 'rgba(16, 24, 32, 0.35)'}
                fontSize="9"
                fontFamily="IBM Plex Mono, monospace"
                className="select-none pointer-events-none"
              >
                {Math.round(lvl * 100)}%
              </text>
            );
          })}

          {/* Ray Axes from Center */}
          {vertices.map(({ skill, axisX, axisY }) => {
            const isActive = activeSkillId === skill.id;
            return (
              <line
                key={`axis-${skill.id}`}
                x1={center}
                y1={center}
                x2={axisX}
                y2={axisY}
                stroke={
                  isActive
                    ? isDark
                      ? '#C50337'
                      : '#69001F'
                    : isDark
                    ? 'rgba(245, 234, 240, 0.12)'
                    : 'rgba(16, 24, 32, 0.12)'
                }
                strokeWidth={isActive ? '1.5' : '1'}
                className="transition-colors duration-200"
              />
            );
          })}

          {/* Main Filled Radar Polygon */}
          <polygon
            points={polygonPoints}
            fill={isDark ? 'url(#radarDarkGradient)' : 'url(#radarLightGradient)'}
            stroke={isDark ? '#C50337' : '#69001F'}
            strokeWidth="2"
            strokeLinejoin="round"
            className="transition-all duration-300"
            style={{
              filter: isDark
                ? 'drop-shadow(0 0 12px rgba(197, 3, 55, 0.35))'
                : 'drop-shadow(0 0 8px rgba(105, 0, 31, 0.25))',
            }}
          />

          {/* Vertex Anchor Nodes */}
          {vertices.map(({ skill, x, y }) => {
            const isActive = activeSkillId === skill.id;
            return (
              <g
                key={`vertex-${skill.id}`}
                className="cursor-pointer group"
                onClick={() => onSelectSkill(skill)}
                onMouseEnter={() => onHoverSkill(skill)}
                onMouseLeave={() => onHoverSkill(null)}
              >
                {/* Hit area */}
                <circle cx={x} cy={y} r="18" fill="transparent" />

                {/* Pulsing ring on active */}
                {isActive && (
                  <circle
                    cx={x}
                    cy={y}
                    r="10"
                    fill="none"
                    stroke={isDark ? '#C50337' : '#69001F'}
                    strokeWidth="1.5"
                    className="animate-ping opacity-75"
                  />
                )}

                {/* Outer anchor circle */}
                <circle
                  cx={x}
                  cy={y}
                  r={isActive ? '6' : '4.5'}
                  fill={isDark ? '#02060E' : '#FFFFFF'}
                  stroke={
                    isActive
                      ? isDark
                        ? '#C50337'
                        : '#69001F'
                      : isDark
                      ? 'rgba(197, 3, 55, 0.8)'
                      : 'rgba(105, 0, 31, 0.8)'
                  }
                  strokeWidth={isActive ? '2.5' : '1.5'}
                  className="transition-all duration-200 group-hover:scale-125"
                />

                {/* Inner dot */}
                <circle
                  cx={x}
                  cy={y}
                  r="2"
                  fill={isDark ? '#C50337' : '#69001F'}
                />
              </g>
            );
          })}

          {/* Axis Labels along perimeter */}
          {vertices.map(({ skill, labelX, labelY, textAnchor, dominantBaseline }) => {
            const isActive = activeSkillId === skill.id;
            return (
              <g
                key={`label-${skill.id}`}
                className="cursor-pointer transition-colors duration-200"
                onClick={() => onSelectSkill(skill)}
                onMouseEnter={() => onHoverSkill(skill)}
                onMouseLeave={() => onHoverSkill(null)}
              >
                <text
                  x={labelX}
                  y={labelY}
                  textAnchor={textAnchor}
                  dominantBaseline={dominantBaseline}
                  fontSize="11"
                  fontFamily="DM Sans, sans-serif"
                  fontWeight={isActive ? '700' : '500'}
                  fill={
                    isActive
                      ? isDark
                        ? '#C50337'
                        : '#69001F'
                      : isDark
                      ? '#F5EAF0'
                      : '#02060E'
                  }
                  className="transition-all duration-200"
                >
                  {skill.shortLabel}
                </text>
                <text
                  x={labelX}
                  y={labelY + (dominantBaseline === 'hanging' ? 14 : -12)}
                  textAnchor={textAnchor}
                  fontSize="9"
                  fontFamily="IBM Plex Mono, monospace"
                  fontWeight="600"
                  fill={
                    isActive
                      ? isDark
                        ? '#C50337'
                        : '#69001F'
                      : isDark
                      ? 'rgba(245, 234, 240, 0.45)'
                      : 'rgba(105, 0, 31, 0.45)'
                  }
                >
                  {skill.proficiency}%
                </text>
              </g>
            );
          })}

          {/* Center Origin Hub */}
          <circle
            cx={center}
            cy={center}
            r="4"
            fill={isDark ? '#C50337' : '#69001F'}
          />
          <circle
            cx={center}
            cy={center}
            r="8"
            fill="none"
            stroke={isDark ? 'rgba(197, 3, 55, 0.4)' : 'rgba(105, 0, 31, 0.3)'}
            strokeWidth="1"
          />
        </svg>
      </div>

      {/* Quick helper caption */}
      <p
        className={`text-[11px] font-mono text-center mt-3 ${
          isDark ? 'text-[#F5EAF0]/50' : 'text-[#69001F]/60'
        }`}
      >
        Hover nodes to inspect architecture specs · Click any coordinate to freeze telemetry
      </p>
    </div>
  );
};
