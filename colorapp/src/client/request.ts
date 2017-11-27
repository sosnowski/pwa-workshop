import { Color } from "./colors";

export const saveColor = async (color: Color) => {
    try {
        const response = await fetch('/api/colors', {
            method: 'PUT',
            body: JSON.stringify(color),
            headers: new Headers({
                "Content-Type": "application/json",
            })
        });
        if (!response.ok) {
            throw new Error('Failed to save colors');
        }
        console.log('Server request ok');
    }
    catch (e) {
        console.error(e.message);
    }
};

export const loadColors = async () => {
    try {
        const response = await fetch('/api/colors', {
            method: 'GET'
        })
        if (!response.ok) {
            throw new Error('Unable to load saved colors');
        }
        return response.json();
    }
    catch(e) {
        console.error(e.message);
    }
};