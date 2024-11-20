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
/** @type {import('sequelize').ModelCtor<import('sequelize').Model<any, any>} */
const Product = require("./models/Product")(db);
/** @type {import('sequelize').ModelCtor<import('sequelize').Model<any, any>} */
const SellersProduct = require("./models/Sellersproduct")(db);
/** @type {import('sequelize').ModelCtor<import('sequelize').Model<any, any>} */
const SellerRequest = require("./models/SellerRequest")(db);
/** @type {import('sequelize').ModelCtor<import('sequelize').Model<any, any>} */
const Comment = require("./models/Comment")(db);
/** @type {import('sequelize').ModelCtor<import('sequelize').Model<any, any>} */
const Reply = require("./models/Reply")(db);
/** @type {import('sequelize').ModelCtor<import('sequelize').Model<any, any>} */
const Cart = require("./models/Cart")(db);
/** @type {import('sequelize').ModelCtor<import('sequelize').Model<any, any>} */
const CartItem = require("./models/CartItem")(db);
const Checkout = require("./models/Checkout")(db);
const CheckoutItem = require("./models/CheckoutItem")(db);

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

//product (many-to-many) seller => need separate table(SellersProduct)

Product.belongsToMany(Seller, {
  through: SellersProduct,
  onDelete: "CASCADE",
  foreignKey: "product_id",
});

Seller.belongsToMany(Product, {
  through: SellersProduct,
  onDelete: "CASCADE",
  foreignKey: "seller_id",
});

//product && subCategory
SubCategory.hasMany(Product, {
  foreignKey: "subCategory_id",
  onDelete: "CASCADE",
});

Product.belongsTo(SubCategory, {
  foreignKey: "subCategory_id",
  as: "subCategory",
});

//sellerRequest && seller
Seller.hasMany(SellerRequest, {
  foreignKey: "seller_id",
  onDelete: "CASCADE",
});

SellerRequest.belongsTo(Seller, {
  foreignKey: "seller_id",
  as: "seller",
});

//sellerRequest & product
Product.hasMany(SellerRequest, {
  foreignKey: "product_id",
  onDelete: "CASCADE",
});

SellerRequest.belongsTo(Product, {
  foreignKey: "product_id",
  as: "product",
});

// comment & user
User.hasMany(Comment, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Comment.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

//comment & product
Product.hasMany(Comment, {
  foreignKey: "product_id",
  onDelete: "CASCADE",
});

Comment.belongsTo(Product, {
  foreignKey: "product_id",
  as: "product",
});

//reply && user
User.hasMany(Reply, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Reply.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

//reply & comment
Comment.hasMany(Reply, {
  foreignKey: "comment_id",
  onDelete: "CASCADE",
});

Reply.belongsTo(Comment, {
  foreignKey: "comment_id",
  as: "comment",
});

//reply && reply
Reply.hasMany(Reply, {
  foreignKey: "parentReply_id",
  onDelete: "CASCADE",
});

Reply.belongsTo(Reply, {
  foreignKey: "parentReply_id",
  as: "parentReply",
});

//cart & user
User.hasOne(Cart, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Cart.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

// cart & cartItem
Cart.hasMany(CartItem, {
  foreignKey: "cart_id",
  onDelete: "CASCADE",
  as: "items",
});

CartItem.belongsTo(Cart, {
  foreignKey: "cart_id",
  as: "cart",
});

//catrtItem & product
Product.hasMany(CartItem, {
  foreignKey: "product_id",
  onDelete: "CASCADE",
});

CartItem.belongsTo(Product, {
  foreignKey: "product_id",
  as: "product",
});

//cartItem & seller
Seller.hasMany(CartItem, {
  foreignKey: "seller_id",
  onDelete: "CASCADE",
});

CartItem.belongsTo(Seller, {
  foreignKey: "seller_id",
  as: "seller",
});

//checkout & user
User.hasOne(Checkout, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Checkout.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

// checkout & checkout_item
Checkout.hasMany(CheckoutItem, {
  foreignKey: "checkout_id",
  onDelete: "CASCADE",
  as: "items",
});

CheckoutItem.belongsTo(Checkout, {
  foreignKey: "checkout_id",
  as: "checkout",
});

//checkoutItem & product
Product.hasMany(CheckoutItem, {
  foreignKey: "product_id",
  onDelete: "CASCADE",
});

CheckoutItem.belongsTo(Product, {
  foreignKey: "product_id",
  as: "product",
});

//ceckoutItem & seller
Seller.hasMany(CheckoutItem, {
  foreignKey: "seller_id",
  onDelete: "CASCADE",
});

CheckoutItem.belongsTo(Seller, {
  foreignKey: "seller_id",
  as: "seller",
});

//point:
//we can put as for both associations => exmple: producs as "cartItems" & cartItems as "product"
//if we dont put as for one of side the assiciate its as in include finds be own models name but if put as in associte , as in include be as in associate

module.exports = {
  db,
  User,
  Address,
  Ban,
  Seller,
  Category,
  SubCategory,
  FiltersCategory,
  Product,
  SellersProduct,
  SellerRequest,
  Comment,
  Reply,
  Cart,
  CartItem,
  Checkout,
  CheckoutItem,
};
