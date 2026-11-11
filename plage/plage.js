// Conditions du jour pour une page de plage : même calcul que l'app.
import { SPOTS, valeurProche, REGIONS } from '../spots.js';
import { lire, verdict, ACTIVITES, PHRASES, cle, qualiteRecente } from '../score.js';

const $ = (id) => document.getElementById(id);
const s = SPOTS.find((x) => x.id === document.body.dataset.id);
const L = ['en', 'de', 'it'].includes(document.documentElement.lang) ? document.documentElement.lang : 'fr';
const T = {
  fr: { lib: ['Non', 'Bof', 'Bien', 'Parfait'], noms: { baignade: 'Baignade', paddle: 'Paddle', voile: 'Voile / wing', hiver: 'Bain d’hiver' },
    classes: ['en cours de classification', 'excellente à bonne', 'bonne à moyenne', 'pouvant être momentanément polluée', 'de mauvaise qualité : baignade déconseillée'],
    eau: (c) => `Eau de baignade ${c}`, ge: (d, p) => `Canton de Genève, analyse du ${d}, ${p}`, releve: (r, h) => `${r} · relevé de ${h}`,
erreur: 'Le lac ne répond pas pour l’instant. Réessaie dans un moment.' },
  en: { lib: ['No', 'Meh', 'Good', 'Perfect'], noms: { baignade: 'Swimming', paddle: 'Paddle', voile: 'Sailing / wing', hiver: 'Winter swim' },
    classes: ['being classified', 'excellent to good', 'good to fair', 'may be temporarily polluted', 'poor: swimming not advised'],
    eau: (c) => `Bathing water ${c}`, ge: (d, p) => `Canton of Geneva, tested ${d}, ${p}`, releve: (r, h) => `${r} · reading from ${h}`,
erreur: 'The lake isn’t answering right now. Try again in a moment.' },
  de: { lib: ['Nein', 'Naja', 'Gut', 'Perfekt'], noms: { baignade: 'Baden', paddle: 'Paddeln', voile: 'Segeln / Wing', hiver: 'Winterbaden' },
    classes: ['wird eingestuft', 'ausgezeichnet bis gut', 'gut bis ausreichend', 'kann vorübergehend verschmutzt sein', 'mangelhaft: Baden nicht empfohlen'],
    eau: (c) => `Badewasser ${c}`, ge: (d, p) => `Kanton Genf, Probe vom ${d}, ${p}`, releve: (r, h) => `${r} · Messung von ${h}`,
    erreur: 'Der See antwortet gerade nicht. Versuch es gleich noch einmal.' },
  it: { lib: ['No', 'Così così', 'Bene', 'Perfetto'], noms: { baignade: 'Balneazione', paddle: 'Paddle', voile: 'Vela / wing', hiver: 'Bagno invernale' },
    classes: ['in corso di classificazione', 'eccellente o buona', 'buona o sufficiente', 'può essere temporaneamente inquinata', 'scarsa: balneazione sconsigliata'],
    eau: (c) => `Acqua di balneazione ${c}`, ge: (d, p) => `Cantone di Ginevra, analisi del ${d}, ${p}`, releve: (r, h) => `${r} · rilevamento delle ${h}`,
    erreur: 'Il lago non risponde per ora. Riprova tra un attimo.' },
}[L];
const LIB = T.lib, NOMS = T.noms;
// Icône du temps (code WMO d'Open-Meteo), dessinée comme celles de l'app.
const ciel = (code, jour = true) => (code >= 95 ? 'orage' : code >= 85 ? 'neige' : code >= 80 ? 'averses' : code >= 71 ? 'neige' : code >= 61 ? 'pluie'
  : code >= 51 ? 'bruine' : code >= 45 ? 'brouillard' : code === 3 ? 'couvert' : code >= 1 ? (jour ? 'eclaircie' : 'lune-nuage') : (jour ? 'soleil' : 'lune'));
