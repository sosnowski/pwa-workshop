import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as webpush from 'web-push';

type Color = [number, number, number];

const app = express();
const colors: Color[] = [];

let VAPID_KEY_PUBLIC: string = 'BIsKmCP9nKpQpaLScjDpS6_22_0pasOU6DpeZ4Ezr6E6xZzd3uuZkvE1Y83D4RitNxXfQGYXSgIFNcwlcrRJpWo';
let VAPID_KEY_PRIVATE: string = 'DU1QJvahEifsnMd2Z584e5jm7sfsanvRQ-gEaazjyd0';

webpush.setVapidDetails(
    'mailto:test@test.pl',
    VAPID_KEY_PUBLIC,
    VAPID_KEY_PRIVATE
);

interface Subscription {
    endpoint: string;
    expirationTime: Date;
    keys: {
        p256dh: string;
        auth: string;
    }
};

let storedSubscription: Subscription;

app.use(bodyParser());

app.use(express.static(path.join(__dirname, '../client')));

app.put('/api/colors', (req: express.Request, res: express.Response) => {
    const color: Color = req.body;
    if (!color) {
        throw new Error('Missing color property');
    }
    colors.push(color);
    res.json(color);
});

app.get('/api/colors', (req: express.Request, res: express.Response) => {
    res.json(colors);
});

app.post('/api/subscriptions', (req: express.Request, res: express.Response) => {
    storedSubscription = req.body;
    res.json(storedSubscription);
});

app.get('/api/notify', (req: express.Request, res: express.Response) => {
    webpush.sendNotification(storedSubscription, 'This is my notification payload');
    res.sendStatus(200);
});

app.listen(4000, () => {
    console.log('Listening on 4000 port');
});