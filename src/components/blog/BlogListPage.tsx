import { Link, useParams, useSearchParams } from 'react-router-dom';
import {
  computeReadingMinutes as estimateReadingMinutes,
  getBlogPostsByLanguage,
  type StaticBlogPost,
} from '../../blog/posts';
import {
  getCountryDisplayLabel,
  normalizeBlogCountryCode,
} from '../../blog/countryBlogs';
import { resolveLocale } from '../../i18n/config';
import { buildBlogListPath, buildBlogPostPath } from '../../i18n/routing';
import { useTranslations } from '../../i18n/useTranslations';
import { useDetectedCountryCode } from '../../services/location/useDetectedCountryCode';
import PageSEO from '../../seo/PageSEO';

function formatDate(dateString: string | null, dateLocale: string) {
  if (!dateString) return null;
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(dateLocale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
  } catch (error) {
    console.error('formatDate error', error);
    return null;
  }
}

function computeReadingMinutes(post: StaticBlogPost) {
  return estimateReadingMinutes(post.content, post.readingMinutes);
}

function truncateToWords(text: string, maxWords: number) {
  const words = text.split(/\s+/).filter(Boolean);
  if (words.length <= maxWords) return text;
  return `${words.slice(0, maxWords).join(' ')}...`;
}

function buildExcerpt(post: StaticBlogPost) {
  if (post.summary) return truncateToWords(post.summary, 35);
  const words = post.content.split(/\s+/).filter(Boolean);
  if (words.length === 0) return null;
  return `${words.slice(0, 35).join(' ')}...`;
}

const POSTS_PER_PAGE = 9;

