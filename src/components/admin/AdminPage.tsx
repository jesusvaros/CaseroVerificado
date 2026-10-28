import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import PageSEO from '../../seo/PageSEO';
import { useAuth } from '../../store/auth/hooks';
import { useAdminDashboard } from './useAdminDashboard';
import OverviewTab from './OverviewTab';
import OutreachTab from './OutreachTab';
import ModerationTab from './ModerationTab';

const TABS = [
  { id: 'resumen', label: 'Resumen' },
  { id: 'contactos', label: 'Contactos' },
  { id: 'moderacion', label: 'Moderación' },
] as const;
type Tab = (typeof TABS)[number]['id'];

const RANGES = [1, 7, 30, 90];

// /admin: traffic and reviews, outreach success and the moderation queue. Data access is
// enforced in the database (is_admin); this check only avoids showing an empty shell.
const AdminPage = () => {
  const { isAdmin, isLoading } = useAuth();
  const [params, setParams] = useSearchParams();
  const tab = (TABS.find(t => t.id === params.get('tab'))?.id ?? 'resumen') as Tab;
  const [days, setDays] = useState(30);
  const { data, error, updateContact } = useAdminDashboard(days);

  if (isLoading) return <div className="min-h-screen bg-mist pt-24" aria-busy="true" />;
  if (!isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-mist px-5 pt-24 text-ink">
        <PageSEO title="Admin" noindex />
        <p className="text-lg">Inicia sesión con la cuenta de administración para ver esta página.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-mist pb-24 text-ink">
      <PageSEO title="Admin" noindex />
      <header className="bg-forest pt-[76px] text-white">
        <div className="mx-auto flex max-w-[1320px] flex-wrap items-end justify-between gap-6 px-5 pb-0 pt-10 md:px-[5%]">
          <div className="flex flex-col gap-6">
            <h1 className="font-display text-4xl font-extrabold tracking-tight">Panel</h1>
            <nav className="flex gap-1">
              {TABS.map(t => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setParams({ tab: t.id })}
                  className={`rounded-t-xl px-5 py-3 text-[15px] font-bold transition-colors ${tab === t.id ? 'bg-mist text-forest' : 'text-white/70 hover:text-white'}`}
                >
                  {t.label}
                  {t.id === 'moderacion' && data?.reviews.pending ? <span className="ml-2 rounded-full bg-coral px-2 py-0.5 text-xs text-white">{data.reviews.pending}</span> : null}
                </button>
              ))}
            </nav>
          </div>
          {tab === 'resumen' && (
            <div className="mb-4 flex gap-1 rounded-full bg-white/10 p-1">
              {RANGES.map(r => (
                <button key={r} type="button" onClick={() => setDays(r)} className={`rounded-full px-4 py-1.5 text-sm font-bold ${days === r ? 'bg-lime text-forest' : 'text-white/80'}`}>
                  {r === 1 ? '24 h' : `${r} días`}
                </button>
              ))}
            </div>
          )}
        </div>
      </header>
      <main className="mx-auto max-w-[1320px] px-5 pt-8 md:px-[5%]">
        {error && <p className="mb-6 rounded-xl bg-coral-soft p-4 text-coral-ink">{error}</p>}
        {tab === 'moderacion' ? (
          <ModerationTab />
        ) : !data ? (
          <p className="text-ink-muted">Cargando…</p>
        ) : tab === 'resumen' ? (
          <OverviewTab data={data} />
        ) : (
          <OutreachTab contacts={data.outreach} onUpdate={updateContact} />
        )}
      </main>
    </div>
  );
};

export default AdminPage;
