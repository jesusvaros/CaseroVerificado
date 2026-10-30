import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageSEO from '../../seo/PageSEO';
import { useTranslations } from '../../i18n/useTranslations';
import { useFormContext } from '../../store/useFormContext';
import { trackEvent } from '../../utils/analytics';
import RentUpdateForm, { type RentUpdateFields } from './RentUpdateForm';
import RentUpdateResult from './RentUpdateResult';
import { RDL_29_2026, computeRentUpdate, nextAnniversary } from './rentUpdateRules';

interface IravFile {
  latest: string;
  values: Record<string, number>;
}

const SOURCES = [
  { key: 'lau', href: 'https://www.boe.es/buscar/act.php?id=BOE-A-1994-26003' },
  { key: 'rdl', href: 'https://www.boe.es/buscar/act.php?id=BOE-A-2026-20823' },
  { key: 'ine', href: 'https://www.ine.es/jaxiT3/Tabla.htm?t=72975' },
];

// /calculadora-subida-alquiler: the most the yearly rent update can be, from the contract dates and the IRAV.
const RentUpdatePage = () => {
  const { t } = useTranslations();
  const navigate = useNavigate();
  const { updateFormData } = useFormContext();
  const [irav, setIrav] = useState<IravFile | null>(null);
  const [fields, setFields] = useState<RentUpdateFields>({ signed: '', update: '', rent: '', asked: '', clause: null, tensioned: 'no' });

  useEffect(() => {
    fetch('/data/irav.json')
      .then(res => (res.ok ? res.json() : null))
      .then(setIrav)
      .catch(() => setIrav(null));
  }, []);

  // The update date follows the signing date until the tenant changes it.
  const onChange = (patch: Partial<RentUpdateFields>) =>
    setFields(prev => {
      const followsSigned = !prev.update || (prev.signed !== '' && prev.update === nextAnniversary(prev.signed));
      return { ...prev, ...patch, ...(patch.signed && followsSigned ? { update: nextAnniversary(patch.signed) } : {}) };
    });

  const rent = Number(fields.rent) > 0 ? Number(fields.rent) : null;
  const asked = Number(fields.asked) > 0 ? Number(fields.asked) : null;
  const result = useMemo(
    () => (irav && fields.clause && fields.signed && fields.update && rent ? computeRentUpdate({ signed: fields.signed, update: fields.update, rent, clause: fields.clause, tensioned: fields.tensioned }, irav.values) : null),
    [irav, fields, rent]
  );

  useEffect(() => {
    if (result) trackEvent('rent-update:result', { kind: result.kind });
  }, [result?.kind]); // eslint-disable-line react-hooks/exhaustive-deps

  const shareRent = () => {
    trackEvent('rent-update:share-rent');
    updateFormData({ price: rent ?? undefined });
    navigate('/add-review');
  };

  return (
    <div className="bg-white pb-24 text-ink">
      <PageSEO title={t('rentUpdate.seoTitle')} description={t('rentUpdate.seoDescription')} />
      <header className="bg-forest pt-[76px] text-white">
        <div className="mx-auto max-w-[960px] px-5 pb-12 pt-12">
          <h1 className="font-display text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">{t('rentUpdate.title')}</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/75">{t('rentUpdate.intro')}</p>
        </div>
      </header>
      <main className="mx-auto flex max-w-[960px] flex-col gap-8 px-5 pt-10">
        {RDL_29_2026 === 'pending' && <p className="rounded-2xl bg-mist p-4 text-sm text-ink-soft">{t('rentUpdate.pendingDecree')}</p>}
        <RentUpdateForm fields={fields} onChange={onChange} />
        {result && rent && <RentUpdateResult result={result} rent={rent} asked={asked} />}
        {result && (
          <section className="flex flex-col gap-3 rounded-3xl bg-forest p-6 text-white">
            <h2 className="font-display text-2xl font-extrabold tracking-tight">{t('rentUpdate.share.title')}</h2>
            <p className="text-white/80">{t('rentUpdate.share.text')}</p>
            <button type="button" onClick={shareRent} className="w-fit rounded-full bg-lime px-6 py-3 font-bold text-forest transition-colors hover:bg-white">
              {t('rentUpdate.share.cta')}
            </button>
          </section>
        )}
        <section className="flex flex-col gap-2 text-sm text-ink-muted">
          <p>{t('rentUpdate.disclaimer')}</p>
          {irav && <p>{t('rentUpdate.iravUpdated', { month: new Date(`${irav.latest}-01T12:00:00`).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' }), value: irav.values[irav.latest].toLocaleString('es-ES') })}</p>}
          <div className="flex flex-wrap gap-x-5 gap-y-1">
            {SOURCES.map(source => (
              <a key={source.key} href={source.href} target="_blank" rel="noreferrer" className="font-bold text-brand hover:underline">{t(`rentUpdate.sources.${source.key}`)} →</a>
            ))}
            <Link to="/blog/actualizacion-anual-de-la-renta-ipc-irav" className="font-bold text-brand hover:underline">{t('rentUpdate.sources.guide')} →</Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default RentUpdatePage;
