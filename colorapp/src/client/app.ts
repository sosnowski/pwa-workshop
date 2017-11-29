import { Color, ColorsManager } from './colors';
import { PWAService, registerServiceWorker } from './pwa';
import { ColorsDb } from './db';
import { saveSubscription } from './request';

const initPwa = async (): Promise<PWAService> => {
    const pwa: PWAService = await registerServiceWorker();
    await pwa.askForPermission();
    const subscriptionData = await pwa.registerNotifications();
    saveSubscription(subscriptionData);
    console.log(JSON.stringify(subscriptionData));

    return pwa;
};

window.addEventListener('DOMContentLoaded', async () => {
    const db = new ColorsDb();
    const pwa = await initPwa();

    const clicker = document.querySelector('.clicker');
    const saver = document.querySelector('.buttons .save');
    const colorsManager = new ColorsManager(
        document.querySelector('body')!,
        document.querySelector<HTMLElement>('.colors')!
    );

    const next = () => {
        currentColor = colorsManager.nextRandomColor();
        colorsManager.applyBgColor(currentColor);
    }

    let currentColor: Color;

    clicker!.addEventListener('click', next);

    saver!.addEventListener('click', () => {
        colorsManager.displaySavedColor(currentColor); //add to template
        //save to db
        db.saveColor(currentColor);

        //request sync
        pwa.sync();
    });

    next();

    (await db.getAllColors()).map((colorDTO) => {
        return colorDTO.color;
    }).forEach((color: Color) => {
        colorsManager.displaySavedColor(color); 
    });
});

