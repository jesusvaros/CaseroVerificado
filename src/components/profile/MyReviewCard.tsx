import { Link } from 'react-router-dom';
import { useTranslations } from '../../i18n/useTranslations';
import { addressPath } from '../../utils/addressPath';
import type { MyReview } from './useMyReviews';

const TONE = {
  published: 'bg-lime text-forest',
  pending: 'bg-lime-soft text-forest',
  rejected: 'bg-coral-soft text-coral-ink',
  draft: 'bg-mist text-ink-muted',
} as const;

const MyReviewCard = ({ review, onFinish }: { review: MyReview; onFinish: (review: MyReview) => void }) => {
  const { t } = useTranslations();
  const title = [review.street, review.number].filter(Boolean).join(' ') || '—';
  const overall = review.scores.length ? review.scores.reduce((a, b) => a + b, 0) / review.scores.length : null;
  const path = review.status === 'published' ? addressPath(review.city, review.street, review.number) : null;
  const meta = [
    review.city,
    review.startYear && t('account.lived', { from: review.startYear, to: review.endYear ?? t('account.now') }),
    review.price && t('account.perMonth', { price: review.price.toLocaleString('es-ES') }),
  ].filter(Boolean);

  return (
    <article className="flex flex-wrap items-center gap-5 rounded-2xl border border-line bg-white p-5">
      {overall != null ? (
        <span className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-full bg-lime font-display text-xl font-extrabold leading-none text-forest">
          {overall.toLocaleString('es-ES', { maximumFractionDigits: 1 })}
        </span>
      ) : (
        <span className="h-14 w-14 shrink-0 rounded-full bg-mist" aria-hidden="true" />
      )}
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-display text-lg font-extrabold">{title}</h3>
          <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${TONE[review.status]}`}>{t(`account.status.${review.status}`)}</span>
        </div>
        {meta.length > 0 && <p className="text-sm text-ink-muted">{meta.join(' · ')}</p>}
        {review.status === 'pending' && <p className="text-sm text-ink-soft">{t('account.pendingHint')}</p>}
        {review.status === 'rejected' && review.rejectionReason && <p className="text-sm text-coral-ink">{t('account.rejectedReason', { reason: review.rejectionReason })}</p>}
        {review.status === 'draft' && <p className="text-sm text-ink-soft">{t('account.draftHint')}</p>}
      </div>
      <div className="flex flex-wrap gap-4 text-sm font-bold">
        {review.status === 'draft' ? (
          <button type="button" onClick={() => onFinish(review)} className="text-brand hover:text-forest">{t('account.continue')} →</button>
        ) : (
          <Link to={`/review/${review.id}`} className="text-brand hover:text-forest">{t('account.view')} →</Link>
        )}
        {path && <Link to={path} className="text-ink-soft hover:text-ink">{t('account.viewAddress')}</Link>}
      </div>
    </article>
  );
};

export default MyReviewCard;
