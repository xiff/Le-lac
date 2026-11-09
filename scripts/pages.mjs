// Génère une page statique par plage (plage/<id>/index.html) et sitemap.xml, pour Google.
// Les conditions du jour sont chargées en direct par plage/plage.js. Relancer quand spots.js ou lieux.js change.
import { mkdir, writeFile } from 'node:fs/promises';
import { SPOTS } from '../spots.js';
import { LIEUX } from '../lieux.js';
import { URLS_BLOG } from './blog.mjs';

const BASE = 'https://xiff.github.io/Le-lac/';
const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
const dist = (a, b) => Math.hypot(a.lat - b.lat, (a.lon - b.lon) * Math.cos((a.lat * Math.PI) / 180));

const REGIONS_EN = { 'Genève': 'Geneva', 'Morges et Lausanne': 'Morges & Lausanne', 'Rive française': 'French shore' };
const TXT = {
  fr: {
    titre: (n) => `Température de l’eau à ${n} aujourd’hui`, suffixe: 'Léman',
    desc: (n, r) => `Température de l’eau à 70 cm à ${n} (${r}, Léman), vent, bise et verdict du jour pour la baignade, le paddle et la voile. Mis à jour toutes les 3 heures.`,
    retour: '← Toutes les plages du Léman', attente: 'On regarde le lac…', eau: 'eau à 70 cm', air: 'air', vent: 'vent km/h',
    releve: 'conditions mises à jour toutes les 3 heures', ouvrir: (n) => `Ouvrir ${n} dans l’app`, act: 'Sur l’eau aujourd’hui',
    actsVide: 'Baignade, paddle, voile et bain d’hiver : la note de chaque activité s’affiche ici.', voisines: 'Les plages voisines',
    lieux: 'Un verre ou un repas dans le coin', saison: ' · ouvert en saison', donnees: 'D’où viennent ces chiffres',
    texte: (n) => `La température de l’eau à ${n} vient du modèle Alplakes de l’Eawag, qui calcule le Léman en trois dimensions : on lit la valeur à 70 cm sous la surface, devant la plage, toutes les trois heures. Le vent et l’air viennent d’Open-Meteo. La qualité de l’eau de baignade n’est affichée que si une analyse de moins de 30 jours existe (canton de Genève pour les plages genevoises) ; sinon, vérifie-la à la source auprès du canton ou de la CIPEL, liens en bas de page. Le verdict est calculé par l’app Mon Lac aujourd’hui à partir de ces données. Indicatif : le lac a toujours le dernier mot.`,
    pied: 'Eau : <a href="https://www.alplakes.eawag.ch">Alplakes, Eawag</a> (CC BY 4.0) · qualité : <a href="https://ge.ch/sitg/">Canton de Genève (SITG)</a> et <a href="https://www.cipel.org/carte-des-plages/">CIPEL</a> · météo : <a href="https://open-meteo.com">Open-Meteo</a>',
    app: 'Mon Lac aujourd’hui', autre: 'English', lac: 'Lac Léman',
    liste: 'Toutes les plages du Léman', listeDesc: 'Les 65 plages du Léman suivies par Mon Lac aujourd’hui : température de l’eau, vent et verdict du jour, plage par plage.', presentation: 'Présentation',
  },
  en: {
    titre: (n) => `Water temperature at ${n} today`, suffixe: 'Lake Geneva',
    desc: (n, r) => `Water temperature at 70 cm at ${n} (${r}, Lake Geneva), wind, bise and today’s verdict for swimming, paddle and sailing. Updated every 3 hours.`,
    retour: '← All Lake Geneva beaches', attente: 'Checking the lake…', eau: 'water at 70 cm', air: 'air', vent: 'wind km/h',
    releve: 'conditions updated every 3 hours', ouvrir: (n) => `Open ${n} in the app`, act: 'On the water today',
    actsVide: 'Swimming, paddle, sailing and winter swim: each activity’s rating appears here.', voisines: 'Nearby beaches',
    lieux: 'A drink or a meal nearby', saison: ' · open in season', donnees: 'Where these figures come from',
    texte: (n) => `The water temperature at ${n} comes from the Alplakes model by Eawag, which computes Lake Geneva in three dimensions: we read the value 70 cm below the surface, in front of the beach, every three hours. Wind and air come from Open-Meteo. Bathing water quality is only shown when a test less than 30 days old exists (Canton of Geneva for Geneva beaches); otherwise check it at the source with the canton or CIPEL, links at the bottom of the page. The verdict is computed by the My Lake Today app from this data. For guidance only: the lake always has the last word.`,
    pied: 'Water: <a href="https://www.alplakes.eawag.ch">Alplakes, Eawag</a> (CC BY 4.0) · quality: <a href="https://ge.ch/sitg/">Canton of Geneva (SITG)</a> and <a href="https://www.cipel.org/carte-des-plages/">CIPEL</a> · weather: <a href="https://open-meteo.com">Open-Meteo</a>',
    app: 'My Lake Today', autre: 'Français', lac: 'Lake Geneva',
    liste: 'All Lake Geneva beaches', listeDesc: 'The 65 Lake Geneva beaches followed by My Lake Today: water temperature, wind and today’s verdict, beach by beach.', presentation: 'About',
  },
};

