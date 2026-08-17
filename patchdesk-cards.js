// The Patch Desk — card renderer
// Reads REVIEWS / PATCH_WATCH (loaded via <script> before this file)
// and builds the card HTML. One source of truth, used by the homepage
// previews and the full archive pages.

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

/**
 * Renders cards into a container.
 * kind: "reviews" | "patchwatch"
 * limit: number of cards to show, or null for all
 */
function renderCards(kind, containerSelector, limit = null) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  const data = kind === "reviews" ? REVIEWS : PATCH_WATCH;
  const items = limit ? data.slice(0, limit) : data;
  const html = items.map(kind === "reviews" ? reviewCardHTML : updateCardHTML).join("");

  container.innerHTML = html || `<p style="color:var(--text-soft); grid-column: 1/-1;">Nothing here yet.</p>`;
}
