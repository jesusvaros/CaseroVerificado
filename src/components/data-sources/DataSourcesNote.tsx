import { Link } from 'react-router-dom';
import { useTranslations } from '../../i18n/useTranslations';
import type { SourceKey } from './sources';

// Where this page's numbers come from, and why every new review makes them better.
const DataSourcesNote = ({ sources, className = '' }: { sources: SourceKey[]; className?: string }) => {
  const { t } = useTranslations();
  const official = sources.filter(s => s !== 'reviews');

  return (
    <section className={`mx-auto max-w-[1320px] px-5 md:px-[5%] ${className}`}>
      <div className="flex flex-wrap items-start justify-between gap-8 rounded-3xl bg-mist p-7 md:p-9">
        <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-3">
          <h2 className="font-display text-2xl font-extrabold tracking-tight">{t('dataNote.title')}</h2>
          <p className="text-ink-soft">{t('dataNote.official')}</p>
          <ul className="flex flex-wrap gap-2">
            {official.map(s => (
              <li key={s} className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-ink-soft">{t(`dataSources.${s}.short`)}</li>
            ))}
          </ul>
          <Link to="/datos" className="w-fit text-sm font-bold text-brand hover:text-forest">{t('dataNote.more')} →</Link>
        </div>
        <div className="flex min-w-0 flex-[1_1_300px] flex-col items-start gap-3 rounded-2xl bg-white p-6">
          <strong className="font-display text-lg">{t('dataNote.reviewsTitle')}</strong>
          <p className="text-[15px] text-ink-soft">{t('dataNote.reviewsText')}</p>
          <Link to="/add-review" className="rounded-full bg-forest px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand">{t('dataNote.cta')}</Link>
        </div>
      </div>
    </section>
  );
};

export default DataSourcesNote;
