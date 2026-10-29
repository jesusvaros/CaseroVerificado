import { useState } from 'react';
import toast from 'react-hot-toast';
import { SCORE_LABELS } from '../review/reviewScores';
import { useModeration, type PendingReview } from './useModeration';

const DEPOSIT: Record<string, string> = { true: 'Fianza devuelta', partial: 'Fianza en parte', false: 'Fianza no devuelta', ongoing: 'Sigue viviendo allí' };

interface CardProps {
  review: PendingReview;
  onApprove: () => Promise<void>;
  onReject: (reason: string) => Promise<void>;
  onDelete: () => Promise<void>;
}

const ReviewCard = ({ review, onApprove, onReject, onDelete }: CardProps) => {
  const [reason, setReason] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [busy, setBusy] = useState(false);
  const a = review.address_details;
  const address = a?.fullAddress || [a?.street, a?.number, a?.city].filter(Boolean).join(' ') || 'Sin dirección';
  const unclaimed = review.user_id === null;

  const run = async (action: () => Promise<void>, done: string) => {
    setBusy(true);
    try {
      await action();
      toast.success(done);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Error');
      setBusy(false);
    }
  };

  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-line bg-white p-6">
      <header className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="font-display text-xl font-extrabold">{address}</h3>
        <span className="text-sm text-ink-muted">{new Date(review.created_at).toLocaleString('es-ES')}</span>
      </header>
      {unclaimed && (
        <p className="rounded-xl bg-coral-soft px-4 py-3 text-sm text-coral-ink">
          <strong>Sin email.</strong> La envió pero no confirmó su email, así que no se puede publicar. Si vuelve a entrar desde este navegador y confirma, pasará a pendiente.
        </p>
      )}
      <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
        {SCORE_LABELS.map(([key, label]) => review[key] != null && <span key={key}>{label}: <strong>{review[key]}</strong></span>)}
        {review.price != null && <span>{review.price} €/mes{review.rental_type === 'room' ? ' (habitación)' : ''}{review.size_m2 ? ` · ${review.size_m2} m²` : ''}</span>}
        {review.start_year && <span>{review.start_year} – {review.end_year ?? 'hoy'}</span>}
        {review.deposit_returned && <span>{DEPOSIT[review.deposit_returned] ?? review.deposit_returned}</span>}
      </div>
      {review.tags?.length ? <div className="flex flex-wrap gap-2">{review.tags.map(t => <span key={t} className="rounded-full bg-mist px-3 py-1 text-xs font-semibold">{t.replace(/_/g, ' ')}</span>)}</div> : null}
      <p className="whitespace-pre-line rounded-xl bg-mist p-4 leading-relaxed">{review.owner_opinion || 'Sin texto'}</p>
      <div className="flex flex-wrap items-center gap-3">
        <button type="button" disabled={busy || unclaimed} onClick={() => run(onApprove, 'Publicada')} className="rounded-full bg-forest px-6 py-2.5 font-bold text-white hover:bg-brand disabled:opacity-50">
          Publicar
        </button>
        <input value={reason} onChange={e => setReason(e.target.value)} placeholder="Motivo del rechazo (opcional)" className="min-w-[260px] flex-1 rounded-full border border-line px-4 py-2.5 text-sm focus:border-brand focus:outline-none" />
        <button type="button" disabled={busy} onClick={() => run(() => onReject(reason), 'Rechazada')} className="rounded-full border border-coral px-6 py-2.5 font-bold text-coral-ink hover:bg-coral-soft disabled:opacity-40">
          Rechazar
        </button>
        {/* Two clicks instead of a browser confirm dialog */}
        <button
          type="button"
          disabled={busy}
          onClick={() => (confirmDelete ? run(onDelete, 'Borrada') : setConfirmDelete(true))}
          onBlur={() => setConfirmDelete(false)}
          className={`rounded-full px-5 py-2.5 text-sm font-bold disabled:opacity-40 ${confirmDelete ? 'bg-coral text-white' : 'text-ink-muted hover:text-coral-ink'}`}
        >
          {confirmDelete ? 'Pulsa otra vez para borrar' : 'Borrar'}
        </button>
      </div>
    </article>
  );
};

const ModerationTab = () => {
  const { reviews, error, approve, reject, remove } = useModeration();
  if (error) return <p className="text-coral-ink">{error}</p>;
  if (!reviews) return <p className="text-ink-muted">Cargando…</p>;
  if (reviews.length === 0) return <p className="rounded-2xl bg-mist p-8 text-center text-ink-muted">No hay opiniones pendientes.</p>;
  return (
    <div className="flex flex-col gap-5">
      {reviews.map(r => (
        <ReviewCard
          key={r.review_session_id}
          review={r}
          onApprove={() => approve(r.review_session_id)}
          onReject={reason => reject(r.review_session_id, reason)}
          onDelete={() => remove(r.review_session_id)}
        />
      ))}
    </div>
  );
};

export default ModerationTab;
