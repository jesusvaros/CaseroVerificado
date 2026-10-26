import { Link } from 'react-router-dom';
import type { PublicReview } from '../../services/supabase/publicReviews';
import { useTranslations } from '../../i18n/useTranslations';
import { LEGAL_META } from '../../config/legal';
import { reviewScore } from './addressSummary';

const DEPOSIT_CHIP: Record<string, 'good' | 'bad'> = { true: 'good', partial: 'bad', false: 'bad' };

const AddressReviewList = ({ reviews }: { reviews: PublicReview[] }) => {
  const { t } = useTranslations();

  return (
    <section className="flex flex-col">
      <h2 className="mb-2 font-display text-3xl font-extrabold tracking-tight md:text-[34px]">{t('addressPage.reviewsTitle')}</h2>
      {reviews.map((review, i) => {
        const score = reviewScore(review);
        const deposit = review.deposit_returned ? DEPOSIT_CHIP[review.deposit_returned] : undefined;
        const period = [
          review.start_year && t('addressPage.lived', { from: review.start_year, to: review.end_year ?? t('addressPage.now') }),
          review.price && t('addressPage.perMonth', { price: Math.round(review.price).toLocaleString('es-ES') }),
        ].filter(Boolean);

        return (
          <article key={review.id} className={`flex gap-5 py-8 ${i < reviews.length - 1 ? 'border-b border-line' : ''}`}>
            {score != null && (
              <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full font-display text-[21px] font-extrabold text-white ${score >= 3 ? 'bg-brand' : 'bg-coral'}`}>
                {Math.round(score)}
              </span>
            )}
            <div className="flex min-w-0 flex-1 flex-col gap-2.5">
              {period.length > 0 && <div className="text-sm text-ink-muted">{period.join(' · ')}</div>}
              {review.owner_opinion && <p className="whitespace-pre-line text-[17px] leading-relaxed">{review.owner_opinion}</p>}
              {deposit && (
                <div className="flex flex-wrap gap-1.5 text-[13px] font-bold">
                  <span className={`rounded-full px-2.5 py-1 ${deposit === 'good' ? 'bg-lime-soft text-[#1E5A12]' : 'bg-coral-soft text-coral-ink'}`}>
                    {t(`addressPage.deposit.${review.deposit_returned}`)}
                  </span>
                </div>
              )}
              <div className="flex flex-wrap gap-5 text-sm font-semibold">
                <Link to={`/review/${review.id}`} className="hover:text-brand">{t('addressPage.fullReview')}</Link>
                <a
                  href={`mailto:${LEGAL_META.contactEmail}?subject=${encodeURIComponent(`Denuncia o réplica de la opinión ${review.id}`)}`}
                  className="text-[#8A9384] hover:text-ink"
                >
                  {t('addressPage.report')}
                </a>
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
};

export default AddressReviewList;
