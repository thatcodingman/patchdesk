// The Patch Desk — Reviews data
// Add a new review by adding one object here. Newest first.
// score bars are 0-100. delta tone: "good" | "mid" | "bad"
// To publish: copy reviews/_template.html to reviews/your-slug.html,
// fill it in, then set that review's "live" to true and "slug" to match.

const REVIEWS = [
  {
    slug: "format-preview-1",
    title: "Review Title Goes Here",
    meta: "Platform · Genre · Launch price",
    live: false, // set true once the real article page exists
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
    stats: [
      { label: "Worth the price", value: 91, tone: "good" },
      { label: "vs. last year", value: 85, tone: "good" },
      { label: "Performance", value: 88, tone: "good" }
    ]
  }
];

if (typeof module !== "undefined") module.exports = REVIEWS;
