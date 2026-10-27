import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../store/auth/hooks';
import { useTranslations } from '../i18n/useTranslations';
import { trackEvent } from '../utils/analytics';
import ContactModal from './ui/ContactModal';

const PersonIcon = () => (
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

// Clears whatever a previous review left in storage so the form starts empty.
function resetReviewDraft() {
  try {
    for (const key of Object.keys(localStorage)) {
      if (/^(reviewSessionId|reviewSessionIdBack|reviewUserId:|form_|step_|review_|formData_)/.test(key)) localStorage.removeItem(key);
    }
  } catch {
    // storage unavailable: the form still works, just not pre-cleared
  }
  window.dispatchEvent(new CustomEvent('resetReviewForm'));
}

// Header account control: "Entrar" opens the sign-in dialog; once signed in, a small menu.
const AccountMenu = ({ dark }: { dark: boolean }) => {
  const { user, isAdmin, logout } = useAuth();
  const { t } = useTranslations();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => ref.current && !ref.current.contains(e.target as Node) && setOpen(false);
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const buttonClass = `flex h-11 w-11 items-center justify-center rounded-full transition-colors ${
    dark ? 'border border-[#5E8A6E] text-white hover:bg-forest-600' : 'border border-line text-ink hover:bg-mist'
  }`;

  if (!user) {
    return (
      <>
        <button type="button" onClick={() => setOpen(true)} className={buttonClass} aria-label={t('account.signIn')}>
          <PersonIcon />
        </button>
        {open && (
          <ContactModal variant="account" showInfo={false} redirectToHomeIfNoSession={false} onUserLoggedIn={() => setOpen(false)} onClose={() => setOpen(false)} />
        )}
      </>
    );
  }

  const item = 'block w-full rounded-xl px-4 py-2.5 text-left font-semibold text-ink transition-colors hover:bg-mist';

  return (
    <div className="relative" ref={ref}>
      <button type="button" onClick={() => setOpen(o => !o)} className={`${buttonClass} ${dark ? '' : 'bg-lime-soft'}`} aria-expanded={open} aria-label={t('account.menuReviews')}>
        <PersonIcon />
      </button>
      {open && (
        <div className="absolute right-0 top-14 z-50 w-72 rounded-2xl border border-line bg-white p-2 shadow-xl">
          <p className="truncate px-4 pb-2 pt-2 text-sm text-ink-muted">{user.email}</p>
          <Link to="/profile" className={item} onClick={() => setOpen(false)}>
            {t('account.menuReviews')}
          </Link>
          <button
            type="button"
            className={item}
            onClick={() => {
              resetReviewDraft();
              trackEvent('review:form-reset', { authenticated: true });
              setOpen(false);
              navigate('/add-review');
            }}
          >
            {t('account.menuNew')}
          </button>
          {isAdmin && (
            <Link to="/admin" className={item} onClick={() => setOpen(false)}>
              {t('account.menuAdmin')}
            </Link>
          )}
          <div className="my-1 h-px bg-line" />
          <button
            type="button"
            className={`${item} text-ink-soft`}
            onClick={async () => {
              await logout();
              setOpen(false);
              toast.success(t('account.logout'));
              navigate('/');
            }}
          >
            {t('account.menuLogout')}
          </button>
        </div>
      )}
    </div>
  );
};

export default AccountMenu;
