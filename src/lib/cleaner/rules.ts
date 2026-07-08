import type { CleanupRule } from "./types";

const trackingParams = new Set(["fbclid", "gclid", "mc_cid", "mc_eid"]);

function countMatches(input: string, pattern: RegExp) {
  return input.match(pattern)?.length ?? 0;
}

function removeLines(input: string, patterns: RegExp[]) {
  let count = 0;
  const output = input
    .split("\n")
    .filter((line) => {
      const shouldRemove = patterns.some((pattern) => pattern.test(line.trim()));
      if (shouldRemove) {
        count += 1;
      }
      return !shouldRemove;
    })
    .join("\n");

  return { output, count };
}

export const cleanupRules: CleanupRule[] = [
  {
    id: "literal-newline-escapes",
    label: "Literal \\n escape sequences",
    category: "blankLines",
    intensity: "safe",
    providers: ["common"],
    apply(input) {
      let count = 0;
      const output = input.replace(/(?:\\n)+/g, (match) => {
        count += 1;
        const breaks = match.length / 2;
        return "\n".repeat(breaks);
      });

      return { output, count };
    }
  },
  {
    id: "perplexity-branding-image",
    label: "Perplexity logo image",
    category: "boilerplate",
    intensity: "safe",
    providers: ["perplexity"],
    apply(input) {
      const pattern = /<img\b[^>]*\bperplexity\.ai[^>]*>/gi;
      const count = countMatches(input, pattern);
      return {
        output: input.replace(pattern, ""),
        count
      };
    }
  },
  {
    id: "perplexity-hidden-citations",
    label: "Hidden Perplexity citation spans",
    category: "citations",
    intensity: "safe",
    providers: ["perplexity"],
    apply(input) {
      const pattern = /<span\b[^>]*display:\s*none[^>]*>[\s\S]*?<\/span>/gi;
      const count = countMatches(input, pattern);
      return {
        output: input.replace(pattern, ""),
        count
      };
    }
  },
  {
    id: "perplexity-inline-link-citations",
    label: "Inline domain-label link citations",
    category: "citations",
    intensity: "safe",
    providers: ["perplexity"],
    apply(input) {
      let count = 0;
      // Perplexity exports citations as markdown links whose text is a lowercase
      // domain slug matching the target hostname, e.g. "[github](https://github.com/...)".
      const pattern = /[ \t]*\[([a-z0-9][a-z0-9.-]*)\]\((https?:\/\/[^\s)]+)\)/g;
      const output = input.replace(pattern, (match, label: string, url: string) => {
        let host: string;
        try {
          host = new URL(url).hostname.replace(/^www\./, "");
        } catch {
          return match;
        }

        if (host !== label && !host.startsWith(`${label}.`)) {
          return match;
        }

        count += 1;
        return "";
      });

      return { output, count };
    }
  },
  {
    id: "perplexity-asterism-divider",
    label: "Perplexity asterism divider",
    category: "boilerplate",
    intensity: "safe",
    providers: ["perplexity"],
    apply(input) {
      return removeLines(input, [/^(?:<div\b[^>]*>)?\s*⁂\s*(?:<\/div>)?$/i]);
    }
  },
  {
    id: "footnote-definitions",
    label: "Markdown footnote definitions",
    category: "footnotes",
    intensity: "safe",
    providers: ["common"],
    apply(input) {
      const pattern = /^\[\^[\w-]+\]:\s+\S.*(?:\n|$)/gm;
      const count = countMatches(input, pattern);
      return {
        output: input.replace(pattern, ""),
        count
      };
    }
  },
  {
    id: "inline-footnote-citations",
    label: "Inline footnote citation markers",
    category: "citations",
    intensity: "safe",
    providers: ["common"],
    apply(input) {
      let count = 0;
      const output = input.replace(/(?:\s?\[\^[\w-]+\])+/g, (match) => {
        count += match.match(/\[/g)?.length ?? 0;
        return "";
      });

      return { output, count };
    }
  },
  {
    id: "inline-numeric-citations",
    label: "Inline numeric citation markers",
    category: "citations",
    intensity: "safe",
    providers: ["common"],
    apply(input) {
      let count = 0;
      const output = input.replace(/(?:\s?\[(?:\d+(?:,\s*\d+)*)\])+/g, (match) => {
        count += match.match(/\[/g)?.length ?? 0;
        return "";
      });

      return { output, count };
    }
  },
  {
    id: "ai-citation-markers",
    label: "AI answer citation markers",
    category: "citations",
    intensity: "safe",
    providers: ["common"],
    apply(input) {
      const patterns = [
        /:contentReference\[[^\]]+\]\{[^}]+\}/g,
        /<citation\b[^>]*>.*?<\/citation>/gis,
        /[\uE000-\uF8FF][^ \n]*cite[\s\S]*?[\uE000-\uF8FF]/g
      ];
      let output = input;
      let count = 0;

      for (const pattern of patterns) {
        count += countMatches(output, pattern);
        output = output.replace(pattern, "");
      }

      return { output, count };
    }
  },
  {
    id: "trailing-source-block",
    label: "Trailing source or reference block",
    category: "sourceBlocks",
    intensity: "safe",
    providers: ["common"],
    apply(input) {
      const pattern =
        /(?:^|\n)(?:#{1,6}\s*)?(?:sources?|references?|citations?|links|參考資料|参考资料):?\s*\n[\s\S]*$/i;
      const count = pattern.test(input) ? 1 : 0;
      return {
        output: input.replace(pattern, ""),
        count
      };
    }
  },
  {
    id: "tracking-parameters",
    label: "Tracking query parameters",
    category: "trackingLinks",
    intensity: "safe",
    providers: ["common"],
    apply(input) {
      let count = 0;
      const output = input.replace(/https?:\/\/[^\s)\]]+/g, (rawUrl) => {
        try {
          const parsed = new URL(rawUrl);
          let changed = false;

          for (const key of Array.from(parsed.searchParams.keys())) {
            if (key.startsWith("utm_") || trackingParams.has(key)) {
              parsed.searchParams.delete(key);
              changed = true;
            }
          }

          if (!changed) {
            return rawUrl;
          }

          count += 1;
          return parsed.toString();
        } catch {
          return rawUrl;
        }
      });

      return { output, count };
    }
  },
  {
    id: "balanced-boilerplate",
    label: "Common AI boilerplate and overview labels",
    category: "boilerplate",
    intensity: "balanced",
    providers: ["common", "ai-overview"],
    apply(input) {
      let output = input;
      let count = 0;

      output = output.replace(/\bAccording to sources,\s*/gi, () => {
        count += 1;
        return "";
      });

      const removed = removeLines(output, [
        /^learn more\.?$/i,
        /^show all\.?$/i,
        /^as an ai(?: language model)?[, ].*$/i,
        /^here(?:'s| is) (?:a )?(?:cleaned|revised|polished) version:?$/i,
        /^i hope this helps\.?$/i
      ]);

      return {
        output: removed.output,
        count: count + removed.count
      };
    }
  },
  {
    id: "empty-markdown-bullets",
    label: "Empty Markdown bullets",
    category: "blankLines",
    intensity: "balanced",
    providers: ["common"],
    apply(input) {
      const pattern = /^\s*[-*]\s*$/gm;
      const count = countMatches(input, pattern);
      return {
        output: input.replace(pattern, ""),
        count
      };
    }
  },
  {
    id: "duplicate-blank-lines",
    label: "Duplicate blank lines",
    category: "blankLines",
    intensity: "balanced",
    providers: ["common"],
    apply(input) {
      const pattern = /\n{3,}/g;
      let count = 0;
      const output = input.replace(pattern, (match) => {
        count += Math.max(0, match.length - 2);
        return "\n\n";
      });

      return { output, count };
    }
  },
  {
    id: "aggressive-hedging",
    label: "Repeated AI hedging phrases",
    category: "boilerplate",
    intensity: "aggressive",
    providers: ["common"],
    apply(input) {
      let count = 0;
      const output = input.replace(/\bIt is worth noting that\s+/gi, () => {
        count += 1;
        return "";
      });

      return { output, count };
    }
  },
  {
    id: "source-parentheticals",
    label: "Citation-only source parentheticals",
    category: "sourceBlocks",
    intensity: "aggressive",
    providers: ["common"],
    apply(input) {
      const pattern = /\s*\((?:source|sources|citation|reference):\s*https?:\/\/[^)]+\)/gi;
      const count = countMatches(input, pattern);
      return {
        output: input.replace(pattern, ""),
        count
      };
    }
  },
  {
    id: "decorative-response-framing",
    label: "Decorative response framing",
    category: "boilerplate",
    intensity: "aggressive",
    providers: ["common"],
    apply(input) {
      const removed = removeLines(input, [/^---+$/]);
      return removed;
    }
  }
];
