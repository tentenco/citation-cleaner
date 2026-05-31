# Codex Working Folder Framework

This folder is a clean working scaffold for Codex and Claude Code sessions. It
includes the local `andrej-karpathy-skills` guidance in `CLAUDE.md`, a
Codex-facing `AGENTS.md`, and a small folder structure for context, plans,
research, and local skills.

## Citation Cleaner app

A browser-local tool that strips citations, source trails, and tracking clutter
from AI chatbot Markdown. Everything runs client-side — no uploads, no account.

Features:

- **9-language UI** with automatic browser-language detection and redirect.
- **AI-ness analysis** — a deterministic, English-tuned score that flags common
  AI tells (clichés, hedging, em-dash density), plus an approximate token count.
- **Live clean**, **inline word-level diff**, persisted settings, and a
  ⌘/Ctrl+Enter shortcut.
- **Shareable result card** generated locally (stats only — content never leaves
  the browser).
- Installable as a PWA.

### Public API

`POST /api/clean` runs the same deterministic cleaner. CORS is open.

```bash
curl -X POST https://cleaner.tenten.dev/api/clean \
  -H "Content-Type: application/json" \
  -d '{"markdown": "Answer [1].\n\nSources:\n1. https://example.com", "provider": "perplexity", "intensity": "balanced"}'
```

`GET /api/clean` returns usage and the valid `provider` / `intensity` values.

## What Is Included

- `CLAUDE.md`: project memory plus the Karpathy guidelines from the installed
  `andrej-karpathy-skills` plugin.
- `AGENTS.md`: Codex-facing instructions that point back to `CLAUDE.md`.
- `.codex/skills/karpathy-guidelines/SKILL.md`: local Codex skill copy.
- `.claude/skills/karpathy-guidelines/SKILL.md`: local Claude skill copy.
- `.claude/settings.json`: minimal Claude Code settings.
- `docs/context/`, `docs/plans/`, `docs/research/`: durable workspace notes.

## Use

1. Add project-specific context to `CLAUDE.md`.
2. Add repeatable commands to both `CLAUDE.md` and `AGENTS.md`.
3. Put long-lived notes in `docs/context/`.
4. Put implementation plans in `docs/plans/`.
5. Put research and inspection output in `docs/research/`.
