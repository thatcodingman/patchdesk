// The Patch Desk — structured data (JSON-LD) injector
//
// Include this on an ARTICLE page (a review, patch watch, or reveal page),
// AFTER the matching data-*.js file. It figures out which content type the
// page is from the URL, finds the matching entry in that data array by
// slug, and injects the right JSON-LD schema into <head>.
//
// Reviews/_template.html   -> load data-reviews.js    then this file
// patch-watch/_template.html -> load data-patchwatch.js then this file
// reveals pages             -> load data-reveals.js    then this file
//
// Nothing to configure per-article — it reads the same object your card
// renderers already use, so a piece only needs to go live once.

(function () {
  const SITE = "https://thepatchdesk.com";

  function getSlugAndType() {
    const path = window.location.pathname;
    if (path.includes("/reviews/")) return { type: "review", slug: path.split("/").pop().replace(".html", "") };
    if (path.includes("/patch-watch/")) return { type: "patchwatch", slug: path.split("/").pop().replace(".html", "") };
    if (path.includes("/reveals/")) return { type: "reveal", slug: path.split("/").pop().replace(".html", "") };
    return null;
  }

  function findEntry(type) {
    try {
      if (type === "review" && typeof REVIEWS !== "undefined") return REVIEWS;
      if (type === "patchwatch" && typeof PATCH_WATCH !== "undefined") return PATCH_WATCH;
      if (type === "reveal" && typeof REVEALS !== "undefined") return REVEALS;
    } catch (e) { /* array not loaded on this page */ }
    return null;
  }

  function buildReviewJSON(data, url) {
    const json = {
      "@context": "https://schema.org",
      "@type": "Review",
      "name": data.title,
      "url": url,
      "datePublished": data.date,
      "itemReviewed": {
        "@type": "VideoGame",
        "name": data.title
      },
      "author": { "@type": "Organization", "name": "The Patch Desk", "url": SITE },
      "publisher": {
        "@type": "Organization",
        "name": "The Patch Desk",
        "url": SITE,
        "logo": { "@type": "ImageObject", "url": `${SITE}/patchdesk-og.png` }
      }
    };
    if (typeof data.score === "number") {
      json.reviewRating = {
        "@type": "Rating",
        "ratingValue": data.score,
        "bestRating": 100,
        "worstRating": 0
      };
    }
    return json;
  }

  function buildArticleJSON(data, url, label) {
    return {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": data.title,
      "description": data.blurb || data.meta || "",
      "datePublished": data.date,
      "dateModified": data.date,
      "url": url,
      "mainEntityOfPage": { "@type": "WebPage", "@id": url },
      "author": { "@type": "Organization", "name": "The Patch Desk", "url": SITE },
      "publisher": {
        "@type": "Organization",
        "name": "The Patch Desk",
        "url": SITE,
        "logo": { "@type": "ImageObject", "url": `${SITE}/patchdesk-og.png` }
      },
      "articleSection": label
    };
  }

  function injectStructuredData() {
    const info = getSlugAndType();
    if (!info) return;

    const arr = findEntry(info.type);
    if (!arr) return;

    const data = arr.find(item => item.slug === info.slug);
    if (!data || !data.live) return;

    const folder = info.type === "review" ? "reviews" : info.type === "patchwatch" ? "patch-watch" : "reveals";
    const url = `${SITE}/${folder}/${info.slug}.html`;

    let json;
    if (info.type === "review") {
      json = buildReviewJSON(data, url);
    } else if (info.type === "patchwatch") {
      json = buildArticleJSON(data, url, "Patch Watch");
    } else {
      json = buildArticleJSON(data, url, "Reveal Breakdown");
    }

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(json);
    document.head.appendChild(script);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", injectStructuredData);
  } else {
    injectStructuredData();
  }
})();
