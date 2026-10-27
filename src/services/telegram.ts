import type { FormDataType } from '../store/formTypes';

// Prefer calling our serverless function. If VITE_TELEGRAM_WEBHOOK_URL is set,
// we will call that instead (useful for staging or custom backends).
const WEBHOOK_URL = (import.meta.env.VITE_TELEGRAM_WEBHOOK_URL as string | undefined) || '/api/notify-telegram';

const safe = (val?: string | number | boolean | null) =>
  val === undefined || val === null || val === '' ? '-' : String(val);

export function buildReviewSummary(sessionId: string, userId: string, data: FormDataType) {
  const addr = data.addressDetails;
  const addressLine = addr?.fullAddress
    || [addr?.street, addr?.number, addr?.floor, addr?.door, addr?.city]
      .filter(Boolean)
      .join(' ');

  const lines = [
    `✅ Nueva reseña finalizada` ,
    `Session: ${sessionId}`,
    `User: ${userId}`,
    '',
    `Dirección: ${safe(addressLine)}`,
    `Años: ${safe(data.startYear)} - ${safe(data.endYear ?? 'Presente')}`,
    `Precio: ${safe(data.price)} · ${safe(data.sizeM2)} m²`,
    `Fianza devuelta: ${safe(data.depositReturned)}`,
    '',
    `Notas: casero ${safe(data.ownerScore)} · vivienda ${safe(data.propertyScore)} · edificio ${safe(data.buildingScore)} · zona ${safe(data.areaScore)}`,
    '',
    `Etiquetas: ${data.tags?.length ? data.tags.join(', ') : '-'}`,
    '',
    `Opinión: ${safe(data.opinion)}`,
  ];

  // Optional contact info (commented out to avoid sending PII by default)
  // lines.push('', '— Contacto —', `Nombre: ${safe(data.contactName)}`, `Email: ${safe(data.contactEmail)}`);

  return lines.join('\n');
}

async function sendViaWebhook(payload: unknown) {
  if (!WEBHOOK_URL) return false;
  try {
    const res = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      // Helps the browser keep sending the request during navigation
      // (payload must remain small for keepalive to work reliably)
      keepalive: true as any,
    });
    return res.ok;
  } catch (err) {
    console.warn('Webhook notify failed', err);
    return false;
  }
}

export async function notifyReviewCompleted(sessionId: string, userId: string, data: FormDataType) {
  const text = buildReviewSummary(sessionId, userId, data);

  // Call our webhook/serverless function only (no direct Telegram from client)
  const sent = await sendViaWebhook({
    type: 'review_completed',
    sessionId,
    userId,
    summary: text,
    formData: data,
    ts: new Date().toISOString(),
  });
  return sent;
}
