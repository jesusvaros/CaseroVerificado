import { Link } from 'react-router-dom';
import type { StaticBlogPost } from '../../blog/posts';
import { resolveLocale } from '../../i18n/config';
import { buildBlogPostPath } from '../../i18n/routing';
import { useTranslations } from '../../i18n/useTranslations';
import GuideCover from './GuideCover';

// "Keep reading" row at the end of a guide.
export default function RelatedLinksCard({ posts }: { posts: StaticBlogPost[] }) {
  const { locale, t } = useTranslations();
  const blogLocale = resolveLocale(locale);

  if (posts.length === 0) return null;

  return (
    <section className="bg-mist">
      <div className="mx-auto max-w-[1320px] px-5 py-16 md:px-[5%]">
        <h2 className="font-display text-3xl font-extrabold tracking-tight">{t('blogPost.keepReading')}</h2>
        <div className="mt-8 grid gap-8 sm:grid-cols-3">
          {posts.map(post => (
            <Link key={post.slug} to={buildBlogPostPath(blogLocale, post.slug)} className="group flex flex-col gap-3">
              <GuideCover slug={post.slug} className="aspect-[16/10] rounded-2xl" />
              <h3 className="font-display text-lg font-extrabold leading-snug group-hover:text-brand">{post.title}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
