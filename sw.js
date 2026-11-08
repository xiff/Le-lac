// Hors ligne : l'interface depuis le cache, la météo du réseau d'abord puis la dernière connue.
const CACHE = 'lac-v21';
const COQUILLE = ['./', 'index.html', 'score.js', 'lieux.js', 'spots.js', 'textes.js', 'locations.js', 'manifest.webmanifest', 'icon.svg',
  'fonts/young-serif-latin-400-normal.woff2', 'fonts/onest-latin-wght-normal.woff2'];

self.addEventListener('install', (e) => { e.waitUntil(caches.open(CACHE).then((c) => c.addAll(COQUILLE))); self.skipWaiting(); });
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  const api = url.origin !== location.origin || /\/(eau|qualite)\.json$/.test(url.pathname); // données fraîches d'abord
  e.respondWith(caches.open(CACHE).then(async (cache) => {
    const enCache = await cache.match(e.request, { ignoreSearch: !api });
    const reseau = fetch(e.request).then((r) => { if (r.ok) cache.put(e.request, r.clone()); return r; });
    if (api) return reseau.catch(() => enCache || Response.error());
    reseau.catch(() => {}); // l'interface se met à jour en arrière-plan
    return enCache || reseau;
  }));
});
