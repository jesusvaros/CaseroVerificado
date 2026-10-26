import type { BuildingFacts } from '../../services/publicData/catastro';
import { useTranslations } from '../../i18n/useTranslations';

const BuildingFactsSection = ({ facts }: { facts: BuildingFacts }) => {
  const { t } = useTranslations();
  const rows = [
    ['yearBuilt', facts.yearBuilt],
    ['dwellings', facts.dwellings || null],
    ['averageM2', facts.averageDwellingM2 ? `${facts.averageDwellingM2} m²` : null],
    ['use', facts.mainUse],
  ].filter(([, value]) => value != null) as [string, string | number][];

  return (
    <section className="flex flex-col gap-3.5">
      <h2 className="font-display text-2xl font-extrabold tracking-tight">{t('addressData.building.title')}</h2>
      <dl className="flex flex-col">
        {rows.map(([key, value], i) => (
          <div key={key} className={`flex justify-between py-3 ${i < rows.length - 1 ? 'border-b border-line' : ''}`}>
            <dt className="text-ink-muted">{t(`addressData.building.${key}`)}</dt>
            <dd className="font-bold">{value}</dd>
          </div>
        ))}
      </dl>
      <span className="text-xs text-[#6B7465]">{t('addressData.building.source', { reference: facts.cadastralReference })}</span>
    </section>
  );
};

export default BuildingFactsSection;
