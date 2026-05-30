# Citation Cleaner Design

## Goal

Build a browser-local web tool that cleans Markdown copied from major AI chat
products. The tool removes citations, source blocks, provider artifacts, and
common AI-response boilerplate without sending user text to a server.

## Product Scope

The MVP is a deterministic, rules-based cleaner. It does not call an AI model,
store user input, or require account login.

Supported source presets:
- Auto
- ChatGPT
- Claude
- Gemini
- Google AI Overview
- Perplexity
- DeepSeek
- Kimi

The preset determines which cleanup rules are enabled by default. Auto runs the
common rules plus lightweight provider-pattern detection.

## Primary Workflow

1. User pastes Markdown into the input editor.
2. User selects a source preset or leaves it on Auto.
3. User chooses cleanup intensity: Safe, Balanced, or Aggressive.
4. User clicks Clean or uses automatic cleanup after input debounce.
5. The output editor shows cleaned Markdown.
6. The Removed panel summarizes what changed.
7. User copies the cleaned Markdown or downloads it as `.md`.

## Cleanup Rules

### Safe

Safe removes high-confidence artifacts only:
- Markdown footnote definitions such as `[^1]: https://...`
- Inline numeric citations such as `[1]`, `[2]`, and `[1][2]`
- Markdown reference links that are only source citations
- Citation marker variants from AI answer exports and search-result summaries
- Bare trailing source-list sections with headings like `Sources`, `References`,
  `Citations`, `Links`, and `參考資料`
- Tracking query parameters from URLs: `utm_*`, `fbclid`, `gclid`, `mc_cid`,
  `mc_eid`

### Balanced

Balanced is the default. It includes Safe plus:
- Provider boilerplate such as "I hope this helps", "Here is a cleaned version",
  and "As an AI..."
- AI overview/source labels such as "According to sources", "Learn more", and
  "Show all"
- Perplexity-style numbered source lists
- Duplicate blank lines created by removal
- Empty Markdown bullets left after citations are removed

### Aggressive

Aggressive includes Balanced plus:
- Repeated hedging phrases common in AI outputs
- Generic disclaimer paragraphs that are not content-specific
- Decorative separators and response framing headings
- Source-heavy parentheticals where the parenthetical contains only citation
  material

Aggressive must never rewrite claims. It only removes matched text spans.

## User Interface

The app opens directly to a workbench.

Top toolbar:
- Source preset selector
- Cleanup intensity segmented control
- Clean button
- Copy output button
- Download `.md` button
- Reset button

Main area:
- Left editor: Raw Markdown
- Right editor: Cleaned Markdown
- Editors use a monospace font, visible labels, and line-preserving textareas
  for the MVP.

Side or lower panel:
- Removed summary with counts by category: citations, footnotes, source blocks,
  boilerplate, tracking links, blank lines
- Rule details list showing enabled rule groups
- Privacy note: "Runs locally in your browser."

Empty state:
- The input editor shows a short sample prompt, but the label remains visible.
- Output area explains that cleaned Markdown will appear after input is pasted.

Error state:
- Regex/runtime failures show a non-blocking error panel and keep the original
  input untouched.

## Visual System

Use the UI/UX Pro Max recommendation for a developer tool:
- Style: dark developer workbench with minimal documentation feel
- Background: `#0F172A`
- Surface: `#1E293B`
- Muted surface: `#272F42`
- Border: `#475569`
- Accent: `#22C55E`
- Text: `#F8FAFC`
- Destructive: `#EF4444`
- Heading font: JetBrains Mono
- Body font: IBM Plex Sans
- Editor font: JetBrains Mono

Avoid purple AI gradients, decorative cards, and marketing-page structure. The
first screen is the usable tool.

## Accessibility

- Every control has a visible label or accessible name.
- Keyboard users can tab through toolbar, input, output, and actions in visual
  order.
- Focus states are visible on all interactive elements.
- Buttons are at least 44px tall.
- Errors use `role="alert"` or an equivalent live region.
- Do not communicate changes by color alone; the Removed panel uses text counts.
- Support reduced motion by keeping transitions short and optional.

## Data Model

The cleaner returns:

```ts
type CleanResult = {
  output: string;
  stats: {
    citations: number;
    footnotes: number;
    sourceBlocks: number;
    boilerplate: number;
    trackingLinks: number;
    blankLines: number;
  };
  appliedRules: string[];
  warnings: string[];
};
```

Each cleanup rule has:

```ts
type CleanupRule = {
  id: string;
  label: string;
  category: keyof CleanResult["stats"];
  intensity: "safe" | "balanced" | "aggressive";
  providers: Array<"common" | "chatgpt" | "claude" | "gemini" | "ai-overview" | "perplexity" | "deepseek" | "kimi">;
  apply: (input: string) => { output: string; count: number };
};
```

## Architecture

Use a small client-only app:
- `src/app/page.tsx`: workbench screen
- `src/components/toolbar.tsx`: preset, intensity, and actions
- `src/components/editor-pane.tsx`: labeled input/output editor
- `src/components/removed-summary.tsx`: stats and applied rule details
- `src/lib/cleaner/rules.ts`: cleanup rule definitions
- `src/lib/cleaner/clean.ts`: rule selection and pipeline execution
- `src/lib/cleaner/presets.ts`: provider preset configuration
- `src/lib/cleaner/samples.ts`: test/sample AI Markdown snippets

No backend route is required for the MVP.

## Testing

Unit tests:
- Removes ChatGPT/Claude/Gemini citation markers without altering normal links.
- Removes Perplexity-style source lists.
- Removes Google AI Overview citation artifacts.
- Strips tracking params while preserving the base URL.
- Preserves code fences and inline code.
- Keeps legitimate Markdown links in body content.
- Produces stable stats for each rule category.

UI smoke tests:
- Paste sample Markdown.
- Select Balanced cleanup.
- Clean output.
- Copy and download actions are reachable.
- Mobile width does not horizontally scroll.

Manual verification:
- Test at 375px, 768px, 1024px, and 1440px widths.
- Confirm tab order and focus visibility.
- Confirm no network requests are made for cleaning.

## Out of Scope

- AI rewriting mode
- Cloud sync
- User accounts
- Browser extension
- Collaborative editing
- Full Markdown preview rendering
- Automatic source fact-checking

## Implementation Stack

Use Next.js with TypeScript for the implementation. The workspace does not have
an existing app stack yet, and Next.js keeps the browser-local single-page tool
straightforward while leaving room for later packaging or deployment.
