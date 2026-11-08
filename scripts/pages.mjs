// Génère une page statique par plage (plage/<id>/index.html) et sitemap.xml, pour Google.
// Les conditions du jour sont chargées en direct par plage/plage.js. Relancer quand spots.js ou lieux.js change.
import { mkdir, writeFile } from 'node:fs/promises';
import { SPOTS } from '../spots.js';
import { LIEUX } from '../lieux.js';

const BASE = 'https://xiff.github.io/Le-lac/';
const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
const dist = (a, b) => Math.hypot(a.lat - b.lat, (a.lon - b.lon) * Math.cos((a.lat * Math.PI) / 180));

export function page(s) {
  const voisines = SPOTS.filter((x) => x !== s).sort((a, b) => dist(s, a) - dist(s, b)).slice(0, 4);
  const lieux = LIEUX.filter((l) => l.zone === s.zone);
  const titre = `Température de l’eau à ${s.nom} aujourd’hui`;
  const desc = `Température de l’eau à 70 cm à ${s.nom} (${s.region}, Léman), vent, bise et verdict du jour pour la baignade, le paddle et la voile. Mis à jour toutes les 3 heures.`;
  const ld = { '@context': 'https://schema.org', '@type': 'Beach', name: s.nom, url: `${BASE}plage/${s.id}/`, geo: { '@type': 'GeoCoordinates', latitude: s.lat, longitude: s.lon }, containedInPlace: { '@type': 'LakeBodyOfWater', name: 'Lac Léman' } };
  return `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(titre)} · Léman</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${BASE}plage/${s.id}/">
<meta property="og:title" content="${esc(titre)}">
<meta property="og:description" content="${esc(desc)}">
<meta name="theme-color" content="#0d4a5c">
<link rel="icon" href="../../icon.svg">
<link rel="stylesheet" href="../plage.css">
<script type="application/ld+json">${JSON.stringify(ld)}</script>
</head>
<body data-id="${s.id}">
<header>
  <a class="retour" href="../../presentation/#eau">← Toutes les plages du Léman</a>
  <h1>${esc(titre)}</h1>
  <p class="verdict" id="verdict">On regarde le lac…</p>
  <div class="mesures">
    <div><b id="eau">–</b><small>eau à 70 cm</small></div>
    <div><b id="air">–</b><small>air</small></div>
    <div><b id="vent">–</b><small>vent km/h</small></div>
  </div>
  <p class="releve" id="releve">${esc(s.region)} · conditions mises à jour toutes les 3 heures</p>
  <a class="bouton" href="../../?plage=${s.id}">Ouvrir ${esc(s.nom)} dans l’app</a>
</header>
<main>
  <section aria-labelledby="t-act">
    <h2 id="t-act">Sur l’eau aujourd’hui</h2>
    <p class="qualite" id="qualite" hidden></p>
    <ul class="acts" id="acts"><li>Baignade, paddle, voile et bain d’hiver : la note de chaque activité s’affiche ici.</li></ul>
  </section>
  <section aria-labelledby="t-vois">
    <h2 id="t-vois">Les plages voisines</h2>
    <ul class="voisines">
${voisines.map((v) => `      <li><a href="../${v.id}/">${esc(v.nom)}</a><span data-eau="${v.id}">–</span></li>`).join('\n')}
    </ul>
  </section>
${lieux.length ? `  <section aria-labelledby="t-lieux">
    <h2 id="t-lieux">Un verre ou un repas dans le coin</h2>
    <ul class="lieux">
${lieux.map((l) => `      <li><b>${esc(l.nom)}</b><span>${esc(l.ville)}${l.mois ? ' · ouvert en saison' : ''}</span><p>${esc(l.note)}</p></li>`).join('\n')}
    </ul>
  </section>
` : ''}  <section aria-labelledby="t-don">
    <h2 id="t-don">D’où viennent ces chiffres</h2>
    <p>La température de l’eau à ${esc(s.nom)} vient du modèle Alplakes de l’Eawag, qui calcule le Léman en trois dimensions : on lit la valeur à 70 cm sous la surface, devant la plage, toutes les trois heures. Le vent et l’air viennent d’Open-Meteo. La qualité de l’eau de baignade vient des analyses du canton de Genève pour les plages genevoises, et ailleurs du classement annuel de la CIPEL pour la plage classée la plus proche. Le verdict est calculé par l’app Mon Lac aujourd’hui à partir de ces données. Indicatif : le lac a toujours le dernier mot.</p>
  </section>
</main>
<footer>Eau : <a href="https://www.alplakes.eawag.ch">Alplakes, Eawag</a> (CC BY 4.0) · qualité : <a href="https://ge.ch/sitg/">Canton de Genève (SITG)</a> et <a href="https://www.cipel.org/carte-des-plages/">CIPEL</a> · météo : <a href="https://open-meteo.com">Open-Meteo</a> · <a href="../../">Mon Lac aujourd’hui</a></footer>
<script type="module" src="../plage.js"></script>
</body>
</html>
`;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  for (const s of SPOTS) {
    await mkdir(`plage/${s.id}`, { recursive: true });
    await writeFile(`plage/${s.id}/index.html`, page(s));
  }
  const urls = ['', 'presentation/', 'presentation/en/', ...SPOTS.map((s) => `plage/${s.id}/`)];
  await writeFile('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${BASE}${u}</loc></url>`).join('\n')}\n</urlset>\n`);
  console.log(`${SPOTS.length} pages de plage et sitemap.xml générés.`);
}
