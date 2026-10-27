import React from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  computeReadingMinutes as estimateReadingMinutes,
  findBlogPostBySlug,
  type StaticBlogPost,
} from '../../blog/posts';
import { getRelatedPostsBatch } from '../../blog/relatedPosts';
import { resolveLocale } from '../../i18n/config';
import { buildBlogListPath, buildBlogPostPath } from '../../i18n/routing';
import { useTranslations } from '../../i18n/useTranslations';
import PageSEO from '../../seo/PageSEO';
import RelatedLinksCard from './RelatedLinksCard';
import GuideCover from './GuideCover';
import { guideTopic } from './guideTopics';

type ContentBlock = {
  type: 'paragraph' | 'heading' | 'list' | 'ordered-list' | 'divider';
  level?: 2 | 3 | 4;
  content: string[];
};

// Supports **bold**, [text](https://url) and bare https:// URLs, so guide sources render as links.
const INLINE_PATTERN = /\*\*(.+?)\*\*|\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|(https?:\/\/[^\s)]+[^\s).,;:])/;

function processInlineMarkdown(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let currentText = text;
  let key = 0;

  while (currentText.length > 0) {
    const match = currentText.match(INLINE_PATTERN);
    if (!match || match.index === undefined) {
      parts.push(currentText);
      break;
    }
    if (match.index > 0) {
      parts.push(currentText.substring(0, match.index));
    }
    const [whole, bold, linkText, linkUrl, bareUrl] = match;
    if (bold !== undefined) {
      parts.push(<strong key={`bold-${key++}`}>{bold}</strong>);
    } else {
      const href = linkUrl ?? bareUrl;
      parts.push(
        <a
          key={`link-${key++}`}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="break-words text-brand underline underline-offset-2 hover:text-forest"
        >
          {linkText ?? bareUrl}
        </a>
      );
    }
    currentText = currentText.substring(match.index + whole.length);
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
    return <hr key={`divider-${index}`} className="my-8 border-line" />;
  }

  if (block.type === 'heading') {
    const Tag = block.level === 2 ? 'h2' : block.level === 3 ? 'h3' : 'h4';
    return (
      <Tag
        key={`heading-${index}`}
        className={
          block.level === 2
            ? 'mt-12 font-display text-[28px] font-extrabold leading-tight tracking-tight text-ink'
            : block.level === 3
              ? 'mt-9 font-display text-[22px] font-extrabold tracking-tight text-ink'
              : 'mt-7 text-lg font-bold text-ink'
        }
      >
        {processInlineMarkdown(block.content[0])}
      </Tag>
    );
  }
  if (block.type === 'ordered-list') {
    return (
      <ol key={`ordered-list-${index}`} className="my-6 list-decimal pl-6 marker:font-bold marker:text-brand">
        {block.content.map((item, idx) => (
          <li key={idx} className="mb-2">{processInlineMarkdown(item)}</li>
        ))}
      </ol>
    );
  }
  if (block.type === 'list') {
    return (
      <ul key={`list-${index}`} className="my-6 list-disc pl-6 marker:text-brand">
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
  const { slug = '', locale: routeLocale } = useParams<{ slug: string; locale?: string }>();
  const { locale, t } = useTranslations();
  const blogLocale = resolveLocale(routeLocale ?? locale);
  const post = findBlogPostBySlug(slug, blogLocale, 'ES') ?? null;
  const readingMinutes = computeReadingMinutes(post);
  const blogPath = buildBlogListPath(blogLocale);

  if (!post) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-white px-5 pt-24 text-center text-ink">
        <PageSEO title={t('blogPost.notFoundTitle')} noindex />
        <h1 className="font-display text-3xl font-extrabold">{t('blogPost.notFoundTitle')}</h1>
        <p className="text-ink-soft">{t('blogPost.notFoundDescription')}</p>
        <Link to={blogPath} className="font-bold text-brand underline underline-offset-4">{t('blogPost.viewAllArticles')}</Link>
      </div>
    );
  }

  const blocks = parseContent(post.content);
  const related = getRelatedPostsBatch(post, { top: 0, middle: 0, bottom: 3 }).bottom;

  return (
    <div className="bg-white text-ink">
      <PageSEO
        title={post.seoTitle ?? post.title}
        description={post.seoDescription ?? post.summary}
        canonicalPath={buildBlogPostPath(blogLocale, post.slug)}
      />
      <header className="bg-forest pt-16 text-white">
        <div className="mx-auto grid max-w-[1320px] items-center gap-10 px-5 pb-14 pt-12 md:grid-cols-[1fr_340px] md:px-[5%]">
          <div className="flex flex-col gap-4">
            <Link to={blogPath} className="text-sm font-semibold text-lime hover:underline">← {t('home.v3.guides.title')}</Link>
            <h1 className="font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[52px]">{post.title}</h1>
            {post.summary && <p className="max-w-2xl text-lg text-white/75">{post.summary}</p>}
            <span className="text-sm text-white/60">
              {guideTopic(post.slug).label}
              {readingMinutes ? ` · ${t('blogPost.readingTime', { minutes: readingMinutes })}` : ''}
            </span>
          </div>
          <GuideCover slug={post.slug} size="hero" onDark className="hidden aspect-square rounded-3xl md:flex" />
        </div>
      </header>

      <main className="mx-auto max-w-[720px] px-5 pb-20 pt-6 text-[18px] leading-[1.7] text-ink-soft">
        {blocks.map(renderBlock)}

        <aside className="mt-14 flex flex-col items-start gap-3 rounded-3xl bg-lime p-8 text-forest">
          <h2 className="font-display text-2xl font-extrabold">{t('blogPost.shareTitle')}</h2>
          <p className="text-[17px] text-forest/80">{t('blogPost.shareDescription')}</p>
          <Link to="/add-review" className="mt-2 rounded-full bg-forest px-6 py-3 font-bold text-white transition-colors hover:bg-brand">
            {t('blogPost.shareCta')}
          </Link>
        </aside>
      </main>

      <RelatedLinksCard posts={related} />
    </div>
  );
}
