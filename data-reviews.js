// The Patch Desk — Reviews data
// Add a new review by adding one object here.
// stat bars are 0-100. tone: "good" | "mid" | "bad"
// score: overall verdict, 0-100 (drives the "Highest score" sort + RSS)
// date: ISO string "YYYY-MM-DD" — needed once "live" is true (for sorting + RSS pubDate)
//
// To publish: copy reviews/_template.html to reviews/your-slug.html,
// fill it in, then set that review's "live" to true, "slug" to match,
// and "date" to the real publish date.

const REVIEWS = [
  {
    slug: "nba-2k27-review",
    title: "NBA 2K27 Review: Is It Worth the $70?",
    meta: "PS5, Xbox Series X|S, PC, Switch 2 · Reviewed September 2026",
    live: true,
    date: "2026-09-05",
    score: 65,
    stats: [
      { label: "Worth the price", value: 50, tone: "split" },
      { label: "vs. last year", value: 58, tone: "mid" },
      { label: "Performance", value: 42, tone: "bad" }
    ]
  },
  {
    slug: "format-preview-1",
    title: "Review Title Goes Here",
    meta: "Platform · Genre · Launch price",
    live: false, // set true once the real article page exists
    date: null,  // set to "YYYY-MM-DD" when live
    score: 78,
    stats: [
      { label: "Worth the price", value: 80, tone: "good" },
      { label: "vs. last year", value: 55, tone: "mid" },
      { label: "Performance", value: 75, tone: "good" }
    ]
  },
  {
    slug: "format-preview-2",
    title: "Review Title Goes Here",
    meta: "Platform · Genre · Launch price",
    live: false,
    date: null,
    score: 47,
    stats: [
      { label: "Worth the price", value: 52, tone: "mid" },
      { label: "vs. last year", value: 30, tone: "bad" },
      { label: "Performance", value: 60, tone: "mid" }
    ]
  },
  {
    slug: "format-preview-3",
    title: "Review Title Goes Here",
    meta: "Platform · Genre · Launch price",
    live: false,
    date: null,
    score: 88,
    stats: [
      { label: "Worth the price", value: 91, tone: "good" },
      { label: "vs. last year", value: 85, tone: "good" },
      { label: "Performance", value: 88, tone: "good" }
    ]
  }
];

if (typeof module !== "undefined") module.exports = REVIEWS;
