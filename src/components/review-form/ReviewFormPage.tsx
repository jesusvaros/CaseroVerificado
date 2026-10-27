import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from '../../store/useFormContext';
import { useAuth } from '../../store/auth/hooks';
import { useTranslations } from '../../i18n/useTranslations';
import { initializeSession } from '../../services/sessionManager';
import { submitReview } from '../../services/supabase/submitReview';
import { notifyReviewCompleted } from '../../services/telegram';
import { showErrorToast } from '../ui/toast/toastUtils';
import { trackEvent } from '../../utils/analytics';
import { trackSiteEvent } from '../../services/siteEvents';
import ContactModal from '../ui/ContactModal';
import ReviewFormAside from './ReviewFormAside';
import AddressSection from './AddressSection';
import StayFields from './StayFields';
import ScoreRow from './ScoreRow';
import DepositChoice from './DepositChoice';
import TagPicker from './TagPicker';
import TermsConsent from './TermsConsent';
import { sectionTitle } from './fieldStyles';
import { MIN_OPINION_LENGTH, validateReview, type ReviewField } from './validateReview';

const ReviewFormPage = () => {
  const { t } = useTranslations();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { formData, updateFormData, resetForm } = useFormContext();
  const [errors, setErrors] = useState<ReviewField[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  // The review session must exist before saving; visitors can land here straight from a link.
  useEffect(() => {
    void initializeSession(user?.id);
    trackEvent('review:form-open', { authenticated: !!user });
    trackSiteEvent('review_form_opened');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Re-check live once the user has tried to send, so errors clear as they are fixed.
  useEffect(() => {
    if (errors.length > 0) setErrors(validateReview(formData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  const finish = (sessionId: string, userId: string) => {
    void notifyReviewCompleted(sessionId, userId, formData).catch(e => console.warn('Telegram notification failed', e));
    setIsLoginOpen(false);
    trackSiteEvent('review_submitted');
    navigate(`/review/${sessionId}`);
    resetForm();
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const found = validateReview(formData);
    setErrors(found);
    if (found.length > 0) {
      trackEvent('review:submit-error', { errors: found, errorCount: found.length });
      document.getElementById(`review-field-${found[0]}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setIsSubmitting(true);
    try {
      await initializeSession(user?.id);
      const sessionId = await submitReview(formData);
      trackEvent('review:form-submitted', { authenticated: !!user, depositReturned: formData.depositReturned });
      if (user) {
        finish(sessionId, user.id);
      } else {
        trackEvent('review:login-modal-open');
        setIsLoginOpen(true);
      }
    } catch (error) {
      console.error('Error sending review:', error);
      trackEvent('review:submit-failed');
      showErrorToast(t('addReview.v2.errors.saveFailed'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const opinionError = errors.includes('opinion');

  return (
    <div className="flex min-h-screen flex-col bg-white text-ink lg:grid lg:grid-cols-[5fr_7fr]">
      <ReviewFormAside />
      <main className="min-w-0 px-5 pb-20 pt-10 md:px-[6%] lg:pt-32">
        <form onSubmit={handleSubmit} noValidate className="flex max-w-[680px] flex-col gap-12">
          <div className="flex flex-col gap-6">
            <AddressSection errors={errors} />
            <StayFields errors={errors} />
          </div>

          <fieldset id="review-field-ownerScore" className="flex flex-col gap-4">
            <legend className={`${sectionTitle} mb-4`}>{t('addReview.v2.scores.title')}</legend>
            <ScoreRow label={t('addReview.v2.scores.owner')} value={formData.ownerScore} onChange={v => updateFormData({ ownerScore: v })} hasError={errors.includes('ownerScore')} />
            <div id="review-field-propertyScore">
              <ScoreRow label={t('addReview.v2.scores.property')} value={formData.propertyScore} onChange={v => updateFormData({ propertyScore: v })} hasError={errors.includes('propertyScore')} />
            </div>
            <ScoreRow label={t('addReview.v2.scores.building')} value={formData.buildingScore} onChange={v => updateFormData({ buildingScore: v })} optional />
            <ScoreRow label={t('addReview.v2.scores.area')} value={formData.areaScore} onChange={v => updateFormData({ areaScore: v })} optional />
            {(errors.includes('ownerScore') || errors.includes('propertyScore')) && (
              <p className="text-sm text-coral-ink">{t('addReview.v2.errors.scores')}</p>
            )}
          </fieldset>

          <fieldset id="review-field-deposit" className="flex flex-col gap-3">
            <legend className={`${sectionTitle} mb-4`}>{t('addReview.v2.deposit.title')}</legend>
            <DepositChoice value={formData.depositReturned} onChange={v => updateFormData({ depositReturned: v })} hasError={errors.includes('deposit')} />
            {errors.includes('deposit') && <p className="text-sm text-coral-ink">{t('addReview.v2.errors.deposit')}</p>}
          </fieldset>

          <fieldset className="flex flex-col gap-3">
            <legend className={`${sectionTitle} mb-1`}>{t('addReview.v2.tags.title')}</legend>
            <p className="mb-2 text-ink-muted">{t('addReview.v2.tags.hint')}</p>
            <TagPicker value={formData.tags ?? []} onChange={tags => updateFormData({ tags })} />
          </fieldset>

          <label id="review-field-opinion" className="flex flex-col gap-3">
            <span className={sectionTitle}>{t('addReview.v2.opinion.title')}</span>
            <span className="text-ink-muted">{t('addReview.v2.opinion.hint')}</span>
            <textarea
              rows={6}
              value={formData.opinion || ''}
              onChange={e => updateFormData({ opinion: e.target.value })}
              placeholder={t('addReview.v2.opinion.placeholder')}
              className={`rounded-2xl border-[1.5px] bg-white p-4 text-base leading-relaxed text-ink placeholder:text-[#8A9384] focus:border-brand focus:outline-none focus:ring-0 ${
                opinionError ? 'border-coral' : 'border-[#C9D2BC]'
              }`}
            />
            {opinionError && (
              <span className="text-sm text-coral-ink">{t('addReview.v2.errors.opinion', { min: MIN_OPINION_LENGTH })}</span>
            )}
          </label>

          <TermsConsent checked={Boolean(formData.acceptTerms)} onChange={acceptTerms => updateFormData({ acceptTerms })} hasError={errors.includes('terms')} />

          <div className="flex flex-col gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-fit rounded-full bg-forest px-8 py-4 text-lg font-bold text-white transition-colors hover:bg-brand focus:outline-none focus-visible:ring-2 focus-visible:ring-lime focus-visible:ring-offset-2 disabled:opacity-60"
            >
              {isSubmitting ? t('addReview.common.sending') : t('addReview.v2.submit')}
            </button>
            <p className="text-sm text-ink-muted">{t('addReview.v2.submitNote')}</p>
          </div>
        </form>
      </main>
      {isLoginOpen && <ContactModal onClose={() => setIsLoginOpen(false)} onLoginComplete={finish} />}
    </div>
  );
};

export default ReviewFormPage;
