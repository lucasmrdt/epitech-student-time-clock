'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Database = require('./src/database');

const app = express();
const port = 3003;

const FILENAME = 'template.xlsx';
const STORE = new Database(FILENAME);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.post('/break', async (req, res) => {
    const { login, date } = req.body;

    if (!login || !date) {
        res.status(403);
        res.send('You must provide an "login" and "date" params.');
    } else {
        const datas = STORE.toggleBreak(login, date);
        res.send(JSON.stringify(datas));
    }
});

app.get('/logins', async (req, res) => {
    const datas = STORE.getStore();
    res.send(JSON.stringify(datas));
});

app.listen(port, async () => {
    console.log(`Break pointer app is ready http://localhost:${port}!`);
});
