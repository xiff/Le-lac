// Étiquettes OpenStreetMap autour de chaque plage (osm-plages.json) : nature du sol (surface), chiens (dog), aire de jeux, plongeoir.
// On lit les objets à moins d'environ 150 m du point de la plage (API OpenStreetMap, données ODbL). Ce n'est pas un recensement officiel :
// une étiquette absente ne veut pas dire « non ». À relancer quand des plages sont ajoutées : NODE_USE_ENV_PROXY=1 node scripts/osm-plages.mjs
import { writeFile } from 'node:fs/promises';
import { SPOTS, lacDe } from '../spots.js';

const out = {};
for (const s of SPOTS) {
  const d = 0.0015, bbox = [s.lon - d, s.lat - d, s.lon + d, s.lat + d].join(',');
  const j = await fetch(`https://www.openstreetmap.org/api/0.6/map.json?bbox=${bbox}`, { headers: { 'user-agent': 'lac-research/1.0 (monlac.ch)' } }).then((r) => r.json()).catch(() => null);
  if (!j) { console.warn(`${s.id} : pas de réponse`); continue; }
  const t = j.elements.map((e) => e.tags).filter(Boolean);
  const plage = t.filter((x) => x.natural === 'beach' || x.leisure === 'swimming_area' || x.leisure === 'beach_resort');
  out[s.id] = {
    sable: plage.some((x) => x.surface === 'sand'),
    chiens: plage.find((x) => x.dog)?.dog ?? null, // yes, no, designated…
    chiensNom: plage.find((x) => x.dog)?.name ?? null,
    jeux: t.some((x) => x.leisure === 'playground'),
    plongeoir: t.find((x) => /plongeoir|sprungturm|diving.?board|springboard/i.test(`${x.name ?? ''} ${x.leisure ?? ''} ${x.amenity ?? ''}`))?.name ?? null,
  };
}
await writeFile(new URL('../osm-plages.json', import.meta.url), `${JSON.stringify(out, null, 1)}\n`);
console.log(`${Object.keys(out).length} plages`);
