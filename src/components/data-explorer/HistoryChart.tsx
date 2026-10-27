import { useState } from 'react';

export interface Series {
  key: string;
  label: string;
  color: string;
  values: (number | null)[];
  // Dashed lines mark a different source (new contracts) next to SERPAVI
  dashed?: boolean;
  // Shorter name for the label at the end of the line
  short?: string;
}

const W = 640;
const H = 240;
const PAD = { top: 16, right: 128, bottom: 28, left: 40 };

interface Props {
  labels: (string | number)[];
  series: Series[];
  unit?: string;
  decimals?: number;
}

// One value per period for up to three areas, with a crosshair tooltip and direct labels at the line ends.
const endLabel = (s: Series) => {
  const text = s.short ?? s.label;
  return text.length > 13 ? `${text.slice(0, 12)}…` : text;
};

const HistoryChart = ({ labels, series, unit = '€/m²', decimals = 1 }: Props) => {
  const years = labels;
  const fmt = (v: number) => v.toLocaleString('es-ES', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  const [hover, setHover] = useState<number | null>(null);
  const all = series.flatMap(s => s.values).filter((v): v is number => v != null);
  if (all.length === 0) return null;
  const pad = (Math.max(...all) - Math.min(...all)) * 0.1 || 1;
  const min = Math.floor(Math.min(...all) - pad);
  const max = Math.ceil(Math.max(...all) + pad);
  const x = (i: number) => PAD.left + (i / (years.length - 1)) * (W - PAD.left - PAD.right);
  const y = (v: number) => PAD.top + (1 - (v - min) / (max - min || 1)) * (H - PAD.top - PAD.bottom);
  const ticks = Array.from({ length: 4 }, (_, i) => min + ((max - min) * i) / 3);

  const path = (values: (number | null)[]) =>
    values.reduce((d, v, i) => (v == null ? d : `${d}${d && values[i - 1] != null ? 'L' : 'M'}${x(i).toFixed(1)},${y(v).toFixed(1)}`), '');

  const pick = (clientX: number, rect: DOMRect) => {
    const px = ((clientX - rect.left) / rect.width) * W;
    const i = Math.round(((px - PAD.left) / (W - PAD.left - PAD.right)) * (years.length - 1));
    setHover(Math.max(0, Math.min(years.length - 1, i)));
  };

  // Direct labels at each line's last value, nudged apart so they never overlap
  const ends = series
    .map(s => {
      const last = s.values.reduce<number>((acc, v, i) => (v != null ? i : acc), -1);
      return last < 0 ? null : { s, i: last, y: y(s.values[last]!) };
    })
    .filter((e): e is { s: Series; i: number; y: number } => e != null)
    .sort((a, b) => a.y - b.y);
  ends.forEach((e, k) => k > 0 && e.y - ends[k - 1].y < 14 && (e.y = ends[k - 1].y + 14));

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full touch-none select-none"
        role="img"
        aria-label={series.map(s => s.label).join(', ')}
        onPointerMove={e => pick(e.clientX, e.currentTarget.getBoundingClientRect())}
        onPointerDown={e => pick(e.clientX, e.currentTarget.getBoundingClientRect())}
        onPointerLeave={() => setHover(null)}
      >
        {ticks.map(t => (
          <g key={t}>
            <line x1={PAD.left} x2={W - PAD.right} y1={y(t)} y2={y(t)} stroke="#ECEFE7" />
            <text x={PAD.left - 8} y={y(t) + 4} textAnchor="end" className="fill-[#6B7465] text-[11px]">{fmt(t)}</text>
          </g>
        ))}
        {years.map((yr, i) => (years.length <= 8 || i % 2 === 1 || i === years.length - 1) && (
          <text key={yr} x={x(i)} y={H - 8} textAnchor="middle" className="fill-[#6B7465] text-[11px]">{yr}</text>
        ))}
        {hover != null && <line x1={x(hover)} x2={x(hover)} y1={PAD.top} y2={H - PAD.bottom} stroke="#10180F" strokeOpacity={0.25} />}
        {series.map(s => (
          <path key={s.key} d={path(s.values)} fill="none" stroke={s.color} strokeWidth={2} strokeDasharray={s.dashed ? '6 4' : undefined} strokeLinejoin="round" strokeLinecap="round" />
        ))}
        {hover != null &&
          series.map(s => s.values[hover] != null && (
            <circle key={s.key} cx={x(hover)} cy={y(s.values[hover]!)} r={4.5} fill={s.color} stroke="#fff" strokeWidth={2} />
          ))}
        {ends.map(e => (
          <text key={e.s.key} x={x(e.i) + 8} y={e.y + 4} className="text-[12px] font-bold" fill="#10180F">
            <tspan fill={e.s.color}>●</tspan> {endLabel(e.s)}
          </text>
        ))}
      </svg>
      {hover != null && (
        <div
          className="pointer-events-none absolute top-2 z-10 rounded-xl border border-line bg-white px-3 py-2 text-sm shadow-lg"
          style={{ left: `${(x(hover) / W) * 100}%`, transform: `translateX(${hover > years.length / 2 ? '-105%' : '5%'})` }}
        >
          <div className="mb-1 font-bold">{years[hover]}</div>
          {series.map(s => (
            <div key={s.key} className="flex items-center gap-2 whitespace-nowrap">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: s.color }} />
              <span className="text-ink-soft">{s.label}</span>
              <strong className="ml-auto pl-3">{s.values[hover] != null ? `${fmt(s.values[hover]!)} ${unit}` : '–'}</strong>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryChart;
