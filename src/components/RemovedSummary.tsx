import type { Dictionary } from "@/i18n/dictionaries";
import { providerLabels } from "@/lib/cleaner/presets";
import type { CleanResult, StatKey } from "@/lib/cleaner/types";

const statKeys: StatKey[] = [
  "citations",
  "footnotes",
  "sourceBlocks",
  "boilerplate",
  "trackingLinks",
  "blankLines"
];

type RemovedSummaryProps = {
  dict: Dictionary["summary"];
  result: CleanResult;
  inputLength: number;
};

export function RemovedSummary({ dict, result, inputLength }: RemovedSummaryProps) {
  const totalRemoved = Object.values(result.stats).reduce((sum, value) => sum + value, 0);
  const outputLength = result.output.length;
  const reduction = inputLength > 0 ? Math.max(0, inputLength - outputLength) : 0;
  const reductionPercent = inputLength > 0 ? Math.round((reduction / inputLength) * 100) : 0;
  const verdict = outputLength > 0 ? dict.reviewReady : dict.awaiting;
  const fingerprint = result.providerDetection;
  const providerLabel = fingerprint.provider
    ? providerLabels[fingerprint.provider]
    : dict.sourceUnknown;

  return (
    <aside id="report" className="summary-panel" aria-labelledby="removed-summary-title">
      <div className="summary-heading">
        <p className="eyebrow">{dict.signal}</p>
        <h2 id="removed-summary-title">{dict.title}</h2>
      </div>

      <div className="readiness-card">
        <span>{verdict}</span>
        <strong>{totalRemoved}</strong>
        <p>{dict.removed}</p>
      </div>

      <dl className="stats-grid">
        {statKeys.map((key) => (
          <div key={key} className="stat-tile">
            <dt>{dict.stats[key]}</dt>
            <dd>{result.stats[key]}</dd>
          </div>
        ))}
      </dl>

      <section className="source-fingerprint" aria-labelledby="source-fingerprint-title">
        <div>
          <span id="source-fingerprint-title">{dict.sourceFingerprint}</span>
          <strong>{providerLabel}</strong>
        </div>
        <span className={`confidence-badge confidence-${fingerprint.confidence}`}>
          {dict.fingerprintConfidence[fingerprint.confidence]}
        </span>
        {fingerprint.mode === "detected" && fingerprint.signals.length > 0 ? (
          <div className="fingerprint-evidence">
            <span>{dict.fingerprintEvidence}</span>
            <ul>
              {fingerprint.signals.map((signal) => (
                <li key={signal}>{signal.replaceAll("-", " ")}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </section>

      <div className="delta-row" aria-label={dict.copyDelta}>
        <span>{dict.copyDelta}</span>
        <strong>
          {inputLength > 0 ? dict.shorter.replace("{pct}", String(reductionPercent)) : dict.noInput}
        </strong>
      </div>

      <section className="rule-list" aria-labelledby="rules-title">
        <h3 id="rules-title">{dict.appliedRules}</h3>
        {result.appliedRules.length > 0 ? (
          <ul>
            {result.appliedRules.map((rule) => (
              <li key={rule}>{rule.replaceAll("-", " ")}</li>
            ))}
          </ul>
        ) : (
          <p>{dict.noRules}</p>
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
