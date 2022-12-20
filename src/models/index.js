const sequelize = require('../../db');

require('./Share')(sequelize);
require('./Client')(sequelize);
require('./Portfolio')(sequelize);

sequelize.sync({ force: true });

sequelize.models.Client.belongsToMany(
    sequelize.models.Share,
    { through: sequelize.models.Portfolio },
);

sequelize.models.Share.belongsToMany(
    sequelize.models.Client,
    { through: sequelize.models.Portfolio },
);

module.exports = sequelize;
