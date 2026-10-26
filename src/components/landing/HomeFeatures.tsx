import { Link } from 'react-router-dom';
import { useTranslations } from '../../i18n/useTranslations';
import { umamiEventProps } from '../../utils/analytics';

const reviewTopics = ['home.v2.features.reviews.topic1', 'home.v2.features.reviews.topic2', 'home.v2.features.reviews.topic3', 'home.v2.features.reviews.topic4'];

const HomeFeatures = () => {
  const { t } = useTranslations();

  return (
    <>
      <section className="mx-auto flex max-w-7xl flex-wrap items-center gap-16 px-5 pb-12 pt-24 md:px-10 md:pt-28">
        <div className="flex min-w-0 flex-[1_1_26rem] flex-col gap-4">
          <span className="text-sm font-bold uppercase tracking-wider text-brand">{t('home.v2.features.reviews.eyebrow')}</span>
          <h2 className="font-display text-4xl font-extrabold leading-none tracking-tight md:text-5xl">{t('home.v2.features.reviews.title')}</h2>
          <p className="max-w-lg text-lg leading-relaxed text-ink-soft">{t('home.v2.features.reviews.body')}</p>
        </div>
        <ul className="flex min-w-0 flex-[1_1_26rem] flex-col">
          {reviewTopics.map(key => (
            <li key={key} className="flex items-center gap-4 border-b border-line py-5 text-lg font-semibold last:border-b-0">
              <span className="h-3 w-3 shrink-0 rounded-full bg-lime ring-4 ring-lime-soft" aria-hidden="true" />
              {t(key)}
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto flex max-w-7xl flex-wrap-reverse items-center gap-16 px-5 pb-24 pt-12 md:px-10 md:pb-28">
        <div className="relative h-72 min-w-0 flex-[1_1_26rem] overflow-hidden rounded-[2rem] bg-mist" aria-hidden="true">
          <svg viewBox="0 0 400 280" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
            <path d="M0 200 L400 120" stroke="#DCE3D3" strokeWidth="14" />
            <path d="M120 0 L220 280" stroke="#DCE3D3" strokeWidth="10" />
            <path d="M0 80 L400 180" stroke="#DCE3D3" strokeWidth="8" />
            <circle cx="180" cy="130" r="16" fill="#1F7A4D" />
            <circle cx="290" cy="170" r="16" fill="#1F7A4D" />
            <circle cx="90" cy="190" r="16" fill="#FF6B4A" />
            <circle cx="320" cy="70" r="16" fill="#45B06A" />
          </svg>
        </div>
        <div className="flex min-w-0 flex-[1_1_26rem] flex-col gap-4">
          <span className="text-sm font-bold uppercase tracking-wider text-brand">{t('home.v2.features.map.eyebrow')}</span>
          <h2 className="font-display text-4xl font-extrabold leading-none tracking-tight md:text-5xl">{t('home.v2.features.map.title')}</h2>
          <p className="max-w-lg text-lg leading-relaxed text-ink-soft">{t('home.v2.features.map.body')}</p>
          <Link to="/map" className="font-bold text-brand hover:text-forest" {...umamiEventProps('home:features-open-map')}>
            {t('home.v2.features.map.cta')} →
          </Link>
        </div>
      </section>
    </>
  );
};

export default HomeFeatures;
