import { LEGAL_META } from '../config/legal';
import LegalContainer from '../components/legal/LegalContainer';
import { useTranslations } from '../i18n/useTranslations';

export default function BuenasPracticas() {
  const { t } = useTranslations();

  return (
    <LegalContainer>
      <h1 className="text-4xl font-extrabold mb-2 text-gray-900">{t('goodPractices.title')}</h1>
      <p className="text-sm text-gray-600 mb-6">{t('legalCommon.lastUpdated')}</p>

      <h2 className="text-xl font-semibold mb-2">{t('goodPractices.introTitle')}</h2>

      <h3 className="text-lg font-semibold mt-4 mb-2">{t('goodPractices.yesTitle')}</h3>
      <ul className="list-disc pl-6 text-gray-900 mb-4 space-y-1">
        <li>{t('goodPractices.yesBullet1')}</li>
        <li>{t('goodPractices.yesBullet2')}</li>
        <li>
          {t('goodPractices.yesBullet3Intro')}
          <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-900">
            <li>{t('goodPractices.yesBullet3a')}</li>
            <li>{t('goodPractices.yesBullet3b')}</li>
            <li>{t('goodPractices.yesBullet3c')}</li>
          </ul>
        </li>
      </ul>

      <h3 className="text-lg font-semibold mt-4 mb-2">{t('goodPractices.noTitle')}</h3>
      <ul className="list-disc pl-6 text-gray-900 mb-4 space-y-1">
        <li>{t('goodPractices.noBullet1')}</li>
        <li>{t('goodPractices.noBullet2')}</li>
        <li>{t('goodPractices.noBullet3')}</li>
      </ul>

      <h3 className="text-lg font-semibold mt-4 mb-2">{t('goodPractices.reportTitle')}</h3>
      <p className="text-gray-900">
        {t('goodPractices.reportBody', { contactEmail: LEGAL_META.contactEmail })}
      </p>
    </LegalContainer>
  );
}
