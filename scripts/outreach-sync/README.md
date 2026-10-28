# Outreach sync

`Code.gs` is a Google Apps Script that lives in the outreach mailbox (caserook@gmail.com). Every
15 minutes it looks at Gmail and updates `outreach_contacts` through two RPCs protected by a
shared secret:

- **Enviado**: there is a message we sent to the contact's address (its date becomes `sent_at`).
- **Respondió**: someone other than us wrote in that thread, or in a new thread from the contact's
  address or domain after we wrote (the first lines are stored, with a link to the thread).
- **Respuesta automática**: an out-of-office or "we're saturated" auto-reply. Its text shows on the
  contact, but the status stays "Enviado" until a person answers.
- **Rebotó**: a delivery failure mentioning the address arrived after we wrote.

"Interesado" and "No interesado" stay manual in `/admin?tab=contactos`; the sync never overwrites them.

## Set-up (once)

1. In script.google.com, signed in as caserook@gmail.com, create a project and paste `Code.gs`.
2. Project settings > Script properties:
   - `SUPABASE_ANON_KEY`: the anon key (Supabase > Project settings > API).
   - `OUTREACH_SYNC_SECRET`: the result of
     `select value from private.settings where name = 'outreach_sync_secret';` in the SQL editor.
3. Run `install` once and accept the permissions (read Gmail, connect to Supabase, run on a timer).
