// Notes 0–3 par activité à partir des conditions : 0 = non, 1 = bof, 2 = bien, 3 = parfait.
// c = { eau: °C|null, air: °C, vent: km/h, rafales: km/h, dir: degrés, code: code météo WMO }

export const estBise = (c) => c.dir >= 20 && c.dir <= 80 && c.vent >= 15;
const orage = (c) => c.code >= 95;
const pluie = (c) => c.code >= 61;

export function baignade(c) {
  if (orage(c)) return 0;
  const eau = c.eau ?? 15;
  let n = eau >= 22 ? 3 : eau >= 19 ? 2 : eau >= 16 ? 1 : 0;
  if (c.rafales > 40 || (estBise(c) && c.vent > 25)) n = Math.min(n, 1);
  if (pluie(c) || c.air < 15) n = Math.max(0, n - 1);
  return n;
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
  if (orage(c) || (c.eau ?? 10) > 14) return 0;
  return c.rafales <= 20 ? 3 : c.rafales <= 35 ? 2 : 1;
}

export const ACTIVITES = [
  { id: 'baignade', nom: 'Baignade', emoji: '🏊', note: baignade },
  { id: 'paddle', nom: 'Paddle', emoji: '🏄', note: paddle },
  { id: 'voile', nom: 'Voile / wing', emoji: '⛵', note: voile },
  { id: 'hiver', nom: 'Bain d’hiver', emoji: '🥶', note: hiver },
];

// Meilleur créneau d'au moins 2 h consécutives où l'activité est notée ≥ 2.
export function meilleurCreneau(heures, noteFn) {
  let best = null, debut = null;
  heures.forEach((h, i) => {
    const ok = noteFn(h) >= 2;
    if (ok && debut === null) debut = i;
    if ((!ok || i === heures.length - 1) && debut !== null) {
      const fin = ok ? i : i - 1;
      if (fin - debut >= 1 && (!best || fin - debut > best.fin - best.debut)) best = { debut, fin };
      debut = null;
    }
  });
  return best && { de: heures[best.debut].heure, a: heures[best.fin].heure };
}

// Phrases par activité et par note, avec un peu de caractère.
export const PHRASES = {
  baignade: ['Même les cygnes hésitent.', 'Pour les courageux.', 'Ça se baigne sans crier.', 'L’eau est bonne, promis.'],
  paddle: ['Reste au bistrot.', 'Ça secoue un peu.', 'Quelques vaguelettes.', 'Lac d’huile.'],
  voile: ['Pas un souffle, ou bien trop.', 'Petit temps.', 'De quoi s’amuser.', 'Ça souffle juste comme il faut.'],
  hiver: ['L’eau est trop douce, c’est de la triche.', 'Ça mord.', 'Gelé mais faisable.', 'Idéal pour se geler avec style.'],
};

// La phrase du jour en haut de l'écran.
export function verdict(c) {
  if (c.code >= 95) return { titre: 'Orage sur le lac. On rentre.', act: null };
  const notes = ACTIVITES.map((a) => ({ a, n: a.note(c) })).sort((x, y) => y.n - x.n);
  const top = notes[0];
  if (estBise(c) && top.a.id !== 'voile') return { titre: 'La bise est là. Accroche ton bonnet.', act: null };
  if (top.n < 2) return { titre: 'Journée terrasse plutôt que plouf.', act: null, sortir: true };
  const eau = c.eau == null ? '' : ` à ${Math.round(c.eau)}°`;
  const titres = {
    baignade: `Plouf : l’eau est${eau || ' bonne'}.`,
    paddle: 'Lac d’huile. Sors le paddle.',
    voile: 'Ça souffle. Cap sur le large.',
    hiver: `Eau${eau}. Parfait pour les braves.`,
  };
  return { titre: titres[top.a.id], act: top.a.id };
}

// Saison de bain d'hiver : de septembre à août, ex. « 2026-2027 ».
export const saison = (d) => { const a = d.getMonth() >= 8 ? d.getFullYear() : d.getFullYear() - 1; return `${a}-${a + 1}`; };
