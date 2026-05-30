"use client";

import { useMemo, useState } from "react";
import { EditorPane } from "@/components/EditorPane";
import { RemovedSummary } from "@/components/RemovedSummary";
import { Toolbar } from "@/components/Toolbar";
import { cleanMarkdown } from "@/lib/cleaner/clean";
import { sampleMarkdown, sampleScenarios } from "@/lib/cleaner/samples";
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
  const [status, setStatus] = useState("Paste AI Markdown, clean locally, copy the publishable version.");

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
    setStatus("Paste AI Markdown, clean locally, copy the publishable version.");
  }

  function loadSample() {
    setInput(sampleMarkdown);
    const nextResult = cleanMarkdown(sampleMarkdown, options);
    setResult(nextResult);
    setStatus("Sample loaded and cleaned locally.");
  }

  function loadScenario(index: number) {
    const scenario = sampleScenarios[index];
    const nextOptions: CleanOptions = {
      provider: scenario.provider,
      intensity: scenario.intensity
    };
    const nextResult = cleanMarkdown(scenario.markdown, nextOptions);

    setProvider(scenario.provider);
    setIntensity(scenario.intensity);
    setInput(scenario.markdown);
    setResult(nextResult);
    setStatus(`${scenario.title} loaded. The output is ready to review.`);
  }

  return (
    <>
      <a className="skip-link" href="#workspace">
        Skip to cleaner
      </a>

      <div className="utility-strip" aria-label="Service details">
        <span>Browser-local</span>
        <span>No account required</span>
        <span>Markdown in, Markdown out</span>
      </div>

      <nav className="nav-bar-top" aria-label="Primary">
        <a className="wordmark" href="#workspace" aria-label="Citation Cleaner home">
          CC
        </a>
        <div className="nav-links" aria-label="Page sections">
          <a className="nav-link active" href="#workspace">
            Cleaner
          </a>
          <a className="nav-link" href="#samples">
            Samples
          </a>
          <a className="nav-link" href="#report">
            Report
          </a>
        </div>
        <button type="button" className="nav-cta" onClick={loadSample}>
          Load sample
        </button>
      </nav>

      <main className="app-shell">
        <header className="hero-band">
          <div className="hero-promo-card">
            <span className="chevron-decoration chevron-left" aria-hidden="true" />
            <span className="chevron-decoration chevron-right" aria-hidden="true" />

            <div className="header-main">
              <p className="brand-mark">Citation Cleaner</p>
              <h1>Make AI copy publishable.</h1>
              <p className="header-copy">
                Strip citations, source trails, and tracking clutter from chatbot Markdown locally.
              </p>
              <div className="proof-strip" aria-label="Product guarantees">
                <span>0 uploads</span>
                <span>Deterministic rules</span>
                <span>Markdown-safe</span>
              </div>
            </div>

            <div id="samples" className="sample-lab" aria-label="Fast start samples">
              <p>Fast start</p>
              <div className="sample-grid">
                {sampleScenarios.map((scenario, index) => (
                  <button
                    key={scenario.id}
                    type="button"
                    className="scenario-card"
                    onClick={() => loadScenario(index)}
                    aria-label={`Try ${scenario.title}`}
                  >
                    <span>{scenario.title.replace(" sample", "")}</span>
                    <small>{scenario.description}</small>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </header>

        <section className="growth-rail" aria-label="Workflow">
          <div>
            <strong>Paste</strong>
            <span>Keep code and links intact.</span>
          </div>
          <div>
            <strong>Clean</strong>
            <span>Remove the artifacts users notice first.</span>
          </div>
          <div>
            <strong>Copy</strong>
            <span>Leave with publish-ready Markdown.</span>
          </div>
        </section>

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

        <div id="workspace" className="workspace-grid">
          <div className="editors-grid">
            <EditorPane
              id="raw-markdown"
              label="Raw Markdown"
              helper="Paste from ChatGPT, Claude, Gemini, Perplexity, DeepSeek, Kimi, or AI Overview."
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
          <RemovedSummary result={result} inputLength={input.length} />
        </div>

        <section className="help-band-dark" aria-label="Local publishing assurance">
          <div>
            <p className="eyebrow">Local workflow</p>
            <h2>Clean copy without uploading the draft.</h2>
          </div>
          <div className="assurance-tabs" aria-label="Assurances">
            <span>Private</span>
            <span>Deterministic</span>
            <span>Exportable</span>
          </div>
        </section>
      </main>
    </>
  );
}
