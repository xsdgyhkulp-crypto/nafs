// always load the newest game page from the site (network first), so devices never keep an old copy
self.addEventListener("install",e=>self.skipWaiting());
self.addEventListener("activate",e=>e.waitUntil(self.clients.claim()));
self.addEventListener("fetch",e=>{
  const r=e.request;
  if(r.method==="GET"&&(r.mode==="navigate"||/\/(index\.html)?$/.test(new URL(r.url).pathname))){
    e.respondWith(fetch(r,{cache:"no-store"}).catch(()=>caches.match(r).then(x=>x||Response.error())));
  }
});
