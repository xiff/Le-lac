// Notes 0–3 par activité à partir des conditions : 0 = non, 1 = bof, 2 = bien, 3 = parfait.
// c = { eau: °C|null, air: °C, vent: km/h, rafales: km/h, dir: degrés, code: code météo WMO }

export const estBise = (c) => c.dir >= 20 && c.dir <= 80 && c.vent >= 15;
const orage = (c) => c.code >= 95;
const pluie = (c) => c.code >= 61;

// Qualité CIPEL (c.qualite) : 4 = ne pas se baigner, 3 = eau pouvant être momentanément polluée.
const eauSaine = (c, n) => (c.qualite === 4 ? 0 : c.qualite === 3 ? Math.min(n, 1) : n);

export function baignade(c) {
  if (orage(c)) return 0;
  const eau = c.eau ?? 15;
  let n = eau >= 22 ? 3 : eau >= 19 ? 2 : eau >= 16 ? 1 : 0;
  if (c.rafales > 40 || (estBise(c) && c.vent > 25)) n = Math.min(n, 1);
  if (pluie(c) || c.air < 15) n = Math.max(0, n - 1);
  return eauSaine(c, n);
}

export function paddle(c) {
  if (orage(c)) return 0;
  let n = c.rafales <= 12 ? 3 : c.rafales <= 20 ? 2 : c.rafales <= 28 ? 1 : 0;
  if (pluie(c) || c.air < 8) n = Math.max(0, n - 1);
  return n;
}

export function voile(c) {
  if (orage(c) || c.rafales > 55) return 0;
  if (c.vent >= 18 && c.vent <= 35) return 3;
  if (c.vent >= 12 && c.vent <= 42) return 2;
  return c.vent >= 8 ? 1 : 0;
}

// Les « nageurs d'hiver » : l'eau froide est le but, on regarde surtout le vent.
export function hiver(c) {
  if (orage(c) || c.eau == null || c.eau >= 15) return 0; // eau inconnue : on ne promet rien aux braves
  return eauSaine(c, c.rafales <= 20 ? 3 : c.rafales <= 35 ? 2 : 1);
}

// Une seule case pour l'eau : d'octobre à mai, sous 15°, la baignade devient un bain d'hiver.
// c.mois (1-12) peut être fourni ; sinon le mois en cours.
export const moisHiver = (m) => m >= 10 || m <= 5;
export const estHiver = (c) => c.eau != null && c.eau < 15 && moisHiver(c.mois ?? new Date().getMonth() + 1);
// Clé de texte d'une activité (nom, phrases) : « hiver » pour la baignade en mode bain d'hiver.
export const cle = (a, c) => (a.id === 'baignade' && estHiver(c) ? 'hiver' : a.id);

export const ACTIVITES = [
  { id: 'baignade', note: (c) => (estHiver(c) ? hiver(c) : baignade(c)) },
  { id: 'paddle', note: paddle },
  { id: 'voile', note: voile },
];

// Phrases par activité et par note, avec un peu de caractère.
export const PHRASES = {
  fr: {
    baignade: ['Même les cygnes hésitent.', 'Pour les courageux.', 'Ça se baigne sans crier.', 'L’eau est bonne, promis.'],
    paddle: ['Reste au bistrot.', 'Ça secoue un peu.', 'Quelques vaguelettes.', 'Lac d’huile.'],
    voile: ['Pas un souffle, ou bien trop.', 'Petit temps.', 'De quoi s’amuser.', 'Ça souffle juste comme il faut.'],
    hiver: ['L’eau est trop douce, c’est de la triche.', 'Ça mord.', 'Gelé mais faisable.', 'Idéal pour se geler avec style.'],
  },
  en: {
    baignade: ['Even the swans are hesitating.', 'For the brave.', 'Swimmable without screaming.', 'The water’s lovely, promise.'],
    paddle: ['Stay at the bistro.', 'A bit choppy.', 'A few ripples.', 'Flat as a mirror.'],
    voile: ['Not a breath, or way too much.', 'Light airs.', 'Enough to have fun.', 'Just the right breeze.'],
    hiver: ['Water’s too mild, that’s cheating.', 'It bites.', 'Freezing but doable.', 'Perfect for freezing in style.'],
  },
};

