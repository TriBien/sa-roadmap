# SA Roadmap — Progress Tracker

A friendly, minimal web app to track progress through the 12-week
**Senior Software Engineer → Solution Architect → Enterprise Architect** plan
(see [`SA-plan.md`](SA-plan.md)).

Live: https://tribien.github.io/sa-roadmap/

## How it works

- **Auto-sync (browser):** progress is saved to your browser's `localStorage`
  on every change and loaded automatically each time you open or reload the
  page. No permission prompts, works offline.
- **Auto-sync (local file):** in Chrome/Edge, click **Connect file** once and
  choose `Documents/sa-roadmap.json`. From then on the app reads and writes
  that file automatically on every open, reload and change. After the first
  grant, the browser remembers permission, so later visits sync silently.
- **Text file backup:** use **Export** to download a
  `sa-progress-YYYY-MM-DD.json` and **Import** to restore it (any browser).
- **Reset** clears everything after a confirmation.

### About the local file

The browser cannot write to a fixed path like `Documents/` without your consent
once — that is a hard browser security rule. So:

1. Click **Connect file** and pick `Documents/sa-roadmap.json` (the picker opens
   in Documents and pre-fills the name). Pick an existing file to load it, or
   create a new one.
2. The handle is remembered (IndexedDB). On later visits Chrome re-grants access
   automatically and the app reads/writes the file with no prompt.
3. If the browser asks you to **Reconnect file**, one click restores access.

This works in Chrome and Edge (Chromium). Firefox and Safari do not implement
the File System Access API, so there the app falls back to `localStorage` plus
Export/Import.

## Structure

| File | Purpose |
|---|---|
| `index.html` | Page shell, header, progress bar, toolbar |
| `styles.css` | Minimal styling, light + dark mode |
| `data.js` | The plan content (phases, weeks, items, extras) |
| `app.js` | Rendering, auto-save, export/import |

## Editing the plan

All content lives in `data.js` as a plain object. Add a week or item and it
shows up automatically. Progress is keyed by week + group + index, so
**appending** items is safe; reordering existing items shifts their saved state.

## Local preview

No build step. Serve the folder:

```bash
python3 -m http.server 8080
# open http://localhost:8080
```
