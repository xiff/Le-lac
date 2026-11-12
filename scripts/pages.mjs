// Génère une page statique par plage (plage/<id>/index.html) et sitemap.xml, pour Google.
// Les conditions du jour sont chargées en direct par plage/plage.js. Relancer quand spots.js ou lieux.js change.
import { mkdir, writeFile } from 'node:fs/promises';
import { SPOTS, LACS, lacDe, REGIONS, nomLac } from '../spots.js';
import { texteLieu, villeDe } from '../traductions.js';
import { LIEUX } from '../lieux.js';
import { URLS_BLOG } from './blog.mjs';
import { pied, langues } from './pied.mjs';

const BASE = 'https://monlac.ch/';
const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
// Dossier de chaque langue sous plage/<id>/ ('' = français) et langues du site.
const SUF = { fr: '', en: 'en/', de: 'de/', it: 'it/' }, LANGUES = Object.keys(SUF);
const dist = (a, b) => Math.hypot(a.lat - b.lat, (a.lon - b.lon) * Math.cos((a.lat * Math.PI) / 180));

const TXT = {
  fr: {
    titre: (n) => `Température de l’eau à ${n} aujourd’hui`, 
    desc: (n, r, l) => `Température de l’eau à 70 cm à ${n} (${r === l ? l : `${r}, ${l}`}), vent, bise et verdict du jour pour la baignade, le paddle et la voile. Mis à jour toutes les 3 heures.`,
    yAller: 'Y aller', attente: 'On regarde le lac…', eau: 'eau à 70 cm', air: 'air', vent: 'vent km/h',
    releve: 'conditions mises à jour toutes les 3 heures', ouvrir: (n) => `Ouvrir ${n} dans l’app`, act: 'Sur l’eau aujourd’hui',
    actsVide: 'Baignade, paddle, voile et bain d’hiver : la note de chaque activité s’affiche ici.', voisines: 'Les plages voisines',
    lieux: 'Un verre ou un repas dans le coin', saison: ' · ouvert en saison', donnees: 'D’où viennent ces chiffres',
    texte: (n, l, m) => `${!m ? `Aucun modèle ne calcule encore la température de l’eau ici : l’app ne l’affiche donc pas, plutôt que d’inventer un chiffre.` : m === 'simstrat' ? `La température de l’eau à ${n} vient du modèle Alplakes de l’Eawag, qui calcule le ${l} sur sa verticale : une seule valeur à 70 cm pour tout le lac, toutes les trois heures.` : `La température de l’eau à ${n} vient du modèle Alplakes de l’Eawag, qui calcule le ${l} en trois dimensions : on lit la valeur à 70 cm sous la surface, devant la plage, toutes les trois heures.`} Le vent et l’air viennent d’Open-Meteo. La qualité de l’eau de baignade n’est affichée que si une analyse de moins de 30 jours existe (canton de Genève pour les plages genevoises) ; sinon, vérifie-la à la source auprès du canton ou de la CIPEL, liens en bas de page. Le verdict est calculé par l’app Mon Lac à partir de ces données. Indicatif : le lac a toujours le dernier mot.`,
    app: 'Mon Lac',
    cherche: 'Tape une plage, le lac répond.', voir: 'Voir', ecart: (a, na, b, nb) => `En ce moment, de ${a} à ${na} à ${b} à ${nb}, à 70 cm sous la surface.`,
    legende: 'L’étiquette à côté de chaque plage : la note du bain d’hiver aujourd’hui.', lib: ['Non', 'Bof', 'Bien', 'Parfait'], hiver: 'Bain d’hiver',
    liste: 'Toutes les plages', listeDesc: `Les ${SPOTS.length} plages suivies par Mon Lac sur 25 lacs suisses, du Léman au lac de Constance : température de l’eau, vent et verdict du jour, plage par plage.`, presentation: 'Présentation',
  },
  en: {
    titre: (n) => `Water temperature at ${n} today`, 
    desc: (n, r, l) => `Water temperature at 70 cm at ${n} (${r === l ? l : `${r}, ${l}`}), wind, bise and today’s verdict for swimming, paddle and sailing. Updated every 3 hours.`,
    yAller: 'Get there', attente: 'Checking the lake…', eau: 'water at 70 cm', air: 'air', vent: 'wind km/h',
    releve: 'conditions updated every 3 hours', ouvrir: (n) => `Open ${n} in the app`, act: 'On the water today',
    actsVide: 'Swimming, paddle, sailing and winter swim: each activity’s rating appears here.', voisines: 'Nearby beaches',
    lieux: 'A drink or a meal nearby', saison: ' · open in season', donnees: 'Where these figures come from',
    texte: (n, l, m) => `${!m ? `No model computes the water temperature here yet, so the app does not show one rather than make up a figure.` : m === 'simstrat' ? `The water temperature at ${n} comes from the Alplakes model by Eawag, which computes ${l} along its depth: one value at 70 cm for the whole lake, every three hours.` : `The water temperature at ${n} comes from the Alplakes model by Eawag, which computes ${l} in three dimensions: we read the value 70 cm below the surface, in front of the beach, every three hours.`} Wind and air come from Open-Meteo. Bathing water quality is only shown when a test less than 30 days old exists (Canton of Geneva for Geneva beaches); otherwise check it at the source with the canton or CIPEL, links at the bottom of the page. The verdict is computed by the My Lake app from this data. For guidance only: the lake always has the last word.`,
    app: 'My Lake',
    cherche: 'Type a beach, the lake answers.', voir: 'Go', ecart: (a, na, b, nb) => `Right now, from ${a} at ${na} to ${b} at ${nb}, 70 cm below the surface.`,
    legende: 'The label next to each beach: today’s winter swim rating.', lib: ['No', 'Meh', 'Good', 'Perfect'], hiver: 'Winter swim',
    liste: 'All beaches', listeDesc: `The ${SPOTS.length} beaches followed by My Lake on 25 Swiss lakes, from Lake Geneva to Lake Constance: water temperature, wind and today’s verdict, beach by beach.`, presentation: 'About',
  },
  de: {
    titre: (n) => `Wassertemperatur in ${n} heute`,
    desc: (n, r, l) => `Wassertemperatur in 70 cm Tiefe in ${n} (${r === l ? l : `${r}, ${l}`}), Wind, Bise und Tagesurteil fürs Baden, Paddeln und Segeln. Alle 3 Stunden aktualisiert.`,
    yAller: 'Hinfahren', attente: 'Wir schauen auf den See…', eau: 'Wasser in 70 cm', air: 'Luft', vent: 'Wind km/h',
    releve: 'Bedingungen alle 3 Stunden aktualisiert', ouvrir: (n) => `${n} in der App öffnen`, act: 'Heute auf dem Wasser',
    actsVide: 'Baden, Paddeln, Segeln und Winterbaden: Hier erscheint die Bewertung jeder Aktivität.', voisines: 'Badeplätze in der Nähe',
    lieux: 'Ein Drink oder eine Mahlzeit in der Nähe', saison: ' · in der Saison geöffnet', donnees: 'Woher diese Zahlen kommen',
    texte: (n, l, m) => `${!m ? `Noch kein Modell berechnet hier die Wassertemperatur: Die App zeigt deshalb keine an, statt eine Zahl zu erfinden.` : m === 'simstrat' ? `Die Wassertemperatur in ${n} stammt aus dem Alplakes-Modell der Eawag, das ${l} entlang der Tiefe berechnet: ein einziger Wert in 70 cm für den ganzen See, alle drei Stunden.` : `Die Wassertemperatur in ${n} stammt aus dem Alplakes-Modell der Eawag, das ${l} dreidimensional berechnet: Wir lesen den Wert in 70 cm Tiefe vor dem Badeplatz ab, alle drei Stunden.`} Wind und Luft stammen von Open-Meteo. Die Badewasserqualität wird nur angezeigt, wenn eine weniger als 30 Tage alte Analyse vorliegt (Kanton Genf für Genfer Badeplätze); andernfalls prüfe sie direkt beim Kanton oder bei der CIPEL, Links am Seitenende. Das Urteil berechnet die App Mein See aus diesen Daten. Unverbindlich: Der See hat immer das letzte Wort.`,
    app: 'Mein See',
    liste: 'Alle Badeplätze', listeDesc: `Die ${SPOTS.length} Badeplätze, die Mein See an 25 Schweizer Seen verfolgt, vom Genfersee bis zum Bodensee: Wassertemperatur, Wind und Tagesurteil, Badeplatz für Badeplatz.`, presentation: 'Über uns',
    cherche: 'Tippe einen Badeplatz, der See antwortet.', voir: 'Los', ecart: (a, na, b, nb) => `Gerade jetzt von ${a} in ${na} bis ${b} in ${nb}, 70 cm unter der Oberfläche.`,
    legende: 'Das Etikett neben jedem Badeplatz: die heutige Bewertung fürs Winterbaden.', lib: ['Nein', 'Naja', 'Gut', 'Perfekt'], hiver: 'Winterbaden',
  },
  it: {
    titre: (n) => `Temperatura dell’acqua a ${n} oggi`,
    desc: (n, r, l) => `Temperatura dell’acqua a 70 cm a ${n} (${r === l ? l : `${r}, ${l}`}), vento, bise e verdetto del giorno per balneazione, paddle e vela. Aggiornata ogni 3 ore.`,
    yAller: 'Come arrivare', attente: 'Diamo un’occhiata al lago…', eau: 'acqua a 70 cm', air: 'aria', vent: 'vento km/h',
    releve: 'condizioni aggiornate ogni 3 ore', ouvrir: (n) => `Apri ${n} nell’app`, act: 'Sull’acqua oggi',
    actsVide: 'Balneazione, paddle, vela e bagno invernale: qui compare il voto di ogni attività.', voisines: 'Spiagge vicine',
    lieux: 'Un drink o un pasto nei dintorni', saison: ' · aperto in stagione', donnees: 'Da dove vengono questi numeri',
    texte: (n, l, m) => `${!m ? `Nessun modello calcola ancora la temperatura dell’acqua qui: l’app quindi non la mostra, invece di inventare un numero.` : m === 'simstrat' ? `La temperatura dell’acqua a ${n} proviene dal modello Alplakes dell’Eawag, che calcola ${l} lungo la profondità: un solo valore a 70 cm per tutto il lago, ogni tre ore.` : `La temperatura dell’acqua a ${n} proviene dal modello Alplakes dell’Eawag, che calcola ${l} in tre dimensioni: leggiamo il valore a 70 cm sotto la superficie, davanti alla spiaggia, ogni tre ore.`} Vento e aria provengono da Open-Meteo. La qualità dell’acqua di balneazione è mostrata solo se esiste un’analisi di meno di 30 giorni (Cantone di Ginevra per le spiagge ginevrine); altrimenti verificala alla fonte presso il cantone o la CIPEL, link in fondo alla pagina. Il verdetto è calcolato dall’app Il mio lago a partire da questi dati. Solo a titolo indicativo: l’ultima parola spetta sempre al lago.`,
    app: 'Il mio lago',
    liste: 'Tutte le spiagge', listeDesc: `Le ${SPOTS.length} spiagge seguite da Il mio lago su 25 laghi svizzeri, dal Lemano al lago di Costanza: temperatura dell’acqua, vento e verdetto del giorno, spiaggia per spiaggia.`, presentation: 'Informazioni',
    cherche: 'Scrivi una spiaggia, il lago risponde.', voir: 'Vai', ecart: (a, na, b, nb) => `In questo momento, da ${a} a ${na} a ${b} a ${nb}, 70 cm sotto la superficie.`,
    legende: 'L’etichetta accanto a ogni spiaggia: il voto di oggi per il bagno invernale.', lib: ['No', 'Così così', 'Bene', 'Perfetto'], hiver: 'Bagno invernale',
  },
};

