import { useState } from 'react';
import type { ZoneData } from '../../services/publicData/rentZones';
import { useTranslations } from '../../i18n/useTranslations';

const euros = (value: number) => `${Math.round(value).toLocaleString('es-ES')} €`;

// p25 sits at 25 % of the bar, the median at 50 % and p75 at 75 %; outside that range it keeps the same slope.
function markerPosition(value: number, p25: number, p50: number, p75: number) {
  const position = value <= p50 ? 50 - (25 * (p50 - value)) / (p50 - p25 || 1) : 50 + (25 * (value - p50)) / (p75 - p50 || 1);
  return Math.min(97, Math.max(3, position));
}

const RentCalculator = ({ zone }: { zone: ZoneData }) => {
  const { t } = useTranslations();
  const [year, p25m2, p50m2, p75m2, , typicalM2] = zone.rent!;
  const [m2, setM2] = useState(String(typicalM2 && typicalM2 > 0 ? Math.round(typicalM2) : 60));
  const [asked, setAsked] = useState('');

  const meters = Number(m2) > 0 ? Number(m2) : 60;
  const p25 = (p25m2 ?? p50m2) * meters;
  const p50 = p50m2 * meters;
  const p75 = (p75m2 ?? p50m2) * meters;
  const askedValue = Number(asked) > 0 ? Number(asked) : null;
  const marker = askedValue ?? p50;
  const verdict = askedValue == null ? null : askedValue > p75 ? 'high' : askedValue < p25 ? 'low' : 'normal';

  return (
    <section className="flex flex-col gap-4">
      <h2 className="font-display text-2xl font-extrabold tracking-tight">{t('addressData.rent.title')}</h2>
      <div className="relative mt-8 h-[18px] rounded-full bg-[linear-gradient(90deg,#EAF8D2,#C8F169_40%,#FFB199_75%,#FF6B4A)]">
        <span className="absolute -top-2.5 h-[38px] w-[3px] -translate-x-1/2 rounded bg-ink" style={{ left: `${markerPosition(marker, p25, p50, p75)}%` }} />
        <span
          className="absolute -top-10 -translate-x-1/2 whitespace-nowrap rounded-lg bg-ink px-2.5 py-1 text-xs font-bold text-white"
          style={{ left: `${Math.min(80, Math.max(20, markerPosition(marker, p25, p50, p75)))}%` }}
        >
          {t(askedValue == null ? 'addressData.rent.markerMedian' : 'addressData.rent.markerAsked', { amount: euros(marker), m2: meters })}
        </span>
      </div>
      <div className="flex justify-between text-[13px] font-semibold text-ink-muted">
        <span>{euros(p25)}</span>
        <span>{euros(p50)}</span>
        <span>{euros(p75)}</span>
      </div>
      <div className="flex flex-wrap items-center gap-2.5 text-[15px]">
        <label htmlFor="calc-m2" className="font-semibold">{t('addressData.rent.meters')}</label>
        <input id="calc-m2" type="number" inputMode="numeric" min={10} value={m2} onChange={e => setM2(e.target.value)} className="w-20 rounded-[10px] border-[1.5px] border-[#DCE3D3] px-3 py-2 focus:border-brand focus:outline-none focus:ring-0" />
        <label htmlFor="calc-rent" className="font-semibold">{t('addressData.rent.asked')}</label>
        <input id="calc-rent" type="number" inputMode="numeric" min={0} placeholder="€" value={asked} onChange={e => setAsked(e.target.value)} className="w-24 rounded-[10px] border-[1.5px] border-[#DCE3D3] px-3 py-2 focus:border-brand focus:outline-none focus:ring-0" />
      </div>
      {verdict && (
        <p className={`text-[15px] font-semibold ${verdict === 'high' ? 'text-coral-ink' : 'text-forest'}`}>{t(`addressData.rent.verdict.${verdict}`)}</p>
      )}
      {zone.ipva && (
        <p className="text-[15px] text-ink-soft">
          {t('addressData.rent.ipva', { city: zone.municipalityName, change: zone.ipva[1].toLocaleString('es-ES'), year: zone.ipva[0] })}
        </p>
      )}
      <span className="text-xs text-[#6B7465]">{t(`addressData.rent.source.${zone.rentLevel}`, { year })}</span>
    </section>
  );
};

export default RentCalculator;
