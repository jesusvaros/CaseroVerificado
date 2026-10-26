import { Link } from 'react-router-dom';
import { useTranslations } from '../../i18n/useTranslations';
import Reveal from './Reveal';

// The five guides from the design, with short titles; slugs are in src/blog/posts.
const GUIDES = [
  { key: 'deposit', slug: 'devolucion-de-la-fianza-alquiler' },
  { key: 'tensioned', slug: 'zonas-tensionadas-que-son-y-como-saber-si-te-afectan' },
  { key: 'repairs', slug: 'reparaciones-que-paga-el-casero-y-que-el-inquilino' },
  { key: 'sale', slug: 'si-venden-el-piso-que-alquilas-tus-derechos' },
  { key: 'unions', slug: 'sindicatos-de-inquilinas-que-hacen-y-como-pedir-ayuda' },
];

const HomeGuides = () => {
  const { t } = useTranslations();

  return (
    <Reveal className="mx-auto flex max-w-[1320px] flex-wrap gap-16 px-5 py-24 md:px-[5%] md:py-[110px]">
      <div className="flex min-w-0 flex-[1_1_360px] flex-col gap-4">
        <h2 className="font-display text-4xl font-extrabold leading-none tracking-[-0.03em] md:text-[52px]">{t('home.v3.guides.title')}</h2>
        <p className="text-[17px] leading-relaxed text-ink-soft">{t('home.v3.guides.text')}</p>
        <Link to="/blog" className="font-bold text-brand hover:text-forest">{t('home.v3.guides.all')}</Link>
      </div>
      <nav className="flex min-w-0 flex-[2_1_520px] flex-col" aria-label={t('home.v3.guides.title')}>
        {GUIDES.map((guide, i) => (
          <Link
            key={guide.slug}
            to={`/blog/${guide.slug}`}
            className={`group flex items-center justify-between gap-4 py-[22px] text-xl font-semibold text-ink transition-colors hover:text-brand md:text-[22px] ${i < GUIDES.length - 1 ? 'border-b border-[#DCE3D3]' : ''}`}
          >
            {t(`home.v3.guides.items.${guide.key}`)}
            <span className="text-[26px] text-brand transition-transform group-hover:translate-x-1.5">→</span>
          </Link>
        ))}
      </nav>
    </Reveal>
  );
};

export default HomeGuides;
