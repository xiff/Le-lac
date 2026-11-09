import { test } from 'node:test';
import assert from 'node:assert/strict';
import { article, liste } from './scripts/blog.mjs';
import { ARTICLES } from './scripts/articles.mjs';

const ld = (html) => JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1])['@graph'];
test('données structurées des articles : complètes et fidèles à la page', () => {
  for (const a of ARTICLES) {
    const html = article(a), g = ld(html), post = g.find((x) => x['@type'] === 'BlogPosting');
    for (const k of ['headline', 'image', 'datePublished', 'dateModified', 'author', 'publisher', 'mainEntityOfPage']) assert.ok(post[k], `${a.slug} : ${k}`);
    assert.ok(post.headline.length <= 110, `${a.slug} : titre trop long`);
    assert.ok(html.includes(`datetime="${a.publie}"`), `${a.slug} : date visible`);
    assert.ok(g.some((x) => x['@type'] === 'BreadcrumbList'), `${a.slug} : fil d’Ariane`);
    assert.ok(a.sources.every(([, u]) => html.includes(`href="${u}"`)), `${a.slug} : sources visibles`);
  }
  assert.equal(ld(liste()).find((x) => x['@type'] === 'Blog').blogPost.length, ARTICLES.length);
});