export default function BlogListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { locale: routeLocale } = useParams<{ locale?: string }>();
  const { locale, dateLocale, t } = useTranslations();
  const blogLocale = resolveLocale(routeLocale ?? locale);

  const requestedCountryCode = normalizeBlogCountryCode(searchParams.get('country'));
  const { countryCode: detectedCountryCode, countryResolved } = useDetectedCountryCode();
  const detectedBlogCountryCode = normalizeBlogCountryCode(detectedCountryCode);
  const activeCountryCode =
    requestedCountryCode ?? detectedBlogCountryCode ?? 'ES';

  const parsedPage = Number.parseInt(searchParams.get('page') ?? '1', 10);
  const currentPage = Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;

  const isLoading = !requestedCountryCode && !countryResolved && !detectedBlogCountryCode;

  const fallbackImageUrl = '/og-casero.svg';
  const posts = isLoading ? [] : getBlogPostsByLanguage(blogLocale, activeCountryCode);
  const heroPost = posts[0] ?? null;

  const allSecondaryPosts = posts.slice(1);
  const totalSecondaryPosts = allSecondaryPosts.length;
  const totalPages = Math.ceil(totalSecondaryPosts / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const secondaryPosts = allSecondaryPosts.slice(startIndex, endIndex);

  const heroReadingMinutes = heroPost ? computeReadingMinutes(heroPost) : null;
  const heroExcerpt = heroPost ? buildExcerpt(heroPost) : null;

  const activeCountryLabel = activeCountryCode ? getCountryDisplayLabel(activeCountryCode, locale) : null;

  const canonicalParams = new URLSearchParams();
  if (activeCountryCode) canonicalParams.set('country', activeCountryCode);
  if (currentPage > 1) canonicalParams.set('page', String(currentPage));
  const canonicalPath =
    canonicalParams.toString().length > 0
      ? `${buildBlogListPath(blogLocale)}?${canonicalParams.toString()}`
      : buildBlogListPath(blogLocale);

  const postSearch = activeCountryCode ? `?country=${activeCountryCode}` : '';

  const handlePageChange = (page: number) => {
    const next = new URLSearchParams(searchParams);
    if (page <= 1) {
      next.delete('page');
    } else {
      next.set('page', page.toString());
    }

    if (activeCountryCode) next.set('country', activeCountryCode);
    else next.delete('country');

    setSearchParams(next);

    const recentSection = document.getElementById('articulos-recientes');
    if (recentSection) {
      recentSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const generatePageNumbers = () => {
    const pages: (number | 'ellipsis')[] = [];
    const delta = 4;

    if (totalPages <= 10) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    pages.push(1);

    const rangeStart = Math.max(2, currentPage - delta);
    const rangeEnd = Math.min(totalPages - 1, currentPage + delta);

    if (rangeStart > 2) {
      pages.push('ellipsis');
    }

    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push(i);
    }

    if (rangeEnd < totalPages - 1) {
      pages.push('ellipsis');
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = generatePageNumbers();

  return (
    <>
      <PageSEO
        title={currentPage > 1 ? t('blogList.seoTitlePage', { page: currentPage }) : t('blogList.seoTitle')}
        description={t('blogList.seoDescription')}
        canonicalPath={canonicalPath}
      />
      <main className="mx-auto mt-28 max-w-6xl px-6 pb-24">
        <header className="mb-8 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-emerald-700">{t('blogList.badge')}</p>
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl">{t('blogList.title')}</h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-gray-600">{t('blogList.intro')}</p>
          {activeCountryLabel ? (
            <p className="mt-3 text-sm font-medium text-gray-600">
              {t('blogList.countryScope', { country: activeCountryLabel })}
            </p>
          ) : null}
        </header>

        {isLoading ? (
          <section className="rounded-xl border border-gray-200 bg-white p-10 text-center">
            <p className="text-gray-600">{t('blogList.loading')}</p>
          </section>
        ) : null}

        {!isLoading && posts.length === 0 && (
          <section className="rounded-xl border border-gray-200 bg-white p-10 text-center">
            <h2 className="text-xl font-semibold text-gray-900">{t('blogList.emptyTitle')}</h2>
            <p className="mt-2 text-gray-600">{t('blogList.emptyDescription')}</p>
          </section>
        )}

        {!isLoading && heroPost && (
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">{t('blogList.featuredTitle')}</h2>
            <Link
              to={`${buildBlogPostPath(blogLocale, heroPost.slug)}${postSearch}`}
              className="group block overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="grid gap-0 md:grid-cols-2">
                <div className="relative h-64 md:h-auto md:max-h-[500px]">
                  <img
                    src={heroPost.heroImageUrl ?? fallbackImageUrl}
                    alt={heroPost.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 will-change-transform"
                    loading="lazy"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/0" />
                  <span className="pointer-events-none absolute left-5 top-5 rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white shadow">
                    {t('blogList.featuredBadge')}
                  </span>
                </div>

                <div className="flex flex-col justify-center px-6 py-8 md:px-10">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-wide text-gray-500">
                    {heroPost.publishedAt ? <span>{formatDate(heroPost.publishedAt, dateLocale)}</span> : null}
                    {heroPost.publishedAt && heroReadingMinutes ? <span>•</span> : null}
                    {heroReadingMinutes ? <span>{heroReadingMinutes} {t('common.minutesShort')}</span> : null}
                  </div>
                  <h2 className="mt-3 text-3xl font-semibold text-gray-900 transition-colors group-hover:text-emerald-700 md:text-4xl">
                    {heroPost.title}
                  </h2>
                  {heroExcerpt ? <p className="mt-4 text-base text-gray-600 md:text-lg">{heroExcerpt}</p> : null}
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700">
                    {t('blogList.readMore')}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          </section>
        )}

        {!isLoading && secondaryPosts.length > 0 && (
          <section id="articulos-recientes">
            <h2 className="mb-6 text-2xl font-semibold text-gray-900">
              {t('blogList.recentArticles')}
              {totalPages > 1 && (
                <span className="ml-2 text-base font-normal text-gray-500">
                  ({t('blogList.pageOf', { current: currentPage, total: totalPages })})
                </span>
              )}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {secondaryPosts.map(post => {
                const readingMinutes = computeReadingMinutes(post);
                const publishedLabel = formatDate(post.publishedAt, dateLocale);
                const excerpt = buildExcerpt(post);
                const imageUrl = post.heroImageUrl ?? fallbackImageUrl;
                return (
                  <Link
                    key={post.slug}
                    to={`${buildBlogPostPath(blogLocale, post.slug)}${postSearch}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-emerald-50">
                      <img
                        src={imageUrl}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105 will-change-transform"
                        loading="lazy"
                      />
                    </div>

                    <div className="flex flex-1 flex-col px-5 py-4 text-left">
                      <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-gray-500">
                        {publishedLabel ? <span>{publishedLabel}</span> : null}
                        {publishedLabel && readingMinutes ? <span>•</span> : null}
                        {readingMinutes ? <span>{readingMinutes} {t('common.minutesShort')}</span> : null}
                      </div>
                      <h2 className="mt-2 text-lg font-semibold text-gray-900 transition-colors group-hover:text-emerald-700">
                        {post.title}
                      </h2>
                      {excerpt ? <p className="mt-2 text-sm text-gray-600">{excerpt}</p> : null}
                      <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700">
                        {t('blogList.readMore')}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>

            {totalPages > 1 && (
              <div className="mt-12 flex justify-center">
                <nav className="flex items-center gap-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                    {t('blogList.previous')}
                  </button>

                  {pageNumbers.map((page, index) => {
                    if (page === 'ellipsis') {
                      return (
                        <span key={`ellipsis-${index}`} className="px-2 text-gray-500">
                          ...
                        </span>
                      );
                    }
                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                          page === currentPage
                            ? 'bg-emerald-600 text-white'
                            : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {t('blogList.next')}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </nav>
              </div>
            )}
          </section>
        )}
      </main>
    </>
  );
}
