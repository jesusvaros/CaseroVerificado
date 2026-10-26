export interface ReviewScores {
  owner_score?: number | null;
  property_score?: number | null;
  building_score?: number | null;
  area_score?: number | null;
}

export const SCORE_LABELS: [keyof ReviewScores, string][] = [
  ['owner_score', 'Casero'],
  ['property_score', 'Vivienda'],
  ['building_score', 'Edificio'],
  ['area_score', 'Zona'],
];

export const hasScores = (scores?: ReviewScores | null) =>
  !!scores && SCORE_LABELS.some(([key]) => typeof scores[key] === 'number');
