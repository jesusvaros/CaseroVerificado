import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth/hooks';
import LoginContent from './ui/LoginContent';
import logoUrl from '../assets/logo_coloreado.svg';
import wordmarkUrl from '../assets/caserook_letras.svg';
import { trackEvent } from '../utils/analytics';
import toast from 'react-hot-toast';
import { useTranslations } from '../i18n/useTranslations';
import { buildBlogListPath } from '../i18n/routing';
import { resolveLocale } from '../i18n/config';
import {
  BLOG_COUNTRY_CODES,
  getCountryDisplayLabel,
  normalizeBlogCountryCode,
  type BlogCountryCode,
} from '../blog/countryBlogs';
import { useDetectedCountryCode } from '../services/location/useDetectedCountryCode';
import { getPreferredLocaleByCountry } from '../services/location/countryLanguage';
import { setForcedCountryCode } from '../services/location/userCountry';

const BLOG_COUNTRY_FLAGS: Record<BlogCountryCode, string> = {
  ES: '🇪🇸',
  GB: '🇬🇧',
  FR: '🇫🇷',
  DE: '🇩🇪',
  IT: '🇮🇹',
  NL: '🇳🇱',
  CH: '🇨🇭',
  SE: '🇸🇪',
  PT: '🇵🇹',
};

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isCountryMenuOpen, setIsCountryMenuOpen] = useState(false);
  const countryMenuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { locale, setLocale, t } = useTranslations();
  const { countryCode: detectedCountryCode } = useDetectedCountryCode();

  // Hide input on specific routes
  const isAddReviewPage = location.pathname === '/add-review';
  const isHomePage = location.pathname === '/';

  // Handle scroll event to change header appearance
  useEffect(() => {
    // On the add-review form page, keep header static and skip scroll listener
    if (isAddReviewPage) {
      if (scrolled) setScrolled(false);
      return;
    }

    const handleScroll = () => {
      const isScrolled = window.scrollY > 330; // Change this value as needed
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled, isAddReviewPage]);

  // Show logo only after scrolling first section on home, or on non-home pages
  const showLogo = !isHomePage || scrolled || isAddReviewPage;

  // Detect if the home input section is visible to avoid showing header input
  const [homeInputVisible, setHomeInputVisible] = useState<boolean>(true);
  useEffect(() => {
    if (!isHomePage) {
      setHomeInputVisible(false);
      return;
    }
    const el = document.getElementById('home-address-section');
    if (!el) {
      setHomeInputVisible(false);
      return;
    }
    const obs = new IntersectionObserver(
      entries => {
        const entry = entries[0];
        setHomeInputVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [isHomePage]);

  const showHeaderSearch = !isAddReviewPage && (!isHomePage || !homeInputVisible);
  const requestedCountryCode = normalizeBlogCountryCode(new URLSearchParams(location.search).get('country'));
  const detectedBlogCountryCode = normalizeBlogCountryCode(detectedCountryCode);
  const activeCountryCode =
    requestedCountryCode ?? detectedBlogCountryCode ?? 'ES';
  const blogListPathWithScope = `${buildBlogListPath(locale)}?country=${activeCountryCode}`;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (countryMenuRef.current && !countryMenuRef.current.contains(event.target as Node)) {
        setIsCountryMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCountryChange = (nextCountryCode: BlogCountryCode) => {
    setIsCountryMenuOpen(false);
    setForcedCountryCode(nextCountryCode);
    const preferredLocale = getPreferredLocaleByCountry(nextCountryCode);
    if (preferredLocale) {
      setLocale(resolveLocale(preferredLocale));
    }

    const isBlogPath = location.pathname === '/blog' || location.pathname.startsWith('/blog/');
    if (!isBlogPath) return;

    const nextSearch = new URLSearchParams(location.search);
    nextSearch.set('country', nextCountryCode);
    nextSearch.delete('page');
    const nextSearchString = nextSearch.toString();
    navigate(`${location.pathname}${nextSearchString ? `?${nextSearchString}` : ''}${location.hash}`);
  };

  return (
    <header
      className={`duration-400 fixed left-0 right-0 top-0 z-[1000] transition-all ${scrolled && !isAddReviewPage ? 'py-2' : 'py-3'} px-6`}
      style={{
        backgroundColor: isAddReviewPage
          ? 'rgb(225, 245, 110)'
          : (scrolled || !isHomePage)
            ? 'rgb(225, 245, 110)'
            : 'transparent',
      }}
    >
      <div className="flex w-full items-center justify-between">
        {showLogo ? (
          <Link
            to="/"
            className="flex items-center"
            aria-label="CaseroOk - Inicio"
            onClick={() => trackEvent('nav:logo-home')}
          >
            <img src={logoUrl} alt="CaseroOk" className="h-12 w-12 md:h-14 md:w-14" />
            <img src={wordmarkUrl} alt="CaseroOk" className="hidden md:inline-block ml-2 h-6 md:h-7" />
          </Link>
        ) : (
          <span />
        )}

        {/* Input field on desktop, 'Add a review' button on mobile */}
        <div className="flex flex-1 justify-center">
          {showHeaderSearch && (
            <>
              {/* Desktop 'Escribir opinión' button */}
              <div className="hidden md:block">
                <Link
                  to="/add-review"
                  className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg bg-[#4A5E32] px-8 py-3 text-lg font-semibold text-white transition-colors hover:bg-[#3B4C28] focus:outline-none focus:ring-2 focus:ring-[#4A5E32]"
                  onClick={() => trackEvent('header:start-review')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                  {t('header.writeReview')}
                </Link>
              </div>
            </>
          )}
        </div>

        {/* Right side: blog + country + map + login */}
        <div className="flex items-center gap-2 md:gap-3">
          {showHeaderSearch && (
            <Link
              to="/add-review"
              className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-[#4A5E32] bg-white text-[#4A5E32] shadow-sm transition-colors hover:bg-[#f5f8eb] focus:outline-none focus:ring-2 focus:ring-[#4A5E32] md:hidden"
              aria-label={t('header.writeReview')}
              onClick={() => trackEvent('header:start-review-mobile')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </Link>
          )}

          {/* Blog - Desktop version */}
          <Link
            to={blogListPathWithScope}
            className="hidden items-center rounded-full border border-[#4A5E32] px-4 py-2 text-sm font-semibold text-[#4A5E32] transition hover:bg-[#4A5E32] hover:text-white md:inline-flex"
            onClick={() => trackEvent('nav:opiniones-desktop')}
          >
            {t('header.blog')}
          </Link>

          {/* Blog - Mobile version with icon */}
          <Link
            to={blogListPathWithScope}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#4A5E32] text-[#4A5E32] transition hover:bg-[#4A5E32] hover:text-white md:hidden"
            aria-label={t('header.blogAria')}
            onClick={() => trackEvent('nav:blog-mobile')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C20.832 18.477 19.247 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </Link>

          <div className="relative" ref={countryMenuRef}>
            <button
              type="button"
              className="flex h-10 items-center gap-2 rounded-full border border-[#4A5E32] bg-white px-3 text-sm font-semibold text-[#4A5E32] transition hover:bg-[#f5f8eb] focus:outline-none focus:ring-2 focus:ring-[#4A5E32]"
              aria-label={t('blogList.countrySwitcherLabel')}
              aria-expanded={isCountryMenuOpen}
              onClick={() => setIsCountryMenuOpen(open => !open)}
            >
              <span className="text-base" aria-hidden>{BLOG_COUNTRY_FLAGS[activeCountryCode]}</span>
              <span className="hidden md:inline">{activeCountryCode}</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isCountryMenuOpen && (
              <div className="absolute right-0 top-11 z-50 min-w-52 rounded-xl border border-gray-200 bg-white p-1 shadow-lg">
                {BLOG_COUNTRY_CODES.map(countryCode => (
                  <button
                    key={countryCode}
                    type="button"
                    onClick={() => handleCountryChange(countryCode)}
                    className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition hover:bg-gray-100 ${
                      countryCode === activeCountryCode ? 'bg-gray-100 font-semibold text-gray-900' : 'text-gray-700'
                    }`}
                  >
                    <span className="text-base" aria-hidden>{BLOG_COUNTRY_FLAGS[countryCode]}</span>
                    <span>{getCountryDisplayLabel(countryCode, locale)}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Map */}
          <Link to="/map" className="flex items-center" onClick={() => trackEvent('nav:map')}>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#4A5E32] text-white transition-colors hover:bg-[#4A5E32]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                />
              </svg>
            </div>
          </Link>

          {/* Login */}
          <LoginDropdown />
        </div>
      </div>
    </header>
  );
};

// Login Dropdown Component
const LoginDropdown: React.FC = () => {
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
        className="flex h-10 w-10 items-center justify-center rounded-full bg-[#4A5E32] text-white transition-colors hover:bg-[#5A6E42]"
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
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#4A5E32]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="font-medium">{user.email}</span>
              </div>
              <Link 
                to="/profile"
                onClick={() => setIsDropdownOpen(false)}
                className="mt-2 w-full rounded bg-[#4A5E32] px-4 py-2 text-center text-white transition-colors hover:bg-[#5A6E42]"
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
                className="mt-2 w-full rounded bg-[#4A5E32] px-4 py-2 text-white transition-colors hover:bg-[#5A6E42]"
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
