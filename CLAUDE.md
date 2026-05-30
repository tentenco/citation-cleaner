# Project

This is a lightweight Codex/Claude working folder scaffold. It is intended to
hold project context, research notes, plans, local skills, and repeatable
agent instructions without assuming a specific app stack.

## Source

This workspace includes the behavioral guidance from the local
`andrej-karpathy-skills` plugin:

- Plugin cache: `/Users/ekc-m5max/.claude/plugins/cache/karpathy-skills/andrej-karpathy-skills/1.0.0`
- Marketplace guide: `/Users/ekc-m5max/.claude/plugins/marketplaces/karpathy-skills/CLAUDE.md`

## Conventions

- Keep changes small and directly tied to the user's request.
- Put durable project context in `docs/context/`.
- Put implementation plans and task breakdowns in `docs/plans/`.
- Put source inspection, external references, and research notes in `docs/research/`.
- Keep local Claude-specific helpers under `.claude/`.
- Keep Codex-facing local skills under `.codex/skills/`.

## Commands

No project-specific build or test commands are defined yet. Add them here when
the working folder is attached to a concrete codebase.

---

# Karpathy Guidelines

Behavioral guidelines to reduce common LLM coding mistakes. Merge with
project-specific instructions as needed.

**Tradeoff:** These guidelines bias toward caution over speed. For trivial
tasks, use judgment.

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them; do not pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that was not requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes,
simplify.

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Do not "improve" adjacent code, comments, or formatting.
- Do not refactor things that are not broken.
- Match existing style, even if you would do it differently.
- If you notice unrelated dead code, mention it; do not delete it.

When your changes create orphans:
- Remove imports, variables, and functions that your changes made unused.
- Do not remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:
- "Add validation" becomes "write tests for invalid inputs, then make them pass."
- "Fix the bug" becomes "write a test that reproduces it, then make it pass."
- "Refactor X" becomes "ensure tests pass before and after."

For multi-step tasks, state a brief plan:

```text
1. [Step] -> verify: [check]
2. [Step] -> verify: [check]
3. [Step] -> verify: [check]
```

Strong success criteria let you loop independently. Weak criteria like "make it
work" require constant clarification.

---

**These guidelines are working if:** fewer unnecessary changes in diffs, fewer
rewrites due to overcomplication, and clarifying questions come before
implementation rather than after mistakes.
