# Working Agreement for Coding Agents

## Product context

Australia-ye Ma (استرالیای ما) is a bilingual, trust-focused local discovery product for Persian-speaking people across Australia. Melbourne is the first launch city and appears in-product as Melbourne-e Ma (ملبورنِ ما). Read `VISION.md`, `TECHNICAL_PLAN.md`, and `.private/ideas-and-bugs.md` (when available locally) before making product or architecture changes. Treat the private ideas-and-bugs file as the shared lightweight backlog: add discoveries, unresolved product ideas, and reproducible bugs there as work progresses.

Private Telegram community research lives under `.private/telegram/` when available locally. Keep observed facts separate from hypotheses and do not mark a source as reviewed without recording the review date. Never move invite links, private research, copied community material, or internal notes into tracked files.

## Current stage

The current app is a dependency-free mobile web prototype. Optimise it for quick local iteration and user testing. Do not add a framework, backend, authentication, scraper, deployment service, or paid dependency unless the user explicitly asks.

## Product rules

- Browsing must work without an account.
- Support Persian RTL and English LTR; do not hard-code layout direction into components.
- Use realistic Australian and Melbourne concepts, but clearly label invented prototype content.
- Never imply that an imported business, organiser, or employer endorses the platform.
- Default imported records to unverified and show source/freshness metadata.
- Never represent sponsorship or migration eligibility as guaranteed.
- Do not collect or expose unnecessary personal information.
- Do not scrape private groups or bulk-scrape Telegram channel histories.
- Sponsored results must be visibly labelled.

## Engineering rules

- Keep changes small and directly tied to a testable user journey.
- Prefer semantic HTML, accessible controls, keyboard support, and touch targets of at least 44px.
- Keep mobile performance strong and avoid unnecessary libraries.
- Keep mock content separate from rendering logic.
- Preserve GitHub Pages compatibility: static assets must use relative paths.
- Preserve Telegram WebView compatibility: avoid browser APIs without fallbacks and account for safe-area insets.
- Never commit credentials, tokens, production personal data, or copied private-community content.
- Update documentation when architecture, trust policy, or scope changes.

## Validation

For prototype changes, verify:

1. The app loads from a simple local static server.
2. Core navigation, search, filters, save actions, and language direction work.
3. The layout works at narrow phone width and desktop width.
4. There are no obvious console errors or broken local assets.
