// Contours des lacs (hors Léman, tracé par ses plages) tirés d'OpenStreetMap, simplifiés pour la carte de l'app.
// Lancé par .github/workflows/contours.yml (le réseau de développement ne joint pas OSM) ; écrit contours.js.
import { writeFile } from 'node:fs/promises';

const LACS = {
  neuchatel: ['Neuchâtel', '46.70,6.50,47.10,7.10'], bienne: ['Bielersee|Lac de Bienne', '47.00,7.00,47.20,7.30'],
  morat: ['Murtensee|Lac de Morat', '46.85,7.00,46.98,7.15'], gruyere: ['Gruyère|Greyerzersee', '46.55,7.00,46.80,7.20'],
};
const pause = (ms) => new Promise((f) => setTimeout(f, ms));
async function overpass(q) {
  for (const url of ['https://overpass-api.de/api/interpreter', 'https://overpass.private.coffee/api/interpreter', 'https://overpass.kumi.systems/api/interpreter', 'https://overpass-api.de/api/interpreter']) {
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

// Anneau fermé (premier point = dernier) : on le coupe en deux moitiés, sinon le segment de référence est nul.
export function simplifierAnneau(p, tol) {
  const m = Math.floor(p.length / 2);
  return simplifier(p.slice(0, m + 1), tol).slice(0, -1).concat(simplifier(p.slice(m), tol));
}

if (import.meta.url === `file://${process.argv[1]}`) {
  // Nominatim renvoie le polygone déjà simplifié (polygon_threshold, en degrés) ; une requête par seconde au plus.
  const Q = { neuchatel: 'Lac de Neuchâtel', bienne: 'Bielersee', morat: 'Murtensee', gruyere: 'Lac de la Gruyère', lugano: 'Lago di Lugano', majeur: 'Lago Maggiore', joux: 'Lac de Joux',
    zurich: 'Zürichsee', greifensee: 'Greifensee', lucerne: 'Vierwaldstättersee', zoug: 'Zugersee', aegeri: 'Ägerisee', hallwil: 'Hallwilersee',
    thoune: 'Thunersee', brienz: 'Brienzersee', sempach: 'Sempachersee', baldegg: 'Baldeggersee', sarnen: 'Sarnersee', constance: 'Bodensee', untersee: 'Untersee' };
  const out = {};
  for (const [lac, q] of Object.entries(Q)) {
    const u = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&countrycodes=ch,it,de,at&format=json&polygon_geojson=1&polygon_threshold=0.0008&limit=5`;
    const r = await fetch(u, { headers: { 'User-Agent': 'MonLac-contours/1.0 (https://github.com/xiff/Le-lac)' } });
    const j = r.ok ? await r.json() : [];
    const e = j.find((x) => (x.class === 'water' || x.class === 'natural') && /Polygon/.test(x.geojson?.type));
    console.log(lac, r.status, j.map((x) => `${x.class}/${x.type} ${x.osm_type}/${x.osm_id} ${x.geojson?.type}`).join(' ; '));
    if (e) {
      const polys = e.geojson.type === 'Polygon' ? [e.geojson.coordinates] : e.geojson.coordinates;
      const ext = polys.map((p) => p[0]).sort((a, b) => b.length - a.length)[0];
      out[lac] = simplifierAnneau(ext, 0.0008).map(([x, y]) => [+x.toFixed(5), +y.toFixed(5)]);
      console.log(' →', ext.length, 'points, simplifié', out[lac].length);
    }
    await pause(2000);
  }
  if (!Object.keys(out).length) throw new Error('aucun contour');
  await writeFile('contours.js', `// Contours des lacs (OpenStreetMap, ODbL), [lon, lat], générés par scripts/contours.mjs.\nexport const CONTOURS = ${JSON.stringify(out)};\n`);
}
