const reviewsData = [
  // ERSETZEN: echte Google-Bewertungen 1:1 (Text + Name/Ort). Keine erfundenen Bewertungen.
  { stars: 5, text: "HIER ECHTE BEWERTUNG 1:1 EINFÜGEN", who: "Name, Ort" },
  { stars: 5, text: "HIER ECHTE BEWERTUNG 1:1 EINFÜGEN", who: "Name, Ort" },
  { stars: 5, text: "HIER ECHTE BEWERTUNG 1:1 EINFÜGEN", who: "Name, Ort" },
  { stars: 5, text: "HIER ECHTE BEWERTUNG 1:1 EINFÜGEN", who: "Name, Ort" },
  { stars: 5, text: "HIER ECHTE BEWERTUNG 1:1 EINFÜGEN", who: "Name, Ort" },
  { stars: 5, text: "HIER ECHTE BEWERTUNG 1:1 EINFÜGEN", who: "Name, Ort" },
];

function starString(n){
  const full = "★★★★★".slice(0, Math.max(0, Math.min(5,n)));
  const empty = "☆☆☆☆☆".slice(0, 5 - Math.max(0, Math.min(5,n)));
  return full + empty;
}

function mountRotatingReviews(){
  const slots = document.querySelectorAll("[data-review-slot]");
  if(!slots.length) return;
  const used = new Set();
  slots.forEach((slot) => {
    let idx = Math.floor(Math.random()*reviewsData.length);
    let tries = 0;
    while(used.has(idx) && tries < 10){
      idx = Math.floor(Math.random()*reviewsData.length);
      tries++;
    }
    used.add(idx);
    const r = reviewsData[idx];
    const starsEl = slot.querySelector(".stars");
    const textEl  = slot.querySelector(".rtext");
    const whoEl   = slot.querySelector(".who");
    if(starsEl) starsEl.textContent = starString(r.stars);
    if(textEl)  textEl.textContent  = r.text;
    if(whoEl)   whoEl.textContent   = "– " + r.who;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  mountRotatingReviews();
});
