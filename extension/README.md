# Citation Cleaner — Chrome extension

A Manifest V3 extension with a **self-contained popup**. Clicking the toolbar
button opens a mini UI where you paste AI text and see the cleaned result
instantly — no web page, no upload. The popup bundles the same cleaning rules
as [cleaner.tenten.dev](https://cleaner.tenten.dev) (from `src/lib/cleaner`),
so behaviour matches the web app. Because the logic now ships inside the
extension, rule updates require a rebuild and re-publish (unlike the earlier
launcher, which auto-updated from the web).

## Features

- **Toolbar button / ⌘·Ctrl + Shift + L** — opens the popup. Paste, pick a
  source and intensity, and the cleaned Markdown updates live. Copy or Clear
  with one click. Everything runs in the popup; nothing leaves your browser.
- **Right-click "Clean selected text"** — opens the web app with the selection
  prefilled and already cleaned. The text rides in the URL **hash**
  (`#text=…`), which browsers never send to the server, so it stays on your
  device and is cleaned client-side.

## Build

The build bundles the popup UI (with the cleaner) and the background service
worker.

```bash
npm install
npm run build:extension      # generates icons + dist/popup.js + dist/background.js
npm run typecheck:extension  # optional: type-check against @types/chrome
```

`extension/dist/` is git-ignored — run the build before loading.

## Load it in Chrome

1. `npm run build:extension`
2. Open `chrome://extensions`, enable **Developer mode**.
3. Click **Load unpacked** and select the `extension/` folder.

## Packaging for the Chrome Web Store

Zip the `extension/` folder *after* building (it must contain `manifest.json`,
`icons/`, `popup.html`, and `dist/`). Upload the zip in the Web Store developer
dashboard. Because the cleaning logic now ships inside the popup, re-publish
whenever the cleaning rules change so users get the update.

## Privacy

The extension only requests `contextMenus`. Your selected text is passed to the
web app through the URL hash, which is never transmitted to the server, and the
web app cleans it entirely in your browser. Opening the app loads its static
assets from cleaner.tenten.dev; your text is never uploaded.
