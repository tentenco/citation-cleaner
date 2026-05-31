import { describe, expect, test } from "vitest";
import { estimateCost, estimateTokens } from "./estimate";

describe("estimateTokens", () => {
  test("returns 0 for empty input", () => {
    expect(estimateTokens("")).toBe(0);
  });

  test("grows monotonically with length", () => {
    const short = estimateTokens("hello world");
    const long = estimateTokens("hello world ".repeat(50));
    expect(long).toBeGreaterThan(short);
  });

  test("lands in a sensible range for a paragraph", () => {
    const text = "The quick brown fox jumps over the lazy dog.".repeat(10);
    const tokens = estimateTokens(text);
    // ~90 words / ~440 chars -> roughly 100-130 tokens.
    expect(tokens).toBeGreaterThan(80);
    expect(tokens).toBeLessThan(160);
  });
});

describe("estimateCost", () => {
  test("scales linearly with rate and tokens", () => {
    expect(estimateCost(1_000_000, 3)).toBeCloseTo(3);
    expect(estimateCost(500_000, 2)).toBeCloseTo(1);
  });
});
