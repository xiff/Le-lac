// Conditions du jour pour une page de plage : même calcul que l'app.
import { SPOTS, valeurProche } from '../spots.js';
import { lire, verdict, ACTIVITES, PHRASES, meilleurCreneau } from '../score.js';

const $ = (id) => document.getElementById(id);
const s = SPOTS.find((x) => x.id === document.body.dataset.id);
const LIB = ['Non', 'Bof', 'Bien', 'Parfait'], NOMS = { baignade: 'Baignade', paddle: 'Paddle', voile: 'Voile / wing', hiver: 'Bain d’hiver' };
const deg = (v) => (v == null ? '–' : v.toFixed(1).replace('.', ',') + '°');

const eauJson = await fetch('../../eau.json', { cache: 'no-cache' }).then((r) => r.json()).catch(() => null);
const qualites = await fetch('../../qualite.json', { cache: 'no-cache' }).then((r) => r.json()).catch(() => null);
const q = qualites?.spots?.[s.id];
const CLASSES = ['en cours de classification', 'excellente à bonne', 'bonne à moyenne', 'pouvant être momentanément polluée', 'de mauvaise qualité : baignade déconseillée'];
if (q) { $('qualite').hidden = false; $('qualite').innerHTML = `<i class="q${q.qualite}" aria-hidden="true"></i>Eau de baignade ${CLASSES[q.qualite]} (${q.source === 'ge' ? `Canton de Genève, analyse du ${String(q.date).replace(/-/g, '.')}, ${q.plage}` : `CIPEL, ${q.plage}`})${q.alerte ? ` · ${q.alerte}` : ''}`; }
const eau = (id) => valeurProche(eauJson?.spots?.[id]);
document.querySelectorAll('[data-eau]').forEach((e) => (e.textContent = deg(eau(e.dataset.eau))));
$('eau').textContent = deg(eau(s.id));

try {
  const champs = 'temperature_2m,wind_speed_10m,wind_gusts_10m,wind_direction_10m,weather_code';
  const m = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${s.lat}&longitude=${s.lon}&current=${champs}&hourly=${champs}&forecast_hours=12&timezone=Europe%2FZurich`, { signal: AbortSignal.timeout(12000) }).then((r) => (r.ok ? r.json() : Promise.reject(r.status)));
  const c = lire(m.current, null, eau(s.id)); if (!c) throw new Error('incomplet');
  c.qualite = q?.qualite;
  const heures = (m.hourly?.time ?? []).map((t, i) => { const h = lire(m.hourly, i, c.eau); return h && { ...h, qualite: q?.qualite, heure: String(t).slice(11, 13) + 'h' }; }).filter(Boolean);
  $('verdict').textContent = verdict(c, 'fr').titre;
  $('air').textContent = Math.round(c.air) + '°';
  $('vent').textContent = Math.round(c.vent);
  $('releve').textContent = `${s.region} · relevé de ${String(m.current.time).slice(11, 16)}`;
  $('acts').innerHTML = ACTIVITES.map((a) => {
    const n = a.note(c), cr = meilleurCreneau(heures, a.note);
    return `<li><span class="nom">${NOMS[a.id]}</span><em class="t${n}">${LIB[n]}</em><span class="phrase">${PHRASES.fr[a.id][n]}${cr ? ` Meilleur moment ${cr.de}–${cr.a}.` : ''}</span></li>`;
  }).join('');
} catch {
  $('verdict').textContent = 'Le lac ne répond pas pour l’instant. Réessaie dans un moment.';
}
