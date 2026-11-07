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
