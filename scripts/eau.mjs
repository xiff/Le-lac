// Récupère la température de l'eau à 70 cm pour chaque plage (modèle Alplakes, Eawag)
// et l'écrit dans eau.json, servi avec l'app. Lancé toutes les 3 h par GitHub Actions :
// l'API n'autorise pas les appels directs depuis le navigateur, et l'Eawag demande de mettre en cache.
import { writeFile } from 'node:fs/promises';
import { SPOTS, LACS, lacDe } from '../spots.js';
const API = 'https://alplakes-api.eawag.ch/simulations';
const UA = 'LeLacAujourdhui/1.0 (+https://github.com/xiff/le-lac)';
const fmt = (d) => d.toISOString().replace(/[-:T]/g, '').slice(0, 12);
const pause = (ms) => new Promise((ok) => setTimeout(ok, ms));
const debut = new Date(Date.now() - 6 * 3600e3), fin = new Date(Date.now() + 48 * 3600e3);
const arrondi = (x) => (x == null ? null : Math.round(x * 10) / 10);

// Modèle 3D : la valeur au point de la plage ; modèle 1D (Simstrat) : une valeur pour tout le lac.
async function lire(url, cle) {
  for (let essai = 0; essai < 3; essai++) {
    const r = await fetch(url, { headers: { 'User-Agent': UA } });
    if (r.status === 429 || r.status >= 500) { await pause(10000 * (essai + 1)); continue; }
    if (!r.ok) throw new Error(`HTTP ${r.status} ${url}`);
    const d = await r.json();
    return { t: d.time, v: d.variables[cle].data.map(arrondi) };
  }
  throw new Error(`API indisponible ${url}`);
}
const lac1D = {};
async function serie(s) {
  const m = LACS[lacDe(s)].eau;
  if (!m) return null;
  if (m.modele === 'simstrat') return (lac1D[m.lac] ??= lire(`${API}/1d/point/simstrat/${m.lac}/${fmt(debut)}/${fmt(fin)}/0.7?variables=T`, 'T'));
  return lire(`${API}/point/${m.modele}/${m.lac}/${fmt(debut)}/${fmt(fin)}/0.7/${s.large?.[0] ?? s.lat}/${s.large?.[1] ?? s.lon}?variables=temperature`, 'temperature');
}

const spots = {};
let erreurs = 0;
for (const s of SPOTS) {
  if (!LACS[lacDe(s)].eau) continue; // pas de modèle pour ce lac
  try { spots[s.id] = await serie(s); } catch (e) { erreurs++; console.error(s.id, e.message); }
  await pause(1500); // espacer les appels, comme demandé par l'Eawag
}
if (!Object.keys(spots).length) { console.error('Aucune donnée : eau.json inchangé.'); process.exit(1); }
await writeFile('eau.json', JSON.stringify({ maj: new Date().toISOString(), source: 'Données : Alplakes, Eawag (CC BY 4.0)', profondeur_m: 0.7, spots }) + '\n');
console.log(`eau.json : ${Object.keys(spots).length}/${SPOTS.length} plages.`);
