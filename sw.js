// Service Worker:讓網站可安裝,並在沒訊號時也能開啟(離線旅行包)。
// 網頁本身「先連網、失敗才用快取」,所以更新 index.html 後仍會馬上生效。
const RT='rt1';
const CACHE_HOSTS=['fonts.googleapis.com','fonts.gstatic.com','www.gstatic.com','cdnjs.cloudflare.com','unpkg.com','upload.wikimedia.org'];
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET')return;
  const u=new URL(r.url);
  if(u.origin===location.origin){
    e.respondWith(fetch(r).then(res=>{if(res.ok){const c=res.clone();caches.open(RT).then(x=>x.put(r,c))}return res}).catch(()=>caches.match(r).then(m=>m||caches.match('index.html')||Response.error())));
    return}
  if(CACHE_HOSTS.includes(u.hostname)){
    e.respondWith(caches.match(r).then(m=>m||fetch(r).then(res=>{if(res.ok||res.type==='opaque'){const c=res.clone();caches.open(RT).then(x=>x.put(r,c))}return res}).catch(()=>Response.error())));
  }
});
