# Citation Cleaner — demo video script

Target: 2:30–2:45, public YouTube, English narration, no copyrighted music.

## 0:00–0:20 — The publishing problem

**Screen:** Citation Cleaner home, empty workspace.

**Narration:**
“AI answers are easy to generate and messy to publish. Copying from ChatGPT,
Claude, Gemini, or Perplexity often brings citation markers, hidden footnotes,
source trails, and tracking links. Citation Cleaner removes that clutter locally,
without uploading the draft.”

## 0:20–0:55 — Clean a real export

**Screen:** Click the Perplexity sample, show raw and cleaned Markdown, enable
Inline diff.

**Narration:**
“Load a provider sample and the deterministic cleaner protects code, removes
export artifacts, and shows exactly what changed. The report counts citations,
footnotes, source blocks, tracking links, and every rule that ran.”

## 0:55–1:35 — Build Week feature: Citation Fingerprint

**Screen:** Focus the Source fingerprint card. Show Perplexity, High confidence,
and evidence pills. Then reset, paste generic citation text, and clean again.

**Narration:**
“For OpenAI Build Week we added Citation Fingerprint. Auto mode now looks for
concrete provider signatures and exposes the confidence and evidence behind the
decision. If the text only contains generic citations, the source stays Unknown
and provider-only rules stay off. That makes automation safer and explainable.”

## 1:35–1:55 — Local privacy and API

**Screen:** Show the Local only badge, then briefly show the README API response.

**Narration:**
“The browser workflow stays on-device and needs no account. Teams that opt into
server processing can call the public API and receive the same structured
fingerprint and cleanup receipt.”

## 1:55–2:30 — How Codex and GPT-5.6 built it

**Screen:** Terminal with the July 18 git diff, detector tests, and green build;
README Build Week section and session ID.

**Narration:**
“Citation Cleaner existed before the challenge. During the submission window I
used Codex running GPT-5.6 to audit the old Auto behavior, design a conservative
fingerprint contract, implement the detector and nine-language report, write
tests, and verify the web app and Chrome extension. The dated commit history,
Build Week delta, and Codex session ID are public in the repo.”

## 2:30–2:40 — Close

**Screen:** Return to the cleaned result and fingerprint card.

**Narration:**
“Citation Cleaner turns AI copy into publishable Markdown — and now every
provider-specific decision comes with evidence.”

## Capture checklist

- Run `npm run dev` and record `http://localhost:3000/en` at 1440×900.
- Use the built-in Perplexity sample, then a prepared generic-citation sample.
- Keep the video under three minutes.
- Show the July 18 commit and tests, not pre-window work as if it were new.
- Export the local master before uploading to YouTube.
