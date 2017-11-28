import { urlBase64ToUint8Array } from "./helpers";

export class PWAService {
    constructor(private registeredWorker: ServiceWorkerRegistration) {

    }

    sync() {
        this.registeredWorker.sync.register('colors');
    }

    requestNotificationsPermission() {
        return Notification.requestPermission();
    }

    subscribeToNotifications() {
        return this.registeredWorker.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array('BIsKmCP9nKpQpaLScjDpS6_22_0pasOU6DpeZ4Ezr6E6xZzd3uuZkvE1Y83D4RitNxXfQGYXSgIFNcwlcrRJpWo')
        }).then((sub: PushSubscription) => {
            if (!sub) {
                throw new Error('Not able to subscribe');
            }
            return sub;
        });
    }
}

export const registerWorker = async (path: string) => {
    if ('serviceWorker' in navigator) {
        const reg = await navigator.serviceWorker.register(path);

        return new PWAService(reg);
    }
    throw new Error('Service worker not supported');
};