import { Link } from 'react-router-dom';
import LegalContainer from '../components/legal/LegalContainer';
import { LEGAL_META } from '../config/legal';
import { useTranslations } from '../i18n/useTranslations';

export default function LegalHub() {
  const { t } = useTranslations();

  return (
    <LegalContainer>
      <h1 className="text-4xl font-extrabold mb-6 text-gray-900">{t('legalHub.title')}</h1>
      <p className="text-gray-700 mb-6">{t('legalHub.description', { siteName: LEGAL_META.siteName })}</p>
      <ul className="list-disc pl-6 space-y-2 text-[rgb(74,94,50)] underline">
        <li><Link to="/aviso-legal">{t('legalHub.links.legalNotice')}</Link></li>
        <li><Link to="/politica-privacidad">{t('legalHub.links.privacyPolicy')}</Link></li>
        <li><Link to="/cookies">{t('legalHub.links.cookiesPolicy')}</Link></li>
        <li><Link to="/condiciones-uso">{t('legalHub.links.termsOfUse')}</Link></li>
        <li><Link to="/buenas-practicas">{t('legalHub.links.goodPractices')}</Link></li>
        <li><Link to="/terminosycondiciones">{t('legalHub.links.termsAndConditions')}</Link></li>
      </ul>
    </LegalContainer>
  );
}
