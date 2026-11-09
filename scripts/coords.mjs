// Vérifie les coordonnées des plages contre OpenStreetMap : pour chaque plage de spots.js, cherche la plage,
// la zone de baignade ou les bains les plus proches (et dont le nom ressemble), et écrit coords.json pour relecture.
// Lancé par .github/workflows/coords.yml (le réseau de développement ne joint pas OSM).
import { writeFile } from 'node:fs/promises';
import { SPOTS } from '../spots.js';

const requete = `[out:json][timeout:120];
(
  nwr["natural"="beach"](46.15,6.10,46.55,6.95);
  nwr["leisure"~"^(beach_resort|swimming_area|bathing_place)$"](46.15,6.10,46.55,6.95);
  nwr["amenity"="public_bath"](46.15,6.10,46.55,6.95);
  nwr["sport"="swimming"]["leisure"!="sports_centre"](46.15,6.10,46.55,6.95);
  nwr["name"~"plage|bains|baignade|beach|lido",i](46.15,6.10,46.55,6.95);
);
out center tags;`;
const r = await fetch('https://overpass-api.de/api/interpreter', { method: 'POST', body: 'data=' + encodeURIComponent(requete),
  headers: { 'User-Agent': 'MonLac-verification-coordonnees/1.0', 'Content-Type': 'application/x-www-form-urlencoded' } });
if (!r.ok) throw new Error('Overpass ' + r.status);
const elements = (await r.json()).elements.map((e) => ({ nom: e.tags?.name ?? '', type: e.tags?.natural ?? e.tags?.leisure ?? e.tags?.amenity ?? e.tags?.sport ?? e.tags?.place ?? e.tags?.highway ?? '?',
  lat: e.lat ?? e.center?.lat, lon: e.lon ?? e.center?.lon, osm: `${e.type}/${e.id}` })).filter((e) => e.lat);

const km = (a, b) => 6371 * 2 * Math.asin(Math.sqrt(Math.sin(((b.lat - a.lat) * Math.PI) / 360) ** 2 + Math.cos((a.lat * Math.PI) / 180) * Math.cos((b.lat * Math.PI) / 180) * Math.sin(((b.lon - a.lon) * Math.PI) / 360) ** 2));
const sans = (x) => x.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const mots = (x) => sans(x).split(' ').filter((m) => m.length > 3 && !['plage', 'lausanne', 'bains'].includes(m));

const res = SPOTS.map((s) => {
  const proches = elements.map((e) => ({ ...e, d: km(s, e) })).filter((e) => e.d < 4)
    .map((e) => ({ ...e, nomOk: mots(s.nom).some((m) => sans(e.nom).includes(m)) }))
    .sort((a, b) => (b.nomOk - a.nomOk) || a.d - b.d);
  return { id: s.id, nom: s.nom, actuel: [s.lat, s.lon], candidats: proches.slice(0, 4).map((e) => ({ nom: e.nom, type: e.type, lat: +e.lat.toFixed(5), lon: +e.lon.toFixed(5), km: +e.d.toFixed(2), nomOk: e.nomOk, osm: e.osm })) };
});
await writeFile('coords.json', JSON.stringify(res, null, 1));
for (const x of res) {
  const c = x.candidats[0];
  console.log(`${x.id} (actuel ${x.actuel.join(',')})`);
  for (const c of x.candidats) console.log(`   ${c.km.toFixed(2)} km → ${c.lat},${c.lon} ${c.nomOk ? '[nom]' : ''} ${c.type} « ${c.nom} » ${c.osm}`);
}
