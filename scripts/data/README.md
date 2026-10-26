# Public data

Static files under `public/data/`, served by Vercel next to the app. They are rebuilt by hand when the sources publish a new edition; nothing runs at build time.

| File | Source | Refresh |
|---|---|---|
| `zonas/<province>.json` | Reference rents per census section, district and municipality: [SERPAVI](https://www.mivau.gob.es/vivienda/alquila-bien-es-tu-derecho/serpavi) (Ministerio de Vivienda y Agenda Urbana). Section shapes: INE 2021 census sections, the ones SERPAVI uses. Annual change: INE rental price index (IPVA, table 59060). | Once a year, when SERPAVI publishes (around March or April). |
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
```

Keep the 2021 sections even when INE publishes newer ones: SERPAVI codes its data on the 2021 sectioning.

## Rebuild the stressed markets

```bash
curl -A 'Mozilla/5.0' -H 'Accept: text/html' -o /tmp/zonas.html \
  https://www.mivau.gob.es/vivienda/alquila-bien-es-tu-derecho/serpavi/consultar-zonas-de-mercado-residencial-tensionado
python3 -I scripts/data/build_tensioned_zones.py /tmp/zonas.html public/data/zonas public/data/tensionadas.json
```

Names the script cannot match are printed as `UNMATCHED`; add them to `MANUAL` with their INE code.
