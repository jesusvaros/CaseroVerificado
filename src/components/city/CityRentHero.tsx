import { useTranslations } from '../../i18n/useTranslations';
import type { CityRent } from '../../services/publicData/cityRent';

const CityRentHero = ({ city, region, rent }: { city: string; region: string | null; rent: CityRent | null }) => {
  const { t } = useTranslations();
  const median = rent?.rent?.[2];
  const change = rent?.ipva?.[1];

  return (
    <section className="bg-forest pt-20 text-white">
      <div className="mx-auto flex max-w-[1320px] flex-wrap items-end justify-between gap-10 px-5 pb-12 pt-10 md:px-[5%]">
        <div className="flex max-w-2xl flex-col gap-3">
          {region && <span className="text-sm text-[#9FC3A5]">{region}</span>}
          <h1 className="font-display text-5xl font-extrabold leading-none tracking-tight md:text-6xl">{t('cityPage.title', { city })}</h1>
          <p className="text-lg leading-relaxed text-[#CFE5C6]">{t('cityPage.subtitle')}</p>
        </div>
        {(median || change != null) && (
          <div className="flex gap-12">
            {median && (
              <div>
                <div className="font-display text-5xl font-extrabold leading-none text-lime">{median.toLocaleString('es-ES')} €</div>
                <div className="mt-1 text-[15px] text-[#CFE5C6]">{t('cityPage.medianPerM2', { year: rent!.rent![0] })}</div>
              </div>
            )}
            {change != null && (
              <div>
                <div className="font-display text-5xl font-extrabold leading-none">{change > 0 ? '+' : ''}{change.toLocaleString('es-ES')} %</div>
                <div className="mt-1 text-[15px] text-[#CFE5C6]">{t('cityPage.yearChange', { year: rent!.ipva![0] })}</div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default CityRentHero;
