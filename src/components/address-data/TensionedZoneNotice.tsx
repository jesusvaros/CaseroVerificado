import { Link } from 'react-router-dom';
import type { TensionedZone } from '../../services/publicData/tensionedZones';
import { useTranslations } from '../../i18n/useTranslations';

const formatDate = (iso: string) => new Date(iso).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });

const TensionedZoneNotice = ({ zone }: { zone: TensionedZone }) => {
  const { t } = useTranslations();

  return (
    <section className="flex flex-col gap-2.5 rounded-3xl bg-coral-soft p-6">
      <h2 className="font-display text-[22px] font-extrabold tracking-tight text-[#7A2412]">
        {t(zone.partial ? 'addressData.tensioned.titlePartial' : 'addressData.tensioned.title')}
      </h2>
      <p className="text-[15px] leading-relaxed text-[#5A1E10]">{t('addressData.tensioned.text')}</p>
      {zone.partial && <p className="text-[15px] leading-relaxed text-[#5A1E10]">{t('addressData.tensioned.only', { areas: zone.partial })}</p>}
      <p className="text-xs text-[#7A2412]">{t('addressData.tensioned.until', { date: formatDate(zone.to), boe: zone.boe ?? '' })}</p>
      <Link to="/blog/zonas-tensionadas-que-son-y-como-saber-si-te-afectan" className="font-bold text-coral-ink">
        {t('addressData.tensioned.guide')}
      </Link>
    </section>
  );
};

export default TensionedZoneNotice;
