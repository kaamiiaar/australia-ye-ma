# Australia-ye Ma — Technical Plan

## Recommendation in one sentence

Validate the directory and community-discovery loop with a local mobile web prototype, then build the production MVP as a TypeScript monorepo with an Expo mobile app, a Telegram-compatible web client, and a shared backend.

## Phase 0 — Clickable prototype (now)

Goal: test navigation, vocabulary, category priorities, visual tone, and the first user journey with the cofounding team.

- Dependency-free HTML, CSS, and JavaScript.
- Mobile-first, bilingual interface with representative Melbourne content.
- Home discovery, search and category filters, saved items, submission entry point, and profile state.
- Local mock data only; no accounts, payments, scraping, or persistent backend.
- Working listing details with trust state, source/freshness context, saving, claim, and correction entry points.
- Run locally with `python3 -m http.server 4173`.
- Publish later as-is to GitHub Pages or load the HTTPS URL inside a Telegram Mini App.

This prototype is intentionally disposable at the code level. Its information architecture and tested interaction decisions are the reusable output.

## Phase 1 — Production foundation

Suggested stack:

- **Mobile:** Expo + React Native + TypeScript, starting with iOS and retaining Android support.
- **Web / Telegram Mini App:** React + Vite + TypeScript.
- **Backend:** Supabase initially (Postgres, authentication, storage, row-level security, realtime where useful).
- **Admin:** a small React web console for moderation and verification.
- **Search:** Postgres full-text and trigram search first; add Typesense or Algolia only when relevance or scale requires it.
- **Maps:** Mapbox or Google Maps behind a provider abstraction.
- **Analytics:** privacy-conscious product analytics such as PostHog, with events defined around successful connections.
- **Monitoring:** Sentry for client and server errors.

Repository shape:

```text
apps/
  mobile/          Expo iOS + Android app
  web/             browser + Telegram Mini App
  admin/           moderation and operations
packages/
  domain/          types, validation, ranking rules
  api-client/      typed backend access
  design-tokens/   colour, spacing, typography
  i18n/            Persian and English copy
supabase/
  migrations/      schema and policies
  functions/       trusted server-side operations
```

Share domain logic, validation, API clients, translations, and design tokens. Do not force full UI sharing between native and web clients.

## Core data model

- `users` — account, locale, city, roles, trust state.
- `organisations` — business, community, university club, organiser, employer.
- `listings` — common searchable record with type, title, description, location, contact method, source, verification, freshness, and moderation state.
- `business_profiles` — categories, service areas, languages, opening hours.
- `events` — times, venue, organiser, capacity, expiry.
- `communities` — purpose, eligibility, platform/join link, activity state.
- `jobs` — employer, work type, location, salary text, sponsorship evidence state, expiry.
- `marketplace_items` — price, condition, pickup area, status, expiry.
- `articles` — bilingual editorial content and review metadata.
- `submissions` — raw user/organiser input awaiting validation.
- `claims` — ownership-verification workflow.
- `reports` — correction, safety, spam, and removal requests.
- `saved_items` and `contact_events` — private user actions and success measurement.

Use one common `listings` search surface with typed detail tables. Every public record needs `status`, `source_url`, `source_checked_at`, `published_at`, `expires_at`, and `verification_status` where applicable.

## Import and content pipeline

Treat import as an editorial pipeline, not an uncontrolled scraper:

```text
Permitted source / submission
  -> raw staging record
  -> deduplication and normalisation
  -> personal-data minimisation
  -> automated quality checks
  -> human review for new sources
  -> publish as unverified or verified
  -> expiry / periodic re-check
```

Priority sources:

1. Direct submissions from businesses and organisers.
2. Partnerships with university clubs and community admins.
3. Public official websites, event feeds, and permitted APIs.
4. Manual research with source attribution.
5. Automated collection only after source terms, robots rules, rate limits, privacy, and data rights have been reviewed.

Telegram should initially be an **inbound channel**: a bot lets admins or users submit a business, event, job, or group through a structured form. Avoid bulk scraping channel histories. The bot can later notify opted-in users about saved searches or listing updates.

## Search and ranking

Start with understandable ranking:

- query relevance;
- distance or selected suburb/city;
- category and language match;
- verified and recently checked records;
- upcoming time for events;
- quality/completeness score;
- explicit sponsored boost only inside labelled sponsored positions.

Do not rank by paid status invisibly. Add behavioural ranking only after enough real usage exists and protect against popularity feedback loops.

## Authentication and safety

- Allow anonymous browsing.
- Use email magic links and Apple/Google sign-in for saving or submitting.
- Telegram identity may link to an account but should not be the only identity method.
- Require stronger checks for business claims, job posts, and marketplace sellers.
- Keep phone/email hidden until the user chooses to contact where practical.
- Add rate limits, spam controls, audit logs, report/block tools, and moderator roles before public user-generated content.
- For sponsorship jobs, display `Employer states sponsorship may be available`; never independently promise visa eligibility without evidence.

## Delivery sequence

### Milestone 1 — Melbourne discovery MVP

- Business, event, community, and guide discovery.
- Search, city/suburb and category filters.
- Listing detail, source, freshness, report, and claim flows.
- Saved items and direct outbound contact.
- Admin review and content expiry.
- Persian and English UI.

### Milestone 2 — Community contribution

- Structured submissions on web/app and via Telegram bot.
- Organiser/business dashboards.
- Verification workflow and notifications.
- Instagram and Telegram publishing workflow from approved content.

### Milestone 3 — Opportunity and marketplace

- Jobs with expiry, employer checks, and sponsorship wording controls.
- Second-hand listings with seller safety, reporting, and moderation.
- Community join requests or clearly attributed external join links.

### Milestone 4 — Native growth

- Ship the Expo app to TestFlight, then the App Store.
- Validate Android and release to Google Play.
- Add push notifications for opted-in saved searches and nearby events.

## Decisions to validate before production build

- Product name and domain availability.
- Persian-first versus automatic locale selection.
- Whether Melbourne starts broad or with a narrower newcomer/student wedge.
- Which listing types deliver weekly repeat use.
- Moderation ownership and response-time promise.
- Conditions for verified status.
- Whether contact happens off-platform initially (recommended) or through in-app messaging.

## Explicit non-goals for the first MVP

- In-app payments or escrow.
- Open user reviews and star ratings.
- In-app chat.
- Automated immigration advice.
- A nationwide launch before Melbourne supply is strong.
- Bulk ingestion of private groups or personal contact data.
