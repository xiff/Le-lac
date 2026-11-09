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
  assert.match(h, /href="\.\.\/\.\.\/\?lang=fr&plage=lausanne-vidy"/);
});

test('page de plage en anglais : chemins un niveau plus bas, hreflang réciproques', () => {
  const vidy = SPOTS.find((s) => s.id === 'lausanne-vidy'), h = page(vidy, 'en');
  assert.match(h, /<html lang="en">/);
  assert.match(h, /<title>Water temperature at Lausanne – Vidy today · Lake Geneva/);
  assert.match(h, /rel="canonical" href="https:\/\/xiff\.github\.io\/Le-lac\/plage\/lausanne-vidy\/en\/"/);
  assert.match(h, /hreflang="fr" href="https:\/\/xiff\.github\.io\/Le-lac\/plage\/lausanne-vidy\/"/);
  assert.match(h, /href="\.\.\/\.\.\/lausanne-ouchy\/en\/"/);
  assert.match(h, /href="\.\.\/\.\.\/\.\.\/\?lang=en&plage=lausanne-vidy"/);
  assert.match(h, /src="\.\.\/\.\.\/plage\.js"/);
  assert.match(page(vidy), /hreflang="en" href="https:\/\/xiff\.github\.io\/Le-lac\/plage\/lausanne-vidy\/en\/"/);
});
