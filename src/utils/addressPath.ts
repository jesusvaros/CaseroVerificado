import { slugify } from './slugify';

// Public page of an address: /direccion/<city>/<street-number>. Floor and door are never part of it.
export function addressSlug(street?: string | null, number?: string | null) {
  return slugify(`${street ?? ''} ${number ?? ''}`);
}

export function addressPath(city?: string | null, street?: string | null, number?: string | null) {
  if (!city || !street || !number) return null;
  return `/direccion/${slugify(city)}/${addressSlug(street, number)}`;
}
