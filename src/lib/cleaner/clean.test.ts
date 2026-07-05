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

  test("converts literal \\n\\n escape sequences into real paragraph breaks", () => {
    const input =
      "...800V DC mass production. \\n\\nYesterday, SemiAnalysis released a report. \\n\\nHowever, NVIDIA pushed back.";

    const result = cleanMarkdown(input, {
      intensity: "safe",
      provider: "auto"
    });

    expect(result.output).toBe(
      [
        "...800V DC mass production.",
        "",
        "Yesterday, SemiAnalysis released a report.",
        "",
        "However, NVIDIA pushed back."
      ].join("\n")
    );
    expect(result.output).not.toContain("\\n");
    expect(result.stats.blankLines).toBe(2);
  });

  test("leaves literal \\n escape sequences inside code untouched", () => {
    const input = "Use `printf \"a\\nb\"` to print. \\n\\nNext paragraph.";

    const result = cleanMarkdown(input, {
      intensity: "safe",
      provider: "auto"
    });

    expect(result.output).toContain('`printf "a\\nb"`');
    expect(result.output).toContain("Next paragraph.");
  });

  test("strips Perplexity export artifacts (logo, hidden spans, asterism, prefixed footnotes)", () => {
    const input = [
      '<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>',
      "",
      "# Title",
      "",
      "A claim with grouped footnote markers [^4_6][^4_5][^4_2] inline.",
      '<span style="display:none">[^4_10][^4_11][^4_12][^4_8][^4_9]</span>',
      "",
      '<div align="center">⁂</div>',
      "",
      "[^4_1]: https://www.luxalgo.com/blog/average-true-range-dynamic-stop-loss-levels/",
      "[^4_2]: https://www.tradelyser.com/tools/atr-stop-loss-calculator"
    ].join("\n");

    const result = cleanMarkdown(input, {
      intensity: "safe",
      provider: "perplexity"
    });

    expect(result.output).toBe(
      ["# Title", "", "A claim with grouped footnote markers inline."].join("\n")
    );
    expect(result.output).not.toMatch(/perplexity\.ai/);
    expect(result.output).not.toMatch(/display:\s*none/);
    expect(result.output).not.toContain("⁂");
    expect(result.output).not.toMatch(/\[\^[\w-]+\]/);
    expect(result.stats.citations).toBeGreaterThanOrEqual(4);
    expect(result.stats.footnotes).toBe(2);
    expect(result.stats.boilerplate).toBeGreaterThanOrEqual(2);
  });

  test("removes grouped inline footnote markers for any provider but keeps them inside code", () => {
    const input = [
      "Prose reference [^1_1][^1_2] should disappear.",
      "",
      "Inline `keep [^1_3] here` stays untouched.",
      "",
      "[^1_1]: https://example.com/a"
    ].join("\n");

    const result = cleanMarkdown(input, {
      intensity: "safe",
      provider: "auto"
    });

    expect(result.output).toContain("Prose reference should disappear.");
    expect(result.output).toContain("`keep [^1_3] here`");
    expect(result.output).not.toContain("[^1_1]:");
    expect(result.stats.citations).toBe(2);
    expect(result.stats.footnotes).toBe(1);
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
