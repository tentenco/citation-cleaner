// Thin launcher: the extension holds no cleaning logic. It opens the web app
// (cleaner.tenten.dev), which is the single source of truth, so every web
// deploy updates the extension instantly — no rebuild or reinstall needed.

const WEB_APP_URL = "https://cleaner.tenten.dev/";
const MENU_ID = "cc-clean-selection";

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: MENU_ID,
    title: "Clean selected text with Citation Cleaner",
    contexts: ["selection"]
  });
});

// Toolbar click (and the ⌘/Ctrl+Shift+L command) open the web app.
chrome.action.onClicked.addListener(() => {
  chrome.tabs.create({ url: WEB_APP_URL });
});

// Right-click a selection: open the web app with the text prefilled. The text
// rides in the URL hash, which browsers never send to the server, so it stays
// on-device and is cleaned client-side.
chrome.contextMenus.onClicked.addListener((info) => {
  if (info.menuItemId !== MENU_ID || !info.selectionText) {
    return;
  }

  chrome.tabs.create({ url: `${WEB_APP_URL}#text=${encodeURIComponent(info.selectionText)}` });
});
