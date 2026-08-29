// The Patch Desk — Patch Watch data
// Add a new check-in by adding one object here.
// delta: "up" | "down" | "flat"  — YOUR editorial verdict on the patch
// sentiment: 0-100 — COMMUNITY reaction, kept separate from your own delta
// requested: "yes" | "no" | "mixed" — was this asked for by players?
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
    deltaLabel: "Improved since launch",
    sentiment: 74,
    requested: "yes",
    patchSize: "4.2 GB (PS5) / 3.8 GB (PC)"
  },
  {
    slug: "format-preview-2",
    title: "Game Title — Season 3",
    meta: "Checked in · 1 year post-launch",
    live: false,
    date: null,
    blurb: "New content dropped, but so did something players relied on. Here's the honest trade-off.",
    delta: "flat",
    deltaLabel: "Mixed bag",
    sentiment: 51,
    requested: "mixed",
    patchSize: "6.1 GB (all platforms)"
  },
  {
    slug: "helldivers-2-devoid-of-liberty",
    title: "Helldivers 2 — Devoid of Liberty: The Illuminate Void",
    meta: "Checked in ~1 week after launch",
    live: true,
    date: "2026-08-19",
    blurb: "The Illuminate's first real content update — good systems, thin enemy roster.",
    delta: "flat",
    deltaLabel: "A step forward, not a home run",
    sentiment: 61,
    requested: "mixed",
    patchSize: "5.46 GB (PS5)"
  },
  {
    slug: "the-finals-1160",
    title: "THE FINALS — v11.6.0 Space Mayhem",
    meta: "Checked in · 1 day after launch",
    live: true,
    date: "2026-08-21",
    blurb: "M11 gets hit hard, AKM gets a small buff, and melee finally chases better — but the Spear stamina rework is still a sore spot.",
    delta: "up",
    deltaLabel: "Correction patch, not a full fix",
    sentiment: null,
    requested: "mixed",
    patchSize: "TBD — not verified, don't publish a number without a platform-specific source"
  },
  {
    slug: "sea-of-thieves-382",
    title: "Sea of Thieves — v3.8.2 Custom Seas & Faction Battle Repair",
    meta: "Checked in · 1 day after launch",
    live: true,
    date: "2026-08-21",
    blurb: "Faction Battle winners finally get their ship repaired for free, but a sprawling Custom Seas expansion has some players wondering if Rare's attention is in the right place.",
    delta: "flat",
    deltaLabel: "Meaningful systems patch, light on content",
    sentiment: null,
    requested: "mixed",
    patchSize: "TBD — not verified for 3.8.2"
  },
  {
    slug: "format-preview-3",
    title: "Game Title — Balance Patch",
    meta: "Checked in · 3 months post-launch",
    live: false,
    date: null,
    blurb: "What got nerfed, what got buffed, and whether the game is actually more fun to play right now.",
    delta: "down",
    deltaLabel: "Slipped since launch",
    sentiment: 32,
    requested: "no",
    patchSize: "1.8 GB (all platforms)"
  },
  {
    slug: "dbd-chorus-of-sin",
    title: "Dead by Daylight — Chorus of Sin",
    meta: "Checked in 1 day after launch",
    live: true,
    date: "2026-08-26",
    blurb: "MMR gets fairer over time, but The Judgment's Divine Light feels weak while Exile picks up the slack.",
    delta: "flat",
    deltaLabel: "Mixed — MMR improves, The Judgment falls short",
    sentiment: null,
    requested: "mixed",
    patchSize: "TBD — not verified"
  },
  {
    slug: "nba-2k27-ghost-patch",
    title: "NBA 2K27 May Have Ghost-Patched — But 2K Isn't Saying",
    meta: "Checked in 2 days after Early Access",
    live: true,
    date: "2026-08-28",
    blurb: "One player reports a slower grind and inconsistent shooting since Early Access — but 2K hasn't confirmed any changes exist.",
    delta: "flat",
    deltaLabel: "Unconfirmed — worth watching",
    sentiment: null,
    requested: "mixed",
    patchSize: "No confirmed patch — undocumented, player-observed only"
  }
];

if (typeof module !== "undefined") module.exports = PATCH_WATCH;
