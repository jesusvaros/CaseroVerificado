import { useTranslations } from '../../i18n/useTranslations';
import type { MarketHistory } from '../../services/publicData/marketHistory';

// One line on what new contracts cost now, where the region publishes it.
const NewContractsSummary = ({ market }: { market: MarketHistory }) => {
  const { t } = useTranslations();
  const main = market.postcode ?? market.municipality;
  if (!main?.length) return null;
  const last = main[main.length - 1];
  const prev = [...main].reverse().find(p => p[0] < last[0]);
  const change = prev ? ((last[1] - prev[1]) / prev[1]) * 100 : null;

  return (
    <div className="flex flex-col gap-1 rounded-2xl border-2 border-lime p-5">
      <strong className="font-display text-lg">{t('explorer.market.title')}</strong>
      <p className="text-[17px]">
        {t('explorer.market.summary', { year: last[0], eur: last[1].toLocaleString('es-ES'), n: last[2].toLocaleString('es-ES') })}
        {change != null && (
          <strong className={change > 0 ? 'text-coral-ink' : 'text-forest'}>
            {' '}{t('explorer.market.change', { change: `${change > 0 ? '+' : ''}${Math.round(change)} %`, year: prev![0] })}
          </strong>
        )}
      </p>
      <p className="text-sm text-ink-muted">{t(`explorer.market.note.${market.region}`)}</p>
    </div>
  );
};

export default NewContractsSummary;
