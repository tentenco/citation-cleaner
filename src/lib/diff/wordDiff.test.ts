import { describe, expect, test } from "vitest";
import { diffWords } from "./wordDiff";

function rebuild(before: string) {
  return diffWords(before, before)
    .map((segment) => segment.value)
    .join("");
}

describe("diffWords", () => {
  test("marks nothing removed when texts are identical", () => {
    const text = "Answer with citations.";
    const segments = diffWords(text, text);
    expect(segments.every((segment) => !segment.removed)).toBe(true);
    expect(rebuild(text)).toBe(text);
  });

  test("flags removed words and preserves the original text when concatenated", () => {
    const before = "Answer with citations [1].";
    const after = "Answer with citations.";
    const segments = diffWords(before, after);

    const removed = segments
      .filter((segment) => segment.removed)
      .map((segment) => segment.value)
      .join("");
    expect(removed).toContain("[1]");
    expect(segments.map((segment) => segment.value).join("")).toBe(before);
  });

  test("returns an empty list for empty input", () => {
    expect(diffWords("", "")).toEqual([]);
  });
});
