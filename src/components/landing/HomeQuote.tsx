import { useEffect, useState } from 'react';
import { getPublicReviews, type PublicReview } from '../../services/supabase/publicReviews';
import { useTranslations } from '../../i18n/useTranslations';

const MIN_QUOTE_LENGTH = 80;
const MAX_QUOTE_LENGTH = 280;

// Shows the most recent real review with enough text; renders nothing until one exists.
const HomeQuote = () => {
  const { t } = useTranslations();
  const [review, setReview] = useState<PublicReview | null>(null);

  useEffect(() => {
    let active = true;
    getPublicReviews().then(list => {
      if (!active) return;
      setReview(list.find(item => (item.owner_opinion ?? '').trim().length >= MIN_QUOTE_LENGTH) ?? null);
    });
    return () => {
      active = false;
    };
  }, []);

  if (!review?.owner_opinion) return null;
  const text = review.owner_opinion.trim();
  const quote = text.length > MAX_QUOTE_LENGTH ? `${text.slice(0, MAX_QUOTE_LENGTH).trimEnd()}…` : text;

  return (
    <section className="bg-mist px-5 py-24 md:px-10 md:py-28">
      <figure className="mx-auto flex max-w-4xl flex-col gap-6">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="#1F7A4D" aria-hidden="true">
          <path d="M7 7h4v4c0 3-1.5 5-4 6l-1-1.5c1.5-.8 2.3-2 2.4-3.5H7zM14 7h4v4c0 3-1.5 5-4 6l-1-1.5c1.5-.8 2.3-2 2.4-3.5H14z" />
        </svg>
        <blockquote className="font-display text-3xl font-semibold leading-tight tracking-tight md:text-4xl">{quote}</blockquote>
        <figcaption className="text-ink-muted">
          {t('home.v2.quote.caption', { city: review.city ?? t('home.v2.quote.unknownCity') })}
        </figcaption>
      </figure>
    </section>
  );
};

export default HomeQuote;
