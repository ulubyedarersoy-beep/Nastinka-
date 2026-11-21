const V='hikma-v2',CORE=['./','index.html','manifest.webmanifest','icons/icon-192.png','icons/icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
 if(e.request.method!=='GET')return;
 if(e.request.mode==='navigate'){
  e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(V).then(x=>x.put('index.html',c));return r}).catch(()=>caches.match('index.html')));return}
 e.respondWith(caches.match(e.request).then(h=>{
  const n=fetch(e.request).then(r=>{if(r&&(r.ok||r.type==='opaque')){const c=r.clone();caches.open(V).then(x=>x.put(e.request,c))}return r}).catch(()=>h);
  return h||n}))});
