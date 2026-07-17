import type { Intensity, Provider, RuleProvider } from "./types";

export const providers: Provider[] = [
  "auto",
  "chatgpt",
  "claude",
  "gemini",
  "ai-overview",
  "perplexity",
  "deepseek",
  "kimi"
];

export const intensities: Intensity[] = ["safe", "balanced", "aggressive"];

export const providerLabels: Record<Provider, string> = {
  auto: "Auto",
  chatgpt: "ChatGPT",
  claude: "Claude",
  gemini: "Gemini",
  "ai-overview": "AI Overview",
  perplexity: "Perplexity",
  deepseek: "DeepSeek",
  kimi: "Kimi"
};

export const intensityLabels: Record<Intensity, string> = {
  safe: "Safe",
  balanced: "Balanced",
  aggressive: "Aggressive"
};

export const intensityRank: Record<Intensity, number> = {
  safe: 0,
  balanced: 1,
  aggressive: 2
};

export function providerMatches(ruleProviders: RuleProvider[], provider: Provider) {
  if (ruleProviders.includes("common")) {
    return true;
  }

  if (provider === "auto") {
    return false;
  }

  return ruleProviders.includes(provider);
}
