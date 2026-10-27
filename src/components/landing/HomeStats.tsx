import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslations } from '../../i18n/useTranslations';

// Counts from the static public data: census sections with an official rent and stressed municipalities.
const ZONES_WITH_RENT = 26298;

const HomeStats = ({ reviewCount }: { reviewCount: number | null }) => {
  const { t } = useTranslations();
  const [tensioned, setTensioned] = useState<number | null>(null);

  useEffect(() => {
    fetch('/data/tensionadas.json')
      .then(res => (res.ok ? res.json() : {}))
      .then(zones => setTensioned(Object.keys(zones).length))
      .catch(() => setTensioned(null));
  }, []);

  const stats = [
    { value: reviewCount == null ? '…' : String(reviewCount), label: t('home.v3.stats.reviews'), color: 'text-brand', to: '/opiniones' },
    { value: ZONES_WITH_RENT.toLocaleString('es-ES'), label: t('home.v3.stats.zones'), color: 'text-brand', to: '/datos' },
    { value: tensioned == null ? '…' : String(tensioned), label: t('home.v3.stats.tensioned'), color: 'text-coral', to: '/blog/zonas-tensionadas-que-son-y-como-saber-si-te-afectan' },
    { value: '0 €', label: t('home.v3.stats.free'), color: 'text-brand', to: null },
  ];

  return (
    <section className="border-b border-line">
      <dl className="mx-auto flex max-w-[1320px] flex-wrap justify-between gap-x-16 gap-y-8 px-5 py-14 md:px-[5%]">
        {stats.map(stat => (
          <div key={stat.label}>
            <dt className="sr-only">{stat.label}</dt>
            <dd className={`font-display text-5xl font-extrabold leading-none ${stat.color}`}>{stat.value}</dd>
            <dd className="mt-1.5 text-[15px] text-ink-muted">
              {stat.to ? (
                <Link to={stat.to} className="underline decoration-line underline-offset-4 hover:text-brand hover:decoration-brand">
                  {stat.label} →
                </Link>
              ) : (
                stat.label
              )}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
};

export default HomeStats;
