// Cartes des lacs pour les articles du blog (blog/img/carte-<lac>.jpg) : contour OpenStreetMap et plages suivies.
// Usage : NODE_PATH=$(npm root -g) node scripts/cartes.mjs   (Playwright doit être installé ; les images sont versionnées, pas besoin de le relancer sans nouveau lac)
import { createRequire } from 'node:module';
const { chromium } = createRequire(import.meta.url)('playwright'); // require suit NODE_PATH (Playwright installé globalement)
import { SPOTS, LACS, lacDe, projeter } from '../spots.js';
import { CONTOURS } from '../contours.js';

const L = 1600, H = 900, M = 110;
const nav = await chromium.launch(), page = await nav.newPage({ viewport: { width: L, height: H } });
for (const lac of Object.keys(CONTOURS)) {
  const sud = LACS[lac].carteSud ?? -90, pts = CONTOURS[lac].filter(([, lat]) => lat >= sud).map(([lon, lat]) => ({ lon, lat }));
  let p = projeter(L - 2 * M, pts), k = Math.min(1, (H - 2 * M) / p.hauteur); // tient en hauteur comme en largeur
  if (k < 1) p = projeter((L - 2 * M) * k, pts);
  const dx = (L - (L - 2 * M) * k) / 2, dy = (H - p.hauteur) / 2, xy = (s) => { const [a, b] = p.xy(s); return [(a + dx).toFixed(1), (b + dy).toFixed(1)]; };
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${L}" height="${H}"><rect width="100%" height="100%" fill="#f3f7fa"/>
<path d="M${pts.map((x) => xy(x).join(',')).join('L')}Z" fill="#bcdcf0" stroke="#2f7fb8" stroke-width="3" stroke-linejoin="round"/>
${SPOTS.filter((s) => lacDe(s) === lac).map((s) => { const [x, y] = xy(s); return `<circle cx="${x}" cy="${y}" r="11" fill="#fff" stroke="#0f4c75" stroke-width="5"/>`; }).join('')}</svg>`;
  await page.setContent(`<body style="margin:0">${svg}</body>`);
  await page.screenshot({ path: `blog/img/carte-${lac}.jpg`, type: 'jpeg', quality: 86 });
}
await nav.close();
