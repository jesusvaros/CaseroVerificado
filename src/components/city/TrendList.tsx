import { useTranslations } from '../../i18n/useTranslations';
import type { CityArea } from '../../services/publicData/cityRent';
import { formatChange, trendColor, type TrendPeriod } from './trendScale';
import { perM2 } from './rentScale';

interface Props {
  areas: CityArea[];
  changes: Map<number, number | null>;
  period: TrendPeriod;
  selectedId: number | null;
  onSelect: (id: number) => void;
}

// Areas ordered by how much their median rent changed, biggest rise first.
const TrendList = ({ areas, changes, period, selectedId, onSelect }: Props) => {
  const { t } = useTranslations();
  const sorted = areas.filter(a => changes.get(a.id) != null).sort((a, b) => changes.get(b.id)! - changes.get(a.id)!);
  const label = (a: CityArea) => a.properties.name ?? t('cityPage.section');

  return (
    <section className="flex flex-col">
      <h2 className="mb-4 font-display text-3xl font-extrabold tracking-tight">{t(`cityPage.trend.listTitle${period}`)}</h2>
      {sorted.length === 0 && <p className="text-ink-muted">{t('cityPage.trend.noData')}</p>}
      <ol className="flex max-h-[560px] flex-col overflow-y-auto pr-2">
        {sorted.map(area => {
          const change = changes.get(area.id)!;
          return (
            <li key={area.id}>
              <button
                type="button"
                onClick={() => onSelect(area.id)}
                aria-pressed={selectedId === area.id}
                className={`flex w-full items-center gap-3 border-b border-line py-3 text-left transition-colors hover:bg-mist ${selectedId === area.id ? 'bg-mist' : ''}`}
              >
                <span className="h-3.5 w-3.5 shrink-0 rounded-full" style={{ background: trendColor(change, period) }} />
                <span className="min-w-0 flex-1 truncate font-semibold">{label(area)}</span>
                {area.properties.p50 != null && <span className="text-sm text-ink-muted">{perM2(area.properties.p50)}</span>}
                <span className={`w-20 text-right font-bold ${change > 0 ? 'text-coral-ink' : change < 0 ? 'text-[#2F5FC4]' : ''}`}>
                  {change > 0 ? '▲' : change < 0 ? '▼' : ''} {formatChange(change)}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </section>
  );
};

export default TrendList;
