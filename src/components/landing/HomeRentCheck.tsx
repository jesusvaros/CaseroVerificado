import { useEffect, useState } from 'react';
import { useTranslations } from '../../i18n/useTranslations';
import SectionIntro from './SectionIntro';
import Reveal from './Reveal';

const ASKED = 900;
const METERS = 60;

// The design's thermometer with real SERPAVI percentiles for Madrid (whole city, 60 m²).
const HomeRentCheck = () => {
  const { t } = useTranslations();
  const [rent, setRent] = useState<[number, number, number] | null>(null);

  useEffect(() => {
    fetch('/data/ciudades/madrid.json')
      .then(res => (res.ok ? res.json() : null))
      .then(city => {
        const r = city?.municipality?.r;
        if (r) setRent([r[1] * METERS, r[2] * METERS, r[3] * METERS]);
      })
      .catch(() => setRent(null));
  }, []);

  const euros = (v: number) => `${Math.round(v).toLocaleString('es-ES')} €`;
  const position = rent ? Math.min(95, Math.max(5, ASKED <= rent[1] ? 50 - (25 * (rent[1] - ASKED)) / (rent[1] - rent[0]) : 50 + (25 * (ASKED - rent[1])) / (rent[2] - rent[1]))) : 46;

  return (
    <Reveal className="mx-auto flex max-w-[1320px] flex-wrap-reverse items-center gap-16 px-5 py-16 md:px-[5%]">
      <div className="flex min-w-0 flex-[1_1_440px] flex-col gap-3.5">
        <div className="relative mt-12 h-[26px] rounded-[13px] bg-[linear-gradient(90deg,#EAF8D2,#C8F169_40%,#FFB199_75%,#FF6B4A)]">
          <span className="absolute -top-3.5 h-[54px] w-1 -translate-x-1/2 rounded-sm bg-ink transition-[left] duration-700" style={{ left: `${position}%` }} />
          <span
            className="absolute -top-[46px] -translate-x-1/2 whitespace-nowrap rounded-lg bg-ink px-2.5 py-1.5 text-[13px] font-bold text-white transition-[left] duration-700"
            style={{ left: `${position}%` }}
          >
            {t('home.v3.rent.asked', { amount: euros(ASKED) })}
          </span>
        </div>
        {rent && (
          <div className="flex justify-between text-sm font-semibold text-ink-muted">
            <span>{euros(rent[0])}</span>
            <span>{t('home.v3.rent.median', { amount: euros(rent[1]) })}</span>
            <span>{euros(rent[2])}</span>
          </div>
        )}
        <span className="text-xs text-[#6B7465]">{t('home.v3.rent.caption')}</span>
      </div>
      <SectionIntro eyebrow={t('home.v3.rent.eyebrow')} eyebrowColor="#E8890C" title={t('home.v3.rent.title')}>
        {t('home.v3.rent.text')}
      </SectionIntro>
    </Reveal>
  );
};

export default HomeRentCheck;
