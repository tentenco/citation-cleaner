// Self-contained popup UI. Runs the same cleaner as the web app, bundled in,
// so text is cleaned entirely inside the popup — nothing is uploaded and no
// web page is opened. Uses no chrome.* APIs, so it also runs standalone.
import { cleanMarkdown } from "../../src/lib/cleaner/clean";
import {
  providers,
  intensities,
  providerLabels,
  intensityLabels
} from "../../src/lib/cleaner/presets";
import type { Intensity, Provider, StatKey } from "../../src/lib/cleaner/types";

function byId<T extends HTMLElement>(id: string): T {
  const el = document.getElementById(id);
  if (!el) {
    throw new Error(`Missing #${id}`);
  }
  return el as T;
}

const input = byId<HTMLTextAreaElement>("input");
const output = byId<HTMLTextAreaElement>("output");
const providerSelect = byId<HTMLSelectElement>("provider");
const intensityGroup = byId<HTMLDivElement>("intensity");
const statsEl = byId<HTMLParagraphElement>("stats");
const copyBtn = byId<HTMLButtonElement>("copy");
const clearBtn = byId<HTMLButtonElement>("clear");

const statLabels: Record<StatKey, string> = {
  citations: "citations",
  footnotes: "footnotes",
  sourceBlocks: "source blocks",
  boilerplate: "boilerplate",
  trackingLinks: "tracking links",
  blankLines: "blank lines"
};

let intensity: Intensity = "balanced";

for (const provider of providers) {
  const option = document.createElement("option");
  option.value = provider;
  option.textContent = providerLabels[provider];
  providerSelect.append(option);
}
providerSelect.value = "auto";

for (const level of intensities) {
  const button = document.createElement("button");
  button.type = "button";
  button.dataset.level = level;
  button.textContent = intensityLabels[level];
  button.className = level === intensity ? "seg active" : "seg";
  button.addEventListener("click", () => {
    intensity = level;
    for (const other of intensityGroup.querySelectorAll("button")) {
      other.classList.toggle("active", other.dataset.level === level);
    }
    run();
  });
  intensityGroup.append(button);
}

function run() {
  const text = input.value;
  if (!text.trim()) {
    output.value = "";
    statsEl.textContent = "";
    return;
  }

  const result = cleanMarkdown(text, {
    provider: providerSelect.value as Provider,
    intensity
  });
  output.value = result.output;

  const removed = Object.values(result.stats).reduce((sum, n) => sum + n, 0);
  const parts = (Object.entries(result.stats) as [StatKey, number][])
    .filter(([, n]) => n > 0)
    .map(([key, n]) => `${n} ${statLabels[key]}`);
  statsEl.textContent = removed ? `Removed ${removed} — ${parts.join(", ")}` : "Nothing to remove";
}

let timer: number | undefined;
input.addEventListener("input", () => {
  window.clearTimeout(timer);
  timer = window.setTimeout(run, 150);
});
providerSelect.addEventListener("change", run);

copyBtn.addEventListener("click", async () => {
  if (!output.value) {
    return;
  }
  try {
    await navigator.clipboard.writeText(output.value);
    copyBtn.textContent = "Copied";
    window.setTimeout(() => {
      copyBtn.textContent = "Copy";
    }, 1200);
  } catch {
    output.select();
    document.execCommand("copy");
  }
});

clearBtn.addEventListener("click", () => {
  input.value = "";
  run();
  input.focus();
});

input.focus();
