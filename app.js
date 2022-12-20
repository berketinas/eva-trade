const express = require('express');
require('dotenv').config({ path: `${__dirname}/.env` });
const sequelize = require('./src/models');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/register-share', (req, res) => {
    const share = req.body;
    sequelize.models.Share.create(share)
        .then((data) => res.send(data))
        .catch((err) => console.log(err));
});

app.post('/buy', (req, res) => {
    const clientId = req.header('id');
    const { symbol, amount } = req.query;

    console.log(clientId, symbol, amount);
});

app.post('/sell', (req, res) => {
    const clientId = req.header('id');
    const { symbol, amount } = req.query;

    console.log(clientId, symbol, amount);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('server up');
});
