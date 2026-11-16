/* SA Roadmap progress tracker.
   - Auto-syncs to localStorage on load and on every change (no permission prompts).
   - Export/Import a human-readable JSON text file for backup / other devices. */

const STORAGE_KEY = "sa-roadmap-progress-v1";

/* ---------- item ids ---------- */
function weekItemId(code, group, i) {
  return code + "-" + group.toLowerCase() + "-" + i;
}
function extraItemId(extraId, i) {
  return extraId + "-" + i;
}

function allItemIds() {
  const ids = [];
  PLAN.weeks.forEach(function (w) {
    const counters = {};
    w.items.forEach(function (it) {
      const g = it.group.toLowerCase();
      counters[g] = counters[g] || 0;
      ids.push(weekItemId(w.code, it.group, counters[g]));
      counters[g]++;
    });
  });
  PLAN.extras.forEach(function (ex) {
    ex.items.forEach(function (_t, i) { ids.push(extraItemId(ex.id, i)); });
  });
  return ids;
}

/* ---------- state ---------- */
function defaultState() {
  return { version: 1, updatedAt: null, items: {}, notes: {}, collapsed: {} };
}

let state = defaultState();

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const parsed = JSON.parse(raw);
    state = Object.assign(defaultState(), parsed);
    state.items = state.items || {};
    state.notes = state.notes || {};
    state.collapsed = state.collapsed || {};
    return true;
  } catch (e) {
    console.warn("Could not read saved progress:", e);
    return false;
  }
}

let saveTimer = null;
function saveState() {
  state.updatedAt = new Date().toISOString();
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state, null, 2));
    setSync("Saved locally");
  } catch (e) {
    setSync("Save failed");
    console.warn(e);
  }
}
function saveSoon() {
  setSync("Saving…");
  clearTimeout(saveTimer);
  saveTimer = setTimeout(saveState, 200);
}

/* ---------- helpers ---------- */
function esc(s) {
  return String(s).replace(/[&<>"']/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
  });
}
function fmtTime(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}
function setSync(msg) {
  const el = document.getElementById("syncStatus");
  if (!el) return;
  const t = fmtTime(state.updatedAt);
  el.textContent = t ? msg + " · " + t : msg;
}
function toast(msg) {
  const el = document.getElementById("toast");
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(el._t);
  el._t = setTimeout(function () { el.classList.remove("show"); }, 1800);
}

/* ---------- rendering ---------- */
function itemHTML(id, text) {
  const checked = state.items[id] ? " checked" : "";
  return '<label class="item"><input type="checkbox" data-item="' + id + '"' + checked + "><span>" + esc(text) + "</span></label>";
}

function weekHTML(w) {
  const collapsed = state.collapsed[w.code] ? " collapsed" : "";
  let body = "";
  if (w.target) body += '<p class="target">' + esc(w.target) + "</p>";

  const groups = [];
  w.items.forEach(function (it) {
    if (groups.indexOf(it.group) === -1) groups.push(it.group);
  });
  groups.forEach(function (g) {
    body += '<div class="group-label">' + esc(g) + "</div>";
    const counters = { c: 0 };
    w.items.forEach(function (it) {
      if (it.group !== g) return;
      body += itemHTML(weekItemId(w.code, it.group, counters.c), it.text);
      counters.c++;
    });
  });

  if (w.read) body += '<div class="read"><b>Read:</b> ' + esc(w.read) + "</div>";

  body += '<textarea class="notes" data-notes="' + w.code + '" placeholder="Notes, links, retrospective…">' +
    esc(state.notes[w.code] || "") + "</textarea>";

  return (
    '<section class="week' + collapsed + '" id="week-' + w.code + '">' +
      '<div class="week-head" data-toggle="' + w.code + '">' +
        '<span class="chev">▾</span>' +
        '<span class="badge">' + esc(w.code.toUpperCase()) + "</span>" +
        '<span class="badge prio">' + esc(w.priority) + "</span>" +
        '<span class="week-title">' + esc(w.title) + "</span>" +
        '<span class="week-pct" id="pct-' + w.code + '">0%</span>' +
      "</div>" +
      '<div class="week-body">' + body + "</div>" +
    "</section>"
  );
}

function extraHTML(ex) {
  let inner = "";
  ex.items.forEach(function (t, i) {
    inner += itemHTML(extraItemId(ex.id, i), t);
  });
  return (
    '<section class="card checklist" id="extra-' + ex.id + '">' +
      "<h3>" + esc(ex.title) + "</h3>" +
      (ex.note ? '<p class="read" style="margin-top:0">' + esc(ex.note) + "</p>" : "") +
      inner +
    "</section>"
  );
}

