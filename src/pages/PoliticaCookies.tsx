import { LEGAL_META } from '../config/legal';
import LegalContainer from '../components/legal/LegalContainer';
import { useTranslations } from '../i18n/useTranslations';

export default function PoliticaCookies() {
  const { t } = useTranslations();

  return (
    <LegalContainer>
      <h1 className="text-4xl font-extrabold mb-2 text-gray-900">{t('cookiesPolicy.title')}</h1>
      <p className="text-sm text-gray-600 mb-6">{t('legalCommon.lastUpdated')}</p>

      <h2 className="text-xl font-semibold mb-2">{t('cookiesPolicy.section1Title')}</h2>
      <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-1">
        <li>
          <strong>{t('cookiesPolicy.section1Bullet1Strong')}</strong> {t('cookiesPolicy.section1Bullet1')}
        </li>
        <li>
          <strong>{t('cookiesPolicy.section1Bullet2Strong')}</strong> {t('cookiesPolicy.section1Bullet2')}
        </li>
      </ul>

      <p className="text-gray-700 mb-6">{t('cookiesPolicy.section1Body')}</p>

      <h2 className="text-xl font-semibold mb-2">{t('cookiesPolicy.section2Title')}</h2>
      <p className="text-gray-700 mb-6">
        {t('cookiesPolicy.section2Prefix')}{' '}
        <a href={LEGAL_META.cookieSettingsPath} className="text-[rgb(74,94,50)] underline">
          {t('cookiesPolicy.cookieSettingsLink')}
        </a>
        .
      </p>

      <h2 className="text-xl font-semibold mb-2">{t('cookiesPolicy.section3Title')}</h2>
      <p className="text-gray-700 mb-6">{t('cookiesPolicy.section3Body')}</p>

      <h2 className="text-xl font-semibold mb-2">{t('cookiesPolicy.section4Title')}</h2>
      <p className="text-gray-700">
        {t('cookiesPolicy.section4Body', { analyticsProvider: LEGAL_META.analyticsProvider })}
      </p>
    </LegalContainer>
  );
}
