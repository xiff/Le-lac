// Génère une page statique par plage (plage/<id>/index.html) et sitemap.xml, pour Google.
// Les conditions du jour sont chargées en direct par plage/plage.js. Relancer quand spots.js ou lieux.js change.
import { mkdir, writeFile } from 'node:fs/promises';
import { SPOTS, LACS, lacDe, REGIONS_EN } from '../spots.js';
import { LIEUX } from '../lieux.js';
import { URLS_BLOG } from './blog.mjs';
import { pied } from './pied.mjs';

const BASE = 'https://monlac.ch/';
const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
const dist = (a, b) => Math.hypot(a.lat - b.lat, (a.lon - b.lon) * Math.cos((a.lat * Math.PI) / 180));

const TXT = {
  fr: {
    titre: (n) => `Température de l’eau à ${n} aujourd’hui`, 
    desc: (n, r, l) => `Température de l’eau à 70 cm à ${n} (${r === l ? l : `${r}, ${l}`}), vent, bise et verdict du jour pour la baignade, le paddle et la voile. Mis à jour toutes les 3 heures.`,
    attente: 'On regarde le lac…', eau: 'eau à 70 cm', air: 'air', vent: 'vent km/h',
    releve: 'conditions mises à jour toutes les 3 heures', ouvrir: (n) => `Ouvrir ${n} dans l’app`, act: 'Sur l’eau aujourd’hui',
    actsVide: 'Baignade, paddle, voile et bain d’hiver : la note de chaque activité s’affiche ici.', voisines: 'Les plages voisines',
    lieux: 'Un verre ou un repas dans le coin', saison: ' · ouvert en saison', donnees: 'D’où viennent ces chiffres',
    texte: (n, l, m) => `${!m ? `Aucun modèle ne calcule encore la température de l’eau ici : l’app ne l’affiche donc pas, plutôt que d’inventer un chiffre.` : m === 'simstrat' ? `La température de l’eau à ${n} vient du modèle Alplakes de l’Eawag, qui calcule le ${l} sur sa verticale : une seule valeur à 70 cm pour tout le lac, toutes les trois heures.` : `La température de l’eau à ${n} vient du modèle Alplakes de l’Eawag, qui calcule le ${l} en trois dimensions : on lit la valeur à 70 cm sous la surface, devant la plage, toutes les trois heures.`} Le vent et l’air viennent d’Open-Meteo. La qualité de l’eau de baignade n’est affichée que si une analyse de moins de 30 jours existe (canton de Genève pour les plages genevoises) ; sinon, vérifie-la à la source auprès du canton ou de la CIPEL, liens en bas de page. Le verdict est calculé par l’app Mon Lac à partir de ces données. Indicatif : le lac a toujours le dernier mot.`,
    app: 'Mon Lac', autre: 'English',
    liste: 'Toutes les plages', listeDesc: `Les ${SPOTS.length} plages suivies par Mon Lac, du Léman aux lacs de Neuchâtel, Bienne, Morat, la Gruyère, Sion, Lugano et Majeur : température de l’eau, vent et verdict du jour, plage par plage.`, presentation: 'Présentation',
  },
  en: {
    titre: (n) => `Water temperature at ${n} today`, 
    desc: (n, r, l) => `Water temperature at 70 cm at ${n} (${r === l ? l : `${r}, ${l}`}), wind, bise and today’s verdict for swimming, paddle and sailing. Updated every 3 hours.`,
    attente: 'Checking the lake…', eau: 'water at 70 cm', air: 'air', vent: 'wind km/h',
    releve: 'conditions updated every 3 hours', ouvrir: (n) => `Open ${n} in the app`, act: 'On the water today',
    actsVide: 'Swimming, paddle, sailing and winter swim: each activity’s rating appears here.', voisines: 'Nearby beaches',
    lieux: 'A drink or a meal nearby', saison: ' · open in season', donnees: 'Where these figures come from',
    texte: (n, l, m) => `${!m ? `No model computes the water temperature here yet, so the app does not show one rather than make up a figure.` : m === 'simstrat' ? `The water temperature at ${n} comes from the Alplakes model by Eawag, which computes ${l} along its depth: one value at 70 cm for the whole lake, every three hours.` : `The water temperature at ${n} comes from the Alplakes model by Eawag, which computes ${l} in three dimensions: we read the value 70 cm below the surface, in front of the beach, every three hours.`} Wind and air come from Open-Meteo. Bathing water quality is only shown when a test less than 30 days old exists (Canton of Geneva for Geneva beaches); otherwise check it at the source with the canton or CIPEL, links at the bottom of the page. The verdict is computed by the My Lake app from this data. For guidance only: the lake always has the last word.`,
    app: 'My Lake', autre: 'Français',
    liste: 'All beaches', listeDesc: `The ${SPOTS.length} beaches followed by My Lake, from Lake Geneva to the lakes of Neuchâtel, Biel, Murten, Gruyère, Sion, Lugano and Maggiore: water temperature, wind and today’s verdict, beach by beach.`, presentation: 'About',
  },
};

