import React from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import {
  computeReadingMinutes as estimateReadingMinutes,
  findBlogPostBySlug,
  type StaticBlogPost,
} from '../../blog/posts';
import {
  getCountryDisplayLabel,
  normalizeBlogCountryCode,
} from '../../blog/countryBlogs';
import { getRelatedPostsBatch } from '../../blog/relatedPosts';
import { resolveLocale } from '../../i18n/config';
import { buildBlogListPath, buildBlogPostPath } from '../../i18n/routing';
import { useTranslations } from '../../i18n/useTranslations';
import { useDetectedCountryCode } from '../../services/location/useDetectedCountryCode';
import PageSEO from '../../seo/PageSEO';
import BlogCommentsSection from './BlogCommentsSection';
import RelatedLinksCard from './RelatedLinksCard';

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

type ContentBlock = {
  type: 'paragraph' | 'heading' | 'list' | 'ordered-list' | 'divider';
  level?: 2 | 3 | 4;
  content: string[];
};

function processInlineMarkdown(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let currentText = text;
  let key = 0;

  while (currentText.length > 0) {
    const boldMatch = currentText.match(/\*\*(.+?)\*\*/);
    if (boldMatch && boldMatch.index !== undefined) {
      if (boldMatch.index > 0) {
        parts.push(currentText.substring(0, boldMatch.index));
      }
      parts.push(<strong key={`bold-${key++}`}>{boldMatch[1]}</strong>);
      currentText = currentText.substring(boldMatch.index + boldMatch[0].length);
    } else {
      parts.push(currentText);
      break;
    }
  }

  return parts;
}

