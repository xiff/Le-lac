// Liste les plages et lieux de baignade d'OpenStreetMap autour de nouveaux lacs, pour choisir les plages à suivre.
// Lancé par .github/workflows/decouvrir.yml (le réseau de développement ne joint pas Overpass).
const LACS = { neuchatel: [46.74, 6.58, 47.06, 7.10], bienne: [47.03, 7.05, 47.17, 7.30], morat: [46.88, 7.00, 46.97, 7.14],
  gruyere: [46.60, 7.00, 46.79, 7.16], sion: [46.20, 7.28, 46.26, 7.42],
  lugano: [45.90, 8.83, 46.06, 9.10], majeur: [46.08, 8.58, 46.20, 8.92],
  origlio: [46.04, 8.93, 46.07, 8.96], muzzano: [45.99, 8.90, 46.01, 8.94],
  joux: [46.58, 6.18, 46.70, 6.34], bret: [46.49, 6.75, 46.53, 6.80], brenets: [47.04, 6.68, 47.09, 6.75],
  zurich: [47.17, 8.53, 47.37, 8.85], zoug: [47.05, 8.43, 47.20, 8.53], lucerne: [46.92, 8.25, 47.07, 8.65], aegeri: [47.08, 8.60, 47.14, 8.66],
  hallwil: [47.26, 8.18, 47.33, 8.24], greifensee: [47.33, 8.64, 47.38, 8.71], thoune: [46.64, 7.62, 46.77, 7.88], brienz: [46.68, 7.85, 46.77, 8.06],
  sempach: [47.11, 8.13, 47.18, 8.21], baldegg: [47.18, 8.24, 47.23, 8.28], sarnen: [46.84, 8.20, 46.92, 8.29], stmoritz: [46.48, 9.83, 46.50, 9.86],
  silvaplana: [46.43, 9.75, 46.47, 9.81], sils: [46.40, 9.70, 46.45, 9.77], constance: [47.48, 9.00, 47.70, 9.62] };
const corps = (b) => `[out:json][timeout:120];(
  nwr["natural"="beach"](${b});
  nwr["leisure"~"^(beach_resort|swimming_area|bathing_place)$"](${b});
  nwr["amenity"="public_bath"](${b});
  nwr["name"~"plage|strandbad|seebad|badi|bains|baignade|lido|spiaggia|bagno|badeplatz|badestelle",i](${b});
  nwr["natural"="water"]["name"~"^lac|see$|étang",i](${b});
);out center tags;`;
// node scripts/decouvrir.mjs [lac] : un seul lac si précisé.
for (const [lac, b] of Object.entries(LACS).filter(([l]) => !process.argv[2] || process.argv[2].split(',').includes(l))) {
  let r;
  for (const url of ['https://overpass-api.de/api/interpreter', 'https://overpass.private.coffee/api/interpreter', 'https://overpass.kumi.systems/api/interpreter', 'https://overpass-api.de/api/interpreter']) {
    r = await fetch(url, { method: 'POST', body: 'data=' + encodeURIComponent(corps(b.join(','))), headers: { 'User-Agent': 'MonLac-decouverte/1.0', 'Content-Type': 'application/x-www-form-urlencoded' } }).catch(() => null);
    if (r?.ok) break;
    await new Promise((f) => setTimeout(f, 20000));
  }
  if (!r?.ok) { console.log(lac, 'Overpass indisponible'); continue; }
  const el = (await r.json()).elements.map((e) => ({ nom: e.tags?.name ?? '', type: e.tags?.natural ?? e.tags?.leisure ?? e.tags?.amenity ?? e.tags?.highway ?? e.tags?.place ?? '?', lat: e.lat ?? e.center?.lat, lon: e.lon ?? e.center?.lon }))
    .filter((e) => e.lat && !['residential', 'bus_stop', 'service', 'footway', 'unclassified', 'tertiary', 'secondary', 'path', 'track', 'parking', 'platform'].includes(e.type));
  console.log(`== ${lac} (${el.length})`);
  for (const e of el.sort((a, b) => a.lon - b.lon)) console.log(`  ${e.lat.toFixed(5)},${e.lon.toFixed(5)}  ${e.type}  « ${e.nom} »`);
  await new Promise((f) => setTimeout(f, 5000));
}
