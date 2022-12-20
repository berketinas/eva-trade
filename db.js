const Sequelize = require('sequelize');

// sequelize.query(`DROP DATABASE IF EXISTS ${process.env.DB_NAME}`);

// sequelize.query(`CREATE DATABASE ${process.env.DB_NAME}`)
//     .then(() => console.log('created'))
//     .catch(() => console.log('already exists'));

module.exports = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.HOST,
        port: process.env.DB_PORT,
        dialect: 'postgres',
    },
);