function infoHTML(info) {
  return (
    '<section class="card">' +
      "<h3>" + esc(info.title) + "</h3>" +
      "<ul>" + info.items.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul>" +
    "</section>"
  );
}

function render() {
  const app = document.getElementById("app");
  let html = "";

  PLAN.phases.forEach(function (ph) {
    html += '<div class="phase-head"><h2>Phase ' + ph.id + ": " + esc(ph.name) + "</h2>" +
      '<span class="meta">' + esc(ph.range) + " · " + esc(ph.meta) + "</span></div>";
    PLAN.weeks.filter(function (w) { return w.phase === ph.id; }).forEach(function (w) {
      html += weekHTML(w);
    });
  });

  html += '<div class="phase-head"><h2>Outcomes</h2></div>';
  PLAN.extras.forEach(function (ex) { html += extraHTML(ex); });

  html += '<div class="phase-head"><h2>Reference</h2></div>';
  html += '<div class="grid">' + PLAN.info.map(infoHTML).join("") + "</div>";

  app.innerHTML = html;
  updateProgress();
}

/* ---------- progress ---------- */
function updateProgress() {
  PLAN.weeks.forEach(function (w) {
    const counters = {};
    let total = 0, done = 0;
    w.items.forEach(function (it) {
      const g = it.group.toLowerCase();
      counters[g] = counters[g] || 0;
      const id = weekItemId(w.code, it.group, counters[g]);
      counters[g]++;
      total++;
      if (state.items[id]) done++;
    });
    const pct = total ? Math.round((done / total) * 100) : 0;
    const el = document.getElementById("pct-" + w.code);
    if (el) {
      el.textContent = pct + "%";
      el.classList.toggle("complete", pct === 100);
    }
    const card = document.getElementById("week-" + w.code);
    if (card) card.classList.toggle("done", pct === 100);
  });

  const ids = allItemIds();
  const totalAll = ids.length;
  const doneAll = ids.reduce(function (a, id) { return a + (state.items[id] ? 1 : 0); }, 0);
  const pctAll = totalAll ? Math.round((doneAll / totalAll) * 100) : 0;
  document.getElementById("overallBar").style.width = pctAll + "%";
  document.getElementById("overallText").textContent = pctAll + "% · " + doneAll + "/" + totalAll + " items";
}

/* ---------- events ---------- */
function bindEvents() {
  const app = document.getElementById("app");

  app.addEventListener("change", function (e) {
    const cb = e.target.closest("input[data-item]");
    if (cb) {
      state.items[cb.getAttribute("data-item")] = cb.checked;
      saveSoon();
      updateProgress();
    }
  });

  app.addEventListener("input", function (e) {
    const ta = e.target.closest("textarea[data-notes]");
    if (ta) {
      state.notes[ta.getAttribute("data-notes")] = ta.value;
      saveSoon();
    }
  });

  app.addEventListener("click", function (e) {
    const head = e.target.closest("[data-toggle]");
    if (!head) return;
    const code = head.getAttribute("data-toggle");
    state.collapsed[code] = !state.collapsed[code];
    document.getElementById("week-" + code).classList.toggle("collapsed", state.collapsed[code]);
    saveSoon();
  });

  document.getElementById("exportBtn").addEventListener("click", exportProgress);
  document.getElementById("importBtn").addEventListener("click", function () {
    document.getElementById("importFile").click();
  });
  document.getElementById("importFile").addEventListener("change", importProgress);
  document.getElementById("resetBtn").addEventListener("click", resetProgress);

  window.addEventListener("beforeunload", saveState);
}

/* ---------- export / import / reset ---------- */
function exportProgress() {
  const payload = Object.assign({}, state, { exportedAt: new Date().toISOString() });
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "sa-progress-" + new Date().toISOString().slice(0, 10) + ".json";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
  toast("Exported progress file");
}

function importProgress(e) {
  const file = e.target.files && e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function () {
    try {
      const data = JSON.parse(reader.result);
      if (!data || typeof data !== "object" || typeof data.items !== "object") {
        throw new Error("Not a valid progress file");
      }
      state = Object.assign(defaultState(), data);
      state.notes = state.notes || {};
      state.collapsed = state.collapsed || {};
      saveState();
      render();
      toast("Progress imported");
    } catch (err) {
      toast("Import failed: " + err.message);
    }
    e.target.value = "";
  };
  reader.readAsText(file);
}

function resetProgress() {
  if (!confirm("Reset all progress? This cannot be undone (export a backup first).")) return;
  state = defaultState();
  saveState();
  render();
  toast("Progress reset");
}

/* ---------- init ---------- */
(function init() {
  const had = loadState();
  bindEvents();
  render();
  setSync(had ? "Loaded locally" : "Ready · auto-saving");
})();
