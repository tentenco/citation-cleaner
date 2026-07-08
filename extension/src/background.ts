// The toolbar click opens the popup UI (see manifest "default_popup"), which
// cleans text locally. This service worker only backs the right-click entry:
// clean a selection on any page without leaving it.

const WEB_APP_URL = "https://cleaner.tenten.dev/";
const MENU_ID = "cc-clean-selection";

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: MENU_ID,
    title: "Clean selected text with Citation Cleaner",
    contexts: ["selection"]
  });
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
