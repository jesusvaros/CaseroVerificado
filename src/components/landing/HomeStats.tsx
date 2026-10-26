import { useEffect, useState } from 'react';
import { fetchSiteStats } from '../../services/stats';
import { getPublicReviews } from '../../services/supabase/publicReviews';
import { blogPosts } from '../../blog/posts';
import { useTranslations } from '../../i18n/useTranslations';

type Stat = { value: string; label: string; accent?: boolean };

const HomeStats = () => {
  const { t } = useTranslations();
  const [reviews, setReviews] = useState<number | null>(null);
  const [cities, setCities] = useState<number | null>(null);

  useEffect(() => {
    let active = true;
    fetchSiteStats().then(stats => active && setReviews(stats.totalReviews));
    getPublicReviews().then(list => {
      if (!active) return;
      setCities(new Set(list.map(review => review.city_slug).filter(Boolean)).size);
    });
    return () => {
      active = false;
    };
  }, []);

  const guides = blogPosts.filter(post => post.language === 'es').length;
  const stats: Stat[] = [
    { value: reviews === null ? '…' : String(reviews), label: t('home.v2.stats.reviews') },
    { value: cities === null ? '…' : String(cities), label: t('home.v2.stats.cities') },
    { value: String(guides), label: t('home.v2.stats.guides') },
    { value: '0 €', label: t('home.v2.stats.free'), accent: true },
  ];

  return (
    <section className="border-b border-line">
      <dl className="mx-auto flex max-w-7xl flex-wrap justify-between gap-x-16 gap-y-8 px-5 py-12 md:px-10">
        {stats.map(stat => (
          <div key={stat.label}>
            <dt className="sr-only">{stat.label}</dt>
            <dd className={`font-display text-5xl font-extrabold leading-none ${stat.accent ? 'text-coral' : 'text-brand'}`}>
              {stat.value}
            </dd>
            <dd className="mt-2 text-sm text-ink-muted">{stat.label}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
};

export default HomeStats;
