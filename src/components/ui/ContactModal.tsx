import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { User } from '@supabase/supabase-js';
import LoginContent from './LoginContent';
import { umamiEventProps } from '../../utils/analytics';
import { useTranslations } from '../../i18n/useTranslations';

interface ContactModalProps {
  onClose: () => void;
  onLoginComplete?: (sessionId: string, userId: string) => void;
  onUserLoggedIn?: (user: User) => void;
  redirectToHomeIfNoSession?: boolean;
  showInfo?: boolean;
  showTitle?: boolean;
  variant?: 'review' | 'account';
}

// Sign-in dialog: last step of the review form, and the header's "Entrar".
const ContactModal: React.FC<ContactModalProps> = ({ onClose, showInfo = true, showTitle = true, variant = 'review', ...rest }) => {
  const { t } = useTranslations();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  // Portal: the header's backdrop-blur would otherwise trap this fixed overlay inside it
  return createPortal(
    <div className="fixed inset-0 z-[1100] flex items-end justify-center bg-forest/50 backdrop-blur-sm sm:items-center sm:px-6" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-[460px] rounded-t-3xl bg-white p-7 shadow-2xl sm:rounded-3xl sm:p-9"
        onClick={e => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-mist hover:text-ink"
          aria-label={t('auth.close')}
          {...umamiEventProps('login:modal-close')}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
        <LoginContent onClose={onClose} showTitle={showTitle} showInfo={showInfo} variant={variant} {...rest} />
      </div>
    </div>,
    document.body
  );
};

export default ContactModal;
