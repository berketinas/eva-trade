const sequelize = require('../../db');

require('./share')(sequelize);
require('./client')(sequelize);
require('./portfolio')(sequelize);

const associate = async () => {
    await sequelize.sync();

    await sequelize.models.Client.belongsToMany(
        sequelize.models.Share,
        {
            through: sequelize.models.Portfolio,
            foreignKey: 'client_id',
        },
    );

    await sequelize.models.Share.belongsToMany(
        sequelize.models.Client,
        {
            through: sequelize.models.Portfolio,
            foreignKey: 'symbol',
        },
    );
};

associate();

module.exports = sequelize;
