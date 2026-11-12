// Pied de page commun à toutes les pages générées, calqué sur celui de l'app (index.html) :
// sources des données, puis À propos · Toutes les plages · Blog · autres langues.
// r = chemin vers la racine du site ('' à la racine, '../' un niveau plus bas…).
// langues() : versLangues = { langue: adresse de la même page dans cette langue } ; seules ces langues sont proposées.
const NOMS = { fr: 'Français', en: 'English', de: 'Deutsch', it: 'Italiano' };
const TEXTES = {
  fr: ['Météo <a href="https://open-meteo.com">Open-Meteo</a> · eau à 70 cm : <a href="https://www.alplakes.eawag.ch">Alplakes, Eawag</a> (CC BY 4.0), modèle mis à jour toutes les 3 h.<br>Indicatif : le lac a toujours le dernier mot.<br>Sans compte ni cookie. Mesure d’audience Umami, sans cookie, données hébergées en Europe.', 'À propos', 'Toutes les plages'],
  en: ['Weather <a href="https://open-meteo.com">Open-Meteo</a> · water at 70 cm: <a href="https://www.alplakes.eawag.ch">Alplakes, Eawag</a> (CC BY 4.0), model updated every 3 h.<br>For guidance only: the lake always has the last word.<br>No account, no cookies. Audience measurement by Umami, cookie-free, data hosted in Europe.', 'About', 'All beaches'],
  de: ['Wetter <a href="https://open-meteo.com">Open-Meteo</a> · Wasser in 70 cm Tiefe: <a href="https://www.alplakes.eawag.ch">Alplakes, Eawag</a> (CC BY 4.0), Modell alle 3 Std. aktualisiert.<br>Unverbindlich: Der See hat immer das letzte Wort.<br>Kein Konto, keine Cookies. Besuchermessung mit Umami, ohne Cookies, Daten in Europa gehostet.', 'Über uns', 'Alle Badeplätze'],
  it: ['Meteo <a href="https://open-meteo.com">Open-Meteo</a> · acqua a 70 cm: <a href="https://www.alplakes.eawag.ch">Alplakes, Eawag</a> (CC BY 4.0), modello aggiornato ogni 3 ore.<br>Solo a titolo indicativo: l’ultima parola spetta sempre al lago.<br>Senza account né cookie. Misurazione del pubblico con Umami, senza cookie, dati ospitati in Europa.', 'Informazioni', 'Tutte le spiagge'],
};
// Sélecteur de langue du haut de page : sigle (EN, DE…), nom complet en title et aria-label.
export function langues(L, versLangues) {
  return `<nav class="langues" translate="no" aria-label="${{ fr: 'Langue', en: 'Language', de: 'Sprache', it: 'Lingua' }[L]}">${Object.entries(versLangues).filter(([l]) => l !== L)
    .map(([l, href]) => `<a href="${href}" hreflang="${l}" lang="${l}" title="${NOMS[l]}" aria-label="${NOMS[l]}">${l.toUpperCase()}</a>`).join('')}</nav>`;
}
export function pied(L, r) {
  const [source, apropos, plages] = TEXTES[L], d = { fr: '', en: 'en/', de: 'de/', it: 'it/' }[L];
  return `<footer class="pied">
  <span>${source}</span>
  <div class="liens"><a href="${r}presentation/${d}">${apropos}</a><a href="${r}plage/${d}">${plages}</a><a href="${r}blog/${d}">Blog</a></div>
</footer>`;
}
