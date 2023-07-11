const cacheName = "apv-v6";

// cached files
const assets = [
  "/",
  "/index.html",
  "/error.html",
  "/css/bootstrap.css",
  "/css/styles.css",
  "/js/app.js",
  "/js/apv.js",
]

// Instalar el service worker
self.addEventListener("install", (e) => {

  e.waitUntil(
    caches.open(cacheName)
      .then(cache => {
        cache.addAll(assets)
      })
  )
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => {
        return Promise.all(
          keys.filter(key => key !== cacheName)
            .map(key => caches.delete(key))
        )
      })
  )
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request)
      .then(responseCache => {
        return responseCache || fetch(e.request)
      })
      .catch(() => caches.match('/error.html'))
  )
});