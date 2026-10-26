import { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import type { CityArea } from '../../services/publicData/cityRent';
import { rentColor } from './rentScale';

interface CityRentMapProps {
  areas: CityArea[];
  breaks: number[];
  reviewPoints: [number, number][];
  selectedId: number | null;
  onSelect: (id: number | null) => void;
}

function bounds(areas: CityArea[]): maplibregl.LngLatBoundsLike {
  const b = new maplibregl.LngLatBounds();
  for (const area of areas) {
    const polygons = area.geometry.type === 'Polygon' ? [area.geometry.coordinates] : area.geometry.coordinates;
    for (const polygon of polygons) for (const [lng, lat] of polygon[0]) b.extend([lng, lat]);
  }
  return b;
}

// Choropleth of the reference rent per area, drawn with MapLibre directly (not through Leaflet)
// so the colours are a single paint expression and hover/selection use feature state.
const CityRentMap = ({ areas, breaks, reviewPoints, selectedId, onSelect }: CityRentMapProps) => {
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
      attributionControl: { compact: true },
    });
    instance.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right');
    map.current = instance;

    // Same colours as the list next to the map
    const features = areas.map(a => ({ ...a, properties: { ...a.properties, color: rentColor(a.properties.p50, breaks) } }));

    instance.on('load', () => {
      instance.addSource('areas', { type: 'geojson', data: { type: 'FeatureCollection', features } });
      instance.addLayer({
        id: 'areas-fill',
        type: 'fill',
        source: 'areas',
        paint: { 'fill-color': ['get', 'color'], 'fill-opacity': ['case', ['boolean', ['feature-state', 'selected'], false], 0.95, 0.75] },
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
        data: { type: 'FeatureCollection', features: reviewPoints.map(([lng, lat]) => ({ type: 'Feature', properties: {}, geometry: { type: 'Point', coordinates: [lng, lat] } })) },
      });
      instance.addLayer({
        id: 'reviews',
        type: 'circle',
        source: 'reviews',
        paint: { 'circle-radius': 6, 'circle-color': '#0E3B26', 'circle-stroke-width': 2, 'circle-stroke-color': '#FFFFFF' },
      });
      instance.on('click', 'areas-fill', e => onSelect((e.features?.[0]?.id as number | undefined) ?? null));
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

  useEffect(() => {
    const instance = map.current;
    if (!instance?.getSource('areas')) return;
    if (selected.current != null) instance.setFeatureState({ source: 'areas', id: selected.current }, { selected: false });
    if (selectedId != null) instance.setFeatureState({ source: 'areas', id: selectedId }, { selected: true });
    selected.current = selectedId;
  }, [selectedId]);

  return <div ref={container} className="h-[420px] w-full overflow-hidden rounded-3xl md:h-[520px]" aria-hidden="true" />;
};

export default CityRentMap;
