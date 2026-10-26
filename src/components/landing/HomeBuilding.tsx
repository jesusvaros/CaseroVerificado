import { Link } from 'react-router-dom';
import { useTranslations } from '../../i18n/useTranslations';
import type { FeaturedAddress } from './useHomeShowcase';
import SectionIntro from './SectionIntro';
import Reveal from './Reveal';

// Catastro facts of the featured address, so the numbers on the home page are real.
const HomeBuilding = ({ featured }: { featured: FeaturedAddress | null }) => {
  const { t } = useTranslations();
  const building = featured?.building;

  return (
    <Reveal className="mx-auto flex max-w-[1320px] flex-wrap items-center gap-16 px-5 pb-24 pt-16 md:px-[5%] md:pb-[110px]">
      <SectionIntro eyebrow={t('home.v3.building.eyebrow')} eyebrowColor="#2563C9" title={t('home.v3.building.title')}>
        {t('home.v3.building.text')}
      </SectionIntro>
      <div className="flex min-w-0 flex-[1_1_440px] flex-col gap-4">
        {building ? (
          <>
            <div className="flex flex-wrap gap-10">
              {building.yearBuilt && (
                <div>
                  <div className="font-display text-7xl font-extrabold leading-none text-[#2563C9]">{building.yearBuilt}</div>
                  <div className="text-[15px] text-ink-muted">{t('home.v3.building.year')}</div>
                </div>
              )}
              {building.dwellings > 0 && (
                <div>
                  <div className="font-display text-7xl font-extrabold leading-none text-[#2563C9]">{building.dwellings}</div>
                  <div className="text-[15px] text-ink-muted">{t('home.v3.building.dwellings')}</div>
                </div>
              )}
            </div>
            {featured?.path && (
              <Link to={featured.path} className="text-sm font-semibold text-ink-muted hover:text-brand">
                {t('home.v3.building.caption', { address: featured.title, city: featured.city })} →
              </Link>
            )}
          </>
        ) : (
          <div className="h-24 animate-pulse rounded-2xl bg-mist" aria-hidden="true" />
        )}
      </div>
    </Reveal>
  );
};

export default HomeBuilding;
