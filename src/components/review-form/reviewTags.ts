// One-tap tags on a review. Keep in sync with valid_review_tags() in supabase/migrations.
export const REVIEW_TAGS = [
  { id: 'responde_rapido', tone: 'good' },
  { id: 'arregla_averias', tone: 'good' },
  { id: 'trato_correcto', tone: 'good' },
  { id: 'luminoso', tone: 'good' },
  { id: 'vecinos_tranquilos', tone: 'good' },
  { id: 'humedades', tone: 'bad' },
  { id: 'ruido', tone: 'bad' },
  { id: 'frio_calor', tone: 'bad' },
  { id: 'averias_sin_arreglar', tone: 'bad' },
  { id: 'subidas_renta', tone: 'bad' },
  { id: 'cobros_indebidos', tone: 'bad' },
  { id: 'entra_sin_avisar', tone: 'bad' },
] as const;

export type ReviewTag = (typeof REVIEW_TAGS)[number]['id'];

export const tagTone = (id: string) => REVIEW_TAGS.find(t => t.id === id)?.tone ?? 'good';
