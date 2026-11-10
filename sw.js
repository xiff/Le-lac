// Réseau d'abord pour tout (interface comprise), cache seulement hors ligne.
// Avant : interface servie depuis le cache et mise à jour fichier par fichier, d'où des mélanges
// ancienne/nouvelle version (ex. index.html neuf + textes.js ancien) qui cassaient les boutons.
const CACHE = 'lac-v54';
const COQUILLE = ['./', 'index.html', 'score.js', 'lieux.js', 'spots.js', 'textes.js', 'locations.js', 'manifest.webmanifest', 'icon.svg',
  'fonts/young-serif-latin-400-normal.woff2', 'fonts/onest-latin-wght-normal.woff2'];

self.addEventListener('install', (e) => { e.waitUntil(caches.open(CACHE).then((c) => c.addAll(COQUILLE.map((f) => new Request(f, { cache: 'reload' }))))); self.skipWaiting(); });
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  const memeSite = new URL(e.request.url).origin === location.origin;
  e.respondWith(caches.open(CACHE).then((cache) =>
    fetch(memeSite ? new Request(e.request, { cache: 'no-cache' }) : e.request)
      .then((r) => { if (r.ok) cache.put(e.request, r.clone()); return r; })
      .catch(async () => (await cache.match(e.request, { ignoreSearch: true })) || Response.error())));
});
