# SA Roadmap — Progress Tracker

A friendly, minimal web app to track progress through the 12-week
**Senior Software Engineer → Solution Architect → Enterprise Architect** plan
(see [`SA-plan.md`](SA-plan.md)).

Live: https://tribien.github.io/sa-roadmap/

## How it works

- **Auto-sync:** progress is saved to your browser's `localStorage` on every
  change and loaded automatically each time you open or reload the page. No
  permission prompts, works offline.
- **Text file backup:** use **Export** to download a human-readable
  `sa-progress-YYYY-MM-DD.json` and **Import** to restore it (e.g. on another
  device or browser).
- **Reset** clears everything after a confirmation.

> Note: browsers on GitHub Pages cannot read/write an arbitrary local file
> without a permission prompt (a hard browser security limit), so
> `localStorage` is the auto-sync store and the JSON file is the portable
> backup.

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
