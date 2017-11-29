import { urlBase64ToUint8Array } from "./helpers";

export class PWAService {

    constructor(private workerRegistration: ServiceWorkerRegistration) {

    }
    
    sync() {
        this.workerRegistration.sync.register('colors');
    }

    async askForPermission() {
        let permission = await Notification.requestPermission();
        if (permission !== 'granted') {
            throw new Error('No permission to show notifications');
        }
    }

    async registerNotifications() {
        const result = await this.workerRegistration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array('BIsKmCP9nKpQpaLScjDpS6_22_0pasOU6DpeZ4Ezr6E6xZzd3uuZkvE1Y83D4RitNxXfQGYXSgIFNcwlcrRJpWo')
        });
        return result;
    }
};


export const registerServiceWorker = async () => {
    const registration = await navigator.serviceWorker.register('/worker.js');
    return new PWAService(registration);
}