import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';

type Color = [number, number, number];

const app = express();
const colors: Color[] = [];

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

app.listen(4000, () => {
    console.log('Listening on 4000 port');
});