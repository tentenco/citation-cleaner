export type DiffSegment = {
  value: string;
  removed: boolean;
};

/** Token cap to keep the O(n*m) LCS bounded on large pastes. */
const MAX_TOKENS = 4000;

function tokenize(input: string): string[] {
  // Keep whitespace runs — and literal \n escape sequences — as their own
  // tokens. The cleaner rewrites literal "\n" into real newlines, which shifts
  // token boundaries; splitting them out here keeps the before/after aligned so
  // the diff highlights only the escape, not the surrounding (unspaced) text.
  return input.split(/(\s+|(?:\\n)+)/).filter((token) => token.length > 0);
}

/**
 * Word-level diff of `before` against `after`, returning `before` split into
 * segments flagged as removed (present in before, absent from after) or kept.
 * The cleaner only strips and normalises, so we surface what disappeared.
 */
export function diffWords(before: string, after: string): DiffSegment[] {
  const beforeTokens = tokenize(before);
  const afterTokens = tokenize(after);

  if (beforeTokens.length === 0) {
    return [];
  }

  if (beforeTokens.length > MAX_TOKENS || afterTokens.length > MAX_TOKENS) {
    return [{ value: before, removed: false }];
  }

  const n = beforeTokens.length;
  const m = afterTokens.length;

  // LCS length table.
  const lcs: number[][] = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i -= 1) {
    for (let j = m - 1; j >= 0; j -= 1) {
      lcs[i][j] =
        beforeTokens[i] === afterTokens[j]
          ? lcs[i + 1][j + 1] + 1
          : Math.max(lcs[i + 1][j], lcs[i][j + 1]);
    }
  }

  // Walk the table, marking before-tokens kept (on the LCS path) or removed.
  const segments: DiffSegment[] = [];
  let i = 0;
  let j = 0;

  function push(value: string, removed: boolean) {
    const last = segments[segments.length - 1];
    if (last && last.removed === removed) {
      last.value += value;
    } else {
      segments.push({ value, removed });
    }
  }

  while (i < n) {
    if (j < m && beforeTokens[i] === afterTokens[j]) {
      push(beforeTokens[i], false);
      i += 1;
      j += 1;
    } else if (j < m && lcs[i + 1][j] >= lcs[i][j + 1]) {
      push(beforeTokens[i], true);
      i += 1;
    } else if (j < m) {
      j += 1;
    } else {
      push(beforeTokens[i], true);
      i += 1;
    }
  }

  return segments;
}
