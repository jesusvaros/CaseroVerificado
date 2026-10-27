import { Link } from 'react-router-dom';
import { useTranslations } from '../../i18n/useTranslations';
import { addressPath } from '../../utils/addressPath';
import { reviewScore, formatScore } from '../address/addressSummary';
import type { ReviewPoint } from './reviewPoints';

const SNIPPET = 140;

// What a review dot on the city map opens: the address, its score, the deposit answer and the latest words.
const ReviewPointCard = ({ point, onClose }: { point: ReviewPoint; onClose: () => void }) => {
  const { t } = useTranslations();
  const first = point.reviews[0];
  const title = [first.street, first.number].filter(Boolean).join(' ') || first.full_address || first.city || '';
  const scores = point.reviews.map(reviewScore).filter((v): v is number => v != null);
  const score = scores.length ? scores.reduce((a, b) => a + b, 0) / scores.length : null;
  const withDeposit = point.reviews.filter(r => r.deposit_returned && r.deposit_returned !== 'ongoing');
  const text = point.reviews.map(r => r.owner_opinion?.trim()).find(Boolean);
  const path = addressPath(first.city, first.street, first.number);

  return (
    <div className="relative flex flex-col gap-2 rounded-2xl bg-white p-5 shadow-lg ring-1 ring-black/5">
      <button type="button" onClick={onClose} aria-label={t('explorer.close')} className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full text-ink-muted hover:bg-mist">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" /></svg>
      </button>
      <div className="flex items-center gap-3 pr-8">
        {score != null && (
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-lime font-display text-lg font-extrabold text-forest">{formatScore(score)}</span>
        )}
        <div className="min-w-0">
          <strong className="block truncate font-display text-lg">{title}</strong>
          <span className="text-sm text-ink-muted">{t(point.reviews.length === 1 ? 'cityPage.oneReview' : 'cityPage.reviews', { count: point.reviews.length })}</span>
        </div>
      </div>
      {withDeposit.length > 0 && (
        <span className="text-sm font-semibold text-forest">
          {t('cityPage.dot.deposit', { x: withDeposit.filter(r => r.deposit_returned === 'true').length, y: withDeposit.length })}
        </span>
      )}
      {text && <p className="text-[15px] leading-relaxed text-ink-soft">“{text.length > SNIPPET ? `${text.slice(0, SNIPPET).trimEnd()}…` : text}”</p>}
      {path && (
        <Link to={path} className="w-fit text-sm font-bold text-brand hover:text-forest">
          {t('cityPage.dot.open')} →
        </Link>
      )}
    </div>
  );
};

export default ReviewPointCard;
