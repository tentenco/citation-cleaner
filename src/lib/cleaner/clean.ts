import { cleanupRules } from "./rules";
import { intensityRank, providerMatches } from "./presets";
import type { CleanOptions, CleanResult, CleanStats } from "./types";

const defaultStats: CleanStats = {
  citations: 0,
  footnotes: 0,
  sourceBlocks: 0,
  boilerplate: 0,
  trackingLinks: 0,
  blankLines: 0
};

type ProtectedChunk = {
  token: string;
  value: string;
};

function protectCode(input: string) {
  const chunks: ProtectedChunk[] = [];
  let output = input.replace(/```[\s\S]*?```/g, (value) => {
    const token = `@@CITATION_CLEANER_CODE_BLOCK_${chunks.length}@@`;
    chunks.push({ token, value });
    return token;
  });

  output = output.replace(/`[^`\n]+`/g, (value) => {
    const token = `@@CITATION_CLEANER_INLINE_CODE_${chunks.length}@@`;
    chunks.push({ token, value });
    return token;
  });

  return { output, chunks };
}

function restoreCode(input: string, chunks: ProtectedChunk[]) {
  return chunks.reduce((current, chunk) => current.replace(chunk.token, chunk.value), input);
}

function tidyOutput(input: string) {
  return input
    .split("\n")
    .map((line) => line.replace(/[ \t]+$/g, ""))
    .join("\n")
    .replace(/[ \t]+([.,;:!?])/g, "$1")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function cleanMarkdown(input: string, options: CleanOptions): CleanResult {
  const warnings: string[] = [];
  const stats = { ...defaultStats };
  const appliedRules: string[] = [];
  const protectedInput = protectCode(input);
  let output = protectedInput.output;

  try {
    for (const rule of cleanupRules) {
      const intensityAllowed = intensityRank[rule.intensity] <= intensityRank[options.intensity];
      const providerAllowed = providerMatches(rule.providers, options.provider);

      if (!intensityAllowed || !providerAllowed) {
        continue;
      }

      const result = rule.apply(output);
      output = result.output;

      if (result.count > 0) {
        stats[rule.category] += result.count;
        appliedRules.push(rule.id);
      }
    }
  } catch (error) {
    warnings.push(error instanceof Error ? error.message : "Cleaner failed while applying rules.");
    output = protectedInput.output;
  }

  return {
    output: tidyOutput(restoreCode(output, protectedInput.chunks)),
    stats,
    appliedRules,
    warnings
  };
}
