import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslations } from '../../i18n/useTranslations';
import SectionIntro from './SectionIntro';
import Reveal from './Reveal';

// Sample scores: no review has category scores yet, so the bars are labelled as an example.
const SAMPLE = [
  { key: 'owner', value: 3.6, color: '#1F7A4D' },
  { key: 'property', value: 2.9, color: '#45B06A' },
  { key: 'building', value: 4.0, color: '#8FD46B' },
  { key: 'area', value: 4.4, color: '#C8F169' },
];

const HomeScores = () => {
  const { t } = useTranslations();
  const reduce = useReducedMotion();

  return (
    <Reveal className="mx-auto flex max-w-[1320px] flex-wrap items-center gap-16 px-5 pb-16 pt-24 md:px-[5%] md:pt-[110px]">
      <SectionIntro
        eyebrow={t('home.v3.scores.eyebrow')}
        title={t('home.v3.scores.title')}
        action={
          <Link to="/opiniones" className="font-bold text-brand hover:text-forest">
            {t('home.v3.scores.cta')}
          </Link>
        }
      >
        {t('home.v3.scores.text')}
      </SectionIntro>
      <div className="flex min-w-0 flex-[1_1_440px] flex-col gap-[22px] py-2">
        {SAMPLE.map((row, i) => (
          <div key={row.key} className="flex items-center gap-[18px]">
            <span className="w-[110px] font-semibold">{t(`addressPage.categories.${row.key}_score`)}</span>
            <span className="h-3.5 flex-1 overflow-hidden rounded-[7px] bg-[#EEF3E8]">
              <motion.span
                className="block h-full rounded-[7px]"
                style={{ background: row.color }}
                initial={{ width: reduce ? `${(row.value / 5) * 100}%` : 0 }}
                whileInView={{ width: `${(row.value / 5) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.15 * i, ease: 'easeOut' }}
              />
            </span>
            <span className="w-12 font-display text-[22px] font-extrabold">{row.value.toLocaleString('es-ES', { minimumFractionDigits: 1 })}</span>
          </div>
        ))}
        <span className="text-sm text-ink-muted">{t('home.v3.scores.sample')}</span>
      </div>
    </Reveal>
  );
};

export default HomeScores;
