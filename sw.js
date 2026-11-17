// 最小的 Service Worker:只讓瀏覽器把網站視為可安裝的 App,不做任何快取(所以更新 index.html 後馬上生效)。
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{e.respondWith(fetch(e.request))});