// La phrase du jour en haut de l'écran.
// Titres du verdict : plusieurs variantes par situation, tirage différent à chaque affichage.
// a(e) = « à 12° » (ou rien si l'eau est inconnue).
const a = (e) => (e == null ? '' : ` à ${e}°`), at = (e) => (e == null ? '' : ` at ${e}°`);
const TITRES = {
  fr: {
    orage: [() => 'Orage sur le lac. On rentre.', () => 'Ça gronde. Tout le monde au sec.', () => 'Orage : le lac attendra, toi tu rentres.'],
    bise: [() => 'La bise est là. Accroche ton bonnet.', () => 'Bise en vue : le lac fait des vagues.', () => 'La bise souffle. Journée chocolat chaud.'],
    terrasse: [() => 'Journée terrasse plutôt que plouf.', () => 'Le lac est grognon. Va plutôt voir les terrasses.', () => 'Pas le jour pour l’eau. Un verre au bord, plutôt ?'],
    canicule: [(e) => `Canicule. Le lac est ta clim${e == null ? '' : `, eau à ${e}°`}.`, (e) => `Trop chaud pour réfléchir. File au lac${e == null ? '' : `, eau à ${e}°`}.`, (e) => `Canicule : tout le monde à l’eau${e == null ? '' : `, elle est à ${e}°`}.`],
    chaude: [(e) => `Eau à ${e}°. C’est presque un bain.`, (e) => `Eau à ${e}°. Même les frileux y vont.`, (e) => `Eau à ${e}°. Le Léman se prend pour la Méditerranée.`],
    gel: [(e) => `Il gèle. Eau${a(e)} : rendez-vous des braves.`, (e) => `Il gèle dehors. L’eau${a(e)} paraît presque chaude.`, (e) => `Il gèle. Eau${a(e)}. Le sauna juste après, c’est permis.`],
    baignade: [(e) => `Plouf : l’eau est${e == null ? ' bonne' : ` à ${e}°`}.`, (e) => `Eau${a(e)}. Le maillot, c’est maintenant.`, (e) => `Eau${a(e)}. Le lac t’attend, la serviette aussi.`, (e) => `Eau${a(e)}. On se baigne, on verra le reste après.`],
    paddle: [() => 'Lac d’huile. Sors le paddle.', () => 'Pas une ride sur l’eau. La planche t’attend.', () => 'Lac plat comme une crêpe. Paddle obligatoire.', () => 'Calme plat : idéal pour voir les cygnes de près.'],
    voile: [() => 'Ça souffle. Cap sur le large.', () => 'Du vent comme on l’aime. Hisse la voile.', () => 'Le lac moutonne juste ce qu’il faut. À la barre !', () => 'Beau vent : le Léman joue à l’océan.'],
    hiver: [(e) => `Eau${a(e)}. Parfait pour les braves.`, (e) => `Eau${a(e)}. Bonnet obligatoire, courage aussi.`, (e) => `Eau${a(e)}. Trois minutes et tu deviens une légende.`, (e) => `Eau${a(e)}. Les cygnes, eux, n’hésitent pas.`, (e) => `Eau${a(e)}. Ça pique, ça réveille, ça se raconte.`],
  },
  en: {
    orage: [() => 'Storm on the lake. Head home.', () => 'Thunder rolling. Everybody stay dry.', () => 'Storm: the lake can wait, you head home.'],
    bise: [() => 'The bise is here. Hold on to your hat.', () => 'Bise blowing: the lake is making waves.', () => 'The bise is out. Hot chocolate day.'],
    terrasse: [() => 'More of a terrace day than a splash day.', () => 'The lake is grumpy. Try a terrace instead.', () => 'Not a water day. A drink by the lake, maybe?'],
    canicule: [(e) => `Heatwave. The lake is your AC${e == null ? '' : `, water at ${e}°`}.`, (e) => `Too hot to think. Get to the lake${e == null ? '' : `, water at ${e}°`}.`, (e) => `Heatwave: everybody in${e == null ? '' : `, the water is ${e}°`}.`],
    chaude: [(e) => `Water at ${e}°. Practically a bath.`, (e) => `Water at ${e}°. Even the chilly types go in.`, (e) => `Water at ${e}°. Lake Geneva thinks it’s the Med.`],
    gel: [(e) => `It’s freezing. Water${at(e)}: the brave meet here.`, (e) => `Freezing outside. The water${at(e)} feels almost warm.`, (e) => `It’s freezing. Water${at(e)}. Sauna right after is allowed.`],
    baignade: [(e) => `Splash: the water is${e == null ? ' nice' : ` ${e}°`}.`, (e) => `Water${at(e)}. Swimsuit time.`, (e) => `Water${at(e)}. The lake is waiting, so is your towel.`, (e) => `Water${at(e)}. Swim first, think later.`],
    paddle: [() => 'Flat as a mirror. Grab the paddle.', () => 'Not a ripple. Your board is waiting.', () => 'Flat as a pancake. Paddle compulsory.', () => 'Dead calm: perfect for a close look at the swans.'],
    voile: [() => 'It’s blowing. Head out to open water.', () => 'Just the wind we like. Hoist the sail.', () => 'Whitecaps, just enough. Take the helm!', () => 'Great wind: Lake Geneva plays ocean.'],
    hiver: [(e) => `Water${at(e)}. Perfect for the brave.`, (e) => `Water${at(e)}. Hat compulsory, courage too.`, (e) => `Water${at(e)}. Three minutes and you’re a legend.`, (e) => `Water${at(e)}. The swans don’t hesitate.`, (e) => `Water${at(e)}. It stings, it wakes you up, it makes a story.`],
  },
};

