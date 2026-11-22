// Température de l'eau mois par mois pour chaque lac (saisons.json) : modèle 1D Simstrat d'Alplakes (Eawag, CC BY 4.0), à 70 cm, années 2023 à 2025.
// Pour chaque mois : moyenne des trois ans, et plus froide et plus chaude des moyennes journalières. Une valeur pour tout le lac (pas plage par plage) ; pour Zurich, Lugano et Lucerne, le bassin principal (voir SIM).
// À relancer une fois par an : node scripts/saisons.mjs
import { writeFile } from 'node:fs/promises';
import { LACS } from '../spots.js';

const UA = 'LeLacAujourdhui/1.0 (+https://github.com/xiff/le-lac)';
const pause = (ms) => new Promise((ok) => setTimeout(ok, ms));
const ANS = [2023, 2024, 2025];
// Nom du lac dans Simstrat quand il diffère du modèle 3D : bassin où se trouvent la plupart de nos plages.
const SIM = { zurich: 'lowerzurich', lugano: 'upperlugano', lucerne: 'lucernekreuztrichterandvitznauerbecken', aegeri: 'aegeri' };
const out = {};
for (const [cle, l] of Object.entries(LACS)) {
  if (!l.eau) continue;
  const jours = {}; // AAAA-MM-JJ -> valeurs
  try {
    for (const an of ANS) {
      const r = await fetch(`https://alplakes-api.eawag.ch/simulations/1d/point/simstrat/${SIM[cle] ?? l.eau.lac}/${an}01010000/${an}12312300/0.7?variables=T`, { headers: { 'User-Agent': UA } });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const d = await r.json();
      d.time.forEach((t, i) => { const v = d.variables.T.data[i]; if (v != null) (jours[t.slice(0, 10)] ??= []).push(v); });
      await pause(1500); // espacer les appels, comme demandé par l'Eawag
    }
  } catch (e) { console.error(cle, e.message); continue; }
  const mois = Array.from({ length: 12 }, () => []);
  for (const [j, v] of Object.entries(jours)) mois[+j.slice(5, 7) - 1].push(v.reduce((a, b) => a + b) / v.length);
  const r1 = (x) => Math.round(x * 10) / 10;
  if (mois.some((m) => m.length < 60)) { console.error(cle, 'données incomplètes'); continue; }
  out[cle] = mois.map((m) => ({ moy: r1(m.reduce((a, b) => a + b) / m.length), min: r1(Math.min(...m)), max: r1(Math.max(...m)) }));
}
console.assert(Object.values(out).every((m) => m[6].moy > m[0].moy), 'juillet plus froid que janvier : données suspectes');
await writeFile(new URL('../saisons.json', import.meta.url), `${JSON.stringify({ source: 'Alplakes, Eawag (CC BY 4.0), modèle Simstrat, 70 cm', annees: ANS, lacs: out })}\n`);
console.log(Object.keys(out).length, 'lacs :', Object.keys(out).join(' '));
