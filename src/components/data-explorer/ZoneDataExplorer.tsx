import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslations } from '../../i18n/useTranslations';
import { getRentHistory, type RentHistory } from '../../services/publicData/rentHistory';
import HistoryChart, { type Series } from './HistoryChart';
import HistoryTable from './HistoryTable';
import DataSources from './DataSources';

type Level = 'section' | 'district' | 'municipality';
// Validated for colour-blind separation; every line also carries its name at the end
const COLORS: Record<Level, string> = { section: '#1F7A4D', district: '#3B6FD4', municipality: '#C2742A' };
const FEW = 50;

const latest = (values?: (readonly (number | null)[] | null)[]) => {
  const i = values ? values.reduce<number>((acc, v, k) => (v ? k : acc), -1) : -1;
  return i < 0 ? null : { i, v: values![i]! as (number | null)[] };
};

// "Ver los datos": the official history behind a reference rent, from simple to detailed.
const ZoneDataExplorer = ({ municipality, section, place, onClose }: { municipality: string; section?: string | null; place: string; onClose: () => void }) => {
  const { t } = useTranslations();
  const [history, setHistory] = useState<RentHistory | null | undefined>(undefined);
  const [level, setLevel] = useState<Level | null>(null);

  useEffect(() => {
    void getRentHistory(municipality, section).then(setHistory);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [municipality, section, onClose]);

  const levels = history
    ? (['section', 'district', 'municipality'] as Level[]).filter(l => history[l]?.vc?.some(Boolean))
    : [];
  const active = level ?? levels[0] ?? null;
  const median = (l: Level, p: number[] | null) => (p ? (l === 'section' ? p[1] : p[2]) : null);
  const series: Series[] = levels.map(l => ({
    key: l,
    label: t(`explorer.series.${l}`),
    color: COLORS[l],
    values: history![l]!.vc!.map(p => median(l, p as number[] | null)),
  }));

  const head = active && history ? latest(history[active]!.vc) : null;
  const headMedian = head && active ? median(active, head.v as number[]) : null;
  const first = active && history ? history[active]!.vc!.findIndex(Boolean) : -1;
  const firstMedian = active && first >= 0 ? median(active, history![active]!.vc![first] as number[]) : null;
  const change = headMedian && firstMedian && head!.i > first ? ((headMedian - firstMedian) / firstMedian) * 100 : null;
  const sectionN = history?.section ? latest(history.section.vc)?.v[0] ?? null : null;
  const houses = history?.municipality ? latest(history.municipality.vu) : null;
  const flats = history?.municipality ? latest(history.municipality.vc) : null;

  return createPortal(
    <div className="fixed inset-0 z-[1100] flex items-end justify-center bg-forest/50 backdrop-blur-sm sm:items-center sm:p-6" onClick={onClose}>
      <div role="dialog" aria-modal="true" aria-label={t('explorer.title')} className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-3xl bg-white p-6 text-ink shadow-2xl sm:rounded-3xl sm:p-9" onClick={e => e.stopPropagation()}>
        <button type="button" onClick={onClose} aria-label={t('explorer.close')} className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full text-ink-muted hover:bg-mist hover:text-ink">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
        <p className="text-sm font-bold uppercase tracking-wide text-brand">{place}</p>
        <h2 className="mt-1 pr-10 font-display text-3xl font-extrabold tracking-tight">{t('explorer.title')}</h2>

        {history === undefined && <p className="mt-6 text-ink-muted">{t('explorer.loading')}</p>}
        {history !== undefined && levels.length === 0 && <p className="mt-6 text-ink-muted">{t('explorer.none')}</p>}

        {levels.length > 0 && head && headMedian != null && (
          <div className="mt-6 flex flex-col gap-8">
            <p className="text-lg">
              {t('explorer.summary', { year: history!.years[head.i], p50: headMedian.toLocaleString('es-ES'), n: (head.v[0] ?? 0).toLocaleString('es-ES') })}
              {change != null && (
                <strong className={change > 0 ? ' text-coral-ink' : ' text-forest'}>
                  {' '}{t('explorer.change', { change: `${change > 0 ? '+' : ''}${Math.round(change)} %`, from: history!.years[first] })}
                </strong>
              )}
            </p>

            {sectionN != null && sectionN < FEW && (
              <div className="rounded-2xl bg-coral-soft p-5">
                <strong className="text-coral-ink">{t('explorer.fewTitle', { n: sectionN })}</strong>
                <p className="mt-1 text-[15px] text-ink-soft">{t('explorer.fewText')}</p>
              </div>
            )}

            <section className="flex flex-col gap-2">
              <h3 className="font-display text-xl font-extrabold">{t('explorer.chartTitle')}</h3>
              <p className="text-sm text-ink-muted">{t('explorer.chartHint')}</p>
              <HistoryChart years={history!.years} series={series} />
            </section>

            <details className="group rounded-2xl border border-line p-5">
              <summary className="cursor-pointer font-display text-lg font-extrabold">{t('explorer.tableTitle')}</summary>
              <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
                <span className="text-ink-muted">{t('explorer.tableLevel')}</span>
                {levels.map(l => (
                  <button key={l} type="button" onClick={() => setLevel(l)} className={`rounded-full px-3 py-1 font-bold ${active === l ? 'bg-forest text-white' : 'bg-mist text-ink-soft'}`}>
                    {t(`explorer.series.${l}`)}
                  </button>
                ))}
              </div>
              {active && <HistoryTable years={history!.years} points={history![active]!.vc!} full={active !== 'section'} />}
            </details>

            {houses && flats && (
              <section className="flex flex-col gap-2">
                <h3 className="font-display text-xl font-extrabold">{t('explorer.housesTitle', { place })}</h3>
                <p className="text-ink-soft">
                  {t('explorer.housesText', {
                    flats: (flats.v[4] ?? 0).toLocaleString('es-ES'),
                    houses: (houses.v[2] ?? 0).toLocaleString('es-ES'),
                    year: history!.years[houses.i],
                  })}
                </p>
              </section>
            )}

            <DataSources province={municipality.slice(0, 2)} />
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

export default ZoneDataExplorer;
