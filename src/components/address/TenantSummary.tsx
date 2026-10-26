import { useTranslations } from '../../i18n/useTranslations';
import { CATEGORIES, formatScore, type summarise } from './addressSummary';

const TenantSummary = ({ summary }: { summary: ReturnType<typeof summarise> }) => {
  const { t } = useTranslations();
  const scored = CATEGORIES.filter(c => summary.categories[c] != null);
  const stats = [
    summary.deposit && { value: t('addressPage.xOfY', { x: summary.deposit.full, y: summary.deposit.total }), label: t('addressPage.depositFull'), accent: true },
    summary.recommend && { value: t('addressPage.xOfY', { x: summary.recommend.yes, y: summary.recommend.total }), label: t('addressPage.wouldRecommend'), accent: true },
    summary.averageRent && { value: `${Math.round(summary.averageRent).toLocaleString('es-ES')} €`, label: t('addressPage.averageRent'), accent: false },
  ].filter(Boolean) as { value: string; label: string; accent: boolean }[];

  return (
    <section className="flex flex-col gap-6">
      <h2 className="font-display text-3xl font-extrabold tracking-tight md:text-[34px]">{t('addressPage.summaryTitle')}</h2>
      {scored.length > 0 && (
        <div className="grid grid-cols-1 gap-x-12 gap-y-5 sm:grid-cols-2">
          {scored.map(category => (
            <div key={category} className="flex items-center gap-3.5">
              <span className="w-20 font-semibold">{t(`addressPage.categories.${category}`)}</span>
              <span className="h-3 flex-1 overflow-hidden rounded-md bg-[#EEF3E8]">
                <span className="block h-full rounded-md bg-brand" style={{ width: `${(summary.categories[category]! / 5) * 100}%` }} />
              </span>
              <strong className="font-display text-xl">{formatScore(summary.categories[category]!)}</strong>
            </div>
          ))}
        </div>
      )}
      {stats.length > 0 && (
        <div className="flex flex-wrap gap-12 pt-2">
          {stats.map(stat => (
            <div key={stat.label}>
              <div className={`font-display text-[44px] font-extrabold leading-none ${stat.accent ? 'text-brand' : 'text-ink'}`}>{stat.value}</div>
              <div className="mt-1 text-[15px] text-ink-muted">{stat.label}</div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default TenantSummary;
