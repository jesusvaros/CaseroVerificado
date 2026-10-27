import { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import type { CityArea } from '../../services/publicData/cityRent';
import { useTranslations } from '../../i18n/useTranslations';
import type { ReviewPoint } from './reviewPoints';

interface CityRentMapProps {
  areas: CityArea[];
  // Fill colour per area, indexed like `areas` (price or trend scale)
  colors: string[];
  reviewPoints: ReviewPoint[];
  onSelectReview: (id: number) => void;
  selectedId: number | null;
  onSelect: (id: number | null) => void;
}

function bounds(areas: CityArea[]): maplibregl.LngLatBounds {
  const b = new maplibregl.LngLatBounds();
  for (const area of areas) {
    const polygons = area.geometry.type === 'Polygon' ? [area.geometry.coordinates] : area.geometry.coordinates;
    for (const polygon of polygons) for (const [lng, lat] of polygon[0]) b.extend([lng, lat]);
  }
  return b;
}

// Choropleth of the reference rent per area, drawn with MapLibre directly (not through Leaflet)
// so the colours are a single paint expression and hover/selection use feature state.
const CityRentMap = ({ areas, colors, reviewPoints, onSelectReview, selectedId, onSelect }: CityRentMapProps) => {
  const { t } = useTranslations();
  const container = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const selected = useRef<number | null>(null);

  useEffect(() => {
    if (!container.current) return;
    const instance = new maplibregl.Map({
      container: container.current,
      style: 'https://tiles.openfreemap.org/styles/positron',
      bounds: bounds(areas),
      fitBoundsOptions: { padding: 24 },
      dragRotate: false,
      // The map sits in a long page: zoom with ctrl/cmd + scroll or two fingers, so scrolling moves the page
      cooperativeGestures: true,
      locale: {
        'CooperativeGesturesHandler.WindowsHelpText': t('cityPage.mapHelp.windows'),
        'CooperativeGesturesHandler.MacHelpText': t('cityPage.mapHelp.mac'),
        'CooperativeGesturesHandler.MobileHelpText': t('cityPage.mapHelp.mobile'),
      },
      attributionControl: { compact: true },
    });
    instance.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right');
    map.current = instance;

    // Same colours as the list next to the map
    const features = areas.map((a, i) => ({ ...a, properties: { ...a.properties, color: colors[i] } }));

    instance.on('load', () => {
      // The container may have been laid out after the map was created
      instance.resize();
      instance.fitBounds(bounds(areas), { padding: 24, animate: false });
      instance.addSource('areas', { type: 'geojson', data: { type: 'FeatureCollection', features } });
      instance.addLayer({
        id: 'areas-fill',
        type: 'fill',
        source: 'areas',
        paint: { 'fill-color': ['get', 'color'], 'fill-opacity': ['case', ['boolean', ['feature-state', 'selected'], false], 0.95, 0.85] },
      });
      instance.addLayer({
        id: 'areas-line',
        type: 'line',
        source: 'areas',
        paint: {
          'line-color': ['case', ['boolean', ['feature-state', 'selected'], false], '#10180F', '#FFFFFF'],
          'line-width': ['case', ['boolean', ['feature-state', 'selected'], false], 2.5, 0.8],
        },
      });
      instance.addSource('reviews', {
        type: 'geojson',
        data: { type: 'FeatureCollection', features: reviewPoints.map(p => ({ type: 'Feature', id: p.id, properties: { count: p.reviews.length }, geometry: { type: 'Point', coordinates: [p.lng, p.lat] } })) },
      });
      instance.addLayer({
        id: 'reviews',
        type: 'circle',
        source: 'reviews',
        paint: { 'circle-radius': ['case', ['>', ['get', 'count'], 1], 8, 6], 'circle-color': '#0E3B26', 'circle-stroke-width': 2, 'circle-stroke-color': '#FFFFFF' },
      });
      // Invisible wider circle so the dots are easy to hit with a finger
      instance.addLayer({ id: 'reviews-hit', type: 'circle', source: 'reviews', paint: { 'circle-radius': 16, 'circle-opacity': 0 } });
      instance.on('click', 'reviews-hit', e => {
        const id = e.features?.[0]?.id;
        if (typeof id === 'number') onSelectReview(id);
      });
      instance.on('mouseenter', 'reviews-hit', () => (instance.getCanvas().style.cursor = 'pointer'));
      instance.on('mouseleave', 'reviews-hit', () => (instance.getCanvas().style.cursor = ''));
      instance.on('click', 'areas-fill', e => {
        // A tap on a review dot opens the review, not the area underneath
        if (instance.queryRenderedFeatures(e.point, { layers: ['reviews-hit'] }).length) return;
        onSelect((e.features?.[0]?.id as number | undefined) ?? null);
      });
      instance.on('mouseenter', 'areas-fill', () => (instance.getCanvas().style.cursor = 'pointer'));
      instance.on('mouseleave', 'areas-fill', () => (instance.getCanvas().style.cursor = ''));
    });

    return () => {
      instance.remove();
      map.current = null;
    };
    // The map is built once per city; selection is synced below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [areas]);

  // Switching between price and trend repaints the same shapes
  useEffect(() => {
    const source = map.current?.getSource('areas') as maplibregl.GeoJSONSource | undefined;
    source?.setData({ type: 'FeatureCollection', features: areas.map((a, i) => ({ ...a, properties: { ...a.properties, color: colors[i] } })) });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colors]);

  useEffect(() => {
    const instance = map.current;
    if (!instance?.getSource('areas')) return;
    if (selected.current != null) instance.setFeatureState({ source: 'areas', id: selected.current }, { selected: false });
    if (selectedId != null) {
      instance.setFeatureState({ source: 'areas', id: selectedId }, { selected: true });
      const area = areas.find(a => a.id === selectedId);
      if (area) instance.fitBounds(bounds([area]), { padding: 80, maxZoom: 14 });
    }
    selected.current = selectedId;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId]);

  return <div ref={container} className="h-[420px] w-full overflow-hidden rounded-3xl md:h-[520px]" aria-hidden="true" />;
};

export default CityRentMap;
