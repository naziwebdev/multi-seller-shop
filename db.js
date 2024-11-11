const { Sequelize } = require("sequelize");
const configs = require("./configs");

const db = new Sequelize({
  host: configs.db.host,
  port: configs.db.port,
  username: configs.db.user,
  password: configs.db.password,
  database: configs.db.name,
  dialect: configs.db.dialect,
  logging: console.log,
});

//* JsDoc
/** @type {import('sequelize').ModelCtor<import('sequelize').Model<any, any>} */
const User = require("./models/User")(db);
/** @type {import('sequelize').ModelCtor<import('sequelize').Model<any, any>} */
const Address = require("./models/Address")(db);
/** @type {import('sequelize').ModelCtor<import('sequelize').Model<any, any>} */
const Ban = require("./models/Ban")(db);
/** @type {import('sequelize').ModelCtor<import('sequelize').Model<any, any>} */
const Seller = require("./models/Seller")(db);
/** @type {import('sequelize').ModelCtor<import('sequelize').Model<any, any>} */
const Category = require("./models/category")(db);

//point : even models that dont have relations must import in db till pass db to model and export model & import it from this path

//Associations

User.hasMany(Address, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Address.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

User.hasOne(Seller, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Seller.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

Category.hasMany(Category, {
  foreignKey: "parent_id",
  onDelete: "CASCADE",
});

Category.belongsTo(Category, {
  foreignKey: "parent_id",
  as: "parent",
});

module.exports = { db, User, Address, Ban, Seller, Category };
