# Build Week eligibility boundary

## Pre-existing project

Before the submission period, Citation Cleaner already provided browser-local
Markdown cleanup, provider presets, multilingual UI, inline diff, PWA support,
a Chrome extension, and a public cleanup API. The last pre-window feature
commit was `9c375af` on July 8, 2026.

## Work added during Build Week

`Citation Fingerprint` was added on July 18, 2026 with Codex running GPT-5.6:

- provider-signature detection and confidence classification;
- evidence IDs that explain why a provider was selected;
- safer Auto-mode rule routing;
- cleanup-report UI in all nine supported interface languages;
- structured API output;
- unit and component coverage;
- judge-facing documentation, demo script, and submission copy.

## Codex collaboration

Codex (`gpt-5.6-sol`) was used to inspect the pre-existing architecture, identify the unsafe
Auto-mode behavior, design a minimal provider-fingerprint data contract,
implement the detector and UI, write tests, run the build/extension gates, and
prepare the submission package. The `/feedback` session ID for the primary
Build Week implementation thread is `019f71c5-bc9c-7160-9c57-57b1eeec0212`.

## Judge verification

```bash
git log --since="2026-07-13T09:00:00-07:00" --stat
npm install
npm test -- --run
npm run build
npm run typecheck:extension
npm run build:extension
```

Run the app at `http://localhost:3000/en`, choose Auto, load the Perplexity
sample, and inspect the Source fingerprint card. Then paste generic Markdown
with only `[1]` citations: common rules should run, while the provider remains
Unknown and provider-only rules remain disabled.
