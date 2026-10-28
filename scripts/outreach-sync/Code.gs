/**
 * CaseroOk outreach sync: runs inside the outreach Gmail account (Google Apps Script) every
 * 15 minutes and reports, for each contact in outreach_contacts, when we wrote to them, whether
 * anyone replied (in that thread or in a new one), whether the reply was automatic and whether the
 * email bounced. See README.md for the set-up.
 *
 * Script properties (Project settings > Script properties), never committed:
 *   SUPABASE_ANON_KEY      the public anon key of the project
 *   OUTREACH_SYNC_SECRET   select value from private.settings where name = 'outreach_sync_secret'
 */
const SUPABASE_URL = 'https://ldicnndkdzvjsykrwtae.supabase.co';
const ME = Session.getEffectiveUser().getEmail().toLowerCase();

function sync() {
  const props = PropertiesService.getScriptProperties();
  const secret = props.getProperty('OUTREACH_SYNC_SECRET');
  const targets = rpc_('outreach_sync_targets', { p_secret: secret });
  const updates = targets.map(target => inspect_(target));
  const changed = rpc_('outreach_sync', { p_secret: secret, p_updates: updates });
  console.log(`checked ${targets.length} contacts, updated ${changed}`);
}

// Free mailboxes: a sender on the same domain is not the same organisation
const SHARED_DOMAINS = /^(gmail|googlemail|hotmail|outlook|live|yahoo|icloud|protonmail|proton)\./;
const AUTO_REPLY = /respuesta autom[aá]tica|resposta autom[aà]tica|auto.?reply|automatic reply|out of office|fuera de la oficina/i;

function inspect_(target) {
  const email = target.email.toLowerCase();
  const update = { ref: target.ref };
  let sentAt = null;
  let reply = null;
  let autoReply = null;
  const consider = (message, thread) => {
    const from = message.getFrom().toLowerCase();
    if (/mailer-daemon|postmaster/.test(from) || from.includes(ME)) return;
    const found = { date: message.getDate(), text: message.getPlainBody(), thread: thread.getId() };
    if (isAutoReply_(message)) {
      if (!autoReply || found.date > autoReply.date) autoReply = found;
    } else if (!reply || found.date > reply.date) {
      // Anyone else in the thread counts: replies often come from a person, not the shared address
      reply = found;
    }
  };

  const threads = GmailApp.search(`in:sent to:${email}`, 0, 10);
  for (const thread of threads) {
    for (const message of thread.getMessages()) {
      if (message.getFrom().toLowerCase().includes(ME)) {
        if (message.getTo().toLowerCase().includes(email) && (!sentAt || message.getDate() < sentAt)) sentAt = message.getDate();
      } else {
        consider(message, thread);
      }
    }
  }

  if (sentAt) {
    // Answers that start a new thread (auto-replies often change the subject, e.g. "Benvinguda! Re: ...")
    const after = Utilities.formatDate(sentAt, 'UTC', 'yyyy/MM/dd');
    const domain = email.split('@')[1];
    const senders = SHARED_DOMAINS.test(domain) ? email : `${email} OR @${domain}`;
    const seen = new Set(threads.map(thread => thread.getId()));
    for (const thread of GmailApp.search(`from:(${senders}) -in:sent after:${after}`, 0, 10)) {
      if (seen.has(thread.getId())) continue;
      for (const message of thread.getMessages()) if (message.getDate() > sentAt) consider(message, thread);
    }
  }

  if (sentAt) update.sent_at = sentAt.toISOString();
  if (reply) {
    update.replied_at = reply.date.toISOString();
    update.message = firstLines_(reply.text);
    update.thread_url = `https://mail.google.com/mail/#all/${reply.thread}`;
  } else if (autoReply) {
    // Shown on the contact, but it stays "Enviado": nobody has actually answered yet
    update.message = `Respuesta automática: ${firstLines_(autoReply.text)}`;
    update.thread_url = `https://mail.google.com/mail/#all/${autoReply.thread}`;
  }
  if (sentAt && !reply) {
    const after = Utilities.formatDate(sentAt, 'UTC', 'yyyy/MM/dd');
    update.bounced = GmailApp.search(`from:(mailer-daemon OR postmaster) "${email}" after:${after}`, 0, 1).length > 0;
  }
  return update;
}

function isAutoReply_(message) {
  const header = name => (message.getHeader(name) || '').toLowerCase();
  if (/auto-(replied|generated)/.test(header('Auto-Submitted'))) return true;
  if (header('X-Autoreply') || header('X-Autorespond') || /auto_reply/.test(header('Precedence'))) return true;
  return AUTO_REPLY.test(message.getSubject()) || AUTO_REPLY.test(message.getPlainBody().slice(0, 600));
}

// The reply itself, without the quoted email underneath.
function firstLines_(text) {
  const cut = text.split(/\n>|\nEl .{5,80} escribió:|\nOn .{5,80} wrote:/)[0];
  return cut.replace(/\s+/g, ' ').trim().slice(0, 400);
}

function rpc_(name, body) {
  const key = PropertiesService.getScriptProperties().getProperty('SUPABASE_ANON_KEY');
  const response = UrlFetchApp.fetch(`${SUPABASE_URL}/rest/v1/rpc/${name}`, {
    method: 'post',
    contentType: 'application/json',
    headers: { apikey: key, Authorization: `Bearer ${key}` },
    payload: JSON.stringify(body),
    muteHttpExceptions: true,
  });
  if (response.getResponseCode() >= 300) throw new Error(`${name}: ${response.getContentText()}`);
  return JSON.parse(response.getContentText());
}

// Run once by hand: authorises Gmail access and schedules sync() every 15 minutes.
function install() {
  ScriptApp.getProjectTriggers().forEach(trigger => ScriptApp.deleteTrigger(trigger));
  ScriptApp.newTrigger('sync').timeBased().everyMinutes(15).create();
  sync();
}
