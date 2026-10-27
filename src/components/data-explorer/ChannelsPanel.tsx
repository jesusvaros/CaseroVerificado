import { useState } from 'react';
import { useTranslations } from '../../i18n/useTranslations';
import HistoryChart from './HistoryChart';
import { together, type Channel } from './channels';

// Every data channel as a toggle, shown together on one chart or separately, one chart each.
const ChannelsPanel = ({ channels }: { channels: Channel[] }) => {
  const { t } = useTranslations();
  const [hidden, setHidden] = useState<Set<string>>(new Set());
  const [mode, setMode] = useState<'together' | 'separate'>('together');
  const visible = channels.filter(c => !hidden.has(c.key));
  const toggle = (key: string) =>
    setHidden(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else if (visible.length > 1) next.add(key); // keep at least one line on screen
      return next;
    });
  const joined = together(visible);

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-display text-xl font-extrabold">{t('explorer.channels.title')}</h3>
        <div className="flex gap-1 rounded-full bg-mist p-1 text-sm font-bold">
          {(['together', 'separate'] as const).map(m => (
            <button key={m} type="button" onClick={() => setMode(m)} className={`rounded-full px-4 py-1.5 ${mode === m ? 'bg-forest text-white' : 'text-ink-soft'}`}>
              {t(`explorer.channels.${m}`)}
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap gap-2" role="group" aria-label={t('explorer.channels.title')}>
        {channels.map(c => {
          const on = !hidden.has(c.key);
          return (
            <button
              key={c.key}
              type="button"
              aria-pressed={on}
              onClick={() => toggle(c.key)}
              className={`flex items-center gap-2 rounded-full border-[1.5px] px-3 py-1.5 text-sm font-semibold transition-colors ${on ? 'border-ink/20 bg-white text-ink' : 'border-line bg-mist text-ink-muted line-through'}`}
            >
              <svg width="18" height="6" aria-hidden="true">
                <line x1="1" y1="3" x2="17" y2="3" stroke={on ? c.color : '#B5BCAF'} strokeWidth="3" strokeLinecap="round" strokeDasharray={c.dashed ? '4 3' : undefined} />
              </svg>
              {c.label}
              <span className="text-xs font-normal text-ink-muted">{c.unit}</span>
            </button>
          );
        })}
      </div>

      {mode === 'together' ? (
        <div className="flex flex-col gap-2">
          <HistoryChart labels={joined.labels} series={joined.series} unit={joined.unit} decimals={joined.unit === '€/mes' ? 0 : 1} />
          <p className="text-sm text-ink-muted">
            {joined.base != null ? t('explorer.channels.indexNote', { year: joined.base }) : t('explorer.channels.sameUnitNote', { unit: joined.unit })}
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {visible.map(c => (
            <div key={c.key} className="flex flex-col gap-1 rounded-2xl border border-line p-4">
              <strong className="text-sm">{c.label} <span className="font-normal text-ink-muted">({c.unit})</span></strong>
              <HistoryChart
                labels={c.years.map(y => (c.partial.has(y) ? `${y}*` : y))}
                series={[{ key: c.key, label: '', color: c.color, dashed: c.dashed, values: c.values }]}
                unit={c.unit}
                decimals={c.unit === '€/mes' ? 0 : 1}
              />
            </div>
          ))}
        </div>
      )}
      {channels.some(c => c.dashed) && <p className="text-xs text-ink-muted">{t('explorer.channels.legend')}</p>}
    </section>
  );
};

export default ChannelsPanel;
