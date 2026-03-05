import { LEGAL_META } from '../config/legal';
import LegalContainer from '../components/legal/LegalContainer';
import { useTranslations } from '../i18n/useTranslations';

export default function CondicionesUso() {
  const { t } = useTranslations();

  return (
    <LegalContainer>
      <h1 className="text-4xl font-extrabold mb-2 text-gray-900">{t('termsOfUse.title')}</h1>
      <p className="text-sm text-gray-600 mb-6">{t('legalCommon.lastUpdated')}</p>

      <h2 className="text-xl font-semibold mb-2">{t('termsOfUse.section1Title')}</h2>
      <p className="text-gray-700 mb-6">
        {t('termsOfUse.section1Body', { projectName: LEGAL_META.projectName })}
      </p>

      <h2 className="text-xl font-semibold mb-2">{t('termsOfUse.section2Title')}</h2>
      <p className="text-gray-700 mb-6">{t('termsOfUse.section2Body')}</p>

      <h2 className="text-xl font-semibold mb-2">{t('termsOfUse.section3Title')}</h2>
      <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-1">
        <li>{t('termsOfUse.section3Bullet1')}</li>
        <li>{t('termsOfUse.section3Bullet2')}</li>
        <li>{t('termsOfUse.section3Bullet3')}</li>
      </ul>

      <h2 className="text-xl font-semibold mb-2">{t('termsOfUse.section4Title')}</h2>
      <div className="text-gray-700 mb-6 space-y-2">
        <p>{t('termsOfUse.section4Body1')}</p>
        <p>{t('termsOfUse.section4Body2')}</p>
        <p>{t('termsOfUse.section4Body3')}</p>
        <p>{t('termsOfUse.section4Body4')}</p>
      </div>

      <h2 className="text-xl font-semibold mb-2">{t('termsOfUse.section5Title')}</h2>
      <div className="text-gray-700 mb-6 space-y-2">
        <p>{t('termsOfUse.section5BodyIntro', { projectName: LEGAL_META.projectName })}</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>{t('termsOfUse.section5Bullet1')}</li>
          <li>{t('termsOfUse.section5Bullet2')}</li>
          <li>{t('termsOfUse.section5Bullet3')}</li>
        </ul>
      </div>

      <h2 className="text-xl font-semibold mb-2">{t('termsOfUse.section6Title')}</h2>
      <p className="text-gray-700 mb-6">
        {t('termsOfUse.section6Body', { contactEmail: LEGAL_META.contactEmail })}
      </p>

      <h2 className="text-xl font-semibold mb-2">{t('termsOfUse.section7Title')}</h2>
      <p className="text-gray-700 mb-6">
        {t('termsOfUse.section7Body', { projectName: LEGAL_META.projectName })}
      </p>

      <h2 className="text-xl font-semibold mb-2">{t('termsOfUse.section8Title')}</h2>
      <p className="text-gray-700 mb-6">
        {t('termsOfUse.section8Body', { projectName: LEGAL_META.projectName })}
      </p>

      <h2 className="text-xl font-semibold mb-2">{t('termsOfUse.section9Title')}</h2>
      <p className="text-gray-700 mb-6">{t('termsOfUse.section9Body')}</p>

      <h2 className="text-xl font-semibold mb-2">{t('termsOfUse.section10Title')}</h2>
      <p className="text-gray-700">
        {t('termsOfUse.section10Body', { jurisdictionCity: LEGAL_META.jurisdictionCity })}
      </p>
    </LegalContainer>
  );
}
