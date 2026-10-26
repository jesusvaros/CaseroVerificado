import { Link } from 'react-router-dom';
import { blogPosts } from '../../blog/posts';
import { buildBlogListPath, buildBlogPostPath } from '../../i18n/routing';
import { useTranslations } from '../../i18n/useTranslations';
import { umamiEventProps } from '../../utils/analytics';

const MAX_GUIDES = 5;

const HomeGuides = () => {
  const { t, locale } = useTranslations();
  const guides = blogPosts.filter(post => post.language === 'es').slice(0, MAX_GUIDES);
  if (guides.length === 0) return null;

  return (
    <section className="mx-auto flex max-w-7xl flex-wrap gap-16 px-5 py-24 md:px-10 md:py-28">
      <div className="flex min-w-0 flex-[1_1_20rem] flex-col gap-4">
        <h2 className="font-display text-4xl font-extrabold leading-none tracking-tight md:text-5xl">{t('home.v2.guides.title')}</h2>
        <p className="text-lg leading-relaxed text-ink-soft">{t('home.v2.guides.body')}</p>
        <Link to={buildBlogListPath(locale)} className="font-bold text-brand hover:text-forest">
          {t('home.v2.guides.all')} →
        </Link>
      </div>
      <nav className="flex min-w-0 flex-[2_1_30rem] flex-col" aria-label={t('home.v2.guides.title')}>
        {guides.map(guide => (
          <Link
            key={guide.slug}
            to={buildBlogPostPath(locale, guide.slug)}
            className="flex items-center justify-between gap-4 border-b border-[#DCE3D3] py-5 text-lg font-semibold text-ink transition-colors last:border-b-0 hover:text-brand md:text-xl"
            {...umamiEventProps('home:guide')}
          >
            {guide.title}
            <span className="text-2xl text-brand" aria-hidden="true">→</span>
          </Link>
        ))}
      </nav>
    </section>
  );
};

export default HomeGuides;
