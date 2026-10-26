import { Link } from 'react-router-dom';
import { useTranslations } from '../../i18n/useTranslations';
import type { PublicReview } from '../../services/supabase/publicReviews';
import { addressPath } from '../../utils/addressPath';

const MAX_QUOTE = 240;

// Latest reviews in the city, each linking to its address page.
const CityQuotes = ({ city, reviews }: { city: string; reviews: PublicReview[] }) => {
  const { t } = useTranslations();
  const quotes = reviews.filter(r => (r.owner_opinion?.trim().length ?? 0) >= 40).slice(0, 4);
  if (quotes.length === 0) return null;

  return (
    <section className="mx-auto flex max-w-[1320px] flex-col gap-8 px-5 pt-20 md:px-[5%]">
      <h2 className="font-display text-3xl font-extrabold tracking-tight md:text-[34px]">{t('cityPage.latestTitle', { city })}</h2>
      <div className="grid gap-10 md:grid-cols-2">
        {quotes.map(review => {
          const text = review.owner_opinion!.trim();
          const path = addressPath(review.city, review.street, review.number);
          const label = [review.street, review.number].filter(Boolean).join(' ') || review.full_address || city;
          return (
            <figure key={review.id} className="flex flex-col gap-3 border-l-4 border-lime pl-5">
              <blockquote className="text-lg leading-relaxed">“{text.length > MAX_QUOTE ? `${text.slice(0, MAX_QUOTE).trimEnd()}…` : text}”</blockquote>
              <figcaption className="text-sm text-ink-muted">
                {path ? <Link to={path} className="font-semibold text-ink hover:text-brand">{label}</Link> : label}
              </figcaption>
            </figure>
          );
        })}
      </div>
      <Link to="/add-review" className="w-fit rounded-full bg-forest px-7 py-4 font-bold text-white transition-colors hover:bg-brand">
        {t('cityPage.addMine')}
      </Link>
    </section>
  );
};

export default CityQuotes;
