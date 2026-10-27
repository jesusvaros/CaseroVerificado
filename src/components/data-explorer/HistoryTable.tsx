import { useTranslations } from '../../i18n/useTranslations';
import type { FullPoint, SectionPoint } from '../../services/publicData/rentHistory';

const n2 = (v: number | null | undefined) => (v == null ? '–' : v.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
const n0 = (v: number | null | undefined) => (v == null ? '–' : v.toLocaleString('es-ES'));

// Every year for one area, newest first. Sections carry fewer fields than districts and municipalities.
const HistoryTable = ({ years, points, full }: { years: number[]; points: (FullPoint | SectionPoint | null)[]; full: boolean }) => {
  const { t } = useTranslations();
  const rows = years.map((year, i) => ({ year, p: points[i] })).filter(r => r.p).reverse();
  const head = full ? ['year', 'contracts', 'median', 'range', 'month', 'size'] : ['year', 'contracts', 'median', 'month'];

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[420px] text-sm">
        <thead className="text-left text-ink-muted">
          <tr>{head.map(h => <th key={h} className="py-2 pr-4 font-semibold">{t(`explorer.cols.${h}`)}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map(({ year, p }) => {
            const f = p as FullPoint;
            const s = p as SectionPoint;
            return (
              <tr key={year} className="border-t border-line">
                <td className="py-2 pr-4 font-semibold">{year}</td>
                <td className="py-2 pr-4">{n0(p![0])}</td>
                <td className="py-2 pr-4 font-bold">{n2(full ? f[2] : s[1])}</td>
                {full && <td className="py-2 pr-4 text-ink-soft">{n2(f[1])} – {n2(f[3])}</td>}
                <td className="py-2 pr-4">{n0(full ? f[4] : s[2])}</td>
                {full && <td className="py-2 pr-4">{n0(f[5])}</td>}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryTable;
