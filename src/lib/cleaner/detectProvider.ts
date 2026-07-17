import type { Provider, ProviderDetection } from "./types";

type DetectableProvider = Exclude<Provider, "auto">;

type Signature = {
  id: string;
  pattern: RegExp;
  weight: number;
};

const signatures: Record<DetectableProvider, Signature[]> = {
  perplexity: [
    { id: "perplexity-branding", pattern: /(?:r2cdn\.)?perplexity\.ai/i, weight: 5 },
    { id: "perplexity-tracking", pattern: /[?&]utm_source=perplexity(?:&|$)/i, weight: 5 },
    { id: "grouped-footnotes", pattern: /\[\^\d+_\d+\]/, weight: 3 },
    { id: "hidden-citation-span", pattern: /display\s*:\s*none[^>]*>\s*(?:\[\^[\w-]+\])+/i, weight: 5 },
    { id: "asterism-divider", pattern: /<div[^>]*>\s*⁂\s*<\/div>/i, weight: 3 }
  ],
  chatgpt: [
    { id: "chatgpt-share-link", pattern: /chatgpt\.com\/share\//i, weight: 5 },
    { id: "chatgpt-tracking", pattern: /[?&]utm_source=chatgpt(?:&|$)/i, weight: 5 }
  ],
  claude: [
    { id: "claude-share-link", pattern: /claude\.ai\/(?:chat|share)\//i, weight: 5 },
    { id: "claude-tracking", pattern: /[?&]utm_source=claude(?:&|$)/i, weight: 5 }
  ],
  gemini: [
    { id: "gemini-share-link", pattern: /(?:g\.co\/gemini\/share|gemini\.google\.com)\//i, weight: 5 },
    { id: "gemini-tracking", pattern: /[?&]utm_source=gemini(?:&|$)/i, weight: 5 }
  ],
  "ai-overview": [
    { id: "ai-overview-label", pattern: /(?:^|\n)AI Overview(?:\n|$)/i, weight: 5 },
    { id: "overview-controls", pattern: /(?:^|\n)Learn more\s*\nShow all(?:\n|$)/i, weight: 4 }
  ],
  deepseek: [
    { id: "deepseek-link", pattern: /(?:chat\.)?deepseek\.com/i, weight: 5 },
    { id: "deepseek-tracking", pattern: /[?&]utm_source=deepseek(?:&|$)/i, weight: 5 }
  ],
  kimi: [
    { id: "kimi-link", pattern: /(?:kimi\.com|moonshot\.cn)/i, weight: 5 },
    { id: "kimi-tracking", pattern: /[?&]utm_source=kimi(?:&|$)/i, weight: 5 }
  ]
};

export function detectProvider(input: string): ProviderDetection {
  if (!input.trim()) {
    return { provider: null, confidence: "unknown", mode: "unknown", signals: [] };
  }

  const ranked = (Object.entries(signatures) as [DetectableProvider, Signature[]][])
    .map(([provider, providerSignatures]) => {
      const matched = providerSignatures.filter((signature) => signature.pattern.test(input));
      return {
        provider,
        score: matched.reduce((sum, signature) => sum + signature.weight, 0),
        signals: matched.map((signature) => signature.id)
      };
    })
    .sort((left, right) => right.score - left.score);

  const [top, runnerUp] = ranked;
  if (!top || top.score < 3 || top.score === runnerUp?.score) {
    return { provider: null, confidence: "unknown", mode: "unknown", signals: [] };
  }

  return {
    provider: top.provider,
    confidence: top.score >= 7 || top.signals.length >= 2 ? "high" : "medium",
    mode: "detected",
    signals: top.signals
  };
}

export function resolveProvider(input: string, requestedProvider: Provider): ProviderDetection {
  if (requestedProvider === "auto") {
    return detectProvider(input);
  }

  return {
    provider: requestedProvider,
    confidence: "high",
    mode: "selected",
    signals: ["manual-selection"]
  };
}
