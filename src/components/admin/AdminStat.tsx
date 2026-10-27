// One number on the admin dashboard, with an optional rate under it.
const AdminStat = ({ value, label, hint, accent = false }: { value: string | number; label: string; hint?: string; accent?: boolean }) => (
  <div className="flex flex-col gap-1 rounded-2xl border border-line bg-white p-5">
    <span className={`font-display text-4xl font-extrabold leading-none ${accent ? 'text-brand' : 'text-ink'}`}>{value}</span>
    <span className="text-[15px] font-semibold text-ink">{label}</span>
    {hint && <span className="text-sm text-ink-muted">{hint}</span>}
  </div>
);

export default AdminStat;
