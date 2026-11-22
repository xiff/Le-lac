// Plages des autres lacs suisses qui regardent le coucher de soleil (couchant-lacs.json), d'après les contours de contours.js (OpenStreetMap, simplifiés).
// Même méthode que scripts/couchant.mjs, sur 1,5 km (lacs plus petits) : la direction du couchant (304° en juin, 270° aux équinoxes) doit rester sur l'eau.
// Sans relief ni bâtiments. À relancer quand des plages ou des contours changent : node scripts/couchant-lacs.mjs
import { writeFile } from 'node:fs/promises';
import { SPOTS, lacDe } from '../spots.js';
import { CONTOURS } from '../contours.js';

const dans = (ring, [x, y]) => { let c = false; for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) { const [x1, y1] = ring[i], [x2, y2] = ring[j]; if ((y1 > y) !== (y2 > y) && x < ((x2 - x1) * (y - y1)) / (y2 - y1) + x1) c = !c; } return c; };
const point = (s, az, km) => { const r = (az * Math.PI) / 180; return [s.lon + (km * Math.sin(r)) / (111.32 * Math.cos((s.lat * Math.PI) / 180)), s.lat + (km * Math.cos(r)) / 110.57]; };
const voit = (ring, s, az) => [0.3, 0.6, 1, 1.5].every((km) => dans(ring, point(s, az, km)));
const out = {};
for (const [lac, ring] of Object.entries(CONTOURS)) {
  out[lac] = {};
  for (const s of SPOTS.filter((x) => lacDe(x) === lac)) out[lac][s.id] = { ete: voit(ring, s, 304), equinoxe: voit(ring, s, 270) };
}
console.assert(dans(CONTOURS.zurich, [8.66, 47.25]) && !dans(CONTOURS.zurich, [8.54, 47.37]), "contour de Zurich mal lu"); // entre Horgen et Meilen ; gare de Zurich
await writeFile(new URL('../couchant-lacs.json', import.meta.url), `${JSON.stringify(out, null, 1)}\n`);
for (const [l, v] of Object.entries(out)) console.log(l, Object.values(v).filter((x) => x.ete || x.equinoxe).length, '/', Object.keys(v).length);
