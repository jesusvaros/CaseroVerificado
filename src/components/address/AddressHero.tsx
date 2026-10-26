import { Link } from 'react-router-dom';
import { useTranslations } from '../../i18n/useTranslations';
import { formatScore } from './addressSummary';

interface AddressHeroProps {
  title: string;
  city: string;
  cityPath: string;
  overall: number | null;
  reviewCount: number;
  tensioned: boolean;
  yearBuilt: number | null;
  onLivedHere: () => void;
}

const AddressHero = ({ title, city, cityPath, overall, reviewCount, tensioned, yearBuilt, onLivedHere }: AddressHeroProps) => {
  const { t } = useTranslations();

  return (
    <section className="bg-forest pt-20 text-white">
      <div className="mx-auto flex max-w-[1320px] flex-wrap items-center justify-between gap-8 px-5 pb-12 pt-10 md:px-[5%]">
        <div className="flex flex-wrap items-center gap-6">
          {overall != null && (
            <span className="flex h-[108px] w-[108px] flex-col items-center justify-center rounded-full bg-lime leading-none text-forest">
              <span className="font-display text-[40px] font-extrabold">{formatScore(overall)}</span>
              <span className="text-xs font-bold">{t('addressPage.outOf5')}</span>
            </span>
          )}
          <div className="flex min-w-0 flex-col gap-2.5">
            <nav aria-label={t('addressPage.breadcrumb')} className="text-sm text-[#9FC3A5]">
              <Link to={cityPath} className="hover:text-white">{city}</Link>
            </nav>
            <h1 className="font-display text-4xl font-extrabold leading-none tracking-tight md:text-[52px]">{title}</h1>
            <div className="flex flex-wrap gap-4 text-[15px] text-[#CFE5C6]">
              <span>{t(reviewCount === 1 ? 'addressPage.oneReview' : 'addressPage.reviews', { count: reviewCount })}</span>
              {tensioned && (
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-coral" />
                  {t('addressPage.tensioned')}
                </span>
              )}
              {yearBuilt && <span>{t('addressPage.builtIn', { year: yearBuilt })}</span>}
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={onLivedHere}
          className="rounded-full bg-lime px-6 py-4 font-bold text-forest transition-colors hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          {t('addressPage.livedHere')}
        </button>
      </div>
    </section>
  );
};

export default AddressHero;
