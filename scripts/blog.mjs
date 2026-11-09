// Génère le blog : blog/ et blog/<slug>/ (français), blog/en/ et blog/<slug>/en/ (anglais), avec JSON-LD.
// Graphe volontairement petit et fidèle à la page visible : Organization, WebSite, BlogPosting, BreadcrumbList, Blog.
// Pas de FAQPage : Google réserve ce résultat enrichi aux sites officiels et de santé ; les questions restent en <h2>.
import { mkdir, writeFile } from 'node:fs/promises';
import { ARTICLES } from './articles.mjs';

const BASE = 'https://xiff.github.io/Le-lac/';
const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
const TXT = {
  fr: { nom: 'Mon Lac aujourd’hui', blog: 'Blog', app: 'Ouvrir l’app', par: 'Par la rédaction de', publie: 'publié le', maj: 'mis à jour le', bref: 'En bref',
    eau: 'L’eau du Léman en ce moment', eauRepli: 'La température de chaque plage est dans <a href="{app}">l’app Mon Lac aujourd’hui</a>, mise à jour toutes les trois heures.',
    sources: 'Sources', voir: 'Voir le lac aujourd’hui', tous: 'Tous les articles', plages: 'Toutes les plages', presentation: 'Présentation', ariane: 'Fil d’Ariane',
    titreBlog: 'Le blog du Léman', descBlog: 'Bain d’hiver, bise, température et qualité de l’eau, plages, sports nautiques, buvettes : nos guides pour profiter du Léman toute l’année, avec les données du jour plage par plage.',
    photo: 'Photo', autre: 'English', live: (f, c) => `En ce moment, l’eau va de <strong>${f.t}</strong> à ${f.a} à <strong>${c.t}</strong> à ${c.a}, à 70 cm sous la surface. Le détail de chaque plage est dans <a href="{app}">l’app</a>.` },
  en: { nom: 'My Lake Today', blog: 'Blog', app: 'Open the app', par: 'By the', publie: 'published', maj: 'updated', bref: 'In short',
    eau: 'Lake Geneva’s water right now', eauRepli: 'Each beach’s water temperature is in <a href="{app}">the My Lake Today app</a>, updated every three hours.',
    sources: 'Sources', voir: 'See the lake today', tous: 'All articles', plages: 'All beaches', presentation: 'About', ariane: 'Breadcrumb',
    titreBlog: 'The Lake Geneva blog', descBlog: 'Winter swimming, the bise, water temperature and quality, beaches, water sports and lakeside cafés: our guides to enjoying Lake Geneva all year round, with today’s data beach by beach.',
    photo: 'Photo', autre: 'Français', live: (f, c) => `Right now, the water ranges from <strong>${f.t}</strong> at ${f.a} to <strong>${c.t}</strong> at ${c.a}, 70 cm below the surface. Each beach’s details are in <a href="{app}">the app</a>.` },
};
const dateL = (d, L) => new Date(d + 'T12:00:00Z').toLocaleDateString(L === 'en' ? 'en-GB' : 'fr-CH', { day: 'numeric', month: 'long', year: 'numeric' });
const urlArticle = (slug, L) => `${BASE}blog/${slug}/${L === 'en' ? 'en/' : ''}`;
const urlBlog = (L) => `${BASE}blog/${L === 'en' ? 'en/' : ''}`;
const ORG = { '@type': 'Organization', '@id': `${BASE}#org`, name: TXT.fr.nom, alternateName: TXT.en.nom, url: BASE, logo: { '@type': 'ImageObject', url: `${BASE}icons/icon-512.png`, width: 512, height: 512 } };
const SITE = { '@type': 'WebSite', '@id': `${BASE}#site`, name: TXT.fr.nom, url: BASE, inLanguage: ['fr-CH', 'en'], publisher: { '@id': `${BASE}#org` } };
const LEMAN = { '@type': 'LakeBodyOfWater', name: 'Lac Léman', alternateName: 'Lake Geneva', sameAs: 'https://www.wikidata.org/wiki/Q6403' };
const ariane = (items) => ({ '@type': 'BreadcrumbList', itemListElement: items.map(([name, item], i) => ({ '@type': 'ListItem', position: i + 1, name, item })) });

