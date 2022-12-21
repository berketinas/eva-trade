const express = require('express');
const sequelize = require('../models');

const router = express.Router();

router.post('/buy', async (req, res) => {
    const clientId = req.header('id');
    const { symbol, amount } = req.query;

    sequelize.sync()
        .then(async () => {
            const portfolio = await sequelize.models.Client.findOne({
                where: {
                    client_id: clientId,
                },
                include: [{
                    model: sequelize.models.Share,
                    where: {
                        symbol,
                    },
                }],
            });

            if (portfolio) {
                sequelize.models.Portfolio.update(
                    {
                        amount: +portfolio.Shares[0].dataValues.Portfolio.dataValues.amount
                            + +amount,
                    },
                    {
                        where: {
                            client_id: clientId,
                            symbol,
                        },
                    },
                );
            } else {
                const share = await sequelize.models.Share.findOne({ where: { symbol } });

                if (share) {
                    sequelize.models.Client.findOne({ where: { client_id: clientId } })
                        .then((client) => client.addShare(
                            share,
                            {
                                through: {
                                    amount,
                                },
                            },
                        ));

                    res.status(201);
                } else {
                    res.status(400);
                }
            }
        });
});

router.post('/sell', async (req, res) => {
    const clientId = req.header('id');
    const { symbol, amount } = req.query;

    sequelize.sync()
        .then(async () => {
            const portfolio = await sequelize.models.Client.findOne({
                where: {
                    client_id: clientId,
                },
                include: [{
                    model: sequelize.models.Share,
                    where: {
                        symbol,
                    },
                }],
            });

            if (portfolio) {
                if (+amount <= +portfolio.Shares[0].dataValues.Portfolio.dataValues.amount) {
                    sequelize.models.Portfolio.update(
                        {
                            amount: +portfolio.Shares[0].dataValues.Portfolio.dataValues.amount
                                - +amount,
                        },
                        {
                            where: {
                                client_id: clientId,
                                symbol,
                            },
                        },
                    );
                } else {
                    sequelize.models.Portfolio.destroy(
                        {
                            where: {
                                client_id: clientId,
                                symbol,
                            },
                        },
                    );
                }
            }
        });

    res.status(200);
});

module.exports = router;
