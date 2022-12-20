const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Client', {
        client_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
        },
    }, {
        tableName: 'clients',
        timestamps: false,
    });
};
