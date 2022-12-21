const Sequelize = require('sequelize');

const temp = new Sequelize(
    'template1',
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.HOST,
        port: process.env.DB_PORT,
        dialect: 'postgres',
    },
);

const init = async () => {
    await temp.query(`DROP DATABASE "${process.env.DB_NAME}";`);
    await temp.query(`CREATE DATABASE "${process.env.DB_NAME}";`);
};

init();
