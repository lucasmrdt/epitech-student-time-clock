'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Database = require('./src/database');

const app = express();
const port = 1234;

const FILENAME = 'template.xlsx';
const STORE = new Database(FILENAME);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.post('/break/toggle', async (req, res) => {
    const { login, date } = req.body;

    if (typeof login === 'undefined' || typeof date === 'undefined') {
        res.status(403);
        res.send('You must provide an "login" and "date" params.');
    } else {
        const datas = STORE.toggleBreak(login, date);
        res.send(JSON.stringify(datas));
    }
});

app.post('/break/remove', async (req, res) => {
    const { login, date } = req.body;

    if (typeof login === 'undefined' || typeof date === 'undefined') {
        res.status(403);
        res.send('You must provide an "login" and "date" params.');
    } else {
        const datas = STORE.removeBreak(login, date);
        res.send(JSON.stringify(datas));
    }
});

app.post('/comment', async (req, res) => {
    const { login, comment } = req.body;

    if (typeof login === 'undefined' || typeof comment === 'undefined') {
        res.status(403);
        res.send('You must provide an "login" and "comment" params.');
    } else {
        const datas = STORE.updateComment(login, comment);
        res.send(JSON.stringify(datas));
    }
});

app.get('/logins', async (req, res) => {
    const datas = STORE.getStore();
    res.send(JSON.stringify(datas));
});

app.listen(port, async () => {
    console.log(`✅ Server is ready !`);
});
