const { DataTypes } = require('sequelize');

module.exports = async (sequelize) => {
    await sequelize.define('Portfolio', {
        // a client cannot own fewer than one share
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
            },
        },
    }, {
        tableName: 'portfolio',
        timestamps: false,
    });
};