function parseContent(raw: string): ContentBlock[] {
  const blocks = raw.split(/\n{2,}/).map(block => block.trim()).filter(Boolean);
  const result: ContentBlock[] = [];

  blocks.forEach(block => {
    if (/^[-*]{3,}$/.test(block)) {
      result.push({ type: 'divider', content: [] });
      return;
    }

    if (/^#{1,6}\s/.test(block)) {
      const hashes = block.match(/^#+/);
      const level = Math.min(hashes ? hashes[0].length : 2, 4) as 2 | 3 | 4;
      const text = block.replace(/^#{1,6}\s+/, '').trim();
      result.push({ type: 'heading', level, content: [text] });
      return;
    }

    if (/^\d+\.\s+/m.test(block)) {
      const items = block
        .split(/\n+/)
        .map(line => line.replace(/^\d+\.\s+/, '').trim())
        .filter(Boolean);
      if (items.length > 0) {
        result.push({ type: 'ordered-list', content: items });
        return;
      }
    }

    if (/^[-*]\s+/m.test(block)) {
      const items = block
        .split(/\n+/)
        .map(line => line.replace(/^[-*]\s+/, '').trim())
        .filter(Boolean);
      if (items.length > 0) {
        result.push({ type: 'list', content: items });
        return;
      }
    }

    result.push({ type: 'paragraph', content: [block] });
  });

  return result;
}

function computeReadingMinutes(post: StaticBlogPost | null) {
  if (!post) return null;
  return estimateReadingMinutes(post.content, post.readingMinutes);
}

function renderBlock(block: ContentBlock, index: number) {
  if (block.type === 'divider') {
    return <hr key={`divider-${index}`} className="my-8 border-gray-300" />;
  }

  if (block.type === 'heading') {
    const Tag = block.level === 2 ? 'h2' : block.level === 3 ? 'h3' : 'h4';
    return (
      <Tag
        key={`heading-${index}`}
        className={
          block.level === 2
            ? 'mt-10 text-3xl font-semibold text-gray-900'
            : block.level === 3
              ? 'mt-8 text-2xl font-semibold text-gray-900'
              : 'mt-6 text-xl font-semibold text-gray-900'
        }
      >
        {processInlineMarkdown(block.content[0])}
      </Tag>
    );
  }
  if (block.type === 'ordered-list') {
    return (
      <ol key={`ordered-list-${index}`} className="my-6 list-decimal pl-6 text-gray-800">
        {block.content.map((item, idx) => (
          <li key={idx} className="mb-2">{processInlineMarkdown(item)}</li>
        ))}
      </ol>
    );
  }
  if (block.type === 'list') {
    return (
      <ul key={`list-${index}`} className="my-6 list-disc pl-6 text-gray-800">
        {block.content.map((item, idx) => (
          <li key={idx} className="mb-2">{processInlineMarkdown(item)}</li>
        ))}
      </ul>
    );
  }
  return block.content.map((paragraph, idx) => (
    <p key={`paragraph-${index}-${idx}`} className="mt-6 whitespace-pre-line">
      {processInlineMarkdown(paragraph)}
    </p>
  ));
}

export default function BlogPostPage() {
  const [searchParams] = useSearchParams();
  const { slug = '', locale: routeLocale } = useParams<{ slug: string; locale?: string }>();
  const { locale, dateLocale, t } = useTranslations();
  const blogLocale = resolveLocale(routeLocale ?? locale);
  const requestedCountryCode = normalizeBlogCountryCode(searchParams.get('country'));
  const { countryCode: detectedCountryCode, countryResolved } = useDetectedCountryCode();
  const detectedBlogCountryCode = normalizeBlogCountryCode(detectedCountryCode);
  const activeCountryCode =
    requestedCountryCode ?? detectedBlogCountryCode ?? 'ES';
  const activeCountryLabel = activeCountryCode
    ? getCountryDisplayLabel(activeCountryCode, locale)
    : null;
  const isCountryPending = !requestedCountryCode && !countryResolved && !detectedBlogCountryCode;

  const post = isCountryPending
    ? null
    : findBlogPostBySlug(slug, blogLocale, activeCountryCode) ?? null;

  const readingMinutes = computeReadingMinutes(post);
  const publishedLabel = formatDate(post?.publishedAt ?? null, dateLocale);
  const blocks = post ? parseContent(post.content) : [];
  const seoTitle = post?.seoTitle ?? post?.title ?? t('blogPost.seoFallbackTitle');
  const seoDescription = post?.seoDescription ?? post?.summary ?? undefined;

  const relatedPosts = post
    ? getRelatedPostsBatch(post, {
      top: 3,
      middle: 3,
      bottom: 6,
    })
    : { top: [], middle: [], bottom: [] };

  const notFound = !isCountryPending && !post;
  const blogListSearch = activeCountryCode ? `?country=${activeCountryCode}` : '';
  const blogListPathWithScope = `${buildBlogListPath(blogLocale)}${blogListSearch}`;
  const canonicalPath = `${buildBlogPostPath(blogLocale, post ? post.slug : slug)}${blogListSearch}`;

  return (
    <>
      <PageSEO
        title={seoTitle}
        description={seoDescription}
        canonicalPath={canonicalPath}
        noindex={notFound}
      />
      <main className="mx-auto mt-28 max-w-3xl px-6 pb-0 sm:pb-24">
        {activeCountryLabel ? (
          <section className="mb-6 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
            <p className="text-sm text-gray-600">{t('blogList.countryScope', { country: activeCountryLabel })}</p>
          </section>
        ) : null}

        <nav className="mb-6 text-sm text-gray-500">
          <Link to="/" className="text-gray-500 hover:text-gray-700">{t('blogPost.breadcrumbHome')}</Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link to={blogListPathWithScope} className="text-gray-500 hover:text-gray-700">{t('blogPost.breadcrumbBlog')}</Link>
          {post ? (
            <>
              <span className="mx-2 text-gray-400">/</span>
              <span className="text-gray-700">{post.title}</span>
            </>
          ) : null}
        </nav>

        {isCountryPending ? (
          <section className="rounded-xl border border-gray-200 bg-white p-8 text-center text-gray-700">
            <p>{t('blogList.loading')}</p>
          </section>
        ) : null}

        {notFound ? (
          <section className="rounded-xl border border-red-200 bg-red-50 p-8 text-center text-red-700">
            <h1 className="text-2xl font-semibold">{t('blogPost.notFoundTitle')}</h1>
            <p className="mt-3 text-base text-red-600">{t('blogPost.notFoundDescription')}</p>
            <Link
              to={blogListPathWithScope}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-700 px-5 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800"
            >
              {t('blogPost.viewAllArticles')}
            </Link>
          </section>
        ) : null}

        {post ? (
          <article className="bg-white">
            <header className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">{t('blogPost.blogLabel')}</p>
              <h1 className="mt-4 text-4xl font-bold text-gray-900">{post.title}</h1>
              <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-gray-500">
                {publishedLabel ? <span>{t('blogPost.publishedOn', { date: publishedLabel })}</span> : null}
                {readingMinutes ? <span>• {t('blogPost.readingTime', { minutes: readingMinutes })}</span> : null}
                {post.sourceUrl ? (
                  <a
                    href={post.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-emerald-700 hover:text-emerald-800"
                  >
                    {t('blogPost.originalSource')}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 11l3-3m0 0l-3-3m3 3H8a4 4 0 00-4 4v8" />
                    </svg>
                  </a>
                ) : null}
              </div>
            </header>

            {post.heroImageUrl ? (
              <figure className="mb-8 overflow-hidden rounded-3xl bg-gray-100">
                <img src={post.heroImageUrl} alt={post.title} className="w-full object-cover" />
              </figure>
            ) : null}

            <section className="text-lg leading-relaxed text-gray-800">
              {post.summary ? <p className="text-xl leading-relaxed text-gray-600">{post.summary}</p> : null}

              <RelatedLinksCard
                posts={relatedPosts.top}
                countryCode={activeCountryCode}
                mobileOnly={true}
              />
              <div className="hidden sm:block">
                <RelatedLinksCard
                  posts={relatedPosts.top}
                  countryCode={activeCountryCode}
                />
              </div>

              {blocks.map((block, index) => {
                if (index === Math.floor(blocks.length / 2)) {
                  return (
                    <React.Fragment key={`middle-related-${index}`}>
                      <RelatedLinksCard
                        posts={relatedPosts.middle}
                        countryCode={activeCountryCode}
                        className="my-12"
                        mobileOnly={true}
                      />
                      <div className="hidden sm:block">
                        <RelatedLinksCard
                          posts={relatedPosts.middle}
                          countryCode={activeCountryCode}
                          className="my-12"
                        />
                      </div>
                      {renderBlock(block, index)}
                    </React.Fragment>
                  );
                }

                return renderBlock(block, index);
              })}
            </section>

            <div className="mt-16">
              <BlogCommentsSection
                postSlug={post.slug}
              />
            </div>

            <RelatedLinksCard
              posts={relatedPosts.bottom}
              countryCode={activeCountryCode}
              className="mt-8"
            />

            <footer className="mt-8 rounded-3xl bg-emerald-50 p-8 text-gray-800">
              <h2 className="text-xl font-semibold text-emerald-900">{t('blogPost.shareTitle')}</h2>
              <p className="mt-2 text-gray-700">{t('blogPost.shareDescription')}</p>
              <Link
                to="/add-review"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-700 px-5 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800"
              >
                {t('blogPost.shareCta')}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </Link>
            </footer>
          </article>
        ) : null}
      </main>
    </>
  );
}