// Page d'une plage en français (plage/<id>/) ou en anglais (plage/<id>/en/, un niveau plus bas).
export function page(s, langue = 'fr') {
  const t = TXT[langue], en = langue === 'en', r = en ? '../' : '';
  const voisines = SPOTS.filter((x) => x !== s).sort((a, b) => dist(s, a) - dist(s, b)).slice(0, 4);
  const lieux = LIEUX.filter((l) => l.zone === s.zone);
  const region = en ? REGIONS_EN[s.region] ?? s.region : s.region;
  const urlFr = `${BASE}plage/${s.id}/`, urlEn = `${urlFr}en/`, url = en ? urlEn : urlFr;
  const titre = t.titre(s.nom), desc = t.desc(s.nom, region);
  const ld = { '@context': 'https://schema.org', '@type': 'Beach', name: s.nom, url, geo: { '@type': 'GeoCoordinates', latitude: s.lat, longitude: s.lon }, containedInPlace: { '@type': 'LakeBodyOfWater', name: t.lac } };
  const app = `${r}../../${en ? '?lang=en&' : '?'}plage=${s.id}`;
  return `<!doctype html>
<html lang="${langue}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(titre)} · ${t.suffixe}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${url}">
<link rel="alternate" hreflang="fr" href="${urlFr}">
<link rel="alternate" hreflang="en" href="${urlEn}">
<meta property="og:title" content="${esc(titre)}">
<meta property="og:description" content="${esc(desc)}">
<meta name="theme-color" content="#0d4a5c">
<link rel="icon" href="${r}../../icon.svg">
<link rel="stylesheet" href="${r}../plage.css">
<script type="application/ld+json">${JSON.stringify(ld)}</script>
</head>
<body data-id="${s.id}">
<header>
  <div class="haut"><a class="retour" href="${en ? '../../en/' : '../'}">${t.retour}</a><a class="retour" href="${en ? '../' : 'en/'}" hreflang="${en ? 'fr' : 'en'}" lang="${en ? 'fr' : 'en'}">${t.autre}</a></div>
  <h1>${esc(titre)}</h1>
  <p class="verdict" id="verdict">${t.attente}</p>
  <div class="mesures">
    <div><b id="eau">–</b><small>${t.eau}</small></div>
    <div><b id="air">–</b><small>${t.air}</small></div>
    <div><b id="vent">–</b><small>${t.vent}</small></div>
  </div>
  <p class="releve" id="releve">${esc(region)} · ${t.releve}</p>
  <a class="bouton" href="${app}">${esc(t.ouvrir(s.nom))}</a>
</header>
<main>
  <section aria-labelledby="t-act">
    <h2 id="t-act">${t.act}</h2>
    <p class="qualite" id="qualite" hidden></p>
    <ul class="acts" id="acts"><li>${t.actsVide}</li></ul>
  </section>
  <section aria-labelledby="t-vois">
    <h2 id="t-vois">${t.voisines}</h2>
    <ul class="voisines">
${voisines.map((v) => `      <li><a href="${en ? `../../${v.id}/en/` : `../${v.id}/`}">${esc(v.nom)}</a><span data-eau="${v.id}">–</span></li>`).join('\n')}
    </ul>
  </section>
${lieux.length ? `  <section aria-labelledby="t-lieux">
    <h2 id="t-lieux">${t.lieux}</h2>
    <ul class="lieux">
${lieux.map((l) => `      <li><b>${esc(l.nom)}</b><span>${esc(l.ville)}${l.mois ? t.saison : ''}</span><p>${esc(en ? l.en : l.note)}</p></li>`).join('\n')}
    </ul>
  </section>
` : ''}  <section aria-labelledby="t-don">
    <h2 id="t-don">${t.donnees}</h2>
    <p>${esc(t.texte(s.nom))}</p>
  </section>
</main>
<footer>${t.pied} · <a href="${r}../../${en ? '?lang=en' : ''}">${t.app}</a></footer>
<script type="module" src="${r}../plage.js"></script>
</body>
</html>
`;
}

