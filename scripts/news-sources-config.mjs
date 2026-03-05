export const GLOBAL_HOUSING_KEYWORDS = [
  'housing',
  'rent',
  'landlord',
  'tenant',
  'eviction',
  'squat',
  'property',
  'real estate',
  'social housing',
  'affordable housing',
];

export const COMMON_EXCLUDE_KEYWORDS = [
  'football',
  'soccer',
  'nba',
  'nfl',
  'tennis',
  'formula-1',
  'f1',
  'celebrity',
  'gossip',
  'horoscope',
  'recipe',
  'cooking',
  'restaurant',
  'fashion',
  'beauty',
  'travel',
  'weather',
  'lottery',
  'obituary',
  'crime',
  'murder',
];

/**
 * `keywordRequired: false` means we trust the section URL and only require article-like links.
 */
export const NEWS_COUNTRY_CONFIG = {
  ES: {
    countryCode: 'ES',
    countryName: 'Spain',
    outputLanguage: 'es',
    keywords: [
      'alquiler', 'alquileres', 'vivienda', 'inmueble', 'piso', 'casa', 'propiedad',
      'inquilino', 'propietario', 'renta', 'desahucio', 'inmobiliario', 'mercado inmobiliario',
      'vivienda social', 'vivienda asequible',
    ],
    sources: [
      { name: 'El Cronista - Vivienda', url: 'https://www.cronista.com/tema/vivienda-es/', keywordRequired: false },
      { name: 'La Sexta - Vivienda', url: 'https://www.lasexta.com/buscador-site/index.html?q=vivienda', keywordRequired: true },
      { name: 'Diario de Sevilla - Alquiler', url: 'https://www.diariodesevilla.es/tag/alquiler-de-vivienda/', keywordRequired: false },
      { name: '20minutos - Inquilinos', url: 'https://www.20minutos.es/tags/temas/inquilinos.html', keywordRequired: false },
      { name: 'El País - Vivienda', url: 'https://elpais.com/tag/vivienda/', keywordRequired: false },
      { name: 'ABC - Vivienda', url: 'https://www.abc.es/economia/vivienda/', keywordRequired: false },
      { name: 'Idealista News', url: 'https://www.idealista.com/news/', keywordRequired: true },
    ],
  },
  GB: {
    countryCode: 'GB',
    countryName: 'United Kingdom',
    outputLanguage: 'en',
    keywords: [
      'housing', 'rent', 'rental', 'tenant', 'landlord', 'eviction', 'squatter', 'squatters',
      'property', 'real-estate', 'social housing', 'affordable housing', 'housing crisis',
      'house prices', 'mortgage', 'leasehold', 'private renting',
    ],
    sources: [
      { name: 'The Guardian Housing', url: 'https://www.theguardian.com/uk/housing', keywordRequired: false },
      { name: 'Financial Times Property', url: 'https://www.ft.com/property', keywordRequired: false },
      { name: 'CityAM', url: 'https://www.cityam.com/', keywordRequired: true },
    ],
  },
  FR: {
    countryCode: 'FR',
    countryName: 'France',
    outputLanguage: 'fr',
    keywords: [
      'logement', 'loyer', 'locataire', 'proprietaire', 'propriétaire', 'expulsion', 'immobilier',
      'logement social', 'habitat', 'urbanisme', 'crise immobiliere', 'crise immobilière',
      'bail', 'encadrement des loyers',
    ],
    sources: [
      { name: 'Le Monde (EN)', url: 'https://www.lemonde.fr/en/', keywordRequired: true },
      { name: 'Le Figaro Immobilier', url: 'https://www.lefigaro.fr/immobilier/', keywordRequired: false },
      { name: 'Les Echos Immobilier', url: 'https://www.lesechos.fr/immobilier', keywordRequired: false },
    ],
  },
  DE: {
    countryCode: 'DE',
    countryName: 'Germany',
    outputLanguage: 'de',
    keywords: [
      'wohnen', 'miete', 'mietpreis', 'mieter', 'vermieter', 'zwangsraumung', 'zwangsräumung',
      'immobilien', 'wohnungsmarkt', 'sozialwohnung', 'bezahlbarer wohnraum', 'mietendeckel',
      'hauskauf', 'wohnungskrise',
    ],
    sources: [
      { name: 'FAZ', url: 'https://www.faz.net/', keywordRequired: true },
      { name: 'Sueddeutsche', url: 'https://www.sueddeutsche.de/', keywordRequired: true },
      { name: 'taz', url: 'https://taz.de/', keywordRequired: true },
    ],
  },
  IT: {
    countryCode: 'IT',
    countryName: 'Italy',
    outputLanguage: 'it',
    keywords: [
      'casa', 'affitto', 'locazione', 'inquilino', 'proprietario', 'sfratto', 'immobile',
      'immobiliare', 'edilizia sociale', 'alloggi popolari', 'mercato immobiliare',
      'caro affitti', 'canone',
    ],
    sources: [
      { name: 'Il Sole 24 Ore', url: 'https://www.ilsole24ore.com/', keywordRequired: true },
      { name: 'La Repubblica', url: 'https://www.repubblica.it/', keywordRequired: true },
      { name: 'Corriere della Sera', url: 'https://www.corriere.it/', keywordRequired: true },
    ],
  },
  NL: {
    countryCode: 'NL',
    countryName: 'Netherlands',
    outputLanguage: 'nl',
    keywords: [
      'woning', 'huizen', 'huur', 'huren', 'huurder', 'verhuurder', 'ontruiming', 'kraak',
      'woningmarkt', 'sociale huur', 'betaalbare woning', 'huisvesting', 'huurprijs',
    ],
    sources: [
      { name: 'NRC', url: 'https://www.nrc.nl/', keywordRequired: true },
      { name: 'Volkskrant', url: 'https://www.volkskrant.nl/', keywordRequired: true },
      { name: 'NOS', url: 'https://nos.nl/', keywordRequired: true },
    ],
  },
  CH: {
    countryCode: 'CH',
    countryName: 'Switzerland',
    outputLanguage: 'en',
    keywords: [
      'miete', 'wohnung', 'wohnen', 'immobilien', 'locataire', 'loyer', 'affitto',
      'tenant', 'landlord', 'housing', 'property', 'real estate', 'social housing',
    ],
    sources: [
      { name: 'NZZ', url: 'https://www.nzz.ch/', keywordRequired: true },
      { name: 'Swissinfo', url: 'https://www.swissinfo.ch/eng', keywordRequired: true },
      { name: 'Tages-Anzeiger', url: 'https://www.tagesanzeiger.ch/', keywordRequired: true },
    ],
  },
  SE: {
    countryCode: 'SE',
    countryName: 'Sweden',
    outputLanguage: 'sv',
    keywords: [
      'bostad', 'hyra', 'hyresgast', 'hyresgäst', 'hyresvard', 'hyresvärd', 'vrakning', 'vräkning',
      'bostadsmarknad', 'bostadskris', 'hyresratt', 'hyresrätt', 'prisutveckling bostad',
    ],
    sources: [
      { name: 'The Local Sweden', url: 'https://www.thelocal.se/', keywordRequired: true },
      { name: 'Svenska Dagbladet', url: 'https://www.svd.se/', keywordRequired: true },
      { name: 'Dagens Nyheter', url: 'https://www.dn.se/', keywordRequired: true },
    ],
  },
  PT: {
    countryCode: 'PT',
    countryName: 'Portugal',
    outputLanguage: 'pt',
    keywords: [
      'habitacao', 'habitação', 'renda', 'arrendamento', 'inquilino', 'senhorio', 'despejo',
      'imovel', 'imóvel', 'imobiliario', 'imobiliário', 'alojamento', 'habitação social',
      'casa acessivel', 'casa acessível',
    ],
    sources: [
      { name: 'Publico', url: 'https://www.publico.pt/', keywordRequired: true },
      { name: 'Expresso', url: 'https://expresso.pt/', keywordRequired: true },
      { name: 'ECO', url: 'https://eco.sapo.pt/', keywordRequired: true },
    ],
  },
  EU: {
    countryCode: 'EU',
    countryName: 'Europe',
    outputLanguage: 'en',
    keywords: [
      'housing', 'rent', 'tenant', 'landlord', 'eviction', 'property', 'real estate',
      'social housing', 'affordable housing', 'housing crisis', 'house prices',
      'urban planning', 'urbanism',
    ],
    sources: [
      { name: 'Euronews', url: 'https://www.euronews.com/', keywordRequired: true },
      { name: 'Reuters Europe', url: 'https://www.reuters.com/world/europe/', keywordRequired: true },
      { name: 'Politico EU', url: 'https://www.politico.eu/', keywordRequired: true },
    ],
  },
};

export const AVAILABLE_COUNTRY_CODES = Object.keys(NEWS_COUNTRY_CONFIG);

export function resolveCountryCodes(countryOption) {
  const normalized = (countryOption || 'GB').trim().toUpperCase();
  if (normalized === 'ALL') {
    return [...AVAILABLE_COUNTRY_CODES];
  }
  if (!NEWS_COUNTRY_CONFIG[normalized]) {
    return [];
  }
  return [normalized];
}

export function getCountryConfig(countryCode) {
  const code = (countryCode || '').trim().toUpperCase();
  return NEWS_COUNTRY_CONFIG[code] ?? null;
}
