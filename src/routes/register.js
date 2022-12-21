const express = require('express');
const sequelize = require('../models');

const router = express.Router();

router.post('/share', async (req, res) => {
    const { symbol, price } = req.query;
    sequelize.models.Share.create({ symbol, price })
        .then((data) => res.send(data))
        .catch((err) => console.log(err));
});

router.post('/client', async (req, res) => {
    const name = req.query;

    sequelize.models.Client.create({ name });
});

module.exports = router;
