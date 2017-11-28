import { Color } from "./colors";

export const saveColor = (color: Color) => {
    return fetch('/api/colors', {
        method: 'PUT',
        body: JSON.stringify(color),
        headers: new Headers({
            "Content-Type": "application/json",
        })
    });
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

export const saveSubscription = (sub: PushSubscription) => {
    return fetch('/api/subscriptions', {
        method: 'POST',
        body: JSON.stringify(sub),
        headers: new Headers({
            "Content-Type": "application/json",
        })
    });
};