// Liste de toutes les plages par région : plage/ (français) et plage/en/ (anglais).
export function liste(langue = 'fr') {
  const t = TXT[langue], en = langue === 'en', r = en ? '../' : '';
  const regions = [...new Set(SPOTS.map((s) => s.region))];
  return `<!doctype html>
<html lang="${langue}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${t.liste} · ${t.app}</title>
<meta name="description" content="${esc(t.listeDesc)}">
<link rel="canonical" href="${BASE}plage/${en ? 'en/' : ''}">
<link rel="alternate" hreflang="fr" href="${BASE}plage/">
<link rel="alternate" hreflang="en" href="${BASE}plage/en/">
<meta name="theme-color" content="#0d4a5c">
<link rel="icon" href="${r}../icon.svg">
<link rel="stylesheet" href="${r}plage.css">
</head>
<body>
<header>
  <div class="haut"><a class="retour" href="${r}../${en ? '?lang=en' : ''}">← ${t.app}</a><a class="retour" href="${en ? '../' : 'en/'}" hreflang="${en ? 'fr' : 'en'}" lang="${en ? 'fr' : 'en'}">${t.autre}</a></div>
  <h1>${t.liste}</h1>
  <p class="releve">${esc(t.listeDesc)}</p>
</header>
<main>
${regions.map((reg) => `  <section>
    <h2>${esc(en ? REGIONS_EN[reg] ?? reg : reg)}</h2>
    <ul class="voisines">
${SPOTS.filter((s) => s.region === reg).map((s) => `      <li><a href="${en ? `../${s.id}/en/` : `${s.id}/`}">${esc(s.nom)}</a></li>`).join('\n')}
    </ul>
  </section>`).join('\n')}
</main>
<footer><a href="${r}../presentation/${en ? 'en/' : ''}">${t.presentation}</a> · <a href="${r}../blog/${en ? 'en/' : ''}">Blog</a> · <a href="${r}../${en ? '?lang=en' : ''}">${t.app}</a></footer>
</body>
</html>
`;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  await mkdir('plage/en', { recursive: true });
  await writeFile('plage/index.html', liste());
  await writeFile('plage/en/index.html', liste('en'));
  for (const s of SPOTS) {
    await mkdir(`plage/${s.id}`, { recursive: true });
    await mkdir(`plage/${s.id}/en`, { recursive: true });
    await writeFile(`plage/${s.id}/index.html`, page(s));
    await writeFile(`plage/${s.id}/en/index.html`, page(s, 'en'));
  }
  const urls = ['', 'presentation/', 'presentation/en/', 'plage/', 'plage/en/', ...URLS_BLOG, ...SPOTS.flatMap((s) => [`plage/${s.id}/`, `plage/${s.id}/en/`])];
  await writeFile('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${BASE}${u}</loc></url>`).join('\n')}\n</urlset>\n`);
  console.log(`${SPOTS.length * 2} pages de plage (FR et EN) et sitemap.xml générés.`);
}
