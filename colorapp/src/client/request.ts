import { Color } from "./colors";

export const saveColor = async (color: Color) => {
    return fetch('/api/colors', {
        method: 'PUT',
        body: JSON.stringify(color),
        headers: new Headers({
            "Content-Type": "application/json",
        })
    });
};


export const saveSubscription = (subData: any) => {

};

export const loadColors = async (): Promise<Color[]> => {
    const response = await fetch('/api/colors', {
        method: 'GET'
    })
    if (!response.ok) {
        throw new Error('Unable to load saved colors');
    }
    return response.json() as Promise<Color[]>;
};