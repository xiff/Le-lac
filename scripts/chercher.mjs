// Cherche des lieux par nom dans OpenStreetMap (Nominatim) : node scripts/chercher.mjs "Lido Origlio" "Lido Muzzano"
for (const q of process.argv.slice(2)) {
  const r = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&limit=8&countrycodes=ch`, { headers: { 'User-Agent': 'MonLac-recherche/1.0 (https://github.com/xiff/Le-lac)' } });
  console.log('==', q, r.status);
  for (const x of r.ok ? await r.json() : []) console.log(`  ${(+x.lat).toFixed(5)},${(+x.lon).toFixed(5)}  ${x.class}/${x.type}  ${x.osm_type}/${x.osm_id}  « ${x.display_name.slice(0, 90)} »`);
  await new Promise((f) => setTimeout(f, 1500));
}
