import { Link } from 'react-router-dom';
import PageSEO from '../../seo/PageSEO';
import { useTranslations } from '../../i18n/useTranslations';
import { ALL_SOURCES, SOURCE_LINKS } from './sources';

// /datos: every source, what it covers, how fresh it is, and what we do with it.
const DataPage = () => {
  const { t } = useTranslations();

  return (
    <div className="bg-white pb-24 text-ink">
      <PageSEO title={t('dataPage.seoTitle')} description={t('dataPage.seoDescription')} />
      <header className="bg-forest pt-[76px] text-white">
        <div className="mx-auto max-w-[960px] px-5 pb-12 pt-12">
          <h1 className="font-display text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">{t('dataPage.title')}</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/75">{t('dataPage.intro')}</p>
        </div>
      </header>
      <main className="mx-auto flex max-w-[960px] flex-col gap-6 px-5 pt-10">
        {ALL_SOURCES.map(key => (
          <article key={key} className={`flex flex-col gap-2 rounded-2xl p-6 ${key === 'reviews' ? 'bg-lime-soft' : 'border border-line'}`}>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="font-display text-xl font-extrabold">{t(`dataSources.${key}.name`)}</h2>
              <span className="text-sm font-semibold text-ink-muted">{t(`dataSources.${key}.freshness`)}</span>
            </div>
            <p className="text-ink-soft">{t(`dataSources.${key}.what`)}</p>
            <p className="text-sm text-ink-muted">{t(`dataSources.${key}.limits`)}</p>
            {SOURCE_LINKS[key] ? (
              <a href={SOURCE_LINKS[key]!} target="_blank" rel="noreferrer" className="w-fit text-sm font-bold text-brand hover:underline">{t('dataPage.source')} →</a>
            ) : (
              <Link to="/add-review" className="mt-1 w-fit rounded-full bg-forest px-5 py-2.5 text-sm font-bold text-white hover:bg-brand">{t('dataNote.cta')}</Link>
            )}
          </article>
        ))}
        <section className="flex flex-col gap-2 pt-4">
          <h2 className="font-display text-2xl font-extrabold">{t('dataPage.methodTitle')}</h2>
          <p className="text-ink-soft">{t('dataPage.method')}</p>
          <a href="https://github.com/jesusvaros/CaseroVerificado/tree/main/scripts/data" target="_blank" rel="noreferrer" className="w-fit text-sm font-bold text-brand hover:underline">{t('dataPage.code')} →</a>
        </section>
      </main>
    </div>
  );
};

export default DataPage;
