import { Color, ColorsManager } from './colors';
import { registerWorker, PWAService } from './pwa';
import { ColorsDb } from './db';
import { saveSubscription } from './request';

const initializePWA = async () => {
    const pwa = await registerWorker('/worker.js');
    await pwa.requestNotificationsPermission();
    const sub = await pwa.subscribeToNotifications();

    console.log(JSON.stringify(sub));
    await saveSubscription(sub);
    return pwa;
}


window.addEventListener('DOMContentLoaded', async () => {

    const clicker = document.querySelector('.clicker');
    const saver = document.querySelector('.buttons .save');
    const db = new ColorsDb();
    const pwa = initializePWA();

    const colorsManager = new ColorsManager(
        document.querySelector('body')!,
        document.querySelector<HTMLElement>('.colors')!
    );

    const next = () => {
        currentColor = colorsManager.nextRandomColor();
        colorsManager.applyColor(currentColor);
    }

    let currentColor: Color;

    clicker!.addEventListener('click', next);

    saver!.addEventListener('click', () => {
        colorsManager.addSavedColor(currentColor);
        try {
            db.saveColor(currentColor);
        }
        catch(e) {
            console.error(e.message);
        }
        pwa.sync();
    });

    next();

    (await db.getAllColors()).map((colorDTO) => colorDTO.color).forEach((color) => {
        colorsManager.addSavedColor(color);
    });
});

