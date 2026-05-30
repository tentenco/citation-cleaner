import type { CleanResult } from "@/lib/cleaner/types";

const statLabels: Array<[keyof CleanResult["stats"], string]> = [
  ["citations", "citations"],
  ["footnotes", "footnotes"],
  ["sourceBlocks", "source blocks"],
  ["boilerplate", "boilerplate"],
  ["trackingLinks", "tracking links"],
  ["blankLines", "blank lines"]
];

type RemovedSummaryProps = {
  result: CleanResult;
};

export function RemovedSummary({ result }: RemovedSummaryProps) {
  return (
    <aside className="summary-panel" aria-labelledby="removed-summary-title">
      <div className="summary-heading">
        <p className="eyebrow">Removed</p>
        <h2 id="removed-summary-title">Cleanup report</h2>
      </div>

      <dl className="stats-grid">
        {statLabels.map(([key, label]) => (
          <div key={key} className="stat-tile">
            <dt>{label}</dt>
            <dd>{result.stats[key]}</dd>
          </div>
        ))}
      </dl>

      <section className="rule-list" aria-labelledby="rules-title">
        <h3 id="rules-title">Applied rules</h3>
        {result.appliedRules.length > 0 ? (
          <ul>
            {result.appliedRules.map((rule) => (
              <li key={rule}>{rule.replaceAll("-", " ")}</li>
            ))}
          </ul>
        ) : (
          <p>No rules applied yet.</p>
        )}
      </section>

      {result.warnings.length > 0 ? (
        <div className="warning-panel" role="alert">
          {result.warnings.map((warning) => (
            <p key={warning}>{warning}</p>
          ))}
        </div>
      ) : null}
    </aside>
  );
}
