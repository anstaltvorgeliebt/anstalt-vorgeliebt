(function () {
  const DEFAULT_ROTATE_MS = 9000;
  const DEFAULT_COUNT = 3;

  function escapeHtml(str) {
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function stars(n) {
    n = Math.max(1, Math.min(5, Number(n) || 5));
    const full = "★★★★★";
    const empty = "☆☆☆☆☆";
    return full.slice(0, n) + empty.slice(0, 5 - n);
  }

  function pickRandom(arr, k) {
    const copy = arr.slice();
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy.slice(0, Math.min(k, copy.length));
  }

  function render(container, data) {
    const count = Number(container.dataset.count || DEFAULT_COUNT);
    const chosen = pickRandom(data, count);

    const cards = chosen.map(r => {
      const text = escapeHtml(r.text).replaceAll("\n", "<br>");
      return `
        <article class="av-review-card" role="listitem">
          <div class="av-review-stars" aria-label="${r.stars} von 5 Sternen">${stars(r.stars)}</div>
          <div class="av-review-text">„${text}“</div>
          <div class="av-review-author">– ${escapeHtml(r.name)}</div>
        </article>
      `;
    }).join("");

    const title = container.dataset.title || "Kundenstimmen";
    const subtitle = container.dataset.subtitle || "Echte Bewertungen – regional aus Coburg und Umgebung.";
    container.innerHTML = `
      <section class="av-reviews" aria-label="Kundenbewertungen">
        <div class="av-reviews-head">
          <h2 class="av-reviews-title">${escapeHtml(title)}</h2>
          <p class="av-reviews-subtitle">${escapeHtml(subtitle)}</p>
        </div>
        <div class="av-reviews-grid" role="list">${cards}</div>
      </section>
    `;
  }

  async function init() {
    const containers = Array.from(document.querySelectorAll(".js-av-reviews"));
    if (!containers.length) return;

    let data = [];
    try {
      const res = await fetch("/assets/data/reviews.json", { cache: "force-cache" });
      data = await res.json();
    } catch (e) {
      console.warn("Reviews could not be loaded", e);
      return;
    }

    containers.forEach(container => {
      render(container, data);
      const ms = Number(container.dataset.rotateMs || DEFAULT_ROTATE_MS);
      setInterval(() => render(container, data), ms);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
