// Miniatures des images d'articles : blog/img/min/<nom>-640|1000|1200.jpg et .webp, plus <nom>-1600.webp.
// Usage : node scripts/miniatures.mjs   (ImageMagick `convert` requis ; les miniatures sont versionnées)
import { execFileSync } from 'node:child_process';
import { mkdirSync, existsSync } from 'node:fs';
import { basename } from 'node:path';
import { ARTICLES } from './articles.mjs';

mkdirSync(new URL('../blog/img/min/', import.meta.url), { recursive: true });
// JPEG (secours) et WebP (servi en premier, environ 40 à 65 % plus léger) ; 1600 = taille d'origine, en WebP seulement.
const images = new Set(ARTICLES.flatMap((a) => [a.image, a.seconde?.image].filter(Boolean)));
for (const image of images) for (const w of [640, 1000, 1200, 1600]) for (const ext of w === 1600 ? ['webp'] : ['jpg', 'webp']) {
  const sortie = new URL(`../blog/img/min/${basename(image, '.jpg')}-${w}.${ext}`, import.meta.url).pathname;
  if (!existsSync(sortie)) execFileSync('convert', [new URL(`../${image}`, import.meta.url).pathname, '-resize', `${w}x`, '-strip', '-quality', ext === 'webp' ? '78' : '76', sortie]);
}
