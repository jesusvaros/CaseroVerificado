import { Link } from 'react-router-dom';
import type { StaticBlogPost } from '../../blog/posts';
import { resolveLocale } from '../../i18n/config';
import { buildBlogPostPath } from '../../i18n/routing';
import { useTranslations } from '../../i18n/useTranslations';

interface RelatedLinksCardProps {
  posts: StaticBlogPost[];
  countryCode?: string | null;
  className?: string;
  mobileOnly?: boolean;
}

export default function RelatedLinksCard({
  posts,
  countryCode,
  className = '',
  mobileOnly = false,
}: RelatedLinksCardProps) {
  const { locale, dateLocale, t } = useTranslations();
  const blogLocale = resolveLocale(locale);

  if (posts.length === 0) return null;

  // En móvil solo mostrar 2 posts
  const displayPosts = mobileOnly ? posts.slice(0, 2) : posts;
  const scopedSearch = countryCode ? `?country=${countryCode}` : '';

  return (
    <div className={`my-8 ${className} ${mobileOnly ? 'block sm:hidden' : 'block'}`}>
      <div className="grid gap-3 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3">
        {displayPosts.map((post) => (
          <Link
            key={post.slug}
            to={`${buildBlogPostPath(blogLocale, post.slug)}${scopedSearch}`}
            className="group block rounded-lg border border-gray-200 bg-white overflow-hidden transition-shadow hover:shadow-md hover:border-emerald-300"
          >
            {post.heroImageUrl && (
              <div className="aspect-video bg-gray-100">
                <img 
                  src={post.heroImageUrl} 
                  alt={post.title} 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            )}
            <div className="p-3">
              <h4 className="mb-2 text-xs font-medium text-gray-900 group-hover:text-emerald-700 leading-tight">
                {post.title}
              </h4>
              <div className="flex items-center text-xs text-gray-500">
                {post.publishedAt && (
                  <time dateTime={post.publishedAt}>
                    {new Date(post.publishedAt).toLocaleDateString(dateLocale, {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </time>
                )}
                {post.readingMinutes && (
                  <span className="ml-2">
                    • {post.readingMinutes} {t('common.minutesShort')}
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
