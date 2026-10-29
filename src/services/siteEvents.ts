import { supabaseWrapper } from './supabase/client';

// First-party, anonymous analytics for the admin dashboard (table site_events). Nothing is stored
// in the browser: the id is random per visit and lives in memory, so no consent is needed. Outreach
// emails link with ?ref=<contact>; the ref seen on landing is kept for the rest of the visit, so a
// review written after browsing still counts for that email.

// The review_* events after review_form_opened are the form funnel, in order. They carry no form content.
type SiteEvent =
  | 'session_start'
  | 'review_form_opened'
  | 'review_address_set'
  | 'review_scores_set'
  | 'review_opinion_started'
  | 'review_submit_clicked'
  | 'review_submit_invalid'
  | 'review_saved'
  | 'review_login_shown'
  | 'review_submitted';

const REF_PATTERN = /^[a-z0-9-]{1,60}$/;
const NO_TRACK_KEY = 'caserook:no-track';
const ADMIN_EMAIL = 'xjesusvr@gmail.com';
// Search engines and link previews run the page's JavaScript too; Vercel Analytics drops them, so do we
const BOT_UA = /bot|crawl|spider|slurp|headless|lighthouse|preview|facebookexternalhit|whatsapp|bytespider|petalbot|gptbot|claude|perplexity/i;

const visitor = typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : null;
let ref: string | null = null;
let started = false;
const sent = new Set<SiteEvent>();

function noTrack() {
  if (navigator.webdriver || BOT_UA.test(navigator.userAgent)) return true;
  try {
    return window.localStorage.getItem(NO_TRACK_KEY) === '1';
  } catch {
    return false;
  }
}

// detail: only the ids of the fields that blocked a submit (review_submit_invalid)
export function trackSiteEvent(event: SiteEvent, detail?: string) {
  const client = supabaseWrapper.getClient();
  if (!client || !visitor || noTrack()) return;
  const params = new URLSearchParams(window.location.search);
  const landingRef = params.get('ref')?.toLowerCase();
  if (!ref && landingRef && REF_PATTERN.test(landingRef)) ref = landingRef;
  const referrer = document.referrer ? new URL(document.referrer).hostname : null;
  void client
    .from('site_events')
    .insert({
      event,
      visitor,
      path: window.location.pathname.slice(0, 300),
      referrer_host: referrer && referrer !== window.location.hostname ? referrer.slice(0, 120) : null,
      ref,
      utm_source: params.get('utm_source')?.slice(0, 60) ?? null,
      utm_campaign: params.get('utm_campaign')?.slice(0, 60) ?? null,
      detail: detail ?? null,
    })
    .then(({ error }) => {
      if (error && import.meta.env.DEV) console.warn('site event failed', error.message);
    });
}

// Funnel steps count once per visit, however many times the field is edited.
export function trackSiteEventOnce(event: SiteEvent) {
  if (sent.has(event)) return;
  sent.add(event);
  trackSiteEvent(event);
}

// Once per visit, on the landing page. Waits for the stored login (read locally, no request) so the
// admin's own visits are skipped from the very first page, not only after the auth provider loads.
export async function trackSessionStart() {
  if (started) return;
  started = true;
  if (new URLSearchParams(window.location.search).has('notrack')) excludeThisBrowser();
  const { data } = (await supabaseWrapper.getClient()?.auth.getSession()) ?? { data: null };
  if (data?.session?.user.email === ADMIN_EMAIL) excludeThisBrowser();
  trackSiteEvent('session_start');
}

// The admin's own browsing should not show up in the numbers (set on the admin's device only).
export function excludeThisBrowser() {
  try {
    window.localStorage.setItem(NO_TRACK_KEY, '1');
  } catch {
    // private mode: the admin's visits will be counted, which is harmless
  }
}

// A review saved before login is counted as submitted only once its author confirms the email,
// which can happen on another page load (the login email link lands on /auth/callback).
const AWAITING_LOGIN_KEY = 'caserook:review-awaiting-login';

export function markReviewAwaitingLogin() {
  try {
    window.localStorage.setItem(AWAITING_LOGIN_KEY, '1');
  } catch {
    // private mode: the confirmation from the email link will not be counted
  }
}

export function trackReviewConfirmed() {
  try {
    if (window.localStorage.getItem(AWAITING_LOGIN_KEY) !== '1') return;
    window.localStorage.removeItem(AWAITING_LOGIN_KEY);
  } catch {
    return;
  }
  trackSiteEvent('review_submitted');
}
