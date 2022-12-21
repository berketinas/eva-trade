const sequelize = require('../../db');

require('./share')(sequelize);
require('./client')(sequelize);
require('./portfolio')(sequelize);

sequelize.sync();

sequelize.models.Client.belongsToMany(
    sequelize.models.Share,
    {
        through: sequelize.models.Portfolio,
        foreignKey: 'client_id',
    },
);

sequelize.models.Share.belongsToMany(
    sequelize.models.Client,
    {
        through: sequelize.models.Portfolio,
        foreignKey: 'symbol',
    },
);

module.exports = sequelize;
