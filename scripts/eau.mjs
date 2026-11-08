// Récupère la température de l'eau à 70 cm pour chaque plage (modèle Alplakes, Eawag)
// et l'écrit dans eau.json, servi avec l'app. Lancé toutes les 3 h par GitHub Actions :
// l'API n'autorise pas les appels directs depuis le navigateur, et l'Eawag demande de mettre en cache.
import { writeFile } from 'node:fs/promises';
import { SPOTS } from '../spots.js';

const API = 'https://alplakes-api.eawag.ch/simulations/point/delft3d-flow/geneva';
const UA = 'LeLacAujourdhui/1.0 (+https://github.com/xiff/le-lac)';
const fmt = (d) => d.toISOString().replace(/[-:T]/g, '').slice(0, 12);
const pause = (ms) => new Promise((ok) => setTimeout(ok, ms));
const debut = new Date(Date.now() - 6 * 3600e3), fin = new Date(Date.now() + 48 * 3600e3);

async function serie(s) {
  for (let essai = 0; essai < 3; essai++) {
    const r = await fetch(`${API}/${fmt(debut)}/${fmt(fin)}/0.7/${s.lat}/${s.lon}?variables=temperature`, { headers: { 'User-Agent': UA } });
    if (r.status === 429 || r.status >= 500) { await pause(10000 * (essai + 1)); continue; }
    if (!r.ok) throw new Error(`${s.id} : HTTP ${r.status}`);
    const d = await r.json();
    return { t: d.time, v: d.variables.temperature.data.map((x) => (x == null ? null : Math.round(x * 10) / 10)) };
  }
  throw new Error(`${s.id} : API indisponible`);
}

const spots = {};
let erreurs = 0;
for (const s of SPOTS) {
  try { spots[s.id] = await serie(s); } catch (e) { erreurs++; console.error(e.message); }
  await pause(1500); // espacer les appels, comme demandé par l'Eawag
}
if (erreurs === SPOTS.length) { console.error('Aucune donnée : eau.json inchangé.'); process.exit(1); }
await writeFile('eau.json', JSON.stringify({ maj: new Date().toISOString(), source: 'Données : Alplakes, Eawag (CC BY 4.0)', profondeur_m: 0.7, spots }) + '\n');
console.log(`eau.json : ${Object.keys(spots).length}/${SPOTS.length} plages.`);
