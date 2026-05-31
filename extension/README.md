# Citation Cleaner — Chrome extension

A Manifest V3 extension that runs the **same deterministic cleaner as the web
app, entirely locally**. No network calls, no account — the cleaning logic is
bundled straight from `src/lib/cleaner`, so there is a single source of truth.

## Features

- **Popup cleaner** — paste text, pick a source + intensity, clean, and copy.
  Settings persist via `chrome.storage`. ⌘/Ctrl + Enter cleans.
- **Right-click "Clean selected text"** — select text on any page, clean it,
  and the result is copied to your clipboard with a notification of how many
  artifacts were removed.
- **Keyboard shortcut** — ⌘/Ctrl + Shift + L opens the popup.

## Build

The popup and background scripts are TypeScript bundled with esbuild; the cleaner
library is pulled in from the app's `src/lib/cleaner`.

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
`popup.html`, `popup.css`, `icons/`, and `dist/`). Upload the zip in the Web
Store developer dashboard.

## Privacy

All processing happens on-device. The extension requests `contextMenus`,
`activeTab`, `scripting` (to copy cleaned text into the page), and
`notifications`. It never sends your text anywhere.
