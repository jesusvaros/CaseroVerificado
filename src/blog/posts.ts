// Añade guías en src/blog/posts y ejecuta `npm run update:posts` para regenerar este índice.
// Este archivo se genera automáticamente. No editar manualmente.
import { normalizeBlogCountryCode, resolvePostCountryCode } from './countryBlogs';

export type BlogLanguage = 'es' | 'en' | 'fr' | 'de' | 'pt' | 'it' | 'nl' | 'sv';

export type StaticBlogPost = {
  slug: string;
  title: string;
  summary: string;
  content: string;
  language: BlogLanguage;
  publishedAt: string; // ISO date string
  countryCode?: string;
  heroImageUrl?: string;
  readingMinutes?: number;
  seoTitle?: string;
  seoDescription?: string;
  sourceUrl?: string;
};

type StaticBlogPostInput = Omit<StaticBlogPost, 'language'> & {
  language?: string;
};

// Import individual post files (auto-generated)
import post1 from './posts/como-evaluar-un-contrato-de-alquiler.js';

const rawPosts: StaticBlogPostInput[] = [
  post1,
];

function normalizeBlogLanguage(value: string | undefined): BlogLanguage {
  switch (value) {
    case 'en':
    case 'fr':
    case 'de':
    case 'pt':
    case 'it':
    case 'nl':
    case 'sv':
      return value;
    case 'es':
    default:
      return 'es';
  }
}

export const blogPosts: StaticBlogPost[] = [...rawPosts]
  .map(post => ({
    ...post,
    language: normalizeBlogLanguage(post.language),
    // Compatibilidad histórica: si no hay país guardado, asumimos ES para posts legacy.
    countryCode: resolvePostCountryCode(post.countryCode),
  }))
  .sort((a, b) => (a.publishedAt > b.publishedAt ? -1 : 1));

export function getBlogPostsByLanguage(language: BlogLanguage, countryCode?: string | null) {
  const scopedCountry = normalizeBlogCountryCode(countryCode);
  const countryScopedPosts = scopedCountry
    ? blogPosts.filter(post => post.countryCode === scopedCountry)
    : blogPosts;

  const filteredByLanguage = countryScopedPosts.filter(post => post.language === language);
  return filteredByLanguage.length > 0 ? filteredByLanguage : countryScopedPosts;
}

export function findBlogPostBySlug(
  slug: string,
  language?: BlogLanguage,
  countryCode?: string | null
) {
  const scopedCountry = normalizeBlogCountryCode(countryCode);
  const countryScopedPosts = scopedCountry
    ? blogPosts.filter(post => post.countryCode === scopedCountry)
    : blogPosts;

  if (language) {
    const localized = countryScopedPosts.find(
      post => post.slug === slug && post.language === language
    );
    if (localized) return localized;
  }
  return countryScopedPosts.find(post => post.slug === slug);
}

export function computeReadingMinutes(content: string, fallback?: number | null) {
  if (fallback && Number.isFinite(fallback)) {
    return fallback;
  }
  const words = content.split(/\s+/).filter(Boolean);
  if (words.length === 0) return null;
  return Math.max(1, Math.round(words.length / 220));
}
