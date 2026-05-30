"use client";

import { useMemo, useState } from "react";
import { EditorPane } from "@/components/EditorPane";
import { RemovedSummary } from "@/components/RemovedSummary";
import { Toolbar } from "@/components/Toolbar";
import { cleanMarkdown } from "@/lib/cleaner/clean";
import { sampleMarkdown } from "@/lib/cleaner/samples";
import type { CleanOptions, CleanResult, Intensity, Provider } from "@/lib/cleaner/types";

const emptyResult: CleanResult = {
  output: "",
  stats: {
    citations: 0,
    footnotes: 0,
    sourceBlocks: 0,
    boilerplate: 0,
    trackingLinks: 0,
    blankLines: 0
  },
  appliedRules: [],
  warnings: []
};

function downloadMarkdown(markdown: string) {
  const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "cleaned-markdown.md";
  link.click();
  URL.revokeObjectURL(url);
}

export default function Page() {
  const [input, setInput] = useState("");
  const [provider, setProvider] = useState<Provider>("auto");
  const [intensity, setIntensity] = useState<Intensity>("balanced");
  const [result, setResult] = useState<CleanResult>(emptyResult);
  const [status, setStatus] = useState("Paste Markdown copied from an AI answer, then clean it locally.");

  const options = useMemo<CleanOptions>(
    () => ({
      provider,
      intensity
    }),
    [intensity, provider]
  );

  function handleClean() {
    const nextResult = cleanMarkdown(input, options);
    setResult(nextResult);
    setStatus(
      nextResult.output
        ? "Cleaned locally. Review the output before publishing."
        : "Nothing to clean yet."
    );
  }

  async function handleCopy() {
    if (!result.output) {
      return;
    }

    await navigator.clipboard?.writeText(result.output);
    setStatus("Cleaned Markdown copied to clipboard.");
  }

  function handleDownload() {
    if (!result.output) {
      return;
    }

    downloadMarkdown(result.output);
    setStatus("Downloaded cleaned-markdown.md.");
  }

  function handleReset() {
    setInput("");
    setResult(emptyResult);
    setStatus("Paste Markdown copied from an AI answer, then clean it locally.");
  }

  function loadSample() {
    setInput(sampleMarkdown);
    const nextResult = cleanMarkdown(sampleMarkdown, options);
    setResult(nextResult);
    setStatus("Sample loaded and cleaned locally.");
  }

  return (
    <main className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">Browser-local Markdown utility</p>
          <h1>Citation Cleaner</h1>
          <p className="header-copy">
            Remove citation markers, source blocks, tracking links, and AI-response framing
            from copied chatbot Markdown without sending text to a server.
          </p>
        </div>
        <button type="button" className="sample-button" onClick={loadSample}>
          Load sample
        </button>
      </header>

      <Toolbar
        provider={provider}
        intensity={intensity}
        canUseOutput={result.output.length > 0}
        onProviderChange={setProvider}
        onIntensityChange={setIntensity}
        onClean={handleClean}
        onCopy={handleCopy}
        onDownload={handleDownload}
        onReset={handleReset}
      />

      <p className="status-line" aria-live="polite">
        {status}
      </p>

      <div className="workspace-grid">
        <div className="editors-grid">
          <EditorPane
            id="raw-markdown"
            label="Raw Markdown"
            helper="Paste Markdown from ChatGPT, Claude, Gemini, Perplexity, DeepSeek, Kimi, or AI Overview."
            value={input}
            placeholder="Paste AI-copied Markdown here..."
            onChange={setInput}
          />
          <EditorPane
            id="cleaned-markdown"
            label="Cleaned Markdown"
            helper="Review the deterministic output before copying or downloading."
            value={result.output}
            placeholder="Cleaned Markdown will appear here."
            readOnly
          />
        </div>
        <RemovedSummary result={result} />
      </div>
    </main>
  );
}
