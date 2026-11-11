// Pied de page commun à toutes les pages générées, calqué sur celui de l'app (index.html) :
// sources des données, puis À propos · Toutes les plages · Blog · langue.
// r = chemin vers la racine du site ('' à la racine, '../' un niveau plus bas…), autre = adresse de la page dans l'autre langue.
export function pied(L, r, autre) {
  const en = L === 'en', d = en ? 'en/' : '';
  return `<footer class="pied">
  <span>${en ? 'Weather <a href="https://open-meteo.com">Open-Meteo</a> · water at 70 cm: <a href="https://www.alplakes.eawag.ch">Alplakes, Eawag</a> (CC BY 4.0), model updated every 3 h.<br>For guidance only: the lake always has the last word.'
    : 'Météo <a href="https://open-meteo.com">Open-Meteo</a> · eau à 70 cm : <a href="https://www.alplakes.eawag.ch">Alplakes, Eawag</a> (CC BY 4.0), modèle mis à jour toutes les 3 h.<br>Indicatif : le lac a toujours le dernier mot.'}</span>
  <div class="liens"><a href="${r}presentation/${d}">${en ? 'About' : 'À propos'}</a><a href="${r}plage/${d}">${en ? 'All beaches' : 'Toutes les plages'}</a><a href="${r}blog/${d}">Blog</a><a class="langue" href="${autre}" hreflang="${en ? 'fr' : 'en'}" lang="${en ? 'fr' : 'en'}">${en ? 'Français' : 'English'}</a></div>
</footer>`;
}
