import { DEFAULT_LOCALE, isSupportedLocale, resolveLocale, type Locale } from './config';

export function getLocaleFromPath(pathname: string): Locale | null {
  const [firstSegment] = pathname.split('/').filter(Boolean);
  return isSupportedLocale(firstSegment) ? firstSegment : null;
}

export function buildBlogListPath(locale: Locale): string {
  void locale;
  return '/blog';
}

export function buildBlogPostPath(locale: Locale, slug: string): string {
  void locale;
  return `/blog/${slug}`;
}

export function parseBlogRoute(pathname: string): { locale: Locale; slug?: string } | null {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length === 0) return null;

  if (segments[0] === 'blog') {
    return {
      locale: DEFAULT_LOCALE,
      slug: segments[1],
    };
  }

  const [maybeLocale, section, maybeSlug] = segments;
  if (!isSupportedLocale(maybeLocale) || section !== 'blog') return null;

  return {
    locale: maybeLocale,
    slug: maybeSlug,
  };
}

export function resolveBlogRouteLocale(localeParam: string | undefined): Locale {
  return resolveLocale(localeParam ?? DEFAULT_LOCALE);
}
