import { Link } from 'react-router-dom';
import { useTranslations } from '../../i18n/useTranslations';
import { umamiEventProps } from '../../utils/analytics';

const HomeClosing = () => {
  const { t } = useTranslations();

  return (
    <section className="bg-lime px-5 py-20 md:px-[5%] md:py-24">
      <div className="mx-auto flex max-w-[1320px] flex-wrap items-end justify-between gap-8">
        <div className="flex max-w-[720px] flex-col gap-3.5">
          <h2 className="font-display text-5xl font-extrabold leading-[0.98] tracking-[-0.035em] text-forest md:text-[64px]">{t('home.v3.closing.title')}</h2>
          <p className="text-lg text-[#1E4A2C]">{t('home.v3.closing.text')}</p>
        </div>
        <Link
          to="/add-review"
          className="rounded-full bg-forest px-[34px] py-5 text-lg font-bold text-white transition-transform hover:-translate-y-0.5"
          {...umamiEventProps('home:closing-cta')}
        >
          {t('home.v3.closing.cta')}
        </Link>
      </div>
    </section>
  );
};

export default HomeClosing;
