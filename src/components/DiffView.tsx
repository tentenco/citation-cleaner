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
      {segments.map((segment, index) => {
        if (!segment.removed) {
          return <span key={index}>{segment.value}</span>;
        }

        // The cleaner rewrites literal "\n" escapes into real line breaks.
        // Strike the escape, then render the break it becomes so the preview
        // matches the paragraph spacing that Copy Output actually produces.
        const escapeOnly = /^(?:\\n)+$/.test(segment.value);
        return (
          <span key={index}>
            <del className="diff-removed">{segment.value}</del>
            {escapeOnly ? "\n".repeat(segment.value.length / 2) : null}
          </span>
        );
      })}
    </pre>
  );
}
