// Génère le blog : blog/ et blog/<slug>/ (français), blog/en/ et blog/<slug>/en/ (anglais), avec JSON-LD.
// Graphe volontairement petit et fidèle à la page visible : Organization, WebSite, BlogPosting, BreadcrumbList, Blog.
// Pas de FAQPage : Google réserve ce résultat enrichi aux sites officiels et de santé ; les questions restent en <h2>.
import { pied, langues } from './pied.mjs';
import { mkdir, writeFile } from 'node:fs/promises';
import { ARTICLES } from './articles.mjs';

const BASE = 'https://monlac.ch/';
// Dossier de chaque langue ('' = français), locales, og:locale et inLanguage.
const SUF = { fr: '', en: 'en/', de: 'de/', it: 'it/' }, LANGUES = Object.keys(SUF);
const LOCALE = { fr: 'fr-CH', en: 'en-GB', de: 'de-CH', it: 'it-CH' }, OG = { fr: 'fr_CH', en: 'en_GB', de: 'de_CH', it: 'it_CH' }, ILANG = { fr: 'fr-CH', en: 'en', de: 'de-CH', it: 'it-CH' };
// Un article n'existe que dans les langues où il est traduit.
const dispo = (a) => LANGUES.filter((l) => a[l]);
const articles = (L) => ARTICLES.filter((a) => a[L]);
const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
const TXT = {
  fr: { nom: 'Mon Lac', blog: 'Blog', app: 'Ouvrir l’app', par: 'Par la rédaction de', publie: 'publié le', maj: 'mis à jour le', bref: 'En bref',
    eau: 'L’eau du Léman en ce moment', eauRepli: 'La température de chaque plage est dans <a href="{app}">l’app Mon Lac</a>, mise à jour toutes les trois heures.',
    sources: 'Sources', voir: 'Voir le lac aujourd’hui', tous: 'Tous les articles', plages: 'Toutes les plages', presentation: 'Présentation', ariane: 'Fil d’Ariane',
    titreBlog: 'Le blog des lacs suisses', descBlog: 'Température de l’eau lac par lac, bain d’hiver, saunas, bise, qualité de l’eau, plages, sports nautiques, buvettes : nos guides pour profiter du Léman et des lacs suisses toute l’année, avec les données du jour plage par plage.',
    themes: 'Thèmes', tout: 'Tout', lire: 'Lire l’article', equipe: 'Mon Lac', photo: 'Photo', avertissement: '<strong>Avertissement.</strong> Cet article donne des informations générales tirées des sources citées ; il ne remplace pas un avis médical. La baignade en eau froide sollicite fortement le cœur et peut être dangereuse : demandez conseil à un médecin avant de commencer, en particulier en cas de problème cardiaque, de tension ou de grossesse. Ne vous baignez jamais seul et respectez les consignes des sauveteurs. Chacun pratique sous sa propre responsabilité ; en cas d’urgence, appelez le 144 en Suisse ou le 112.', live: (f, c) => `En ce moment, l’eau va de <strong>${f.t}</strong> à ${f.a} à <strong>${c.t}</strong> à ${c.a}, à 70 cm sous la surface. Le détail de chaque plage est dans <a href="{app}">l’app</a>.` },
  en: { nom: 'My Lake', blog: 'Blog', app: 'Open the app', par: 'By the', publie: 'published', maj: 'updated', bref: 'In short',
    eau: 'Lake Geneva’s water right now', eauRepli: 'Each beach’s water temperature is in <a href="{app}">the My Lake app</a>, updated every three hours.',
    sources: 'Sources', voir: 'See the lake today', tous: 'All articles', plages: 'All beaches', presentation: 'About', ariane: 'Breadcrumb',
    titreBlog: 'The Swiss lakes blog', descBlog: 'Water temperature lake by lake, winter swimming, saunas, the bise, water quality, beaches, water sports and lakeside cafés: our guides to enjoying Lake Geneva and the Swiss lakes all year round, with today’s data beach by beach.',
    themes: 'Topics', tout: 'All', lire: 'Read the article', equipe: 'My Lake team', photo: 'Photo', avertissement: '<strong>Disclaimer.</strong> This article gives general information taken from the sources cited; it is not medical advice. Cold-water swimming puts real strain on the heart and can be dangerous: talk to a doctor before you start, especially with a heart condition, high blood pressure or during pregnancy. Never swim alone and follow lifeguards’ instructions. You swim at your own risk; in an emergency, call 144 in Switzerland or 112.', live: (f, c) => `Right now, the water ranges from <strong>${f.t}</strong> at ${f.a} to <strong>${c.t}</strong> at ${c.a}, 70 cm below the surface. Each beach’s details are in <a href="{app}">the app</a>.` },
  de: { nom: 'Mein See', blog: 'Blog', app: 'App öffnen', par: 'Von der Redaktion von', publie: 'veröffentlicht am', maj: 'aktualisiert am', bref: 'Kurz gesagt',
    eau: 'Das Wasser des Sees im Moment', eauRepli: 'Die Wassertemperatur jedes Badeplatzes steht in <a href="{app}">der App Mein See</a>, alle drei Stunden aktualisiert.',
    sources: 'Quellen', voir: 'Den See heute ansehen', tous: 'Alle Artikel', plages: 'Alle Badeplätze', presentation: 'Über uns', ariane: 'Brotkrumennavigation',
    titreBlog: 'Der Blog zu den Schweizer Seen', descBlog: 'Wassertemperatur See für See, Winterbaden, Saunas, Bise, Wasserqualität, Badeplätze, Wassersport und Seebeizen: unsere Ratgeber, um den Genfersee und die Schweizer Seen das ganze Jahr zu geniessen, mit den Tagesdaten Badeplatz für Badeplatz.',
    themes: 'Themen', tout: 'Alle', lire: 'Artikel lesen', equipe: 'Mein See', photo: 'Foto', avertissement: '<strong>Hinweis.</strong> Dieser Artikel gibt allgemeine Informationen aus den genannten Quellen wieder; er ersetzt keinen ärztlichen Rat. Baden in kaltem Wasser belastet das Herz stark und kann gefährlich sein: Lass dich vor dem Beginn von einer Ärztin oder einem Arzt beraten, besonders bei Herzproblemen, Bluthochdruck oder Schwangerschaft. Geh nie allein ins Wasser und befolge die Anweisungen der Rettungsschwimmer. Du badest auf eigene Verantwortung; im Notfall wähle in der Schweiz die 144 oder die 112.', live: (f, c) => `Im Moment liegt das Wasser zwischen <strong>${f.t}</strong> bei ${f.a} und <strong>${c.t}</strong> bei ${c.a}, 70 cm unter der Oberfläche. Die Einzelheiten jedes Badeplatzes stehen in <a href="{app}">der App</a>.` },
  it: { nom: 'Il mio lago', blog: 'Blog', app: 'Apri l’app', par: 'Redazione:', publie: 'pubblicato il', maj: 'aggiornato il', bref: 'In breve',
    eau: 'L’acqua del lago in questo momento', eauRepli: 'La temperatura dell’acqua di ogni spiaggia è nell’<a href="{app}">app Il mio lago</a>, aggiornata ogni tre ore.',
    sources: 'Fonti', voir: 'Guarda il lago oggi', tous: 'Tutti gli articoli', plages: 'Tutte le spiagge', presentation: 'Informazioni', ariane: 'Percorso di navigazione',
    titreBlog: 'Il blog dei laghi svizzeri', descBlog: 'Temperatura dell’acqua lago per lago, bagno invernale, saune, bise, qualità dell’acqua, spiagge, sport nautici e chioschi in riva al lago: le nostre guide per godersi il Lemano e i laghi svizzeri tutto l’anno, con i dati del giorno spiaggia per spiaggia.',
    themes: 'Temi', tout: 'Tutti', lire: 'Leggi l’articolo', equipe: 'Il mio lago', photo: 'Foto', avertissement: '<strong>Avvertenza.</strong> Questo articolo fornisce informazioni generali tratte dalle fonti citate; non sostituisce il parere di un medico. Fare il bagno in acqua fredda sollecita molto il cuore e può essere pericoloso: chiedi consiglio a un medico prima di iniziare, in particolare in caso di problemi cardiaci, pressione alta o gravidanza. Non fare mai il bagno da solo e segui le indicazioni dei bagnini. Ognuno pratica a proprio rischio; in caso di emergenza, chiama il 144 in Svizzera o il 112.', live: (f, c) => `In questo momento l’acqua va da <strong>${f.t}</strong> a ${f.a} a <strong>${c.t}</strong> a ${c.a}, a 70 cm sotto la superficie. I dettagli di ogni spiaggia sono nell’<a href="{app}">app</a>.` },
};
// Thème de chaque article, pour la liste du blog et son filtre.
const THEMES = { froid: { fr: 'Eau froide', en: 'Cold water', de: 'Kaltes Wasser', it: 'Acqua fredda' }, lac: { fr: 'Le lac', en: 'The lake', de: 'Der See', it: 'Il lago' }, plages: { fr: 'Plages', en: 'Beaches', de: 'Badeplätze', it: 'Spiagge' },
  sports: { fr: 'Sports nautiques', en: 'Water sports', de: 'Wassersport', it: 'Sport nautici' }, sortir: { fr: 'Sortir', en: 'Going out', de: 'Ausgehen', it: 'Uscire' } };