// tirage : n'importe quel entier ; chaque valeur donne une variante (0 = la première).
export function verdict(c, langue = 'fr', tirage = 0) {
  const T = TITRES[langue] ?? TITRES.fr;
  const e = c.eau == null ? null : Math.round(c.eau);
  const t = (k) => { const v = T[k]; return v[((tirage % v.length) + v.length) % v.length](e); };
  if (c.code >= 95) return { titre: t('orage'), act: null };
  const notes = ACTIVITES.map((a) => ({ a, n: a.note(c) })).sort((x, y) => y.n - x.n);
  const top = notes[0];
  if (estBise(c) && top.a.id !== 'voile') return { titre: t('bise'), act: null };
  if (top.n < 2) return { titre: t('terrasse'), act: null, sortir: true };
  const k = cle(top.a, c);
  if (k === 'baignade' && c.air >= 30) return { titre: t('canicule'), act: 'baignade' };
  if (k === 'baignade' && c.eau >= 25) return { titre: t('chaude'), act: 'baignade' };
  if (k === 'hiver' && c.air <= 0) return { titre: t('gel'), act: 'baignade' };
  return { titre: t(k), act: top.a.id };
}

// Saison de bain d'hiver : de septembre à août, ex. « 2026-2027 ».
export const saison = (d) => { const a = d.getMonth() >= 8 ? d.getFullYear() : d.getFullYear() - 1; return `${a}-${a + 1}`; };

// Lecture défensive d'une réponse Open-Meteo (o = current, ou hourly avec l'index i).
// Renvoie null si une valeur indispensable manque : mieux vaut « pas de données » qu'un NaN.
export function lire(o, i, eau) {
  const v = (k) => { const x = i == null ? o?.[k] : o?.[k]?.[i]; return x == null || x === '' ? NaN : Number(x); };
  const c = { eau: Number.isFinite(eau) ? eau : null, air: v('temperature_2m'), vent: v('wind_speed_10m'), rafales: v('wind_gusts_10m'), dir: v('wind_direction_10m'), code: v('weather_code') };
  if (![c.air, c.vent].every(Number.isFinite)) return null;
  if (!Number.isFinite(c.rafales)) c.rafales = c.vent * 1.5; // rafales inconnues : estimation prudente plutôt que 0
  if (!Number.isFinite(c.dir)) c.dir = 0;
  if (!Number.isFinite(c.code)) c.code = 0;
  return c;
}

// Qualité de l'eau affichable : seulement une analyse datée de moins de 30 jours (aujourd'hui les analyses
// genevoises). Le classement annuel de la CIPEL ne dit rien de l'eau du jour : on ne l'affiche pas.
export function qualiteRecente(q, maintenant = Date.now()) {
  if (!q?.date) return null;
  const [j, m, a] = String(q.date).split('-').map(Number);
  const t = Date.UTC(a, m - 1, j);
  return Number.isFinite(t) && maintenant - t >= 0 && maintenant - t <= 30 * 86400e3 ? q : null;
}
