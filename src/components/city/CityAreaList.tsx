import { useTranslations } from '../../i18n/useTranslations';
import type { CityArea } from '../../services/publicData/cityRent';
import { perM2, rentColor } from './rentScale';

interface CityAreaListProps {
  areas: CityArea[];
  breaks: number[];
  reviewCounts: Map<number, number>;
  selectedId: number | null;
  onSelect: (id: number) => void;
}

// Accessible counterpart of the map: every neighbourhood, from most to least expensive.
const CityAreaList = ({ areas, breaks, reviewCounts, selectedId, onSelect }: CityAreaListProps) => {
  const { t } = useTranslations();
  const sorted = areas.filter(a => a.properties.p50 != null).sort((a, b) => b.properties.p50! - a.properties.p50!);

  return (
    <section className="flex flex-col">
      <h2 className="mb-4 font-display text-3xl font-extrabold tracking-tight">{t('cityPage.listTitle')}</h2>
      <ol className="flex max-h-[560px] flex-col overflow-y-auto pr-2">
        {sorted.map(area => {
          const reviews = reviewCounts.get(area.id) ?? 0;
          return (
            <li key={area.id}>
              <button
                type="button"
                onClick={() => onSelect(area.id)}
                aria-pressed={selectedId === area.id}
                className={`flex w-full items-center gap-3 border-b border-line py-3 text-left transition-colors hover:bg-mist ${selectedId === area.id ? 'bg-mist' : ''}`}
              >
                <span className="h-3.5 w-3.5 shrink-0 rounded-full" style={{ background: rentColor(area.properties.p50, breaks) }} />
                <span className="min-w-0 flex-1 truncate font-semibold">{area.properties.name}</span>
                <span className="font-bold">{perM2(area.properties.p50!)}</span>
                <span className="w-28 text-right text-sm text-ink-muted">
                  {reviews === 0 ? t('cityPage.beFirst') : t(reviews === 1 ? 'cityPage.oneReview' : 'cityPage.reviews', { count: reviews })}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </section>
  );
};

export default CityAreaList;
