// Every data source the site shows, in one place: the per-page note and /datos read from here.
export type SourceKey = 'reviews' | 'serpavi' | 'catastro' | 'ipva' | 'tensioned' | 'sales' | 'deposits';

export const SOURCE_LINKS: Record<SourceKey, string | null> = {
  reviews: null,
  serpavi: 'https://www.mivau.gob.es/vivienda/alquila-bien-es-tu-derecho/serpavi',
  catastro: 'https://www.sedecatastro.gob.es/',
  ipva: 'https://www.ine.es/jaxiT3/Tabla.htm?t=59060',
  tensioned: 'https://www.mivau.gob.es/vivienda/alquila-bien-es-tu-derecho/serpavi/consultar-zonas-de-mercado-residencial-tensionado',
  sales: 'https://apps.fomento.gob.es/BoletinOnline2/?nivel=2&orden=35000000',
  deposits: 'https://dadesobertes.gva.es/es/dataset?q=fianzas',
};

export const ALL_SOURCES: SourceKey[] = ['reviews', 'serpavi', 'deposits', 'sales', 'ipva', 'catastro', 'tensioned'];