const CIEL = {
  fr: { soleil: 'Ensoleillé', lune: 'Ciel clair', eclaircie: 'Éclaircies', 'lune-nuage': 'Quelques nuages', couvert: 'Couvert', brouillard: 'Brouillard', bruine: 'Bruine', pluie: 'Pluie', averses: 'Averses', neige: 'Neige', orage: 'Orage' },
  en: { soleil: 'Sunny', lune: 'Clear sky', eclaircie: 'Sunny spells', 'lune-nuage': 'A few clouds', couvert: 'Overcast', brouillard: 'Fog', bruine: 'Drizzle', pluie: 'Rain', averses: 'Showers', neige: 'Snow', orage: 'Thunderstorm' },
  de: { soleil: 'Sonnig', lune: 'Klarer Himmel', eclaircie: 'Sonnige Abschnitte', 'lune-nuage': 'Ein paar Wolken', couvert: 'Bedeckt', brouillard: 'Nebel', bruine: 'Nieselregen', pluie: 'Regen', averses: 'Schauer', neige: 'Schnee', orage: 'Gewitter' },
  it: { soleil: 'Soleggiato', lune: 'Cielo sereno', eclaircie: 'Schiarite', 'lune-nuage': 'Qualche nuvola', couvert: 'Coperto', brouillard: 'Nebbia', bruine: 'Pioviggine', pluie: 'Pioggia', averses: 'Rovesci', neige: 'Neve', orage: 'Temporale' },
};
const ICONES = { 'soleil': '<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4"/>', 'lune': '<path d="M19.5 14.6A8 8 0 1 1 9.4 4.5a6.4 6.4 0 0 0 10.1 10.1Z"/>', 'eclaircie': '<path d="M7.5 2.5v1.2M2.5 7.5h1.2M4 4l.85.85M11 4l-.85.85"/><path d="M4.9 9.4a3 3 0 0 1 5.2-3.3"/><path d="M9.5 20.5h8a3.5 3.5 0 0 0 .5-6.97 5 5 0 0 0-9.5-.6 3.8 3.8 0 0 0 1 7.57Z"/>', 'lune-nuage': '<path d="M11.6 7.3A4.6 4.6 0 0 1 5.4 12a5.2 5.2 0 1 0 6.2-4.7Z" transform="translate(-1.5 -3.2) scale(.95)"/><path d="M9.5 20.5h8a3.5 3.5 0 0 0 .5-6.97 5 5 0 0 0-9.5-.6 3.8 3.8 0 0 0 1 7.57Z"/>', 'couvert': '<path d="M7 19h10.5a4 4 0 0 0 .5-7.97 6 6 0 0 0-11.5-1.1A4.6 4.6 0 0 0 7 19Z"/>', 'brouillard': '<path d="M7 13h10.5a3.6 3.6 0 0 0 .4-7.17 5.4 5.4 0 0 0-10.4-1 4.1 4.1 0 0 0-.5 8.17Z"/><path d="M4 17h16M7 20.5h10"/>', 'bruine': '<path d="M7 15.5h10.5a4 4 0 0 0 .5-7.97 6 6 0 0 0-11.5-1.1A4.6 4.6 0 0 0 7 15.5Z"/><path d="M8.5 19h.01M12 20.5h.01M15.5 19h.01"/>', 'pluie': '<path d="M7 15.5h10.5a4 4 0 0 0 .5-7.97 6 6 0 0 0-11.5-1.1A4.6 4.6 0 0 0 7 15.5Z"/><path d="M8.5 18.5 7.7 21M12.3 18.5l-.8 2.5M16.1 18.5l-.8 2.5"/>', 'averses': '<path d="M7.5 2.5v1.2M2.5 7.5h1.2M4 4l.85.85M11 4l-.85.85"/><path d="M4.9 9.4a3 3 0 0 1 5.2-3.3"/><path d="M9.5 17h8a3.5 3.5 0 0 0 .5-6.97 5 5 0 0 0-9.5-.6 3.8 3.8 0 0 0 1 7.57Z"/><path d="M11.5 19.5l-.7 2M15.5 19.5l-.7 2"/>', 'neige': '<path d="M7 15.5h10.5a4 4 0 0 0 .5-7.97 6 6 0 0 0-11.5-1.1A4.6 4.6 0 0 0 7 15.5Z"/><path d="M8.5 18.5h.01M12 19h.01M15.5 18.5h.01M10.2 21h.01M13.8 21h.01"/>', 'orage': '<path d="M7 15.5h10.5a4 4 0 0 0 .5-7.97 6 6 0 0 0-11.5-1.1A4.6 4.6 0 0 0 7 15.5Z"/><path d="m12.8 13.5-2.3 4h3l-2.3 4"/>' };
const deg = (v) => (v == null ? '–' : (L === 'fr' ? v.toFixed(1).replace('.', ',') : v.toFixed(1)) + '°');
const donnee = (f) => new URL(`../${f}`, import.meta.url); // racine du site, quelle que soit la profondeur de la page

const eauJson = await fetch(donnee('eau.json'), { cache: 'no-cache' }).then((r) => r.json()).catch(() => null);
const qualites = await fetch(donnee('qualite.json'), { cache: 'no-cache' }).then((r) => r.json()).catch(() => null);
const q = qualiteRecente(qualites?.spots?.[s.id]); // analyse de plus de 30 jours : on n'affiche rien
if (q) { $('qualite').hidden = false; $('qualite').innerHTML = `<i class="q${q.qualite}" aria-hidden="true"></i>${T.eau(T.classes[q.qualite])} (${q.source === 'ge' ? T.ge(String(q.date).replace(/-/g, '.'), q.plage) : `CIPEL, ${q.plage}`})${q.alerte ? ` · ${q.alerte}` : ''}`; }
const eau = (id) => valeurProche(eauJson?.spots?.[id]);
document.querySelectorAll('[data-eau]').forEach((e) => (e.textContent = deg(eau(e.dataset.eau))));
$('eau').textContent = deg(eau(s.id));

try {
  const champs = 'temperature_2m,wind_speed_10m,wind_gusts_10m,wind_direction_10m,weather_code,is_day';
  const m = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${s.lat}&longitude=${s.lon}&current=${champs}&hourly=${champs}&forecast_hours=12&timezone=Europe%2FZurich`, { signal: AbortSignal.timeout(12000) }).then((r) => (r.ok ? r.json() : Promise.reject(r.status)));
  const c = lire(m.current, null, eau(s.id)); if (!c) throw new Error('incomplet');
  c.qualite = q?.qualite;
  $('verdict').textContent = verdict(c, L, Math.floor(Math.random() * 60)).titre;
  const k = ciel(c.code, m.current.is_day !== 0);
  $('air').innerHTML = `${Math.round(c.air)}°<svg class="ciel" viewBox="0 0 24 24" role="img" aria-label="${CIEL[L][k]}">${ICONES[k]}</svg>`;
  $('vent').textContent = Math.round(c.vent);
  $('releve').textContent = T.releve(REGIONS[L][s.region] ?? s.region, String(m.current.time).slice(11, 16));
  $('acts').innerHTML = ACTIVITES.map((a) => {
    const n = a.note(c);
    return `<li><span class="nom">${NOMS[cle(a, c)]}</span><em class="t${n}">${LIB[n]}</em><span class="phrase">${PHRASES[L][cle(a, c)][n]}</span></li>`;
  }).join('');
} catch {
  $('verdict').textContent = T.erreur;
}
