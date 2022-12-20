const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Share', {
        symbol: {
            // PRIMARY KEY, ALL CAPITAL, 3 LETTERS
            type: DataTypes.STRING(3),
            primaryKey: true,
            validate: {
                len: [3, 3],
                isUppercase: true,
            },
        },
        price: {
            // EXACTLY 2 DIGITS
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 10,
                max: 99,
            },
        },
    }, {
        tableName: 'shares',
        timestamps: false,
    });
};
