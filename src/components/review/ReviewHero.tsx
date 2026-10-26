import { Link } from 'react-router-dom';

interface ReviewHeroProps {
  title: string;
  city?: string;
  addressPath: string | null;
  score: number | null;
  status: 'public' | 'pending' | 'published' | null;
}

const STATUS = {
  pending: { label: 'En revisión', className: 'bg-[#FFE8C7] text-[#7A4A00]' },
  published: { label: 'Publicada', className: 'bg-lime text-forest' },
};

const ReviewHero = ({ title, city, addressPath, score, status }: ReviewHeroProps) => (
  <section className="bg-forest pt-[76px] text-white">
    <div className="mx-auto flex max-w-[1320px] flex-wrap items-center gap-6 px-5 pb-12 pt-10 md:px-[5%]">
      {score != null && (
        <span className="flex h-[96px] w-[96px] shrink-0 flex-col items-center justify-center rounded-full bg-lime leading-none text-forest">
          <span className="font-display text-4xl font-extrabold">{score.toLocaleString('es-ES', { maximumFractionDigits: 1 })}</span>
          <span className="text-xs font-bold">de 5</span>
        </span>
      )}
      <div className="flex min-w-0 flex-col gap-2.5">
        <span className="text-sm text-[#9FC3A5]">Opinión de inquilino{city ? ` · ${city}` : ''}</span>
        <h1 className="font-display text-4xl font-extrabold leading-none tracking-tight md:text-5xl">{title}</h1>
        <div className="flex flex-wrap items-center gap-3 text-[15px]">
          {status && status !== 'public' && <span className={`rounded-full px-3 py-1 text-sm font-bold ${STATUS[status].className}`}>{STATUS[status].label}</span>}
          {addressPath && (
            <Link to={addressPath} className="font-semibold text-lime underline underline-offset-4 hover:text-white">
              Ver todas las opiniones y datos de esta dirección
            </Link>
          )}
        </div>
      </div>
    </div>
  </section>
);

export default ReviewHero;