// Liens internes selon la langue et la profondeur (r = chemin vers la racine du site).
const liens = (html, L, r) => html
  .replace(/\{plage:([a-z0-9-]+)\}/g, (_, id) => `${r}plage/${id}/${L === 'en' ? 'en/' : ''}`)
  .replace(/\{plages\}/g, `${r}plage/${L === 'en' ? 'en/' : ''}`)
  .replace(/\{app\}/g, `${r}${L === 'en' ? '?lang=en' : ''}`)
  .replace(/\{blog:([a-z0-9-]+)\}/g, (_, s) => `${r}blog/${s}/${L === 'en' ? 'en/' : ''}`);

const tete = ({ L, titre, desc, url, alt, image, type, ld, r }) => `<!doctype html>
<html lang="${L}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(titre)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${url}">
<link rel="alternate" hreflang="fr" href="${alt.fr}">
<link rel="alternate" hreflang="en" href="${alt.en}">
<link rel="alternate" hreflang="x-default" href="${alt.fr}">
<meta property="og:type" content="${type}">
<meta property="og:title" content="${esc(titre)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${image}">
<meta property="og:locale" content="${L === 'en' ? 'en_GB' : 'fr_CH'}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#0d4a5c">
<link rel="icon" href="${r}icon.svg">
<link rel="stylesheet" href="${r}plage/plage.css">
<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': ld })}</script>
</head>`;

export function article(a, L = 'fr') {
  const t = TXT[L], c = a[L], url = urlArticle(a.slug, L), image = BASE + a.image, r = L === 'en' ? '../../../' : '../../';
  const ld = [ORG, SITE, {
    '@type': 'BlogPosting', '@id': `${url}#article`, mainEntityOfPage: url, url, headline: c.titre, description: c.desc,
    image: { '@type': 'ImageObject', url: image, width: 1600, height: a.hauteur, creditText: a.auteur, license: a.licence[1], acquireLicensePage: a.page },
    datePublished: a.publie, dateModified: a.modifie, inLanguage: L === 'en' ? 'en' : 'fr-CH',
    author: { '@id': `${BASE}#org` }, publisher: { '@id': `${BASE}#org` }, isPartOf: { '@id': `${urlBlog(L)}#blog` },
    about: LEMAN, citation: a.sources.map(([, u]) => u),
  }, ariane([[t.nom, BASE], [t.blog, urlBlog(L)], [c.h1, url]])];
  const credit = `${a.credit[L]}. ${t.photo} ${a.auteur}, <a href="${a.licence[1]}">${a.licence[0]}</a>, <a href="${a.page}">Wikimedia Commons</a>.`;
  return `${tete({ L, titre: `${c.titre} · ${t.nom}`, desc: c.desc, url, alt: { fr: urlArticle(a.slug, 'fr'), en: urlArticle(a.slug, 'en') }, image, type: 'article', ld, r })}
<body>
<header>
  <div class="haut"><a class="retour" href="${r}blog/${L === 'en' ? 'en/' : ''}">← ${t.blog}</a><a class="retour" href="${L === 'en' ? '../' : 'en/'}" hreflang="${L === 'en' ? 'fr' : 'en'}" lang="${L === 'en' ? 'fr' : 'en'}">${t.autre}</a></div>
  <nav class="ariane" aria-label="${t.ariane}"><a href="${liens('{app}', L, r)}">${t.nom}</a> › <a href="${r}blog/${L === 'en' ? 'en/' : ''}">${t.blog}</a></nav>
  <h1>${esc(c.h1)}</h1>
  <p class="releve">${t.par} ${L === 'en' ? 'My Lake Today team' : t.nom} · ${t.publie} <time datetime="${a.publie}">${dateL(a.publie, L)}</time>${a.modifie !== a.publie ? ` · ${t.maj} <time datetime="${a.modifie}">${dateL(a.modifie, L)}</time>` : ''}</p>
</header>
<main class="article">
  <figure class="une"><img src="${r}${a.image}" alt="${esc(a.alt[L])}" width="1600" height="${a.hauteur}"><figcaption>${credit}</figcaption></figure>
  <section class="bref" aria-labelledby="bref"><h2 id="bref">${t.bref}</h2><p>${c.bref}</p></section>
  ${liens(c.html(L).trim(), L, r)}
  <section class="eau-du-jour" id="eau-du-jour" aria-labelledby="t-eau"><h2 id="t-eau">${t.eau}</h2>
    <p id="eau-live">${liens(t.eauRepli, L, r)}</p></section>
  <section class="sources" aria-labelledby="t-sources"><h2 id="t-sources">${t.sources}</h2><ul>
${a.sources.map(([s, u]) => `    <li><a href="${u}">${esc(s)}</a></li>`).join('\n')}
  </ul></section>
  <a class="bouton" href="${liens('{app}', L, r)}">${t.voir}</a>
</main>
<footer><a href="${r}blog/${L === 'en' ? 'en/' : ''}">${t.tous}</a> · <a href="${liens('{plages}', L, r)}">${t.plages}</a> · <a href="${r}presentation/${L === 'en' ? 'en/' : ''}">${t.presentation}</a></footer>
<script type="module">
// Écart de température du moment, depuis le même fichier que l'app ; le texte de repli reste si le réseau manque.
import { SPOTS, valeurProche } from '${r}spots.js';
const d = await fetch('${r}eau.json').then((x) => x.json()).catch(() => null);
const v = SPOTS.map((s) => [s, valeurProche(d?.spots?.[s.id])]).filter(([, t]) => t != null).sort((a, b) => a[1] - b[1]);
if (v.length) {
  const f = ([s, t]) => ({ t: ${L === 'en' ? "t.toFixed(1) + ' °C'" : "t.toFixed(1).replace('.', ',') + ' °C'"}, a: \`<a href="${r}plage/\${s.id}/${L === 'en' ? 'en/' : ''}">\${s.nom}</a>\` });
  document.getElementById('eau-live').innerHTML = ${JSON.stringify(liens(t.live({ t: '§F', a: '§FA' }, { t: '§C', a: '§CA' }), L, r))}
    .replace('§FA', f(v[0]).a).replace('§F', f(v[0]).t).replace('§CA', f(v.at(-1)).a).replace('§C', f(v.at(-1)).t);
}
</script>
</body>
</html>
`;
}

