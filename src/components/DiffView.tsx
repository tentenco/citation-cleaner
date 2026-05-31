import { useMemo } from "react";
import { diffWords } from "@/lib/diff/wordDiff";

type DiffViewProps = {
  before: string;
  after: string;
  label: string;
};

export function DiffView({ before, after, label }: DiffViewProps) {
  const segments = useMemo(() => diffWords(before, after), [before, after]);

  return (
    <pre className="diff-view" aria-label={label}>
      {segments.map((segment, index) =>
        segment.removed ? (
          <del key={index} className="diff-removed">
            {segment.value}
          </del>
        ) : (
          <span key={index}>{segment.value}</span>
        )
      )}
    </pre>
  );
}
