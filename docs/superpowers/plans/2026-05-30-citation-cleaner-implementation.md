# Citation Cleaner Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a browser-local Markdown citation and AI-artifact cleaner for content copied from major AI chat products.

**Architecture:** Create a small Next.js client app with a deterministic cleanup engine in `src/lib/cleaner/`. The cleaner exposes a typed `cleanMarkdown()` function, while `src/app/page.tsx` renders a two-pane workbench with source presets, intensity controls, removal stats, copy, download, and reset actions.

**Tech Stack:** Next.js, React, TypeScript, Vitest, CSS modules/global CSS, Lucide React icons.

---

### Task 1: Project Scaffold

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next-env.d.ts`
- Create: `next.config.mjs`
- Create: `vitest.config.ts`
- Create: `src/app/layout.tsx`
- Create: `src/app/globals.css`

- [ ] **Step 1: Add package scripts**

Create `package.json` with scripts for `dev`, `build`, `start`, `test`, and `test:watch`.

- [ ] **Step 2: Install dependencies**

Run:

```bash
npm install next react react-dom lucide-react
npm install -D typescript @types/node @types/react @types/react-dom vitest jsdom
```

Expected: dependencies install and `package-lock.json` is created.

- [ ] **Step 3: Add TypeScript and framework config**

Create `tsconfig.json`, `next-env.d.ts`, `next.config.mjs`, and `vitest.config.ts` so tests and Next.js share path aliases.

- [ ] **Step 4: Add base layout and global CSS**

Create `src/app/layout.tsx` and `src/app/globals.css` with the dark developer-tool visual system from the design spec.

### Task 2: Cleaner Engine TDD

**Files:**
- Create: `src/lib/cleaner/types.ts`
- Create: `src/lib/cleaner/presets.ts`
- Create: `src/lib/cleaner/rules.ts`
- Create: `src/lib/cleaner/clean.ts`
- Create: `src/lib/cleaner/samples.ts`
- Create: `src/lib/cleaner/clean.test.ts`

- [ ] **Step 1: Write failing unit tests**

Add tests for citation markers, footnotes, Perplexity-style sources, AI Overview artifacts, tracking parameters, code-fence preservation, legitimate Markdown links, and stats.

- [ ] **Step 2: Verify RED**

Run:

```bash
npm test -- src/lib/cleaner/clean.test.ts
```

Expected: tests fail because the cleaner files are missing or unimplemented.

- [ ] **Step 3: Implement minimal cleaner**

Implement typed rules, preset selection, intensity filtering, code-fence protection, URL tracking cleanup, and deterministic stats.

- [ ] **Step 4: Verify GREEN**

Run:

```bash
npm test -- src/lib/cleaner/clean.test.ts
```

Expected: all cleaner tests pass.

### Task 3: Workbench UI

**Files:**
- Create: `src/components/EditorPane.tsx`
- Create: `src/components/Toolbar.tsx`
- Create: `src/components/RemovedSummary.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Build editor panes**

Add labeled textareas for raw Markdown and cleaned Markdown. Output is read-only and preserves line breaks.

- [ ] **Step 2: Build toolbar**

Add source preset selector, Safe/Balanced/Aggressive segmented control, Clean, Copy, Download, and Reset buttons.

- [ ] **Step 3: Build removed summary**

Show removed counts by category, applied rules, warnings, and the browser-local privacy note.

- [ ] **Step 4: Wire interactions**

Use `cleanMarkdown()` in the page component. Keep all processing client-side.

### Task 4: Verification

**Files:**
- Modify as needed only if checks reveal defects.

- [ ] **Step 1: Run unit tests**

Run:

```bash
npm test -- --run
```

Expected: all tests pass.

- [ ] **Step 2: Run production build**

Run:

```bash
npm run build
```

Expected: Next.js build succeeds.

- [ ] **Step 3: Run local dev server**

Run:

```bash
npm run dev
```

Expected: app serves locally and opens to the workbench.

- [ ] **Step 4: Browser smoke check**

Open the local app, paste sample Markdown, run Balanced cleanup, verify the output and Removed panel update, and confirm mobile width has no horizontal scroll.
