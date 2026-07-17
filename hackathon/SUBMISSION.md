# Devpost submission copy

## Core fields

- **Project name:** Citation Cleaner
- **Track:** Work & Productivity
- **Tagline:** Clean AI-generated Markdown locally — with evidence for every provider-specific decision.
- **Live demo:** https://citation-cleaner.vercel.app
- **Repository:** https://github.com/tentenco/citation-cleaner
- **Demo video:** https://youtu.be/hoH3wjwR00M
- **Primary Codex /feedback Session ID:** `019f71c5-bc9c-7160-9c57-57b1eeec0212`

## Inspiration

AI answers are easy to generate and surprisingly hard to publish. Copying from
ChatGPT, Claude, Gemini, Perplexity, or AI Overviews often brings citation
markers, hidden footnotes, source trails, tracking links, and provider-specific
export artifacts. Existing cleanup workflows either upload sensitive drafts or
use broad regexes that can silently remove real content.

## What it does

Citation Cleaner turns AI-generated Markdown into review-ready copy entirely
in the browser. It protects code, removes deterministic citation and export
artifacts, shows an inline diff, and reports every applied rule.

Our Build Week extension, Citation Fingerprint, makes Auto mode explainable. It
detects concrete provider signatures, reports confidence and matching evidence,
and only enables provider-specific rules when the fingerprint supports them.
Generic citation syntax stays generic; users can always select a source
manually. The public API returns the same structured detection receipt.

## How we built it

The project uses Next.js, React, TypeScript, Vitest, and a Manifest V3 Chrome
extension. The cleaner is a deterministic rule pipeline: protect Markdown code,
resolve the source fingerprint, apply rules allowed by source and intensity,
restore code, and return output plus an audit trail.

Citation Fingerprint was designed and implemented with Codex running GPT-5.6
during the submission window. Codex audited the pre-existing architecture,
identified that Auto mode previously enabled every provider-specific rule,
designed the fingerprint contract, implemented the detector and multilingual
report, added tests, and ran the production and extension quality gates.

## Challenges we ran into

- A citation pattern alone rarely proves which model produced the text.
- Detection had to remain conservative so Auto mode fails closed.
- The UI supports nine languages, so the new audit trail could not be an
  English-only bolt-on.
- The product promises local privacy while also exposing an optional public API;
  the documentation must make that boundary explicit.

## Accomplishments that we're proud of

- Auto mode now requires evidence before applying provider-only rules.
- Every source decision exposes confidence and concrete matching signals.
- Generic input remains Unknown instead of being over-classified.
- The same detector powers the browser UI and public API.
- The existing app, API, PWA, and extension remain runnable and tested.

## What we learned

Explainability matters even for a small text utility. A safe automation tool
should expose not only what it changed, but why it believed a specialized rule
was appropriate.

## What's next

User-contributed fingerprint fixtures, signed rule-pack releases, more export
formats, and a downloadable cleanup receipt for editorial review systems.

## Built with

typescript, next.js, react, vitest, chrome-extension, pwa, codex, gpt-5.6

## Testing instructions

Open the live app and choose the Perplexity sample. The cleanup report should
show Perplexity with detection evidence. Paste generic text with `[1]` markers
to see the source remain Unknown. For local testing, follow the README quality
gates; no account or API key is required.
