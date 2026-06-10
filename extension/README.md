# Citation Cleaner — Chrome extension

A Manifest V3 **thin launcher** for the web app at
[cleaner.tenten.dev](https://cleaner.tenten.dev). The extension holds **no
cleaning logic** — it just opens the web app, which is the single source of
truth. Every web deploy updates the extension's behaviour instantly: no
rebuild, no re-publish, no reinstall.

## Features

- **Toolbar button / ⌘·Ctrl + Shift + L** — opens the web app in a new tab.
- **Right-click "Clean selected text"** — opens the web app with the selection
  prefilled and already cleaned. The text rides in the URL **hash**
  (`#text=…`), which browsers never send to the server, so it stays on your
  device and is cleaned client-side.

## Build

Only the tiny background service worker is bundled (no app logic ships in the
extension).

```bash
npm install
npm run build:extension      # generates icons + dist/background.js
npm run typecheck:extension  # optional: type-check against @types/chrome
```

`extension/dist/` is git-ignored — run the build before loading.

## Load it in Chrome

1. `npm run build:extension`
2. Open `chrome://extensions`, enable **Developer mode**.
3. Click **Load unpacked** and select the `extension/` folder.

## Packaging for the Chrome Web Store

Zip the `extension/` folder *after* building (it must contain `manifest.json`,
`icons/`, and `dist/`). Upload the zip in the Web Store developer dashboard.
Because the cleaning logic lives on the web, you only need to re-publish when
the launcher itself changes — not for cleaner updates.

## Privacy

The extension only requests `contextMenus`. Your selected text is passed to the
web app through the URL hash, which is never transmitted to the server, and the
web app cleans it entirely in your browser. Opening the app loads its static
assets from cleaner.tenten.dev; your text is never uploaded.
