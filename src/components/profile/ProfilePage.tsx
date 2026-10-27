import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageSEO from '../../seo/PageSEO';
import { useAuth } from '../../store/auth/hooks';
import { useFormContext } from '../../store/useFormContext';
import { useTranslations } from '../../i18n/useTranslations';
import { useMyReviews, type MyReview } from './useMyReviews';
import MyReviewCard from './MyReviewCard';

// /profile: the signed-in user's reviews, grouped by what happened to them.
const ProfilePage = () => {
  const { t } = useTranslations();
  const navigate = useNavigate();
  const { user, isLoading, logout } = useAuth();
  const { updateFormData } = useFormContext();
  const { reviews, error } = useMyReviews(user?.id);

  useEffect(() => {
    if (!isLoading && !user) navigate('/');
  }, [isLoading, user, navigate]);

  // Old drafts can't be resumed; start a new review with the same address instead
  const finish = (review: MyReview) => {
    updateFormData({
      addressDetails: {
        street: review.street ?? '',
        number: review.number ?? '',
        city: review.city ?? '',
        postalCode: review.postalCode ?? '',
        fullAddress: [review.street, review.number, review.city].filter(Boolean).join(' '),
        coordinates: review.coordinates ?? undefined,
      },
    });
    navigate('/add-review');
  };

  const sent = reviews?.filter(r => r.status !== 'draft') ?? [];
  const drafts = reviews?.filter(r => r.status === 'draft') ?? [];

  return (
    <div className="min-h-screen bg-mist pb-24 text-ink">
      <PageSEO title={t('account.title')} noindex />
      <header className="bg-forest pt-[76px] text-white">
        <div className="mx-auto flex max-w-[960px] flex-wrap items-end justify-between gap-6 px-5 pb-10 pt-10">
          <div className="flex flex-col gap-2">
            <h1 className="font-display text-4xl font-extrabold tracking-tight md:text-5xl">{t('account.title')}</h1>
            {user?.email && <p className="text-white/70">{t('account.subtitle', { email: user.email })}</p>}
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/add-review" className="rounded-full bg-lime px-6 py-3 font-bold text-forest transition-colors hover:bg-white">{t('account.writeAnother')}</Link>
            <button
              type="button"
              onClick={async () => {
                await logout();
                navigate('/');
              }}
              className="rounded-full border border-white/30 px-6 py-3 font-bold text-white transition-colors hover:bg-white/10"
            >
              {t('account.logout')}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-[960px] flex-col gap-4 px-5 pt-8">
        {error && <p className="rounded-xl bg-coral-soft p-4 text-coral-ink">{t('account.loadError')}</p>}
        {!reviews && !error && <div className="h-40 animate-pulse rounded-2xl bg-white" aria-busy="true" />}
        {reviews && sent.length === 0 && (
          <div className="flex flex-col items-start gap-4 rounded-2xl bg-white p-8">
            <p className="text-lg">{t('account.empty')}</p>
            <Link to="/add-review" className="rounded-full bg-forest px-6 py-3 font-bold text-white hover:bg-brand">{t('account.emptyCta')}</Link>
          </div>
        )}
        {sent.map(review => <MyReviewCard key={review.id} review={review} onFinish={finish} />)}
        {drafts.length > 0 && (
          <details className="mt-4">
            <summary className="cursor-pointer text-sm font-bold text-ink-muted">{t('account.drafts', { count: drafts.length })}</summary>
            <div className="mt-4 flex flex-col gap-3">
              {drafts.map(review => <MyReviewCard key={review.id} review={review} onFinish={finish} />)}
            </div>
          </details>
        )}
      </main>
    </div>
  );
};

export default ProfilePage;
