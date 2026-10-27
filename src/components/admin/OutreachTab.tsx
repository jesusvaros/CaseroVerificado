import AdminStat from './AdminStat';
import { pct } from './pct';
import type { OutreachContact, OutreachStatus } from './useAdminDashboard';

const STATUS: Record<OutreachStatus, { label: string; tone: string }> = {
  draft: { label: 'Borrador', tone: 'bg-mist text-ink-muted' },
  sent: { label: 'Enviado', tone: 'bg-lime-soft text-forest' },
  replied: { label: 'Respondió', tone: 'bg-brand-light/20 text-forest' },
  interested: { label: 'Interesado', tone: 'bg-brand text-white' },
  declined: { label: 'No interesado', tone: 'bg-coral-soft text-coral-ink' },
  bounced: { label: 'Rebotó', tone: 'bg-coral-soft text-coral-ink' },
};

const REPLIED: OutreachStatus[] = ['replied', 'interested', 'declined'];
const isSent = (c: OutreachContact) => c.status !== 'draft' && c.status !== 'bounced';

// Success of a group of contacts: replies, and visits through their link even when nobody replies.
function summarise(contacts: OutreachContact[]) {
  const sent = contacts.filter(isSent);
  return {
    sent: sent.length,
    replied: sent.filter(c => REPLIED.includes(c.status)).length,
    interested: sent.filter(c => c.status === 'interested').length,
    visited: sent.filter(c => c.visitors > 0).length,
    visitors: contacts.reduce((n, c) => n + c.visitors, 0),
    reviews: contacts.reduce((n, c) => n + c.reviews, 0),
  };
}

const date = (value: string | null) => (value ? new Date(value).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' }) : '–');

interface Props {
  contacts: OutreachContact[];
  onUpdate: (id: string, patch: Partial<Pick<OutreachContact, 'status' | 'notes' | 'sent_at' | 'replied_at'>>) => void;
}

const OutreachTab = ({ contacts, onUpdate }: Props) => {
  const total = summarise(contacts);
  const kinds = [...new Set(contacts.map(c => c.kind))].map(kind => ({ kind, ...summarise(contacts.filter(c => c.kind === kind)) }));

  const changeStatus = (contact: OutreachContact, status: OutreachStatus) => {
    const now = new Date().toISOString();
    onUpdate(contact.id, {
      status,
      sent_at: status !== 'draft' ? contact.sent_at ?? now : null,
      replied_at: REPLIED.includes(status) ? contact.replied_at ?? now : contact.replied_at,
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <AdminStat value={total.sent} label="Enviados" hint={`de ${contacts.length} contactos`} />
        <AdminStat value={pct(total.replied, total.sent)} label="Responden" hint={`${total.replied} respuestas · ${total.interested} interesados`} accent />
        <AdminStat value={pct(total.visited, total.sent)} label="Abren el enlace" hint="Aunque no respondan" accent />
        <AdminStat value={total.visitors} label="Visitas desde correos" hint="Incluye a quien se lo reenvían" />
        <AdminStat value={total.reviews} label="Opiniones desde correos" />
      </div>

      <section className="overflow-x-auto rounded-2xl border border-line bg-white">
        <table className="w-full min-w-[640px] text-sm">
          <thead className="bg-mist text-left text-ink-muted">
            <tr>{['Tipo', 'Enviados', 'Responden', 'Abren el enlace', 'Visitas', 'Opiniones'].map(h => <th key={h} className="px-4 py-3 font-semibold">{h}</th>)}</tr>
          </thead>
          <tbody>
            {kinds.map(k => (
              <tr key={k.kind} className="border-t border-line">
                <td className="px-4 py-3 font-semibold capitalize">{k.kind}</td>
                <td className="px-4 py-3">{k.sent}</td>
                <td className="px-4 py-3">{pct(k.replied, k.sent)}</td>
                <td className="px-4 py-3">{pct(k.visited, k.sent)}</td>
                <td className="px-4 py-3">{k.visitors}</td>
                <td className="px-4 py-3">{k.reviews}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="overflow-x-auto rounded-2xl border border-line bg-white">
        <table className="w-full min-w-[980px] text-sm">
          <thead className="bg-mist text-left text-ink-muted">
            <tr>{['Organización', 'Estado', 'Enviado', 'Visitas', 'Formulario', 'Opiniones', 'Última visita', 'Notas'].map(h => <th key={h} className="px-4 py-3 font-semibold">{h}</th>)}</tr>
          </thead>
          <tbody>
            {contacts.map(c => (
              <tr key={c.id} className="border-t border-line align-top">
                <td className="px-4 py-3">
                  <div className="font-semibold">{c.org}</div>
                  <div className="text-xs text-ink-muted">{[c.city, c.kind, c.channel].filter(Boolean).join(' · ')}</div>
                  <div className="text-xs text-ink-muted">?ref={c.ref}</div>
                </td>
                <td className="px-4 py-3">
                  <select
                    value={c.status}
                    onChange={e => changeStatus(c, e.target.value as OutreachStatus)}
                    className={`rounded-full border-0 px-3 py-1.5 text-xs font-bold focus:ring-2 focus:ring-lime ${STATUS[c.status].tone}`}
                  >
                    {Object.entries(STATUS).map(([value, s]) => <option key={value} value={value}>{s.label}</option>)}
                  </select>
                </td>
                <td className="px-4 py-3">{date(c.sent_at)}</td>
                <td className="px-4 py-3 font-semibold">{c.visitors || '–'}</td>
                <td className="px-4 py-3">{c.forms || '–'}</td>
                <td className="px-4 py-3">{c.reviews || '–'}</td>
                <td className="px-4 py-3">{date(c.last_visit)}</td>
                <td className="px-4 py-3">
                  <input
                    defaultValue={c.notes ?? ''}
                    onBlur={e => e.target.value !== (c.notes ?? '') && onUpdate(c.id, { notes: e.target.value })}
                    placeholder="Añadir nota"
                    className="w-56 rounded-lg border border-line px-2 py-1.5 focus:border-brand focus:outline-none"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default OutreachTab;
