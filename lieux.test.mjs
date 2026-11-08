import { test } from 'node:test';
import assert from 'node:assert/strict';
import { plusProche, LIEUX } from './lieux.js';

const spots = [{ lat: 46.2105, lon: 6.1556 }, { lat: 46.5161, lon: 6.5953 }, { lat: 46.4614, lon: 6.8419 }];
test('plage la plus proche', () => {
  assert.equal(plusProche(spots, 46.20, 6.14), 0); // Genève
  assert.equal(plusProche(spots, 46.51, 6.63), 1); // Lausanne-Ouchy
  assert.equal(plusProche(spots, 46.43, 6.91), 2); // Montreux
});
test('chaque lieu a les champs requis', () => {
  for (const l of LIEUX) for (const k of ['nom', 'ville', 'zone', 'type', 'note']) assert.ok(l[k], `${l.nom} : ${k}`);
});

import { fermeture } from './lieux.js';
test('saisons des lieux', () => {
  const barje = LIEUX.find((l) => l.nom.includes('Barje'));
  assert.equal(fermeture(barje, new Date(2026, 6, 14)), null);
  assert.equal(fermeture(barje, new Date(2026, 10, 8)), 'Fermé jusqu’en mai');
  assert.equal(fermeture(LIEUX[0], new Date(2026, 10, 8)), null);
  for (const l of LIEUX) if (l.mois) assert.ok(l.mois[0] >= 1 && l.mois[1] <= 12 && l.mois[0] <= l.mois[1], l.nom);
});

test('lieux traduits', () => {
  for (const l of LIEUX) assert.ok(l.en, l.nom);
  assert.equal(fermeture(LIEUX.find((l) => l.nom.includes('Barje')), new Date(2026, 10, 8), 'en'), 'Closed until May');
});
