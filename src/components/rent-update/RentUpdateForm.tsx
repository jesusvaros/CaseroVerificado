import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useTranslations } from '../../i18n/useTranslations';
import { smallLabel, underlineInput } from '../review-form/fieldStyles';
import type { Clause, Tensioned } from './rentUpdateRules';

export interface RentUpdateFields {
  signed: string;
  update: string;
  rent: string;
  asked: string;
  clause: Clause | null;
  tensioned: Tensioned;
}

interface Props {
  fields: RentUpdateFields;
  onChange: (patch: Partial<RentUpdateFields>) => void;
}

function Choice<T extends string>({ label, options, value, onChange, prefix }: { label: string; options: T[]; value: T | null; onChange: (value: T) => void; prefix: string }) {
  const { t } = useTranslations();
  return (
    <div role="radiogroup" aria-label={label} className="flex flex-wrap gap-2.5">
      {options.map(option => (
        <button
          key={option}
          type="button"
          role="radio"
          aria-checked={value === option}
          onClick={() => onChange(option)}
          className={`rounded-full border-[1.5px] px-5 py-2.5 font-bold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 ${
            value === option ? 'border-lime bg-lime text-forest' : 'border-[#C9D2BC] bg-white text-ink hover:border-brand'
          }`}
        >
          {t(`${prefix}.${option}`)}
        </button>
      ))}
    </div>
  );
}

const Field = ({ id, label, hint, children }: { id?: string; label: string; hint?: ReactNode; children: ReactNode }) => (
  <div className="flex flex-col gap-1.5">
    <label htmlFor={id} className={smallLabel}>{label}</label>
    {children}
    {hint && <span className="text-xs text-[#6B7465]">{hint}</span>}
  </div>
);

const RentUpdateForm = ({ fields, onChange }: Props) => {
  const { t } = useTranslations();

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col gap-3">
        <span className={smallLabel}>{t('rentUpdate.form.clause')}</span>
        <Choice label={t('rentUpdate.form.clause')} options={['yes', 'no'] as Clause[]} value={fields.clause} onChange={clause => onChange({ clause })} prefix="rentUpdate.form.clauseOptions" />
        <span className="text-xs text-[#6B7465]">{t('rentUpdate.form.clauseHint')}</span>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="ru-signed" label={t('rentUpdate.form.signed')}>
          <input id="ru-signed" type="date" value={fields.signed} max={new Date().toISOString().slice(0, 10)} onChange={e => onChange({ signed: e.target.value })} className={underlineInput(false)} />
        </Field>
        <Field id="ru-update" label={t('rentUpdate.form.update')} hint={t('rentUpdate.form.updateHint')}>
          <input id="ru-update" type="date" value={fields.update} onChange={e => onChange({ update: e.target.value })} className={underlineInput(false)} />
        </Field>
        <Field id="ru-rent" label={t('rentUpdate.form.rent')}>
          <input id="ru-rent" type="number" inputMode="decimal" min={0} placeholder="€" value={fields.rent} onChange={e => onChange({ rent: e.target.value })} className={underlineInput(false)} />
        </Field>
        <Field id="ru-asked" label={t('rentUpdate.form.asked')} hint={t('rentUpdate.form.askedHint')}>
          <input id="ru-asked" type="number" inputMode="decimal" min={0} placeholder="€" value={fields.asked} onChange={e => onChange({ asked: e.target.value })} className={underlineInput(false)} />
        </Field>
      </div>
      <div className="flex flex-col gap-3">
        <span className={smallLabel}>{t('rentUpdate.form.tensioned')}</span>
        <Choice label={t('rentUpdate.form.tensioned')} options={['no', 'yes', 'unknown'] as Tensioned[]} value={fields.tensioned} onChange={tensioned => onChange({ tensioned })} prefix="rentUpdate.form.tensionedOptions" />
        <Link to="/blog/zonas-tensionadas-que-son-y-como-saber-si-te-afectan" className="w-fit text-xs font-bold text-brand hover:underline">
          {t('rentUpdate.form.tensionedHint')}
        </Link>
      </div>
    </div>
  );
};

export default RentUpdateForm;
