#!/usr/bin/env node
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getCountryConfig } from './news-sources-config.mjs';

if (!globalThis.fetch) {
  console.error('Este script requiere Node 18 o superior con fetch disponible.');
  process.exit(1);
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

await loadDotEnv();

const [rawUrl, ...rest] = process.argv.slice(2);
if (!rawUrl) {
  console.error(
    'Uso: npm run generate:blog -- <URL> [--tone=informativo|practico|historia|empatico] [--keywords=palabras] [--date=YYYY-MM-DD] [--country=GB] [--language=en] [--includeTips=true|false] [--skipPostRefresh=true|false]'
  );
  process.exit(1);
}

const options = parseCliOptions(rest);
const tone = options.tone ?? 'informativo';
const keywords = options.keywords ?? '';
const includeTips = options.includeTips ? options.includeTips !== 'false' : true;
const publishedAt = options.date ?? new Date().toISOString().slice(0, 10);
const countryCode = (options.country ?? 'ES').toUpperCase();

const countryConfig = getCountryConfig(countryCode) ?? {
  countryCode,
  countryName: 'Spain',
  outputLanguage: 'es',
};

const language = (options.language ?? countryConfig.outputLanguage ?? 'es').toLowerCase();
const skipPostRefresh = options.skipPostRefresh === 'true';

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  console.error('OPENAI_API_KEY no está definido. Añádelo al entorno antes de ejecutar el script.');
  process.exit(1);
}

const OPENAI_ENDPOINT = process.env.OPENAI_API_URL ?? 'https://api.openai.com/v1/chat/completions';
const MODEL = process.env.BLOG_OPENAI_MODEL ?? 'gpt-4.1-mini';

function parseCliOptions(args) {
  return args.reduce((acc, item) => {
    const match = item.match(/^--([^=]+)=(.*)$/);
    if (match) {
      acc[match[1]] = match[2];
      return acc;
    }
    if (item.startsWith('--')) {
      acc[item.slice(2)] = 'true';
    }
    return acc;
  }, {});
}

