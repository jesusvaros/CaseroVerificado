import { Link } from 'react-router-dom';
import { useTranslations } from '../../i18n/useTranslations';
import { umamiEventProps } from '../../utils/analytics';

const trustKeys = ['anonymous', 'moderated', 'reply'] as const;

const HomeClosing = () => {
  const { t } = useTranslations();

  return (
    <>
      <section className="mx-auto grid max-w-7xl gap-10 px-5 pb-24 md:grid-cols-3 md:px-10">
        {trustKeys.map(key => (
          <div key={key} className="flex flex-col gap-2 border-t-2 border-ink pt-5">
            <h3 className="font-display text-2xl font-extrabold">{t(`home.v2.trust.${key}.title`)}</h3>
            <p className="leading-relaxed text-ink-soft">{t(`home.v2.trust.${key}.body`)}</p>
          </div>
        ))}
      </section>

      <section className="bg-lime px-5 py-20 md:px-10 md:py-24">
        <div className="mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-8">
          <div className="flex max-w-3xl flex-col gap-3">
            <h2 className="font-display text-5xl font-extrabold leading-[0.98] tracking-tight text-forest md:text-6xl">{t('home.v2.cta.title')}</h2>
            <p className="text-lg text-[#1E4A2C]">{t('home.v2.cta.body')}</p>
          </div>
          <Link
            to="/add-review"
            className="rounded-full bg-forest px-8 py-5 text-lg font-bold text-white transition-colors hover:bg-brand"
            {...umamiEventProps('home:cta-add-review')}
          >
            {t('home.v2.cta.button')}
          </Link>
        </div>
      </section>
    </>
  );
};

export default HomeClosing;
