export type SignalCategory = "cliche" | "hedging" | "transition" | "structure";

export type SignalDefinition = {
  id: string;
  /** Human-readable English label for the tell (the tells target English AI prose). */
  label: string;
  category: SignalCategory;
  weight: number;
  pattern: RegExp;
};

export type DetectedSignal = {
  id: string;
  label: string;
  category: SignalCategory;
  count: number;
};

export type AiLevel = "low" | "medium" | "high";

export type AiAnalysis = {
  score: number;
  level: AiLevel;
  wordCount: number;
  signals: DetectedSignal[];
};

/**
 * Deterministic "AI tells" — overused words, hedges, and structures that flag
 * machine-written English prose. Patterns are global + case-insensitive.
 */
export const signalDefinitions: SignalDefinition[] = [
  // Overused vocabulary.
  { id: "delve", label: "“delve”", category: "cliche", weight: 3, pattern: /\bdelv(?:e|es|ed|ing)\b/gi },
  { id: "tapestry", label: "“tapestry”", category: "cliche", weight: 3, pattern: /\btapestr(?:y|ies)\b/gi },
  { id: "realm", label: "“realm”", category: "cliche", weight: 2, pattern: /\brealms?\b/gi },
  { id: "landscape", label: "“landscape” (figurative)", category: "cliche", weight: 1, pattern: /\blandscapes?\b/gi },
  { id: "embark", label: "“embark”", category: "cliche", weight: 2, pattern: /\bembark(?:s|ed|ing)?\b/gi },
  { id: "unleash", label: "“unleash”", category: "cliche", weight: 2, pattern: /\bunleash(?:es|ed|ing)?\b/gi },
  { id: "elevate", label: "“elevate”", category: "cliche", weight: 2, pattern: /\belevat(?:e|es|ed|ing)\b/gi },
  { id: "leverage", label: "“leverage”", category: "cliche", weight: 2, pattern: /\bleverag(?:e|es|ed|ing)\b/gi },
  { id: "robust", label: "“robust”", category: "cliche", weight: 1, pattern: /\brobust\b/gi },
  { id: "seamless", label: "“seamless(ly)”", category: "cliche", weight: 2, pattern: /\bseamless(?:ly)?\b/gi },
  { id: "ever-evolving", label: "“ever-evolving / ever-changing”", category: "cliche", weight: 3, pattern: /\bever[- ](?:evolving|changing)\b/gi },
  { id: "game-changer", label: "“game-changer”", category: "cliche", weight: 3, pattern: /\bgame[- ]chang(?:er|ing)\b/gi },
  { id: "cutting-edge", label: "“cutting-edge”", category: "cliche", weight: 2, pattern: /\bcutting[- ]edge\b/gi },
  { id: "testament", label: "“a testament to”", category: "cliche", weight: 3, pattern: /\ba testament to\b/gi },
  { id: "pivotal", label: "“pivotal / crucial role”", category: "cliche", weight: 2, pattern: /\b(?:pivotal|crucial)\s+role\b/gi },
  { id: "underscore", label: "“underscore(s)”", category: "cliche", weight: 2, pattern: /\bunderscore(?:s|d)?\b/gi },
  { id: "boast", label: "“boasts”", category: "cliche", weight: 2, pattern: /\bboasts?\b/gi },
  { id: "fast-paced", label: "“fast-paced world”", category: "cliche", weight: 3, pattern: /\bfast[- ]paced\b/gi },
  { id: "myriad", label: "“myriad / plethora”", category: "cliche", weight: 2, pattern: /\b(?:myriad|plethora)\b/gi },

  // Hedging / filler.
  { id: "worth-noting", label: "“it's worth noting”", category: "hedging", weight: 3, pattern: /\bit(?:'s| is) worth noting\b/gi },
  { id: "important-to-note", label: "“it's important to note”", category: "hedging", weight: 3, pattern: /\bit(?:'s| is) important to note\b/gi },
  { id: "keep-in-mind", label: "“keep in mind”", category: "hedging", weight: 1, pattern: /\bkeep in mind\b/gi },
  { id: "that-being-said", label: "“that being said”", category: "hedging", weight: 2, pattern: /\bthat being said\b/gi },
  { id: "rest-assured", label: "“rest assured”", category: "hedging", weight: 2, pattern: /\brest assured\b/gi },

  // Transition overuse.
  { id: "moreover", label: "“moreover / furthermore”", category: "transition", weight: 1, pattern: /\b(?:moreover|furthermore)\b/gi },
  { id: "additionally", label: "“additionally”", category: "transition", weight: 1, pattern: /\badditionally\b/gi },
  { id: "in-conclusion", label: "“in conclusion”", category: "transition", weight: 2, pattern: /\bin conclusion\b/gi },

  // Structural tells.
  { id: "not-just-but", label: "“it's not just X, it's Y”", category: "structure", weight: 3, pattern: /\bit(?:'s| is) not (?:just|merely|only)\b[^.!?]*?,\s*it(?:'s| is)\b/gi },
  { id: "not-only-but-also", label: "“not only … but also”", category: "structure", weight: 2, pattern: /\bnot only\b[^.!?]*?\bbut also\b/gi },
  { id: "lets-dive-in", label: "“let's dive in / get started”", category: "structure", weight: 2, pattern: /\blet(?:'s| us) (?:dive in|get started)\b/gi },
  { id: "em-dash", label: "em-dash density (—)", category: "structure", weight: 1, pattern: /—/g }
];

const FENCED_CODE = /```[\s\S]*?```/g;
const INLINE_CODE = /`[^`\n]+`/g;

function stripCode(input: string): string {
  return input.replace(FENCED_CODE, " ").replace(INLINE_CODE, " ");
}

function countMatches(text: string, pattern: RegExp): number {
  const matches = text.match(pattern);
  return matches ? matches.length : 0;
}

function levelFor(score: number): AiLevel {
  if (score < 25) {
    return "low";
  }
  if (score < 55) {
    return "medium";
  }
  return "high";
}

/**
 * Score how machine-written a piece of English prose reads, 0–100.
 * Score scales with the density of weighted tells per 100 words, so longer
 * clean passages are not penalised for a single stray cliché.
 */
export function analyzeText(input: string): AiAnalysis {
  const text = stripCode(input);
  const words = text.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  const signals: DetectedSignal[] = [];
  let weighted = 0;

  for (const definition of signalDefinitions) {
    const count = countMatches(text, definition.pattern);
    if (count > 0) {
      weighted += count * definition.weight;
      signals.push({
        id: definition.id,
        label: definition.label,
        category: definition.category,
        count
      });
    }
  }

  // Density per 100 words, scaled so ~2 weighted hits / 100 words ≈ 50.
  const density = wordCount > 0 ? (weighted / wordCount) * 100 : 0;
  const score = Math.min(100, Math.round(density * 25));

  signals.sort((a, b) => b.count - a.count || a.id.localeCompare(b.id));

  return {
    score,
    level: levelFor(score),
    wordCount,
    signals
  };
}
