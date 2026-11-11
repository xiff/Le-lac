import { test } from 'node:test';
import assert from 'node:assert/strict';
import { SPOTS, valeurProche, LACS, lacDe } from './spots.js';

// Cadre [sud, ouest, nord, est] de chaque lac.
const CADRES = { leman: [46.19, 6.14, 46.53, 6.95], neuchatel: [46.74, 6.58, 47.06, 7.10], bienne: [47.03, 7.05, 47.17, 7.30],
  morat: [46.88, 7.00, 46.97, 7.14], gruyere: [46.60, 7.00, 46.79, 7.16], sion: [46.20, 7.28, 46.26, 7.42],
  lugano: [45.90, 8.83, 46.06, 9.10], majeur: [46.08, 8.58, 46.20, 8.92],
  joux: [46.58, 6.18, 46.70, 6.34], bret: [46.49, 6.75, 46.53, 6.80] };
test('plages : identifiants uniques, lac connu, coordonnées dans le lac', () => {
  assert.equal(new Set(SPOTS.map((s) => s.id)).size, SPOTS.length);
  for (const s of SPOTS) {
    const [a, b, c, d] = CADRES[lacDe(s)];
    assert.ok(LACS[lacDe(s)] && s.lat > a && s.lat < c && s.lon > b && s.lon < d, s.id);
    if (s.lac) assert.equal(s.region, LACS[s.lac].nom, s.id);
  }
});
test('valeur la plus proche, ignorée si trop vieille', () => {
  const serie = { t: ['2026-11-08T06:00:00+00:00', '2026-11-08T09:00:00+00:00'], v: [9.4, 9.6] };
  assert.equal(valeurProche(serie, Date.parse('2026-11-08T08:10:00Z')), 9.6);
  assert.equal(valeurProche(serie, Date.parse('2026-11-08T22:00:00Z')), null);
  assert.equal(valeurProche({ t: ['2026-11-08T06:00:00Z'], v: [null] }, Date.parse('2026-11-08T06:00:00Z')), null);
  assert.equal(valeurProche(undefined), null);
});

import { TOUR, projeter } from './spots.js';
test('tour du lac : chaque plage une fois, projection dans le cadre', () => {
  const leman = SPOTS.filter((s) => lacDe(s) === 'leman');
  assert.deepEqual([...TOUR].sort(), leman.map((s) => s.id).sort());
  const p = projeter(400);
  for (const s of leman) { const [x, y] = p.xy(s); assert.ok(x > 0 && x < 400 && y > 0 && y < p.hauteur, s.id); }
});
