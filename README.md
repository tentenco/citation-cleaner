# Citation Cleaner

**Browser-local cleanup for AI-generated Markdown, with an evidence-based source fingerprint.**

Citation Cleaner removes citation markers, source trails, tracking parameters,
and export artifacts from AI chatbot Markdown. The cleaner is deterministic,
Markdown-safe, and runs in the browser: pasted content is not uploaded.

- Live app: [citation-cleaner.vercel.app](https://citation-cleaner.vercel.app)
- Public API: [`POST /api/clean`](https://citation-cleaner.vercel.app/api/clean)
- Chrome extension: [`extension/`](extension/)

## OpenAI Build Week 2026

Citation Cleaner existed before the Build Week submission window. The eligible
Build Week extension is **Citation Fingerprint**, designed and implemented with
Codex running GPT-5.6 on July 18, 2026.

Citation Fingerprint adds:

- deterministic provider detection for ChatGPT, Claude, Gemini, AI Overview,
  Perplexity, DeepSeek, and Kimi export formats;
- confidence and concrete matching signals in the cleanup report;
- safer Auto mode that runs provider-only rules only when the fingerprint
  supports them; and
- the same structured fingerprint in the public API response.

The pre-existing/new-work boundary and verification evidence are documented in
[`hackathon/BUILD_WEEK_DELTA.md`](hackathon/BUILD_WEEK_DELTA.md).

## Product flow

```text
Pasted Markdown
      │
      ├─ protect code blocks and inline code
      ├─ fingerprint provider-specific export signatures
      ├─ apply deterministic rules allowed by source + intensity
      └─ restore code and return an explainable cleanup receipt
```

The interface includes a nine-language UI, inline word-level diff, live clean,
AI-writing heuristics, approximate token counts, share cards, persisted
settings, keyboard shortcuts, and installable PWA support.

## Local development

Requirements: Node.js 22+ and npm.

```bash
npm install
npm run dev
```

Open [http://localhost:3000/en](http://localhost:3000/en).

## Quality gates

```bash
npm test -- --run
npm run build
npm run typecheck:extension
npm run build:extension
```

## Public API

`POST /api/clean` runs the same deterministic cleaner. CORS is open.

```bash
curl -X POST https://citation-cleaner.vercel.app/api/clean \
  -H "Content-Type: application/json" \
  -d '{"markdown":"Claim [^4_1].\n\n[^4_1]: https://example.com","provider":"auto","intensity":"balanced"}'
```

The response includes the cleaned Markdown, removal statistics, applied rule
IDs, warnings, and `providerDetection`:

```json
{
  "providerDetection": {
    "provider": "perplexity",
    "confidence": "medium",
    "mode": "detected",
    "signals": ["grouped-footnotes"]
  }
}
```

`GET /api/clean` returns usage plus valid provider and intensity values.

## Chrome extension

The MV3 extension is a thin, self-contained launcher for the web cleaner. It
can pass selected text through a URL hash, which is never sent to the server.

```bash
npm run typecheck:extension
npm run build:extension
```

See [`extension/README.md`](extension/README.md) for local installation.

## Privacy and safety

- The browser UI performs cleanup locally.
- Code fences and inline code are protected before cleanup and restored after.
- Generic input does not trigger provider-specific rules without a matching
  fingerprint or an explicit provider selection.
- The public API accepts text by design; users who need local-only handling
  should use the browser interface.

## Hackathon materials

- [Build Week delta and evidence](hackathon/BUILD_WEEK_DELTA.md)
- [Devpost submission copy](hackathon/SUBMISSION.md)
- [Under-three-minute demo script](hackathon/DEMO_SCRIPT.md)
- [Implementation plan](docs/plans/2026-07-18-build-week-citation-fingerprint.md)

## License

Citation Cleaner is available under the [MIT License](LICENSE).
