# Refactoring Log — Firebase Unified Backend

_Date: 2026-10-28_

This document records the refactor that moved the project fully onto Firebase
as its single backend, including automated email (replacing the deprecated
Firebase "Trigger Email" extension pattern with self-managed Cloud Functions)
and a GA4-powered analytics dashboard in the admin portal.

## Why

- **Firebase Extensions are deprecated** — the managed Extensions service shuts
  down March 31, 2027 (no reconfiguration, updates, or uninstalls after that
  date). The `firestore-send-email` extension pattern (write to a `mail`
  collection → SMTP send) was reimplemented as a self-managed 2nd-gen Cloud
  Function.
- **One backend** — Firestore (posts, projects, messages, mail), Realtime
  Database (post reactions), Storage (images), Auth (admin claim), and now
  Cloud Functions for anything server-side.
- **Admin-only portal** — dashboard gated by the `admin` custom claim, for
  content management, message handling, outbound mail tracking, and analytics.

## What was added

### Firebase CLI scaffolding (new files at repo root)

- `firebase.json`, `.firebaserc` (project: `iefosa`)
- `firestore.rules` — public reads on published `posts` and all `projects`;
  everything else admin-claim only; `mail` is function-written only
- `firestore.indexes.json` — composite index for published-posts query
- `storage.rules` — public read, admin-only write
- `database.rules.json` — `reactions/{postId}` counters public read/write,
  numeric validation; everything else denied

### `functions/` — Cloud Functions (Node 20, TypeScript, v2 API)

- `processMailQueue` — Firestore trigger on `mail/{id}`; sends via Nodemailer
  through Hostinger SMTP (`smtp.hostinger.com:465`, `me@iefosa.me`) and writes
  `delivery` state (PENDING/PROCESSING/SUCCESS/ERROR + attempts) back to the
  doc. Replaces the old extension's behavior.
- `onMessageCreated` — Firestore trigger on `messages/{id}`; queues a
  notification email to the site owner (with `replyTo` = visitor) and an
  acknowledgement email to the visitor.
- `sendMail` — callable, gated by the `admin` custom claim; queues a reply
  email and marks the source message `replied: true`.
- Config: non-secret params in `functions/.env`; SMTP password via
  `firebase functions:secrets:set SMTP_PASS` (Secret Manager).

### GA4 analytics

- `@google-analytics/data` added to the app.
- `app/api/admin/analytics/route.ts` — verifies the caller's Firebase ID token
  + `admin` claim, then queries the GA4 Data API: 30-day daily
  users/sessions/pageviews, top pages, top countries, device split, totals,
  and realtime active users.
- `lib/firebase/analytics.ts` + `components/analytics-tracker.tsx` — lazily
  initializes `getAnalytics` in the browser and logs `page_view` on every App
  Router navigation (mounted in `app/layout.tsx`, wrapped in Suspense).
- Requires `GA4_PROPERTY_ID` (numeric property ID) and the Firebase service
  account granted **Viewer** on the GA4 property.

### Admin portal (`app/admin/` + `components/admin/`)

- New **Analytics** tab — stat cards (realtime users, 30d users/new, sessions,
  pageviews, avg session duration, bounce rate), 30-day traffic area chart,
  top-pages bar chart, device pie, top-countries table.
- New **Mail Log** tab — outbound queue with delivery state per message.
- **Messages** tab — Reply button per message opens `reply-dialog.tsx`, which
  calls the `sendMail` callable; replied messages get a "Replied" badge.
- Admin access remains gated by the `admin` custom claim (set by
  `scripts/create-superuser.js`).

### Fixes / cleanup

- `components/sections/contact.tsx` (homepage contact section) previously
  **simulated** submission — messages went nowhere. Now POSTs to
  `/api/contact`.
- Removed dead `submitContactMessage` from `lib/firebase/client-services.ts`.
- `lib/firebase/client.ts` — added `functions` export (region-configurable via
  `NEXT_PUBLIC_FIREBASE_FUNCTIONS_REGION`).
- `lib/firebase/admin.ts` — exports a normalized camelCase `serviceAccount`
  (also used by the GA4 client).
- `lib/types.ts` — added `MailDoc`.
- `.env.example`, `README.md`, `package.json` scripts updated
  (`functions:install`, `functions:build`, `deploy:firebase`).

### Pre-existing issue fixed during this refactor

- `FIREBASE_SERVICE_ACCOUNT_KEY_BASE64` in `.env` contained only a raw PEM
  private key (unusable — no `client_email`/`project_id`). Replaced with the
  base64 encoding of `iefosa-firebase-adminsdk.json`. **Use that same value
  for the Vercel env var.**

## Deploy steps (one-time setup)

```bash
npm i -g firebase-tools
firebase login
npm run functions:install
firebase functions:secrets:set SMTP_PASS   # Hostinger mailbox password for me@iefosa.me
npm run deploy:firebase                    # functions + rules + indexes
```

Then:

1. `GA4_PROPERTY_ID` → `.env` and Vercel env (GA → Admin → Property settings).
2. Add the Firebase service account email as **Viewer** on the GA4 property.
3. Add `NEXT_PUBLIC_FIREBASE_FUNCTIONS_REGION` / `GA4_PROPERTY_ID` to Vercel.

## Notes

- Outbound mail requires the Firebase project on the **Blaze** plan
  (functions egress).
- The `mail` collection mirrors the old extension's document shape, so any
  future mail-sending need just writes a doc there.
