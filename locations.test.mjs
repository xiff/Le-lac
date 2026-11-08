import { test } from 'node:test';
import assert from 'node:assert/strict';
import { LOCATIONS, ACTIVITES_LOC, ouvertLoc } from './locations.js';
import { SPOTS } from './spots.js';

test('chaque loueur est relié à une plage, des activités connues et une source', () => {
  for (const l of LOCATIONS) {
    assert.ok(SPOTS.some((s) => s.id === l.spot), `${l.nom} : plage ${l.spot}`);
    assert.ok(l.activites.length && l.activites.every((a) => ACTIVITES_LOC[a]), `${l.nom} : activités`);
    assert.match(l.source, /^https:\/\//, `${l.nom} : source`);
    assert.ok(l.note && l.en, `${l.nom} : textes`);
  }
});
test('saisons, y compris à cheval sur l’année', () => {
  const sauna = LOCATIONS.find((l) => l.nom === 'Bains des Rives');
  assert.equal(ouvertLoc(sauna, new Date(2026, 10, 8)), true);  // novembre
  assert.equal(ouvertLoc(sauna, new Date(2027, 6, 1)), false);  // juillet
  assert.equal(ouvertLoc(LOCATIONS.find((l) => l.nom === 'Pedalino'), new Date(2026, 10, 8)), false);
});
