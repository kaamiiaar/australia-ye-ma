# Australia-ye Ma

Australia-ye Ma (استرالیای ما) is a bilingual, trust-focused discovery product for Persian-speaking people across Australia. Melbourne-e Ma (ملبورنِ ما) is the first city experience.

The current codebase is a dependency-free, mobile-first web prototype for rapid local testing and Telegram Mini App experimentation. See `VISION.md` for the product direction.

## Current focus

- Reviewed Persian-language foundational knowledge backed by authoritative Australian web sources.
- A Persian-friendly business and services directory using independently verified public facts.
- Community discovery that links people to relevant Telegram groups.
- Search, filtering, freshness, provenance, claim, correction, and removal flows.

Comprehensive live jobs, rentals, events, and marketplace feeds are deferred until users, businesses, and organisers can maintain them directly.

During bootstrap, Telegram groups and third-party directories such as `auiran.com` may identify missing topics or public business leads. At most one short manual check per day is permitted across an approved source list. It is not automated monitoring: community messages and editorial text are not copied, and every published claim or business detail must be independently verified against an authoritative or owner-controlled source.

## Run locally

```bash
python3 scripts/serve.py --port 4198
```

Then open [http://127.0.0.1:4198](http://127.0.0.1:4198).

## Files

An optional [private project Telegram receiver](scripts/telegram-context.md) can retain the owner's project discussion locally for agent context. It runs separately from the static prototype and stores its data outside the website directory.

- `VISION.md` — product purpose, scope, trust model, and long-term direction.
- `AGENTS.md` — working rules for coding agents in this repository.
- `.private/ideas-and-bugs.md` — local ignored backlog when available; never published.
- `index.html`, `styles.css`, `app.js` — the local interactive prototype.

The new Australian editorial summaries link to official sources and show their review dates. Currency rates, charts and ranges are explicitly illustrative; there is no live rate feed or transfer service. The labelled video is a short visual demo, not event footage. Existing imported directory records remain unverified, and invented listings are labelled prototype examples.

## Implemented journeys

- Home exchange overview; Iran remittance estimates in toman or IRR, both directions, amount presets, range comparisons and illustrative chart periods.
- Cross-currency converter with search, currency swap and Persian/Arabic numeral input.
- Australian news and events: compact cards, topic/search filters, detail/source metadata, related items, shareable links and persistent saves.
- Photo/video scrolling with native playback controls, captions, keyboard-accessible next/previous controls, reduced-motion support and offscreen video pausing.
- Guest access, Persian/English controls for the new screens, existing directory/community navigation and static relative assets.

## Validation and public build

```sh
node --test tests/*.test.cjs
python3 scripts/build-static.py
python3 scripts/audit-public.py
```

The preview server only serves an allowlist of public app files and assets. The build produces `dist/` from that same app surface; no `.private`, Git metadata, bot state or scripts are included. GitHub Pages may serve the static app directly or deploy this folder. Do not use a repository-root generic web server when private files exist.

Source notes and validation coverage are in `VALIDATION.md`.
