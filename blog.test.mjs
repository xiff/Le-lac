import { test } from 'node:test';
import assert from 'node:assert/strict';
import { article, liste } from './scripts/blog.mjs';
import { ARTICLES } from './scripts/articles.mjs';

const ld = (html) => JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1])['@graph'];
test('données structurées des articles (FR et EN) : complètes et fidèles à la page', () => {
  for (const a of ARTICLES) for (const L of ['fr', 'en']) {
    const html = article(a, L), g = ld(html), post = g.find((x) => x['@type'] === 'BlogPosting'), id = `${a.slug} ${L}`;
    for (const k of ['headline', 'image', 'datePublished', 'dateModified', 'author', 'publisher', 'mainEntityOfPage']) assert.ok(post[k], `${id} : ${k}`);
    assert.ok(post.headline.length <= 110, `${id} : titre trop long`);
    assert.ok(html.includes(`datetime="${a.publie}"`), `${id} : date visible`);
    assert.ok(g.some((x) => x['@type'] === 'BreadcrumbList'), `${id} : fil d’Ariane`);
    assert.ok(a.sources.every(([, u]) => html.includes(`href="${u}"`)), `${id} : sources visibles`);
    assert.doesNotMatch(html, /\{(plage|plages|app|blog)[:}]/, `${id} : lien non résolu`);
    assert.match(html, new RegExp(`<html lang="${L}">`));
    assert.ok(html.includes('hreflang="fr"') && html.includes('hreflang="en"'), `${id} : hreflang`);
  }
  for (const L of ['fr', 'en']) assert.equal(ld(liste(L)).find((x) => x['@type'] === 'Blog').blogPost.length, ARTICLES.length);
});

test('images des articles et de la liste : chaque fichier cité (WebP et JPEG de secours) existe', async () => {
  const { existsSync } = await import('node:fs');
  for (const a of ARTICLES) for (const html of [article(a, 'fr'), liste('fr')]) {
    const chemins = [...html.matchAll(/(?:src|srcset)="([^"]+)"/g)].flatMap(([, v]) => v.split(',').map((x) => x.trim().split(' ')[0])).filter((u) => /\.(jpg|webp)$/.test(u));
    for (const u of chemins) assert.ok(existsSync(u.replace(/^(\.\.\/)+/, '')), `${a.slug} : ${u} manquant`);
  }
  assert.match(article(ARTICLES[0], 'fr'), /<source type="image\/webp"/);
});

test('publication programmée : aucun article daté d’un jour futur n’est publié', async () => {
  const { AUJOURDHUI } = await import('./scripts/articles.mjs');
  assert.ok(ARTICLES.every((a) => a.publie <= AUJOURDHUI));
});

// Une miniature générée depuis une ancienne image du même nom (photo remplacée par une illustration) n'est jamais refaite : on la détecte ici.
test('miniatures fidèles à leur image source (pas de reste d’une ancienne image du même nom)', async () => {
  const { execFileSync } = await import('node:child_process');
  const { existsSync } = await import('node:fs');
  const px = (f) => execFileSync('convert', [f, '-resize', '16x9!', '-depth', '8', 'rgb:-']);
  for (const image of new Set(ARTICLES.flatMap((a) => [a.image, a.seconde?.image].filter(Boolean)))) {
    const src = px(image);
    for (const ext of ['jpg', 'webp']) {
      const m = `blog/img/min/${image.split('/').pop().replace('.jpg', `-640.${ext}`)}`;
      if (!existsSync(m)) continue;
      const d = px(m).reduce((s, v, i) => s + Math.abs(v - src[i]), 0) / src.length;
      assert.ok(d < 20, `${m} ne correspond pas à ${image} (écart ${d.toFixed(0)}) : supprimer ses miniatures et relancer node scripts/miniatures.mjs`);
    }
  }
});
