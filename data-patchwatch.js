// The Patch Desk — Patch Watch data
// Add a new check-in by adding one object here.
// delta: "up" | "down" | "flat"
// date: ISO string "YYYY-MM-DD" — needed once "live" is true (for sorting + RSS pubDate)

const PATCH_WATCH = [
  {
    slug: "format-preview-1",
    title: "Game Title — v2.4 Update",
    meta: "Checked in · 8 months post-launch",
    live: false,
    date: null,
    blurb: "Short verdict on what this patch actually changed, in plain language — not the marketing patch notes.",
    delta: "up",
    deltaLabel: "Improved since launch"
  },
  {
    slug: "format-preview-2",
    title: "Game Title — Season 3",
    meta: "Checked in · 1 year post-launch",
    live: false,
    date: null,
    blurb: "New content dropped, but so did something players relied on. Here's the honest trade-off.",
    delta: "flat",
    deltaLabel: "Mixed bag"
  },
  {
    slug: "format-preview-3",
    title: "Game Title — Balance Patch",
    meta: "Checked in · 3 months post-launch",
    live: false,
    date: null,
    blurb: "What got nerfed, what got buffed, and whether the game is actually more fun to play right now.",
    delta: "down",
    deltaLabel: "Slipped since launch"
  }
];

if (typeof module !== "undefined") module.exports = PATCH_WATCH;
