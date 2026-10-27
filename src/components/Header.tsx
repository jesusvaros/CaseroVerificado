import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth/hooks';
import LoginContent from './ui/LoginContent';
import logoUrl from '../assets/logo_coloreado.svg';
import { trackEvent } from '../utils/analytics';
import toast from 'react-hot-toast';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useTranslations } from '../i18n/useTranslations';

const NAV = [
  { to: '/opiniones', key: 'header.nav.cities', event: 'nav:cities' },
  { to: '/opiniones/espana/madrid', key: 'header.nav.prices', event: 'nav:prices' },
  { to: '/blog', key: 'header.nav.guides', event: 'nav:guides' },
];

// Header from the redesign: over the dark hero on the home page, white everywhere else and once
// the visitor scrolls past the hero.
const Header: React.FC = () => {
  const location = useLocation();
  const { t } = useTranslations();
  const isHomePage = location.pathname === '/';
  const [pastHero, setPastHero] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => setMenuOpen(false), [location.pathname]);

  useEffect(() => {
    if (!isHomePage) return;
    const onScroll = () => setPastHero(window.scrollY > 420);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHomePage]);

  const dark = isHomePage && !pastHero;

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-[1000] transition-colors duration-300 ${
        dark ? 'bg-forest text-white' : 'border-b border-line bg-white/95 text-ink backdrop-blur'
      }`}
    >
      <div className="mx-auto flex h-[76px] max-w-[1320px] items-center justify-between gap-3 px-4 md:gap-4 md:px-[5%]">
        <Link to="/" className="flex items-center gap-2.5" aria-label="CaseroOk - Inicio" onClick={() => trackEvent('nav:logo-home')}>
          <img src={logoUrl} alt="" className="h-8 w-8 md:h-9 md:w-9" />
          <span className="font-display text-xl font-extrabold tracking-tight md:text-2xl">CaseroOk</span>
        </Link>

        <nav className="hidden items-center gap-7 text-[15px] font-semibold md:flex">
          {NAV.map(item => (
            <Link
              key={item.to}
              to={item.to}
              className={`transition-colors ${dark ? 'text-[#DDF2CF] hover:text-white' : 'text-ink-soft hover:text-brand'}`}
              onClick={() => trackEvent(item.event)}
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <Link
            to="/add-review"
            className={`whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-bold transition-colors md:px-5 md:py-3 md:text-[15px] ${
              dark ? 'bg-lime text-forest hover:bg-white' : 'bg-forest text-white hover:bg-brand'
            }`}
            onClick={() => trackEvent('header:start-review')}
          >
            <span className="md:hidden">{t('header.writeReviewShort')}</span>
            <span className="hidden md:inline">{t('header.writeReview')}</span>
          </Link>
          <LoginDropdown dark={dark} />
          <button
            type="button"
            onClick={() => setMenuOpen(open => !open)}
            className={`flex h-11 w-11 items-center justify-center rounded-full md:hidden ${
              dark ? 'border border-[#5E8A6E] text-white' : 'border border-line text-ink'
            }`}
            aria-expanded={menuOpen}
            aria-label={t('header.menu')}
          >
            {menuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <nav className={`flex flex-col px-5 pb-4 md:hidden ${dark ? 'bg-forest' : 'bg-white'}`}>
          {NAV.map(item => (
            <Link
              key={item.to}
              to={item.to}
              className={`border-t py-3.5 text-lg font-semibold ${dark ? 'border-white/15 text-white' : 'border-line text-ink'}`}
              onClick={() => trackEvent(item.event)}
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
};

// Login Dropdown Component
const LoginDropdown: React.FC<{ dark: boolean }> = ({ dark }) => {
  const { user, logout } = useAuth();
  const { t } = useTranslations();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    await logout();
    setIsDropdownOpen(false);
    navigate('/');
  };

  const handleResetForm = () => {
    // Eliminar tokens del formulario del localStorage
    localStorage.removeItem('reviewSessionId');
    localStorage.removeItem('reviewSessionIdBack');
    
    // También eliminar cualquier token de usuario de review
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('reviewUserId:')) {
        localStorage.removeItem(key);
      }
    });
    
    // Limpiar cualquier estado adicional del formulario en el storage
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('form_') || key.startsWith('step_') || key.startsWith('review_') || key.startsWith('formData_')) {
        localStorage.removeItem(key);
      }
    });
    
    // Enviar evento personalizado para que el formulario lo escuche y se resetee
    window.dispatchEvent(new CustomEvent('resetReviewForm'));
    
    // Trackear evento de reset
    trackEvent('review:form-reset', {
      authenticated: true,
      userEmail: user?.email
    });
    
    setIsDropdownOpen(false);
    navigate('/add-review');
    
    // Mostrar toast de confirmación
    toast.success(t('header.resetFormSuccess'));
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className={`flex h-11 w-11 items-center justify-center rounded-full transition-colors ${
          dark ? 'border border-[#5E8A6E] text-white hover:bg-forest-600' : 'border border-line text-ink hover:bg-mist'
        }`}
        aria-expanded={isDropdownOpen}
        aria-label={user ? t('header.userProfileAria') : t('header.loginAria')}
      >
        {user ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
          </svg>
        )}
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 top-12 z-50 w-80 rounded-lg bg-white p-4 shadow-lg">
          {user ? (
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#1F7A4D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="font-medium">{user.email}</span>
              </div>
              <Link 
                to="/profile"
                onClick={() => setIsDropdownOpen(false)}
                className="mt-2 w-full rounded bg-[#1F7A4D] px-4 py-2 text-center text-white transition-colors hover:bg-[#0E3B26]"
              >
                {t('header.myProfile')}
              </Link>
              <button
                onClick={handleResetForm}
                className="mt-2 w-full rounded bg-orange-500 px-4 py-2 text-white transition-colors hover:bg-orange-600"
              >
                {t('header.newReview')}
              </button>
              <button
                onClick={handleLogout}
                className="mt-2 w-full rounded bg-[#1F7A4D] px-4 py-2 text-white transition-colors hover:bg-[#0E3B26]"
              >
                {t('header.logout')}
              </button>
            </div>
          ) : (
            <div className="p-2">
              <LoginContent onClose={() => setIsDropdownOpen(false)} showTitle={false} showInfo={false} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
