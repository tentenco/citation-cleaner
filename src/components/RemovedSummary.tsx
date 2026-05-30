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
  inputLength: number;
};

export function RemovedSummary({ result, inputLength }: RemovedSummaryProps) {
  const totalRemoved = Object.values(result.stats).reduce((sum, value) => sum + value, 0);
  const outputLength = result.output.length;
  const reduction = inputLength > 0 ? Math.max(0, inputLength - outputLength) : 0;
  const reductionPercent = inputLength > 0 ? Math.round((reduction / inputLength) * 100) : 0;
  const verdict = outputLength > 0 ? "Review-ready" : "Awaiting paste";

  return (
    <aside id="report" className="summary-panel" aria-labelledby="removed-summary-title">
      <div className="summary-heading">
        <p className="eyebrow">Signal</p>
        <h2 id="removed-summary-title">Cleanup report</h2>
      </div>

      <div className="readiness-card">
        <span>{verdict}</span>
        <strong>{totalRemoved}</strong>
        <p>matched artifacts removed</p>
      </div>

      <dl className="stats-grid">
        {statLabels.map(([key, label]) => (
          <div key={key} className="stat-tile">
            <dt>{label}</dt>
            <dd>{result.stats[key]}</dd>
          </div>
        ))}
      </dl>

      <div className="delta-row" aria-label="Copy reduction">
        <span>Copy delta</span>
        <strong>{inputLength > 0 ? `${reductionPercent}% shorter` : "No input"}</strong>
      </div>

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
