import {
  ArrowCounterClockwise,
  Broom,
  ClipboardText,
  DownloadSimple,
  LockSimple
} from "@phosphor-icons/react";
import {
  intensities,
  intensityLabels,
  providerLabels,
  providers
} from "@/lib/cleaner/presets";
import type { Intensity, Provider } from "@/lib/cleaner/types";

type ToolbarProps = {
  provider: Provider;
  intensity: Intensity;
  canUseOutput: boolean;
  onProviderChange: (provider: Provider) => void;
  onIntensityChange: (intensity: Intensity) => void;
  onClean: () => void;
  onCopy: () => void;
  onDownload: () => void;
  onReset: () => void;
};

export function Toolbar({
  provider,
  intensity,
  canUseOutput,
  onProviderChange,
  onIntensityChange,
  onClean,
  onCopy,
  onDownload,
  onReset
}: ToolbarProps) {
  return (
    <section className="toolbar" aria-label="Cleaner controls">
      <div className="control-group">
        <label htmlFor="source-provider">Source</label>
        <select
          id="source-provider"
          value={provider}
          onChange={(event) => onProviderChange(event.target.value as Provider)}
        >
          {providers.map((item) => (
            <option key={item} value={item}>
              {providerLabels[item]}
            </option>
          ))}
        </select>
      </div>

      <fieldset className="intensity-group">
        <legend>Cleanup intensity</legend>
        <div className="segmented-control">
          {intensities.map((item) => (
            <button
              key={item}
              type="button"
              className={item === intensity ? "segment active" : "segment"}
              aria-pressed={item === intensity}
              onClick={() => onIntensityChange(item)}
            >
              {intensityLabels[item]}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="actions" aria-label="Output actions">
        <button type="button" className="primary-action" onClick={onClean}>
          <Broom aria-hidden="true" size={18} weight="bold" />
          Clean
        </button>
        <button type="button" onClick={onCopy} disabled={!canUseOutput}>
          <ClipboardText aria-hidden="true" size={18} weight="bold" />
          Copy output
        </button>
        <button type="button" onClick={onDownload} disabled={!canUseOutput}>
          <DownloadSimple aria-hidden="true" size={18} weight="bold" />
          Download .md
        </button>
        <button type="button" onClick={onReset}>
          <ArrowCounterClockwise aria-hidden="true" size={18} weight="bold" />
          Reset
        </button>
      </div>

      <div className="privacy-pill">
        <LockSimple aria-hidden="true" size={17} weight="bold" />
        Local only
      </div>
    </section>
  );
}
