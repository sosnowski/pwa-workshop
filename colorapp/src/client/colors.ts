import { random } from 'lodash';

export type Color = [number, number, number];

export class ColorsManager {
    constructor(private backgroundEl: HTMLElement, private colorsListEl: HTMLElement) {}

    nextRandomColor = (): Color => {
        const red = random(0, 255);
        const green = random(0, 255);
        const blue = random(0, 255);
    
        return [red, green, blue];
    }

    applyColor = (color: Color) => {
        this.backgroundEl.style.backgroundColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
    }

    addSavedColor = (color: Color) => {
        const el = document.createElement('div');
        el.className = 'color';
        el.style.backgroundColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
        this.colorsListEl.appendChild(el);
    }
};