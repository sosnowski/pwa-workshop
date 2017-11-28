import { ColorsDb } from './db';
import { saveColor } from './request';

const CACHE_NAME = 'colors-cache-v3';
const db = new ColorsDb();

self.addEventListener('install', (event: any /*InstallEvent*/) => {
    event.waitUntil((async () => {
        const cache = await caches.open(CACHE_NAME);
        return cache.addAll([
            // '/app.js',
            // '/',
            // '/styles.js',
            // '/manifest.json',
            // '/assets/opensans.woff2'
        ]);
    })());
});


self.addEventListener('activate', (event: any /*ExtendableEvent*/) => {
    event.waitUntil((async () => {
        const cacheKeys = await caches.keys();
        return Promise.all(
            cacheKeys.filter((key) => {
                return key !== CACHE_NAME;
            }).map((key) => {
                return caches.delete(key);
            })
        )
    })());
});


self.addEventListener('fetch', (event: any /*FetchEvent*/) => {
    event.respondWith((async () => {
        try {
            const cachedResponse = await caches.match(event.request);
            if (!cachedResponse) {
                return fetch(event.request);
            }
            return cachedResponse;
        }
        catch (e) {
            return fetch(event.request);
        }
    })());
});


self.addEventListener('sync', async (event: any /*SyncEvent*/) => {
    console.log('WORKER SYNC');
    if (event.tag === 'colors') {
        event.waitUntil((async () => {
            let colors = await db.getUnsyncedColors();
            return Promise.all(colors.map(async (colorDTO) => {
                return saveColor(colorDTO.color).then(() => {
                    return db.markSynced(colorDTO)
                })
            }));
        })());
    }
});


self.addEventListener('push', (event: any /*PushEvent*/) => {
    console.log('WORKER PUSH');
    console.log(event.data.text());

    const title = 'This is push notification';
    const options = {
      body: 'Yay it works.'
    };

  
    event.waitUntil(self.registration.showNotification(title, options));
}); 