async function loadDotEnv() {
  const envPath = path.resolve(__dirname, '../.env');
  try {
    const envContent = await fs.readFile(envPath, 'utf8');
    for (const line of envContent.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const [key, ...valueParts] = trimmed.split('=');
      if (!key || valueParts.length === 0) continue;
      process.env[key.trim()] = valueParts.join('=').replace(/^["']|["']$/g, '').trim();
    }
  } catch {
    // .env is optional
  }
}

function slugify(input) {
  return input
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

function decodeEntities(value) {
  return value
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&nbsp;/gi, ' ');
}

function extractArticle(html) {
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const rawTitle = titleMatch ? decodeEntities(titleMatch[1].trim()) : null;

  const ogDescriptionMatch = html.match(/<meta[^>]+property=["']og:description["'][^>]*content=["']([^"']+)["']/i);
  const metaDescriptionMatch = html.match(/<meta[^>]+name=["']description["'][^>]*content=["']([^"']+)["']/i);
  const rawDescription = ogDescriptionMatch?.[1] ?? metaDescriptionMatch?.[1] ?? null;

  const cleaned = html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ');

  const paragraphMatches = cleaned.match(/<p[^>]*>[\s\S]*?<\/p>/gi) ?? [];
  const paragraphText = paragraphMatches
    .map(p => decodeEntities(p.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()))
    .filter(Boolean)
    .join('\n\n');

  const fallback = decodeEntities(
    cleaned
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
  );

  return {
    title: rawTitle ?? undefined,
    description: rawDescription ? decodeEntities(rawDescription) : undefined,
    content: paragraphText.length > 400 ? paragraphText : fallback,
  };
}

function estimateReadingMinutes(text) {
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

function languageLabel(code) {
  const map = {
    es: 'Spanish',
    en: 'English',
    fr: 'French',
    de: 'German',
    it: 'Italian',
    nl: 'Dutch',
    sv: 'Swedish',
    pt: 'Portuguese',
  };
  return map[code] ?? 'English';
}

function toneInstruction(selectedTone) {
  switch (selectedTone) {
    case 'historia':
      return 'Use a narrative and empathetic style with practical examples from tenant life.';
    case 'practico':
      return 'Use a direct and practical style focused on concrete actions tenants can take.';
    case 'empatico':
    case 'empático':
      return 'Use a warm and empathetic style that validates stress and uncertainty faced by renters.';
    default:
      return 'Use a clear, informative and empathetic style.';
  }
}

function buildPrompts(article) {
  const tipsInstruction = includeTips
    ? "Add a final section titled 'Practical tips for tenants' with 4-5 actionable recommendations."
    : 'Avoid bulleted sections unless strictly necessary.';

  const keywordInstruction = keywords ? `SEO keywords: ${keywords}.` : '';
  const targetLanguage = languageLabel(language);

  const systemPrompt = `You are a housing policy analyst and tenant-rights writer.

Audience:
- Renters in ${countryConfig.countryName} (${countryConfig.countryCode})
- People under housing pressure who need practical guidance

Mandatory constraints:
- Write the final output entirely in ${targetLanguage}
- Produce original content, no plagiarism
- Keep legal guidance cautious: never present uncertain legal claims as absolute facts
- Length target: 900-1300 words
- Organize content with markdown headings (##)
- Explain practical impact for tenants and include concrete next steps

Return ONLY a JSON object with:
- title (max 60 chars)
- summary (max 160 chars)
- seo_title (max 60 chars)
- seo_description (max 160 chars)
- markdown (full article in markdown)`;

  const userPrompt = `Original article snapshot:
URL: ${rawUrl}
Detected title: ${article.title ?? 'Not found'}
Detected description: ${article.description ?? 'Not found'}
Extracted text (truncated):
"""
${article.content.slice(0, 5000)}
"""

${toneInstruction(tone)}
${tipsInstruction}
${keywordInstruction}

Write an original tenant-focused article for ${countryConfig.countryName}. If source details are missing, infer conservatively and avoid fabricated numbers.`;

  return { systemPrompt, userPrompt };
}

async function callOpenAI(systemPrompt, userPrompt) {
  const responseSchema = {
    type: 'object',
    properties: {
      title: { type: 'string' },
      summary: { type: 'string' },
      seo_title: { type: 'string' },
      seo_description: { type: 'string' },
      markdown: { type: 'string' },
    },
    required: ['title', 'summary', 'seo_title', 'seo_description', 'markdown'],
    additionalProperties: false,
  };

  const body = {
    model: MODEL,
    temperature: 0.6,
    response_format: {
      type: 'json_schema',
      json_schema: { name: 'blog_post', schema: responseSchema },
    },
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ],
  };

  const response = await fetch(OPENAI_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`OpenAI API error ${response.status}: ${text}`);
  }

  const json = await response.json();
  const content = json.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error('Respuesta de OpenAI inesperada (sin contenido).');
  }

  try {
    return JSON.parse(content);
  } catch (error) {
    throw new Error(
      `No se pudo parsear la respuesta de OpenAI: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}

function escapeTemplateLiteral(value) {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/`/g, '\\`')
    .replace(/\$\{/g, '\\${');
}

async function createPostFile({
  slug,
  title,
  summary,
  markdown,
  seoTitle,
  seoDescription,
  heroImageUrl,
  sourceUrl,
  readingMinutes,
  country,
  languageCode,
}) {
  const postsDir = path.resolve(__dirname, '../src/blog/posts');
  const postFile = path.resolve(postsDir, `${slug}.ts`);

  await fs.mkdir(postsDir, { recursive: true });

  const postContent = `export const post = {
  slug: '${escapeTemplateLiteral(slug)}',
  title: '${escapeTemplateLiteral(title)}',
  summary: '${escapeTemplateLiteral(summary)}',
  publishedAt: '${publishedAt}',
  language: '${escapeTemplateLiteral(languageCode)}',
  countryCode: '${escapeTemplateLiteral(country)}',${heroImageUrl ? `\n  heroImageUrl: '${escapeTemplateLiteral(heroImageUrl)}',` : ''}${seoTitle ? `\n  seoTitle: '${escapeTemplateLiteral(seoTitle)}',` : ''}${seoDescription ? `\n  seoDescription: '${escapeTemplateLiteral(seoDescription)}',` : ''}${sourceUrl ? `\n  sourceUrl: '${escapeTemplateLiteral(sourceUrl)}',` : ''}${readingMinutes ? `\n  readingMinutes: ${readingMinutes},` : ''}
  content: \`${escapeTemplateLiteral(markdown.trim())}\`,
};

export default post;
`;

  await fs.writeFile(postFile, postContent, 'utf8');
  return postFile;
}

function buildAcceptLanguage() {
  switch (language) {
    case 'fr':
      return 'fr-FR,fr;q=0.9,en;q=0.6';
    case 'de':
      return 'de-DE,de;q=0.9,en;q=0.6';
    case 'it':
      return 'it-IT,it;q=0.9,en;q=0.6';
    case 'nl':
      return 'nl-NL,nl;q=0.9,en;q=0.6';
    case 'sv':
      return 'sv-SE,sv;q=0.9,en;q=0.6';
    case 'pt':
      return 'pt-PT,pt;q=0.9,en;q=0.6';
    case 'es':
      return 'es-ES,es;q=0.9,en;q=0.6';
    default:
      return 'en-GB,en;q=0.9';
  }
}

async function run() {
  console.log(`Descargando noticia desde ${rawUrl}...`);
  const response = await fetch(rawUrl, {
    headers: {
      'User-Agent': 'CaseroOkBot/2.0 (+https://caserook.com)',
      'Accept-Language': buildAcceptLanguage(),
    },
  });

  if (!response.ok) {
    throw new Error(`No se pudo recuperar la URL (${response.status} ${response.statusText}).`);
  }

  const html = await response.text();
  const article = extractArticle(html);

  if (!article.content || article.content.length < 200) {
    throw new Error('No se pudo extraer contenido suficiente de la URL.');
  }

  const { systemPrompt, userPrompt } = buildPrompts(article);
  console.log('Solicitando redacción a OpenAI...');
  const ai = await callOpenAI(systemPrompt, userPrompt);

  const title = ai.title?.trim() || article.title || 'Blog article';
  const summary = ai.summary?.trim() || article.description || 'Pending summary.';
  const slug = slugify(title);
  const markdown = ai.markdown?.trim() || summary;
  const seoTitle = ai.seo_title?.trim() || title;
  const seoDescription = ai.seo_description?.trim() || summary;
  const heroImageUrl = `/images/blog/${slug}.jpg`;
  const readingMinutes = estimateReadingMinutes(markdown);

  const postFile = await createPostFile({
    slug,
    title,
    summary,
    markdown,
    seoTitle,
    seoDescription,
    heroImageUrl,
    sourceUrl: rawUrl,
    readingMinutes,
    country: countryConfig.countryCode,
    languageCode: language,
  });

  console.log(`Artículo creado en ${postFile}`);

  if (skipPostRefresh) {
    console.log('ℹ️ Se omitió actualización de índice/imágenes por --skipPostRefresh=true');
    return;
  }

  try {
    console.log('🔄 Actualizando índice de posts e imágenes...');
    const { generatePostsIndex } = await import('./auto-generate-posts-index.mjs');
    const { ensureImagesExist } = await import('./auto-download-images.mjs');

    await generatePostsIndex();
    await ensureImagesExist();

    console.log('✅ Índice e imágenes actualizados');
  } catch (error) {
    console.error('❌ Error en auto-actualización:', error instanceof Error ? error.message : String(error));
  }
}

run().catch(error => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
