import { describe, expect, test } from "vitest";
import { cleanMarkdown } from "./clean";

describe("cleanMarkdown", () => {
  test("removes inline numeric citations and footnote definitions while preserving normal Markdown links", () => {
    const input = [
      "The release shipped today [1][2] with a supporting [launch note](https://example.com/post?utm_source=chatgpt&gclid=abc#section).",
      "",
      "[^1]: https://source.example/a",
      "[^2]: https://source.example/b"
    ].join("\n");

    const result = cleanMarkdown(input, {
      intensity: "safe",
      provider: "chatgpt"
    });

    expect(result.output).toContain("[launch note](https://example.com/post#section)");
    expect(result.output).not.toContain("[1]");
    expect(result.output).not.toContain("[^1]");
    expect(result.stats.citations).toBe(2);
    expect(result.stats.footnotes).toBe(2);
    expect(result.stats.trackingLinks).toBe(1);
  });

  test("removes Perplexity-style source sections in balanced mode", () => {
    const input = [
      "Perplexity often appends source lists after the answer.",
      "",
      "Sources:",
      "1. https://example.com/a",
      "2. https://example.com/b"
    ].join("\n");

    const result = cleanMarkdown(input, {
      intensity: "balanced",
      provider: "perplexity"
    });

    expect(result.output.trim()).toBe("Perplexity often appends source lists after the answer.");
    expect(result.stats.sourceBlocks).toBe(1);
  });

  test("removes Google AI Overview labels and generic AI boilerplate", () => {
    const input = [
      "According to sources, this is the short answer.",
      "Learn more",
      "Show all",
      "",
      "As an AI language model, I cannot verify live events."
    ].join("\n");

    const result = cleanMarkdown(input, {
      intensity: "balanced",
      provider: "ai-overview"
    });

    expect(result.output).toBe("this is the short answer.");
    expect(result.stats.boilerplate).toBeGreaterThanOrEqual(3);
  });

  test("preserves citation-looking content inside code fences and inline code", () => {
    const input = [
      "Outside citation [1].",
      "",
      "```md",
      "Keep [1] and [^1]: https://example.com inside code.",
      "```",
      "",
      "Inline code `keep [2] here` should remain.",
      "",
      "[^1]: https://source.example/a"
    ].join("\n");

    const result = cleanMarkdown(input, {
      intensity: "safe",
      provider: "auto"
    });

    expect(result.output).toContain("Keep [1] and [^1]: https://example.com inside code.");
    expect(result.output).toContain("`keep [2] here`");
    expect(result.output).not.toContain("Outside citation [1].");
    expect(result.stats.citations).toBe(1);
    expect(result.stats.footnotes).toBe(1);
  });

  test("reports applied rules and keeps deterministic stats for aggressive cleanup", () => {
    const input = [
      "Here is a cleaned version:",
      "",
      "It is worth noting that the answer may vary (Source: https://example.com/ref).",
      "",
      "---",
      "",
      "I hope this helps."
    ].join("\n");

    const result = cleanMarkdown(input, {
      intensity: "aggressive",
      provider: "claude"
    });

    expect(result.output).toBe("the answer may vary.");
    expect(result.stats.boilerplate).toBeGreaterThanOrEqual(3);
    expect(result.stats.sourceBlocks).toBeGreaterThanOrEqual(1);
    expect(result.appliedRules.length).toBeGreaterThan(0);
    expect(result.warnings).toEqual([]);
  });
});
