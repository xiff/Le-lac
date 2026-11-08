import { test } from 'node:test';
import assert from 'node:assert/strict';
import { baignade, paddle, voile, hiver, estBise, meilleurCreneau } from './score.js';

const calme = { eau: 23, air: 28, vent: 5, rafales: 8, dir: 200, code: 0 };

test('été calme : baignade et paddle parfaits, pas de voile', () => {
  assert.equal(baignade(calme), 3);
  assert.equal(paddle(calme), 3);
  assert.equal(voile(calme), 0);
  assert.equal(hiver(calme), 0);
});

test('bise forte : paddle non, voile parfait', () => {
  const bise = { ...calme, vent: 30, rafales: 45, dir: 45 };
  assert.ok(estBise(bise));
  assert.equal(paddle(bise), 0);
  assert.equal(voile(bise), 3);
  assert.equal(baignade(bise), 1);
});

test('orage : tout à zéro', () => {
  const orage = { ...calme, code: 95 };
  for (const f of [baignade, paddle, voile, hiver]) assert.equal(f(orage), 0);
});

test('hiver calme : bain d’hiver parfait', () => {
  assert.equal(hiver({ eau: 8, air: 3, vent: 6, rafales: 10, dir: 200, code: 3 }), 3);
});

test('meilleur créneau = plus longue suite ≥ 2', () => {
  const h = (heure, rafales) => ({ ...calme, heure, rafales });
  const heures = [h('08h', 30), h('09h', 10), h('10h', 10), h('11h', 30), h('12h', 5), h('13h', 5), h('14h', 5)];
  assert.deepEqual(meilleurCreneau(heures, paddle), { de: '12h', a: '14h' });
  assert.equal(meilleurCreneau([h('08h', 40)], paddle), null);
});

import { verdict } from './score.js';
test('verdict : orage, bise, paddle, terrasse', () => {
  assert.match(verdict({ ...calme, code: 96 }).titre, /Orage/);
  assert.match(verdict({ ...calme, eau: 16, vent: 45, rafales: 60, dir: 45 }).titre, /bise/);
  assert.equal(verdict({ ...calme, eau: 16, vent: 22, rafales: 30, dir: 45 }).act, 'voile');
  assert.equal(verdict(calme).act, 'baignade');
  assert.equal(verdict({ ...calme, eau: 15, air: 12, vent: 4, rafales: 26, code: 63 }).sortir, true);
});

import { saison } from './score.js';
test('saison de bain d’hiver', () => {
  assert.equal(saison(new Date(2026, 10, 7)), '2026-2027');
  assert.equal(saison(new Date(2027, 1, 14)), '2026-2027');
  assert.equal(saison(new Date(2027, 8, 1)), '2027-2028');
});

import { lire, hiver as hiverNote } from './score.js';
test('lecture défensive des données météo', () => {
  const cur = { temperature_2m: 12, wind_speed_10m: 8, wind_gusts_10m: null, wind_direction_10m: 230, weather_code: 3 };
  assert.equal(lire(cur, null, 9).rafales, 12); // rafales estimées, pas 0
  assert.equal(lire({ ...cur, temperature_2m: undefined }, null, 9), null);
  assert.equal(lire({ temperature_2m: [1, 2], wind_speed_10m: [3] }, 1, null), null); // heure tronquée
  assert.equal(lire({ ...cur, temperature_2m: '12.5' }, null, NaN).air, 12.5);
  assert.equal(lire(cur, null, NaN).eau, null);
  assert.equal(hiverNote({ ...lire(cur, null, null) }), 0); // eau inconnue : pas de promesse
});

test('verdict : canicule, eau très chaude, gel', () => {
  assert.match(verdict({ ...calme, air: 33 }).titre, /Canicule/);
  assert.match(verdict({ ...calme, eau: 26 }).titre, /presque un bain/);
  assert.match(verdict({ eau: 7, air: -3, vent: 5, rafales: 9, dir: 200, code: 3 }).titre, /gèle/);
});

import { PHRASES as PH } from './score.js';
test('verdict et phrases en anglais', () => {
  assert.match(verdict(calme, 'en').titre, /Splash: the water is 23°/);
  assert.match(verdict({ ...calme, code: 96 }, 'en').titre, /Storm/);
  for (const id of Object.keys(PH.fr)) assert.equal(PH.en[id].length, PH.fr[id].length);
});
