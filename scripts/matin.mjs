// Température du matin (6 h UTC) tirée d'eau-jour.json, figée une fois par jour par scripts/eau-jour.mjs : écrite dans le HTML
// des pages de plage, de leur liste et des articles par lac, pour les moteurs qui n'exécutent pas le script. Dite « au matin » et datée.
// Sans fichier, trop ancien ou sans valeur (valeurProche refuse un écart de plus de 6 h), les fonctions renvoient null : rien d'écrit plutôt qu'un chiffre périmé.
import { readFileSync } from 'node:fs';
import { valeurProche } from '../spots.js';

const EAU = (() => { try { return JSON.parse(readFileSync(new URL('../eau-jour.json', import.meta.url), 'utf8')); } catch { return null; } })();
const MATIN = new Date(); MATIN.setUTCHours(6, 0, 0, 0);
const LOCALE = { fr: 'fr-CH', en: 'en-GB', de: 'de-CH', it: 'it-CH' };
export const valeurMatin = (id) => valeurProche(EAU?.spots?.[id], MATIN.getTime());
export const dateMatin = (L) => MATIN.toLocaleDateString(LOCALE[L], { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
export const degMatin = (v, L) => (L === 'fr' || L === 'it' ? v.toFixed(1).replace('.', ',') : v.toFixed(1)) + ' °C';
