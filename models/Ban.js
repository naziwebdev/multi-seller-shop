const { DataTypes } = require("sequelize");

const Ban = (sequelize) => {
  return sequelize.define(
    "bans",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { tableNames: "bans" }
  );
};

module.exports = Ban;
