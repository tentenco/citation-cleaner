import { describe, expect, test } from "vitest";
import { analyzeText } from "./detect";

describe("analyzeText", () => {
  test("returns a zero score for empty input", () => {
    const result = analyzeText("");
    expect(result.score).toBe(0);
    expect(result.level).toBe("low");
    expect(result.signals).toEqual([]);
    expect(result.wordCount).toBe(0);
  });

  test("scores plain human prose as low with no signals", () => {
    const human =
      "We shipped the new export button on Tuesday. A few customers asked for CSV, so that is next. " +
      "The team is small and we move fast when the scope is clear.";
    const result = analyzeText(human);
    expect(result.level).toBe("low");
    expect(result.signals).toHaveLength(0);
  });

  test("flags dense AI clichés with a high score and named signals", () => {
    const slop =
      "In today's fast-paced world, let's delve into the ever-evolving landscape of innovation. " +
      "It's worth noting that this game-changer is a testament to seamless design — " +
      "it's not just a tool, it's a tapestry of robust possibilities.";
    const result = analyzeText(slop);
    expect(result.level).toBe("high");
    expect(result.score).toBeGreaterThan(55);

    const ids = result.signals.map((signal) => signal.id);
    expect(ids).toContain("delve");
    expect(ids).toContain("fast-paced");
    expect(ids).toContain("not-just-but");
    expect(ids).toContain("em-dash");
  });

  test("counts repeated tells and sorts by frequency", () => {
    const result = analyzeText("Delve, delve, and delve again into the realm.");
    const delve = result.signals.find((signal) => signal.id === "delve");
    expect(delve?.count).toBe(3);
    expect(result.signals[0]?.id).toBe("delve");
  });

  test("ignores tells inside code fences and inline code", () => {
    const input = [
      "Normal text here.",
      "```js",
      "// delve delve delve tapestry — game-changer",
      "```",
      "Inline `delve tapestry` stays out of the count."
    ].join("\n");
    const result = analyzeText(input);
    expect(result.signals.find((signal) => signal.id === "delve")).toBeUndefined();
    expect(result.signals.find((signal) => signal.id === "tapestry")).toBeUndefined();
  });
});
