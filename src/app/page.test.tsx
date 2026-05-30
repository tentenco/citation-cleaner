import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, test, vi } from "vitest";
import Page from "./page";

describe("Citation Cleaner workbench", () => {
  afterEach(() => {
    cleanup();
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

    render(<Page />);

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

    render(<Page />);

    await user.click(screen.getByRole("button", { name: "Try Perplexity sample" }));

    expect((screen.getByLabelText("Raw Markdown") as HTMLTextAreaElement).value).toContain(
      "Sources:"
    );
    expect((screen.getByLabelText("Cleaned Markdown") as HTMLTextAreaElement).value).not.toContain(
      "Sources:"
    );
    expect(screen.getByLabelText("Source")).toHaveValue("perplexity");
  });
});
