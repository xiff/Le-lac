// Génère le blog : blog/ (liste) et blog/<slug>/ (articles), avec données structurées JSON-LD.
// Graphe volontairement petit et fidèle à la page visible : Organization, WebSite, BlogPosting, BreadcrumbList.
// Pas de FAQPage : Google réserve ce résultat enrichi aux sites officiels et de santé ; les questions restent en <h2>.
import { mkdir, writeFile } from 'node:fs/promises';
import { ARTICLES } from './articles.mjs';

const BASE = 'https://xiff.github.io/Le-lac/';
const NOM = 'Mon Lac aujourd’hui';
const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
const dateFr = (d) => new Date(d + 'T12:00:00Z').toLocaleDateString('fr-CH', { day: 'numeric', month: 'long', year: 'numeric' });
const ORG = { '@type': 'Organization', '@id': `${BASE}#org`, name: NOM, url: BASE, logo: { '@type': 'ImageObject', url: `${BASE}icons/icon-512.png`, width: 512, height: 512 } };
const SITE = { '@type': 'WebSite', '@id': `${BASE}#site`, name: NOM, url: BASE, inLanguage: 'fr-CH', publisher: { '@id': `${BASE}#org` } };
const LEMAN = { '@type': 'LakeBodyOfWater', name: 'Lac Léman', sameAs: 'https://www.wikidata.org/wiki/Q6403' };
const ariane = (items) => ({ '@type': 'BreadcrumbList', itemListElement: items.map(([name, item], i) => ({ '@type': 'ListItem', position: i + 1, name, item })) });

const tete = ({ titre, desc, url, image, type, ld, r }) => `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(titre)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${url}">
<meta property="og:type" content="${type}">
<meta property="og:title" content="${esc(titre)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${image}">
<meta property="og:locale" content="fr_CH">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#0d4a5c">
<link rel="icon" href="${r}icon.svg">
<link rel="stylesheet" href="${r}plage/plage.css">
<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': ld })}</script>
</head>`;

export function article(a) {
  const url = `${BASE}blog/${a.slug}/`, image = BASE + a.image, r = '../../';
  const ld = [ORG, SITE, {
    '@type': 'BlogPosting', '@id': `${url}#article`, mainEntityOfPage: url, url, headline: a.titre, description: a.desc,
    image: [image], datePublished: a.publie, dateModified: a.modifie, inLanguage: 'fr-CH',
    author: { '@id': `${BASE}#org` }, publisher: { '@id': `${BASE}#org` }, isPartOf: { '@id': `${BASE}blog/#blog` },
    about: LEMAN, citation: a.sources.map(([, u]) => u),
  }, ariane([[NOM, BASE], ['Blog', `${BASE}blog/`], [a.h1, url]])];
  return `${tete({ titre: `${a.titre} · ${NOM}`, desc: a.desc, url, image, type: 'article', ld, r })}
<body>
<header>
  <div class="haut"><a class="retour" href="../">← Blog</a><a class="retour" href="${r}">Ouvrir l’app</a></div>
  <nav class="ariane" aria-label="Fil d’Ariane"><a href="${r}">${NOM}</a> › <a href="../">Blog</a></nav>
  <h1>${esc(a.h1)}</h1>
  <p class="releve">Par la rédaction de ${NOM} · publié le <time datetime="${a.publie}">${dateFr(a.publie)}</time>${a.modifie !== a.publie ? ` · mis à jour le <time datetime="${a.modifie}">${dateFr(a.modifie)}</time>` : ''}</p>
</header>
<main class="article">
  <figure class="une"><img src="${r}${a.image}" alt="${esc(a.imageAlt)}" width="1600" height="${a.hauteur}"><figcaption>${a.credit}</figcaption></figure>
  <section class="bref" aria-labelledby="bref"><h2 id="bref">En bref</h2><p>${a.bref}</p></section>
  ${a.html.trim()}
  <section class="eau-du-jour" id="eau-du-jour" aria-labelledby="t-eau"><h2 id="t-eau">L’eau du Léman en ce moment</h2>
    <p id="eau-live">La température de chaque plage est dans <a href="${r}">l’app Mon Lac aujourd’hui</a>, mise à jour toutes les trois heures.</p></section>
  <section class="sources" aria-labelledby="t-sources"><h2 id="t-sources">Sources</h2><ul>
${a.sources.map(([t, u]) => `    <li><a href="${u}">${esc(t)}</a></li>`).join('\n')}
  </ul></section>
  <a class="bouton" href="${r}">Voir le lac aujourd’hui</a>
</main>
<footer><a href="../">Tous les articles</a> · <a href="${r}plage/">Toutes les plages</a> · <a href="${r}presentation/">Présentation</a></footer>
<script type="module">
// Écart de température du moment, depuis le même fichier que l'app ; le texte de repli reste si le réseau manque.
import { SPOTS, valeurProche } from '${r}spots.js';
const d = await fetch('${r}eau.json').then((x) => x.json()).catch(() => null);
const v = SPOTS.map((s) => [s, valeurProche(d?.spots?.[s.id])]).filter(([, t]) => t != null).sort((a, b) => a[1] - b[1]);
if (v.length) {
  const f = (t) => t.toFixed(1).replace('.', ',') + ' °C', [froid, chaud] = [v[0], v.at(-1)];
  document.getElementById('eau-live').innerHTML = \`En ce moment, l’eau va de <strong>\${f(froid[1])}</strong> à <a href="${r}plage/\${froid[0].id}/">\${froid[0].nom}</a> à <strong>\${f(chaud[1])}</strong> à <a href="${r}plage/\${chaud[0].id}/">\${chaud[0].nom}</a>, à 70 cm sous la surface. Le détail de chaque plage est dans <a href="${r}">l’app</a>.\`;
}
</script>
</body>
</html>
`;
}

