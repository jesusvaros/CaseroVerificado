import { Link, useParams } from 'react-router-dom';
import { computeReadingMinutes, getBlogPostsByLanguage, type StaticBlogPost } from '../../blog/posts';
import { resolveLocale } from '../../i18n/config';
import { buildBlogListPath, buildBlogPostPath } from '../../i18n/routing';
import { useTranslations } from '../../i18n/useTranslations';
import PageSEO from '../../seo/PageSEO';
import GuideCover from './GuideCover';
import { guideTopic } from './guideTopics';

// Every guide is about renting in Spain, so the list is not split by country or paginated.
export default function BlogListPage() {
  const { locale: routeLocale } = useParams<{ locale?: string }>();
  const { locale, t } = useTranslations();
  const blogLocale = resolveLocale(routeLocale ?? locale);
  const [featured, ...rest] = getBlogPostsByLanguage(blogLocale, 'ES');

  const minutes = (post: StaticBlogPost) => computeReadingMinutes(post.content, post.readingMinutes) ?? 1;
  const path = (post: StaticBlogPost) => buildBlogPostPath(blogLocale, post.slug);

  return (
    <div className="bg-white text-ink">
      <PageSEO title={t('blogList.seoTitle')} description={t('blogList.seoDescription')} canonicalPath={buildBlogListPath(blogLocale)} />
      <header className="bg-forest pt-16 text-white">
        <div className="mx-auto max-w-[1320px] px-5 pb-14 pt-14 md:px-[5%]">
          <h1 className="font-display text-4xl font-extrabold leading-none tracking-[-0.03em] md:text-[56px]">{t('home.v3.guides.title')}</h1>
          <p className="mt-4 max-w-xl text-lg text-white/75">{t('home.v3.guides.text')}</p>
        </div>
      </header>

      <main className="mx-auto max-w-[1320px] px-5 pb-24 pt-14 md:px-[5%]">
        {featured && (
          <Link to={path(featured)} className="group grid overflow-hidden rounded-3xl border border-line md:grid-cols-2">
            <GuideCover slug={featured.slug} size="hero" className="aspect-[16/10] md:aspect-auto md:min-h-[320px]" />
            <div className="flex flex-col justify-center gap-4 p-7 md:p-10">
              <span className="text-sm font-bold uppercase tracking-wide text-brand">{guideTopic(featured.slug).label}</span>
              <h2 className="font-display text-3xl font-extrabold leading-tight tracking-tight group-hover:text-brand md:text-4xl">{featured.title}</h2>
              <p className="text-lg text-ink-soft">{featured.summary}</p>
              <span className="text-sm text-ink-muted">{t('blogPost.readingTime', { minutes: minutes(featured) })}</span>
            </div>
          </Link>
        )}

        <div className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map(post => (
            <Link key={post.slug} to={path(post)} className="group flex flex-col gap-4">
              <GuideCover slug={post.slug} className="aspect-[16/10] rounded-2xl" />
              <h2 className="font-display text-xl font-extrabold leading-snug tracking-tight group-hover:text-brand">{post.title}</h2>
              <p className="line-clamp-3 text-ink-soft">{post.summary}</p>
              <span className="text-sm text-ink-muted">{t('blogPost.readingTime', { minutes: minutes(post) })}</span>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
