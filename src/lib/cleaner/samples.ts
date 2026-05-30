import type { Intensity, Provider } from "./types";

export type SampleScenario = {
  id: string;
  title: string;
  provider: Provider;
  intensity: Intensity;
  description: string;
  markdown: string;
};

export const sampleMarkdown = [
  "# AI copied answer",
  "",
  "According to sources, the answer usually includes citations [1][2] and source blocks.",
  "",
  "Keep legitimate [Markdown links](https://example.com/article?utm_source=chatgpt#section) intact.",
  "",
  "Sources:",
  "1. https://example.com/source-a",
  "2. https://example.com/source-b"
].join("\n");

export const sampleScenarios: SampleScenario[] = [
  {
    id: "perplexity-source-stack",
    title: "Perplexity sample",
    provider: "perplexity",
    intensity: "balanced",
    description: "Numbered source list, citation markers, and pasted research links.",
    markdown: [
      "Perplexity often appends source lists after the answer [1].",
      "",
      "The clean version should keep the claim and remove the research trail.",
      "",
      "Sources:",
      "1. https://example.com/a?utm_source=perplexity",
      "2. https://example.com/b"
    ].join("\n")
  },
  {
    id: "ai-overview-labels",
    title: "AI Overview sample",
    provider: "ai-overview",
    intensity: "balanced",
    description: "Search-result labels, learn-more rows, and overview boilerplate.",
    markdown: [
      "According to sources, clean Markdown is easier to republish.",
      "Learn more",
      "Show all",
      "",
      "As an AI language model, I cannot verify every live source."
    ].join("\n")
  },
  {
    id: "chatgpt-footnotes",
    title: "ChatGPT sample",
    provider: "chatgpt",
    intensity: "safe",
    description: "Inline numeric citations, footnote definitions, and tracking links.",
    markdown: sampleMarkdown
  }
];
