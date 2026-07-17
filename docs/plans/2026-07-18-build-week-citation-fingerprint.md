# OpenAI Build Week: Citation Fingerprint

## Goal

Meaningfully extend the pre-existing Citation Cleaner during the Build Week
submission window with a deterministic, browser-local source fingerprint.

## Scope

1. Detect provider-specific export signatures when the source is set to Auto.
2. Apply provider-only cleanup rules only when the fingerprint supports them.
3. Show the resolved provider, confidence, and evidence in the cleanup report.
4. Return the same fingerprint in the public API response.
5. Document the dated extension, Codex collaboration, and judging workflow.

## Verification

- Unit tests cover positive detection, unknown input, and manual selection.
- Existing cleaner, component, analyzer, token, and diff tests remain green.
- Next.js production build succeeds.
- Chrome extension typecheck and bundle succeed.
- Live home, changelog, and `/api/clean` routes expose the new behavior after deploy.
