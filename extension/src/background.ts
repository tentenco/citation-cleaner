import { cleanMarkdown } from "../../src/lib/cleaner/clean";

const MENU_ID = "cc-clean-selection";

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: MENU_ID,
    title: "Clean selected text with Citation Cleaner",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId !== MENU_ID || !info.selectionText || !tab?.id) {
    return;
  }

  const result = cleanMarkdown(info.selectionText, {
    provider: "auto",
    intensity: "balanced"
  });
  const removed = Object.values(result.stats).reduce((sum, value) => sum + value, 0);

  // Write the cleaned text to the clipboard from within the page (user gesture).
  try {
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: copyToClipboard,
      args: [result.output]
    });
  } catch {
    // Some pages (chrome://, web store) block injection — fall back to a notice only.
  }

  chrome.notifications.create({
    type: "basic",
    iconUrl: chrome.runtime.getURL("icons/icon128.png"),
    title: "Citation Cleaner",
    message:
      removed > 0
        ? `Cleaned & copied — ${removed} artifact${removed === 1 ? "" : "s"} removed.`
        : "Cleaned & copied. Nothing to remove."
  });
});

// Injected into the active page; must be fully self-contained.
function copyToClipboard(text: string) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.top = "-1000px";
  textarea.style.opacity = "0";
  document.body.append(textarea);
  textarea.focus();
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
}
