const CACHE_NAME = "inventario-v1";
const FILES = [
  "./",
  "./index.html",
  "./css/style.css",
  "./app.js",
  "./db.js",
  "./manifest.json",
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((c) => c.addAll(FILES)));
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.map((k) => k !== CACHE_NAME && caches.delete(k))),
      ),
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (
    event.request.url.startsWith("http") &&
    !event.request.url.includes("127.0.0.1")
  ) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((res) => {
      return res || fetch(event.request);
    }),
  );
});
