import { Link } from 'react-router-dom';
import type { PublicReview } from '../../services/supabase/publicReviews';
import { useTranslations } from '../../i18n/useTranslations';
import { addressPath } from '../../utils/addressPath';
import Reveal from './Reveal';

const MAX_QUOTE_LENGTH = 280;

// The latest real review long enough to quote, linking to its address page.
const HomeQuote = ({ review }: { review: PublicReview | null }) => {
  const { t } = useTranslations();
  if (!review?.owner_opinion) return null;

  const text = review.owner_opinion.trim();
  const quote = text.length > MAX_QUOTE_LENGTH ? `${text.slice(0, MAX_QUOTE_LENGTH).trimEnd()}…` : text;
  const path = addressPath(review.city, review.street, review.number);
  const period = review.start_year ? ` · ${t('home.v3.quote.lived', { from: review.start_year, to: review.end_year ?? t('addressPage.now') })}` : '';

  return (
    <section className="bg-mist px-5 py-24 md:px-[5%] md:py-[110px]">
      <Reveal>
        <figure className="mx-auto flex max-w-[980px] flex-col gap-6">
          <svg width="54" height="54" viewBox="0 0 24 24" fill="#1F7A4D" aria-hidden="true">
            <path d="M7 7h4v4c0 3-1.5 5-4 6l-1-1.5c1.5-.8 2.3-2 2.4-3.5H7zM14 7h4v4c0 3-1.5 5-4 6l-1-1.5c1.5-.8 2.3-2 2.4-3.5H14z" />
          </svg>
          <blockquote className="font-display text-3xl font-semibold leading-[1.2] tracking-[-0.015em] md:text-[40px]">{quote}</blockquote>
          <figcaption className="text-base text-ink-muted">
            {path ? (
              <Link to={path} className="hover:text-brand">
                {t('home.v3.quote.caption', { city: review.city ?? '' })}
                {period}
              </Link>
            ) : (
              <>
                {t('home.v3.quote.caption', { city: review.city ?? '' })}
                {period}
              </>
            )}
          </figcaption>
        </figure>
      </Reveal>
    </section>
  );
};

export default HomeQuote;
