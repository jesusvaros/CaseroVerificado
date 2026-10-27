/**
 * CaseroOk outreach sync: runs inside the outreach Gmail account (Google Apps Script) every
 * 15 minutes and reports, for each contact in outreach_contacts, when we wrote to them, whether
 * anyone replied in that thread and whether the email bounced. See README.md for the set-up.
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

function inspect_(target) {
  const email = target.email.toLowerCase();
  const update = { ref: target.ref };
  const threads = GmailApp.search(`in:sent to:${email}`, 0, 10);
  let sentAt = null;
  let reply = null;
  for (const thread of threads) {
    for (const message of thread.getMessages()) {
      const from = message.getFrom().toLowerCase();
      if (from.includes(ME)) {
        if (message.getTo().toLowerCase().includes(email) && (!sentAt || message.getDate() < sentAt)) sentAt = message.getDate();
      } else if (!/mailer-daemon|postmaster/.test(from) && (!reply || message.getDate() > reply.date)) {
        // Anyone else in the thread counts: replies often come from a person, not the shared address
        reply = { date: message.getDate(), text: message.getPlainBody(), thread: thread.getId() };
      }
    }
  }
  if (sentAt) update.sent_at = sentAt.toISOString();
  if (reply) {
    update.replied_at = reply.date.toISOString();
    update.message = firstLines_(reply.text);
    update.thread_url = `https://mail.google.com/mail/#all/${reply.thread}`;
  }
  if (sentAt && !reply) {
    const after = Utilities.formatDate(sentAt, 'UTC', 'yyyy/MM/dd');
    update.bounced = GmailApp.search(`from:(mailer-daemon OR postmaster) "${email}" after:${after}`, 0, 1).length > 0;
  }
  return update;
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
