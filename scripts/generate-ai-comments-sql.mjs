#!/usr/bin/env node
// Generates SQL INSERTs for blog_ai_comments for all posts under src/blog/posts
// Usage: node scripts/generate-ai-comments-sql.mjs > ai_comments.sql

import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const POSTS_DIR = path.join(ROOT, 'src', 'blog', 'posts');

const personaPool = [
  // Nombres
  'Alex', 'Laura', 'Juan', 'Marta', 'Carlos', 'Sofia', 'David', 'Lucia', 'Pablo', 'Ana', 'Sergio', 'Elena',
  'Diego', 'Natalia', 'Ruben', 'Paula', 'Adrian', 'Clara', 'Javier', 'Irene', 'Marcos', 'Noelia', 'Alberto',
  'Patricia', 'Raul', 'Cristina', 'Daniel', 'Monica', 'Guillermo', 'Silvia',
  // Apellidos
  'Moreno', 'Gomez', 'Perez', 'Rodriguez', 'Lopez', 'Sanchez', 'Ruiz', 'Martin', 'Navarro', 'Torres', 'Vidal',
  'Castro', 'Ferrer', 'Ortiz', 'Herrera', 'Ramos', 'Flores', 'Dominguez', 'Suarez', 'Molina', 'Blanco', 'Garcia',
  'Mendez', 'Soto', 'Romero', 'Vargas', 'Iglesias', 'Luna', 'Pena', 'Cruz',
  // Motes / nicks
  'ElGato', 'LaRubia', 'ElProfe', 'LaJefa', 'ElChino', 'LaNena', 'ElFlaco', 'ElTio', 'LaCrack', 'ElJefe',
  'LaPantera', 'ElToro', 'ElMago', 'LaBruja', 'ElMono', 'ElViejo', 'LaReina', 'ElPirata', 'ElLoco', 'LaSombra',
  'PanConQueso', 'CafeySuenos', 'SinDormir', 'SoyEse', 'OtroMas', 'NoSeQuePoner', 'DonNadie', 'HolaQueTal',
  'YoMismo', 'ElDeSiempre', 'MateYFacturas', 'PizzaLover', 'SiPeroNo', 'CasiGenio', 'MedioListo', 'AlBorde',
  'RandomUser', 'Probando123', 'TeLeo', 'SinFiltro',
  // Internet style / cortos / abstractos
  'pixelero', 'devmode', 'bitflow', 'neonwave', 'cloudmind', 'dataroot', 'nightcode', 'softlayer', 'openfile',
  'lazybyte', 'bluecursor', 'stacklife', 'darktheme', 'zerolag', 'fastclick', 'lowbattery', 'ghostuser',
  'silentmode', 'wiredmind', 'draftpost', 'mono', 'beta', 'delta', 'echo', 'nova', 'flux', 'zen', 'halo', 'core',
  'node', 'loop', 'dash', 'peak', 'wave', 'root', 'void', 'spark', 'atom', 'byte', 'link', 'bluur', 'noxx',
  'qwerty', 'zeta9', 'nuller', 'xframe', 'yaxis', 'kappa', 'rando', 'vektor', 'glitch', 'frgmnt', 'echoid',
  '_shift', 'softx', 'hardy', 'drift', 'offset', 'modulo', 'cache',
];

const hooks = [
  'Sobre "%TITLE%",',
  'Leyendo esto,',
  'Como alguien que pasó por algo similar,',
  'En mi experiencia,',
  'Gracias por el enfoque,',
];

const reactions = [
  'me parece útil, gracias por compartir.',
  'confirmo que encaja con lo que he visto en mi zona.',
  'ojo con los gastos extra, me pasó algo parecido.',
  'gran resumen, me anima a preguntar más antes de firmar.',
  'esto refleja lo que viven muchos inquilinos ahora mismo.',
];

const midPhrases = [
  'me queda claro: %SUMMARY%',
  'destaco del artículo: %SUMMARY%',
  'lo importante es %SUMMARY%',
  'me quedo con la idea principal del artículo.',
  'aporta claridad a un tema que pocos explican bien.',
];

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function buildAuthorName() {
  const first = pickRandom(personaPool);
  if (Math.random() < 0.35) {
    let second = pickRandom(personaPool);
    let guard = 0;
    while (second === first && guard < 5) {
      second = pickRandom(personaPool);
      guard += 1;
    }
    return `${first} ${second}`;
  }
  return first;
}

function randomPastDate(daysBack = 45) {
  const now = Date.now();
  const offset = Math.floor(Math.random() * daysBack * 24 * 60 * 60 * 1000);
  return new Date(now - offset).toISOString();
}

function extractField(content, field) {
  const rx = new RegExp(`${field}:\\s*['"]([^'"]+)['"]`);
  const match = content.match(rx);
  return match ? match[1] : null;
}

function escapeSql(value) {
  return value.replace(/'/g, "''");
}

function truncate(text, max = 180) {
  if (!text) return '';
  return text.length > max ? `${text.slice(0, max)}…` : text;
}

const files = fs
  .readdirSync(POSTS_DIR)
  .filter(f => f.endsWith('.ts'))
  .sort();

const rows = [];

for (const file of files) {
  const full = path.join(POSTS_DIR, file);
  const content = fs.readFileSync(full, 'utf8');
  const slug = extractField(content, 'slug') || file.replace(/\.ts$/, '');
  const title = extractField(content, 'title') || slug;
  const summary = extractField(content, 'summary') || '';

  const count = Math.max(1, Math.min(5, Math.floor(Math.random() * 5) + 1));
  for (let i = 0; i < count; i += 1) {
    const author = buildAuthorName();
    const hook = pickRandom(hooks).replace('%TITLE%', title);
    const mid = pickRandom(midPhrases).replace('%SUMMARY%', truncate(summary).toLowerCase());
    const closing = pickRandom(reactions);

    const body = `${hook} ${mid} ${closing}`.slice(0, 800);
    const createdAt = randomPastDate();

    rows.push({
      post_slug: slug,
      ordinal: i + 1,
      author_name: author,
      content: body,
      created_at: createdAt,
    });
  }
}

if (rows.length === 0) {
  console.error('No blog posts found to generate comments.');
  process.exit(1);
}

const valuesSql = rows
  .map(
    r =>
      `('${escapeSql(r.post_slug)}', ${r.ordinal}, '${escapeSql(r.author_name)}', '${escapeSql(r.content)}', '${r.created_at}')`
  )
  .join(',\n');

console.log('-- SQL seed for blog_ai_comments (auto-generated)');
console.log('-- Usage: pipe into Supabase SQL editor or psql');
console.log('begin;');
console.log(
  'insert into public.blog_ai_comments (post_slug, ordinal, author_name, content, created_at) values'
);
console.log(
  valuesSql +
    '\n' +
    'on conflict (post_slug, ordinal) do update set author_name = excluded.author_name, content = excluded.content, created_at = excluded.created_at, is_auto = true;'
);
console.log('commit;');
