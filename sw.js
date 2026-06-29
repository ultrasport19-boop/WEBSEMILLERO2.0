/* El Semillero — Service Worker (PWA, modo offline del cascarón) */
const CACHE = 'semillero-v1';
const SHELL = ['./','index.html','subir.html','logo.png','favicon.png','manifest.webmanifest','icon-192.png','icon-512.png'];

self.addEventListener('install', function(e){
  e.waitUntil(caches.open(CACHE).then(function(c){ return c.addAll(SHELL); }).then(function(){ return self.skipWaiting(); }));
});

self.addEventListener('activate', function(e){
  e.waitUntil(caches.keys().then(function(ks){
    return Promise.all(ks.filter(function(k){ return k !== CACHE; }).map(function(k){ return caches.delete(k); }));
  }).then(function(){ return self.clients.claim(); }));
});

self.addEventListener('fetch', function(e){
  var req = e.request;
  if (req.method !== 'GET') return;
  var url = new URL(req.url);
  // No interceptar contenido dinámico (Apps Script / Drive / Google APIs / fuentes)
  if (/script\.google\.com|googleusercontent\.com|drive\.google\.com|googleapis\.com|gstatic\.com/.test(url.host)) return;
  e.respondWith(
    caches.match(req).then(function(hit){
      return hit || fetch(req).then(function(res){
        if (res && res.status === 200 && url.origin === location.origin){
          var copy = res.clone();
          caches.open(CACHE).then(function(c){ c.put(req, copy); });
        }
        return res;
      }).catch(function(){ return caches.match('index.html'); });
    })
  );
});
