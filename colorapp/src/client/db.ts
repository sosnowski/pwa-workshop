import Dexie from 'dexie';
import { Color } from './colors';

export interface ColorDTO {
    id?: number;
    color: Color;
    synced: number;
};

export class ColorsDb extends Dexie {
    colors: Dexie.Table<ColorDTO, number>;

    constructor() {
        super('ColorsDB');
        this.version(2).stores({
            colors: '++id, synced'
        }).upgrade(() => {
            console.log('upgrade');
        });
    }

    saveColor(color: Color) {
        return this.colors.add({
            color: color,
            synced: 0
        });
    }

    markSynced(color: ColorDTO) {
        return this.colors.put({...color, synced: 1});
    }

    getAllColors() {
        return this.colors.toArray();
    }

    getUnsyncedColors() {
        return this.colors.where({
            synced: 0
        }).toArray();
    }
}