import { Link } from 'react-router-dom';
import { useTranslations } from '../../i18n/useTranslations';

const POINTS = ['anonymous', 'moderated', 'loginLast'] as const;

const ReviewFormAside = () => {
  const { t } = useTranslations();

  return (
    <aside className="min-w-0 flex-[1_1_380px] bg-forest px-5 pb-14 pt-28 text-white md:px-[5%] lg:max-w-[560px] lg:pt-32">
      {/* Stays in view while the form scrolls */}
      <div className="flex flex-col gap-10 lg:sticky lg:top-32">
        <h1 className="font-display text-5xl font-extrabold leading-[0.95] tracking-tight md:text-6xl">
          {t('addReview.v2.aside.titleStart')} <span className="text-lime">{t('addReview.v2.aside.titleHighlight')}</span>
        </h1>
        <ul className="flex flex-col gap-5 text-base leading-relaxed text-[#CFE5C6]">
          {POINTS.map(point => (
            <li key={point} className="flex gap-3">
              <svg className="mt-1 h-5 w-5 shrink-0 text-lime" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M4 10.5l4 4 8-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>
                <strong className="text-white">{t(`addReview.v2.aside.${point}.strong`)}</strong> {t(`addReview.v2.aside.${point}.text`)}
              </span>
            </li>
          ))}
        </ul>
        <p className="text-sm text-[#9FC3A5]">
          {t('addReview.v2.aside.guide')}{' '}
          <Link to="/blog/devolucion-de-la-fianza-alquiler" className="font-semibold text-lime underline underline-offset-4">
            {t('addReview.v2.aside.guideLink')}
          </Link>
        </p>
      </div>
    </aside>
  );
};

export default ReviewFormAside;
