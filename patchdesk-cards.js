// The Patch Desk — card renderer
// Reads REVIEWS / PATCH_WATCH (loaded via <script> before this file)
// and builds the card HTML. One source of truth, used by the homepage
// previews and the full archive pages (which add sorting on top).

function reviewCardHTML(r) {
  const href = r.live ? `reviews/${r.slug}.html` : "#";
  const badge = r.live ? "REVIEW" : "FORMAT PREVIEW";
  const meters = r.stats.map(s => `
    <div class="mini-meter">
      <span class="lbl">${s.label}</span>
      <div class="meter"><div class="meter-fill ${s.tone}" style="width:${s.value}%"></div></div>
    </div>`).join("");

  return `
    <a class="review-card" href="${href}" style="text-decoration:none; color:inherit; display:block;">
      <span class="badge">${badge}</span>
      <h3>${r.title}</h3>
      <div class="meta">${r.meta}</div>
      ${meters}
    </a>`;
}

function updateCardHTML(u) {
  const href = u.live ? `patch-watch/${u.slug}.html` : "#";
  const badge = u.live ? "PATCH WATCH" : "FORMAT PREVIEW";
  const arrow = u.delta === "up" ? "▲" : u.delta === "down" ? "▼" : "—";

  return `
    <a class="update-card" href="${href}" style="text-decoration:none; color:inherit; display:block;">
      <span class="badge">${badge}</span>
      <h3>${u.title}</h3>
      <div class="meta">${u.meta}</div>
      <p class="blurb">${u.blurb}</p>
      <span class="delta ${u.delta}">${arrow} ${u.deltaLabel}</span>
    </a>`;
}

function renderList(kind, containerSelector, items) {
  const container = document.querySelector(containerSelector);
  if (!container) return;
  const html = items.map(kind === "reviews" ? reviewCardHTML : updateCardHTML).join("");
  container.innerHTML = html || `<p style="color:var(--text-soft); grid-column: 1/-1;">Nothing here yet.</p>`;
}

/**
 * Renders cards into a container, in the data file's original order.
 * kind: "reviews" | "patchwatch"
 * limit: number of cards to show, or null for all
 */
function renderCards(kind, containerSelector, limit = null) {
  const data = kind === "reviews" ? REVIEWS : PATCH_WATCH;
  const items = limit ? data.slice(0, limit) : data;
  renderList(kind, containerSelector, items);
}

/* ---------------- sorting (archive pages) ---------------- */

const DELTA_RANK = { up: 2, flat: 1, down: 0 };

function sortItems(kind, mode) {
  const data = (kind === "reviews" ? REVIEWS : PATCH_WATCH).slice();

  if (mode === "newest") {
    return data.sort((a, b) => (b.date || "").localeCompare(a.date || ""));
  }
  if (mode === "score" && kind === "reviews") {
    return data.sort((a, b) => b.score - a.score);
  }
  if (mode === "improved" && kind === "patchwatch") {
    return data.sort((a, b) => DELTA_RANK[b.delta] - DELTA_RANK[a.delta]);
  }
  return data;
}

/**
 * Wires up a .sort-bar's buttons to re-render a container on click.
 * kind: "reviews" | "patchwatch"
 */
function initSortBar(kind, barSelector, containerSelector) {
  const bar = document.querySelector(barSelector);
  if (!bar) return;
  const buttons = bar.querySelectorAll("[data-sort]");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const mode = btn.getAttribute("data-sort");
      renderList(kind, containerSelector, sortItems(kind, mode));
    });
  });
}