// Page d'une plage en français (plage/<id>/) ou en anglais (plage/<id>/en/, un niveau plus bas).
export function page(s, langue = 'fr') {
  const t = TXT[langue], sfx = SUF[langue], r = sfx ? '../' : '';
  const voisines = SPOTS.filter((x) => x !== s && lacDe(x) === lacDe(s)).sort((a, b) => dist(s, a) - dist(s, b)).slice(0, 4);
  const lieux = LIEUX.filter((l) => l.zone === s.zone);
  const region = REGIONS[langue][s.region] ?? s.region;
  const urls = Object.fromEntries(LANGUES.map((l) => [l, `${BASE}plage/${s.id}/${SUF[l]}`])), url = urls[langue];
  const L = LACS[lacDe(s)], lac = nomLac(lacDe(s), langue);
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
${LANGUES.map((l) => `<link rel="alternate" hreflang="${l}" href="${urls[l]}">`).join('\n')}
<link rel="alternate" hreflang="x-default" href="${urls.fr}">
<meta property="og:title" content="${esc(titre)}">
<meta property="og:description" content="${esc(desc)}">
<meta name="theme-color" content="#0d4a5c">
<link rel="icon" href="${r}../../icon.svg">
<link rel="stylesheet" href="${r}../plage.css">
<script type="application/ld+json">${JSON.stringify(ld)}</script>
<script defer src="https://cloud.umami.is/script.js" data-website-id="3fac0d48-00cf-403c-87f1-19e4a21bbe68"></script>
</head>
<body data-id="${s.id}">
<header>
  <div class="haut"><a class="marque" translate="no" href="${r}../../?lang=${langue}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/></svg>${t.app}</a>${langues(langue, Object.fromEntries(LANGUES.map((l) => [l, r + SUF[l]])))}</div>
  <h1>${esc(titre)}</h1>
  <p class="verdict" id="verdict">${t.attente}</p>
  <div class="mesures">
    <div><b id="eau">–</b><small>${t.eau}</small></div>
    <div><b id="air">–</b><small>${t.air}</small></div>
    <div><b id="vent">–</b><small>${t.vent}</small></div>
  </div>
  <p class="releve" id="releve">${esc(region)} · ${t.releve}</p>
  <div class="actions"><a class="bouton" href="${app}">${esc(t.ouvrir(s.nom))}</a><a class="bouton second" href="https://www.google.com/maps/dir/?api=1&destination=${s.lat},${s.lon}" target="_blank" rel="noopener">${t.yAller}</a></div>
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
${voisines.map((v) => `      <li><a href="${sfx ? `../../${v.id}/${sfx}` : `../${v.id}/`}">${esc(v.nom)}</a><span data-eau="${v.id}">–</span></li>`).join('\n')}
    </ul>
  </section>
${lieux.length ? `  <section aria-labelledby="t-lieux">
    <h2 id="t-lieux">${t.lieux}</h2>
    <ul class="lieux">
${lieux.map((l) => `      <li><b>${esc(l.nom)}</b><span>${esc(villeDe(l.ville, langue))}${l.mois ? t.saison : ''}</span><p>${esc(texteLieu(l, langue))}</p></li>`).join('\n')}
    </ul>
  </section>
` : ''}  <section aria-labelledby="t-don">
    <h2 id="t-don">${t.donnees}</h2>
    <p>${esc(t.texte(s.nom, lac, L.eau?.modele))}</p>
  </section>
</main>
${pied(langue, r + '../../')}
<script type="module" src="${r}../plage.js"></script>
</body>
</html>
`;
}

// Liste de toutes les plages par région : plage/ (français) et plage/en/ (anglais).
export function liste(langue = 'fr') {
  const t = TXT[langue], sfx = SUF[langue], r = sfx ? '../' : '', fr = langue === 'fr';
  const regions = [...new Set(SPOTS.map((s) => s.region))];
  return `<!doctype html>
<html lang="${langue}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${t.liste} · ${t.app}</title>
<meta name="description" content="${esc(t.listeDesc)}">
<link rel="canonical" href="${BASE}plage/${sfx}">
${LANGUES.map((l) => `<link rel="alternate" hreflang="${l}" href="${BASE}plage/${SUF[l]}">`).join('\n')}
<link rel="alternate" hreflang="x-default" href="${BASE}plage/">
<meta name="theme-color" content="#0d4a5c">
<link rel="icon" href="${r}../icon.svg">
<link rel="stylesheet" href="${r}plage.css">
<script defer src="https://cloud.umami.is/script.js" data-website-id="3fac0d48-00cf-403c-87f1-19e4a21bbe68"></script>
</head>
<body class="large">
<header>
  <div class="haut"><a class="marque" translate="no" href="${r}../?lang=${langue}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/></svg>${t.app}</a>${langues(langue, Object.fromEntries(LANGUES.map((l) => [l, r + SUF[l]])))}</div>
  <h1>${t.liste}</h1>
  <p class="chapo">${esc(t.listeDesc)}</p>
  <form class="cherche" id="cherche" action="${r}../" method="get" role="search">
    <input type="hidden" name="lang" value="${langue}">
    <label for="q">${t.cherche}</label>
    <div class="champ"><input id="q" name="plage" list="noms" placeholder="Vidy, Yvoire, Pâquis…" autocomplete="off" spellcheck="false"><button type="submit">${t.voir}</button></div>
    <datalist id="noms">${SPOTS.map((s) => `<option value="${esc(s.nom)}">`).join('')}</datalist>
    <p class="ecart" id="ecart" aria-live="polite"></p>
    <p class="ecart" id="legende" hidden>${t.legende}</p>
  </form>
</header>
<main class="plages">
${regions.map((reg) => `  <section aria-labelledby="r-${reg.replace(/[^a-z]/gi, '')}">
    <h2 id="r-${reg.replace(/[^a-z]/gi, '')}">${esc(REGIONS[langue][reg] ?? reg)}</h2>
    <ul class="rangs">
${SPOTS.filter((s) => s.region === reg).map((s) => `      <li><a href="${sfx ? `../${s.id}/${sfx}` : `${s.id}/`}" data-id="${s.id}"><i></i><span>${esc(s.nom)}</span><b>–</b></a></li>`).join('\n')}
    </ul>
  </section>`).join('\n')}
</main>
${pied(langue, r + '../')}
<script type="module">
// Comme la présentation : l'eau de chaque plage en direct (même fichier que l'app), une pastille de couleur,
// l'écart du moment, et la recherche qui ouvre la page de la plage. Sans script, la liste et les liens restent.
import { SPOTS, valeurProche } from '${r}../spots.js';
import { lire, hiver, estHiver, moisHiver } from '${r}../score.js';
const sans = (x) => x.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const couleur = (t) => (t < 12 ? '#5aa6c4' : t < 16 ? '#127a8f' : t < 20 ? '#2f7f50' : t < 24 ? '#e3a82b' : '#d0533a');
const deg = (t) => ${fr ? "t.toFixed(1).replace('.', ',') + '°'" : "t.toFixed(1) + '°'"};
document.getElementById('cherche').onsubmit = (e) => {
  const q = sans(document.getElementById('q').value);
  const s = q && (SPOTS.find((x) => sans(x.nom) === q) ?? SPOTS.find((x) => sans(x.nom).includes(q)));
  e.preventDefault();
  if (s) location.href = ${fr ? "s.id + '/'" : `'../' + s.id + '/${sfx}'`};
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
  document.getElementById('ecart').textContent = (${t.ecart.toString()})(deg(v[0][1]), v[0][0], deg(v.at(-1)[1]), v.at(-1)[0]);
}
// Bain d'hiver (octobre à mai) : une seule requête Open-Meteo pour toutes les plages, puis la même note que l'app.
if (moisHiver(new Date().getMonth() + 1)) {
  const as = [...document.querySelectorAll('.rangs a')], ps = as.map((a) => SPOTS.find((s) => s.id === a.dataset.id));
  const champs = 'temperature_2m,wind_speed_10m,wind_gusts_10m,wind_direction_10m,weather_code';
  const LIB = ${JSON.stringify(t.lib)};
  fetch(\`https://api.open-meteo.com/v1/forecast?latitude=\${ps.map((s) => s.lat).join(',')}&longitude=\${ps.map((s) => s.lon).join(',')}&current=\${champs}&timezone=Europe%2FZurich\`)
    .then((x) => (x.ok ? x.json() : Promise.reject(x.status))).then((m) => {
      let n = 0;
      [].concat(m).forEach((x, i) => {
        const c = lire(x.current, null, valeurProche(d?.spots?.[ps[i].id]));
        if (!c || !estHiver(c)) return;
        const k = hiver(c); n++;
        as[i].querySelector('b').insertAdjacentHTML('beforebegin', \`<em class="t\${k}" title="${t.hiver}">\${LIB[k]}</em>\`);
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
  for (const l of LANGUES) {
    await mkdir(`plage/${SUF[l]}`, { recursive: true });
    await writeFile(`plage/${SUF[l]}index.html`, liste(l));
  }
  for (const s of SPOTS) for (const l of LANGUES) {
    await mkdir(`plage/${s.id}/${SUF[l]}`, { recursive: true });
    await writeFile(`plage/${s.id}/${SUF[l]}index.html`, page(s, l));
  }
  // Présentation : quatre langues ; blog : français et anglais seulement pour l'instant.
  const urls = ['', ...LANGUES.map((l) => `presentation/${SUF[l]}`), ...LANGUES.map((l) => `plage/${SUF[l]}`), ...URLS_BLOG, ...SPOTS.flatMap((s) => LANGUES.map((l) => `plage/${s.id}/${SUF[l]}`))];
  await writeFile('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${BASE}${u}</loc></url>`).join('\n')}\n</urlset>\n`);
  console.log(`${SPOTS.length * LANGUES.length} pages de plage (${LANGUES.join(', ')}) et sitemap.xml générés.`);
}