const theme = (a) => (a.sante ? 'froid' : /plages/.test(a.slug) ? 'plages' : /paddle|kite|wake/.test(a.slug) ? 'sports' : /buvettes|saunas/.test(a.slug) ? 'sortir' : 'lac');
const dateL = (d, L) => new Date(d + 'T12:00:00Z').toLocaleDateString(LOCALE[L], { day: 'numeric', month: 'long', year: 'numeric' });
const urlArticle = (slug, L) => `${BASE}blog/${slug}/${SUF[L]}`;
const urlBlog = (L) => `${BASE}blog/${SUF[L]}`;
const ORG = { '@type': 'Organization', '@id': `${BASE}#org`, name: TXT.fr.nom, alternateName: [TXT.en.nom, TXT.de.nom, TXT.it.nom], url: BASE, logo: { '@type': 'ImageObject', url: `${BASE}icons/icon-512.png`, width: 512, height: 512 } };
const SITE = { '@type': 'WebSite', '@id': `${BASE}#site`, name: TXT.fr.nom, url: BASE, inLanguage: Object.values(ILANG), publisher: { '@id': `${BASE}#org` } };
const LEMAN = { '@type': 'LakeBodyOfWater', name: 'Lac Léman', alternateName: 'Lake Geneva', sameAs: 'https://www.wikidata.org/wiki/Q6403' };
const ariane = (items) => ({ '@type': 'BreadcrumbList', itemListElement: items.map(([name, item], i) => ({ '@type': 'ListItem', position: i + 1, name, item })) });

