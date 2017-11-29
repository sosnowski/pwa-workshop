import { Color, ColorsManager } from './colors';
import { PWAService, registerServiceWorker } from './pwa';
import { ColorsDb } from './db';
import { saveColor, loadColors } from './request';


window.addEventListener('DOMContentLoaded', async () => {
    const db = new ColorsDb();

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
        saveColor(currentColor);
    });

    next();

    const colors = await loadColors()
    colors.forEach((color) => {
        colorsManager.displaySavedColor(color);
    });
});

