type CountryMapView = {
  center: [number, number];
  zoom: number;
};

const COUNTRY_MAP_DEFAULTS: Record<string, CountryMapView> = {
  ES: { center: [40.416775, -3.70379], zoom: 6 },
  GB: { center: [51.5072, -0.1276], zoom: 7 },
  IE: { center: [53.3498, -6.2603], zoom: 7 },
  US: { center: [39.8283, -98.5795], zoom: 4 },
  FR: { center: [48.8566, 2.3522], zoom: 6 },
  DE: { center: [52.52, 13.405], zoom: 6 },
  PT: { center: [38.7223, -9.1393], zoom: 7 },
  IT: { center: [41.9028, 12.4964], zoom: 6 },
};

export function getCountryDefaultMapView(countryCode: string | null | undefined): CountryMapView {
  if (!countryCode) return COUNTRY_MAP_DEFAULTS.ES;
  return COUNTRY_MAP_DEFAULTS[countryCode.toUpperCase()] ?? COUNTRY_MAP_DEFAULTS.ES;
}
