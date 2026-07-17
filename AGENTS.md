# Codex Working Folder Guide

Read `CLAUDE.md` first. It is the canonical project memory for this folder and
contains the imported `andrej-karpathy-skills` guidance.

## Operating Rules

- Apply the Karpathy guidelines from `CLAUDE.md` to coding, review, refactoring,
  and planning work in this folder.
- Prefer small, verifiable changes over broad rewrites.
- State assumptions when the request could reasonably mean more than one thing.
- Keep durable notes in `docs/` instead of leaving important context only in chat.
- Add project-specific commands to `CLAUDE.md` and this file once a real
  codebase is added.

## Folder Map

```text
.codex/skills/                 Codex-local skills copied or adapted for this workspace
.claude/agents/                Optional Claude Code subagent definitions
.claude/commands/              Optional Claude Code slash commands
.claude/skills/                Optional Claude-local skills
docs/context/                  Durable project context
docs/plans/                    Implementation plans and task breakdowns
docs/research/                 Research notes and source inspection output
```

## Verification

Before calling work complete:
- Confirm the requested files exist.
- Run `npm test -- --run` and `npm run build` for app changes.
- Run `npm run typecheck:extension` and `npm run build:extension` for extension changes.
- If no automated checks exist yet, verify the scaffold with `find . -maxdepth 4 -type f | sort`.
