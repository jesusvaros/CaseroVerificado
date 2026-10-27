import { useTranslations } from '../../i18n/useTranslations';
import type { CityRent } from '../../services/publicData/cityRent';
import CitySearch from './CitySearch';
import type { MarketData } from '../../services/publicData/market';
import { useState } from 'react';
import ZoneDataExplorer from '../data-explorer/ZoneDataExplorer';

const CityRentHero = ({ city, region, rent, market }: { city: string; region: string | null; rent: CityRent | null; market: MarketData | null }) => {
  const { t } = useTranslations();
  const median = rent?.rent?.[2];
  const change = rent?.ipva?.[1];
  const [exploring, setExploring] = useState(false);

  return (
    <section className="bg-forest pt-20 text-white">
      <div className="mx-auto flex max-w-[1320px] flex-wrap items-end justify-between gap-10 px-5 pb-12 pt-10 md:px-[5%]">
        <div className="flex max-w-2xl flex-col gap-3">
          {region && <span className="text-sm text-[#9FC3A5]">{region}</span>}
          <h1 className="font-display text-5xl font-extrabold leading-none tracking-tight md:text-6xl">{t('cityPage.title', { city })}</h1>
          <p className="text-lg leading-relaxed text-[#CFE5C6]">{t(rent?.level === 'barrio' ? 'cityPage.subtitle' : median ? 'cityPage.subtitleZones' : 'cityPage.subtitleNoRent')}</p>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <CitySearch dark />
            {rent && (
              <button type="button" onClick={() => setExploring(true)} className="rounded-full border border-white/30 px-5 py-2.5 text-sm font-bold text-white hover:bg-white/10">
                {t('explorer.cityOpen')} →
              </button>
            )}
          </div>
          {exploring && rent && <ZoneDataExplorer municipality={rent.cumun} place={rent.name} onClose={() => setExploring(false)} />}
        </div>
        {(median || market) && (
          <div className="flex flex-wrap gap-x-12 gap-y-6">
            {market?.rent && (
              <Stat value={`${market.rent[0].toLocaleString('es-ES')} €`} label={t('cityPage.currentRent', { period: market.rent[2] })} accent />
            )}
            {median && <Stat value={`${median.toLocaleString('es-ES')} €`} label={t('cityPage.medianPerM2', { year: rent!.rent![0] })} accent={!market?.rent} />}
            {market?.sale && <Stat value={`${market.sale[0].toLocaleString('es-ES')} €`} label={t('cityPage.salePerM2', { period: market.sale[2] })} />}
            {!median && !market?.sale && market?.deals && (
              <Stat value={market.deals[1].toLocaleString('es-ES')} label={t('cityPage.salesYear', { period: market.deals[2] })} />
            )}
            {change != null && <Stat value={`${change > 0 ? '+' : ''}${change.toLocaleString('es-ES')} %`} label={t('cityPage.yearChange', { year: rent!.ipva![0] })} />}
          </div>
        )}
      </div>
    </section>
  );
};

const Stat = ({ value, label, accent = false }: { value: string; label: string; accent?: boolean }) => (
  <div>
    <div className={`font-display text-4xl font-extrabold leading-none md:text-5xl ${accent ? 'text-lime' : ''}`}>{value}</div>
    <div className="mt-1 max-w-[180px] text-[15px] text-[#CFE5C6]">{label}</div>
  </div>
);

export default CityRentHero;
