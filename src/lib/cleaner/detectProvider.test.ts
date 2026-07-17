import { describe, expect, test } from "vitest";
import { detectProvider, resolveProvider } from "./detectProvider";

describe("provider fingerprinting", () => {
  test("detects a Perplexity export from multiple independent signatures", () => {
    const result = detectProvider(
      [
        '<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" />',
        "Claim [^4_1]",
        '<span style="display:none">[^4_2][^4_3]</span>'
      ].join("\n")
    );

    expect(result.provider).toBe("perplexity");
    expect(result.confidence).toBe("high");
    expect(result.mode).toBe("detected");
    expect(result.signals).toContain("perplexity-branding");
  });

  test("stays unknown for generic citation syntax", () => {
    const result = detectProvider("A sourced claim [1].\n\nSources:\n1. https://example.com");

    expect(result).toEqual({
      provider: null,
      confidence: "unknown",
      mode: "unknown",
      signals: []
    });
  });

  test("records an explicit provider selection without guessing", () => {
    expect(resolveProvider("Generic text", "claude")).toEqual({
      provider: "claude",
      confidence: "high",
      mode: "selected",
      signals: ["manual-selection"]
    });
  });
});
