import { Link } from 'react-router-dom';
import { useTranslations } from '../i18n/useTranslations';
import { buildBlogListPath } from '../i18n/routing';
import { umamiEventProps } from '../utils/analytics';

const LINKS = [
  { to: '/opiniones', key: 'footer.opinionsByCity', event: 'footer:opiniones' },
  { to: '/datos', key: 'footer.data', event: 'footer:datos' },
  { to: '/aviso-legal', key: 'footer.legalNotice', event: 'footer:aviso-legal' },
  { to: '/politica-privacidad', key: 'footer.privacyPolicy', event: 'footer:privacidad' },
  { to: '/cookies', key: 'footer.cookiesPolicy', event: 'footer:cookies' },
  { to: '/condiciones-uso', key: 'footer.termsOfUse', event: 'footer:condiciones-uso' },
  { to: '/buenas-practicas', key: 'footer.goodPractices', event: 'footer:buenas-practicas' },
];

// Forest footer from the redesign: name, data sources and the legal pages.
const SiteFooter = () => {
  const { locale, t } = useTranslations();

  return (
    <footer className="bg-forest px-5 py-10 text-[13px] text-[#CFE5C6] md:px-[5%]">
      <div className="mx-auto flex max-w-[1320px] flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-5">
          <span className="font-display text-xl font-extrabold text-white">CaseroOk</span>
          <Link to="/datos" className="hover:text-white">{t('footer.dataSources')}</Link>
        </div>
        <nav className="flex flex-wrap gap-x-[18px] gap-y-2">
          <Link className="text-lime hover:text-white" to={buildBlogListPath(locale)} {...umamiEventProps('footer:blog')}>
            {t('footer.blog')}
          </Link>
          {LINKS.map(link => (
            <Link key={link.to} className="text-lime hover:text-white" to={link.to} {...umamiEventProps(link.event)}>
              {t(link.key)}
            </Link>
          ))}
        </nav>
        <p className="text-[#9FC3A5]">
          © {new Date().getFullYear()} CaseroOk · {t('footer.disclaimer')}
        </p>
      </div>
    </footer>
  );
};

export default SiteFooter;
