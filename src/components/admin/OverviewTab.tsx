import AdminStat from './AdminStat';
import { pct } from './pct';
import type { Dashboard } from './useAdminDashboard';

const BarList = ({ title, rows }: { title: string; rows: { label: string; value: number }[] }) => {
  const max = Math.max(1, ...rows.map(r => r.value));
  return (
    <section className="flex flex-col gap-3 rounded-2xl border border-line bg-white p-5">
      <h3 className="font-display text-lg font-extrabold">{title}</h3>
      {rows.length === 0 && <p className="text-sm text-ink-muted">Sin datos todavía.</p>}
      {rows.map(row => (
        <div key={row.label} className="flex items-center gap-3 text-sm">
          <span className="w-44 shrink-0 truncate" title={row.label}>{row.label}</span>
          <span className="h-2.5 flex-1 overflow-hidden rounded bg-mist">
            <span className="block h-full rounded bg-brand-light" style={{ width: `${(row.value / max) * 100}%` }} />
          </span>
          <strong className="w-10 text-right">{row.value}</strong>
        </div>
      ))}
    </section>
  );
};

// Sessions per day as columns, reviews as lime dots on top.
const Daily = ({ daily }: { daily: Dashboard['daily'] }) => {
  const max = Math.max(1, ...daily.map(d => d.sessions));
  return (
    <section className="flex flex-col gap-4 rounded-2xl border border-line bg-white p-5">
      <h3 className="font-display text-lg font-extrabold">Visitas por día</h3>
      {daily.length === 0 ? (
        <p className="text-sm text-ink-muted">Las visitas se cuentan desde que se activó esta medición.</p>
      ) : (
        <div className="flex h-40 items-end gap-1">
          {daily.map(d => (
            <div key={d.day} className="group relative flex flex-1 flex-col items-center justify-end" title={`${d.day}: ${d.sessions} visitas, ${d.reviews} opiniones`}>
              {d.reviews > 0 && <span className="mb-1 h-2 w-2 rounded-full bg-coral" />}
              <span className="w-full rounded-t bg-forest-500" style={{ height: `${(d.sessions / max) * 100}%`, minHeight: 2 }} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

const OverviewTab = ({ data }: { data: Dashboard }) => {
  const { totals, reviews } = data;
  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AdminStat value={totals.sessions} label="Visitas" hint={`últimos ${data.days} días`} />
        <AdminStat value={totals.forms_opened} label="Abrieron el formulario" hint={`${pct(totals.forms_opened, totals.sessions)} de las visitas`} />
        <AdminStat value={totals.reviews_submitted} label="Opiniones enviadas" hint={`${pct(totals.reviews_submitted, totals.forms_opened)} de quien abre el formulario`} accent />
        <AdminStat value={reviews.published} label="Opiniones visibles" hint={`${reviews.pending} por moderar · ${reviews.hidden} ocultas · ${reviews.rejected} rechazadas`} />
      </div>
      <Daily daily={data.daily} />
      <div className="grid gap-6 lg:grid-cols-2">
        <BarList title="De dónde llegan" rows={data.sources.map(s => ({ label: s.source, value: s.sessions }))} />
        <BarList title="Páginas de entrada" rows={data.pages.map(p => ({ label: p.path, value: p.sessions }))} />
      </div>
    </div>
  );
};

export default OverviewTab;
