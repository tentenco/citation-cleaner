# Codex Working Folder Framework

This folder is a clean working scaffold for Codex and Claude Code sessions. It
includes the local `andrej-karpathy-skills` guidance in `CLAUDE.md`, a
Codex-facing `AGENTS.md`, and a small folder structure for context, plans,
research, and local skills.

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
