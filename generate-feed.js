// The Patch Desk — RSS feed generator
// Run with: node generate-feed.js
// Reads data-reviews.js and data-patchwatch.js, includes only entries
// with live:true, and writes feed.xml. Re-run this any time you flip
// a new entry to live.

const fs = require("fs");
const REVIEWS = require("./data-reviews.js");
const PATCH_WATCH = require("./data-patchwatch.js");

const SITE = "https://thepatchdesk.com";

function esc(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function toRFC822(dateStr) {
  return new Date(dateStr + "T12:00:00Z").toUTCString();
}

const reviewItems = REVIEWS
  .filter(r => r.live && r.date)
  .map(r => ({
    title: r.title,
    link: `${SITE}/reviews/${r.slug}.html`,
    guid: `${SITE}/reviews/${r.slug}.html`,
    date: r.date,
    description: `Review — ${r.meta}. Overall score: ${r.score}/100.`
  }));

const patchWatchItems = PATCH_WATCH
  .filter(u => u.live && u.date)
  .map(u => ({
    title: u.title,
    link: `${SITE}/patch-watch/${u.slug}.html`,
    guid: `${SITE}/patch-watch/${u.slug}.html`,
    date: u.date,
    description: `Patch Watch — ${u.blurb}`
  }));

const items = reviewItems.concat(patchWatchItems)
  .sort((a, b) => b.date.localeCompare(a.date));

const itemsXML = items.map(item => `
  <item>
    <title>${esc(item.title)}</title>
    <link>${item.link}</link>
    <guid>${item.guid}</guid>
    <pubDate>${toRFC822(item.date)}</pubDate>
    <description>${esc(item.description)}</description>
  </item>`).join("");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>The Patch Desk</title>
  <link>${SITE}</link>
  <description>Honest game reviews and ongoing Patch Watch coverage — worth the price, or not.</description>
  <language>en-us</language>${itemsXML}
</channel>
</rss>
`;

fs.writeFileSync("feed.xml", xml);
console.log(`feed.xml written with ${items.length} item(s).`);
