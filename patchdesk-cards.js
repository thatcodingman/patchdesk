// The Patch Desk — card renderer
// Reads REVIEWS / PATCH_WATCH / REVEALS (loaded via <script> before this
// file) and builds the card HTML. One source of truth, used by the
// homepage previews, the per-type archive pages, and the combined
// "Everything" browse page.

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

function revealCardHTML(v) {
  const href = v.live ? `reveals/${v.slug}.html` : "#";
  const badge = v.live ? "REVEAL" : "FORMAT PREVIEW";

  return `
    <a class="update-card" href="${href}" style="text-decoration:none; color:inherit; display:block;">
      <span class="badge" style="background:var(--mid); color:var(--bg);">${badge}</span>
      <h3>${v.title}</h3>
      <div class="meta">${v.meta}</div>
      <p class="blurb">${v.blurb}</p>
    </a>`;
}

const KIND_CONFIG = {
  reviews:    { data: () => REVIEWS,     render: reviewCardHTML },
  patchwatch: { data: () => PATCH_WATCH, render: updateCardHTML },
  reveals:    { data: () => REVEALS,     render: revealCardHTML }
};

function renderList(kind, containerSelector, items) {
  const container = document.querySelector(containerSelector);
  if (!container) return;
  const render = KIND_CONFIG[kind].render;
  const html = items.map(render).join("");
  container.innerHTML = html || `<p style="color:var(--text-soft); grid-column: 1/-1;">Nothing here yet.</p>`;
}

/**
 * Renders cards into a container, in the data file's original order.
 * kind: "reviews" | "patchwatch" | "reveals"
 * limit: number of cards to show, or null for all
 */
function renderCards(kind, containerSelector, limit = null) {
  const data = KIND_CONFIG[kind].data();
  const items = limit ? data.slice(0, limit) : data;
  renderList(kind, containerSelector, items);
}

/* ---------------- sorting (per-type archive pages) ---------------- */

const DELTA_RANK = { up: 2, flat: 1, down: 0 };

function sortItems(kind, mode) {
  const data = KIND_CONFIG[kind].data().slice();

  if (mode === "newest") {
    return data.sort((a, b) => (b.date || "").localeCompare(a.date || ""));
  }
  if (mode === "oldest") {
    return data.sort((a, b) => (a.date || "").localeCompare(b.date || ""));
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
 * Renders up to `count` other entries (excluding currentSlug) into a
 * container — used at the bottom of an article page.
 * kind: "reviews" | "patchwatch" | "reveals"
 */
function renderRelated(kind, containerSelector, currentSlug, count = 3) {
  const data = KIND_CONFIG[kind].data();
  const others = data.filter(item => item.slug !== currentSlug).slice(0, count);
  renderList(kind, containerSelector, others);
}

/**
 * Wires up a .sort-bar's buttons to re-render a container on click.
 * kind: "reviews" | "patchwatch" | "reveals"
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

/* ---------------- combined "Everything" browse page ---------------- */

function allContentItems(sortMode = "newest") {
  const combined = [
    ...REVIEWS.map(r => ({ ...r, _kind: "reviews" })),
    ...PATCH_WATCH.map(u => ({ ...u, _kind: "patchwatch" })),
    ...REVEALS.map(v => ({ ...v, _kind: "reveals" }))
  ];
  return combined.sort((a, b) =>
    sortMode === "oldest"
      ? (a.date || "").localeCompare(b.date || "")
      : (b.date || "").localeCompare(a.date || "")
  );
}

function renderAllContent(containerSelector, filterKind = "all", sortMode = "newest") {
  const container = document.querySelector(containerSelector);
  if (!container) return;
  let items = allContentItems(sortMode);
  if (filterKind !== "all") items = items.filter(i => i._kind === filterKind);

  const html = items.map(item => KIND_CONFIG[item._kind].render(item)).join("");
  container.innerHTML = html || `<p style="color:var(--text-soft); grid-column: 1/-1;">Nothing here yet.</p>`;
}

/**
 * Wires up filter chips + a sort bar together for the combined browse page.
 */
function initAllContentControls(filterBarSelector, sortBarSelector, containerSelector) {
  const filterBar = document.querySelector(filterBarSelector);
  const sortBar = document.querySelector(sortBarSelector);
  if (!filterBar || !sortBar) return;

  const filterButtons = filterBar.querySelectorAll("[data-filter]");
  const sortButtons = sortBar.querySelectorAll("[data-sort]");

  const rerender = () => {
    const filterKind = filterBar.querySelector("[data-filter].active").getAttribute("data-filter");
    const sortMode = sortBar.querySelector("[data-sort].active").getAttribute("data-sort");
    renderAllContent(containerSelector, filterKind, sortMode);
  };

  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      rerender();
    });
  });

  sortButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      sortButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      rerender();
    });
  });
}
