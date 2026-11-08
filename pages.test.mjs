import { test } from 'node:test';
import assert from 'node:assert/strict';
import { page } from './scripts/pages.mjs';
import { SPOTS } from './spots.js';

test('page de plage : titre, adresse canonique, voisines et données structurées', () => {
  const vidy = SPOTS.find((s) => s.id === 'lausanne-vidy'), h = page(vidy);
  assert.match(h, /<title>Température de l’eau à Lausanne – Vidy aujourd’hui/);
  assert.match(h, /rel="canonical" href="https:\/\/xiff\.github\.io\/Le-lac\/plage\/lausanne-vidy\/"/);
  assert.match(h, /href="\.\.\/lausanne-ouchy\/"/); // la plus proche figure parmi les voisines
  assert.equal((h.match(/data-eau=/g) || []).length, 4);
  assert.match(h, /"@type":"Beach"/);
  assert.match(h, /href="\.\.\/\.\.\/\?plage=lausanne-vidy"/);
});
