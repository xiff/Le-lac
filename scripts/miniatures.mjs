// Miniatures des images de tête pour la liste du blog : blog/img/min/<nom>-640.jpg (grille) et -1000.jpg (article à la une).
// Usage : node scripts/miniatures.mjs   (ImageMagick `convert` requis ; les miniatures sont versionnées)
import { execFileSync } from 'node:child_process';
import { mkdirSync, existsSync } from 'node:fs';
import { basename } from 'node:path';
import { ARTICLES } from './articles.mjs';

mkdirSync(new URL('../blog/img/min/', import.meta.url), { recursive: true });
for (const a of ARTICLES) for (const w of [640, 1000, 1200]) {
  const sortie = new URL(`../blog/img/min/${basename(a.image, '.jpg')}-${w}.jpg`, import.meta.url).pathname;
  if (!existsSync(sortie)) execFileSync('convert', [new URL(`../${a.image}`, import.meta.url).pathname, '-resize', `${w}x`, '-strip', '-quality', '76', sortie]);
}