// Liens internes selon la langue et la profondeur (r = chemin vers la racine du site).
const liens = (html, L, r) => html
  .replace(/\{plage:([a-z0-9-]+)\}/g, (_, id) => `${r}plage/${id}/${SUF[L]}`)
  .replace(/\{plages\}/g, `${r}plage/${SUF[L]}`)
  .replace(/\{app\}/g, `${r}?lang=${L}`)
  .replace(/\{racine\}/g, r)
  .replace(/\{blog:([a-z0-9-]+)\}/g, (_, slug) => { const a = ARTICLES.find((x) => x.slug === slug); return `${r}blog/${slug}/${SUF[a?.[L] ? L : a?.en ? 'en' : 'fr']}`; }); // article pas encore traduit : repli sur l'anglais

const tete = ({ L, titre, desc, url, alt, image, type, ld, r, donnees }) => `<!doctype html>
<html lang="${L}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(titre)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${url}">
${Object.entries(alt).map(([l, u]) => `<link rel="alternate" hreflang="${l}" href="${u}">`).join('\n')}
<link rel="alternate" hreflang="x-default" href="${alt.fr}">
<script>
// Arrivée sur le blog : on propose la langue mémorisée par l'app ou, à défaut, celle du navigateur, quand la page existe dans cette langue.
// Un clic sur le sélecteur de langue mémorise le choix (même clé que l'app) : on ne redirige plus ensuite.
(() => { try {
  const L = ['fr', 'en', 'de', 'it'], ici = document.documentElement.lang;
  addEventListener('click', (e) => { const a = e.target.closest?.('.langues a'); if (a) localStorage.setItem('langue', a.hreflang); });
  let voulue = localStorage.getItem('langue');
  if (!L.includes(voulue)) voulue = (navigator.languages?.[0] ?? navigator.language ?? '').slice(0, 2).toLowerCase();
  if (!L.includes(voulue) || voulue === ici || sessionStorage.getItem('langue-vue')) return;
  sessionStorage.setItem('langue-vue', '1'); // une seule redirection par visite : le retour arrière ne boucle pas
  const autre = document.querySelector('link[rel="alternate"][hreflang="' + voulue + '"]');
  if (autre) location.replace(new URL(autre.href).pathname + location.search + location.hash);
} catch {} })();
</script>
<meta property="og:type" content="${type}">
<meta property="og:title" content="${esc(titre)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${image}">
<meta property="og:locale" content="${OG[L]}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#0d4a5c">
<link rel="icon" href="${r}icon.svg">
<link rel="stylesheet" href="${r}plage/plage.css">
<link rel="preload" href="${r}fonts/young-serif-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="${r}fonts/onest-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
${donnees ? `<link rel="modulepreload" href="${r}spots.js">
<link rel="preload" href="${r}eau.json" as="fetch" crossorigin>
` : ''}<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': ld })}</script>
<script defer src="https://cloud.umami.is/script.js" data-website-id="3fac0d48-00cf-403c-87f1-19e4a21bbe68"></script>
</head>`;