export function liste(L = 'fr') {
  const t = TXT[L], url = urlBlog(L), r = L === 'en' ? '../../' : '../';
  const ld = [ORG, SITE, {
    '@type': 'Blog', '@id': `${url}#blog`, url, name: t.titreBlog, description: t.descBlog, inLanguage: L === 'en' ? 'en' : 'fr-CH', publisher: { '@id': `${BASE}#org` },
    blogPost: ARTICLES.map((a) => ({ '@type': 'BlogPosting', '@id': `${urlArticle(a.slug, L)}#article`, headline: a[L].titre, url: urlArticle(a.slug, L), datePublished: a.publie })),
  }, ariane([[t.nom, BASE], [t.blog, url]])];
  return `${tete({ L, titre: `${t.titreBlog} · ${t.nom}`, desc: t.descBlog, url, alt: { fr: urlBlog('fr'), en: urlBlog('en') }, image: `${BASE}${ARTICLES[0].image}`, type: 'website', ld, r })}
<body>
<header>
  <div class="haut"><a class="retour" href="${liens('{app}', L, r)}">← ${t.nom}</a><a class="retour" href="${L === 'en' ? '../' : 'en/'}" hreflang="${L === 'en' ? 'fr' : 'en'}" lang="${L === 'en' ? 'fr' : 'en'}">${t.autre}</a></div>
  <h1>${t.titreBlog}</h1>
  <p class="releve">${esc(t.descBlog)}</p>
</header>
<main class="article">
  <ul class="billets">
${ARTICLES.map((a) => `    <li><a href="${r}blog/${a.slug}/${L === 'en' ? 'en/' : ''}"><b>${esc(a[L].titre)}</b></a><p>${esc(a[L].desc)}</p><time datetime="${a.publie}">${dateL(a.publie, L)}</time></li>`).join('\n')}
  </ul>
</main>
<footer><a href="${liens('{app}', L, r)}">${t.nom}</a> · <a href="${liens('{plages}', L, r)}">${t.plages}</a> · <a href="${r}presentation/${L === 'en' ? 'en/' : ''}">${t.presentation}</a></footer>
</body>
</html>
`;
}

export const URLS_BLOG = ['blog/', 'blog/en/', ...ARTICLES.flatMap((a) => [`blog/${a.slug}/`, `blog/${a.slug}/en/`])];

if (import.meta.url === `file://${process.argv[1]}`) {
  await mkdir('blog/en', { recursive: true });
  await writeFile('blog/index.html', liste('fr'));
  await writeFile('blog/en/index.html', liste('en'));
  for (const a of ARTICLES) {
    await mkdir(`blog/${a.slug}/en`, { recursive: true });
    await writeFile(`blog/${a.slug}/index.html`, article(a, 'fr'));
    await writeFile(`blog/${a.slug}/en/index.html`, article(a, 'en'));
  }
  console.log(`Blog : ${ARTICLES.length} articles en français et en anglais.`);
}
