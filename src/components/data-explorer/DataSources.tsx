import { useTranslations } from '../../i18n/useTranslations';

const LINKS = {
  serpavi: 'https://www.mivau.gob.es/vivienda/alquila-bien-es-tu-derecho/serpavi',
  ipva: 'https://www.ine.es/jaxiT3/Tabla.htm?t=59060',
  market: 'https://datos.gob.es/es/catalogo?q=fianzas+alquiler',
} as const;

// Where each number comes from, with links, and the raw file for anyone who wants to dig further.
const DataSources = ({ province }: { province: string }) => {
  const { t } = useTranslations();
  return (
    <section className="flex flex-col gap-3 rounded-2xl bg-mist p-5 text-[15px]">
      <h3 className="font-display text-lg font-extrabold">{t('explorer.sourcesTitle')}</h3>
      {(['serpavi', 'ipva', 'market'] as const).map(key => (
        <p key={key} className="text-ink-soft">
          {t(`explorer.source${key[0].toUpperCase()}${key.slice(1)}`)}{' '}
          <a href={LINKS[key]} target="_blank" rel="noreferrer" className="font-bold text-brand underline-offset-2 hover:underline">{t('explorer.sourceLink')}</a>
        </p>
      ))}
      <a href={`/data/historico/${province}.json`} download className="text-sm font-bold text-ink-soft underline underline-offset-2">{t('explorer.download')}</a>
    </section>
  );
};

export default DataSources;
