import { Link } from 'react-router-dom';
import AddressAutocomplete from '../ui/AddressAutocomplete';
import { useHomeAddressSearch } from '../../hooks/useHomeAddressSearch';
import { useTranslations } from '../../i18n/useTranslations';
import { umamiEventProps } from '../../utils/analytics';
import HeroIllustration from './HeroIllustration';
import type { FeaturedAddress } from './useHomeShowcase';

// Cities with published reviews, so every "Prueba con" link lands on a real city page
const SAMPLE_CITIES = [
  { name: 'Madrid', path: '/opiniones/espana/madrid' },
  { name: 'Barcelona', path: '/opiniones/espana/barcelona' },
  { name: 'Sevilla', path: '/opiniones/espana/sevilla' },
  { name: 'Alicante', path: '/opiniones/espana/alicante' },
];

const HomeHero = ({ featured }: { featured: FeaturedAddress | null }) => {
  const { t } = useTranslations();
  const { address, selectAddress, search } = useHomeAddressSearch();

  return (
    <section id="home-address-section" className="overflow-hidden bg-forest pt-[76px] text-white">
      <div className="mx-auto flex max-w-[1320px] flex-wrap items-end gap-12 px-5 pt-12 md:px-[5%] md:pt-16">
        <div className="flex min-w-0 flex-[999_1_560px] flex-col gap-[26px] pb-16 md:pb-24">
          <h1 className="font-display text-5xl font-extrabold leading-[0.95] tracking-[-0.035em] md:text-[76px]">
            {t('home.v2.hero.titleStart')} <span className="text-lime">{t('home.v2.hero.titleHighlight')}</span>{' '}
            {t('home.v2.hero.titleEnd')}
          </h1>
          <p className="max-w-[540px] text-lg leading-relaxed text-[#CFE5C6] md:text-xl">{t('home.v3.hero.subtitle')}</p>

          <form
            onSubmit={e => {
              e.preventDefault();
              search();
            }}
            className="flex max-w-[620px] items-center gap-2 rounded-full bg-white py-2 pl-[22px] pr-2 text-ink"
          >
            <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="#1F7A4D" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>
            <div className="min-w-0 flex-1">
              <AddressAutocomplete onSelect={selectAddress} value={address} placeholder={t('home.v2.hero.searchPlaceholder')} hideLabel bare />
            </div>
            <button
              type="submit"
              className="shrink-0 rounded-full bg-brand px-7 py-[15px] text-base font-bold text-white transition-colors hover:bg-forest focus:outline-none focus-visible:ring-2 focus-visible:ring-lime"
              {...umamiEventProps('home:hero-search')}
            >
              {t('home.v2.hero.searchCta')}
            </button>
          </form>

          <p className="text-[15px] text-[#9FC3A5]">
            {t('home.v3.hero.tryWith')}{' '}
            {SAMPLE_CITIES.map((city, i) => (
              <span key={city.path}>
                <Link to={city.path} className="text-white underline underline-offset-4 hover:text-lime">
                  {city.name}
                </Link>
                {i < SAMPLE_CITIES.length - 2 ? ', ' : i === SAMPLE_CITIES.length - 2 ? ` ${t('home.v3.hero.or')} ` : '.'}
              </span>
            ))}
          </p>
        </div>
        <HeroIllustration featured={featured} />
      </div>
    </section>
  );
};

export default HomeHero;
