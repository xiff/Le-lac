// Plages et accès au lac du canton de Genève (geneve-acces.json), d'après la carte « nature et terroir » de l'État de Genève
// (geneveterroir.ch, couche 1143 « Plages et espaces de détente lacustres »). Une fiche sur trois environ a une description ; les autres n'ont que le nom.
// À relancer chaque printemps : NODE_USE_ENV_PROXY=1 node scripts/geneve-acces.mjs
import { writeFile } from 'node:fs/promises';

const j = await fetch('https://www.geneveterroir.ch/api/v1/layers/1143', { headers: { 'user-agent': 'lac-research/1.0 (monlac.ch)' } }).then((r) => r.json());
const out = [];
(function walk(x) {
  if (Array.isArray(x)) return x.forEach(walk);
  if (x && typeof x === 'object') {
    if (x.attributes?.TITLE) {
      const t = (x.attributes.DESCRIPTION ?? '').replace(/<br\s*\/?>|<\/(p|li|div|h[1-6])>/g, '\n').replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/&#039;|&rsquo;/g, '’').replace(/&amp;/g, '&').trim();
      out.push({ nom: x.attributes.TITLE.trim().replace(/'/g, '’'), lat: x.geometry?.y, lon: x.geometry?.x, texte: t.split('\n').map((l) => l.trim().replace(/'/g, '’')).filter(Boolean).filter((l) => !/accessibilit|Règlement|Site du bain|soyez prudent/i.test(l)) });
    }
    Object.values(x).forEach(walk);
  }
})(j);
console.assert(out.length > 20, 'liste trop courte : la couche a changé ?');
await writeFile(new URL('../geneve-acces.json', import.meta.url), `${JSON.stringify(out, null, 1)}\n`);
console.log(out.length, 'accès,', out.filter((a) => a.texte.length).length, 'avec description');
