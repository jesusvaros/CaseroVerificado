#!/usr/bin/env node
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import {
  AVAILABLE_COUNTRY_CODES,
  COMMON_EXCLUDE_KEYWORDS,
  GLOBAL_HOUSING_KEYWORDS,
  getCountryConfig,
  resolveCountryCodes,
} from './news-sources-config.mjs';

if (!globalThis.fetch) {
  console.error('Este script requiere Node 18 o superior con fetch disponible.');
  process.exit(1);
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.resolve(__dirname, '../data');
const GLOBAL_PROCESSED_URLS_FILE = path.resolve(DATA_DIR, 'processed-urls-global.json');
const RUN_STATE_FILE = path.resolve(DATA_DIR, 'country-run-state.json');

await fs.mkdir(DATA_DIR, { recursive: true });
await loadDotEnv();

const cli = parseCliOptions(process.argv.slice(2));
const countryCodes = resolveCountryCodes(cli.country);
if (countryCodes.length === 0) {
  console.error(
    `País inválido en --country. Usa uno de: ${AVAILABLE_COUNTRY_CODES.join(', ')} o ALL.`
  );
  process.exit(1);
}

const executionOptions = {
  tone: cli.tone ?? 'informativo',
  includeTips: cli.includeTips ? cli.includeTips !== 'false' : true,
  date: cli.date ?? new Date().toISOString().slice(0, 10),
  maxPerSource: asPositiveInt(cli.maxPerSource, 3),
  maxPerCountry: asPositiveInt(cli.maxPerCountry, 5),
  everyDays: asPositiveInt(cli.everyDays, 3),
  force: cli.force === 'true',
  dryRun: cli.dryRun === 'true',
};

const BLOCKED_FILE_EXTENSIONS = [
  '.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.ico', '.pdf', '.xml', '.rss', '.mp4', '.mp3', '.zip', '.js',
  '.css',
];

const BLOCKED_PATH_SEGMENTS = new Set([
  'video', 'videos', 'live', 'podcast', 'podcasts', 'newsletter', 'newsletters', 'author', 'authors',
  'tag', 'tags', 'topic', 'topics', 'category', 'categories', 'search', 'buscar', 'suche', 'cerca', 'recherche',
]);

async function loadDotEnv() {
  const envPath = path.resolve(__dirname, '../.env');
  try {
    const envContent = await fs.readFile(envPath, 'utf8');
    for (const line of envContent.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const [key, ...rest] = trimmed.split('=');
      if (!key || rest.length === 0) continue;
      process.env[key.trim()] = rest.join('=').replace(/^["']|["']$/g, '').trim();
    }
  } catch {
    // .env is optional.
  }
}

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

function asPositiveInt(value, fallback) {
  const parsed = Number.parseInt(String(value ?? ''), 10);
  if (!Number.isFinite(parsed) || parsed <= 0) return fallback;
  return parsed;
}

function countryProcessedFile(countryCode) {
  return path.resolve(DATA_DIR, `processed-urls-${countryCode.toLowerCase()}.json`);
}

async function loadJson(filePath, fallback) {
  try {
    const raw = await fs.readFile(filePath, 'utf8');
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

async function saveJson(filePath, data) {
  await fs.writeFile(filePath, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
}

async function loadProcessedSet(filePath) {
  const value = await loadJson(filePath, []);
  return new Set(Array.isArray(value) ? value : []);
}

function normalizeText(value) {
  const decoded = safeDecode(value ?? '');
  return decoded
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function safeDecode(value) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function normalizeHost(hostname) {
  return hostname.toLowerCase().replace(/^www\./, '');
}

function normalizeUrlCandidate(raw, sourceUrl) {
  if (!raw) return null;
  if (raw.startsWith('#') || raw.startsWith('mailto:') || raw.startsWith('tel:') || raw.startsWith('javascript:')) {
    return null;
  }

  let url;
  try {
    url = new URL(raw, sourceUrl);
  } catch {
    return null;
  }

  if (!['http:', 'https:'].includes(url.protocol)) return null;

  url.hash = '';
  const trackingParams = ['fbclid', 'gclid', 'mc_cid', 'mc_eid', 'ref'];
  for (const key of [...url.searchParams.keys()]) {
    if (key.startsWith('utm_') || trackingParams.includes(key)) {
      url.searchParams.delete(key);
    }
  }
  if (!url.searchParams.toString()) {
    url.search = '';
  }

  url.pathname = url.pathname.replace(/[)\]\"',.;:]+$/g, '');
  if (url.pathname !== '/' && url.pathname.endsWith('/')) {
    url.pathname = url.pathname.slice(0, -1);
  }

  return url.toString();
}

function extractCandidateUrls(html, sourceUrl) {
  const urls = [];
  const seen = new Set();

  const addUrl = (raw) => {
    const normalized = normalizeUrlCandidate(raw, sourceUrl);
    if (!normalized || seen.has(normalized)) return;
    seen.add(normalized);
    urls.push(normalized);
  };

  const hrefRegex = /href\s*=\s*["']([^"']+)["']/gi;
  let hrefMatch;
  while ((hrefMatch = hrefRegex.exec(html)) !== null) {
    addUrl(hrefMatch[1]);
  }

  const absoluteRegex = /https?:\/\/[^\s"'<>]+/gi;
  let absoluteMatch;
  while ((absoluteMatch = absoluteRegex.exec(html)) !== null) {
    addUrl(absoluteMatch[0]);
  }

  return urls;
}

function belongsToSourceDomain(candidateUrl, sourceUrl) {
  try {
    const sourceHost = normalizeHost(new URL(sourceUrl).hostname);
    const candidateHost = normalizeHost(new URL(candidateUrl).hostname);
    return (
      candidateHost === sourceHost ||
      candidateHost.endsWith(`.${sourceHost}`) ||
      sourceHost.endsWith(`.${candidateHost}`)
    );
  } catch {
    return false;
  }
}

function isLikelyArticleUrl(candidateUrl, sourceUrl) {
  try {
    const candidate = new URL(candidateUrl);
    const source = new URL(sourceUrl);

    if (candidate.pathname === source.pathname) return false;

    const lowerPath = candidate.pathname.toLowerCase();
    if (BLOCKED_FILE_EXTENSIONS.some(ext => lowerPath.endsWith(ext))) return false;

    const segments = candidate.pathname.split('/').filter(Boolean);
    if (segments.length === 0) return false;

    const last = segments[segments.length - 1].toLowerCase();
    if (BLOCKED_PATH_SEGMENTS.has(last)) return false;
    if (last.length < 5) return false;

    return segments.length >= 3 || /[-\d]/.test(last);
  } catch {
    return false;
  }
}

function isRelevantUrl(candidateUrl, source, includeKeywords, excludeKeywords) {
  if (!isLikelyArticleUrl(candidateUrl, source.url)) return false;

  const normalized = normalizeText(candidateUrl);
  const hasExcludedKeyword = excludeKeywords.some(keyword =>
    normalized.includes(normalizeText(keyword))
  );
  if (hasExcludedKeyword) return false;

  const hasIncludedKeyword = includeKeywords.some(keyword =>
    normalized.includes(normalizeText(keyword))
  );

  if (source.keywordRequired === false) return true;
  return hasIncludedKeyword;
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function buildAcceptLanguage(outputLanguage) {
  switch (outputLanguage) {
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

async function extractRelevantUrlsFromSource(source, countryConfig) {
  const response = await fetch(source.url, {
    headers: {
      'User-Agent': 'CaseroOkBot/2.0 (+https://caserook.com)',
      'Accept-Language': buildAcceptLanguage(countryConfig.outputLanguage),
    },
  });

  if (!response.ok) {
    throw new Error(`Error fetching ${source.url}: ${response.status}`);
  }

  const html = await response.text();
  const candidates = extractCandidateUrls(html, source.url).filter(url =>
    belongsToSourceDomain(url, source.url)
  );

  const includeKeywords = uniqueValues([
    ...GLOBAL_HOUSING_KEYWORDS,
    ...countryConfig.keywords,
    ...(source.keywords ?? []),
  ]);

  const excludeKeywords = uniqueValues([
    ...COMMON_EXCLUDE_KEYWORDS,
    ...(countryConfig.excludeKeywords ?? []),
  ]);

  return candidates.filter(url =>
    isRelevantUrl(url, source, includeKeywords, excludeKeywords)
  );
}

function uniqueValues(values) {
  const seen = new Set();
  const output = [];
  for (const value of values) {
    const normalized = normalizeText(value);
    if (!normalized || seen.has(normalized)) continue;
    seen.add(normalized);
    output.push(value);
  }
  return output;
}

async function generateBlogPost(articleUrl, options) {
  const args = [
    'scripts/generate-blog-post.mjs',
    articleUrl,
    `--tone=${options.tone}`,
    `--keywords=${options.keywords}`,
    `--date=${options.date}`,
    `--country=${options.countryCode}`,
    `--language=${options.language}`,
    `--includeTips=${String(options.includeTips)}`,
    '--skipPostRefresh=true',
  ];

  return new Promise(resolve => {
    const child = spawn('node', args, {
      cwd: path.resolve(__dirname, '..'),
      stdio: 'inherit',
    });

    child.on('close', (code) => resolve(code === 0));
    child.on('error', () => resolve(false));
  });
}

function daysSince(isoDateTime) {
  if (!isoDateTime) return Number.POSITIVE_INFINITY;
  const timestamp = Date.parse(isoDateTime);
  if (!Number.isFinite(timestamp)) return Number.POSITIVE_INFINITY;
  const diffMs = Date.now() - timestamp;
  return diffMs / (1000 * 60 * 60 * 24);
}

function shouldRunCountry(lastRunAt, everyDays, force) {
  if (force) return true;
  return daysSince(lastRunAt) >= everyDays;
}

async function refreshBlogArtifacts() {
  const { generatePostsIndex } = await import('./auto-generate-posts-index.mjs');
  const { ensureImagesExist } = await import('./auto-download-images.mjs');
  await generatePostsIndex();
  await ensureImagesExist();
}

async function runCountry(countryCode, sharedState) {
  const countryConfig = getCountryConfig(countryCode);
  if (!countryConfig) {
    return { countryCode, skipped: true, reason: 'País no configurado', generated: 0 };
  }

  const lastRunAt = sharedState.runState[countryCode]?.lastRunAt;
  if (!shouldRunCountry(lastRunAt, executionOptions.everyDays, executionOptions.force)) {
    const pendingDays = executionOptions.everyDays - daysSince(lastRunAt);
    return {
      countryCode,
      skipped: true,
      reason: `Aún no toca (faltan ${Math.max(0, pendingDays).toFixed(1)} días para cumplir ${executionOptions.everyDays}).`,
      generated: 0,
    };
  }

  console.log(`\n🌍 Procesando ${countryConfig.countryName} (${countryCode})...`);

  const countryProcessedPath = countryProcessedFile(countryCode);
  const countryProcessed = await loadProcessedSet(countryProcessedPath);

  let generatedCount = 0;
  let discoveredCount = 0;
  let globalTouched = false;
  let countryTouched = false;
  let successfulSources = 0;

  const keywordString = uniqueValues([...GLOBAL_HOUSING_KEYWORDS, ...countryConfig.keywords]).join(', ');

  for (const source of countryConfig.sources) {
    if (generatedCount >= executionOptions.maxPerCountry) break;

    console.log(`\n🔎 Fuente: ${source.name}`);

    let relevantUrls = [];
    try {
      relevantUrls = await extractRelevantUrlsFromSource(source, countryConfig);
      successfulSources += 1;
    } catch (error) {
      console.error(`❌ Error en ${source.name}: ${error instanceof Error ? error.message : String(error)}`);
      continue;
    }

    discoveredCount += relevantUrls.length;

    const newUrls = relevantUrls
      .filter(url => !countryProcessed.has(url) && !sharedState.globalProcessed.has(url))
      .slice(0, executionOptions.maxPerSource);

    console.log(`📰 Relevantes: ${relevantUrls.length} | Nuevas: ${newUrls.length}`);

    for (const url of newUrls) {
      if (generatedCount >= executionOptions.maxPerCountry) break;

      if (executionOptions.dryRun) {
        console.log(`[DRY RUN] Generaría post: ${url}`);
        generatedCount += 1;
        continue;
      }

      console.log(`📝 Generando post para: ${url}`);
      const success = await generateBlogPost(url, {
        tone: executionOptions.tone,
        keywords: keywordString,
        date: executionOptions.date,
        countryCode,
        language: countryConfig.outputLanguage,
        includeTips: executionOptions.includeTips,
      });

      if (success) {
        generatedCount += 1;
        countryProcessed.add(url);
        sharedState.globalProcessed.add(url);
        countryTouched = true;
        globalTouched = true;
        console.log('✅ Post generado');
      } else {
        console.log('❌ Falló la generación del post');
      }

      await delay(1500);
    }
  }

  if (!executionOptions.dryRun && countryTouched) {
    await saveJson(countryProcessedPath, [...countryProcessed]);
  }

  if (!executionOptions.dryRun && successfulSources > 0) {
    sharedState.runState[countryCode] = {
      lastRunAt: new Date().toISOString(),
      discoveredCount,
      generatedCount,
    };
  }

  return {
    countryCode,
    skipped: false,
    generated: generatedCount,
    discovered: discoveredCount,
    globalTouched,
    countryTouched,
  };
}

async function runDailyAutomation() {
  console.log('🚀 Iniciando automatización de blog por países...');
  console.log(`📅 Fecha: ${new Date().toISOString().slice(0, 10)}`);
  console.log(`⏱️ Frecuencia por país: cada ${executionOptions.everyDays} días`);
  console.log(`🌐 Países: ${countryCodes.join(', ')}`);

  const globalProcessed = await loadProcessedSet(GLOBAL_PROCESSED_URLS_FILE);
  const runState = await loadJson(RUN_STATE_FILE, {});
  const sharedState = { globalProcessed, runState };

  const results = [];
  let totalGenerated = 0;
  let shouldRefreshArtifacts = false;

  for (const countryCode of countryCodes) {
    const result = await runCountry(countryCode, sharedState);
    results.push(result);
    totalGenerated += result.generated ?? 0;
    shouldRefreshArtifacts = shouldRefreshArtifacts || Boolean(result.globalTouched);
  }

  if (!executionOptions.dryRun) {
    await saveJson(RUN_STATE_FILE, sharedState.runState);
    await saveJson(GLOBAL_PROCESSED_URLS_FILE, [...sharedState.globalProcessed]);
  }

  if (!executionOptions.dryRun && shouldRefreshArtifacts) {
    console.log('\n🔄 Actualizando índice de posts e imágenes...');
    await refreshBlogArtifacts();
  }

  console.log('\n📊 Resumen por país:');
  for (const result of results) {
    if (result.skipped) {
      console.log(`   - ${result.countryCode}: omitido (${result.reason})`);
    } else {
      console.log(
        `   - ${result.countryCode}: ${result.generated} posts generados, ${result.discovered} URLs relevantes detectadas`
      );
    }
  }

  console.log(`\n✅ Total posts generados: ${totalGenerated}`);
  if (executionOptions.dryRun) {
    console.log('ℹ️ Modo dry-run: no se guardaron cambios.');
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  runDailyAutomation().catch(error => {
    console.error('❌ Error fatal en automatización:', error instanceof Error ? error.message : String(error));
    process.exit(1);
  });
}

export { runDailyAutomation };
