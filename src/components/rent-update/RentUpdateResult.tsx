import { useTranslations } from '../../i18n/useTranslations';
import type { RentUpdateResult as Result } from './rentUpdateRules';

const euros = (value: number) => `${value.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €`;
const pct = (value: number) => `${value.toLocaleString('es-ES', { maximumFractionDigits: 2 })} %`;
const monthName = (month: string) => new Date(`${month}-01T12:00:00`).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });

const Note = ({ children }: { children: string }) => <p className="text-[15px] leading-relaxed text-ink-soft">{children}</p>;

// The verdict box: the legal maximum and, when the tenant typed it, whether the landlord asks for more.
const RentUpdateResult = ({ result, rent, asked }: { result: Result; rent: number; asked: number | null }) => {
  const { t } = useTranslations();

  if (result.kind !== 'capped') {
    return (
      <div className="flex flex-col gap-2 rounded-3xl bg-mist p-6">
        <h2 className="font-display text-2xl font-extrabold tracking-tight">{t(`rentUpdate.result.${result.kind}.title`)}</h2>
        <Note>{t(`rentUpdate.result.${result.kind}.text`)}</Note>
        {result.kind === 'contractOnly' && result.rdl8 && <Note>{t('rentUpdate.result.rdl8')}</Note>}
      </div>
    );
  }

  const over = asked != null && asked - result.maxRent > 0.005;
  return (
    <div className={`flex flex-col gap-3 rounded-3xl p-6 ${over ? 'bg-coral-soft' : 'bg-lime-soft'}`}>
      <span className="text-sm font-bold uppercase tracking-wide text-ink-muted">{t('rentUpdate.result.maxLabel')}</span>
      <p className="font-display text-4xl font-extrabold tracking-tight">
        {euros(result.maxRent)} <span className="text-lg font-bold text-ink-muted">{t('rentUpdate.result.perMonth')}</span>
      </p>
      <Note>{t('rentUpdate.result.increase', { amount: euros(result.maxRent - rent), pct: pct(result.pct) })}</Note>
      {asked != null && (
        <p className={`text-lg font-bold ${over ? 'text-coral-ink' : 'text-forest'}`}>
          {over ? t('rentUpdate.result.over', { amount: euros(asked - result.maxRent) }) : t('rentUpdate.result.ok')}
        </p>
      )}
      <Note>
        {result.extraordinary
          ? t('rentUpdate.result.why.extraordinary', { irav: pct(result.iravValue), month: monthName(result.iravMonth) })
          : t('rentUpdate.result.why.irav', { irav: pct(result.iravValue), month: monthName(result.iravMonth) })}
      </Note>
      {result.estimated && <Note>{t('rentUpdate.result.estimated')}</Note>}
      {result.extraordinary && <Note>{t('rentUpdate.result.agreement')}</Note>}
      {result.tensioned !== 'no' && <Note>{t('rentUpdate.result.tensioned')}</Note>}
      {result.rdl8 && <Note>{t('rentUpdate.result.rdl8')}</Note>}
      {over && <Note>{t('rentUpdate.result.whatToDo')}</Note>}
    </div>
  );
};

export default RentUpdateResult;
