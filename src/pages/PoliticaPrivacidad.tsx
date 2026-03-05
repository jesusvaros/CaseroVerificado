import { LEGAL_META } from '../config/legal';
import LegalContainer from '../components/legal/LegalContainer';
import { useTranslations } from '../i18n/useTranslations';

export default function PoliticaPrivacidad() {
  const { t } = useTranslations();

  return (
    <LegalContainer>
      <h1 className="text-4xl font-extrabold mb-2 text-gray-900">{t('privacyPolicy.title')}</h1>
      <p className="text-sm text-gray-600 mb-6">{t('legalCommon.lastUpdated')}</p>

      <h2 className="text-xl font-semibold mb-2">{t('privacyPolicy.section1Title')}</h2>
      <p className="text-gray-700 mb-6">
        {t('privacyPolicy.section1Body', {
          ownerName: LEGAL_META.ownerName,
          contactEmail: LEGAL_META.contactEmail,
        })}
      </p>

      <h2 className="text-xl font-semibold mb-2">{t('privacyPolicy.section2Title')}</h2>
      <div className="space-y-4 text-gray-700 mb-6">
        <p>
          <strong>{t('privacyPolicy.section2Lead1Strong')}</strong> {t('privacyPolicy.section2Lead1')}
        </p>
        <div>
          <p className="mb-2">
            <strong>{t('privacyPolicy.section2Lead2Strong')}</strong>
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>{t('privacyPolicy.section2Bullet1')}</li>
            <li>{t('privacyPolicy.section2Bullet2')}</li>
            <li>{t('privacyPolicy.section2Bullet3')}</li>
          </ul>
        </div>
        <p>
          <strong>{t('privacyPolicy.section2Lead3Strong')}</strong> {t('privacyPolicy.section2Lead3')}
        </p>
      </div>

      <h2 className="text-xl font-semibold mb-2">{t('privacyPolicy.section3Title')}</h2>
      <div className="space-y-2 text-gray-700 mb-6">
        <p>{t('privacyPolicy.section3Body1')}</p>
        <p>
          {t('privacyPolicy.section3Body2')}
        </p>
      </div>

      <h2 className="text-xl font-semibold mb-2">{t('privacyPolicy.section4Title')}</h2>
      <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-1">
        <li>{t('privacyPolicy.section4Bullet1')}</li>
        <li>{t('privacyPolicy.section4Bullet2')}</li>
        <li>{t('privacyPolicy.section4Bullet3')}</li>
        <li>{t('privacyPolicy.section4Bullet4')}</li>
      </ul>

      <h2 className="text-xl font-semibold mb-2">{t('privacyPolicy.section5Title')}</h2>
      <div className="text-gray-700 mb-6 space-y-2">
        <p>{t('privacyPolicy.section5Body1')}</p>
        <p>
          {t('privacyPolicy.section5Body2')}
        </p>
      </div>

      <h2 className="text-xl font-semibold mb-2">{t('privacyPolicy.section6Title')}</h2>
      <p className="text-gray-700 mb-6">
        {t('privacyPolicy.section6Body', { hostingProvider: LEGAL_META.hostingProvider })}
      </p>

      <h2 className="text-xl font-semibold mb-2">{t('privacyPolicy.section7Title')}</h2>
      <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-1">
        <li>{t('privacyPolicy.section7Bullet1')}</li>
        <li>{t('privacyPolicy.section7Bullet2', { logsRetentionDays: LEGAL_META.logsRetentionDays })}</li>
      </ul>

      <h2 className="text-xl font-semibold mb-2">{t('privacyPolicy.section8Title')}</h2>
      <p className="text-gray-700 mb-6">
        {t('privacyPolicy.section8Body', { contactEmail: LEGAL_META.contactEmail })}
      </p>

      <h2 className="text-xl font-semibold mb-2">{t('privacyPolicy.section9Title')}</h2>
      <p className="text-gray-700 mb-6">{t('privacyPolicy.section9Body')}</p>

      <h2 className="text-xl font-semibold mb-2">{t('privacyPolicy.section10Title')}</h2>
      <p className="text-gray-700">{t('privacyPolicy.section10Body')}</p>
    </LegalContainer>
  );
}
