// Arrêt de transport public le plus proche de chaque plage suisse (arrets.json), d'après la couche « Arrêts tp » de l'Office fédéral des transports
// (api3.geo.admin.ch, ch.bav.haltestellen-oev). La couche ne dit pas si l'arrêt est une gare, un arrêt de bus ou un débarcadère : on écrit seulement
// « l'arrêt de transport public le plus proche » et sa distance à vol d'oiseau. À relancer quand des plages sont ajoutées : node scripts/arrets.mjs
import { writeFile } from 'node:fs/promises';
import { SPOTS, lacDe } from '../spots.js';

const R = 6371000, rad = (d) => (d * Math.PI) / 180;
const dist = (a, b) => 2 * R * Math.asin(Math.sqrt(Math.sin(rad(b.lat - a.lat) / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(rad(b.lon - a.lon) / 2) ** 2));
const url = (s, d) => `https://api3.geo.admin.ch/rest/services/all/MapServer/identify?geometryType=esriGeometryPoint&geometry=${s.lon},${s.lat}&imageDisplay=2000,2000,96&mapExtent=${s.lon - d},${s.lat - d * 0.7},${s.lon + d},${s.lat + d * 0.7}&tolerance=900&layers=all:ch.bav.haltestellen-oev&sr=4326&returnGeometry=true&geometryFormat=geojson&lang=fr`;
const out = {};
// La couche ne couvre que la Suisse : les plages de la rive française n'ont pas de valeur.
for (const s of SPOTS.filter((x) => x.zone !== 'evian')) { // toutes les plages suisses (la rive française du Léman n'est pas couverte)
  let proche = null;
  for (const d of [0.01, 0.03]) { // d'abord un petit rayon, puis un plus grand si rien
    const r = await fetch(url(s, d), { headers: { 'user-agent': 'lac-research/1.0 (monlac.ch)' } }).then((x) => x.json()).catch(() => null);
    for (const f of r?.results ?? []) {
      const [lon, lat] = f.geometry?.coordinates?.[0] ?? []; if (lon == null) continue;
      const m = dist(s, { lat, lon }), nom = f.properties?.haltestelle ?? f.properties?.label;
      if (nom && (!proche || m < proche.m)) proche = { nom, m: Math.round(m) };
    }
    if (proche) break;
    await new Promise((ok) => setTimeout(ok, 300));
  }
  out[s.id] = proche; console.log(s.id.padEnd(28), proche ? `${proche.m} m  ${proche.nom}` : 'aucun');
  await new Promise((ok) => setTimeout(ok, 300));
}
await writeFile(new URL('../arrets.json', import.meta.url), JSON.stringify(out, null, 1) + '\n');
