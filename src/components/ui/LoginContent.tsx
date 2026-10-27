import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { User } from '@supabase/supabase-js';
import { useFormContext } from '../../store/useFormContext';
import { useAuth } from '../../store/auth/hooks';
import { getSessionIdBack } from '../../services/sessionManager';
import { sendEmailOtp, signInWithGoogle } from '../../services/auth/loginService';
import type { LoginStatus } from '../../services/auth/loginService';
import { trackUmamiEvent } from '../../utils/analytics';
import { useTranslations } from '../../i18n/useTranslations';
import GoogleIcon from './GoogleIcon';

interface LoginContentProps {
  onClose?: () => void;
  showTitle?: boolean;
  onLoginComplete?: (sessionId: string, userId: string) => void;
  showInfo?: boolean;
  onUserLoggedIn?: (user: User) => void;
  redirectToHomeIfNoSession?: boolean;
  // 'review': last step of the review form; 'account': signing in from the header
  variant?: 'review' | 'account';
}

const LoginContent: React.FC<LoginContentProps> = ({ 
  onClose, 
  showTitle = true,
  onLoginComplete,
  showInfo = true,
  onUserLoggedIn,
  redirectToHomeIfNoSession = true,
  variant = 'review',
}) => {
  const { t } = useTranslations();
  const { formData, updateFormData } = useFormContext();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [status, setStatus] = useState<LoginStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [hasHandledLogin, setHasHandledLogin] = useState(false);

  useEffect(() => {
    if (status === 'link-sent' && resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [status, resendTimer]);

  // Check user from auth context and redirect to review page if user is already validated
  useEffect(() => {
    const checkUserSession = async () => {
      if (!user || hasHandledLogin) return;
      
      // If we have a user from auth context, get the session ID and navigate
      const sessionId = await getSessionIdBack();
      if (sessionId) {
        if (onLoginComplete && user?.id) {
          // Delegate post-login flow to parent if provided
          onLoginComplete(sessionId, user.id);
        } else {
          navigate(`/`);
          if (onClose) onClose();
        }
        setHasHandledLogin(true);
      } else {
        if (onUserLoggedIn) {
          onUserLoggedIn(user);
          setHasHandledLogin(true);
          if (onClose) onClose();
          return;
        }

        if (redirectToHomeIfNoSession) {
          navigate('/');
          if (onClose) onClose();
          setHasHandledLogin(true);
        }
      }
    };

    // Initial session check on mount
    checkUserSession();

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'supabase.auth.token') {
        checkUserSession();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Periodically poll session in case storage event is missed
    const interval = setInterval(checkUserSession, 15000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [navigate, user, onClose, onLoginComplete, onUserLoggedIn, redirectToHomeIfNoSession, hasHandledLogin]);

  useEffect(() => {
    if (!user) {
      setHasHandledLogin(false);
    }
  }, [user]);

  const email = formData.contactEmail?.trim() ?? '';

  const handleEmailLogin = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error');
      setErrorMessage(t('auth.invalidEmail'));
      return;
    }
    setStatus('loading');
    setIsEditingEmail(false);
    trackUmamiEvent('login:email-submit');
    const result = await sendEmailOtp(email);
    if (!result.success) {
      setStatus('error');
      setErrorMessage(t('auth.sendError'));
    } else {
      setStatus('link-sent');
      setResendTimer(30);
      setCanResend(false);
    }
  };

  const handleGoogleLogin = async () => {
    trackUmamiEvent('login:google');
    await signInWithGoogle();
  };

  const linkSent = status === 'link-sent' && !isEditingEmail;

  return (
    <div className="flex flex-col gap-6 text-ink">
      {showTitle && (
        <div className="flex flex-col gap-2 pr-10">
          <h2 className="font-display text-[28px] font-extrabold leading-tight tracking-tight">
            {linkSent ? t('auth.sentTitle') : t(variant === 'review' ? 'auth.reviewTitle' : 'auth.accountTitle')}
          </h2>
          {!linkSent && <p className="text-ink-soft">{t(variant === 'review' ? 'auth.reviewSubtitle' : 'auth.accountSubtitle')}</p>}
        </div>
      )}

      {linkSent ? (
        <div className="flex flex-col items-start gap-4">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-lime text-forest" aria-hidden="true">
            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 7l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </span>
          <p className="text-[17px] leading-relaxed">{t('auth.sentText', { email })}</p>
          {/@gmail\.com$/i.test(email) && (
            <a href="https://mail.google.com/mail/u/0/#search/caserook" target="_blank" rel="noreferrer" className="rounded-full bg-forest px-6 py-3 font-bold text-white transition-colors hover:bg-brand">
              {t('auth.openGmail')}
            </a>
          )}
          <p className="text-sm text-ink-muted">{t('auth.spamHint')}</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-bold">
            <button
              type="button"
              disabled={!canResend}
              onClick={() => {
                trackUmamiEvent('login:resend-link');
                void handleEmailLogin();
              }}
              className="text-brand hover:text-forest disabled:cursor-default disabled:text-ink-muted"
            >
              {canResend ? t('auth.resend') : t('auth.resendIn', { seconds: resendTimer })}
            </button>
            <button
              type="button"
              onClick={() => {
                trackUmamiEvent('login:change-email');
                setIsEditingEmail(true);
              }}
              className="text-ink-soft hover:text-ink"
            >
              {t('auth.changeEmail')}
            </button>
          </div>
        </div>
      ) : (
        <>
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="flex h-12 w-full items-center justify-center gap-3 rounded-full border-[1.5px] border-line bg-white font-bold transition-colors hover:border-ink-muted"
          >
            <GoogleIcon />
            {t('auth.google')}
          </button>

          <div className="flex items-center gap-3 text-sm text-ink-muted">
            <span className="h-px flex-1 bg-line" />
            {t('auth.orEmail')}
            <span className="h-px flex-1 bg-line" />
          </div>

          <form onSubmit={handleEmailLogin} noValidate className="flex flex-col gap-3">
            <input
              type="email"
              autoComplete="email"
              aria-label={t('auth.emailPlaceholder')}
              value={formData.contactEmail || ''}
              onChange={e => updateFormData({ contactEmail: e.target.value })}
              placeholder={t('auth.emailPlaceholder')}
              className={`h-12 w-full rounded-full border-[1.5px] bg-white px-5 text-base focus:border-brand focus:outline-none focus:ring-0 ${status === 'error' ? 'border-coral' : 'border-line'}`}
            />
            {status === 'error' && <p className="px-2 text-sm text-coral-ink">{errorMessage}</p>}
            <button
              type="submit"
              disabled={status === 'loading'}
              className="h-12 w-full rounded-full bg-forest font-bold text-white transition-colors hover:bg-brand disabled:opacity-60"
            >
              {status === 'loading' ? t('auth.sending') : t('auth.sendLink')}
            </button>
          </form>

          {showInfo && (
            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-soft">
              {(['private', 'noPassword', 'edit'] as const).map(point => (
                <li key={point} className="flex items-center gap-1.5">
                  <svg className="h-4 w-4 text-brand" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path d="M4 10.5l4 4 8-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {t(`auth.points.${point}`)}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default LoginContent;
