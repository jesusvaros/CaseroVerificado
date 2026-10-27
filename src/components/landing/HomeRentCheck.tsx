import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AddressAutocomplete from '../ui/AddressAutocomplete';
import { useHomeAddressSearch } from '../../hooks/useHomeAddressSearch';
import { useTranslations } from '../../i18n/useTranslations';
import { umamiEventProps } from '../../utils/analytics';
import SectionIntro from './SectionIntro';
import Reveal from './Reveal';

const ASKED = 900;
const METERS = 60;

// The design's thermometer with real SERPAVI percentiles for Madrid (whole city, 60 m²).
const HomeRentCheck = () => {
  const { t } = useTranslations();
  const [rent, setRent] = useState<[number, number, number] | null>(null);
  const { address, selectAddress, search } = useHomeAddressSearch();

  useEffect(() => {
    fetch('/data/ciudades/madrid.json')
      .then(res => (res.ok ? res.json() : null))
      .then(city => {
        const r = city?.municipality?.r;
        if (r) setRent([r[1] * METERS, r[2] * METERS, r[3] * METERS]);
      })
      .catch(() => setRent(null));
  }, []);

  const euros = (v: number) => `${Math.round(v).toLocaleString('es-ES')} €`;
  const position = rent ? Math.min(95, Math.max(5, ASKED <= rent[1] ? 50 - (25 * (rent[1] - ASKED)) / (rent[1] - rent[0]) : 50 + (25 * (ASKED - rent[1])) / (rent[2] - rent[1]))) : 46;

  return (
    <Reveal className="mx-auto flex max-w-[1320px] flex-wrap-reverse items-center gap-16 px-5 py-16 md:px-[5%]">
      <div className="flex min-w-0 flex-[1_1_440px] flex-col gap-3.5">
        <div className="relative mt-12 h-[26px] rounded-[13px] bg-[linear-gradient(90deg,#EAF8D2,#C8F169_40%,#FFB199_75%,#FF6B4A)]">
          <span className="absolute -top-3.5 h-[54px] w-1 -translate-x-1/2 rounded-sm bg-ink transition-[left] duration-700" style={{ left: `${position}%` }} />
          <span
            className="absolute -top-[46px] -translate-x-1/2 whitespace-nowrap rounded-lg bg-ink px-2.5 py-1.5 text-[13px] font-bold text-white transition-[left] duration-700"
            style={{ left: `${position}%` }}
          >
            {t('home.v3.rent.asked', { amount: euros(ASKED) })}
          </span>
        </div>
        {rent && (
          <div className="flex justify-between text-sm font-semibold text-ink-muted">
            <span>{euros(rent[0])}</span>
            <span>{t('home.v3.rent.median', { amount: euros(rent[1]) })}</span>
            <span>{euros(rent[2])}</span>
          </div>
        )}
        <span className="text-xs text-[#6B7465]">{t('home.v3.rent.caption')}</span>
        <Link to="/opiniones/espana/madrid" className="text-sm font-bold text-brand hover:text-forest">
          {t('home.v3.rent.city')}
        </Link>
      </div>
      <SectionIntro
        eyebrow={t('home.v3.rent.eyebrow')}
        eyebrowColor="#E8890C"
        title={t('home.v3.rent.title')}
        action={
          // Same search as the hero, but it lands on the address's rent calculator.
          <form
            onSubmit={e => {
              e.preventDefault();
              search('#precio');
            }}
            className="flex max-w-[520px] items-center gap-2 rounded-full border-[1.5px] border-line bg-white py-1.5 pl-5 pr-1.5"
          >
            <div className="min-w-0 flex-1">
              <AddressAutocomplete onSelect={selectAddress} value={address} placeholder={t('home.v3.rent.searchPlaceholder')} hideLabel bare />
            </div>
            <button
              type="submit"
              className="shrink-0 rounded-full bg-ink px-5 py-3 text-[15px] font-bold text-white transition-colors hover:bg-forest focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              {...umamiEventProps('home:rent-check')}
            >
              {t('home.v3.rent.cta')}
            </button>
          </form>
        }
      >
        {t('home.v3.rent.text')}
      </SectionIntro>
    </Reveal>
  );
};

export default HomeRentCheck;
