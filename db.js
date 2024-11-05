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

module.exports = { db };
