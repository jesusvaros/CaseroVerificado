import { Link } from 'react-router-dom';
import AddressAutocomplete from '../ui/AddressAutocomplete';
import { useHomeAddressSearch } from '../../hooks/useHomeAddressSearch';
import { useTranslations } from '../../i18n/useTranslations';
import { umamiEventProps } from '../../utils/analytics';
import HeroIllustration from './HeroIllustration';

const HomeHero = () => {
  const { t } = useTranslations();
  const { address, isLoading, selectAddress, openMap, startReview } = useHomeAddressSearch();

  return (
    <section id="home-address-section" className="overflow-hidden bg-forest pt-24 text-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-end gap-12 px-5 pt-10 md:px-10">
        <div className="flex min-w-0 flex-[999_1_32rem] flex-col gap-6 pb-16 md:pb-24">
          <h1 className="font-display text-5xl font-extrabold leading-[0.95] tracking-tight md:text-7xl">
            {t('home.v2.hero.titleStart')} <span className="text-lime">{t('home.v2.hero.titleHighlight')}</span>{' '}
            {t('home.v2.hero.titleEnd')}
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-[#CFE5C6] md:text-xl">{t('home.v2.hero.subtitle')}</p>

          <div className="flex max-w-2xl flex-col gap-3 rounded-3xl bg-white p-2 text-ink sm:flex-row sm:items-center sm:rounded-full sm:pl-4">
            <div className="min-w-0 flex-1">
              <AddressAutocomplete
                onSelect={selectAddress}
                value={address}
                placeholder={t('home.v2.hero.searchPlaceholder')}
                hideLabel
                inputClassName="[&_input]:h-12 [&_input]:border-0 [&_input]:text-lg [&_input]:shadow-none [&_input]:focus:ring-0"
              />
            </div>
            <button
              type="button"
              onClick={openMap}
              className="h-12 shrink-0 rounded-full bg-brand px-7 font-bold text-white transition-colors hover:bg-forest focus:outline-none focus-visible:ring-2 focus-visible:ring-lime"
              {...umamiEventProps('home:hero-search-map')}
            >
              {t('home.v2.hero.searchCta')}
            </button>
          </div>

          <p className="text-sm text-[#9FC3A5]">
            {t('home.v2.hero.lived')}{' '}
            <button
              type="button"
              onClick={startReview}
              disabled={isLoading}
              className="font-semibold text-lime underline underline-offset-4 hover:text-white"
              {...umamiEventProps('home:hero-start-review')}
            >
              {t('home.v2.hero.livedCta')}
            </button>{' '}
            · <Link to="/opiniones" className="font-semibold text-white underline underline-offset-4">{t('home.v2.hero.cities')}</Link>
          </p>
        </div>
        <HeroIllustration />
      </div>
    </section>
  );
};

export default HomeHero;
