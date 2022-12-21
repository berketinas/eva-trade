const express = require('express');
const sequelize = require('../models');

const router = express.Router();

router.post('/share', async (req, res) => {
    const { symbol, price } = req.query;
    sequelize.models.Share.create({ symbol, price })
        .then(() => res.status(201).send())
        .catch((err) => res.status(400).send(err.message));
});

router.post('/client', async (req, res) => {
    const { name } = req.query;
    sequelize.models.Client.create({ name })
        .then(() => res.status(201).send())
        .catch((err) => res.status(400).send(err.message));
});

module.exports = router;