export function article(a, L = 'fr') {
  const t = TXT[L], c = a[L], url = urlArticle(a.slug, L), image = BASE + a.image, r = SUF[L] ? '../../../' : '../../';
  const ld = [ORG, SITE, {
    '@type': 'BlogPosting', '@id': `${url}#article`, mainEntityOfPage: url, url, headline: c.titre, description: c.desc,
    image: { '@type': 'ImageObject', url: image, width: 1600, height: a.hauteur, ...(a.auteur ? { creditText: a.auteur, license: a.licence[1], acquireLicensePage: a.page } : { creditText: t.nom }) },
    datePublished: a.publie, dateModified: a.modifie, inLanguage: ILANG[L],
    author: { '@id': `${BASE}#org` }, publisher: { '@id': `${BASE}#org` }, isPartOf: { '@id': `${urlBlog(L)}#blog` },
    about: LEMAN, citation: a.sources.map(([, u]) => u),
  }, ariane([[t.nom, BASE], [t.blog, urlBlog(L)], [c.h1, url]])];
  const credit = a.creditHtml?.[L] ?? `${a.credit[L]}. ${t.photo} ${a.auteur}, <a href="${a.licence[1]}">${a.licence[0]}</a>, <a href="${a.page}">Wikimedia Commons</a>.`;
  return `${tete({ L, titre: `${c.titre} · ${t.nom}`, desc: c.desc, url, alt: Object.fromEntries(dispo(a).map((l) => [l, urlArticle(a.slug, l)])), image, type: 'article', ld, r, donnees: true })}
<body>
<header>
  <div class="haut"><a class="marque" translate="no" href="${liens('{app}', L, r)}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/></svg>${t.nom}</a>${langues(L, Object.fromEntries(dispo(a).map((l) => [l, `${r}blog/${a.slug}/${SUF[l]}`])))}</div>
  <nav class="ariane" aria-label="${t.ariane}"><a href="${liens('{app}', L, r)}">${t.nom}</a> › <a href="${r}blog/${SUF[L]}">${t.blog}</a></nav>
  <h1>${esc(c.h1)}</h1>
  <p class="releve">${t.par} ${t.equipe} · ${t.publie} <time datetime="${a.publie}">${dateL(a.publie, L)}</time>${a.modifie !== a.publie ? ` · ${t.maj} <time datetime="${a.modifie}">${dateL(a.modifie, L)}</time>` : ''}</p>
</header>
<main class="article">
  <figure class="une"><img src="${r}${a.image}" alt="${esc(a.alt[L])}" srcset="${[640, 1200].map((w) => `${r}blog/img/min/${a.image.split('/').pop().replace('.jpg', `-${w}.jpg`)} ${w}w`).join(', ')}, ${r}${a.image} 1600w" sizes="(max-width: 700px) 100vw, 680px" width="1600" height="${a.hauteur}" fetchpriority="high"><figcaption>${credit}</figcaption></figure>
  <section class="bref" aria-labelledby="bref"><h2 id="bref">${t.bref}</h2><p>${c.bref}</p></section>
  ${liens(c.html(L).trim(), L, r)}
  <section class="eau-du-jour" id="eau-du-jour" aria-labelledby="t-eau"><h2 id="t-eau">${c.eauTitre ?? t.eau}</h2>
    <p id="eau-live">${liens(t.eauRepli, L, r)}</p></section>
${a.sante ? `  <p class="avertissement" role="note">${t.avertissement}</p>\n` : ''}  <section class="sources" aria-labelledby="t-sources"><h2 id="t-sources">${t.sources}</h2><ul>
${a.sources.map(([s, u]) => `    <li><a href="${u}">${esc(s)}</a></li>`).join('\n')}
  </ul></section>
  <a class="bouton" href="${liens('{app}', L, r)}">${t.voir}</a>
</main>
${pied(L, r)}
<script type="module">
// Écart de température du moment, depuis le même fichier que l'app ; le texte de repli reste si le réseau manque.
import { SPOTS, valeurProche } from '${r}spots.js';
const d = await fetch('${r}eau.json').then((x) => x.json()).catch(() => null);
// Les plages du lac dont parle l'article (le Léman par défaut).
const v = SPOTS.filter((s) => ${JSON.stringify([a.lac ?? 'leman'].flat())}.includes(s.lac ?? 'leman')).map((s) => [s, valeurProche(d?.spots?.[s.id])]).filter(([, t]) => t != null).sort((a, b) => a[1] - b[1]);
if (v.length && v[0][1] === v.at(-1)[1] && ${JSON.stringify(!!c.eauUne)}) document.getElementById('eau-live').innerHTML = ${JSON.stringify(c.eauUne ?? '')}.replace('§T', v[0][1].toFixed(1)${L === 'fr' ? ".replace('.', ',')" : ''} + ' °C');
else if (v.length) {
  const f = ([s, t]) => ({ t: ${L === 'fr' ? "t.toFixed(1).replace('.', ',') + ' °C'" : "t.toFixed(1) + ' °C'"}, a: \`<a href="${r}plage/\${s.id}/${SUF[L]}">\${s.nom}</a>\` });
  document.getElementById('eau-live').innerHTML = ${JSON.stringify(liens(t.live({ t: '§F', a: '§FA' }, { t: '§C', a: '§CA' }), L, r))}
    .replace('§FA', f(v[0]).a).replace('§F', f(v[0]).t).replace('§CA', f(v.at(-1)).a).replace('§C', f(v.at(-1)).t);
}
</script>
</body>
</html>
`;
}

