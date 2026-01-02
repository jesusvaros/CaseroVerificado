import type { StaticBlogPost } from './posts';
import { blogPosts } from './posts';

// Categorías basadas en palabras clave comunes en los títulos
const categories = {
  alquiler: ['alquiler', 'alquileres', 'inquilino', 'inquilinos', 'vivienda', 'piso', 'pisos', 'casa', 'casas'],
  derechos: ['derechos', 'derecho', 'proteger', 'protegerse', 'protección', 'legal', 'ley', 'contrato'],
  economia: ['ahorrar', 'ahorro', 'economía', 'bolsillo', 'precio', 'precios', 'coste', 'gastos', 'subida'],
  regiones: ['madrid', 'barcelona', 'sevilla', 'córdoba', 'andalucía', 'españa', 'cataluña', 'valencia'],
  ayudas: ['ayuda', 'ayudas', 'subvención', 'subsidio', 'bono', 'deducción', 'beneficio'],
  jovenes: ['joven', 'jóvenes', 'jovenes', 'universitario', 'estudiante'],
  vulnerable: ['vulnerable', 'vulnerables'],
  hipotecas: ['hipoteca', 'hipotecas', 'euribor', 'banco', 'banca'],
  crisis: ['crisis', 'emergencia', 'dificultad', 'dificultades', 'problema'],
  politica: ['gobierno', 'política', 'ministerio', 'congreso', 'ley', 'nueva'],
  turistico: ['turístico', 'turistica', 'airbnb', 'vacacional', 'plataforma'],
  construccion: ['construcción', 'construir', 'obra', 'nueva', 'nuevas'],
  fiscal: ['impuestos', 'fiscal', 'irpf', 'renta', 'tributos', 'iba', 'ibi'],
};

function categorizePost(post: StaticBlogPost): string[] {
  const title = post.title.toLowerCase();
  const summary = post.summary?.toLowerCase() || '';
  const content = post.content.toLowerCase();
  const fullText = `${title} ${summary} ${content}`;
  
  const postCategories: string[] = [];
  
  for (const [category, keywords] of Object.entries(categories)) {
    if (keywords.some(keyword => fullText.includes(keyword))) {
      postCategories.push(category);
    }
  }
  
  return postCategories.length > 0 ? postCategories : ['general'];
}

function calculateRelevanceScore(post1: StaticBlogPost, post2: StaticBlogPost): number {
  const categories1 = categorizePost(post1);
  const categories2 = categorizePost(post2);
  
  // Puntuación por categorías compartidas
  const sharedCategories = categories1.filter(cat => categories2.includes(cat));
  let score = sharedCategories.length * 10;
  
  // Puntuación por palabras clave en títulos
  const words1 = post1.title.toLowerCase().split(/\s+/);
  const words2 = post2.title.toLowerCase().split(/\s+/);
  const sharedWords = words1.filter(word => word.length > 3 && words2.includes(word));
  score += sharedWords.length * 5;
  
  // Penalización por antigüedad (posts más recientes tienen ligera ventaja)
  const date1 = new Date(post1.publishedAt);
  const date2 = new Date(post2.publishedAt);
  const daysDiff = Math.abs(date1.getTime() - date2.getTime()) / (1000 * 60 * 60 * 24);
  score += Math.max(0, 10 - daysDiff / 365) * 0.1;
  
  return score;
}

export function getRelatedPosts(
  currentPost: StaticBlogPost,
  excludePosts: StaticBlogPost[] = [],
  count: number = 3
): StaticBlogPost[] {
  // Excluir el post actual y los posts ya excluidos
  const excludeSlugs = new Set([
    currentPost.slug,
    ...excludePosts.map(p => p.slug)
  ]);
  
  // Filtrar posts disponibles
  const availablePosts = blogPosts.filter(post => !excludeSlugs.has(post.slug));
  
  // Calcular puntuación de relevancia para cada post
  const postsWithScore = availablePosts.map(post => ({
    post,
    score: calculateRelevanceScore(currentPost, post)
  }));
  
  // Ordenar por puntuación y tomar los mejores
  postsWithScore.sort((a, b) => b.score - a.score);
  
  return postsWithScore
    .slice(0, count)
    .map(item => item.post);
}

export function getRelatedPostsBatch(
  currentPost: StaticBlogPost,
  counts: { top: number; middle: number; bottom: number }
): { top: StaticBlogPost[]; middle: StaticBlogPost[]; bottom: StaticBlogPost[] } {
  const topPosts = getRelatedPosts(currentPost, [], counts.top);
  const middlePosts = getRelatedPosts(currentPost, topPosts, counts.middle);
  const bottomPosts = getRelatedPosts(currentPost, [...topPosts, ...middlePosts], counts.bottom);
  
  return {
    top: topPosts,
    middle: middlePosts,
    bottom: bottomPosts
  };
}
