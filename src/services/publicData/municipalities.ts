import { slugify } from '../../utils/slugify';

// Every municipality with an official reference rent (public/data/municipios.json,
// built by scripts/data/build_municipality_index.py).

export interface Municipality {
  slug: string;
  name: string;
  cumun: string;
  p50: number;
  contracts: number;
}

interface IndexFile {
  municipalities: [string, string, string, number, number][];
  aliases: Record<string, string>;
}

let index: Promise<{ list: Municipality[]; bySlug: Map<string, Municipality>; aliases: Record<string, string> }> | null = null;

function loadIndex() {
  index ??= fetch('/data/municipios.json')
    .then(res => (res.ok ? (res.json() as Promise<IndexFile>) : { municipalities: [], aliases: {} }))
    .catch(() => ({ municipalities: [], aliases: {} }) as IndexFile)
    .then(file => {
      const list = file.municipalities.map(([slug, name, cumun, p50, contracts]) => ({ slug, name, cumun, p50, contracts }));
      return { list, bySlug: new Map(list.map(m => [m.slug, m])), aliases: file.aliases };
    });
  return index;
}

export async function findMunicipality(slug: string): Promise<Municipality | null> {
  const { bySlug, aliases } = await loadIndex();
  return bySlug.get(slug) ?? bySlug.get(aliases[slug] ?? '') ?? null;
}

// Canonical slug for any spelling we may get (review city names come from the geocoder).
export async function canonicalCitySlug(slug: string): Promise<string> {
  return (await findMunicipality(slug))?.slug ?? slug;
}

// Prefix matches first, then anywhere in the name; bigger rental markets first.
export async function searchMunicipalities(query: string, limit = 8): Promise<Municipality[]> {
  const q = slugify(query);
  if (q.length < 2) return [];
  const { list } = await loadIndex();
  const starts = list.filter(m => m.slug.startsWith(q) || slugify(m.name).startsWith(q));
  const contains = list.filter(m => !starts.includes(m) && slugify(m.name).includes(q));
  return [...starts, ...contains].slice(0, limit);
}

// Largest rental markets first (by number of contracts in SERPAVI).
export async function topMunicipalities(limit: number): Promise<Municipality[]> {
  return (await loadIndex()).list.slice(0, limit);
}
