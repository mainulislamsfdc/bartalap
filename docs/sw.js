const CACHE_NAME="bartalap1-v1",REPOSITORY_NAME="bartalap",ASSETS_TO_CACHE=["/bartalap/","/bartalap/index.html","/bartalap/css/styles.css","/bartalap/bundle.js","/bartalap/images/icon-192x192.png","/bartalap/images/icon-512x512.png"];self.addEventListener("install",(a=>{a.waitUntil(caches.open(CACHE_NAME).then((a=>a.addAll(ASSETS_TO_CACHE))))})),self.addEventListener("fetch",(a=>{a.respondWith(caches.match(a.request).then((t=>t||fetch(a.request).then((t=>{if(!t||200!==t.status||"basic"!==t.type)return t;const e=t.clone();return caches.open(CACHE_NAME).then((t=>{t.put(a.request,e)})),t})))))}));