// Page d'une plage en français (plage/<id>/) ou en anglais (plage/<id>/en/, un niveau plus bas).
export function page(s, langue = 'fr') {
  const t = TXT[langue], en = langue === 'en', r = en ? '../' : '';
  const voisines = SPOTS.filter((x) => x !== s && lacDe(x) === lacDe(s)).sort((a, b) => dist(s, a) - dist(s, b)).slice(0, 4);
  const lieux = LIEUX.filter((l) => l.zone === s.zone);
  const region = en ? REGIONS_EN[s.region] ?? s.region : s.region;
  const urlFr = `${BASE}plage/${s.id}/`, urlEn = `${urlFr}en/`, url = en ? urlEn : urlFr;
  const L = LACS[lacDe(s)], lac = en ? L.en : L.nom;
  const titre = t.titre(s.nom), desc = t.desc(s.nom, region, lac);
  const ld = { '@context': 'https://schema.org', '@type': 'Beach', name: s.nom, url, geo: { '@type': 'GeoCoordinates', latitude: s.lat, longitude: s.lon }, containedInPlace: { '@type': 'LakeBodyOfWater', name: lac } };
  const app = `${r}../../?lang=${langue}&plage=${s.id}`;
  return `<!doctype html>
<html lang="${langue}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(titre)} · ${lac}</title>
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
  <div class="haut"><a class="marque" href="${r}../../?lang=${langue}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/></svg>${t.app}</a><a class="retour" href="${en ? '../' : 'en/'}" hreflang="${en ? 'fr' : 'en'}" lang="${en ? 'fr' : 'en'}">${t.autre}</a></div>
  <h1>${esc(titre)}</h1>
  <p class="verdict" id="verdict">${t.attente}</p>
  <div class="mesures">
    <div><b id="eau">–</b><small>${t.eau}</small></div>
    <div><b id="air">–</b><small>${t.air}</small></div>
    <div><b id="vent">–</b><small>${t.vent}</small></div>
  </div>
  <p class="releve" id="releve">${esc(region)} · ${t.releve}</p>
  <div class="actions"><a class="bouton" href="${app}">${esc(t.ouvrir(s.nom))}</a><a class="bouton second" href="https://www.google.com/maps/dir/?api=1&destination=${s.lat},${s.lon}" target="_blank" rel="noopener">${en ? 'Get there' : 'Y aller'}</a></div>
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
    <p>${esc(t.texte(s.nom, lac, L.eau?.modele))}</p>
  </section>
</main>
${pied(langue, r + '../../', en ? '../' : 'en/')}
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
<body class="large">
<header>
  <div class="haut"><a class="marque" href="${r}../?lang=${langue}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/></svg>${t.app}</a><a class="retour" href="${en ? '../' : 'en/'}" hreflang="${en ? 'fr' : 'en'}" lang="${en ? 'fr' : 'en'}">${t.autre}</a></div>
  <h1>${t.liste}</h1>
  <p class="chapo">${esc(t.listeDesc)}</p>
  <form class="cherche" id="cherche" action="${r}../" method="get" role="search">
    <input type="hidden" name="lang" value="${langue}">
    <label for="q">${en ? 'Type a beach, the lake answers.' : 'Tape une plage, le lac répond.'}</label>
    <div class="champ"><input id="q" name="plage" list="noms" placeholder="${en ? 'Vidy, Yvoire, Pâquis…' : 'Vidy, Yvoire, Pâquis…'}" autocomplete="off" spellcheck="false"><button type="submit">${en ? 'Go' : 'Voir'}</button></div>
    <datalist id="noms">${SPOTS.map((s) => `<option value="${esc(s.nom)}">`).join('')}</datalist>
    <p class="ecart" id="ecart" aria-live="polite"></p>
    <p class="ecart" id="legende" hidden>${en ? 'The label next to each beach: today’s winter swim rating.' : 'L’étiquette à côté de chaque plage : la note du bain d’hiver aujourd’hui.'}</p>
  </form>
</header>
<main class="plages">
${regions.map((reg) => `  <section aria-labelledby="r-${reg.replace(/[^a-z]/gi, '')}">
    <h2 id="r-${reg.replace(/[^a-z]/gi, '')}">${esc(en ? REGIONS_EN[reg] ?? reg : reg)}</h2>
    <ul class="rangs">
${SPOTS.filter((s) => s.region === reg).map((s) => `      <li><a href="${en ? `../${s.id}/en/` : `${s.id}/`}" data-id="${s.id}"><i></i><span>${esc(s.nom)}</span><b>–</b></a></li>`).join('\n')}
    </ul>
  </section>`).join('\n')}
</main>
${pied(langue, r + '../', en ? '../' : 'en/')}
<script type="module">
// Comme la présentation : l'eau de chaque plage en direct (même fichier que l'app), une pastille de couleur,
// l'écart du moment, et la recherche qui ouvre la page de la plage. Sans script, la liste et les liens restent.
import { SPOTS, valeurProche } from '${r}../spots.js';
import { lire, hiver, estHiver, moisHiver } from '${r}../score.js';
const sans = (x) => x.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const couleur = (t) => (t < 12 ? '#5aa6c4' : t < 16 ? '#127a8f' : t < 20 ? '#2f7f50' : t < 24 ? '#e3a82b' : '#d0533a');
const deg = (t) => ${en ? "t.toFixed(1) + '°'" : "t.toFixed(1).replace('.', ',') + '°'"};
document.getElementById('cherche').onsubmit = (e) => {
  const q = sans(document.getElementById('q').value);
  const s = q && (SPOTS.find((x) => sans(x.nom) === q) ?? SPOTS.find((x) => sans(x.nom).includes(q)));
  e.preventDefault();
  if (s) location.href = ${en ? "'../' + s.id + '/en/'" : "s.id + '/'"};
  else document.getElementById('q').focus();
};
const d = await fetch('${r}../eau.json').then((x) => x.json()).catch(() => null);
const v = [];
for (const a of document.querySelectorAll('.rangs a')) {
  const t = valeurProche(d?.spots?.[a.dataset.id]);
  if (t == null) continue;
  a.querySelector('b').textContent = deg(t); a.querySelector('i').style.background = couleur(t);
  v.push([a.querySelector('span').textContent, t]);
}
if (v.length) {
  v.sort((x, y) => x[1] - y[1]);
  document.getElementById('ecart').textContent = ${en ? "`Right now, from ${deg(v[0][1])} at ${v[0][0]} to ${deg(v.at(-1)[1])} at ${v.at(-1)[0]}, 70 cm below the surface.`" : "`En ce moment, de ${deg(v[0][1])} à ${v[0][0]} à ${deg(v.at(-1)[1])} à ${v.at(-1)[0]}, à 70 cm sous la surface.`"};
}
// Bain d'hiver (octobre à mai) : une seule requête Open-Meteo pour toutes les plages, puis la même note que l'app.
if (moisHiver(new Date().getMonth() + 1)) {
  const as = [...document.querySelectorAll('.rangs a')], ps = as.map((a) => SPOTS.find((s) => s.id === a.dataset.id));
  const champs = 'temperature_2m,wind_speed_10m,wind_gusts_10m,wind_direction_10m,weather_code';
  const LIB = ${en ? "['No', 'Meh', 'Good', 'Perfect']" : "['Non', 'Bof', 'Bien', 'Parfait']"};
  fetch(\`https://api.open-meteo.com/v1/forecast?latitude=\${ps.map((s) => s.lat).join(',')}&longitude=\${ps.map((s) => s.lon).join(',')}&current=\${champs}&timezone=Europe%2FZurich\`)
    .then((x) => (x.ok ? x.json() : Promise.reject(x.status))).then((m) => {
      let n = 0;
      [].concat(m).forEach((x, i) => {
        const c = lire(x.current, null, valeurProche(d?.spots?.[ps[i].id]));
        if (!c || !estHiver(c)) return;
        const k = hiver(c); n++;
        as[i].querySelector('b').insertAdjacentHTML('beforebegin', \`<em class="t\${k}" title="${en ? 'Winter swim' : 'Bain d’hiver'}">\${LIB[k]}</em>\`);
      });
      if (n) document.getElementById('legende').hidden = false;
    }).catch(() => {});
}
</script>
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
