const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Portfolio', {
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
