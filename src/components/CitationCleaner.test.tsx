import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, test, vi } from "vitest";
import { CitationCleaner } from "./CitationCleaner";
import { getDictionary } from "@/i18n/dictionaries";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() })
}));

const en = getDictionary("en");

function renderCleaner() {
  return render(<CitationCleaner locale="en" dict={en} />);
}

describe("Citation Cleaner workbench", () => {
  afterEach(() => {
    cleanup();
    localStorage.clear();
    vi.restoreAllMocks();
  });

  test("cleans pasted Markdown and reports removed artifacts", async () => {
    const user = userEvent.setup();
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        writeText: vi.fn().mockResolvedValue(undefined)
      }
    });

    renderCleaner();

    const input = screen.getByLabelText("Raw Markdown");
    await user.clear(input);
    await user.type(input, "Answer with citations [1].\n\nSources:\n1. https://example.com");
    await user.click(screen.getByRole("button", { name: "Clean" }));

    expect(screen.getByLabelText("Cleaned Markdown")).toHaveValue("Answer with citations.");
    expect(screen.getByText("citations")).toBeInTheDocument();
    expect(screen.getByText("source blocks")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Copy output" }));
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("Answer with citations.");
  });

  test("loads a provider sample to shorten time to first clean output", async () => {
    const user = userEvent.setup();

    renderCleaner();

    await user.click(screen.getByRole("button", { name: "Try Perplexity" }));

    expect((screen.getByLabelText("Raw Markdown") as HTMLTextAreaElement).value).toContain(
      "Sources:"
    );
    expect((screen.getByLabelText("Cleaned Markdown") as HTMLTextAreaElement).value).not.toContain(
      "Sources:"
    );
    expect(screen.getByLabelText("Source")).toHaveValue("auto");
    const fingerprint = screen.getByText("Source fingerprint").closest("section");
    expect(fingerprint).not.toBeNull();
    expect(within(fingerprint as HTMLElement).getByText("Perplexity")).toBeInTheDocument();
    expect(within(fingerprint as HTMLElement).getByText("High confidence")).toBeInTheDocument();
    expect(within(fingerprint as HTMLElement).getByText("perplexity branding")).toBeInTheDocument();
  });

  test("shows the provider fingerprint and evidence in Auto mode", async () => {
    const user = userEvent.setup();

    renderCleaner();

    fireEvent.change(screen.getByLabelText("Raw Markdown"), {
      target: {
        value: [
          '<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" />',
          "Claim [^4_1].",
          '<span style="display:none">[^4_2][^4_3]</span>'
        ].join("\n")
      }
    });
    await user.click(screen.getByRole("button", { name: "Clean" }));

    const fingerprint = screen.getByText("Source fingerprint").closest("section");
    expect(fingerprint).not.toBeNull();
    expect(within(fingerprint as HTMLElement).getByText("Perplexity")).toBeInTheDocument();
    expect(within(fingerprint as HTMLElement).getByText("High confidence")).toBeInTheDocument();
    expect(within(fingerprint as HTMLElement).getByText("perplexity branding")).toBeInTheDocument();
  });
});
