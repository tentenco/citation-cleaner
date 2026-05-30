import { Copy, Download, RotateCcw, ShieldCheck, Wand2 } from "lucide-react";
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
          <Wand2 aria-hidden="true" size={18} />
          Clean
        </button>
        <button type="button" onClick={onCopy} disabled={!canUseOutput}>
          <Copy aria-hidden="true" size={18} />
          Copy output
        </button>
        <button type="button" onClick={onDownload} disabled={!canUseOutput}>
          <Download aria-hidden="true" size={18} />
          Download .md
        </button>
        <button type="button" onClick={onReset}>
          <RotateCcw aria-hidden="true" size={18} />
          Reset
        </button>
      </div>

      <div className="privacy-pill">
        <ShieldCheck aria-hidden="true" size={17} />
        Runs locally in your browser
      </div>
    </section>
  );
}
