const express = require('express');
const sequelize = require('../models');

const router = express.Router();

router.post('/buy', async (req, res) => {
    const clientId = req.header('id');
    const { symbol, amount } = req.query;

    sequelize.sync()
        .then(async () => {
            // query row in portfolio where client id and share symbol
            // columns match
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
                // if portfolio exists, add bought amount to already existing amount
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
                )
                    .then(() => res.status(200).send(`Bought ${amount} shares at ${portfolio.Shares[0].dataValues.Portfolio.dataValues.price}$ per share.`));
            } else {
                // if row does not exist, query share where
                // the share symbol column matches
                const share = await sequelize.models.Share.findOne({ where: { symbol } });

                if (share) {
                    // if share exists, query client where the id
                    // column matches, and add share if it exists
                    sequelize.models.Client.findOne({ where: { client_id: clientId } })
                        .then((client) => client.addShare(
                            share,
                            {
                                through: {
                                    amount,
                                },
                            },
                        )
                            .then(() => res.status(201).send(`Bought ${amount} shares at ${share.price}$ per share.`)))
                        .catch(() => res.status(400).send('Client not registered.'));
                } else {
                    res.status(400).send('Share not registered.');
                }
            }
        });
});

router.post('/sell', async (req, res) => {
    const clientId = req.header('id');
    const { symbol, amount } = req.query;

    sequelize.sync()
        .then(async () => {
            // query row in portfolio where client id and share symbol
            // columns match
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
                if (+amount < +portfolio.Shares[0].dataValues.Portfolio.dataValues.amount) {
                    // if portfolio row exists, and sold amount is fewer than owned amount,
                    // subtract sold amount from total
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
                    )
                        .then(() => res.status(200).send(`Sold ${amount} shares at ${portfolio.Shares[0].dataValues.price}$ per share.`));
                } else {
                    // if sold amount is greater than or equal to owned amount,
                    // remove portfolio row entirely (all shares are sold)
                    sequelize.models.Portfolio.destroy(
                        {
                            where: {
                                client_id: clientId,
                                symbol,
                            },
                        },
                    )
                        .then(() => res.status(200).send(`Sold ${portfolio.Shares[0].dataValues.Portfolio.dataValues.amount}$ shares at ${portfolio.Shares[0].dataValues.price} per share.`));
                }
            } else {
                res.status(400).send(`Client not registered or client does not possess any ${symbol} shares.`);
            }
        });
});

module.exports = router;
