# Public data

Static files under `public/data/`, served by Vercel next to the app. They are rebuilt by hand when the sources publish a new edition; nothing runs at build time.

| File | Source | Refresh |
|---|---|---|
| `zonas/<province>.json` | Reference rents per census section, district and municipality: [SERPAVI](https://www.mivau.gob.es/vivienda/alquila-bien-es-tu-derecho/serpavi) (Ministerio de Vivienda y Agenda Urbana). Section shapes: INE 2021 census sections, the ones SERPAVI uses. Annual change: INE rental price index (IPVA, table 59060). | Once a year, when SERPAVI publishes (around March or April). |
| `historico/<province>.json` | SERPAVI history 2011–2024 per municipality, district and census section (flats; houses for municipalities and districts), from the same SERPAVI file. Loaded only when someone opens "Ver los datos". Built by `build_rent_history.py`. | With `zonas/`, once a year. |
| `mercado-historico/<province>.json` | Rent in new contracts year by year: INCASÒL yearly average since 2007 (Catalonia) and the median Valencian deposit since 2020, by municipality and postcode. The current year is partial. Built by `build_market_history.py`. | Monthly, by `.github/workflows/market-data.yml`. |
| `tensionadas.json` | Stressed rental markets declared under Ley 12/2023, from the [Ministry list](https://www.mivau.gob.es/vivienda/alquila-bien-es-tu-derecho/serpavi/consultar-zonas-de-mercado-residencial-tensionado). | Every quarter, after each BOE resolution. |

Building facts are not stored: the app asks the Catastro services directly (see `src/services/publicData/catastro.ts`).

## Rebuild the rent zones

Both downloads need a browser User-Agent; without it the Ministry CDN answers 403.

```bash
UA='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/130 Safari/537.36'
mkdir -p /tmp/serpavi && cd /tmp/serpavi
# The file name changes with each edition: copy the current link from the SERPAVI page
curl -A "$UA" -o serpavi.xlsx 'https://cdn.mivau.gob.es/portal-web-mivau/vivienda/serpavi/2026-03_09_bd_SERPAVI_2011-2024%20-%20DEFINITIVO%20WEB_v2.xlsx'
curl -A "$UA" -o secc.zip 'https://cdn.mivau.gob.es/portal-web-mivau/vivienda/serpavi/SECC_CE_20210101_INE_WM.zip'
curl -o ipva.json 'https://servicios.ine.es/wstempus/js/ES/DATOS_TABLA/59060?nult=2&tip=AM'
unzip -o secc.zip -d shp
npx mapshaper@0.6.102 shp/SECC_CE_20210101_INE_WM.shp encoding=utf8 -proj wgs84 \
  -filter-fields CUSEC,CUDIS,CUMUN,CPRO,NMUN -simplify 12% keep-shapes planar \
  -split CPRO -o sections/ format=geojson precision=0.00001
cd -
python3 -I scripts/data/build_rent_zones.py /tmp/serpavi/serpavi.xlsx /tmp/serpavi/sections /tmp/serpavi/ipva.json public/data/zonas
python3 -I scripts/data/build_rent_history.py /tmp/serpavi/serpavi.xlsx public/data/historico
```

Keep the 2021 sections even when INE publishes newer ones: SERPAVI codes its data on the 2021 sectioning.

## Rebuild the stressed markets

```bash
curl -A 'Mozilla/5.0' -H 'Accept: text/html' -o /tmp/zonas.html \
  https://www.mivau.gob.es/vivienda/alquila-bien-es-tu-derecho/serpavi/consultar-zonas-de-mercado-residencial-tensionado
python3 -I scripts/data/build_tensioned_zones.py /tmp/zonas.html public/data/zonas public/data/tensionadas.json
```

Names the script cannot match are printed as `UNMATCHED`; add them to `MANUAL` with their INE code.

## Rebuild the neighbourhood maps (Madrid and Barcelona)

Other cities show census sections straight from `zonas/<province>.json`; only cities with official neighbourhood shapes get a file in `public/data/ciudades/` (listed in `CITY_FILES` in `src/services/publicData/cityRent.ts`).

```bash
cd /tmp/serpavi
# Madrid: 131 barrios, Ayuntamiento de Madrid, CC BY 4.0
curl -A "$UA" -o madrid.topo.json 'https://geoportal.madrid.es/fsdescargas/IDEAM_WBGEOPORTAL/LIMITES_ADMINISTRATIVOS/Barrios/TopoJSON/Barrios.json'
npx mapshaper@0.6.102 madrid.topo.json -rename-fields id=COD_BAR,name=NOMBRE,district=NOMDIS \
  -filter-fields id,name,district -simplify 20% keep-shapes -o madrid.geojson format=geojson precision=0.00001

# Barcelona: 73 barris, Ajuntament de Barcelona, CC BY 4.0 (the "geojson" download is a zip, in EPSG:25831)
curl -L -A "$UA" -o bcn.zip 'https://opendata-ajuntament.barcelona.cat/data/dataset/808daafa-d9ce-48c0-925a-fa5afdb1ed41/resource/cd800462-f326-429f-a67a-c69b7fc4c50a/download'
unzip -o bcn.zip -d bcn
npx mapshaper@0.6.102 bcn/0301100100_UNITATS_ADM_POLIGONS.json -filter "TIPUS_UA == 'BARRI'" \
  -each "id=DISTRICTE+BARRI, name=NOM, district=DISTRICTE" -filter-fields id,name,district \
  -proj wgs84 init=EPSG:25831 -simplify 20% keep-shapes -o barcelona.geojson format=geojson precision=0.00001
# district is a code here: replace it with nom_districte from the BarcelonaCiutat_Barris.json resource
cd -

python3 -I scripts/data/build_city_barrios.py /tmp/serpavi/madrid.geojson 28079 public/data/zonas \
  public/data/ciudades/madrid.json "barrios del Ayuntamiento de Madrid (CC BY 4.0)" public/data/historico
python3 -I scripts/data/build_city_barrios.py /tmp/serpavi/barcelona.geojson 08019 public/data/zonas \
  public/data/ciudades/barcelona.json "barris de l'Ajuntament de Barcelona (CC BY 4.0)" public/data/historico
```

## Rebuild the municipality index

After rebuilding the rent zones, refresh the list used by the city search and the city pages:

```bash
python3 -I scripts/data/build_municipality_index.py public/data/zonas public/data/municipios.json
```

## Current market data (automatic, monthly)

`public/data/mercado/<province>.json` is rebuilt on the 5th of every month by `.github/workflows/market-data.yml`, which commits to `main` (and so redeploys). Run it by hand from the Actions tab ("Market data" › Run workflow).

| Figure | Source | Lag |
|---|---|---|
| Sale €/m² (appraised value), ~306 municipalities over 25,000 inhabitants | Ministerio de Vivienda, `sedal/35103500.XLS` | ~3 months (quarterly) |
| Number of home sales, every municipality | Ministerio de Vivienda, `sedal/34010210.XLS` | ~3 months (quarterly) |
| Monthly rent from this year's deposits, by municipality and postcode | Generalitat Valenciana, dataset `viv-reg-fia-<year>` | ~1 month |
| Monthly rent from deposits, by municipality | INCASÒL (Catalonia), Socrata `qww9-bvhh` | ~4 months (quarterly) |

The build fails (and nothing is committed) if coverage drops below the minimums in `MIN_COVERAGE`, which is what happens when a source changes its layout. Names that cannot be matched to an INE code are printed as `UNMATCHED`; add the important ones to `ALIASES`.

Not usable: the Notariado's postcode sale prices (their terms forbid reuse without written permission) and anything scraped from Idealista or Fotocasa. There is no open rent data newer than SERPAVI 2024 for Madrid or Andalusia.
