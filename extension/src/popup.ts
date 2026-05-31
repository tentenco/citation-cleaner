import { cleanMarkdown } from "../../src/lib/cleaner/clean";
import {
  intensities,
  intensityLabels,
  providerLabels,
  providers
} from "../../src/lib/cleaner/presets";
import type { Intensity, Provider } from "../../src/lib/cleaner/types";

const STORAGE_KEY = "cc-ext-settings";

const inputEl = document.getElementById("input") as HTMLTextAreaElement;
const outputEl = document.getElementById("output") as HTMLTextAreaElement;
const providerEl = document.getElementById("provider") as HTMLSelectElement;
const intensityEl = document.getElementById("intensity") as HTMLSelectElement;
const cleanBtn = document.getElementById("clean") as HTMLButtonElement;
const copyBtn = document.getElementById("copy") as HTMLButtonElement;
const statusEl = document.getElementById("status") as HTMLParagraphElement;

for (const provider of providers) {
  const option = document.createElement("option");
  option.value = provider;
  option.textContent = providerLabels[provider];
  providerEl.append(option);
}

for (const intensity of intensities) {
  const option = document.createElement("option");
  option.value = intensity;
  option.textContent = intensityLabels[intensity];
  intensityEl.append(option);
}
intensityEl.value = "balanced";

// Restore saved preferences.
chrome.storage?.local.get(STORAGE_KEY, (stored) => {
  const saved = stored?.[STORAGE_KEY] as { provider?: Provider; intensity?: Intensity } | undefined;
  if (saved?.provider) providerEl.value = saved.provider;
  if (saved?.intensity) intensityEl.value = saved.intensity;
});

function persist() {
  chrome.storage?.local.set({
    [STORAGE_KEY]: { provider: providerEl.value, intensity: intensityEl.value }
  });
}

function runClean() {
  const result = cleanMarkdown(inputEl.value, {
    provider: providerEl.value as Provider,
    intensity: intensityEl.value as Intensity
  });

  outputEl.value = result.output;
  copyBtn.disabled = result.output.length === 0;

  const removed = Object.values(result.stats).reduce((sum, value) => sum + value, 0);
  statusEl.textContent = result.output
    ? `Cleaned locally — ${removed} artifact${removed === 1 ? "" : "s"} removed.`
    : "Nothing to clean yet.";
}

async function copyOutput() {
  if (!outputEl.value) {
    return;
  }
  await navigator.clipboard.writeText(outputEl.value);
  statusEl.textContent = "Cleaned text copied to clipboard.";
}

cleanBtn.addEventListener("click", runClean);
copyBtn.addEventListener("click", copyOutput);
providerEl.addEventListener("change", persist);
intensityEl.addEventListener("change", persist);

inputEl.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
    event.preventDefault();
    runClean();
  }
});

// If the popup was opened with a pending selection (from the context menu), prefill it.
chrome.storage?.local.get("cc-ext-pending", (stored) => {
  const pending = stored?.["cc-ext-pending"] as string | undefined;
  if (pending) {
    inputEl.value = pending;
    chrome.storage.local.remove("cc-ext-pending");
    runClean();
  }
});
