import { LEGAL_META } from '../config/legal';
import LegalContainer from '../components/legal/LegalContainer';
import { useTranslations } from '../i18n/useTranslations';

export default function AvisoLegal() {
  const { t } = useTranslations();

  return (
    <LegalContainer>
      <h1 className="text-4xl font-extrabold mb-2 text-gray-900">{t('legalNotice.title')}</h1>
      <p className="text-sm text-gray-600 mb-6">{t('legalCommon.lastUpdated')}</p>

      <h2 className="text-xl font-semibold mb-2">{t('legalNotice.siteOwnerTitle')}</h2>
      <p className="text-gray-900 mb-6">
        {t('legalNotice.siteOwnerBody', {
          ownerName: LEGAL_META.ownerName,
          cityCountry: LEGAL_META.cityCountry,
          contactEmail: LEGAL_META.contactEmail,
        })}
      </p>

      <h2 className="text-xl font-semibold mb-2">{t('legalNotice.purposeTitle')}</h2>
      <p className="text-gray-700 mb-6">
        {t('legalNotice.purposeBody')}
      </p>

      <h2 className="text-xl font-semibold mb-2">{t('legalNotice.intellectualPropertyTitle')}</h2>
      <p className="text-gray-900 mb-6">
        {t('legalNotice.intellectualPropertyBody', {
          projectName: LEGAL_META.projectName,
        })}
      </p>

      <h2 className="text-xl font-semibold mb-2">{t('legalNotice.contentLiabilityTitle')}</h2>
      <p className="text-gray-900 mb-6">
        {t('legalNotice.contentLiabilityBody', {
          projectName: LEGAL_META.projectName,
        })}
      </p>

      <h2 className="text-xl font-semibold mb-2">{t('legalNotice.linksTitle')}</h2>
      <p className="text-gray-900 mb-6">{t('legalNotice.linksBody')}</p>

      <h2 className="text-xl font-semibold mb-2">{t('legalNotice.availabilityTitle')}</h2>
      <p className="text-gray-900 mb-6">{t('legalNotice.availabilityBody')}</p>

      <h2 className="text-xl font-semibold mb-2">{t('legalNotice.lawTitle')}</h2>
      <p className="text-gray-900">
        {t('legalNotice.lawBody', {
          jurisdictionCity: LEGAL_META.jurisdictionCity,
        })}
      </p>
    </LegalContainer>
  );
}