export function liste() {
  const url = `${BASE}blog/`, r = '../';
  const desc = 'Bain d’hiver, bise, température de l’eau : nos guides pour profiter du Léman toute l’année, avec les données du jour plage par plage.';
  const ld = [ORG, SITE, {
    '@type': 'Blog', '@id': `${url}#blog`, url, name: `Blog ${NOM}`, description: desc, inLanguage: 'fr-CH', publisher: { '@id': `${BASE}#org` },
    blogPost: ARTICLES.map((a) => ({ '@type': 'BlogPosting', '@id': `${BASE}blog/${a.slug}/#article`, headline: a.titre, url: `${BASE}blog/${a.slug}/`, datePublished: a.publie })),
  }, ariane([[NOM, BASE], ['Blog', url]])];
  return `${tete({ titre: `Blog · ${NOM}`, desc, url, image: `${BASE}${ARTICLES[0].image}`, type: 'website', ld, r })}
<body>
<header>
  <div class="haut"><a class="retour" href="${r}">← ${NOM}</a><a class="retour" href="${r}plage/">Toutes les plages</a></div>
  <h1>Le blog du Léman</h1>
  <p class="releve">${esc(desc)}</p>
</header>
<main class="article">
  <ul class="billets">
${ARTICLES.map((a) => `    <li><a href="${a.slug}/"><b>${esc(a.titre)}</b></a><p>${esc(a.desc)}</p><time datetime="${a.publie}">${dateFr(a.publie)}</time></li>`).join('\n')}
  </ul>
</main>
<footer><a href="${r}">${NOM}</a> · <a href="${r}presentation/">Présentation</a></footer>
</body>
</html>
`;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  await mkdir('blog', { recursive: true });
  await writeFile('blog/index.html', liste());
  for (const a of ARTICLES) {
    await mkdir(`blog/${a.slug}`, { recursive: true });
    await writeFile(`blog/${a.slug}/index.html`, article(a));
  }
  console.log(`Blog : ${ARTICLES.length} articles générés.`);
}
