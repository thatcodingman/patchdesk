// The Patch Desk — Release Calendar rendering
// Used on the homepage ("Coming Up" preview) and patchdesk-calendar.html
// (full calendar, grouped by month). Reads the RELEASES array from
// data-releases.js — load that script BEFORE this one.

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function releaseDayNum(dateStr) {
  return new Date(dateStr + "T12:00:00Z").getUTCDate();
}

function releaseMonthAbbrev(dateStr) {
  return new Date(dateStr + "T12:00:00Z")
    .toLocaleString("en-US", { month: "short", timeZone: "UTC" })
    .toUpperCase();
}

function releaseMonthLabel(yearMonthKey) {
  return new Date(yearMonthKey + "-01T12:00:00Z")
    .toLocaleString("en-US", { month: "long", year: "numeric", timeZone: "UTC" });
}

function renderReleaseCard(r) {
  const confBadge = r.confidence === "confirmed"
    ? `<span class="release-confidence confirmed">✓ Confirmed</span>`
    : `<span class="release-confidence estimated">~ Estimated</span>`;

  const delayFlag = r.previousDelay
    ? `<span class="release-delay-flag">⏱ ${escapeHtml(r.previousDelay)}</span>`
    : "";

  const platformTags = r.platforms
    .map(p => `<span class="platform-tag">${escapeHtml(p)}</span>`)
    .join("");

  const devPub = r.publisher && r.publisher !== r.developer
    ? `${escapeHtml(r.developer)} / ${escapeHtml(r.publisher)}`
    : escapeHtml(r.developer);

  return `
    <div class="release-card">
      <div class="release-date">
        <div class="day">${releaseDayNum(r.date)}</div>
        <span class="month">${releaseMonthAbbrev(r.date)}</span>
      </div>
      <div class="release-body">
        ${confBadge}
        <h3 class="release-title">${escapeHtml(r.title)}</h3>
        <div class="release-meta">${escapeHtml(r.genre)} · ${devPub}</div>
        <div class="release-platforms">${platformTags}</div>
        <p class="release-blurb">${escapeHtml(r.blurb)}</p>
        <div class="release-source">
          <a href="${r.sourceUrl}" target="_blank" rel="noopener">Verified source ↗</a>
          <span class="release-verified-note">· last checked ${r.lastVerified}</span>
        </div>
        ${delayFlag}
      </div>
    </div>`;
}

// Full calendar page — groups every entry by month, in chronological order.
function renderCalendar(selector) {
  const el = document.querySelector(selector);
  if (!el || typeof RELEASES === "undefined") return;

  const sorted = [...RELEASES].sort((a, b) => a.date.localeCompare(b.date));
  const groups = {};
  sorted.forEach(r => {
    const key = r.date.slice(0, 7); // YYYY-MM
    (groups[key] = groups[key] || []).push(r);
  });

  let html = "";
  Object.keys(groups).sort().forEach(key => {
    html += `<h2 class="calendar-month-heading">${releaseMonthLabel(key)}</h2>`;
    html += `<div class="release-list">${groups[key].map(renderReleaseCard).join("")}</div>`;
  });

  el.innerHTML = html || `<p style="color:var(--text-soft);">No confirmed releases on the calendar yet — check back soon.</p>`;
}

// Homepage preview — shows the next N upcoming entries (today or later).
// Falls back to the earliest N entries if everything on record is already past.
function renderReleasePreview(selector, count) {
  const el = document.querySelector(selector);
  if (!el || typeof RELEASES === "undefined") return;

  const today = new Date().toISOString().slice(0, 10);
  const sorted = [...RELEASES].sort((a, b) => a.date.localeCompare(b.date));
  const upcoming = sorted.filter(r => r.date >= today).slice(0, count);
  const list = upcoming.length ? upcoming : sorted.slice(0, count);

  el.innerHTML = `<div class="release-list">${list.map(renderReleaseCard).join("")}</div>`;
}
