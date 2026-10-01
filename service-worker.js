const CACHE_NAME = "kamohelo-portfolio-v1";

const FILES_TO_CACHE = [
    "./",
    "./index.html",
    "./css/style.css",
    "./js/main.js",
    "./manifest.json",
    "./assets/images/profile/profile.jpg",
    "./assets/icons/icon-180.png",
    "./assets/icons/icon-192.png",
    "./assets/icons/icon-512.png"
];

/*
==========================================
INSTALL
==========================================
*/

self.addEventListener("install", event => {

    event.waitUntil(

        caches.open(CACHE_NAME)
            .then(cache => {

                return cache.addAll(FILES_TO_CACHE);

            })

    );

    self.skipWaiting();

});


/*
==========================================
ACTIVATE
==========================================
*/

self.addEventListener("activate", event => {

    event.waitUntil(

        caches.keys()
            .then(cacheNames => {

                return Promise.all(

                    cacheNames
                        .filter(name => name !== CACHE_NAME)
                        .map(name => caches.delete(name))

                );

            })

    );

    self.clients.claim();

});


/*
==========================================
FETCH
==========================================
*/

self.addEventListener("fetch", event => {

    /*
    Only handle normal GET requests.
    */

    if (event.request.method !== "GET") {
        return;
    }


    event.respondWith(

        caches.match(event.request)
            .then(cachedResponse => {

                /*
                Use cached version if available.
                */

                if (cachedResponse) {
                    return cachedResponse;
                }


                /*
                Otherwise request it from the network.
                */

                return fetch(event.request)
                    .then(networkResponse => {

                        /*
                        Save successful responses
                        for future visits.
                        */

                        if (
                            networkResponse &&
                            networkResponse.status === 200 &&
                            networkResponse.type === "basic"
                        ) {

                            const responseToCache =
                                networkResponse.clone();

                            caches.open(CACHE_NAME)
                                .then(cache => {

                                    cache.put(
                                        event.request,
                                        responseToCache
                                    );

                                });

                        }


                        return networkResponse;

                    });

            })

    );

});
