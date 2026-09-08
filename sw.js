const CACHE = 'arena-pwa-v2';
const APP_SHELL = ['./', './index.html', './manifest.json'];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(APP_SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const req = event.request;
  const url = new URL(req.url);

  if (req.method === 'POST' && url.pathname.endsWith('/index.html')) {
    event.respondWith((async () => {
      try {
        const form = await req.formData();
        const file = form.get('file');
        if (file && typeof file.arrayBuffer === 'function') {
          const dbReq = indexedDB.open('GameShareInbox', 1);
          await new Promise((resolve, reject) => {
            dbReq.onupgradeneeded = () => {
              const db = dbReq.result;
              if (!db.objectStoreNames.contains('files')) db.createObjectStore('files', {keyPath:'id', autoIncrement:true});
            };
            dbReq.onerror = () => reject(dbReq.error);
            dbReq.onsuccess = () => resolve();
          });
          const db = dbReq.result;
          await new Promise((resolve, reject) => {
            const tx = db.transaction('files', 'readwrite');
            tx.objectStore('files').add({name:file.name || 'mod.txt', type:file.type || 'text/plain', blob:file});
            tx.oncomplete = resolve;
            tx.onerror = () => reject(tx.error);
          });
          db.close();
        }
      } catch (err) {
        console.error('[PWA Share Target] Error:', err);
      }
      return Response.redirect(new URL('/Soulforgearena/index.html?shared=1', self.location.origin), 303);
    })());
    return;
  }

  if (req.method !== 'GET') return;
  event.respondWith(caches.match(req).then(cached => cached || fetch(req).then(res => {
    const copy = res.clone();
    caches.open(CACHE).then(cache => cache.put(req, copy)).catch(()=>{});
    return res;
  })));
});
