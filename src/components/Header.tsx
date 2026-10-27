import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoUrl from '../assets/logo_coloreado.svg';
import { trackEvent } from '../utils/analytics';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useTranslations } from '../i18n/useTranslations';
import AccountMenu from './AccountMenu';

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
          <AccountMenu dark={dark} />
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

export default Header;
