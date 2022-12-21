const express = require('express');
require('dotenv').config({ path: `${__dirname}/.env` });
const sequelize = require('./src/models');
require('./seed')(
    sequelize.models.Client,
    sequelize.models.Share,
    sequelize.models.Portfolio,
);
const transactionRoutes = require('./src/routes/trade');
const registerRoutes = require('./src/routes/register');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/register', registerRoutes);
app.use('/trade', transactionRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('server up');
});
