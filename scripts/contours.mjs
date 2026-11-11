// Contours des lacs (hors Léman, tracé par ses plages) tirés d'OpenStreetMap, simplifiés pour la carte de l'app.
// Lancé par .github/workflows/contours.yml (le réseau de développement ne joint pas OSM) ; écrit contours.js.
import { writeFile } from 'node:fs/promises';

const LACS = {
  neuchatel: ['Neuchâtel', '46.70,6.50,47.10,7.10'], bienne: ['Bielersee|Lac de Bienne', '47.00,7.00,47.20,7.30'],
  morat: ['Murtensee|Lac de Morat', '46.85,7.00,46.98,7.15'], gruyere: ['Gruyère|Greyerzersee', '46.55,7.00,46.80,7.20'],
};
const pause = (ms) => new Promise((f) => setTimeout(f, ms));
async function overpass(q) {
  for (const url of ['https://overpass-api.de/api/interpreter', 'https://overpass.kumi.systems/api/interpreter', 'https://overpass-api.de/api/interpreter']) {
    const r = await fetch(url, { method: 'POST', body: 'data=' + encodeURIComponent(q), headers: { 'User-Agent': 'MonLac-contours/1.0', 'Content-Type': 'application/x-www-form-urlencoded' } }).catch(() => null);
    if (r?.ok) return r.json();
    console.error('Overpass', url, r?.status ?? 'réseau'); await pause(20000);
  }
  throw new Error('Overpass indisponible');
}
// Relie les chemins extérieurs bout à bout pour former l'anneau le plus long.
export function anneau(chemins) {
  const reste = chemins.map((c) => c.map((p) => [p.lon, p.lat]));
  const eq = (a, b) => a[0] === b[0] && a[1] === b[1];
  let meilleur = [];
  while (reste.length) {
    let r = reste.shift();
    for (let k = true; k;) {
      k = false;
      for (let i = 0; i < reste.length; i++) {
        const c = reste[i], fin = r.at(-1);
        if (eq(fin, c[0])) r = r.concat(c.slice(1)); else if (eq(fin, c.at(-1))) r = r.concat([...c].reverse().slice(1)); else continue;
        reste.splice(i, 1); k = true; break;
      }
    }
    if (r.length > meilleur.length) meilleur = r;
  }
  return meilleur;
}
// Douglas-Peucker, tolérance en degrés (≈ 100 m pour 0.001).
export function simplifier(p, tol) {
  if (p.length < 3) return p;
  const [a, b] = [p[0], p.at(-1)];
  let dmax = 0, imax = 0;
  for (let i = 1; i < p.length - 1; i++) {
    const [x, y] = p[i], dx = b[0] - a[0], dy = b[1] - a[1], l = Math.hypot(dx, dy) || 1e-12;
    const d = Math.abs(dy * x - dx * y + b[0] * a[1] - b[1] * a[0]) / l;
    if (d > dmax) { dmax = d; imax = i; }
  }
  return dmax > tol ? simplifier(p.slice(0, imax + 1), tol).slice(0, -1).concat(simplifier(p.slice(imax), tol)) : [a, b];
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const out = {};
  for (const [lac, [nom, b]] of Object.entries(LACS)) {
    const j = await overpass(`[out:json][timeout:120];(relation["natural"="water"]["name"~"${nom}"](${b});way["natural"="water"]["name"~"${nom}"](${b}););out geom;`);
    const candidats = j.elements.map((e) => anneau(e.type === 'way' ? [e.geometry] : e.members.filter((m) => m.role === 'outer' && m.geometry).map((m) => m.geometry)));
    const r = candidats.sort((x, y) => y.length - x.length)[0] ?? [];
    const s = simplifier(r, 0.0008).map(([x, y]) => [+x.toFixed(5), +y.toFixed(5)]);
    console.log(lac, j.elements.map((e) => `${e.type}/${e.id} ${e.tags?.name}`).join(' ; '), '→', r.length, 'points, simplifié', s.length);
    if (s.length > 10) out[lac] = s;
    await pause(5000);
  }
  await writeFile('contours.js', `// Contours des lacs (OpenStreetMap, ODbL), [lon, lat], générés par scripts/contours.mjs.\nexport const CONTOURS = ${JSON.stringify(out)};\n`);
}
