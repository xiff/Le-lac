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
