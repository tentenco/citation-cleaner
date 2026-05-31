import type { Dictionary } from "@/i18n/dictionaries";
import type { AiAnalysis } from "@/lib/analyzer/detect";

type AnalysisPanelProps = {
  tools: Dictionary["tools"];
  analysis: AiAnalysis;
  tokens: number;
};

export function AnalysisPanel({ tools, analysis, tokens }: AnalysisPanelProps) {
  const levelLabel = tools.levels[analysis.level];

  return (
    <section className="analysis-panel" aria-label={tools.analysisTitle}>
      <div className="analysis-head">
        <h3>{tools.analysisTitle}</h3>
        <p className="analysis-disclaimer">{tools.disclaimer}</p>
      </div>

      <div className="analysis-metrics">
        <div className={`ai-gauge ai-${analysis.level}`}>
          <span className="ai-gauge-label">{tools.aiScore}</span>
          <strong className="ai-gauge-score">{analysis.score}</strong>
          <span className="ai-gauge-level">{levelLabel}</span>
        </div>

        <div className="analysis-stats">
          <div>
            <dt>{tools.wordsAnalyzed}</dt>
            <dd>{analysis.wordCount.toLocaleString()}</dd>
          </div>
          <div>
            <dt>{tools.estTokens}</dt>
            <dd>{tokens.toLocaleString()}</dd>
          </div>
        </div>
      </div>

      <div className="analysis-tells">
        <h4>{tools.tellsTitle}</h4>
        {analysis.signals.length > 0 ? (
          <ul className="tell-list">
            {analysis.signals.map((signal) => (
              <li key={signal.id} className={`tell tell-${signal.category}`}>
                <span>{signal.label}</span>
                <span className="tell-count">×{signal.count}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="tell-empty">{tools.noTells}</p>
        )}
      </div>

      <p className="analysis-note">{tools.tokensNote}</p>
    </section>
  );
}
