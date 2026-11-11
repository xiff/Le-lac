// Génère presentation/en, /de et /it à partir de la page française (presentation/index.html, écrite à la main).
// Les textes viennent de scripts/presentation.i18n.json : { rows: [{ fr, en, de, it }], faq, langue }.
// Les liens de langue (coin et pied) sont recalculés dans les quatre pages. Relancer après chaque changement du français.
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { pied } from './pied.mjs';

const BASE = 'https://monlac.ch/presentation/';
const SUF = { fr: '', en: 'en/', de: 'de/', it: 'it/' }, LANGUES = Object.keys(SUF);
const NOMS = { fr: 'Français', en: 'English', de: 'Deutsch', it: 'Italiano' };
const APP = { fr: 'Mon Lac', en: 'My Lake', de: 'Mein See', it: 'Il mio lago' };
const I18N = JSON.parse(await readFile(new URL('./presentation.i18n.json', import.meta.url), 'utf8'));
const ordre = (L) => [L, ...LANGUES.filter((l) => l !== L)];

export function generer(maitre, L) {
  const fr = L === 'fr', r = fr ? '../' : '../../';
  let s = maitre;
  // Liens vers les autres langues : relatifs à presentation/<langue>/.
  const vers = Object.fromEntries(LANGUES.map((l) => [l, (fr ? '' : '../') + SUF[l]]));
  const coin = LANGUES.filter((l) => l !== L).map((l) => `<a class="lien" href="${vers[l]}" hreflang="${l}" lang="${l}" title="${NOMS[l]}" aria-label="${NOMS[l]}">${l.toUpperCase()}</a>`).join('');
  s = s.replace(/<span class="coin">[\s\S]*?<\/span>/, `<span class="coin">${coin}</span>`);
  s = s.replace(/<footer class="pied">[\s\S]*?<\/footer>/, pied(L, r));
  // hreflang des quatre langues
  s = s.replace(/(<link rel="alternate" hreflang="[a-z-]+" href="[^"]+">\n)+/, LANGUES.map((l) => `<link rel="alternate" hreflang="${l}" href="${BASE}${SUF[l]}">\n`).join('') + `<link rel="alternate" hreflang="x-default" href="${BASE}">\n`);
  s = s.replace('<link rel="canonical" href="https://monlac.ch/presentation/">', `<link rel="canonical" href="${BASE}${SUF[L]}">`);
  if (fr) return s;
  // Textes
  for (const row of I18N.rows) {
    if (!s.includes(row.fr)) throw new Error('introuvable : ' + row.fr.slice(0, 70));
    s = s.split(row.fr).join(row[L]);
  }
  const faq = JSON.stringify(I18N.faq[L]).replace(/^\[/, '[\n  ').replace(/\],\[/g, '],\n  [').replace(/\]\]$/, ']\n]');
  s = s.replace(/const FAQ = \[[\s\S]*?\n\];/, `const FAQ = ${faq};`);
  const { lib, noms } = I18N.langue[L];
  s = s.replace(/const LIB = \[[^\]]*\], NOMS = \{[^}]*\};/, `const LIB = ${JSON.stringify(lib).replace(/"/g, "'")}, NOMS = ${JSON.stringify(noms).replace(/"([a-z]+)":/g, '$1: ').replace(/"/g, "'")};`);
  s = s.split('>Ouvrir l’app</a>').join(`>${{ en: 'Open the app', de: 'App öffnen', it: 'Apri l’app' }[L]}</a>`);
  // Langue, chemins et variantes du code
  s = s.replace('<html lang="fr">', `<html lang="${L}">`).replace('"inLanguage":["fr","en","de","it"]', `"inLanguage":${JSON.stringify(ordre(L))}`)
    .replaceAll('"../?lang=fr"', `"../../?lang=${L}"`).replaceAll('?lang=fr', `?lang=${L}`).replace('name="lang" value="fr"', `name="lang" value="${L}"`)
    .replace("verdict(c, 'fr'", `verdict(c, '${L}'`).replace('PHRASES.fr[', `PHRASES.${L}[`)
    .replace("v.toFixed(1).replace('.', ',') + '°'", "v.toFixed(1) + '°'");
  s = s.replace('const NOM = (r) => r;', `const NOM = (r) => REGIONS['${L}'][r] ?? r;`).replace('REGIONS_EN } from', 'REGIONS_EN, REGIONS } from');
  s = s.replace(/href="\.\.\/icon\.svg"/g, 'href="../../icon.svg"').replace(/(href|src)="\.\.\/icons\//g, '$1="../../icons/')
    .replace(/url\(\.\.\/fonts\//g, 'url(../../fonts/').replace(/href="\.\.\/fonts\//g, 'href="../../fonts/')
    .replace("from '../spots.js'", "from '../../spots.js'").replace("from '../score.js'", "from '../../score.js'")
    .replace("fetch('../eau.json'", "fetch('../../eau.json'").replace('href="../plage/${s.id}/"', `href="../../plage/\${s.id}/${SUF[L]}"`)
    .replace(/src="img\//g, 'src="../img/').replace('<form action="../" method="get"', '<form action="../../" method="get"');
  return s;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const maitre = await readFile('presentation/index.html', 'utf8');
  await writeFile('presentation/index.html', generer(maitre, 'fr')); // met à jour seulement les liens de langue du français
  for (const L of LANGUES.slice(1)) {
    await mkdir(`presentation/${SUF[L]}`, { recursive: true });
    await writeFile(`presentation/${SUF[L]}index.html`, generer(maitre, L));
  }
  console.log('Présentation : français (liens de langue), anglais, allemand, italien.');
}
