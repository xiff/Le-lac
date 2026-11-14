import { test } from 'node:test';
import assert from 'node:assert/strict';
import { fusionner, SAISON } from './journal.js';

const a = { d: '2026-11-10T08:00:00Z', plage: 'Vidy', eau: 12 }, b = { d: '2026-11-12T08:00:00Z', plage: 'Pâquis', eau: 11 };

test('fusionner : réimporter le même fichier ne crée pas de doublon', () => {
  const une = fusionner([a], [a, b]);
  assert.deepEqual(une, [a, b]);
  assert.deepEqual(fusionner(une, [a, b]), une);
});
test('fusionner : trié par date, doublons dans le fichier ignorés', () => {
  assert.deepEqual(fusionner([b], [a, a]).map((x) => x.plage), ['Vidy', 'Pâquis']);
});
test('fusionner : ignore ce qui n’est pas un bain et nettoie les champs', () => {
  const r = fusionner([], [null, 3, 'x', { d: 5, plage: 7, eau: '9' }]);
  assert.deepEqual(r, [{ d: null, plage: undefined, eau: null }]);
  assert.deepEqual(fusionner([a], 'pas une liste'), [a]);
});
test('SAISON : seules les clés « 2026-2027 » sont acceptées', () => {
  assert.ok(SAISON.test('2026-2027'));
  for (const k of ['__proto__', '2026', 'x-2027', '2026-2027-2']) assert.ok(!SAISON.test(k));
});
