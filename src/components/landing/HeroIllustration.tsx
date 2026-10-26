import { Link } from 'react-router-dom';
import { useTranslations } from '../../i18n/useTranslations';
import type { FeaturedAddress } from './useHomeShowcase';
import { formatScore } from '../address/addressSummary';

// The curved map with pins from the design, plus a floating card with a real reviewed address.
const HeroIllustration = ({ featured }: { featured: FeaturedAddress | null }) => {
  const { t } = useTranslations();

  return (
    <div className="relative hidden h-[560px] min-w-0 flex-[1_1_420px] lg:block">
      <svg viewBox="0 0 420 560" width="100%" height="560" className="block" aria-hidden="true">
        <path d="M40 560 C40 300 120 120 300 60 C360 40 420 50 420 50 L420 560 Z" fill="#164D33" />
        <path d="M70 560 C90 380 170 230 330 170 L420 150 L420 560 Z" fill="#1D5C3D" />
        <path d="M60 470 L420 330" stroke="#2A7A50" strokeWidth="10" fill="none" />
        <path d="M150 560 L330 120" stroke="#2A7A50" strokeWidth="8" fill="none" />
        <path d="M100 330 L420 420" stroke="#2A7A50" strokeWidth="6" fill="none" />
        <circle cx="250" cy="300" r="70" fill="#C8F169" opacity="0.18" className="origin-[250px_300px] motion-safe:animate-halo" />
        <path d="M250 268 c-17 0-30 13-30 30 c0 24 30 52 30 52 s30-28 30-52 c0-17-13-30-30-30z" fill="#C8F169" />
        <circle cx="250" cy="298" r="10" fill="#0E3B26" />
        <path d="M150 400 c-10 0-18 8-18 18 c0 14 18 30 18 30 s18-16 18-30 c0-10-8-18-18-18z" fill="#FF6B4A" />
        <path d="M350 430 c-10 0-18 8-18 18 c0 14 18 30 18 30 s18-16 18-30 c0-10-8-18-18-18z" fill="#8FD46B" />
      </svg>
      {featured && (
        <Link
          to={featured.path ?? '/opiniones'}
          className="absolute left-0 top-[130px] flex w-[260px] motion-safe:animate-float flex-col gap-2.5 rounded-[22px] bg-white p-[18px] text-ink shadow-[0_30px_60px_rgba(0,0,0,0.35)] transition-transform hover:-translate-y-1"
        >
          <div className="flex items-center gap-3">
            {featured.score != null && (
              <span className="flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-full bg-brand font-display text-[19px] font-extrabold text-white">
                {formatScore(featured.score)}
              </span>
            )}
            <div className="flex min-w-0 flex-col leading-snug">
              <strong className="truncate text-[15px]">{featured.title}</strong>
              <span className="text-[13px] text-ink-muted">
                {t(featured.reviews === 1 ? 'home.v3.card.oneReview' : 'home.v3.card.reviews', { count: featured.reviews, city: featured.city })}
              </span>
            </div>
          </div>
          {featured.deposit && (
            <span className="text-sm font-semibold text-[#1E5A12]">
              {t('home.v3.card.deposit', { full: featured.deposit.full, total: featured.deposit.total })}
            </span>
          )}
        </Link>
      )}
    </div>
  );
};

export default HeroIllustration;
