import { tenantUnionFor } from '../../config/tenantUnions';
import { useTranslations } from '../../i18n/useTranslations';

const TenantUnionLink = ({ province }: { province: string | null }) => {
  const { t } = useTranslations();
  const union = tenantUnionFor(province);

  return (
    <section className="flex flex-col gap-2">
      <h2 className="font-display text-[22px] font-extrabold tracking-tight">{t('addressPage.union.title')}</h2>
      <p className="text-[15px] leading-relaxed text-ink-soft">{t('addressPage.union.text', { name: union.name })}</p>
      <a href={`mailto:${union.email}`} className="font-bold hover:text-brand">
        {t('addressPage.union.contact')}
      </a>
    </section>
  );
};

export default TenantUnionLink;
