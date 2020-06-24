const dbConfig = require("../config/config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user.js")(sequelize, Sequelize);
db.messages = require("./message.js")(sequelize, Sequelize);
// db.token = require("./token")(sequelize, Sequelize);

// db.users.hasMany(db.messages, { foreignKey: 'userId' });
// db.messages.belongsTo(db.users);
// db.users.hasOne(db.token, {foreignKey: 'userId'})
// db.token.belongsTo(db.user)

module.exports = db;