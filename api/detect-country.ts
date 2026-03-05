interface VercelRequest {
  method?: string;
  headers: { [key: string]: string | string[] | undefined };
}

interface VercelResponse {
  status(code: number): VercelResponse;
  json(data: unknown): void;
}

const DOMAIN_SUFFIX_TO_COUNTRY_CODE: Array<{ suffix: string; countryCode: string }> = [
  { suffix: '.co.uk', countryCode: 'GB' },
  { suffix: '.uk', countryCode: 'GB' },
  { suffix: '.es', countryCode: 'ES' },
  { suffix: '.fr', countryCode: 'FR' },
  { suffix: '.it', countryCode: 'IT' },
  { suffix: '.de', countryCode: 'DE' },
  { suffix: '.pt', countryCode: 'PT' },
  { suffix: '.ie', countryCode: 'IE' },
];

function readHeader(headers: VercelRequest['headers'], key: string): string | null {
  const value = headers[key];
  if (Array.isArray(value)) return value[0] ?? null;
  return typeof value === 'string' ? value : null;
}

function normalizeCountryCode(value: string | null): string | null {
  if (!value) return null;
  const normalized = value.trim().toUpperCase();
  if (!/^[A-Z]{2}$/.test(normalized)) return null;
  return normalized;
}

function detectCountryFromHost(host: string | null): string | null {
  if (!host) return null;
  const normalized = host.toLowerCase();

  const match = DOMAIN_SUFFIX_TO_COUNTRY_CODE.find(entry => normalized.endsWith(entry.suffix));
  return match?.countryCode ?? null;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const vercelCountry = normalizeCountryCode(
    readHeader(req.headers, 'x-vercel-ip-country')
  );
  if (vercelCountry) {
    return res.status(200).json({ countryCode: vercelCountry, source: 'x-vercel-ip-country' });
  }

  const cloudflareCountry = normalizeCountryCode(readHeader(req.headers, 'cf-ipcountry'));
  if (cloudflareCountry) {
    return res.status(200).json({ countryCode: cloudflareCountry, source: 'cf-ipcountry' });
  }

  const hostCountry = detectCountryFromHost(readHeader(req.headers, 'host'));
  if (hostCountry) {
    return res.status(200).json({ countryCode: hostCountry, source: 'domain' });
  }

  return res.status(200).json({ countryCode: null, source: 'unknown' });
}
