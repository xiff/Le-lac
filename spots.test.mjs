import { test } from 'node:test';
import assert from 'node:assert/strict';
import { SPOTS, valeurProche } from './spots.js';

test('plages : identifiants uniques et coordonnées sur le Léman', () => {
  assert.equal(new Set(SPOTS.map((s) => s.id)).size, SPOTS.length);
  for (const s of SPOTS) assert.ok(s.lat > 46.19 && s.lat < 46.53 && s.lon > 6.14 && s.lon < 6.95, s.id);
});
test('valeur la plus proche, ignorée si trop vieille', () => {
  const serie = { t: ['2026-11-08T06:00:00+00:00', '2026-11-08T09:00:00+00:00'], v: [9.4, 9.6] };
  assert.equal(valeurProche(serie, Date.parse('2026-11-08T08:10:00Z')), 9.6);
  assert.equal(valeurProche(serie, Date.parse('2026-11-08T22:00:00Z')), null);
  assert.equal(valeurProche({ t: ['2026-11-08T06:00:00Z'], v: [null] }, Date.parse('2026-11-08T06:00:00Z')), null);
  assert.equal(valeurProche(undefined), null);
});
