import { test } from 'node:test';
import assert from 'node:assert/strict';
import { associer } from './scripts/qualite.mjs';

const f = (nom, lon, lat, quality, alert = '') => ({ geometry: { coordinates: [lon, lat] }, properties: { name: nom, quality, alert } });
test('association à la plage CIPEL la plus proche, à moins de 1,5 km', () => {
  const spots = [{ id: 'a', lat: 46.2105, lon: 6.1556 }, { id: 'b', lat: 46.40, lon: 6.59 }];
  const r = associer([
    f('Bains des P&acirc;quis &#8211; Genève', 6.1560, 46.2110, 'Eau de qualité excellente à bonne'),
    f('Loin', 6.30, 46.30, 'Eau de mauvaise qualité - ne pas se baigner'),
    f('Évian', 6.5905, 46.4005, 'Eau pouvant être momentanément polluée', 'Plage réouverte'),
  ], spots);
  assert.equal(r.a.qualite, 1);
  assert.match(r.a.plage, /– Genève/);
  assert.deepEqual(r.b, { plage: 'Évian', qualite: 3, alerte: 'Plage réouverte' });
  assert.equal(associer([f('Loin', 6.30, 46.30, 'Eau de qualité excellente à bonne')], spots).a, undefined);
});
