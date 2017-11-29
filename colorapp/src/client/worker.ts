import { ColorsDb } from './db';
import { saveColor } from './request';

const CACHE_NAME = 'colors-app-v2';
const db = new ColorsDb();

self.addEventListener('install', (event: any /*InstallEvent*/) => {
    event.waitUntil((async () => {
        const openCache: Cache = await caches.open(CACHE_NAME);
        await openCache.addAll([
            '/',
            '/app.js',
            '/styles.js',
            '/assets/opensans.woff2'
        ]);
    })());
});

self.addEventListener('activate', (event: any) => {
    event.waitUntil((async () => {
        const keys = await caches.keys();
        return Promise.all(keys.filter((key: string) => {
            return key !== CACHE_NAME;
        }).map((key) => {
            return caches.delete(key);
        }));
    })());
});


self.addEventListener('fetch', (event: any/*FetchEvent*/) => {
    event.respondWith((async () => {
        const response = await caches.match(event.request);
        if (!response) {
            return fetch(event.request);
        }
        return response;
    })());
});


self.addEventListener('sync', (event: any /*SyncEvent?*/) => {
    if (event.tag === 'colors') {
        event.waitUntil((async () => {
            const colorDTOs = await db.getUnsyncedColors();
            return Promise.all(
                colorDTOs.map(async (colorDTO) => {
                    await saveColor(colorDTO.color);
                    return db.markSynced(colorDTO);
                })
            );
        })());
    }
});


self.addEventListener('push', (event: any) => {
    let options = {
        body: event.data.text(),
        data: {
          customData: ''
        }
    };
    event.waitUntil(
      self.registration.showNotification('Hello my first notification!', options)
    );
});