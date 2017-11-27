import { Color, ColorsManager } from './colors';
import { saveColor, loadColors } from './request'


window.addEventListener('DOMContentLoaded', async () => {

    const clicker = document.querySelector('.clicker');
    const saver = document.querySelector('.buttons .save');
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
        saveColor(currentColor);
    });

    next();

    let colors: Color[] = await loadColors();
    colors.forEach((color) => {
        colorsManager.addSavedColor(color); 

    });
});