export function liste(L = 'fr') {
  const t = TXT[L], url = urlBlog(L), r = SUF[L] ? '../../' : '../', A = articles(L);
  const ld = [ORG, SITE, {
    '@type': 'Blog', '@id': `${url}#blog`, url, name: t.titreBlog, description: t.descBlog, inLanguage: ILANG[L], publisher: { '@id': `${BASE}#org` },
    blogPost: [...A].sort((x, y) => y.publie.localeCompare(x.publie)).map((a) => ({ '@type': 'BlogPosting', '@id': `${urlArticle(a.slug, L)}#article`, headline: a[L].titre, url: urlArticle(a.slug, L), datePublished: a.publie })),
  }, ariane([[t.nom, BASE], [t.blog, url]])];
  return `${tete({ L, titre: `${t.titreBlog} · ${t.nom}`, desc: t.descBlog, url, alt: Object.fromEntries(LANGUES.filter((l) => articles(l).length).map((l) => [l, urlBlog(l)])), image: `${BASE}${A[0].image}`, type: 'website', ld, r })}
<body class="large">
<header>
  <div class="haut"><a class="marque" translate="no" href="${liens('{app}', L, r)}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/></svg>${t.nom}</a>${langues(L, Object.fromEntries(LANGUES.filter((l) => articles(l).length).map((l) => [l, `${r}blog/${SUF[l]}`])))}</div>
  <h1>${t.titreBlog}</h1>
  <p class="chapo">${esc(t.descBlog)}</p>
</header>
<main class="blog">
  <div class="themes" role="group" aria-label="${t.themes}">
    <button type="button" aria-pressed="true" data-theme="">${t.tout}</button>
${Object.entries(THEMES).map(([k, v]) => `    <button type="button" aria-pressed="false" data-theme="${k}">${v[L]}</button>`).join('\n')}
  </div>
  <ul class="grille">
${[...A].sort((x, y) => y.publie.localeCompare(x.publie)).map((a, i) => `    <li data-theme="${theme(a)}"${i === 0 ? ' class="une"' : ''}><a href="${r}blog/${a.slug}/${SUF[L]}">
      <span class="vignette"><img src="${r}blog/img/min/${a.image.split('/').pop().replace('.jpg', i === 0 ? '-1000.jpg' : '-640.jpg')}" alt="" width="1600" height="${a.hauteur}"${i === 0 ? ' fetchpriority="high"' : ' loading="lazy"'}></span>
      <span class="texte"><span class="meta">${THEMES[theme(a)][L]} · <time datetime="${a.publie}">${dateL(a.publie, L)}</time></span><h2>${esc(a[L].titre)}</h2><p>${esc(a[L].desc)}</p>${i === 0 ? `<span class="lire">${t.lire} →</span>` : ''}</span>
    </a></li>`).join('\n')}
  </ul>
</main>
<script>
// Filtre par thème ; sans script, tous les articles restent visibles.
const g = document.querySelector('.themes');
g.onclick = (e) => { const b = e.target.closest('button'); if (!b) return;
  g.querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', x === b));
  document.querySelectorAll('.grille li').forEach((li) => { li.hidden = !!b.dataset.theme && li.dataset.theme !== b.dataset.theme; }); };
</script>
${pied(L, r)}
</body>
</html>
`;
}

export const URLS_BLOG = LANGUES.flatMap((l) => (articles(l).length ? [`blog/${SUF[l]}`, ...articles(l).map((a) => `blog/${a.slug}/${SUF[l]}`)] : []));

if (import.meta.url === `file://${process.argv[1]}`) {
  for (const l of LANGUES) {
    if (!articles(l).length) continue;
    await mkdir(`blog/${SUF[l]}`, { recursive: true });
    await writeFile(`blog/${SUF[l]}index.html`, liste(l));
    for (const a of articles(l)) {
      await mkdir(`blog/${a.slug}/${SUF[l]}`, { recursive: true });
      await writeFile(`blog/${a.slug}/${SUF[l]}index.html`, article(a, l));
    }
  }
  console.log(`Blog : ${LANGUES.map((l) => `${articles(l).length} articles en ${l}`).join(', ')}.`);
}
