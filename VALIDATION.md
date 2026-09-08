# Prototype validation — 8 September 2026

## Scope implemented

| Journey | Implementation | Validation |
|---|---|---|
| Home exchange entry | Sample rate strip near the top, category shortcut and overview links | Browser navigation and responsive layout |
| Exchange overview | Iran/world entry cards, four selected currencies, information-only notice | Browser navigation; IRR explicitly shown in rials |
| Iran remittance | Both directions, toman/IRR units, presets, clear, low/average/high estimate and quote, four chart periods | Unit tests and browser: 5,000 AUD → 940,000,000 toman / 9,400,000,000 IRR; inverse → 5,000 AUD |
| World currencies | Ten currencies, pair selection, swap, amount conversion and search | Unit cross-rate and round-trip tests; browser 100 AUD → 66 USD, swapped 100 USD → 151.52 AUD; JPY search |
| Australian news | Three concise independent summaries, topic/search filters, source/review metadata, detail, related cards and source policy | Browser filters, no-result state, keyboard entry, direct story reload and saved persistence |
| Photo/video mode | Scroll snapping, next/previous, native video controls, captions, offscreen/hidden playback pause | Browser loaded and played the five-second demo (readyState 4, duration/currentTime 5), next-story scrolling |
| Community connection | Existing Telegram community links, topic filters and unverified metadata | Browser student filter and navigation regression |

## Additional checks

- `node --test tests/*.test.cjs`: cross-rate conversions, Persian/Arabic digits and separators, invalid/negative/oversized inputs, toman/rial scaling, inverse estimate ordering.
- JavaScript syntax checks for app, data, features and exchange files.
- Browser: directory search and keyboard activation; selected listing and story survive direct-link reload; news save survives reload; Persian RTL and English LTR; existing visa category/back navigation.
- New pages inspected in narrow phone and desktop layouts. Actual CSS viewport dimensions were read from the DOM because browser zoom differs from requested viewport dimensions. No page-level horizontal overflow or broken loaded images was found in checked views.
- New public-file-only preview server returns 200 for the app/media and 404 for `.private`, `.git`, `.env`, scripts and encoded traversal attempts.
- Public build is generated from an explicit allowlist. Build audit checks local asset references, forbidden paths and common credential patterns. Tracked and non-ignored candidate files also scanned without printing secrets.

## Sources checked for new editorial summaries

- [Melbourne Royal Show](https://royalshow.com.au/): 24 September–4 October 2026, Melbourne Showgrounds.
- [Melbourne Fringe festival FAQ](https://www.melbournefringe.com.au/festival-info/festival-faqs): 29 September–18 October 2026.
- [City of Melbourne climate pop-ups](https://participate.melbourne.vic.gov.au/climate-and-environment-strategy/pop-ups): Queen Victoria Market F Shed, 12 September 12:30–14:30.

Review dates are not presented as source publication dates. Example headlines and rate claims from design references are not republished as current facts. General sports and unrelated world news are excluded from the new editorial collection.

## Product limits

This remains a dependency-free static prototype. Exchange rates, percentage changes, ranges and chart history are illustrative; there is no live feed, quote service or money transfer. The demo clip is generated from an existing app image and explicitly labelled as an illustration, not event footage. News is manually selected, not comprehensive monitoring. Existing sign-in, submissions and moderation buttons remain prototype placeholders; the older visa workflow remains Persian-first. Browser testing here does not claim device-lab coverage of every Telegram/iOS/Android WebView.
