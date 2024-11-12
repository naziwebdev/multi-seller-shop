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
/** @type {import('sequelize').ModelCtor<import('sequelize').Model<any, any>} */
const SubCategory = require("./models/Subcategory")(db);
/** @type {import('sequelize').ModelCtor<import('sequelize').Model<any, any>} */
const FiltersCategory = require("./models/FiltersCategory")(db);

//Associations

//user & address
User.hasMany(Address, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Address.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

//user && seller
User.hasOne(Seller, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Seller.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

//category && category
Category.hasMany(Category, {
  foreignKey: "parent_id",
  onDelete: "CASCADE",
});

Category.belongsTo(Category, {
  foreignKey: "parent_id",
  as: "parent",
});

//category && subCategory
//in has many as is model name in db if dont put them it is ok
//in include query we must give as that is tablename
//but in belongs to as is my field name 
Category.hasMany(SubCategory, {
  foreignKey: "parent_id",
  as: "subCategories",
  onDelete: "CASCADE",
});

SubCategory.belongsTo(Category, {
  foreignKey: "parent_id",
  as: "parent",
});

//filtersCategory & category
Category.hasMany(FiltersCategory, {
  foreignKey: "category_id",
  onDelete: "CASCADE",
});

FiltersCategory.belongsTo(Category, {
  foreignKey: "category_id",
  as: "category",
});

//filtersCategory & subCategory
SubCategory.hasMany(FiltersCategory, {
  foreignKey: "subCategory_id",
  onDelete: "CASCADE",
});

FiltersCategory.belongsTo(SubCategory, {
  foreignKey: "subCategory_id",
  as: "subCategory",
});

module.exports = { db, User, Address, Ban, Seller, Category, SubCategory ,FiltersCategory};
