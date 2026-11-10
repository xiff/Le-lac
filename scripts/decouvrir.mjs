// Liste les plages et lieux de baignade d'OpenStreetMap autour de nouveaux lacs, pour choisir les plages à suivre.
// Lancé par .github/workflows/decouvrir.yml (le réseau de développement ne joint pas Overpass).
const LACS = { neuchatel: [46.74, 6.58, 47.06, 7.10], bienne: [47.03, 7.05, 47.17, 7.30], morat: [46.88, 7.00, 46.97, 7.14],
  gruyere: [46.60, 7.00, 46.79, 7.16], sion: [46.20, 7.28, 46.26, 7.42] };
const corps = (b) => `[out:json][timeout:120];(
  nwr["natural"="beach"](${b});
  nwr["leisure"~"^(beach_resort|swimming_area|bathing_place)$"](${b});
  nwr["amenity"="public_bath"](${b});
  nwr["name"~"plage|strandbad|bains|baignade|badi|lido|îles|montorge",i](${b});
);out center tags;`;
for (const [lac, b] of Object.entries(LACS)) {
  let r;
  for (const url of ['https://overpass-api.de/api/interpreter', 'https://overpass.kumi.systems/api/interpreter', 'https://overpass-api.de/api/interpreter']) {
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
