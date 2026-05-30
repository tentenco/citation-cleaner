export type Provider =
  | "auto"
  | "chatgpt"
  | "claude"
  | "gemini"
  | "ai-overview"
  | "perplexity"
  | "deepseek"
  | "kimi";

export type RuleProvider = Exclude<Provider, "auto"> | "common";

export type Intensity = "safe" | "balanced" | "aggressive";

export type StatKey =
  | "citations"
  | "footnotes"
  | "sourceBlocks"
  | "boilerplate"
  | "trackingLinks"
  | "blankLines";

export type CleanStats = Record<StatKey, number>;

export type CleanResult = {
  output: string;
  stats: CleanStats;
  appliedRules: string[];
  warnings: string[];
};

export type CleanOptions = {
  provider: Provider;
  intensity: Intensity;
};

export type RuleResult = {
  output: string;
  count: number;
};

export type CleanupRule = {
  id: string;
  label: string;
  category: StatKey;
  intensity: Intensity;
  providers: RuleProvider[];
  apply: (input: string) => RuleResult;
};
