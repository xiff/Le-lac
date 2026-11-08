// Conditions du jour pour une page de plage : même calcul que l'app.
import { SPOTS, valeurProche } from '../spots.js';
import { lire, verdict, ACTIVITES, PHRASES, cle, qualiteRecente } from '../score.js';

const $ = (id) => document.getElementById(id);
const s = SPOTS.find((x) => x.id === document.body.dataset.id);
const L = document.documentElement.lang === 'en' ? 'en' : 'fr';
const T = {
  fr: { lib: ['Non', 'Bof', 'Bien', 'Parfait'], noms: { baignade: 'Baignade', paddle: 'Paddle', voile: 'Voile / wing', hiver: 'Bain d’hiver' },
    classes: ['en cours de classification', 'excellente à bonne', 'bonne à moyenne', 'pouvant être momentanément polluée', 'de mauvaise qualité : baignade déconseillée'],
    eau: (c) => `Eau de baignade ${c}`, ge: (d, p) => `Canton de Genève, analyse du ${d}, ${p}`, releve: (r, h) => `${r} · relevé de ${h}`,
erreur: 'Le lac ne répond pas pour l’instant. Réessaie dans un moment.' },
  en: { lib: ['No', 'Meh', 'Good', 'Perfect'], noms: { baignade: 'Swimming', paddle: 'Paddle', voile: 'Sailing / wing', hiver: 'Winter swim' },
    classes: ['being classified', 'excellent to good', 'good to fair', 'may be temporarily polluted', 'poor: swimming not advised'],
    eau: (c) => `Bathing water ${c}`, ge: (d, p) => `Canton of Geneva, tested ${d}, ${p}`, releve: (r, h) => `${r} · reading from ${h}`,
erreur: 'The lake isn’t answering right now. Try again in a moment.' },
}[L];
const REGIONS_EN = { 'Genève': 'Geneva', 'Morges et Lausanne': 'Morges & Lausanne', 'Rive française': 'French shore' };
const LIB = T.lib, NOMS = T.noms;
const deg = (v) => (v == null ? '–' : (L === 'en' ? v.toFixed(1) : v.toFixed(1).replace('.', ',')) + '°');
const donnee = (f) => new URL(`../${f}`, import.meta.url); // racine du site, quelle que soit la profondeur de la page

const eauJson = await fetch(donnee('eau.json'), { cache: 'no-cache' }).then((r) => r.json()).catch(() => null);
const qualites = await fetch(donnee('qualite.json'), { cache: 'no-cache' }).then((r) => r.json()).catch(() => null);
const q = qualiteRecente(qualites?.spots?.[s.id]); // analyse de plus de 30 jours : on n'affiche rien
if (q) { $('qualite').hidden = false; $('qualite').innerHTML = `<i class="q${q.qualite}" aria-hidden="true"></i>${T.eau(T.classes[q.qualite])} (${q.source === 'ge' ? T.ge(String(q.date).replace(/-/g, '.'), q.plage) : `CIPEL, ${q.plage}`})${q.alerte ? ` · ${q.alerte}` : ''}`; }
const eau = (id) => valeurProche(eauJson?.spots?.[id]);
document.querySelectorAll('[data-eau]').forEach((e) => (e.textContent = deg(eau(e.dataset.eau))));
$('eau').textContent = deg(eau(s.id));

try {
  const champs = 'temperature_2m,wind_speed_10m,wind_gusts_10m,wind_direction_10m,weather_code';
  const m = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${s.lat}&longitude=${s.lon}&current=${champs}&hourly=${champs}&forecast_hours=12&timezone=Europe%2FZurich`, { signal: AbortSignal.timeout(12000) }).then((r) => (r.ok ? r.json() : Promise.reject(r.status)));
  const c = lire(m.current, null, eau(s.id)); if (!c) throw new Error('incomplet');
  c.qualite = q?.qualite;
  $('verdict').textContent = verdict(c, L, Math.floor(Math.random() * 60)).titre;
  $('air').textContent = Math.round(c.air) + '°';
  $('vent').textContent = Math.round(c.vent);
  $('releve').textContent = T.releve(L === 'en' ? REGIONS_EN[s.region] ?? s.region : s.region, String(m.current.time).slice(11, 16));
  $('acts').innerHTML = ACTIVITES.map((a) => {
    const n = a.note(c);
    return `<li><span class="nom">${NOMS[cle(a, c)]}</span><em class="t${n}">${LIB[n]}</em><span class="phrase">${PHRASES[L][cle(a, c)][n]}</span></li>`;
  }).join('');
} catch {
  $('verdict').textContent = T.erreur;
}
