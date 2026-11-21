// Plages du Léman qui regardent le coucher de soleil (couchant.json) : depuis le point de chaque plage, on suit la direction du soleil couchant
// et on vérifie que la ligne reste sur l'eau de 0,5 à 3 km. Contour du lac : relation OpenStreetMap 332617 « Le Léman » (ODbL).
// Azimuts du coucher à 46,4° N : environ 304° au solstice d'été, 270° aux équinoxes (approximation, sans relief : une montagne peut cacher le soleil).
// À relancer quand des plages sont ajoutées : NODE_USE_ENV_PROXY=1 node scripts/couchant.mjs
import { writeFile } from 'node:fs/promises';
import { SPOTS, lacDe } from '../spots.js';

const j = await fetch('https://www.openstreetmap.org/api/0.6/relation/332617/full.json', { headers: { 'user-agent': 'lac-research/1.0 (monlac.ch)' } }).then((r) => r.json());
const N = new Map(j.elements.filter((e) => e.type === 'node').map((e) => [e.id, [e.lon, e.lat]]));
const W = new Map(j.elements.filter((e) => e.type === 'way').map((e) => [e.id, e.nodes]));
const lignes = j.elements.find((e) => e.type === 'relation').members.filter((m) => m.type === 'way').map((m) => W.get(m.ref).map((n) => N.get(n)));
// Pair-impair sur tous les segments des anneaux (extérieurs et îles) : pas besoin d'assembler les anneaux.
const dansLac = ([x, y]) => { let c = false; for (const l of lignes) for (let i = 1; i < l.length; i++) { const [x1, y1] = l[i - 1], [x2, y2] = l[i]; if ((y1 > y) !== (y2 > y) && x < ((x2 - x1) * (y - y1)) / (y2 - y1) + x1) c = !c; } return c; };
const point = (s, az, km) => { const r = (az * Math.PI) / 180; return [s.lon + (km * Math.sin(r)) / (111.32 * Math.cos((s.lat * Math.PI) / 180)), s.lat + (km * Math.cos(r)) / 110.57]; };
const voit = (s, az) => [0.5, 1, 2, 3].every((km) => dansLac(point(s, az, km)));

console.assert(dansLac([6.53, 46.45]) && !dansLac([6.63, 46.53]), 'contour du Léman mal lu'); // milieu du lac ; centre de Lausanne
const out = {};
for (const s of SPOTS.filter((x) => lacDe(x) === 'leman')) out[s.id] = { ete: voit(s, 304), equinoxe: voit(s, 270) };
await writeFile(new URL('../couchant.json', import.meta.url), `${JSON.stringify(out, null, 1)}\n`);
console.log(`${Object.values(out).filter((v) => v.ete).length} plages face au couchant d'été, ${Object.values(out).filter((v) => v.equinoxe).length} aux équinoxes`);
