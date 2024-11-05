const { Sequelize } = require("sequelize");
const configs = require("./configs");

const db = new Sequelize({
  host: configs.db.host,
  port: configs.db.port,
  username: configs.db.user,
  password: configs.db.password,
  database: configs.db.name,
  dialect: configs.db.dialect,
  logging: false,
});

//* JsDoc
/** @type {import('sequelize').ModelCtor<import('sequelize').Model<any, any>} */
const User = require("./models/User")(db);
/** @type {import('sequelize').ModelCtor<import('sequelize').Model<any, any>} */
const Address = require("./models/Address")(db);

//Associations

User.hasMany(Address, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Address.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

module.exports = { db, User, Address };
