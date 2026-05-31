"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AnalysisPanel } from "@/components/AnalysisPanel";
import { DiffView } from "@/components/DiffView";
import { EditorPane } from "@/components/EditorPane";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { RemovedSummary } from "@/components/RemovedSummary";
import { ShareCard } from "@/components/ShareCard";
import { Toolbar } from "@/components/Toolbar";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { analyzeText } from "@/lib/analyzer/detect";
import { cleanMarkdown } from "@/lib/cleaner/clean";
import { sampleMarkdown, sampleScenarios } from "@/lib/cleaner/samples";
import { estimateTokens } from "@/lib/tokens/estimate";
import type { CleanOptions, CleanResult, Intensity, Provider } from "@/lib/cleaner/types";

const SETTINGS_KEY = "cc:settings";

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

type CitationCleanerProps = {
  locale: Locale;
  dict: Dictionary;
};

export function CitationCleaner({ locale, dict }: CitationCleanerProps) {
  const [input, setInput] = useState("");
  const [provider, setProvider] = useState<Provider>("auto");
  const [intensity, setIntensity] = useState<Intensity>("balanced");
  const [liveClean, setLiveClean] = useState(false);
  const [showDiff, setShowDiff] = useState(false);
  const [result, setResult] = useState<CleanResult>(emptyResult);
  const [status, setStatus] = useState(dict.status.initial);

  const options = useMemo<CleanOptions>(
    () => ({
      provider,
      intensity
    }),
    [intensity, provider]
  );

  const analysis = useMemo(() => analyzeText(input), [input]);
  const tokens = useMemo(() => estimateTokens(input), [input]);

  const totalRemoved = Object.values(result.stats).reduce((sum, value) => sum + value, 0);
  const reductionPercent =
    input.length > 0
      ? Math.round((Math.max(0, input.length - result.output.length) / input.length) * 100)
      : 0;
  const shorterText =
    input.length > 0 ? dict.summary.shorter.replace("{pct}", String(reductionPercent)) : dict.summary.noInput;

  // Load persisted preferences after mount to avoid hydration mismatches.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(SETTINGS_KEY);
      if (!raw) {
        return;
      }
      const saved = JSON.parse(raw) as Partial<{
        provider: Provider;
        intensity: Intensity;
        liveClean: boolean;
        showDiff: boolean;
      }>;
      if (saved.provider) setProvider(saved.provider);
      if (saved.intensity) setIntensity(saved.intensity);
      if (typeof saved.liveClean === "boolean") setLiveClean(saved.liveClean);
      if (typeof saved.showDiff === "boolean") setShowDiff(saved.showDiff);
    } catch {
      // Ignore malformed storage.
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(
        SETTINGS_KEY,
        JSON.stringify({ provider, intensity, liveClean, showDiff })
      );
    } catch {
      // Ignore storage write failures (private mode, quota).
    }
  }, [provider, intensity, liveClean, showDiff]);

  const runClean = useCallback(() => {
    const nextResult = cleanMarkdown(input, options);
    setResult(nextResult);
    setStatus(nextResult.output ? dict.status.cleaned : dict.status.nothing);
  }, [input, options, dict.status]);

  // Live clean: re-run on a short debounce without touching the status line.
  useEffect(() => {
    if (!liveClean) {
      return;
    }
    const id = setTimeout(() => {
      setResult(cleanMarkdown(input, options));
    }, 300);
    return () => clearTimeout(id);
  }, [liveClean, input, options]);

  // Keyboard shortcut: ⌘/Ctrl + Enter to clean.
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
        event.preventDefault();
        runClean();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [runClean]);

  async function handleCopy() {
    if (!result.output) {
      return;
    }

    await navigator.clipboard?.writeText(result.output);
    setStatus(dict.status.copied);
  }

  function handleDownload() {
    if (!result.output) {
      return;
    }

    downloadMarkdown(result.output);
    setStatus(dict.status.downloaded);
  }

  function handleReset() {
    setInput("");
    setResult(emptyResult);
    setStatus(dict.status.initial);
  }

  function loadSample() {
    setInput(sampleMarkdown);
    const nextResult = cleanMarkdown(sampleMarkdown, options);
    setResult(nextResult);
    setStatus(dict.status.sampleLoaded);
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
    const name = dict.samples.scenarios[scenario.id]?.name ?? scenario.title;
    setStatus(dict.status.scenarioLoaded.replace("{name}", name));
  }

  return (
    <>
      <a className="skip-link" href="#workspace">
        {dict.skipLink}
      </a>

      <div className="utility-strip" aria-label="Service details">
        {dict.utility.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>

      <nav className="nav-bar-top" aria-label="Primary">
        <a className="wordmark" href="#workspace" aria-label={dict.nav.home}>
          CC
        </a>
        <div className="nav-links" aria-label="Page sections">
          <a className="nav-link active" href="#workspace">
            {dict.nav.cleaner}
          </a>
          <a className="nav-link" href="#samples">
            {dict.nav.samples}
          </a>
          <a className="nav-link" href="#report">
            {dict.nav.report}
          </a>
        </div>
        <div className="nav-right">
          <LanguageSwitcher locale={locale} label={dict.language.label} />
          <button type="button" className="nav-cta" onClick={loadSample}>
            {dict.nav.loadSample}
          </button>
        </div>
      </nav>

      <main className="app-shell">
        <header className="hero-band">
          <div className="hero-promo-card">
            <span className="chevron-decoration chevron-left" aria-hidden="true" />
            <span className="chevron-decoration chevron-right" aria-hidden="true" />

            <div className="header-main">
              <p className="brand-mark">{dict.hero.brand}</p>
              <h1>{dict.hero.title}</h1>
              <p className="header-copy">{dict.hero.copy}</p>
              <div className="proof-strip" aria-label="Product guarantees">
                {dict.hero.proof.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>

            <div id="samples" className="sample-lab" aria-label="Fast start samples">
              <p>{dict.samples.fastStart}</p>
              <div className="sample-grid">
                {sampleScenarios.map((scenario, index) => {
                  const text = dict.samples.scenarios[scenario.id];
                  const name = text?.name ?? scenario.title;
                  const description = text?.description ?? scenario.description;
                  return (
                    <button
                      key={scenario.id}
                      type="button"
                      className="scenario-card"
                      onClick={() => loadScenario(index)}
                      aria-label={`${dict.samples.tryLabel} ${name}`}
                    >
                      <span>{name}</span>
                      <small>{description}</small>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </header>

        <section className="growth-rail" aria-label="Workflow">
          <div>
            <strong>{dict.workflow.paste.title}</strong>
            <span>{dict.workflow.paste.desc}</span>
          </div>
          <div>
            <strong>{dict.workflow.clean.title}</strong>
            <span>{dict.workflow.clean.desc}</span>
          </div>
          <div>
            <strong>{dict.workflow.copy.title}</strong>
            <span>{dict.workflow.copy.desc}</span>
          </div>
        </section>

        <Toolbar
          dict={dict.toolbar}
          provider={provider}
          intensity={intensity}
          canUseOutput={result.output.length > 0}
          onProviderChange={setProvider}
          onIntensityChange={setIntensity}
          onClean={runClean}
          onCopy={handleCopy}
          onDownload={handleDownload}
          onReset={handleReset}
        />

        <div className="view-controls" role="group" aria-label="View options">
          <button
            type="button"
            className={liveClean ? "toggle-chip active" : "toggle-chip"}
            aria-pressed={liveClean}
            onClick={() => setLiveClean((value) => !value)}
          >
            {dict.tools.liveClean}
          </button>
          <button
            type="button"
            className={showDiff ? "toggle-chip active" : "toggle-chip"}
            aria-pressed={showDiff}
            onClick={() => setShowDiff((value) => !value)}
          >
            {dict.tools.inlineDiff}
          </button>
        </div>

        <p className="status-line" aria-live="polite">
          {status}
        </p>

        <div id="workspace" className="workspace-grid">
          <div className="editors-grid">
            <EditorPane
              id="raw-markdown"
              label={dict.editors.rawLabel}
              helper={dict.editors.rawHelper}
              countUnit={dict.editors.chars}
              value={input}
              placeholder={dict.editors.rawPlaceholder}
              onChange={setInput}
            />
            {showDiff ? (
              <section className="editor-pane" aria-label={`${dict.editors.cleanedLabel} pane`}>
                <div className="pane-header">
                  <div>
                    <span className="pane-label">{dict.editors.cleanedLabel}</span>
                    <p className="pane-helper">{dict.editors.cleanedHelper}</p>
                  </div>
                  <span className="pane-count">
                    {result.output.length.toLocaleString()} {dict.editors.chars}
                  </span>
                </div>
                <DiffView before={input} after={result.output} label={dict.tools.inlineDiff} />
              </section>
            ) : (
              <EditorPane
                id="cleaned-markdown"
                label={dict.editors.cleanedLabel}
                helper={dict.editors.cleanedHelper}
                countUnit={dict.editors.chars}
                value={result.output}
                placeholder={dict.editors.cleanedPlaceholder}
                readOnly
              />
            )}
          </div>
          <div className="summary-column">
            <RemovedSummary dict={dict.summary} result={result} inputLength={input.length} />
            {result.output ? (
              <ShareCard
                tools={dict.tools}
                tagline={dict.tools.cardTagline}
                totalRemoved={totalRemoved}
                removedLabel={dict.summary.removed}
                shorterText={shorterText}
                aiScoreLabel={dict.tools.aiScore}
                aiScore={analysis.score}
                onStatus={setStatus}
              />
            ) : null}
          </div>
        </div>

        {input.length > 0 ? (
          <AnalysisPanel tools={dict.tools} analysis={analysis} tokens={tokens} />
        ) : null}

        <section className="help-band-dark" aria-label="Local publishing assurance">
          <div>
            <p className="eyebrow">{dict.helpBand.eyebrow}</p>
            <h2>{dict.helpBand.title}</h2>
          </div>
          <div className="assurance-tabs" aria-label="Assurances">
            {dict.helpBand.tabs.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
