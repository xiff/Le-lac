// Qualité des eaux de baignade associée à nos plages :
// - plages genevoises : analyses du canton (SITG ECO_PLAGES, toutes les 3-4 semaines d'avril à octobre, licence ouverte opendata.swiss) ;
// - ailleurs : carte de la CIPEL (classement annuel, ~120 plages).
// Son serveur n'autorise pas les appels depuis le navigateur : récupérée par GitHub Actions, publiée dans qualite.json.
import { writeFile } from 'node:fs/promises';
import { SPOTS } from '../spots.js';

const URL = 'https://www.cipel.org/wp-content/themes/cipel/beaches/beaches-data.php';
const URL_GE = 'https://vector.sitg.ge.ch/arcgis/rest/services/ECO_PLAGES/FeatureServer/0/query?where=1%3D1&outFields=NOM_PLAGE,NOM_COMMUNE,QUALITE,MISE_A_JOUR&outSR=4326&f=geojson';
// Libellés du canton vers nos classes (1 bonne … 4 ne pas se baigner).
export const classeGe = (q) => (/interdi|déconseill|mauvaise/i.test(q) ? 4 : /pollu/i.test(q) ? 3 : /moyenne/i.test(q) ? 2 : /bonne|excellente/i.test(q) ? 1 : null);
const CLASSES = { 'Eau de qualité excellente à bonne': 1, 'Eau de qualité bonne à moyenne': 2, 'Eau pouvant être momentanément polluée': 3, 'Eau de mauvaise qualité - ne pas se baigner': 4, 'En cours de classification': 0 };
const texte = (t) => String(t ?? '').replace(/&#8211;/g, '–').replace(/&#8217;/g, '’').replace(/&amp;/g, '&').replace(/<[^>]+>/g, '').trim();
const km = (a, b) => Math.hypot((a.lat - b.lat) * 111.2, (a.lon - b.lon) * 111.2 * Math.cos((46.4 * Math.PI) / 180));

// Pour chaque plage de l'app, la plage CIPEL la plus proche à moins de 1,5 km.
export function associer(features, spots = SPOTS) {
  const cipel = features.map((f) => ({ nom: texte(f.properties?.name), lat: +f.geometry?.coordinates?.[1], lon: +f.geometry?.coordinates?.[0], qualite: CLASSES[f.properties?.quality] ?? null, alerte: texte(f.properties?.alert) }))
    .filter((p) => p.nom && Number.isFinite(p.lat) && Number.isFinite(p.lon) && p.qualite != null);
  const res = {};
  for (const s of spots) {
    const p = cipel.reduce((m, x) => (!m || km(s, x) < km(s, m) ? x : m), null);
    if (p && km(s, p) <= 1.5) res[s.id] = { plage: p.nom, qualite: p.qualite, ...(p.alerte ? { alerte: p.alerte } : {}) };
  }
  return res;
}

// Analyses genevoises (à moins de 1 km) prioritaires sur la CIPEL : plus récentes et mesurées sur place.
export function fusionner(cipel, featuresGe, spots = SPOTS) {
  const ge = featuresGe.map((f) => ({ nom: texte(f.properties?.NOM_PLAGE), lat: +f.geometry?.coordinates?.[1], lon: +f.geometry?.coordinates?.[0], qualite: classeGe(f.properties?.QUALITE ?? ''), date: f.properties?.MISE_A_JOUR }))
    .filter((p) => p.nom && Number.isFinite(p.lat) && p.qualite != null);
  const res = { ...cipel };
  for (const s of spots) {
    const p = ge.reduce((m, x) => (!m || km(s, x) < km(s, m) ? x : m), null);
    if (p && km(s, p) <= 1) res[s.id] = { plage: p.nom, qualite: p.qualite, source: 'ge', ...(p.date ? { date: p.date } : {}) };
  }
  return res;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const lire = () => fetch(URL, { headers: { 'User-Agent': 'LeLacAujourdhui/1.0 (+https://github.com/xiff/le-lac)', Accept: 'application/json' } });
  let r = await lire();
  if (!r.ok) { await new Promise((ok) => setTimeout(ok, 15000)); r = await lire(); } // refus passager de leur anti-spam
  if (!r.ok) { console.error(`CIPEL : HTTP ${r.status}, qualite.json inchangé.`); process.exit(0); }
  const d = await r.json();
  let spots = associer(d.features ?? []);
  try { // Genève en plus ; en cas d'échec on garde la CIPEL seule
    const ge = await (await fetch(URL_GE, { headers: { 'User-Agent': 'LeLacAujourdhui/1.0 (+https://github.com/xiff/le-lac)' } })).json();
    spots = fusionner(spots, ge.features ?? []);
  } catch (e) { console.error('SITG Genève indisponible :', e.message); }
  if (Object.keys(spots).length < SPOTS.length / 2) { console.error('CIPEL : trop peu de plages associées, qualite.json inchangé.'); process.exit(0); }
  await writeFile('qualite.json', JSON.stringify({ source: 'Qualité des eaux de baignade : Canton de Genève (SITG) et CIPEL', spots }) + '\n');
  console.log(`qualite.json : ${Object.keys(spots).length}/${SPOTS.length} plages.`);
}
