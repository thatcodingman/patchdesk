// The Patch Desk — Reveal Breakdowns data
// Add a new reveal by adding one object here.
// date: ISO string "YYYY-MM-DD" — the date YOU published this piece
// (not the game's reveal date) — drives sort order + RSS pubDate.

const REVEALS = [
  {
    slug: "r6s-operation-split-fire",
    title: "Rainbow Six Siege — Operation Split Fire",
    meta: "Revealed Aug 15, 2026 · Full launch Sept 1, 2026",
    live: true,
    date: "2026-08-17",
    blurb: "What's officially confirmed before a big update drops, and how the community's reacting to the announcement."
  }
];

if (typeof module !== "undefined") module.exports = REVEALS;
