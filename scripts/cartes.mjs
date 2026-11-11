// Cartes des lacs pour les articles du blog (blog/img/carte-<lac>.jpg) : contour OpenStreetMap et plages suivies.
// Usage : NODE_PATH=$(npm root -g) node scripts/cartes.mjs   (Playwright doit être installé ; les images sont versionnées, pas besoin de le relancer sans nouveau lac)
import { createRequire } from 'node:module';
const { chromium } = createRequire(import.meta.url)('playwright'); // require suit NODE_PATH (Playwright installé globalement)
import { SPOTS, LACS, TOUR, lacDe, projeter } from '../spots.js';
import { LOCATIONS } from '../locations.js';
import { CONTOURS } from '../contours.js';

const L = 1600, H = 900, M = 110;
const nav = await chromium.launch(), page = await nav.newPage({ viewport: { width: L, height: H } });
const contour = (lac) => lac === 'leman' ? TOUR.map((id) => SPOTS.find((s) => s.id === id)) // le Léman est tracé par ses plages, comme dans l'app
  : CONTOURS[lac].filter(([, lat]) => lat >= (LACS[lac].carteSud ?? -90)).map(([lon, lat]) => ({ lon, lat }));
const saunas = (f = () => true) => LOCATIONS.filter((l) => l.activites.includes('sauna') && f(l)).map((l) => SPOTS.find((s) => s.id === l.spot));
// Une carte : un ou plusieurs lacs, les plages (points blancs) et, si demandé, les plages proches d'un sauna (points orange).
async function carte(fichier, lacs, { plages = true, sauna } = {}) {
  const formes = lacs.map(contour), tous = formes.flat(), dans = (s) => lacs.includes(lacDe(s));
  let p = projeter(L - 2 * M, tous), k = Math.min(1, (H - 2 * M) / p.hauteur); // tient en hauteur comme en largeur
  if (k < 1) p = projeter((L - 2 * M) * k, tous);
  const dx = (L - (L - 2 * M) * k) / 2, dy = (H - p.hauteur) / 2, xy = (s) => { const [a, b] = p.xy(s); return [(a + dx).toFixed(1), (b + dy).toFixed(1)]; };
  const point = (s, fond, bord, r) => { const [x, y] = xy(s); return `<circle cx="${x}" cy="${y}" r="${r}" fill="${fond}" stroke="${bord}" stroke-width="5"/>`; };
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${L}" height="${H}"><rect width="100%" height="100%" fill="#f3f7fa"/>
${formes.map((f) => `<path d="M${f.map((x) => xy(x).join(',')).join('L')}Z" fill="#bcdcf0" stroke="#2f7fb8" stroke-width="3" stroke-linejoin="round"/>`).join('')}
${plages ? SPOTS.filter(dans).map((s) => point(s, '#fff', '#0f4c75', 11)).join('') : ''}
${sauna ? saunas(sauna).filter(dans).map((s) => point(s, '#f4a261', '#9c4a12', 14)).join('') : ''}</svg>`;
  await page.setContent(`<body style="margin:0">${svg}</body>`);
  await page.screenshot({ path: `blog/img/${fichier}.jpg`, type: 'jpeg', quality: 86 });
}
for (const lac of Object.keys(CONTOURS)) await carte(`carte-${lac}`, [lac]);
const bateau = (l) => l.activites.includes('bateau') || /floss/i.test(l.nom); // bateaux-saunas et radeaux-saunas
await carte('saunas-leman', ['leman'], { plages: false, sauna: () => true });
await carte('saunas-flottants', ['leman', 'bienne', 'zurich', 'lucerne'], { plages: false, sauna: bateau });
await carte('saunas-zurich', ['zurich'], { plages: false, sauna: () => true });
await carte('bain-hiver-neuchatel-bienne', ['neuchatel', 'bienne', 'morat'], { sauna: () => true });
await carte('bain-hiver-zurich', ['zurich', 'greifensee'], { sauna: () => true });
await nav.close();
