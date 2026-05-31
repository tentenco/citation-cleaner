export type ModelRate = {
  id: string;
  label: string;
  /** Indicative input price in USD per 1M tokens (approximate, early 2026). */
  usdPerMillion: number;
};

/** Indicative rates for quick "rough cost" math — not billing-accurate. */
export const modelRates: ModelRate[] = [
  { id: "gpt", label: "GPT-class", usdPerMillion: 2.5 },
  { id: "claude", label: "Claude-class", usdPerMillion: 3 },
  { id: "gemini", label: "Gemini-class", usdPerMillion: 1.25 }
];

/**
 * Approximate token count without shipping a full BPE tokenizer.
 * Blends the two common rules of thumb (~4 chars/token and ~0.75 words/token)
 * so neither very dense nor very sparse text skews the estimate badly.
 */
export function estimateTokens(input: string): number {
  const chars = input.length;
  if (chars === 0) {
    return 0;
  }

  const words = input.trim().split(/\s+/).filter(Boolean).length;
  const byChars = chars / 4;
  const byWords = words / 0.75;
  return Math.max(1, Math.round((byChars + byWords) / 2));
}

/** Rough USD cost of sending `tokens` as input to a given rate. */
export function estimateCost(tokens: number, usdPerMillion: number): number {
  return (tokens / 1_000_000) * usdPerMillion;
}
