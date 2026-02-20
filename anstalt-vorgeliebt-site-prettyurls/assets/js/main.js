const REVIEWS = [
  {name:"K. M.", date:"2025-11", stars:5, text:"Sehr professionell, freundlich und strukturiert. Von der Besichtigung bis zur Übergabe lief alles nachvollziehbar."},
  {name:"S. R.", date:"2025-10", stars:5, text:"Diskret und zuverlässig. Man merkt, dass hier mit Wertschätzung gearbeitet wird."},
  {name:"A. H.", date:"2025-09", stars:5, text:"Kurzfristiger Termin, klare Abstimmung, saubere Übergabe. Genau so wünscht man sich das."},
  {name:"M. B.", date:"2025-08", stars:5, text:"Sehr gute Organisation und ein eingespieltes Team. Absolute Empfehlung."},
  {name:"L. S.", date:"2025-07", stars:5, text:"Transparent, termintreu und ohne Überraschungen. Vielen Dank."},
  {name:"T. W.", date:"2025-06", stars:5, text:"Wertanrechnung wurde fair berücksichtigt, alles lief ruhig und strukturiert ab."},
  {name:"P. D.", date:"2025-05", stars:5, text:"Schnelle Besichtigung, klare Einschätzung und zuverlässige Umsetzung."},
  {name:"N. F.", date:"2025-04", stars:5, text:"Sehr respektvoller Umgang, man fühlt sich gut aufgehoben."},
  {name:"J. K.", date:"2025-03", stars:5, text:"Sauber gearbeitet und am Ende besenrein übergeben. Top."},
  {name:"E. G.", date:"2025-02", stars:5, text:"Planung und Ablauf waren sehr klar. Kommunikation direkt und freundlich."},
  {name:"R. P.", date:"2025-01", stars:5, text:"Zuverlässig, diskret, strukturiert. Danke für die Unterstützung."},
  {name:"H. V.", date:"2024-12", stars:5, text:"Man merkt die Erfahrung. Alles wurde ruhig und professionell gelöst."}
];
function pickRandomReviews(n=3){
  const arr=[...REVIEWS];
  for(let i=arr.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [arr[i],arr[j]]=[arr[j],arr[i]];
  }
  return arr.slice(0,n);
}
function stars(s){return "★★★★★".slice(0,s) + "☆☆☆☆☆".slice(0,5-s);}
function renderReviews(targetId){
  const el=document.getElementById(targetId);
  if(!el) return;
  const picks=pickRandomReviews(3);
  el.innerHTML = picks.map(r => `
    <div class="card review">
      <div class="stars" aria-label="${r.stars} von 5 Sternen">${stars(r.stars)}</div>
      <blockquote>“${r.text}”</blockquote>
      <div class="meta"><span>${r.name}</span><span>•</span><span>${r.date}</span></div>
    </div>
  `).join("");
}
document.addEventListener("DOMContentLoaded", ()=>{
  document.querySelectorAll("[data-reviews]").forEach(el=>renderReviews(el.getAttribute("data-reviews")));
  const y=document.getElementById("year");
  if(y) y.textContent = new Date().getFullYear();
});